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
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

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
        sections: []
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
          sectionFile
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
 * Write the parsed data to a JSON file
 */
function writeToJson(chapters, outputFilePath) {
  const data = JSON.stringify(chapters, null, 2);
  fs.writeFileSync(outputFilePath, data, 'utf8');
}

// CLI
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/parse-summary.js [options]

Parses SUMMARY.md to generate summary.json with chapter/section structure.

Options:
  --output <path>   Output file path (default: summary.json)
  --input <path>    Input SUMMARY.md path (default: SUMMARY.md)
  --help            Show this help message

Examples:
  node scripts/parse-summary.js
  node scripts/parse-summary.js --output _data/summary.json
`);
    process.exit(0);
  }

  // Parse arguments
  let inputFile = path.join(baseDir, 'SUMMARY.md');
  let outputFile = path.join(baseDir, 'summary.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) {
      inputFile = path.isAbsolute(args[i + 1])
        ? args[i + 1]
        : path.join(baseDir, args[i + 1]);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFile = path.isAbsolute(args[i + 1])
        ? args[i + 1]
        : path.join(baseDir, args[i + 1]);
      i++;
    }
  }

  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file not found: ${inputFile}`);
    process.exit(1);
  }

  console.log(`Parsing: ${inputFile}`);

  // Read and parse SUMMARY.md
  const markdown = fs.readFileSync(inputFile, 'utf8');
  const chapters = extractInfo(markdown);

  // Write JSON output
  writeToJson(chapters, outputFile);

  console.log(`Generated: ${outputFile}`);
  console.log(`  - ${chapters.length} chapters found`);

  const totalSections = chapters.reduce((sum, ch) => sum + ch.sections.length, 0);
  console.log(`  - ${totalSections} sections found`);

  console.log('\n✅ Summary parsed successfully!');
}

main();
