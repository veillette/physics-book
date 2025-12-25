#!/usr/bin/env node
/**
 * Generate PWA icons and favicon from the project logo
 *
 * This script uses Sharp to resize the logo to various sizes needed for PWA
 * Source: assets/image/imagePWA.png
 * Output: assets/icon/ (icons), assets/image/ (favicon)
 *
 * Usage:
 *   node scripts/generate-icons.js [options]
 *
 * Options:
 *   --source <path>   Source logo file (default: assets/image/imagePWA.png)
 *   --help            Show this help message
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli } from './lib/cli.js';

import { getBaseDir } from './lib/files.js';

const ICON_SIZES = [48, 72, 96, 128, 144, 152, 192, 384, 512];

// Theme color extracted from the logo (blue background)
const THEME_COLOR = { r: 30, g: 64, b: 120, alpha: 1 };

/**
 * Icon generator class.
 */
class IconGenerator {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.iconsDir = path.join(this.baseDir, 'assets', 'icon');
    this.imageDir = path.join(this.baseDir, 'assets', 'image');
    this.sourceLogo = options.source
      ? path.isAbsolute(options.source)
        ? options.source
        : path.join(this.baseDir, options.source)
      : path.join(this.imageDir, 'imagePWA.png');

    this.stats = {
      generated: 0,
      errors: 0,
    };
  }

  async run() {
    printHeader('🎨', 'PWA Icon Generator');

    // Ensure directories exist
    if (!fs.existsSync(this.iconsDir)) {
      fs.mkdirSync(this.iconsDir, { recursive: true });
      console.log(`Created icons directory: ${this.iconsDir}`);
    }

    if (!fs.existsSync(this.imageDir)) {
      fs.mkdirSync(this.imageDir, { recursive: true });
      console.log(`Created image directory: ${this.imageDir}`);
    }

    // Check source logo
    if (!fs.existsSync(this.sourceLogo)) {
      console.error(`Source logo not found: ${this.sourceLogo}`);
      return false;
    }

    console.log(`Source logo: ${this.sourceLogo}`);
    console.log(`Output directory: ${this.iconsDir}\n`);

    try {
      // Get original image metadata
      const metadata = await sharp(this.sourceLogo).metadata();
      console.log(`Original image size: ${metadata.width}x${metadata.height}\n`);

      // Generate all icons
      await this.generateStandardIcons();
      await this.generateMaskableIcons();
      await this.generateFavicons();
      await this.generateAppleTouchIcons();

      this.printResults();
      return this.stats.errors === 0;
    } catch (error) {
      console.error(`Error generating icons: ${error.message}`);
      this.stats.errors++;
      return false;
    }
  }

  async generateStandardIcons() {
    console.log('Generating standard icons:');

    for (const size of ICON_SIZES) {
      const outputPath = path.join(this.iconsDir, `icon-${size}x${size}.png`);

      await sharp(this.sourceLogo)
        .resize(size, size, {
          fit: 'contain',
          background: THEME_COLOR,
        })
        .png()
        .toFile(outputPath);

      console.log(`  ✓ Generated ${size}x${size} icon`);
      this.stats.generated++;
    }
  }

  async generateMaskableIcons() {
    console.log('\nGenerating maskable icons:');

    for (const size of [192, 512]) {
      const outputPath = path.join(this.iconsDir, `icon-${size}x${size}-maskable.png`);

      // Maskable icons should have 40% padding (safe zone)
      const iconSize = Math.floor(size * 0.6);
      const padding = Math.floor((size - iconSize) / 2);

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: THEME_COLOR,
        },
      })
        .composite([
          {
            input: await sharp(this.sourceLogo)
              .resize(iconSize, iconSize, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
              })
              .toBuffer(),
            top: padding,
            left: padding,
          },
        ])
        .png()
        .toFile(outputPath);

      console.log(`  ✓ Generated ${size}x${size} maskable icon`);
      this.stats.generated++;
    }
  }

  async generateFavicons() {
    console.log('\nGenerating favicon files:');

    // 32x32 favicon PNG
    await sharp(this.sourceLogo)
      .resize(32, 32, { fit: 'contain', background: THEME_COLOR })
      .png()
      .toFile(path.join(this.iconsDir, 'favicon-32x32.png'));
    console.log('  ✓ Generated 32x32 favicon');
    this.stats.generated++;

    // 16x16 favicon PNG
    await sharp(this.sourceLogo)
      .resize(16, 16, { fit: 'contain', background: THEME_COLOR })
      .png()
      .toFile(path.join(this.iconsDir, 'favicon-16x16.png'));
    console.log('  ✓ Generated 16x16 favicon');
    this.stats.generated++;

    // Main favicon.ico (32x32)
    const faviconBuffer = await sharp(this.sourceLogo)
      .resize(32, 32, { fit: 'contain', background: THEME_COLOR })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(this.imageDir, 'favicon.ico'), faviconBuffer);
    console.log('  ✓ Generated favicon.ico (32x32)');
    this.stats.generated++;
  }

  async generateAppleTouchIcons() {
    console.log('\nGenerating Apple Touch Icons:');

    // Main Apple Touch Icon (180x180)
    await sharp(this.sourceLogo)
      .resize(180, 180, { fit: 'contain', background: THEME_COLOR })
      .png()
      .toFile(path.join(this.iconsDir, 'apple-touch-icon.png'));
    console.log('  ✓ Generated 180x180 Apple Touch Icon');
    this.stats.generated++;

    // Additional Apple icon sizes
    for (const size of [120, 152, 167, 180]) {
      await sharp(this.sourceLogo)
        .resize(size, size, { fit: 'contain', background: THEME_COLOR })
        .png()
        .toFile(path.join(this.iconsDir, `apple-touch-icon-${size}x${size}.png`));
      console.log(`  ✓ Generated ${size}x${size} Apple Touch Icon`);
      this.stats.generated++;
    }
  }

  printResults() {
    printDivider();

    console.log(`\nTotal icons generated: ${this.stats.generated}`);
    console.log(`Icons location: ${this.iconsDir}`);
    console.log(`Favicon location: ${path.join(this.imageDir, 'favicon.ico')}`);

    if (this.stats.errors === 0) {
      printSuccess('All icons generated successfully!');
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'generate-icons',
  description: `Generates PWA icons and favicons from the project logo.

Creates:
- Standard icons (48-512px)
- Maskable icons for PWA
- Favicons (16x16, 32x32)
- Apple Touch Icons`,
  flags: {
    source: {
      flag: '--source',
      description: 'Source logo file (default: assets/image/imagePWA.png)',
      type: 'string',
      default: 'assets/image/imagePWA.png',
    },
  },
  examples: [
    'node scripts/generate-icons.js',
    'node scripts/generate-icons.js --source path/to/logo.png',
  ],
  run: async options => {
    const generator = new IconGenerator(options);
    return generator.run();
  },
});
