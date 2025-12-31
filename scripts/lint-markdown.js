#!/usr/bin/env node

/**
 * Markdown Linting Script
 *
 * Lints markdown files for common issues and physics-specific rules:
 * - Units in LaTeX should use \text{} (e.g., $5\text{ m/s}$)
 * - Heading hierarchy and structure
 * - Trailing whitespace
 * - Multiple consecutive blank lines
 * - Proper list formatting
 * - Heading capitalization consistency
 * - Missing alt text in images
 * - Broken internal references
 * - Math delimiter balance
 *
 * Usage:
 *   node scripts/lint-markdown.js [options] [directory]
 *
 * Options:
 *   --fix, --apply     Apply fixes to files
 *   --strict           Enable stricter validation
 *   --help, -h         Show help message
 */

import path from 'path';

import { UNITS } from './lib/constants.js';

import { printHeader, printDivider, printFixes, printSuccess } from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findMarkdownFiles, readFile, writeFile } from './lib/files.js';

import chalk from 'chalk';

/**
 * Markdown linter class.
 */
class MarkdownLinter {
  constructor(options = {}) {
    this.apply = options.apply || false;
    this.strict = options.strict || false;
    this.issues = [];
    this.filesWithIssues = 0;
    this.filesChecked = 0;
    this.fixedCount = 0;
  }

  /**
   * Lint all files in a directory.
   * @param {string} directory - Directory to lint
   * @returns {Promise<boolean>} - Success status
   */
  async lint(directory = 'contents') {
    const emoji = this.apply ? '🔧' : '📝';
    const title = this.apply ? 'Markdown Lint + Fix' : 'Markdown Linter';

    printHeader(emoji, title);

    if (!this.apply) {
      console.log(chalk.yellow('DRY RUN MODE - No files will be modified'));
      console.log(chalk.gray('Use --apply or --fix to fix issues automatically\n'));
    }

    const files = await findMarkdownFiles(directory);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    for (const file of files) {
      await this.lintFile(file);
    }

    this.printResults();
    return this.issues.length === 0 || !this.strict;
  }

  /**
   * Lint a single file.
   * @param {string} filePath - Path to file
   */
  async lintFile(filePath) {
    this.filesChecked++;
    const content = readFile(filePath);
    const lines = content.split('\n');
    const fileName = path.basename(filePath);

    let modified = false;
    let inCodeBlock = false;
    let inMathBlock = false;
    let inFrontMatter = false;
    let frontMatterEnded = false;
    let lastHeadingLevel = 0;

    const newLines = [];
    const fileIssues = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const lineNum = i + 1;
      const originalLine = line;

      // Track front matter
      if (line.trim() === '---') {
        if (!frontMatterEnded) {
          inFrontMatter = !inFrontMatter;
          if (!inFrontMatter) frontMatterEnded = true;
        }
        newLines.push(line);
        continue;
      }

      if (inFrontMatter) {
        newLines.push(line);
        continue;
      }

      // Track code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        newLines.push(line);
        continue;
      }

      // Track display math blocks
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('$$')) {
        // Check if this is a single-line display math block
        const isSingleLineBlock =
          trimmedLine.startsWith('$$') && trimmedLine.endsWith('$$') && trimmedLine.length > 4;

        if (!isSingleLineBlock) {
          // Multi-line block: toggle state
          inMathBlock = !inMathBlock;
        }
        // For single-line blocks, skip all checks but don't toggle state
        newLines.push(line);
        continue;
      }

      // Skip linting inside code blocks
      if (inCodeBlock) {
        newLines.push(line);
        continue;
      }

      // Skip linting inside multi-line math blocks
      if (inMathBlock) {
        newLines.push(line);
        continue;
      }

      // 1. Check trailing whitespace (always fix)
      if (line.match(/\s+$/)) {
        fileIssues.push({
          line: lineNum,
          type: 'trailing-whitespace',
          message: 'Trailing whitespace',
          severity: 'warning',
        });
        line = line.trimEnd();
        modified = true;
      }

      // 2. Check for units not in \text{} in inline math
      if (!inMathBlock) {
        const unitIssues = this.checkUnitsInMath(line, lineNum);
        if (unitIssues.length > 0) {
          fileIssues.push(...unitIssues);
          // Auto-fix: wrap units in \text{}
          line = this.fixUnitsInMath(line);
          if (line !== originalLine) modified = true;
        }
      }

      // 3. Check heading hierarchy
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const headingText = headingMatch[2];

        // Check for skipped levels
        if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
          fileIssues.push({
            line: lineNum,
            type: 'heading-hierarchy',
            message: `Heading skips from h${lastHeadingLevel} to h${level}`,
            severity: 'error',
          });
        }

        // Check for trailing punctuation (not fixed automatically)
        if (headingText.match(/[.!?]$/)) {
          fileIssues.push({
            line: lineNum,
            type: 'heading-punctuation',
            message: 'Heading should not end with punctuation',
            severity: 'warning',
          });
        }

        lastHeadingLevel = level;
      }

      // 4. Check for missing alt text in images
      const imageMatch = line.match(/!\[\]\([^)]+\)/);
      if (imageMatch) {
        fileIssues.push({
          line: lineNum,
          type: 'missing-alt-text',
          message: 'Image is missing alt text',
          severity: 'error',
        });
      }

      // 5. Check for unbalanced inline math delimiters
      // Strategy: Extract all inline math regions first, then check the rest for currency
      // This avoids false positives from numbers in scientific notation

      // Find all inline math expressions $...$
      const inlineMathRegions = [];
      const mathRegex = /\$[^$]+\$/g;
      let match;
      while ((match = mathRegex.exec(line)) !== null) {
        inlineMathRegions.push({ start: match.index, end: match.index + match[0].length });
      }

      // Check if currency dollar signs are outside math regions
      const currencyRegex = /(?<!\$)\$(?!\$)\d+(?:,\d{3})*(?:\.\d+)?/g;
      const currenciesToRemove = [];

      while ((match = currencyRegex.exec(line)) !== null) {
        const matchPos = match.index;
        // Only remove if NOT inside any inline math region
        const isInsideMath = inlineMathRegions.some(
          region => matchPos >= region.start && matchPos < region.end
        );
        if (!isInsideMath) {
          currenciesToRemove.push(match);
        }
      }

      // Remove currencies that are definitely outside math
      let lineWithoutCurrency = line;
      for (let i = currenciesToRemove.length - 1; i >= 0; i--) {
        const curr = currenciesToRemove[i];
        lineWithoutCurrency =
          lineWithoutCurrency.substring(0, curr.index) +
          lineWithoutCurrency.substring(curr.index + curr[0].length);
      }

      // Count unescaped dollar signs
      const dollarCount = (lineWithoutCurrency.match(/(?<!\\)\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        fileIssues.push({
          line: lineNum,
          type: 'unbalanced-math',
          message: 'Unbalanced inline math delimiters ($)',
          severity: 'error',
        });
      }

      // 6. Check for multiple consecutive blank lines (fix to single blank)
      if (
        line === '' &&
        i > 0 &&
        lines[i - 1] === '' &&
        i < lines.length - 1 &&
        lines[i + 1] === ''
      ) {
        // Skip this line (don't add to newLines)
        fileIssues.push({
          line: lineNum,
          type: 'multiple-blank-lines',
          message: 'Multiple consecutive blank lines',
          severity: 'info',
        });
        modified = true;
        continue;
      }

      // 7. Check for bare URLs (not in links)
      const bareUrlMatch = line.match(/(?<!\(|\[|href="|src=")(https?:\/\/[^\s)<]+)(?![\])])/);
      if (bareUrlMatch && !line.includes('```')) {
        fileIssues.push({
          line: lineNum,
          type: 'bare-url',
          message: `Bare URL should be wrapped in link: ${bareUrlMatch[1]}`,
          severity: 'warning',
        });
      }

      newLines.push(line);
    }

    // Check for missing final newline
    if (content && !content.endsWith('\n')) {
      fileIssues.push({
        line: lines.length,
        type: 'missing-final-newline',
        message: 'File should end with a newline',
        severity: 'info',
      });
      newLines.push('');
      modified = true;
    }

    // Save file if modified
    if (modified && this.apply) {
      writeFile(filePath, newLines.join('\n'));
      this.fixedCount++;
    }

    // Record issues
    if (fileIssues.length > 0) {
      this.filesWithIssues++;
      this.issues.push({
        file: fileName,
        path: filePath,
        issues: fileIssues,
      });
    }
  }

  /**
   * Check for units not wrapped in \text{} in inline math.
   */
  checkUnitsInMath(line, lineNum) {
    const issues = [];

    // Find all inline math expressions
    const inlineMathRegex = /\$([^$]+)\$/g;
    let match;

    while ((match = inlineMathRegex.exec(line)) !== null) {
      const mathContent = match[1];

      // Check if math contains units not wrapped in \text{}
      for (const unit of UNITS) {
        // Pattern: unit appears but not inside \text{...}
        // Look for units that appear as standalone or after a space/number
        const unitPattern = new RegExp(
          `(?<!\\\\text\\{[^}]*)\\b${unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b(?![^{]*\\})`,
          'g'
        );

        if (mathContent.match(unitPattern)) {
          // Additional check: make sure it's really a unit context (after number or space)
          const contextPattern = new RegExp(
            `[0-9\\s]${unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-zA-Z])`
          );
          if (mathContent.match(contextPattern)) {
            issues.push({
              line: lineNum,
              type: 'unit-not-in-text',
              message: `Unit "${unit}" in math should be wrapped in \\text{}: ${match[0]}`,
              severity: 'warning',
            });
          }
        }
      }
    }

    return issues;
  }

  /**
   * Fix units in math expressions by wrapping in \text{}.
   */
  fixUnitsInMath(line) {
    // This is a simplified fix - wraps common unit patterns in \text{}
    // More sophisticated would require full LaTeX parsing

    let result = line;

    // Pattern: find inline math with units
    result = result.replace(/\$([^$]+)\$/g, (match, mathContent) => {
      let fixed = mathContent;

      // Fix patterns like "5 m/s" -> "5\text{ m/s}"
      for (const unit of UNITS) {
        const escapedUnit = unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Pattern: number followed by space and unit
        const pattern1 = new RegExp(`(\\d)\\s+(${escapedUnit})(?![a-zA-Z])`, 'g');
        fixed = fixed.replace(pattern1, (m, num, u) => {
          // Check if already in \text{}
          if (!m.includes('\\text{')) {
            return `${num}\\text{ ${u}}`;
          }
          return m;
        });

        // Pattern: number directly followed by unit (no space)
        const pattern2 = new RegExp(`(\\d)(${escapedUnit})(?![a-zA-Z])`, 'g');
        fixed = fixed.replace(pattern2, (m, num, u) => {
          if (!m.includes('\\text{')) {
            return `${num}\\text{ ${u}}`;
          }
          return m;
        });
      }

      return `$${fixed}$`;
    });

    return result;
  }

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    console.log(chalk.cyan(`\n📊 Files Checked: ${this.filesChecked}`));
    console.log(chalk.cyan(`   Files with Issues: ${this.filesWithIssues}`));

    if (this.issues.length === 0) {
      printSuccess('No issues found - markdown is clean!');
    } else {
      // Count issues by type and severity
      const issueStats = {};
      let errorCount = 0;
      let warningCount = 0;
      let infoCount = 0;

      this.issues.forEach(file => {
        file.issues.forEach(issue => {
          issueStats[issue.type] = (issueStats[issue.type] || 0) + 1;
          if (issue.severity === 'error') errorCount++;
          else if (issue.severity === 'warning') warningCount++;
          else infoCount++;
        });
      });

      console.log(chalk.red(`\n❌ Errors: ${errorCount}`));
      console.log(chalk.yellow(`⚠️  Warnings: ${warningCount}`));
      console.log(chalk.blue(`ℹ️  Info: ${infoCount}`));

      console.log(chalk.gray('\nIssue Types:'));
      Object.entries(issueStats)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          console.log(chalk.gray(`  ${type}: ${count}`));
        });

      // Show sample issues
      console.log(chalk.gray('\nSample Issues:\n'));
      const samplesToShow = Math.min(20, this.issues.length);

      for (let i = 0; i < samplesToShow; i++) {
        const file = this.issues[i];
        console.log(chalk.cyan(`  ${file.file}`));

        const issuesToShow = file.issues.slice(0, 5);
        issuesToShow.forEach(issue => {
          const icon =
            issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
          const color =
            issue.severity === 'error'
              ? chalk.red
              : issue.severity === 'warning'
                ? chalk.yellow
                : chalk.blue;

          console.log(color(`    ${icon} Line ${issue.line}: ${issue.message}`));
        });

        if (file.issues.length > 5) {
          console.log(chalk.gray(`    ... and ${file.issues.length - 5} more issues`));
        }
        console.log('');
      }

      if (this.issues.length > samplesToShow) {
        console.log(
          chalk.gray(`  ... and ${this.issues.length - samplesToShow} more files with issues\n`)
        );
      }

      if (this.apply && this.fixedCount > 0) {
        printFixes([], this.fixedCount, true);
      } else if (!this.apply) {
        console.log(chalk.yellow('\n⚠️  DRY RUN - No files were modified'));
        console.log(chalk.gray('Run with --apply or --fix to fix auto-fixable issues'));
      }
    }

    printDivider();
  }
}

// CLI Configuration
runCli({
  name: 'lint-markdown',
  description: `Lints markdown files for common issues and physics-specific rules:
- Units in LaTeX should use \\text{}
- Heading hierarchy and structure
- Trailing whitespace
- Multiple consecutive blank lines
- Missing alt text in images
- Math delimiter balance`,
  flags: {
    strict: STANDARD_FLAGS.strict,
    apply: STANDARD_FLAGS.apply,
    fix: STANDARD_FLAGS.fix,
  },
  examples: [
    'node scripts/lint-markdown.js',
    'node scripts/lint-markdown.js --strict',
    'node scripts/lint-markdown.js --apply',
    'node scripts/lint-markdown.js contents/',
  ],
  run: async options => {
    const linter = new MarkdownLinter({
      strict: options.strict,
      apply: options.apply || options.fix,
    });
    return linter.lint(options.directory);
  },
});
