#!/usr/bin/env node

/**
 * fix-liquid-syntax.js
 *
 * Detects and fixes Liquid syntax errors in markdown files that occur when
 * LaTeX math expressions contain patterns that look like Liquid variables.
 *
 * The problem: Jekyll's Liquid templating engine interprets {{ patterns in
 * LaTeX (e.g., {{v}_{\text{...}}}) as variable tags. If not properly closed
 * from Liquid's perspective, this causes syntax errors.
 *
 * Solution: Wraps problematic math expressions with {% raw %} tags.
 *
 * Usage:
 *   node scripts/fix-liquid-syntax.js [options] [files...]
 *
 * Options:
 *   --apply      Apply fixes to files (default: dry run)
 *   --help       Show this help message
 *
 * Examples:
 *   node scripts/fix-liquid-syntax.js                    # Check all files
 *   node scripts/fix-liquid-syntax.js --apply            # Fix all files
 *   node scripts/fix-liquid-syntax.js contents/ch13*.md  # Check specific files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LiquidSyntaxFixer {
  constructor(options = {}) {
    this.baseDir = options.baseDir || path.join(__dirname, '..');
    this.contentDir = path.join(this.baseDir, 'contents');
    this.applyFix = options.applyFix || false;

    // Pattern to detect math expressions
    this.inlineMathPattern = /\$(?!\$)([^\$]+)\$/g;
    this.blockMathPattern = /\$\$([^\$]+)\$\$/g;

    this.stats = {
      filesProcessed: 0,
      filesWithIssues: 0,
      filesFixed: 0,
      totalIssues: 0,
    };

    this.issues = [];
  }

  /**
   * Check for Liquid syntax conflicts in text.
   * Returns array of issues with line numbers.
   */
  checkForLiquidConflicts(text, filename) {
    const issues = [];
    const lines = text.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Skip lines already wrapped in {% raw %} tags
      if (line.includes('{%') && line.includes('raw')) {
        return;
      }

      // Check if line contains math with potential Liquid conflicts
      if (line.includes('$$') || line.includes('$')) {
        if (line.includes('{{')) {
          // Check if {{ is followed by proper }}
          let pos = 0;
          while (true) {
            pos = line.indexOf('{{', pos);
            if (pos === -1) break;

            // Look for closing }}
            const remaining = line.substring(pos);
            if (!remaining.match(/\{\{[^}]*\}\}/)) {
              // Found an improperly closed {{ pattern
              issues.push({
                file: filename,
                line: lineNum,
                content: line.trim(),
                type: 'Unclosed {{ in math expression',
              });
              break; // Only report once per line
            }
            pos += 1;
          }
        }
      }
    });

    return issues;
  }

  /**
   * Fix LaTeX math expression that contains Liquid-conflicting syntax.
   * Wraps the expression with {% raw %} tags if needed.
   */
  fixMathExpression(mathContent, delimiter = '$$') {
    // Check if the math contains {{ patterns
    if (!mathContent.includes('{{')) {
      return `${delimiter}${mathContent}${delimiter}`;
    }

    // Check if there are improperly terminated {{ patterns
    let hasLiquidConflict = false;
    let pos = 0;
    while (true) {
      pos = mathContent.indexOf('{{', pos);
      if (pos === -1) break;

      // Look ahead to see if there's a proper closing }}
      const remaining = mathContent.substring(pos);
      // In LaTeX, we might have {{v}_ where the first } closes the inner brace
      // This looks like an incomplete Liquid variable to the parser
      if (!remaining.match(/\{\{[^}]*\}\}/)) {
        hasLiquidConflict = true;
        break;
      }
      pos += 1;
    }

    if (hasLiquidConflict) {
      // Wrap with raw tags
      return `{% raw %}${delimiter}${mathContent}${delimiter}{% endraw %}`;
    }

    return `${delimiter}${mathContent}${delimiter}`;
  }

  /**
   * Fix Liquid syntax errors in file content.
   */
  fixContent(content) {
    const lines = content.split('\n');
    const fixedLines = [];

    lines.forEach((line) => {
      // Skip lines already wrapped in raw tags
      if (line.includes('{%') && line.includes('raw')) {
        fixedLines.push(line);
        return;
      }

      // Check for block math ($$...$$)
      if (line.includes('$$')) {
        line = line.replace(this.blockMathPattern, (match, mathContent) => {
          const fixed = this.fixMathExpression(mathContent, '$$');
          if (fixed !== `$$${mathContent}$$`) {
            this.stats.totalIssues++;
          }
          return fixed;
        });
      } else if (line.includes('$')) {
        // Process inline math only if no block math on this line
        line = line.replace(this.inlineMathPattern, (match, mathContent) => {
          const fixed = this.fixMathExpression(mathContent, '$');
          if (fixed !== `$${mathContent}$`) {
            this.stats.totalIssues++;
          }
          return fixed;
        });
      }

      fixedLines.push(line);
    });

    return fixedLines.join('\n');
  }

  /**
   * Process a single file
   */
  processFile(filepath) {
    this.stats.filesProcessed++;

    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const filename = path.relative(this.baseDir, filepath);

      // Check for issues
      const fileIssues = this.checkForLiquidConflicts(content, filename);

      if (fileIssues.length === 0) {
        return { hasIssues: false };
      }

      this.stats.filesWithIssues++;
      this.issues.push(...fileIssues);

      // Fix if in apply mode
      if (this.applyFix) {
        const fixedContent = this.fixContent(content);

        if (fixedContent !== content) {
          fs.writeFileSync(filepath, fixedContent, 'utf-8');
          this.stats.filesFixed++;
          return { hasIssues: true, fixed: true };
        }
      }

      return { hasIssues: true, fixed: false };
    } catch (error) {
      console.error(`❌ Error processing ${filepath}: ${error.message}`);
      return { hasIssues: false, error: true };
    }
  }

  /**
   * Process all files in a directory or specific files
   */
  async processFiles(files) {
    if (files.length === 0) {
      // Process all markdown files in contents/
      try {
        const allFiles = fs.readdirSync(this.contentDir);
        files = allFiles
          .filter((file) => file.endsWith('.md'))
          .map((file) => path.join(this.contentDir, file));
      } catch (error) {
        console.error(`❌ Error reading contents directory: ${error.message}`);
        process.exit(1);
      }
    }

    for (const filepath of files) {
      if (!fs.existsSync(filepath)) {
        console.error(`❌ File not found: ${filepath}`);
        continue;
      }

      this.processFile(filepath);
    }
  }

  /**
   * Print final report
   */
  printReport() {
    console.log('\n' + '='.repeat(60));

    if (this.stats.filesWithIssues === 0) {
      console.log('✅ No Liquid syntax conflicts found!');
      console.log(`\nProcessed ${this.stats.filesProcessed} file(s)`);
      return;
    }

    if (this.applyFix) {
      console.log(`✅ Fixed ${this.stats.totalIssues} issue(s) in ${this.stats.filesFixed} file(s)`);
    } else {
      console.log(`⚠️  Found ${this.issues.length} issue(s) in ${this.stats.filesWithIssues} file(s)`);
      console.log('\nRun with --apply to fix these issues.');
    }

    console.log(`\nProcessed ${this.stats.filesProcessed} file(s)`);
  }

  /**
   * Print issues found
   */
  printIssues() {
    if (this.issues.length === 0) return;

    console.log('\n📋 Issues found:\n');

    let currentFile = '';
    for (const issue of this.issues) {
      if (issue.file !== currentFile) {
        currentFile = issue.file;
        console.log(`\n📄 ${issue.file}:`);
      }
      console.log(`   Line ${issue.line}: ${issue.type}`);
      const preview = issue.content.length > 80 ? issue.content.substring(0, 80) + '...' : issue.content;
      console.log(`   ${preview}`);
    }
  }

  /**
   * Run the fixer
   */
  async run(files = []) {
    console.log('🔧 Liquid Syntax Error Fixer\n');
    console.log(`Mode: ${this.applyFix ? 'APPLY FIXES' : 'CHECK ONLY (dry run)'}\n`);

    await this.processFiles(files);

    if (!this.applyFix) {
      this.printIssues();
    }

    this.printReport();

    return this.stats.filesWithIssues === 0;
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🔧 Liquid Syntax Error Fixer

Detects and fixes Liquid syntax errors in LaTeX math expressions.

Usage:
  node scripts/fix-liquid-syntax.js [options] [files...]

Options:
  --apply      Apply fixes to files (default: check only)
  --help, -h   Show this help message

Examples:
  node scripts/fix-liquid-syntax.js                    # Check all files
  node scripts/fix-liquid-syntax.js --apply            # Fix all files
  node scripts/fix-liquid-syntax.js contents/ch13*.md  # Check specific files

Common patterns that trigger errors:
  - {{v}_{{\\text{{...}}}}  - subscripted variable in double braces
  - {{f}}_{{...}}          - any variable in double braces with subscript
  - \\frac{{{{a}}_{{...}}}}{{{{b}}_{{...}}}}  - fractions with subscripted terms

Solution:
  Wraps problematic expressions with {{% raw %}} tags to prevent Liquid parsing.
`);
    process.exit(0);
  }

  const applyFix = args.includes('--apply');
  const files = args.filter((arg) => !arg.startsWith('--'));

  const fixer = new LiquidSyntaxFixer({ applyFix });
  const success = await fixer.run(files);

  process.exit(success ? 0 : 1);
}

// Run main only when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
}

// Export for testing
export { LiquidSyntaxFixer };
