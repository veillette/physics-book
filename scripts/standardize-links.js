#!/usr/bin/env node

/**
 * Link Standardization Script
 *
 * Standardizes internal links in markdown files.
 *
 * Converts old format: ../contents/filename.md
 * To new format: ./filename (no .md extension)
 *
 * This follows Jekyll/MyST conventions for extension-less links.
 *
 * Usage:
 *   node scripts/standardize-links.js [options] [directory]
 *
 * Options:
 *   --fix, --apply     Apply fixes to files
 *   --validate         Only validate existing links
 *   --strict           Enable stricter validation
 *   --help, -h         Show help message
 */

import path from 'path';

import {
  printHeader,
  printDivider,
  printFixes,
  printErrors,
  printSuccess,
  printSummary,
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findFiles, readFile, writeFile, getBaseDir } from './lib/files.js';

import { getLineNumber } from './lib/parser.js';

/**
 * Link standardizer class.
 */
class LinkStandardizer {
  constructor(options = {}) {
    this.apply = options.apply || false;
    this.validateOnly = options.validate || false;
    this.strict = options.strict || false;
    this.baseDir = getBaseDir(import.meta.url);
    this.contentDir = path.join(this.baseDir, 'contents');
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
    this.filesChecked = 0;
    this.filesModified = 0;
    this.linksConverted = 0;
  }

  /**
   * Run the standardization process.
   * @param {string} directory - Directory to process
   * @returns {Promise<boolean>} - Success status
   */
  async run(directory = 'contents') {
    if (this.validateOnly) {
      return this.validate(directory);
    }

    const emoji = this.apply ? '🔧' : '🔗';
    const title = this.apply ? 'Link Standardization (Apply)' : 'Link Standardization (Check)';

    printHeader(emoji, title);

    if (!this.apply) {
      console.log('Mode: DRY RUN (no changes will be made)\n');
    } else {
      console.log('Mode: APPLY CHANGES\n');
    }

    // Find all markdown files in contents directory
    const files = await findFiles('*.md', { cwd: this.contentDir });
    console.log(`Found ${files.length} markdown files\n`);

    for (const file of files) {
      await this.processFile(file);
    }

    this.printResults();

    // Also run validation after standardization if applying
    if (this.apply) {
      await this.validate(directory);
    }

    return this.errors.length === 0;
  }

  /**
   * Validate existing links.
   * @param {string} directory - Directory to validate
   * @returns {Promise<boolean>} - Success status
   */
  async validate(directory = 'contents') {
    printHeader('🔍', 'Link Validation');

    const files = await findFiles('*.md', { cwd: this.contentDir });
    console.log(`Validating links in ${files.length} files\n`);

    // Build list of valid targets
    const validTargets = new Set(files.map(f => f.replace('.md', '')));

    let valid = 0;
    let invalid = 0;
    const linkErrors = [];

    for (const file of files) {
      const filePath = path.join(this.contentDir, file);
      const content = readFile(filePath);

      // Find all ./filename links
      const linkPattern = /\[([^\]]*)\]\(\.\/([^)#\s]+)(#[^)]*)?\)/g;
      let match;

      while ((match = linkPattern.exec(content)) !== null) {
        const [, , targetFile] = match;

        if (validTargets.has(targetFile)) {
          valid++;
        } else {
          invalid++;
          const line = getLineNumber(content, match.index);
          linkErrors.push({
            file,
            line,
            message: `Broken link: target "${targetFile}" not found`,
            text: match[0],
          });
        }
      }
    }

    printDivider();

    console.log(`✓ Valid links: ${valid}`);
    console.log(`✗ Invalid links: ${invalid}`);

    if (linkErrors.length > 0) {
      printErrors(linkErrors);
    } else {
      printSuccess('All links are valid!');
    }

    printDivider();

    return invalid === 0;
  }

  /**
   * Process a single file.
   * @param {string} filename - File name
   */
  async processFile(filename) {
    const filePath = path.join(this.contentDir, filename);
    this.filesChecked++;

    const content = readFile(filePath);
    const originalContent = content;

    // Pattern to match: [text](../contents/filename.md) or [text](../contents/filename.md#anchor)
    const oldLinkPattern = /\[([^\]]*)\]\(\.\.\/contents\/([^)#\s]+)\.md(#[^)]*)?\)/g;

    let match;
    const fileChanges = [];

    // First pass: collect all matches
    while ((match = oldLinkPattern.exec(originalContent)) !== null) {
      const [fullMatch, linkText, targetFile, anchor] = match;
      const newLink = `[${linkText}](./${targetFile}${anchor || ''})`;
      fileChanges.push({
        old: fullMatch,
        new: newLink,
        targetFile,
        line: getLineNumber(originalContent, match.index),
      });
    }

    if (fileChanges.length === 0) {
      return; // No changes needed
    }

    // Second pass: apply replacements
    let newContent = originalContent;
    for (const change of fileChanges) {
      newContent = newContent.replace(change.old, change.new);
      this.linksConverted++;
      this.fixes.push({
        file: filename,
        line: change.line,
        before: change.old,
        after: change.new,
      });
    }

    // Write changes if not dry run
    if (this.apply && newContent !== originalContent) {
      writeFile(filePath, newContent);
      this.filesModified++;
      console.log(`✓ ${filename}: ${fileChanges.length} link(s) converted`);
    } else if (fileChanges.length > 0) {
      console.log(`  ${filename}: ${fileChanges.length} link(s) would be converted`);
    }
  }

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    console.log(`\nFiles processed: ${this.filesChecked}`);
    console.log(`Files modified: ${this.filesModified}`);
    console.log(`Links converted: ${this.linksConverted}`);

    if (this.apply) {
      printFixes(this.fixes, this.filesModified, true);
    } else if (this.fixes.length > 0) {
      console.log('\nChanges that would be made:');
      console.log('-'.repeat(60));

      // Group by file
      const byFile = {};
      for (const fix of this.fixes) {
        if (!byFile[fix.file]) {
          byFile[fix.file] = [];
        }
        byFile[fix.file].push(fix);
      }

      for (const [file, fixes] of Object.entries(byFile)) {
        console.log(`\n${file}:`);
        for (const fix of fixes.slice(0, 5)) {
          console.log(`  Line ${fix.line}:`);
          console.log(`    - ${fix.before}`);
          console.log(`    + ${fix.after}`);
        }
        if (fixes.length > 5) {
          console.log(`  ... and ${fixes.length - 5} more changes`);
        }
      }
    }

    if (this.errors.length > 0) {
      printErrors(this.errors);
    }

    if (this.fixes.length === 0 && this.errors.length === 0) {
      printSuccess('All links are already standardized!');
    } else if (!this.apply && this.fixes.length > 0) {
      console.log('\n💡 Run with --apply or --fix to make these changes');
    }

    printDivider();
    printSummary(this.errors.length, this.warnings.length);
  }
}

// CLI Configuration
runCli({
  name: 'standardize-links',
  description: `Standardizes internal links in markdown files:
- Converts ../contents/filename.md to ./filename
- Removes .md extensions (Jekyll/MyST convention)
- Validates that link targets exist`,
  flags: {
    strict: STANDARD_FLAGS.strict,
    apply: STANDARD_FLAGS.apply,
    fix: STANDARD_FLAGS.fix,
    validate: {
      flag: '--validate',
      description: "Only validate existing links, don't transform",
      default: false,
    },
  },
  examples: [
    'node scripts/standardize-links.js',
    'node scripts/standardize-links.js --apply',
    'node scripts/standardize-links.js --validate',
    'node scripts/standardize-links.js contents/',
  ],
  run: async options => {
    const standardizer = new LinkStandardizer({
      strict: options.strict,
      apply: options.apply || options.fix,
      validate: options.validate,
    });
    return standardizer.run(options.directory);
  },
});
