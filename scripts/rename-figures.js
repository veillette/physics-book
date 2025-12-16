#!/usr/bin/env node

/**
 * rename-figures.js
 *
 * Utility to rename figure files and update all references in markdown files.
 * Useful for reorganizing or renumbering figures.
 *
 * Usage:
 *   node scripts/rename-figures.js <old-name> <new-name> [options]
 *   node scripts/rename-figures.js --pattern <search> <replace> [options]
 *
 * Options:
 *   --dry-run     Show what would be changed without making changes
 *   --help        Show this help message
 *
 * Examples:
 *   # Rename a single figure
 *   node scripts/rename-figures.js Figure_01_02_03 Figure_01_02_04
 *
 *   # Preview changes with dry-run
 *   node scripts/rename-figures.js Figure_01_02_03 Figure_01_02_04 --dry-run
 *
 *   # Rename using pattern (replaces all matches)
 *   node scripts/rename-figures.js --pattern "Figure_01_" "Figure_02_"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '..');
const contentsDir = path.join(baseDir, 'contents');
const resourcesDir = path.join(baseDir, 'resources');

class FigureRenamer {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.filesModified = [];
    this.figuresRenamed = [];
  }

  /**
   * Rename a figure file in resources/ and update all markdown references
   */
  async renameFigure(oldName, newName) {
    console.log(`\nRenaming: ${oldName} -> ${newName}`);
    console.log('='.repeat(60));

    if (this.dryRun) {
      console.log('(DRY RUN - no changes will be made)\n');
    }

    // Check if the figure file exists
    const extensions = ['.jpg', '.svg', '.png', '.webp'];
    let foundExtension = null;

    for (const ext of extensions) {
      const oldFilePath = path.join(resourcesDir, oldName + ext);
      if (fs.existsSync(oldFilePath)) {
        foundExtension = ext;
        break;
      }
    }

    // Rename the file in resources/
    if (foundExtension && fs.existsSync(resourcesDir)) {
      const oldFilePath = path.join(resourcesDir, oldName + foundExtension);
      const newFilePath = path.join(resourcesDir, newName + foundExtension);

      console.log(`📁 Renaming file: ${oldName}${foundExtension} -> ${newName}${foundExtension}`);

      if (!this.dryRun) {
        if (fs.existsSync(newFilePath)) {
          console.log(`   ⚠️ Warning: ${newFilePath} already exists, skipping file rename`);
        } else {
          fs.renameSync(oldFilePath, newFilePath);
          this.figuresRenamed.push({ old: oldFilePath, new: newFilePath });
        }
      }
    } else {
      console.log(`   ⚠️ Figure file not found in resources/`);
    }

    // Update references in markdown files
    await this.updateReferences(oldName, newName);
  }

  /**
   * Rename figures matching a pattern
   */
  async renamePattern(searchPattern, replacePattern) {
    console.log(`\nPattern rename: "${searchPattern}" -> "${replacePattern}"`);
    console.log('='.repeat(60));

    if (this.dryRun) {
      console.log('(DRY RUN - no changes will be made)\n');
    }

    // Find matching files in resources/
    if (fs.existsSync(resourcesDir)) {
      const files = fs.readdirSync(resourcesDir);
      const matchingFiles = files.filter(f => f.includes(searchPattern));

      console.log(`Found ${matchingFiles.length} matching file(s) in resources/`);

      for (const file of matchingFiles) {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const newBaseName = baseName.replace(searchPattern, replacePattern);

        if (baseName !== newBaseName) {
          const oldPath = path.join(resourcesDir, file);
          const newPath = path.join(resourcesDir, newBaseName + ext);

          console.log(`   📁 ${file} -> ${newBaseName}${ext}`);

          if (!this.dryRun) {
            if (fs.existsSync(newPath)) {
              console.log(`      ⚠️ Skipping: ${newPath} already exists`);
            } else {
              fs.renameSync(oldPath, newPath);
              this.figuresRenamed.push({ old: oldPath, new: newPath });
            }
          }
        }
      }
    }

    // Update references in markdown files
    await this.updateReferencesPattern(searchPattern, replacePattern);
  }

  /**
   * Update references in markdown files for a single rename
   */
  async updateReferences(oldName, newName) {
    const files = fs.readdirSync(contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`\nUpdating references in ${mdFiles.length} markdown files...`);

    for (const file of mdFiles) {
      const filePath = path.join(contentsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // Create regex to match the old figure name with any extension
      const regex = new RegExp(`\\b${this.escapeRegex(oldName)}\\b`, 'g');

      if (regex.test(content)) {
        console.log(`   📝 Updating: ${file}`);

        if (!this.dryRun) {
          const updatedContent = content.replace(regex, newName);
          fs.writeFileSync(filePath, updatedContent, 'utf8');
        }

        this.filesModified.push(file);
      }
    }
  }

  /**
   * Update references in markdown files using a pattern
   */
  async updateReferencesPattern(searchPattern, replacePattern) {
    const files = fs.readdirSync(contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`\nUpdating references in ${mdFiles.length} markdown files...`);

    for (const file of mdFiles) {
      const filePath = path.join(contentsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      const regex = new RegExp(this.escapeRegex(searchPattern), 'g');

      if (regex.test(content)) {
        console.log(`   📝 Updating: ${file}`);

        if (!this.dryRun) {
          const updatedContent = content.replace(regex, replacePattern);
          fs.writeFileSync(filePath, updatedContent, 'utf8');
        }

        this.filesModified.push(file);
      }
    }
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  printSummary() {
    console.log(`\n${'='.repeat(60)}`);
    console.log('SUMMARY');
    console.log('='.repeat(60));

    if (this.dryRun) {
      console.log('\n(DRY RUN - no changes were made)');
    }

    console.log(`\nFigure files renamed: ${this.figuresRenamed.length}`);
    console.log(`Markdown files updated: ${this.filesModified.length}`);

    if (this.figuresRenamed.length > 0 || this.filesModified.length > 0) {
      console.log('\n✅ Rename operation completed!');
    } else {
      console.log('\n⚠️ No changes were made.');
    }
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    console.log(`
Usage:
  node scripts/rename-figures.js <old-name> <new-name> [options]
  node scripts/rename-figures.js --pattern <search> <replace> [options]

Options:
  --dry-run     Show what would be changed without making changes
  --help        Show this help message

Examples:
  # Rename a single figure
  node scripts/rename-figures.js Figure_01_02_03 Figure_01_02_04

  # Preview changes with dry-run
  node scripts/rename-figures.js Figure_01_02_03 Figure_01_02_04 --dry-run

  # Rename using pattern (replaces all matches)
  node scripts/rename-figures.js --pattern "Figure_01_" "Figure_02_"
`);
    process.exit(args.includes('--help') ? 0 : 1);
  }

  const dryRun = args.includes('--dry-run');
  const patternMode = args.includes('--pattern');
  const filteredArgs = args.filter(a => !a.startsWith('--'));

  const renamer = new FigureRenamer({ dryRun });

  try {
    if (patternMode) {
      if (filteredArgs.length < 2) {
        console.error('Error: --pattern requires two arguments: <search> <replace>');
        process.exit(1);
      }
      await renamer.renamePattern(filteredArgs[0], filteredArgs[1]);
    } else {
      if (filteredArgs.length < 2) {
        console.error('Error: Two arguments required: <old-name> <new-name>');
        process.exit(1);
      }
      await renamer.renameFigure(filteredArgs[0], filteredArgs[1]);
    }

    renamer.printSummary();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
