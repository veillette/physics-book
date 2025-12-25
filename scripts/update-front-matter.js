#!/usr/bin/env node

/**
 * update-front-matter.js
 *
 * Updates YAML front matter in markdown files with chapter and section numbers
 * based on the book structure defined in summary.json.
 *
 * Usage:
 *   node scripts/update-front-matter.js [options]
 *
 * Options:
 *   --summary <path>   Path to summary.json (default: summary.json)
 *   --dry-run          Show changes without making them
 *   --help             Show this help message
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { getBaseDir, readFile, writeFile } from './lib/files.js';

/**
 * Update the YAML front matter in a markdown file
 */
function updateYAMLBlock(filePath, sectionNumber, chapterNumber, dryRun = false) {
  const fileContent = readFile(filePath);

  // Regex to locate the YAML front matter block
  const yamlRegex = /^---\s*[\r\n]([\s\S]*?)\r?\n?---\s*[\r\n]/;
  const match = fileContent.match(yamlRegex);

  if (match) {
    const yamlString = match[1];
    const yamlData = yaml.load(yamlString);

    // Check if changes are needed
    if (yamlData.sectionNumber === sectionNumber && yamlData.chapterNumber === chapterNumber) {
      return { changed: false };
    }

    // Update the values
    yamlData.sectionNumber = sectionNumber;
    yamlData.chapterNumber = chapterNumber;

    const updatedYAML = yaml.dump(yamlData, { indent: 2, lineWidth: -1, quotingType: '"' });
    const updatedFileContent = fileContent.replace(yamlRegex, `---\n${updatedYAML}---\n\n`);

    if (!dryRun) {
      writeFile(filePath, updatedFileContent);
    }

    return {
      changed: true,
      from: {
        section: match[1].match(/sectionNumber:\s*(\d+)/)?.[1],
        chapter: match[1].match(/chapterNumber:\s*(\d+)/)?.[1],
      },
    };
  }

  return { changed: false, error: 'YAML block not found' };
}

/**
 * Front matter updater class.
 */
class FrontMatterUpdater {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.summaryFile = options.summary
      ? path.isAbsolute(options.summary)
        ? options.summary
        : path.join(this.baseDir, options.summary)
      : path.join(this.baseDir, 'summary.json');
    this.dryRun = options.dryRun || false;

    this.stats = {
      updated: 0,
      skipped: 0,
      errors: 0,
    };
  }

  async run() {
    printHeader('📝', 'Front Matter Updater');

    if (this.dryRun) {
      console.log('(DRY RUN - no changes will be made)\n');
    }

    // Check if summary.json exists
    if (!fs.existsSync(this.summaryFile)) {
      console.error(`Error: Summary file not found: ${this.summaryFile}`);
      console.error('Run "node scripts/parse-summary.js" first to generate it.');
      this.stats.errors++;
      return false;
    }

    // Load summary data
    const summaryContent = readFile(this.summaryFile);
    const summaryData = JSON.parse(summaryContent);

    console.log(`Loaded ${summaryData.length} chapters from ${path.basename(this.summaryFile)}\n`);

    // Process files
    for (const chapterData of summaryData) {
      // Process chapter file
      const chapterFile = path.join(this.baseDir, chapterData.chapterFile);
      if (fs.existsSync(chapterFile)) {
        const result = updateYAMLBlock(chapterFile, 0, chapterData.chapterNumber, this.dryRun);
        if (result.changed) {
          console.log(`  ✓ ${chapterData.chapterFile} (Chapter ${chapterData.chapterNumber})`);
          this.stats.updated++;
        } else if (result.error) {
          console.log(`  ✗ ${chapterData.chapterFile}: ${result.error}`);
          this.stats.errors++;
        } else {
          this.stats.skipped++;
        }
      }

      // Process section files
      for (const section of chapterData.sections) {
        const sectionFile = path.join(this.baseDir, section.sectionFile);
        if (fs.existsSync(sectionFile)) {
          const result = updateYAMLBlock(
            sectionFile,
            section.sectionNumber,
            chapterData.chapterNumber,
            this.dryRun
          );
          if (result.changed) {
            console.log(
              `  ✓ ${section.sectionFile} (Ch ${chapterData.chapterNumber}, Sec ${section.sectionNumber})`
            );
            this.stats.updated++;
          } else if (result.error) {
            console.log(`  ✗ ${section.sectionFile}: ${result.error}`);
            this.stats.errors++;
          } else {
            this.stats.skipped++;
          }
        } else {
          console.log(`  ⚠ ${section.sectionFile}: File not found`);
        }
      }
    }

    this.printResults();
    return this.stats.errors === 0;
  }

  printResults() {
    printDivider();

    if (this.dryRun) {
      console.log('\n(DRY RUN - no changes were made)');
    }

    console.log(`\nFiles ${this.dryRun ? 'would be ' : ''}updated: ${this.stats.updated}`);
    console.log(`Files skipped (no changes needed): ${this.stats.skipped}`);
    if (this.stats.errors > 0) {
      console.log(`Errors: ${this.stats.errors}`);
    }

    if (this.stats.errors === 0) {
      if (this.dryRun && this.stats.updated > 0) {
        console.log('\n⚠️ DRY RUN - Use without --dry-run to apply changes');
      } else {
        printSuccess('Front matter update completed!');
      }
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'update-front-matter',
  description: `Updates YAML front matter in markdown files with chapter/section numbers
based on the book structure defined in summary.json.

Requires summary.json to exist (run parse-summary.js first).`,
  flags: {
    summary: {
      flag: '--summary',
      description: 'Path to summary.json (default: summary.json)',
      type: 'string',
      default: 'summary.json',
    },
    dryRun: STANDARD_FLAGS.dryRun,
  },
  examples: [
    'node scripts/update-front-matter.js',
    'node scripts/update-front-matter.js --dry-run',
    'node scripts/update-front-matter.js --summary _data/summary.json',
  ],
  run: async options => {
    const updater = new FrontMatterUpdater(options);
    return updater.run();
  },
});
