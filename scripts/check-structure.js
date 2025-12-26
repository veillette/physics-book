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
 *
 * Usage:
 *   node scripts/check-structure.js [options] [directory]
 *
 * Options:
 *   --strict          Enable stricter validation
 *   --help            Show this help message
 */

import path from 'path';
import matter from 'gray-matter';

import { ContentParser } from './lib/parser.js';

import {
  printHeader,
  printDivider,
  printFileCount,
  printStrictModeNotice,
  printErrors,
  printWarnings,
  printSuccess,
  printSummary,
  printOverview,
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findMarkdownFiles, readFile } from './lib/files.js';

/**
 * Structure validator class.
 */
class StructureValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.chapters = new Map();
    this.parser = new ContentParser();
  }

  /**
   * Validate all files in a directory.
   * @param {string} directory - Directory to validate
   * @returns {Promise<boolean>} - Success status
   */
  async validate(directory = 'contents') {
    printHeader('🏗️', 'Document Structure Validation');

    if (this.strict) {
      printStrictModeNotice();
    }

    const files = await findMarkdownFiles(directory);
    printFileCount(files.length);

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

  /**
   * Collect chapter information from a file.
   */
  async collectChapterInfo(filePath) {
    const content = readFile(filePath);
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

  /**
   * Validate a single file.
   */
  async validateFile(filePath) {
    const content = readFile(filePath);
    const fileName = path.basename(filePath);

    this.validateFrontMatter(fileName, content);
    this.validateFileNaming(fileName);
    this.validateHeadingHierarchy(fileName, content);
    this.validateChapterSectionStructure(fileName, content);
  }

  /**
   * Validate front matter.
   */
  validateFrontMatter(fileName, content) {
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

  /**
   * Validate file naming conventions.
   */
  validateFileNaming(fileName) {
    const validPatterns = [
      /^ch\d+[A-Z][a-zA-Z]+\.md$/,
      /^appendix[A-Z]\.md$/,
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

    if (fileName.includes(' ')) {
      this.errors.push({
        file: fileName,
        message: 'File name contains spaces - use camelCase instead',
      });
    }

    if (fileName.match(/^ch\d+[a-z]/)) {
      this.warnings.push({
        file: fileName,
        message: 'Chapter title should start with uppercase after chapter number',
      });
    }
  }

  /**
   * Validate heading hierarchy.
   */
  validateHeadingHierarchy(fileName, content) {
    const lines = content.split('\n');
    this.parser.reset();

    let previousLevel = 0;
    const headingStack = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      const result = this.parser.processLine(line);
      if (!result.isContent) continue;

      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();

        // Check for skipped levels
        if (previousLevel > 0 && level > previousLevel + 1) {
          this.errors.push({
            file: fileName,
            line: lineNum,
            message: `Heading level skipped: jumped from h${previousLevel} to h${level}`,
            text: line.trim(),
          });
        }

        // Check for empty headings
        if (text.length === 0) {
          this.errors.push({
            file: fileName,
            line: lineNum,
            message: 'Empty heading',
            text: line.trim(),
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
            text: line.trim(),
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

  /**
   * Validate chapter/section structure.
   */
  validateChapterSectionStructure(fileName, content) {
    if (!fileName.startsWith('ch')) return;

    const chapterMatch = fileName.match(/^ch(\d+)/);
    if (!chapterMatch) return;

    const expectedChapter = parseInt(chapterMatch[1]);
    const lines = content.split('\n');
    this.parser.reset();

    let hasIntro = false;

    for (const line of lines) {
      const result = this.parser.processLine(line);

      if (result.isContent && line.trim().length > 0 && !line.trim().startsWith('#')) {
        hasIntro = true;
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

  /**
   * Validate chapter numbering across files.
   */
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

    // Check for duplicate section numbers
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

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    printErrors(this.errors);
    printWarnings(this.warnings);

    if (this.errors.length === 0 && this.warnings.length === 0) {
      printSuccess('All structure checks passed!');
    }

    printDivider();
    printSummary(this.errors.length, this.warnings.length);

    // Print chapter overview
    if (this.chapters.size > 0) {
      const sortedChapters = Array.from(this.chapters.keys()).sort((a, b) => a - b);
      const items = sortedChapters.map(num => ({
        label: `Chapter ${num}`,
        value: `${this.chapters.get(num).length} file(s)`,
      }));
      printOverview('📚', 'Chapter Overview', items);
    }
  }
}

// CLI Configuration
runCli({
  name: 'check-structure',
  description: `Validates document structure including:
- Chapter numbering consistency
- Section hierarchy (no skipped heading levels)
- Front matter consistency
- File naming conventions
- Proper document organization`,
  flags: {
    strict: STANDARD_FLAGS.strict,
  },
  examples: [
    'node scripts/check-structure.js',
    'node scripts/check-structure.js --strict',
    'node scripts/check-structure.js contents/',
  ],
  run: async options => {
    const validator = new StructureValidator({
      strict: options.strict,
    });
    return validator.validate(options.directory);
  },
});
