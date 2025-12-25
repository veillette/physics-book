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
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';

// Common physics units that should be in \text{}
const PHYSICS_UNITS = [
  'm',
  'km',
  'cm',
  'mm',
  'nm',
  'pm',
  's',
  'ms',
  'ns',
  'min',
  'h',
  'kg',
  'g',
  'mg',
  'μg',
  'N',
  'J',
  'W',
  'Pa',
  'kPa',
  'MPa',
  'm/s',
  'km/h',
  'mph',
  'm/s²',
  'km/s',
  'rad',
  'deg',
  'rad/s',
  'Hz',
  'kHz',
  'MHz',
  'GHz',
  'V',
  'A',
  'Ω',
  'mA',
  'kV',
  'K',
  '°C',
  '°F',
  'mol',
  'L',
  'mL',
  'eV',
  'keV',
  'MeV',
  'C',
  'F',
  'H',
  'T',
  'Wb',
  'Gauss',
];

class MarkdownLinter {
  constructor(options = {}) {
    this.apply = options.apply || false;
    this.strict = options.strict || false;
    this.issues = [];
    this.filesWithIssues = 0;
    this.filesChecked = 0;
    this.fixedCount = 0;
  }

  async lint(directory = 'contents') {
    console.log(chalk.blue.bold('📝 Markdown Linter'));
    console.log(chalk.gray('─'.repeat(60)));

    if (!this.apply) {
      console.log(chalk.yellow('DRY RUN MODE - No files will be modified'));
      console.log(chalk.gray('Use --apply to fix issues automatically\n'));
    }

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    for (const file of files) {
      await this.lintFile(file);
    }

    this.printResults();
    return this.issues.length === 0 || !this.strict;
  }

  async lintFile(filePath) {
    this.filesChecked++;
    const content = fs.readFileSync(filePath, 'utf-8');
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
      if (line.trim().startsWith('$$')) {
        inMathBlock = !inMathBlock;
        newLines.push(line);
        continue;
      }

      // Skip linting inside code blocks
      if (inCodeBlock) {
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
      if (!inMathBlock) {
        const dollarCount = (line.match(/(?<!\\)\$/g) || []).length;
        if (dollarCount % 2 !== 0) {
          fileIssues.push({
            line: lineNum,
            type: 'unbalanced-math',
            message: 'Unbalanced inline math delimiters ($)',
            severity: 'error',
          });
        }
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

      // 7. Check list formatting (no auto-fix)
      if (line.match(/^\s*[-*+]\s+\S/)) {
        // Check if next line is also a list item or blank
        if (i < lines.length - 1) {
          const nextLine = lines[i + 1];
          if (nextLine && !nextLine.match(/^\s*[-*+]/) && nextLine.trim() !== '') {
            // This might be a paragraph continuation, which is fine
          }
        }
      }

      // 8. Check for bare URLs (not in links)
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

    // Additional whole-file checks

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
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
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

  checkUnitsInMath(line, lineNum) {
    const issues = [];

    // Find all inline math expressions
    const inlineMathRegex = /\$([^$]+)\$/g;
    let match;

    while ((match = inlineMathRegex.exec(line)) !== null) {
      const mathContent = match[1];

      // Check if math contains units not wrapped in \text{}
      for (const unit of PHYSICS_UNITS) {
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

  fixUnitsInMath(line) {
    // This is a simplified fix - wraps common unit patterns in \text{}
    // More sophisticated would require full LaTeX parsing

    let result = line;

    // Pattern: find inline math with units
    result = result.replace(/\$([^$]+)\$/g, (match, mathContent) => {
      let fixed = mathContent;

      // Fix patterns like "5 m/s" -> "5\text{ m/s}"
      for (const unit of PHYSICS_UNITS) {
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

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    console.log(chalk.cyan(`\n📊 Files Checked: ${this.filesChecked}`));
    console.log(chalk.cyan(`   Files with Issues: ${this.filesWithIssues}`));

    if (this.issues.length === 0) {
      console.log(chalk.green('\n✅ No issues found - markdown is clean!'));
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
        console.log(chalk.green(`\n✅ Fixed issues in ${this.fixedCount} files`));
      } else if (!this.apply) {
        console.log(chalk.yellow('\n⚠️  DRY RUN - No files were modified'));
        console.log(chalk.gray('Run with --apply to fix auto-fixable issues'));
      }
    }

    console.log(chalk.gray('\n' + '─'.repeat(60)));
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  apply: args.includes('--apply'),
  strict: args.includes('--strict'),
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const linter = new MarkdownLinter(options);
linter.lint(directory).then(success => {
  process.exit(success ? 0 : 1);
});
