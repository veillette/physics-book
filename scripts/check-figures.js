#!/usr/bin/env node

/**
 * Figure Validation Script
 *
 * Comprehensive figure validation utility for the physics textbook.
 * Consolidates multiple validation checks into a single tool.
 *
 * Features:
 * - Validate figure filename patterns (Figure_XX_XX_XX.{jpg|svg|png|webp})
 * - Check figures match chapter/section from YAML front matter
 * - Find duplicate figure references across markdown files
 * - Verify sequential figure numbering in resources/
 * - Check for missing figure files
 *
 * Usage:
 *   node scripts/check-figures.js [options]
 *
 * Options:
 *   --check-pattern      Check if figure filenames match expected pattern
 *   --check-consistency  Check if figures in each file match chapter/section
 *   --check-duplicates   Find figures referenced in multiple files
 *   --check-sequence     Check for sequential figure numbering in resources/
 *   --check-missing      Check for figure references pointing to missing files
 *   --all                Run all checks (default)
 *   --help               Show this help message
 */

import fs from 'fs';
import path from 'path';

import {
  printHeader,
  printDivider,
  printErrors,
  printWarnings,
  printSuccess,
  printSummary,
} from './lib/reporter.js';

import { runCli } from './lib/cli.js';

import { getBaseDir, findFiles, readFile } from './lib/files.js';

// Figure filename pattern: Figure_XX_XX_XX.{jpg|svg|png|webp}
const FIGURE_REGEX = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

/**
 * Figure validator class.
 */
class FigureValidator {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.contentsDir = path.join(this.baseDir, 'contents');
    this.resourcesDir = path.join(this.baseDir, 'resources');
    this.options = options;
    this.errors = [];
    this.warnings = [];
  }

  async run() {
    const runAll =
      this.options.all ||
      (!this.options.checkPattern &&
        !this.options.checkConsistency &&
        !this.options.checkDuplicates &&
        !this.options.checkSequence &&
        !this.options.checkMissing);

    printHeader('🖼️', 'Figure Validation');

    if (runAll || this.options.checkPattern) {
      await this.checkPattern();
    }
    if (runAll || this.options.checkConsistency) {
      await this.checkConsistency();
    }
    if (runAll || this.options.checkDuplicates) {
      await this.checkDuplicates();
    }
    if (runAll || this.options.checkSequence) {
      await this.checkSequence();
    }
    if (runAll || this.options.checkMissing) {
      await this.checkMissing();
    }

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * Check if figure filenames match the expected pattern
   */
  async checkPattern() {
    console.log('\n[1] Checking figure filename patterns...');

    const files = await findFiles('*.md', { cwd: this.contentsDir });

    for (const file of files) {
      const filePath = path.join(this.contentsDir, file);
      const content = readFile(filePath);

      // Find all figure references (including potentially malformed ones)
      const figurePattern = /Figure_\S+\.(jpg|svg|png|webp)/gi;
      const matches = content.match(figurePattern) || [];

      for (const match of matches) {
        // Reset regex lastIndex for each test
        FIGURE_REGEX.lastIndex = 0;
        if (!FIGURE_REGEX.test(match)) {
          this.errors.push({
            file,
            line: 0,
            message: `Invalid figure pattern: ${match}`,
          });
        }
      }
    }

    console.log(`   Checked ${files.length} markdown files`);
  }

  /**
   * Check if figures in each file match the chapter/section from YAML front matter
   */
  async checkConsistency() {
    console.log('\n[2] Checking figure/chapter consistency...');

    const files = await findFiles('*.md', { cwd: this.contentsDir });

    for (const file of files) {
      const filePath = path.join(this.contentsDir, file);
      const content = readFile(filePath);

      // Extract chapter and section from YAML front matter
      const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
      if (!yamlMatch) continue;

      const yamlContent = yamlMatch[1];
      const chapterMatch = yamlContent.match(/chapterNumber:\s*(\d+)/);
      const sectionMatch = yamlContent.match(/sectionNumber:\s*(\d+)/);

      if (!chapterMatch || !sectionMatch) continue;

      const chapterNumber = parseInt(chapterMatch[1]);
      const sectionNumber = parseInt(sectionMatch[1]);

      // Find all figures in this file
      let match;
      const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

      while ((match = figureRegex.exec(content)) !== null) {
        const figChapter = parseInt(match[1]);
        const figSection = parseInt(match[2]);

        if (figChapter !== chapterNumber || figSection !== sectionNumber) {
          this.warnings.push({
            file,
            line: 0,
            message: `Figure ${match[0]} doesn't match chapter ${chapterNumber}, section ${sectionNumber}`,
          });
        }
      }
    }

    console.log(`   Validated chapter/section consistency`);
  }

  /**
   * Find figures that are referenced in multiple files
   */
  async checkDuplicates() {
    console.log('\n[3] Checking for duplicate figure references...');

    const files = await findFiles('*.md', { cwd: this.contentsDir });
    const figureMap = new Map(); // figure -> [files]

    for (const file of files) {
      const filePath = path.join(this.contentsDir, file);
      const content = readFile(filePath);

      let match;
      const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

      while ((match = figureRegex.exec(content)) !== null) {
        const figureName = match[0];
        if (!figureMap.has(figureName)) {
          figureMap.set(figureName, new Set());
        }
        figureMap.get(figureName).add(file);
      }
    }

    // Find duplicates
    let duplicateCount = 0;
    for (const [figure, fileSet] of figureMap) {
      if (fileSet.size > 1) {
        duplicateCount++;
        this.warnings.push({
          file: Array.from(fileSet).join(', '),
          line: 0,
          message: `Figure ${figure} referenced in multiple files`,
        });
      }
    }

    console.log(`   Found ${duplicateCount} figures referenced in multiple files`);
  }

  /**
   * Check for sequential figure numbering in resources/
   */
  async checkSequence() {
    console.log('\n[4] Checking sequential figure numbering...');

    let files;
    try {
      files = fs.readdirSync(this.resourcesDir);
    } catch (_error) {
      console.log('   Resources directory not found, skipping');
      return;
    }

    const figureMap = new Map(); // "chapter_section" -> Set of figure numbers

    for (const file of files) {
      const match = file.match(/^Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)$/);
      if (match) {
        const key = `${match[1]}_${match[2]}`;
        const figNum = parseInt(match[3]);

        if (!figureMap.has(key)) {
          figureMap.set(key, new Set());
        }
        figureMap.get(key).add(figNum);
      }
    }

    // Check for gaps in numbering
    for (const [key, figNumbers] of figureMap) {
      const maxNum = Math.max(...figNumbers);
      const expected = new Set(Array.from({ length: maxNum }, (_, i) => i + 1));

      const missing = [...expected].filter(n => !figNumbers.has(n));
      if (missing.length > 0) {
        this.warnings.push({
          file: `Chapter/Section ${key}`,
          line: 0,
          message: `Missing figure numbers: ${missing.join(', ')}`,
        });
      }
    }

    console.log(`   Checked ${figureMap.size} chapter/section combinations`);
  }

  /**
   * Check for figure references pointing to missing files
   */
  async checkMissing() {
    console.log('\n[5] Checking for missing figure files...');

    let resourceFiles;
    try {
      resourceFiles = new Set(fs.readdirSync(this.resourcesDir));
    } catch (_error) {
      console.log('   Resources directory not found, skipping');
      return;
    }

    const files = await findFiles('*.md', { cwd: this.contentsDir });
    const missingFigures = new Set();

    for (const file of files) {
      const filePath = path.join(this.contentsDir, file);
      const content = readFile(filePath);

      let match;
      const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

      while ((match = figureRegex.exec(content)) !== null) {
        const figureName = match[0];
        if (!resourceFiles.has(figureName)) {
          missingFigures.add(figureName);
          this.errors.push({
            file,
            line: 0,
            message: `References missing figure: ${figureName}`,
          });
        }
      }
    }

    console.log(`   Found ${missingFigures.size} missing figure files`);
  }

  printResults() {
    printDivider();

    printErrors(this.errors);
    printWarnings(this.warnings);

    if (this.errors.length === 0 && this.warnings.length === 0) {
      printSuccess('All figure validations passed!');
    }

    printDivider();
    printSummary(this.errors.length, this.warnings.length);
  }
}

// CLI Configuration
runCli({
  name: 'check-figures',
  description: `Validates figure files and references:
- Check figure filename patterns
- Verify figures match chapter/section
- Find duplicate figure references
- Check sequential numbering
- Find missing figure files`,
  flags: {
    checkPattern: {
      flag: '--check-pattern',
      description: 'Check if figure filenames match expected pattern',
      default: false,
    },
    checkConsistency: {
      flag: '--check-consistency',
      description: 'Check if figures match chapter/section',
      default: false,
    },
    checkDuplicates: {
      flag: '--check-duplicates',
      description: 'Find figures referenced in multiple files',
      default: false,
    },
    checkSequence: {
      flag: '--check-sequence',
      description: 'Check for sequential figure numbering',
      default: false,
    },
    checkMissing: {
      flag: '--check-missing',
      description: 'Check for missing figure files',
      default: false,
    },
    all: {
      flag: '--all',
      description: 'Run all checks (default)',
      default: false,
    },
  },
  examples: [
    'node scripts/check-figures.js',
    'node scripts/check-figures.js --all',
    'node scripts/check-figures.js --check-missing',
    'node scripts/check-figures.js --check-pattern --check-consistency',
  ],
  run: async options => {
    const validator = new FigureValidator(options);
    return validator.run();
  },
});
