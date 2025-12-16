#!/usr/bin/env node

/**
 * convert-to-webp.js
 *
 * Converts images (JPG, PNG) to WebP format for better compression.
 *
 * Usage:
 *   node scripts/convert-to-webp.js [options]
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
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

// Dynamic import for sharp (optional dependency)
let sharp;

async function loadSharp() {
  try {
    sharp = (await import('sharp')).default;
    return true;
  } catch (error) {
    return false;
  }
}

async function convertToWebp(inputDir, outputDir, options = {}) {
  const { quality = 80, overwrite = false, dryRun = false } = options;

  // Ensure output directory exists
  if (!dryRun && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${imageFiles.length} image(s) to convert\n`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    // Skip if output already exists and not overwriting
    if (!overwrite && fs.existsSync(outputPath)) {
      console.log(`  ⏭ Skipping (exists): ${file}`);
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  📷 Would convert: ${file} -> ${baseName}.webp`);
      converted++;
      continue;
    }

    try {
      await sharp(inputPath).webp({ quality }).toFile(outputPath);

      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`  ✓ ${file} -> ${baseName}.webp (${savings}% smaller)`);
      converted++;
    } catch (error) {
      console.error(`  ✗ ${file}: ${error.message}`);
      errors++;
    }
  }

  return { converted, skipped, errors, total: imageFiles.length };
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/convert-to-webp.js [options]

Converts images (JPG, PNG) to WebP format for better compression.

Options:
  --input <dir>    Input directory (default: resources)
  --output <dir>   Output directory (default: resources-webp)
  --quality <num>  WebP quality 0-100 (default: 80)
  --overwrite      Overwrite existing WebP files
  --dry-run        Show what would be converted without converting
  --help           Show this help message

Examples:
  node scripts/convert-to-webp.js
  node scripts/convert-to-webp.js --quality 90 --overwrite
  node scripts/convert-to-webp.js --input images --output images-webp
`);
    process.exit(0);
  }

  // Check for sharp
  const hasSharp = await loadSharp();
  if (!hasSharp) {
    console.error('Error: sharp package is required for image conversion.');
    console.error('Install it with: npm install sharp');
    process.exit(1);
  }

  // Parse arguments
  let inputDir = path.join(baseDir, 'resources');
  let outputDir = path.join(baseDir, 'resources-webp');
  let quality = 80;
  const overwrite = args.includes('--overwrite');
  const dryRun = args.includes('--dry-run');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) {
      inputDir = path.isAbsolute(args[i + 1]) ? args[i + 1] : path.join(baseDir, args[i + 1]);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputDir = path.isAbsolute(args[i + 1]) ? args[i + 1] : path.join(baseDir, args[i + 1]);
      i++;
    } else if (args[i] === '--quality' && args[i + 1]) {
      quality = parseInt(args[i + 1]) || 80;
      i++;
    }
  }

  // Check input directory
  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Input directory not found: ${inputDir}`);
    process.exit(1);
  }

  console.log('WebP Image Converter');
  console.log('='.repeat(60));
  console.log(`Input:   ${inputDir}`);
  console.log(`Output:  ${outputDir}`);
  console.log(`Quality: ${quality}`);

  if (dryRun) {
    console.log('\n(DRY RUN - no files will be converted)');
  }

  console.log();

  const results = await convertToWebp(inputDir, outputDir, { quality, overwrite, dryRun });

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('SUMMARY');
  console.log('='.repeat(60));

  console.log(`\nTotal images:    ${results.total}`);
  console.log(`Converted:       ${results.converted}`);
  console.log(`Skipped:         ${results.skipped}`);
  if (results.errors > 0) {
    console.log(`Errors:          ${results.errors}`);
  }

  if (results.errors === 0) {
    console.log('\n✅ Conversion completed!');
  } else {
    console.log('\n⚠️ Some conversions failed.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
