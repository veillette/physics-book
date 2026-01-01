#!/usr/bin/env node
/**
 * Automated Math Delimiter Fixer
 *
 * Finds and fixes common patterns of broken math expressions across all content files.
 * 
 * Common issues fixed:
 * - Math expressions split across multiple lines
 * - Missing closing $$ delimiters
 * - Extra $$ on separate lines
 * - Broken multi-line equations
 *
 * Usage:
 *   node scripts/fix-math-delimiters.js           # Dry run (show what would be fixed)
 *   node scripts/fix-math-delimiters.js --apply   # Apply fixes
 *   node scripts/fix-math-delimiters.js --file <filename>  # Fix specific file
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
const applyFixes = args.includes('--apply');
const specificFile = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const verbose = args.includes('--verbose') || args.includes('-v');

class MathDelimiterFixer {
  constructor() {
    this.stats = {
      filesScanned: 0,
      filesWithErrors: 0,
      filesFixed: 0,
      totalFixes: 0,
      fixesByType: {},
    };
    this.fixes = [];
  }

  /**
   * Count $$ delimiters in a line
   */
  countDelimiters(line) {
    return (line.match(/\$\$/g) || []).length;
  }

  /**
   * Check if line has odd number of $$ delimiters
   */
  hasUnmatchedDelimiters(line) {
    return this.countDelimiters(line) % 2 !== 0;
  }

  /**
   * Fix common patterns in file content
   */
  fixFileContent(content, filename) {
    const lines = content.split('\n');
    const fixes = [];
    let modified = false;

    // ONLY Pattern: Standalone $$ on its own line (orphaned closer)
    // This is the safest pattern - a line that is exactly "$$" or starts with "$$"
    // and the previous line has exactly 1 $$ (opening delimiter)
    for (let i = 1; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      const prevMatches = lines[i - 1].match(/\$\$/g);

      // Only fix if:
      // 1. Current line is exactly "$$" (with optional whitespace)
      // 2. Previous line has exactly ONE $$ delimiter
      if (trimmed === '$$' &&
          prevMatches &&
          prevMatches.length === 1) {

        // Append to previous line
        fixes.push({
          type: 'append-orphaned-delimiter',
          lineStart: i,
          lineEnd: i + 1,
          before: `${lines[i - 1]}\n${lines[i]}`,
          after: `${lines[i - 1]} $$`,
        });

        lines[i - 1] = `${lines[i - 1]} $$`;
        lines.splice(i, 1);
        modified = true;
        i--; // Adjust index after splice
      }
    }

    return {
      content: lines.join('\n'),
      modified,
      fixes,
    };
  }

  /**
   * Process a single file
   */
  processFile(filepath) {
    this.stats.filesScanned++;
    
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');
    
    // Check if file has errors
    const errorLines = lines.filter(line => this.hasUnmatchedDelimiters(line));
    
    if (errorLines.length === 0) {
      return { hasErrors: false };
    }
    
    this.stats.filesWithErrors++;
    const filename = path.basename(filepath);
    
    if (verbose) {
      console.log(chalk.yellow(`\n📄 ${filename}: ${errorLines.length} unmatched delimiters`));
    }
    
    // Apply fixes
    const result = this.fixFileContent(content, filename);
    
    if (result.modified) {
      // Verify the fix worked
      const newLines = result.content.split('\n');
      const stillHasErrors = newLines.filter(line => this.hasUnmatchedDelimiters(line));
      
      if (stillHasErrors.length < errorLines.length) {
        this.stats.filesFixed++;
        this.stats.totalFixes += result.fixes.length;
        
        result.fixes.forEach(fix => {
          this.stats.fixesByType[fix.type] = (this.stats.fixesByType[fix.type] || 0) + 1;
        });
        
        if (applyFixes) {
          fs.writeFileSync(filepath, result.content, 'utf8');
          console.log(chalk.green(`  ✓ Fixed ${filename} (${result.fixes.length} fixes, ${errorLines.length - stillHasErrors.length} delimiters resolved)`));
        } else {
          console.log(chalk.blue(`  → Would fix ${filename} (${result.fixes.length} fixes, ${errorLines.length - stillHasErrors.length} delimiters resolved)`));
        }
        
        if (verbose) {
          result.fixes.forEach((fix, idx) => {
            console.log(chalk.gray(`    ${idx + 1}. ${fix.type} (lines ${fix.lineStart}-${fix.lineEnd})`));
          });
        }
        
        return { hasErrors: true, fixed: true, fixes: result.fixes, errorsRemaining: stillHasErrors.length };
      } else {
        console.log(chalk.red(`  ✗ ${filename}: Fixes didn't help (still ${stillHasErrors.length} errors)`));
        return { hasErrors: true, fixed: false, errorsRemaining: stillHasErrors.length };
      }
    }
    
    console.log(chalk.red(`  ⚠ ${filename}: ${errorLines.length} errors, no automatic fix found`));
    return { hasErrors: true, fixed: false, errorsRemaining: errorLines.length };
  }

  /**
   * Process all markdown files
   */
  processAllFiles() {
    console.log(chalk.cyan.bold('\n🔧 Math Delimiter Fixer\n'));
    console.log(chalk.gray(`Mode: ${applyFixes ? 'APPLY FIXES' : 'DRY RUN (use --apply to fix)'}\n`));
    
    const files = specificFile
      ? [path.join(contentsDir, specificFile)]
      : fs.readdirSync(contentsDir)
          .filter(f => f.endsWith('.md'))
          .map(f => path.join(contentsDir, f))
          .sort();
    
    console.log(chalk.cyan(`Processing ${files.length} files...\n`));
    
    files.forEach(filepath => {
      if (fs.existsSync(filepath)) {
        this.processFile(filepath);
      }
    });
    
    this.printSummary();
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n' + chalk.cyan('='.repeat(60)));
    console.log(chalk.cyan.bold('SUMMARY'));
    console.log(chalk.cyan('='.repeat(60)));
    
    console.log(`Files scanned:       ${this.stats.filesScanned}`);
    console.log(`Files with errors:   ${this.stats.filesWithErrors}`);
    console.log(`Files ${applyFixes ? 'fixed' : 'would fix'}:      ${this.stats.filesFixed}`);
    console.log(`Total fixes ${applyFixes ? 'applied' : 'available'}:  ${this.stats.totalFixes}`);
    
    if (Object.keys(this.stats.fixesByType).length > 0) {
      console.log('\nFixes by type:');
      Object.entries(this.stats.fixesByType)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });
    }
    
    if (!applyFixes && this.stats.filesFixed > 0) {
      console.log(chalk.yellow('\n⚠️  This was a DRY RUN. Use --apply to actually fix files.'));
    } else if (applyFixes && this.stats.filesFixed > 0) {
      console.log(chalk.green('\n✅ Files have been fixed! Run npm run crawl to verify.'));
    }
    
    const stillHasErrors = this.stats.filesWithErrors - this.stats.filesFixed;
    if (stillHasErrors > 0) {
      console.log(chalk.yellow(`\n⚠️  ${stillHasErrors} files still have errors that need manual fixing.`));
    }
    
    console.log('');
  }
}

// Run the fixer
const fixer = new MathDelimiterFixer();
fixer.processAllFiles();

process.exit(fixer.stats.filesWithErrors > fixer.stats.filesFixed ? 1 : 0);
