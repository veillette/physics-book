#!/usr/bin/env node

/**
 * Liquid Syntax Fixer Script
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
 *   node scripts/fix-liquid-syntax.js [options] [directory]
 *
 * Options:
 *   --fix, --apply     Apply fixes to files
 *   --strict           Enable stricter validation
 *   --help, -h         Show help message
 */

import path from 'path';

import {
  printHeader,
  printDivider,
  printErrors,
  printFixes,
  printSuccess,
  printSummary,
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findMarkdownFiles, readFile, writeFile, getBaseDir } from './lib/files.js';

/**
 * Liquid syntax fixer class.
 */
class LiquidSyntaxFixer {
  constructor(options = {}) {
    this.apply = options.apply || false;
    this.strict = options.strict || false;
    this.baseDir = getBaseDir(import.meta.url);
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
    this.filesChecked = 0;
    this.filesFixed = 0;

    // Pattern to detect math expressions
    // eslint-disable-next-line no-useless-escape
    this.inlineMathPattern = /\$(?!\$)([^\$]+)\$/g;
    // eslint-disable-next-line no-useless-escape
    this.blockMathPattern = /\$\$([^\$]+)\$\$/g;
  }

  /**
   * Process all files in a directory.
   * @param {string} directory - Directory to process
   * @returns {Promise<boolean>} - Success status
   */
  async process(directory = 'contents') {
    const emoji = this.apply ? '🔧' : '🔍';
    const title = this.apply ? 'Liquid Syntax Fix' : 'Liquid Syntax Check';

    printHeader(emoji, title);

    if (!this.apply) {
      console.log('Mode: CHECK ONLY (dry run)\n');
    } else {
      console.log('Mode: APPLY FIXES\n');
    }

    const files = await findMarkdownFiles(directory);
    console.log(`Found ${files.length} markdown files\n`);

    for (const file of files) {
      this.processFile(file);
    }

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * Check for Liquid syntax conflicts in text.
   * @param {string} content - File content
   * @param {string} fileName - File name
   * @returns {Array} - Array of issues
   */
  checkForLiquidConflicts(content, fileName) {
    const issues = [];
    const lines = content.split('\n');

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
                file: fileName,
                line: lineNum,
                message: 'Unclosed {{ in math expression',
                text: line.trim().substring(0, 80) + (line.trim().length > 80 ? '...' : ''),
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
  fixContent(content, fileName) {
    const lines = content.split('\n');
    const fixedLines = [];
    let fixCount = 0;

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Skip lines already wrapped in raw tags
      if (line.includes('{%') && line.includes('raw')) {
        fixedLines.push(line);
        return;
      }

      const originalLine = line;

      // Check for block math ($$...$$)
      if (line.includes('$$')) {
        line = line.replace(this.blockMathPattern, (match, mathContent) => {
          const fixed = this.fixMathExpression(mathContent, '$$');
          if (fixed !== `$$${mathContent}$$`) {
            fixCount++;
            this.fixes.push({
              file: fileName,
              line: lineNum,
              before: originalLine.trim(),
              after: line.trim(),
            });
          }
          return fixed;
        });
      } else if (line.includes('$')) {
        // Process inline math only if no block math on this line
        line = line.replace(this.inlineMathPattern, (match, mathContent) => {
          const fixed = this.fixMathExpression(mathContent, '$');
          if (fixed !== `$${mathContent}$`) {
            fixCount++;
          }
          return fixed;
        });
      }

      fixedLines.push(line);
    });

    return { content: fixedLines.join('\n'), fixCount };
  }

  /**
   * Process a single file.
   * @param {string} filePath - Path to file
   */
  processFile(filePath) {
    this.filesChecked++;
    const content = readFile(filePath);
    const fileName = path.basename(filePath);

    // Check for issues
    const fileIssues = this.checkForLiquidConflicts(content, fileName);

    if (fileIssues.length === 0) {
      return;
    }

    this.errors.push(...fileIssues);

    // Fix if in apply mode
    if (this.apply) {
      const { content: fixedContent, fixCount } = this.fixContent(content, fileName);

      if (fixedContent !== content && fixCount > 0) {
        writeFile(filePath, fixedContent);
        this.filesFixed++;
      }
    }
  }

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    console.log(`Files checked: ${this.filesChecked}`);

    if (this.apply) {
      printFixes(this.fixes, this.filesFixed, true);
    } else {
      printErrors(this.errors);
    }

    if (this.errors.length === 0) {
      printSuccess('No Liquid syntax conflicts found!');
    } else if (!this.apply) {
      console.log('\nRun with --apply or --fix to fix these issues.');
    }

    printDivider();
    printSummary(this.apply ? 0 : this.errors.length, this.warnings.length);
  }
}

// CLI Configuration
runCli({
  name: 'fix-liquid-syntax',
  description: `Detects and fixes Liquid syntax errors in LaTeX math expressions:
- Finds {{ patterns that conflict with Liquid templating
- Wraps problematic expressions with {% raw %} tags
- Preserves already-wrapped expressions`,
  flags: {
    strict: STANDARD_FLAGS.strict,
    apply: STANDARD_FLAGS.apply,
    fix: STANDARD_FLAGS.fix,
  },
  examples: [
    'node scripts/fix-liquid-syntax.js',
    'node scripts/fix-liquid-syntax.js --apply',
    'node scripts/fix-liquid-syntax.js --fix',
    'node scripts/fix-liquid-syntax.js contents/',
  ],
  run: async options => {
    const fixer = new LiquidSyntaxFixer({
      strict: options.strict,
      apply: options.apply || options.fix,
    });
    return fixer.process(options.directory);
  },
});

// Export for testing
export { LiquidSyntaxFixer };
