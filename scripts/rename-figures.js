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
 *   --pattern         Use pattern matching mode
 *   --dry-run         Show what would be changed without making changes
 *   --help            Show this help message
 */

import fs from 'fs';
import path from 'path';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { getBaseDir, readFile, writeFile } from './lib/files.js';

/**
 * Figure renamer class.
 */
class FigureRenamer {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.contentsDir = path.join(this.baseDir, 'contents');
    this.resourcesDir = path.join(this.baseDir, 'resources');
    this.dryRun = options.dryRun || false;
    this.patternMode = options.pattern || false;

    this.stats = {
      figuresRenamed: 0,
      filesModified: 0,
      errors: 0,
    };

    this.renamedFiles = [];
    this.modifiedFiles = [];
  }

  async run(args = []) {
    printHeader('🖼️', 'Figure Renamer');

    if (this.dryRun) {
      console.log('(DRY RUN - no changes will be made)\n');
    }

    // Parse positional arguments
    const positionalArgs = args.filter(a => !a.startsWith('--'));

    if (positionalArgs.length < 2) {
      console.error('Error: Two arguments required');
      console.error('Usage: node scripts/rename-figures.js <old-name> <new-name>');
      console.error('   or: node scripts/rename-figures.js --pattern <search> <replace>');
      this.stats.errors++;
      return false;
    }

    try {
      if (this.patternMode) {
        await this.renamePattern(positionalArgs[0], positionalArgs[1]);
      } else {
        await this.renameFigure(positionalArgs[0], positionalArgs[1]);
      }

      this.printResults();
      return this.stats.errors === 0;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      this.stats.errors++;
      return false;
    }
  }

  async renameFigure(oldName, newName) {
    console.log(`Renaming: ${oldName} -> ${newName}\n`);

    // Check if the figure file exists
    const extensions = ['.jpg', '.svg', '.png', '.webp'];
    let foundExtension = null;

    for (const ext of extensions) {
      const oldFilePath = path.join(this.resourcesDir, oldName + ext);
      if (fs.existsSync(oldFilePath)) {
        foundExtension = ext;
        break;
      }
    }

    // Rename the file in resources/
    if (foundExtension && fs.existsSync(this.resourcesDir)) {
      const oldFilePath = path.join(this.resourcesDir, oldName + foundExtension);
      const newFilePath = path.join(this.resourcesDir, newName + foundExtension);

      console.log(`📁 Renaming file: ${oldName}${foundExtension} -> ${newName}${foundExtension}`);

      if (!this.dryRun) {
        if (fs.existsSync(newFilePath)) {
          console.log(`   ⚠️ Warning: ${newFilePath} already exists, skipping file rename`);
        } else {
          fs.renameSync(oldFilePath, newFilePath);
          this.renamedFiles.push({ old: oldFilePath, new: newFilePath });
          this.stats.figuresRenamed++;
        }
      } else {
        this.stats.figuresRenamed++;
      }
    } else {
      console.log(`   ⚠️ Figure file not found in resources/`);
    }

    // Update references in markdown files
    await this.updateReferences(oldName, newName);
  }

  async renamePattern(searchPattern, replacePattern) {
    console.log(`Pattern rename: "${searchPattern}" -> "${replacePattern}"\n`);

    // Find matching files in resources/
    if (fs.existsSync(this.resourcesDir)) {
      const files = fs.readdirSync(this.resourcesDir);
      const matchingFiles = files.filter(f => f.includes(searchPattern));

      console.log(`Found ${matchingFiles.length} matching file(s) in resources/\n`);

      for (const file of matchingFiles) {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const newBaseName = baseName.replace(searchPattern, replacePattern);

        if (baseName !== newBaseName) {
          const oldPath = path.join(this.resourcesDir, file);
          const newPath = path.join(this.resourcesDir, newBaseName + ext);

          console.log(`   📁 ${file} -> ${newBaseName}${ext}`);

          if (!this.dryRun) {
            if (fs.existsSync(newPath)) {
              console.log(`      ⚠️ Skipping: ${newPath} already exists`);
            } else {
              fs.renameSync(oldPath, newPath);
              this.renamedFiles.push({ old: oldPath, new: newPath });
              this.stats.figuresRenamed++;
            }
          } else {
            this.stats.figuresRenamed++;
          }
        }
      }
    }

    // Update references in markdown files
    await this.updateReferencesPattern(searchPattern, replacePattern);
  }

  async updateReferences(oldName, newName) {
    const files = fs.readdirSync(this.contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`\nUpdating references in ${mdFiles.length} markdown files...`);

    for (const file of mdFiles) {
      const filePath = path.join(this.contentsDir, file);
      const content = readFile(filePath);

      // Create regex to match the old figure name
      const regex = new RegExp(`\\b${this.escapeRegex(oldName)}\\b`, 'g');

      if (regex.test(content)) {
        console.log(`   📝 Updating: ${file}`);

        if (!this.dryRun) {
          const updatedContent = content.replace(regex, newName);
          writeFile(filePath, updatedContent);
        }

        this.modifiedFiles.push(file);
        this.stats.filesModified++;
      }
    }
  }

  async updateReferencesPattern(searchPattern, replacePattern) {
    const files = fs.readdirSync(this.contentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`\nUpdating references in ${mdFiles.length} markdown files...`);

    for (const file of mdFiles) {
      const filePath = path.join(this.contentsDir, file);
      const content = readFile(filePath);

      const regex = new RegExp(this.escapeRegex(searchPattern), 'g');

      if (regex.test(content)) {
        console.log(`   📝 Updating: ${file}`);

        if (!this.dryRun) {
          const updatedContent = content.replace(regex, replacePattern);
          writeFile(filePath, updatedContent);
        }

        this.modifiedFiles.push(file);
        this.stats.filesModified++;
      }
    }
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  printResults() {
    printDivider();

    if (this.dryRun) {
      console.log('\n(DRY RUN - no changes were made)');
    }

    console.log(
      `\nFigure files ${this.dryRun ? 'would be ' : ''}renamed: ${this.stats.figuresRenamed}`
    );
    console.log(
      `Markdown files ${this.dryRun ? 'would be ' : ''}updated: ${this.stats.filesModified}`
    );

    if (this.stats.figuresRenamed > 0 || this.stats.filesModified > 0) {
      if (this.dryRun) {
        console.log('\n⚠️ DRY RUN - Use without --dry-run to apply changes');
      } else {
        printSuccess('Rename operation completed!');
      }
    } else {
      console.log('\n⚠️ No changes were made.');
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'rename-figures',
  description: `Renames figure files and updates all references in markdown files.

Modes:
- Single rename: <old-name> <new-name>
- Pattern rename: --pattern <search> <replace>`,
  flags: {
    pattern: {
      flag: '--pattern',
      description: 'Use pattern matching mode',
      default: false,
    },
    dryRun: STANDARD_FLAGS.dryRun,
  },
  examples: [
    'node scripts/rename-figures.js Figure_01_02_03 Figure_01_02_04',
    'node scripts/rename-figures.js Figure_01_02_03 Figure_01_02_04 --dry-run',
    'node scripts/rename-figures.js --pattern "Figure_01_" "Figure_02_"',
  ],
  run: async options => {
    const renamer = new FigureRenamer(options);
    // Get positional arguments from command line
    const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
    return renamer.run(args);
  },
});
