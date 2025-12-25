#!/usr/bin/env node

/**
 * parse-summary.js
 *
 * Parses the SUMMARY.md file to extract chapter and section information,
 * and generates a summary.json file used by other scripts (e.g., PDF generation).
 *
 * Usage:
 *   node scripts/parse-summary.js [options]
 *
 * Options:
 *   --output <path>   Output file path (default: summary.json)
 *   --input <path>    Input SUMMARY.md path (default: SUMMARY.md)
 *   --help            Show this help message
 */

import fs from 'fs';
import path from 'path';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli } from './lib/cli.js';

import { getBaseDir, readFile, writeFile } from './lib/files.js';

/**
 * Extract chapter and section information from SUMMARY.md markdown content
 */
function extractInfo(markdown) {
  const lines = markdown.split('\n');

  // Regex patterns for chapter and section entries
  // Format: 1. {: .chapter} [Chapter Title](path/to/file.md)
  const chapterRegex = /^(\d+)\.\s*{:\s*\.chapter\s*}\s*\[(.+)\]\(([^)]+)\)/;
  // Format:    1. {: .section} [Section Title](path/to/file.md)
  const sectionRegex = /^\s*(\d+)\.\s*{:\s*\.section\s*}\s*\[(.+)\]\(([^)]+)\)/;

  const chapters = [];
  let currentChapter = null;

  for (const line of lines) {
    const chapterMatch = line.match(chapterRegex);

    if (chapterMatch) {
      // Save previous chapter if exists
      if (currentChapter) {
        chapters.push(currentChapter);
      }

      const chapterNumber = parseInt(chapterMatch[1]) - 1; // 0-indexed
      const chapterTitle = chapterMatch[2];
      const chapterFile = chapterMatch[3];

      currentChapter = {
        chapterNumber,
        chapterTitle,
        chapterFile,
        sections: [],
      };
    } else {
      const sectionMatch = line.match(sectionRegex);

      if (sectionMatch && currentChapter) {
        const sectionNumber = parseInt(sectionMatch[1]);
        const sectionTitle = sectionMatch[2];
        const sectionFile = sectionMatch[3];

        currentChapter.sections.push({
          sectionNumber,
          sectionTitle,
          sectionFile,
        });
      }
    }
  }

  // Don't forget the last chapter
  if (currentChapter) {
    chapters.push(currentChapter);
  }

  return chapters;
}

/**
 * Summary parser class.
 */
class SummaryParser {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.inputFile = options.input
      ? path.isAbsolute(options.input)
        ? options.input
        : path.join(this.baseDir, options.input)
      : path.join(this.baseDir, 'SUMMARY.md');
    this.outputFile = options.output
      ? path.isAbsolute(options.output)
        ? options.output
        : path.join(this.baseDir, options.output)
      : path.join(this.baseDir, 'summary.json');

    this.stats = {
      chapters: 0,
      sections: 0,
      errors: 0,
    };
  }

  async run() {
    printHeader('📚', 'SUMMARY.md Parser');

    // Check if input file exists
    if (!fs.existsSync(this.inputFile)) {
      console.error(`Error: Input file not found: ${this.inputFile}`);
      this.stats.errors++;
      return false;
    }

    console.log(`Input:  ${this.inputFile}`);
    console.log(`Output: ${this.outputFile}\n`);

    try {
      // Read and parse SUMMARY.md
      const markdown = readFile(this.inputFile);
      const chapters = extractInfo(markdown);

      this.stats.chapters = chapters.length;
      this.stats.sections = chapters.reduce((sum, ch) => sum + ch.sections.length, 0);

      // Write JSON output
      const data = JSON.stringify(chapters, null, 2);
      writeFile(this.outputFile, data);

      this.printResults();
      return true;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      this.stats.errors++;
      return false;
    }
  }

  printResults() {
    printDivider();

    console.log(`\nChapters found:  ${this.stats.chapters}`);
    console.log(`Sections found:  ${this.stats.sections}`);
    console.log(`Output file:     ${this.outputFile}`);

    if (this.stats.errors === 0) {
      printSuccess('Summary parsed successfully!');
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'parse-summary',
  description: `Parses SUMMARY.md to generate summary.json with chapter/section structure.

The generated JSON file is used by other scripts such as:
- generate-pdf.js for PDF generation
- update-front-matter.js for updating YAML front matter`,
  flags: {
    input: {
      flag: '--input',
      description: 'Input SUMMARY.md path (default: SUMMARY.md)',
      type: 'string',
      default: 'SUMMARY.md',
    },
    output: {
      flag: '--output',
      description: 'Output file path (default: summary.json)',
      type: 'string',
      default: 'summary.json',
    },
  },
  examples: [
    'node scripts/parse-summary.js',
    'node scripts/parse-summary.js --output _data/summary.json',
    'node scripts/parse-summary.js --input docs/SUMMARY.md',
  ],
  run: async options => {
    const parser = new SummaryParser(options);
    return parser.run();
  },
});

// Export functions for testing
export { extractInfo };
