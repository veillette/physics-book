#!/usr/bin/env node

/**
 * Accessibility Checker Script
 *
 * Checks accessibility concerns in markdown files:
 * - Missing or empty alt text on images
 * - Alt text that is too short or uninformative
 * - Heading level skips (e.g., h1 -> h3)
 * - Empty links
 * - Links with uninformative text ("click here", "read more")
 *
 * Usage:
 *   node scripts/check-accessibility.js [options]
 *
 * Options:
 *   --strict          Enable stricter checks
 *   --help            Show this help message
 */

import {
  UNINFORMATIVE_ALT_TEXT,
  UNINFORMATIVE_LINK_TEXT,
  DEFAULT_GLOB_PATTERNS,
} from './lib/constants.js';

import {
  getCodeBlockRanges,
  isInsideCodeBlock,
  getLineNumber,
  parseHeading,
} from './lib/parser.js';

import {
  printHeader,
  printDivider,
  printFileCount,
  printStrictModeNotice,
  printErrors,
  printWarnings,
  printSuccess,
  printSummary,
  printIssueSummary,
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findFiles, readFile, getBaseDir } from './lib/files.js';

import path from 'path';

/**
 * Accessibility checker class.
 */
class AccessibilityChecker {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.baseDir = getBaseDir(import.meta.url);
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
    this.filesWithIssues = 0;
  }

  /**
   * Run the accessibility check.
   * @returns {Promise<boolean>} - Success status
   */
  async run() {
    printHeader('♿', 'Accessibility Check');

    if (this.strict) {
      printStrictModeNotice();
    }

    const files = await findFiles(DEFAULT_GLOB_PATTERNS.markdown, {
      cwd: this.baseDir,
      ignore: DEFAULT_GLOB_PATTERNS.ignore,
    });

    printFileCount(files.length);

    for (const file of files) {
      await this.checkFile(file);
    }

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * Check a single file for accessibility issues.
   * @param {string} filePath - Path to file
   */
  async checkFile(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    const content = readFile(fullPath);
    const lines = content.split('\n');

    this.filesChecked++;
    const fileIssues = [];

    // Check images
    this.checkImages(content, filePath, fileIssues);

    // Check headings
    this.checkHeadings(content, filePath, fileIssues);

    // Check links
    this.checkLinks(content, filePath, fileIssues);

    // Check tables (strict mode only)
    if (this.strict) {
      this.checkTables(content, filePath, lines, fileIssues);
    }

    if (fileIssues.length > 0) {
      this.filesWithIssues++;
      // Separate errors and warnings
      for (const issue of fileIssues) {
        if (issue.severity === 'error') {
          this.errors.push(issue);
        } else {
          this.warnings.push(issue);
        }
      }
    }
  }

  /**
   * Check images for accessibility issues.
   */
  checkImages(content, filePath, fileIssues) {
    const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    const codeBlockRanges = getCodeBlockRanges(content);
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      const [, altText, src] = match;
      const lineNum = getLineNumber(content, match.index);

      if (isInsideCodeBlock(lineNum, codeBlockRanges)) continue;

      if (!altText || altText.trim() === '') {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Image missing alt text: ${src}`,
          code: 'IMG_NO_ALT',
          severity: 'error',
        });
      } else if (this.isUninformativeAlt(altText)) {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Image has uninformative alt text "${altText}": ${src}`,
          code: 'IMG_BAD_ALT',
          severity: 'warning',
        });
      } else if (this.strict && altText.trim().length < 10) {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Image alt text may be too short "${altText}": ${src}`,
          code: 'IMG_SHORT_ALT',
          severity: 'warning',
        });
      }
    }

    // Check HTML images
    const htmlImgRegex = /<img[^>]*>/gi;
    while ((match = htmlImgRegex.exec(content)) !== null) {
      const imgTag = match[0];
      const lineNum = getLineNumber(content, match.index);

      if (isInsideCodeBlock(lineNum, codeBlockRanges)) continue;

      const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
      if (!altMatch) {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: 'HTML image missing alt attribute',
          code: 'HTML_IMG_NO_ALT',
          severity: 'error',
        });
      } else if (altMatch[1].trim() === '') {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: 'HTML image has empty alt attribute',
          code: 'HTML_IMG_EMPTY_ALT',
          severity: 'error',
        });
      }
    }
  }

  /**
   * Check headings for accessibility issues.
   */
  checkHeadings(content, filePath, fileIssues) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const codeBlockRanges = getCodeBlockRanges(content);
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const lineNum = getLineNumber(content, match.index);

      if (isInsideCodeBlock(lineNum, codeBlockRanges)) continue;

      headings.push({ level, text, lineNum });

      if (!text || text === '') {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Empty heading (h${level})`,
          code: 'HEADING_EMPTY',
          severity: 'error',
        });
      }
    }

    // Check for heading level skips
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1];
      const curr = headings[i];

      if (curr.level > prev.level && curr.level - prev.level > 1) {
        fileIssues.push({
          file: filePath,
          line: curr.lineNum,
          message: `Heading level skip: h${prev.level} -> h${curr.level}`,
          code: 'HEADING_SKIP',
          severity: 'warning',
        });
      }
    }
  }

  /**
   * Check links for accessibility issues.
   */
  checkLinks(content, filePath, fileIssues) {
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    const codeBlockRanges = getCodeBlockRanges(content);
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const [, linkText, url] = match;
      const lineNum = getLineNumber(content, match.index);

      // Skip image links
      if (content[match.index - 1] === '!') continue;

      if (isInsideCodeBlock(lineNum, codeBlockRanges)) continue;

      if (!linkText || linkText.trim() === '') {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Link has empty text: ${url}`,
          code: 'LINK_EMPTY_TEXT',
          severity: 'error',
        });
      } else if (UNINFORMATIVE_LINK_TEXT.includes(linkText.toLowerCase().trim())) {
        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Link has uninformative text "${linkText}": ${url}`,
          code: 'LINK_BAD_TEXT',
          severity: 'warning',
        });
      }
    }

    // Check for bare URLs (strict mode)
    if (this.strict) {
      const bareUrlRegex = /(?<!\(|<)https?:\/\/[^\s)>\]]+(?!\))/g;
      while ((match = bareUrlRegex.exec(content)) !== null) {
        const lineNum = getLineNumber(content, match.index);

        if (isInsideCodeBlock(lineNum, codeBlockRanges)) continue;

        fileIssues.push({
          file: filePath,
          line: lineNum,
          message: `Bare URL (not linked): ${match[0].substring(0, 50)}...`,
          code: 'BARE_URL',
          severity: 'warning',
        });
      }
    }
  }

  /**
   * Check tables for accessibility issues.
   */
  checkTables(content, filePath, lines, fileIssues) {
    const tableRowRegex = /^\|[^|]+\|/;
    const tableHeaderSepRegex = /^\|[\s:-]+\|/;

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
        if (!hasHeaderSep) {
          fileIssues.push({
            file: filePath,
            line: tableStart,
            message: 'Table may be missing header row',
            code: 'TABLE_NO_HEADER',
            severity: 'warning',
          });
        }
        inTable = false;
      }
    }
  }

  /**
   * Check if alt text is uninformative.
   */
  isUninformativeAlt(altText) {
    const normalized = altText.toLowerCase().trim();
    return UNINFORMATIVE_ALT_TEXT.some(
      term => normalized === term || normalized === `${term}.jpg` || normalized === `${term}.png`
    );
  }

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    console.log(`\nFiles checked: ${this.filesChecked}`);
    console.log(`Files with issues: ${this.filesWithIssues}`);

    printErrors(this.errors);
    printWarnings(this.warnings);

    printDivider();

    if (this.errors.length === 0 && this.warnings.length === 0) {
      printSuccess('No accessibility issues found!');
    } else if (this.errors.length === 0) {
      printSuccess('No errors, but some warnings to review.');
    } else {
      console.log(`\n❌ Found ${this.errors.length} error(s) that should be fixed.`);
    }

    // Issue summary
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

    printIssueSummary([...this.errors, ...this.warnings], codeDescriptions);
  }
}

// CLI Configuration
runCli({
  name: 'check-accessibility',
  description: `Checks accessibility concerns in markdown files:
- Missing or empty alt text on images
- Uninformative alt text
- Heading level skips
- Empty or uninformative link text`,
  flags: {
    strict: STANDARD_FLAGS.strict,
  },
  examples: ['node scripts/check-accessibility.js', 'node scripts/check-accessibility.js --strict'],
  run: async options => {
    const checker = new AccessibilityChecker({
      strict: options.strict,
    });
    return checker.run();
  },
});
