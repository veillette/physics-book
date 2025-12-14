/**
 * Generate PWA icons and favicon from the project logo
 * This script uses Sharp to resize the logo to various sizes needed for PWA
 * Source: assets/icon/image.png
 * Output: assets/icon/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const ROOT_DIR = path.join(__dirname, '..');
const ICONS_DIR = path.join(ROOT_DIR, 'assets', 'icon');
const SOURCE_LOGO = path.join(ICONS_DIR, 'image.png');

// Theme color extracted from the logo (blue background)
const THEME_COLOR = { r: 30, g: 64, b: 120, alpha: 1 };

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
  console.log(`✅ Created icons directory: ${ICONS_DIR}`);
}

async function generateIcons() {
  console.log('=== PWA Icon Generation Tool ===\n');

  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error(`❌ Source logo not found: ${SOURCE_LOGO}`);
    process.exit(1);
  }

  console.log(`📷 Source logo: ${SOURCE_LOGO}`);
  console.log(`📁 Output directory: ${ICONS_DIR}\n`);

  try {
    // Get original image metadata
    const metadata = await sharp(SOURCE_LOGO).metadata();
    console.log(`Original image size: ${metadata.width}x${metadata.height}\n`);

    // Generate standard icons
    console.log('Generating standard icons:');
    for (const size of ICON_SIZES) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);

      await sharp(SOURCE_LOGO)
        .resize(size, size, {
          fit: 'contain',
          background: THEME_COLOR
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${size}x${size} icon`);
    }

    // Generate maskable icons (with safe zone padding)
    console.log('\nGenerating maskable icons:');
    for (const size of [192, 512]) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}-maskable.png`);

      // Maskable icons should have 40% padding (safe zone)
      const iconSize = Math.floor(size * 0.6);
      const padding = Math.floor((size - iconSize) / 2);

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: THEME_COLOR
        }
      })
        .composite([{
          input: await sharp(SOURCE_LOGO)
            .resize(iconSize, iconSize, {
              fit: 'contain',
              background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toBuffer(),
          top: padding,
          left: padding
        }])
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${size}x${size} maskable icon`);
    }

    // Generate favicon sizes
    console.log('\nGenerating favicon PNG files:');
    await sharp(SOURCE_LOGO)
      .resize(32, 32, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toFile(path.join(ICONS_DIR, 'favicon-32x32.png'));
    console.log('✅ Generated 32x32 favicon');

    await sharp(SOURCE_LOGO)
      .resize(16, 16, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toFile(path.join(ICONS_DIR, 'favicon-16x16.png'));
    console.log('✅ Generated 16x16 favicon');

    // Generate main favicon.ico (32x32)
    console.log('\nGenerating favicon.ico:');
    const faviconBuffer = await sharp(SOURCE_LOGO)
      .resize(32, 32, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toBuffer();

    // Write to root directory for easy access
    fs.writeFileSync(path.join(ROOT_DIR, 'favicon.ico'), faviconBuffer);
    console.log('✅ Generated favicon.ico (32x32) in root directory');

    // Also save in icons directory
    fs.writeFileSync(path.join(ICONS_DIR, 'favicon.ico'), faviconBuffer);
    console.log('✅ Generated favicon.ico in icons directory');

    // Generate Apple Touch Icon
    console.log('\nGenerating Apple Touch Icon:');
    await sharp(SOURCE_LOGO)
      .resize(180, 180, {
        fit: 'contain',
        background: THEME_COLOR
      })
      .png()
      .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));
    console.log('✅ Generated 180x180 Apple Touch Icon');

    // Generate additional Apple icon sizes
    for (const size of [120, 152, 167, 180]) {
      await sharp(SOURCE_LOGO)
        .resize(size, size, {
          fit: 'contain',
          background: THEME_COLOR
        })
        .png()
        .toFile(path.join(ICONS_DIR, `apple-touch-icon-${size}x${size}.png`));
      console.log(`✅ Generated ${size}x${size} Apple Touch Icon`);
    }

    console.log('\n✅ All icons generated successfully!');
    console.log(`\nIcons location: ${ICONS_DIR}`);
    console.log(`Favicon location: ${path.join(ROOT_DIR, 'favicon.ico')}`);

    const totalIcons = ICON_SIZES.length + 2 + 2 + 4 + 2; // standard + maskable + favicon + apple touch
    console.log(`Total icons generated: ${totalIcons}`);

  } catch (error) {
    console.error('\n❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the icon generation
generateIcons();
