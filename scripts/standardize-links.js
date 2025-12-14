#!/usr/bin/env node

/**
 * Script to standardize internal links in markdown files.
 *
 * Converts old format: ../contents/filename.md
 * To new format: ./filename (no .md extension)
 *
 * This follows Jekyll/MyST conventions for extension-less links.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LinkStandardizer {
  constructor(options = {}) {
    this.baseDir = options.baseDir || path.join(__dirname, '..');
    this.contentDir = path.join(this.baseDir, 'contents');
    this.dryRun = options.dryRun || false;

    this.stats = {
      filesProcessed: 0,
      filesModified: 0,
      linksConverted: 0,
      errors: []
    };

    this.changes = [];
  }

  async run() {
    console.log('🔗 Internal Link Standardization Tool\n');
    console.log(`Mode: ${this.dryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (changes will be applied)'}\n`);

    // Find all markdown files in contents directory
    const markdownFiles = await glob('*.md', {
      cwd: this.contentDir
    });

    console.log(`Found ${markdownFiles.length} markdown files in contents/\n`);

    for (const file of markdownFiles) {
      await this.processFile(file);
    }

    this.printReport();
    return this.stats.errors.length === 0;
  }

  async processFile(filename) {
    const filePath = path.join(this.contentDir, filename);
    this.stats.filesProcessed++;

    try {
      let content = fs.readFileSync(filePath, 'utf8');
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
          targetFile: targetFile,
          line: this.getLineNumber(originalContent, match.index)
        });
      }

      if (fileChanges.length === 0) {
        return; // No changes needed
      }

      // Second pass: apply replacements
      for (const change of fileChanges) {
        content = content.replace(change.old, change.new);
        this.stats.linksConverted++;
        this.changes.push({
          file: filename,
          line: change.line,
          old: change.old,
          new: change.new
        });
      }

      // Write changes if not dry run
      if (!this.dryRun && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.stats.filesModified++;
        console.log(`✓ ${filename}: ${fileChanges.length} link(s) converted`);
      } else if (fileChanges.length > 0) {
        console.log(`  ${filename}: ${fileChanges.length} link(s) would be converted`);
      }

    } catch (error) {
      this.stats.errors.push(`Error processing ${filename}: ${error.message}`);
      console.error(`✗ ${filename}: ${error.message}`);
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  printReport() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 STANDARDIZATION REPORT');
    console.log('='.repeat(70));

    console.log(`\nFiles processed: ${this.stats.filesProcessed}`);
    console.log(`Files modified: ${this.stats.filesModified}`);
    console.log(`Links converted: ${this.stats.linksConverted}`);

    if (this.stats.errors.length > 0) {
      console.log(`\n❌ Errors: ${this.stats.errors.length}`);
      for (const error of this.stats.errors) {
        console.log(`   ${error}`);
      }
    }

    if (this.changes.length > 0 && this.dryRun) {
      console.log('\n📝 Changes that would be made:');
      console.log('-'.repeat(70));

      // Group by file
      const byFile = {};
      for (const change of this.changes) {
        if (!byFile[change.file]) {
          byFile[change.file] = [];
        }
        byFile[change.file].push(change);
      }

      for (const [file, changes] of Object.entries(byFile)) {
        console.log(`\n${file}:`);
        for (const change of changes) {
          console.log(`  Line ${change.line}:`);
          console.log(`    - ${change.old}`);
          console.log(`    + ${change.new}`);
        }
      }
    }

    console.log('\n' + '='.repeat(70));

    if (this.dryRun && this.changes.length > 0) {
      console.log('\n💡 Run with --apply to make these changes');
    }
  }
}

// Validation function to check if target files exist
async function validateLinks(baseDir) {
  const contentDir = path.join(baseDir, 'contents');
  const markdownFiles = await glob('*.md', { cwd: contentDir });

  console.log('\n🔍 Validating converted links...\n');

  let valid = 0;
  let invalid = 0;
  const errors = [];

  // Build list of valid targets
  const validTargets = new Set(
    markdownFiles.map(f => f.replace('.md', ''))
  );

  for (const file of markdownFiles) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Find all ./filename links
    const linkPattern = /\[([^\]]*)\]\(\.\/([^)#\s]+)(#[^)]*)?\)/g;
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      const [, , targetFile] = match;

      if (validTargets.has(targetFile)) {
        valid++;
      } else {
        invalid++;
        const line = content.substring(0, match.index).split('\n').length;
        errors.push({
          file,
          line,
          target: targetFile,
          link: match[0]
        });
      }
    }
  }

  console.log(`✓ Valid links: ${valid}`);
  console.log(`✗ Invalid links: ${invalid}`);

  if (errors.length > 0) {
    console.log('\n❌ Broken links found:');
    for (const error of errors) {
      console.log(`  ${error.file}:${error.line}`);
      console.log(`    Link: ${error.link}`);
      console.log(`    Target "${error.target}" not found`);
    }
  }

  return invalid === 0;
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: !args.includes('--apply'),
    baseDir: path.join(__dirname, '..')
  };

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/standardize-links.js [options]

Options:
  --apply    Apply changes (default is dry run)
  --validate Only validate existing links, don't transform
  --help     Show this help message

Examples:
  node scripts/standardize-links.js           # Dry run - show what would change
  node scripts/standardize-links.js --apply   # Apply the changes
  node scripts/standardize-links.js --validate # Just validate links
`);
    process.exit(0);
  }

  if (args.includes('--validate')) {
    const valid = await validateLinks(options.baseDir);
    process.exit(valid ? 0 : 1);
  }

  const standardizer = new LinkStandardizer(options);
  const success = await standardizer.run();

  // Also run validation after standardization
  if (!options.dryRun) {
    await validateLinks(options.baseDir);
  }

  process.exit(success ? 0 : 1);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
