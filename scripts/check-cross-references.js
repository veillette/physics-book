#!/usr/bin/env node

/**
 * Cross-Reference Validation Script
 *
 * Validates cross-references between chapters and sections:
 * - Internal links to chapters/sections
 * - Figure references
 * - Table references
 * - Equation references
 * - Broken anchor links
 *
 * Usage:
 *   node scripts/check-cross-references.js [options] [directory]
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
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findMarkdownFiles, readFile } from './lib/files.js';

/**
 * Cross-reference validator class.
 */
class CrossReferenceValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.files = new Map();
    this.anchors = new Map();
    this.references = [];
    this.parser = new ContentParser();
  }

  /**
   * Validate all files in a directory.
   * @param {string} directory - Directory to validate
   * @returns {Promise<boolean>} - Success status
   */
  async validate(directory = 'contents') {
    printHeader('🔗', 'Cross-Reference Validation');

    if (this.strict) {
      printStrictModeNotice();
    }

    const files = await findMarkdownFiles(directory);
    printFileCount(files.length);

    // First pass: collect all files and anchors
    for (const file of files) {
      await this.collectFileInfo(file);
    }

    // Second pass: validate references
    for (const file of files) {
      await this.validateFile(file);
    }

    // Validate all collected references
    this.validateReferences();

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * Collect file information and anchors.
   */
  async collectFileInfo(filePath) {
    const content = readFile(filePath);
    const fileName = path.basename(filePath, '.md');
    const { data } = matter(content);

    this.files.set(fileName, {
      path: filePath,
      chapter: data.chapterNumber,
      section: data.sectionNumber,
      title: data.title,
    });

    // Collect all anchors
    const anchors = new Set();
    const lines = content.split('\n');
    this.parser.reset();

    for (const line of lines) {
      const result = this.parser.processLine(line);
      if (!result.isContent && !result.isFrontMatter) continue;

      // Extract anchors from headings
      const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
      if (headingMatch) {
        const headingText = headingMatch[1].replace(/\{#([^}]+)\}/g, '$1');
        const anchor = this.generateAnchor(headingText);
        anchors.add(anchor);

        const customIdMatch = headingText.match(/\{#([^}]+)\}/);
        if (customIdMatch) {
          anchors.add(customIdMatch[1]);
        }
      }

      // Extract anchors from HTML
      const anchorMatches = line.matchAll(/<a\s+(?:id|name)=["']([^"']+)["']/g);
      for (const match of anchorMatches) {
        anchors.add(match[1]);
      }

      const htmlIdMatches = line.matchAll(/<\w+[^>]*\sid=["']([^"']+)["']/g);
      for (const match of htmlIdMatches) {
        anchors.add(match[1]);
      }

      // Kramdown attribute list syntax
      const kramdownIdMatch = line.match(/^\{:.*?#([^\s}]+)/);
      if (kramdownIdMatch) {
        anchors.add(kramdownIdMatch[1]);
      }
    }

    this.anchors.set(fileName, anchors);
  }

  /**
   * Generate anchor from heading text.
   */
  generateAnchor(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Validate a single file.
   */
  async validateFile(filePath) {
    const content = readFile(filePath);
    const fileName = path.basename(filePath);
    const lines = content.split('\n');
    this.parser.reset();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      const result = this.parser.processLine(line);
      if (!result.isContent) continue;

      // Find all markdown links
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        const linkText = match[1];
        const linkTarget = match[2];

        // Skip external links
        if (linkTarget.startsWith('http://') || linkTarget.startsWith('https://')) {
          continue;
        }

        // Skip image links
        if (linkTarget.match(/\.(png|jpg|jpeg|gif|svg|webp)(\s|$|['"])/i)) {
          continue;
        }

        this.validateInternalLink(fileName, lineNum, linkText, linkTarget);
      }

      // Find references
      this.validateFigureReferences(fileName, lineNum, line);
      this.validateTableReferences(fileName, lineNum, line);
      this.validateEquationReferences(fileName, lineNum, line);
    }
  }

  /**
   * Validate an internal link.
   */
  validateInternalLink(file, line, text, target) {
    const [filePart, anchorPart] = target.split('#');

    this.references.push({
      file,
      line,
      text,
      target,
      filePart: filePart || null,
      anchorPart: anchorPart || null,
    });

    // Same-file anchor reference
    if (!filePart && anchorPart) {
      const currentFile = path.basename(file, '.md');
      const currentAnchors = this.anchors.get(currentFile);

      if (currentAnchors && !currentAnchors.has(anchorPart)) {
        this.errors.push({
          file,
          line,
          message: `Broken anchor link: #${anchorPart} not found in current file`,
          text: `[${text}](${target})`,
        });
      }
    }
  }

  /**
   * Validate all collected references.
   */
  validateReferences() {
    for (const ref of this.references) {
      const { file, line, text, target, filePart, anchorPart } = ref;

      if (!filePart && anchorPart) continue;

      if (filePart) {
        let targetFile = filePart.replace(/^\.\//, '').replace(/^\.\.\/contents\//, '');
        targetFile = path.basename(targetFile, '.md');

        if (!this.files.has(targetFile)) {
          this.errors.push({
            file,
            line,
            message: `Broken file reference: ${targetFile}.md not found`,
            text: `[${text}](${target})`,
          });
          continue;
        }

        if (anchorPart) {
          const targetAnchors = this.anchors.get(targetFile);
          if (targetAnchors && !targetAnchors.has(anchorPart)) {
            this.errors.push({
              file,
              line,
              message: `Broken anchor link: #${anchorPart} not found in ${targetFile}.md`,
              text: `[${text}](${target})`,
            });
          }
        }
      }
    }
  }

  /**
   * Validate figure references.
   */
  validateFigureReferences(file, line, text) {
    const figurePattern = /\b(?:Figure|Fig\.?)\s+(\d+)\.(\d+)\b/g;
    let match;

    while ((match = figurePattern.exec(text)) !== null) {
      const chapter = parseInt(match[1]);
      const currentFile = this.files.get(path.basename(file, '.md'));

      if (currentFile && currentFile.chapter && currentFile.chapter !== chapter) {
        this.warnings.push({
          file,
          line,
          message: `Figure reference ${match[0]} appears in Chapter ${currentFile.chapter}`,
          text: text.trim().substring(0, 80),
        });
      }
    }
  }

  /**
   * Validate table references.
   */
  validateTableReferences(file, line, text) {
    const tablePattern = /\bTable\s+(\d+)\.(\d+)\b/g;
    let match;

    while ((match = tablePattern.exec(text)) !== null) {
      const chapter = parseInt(match[1]);
      const currentFile = this.files.get(path.basename(file, '.md'));

      if (currentFile && currentFile.chapter && currentFile.chapter !== chapter) {
        this.warnings.push({
          file,
          line,
          message: `Table reference ${match[0]} appears in Chapter ${currentFile.chapter}`,
          text: text.trim().substring(0, 80),
        });
      }
    }
  }

  /**
   * Validate equation references.
   */
  validateEquationReferences(file, line, text) {
    const equationPattern = /\b(?:Equation|Eq\.?)\s+(\d+)\.(\d+)\b/g;
    let match;

    while ((match = equationPattern.exec(text)) !== null) {
      const chapter = parseInt(match[1]);
      const currentFile = this.files.get(path.basename(file, '.md'));

      if (currentFile && currentFile.chapter && currentFile.chapter !== chapter) {
        this.warnings.push({
          file,
          line,
          message: `Equation reference ${match[0]} appears in Chapter ${currentFile.chapter}`,
          text: text.trim().substring(0, 80),
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
      printSuccess('All cross-reference checks passed!');
    }

    printDivider();
    printSummary(this.errors.length, this.warnings.length);
    console.log(`Total internal references found: ${this.references.length}`);
  }
}

// CLI Configuration
runCli({
  name: 'check-cross-references',
  description: `Validates cross-references between chapters and sections:
- Internal links to chapters/sections
- Figure references
- Table references
- Equation references
- Broken anchor links`,
  flags: {
    strict: STANDARD_FLAGS.strict,
  },
  examples: [
    'node scripts/check-cross-references.js',
    'node scripts/check-cross-references.js --strict',
    'node scripts/check-cross-references.js contents/',
  ],
  run: async options => {
    const validator = new CrossReferenceValidator({
      strict: options.strict,
    });
    return validator.validate(options.directory);
  },
});
