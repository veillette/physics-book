#!/usr/bin/env node
/**
 * Fix Double Delimiter After \end{array}
 *
 * Automatically fixes LaTeX syntax errors where there's an extra $$ after \end{array}:
 * - \end{array} $$ $$ → \end{array} $$
 *
 * Usage:
 *   node scripts/fix-array-end-delimiter.js           # Dry-run (show changes)
 *   node scripts/fix-array-end-delimiter.js --apply   # Apply changes
 *   node scripts/fix-array-end-delimiter.js --file <filename>  # Fix specific file
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

class ArrayEndDelimiterFixer {
  constructor() {
    this.stats = {
      filesScanned: 0,
      filesModified: 0,
      totalFixes: 0,
    };
  }

  /**
   * Fix double delimiters after \end{array} in a single file
   */
  fixFile(filepath) {
    this.stats.filesScanned++;

    const content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath);
    let newContent = content;
    let fileFixCount = 0;

    // Pattern: \end{array} $$ $$ → \end{array} $$
    // Match \end{array} followed by whitespace and double $$
    const pattern = /\\end\{array\}\s*\$\$\s*\$\$/g;

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
      // Replace all occurrences - keep one $$, remove the extra one
      // Note: $$$$ in replacement string outputs $$  (each $$ becomes one $)
      newContent = content.replace(
        /\\end\{array\}\s*\$\$\s*\$\$/g,
        '\\end{array} $$$$'
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
        console.log(chalk.gray(`   ${fileFixCount}× removed extra $$ after \\end{array}`));
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
    console.log(chalk.cyan.bold('\n🔧 Array End Delimiter Fixer\n'));
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
      console.log(chalk.green('\n✅ No double delimiters after \\end{array} found!'));
    } else {
      if (applyChanges) {
        console.log(chalk.green(`\n✅ Fixed ${this.stats.totalFixes} double delimiter(s) in ${this.stats.filesModified} files.`));
      } else {
        console.log(chalk.yellow(`\n⚠️  Found ${this.stats.totalFixes} double delimiter(s) in ${this.stats.filesModified} files.`));
        console.log(chalk.gray('\nRun with --apply to fix these issues.'));
      }
    }

    console.log('');
  }
}

// Run the fixer
const fixer = new ArrayEndDelimiterFixer();
const modifiedCount = fixer.fixAllFiles();

process.exit(0);
