#!/usr/bin/env node

/**
 * Document Structure Validation Script
 *
 * Validates document structure including:
 * - Chapter numbering consistency
 * - Section hierarchy (no skipped heading levels)
 * - Front matter consistency
 * - File naming conventions
 * - Proper document organization
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

class StructureValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.chapters = new Map();
  }

  async validate(directory = 'contents') {
    console.log(chalk.blue.bold('🏗️  Document Structure Validation'));
    console.log(chalk.gray('─'.repeat(60)));

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    // First pass: collect all chapters
    for (const file of files) {
      await this.collectChapterInfo(file);
    }

    // Second pass: validate structure
    for (const file of files) {
      await this.validateFile(file);
    }

    // Validate chapter numbering across files
    this.validateChapterNumbering();

    this.printResults();
    return this.errors.length === 0;
  }

  async collectChapterInfo(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    if (data.chapterNumber) {
      if (!this.chapters.has(data.chapterNumber)) {
        this.chapters.set(data.chapterNumber, []);
      }
      this.chapters.get(data.chapterNumber).push({
        file: path.basename(filePath),
        section: data.sectionNumber,
        title: data.title,
      });
    }
  }

  async validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    // Validate front matter
    this.validateFrontMatter(filePath, content);

    // Validate file naming
    this.validateFileNaming(filePath);

    // Validate heading hierarchy
    this.validateHeadingHierarchy(filePath, content);

    // Validate chapter/section structure
    this.validateChapterSectionStructure(filePath, content);
  }

  validateFrontMatter(filePath, content) {
    const fileName = path.basename(filePath);

    let frontMatter;
    try {
      frontMatter = matter(content);
    } catch (error) {
      this.errors.push({
        file: fileName,
        message: `Invalid YAML front matter: ${error.message}`,
      });
      return;
    }

    const { data } = frontMatter;

    // Check for required fields
    if (!data.title) {
      this.errors.push({
        file: fileName,
        message: 'Missing required field: title',
      });
    }

    if (!data.layout) {
      this.errors.push({
        file: fileName,
        message: 'Missing required field: layout',
      });
    }

    // Validate chapter files have chapter numbers
    if (fileName.startsWith('ch') && fileName !== 'CHANGELOG.md') {
      if (!data.chapterNumber && !fileName.includes('Glossary')) {
        this.warnings.push({
          file: fileName,
          message: 'Chapter file missing chapterNumber in front matter',
        });
      }
    }

    // Validate consistency between filename and front matter
    const chapterMatch = fileName.match(/^ch(\d+)/);
    if (chapterMatch && data.chapterNumber) {
      const fileChapter = parseInt(chapterMatch[1]);
      if (fileChapter !== data.chapterNumber) {
        this.errors.push({
          file: fileName,
          message: `Chapter number mismatch: filename has ${fileChapter}, front matter has ${data.chapterNumber}`,
        });
      }
    }
  }

  validateFileNaming(filePath) {
    const fileName = path.basename(filePath);

    // Check for proper naming convention
    const validPatterns = [
      /^ch\d+[A-Z][a-zA-Z]+\.md$/, // ch10AngularMomentum.md
      /^appendix[A-Z]\.md$/, // appendixA.md
      /^Glossary\.md$/,
      /^README\.md$/,
      /^SUMMARY\.md$/,
      /^CHANGELOG\.md$/,
      /^CONTRIBUTE\.md$/,
    ];

    const isValid = validPatterns.some(pattern => pattern.test(fileName));

    if (!isValid && this.strict) {
      this.warnings.push({
        file: fileName,
        message: 'File name does not follow naming convention (chXXTitleInCamelCase.md)',
      });
    }

    // Check for spaces in filename
    if (fileName.includes(' ')) {
      this.errors.push({
        file: fileName,
        message: 'File name contains spaces - use camelCase instead',
      });
    }

    // Check for lowercase chapter files
    if (fileName.match(/^ch\d+[a-z]/)) {
      this.warnings.push({
        file: fileName,
        message: 'Chapter title should start with uppercase after chapter number',
      });
    }
  }

  validateHeadingHierarchy(filePath, content) {
    const fileName = path.basename(filePath);
    const lines = content.split('\n');

    let inFrontMatter = false;
    let frontMatterEnded = false;
    let previousLevel = 0;
    const headingStack = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineNum = i + 1;

      // Track front matter
      if (line === '---') {
        if (!frontMatterEnded) {
          inFrontMatter = !inFrontMatter;
          if (!inFrontMatter) frontMatterEnded = true;
        }
        continue;
      }

      if (inFrontMatter) continue;

      // Check for ATX-style headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2];

        // Check for skipped levels
        if (previousLevel > 0 && level > previousLevel + 1) {
          this.errors.push({
            file: fileName,
            line: lineNum,
            message: `Heading level skipped: jumped from h${previousLevel} to h${level}`,
            text: line,
          });
        }

        // Check for empty headings
        if (text.trim().length === 0) {
          this.errors.push({
            file: fileName,
            line: lineNum,
            message: 'Empty heading',
            text: line,
          });
        }

        // Check for proper capitalization
        if (
          level <= 2 &&
          text.charAt(0) !== text.charAt(0).toUpperCase() &&
          !text.startsWith('$')
        ) {
          this.warnings.push({
            file: fileName,
            line: lineNum,
            message: 'Major heading should start with capital letter',
            text: line,
          });
        }

        previousLevel = level;
        headingStack.push({ level, text, line: lineNum });
      }
    }

    // Check for documents with no headings
    if (headingStack.length === 0 && !fileName.includes('README')) {
      this.warnings.push({
        file: fileName,
        message: 'Document has no headings',
      });
    }
  }

  validateChapterSectionStructure(filePath, content) {
    const fileName = path.basename(filePath);
    const { data } = matter(content);

    // Skip non-chapter files
    if (!fileName.startsWith('ch')) return;

    const chapterMatch = fileName.match(/^ch(\d+)/);
    if (!chapterMatch) return;

    const expectedChapter = parseInt(chapterMatch[1]);

    // Check if chapter has proper introduction
    const lines = content.split('\n');
    let hasIntro = false;
    let inFrontMatter = false;
    let frontMatterEnded = false;
    let firstContentLine = '';

    for (const line of lines) {
      if (line.trim() === '---') {
        if (!frontMatterEnded) {
          inFrontMatter = !inFrontMatter;
          if (!inFrontMatter) frontMatterEnded = true;
        }
        continue;
      }

      if (inFrontMatter) continue;

      if (frontMatterEnded && line.trim().length > 0 && !line.trim().startsWith('#')) {
        hasIntro = true;
        firstContentLine = line.trim();
        break;
      }

      if (line.trim().startsWith('#')) {
        break;
      }
    }

    if (this.strict && !hasIntro && expectedChapter > 0) {
      this.warnings.push({
        file: fileName,
        message: 'Chapter should have introductory text before first heading',
      });
    }
  }

  validateChapterNumbering() {
    const sortedChapters = Array.from(this.chapters.keys()).sort((a, b) => a - b);

    // Check for missing chapters
    for (let i = 0; i < sortedChapters.length - 1; i++) {
      const current = sortedChapters[i];
      const next = sortedChapters[i + 1];

      if (next - current > 1) {
        this.warnings.push({
          file: 'General',
          message: `Gap in chapter numbering: chapter ${current} followed by chapter ${next}`,
        });
      }
    }

    // Check for duplicate chapter numbers with different sections
    for (const [chapterNum, files] of this.chapters.entries()) {
      const sections = files.map(f => f.section).filter(s => s !== undefined);
      const uniqueSections = new Set(sections);

      if (sections.length > 0 && sections.length !== uniqueSections.size) {
        this.errors.push({
          file: `Chapter ${chapterNum}`,
          message: 'Duplicate section numbers within the same chapter',
        });
      }
    }
  }

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    if (this.errors.length > 0) {
      console.log(chalk.red.bold(`\n❌ Errors: ${this.errors.length}`));
      this.errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}${error.line ? ':' + error.line : ''}`));
        console.log(chalk.gray(`    ${error.message}`));
        if (error.text) {
          console.log(chalk.gray(`    "${error.text}"`));
        }
      });
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow.bold(`\n⚠️  Warnings: ${this.warnings.length}`));
      this.warnings.slice(0, 20).forEach(warning => {
        console.log(chalk.yellow(`  ${warning.file}${warning.line ? ':' + warning.line : ''}`));
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
      console.log(chalk.green('✅ All structure checks passed!'));
    }

    console.log(chalk.gray('\n' + '─'.repeat(60)));
    console.log(
      chalk.gray(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`)
    );

    // Print chapter overview
    if (this.chapters.size > 0) {
      console.log(chalk.blue.bold('\n📚 Chapter Overview:'));
      const sortedChapters = Array.from(this.chapters.keys()).sort((a, b) => a - b);
      sortedChapters.forEach(num => {
        const files = this.chapters.get(num);
        console.log(chalk.gray(`  Chapter ${num}: ${files.length} file(s)`));
      });
    }
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  strict: args.includes('--strict'),
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const validator = new StructureValidator(options);
validator.validate(directory).then(success => {
  process.exit(success ? 0 : 1);
});
