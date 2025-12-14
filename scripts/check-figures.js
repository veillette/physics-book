#!/usr/bin/env node

/**
 * validate-figures.js
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
 *   node scripts/validate-figures.js [options]
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
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const baseDir = path.join(__dirname, '..');
const contentsDir = path.join(baseDir, 'contents');
const resourcesDir = path.join(baseDir, 'resources');

// Figure filename pattern: Figure_XX_XX_XX.{jpg|svg|png|webp}
const FIGURE_REGEX = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

class FigureValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  async run(options) {
    const runAll = options.all || (!options.checkPattern && !options.checkConsistency &&
                                    !options.checkDuplicates && !options.checkSequence && !options.checkMissing);

    console.log('Figure Validation Report');
    console.log('='.repeat(60));

    if (runAll || options.checkPattern) {
      await this.checkPattern();
    }
    if (runAll || options.checkConsistency) {
      await this.checkConsistency();
    }
    if (runAll || options.checkDuplicates) {
      await this.checkDuplicates();
    }
    if (runAll || options.checkSequence) {
      await this.checkSequence();
    }
    if (runAll || options.checkMissing) {
      await this.checkMissing();
    }

    this.printSummary();
    return this.errors.length === 0;
  }

  /**
   * Check if figure filenames match the expected pattern
   */
  async checkPattern() {
    console.log('\n[1] Checking figure filename patterns...');

    const files = await readdir(contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(contentsDir, file);
      const content = await readFile(filePath, 'utf8');

      // Find all figure references (including potentially malformed ones)
      const figurePattern = /Figure_\S+\.(jpg|svg|png|webp)/gi;
      const matches = content.match(figurePattern) || [];

      for (const match of matches) {
        // Reset regex lastIndex for each test
        FIGURE_REGEX.lastIndex = 0;
        if (!FIGURE_REGEX.test(match)) {
          this.errors.push(`Invalid figure pattern in ${file}: ${match}`);
        }
      }
    }

    console.log(`   Checked ${mdFiles.length} markdown files`);
  }

  /**
   * Check if figures in each file match the chapter/section from YAML front matter
   */
  async checkConsistency() {
    console.log('\n[2] Checking figure/chapter consistency...');

    const files = await readdir(contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(contentsDir, file);
      const content = await readFile(filePath, 'utf8');

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
          this.warnings.push(
            `${file}: Figure ${match[0]} doesn't match chapter ${chapterNumber}, section ${sectionNumber}`
          );
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

    const files = await readdir(contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    const figureMap = new Map(); // figure -> [files]

    for (const file of mdFiles) {
      const filePath = path.join(contentsDir, file);
      const content = await readFile(filePath, 'utf8');

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
    for (const [figure, files] of figureMap) {
      if (files.size > 1) {
        duplicateCount++;
        this.warnings.push(
          `Figure ${figure} referenced in multiple files: ${Array.from(files).join(', ')}`
        );
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
      files = await readdir(resourcesDir);
    } catch (error) {
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
        this.warnings.push(
          `Chapter/Section ${key}: Missing figure numbers: ${missing.join(', ')}`
        );
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
      resourceFiles = new Set(await readdir(resourcesDir));
    } catch (error) {
      console.log('   Resources directory not found, skipping');
      return;
    }

    const files = await readdir(contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    const missingFigures = new Set();

    for (const file of mdFiles) {
      const filePath = path.join(contentsDir, file);
      const content = await readFile(filePath, 'utf8');

      let match;
      const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

      while ((match = figureRegex.exec(content)) !== null) {
        const figureName = match[0];
        if (!resourceFiles.has(figureName)) {
          missingFigures.add(figureName);
          this.errors.push(`${file}: References missing figure: ${figureName}`);
        }
      }
    }

    console.log(`   Found ${missingFigures.size} missing figure files`);
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All figure validations passed!');
    } else {
      if (this.errors.length > 0) {
        console.log(`\n❌ ${this.errors.length} error(s):`);
        this.errors.forEach(e => console.log(`   - ${e}`));
      }

      if (this.warnings.length > 0) {
        console.log(`\n⚠️  ${this.warnings.length} warning(s):`);
        this.warnings.forEach(w => console.log(`   - ${w}`));
      }
    }

    console.log('\n' + '='.repeat(60));
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/validate-figures.js [options]

Options:
  --check-pattern      Check if figure filenames match expected pattern
  --check-consistency  Check if figures in each file match chapter/section
  --check-duplicates   Find figures referenced in multiple files
  --check-sequence     Check for sequential figure numbering in resources/
  --check-missing      Check for figure references pointing to missing files
  --all                Run all checks (default)
  --help               Show this help message
`);
    process.exit(0);
  }

  const options = {
    all: args.includes('--all') || args.length === 0,
    checkPattern: args.includes('--check-pattern'),
    checkConsistency: args.includes('--check-consistency'),
    checkDuplicates: args.includes('--check-duplicates'),
    checkSequence: args.includes('--check-sequence'),
    checkMissing: args.includes('--check-missing')
  };

  const validator = new FigureValidator();
  const success = await validator.run(options);
  process.exit(success ? 0 : 1);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
