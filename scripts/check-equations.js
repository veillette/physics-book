#!/usr/bin/env node

/**
 * Equation Validation Script
 *
 * Validates equations and mathematical notation:
 * - Equation numbering consistency
 * - LaTeX syntax errors
 * - Unbalanced delimiters (extends check-math.js)
 * - Equation references
 * - Common LaTeX mistakes
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

class EquationValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.equations = new Map(); // Map of chapter -> equation numbers
  }

  async validate(directory = 'contents') {
    console.log(chalk.blue.bold('📐 Equation Validation'));
    console.log(chalk.gray('─'.repeat(60)));

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    for (const file of files) {
      await this.validateFile(file);
    }

    this.validateEquationNumbering();

    this.printResults();
    return this.errors.length === 0;
  }

  async validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const { data } = matter(content);
    const lines = content.split('\n');

    let inCodeBlock = false;
    let inMathBlock = false;
    let mathBlockStart = 0;
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
        this.errors.push({
          file: fileName,
          line: lineNum,
          message: 'Standalone $$ delimiter - inline math should be on one line',
          text: line.trim()
        });
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

  validateInlineMath(file, line, text) {
    // Count $ delimiters
    let count = 0;
    let escaped = false;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\\' && !escaped) {
        escaped = true;
        continue;
      }

      if (text[i] === '$' && !escaped) {
        count++;
      }

      escaped = false;
    }

    // Must be even number
    if (count % 2 !== 0) {
      this.errors.push({
        file,
        line,
        message: 'Unbalanced inline math delimiters ($)',
        text: text.trim().substring(0, 80)
      });
    }

    // Check for common inline math issues
    const inlineMathRegex = /\$([^$]+)\$/g;
    let match;

    while ((match = inlineMathRegex.exec(text)) !== null) {
      const mathContent = match[1];

      // Check for empty math
      if (mathContent.trim().length === 0) {
        this.errors.push({
          file,
          line,
          message: 'Empty inline math',
          text: text.trim().substring(0, 80)
        });
      }
    }
  }

  validateMathBlock(file, line, content) {
    // Check for common display math issues

    // Check for empty math blocks
    const mathContent = content.replace(/\$\$/g, '').trim();
    if (mathContent.length === 0) {
      this.errors.push({
        file,
        line,
        message: 'Empty math block',
      });
      return;
    }

    // Check for unbalanced braces
    let braceCount = 0;
    let escaped = false;

    for (let i = 0; i < mathContent.length; i++) {
      if (mathContent[i] === '\\' && !escaped) {
        escaped = true;
        continue;
      }

      if (!escaped) {
        if (mathContent[i] === '{') braceCount++;
        if (mathContent[i] === '}') braceCount--;
      }

      escaped = false;
    }

    if (braceCount !== 0) {
      this.errors.push({
        file,
        line,
        message: `Unbalanced braces in math block (${braceCount > 0 ? 'missing }' : 'extra }'})`,
        text: mathContent.substring(0, 80)
      });
    }

    // Check for unbalanced \left and \right
    const leftCount = (mathContent.match(/\\left[(\[{|]/g) || []).length;
    const rightCount = (mathContent.match(/\\right[)\]}|]/g) || []).length;

    if (leftCount !== rightCount) {
      this.warnings.push({
        file,
        line,
        message: `Unbalanced \\left (${leftCount}) and \\right (${rightCount}) delimiters`,
        text: mathContent.substring(0, 80)
      });
    }

    // Check for common LaTeX errors in display math
    this.checkCommonLatexErrors(file, line, mathContent);
  }

  checkEquationNumbering(file, line, text, chapterNumber) {
    // Look for numbered equations like \tag{X.Y} or equation labels
    const tagMatch = text.match(/\\tag\{(\d+)\.(\d+)\}/);
    if (tagMatch) {
      const eqChapter = parseInt(tagMatch[1]);
      const eqNumber = parseInt(tagMatch[2]);

      // Store equation number
      if (!this.equations.has(eqChapter)) {
        this.equations.set(eqChapter, []);
      }
      this.equations.get(eqChapter).push({
        file,
        line,
        number: eqNumber
      });

      // Check if equation number matches file chapter
      if (chapterNumber && eqChapter !== chapterNumber) {
        this.warnings.push({
          file,
          line,
          message: `Equation ${eqChapter}.${eqNumber} appears in Chapter ${chapterNumber}`,
          text: text.trim().substring(0, 80)
        });
      }
    }

    // Look for equation references
    const refMatch = text.match(/\\ref\{eq:([^}]+)\}/);
    if (refMatch && this.strict) {
      this.warnings.push({
        file,
        line,
        message: `Equation reference \\ref{eq:${refMatch[1]}} - verify label exists`,
        text: text.trim().substring(0, 80)
      });
    }
  }

  checkCommonLatexErrors(file, line, text) {
    // Skip image markdown lines to avoid false positives in alt text
    if (text.trim().startsWith('![')) {
      return;
    }

    const errors = [
      {
        pattern: /\\frac\{[^}]*\}\{[^}]*$/,
        message: 'Incomplete \\frac command - missing closing brace'
      },
      {
        pattern: /\\sqrt\{[^}]*$/,
        message: 'Incomplete \\sqrt command - missing closing brace'
      },
      {
        pattern: /\\text\{[^}]*$/,
        message: 'Incomplete \\text command - missing closing brace'
      },
      {
        pattern: /_{(?:[^}]*$|[^}]*\n)/,
        message: 'Incomplete subscript - missing closing brace'
      },
      {
        pattern: /\^{(?:[^}]*$|[^}]*\n)/,
        message: 'Incomplete superscript - missing closing brace'
      },
      {
        pattern: /([a-zA-Z]{2,})_([a-zA-Z0-9]+)(?![_{])/,
        message: 'Multi-character subscript without braces (use _{...})',
        warning: true
      },
      {
        pattern: /([a-zA-Z]{2,})\^([a-zA-Z0-9]+)(?![\^{])/,
        message: 'Multi-character superscript without braces (use ^{...})',
        warning: true
      }
    ];

    for (const { pattern, message, warning } of errors) {
      if (pattern.test(text)) {
        const item = {
          file,
          line,
          message,
          text: text.trim().substring(0, 80)
        };

        if (warning) {
          this.warnings.push(item);
        } else {
          this.errors.push(item);
        }
      }
    }

  }

  validateEquationNumbering() {
    for (const [chapter, equations] of this.equations.entries()) {
      // Sort equations by number
      equations.sort((a, b) => a.number - b.number);

      // Check for gaps in numbering
      for (let i = 0; i < equations.length - 1; i++) {
        const current = equations[i].number;
        const next = equations[i + 1].number;

        if (next - current > 1) {
          this.warnings.push({
            file: equations[i].file,
            line: equations[i].line,
            message: `Gap in equation numbering: ${chapter}.${current} followed by ${chapter}.${next}`
          });
        }
      }

      // Check for duplicate numbers
      for (let i = 0; i < equations.length - 1; i++) {
        if (equations[i].number === equations[i + 1].number) {
          this.errors.push({
            file: equations[i + 1].file,
            line: equations[i + 1].line,
            message: `Duplicate equation number: ${chapter}.${equations[i].number}`
          });
        }
      }
    }
  }

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    if (this.errors.length > 0) {
      console.log(chalk.red.bold(`\n❌ Errors: ${this.errors.length}`));
      this.errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}:${error.line}`));
        console.log(chalk.gray(`    ${error.message}`));
        if (error.text) {
          console.log(chalk.gray(`    "${error.text}"`));
        }
      });
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow.bold(`\n⚠️  Warnings: ${this.warnings.length}`));
      this.warnings.slice(0, 20).forEach(warning => {
        console.log(chalk.yellow(`  ${warning.file}:${warning.line}`));
        console.log(chalk.gray(`    ${warning.message}`));
        if (warning.text) {
          console.log(chalk.gray(`    "${warning.text}"`));
        }
      });

      if (this.warnings.length > 20) {
        console.log(chalk.gray(`  ... and ${this.warnings.length - 20} more warnings`));
      }
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green('✅ All equation checks passed!'));
    }

    console.log(chalk.gray('\n' + '─'.repeat(60)));
    console.log(chalk.gray(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`));

    // Print equation overview
    if (this.equations.size > 0) {
      console.log(chalk.blue.bold('\n📊 Equation Overview:'));
      const sortedChapters = Array.from(this.equations.keys()).sort((a, b) => a - b);
      sortedChapters.forEach(chapter => {
        const eqs = this.equations.get(chapter);
        console.log(chalk.gray(`  Chapter ${chapter}: ${eqs.length} numbered equation(s)`));
      });
    }
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  strict: args.includes('--strict')
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const validator = new EquationValidator(options);
validator.validate(directory).then(success => {
  process.exit(success ? 0 : 1);
});
