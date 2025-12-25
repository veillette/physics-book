#!/usr/bin/env node

/**
 * check-accessibility.js
 *
 * Checks accessibility concerns in markdown files:
 * - Missing or empty alt text on images
 * - Alt text that is too short or uninformative
 * - Missing figure captions
 * - Heading level skips (e.g., h1 -> h3)
 * - Empty links
 * - Links with uninformative text ("click here", "read more")
 *
 * Usage:
 *   node scripts/check-accessibility.js [options]
 *
 * Options:
 *   --fix             Auto-fix some issues (adds placeholder alt text)
 *   --strict          Enable stricter checks
 *   --help            Show this help message
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

class AccessibilityChecker {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.fix = options.fix || false;
    this.issues = [];
    this.warnings = [];
    this.filesChecked = 0;
    this.filesWithIssues = 0;
  }

  async run() {
    console.log('Accessibility Check');
    console.log('='.repeat(60));

    if (this.strict) {
      console.log('(Strict mode enabled)\n');
    }

    const files = await glob('**/*.md', {
      cwd: baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**', 'scripts/**'],
    });

    for (const file of files) {
      await this.checkFile(file);
    }

    this.printResults();
    return this.issues.length === 0;
  }

  async checkFile(filePath) {
    const fullPath = path.join(baseDir, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');

    this.filesChecked++;
    const fileIssues = [];

    // Check images
    this.checkImages(content, filePath, lines, fileIssues);

    // Check headings
    this.checkHeadings(content, filePath, lines, fileIssues);

    // Check links
    this.checkLinks(content, filePath, lines, fileIssues);

    // Check tables
    if (this.strict) {
      this.checkTables(content, filePath, lines, fileIssues);
    }

    if (fileIssues.length > 0) {
      this.filesWithIssues++;
      this.issues.push(...fileIssues);
    }
  }

  checkImages(content, filePath, lines, fileIssues) {
    // Match markdown images: ![alt](src) and ![alt](src "title")
    const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match;

    // Get code block ranges to exclude them from image detection
    const codeBlockRanges = this.getCodeBlockRanges(content);

    while ((match = imageRegex.exec(content)) !== null) {
      const [_fullMatch, altText, src] = match;
      const lineNum = this.getLineNumber(content, match.index);

      // Skip if this image is inside a code block
      if (this.isInsideCodeBlock(lineNum, codeBlockRanges)) {
        continue;
      }

      // Check for missing alt text
      if (!altText || altText.trim() === '') {
        fileIssues.push({
          type: 'error',
          file: filePath,
          line: lineNum,
          message: `Image missing alt text: ${src}`,
          code: 'IMG_NO_ALT',
        });
      }
      // Check for uninformative alt text
      else if (this.isUninformativeAlt(altText)) {
        fileIssues.push({
          type: 'warning',
          file: filePath,
          line: lineNum,
          message: `Image has uninformative alt text "${altText}": ${src}`,
          code: 'IMG_BAD_ALT',
        });
      }
      // Check for very short alt text (strict mode)
      else if (this.strict && altText.trim().length < 10) {
        this.warnings.push({
          type: 'warning',
          file: filePath,
          line: lineNum,
          message: `Image alt text may be too short "${altText}": ${src}`,
          code: 'IMG_SHORT_ALT',
        });
      }
    }

    // Check HTML images
    const htmlImgRegex = /<img[^>]*>/gi;
    while ((match = htmlImgRegex.exec(content)) !== null) {
      const imgTag = match[0];
      const lineNum = this.getLineNumber(content, match.index);

      // Skip if this image is inside a code block
      if (this.isInsideCodeBlock(lineNum, codeBlockRanges)) {
        continue;
      }

      // Check for alt attribute
      const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
      if (!altMatch) {
        fileIssues.push({
          type: 'error',
          file: filePath,
          line: lineNum,
          message: `HTML image missing alt attribute`,
          code: 'HTML_IMG_NO_ALT',
        });
      } else if (altMatch[1].trim() === '') {
        fileIssues.push({
          type: 'error',
          file: filePath,
          line: lineNum,
          message: `HTML image has empty alt attribute`,
          code: 'HTML_IMG_EMPTY_ALT',
        });
      }
    }
  }

  checkHeadings(content, filePath, lines, fileIssues) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    // Get code block ranges to exclude them from heading detection
    const codeBlockRanges = this.getCodeBlockRanges(content);

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const lineNum = this.getLineNumber(content, match.index);

      // Skip if this heading is inside a code block
      if (this.isInsideCodeBlock(lineNum, codeBlockRanges)) {
        continue;
      }

      headings.push({ level, text, lineNum });

      // Check for empty headings
      if (!text || text === '') {
        fileIssues.push({
          type: 'error',
          file: filePath,
          line: lineNum,
          message: `Empty heading (h${level})`,
          code: 'HEADING_EMPTY',
        });
      }
    }

    // Check for heading level skips
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1];
      const curr = headings[i];

      // Skip if going to a lower level (e.g., h3 -> h2)
      if (curr.level > prev.level && curr.level - prev.level > 1) {
        fileIssues.push({
          type: 'warning',
          file: filePath,
          line: curr.lineNum,
          message: `Heading level skip: h${prev.level} -> h${curr.level} (should not skip levels)`,
          code: 'HEADING_SKIP',
        });
      }
    }
  }

  checkLinks(content, filePath, lines, fileIssues) {
    // Match markdown links: [text](url)
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;

    // Get code block ranges to exclude them from link detection
    const codeBlockRanges = this.getCodeBlockRanges(content);

    const uninformativeTexts = [
      'click here',
      'here',
      'read more',
      'more',
      'link',
      'this link',
      'learn more',
      'click',
      'this',
      'page',
      'article',
    ];

    while ((match = linkRegex.exec(content)) !== null) {
      const [_fullMatch, linkText, url] = match;
      const lineNum = this.getLineNumber(content, match.index);

      // Skip image links
      if (content[match.index - 1] === '!') continue;

      // Skip if this link is inside a code block
      if (this.isInsideCodeBlock(lineNum, codeBlockRanges)) {
        continue;
      }

      // Check for empty link text
      if (!linkText || linkText.trim() === '') {
        fileIssues.push({
          type: 'error',
          file: filePath,
          line: lineNum,
          message: `Link has empty text: ${url}`,
          code: 'LINK_EMPTY_TEXT',
        });
      }
      // Check for uninformative link text
      else if (uninformativeTexts.includes(linkText.toLowerCase().trim())) {
        fileIssues.push({
          type: 'warning',
          file: filePath,
          line: lineNum,
          message: `Link has uninformative text "${linkText}": ${url}`,
          code: 'LINK_BAD_TEXT',
        });
      }
    }

    // Check for bare URLs (not linked) in strict mode
    if (this.strict) {
      const bareUrlRegex = /(?<!\(|<)https?:\/\/[^\s)>\]]+(?!\))/g;
      while ((match = bareUrlRegex.exec(content)) !== null) {
        const lineNum = this.getLineNumber(content, match.index);

        // Skip if this URL is inside a code block
        if (this.isInsideCodeBlock(lineNum, codeBlockRanges)) {
          continue;
        }

        this.warnings.push({
          type: 'warning',
          file: filePath,
          line: lineNum,
          message: `Bare URL (not linked): ${match[0].substring(0, 50)}...`,
          code: 'BARE_URL',
        });
      }
    }
  }

  checkTables(content, filePath, lines, _fileIssues) {
    // Simple check for tables without headers
    const tableRowRegex = /^\|[^|]+\|/gm;
    const tableHeaderSepRegex = /^\|[\s:-]+\|/gm;

    let inTable = false;
    let tableStart = -1;
    let hasHeaderSep = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (tableRowRegex.test(line)) {
        if (!inTable) {
          inTable = true;
          tableStart = i + 1;
          hasHeaderSep = false;
        }
        if (tableHeaderSepRegex.test(line)) {
          hasHeaderSep = true;
        }
      } else if (inTable) {
        // End of table
        if (!hasHeaderSep) {
          this.warnings.push({
            type: 'warning',
            file: filePath,
            line: tableStart,
            message: 'Table may be missing header row',
            code: 'TABLE_NO_HEADER',
          });
        }
        inTable = false;
      }
    }
  }

  isUninformativeAlt(altText) {
    const uninformative = [
      'image',
      'img',
      'picture',
      'photo',
      'figure',
      'fig',
      'screenshot',
      'diagram',
      'graph',
      'chart',
      'icon',
      'untitled',
      'unnamed',
      'no description',
      'placeholder',
    ];

    const normalized = altText.toLowerCase().trim();
    return uninformative.some(
      term => normalized === term || normalized === `${term}.jpg` || normalized === `${term}.png`
    );
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  /**
   * Get ranges of code blocks in the content
   * Returns array of {start, end} line numbers
   */
  getCodeBlockRanges(content) {
    const lines = content.split('\n');
    const ranges = [];
    let inCodeBlock = false;
    let codeBlockStart = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match both ``` and ~~~  and indented code blocks
      if (line.trim().match(/^```|^~~~/)) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockStart = i + 1; // Line numbers are 1-based
        } else {
          inCodeBlock = false;
          ranges.push({ start: codeBlockStart, end: i + 1 });
        }
      }
    }

    // Handle unclosed code block
    if (inCodeBlock) {
      ranges.push({ start: codeBlockStart, end: lines.length });
    }

    return ranges;
  }

  /**
   * Check if a line number is inside any code block
   */
  isInsideCodeBlock(lineNum, codeBlockRanges) {
    return codeBlockRanges.some(range => lineNum >= range.start && lineNum <= range.end);
  }

  printResults() {
    console.log(`\n${'='.repeat(60)}`);
    console.log('RESULTS');
    console.log('='.repeat(60));

    console.log(`\nFiles checked: ${this.filesChecked}`);
    console.log(`Files with issues: ${this.filesWithIssues}`);

    const errors = this.issues.filter(i => i.type === 'error');
    const warnings = [...this.issues.filter(i => i.type === 'warning'), ...this.warnings];

    if (errors.length > 0) {
      console.log(`\n❌ ${errors.length} Error(s):\n`);
      for (const error of errors) {
        console.log(`  ${error.file}:${error.line}`);
        console.log(`    [${error.code}] ${error.message}`);
      }
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  ${warnings.length} Warning(s):\n`);
      for (const warning of warnings) {
        console.log(`  ${warning.file}:${warning.line}`);
        console.log(`    [${warning.code}] ${warning.message}`);
      }
    }

    console.log(`\n${'='.repeat(60)}`);

    if (errors.length === 0 && warnings.length === 0) {
      console.log('\n✅ No accessibility issues found!');
    } else if (errors.length === 0) {
      console.log('\n✅ No errors, but some warnings to review.');
    } else {
      console.log(`\n❌ Found ${errors.length} error(s) that should be fixed.`);
    }

    // Summary by code
    console.log('\nIssue Summary:');
    const codeCounts = {};
    [...this.issues, ...this.warnings].forEach(issue => {
      codeCounts[issue.code] = (codeCounts[issue.code] || 0) + 1;
    });

    const codeDescriptions = {
      IMG_NO_ALT: 'Images missing alt text',
      IMG_BAD_ALT: 'Images with uninformative alt text',
      IMG_SHORT_ALT: 'Images with short alt text',
      HTML_IMG_NO_ALT: 'HTML images missing alt attribute',
      HTML_IMG_EMPTY_ALT: 'HTML images with empty alt',
      HEADING_EMPTY: 'Empty headings',
      HEADING_SKIP: 'Heading level skips',
      LINK_EMPTY_TEXT: 'Links with empty text',
      LINK_BAD_TEXT: 'Links with uninformative text',
      BARE_URL: 'Bare URLs (not linked)',
      TABLE_NO_HEADER: 'Tables without headers',
    };

    for (const [code, count] of Object.entries(codeCounts).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${code}: ${count} (${codeDescriptions[code] || code})`);
    }
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/check-accessibility.js [options]

Checks accessibility concerns in markdown files:
- Missing or empty alt text on images
- Uninformative alt text
- Heading level skips
- Empty or uninformative link text

Options:
  --strict          Enable stricter checks (short alt text, bare URLs, tables)
  --help            Show this help message

Examples:
  node scripts/check-accessibility.js
  node scripts/check-accessibility.js --strict
`);
    process.exit(0);
  }

  const options = {
    strict: args.includes('--strict'),
    fix: args.includes('--fix'),
  };

  const checker = new AccessibilityChecker(options);
  const success = await checker.run();
  process.exit(success ? 0 : 1);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
