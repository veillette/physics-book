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
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

class CrossReferenceValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.files = new Map(); // Map of filename -> file info
    this.anchors = new Map(); // Map of filename -> Set of anchors
    this.references = []; // Array of all references found
  }

  async validate(directory = 'contents') {
    console.log(chalk.blue.bold('🔗 Cross-Reference Validation'));
    console.log(chalk.gray('─'.repeat(60)));

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

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

  async collectFileInfo(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');
    const { data } = matter(content);

    // Store file info
    this.files.set(fileName, {
      path: filePath,
      chapter: data.chapterNumber,
      section: data.sectionNumber,
      title: data.title,
    });

    // Collect all anchors (headings) in the file
    const anchors = new Set();
    const lines = content.split('\n');
    let inFrontMatter = false;
    let frontMatterEnded = false;

    for (const line of lines) {
      // Track front matter
      if (line.trim() === '---') {
        if (!frontMatterEnded) {
          inFrontMatter = !inFrontMatter;
          if (!inFrontMatter) frontMatterEnded = true;
        }
        continue;
      }

      if (inFrontMatter) continue;

      // Extract anchors from headings
      const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
      if (headingMatch) {
        const headingText = headingMatch[1].replace(/\{#([^}]+)\}/g, '$1'); // Extract custom IDs
        const anchor = this.generateAnchor(headingText);
        anchors.add(anchor);

        // Also check for custom anchor IDs
        const customIdMatch = headingText.match(/\{#([^}]+)\}/);
        if (customIdMatch) {
          anchors.add(customIdMatch[1]);
        }
      }

      // Extract anchors from explicit anchor tags
      const anchorMatches = line.matchAll(/<a\s+(?:id|name)=["']([^"']+)["']/g);
      for (const match of anchorMatches) {
        anchors.add(match[1]);
      }

      // Extract id attributes from any HTML element (e.g., <div id="example1">)
      const htmlIdMatches = line.matchAll(/<\w+[^>]*\sid=["']([^"']+)["']/g);
      for (const match of htmlIdMatches) {
        anchors.add(match[1]);
      }

      // Extract anchors from Kramdown attribute list syntax: {: #id} or {: #id attr="value"}
      const kramdownIdMatch = line.match(/^\{:.*?#([^\s}]+)/);
      if (kramdownIdMatch) {
        anchors.add(kramdownIdMatch[1]);
      }
    }

    this.anchors.set(fileName, anchors);
  }

  generateAnchor(text) {
    // Convert heading text to GitHub-style anchor
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Collapse multiple hyphens
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  async validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
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

        // Skip image links (handled by check-figures)
        // Images may have captions: image.jpg 'caption' or image.jpg "caption"
        if (linkTarget.match(/\.(png|jpg|jpeg|gif|svg|webp)(\s|$|['"])/i)) {
          continue;
        }

        this.validateInternalLink(fileName, lineNum, linkText, linkTarget);
      }

      // Find figure references
      this.validateFigureReferences(fileName, lineNum, line);

      // Find table references
      this.validateTableReferences(fileName, lineNum, line);

      // Find equation references
      this.validateEquationReferences(fileName, lineNum, line);
    }
  }

  validateInternalLink(file, line, text, target) {
    // Parse the link target
    const [filePart, anchorPart] = target.split('#');

    // Record the reference
    this.references.push({
      file,
      line,
      text,
      target,
      filePart: filePart || null,
      anchorPart: anchorPart || null,
    });

    // If it's just an anchor (same-file reference)
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

  validateReferences() {
    for (const ref of this.references) {
      const { file, line, text, target, filePart, anchorPart } = ref;

      // Skip if already validated (same-file anchor)
      if (!filePart && anchorPart) continue;

      // Check file reference
      if (filePart) {
        // Extract the filename (handle both ./ and ../ paths)
        let targetFile = filePart.replace(/^\.\//, '').replace(/^\.\.\/contents\//, '');
        targetFile = path.basename(targetFile, '.md');

        // Check if file exists
        if (!this.files.has(targetFile)) {
          this.errors.push({
            file,
            line,
            message: `Broken file reference: ${targetFile}.md not found`,
            text: `[${text}](${target})`,
          });
          continue;
        }

        // Check anchor if specified
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

  validateFigureReferences(file, line, text) {
    // Pattern: "Figure X.Y" or "Fig. X.Y"
    const figurePattern = /\b(?:Figure|Fig\.?)\s+(\d+)\.(\d+)\b/g;
    let match;

    while ((match = figurePattern.exec(text)) !== null) {
      const chapter = parseInt(match[1]);
      const _figureNum = parseInt(match[2]);

      // Check if reference is in the correct chapter
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

  validateTableReferences(file, line, text) {
    // Pattern: "Table X.Y"
    const tablePattern = /\bTable\s+(\d+)\.(\d+)\b/g;
    let match;

    while ((match = tablePattern.exec(text)) !== null) {
      const chapter = parseInt(match[1]);
      const _tableNum = parseInt(match[2]);

      // Check if reference is in the correct chapter
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

  validateEquationReferences(file, line, text) {
    // Pattern: "Equation X.Y" or "Eq. X.Y"
    const equationPattern = /\b(?:Equation|Eq\.?)\s+(\d+)\.(\d+)\b/g;
    let match;

    while ((match = equationPattern.exec(text)) !== null) {
      const chapter = parseInt(match[1]);
      const _eqNum = parseInt(match[2]);

      // Check if reference is in the correct chapter
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

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    if (this.errors.length > 0) {
      console.log(chalk.red.bold(`\n❌ Errors: ${this.errors.length}`));
      this.errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}:${error.line}`));
        console.log(chalk.gray(`    ${error.message}`));
        console.log(chalk.gray(`    "${error.text}"`));
      });
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow.bold(`\n⚠️  Warnings: ${this.warnings.length}`));
      this.warnings.slice(0, 20).forEach(warning => {
        console.log(chalk.yellow(`  ${warning.file}:${warning.line}`));
        console.log(chalk.gray(`    ${warning.message}`));
        console.log(chalk.gray(`    "${warning.text}"`));
      });

      if (this.warnings.length > 20) {
        console.log(chalk.gray(`  ... and ${this.warnings.length - 20} more warnings`));
      }
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green('✅ All cross-reference checks passed!'));
    }

    console.log(chalk.gray(`\n${  '─'.repeat(60)}`));
    console.log(
      chalk.gray(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`)
    );
    console.log(chalk.gray(`Total internal references found: ${this.references.length}`));
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  strict: args.includes('--strict'),
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const validator = new CrossReferenceValidator(options);
validator.validate(directory).then(success => {
  process.exit(success ? 0 : 1);
});
