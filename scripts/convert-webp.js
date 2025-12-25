#!/usr/bin/env node

/**
 * WebP Image Converter Script
 *
 * Converts images (JPG, PNG) to WebP format for better compression.
 *
 * Usage:
 *   node scripts/convert-webp.js [options]
 *
 * Options:
 *   --input <dir>    Input directory (default: resources)
 *   --output <dir>   Output directory (default: resources-webp)
 *   --quality <num>  WebP quality 0-100 (default: 80)
 *   --overwrite      Overwrite existing WebP files
 *   --dry-run        Show what would be converted without converting
 *   --help           Show this help message
 */

import fs from 'fs';
import path from 'path';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { getBaseDir } from './lib/files.js';

// Dynamic import for sharp (optional dependency)
let sharp;

async function loadSharp() {
  try {
    sharp = (await import('sharp')).default;
    return true;
  } catch (_error) {
    return false;
  }
}

/**
 * WebP converter class.
 */
class WebPConverter {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.inputDir = options.input
      ? path.isAbsolute(options.input)
        ? options.input
        : path.join(this.baseDir, options.input)
      : path.join(this.baseDir, 'resources');
    this.outputDir = options.output
      ? path.isAbsolute(options.output)
        ? options.output
        : path.join(this.baseDir, options.output)
      : path.join(this.baseDir, 'resources-webp');
    this.quality = options.quality || 80;
    this.overwrite = options.overwrite || false;
    this.dryRun = options.dryRun || false;

    this.stats = {
      total: 0,
      converted: 0,
      skipped: 0,
      errors: 0,
    };
  }

  async run() {
    printHeader('🖼️', 'WebP Image Converter');

    // Check for sharp
    const hasSharp = await loadSharp();
    if (!hasSharp) {
      console.error('Error: sharp package is required for image conversion.');
      console.error('Install it with: npm install sharp');
      return false;
    }

    // Check input directory
    if (!fs.existsSync(this.inputDir)) {
      console.error(`Error: Input directory not found: ${this.inputDir}`);
      return false;
    }

    console.log(`Input:   ${this.inputDir}`);
    console.log(`Output:  ${this.outputDir}`);
    console.log(`Quality: ${this.quality}`);

    if (this.dryRun) {
      console.log('\n(DRY RUN - no files will be converted)\n');
    } else {
      console.log();
    }

    // Ensure output directory exists
    if (!this.dryRun && !fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`Created output directory: ${this.outputDir}`);
    }

    // Get image files
    const files = fs.readdirSync(this.inputDir);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    this.stats.total = imageFiles.length;
    console.log(`Found ${imageFiles.length} image(s) to convert\n`);

    // Convert each image
    for (const file of imageFiles) {
      await this.convertImage(file);
    }

    this.printResults();
    return this.stats.errors === 0;
  }

  async convertImage(file) {
    const inputPath = path.join(this.inputDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(this.outputDir, `${baseName}.webp`);

    // Skip if output exists and not overwriting
    if (!this.overwrite && fs.existsSync(outputPath)) {
      console.log(`  ⏭ Skipping (exists): ${file}`);
      this.stats.skipped++;
      return;
    }

    if (this.dryRun) {
      console.log(`  📷 Would convert: ${file} -> ${baseName}.webp`);
      this.stats.converted++;
      return;
    }

    try {
      await sharp(inputPath).webp({ quality: this.quality }).toFile(outputPath);

      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`  ✓ ${file} -> ${baseName}.webp (${savings}% smaller)`);
      this.stats.converted++;
    } catch (error) {
      console.error(`  ✗ ${file}: ${error.message}`);
      this.stats.errors++;
    }
  }

  printResults() {
    printDivider();

    console.log(`\nTotal images:    ${this.stats.total}`);
    console.log(`Converted:       ${this.stats.converted}`);
    console.log(`Skipped:         ${this.stats.skipped}`);
    if (this.stats.errors > 0) {
      console.log(`Errors:          ${this.stats.errors}`);
    }

    if (this.stats.errors === 0) {
      printSuccess('Conversion completed!');
    } else {
      console.log('\n⚠️ Some conversions failed.');
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'convert-webp',
  description: `Converts images (JPG, PNG) to WebP format for better compression.
Requires the 'sharp' package to be installed.`,
  flags: {
    input: {
      flag: '--input',
      description: 'Input directory (default: resources)',
      type: 'string',
      default: 'resources',
    },
    output: {
      flag: '--output',
      description: 'Output directory (default: resources-webp)',
      type: 'string',
      default: 'resources-webp',
    },
    quality: {
      flag: '--quality',
      description: 'WebP quality 0-100 (default: 80)',
      type: 'number',
      default: 80,
    },
    overwrite: {
      flag: '--overwrite',
      description: 'Overwrite existing WebP files',
      default: false,
    },
    dryRun: STANDARD_FLAGS.dryRun,
  },
  examples: [
    'node scripts/convert-webp.js',
    'node scripts/convert-webp.js --quality 90 --overwrite',
    'node scripts/convert-webp.js --input images --output images-webp',
    'node scripts/convert-webp.js --dry-run',
  ],
  run: async options => {
    const converter = new WebPConverter(options);
    return converter.run();
  },
});
