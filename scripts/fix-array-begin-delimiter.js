#!/usr/bin/env node
/**
 * Fix Extra Delimiter After \begin{array}
 *
 * Automatically fixes LaTeX syntax errors where there's an extra $$ after \begin{array}{...}:
 * - \begin{array}{lll} $$ → \begin{array}{lll}
 *
 * Usage:
 *   node scripts/fix-array-begin-delimiter.js           # Dry-run (show changes)
 *   node scripts/fix-array-begin-delimiter.js --apply   # Apply changes
 *   node scripts/fix-array-begin-delimiter.js --file <filename>  # Fix specific file
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
const applyChanges = args.includes('--apply');
const specificFile = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const verbose = args.includes('--verbose') || args.includes('-v');

class ArrayBeginDelimiterFixer {
  constructor() {
    this.stats = {
      filesScanned: 0,
      filesModified: 0,
      totalFixes: 0,
    };
  }

  /**
   * Fix extra delimiters after \begin{array} in a single file
   */
  fixFile(filepath) {
    this.stats.filesScanned++;

    const content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath);
    let newContent = content;
    let fileFixCount = 0;

    // Pattern: \begin{array}{...} $$ → \begin{array}{...}
    // We need to be careful to match the pattern exactly
    const pattern = /\\begin\{array\}\{[^}]*\}\s*\$\$/g;

    const matches = [];
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      matches.push({
        line: lineNum,
        original: match[0],
        position: match.index,
      });
    }

    if (matches.length > 0) {
      // Replace all occurrences
      newContent = content.replace(
        /\\begin\{array\}\{([^}]*)\}\s*\$\$/g,
        '\\begin{array}{$1}'
      );

      fileFixCount = matches.length;
      this.stats.filesModified++;
      this.stats.totalFixes += fileFixCount;

      console.log(chalk.yellow(`\n${applyChanges ? '✓' : '•'} ${filename}: ${fileFixCount} fix(es)`));

      if (verbose) {
        matches.forEach(m => {
          console.log(chalk.gray(`   Line ${m.line}: ${m.original}`));
        });
      } else {
        console.log(chalk.gray(`   ${fileFixCount}× removed extra $$ after \\begin{array}`));
      }

      if (applyChanges) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        console.log(chalk.green(`   Changes written to ${filename}`));
      }

      return { filename, fixes: fileFixCount };
    }

    return null;
  }

  /**
   * Fix all markdown files
   */
  fixAllFiles() {
    console.log(chalk.cyan.bold('\n🔧 Array Begin Delimiter Fixer\n'));
    console.log(chalk.cyan(`Mode: ${applyChanges ? 'APPLY CHANGES' : 'DRY RUN'}\n`));

    const files = specificFile
      ? [path.join(contentsDir, specificFile)]
      : fs.readdirSync(contentsDir)
          .filter(f => f.endsWith('.md'))
          .map(f => path.join(contentsDir, f))
          .sort();

    console.log(chalk.cyan(`Processing ${files.length} files...\n`));

    const modifiedFiles = [];

    files.forEach(filepath => {
      if (fs.existsSync(filepath)) {
        const result = this.fixFile(filepath);
        if (result) {
          modifiedFiles.push(result);
        }
      }
    });

    this.printSummary(modifiedFiles);

    return modifiedFiles.length;
  }

  /**
   * Print summary statistics
   */
  printSummary(modifiedFiles) {
    console.log('\n' + chalk.cyan('='.repeat(60)));
    console.log(chalk.cyan.bold('SUMMARY'));
    console.log(chalk.cyan('='.repeat(60)));

    console.log(`Files scanned:       ${this.stats.filesScanned}`);
    console.log(`Files modified:      ${this.stats.filesModified}`);
    console.log(`Total fixes:         ${this.stats.totalFixes}`);

    if (this.stats.filesModified === 0) {
      console.log(chalk.green('\n✅ No extra delimiters after \\begin{array} found!'));
    } else {
      if (applyChanges) {
        console.log(chalk.green(`\n✅ Fixed ${this.stats.totalFixes} extra delimiter(s) in ${this.stats.filesModified} files.`));
      } else {
        console.log(chalk.yellow(`\n⚠️  Found ${this.stats.totalFixes} extra delimiter(s) in ${this.stats.filesModified} files.`));
        console.log(chalk.gray('\nRun with --apply to fix these issues.'));
      }
    }

    console.log('');
  }
}

// Run the fixer
const fixer = new ArrayBeginDelimiterFixer();
const modifiedCount = fixer.fixAllFiles();

process.exit(0);
