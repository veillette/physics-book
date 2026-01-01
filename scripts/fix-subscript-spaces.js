#!/usr/bin/env node
/**
 * Fix Space-in-Subscript-Superscript Issues
 *
 * Automatically fixes LaTeX syntax errors where there's a space between
 * subscript/superscript operators and their arguments:
 * - _ { → _{
 * - ^ { → ^{
 *
 * Usage:
 *   node scripts/fix-subscript-spaces.js           # Dry-run (show changes)
 *   node scripts/fix-subscript-spaces.js --apply   # Apply changes
 *   node scripts/fix-subscript-spaces.js --file <filename>  # Fix specific file
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

class SubscriptSpaceFixer {
  constructor() {
    this.stats = {
      filesScanned: 0,
      filesModified: 0,
      totalFixes: 0,
      fixesByType: {
        subscript: 0,
        superscript: 0,
      },
    };
  }

  /**
   * Fix subscript/superscript spaces in a single file
   */
  fixFile(filepath) {
    this.stats.filesScanned++;

    const content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath);
    let newContent = content;
    let fileFixCount = 0;

    // Fix subscript spaces: _ { → _{
    const subscriptBefore = (newContent.match(/_ +\{/g) || []).length;
    newContent = newContent.replace(/_ +\{/g, '_{');
    let subscriptFixed = subscriptBefore;

    // Fix subscript with newline: _\n{ → _{
    const subscriptNewlineBefore = (newContent.match(/_\s*\n\s*\{/g) || []).length;
    newContent = newContent.replace(/_\s*\n\s*\{/g, '_{');
    subscriptFixed += subscriptNewlineBefore;

    this.stats.fixesByType.subscript += subscriptFixed;
    fileFixCount += subscriptFixed;

    // Fix superscript spaces: ^ { → ^{
    const superscriptBefore = (newContent.match(/\^ +\{/g) || []).length;
    newContent = newContent.replace(/\^ +\{/g, '^{');
    let superscriptFixed = superscriptBefore;

    // Fix superscript with newline: ^\n{ → ^{
    const superscriptNewlineBefore = (newContent.match(/\^\s*\n\s*\{/g) || []).length;
    newContent = newContent.replace(/\^\s*\n\s*\{/g, '^{');
    superscriptFixed += superscriptNewlineBefore;

    this.stats.fixesByType.superscript += superscriptFixed;
    fileFixCount += superscriptFixed;

    if (fileFixCount > 0) {
      this.stats.filesModified++;
      this.stats.totalFixes += fileFixCount;

      console.log(chalk.yellow(`\n${applyChanges ? '✓' : '•'} ${filename}: ${fileFixCount} fix(es)`));
      if (subscriptFixed > 0) {
        console.log(chalk.gray(`   ${subscriptFixed}× subscript spaces fixed (_ { → _{)`));
      }
      if (superscriptFixed > 0) {
        console.log(chalk.gray(`   ${superscriptFixed}× superscript spaces fixed (^ { → ^{)`));
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
    console.log(chalk.cyan.bold('\n🔧 Subscript/Superscript Space Fixer\n'));
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

    if (this.stats.totalFixes > 0) {
      console.log('\nFixes by type:');
      console.log(`  Subscript spaces (_ { → _{):   ${this.stats.fixesByType.subscript}`);
      console.log(`  Superscript spaces (^ { → ^{): ${this.stats.fixesByType.superscript}`);
    }

    if (this.stats.filesModified === 0) {
      console.log(chalk.green('\n✅ No subscript/superscript space issues found!'));
    } else {
      if (applyChanges) {
        console.log(chalk.green(`\n✅ Fixed ${this.stats.totalFixes} issue(s) in ${this.stats.filesModified} files.`));
      } else {
        console.log(chalk.yellow(`\n⚠️  Found ${this.stats.totalFixes} issue(s) in ${this.stats.filesModified} files.`));
        console.log(chalk.gray('\nRun with --apply to fix these issues.'));
      }
    }

    console.log('');
  }
}

// Run the fixer
const fixer = new SubscriptSpaceFixer();
const modifiedCount = fixer.fixAllFiles();

process.exit(0);
