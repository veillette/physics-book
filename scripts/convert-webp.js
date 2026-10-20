#!/usr/bin/env node

/**
 * WebP Image Converter Script
 *
 * Converts figure images (JPG, PNG) to WebP next to the originals in resources/, so the
 * book can reference them directly (as it already does for a few figures). A WebP is
 * kept only when it is meaningfully smaller than its source; otherwise it is discarded
 * and the original stays in use.
 *
 * Default is a dry run. Nothing is written without --apply.
 *
 * Usage:
 *   node scripts/convert-webp.js [options]
 *
 * Options:
 *   --apply              Write WebP files (default is dry run)
 *   --files <a,b,...>    Only convert these files (names in the input directory)
 *   --input <dir>        Directory holding the images (default: resources)
 *   --quality <num>      WebP quality 1-100 (default: 80)
 *   --min-savings <pct>  Keep a WebP only if it is at least this % smaller (default: 10)
 *   --overwrite          Re-encode even when an up-to-date WebP already exists
 *   --update-refs        Point markdown image references in contents/ at the new WebP
 *   --help               Show this help message
 *
 * After --update-refs the original JPG/PNG files are no longer referenced;
 * `npm run check:orphans` lists them for cleanup.
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';
import { runCli, STANDARD_FLAGS } from './lib/cli.js';
import { getBaseDir, findMarkdownFiles, readFile, writeFile } from './lib/files.js';

const SOURCE_EXTENSIONS = /\.(jpe?g|png)$/i;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * WebP converter class.
 */
class WebPConverter {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    const input = options.input || 'resources';
    this.inputDir = path.isAbsolute(input) ? input : path.join(this.baseDir, input);
    this.apply = options.apply || false;
    this.files = options.files || null;
    this.quality = options.quality ?? 80;
    this.minSavings = options.minSavings ?? 10;
    this.overwrite = options.overwrite || false;
    this.updateRefs = options.updateRefs || false;

    this.stats = {
      total: 0,
      converted: 0,
      upToDate: 0,
      notSmaller: 0,
      errors: 0,
      bytesBefore: 0,
      bytesAfter: 0,
      refsUpdated: 0,
    };
    // Source file name -> WebP file name, for every image whose WebP is in use.
    this.renames = new Map();
  }

  validate() {
    if (!Number.isInteger(this.quality) || this.quality < 1 || this.quality > 100) {
      console.error(`Error: --quality must be an integer from 1 to 100 (got ${this.quality})`);
      return false;
    }
    if (!Number.isFinite(this.minSavings) || this.minSavings < 0 || this.minSavings >= 100) {
      console.error(`Error: --min-savings must be from 0 to 99 (got ${this.minSavings})`);
      return false;
    }
    if (!fs.existsSync(this.inputDir)) {
      console.error(`Error: Input directory not found: ${this.inputDir}`);
      return false;
    }
    return true;
  }

  listSourceImages() {
    const all = fs.readdirSync(this.inputDir).filter(f => SOURCE_EXTENSIONS.test(f));
    if (!this.files) return all.sort();

    const wanted = this.files.map(f => path.basename(f));
    for (const f of wanted.filter(f => !all.includes(f))) {
      console.error(`  ✗ Not found or not a JPG/PNG: ${f}`);
      this.stats.errors++;
    }
    return wanted.filter(f => all.includes(f)).sort();
  }

  async run() {
    printHeader('🖼️', 'WebP Image Converter');
    if (!this.validate()) return false;

    console.log(`Input:       ${path.relative(this.baseDir, this.inputDir) || '.'}`);
    console.log(`Quality:     ${this.quality}`);
    console.log(`Min savings: ${this.minSavings}%`);
    if (!this.apply) {
      console.log('\nDRY RUN - no files will be written. Use --apply to make changes.');
    }
    console.log();

    const images = this.listSourceImages();
    this.stats.total = images.length;
    console.log(`Found ${images.length} image(s) to consider\n`);

    for (const file of images) {
      await this.convertImage(file);
    }

    if (this.updateRefs && this.renames.size > 0) {
      await this.updateReferences();
    }

    this.printResults();
    return this.stats.errors === 0;
  }

  async convertImage(file) {
    const inputPath = path.join(this.inputDir, file);
    const webpName = `${path.basename(file, path.extname(file))}.webp`;
    const outputPath = path.join(this.inputDir, webpName);
    const inputStat = fs.statSync(inputPath);

    // An existing WebP that is newer than its source is reused as-is.
    if (
      !this.overwrite &&
      fs.existsSync(outputPath) &&
      fs.statSync(outputPath).mtimeMs >= inputStat.mtimeMs
    ) {
      this.stats.upToDate++;
      this.renames.set(file, webpName);
      return;
    }

    try {
      // Encode in memory first so a WebP that is not worth keeping never touches disk.
      const buffer = await sharp(inputPath).webp({ quality: this.quality }).toBuffer();
      const savings = (1 - buffer.length / inputStat.size) * 100;
      const sizes = `${formatBytes(inputStat.size)} -> ${formatBytes(buffer.length)}`;

      if (savings < this.minSavings) {
        console.log(
          `  ⏭ ${file}: only ${savings.toFixed(1)}% smaller (${sizes}), keeping original`
        );
        this.stats.notSmaller++;
        return;
      }

      if (this.apply) {
        fs.writeFileSync(outputPath, buffer);
      }
      const verb = this.apply ? '✓' : 'Would convert';
      console.log(`  ${verb} ${file} -> ${webpName} (${sizes}, ${savings.toFixed(1)}% smaller)`);
      this.stats.converted++;
      this.stats.bytesBefore += inputStat.size;
      this.stats.bytesAfter += buffer.length;
      this.renames.set(file, webpName);
    } catch (error) {
      console.error(`  ✗ ${file}: ${error.message}`);
      this.stats.errors++;
    }
  }

  /**
   * Rewrite references like ../resources/Figure_01_01_01.jpg to the WebP name in every
   * markdown file under contents/.
   */
  async updateReferences() {
    console.log('\nUpdating image references in contents/ ...\n');
    const resourcesDir = path.basename(this.inputDir);
    const patterns = [...this.renames].map(([from, to]) => ({
      regex: new RegExp(`(${escapeRegExp(resourcesDir)}/)${escapeRegExp(from)}(?![\\w.-])`, 'g'),
      to,
    }));

    const files = await findMarkdownFiles(path.join(this.baseDir, 'contents'));
    for (const filepath of files.sort()) {
      const content = readFile(filepath);
      let count = 0;
      let updated = content;
      for (const { regex, to } of patterns) {
        updated = updated.replace(regex, (_match, prefix) => {
          count++;
          return `${prefix}${to}`;
        });
      }
      if (count === 0) continue;

      if (this.apply) writeFile(filepath, updated);
      const relativePath = path.relative(this.baseDir, filepath);
      console.log(`  ${this.apply ? '✓' : 'Would update'} ${relativePath} (${count} reference(s))`);
      this.stats.refsUpdated += count;
    }
  }

  printResults() {
    printDivider();

    const { total, converted, upToDate, notSmaller, errors, bytesBefore, bytesAfter } = this.stats;
    console.log(`\nImages considered:  ${total}`);
    console.log(`${this.apply ? 'Converted:         ' : 'Would convert:     '} ${converted}`);
    console.log(`Already up to date: ${upToDate}`);
    console.log(`Not worth it:       ${notSmaller}`);
    if (converted > 0) {
      console.log(
        `Size:               ${formatBytes(bytesBefore)} -> ${formatBytes(bytesAfter)} (saves ${formatBytes(bytesBefore - bytesAfter)})`
      );
    }
    if (this.updateRefs) {
      console.log(`References:         ${this.stats.refsUpdated}`);
    }
    if (errors > 0) {
      console.log(`Errors:             ${errors}`);
    }

    if (errors === 0) {
      if (!this.apply && converted > 0) {
        console.log('\n⚠️ DRY RUN - Use --apply to write the files');
      } else {
        printSuccess('Done.');
      }
    }

    printDivider();
    printSummary(errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'convert-webp',
  description: `Converts figure images (JPG, PNG) to WebP next to the originals.
A WebP is kept only when it is at least --min-savings percent smaller.`,
  flags: {
    apply: STANDARD_FLAGS.apply,
    files: {
      flag: '--files',
      description: 'Comma-separated file names to convert (default: all)',
      type: 'array',
      default: null,
    },
    input: {
      flag: '--input',
      description: 'Directory holding the images (default: resources)',
      type: 'string',
      default: 'resources',
    },
    quality: {
      flag: '--quality',
      description: 'WebP quality 1-100 (default: 80)',
      type: 'number',
      default: 80,
    },
    minSavings: {
      flag: '--min-savings',
      description: 'Keep a WebP only if it is at least this % smaller (default: 10)',
      type: 'number',
      default: 10,
    },
    overwrite: {
      flag: '--overwrite',
      description: 'Re-encode even when an up-to-date WebP already exists',
      default: false,
    },
    updateRefs: {
      flag: '--update-refs',
      description: 'Point markdown image references in contents/ at the new WebP files',
      default: false,
    },
  },
  examples: [
    'node scripts/convert-webp.js',
    'node scripts/convert-webp.js --files Figure_01_01_01.jpg --update-refs',
    'node scripts/convert-webp.js --apply --update-refs',
    'node scripts/convert-webp.js --quality 90 --min-savings 20',
  ],
  run: async options => {
    const converter = new WebPConverter(options);
    return converter.run();
  },
});
