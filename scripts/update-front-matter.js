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
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

/**
 * Update the YAML front matter in a markdown file
 */
function updateYAMLBlock(filePath, sectionNumber, chapterNumber, dryRun = false) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

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
      fs.writeFileSync(filePath, updatedFileContent, 'utf8');
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
 * Process all files based on summary data
 */
function processContentsDirectory(summaryData, dryRun = false) {
  let updatedCount = 0;
  let errorCount = 0;

  for (const chapterData of summaryData) {
    // Process chapter file
    const chapterFile = path.join(baseDir, chapterData.chapterFile);
    if (fs.existsSync(chapterFile)) {
      const result = updateYAMLBlock(chapterFile, 0, chapterData.chapterNumber, dryRun);
      if (result.changed) {
        console.log(`  ✓ ${chapterData.chapterFile} (Chapter ${chapterData.chapterNumber})`);
        updatedCount++;
      } else if (result.error) {
        console.log(`  ✗ ${chapterData.chapterFile}: ${result.error}`);
        errorCount++;
      }
    }

    // Process section files
    for (const section of chapterData.sections) {
      const sectionFile = path.join(baseDir, section.sectionFile);
      if (fs.existsSync(sectionFile)) {
        const result = updateYAMLBlock(
          sectionFile,
          section.sectionNumber,
          chapterData.chapterNumber,
          dryRun
        );
        if (result.changed) {
          console.log(
            `  ✓ ${section.sectionFile} (Ch ${chapterData.chapterNumber}, Sec ${section.sectionNumber})`
          );
          updatedCount++;
        } else if (result.error) {
          console.log(`  ✗ ${section.sectionFile}: ${result.error}`);
          errorCount++;
        }
      } else {
        console.log(`  ⚠ ${section.sectionFile}: File not found`);
      }
    }
  }

  return { updatedCount, errorCount };
}

// CLI
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/update-front-matter.js [options]

Updates YAML front matter in markdown files with chapter/section numbers
based on the book structure defined in summary.json.

Options:
  --summary <path>   Path to summary.json (default: summary.json)
  --dry-run          Show changes without making them
  --help             Show this help message

Examples:
  node scripts/update-front-matter.js
  node scripts/update-front-matter.js --dry-run
  node scripts/update-front-matter.js --summary _data/summary.json
`);
    process.exit(0);
  }

  // Parse arguments
  let summaryFile = path.join(baseDir, 'summary.json');
  const dryRun = args.includes('--dry-run');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--summary' && args[i + 1]) {
      summaryFile = path.isAbsolute(args[i + 1]) ? args[i + 1] : path.join(baseDir, args[i + 1]);
      i++;
    }
  }

  // Check if summary.json exists
  if (!fs.existsSync(summaryFile)) {
    console.error(`Error: Summary file not found: ${summaryFile}`);
    console.error('Run "node scripts/parse-summary.js" first to generate it.');
    process.exit(1);
  }

  console.log('Updating YAML Front Matter');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('(DRY RUN - no changes will be made)\n');
  }

  // Load summary data
  const summaryContent = fs.readFileSync(summaryFile, 'utf8');
  const summaryData = JSON.parse(summaryContent);

  console.log(`Loaded ${summaryData.length} chapters from ${path.basename(summaryFile)}\n`);

  // Process files
  const { updatedCount, errorCount } = processContentsDirectory(summaryData, dryRun);

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('SUMMARY');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('\n(DRY RUN - no changes were made)');
  }

  console.log(`\nFiles updated: ${updatedCount}`);
  if (errorCount > 0) {
    console.log(`Errors: ${errorCount}`);
  }

  if (updatedCount > 0 || errorCount === 0) {
    console.log('\n✅ Front matter update completed!');
  } else {
    console.log('\n⚠️ Some errors occurred.');
    process.exit(1);
  }
}

main();
