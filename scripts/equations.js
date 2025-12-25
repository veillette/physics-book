#!/usr/bin/env node

/**
 * Equation Validation and Fixing Script
 *
 * Validates and optionally fixes equation issues including:
 * - Equation numbering consistency
 * - LaTeX syntax errors
 * - Unbalanced delimiters (braces, $, \left/\right)
 * - Equation references
 * - Common LaTeX mistakes
 * - Broken inline math
 *
 * Usage:
 *   node scripts/equations.js [options] [directory]
 *
 * Modes:
 *   Default (no flags): Check only, report issues
 *   --fix: Apply fixes to files
 *
 * Options:
 *   --fix              Apply fixes to files
 *   --strict           Enable stricter validation
 *   --help, -h         Show help message
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { createIssue, checkBraceBalance, countUnescaped } from './lib/parser.js';

import {
  printHeader,
  printDivider,
  printFileCount,
  printDryRunNotice,
  printStrictModeNotice,
  printErrors,
  printWarnings,
  printFixes,
  printSuccess,
  printSummary,
  printOverview,
} from './lib/reporter.js';

import { runCli, createCheckFixFlags, getMode } from './lib/cli.js';

import { findMarkdownFiles, readFile, writeFile } from './lib/files.js';

/**
 * Equation validator and fixer class.
 */
class EquationProcessor {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.fix = options.fix || false;
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
    this.filesModified = 0;
    this.equations = new Map(); // Map of chapter -> equation numbers
  }

  /**
   * Process all files in a directory.
   * @param {string} directory - Directory to process
   * @returns {Promise<boolean>} - Success status
   */
  async process(directory) {
    const emoji = this.fix ? '🔧' : '📐';
    const title = this.fix ? 'Equation Auto-Fix' : 'Equation Validation';

    printHeader(emoji, title);

    if (this.fix) {
      printDryRunNotice();
    } else if (this.strict) {
      printStrictModeNotice();
    }

    const files = await findMarkdownFiles(directory);
    printFileCount(files.length);

    for (const file of files) {
      await this.processFile(file);
    }

    // Only validate numbering in check mode
    if (!this.fix) {
      this.validateEquationNumbering();
    }

    this.printResults();

    return this.fix ? true : this.errors.length === 0;
  }

  /**
   * Process a single file.
   * @param {string} filePath - Path to file
   */
  async processFile(filePath) {
    const content = readFile(filePath);
    const fileName = path.basename(filePath);

    if (this.fix) {
      this.fixFile(filePath, content, fileName);
    } else {
      this.checkFile(filePath, content, fileName);
    }
  }

  /**
   * Check a file for equation issues.
   * @param {string} filePath - Path to file
   * @param {string} content - File content
   * @param {string} fileName - File name
   */
  checkFile(filePath, content, fileName) {
    const { data } = matter(content);
    const lines = content.split('\n');

    let inCodeBlock = false;
    let inFrontMatter = false;
    let frontMatterEnded = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Track front matter
      if (line.trim() === '---') {
        if (!frontMatterEnded) {
          inFrontMatter = !inFrontMatter;
          if (!inFrontMatter) frontMatterEnded = true;
        }
        continue;
      }

      if (inFrontMatter) continue;

      // Track code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }

      if (inCodeBlock) continue;

      // Check for standalone $$ lines (likely broken inline math)
      if (line.trim() === '$$') {
        this.errors.push(
          createIssue({
            file: fileName,
            line: lineNum,
            message: 'Standalone $$ delimiter - inline math should be on one line',
            text: line.trim(),
          })
        );
        continue;
      }

      // Check inline math
      this.validateInlineMath(fileName, lineNum, line);

      // Check for equation numbering
      this.checkEquationNumbering(fileName, lineNum, line, data.chapterNumber);

      // Check for common LaTeX errors
      this.checkCommonLatexErrors(fileName, lineNum, line);
    }
  }

  /**
   * Fix a file for equation issues.
   * @param {string} filePath - Path to file
   * @param {string} content - File content
   * @param {string} fileName - File name
   */
  fixFile(filePath, content, fileName) {
    const { data, content: bodyContent } = matter(content);
    const lines = bodyContent.split('\n');

    let modified = false;
    let inCodeBlock = false;

    const newLines = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Track code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        newLines.push(line);
        i++;
        continue;
      }

      if (inCodeBlock) {
        newLines.push(line);
        i++;
        continue;
      }

      // Fix standalone $$ delimiter (broken inline math)
      if (line.trim() === '$$' && i > 0 && i < lines.length - 1) {
        const prevLine = lines[i - 1];
        const nextLine = lines[i + 1];

        const shouldMerge =
          (prevLine.includes('$$') &&
            !prevLine.trim().startsWith('$$') &&
            !prevLine.trim().startsWith('<div class="equation">')) ||
          (prevLine.trim().length > 0 &&
            nextLine.trim().length > 0 &&
            prevLine.trim().length < 100 &&
            !prevLine.trim().startsWith('#'));

        if (shouldMerge) {
          const prevDollarCount = (prevLine.match(/\$\$/g) || []).length;

          if (prevDollarCount % 2 === 1) {
            const mergedLine = `${prevLine.trimEnd()}$$ ${nextLine.trimStart()}`;

            newLines.pop();
            newLines.push(mergedLine);

            modified = true;
            this.fixes.push({
              file: fileName,
              line: i,
              type: 'Merged broken inline math',
              before: `${prevLine}\\n$$\\n${nextLine}`,
              after: mergedLine,
            });

            i += 2;
            continue;
          }
        }
      }

      // Fix empty inline math and extra spaces
      let fixedLine = line;
      fixedLine = fixedLine.replace(/\$\$\s*\$\$/g, '');

      if (fixedLine !== line) {
        modified = true;
        const changeType = line.includes('$$ $$')
          ? 'Removed empty inline math'
          : 'Fixed math spacing';

        this.fixes.push({
          file: fileName,
          line: i + 1,
          type: changeType,
          before: line.trim(),
          after: fixedLine.trim(),
        });
        newLines.push(fixedLine);
      } else {
        newLines.push(line);
      }

      i++;
    }

    if (modified) {
      this.filesModified++;
      const newContent = matter.stringify(newLines.join('\n'), data);
      writeFile(filePath, newContent);
    }
  }

  // ===== VALIDATION METHODS =====

  validateInlineMath(file, line, text) {
    const count = countUnescaped(text, '$');

    if (count % 2 !== 0) {
      this.errors.push(
        createIssue({
          file,
          line,
          message: 'Unbalanced inline math delimiters ($)',
          text: text.trim(),
        })
      );
    }

    // Check for empty inline math
    const inlineMathRegex = /\$([^$]+)\$/g;
    let match;

    while ((match = inlineMathRegex.exec(text)) !== null) {
      const mathContent = match[1];

      if (mathContent.trim().length === 0) {
        this.errors.push(
          createIssue({
            file,
            line,
            message: 'Empty inline math',
            text: text.trim(),
          })
        );
      }
    }
  }

  checkEquationNumbering(file, line, text, chapterNumber) {
    const tagMatch = text.match(/\\tag\{(\d+)\.(\d+)\}/);
    if (tagMatch) {
      const eqChapter = parseInt(tagMatch[1]);
      const eqNumber = parseInt(tagMatch[2]);

      if (!this.equations.has(eqChapter)) {
        this.equations.set(eqChapter, []);
      }
      this.equations.get(eqChapter).push({
        file,
        line,
        number: eqNumber,
      });

      if (chapterNumber && eqChapter !== chapterNumber) {
        this.warnings.push(
          createIssue({
            file,
            line,
            message: `Equation ${eqChapter}.${eqNumber} appears in Chapter ${chapterNumber}`,
            text: text.trim(),
            severity: 'warning',
          })
        );
      }
    }

    const refMatch = text.match(/\\ref\{eq:([^}]+)\}/);
    if (refMatch && this.strict) {
      this.warnings.push(
        createIssue({
          file,
          line,
          message: `Equation reference \\ref{eq:${refMatch[1]}} - verify label exists`,
          text: text.trim(),
          severity: 'warning',
        })
      );
    }
  }

  checkCommonLatexErrors(file, line, text) {
    // Skip image markdown lines
    if (text.trim().startsWith('![')) return;

    const errorPatterns = [
      {
        pattern: /\\frac\{[^}]*\}\{[^}]*$/,
        message: 'Incomplete \\frac command - missing closing brace',
      },
      {
        pattern: /\\sqrt\{[^}]*$/,
        message: 'Incomplete \\sqrt command - missing closing brace',
      },
      {
        pattern: /\\text\{[^}]*$/,
        message: 'Incomplete \\text command - missing closing brace',
      },
      {
        pattern: /_{(?:[^}]*$|[^}]*\n)/,
        message: 'Incomplete subscript - missing closing brace',
      },
      {
        pattern: /\^{(?:[^}]*$|[^}]*\n)/,
        message: 'Incomplete superscript - missing closing brace',
      },
      {
        pattern: /([a-zA-Z]{2,})_([a-zA-Z0-9]+)(?![_{])/,
        message: 'Multi-character subscript without braces (use _{...})',
        warning: true,
      },
      {
        pattern: /([a-zA-Z]{2,})\^([a-zA-Z0-9]+)(?![\^{])/,
        message: 'Multi-character superscript without braces (use ^{...})',
        warning: true,
      },
    ];

    for (const { pattern, message, warning } of errorPatterns) {
      if (pattern.test(text)) {
        const issue = createIssue({
          file,
          line,
          message,
          text: text.trim(),
          severity: warning ? 'warning' : 'error',
        });

        if (warning) {
          this.warnings.push(issue);
        } else {
          this.errors.push(issue);
        }
      }
    }
  }

  validateEquationNumbering() {
    for (const [chapter, equations] of this.equations.entries()) {
      equations.sort((a, b) => a.number - b.number);

      // Check for gaps
      for (let i = 0; i < equations.length - 1; i++) {
        const current = equations[i].number;
        const next = equations[i + 1].number;

        if (next - current > 1) {
          this.warnings.push(
            createIssue({
              file: equations[i].file,
              line: equations[i].line,
              message: `Gap in equation numbering: ${chapter}.${current} followed by ${chapter}.${next}`,
              severity: 'warning',
            })
          );
        }
      }

      // Check for duplicates
      for (let i = 0; i < equations.length - 1; i++) {
        if (equations[i].number === equations[i + 1].number) {
          this.errors.push(
            createIssue({
              file: equations[i + 1].file,
              line: equations[i + 1].line,
              message: `Duplicate equation number: ${chapter}.${equations[i].number}`,
            })
          );
        }
      }
    }
  }

  // ===== RESULTS =====

  printResults() {
    printDivider();

    if (this.fix) {
      printFixes(this.fixes, this.filesModified, true);
    } else {
      printErrors(this.errors);
      printWarnings(this.warnings);

      if (this.errors.length === 0 && this.warnings.length === 0) {
        printSuccess('All equation checks passed!');
      }

      printDivider();
      printSummary(this.errors.length, this.warnings.length);

      // Print equation overview
      if (this.equations.size > 0) {
        const sortedChapters = Array.from(this.equations.keys()).sort((a, b) => a - b);
        const items = sortedChapters.map(chapter => ({
          label: `Chapter ${chapter}`,
          value: `${this.equations.get(chapter).length} numbered equation(s)`,
        }));
        printOverview('📊', 'Equation Overview', items);
      }
    }
  }
}

// CLI Configuration
const flags = createCheckFixFlags();

runCli({
  name: 'equations',
  description: `Validates and fixes equation issues including:
- Equation numbering consistency
- LaTeX syntax errors
- Unbalanced delimiters (braces, $, \\left/\\right)
- Equation references
- Common LaTeX mistakes
- Broken inline math`,
  flags,
  examples: [
    'node scripts/equations.js                    # Check only',
    'node scripts/equations.js --fix              # Apply fixes',
    'node scripts/equations.js --strict           # Stricter validation',
    'node scripts/equations.js contents/ch10*.md  # Check specific files',
  ],
  run: async options => {
    const mode = getMode(options);
    const processor = new EquationProcessor({
      strict: options.strict,
      fix: mode === 'fix' || mode === 'both',
    });

    return processor.process(options.directory);
  },
});
