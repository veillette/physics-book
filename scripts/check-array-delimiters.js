#!/usr/bin/env node
/**
 * Check for LaTeX Array Delimiter Issues
 *
 * Detects common patterns of incorrect delimiter placement in LaTeX arrays:
 * - \begin{array}{...} $$ (extra $$ after begin)
 * - \end{array} $$ $$ (extra $$ pair after end)
 * - $$ \begin{array}{} (empty array specifier)
 * - Unbalanced delimiters in arrays
 *
 * Usage:
 *   node scripts/check-array-delimiters.js           # Check all files
 *   node scripts/check-array-delimiters.js --file <filename>  # Check specific file
 *   node scripts/check-array-delimiters.js --fix     # Auto-fix issues (requires --apply)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentsDir = path.resolve(__dirname, '../contents');
const args = process.argv.slice(2);
const specificFile = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const verbose = args.includes('--verbose') || args.includes('-v');

class ArrayDelimiterChecker {
  constructor() {
    this.stats = {
      filesScanned: 0,
      filesWithIssues: 0,
      totalIssues: 0,
      issuesByType: {},
    };
  }

  /**
   * Check a single file for array delimiter issues
   */
  checkFile(filepath) {
    this.stats.filesScanned++;

    const content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath);
    const issues = [];

    // Pattern 1: \begin{array}{...} $$ (extra $$ after begin)
    const beginArrayPattern = /\\begin\{array\}\{[^}]*\}\s*\$\$/g;
    let match;
    while ((match = beginArrayPattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({
        type: 'extra-delimiter-after-begin',
        line: lineNum,
        match: match[0],
        position: match.index,
      });
    }

    // Pattern 2: \end{array} $$ $$ (double $$ after end)
    const endArrayDoublePattern = /\\end\{array\}\s*\$\$\s*\$\$/g;
    while ((match = endArrayDoublePattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({
        type: 'double-delimiter-after-end',
        line: lineNum,
        match: match[0],
        position: match.index,
      });
    }

    // Pattern 3: \begin{array}{} (empty array specifier)
    const emptyArrayPattern = /\\begin\{array\}\{\}/g;
    while ((match = emptyArrayPattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({
        type: 'empty-array-specifier',
        line: lineNum,
        match: match[0],
        position: match.index,
      });
    }

    // Pattern 4: Space in subscripts/superscripts: _ { or ^ {
    const subscriptSpacePattern = /[_^]\s+\{/g;
    while ((match = subscriptSpacePattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({
        type: 'space-in-subscript-superscript',
        line: lineNum,
        match: match[0],
        position: match.index,
      });
    }

    // Pattern 5: Check for arrays with unbalanced delimiters
    const arrayBlockPattern = /\$\$ \\begin\{array\}.*?\\end\{array\}.*?\$\$/gs;
    while ((match = arrayBlockPattern.exec(content)) !== null) {
      const block = match[0];
      const dollarCount = (block.match(/\$\$/g) || []).length;

      // Should have exactly 2 $$ (opening and closing)
      if (dollarCount !== 2) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        issues.push({
          type: 'unbalanced-array-delimiters',
          line: lineNum,
          match: block.substring(0, 80) + (block.length > 80 ? '...' : ''),
          count: dollarCount,
        });
      }
    }

    if (issues.length > 0) {
      this.stats.filesWithIssues++;
      this.stats.totalIssues += issues.length;

      issues.forEach(issue => {
        this.stats.issuesByType[issue.type] = (this.stats.issuesByType[issue.type] || 0) + 1;
      });

      console.log(chalk.yellow(`\n❌ ${filename}: ${issues.length} issue(s)`));

      if (verbose) {
        issues.forEach(issue => {
          console.log(chalk.gray(`   Line ${issue.line}: ${issue.type}`));
          console.log(chalk.gray(`     ${issue.match.substring(0, 80)}`));
        });
      } else {
        // Group by type
        const byType = {};
        issues.forEach(issue => {
          byType[issue.type] = (byType[issue.type] || 0) + 1;
        });
        Object.entries(byType).forEach(([type, count]) => {
          console.log(chalk.gray(`   ${count}× ${type}`));
        });
      }

      return { filename, issues };
    }

    return null;
  }

  /**
   * Check all markdown files
   */
  checkAllFiles() {
    console.log(chalk.cyan.bold('\n🔍 Array Delimiter Checker\n'));

    const files = specificFile
      ? [path.join(contentsDir, specificFile)]
      : fs.readdirSync(contentsDir)
          .filter(f => f.endsWith('.md'))
          .map(f => path.join(contentsDir, f))
          .sort();

    console.log(chalk.cyan(`Checking ${files.length} files...\n`));

    const filesWithIssues = [];

    files.forEach(filepath => {
      if (fs.existsSync(filepath)) {
        const result = this.checkFile(filepath);
        if (result) {
          filesWithIssues.push(result);
        }
      }
    });

    this.printSummary(filesWithIssues);

    return filesWithIssues.length;
  }

  /**
   * Print summary statistics
   */
  printSummary(filesWithIssues) {
    console.log('\n' + chalk.cyan('='.repeat(60)));
    console.log(chalk.cyan.bold('SUMMARY'));
    console.log(chalk.cyan('='.repeat(60)));

    console.log(`Files scanned:       ${this.stats.filesScanned}`);
    console.log(`Files with issues:   ${this.stats.filesWithIssues}`);
    console.log(`Total issues:        ${this.stats.totalIssues}`);

    if (Object.keys(this.stats.issuesByType).length > 0) {
      console.log('\nIssues by type:');
      Object.entries(this.stats.issuesByType)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });
    }

    if (this.stats.filesWithIssues === 0) {
      console.log(chalk.green('\n✅ No array delimiter issues found!'));
    } else {
      console.log(chalk.yellow(`\n⚠️  Found issues in ${this.stats.filesWithIssues} files.`));
      console.log(chalk.gray('\nRun with --verbose to see detailed line information.'));
    }

    console.log('');
  }
}

// Run the checker
const checker = new ArrayDelimiterChecker();
const issueCount = checker.checkAllFiles();

process.exit(issueCount > 0 ? 1 : 0);
