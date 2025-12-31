#!/usr/bin/env node

/**
 * Orphan File Detection Script
 *
 * Finds files in the assets/ and resources/ directories that are not
 * referenced by any markdown, HTML, CSS, JS, or JSON files in the project.
 *
 * Usage:
 *   node scripts/check-orphans.js [options]
 *
 * Options:
 *   --generate-cleanup  Generate a shell script to remove orphan files
 *   --help              Show this help message
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli } from './lib/cli.js';

import { getBaseDir, readFile } from './lib/files.js';

import chalk from 'chalk';

/**
 * Orphan file finder class.
 */
class OrphanFileFinder {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.contentDir = path.join(this.baseDir, 'contents');
    this.resourcesDir = path.join(this.baseDir, 'resources');
    this.assetsDir = path.join(this.baseDir, 'assets');
    this.generateCleanup = options.generateCleanup || false;

    // Files to exclude from orphan detection (referenced from HTML layouts, manifest, etc.)
    this.excludedFiles = new Set([
      // Images referenced in HTML layouts
      'assets/image/imagePWA.png',
      'assets/image/favicon.ico',
      'resources/by_license.svg',
      // PWA manifest and offline page
      'assets/manifest/manifest.json',
      'assets/pwa/offline.html',
      // Icons referenced in manifest.json and HTML
      'assets/icon/apple-touch-icon-180x180.png',
      'assets/icon/icon-48x48.png',
      'assets/icon/icon-72x72.png',
      'assets/icon/icon-96x96.png',
      'assets/icon/icon-128x128.png',
      'assets/icon/icon-144x144.png',
      'assets/icon/icon-152x152.png',
      'assets/icon/icon-168x168.png',
      'assets/icon/icon-192x192.png',
      'assets/icon/icon-192x192-maskable.png',
      'assets/icon/icon-384x384.png',
      'assets/icon/icon-512x512.png',
      'assets/icon/icon-512x512-maskable.png',
    ]);

    // Directory patterns to exclude (dynamically referenced files)
    this.excludedDirs = [
      'assets/pdf/', // PDFs are dynamically referenced in book-viewer.js
    ];

    this.stats = {
      totalFiles: 0,
      totalImages: 0,
      referencedFiles: 0,
      referencedImages: 0,
      orphanFiles: 0,
      orphanImages: 0,
      totalMarkdownFiles: 0,
    };

    this.referencedPaths = new Set();
    this.orphanFiles = [];
    this.orphanImages = [];
  }

  async run() {
    printHeader('🔍', 'Orphan File Detection');

    // Step 1: Find all files and extract references
    await this.scanFiles();

    // Step 2: Find orphan assets
    await this.findOrphanAssets();

    // Step 3: Find orphan images
    await this.findOrphanImages();

    this.printResults();

    if (this.generateCleanup) {
      this.generateCleanupScript();
    }

    const hasOrphans = this.orphanFiles.length > 0 || this.orphanImages.length > 0;
    return !hasOrphans;
  }

  async scanFiles() {
    console.log(chalk.gray('Scanning files for references...\n'));

    // Find all files that might contain references
    const patterns = ['**/*.md', '**/*.html', '**/*.json', '**/*.js', '**/*.css'];
    const ignorePatterns = ['node_modules/**', '_site/**', '.jekyll-cache/**', 'scripts/**'];

    for (const pattern of patterns) {
      const files = await glob(pattern, {
        cwd: this.baseDir,
        ignore: ignorePatterns,
      });

      for (const file of files) {
        await this.extractReferences(file);
      }

      if (pattern === '**/*.md') {
        this.stats.totalMarkdownFiles = files.length;
      }
    }

    console.log(chalk.gray(`Found ${this.referencedPaths.size} unique file references\n`));
  }

  async extractReferences(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    try {
      const content = readFile(fullPath);
      this.extractLinksFromContent(content, filePath);
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not read ${filePath}: ${error.message}`));
    }
  }

  extractLinksFromContent(content, sourceFile) {
    // Normalize content for multiline references
    const normalizedContent = content
      .replace(/\]\(\s*\n\s*/g, '](')
      .replace(/\.\.\s*\n\s*\//g, '../');

    // Markdown/HTML image and link patterns
    const patterns = [
      /\]\(([^)\s]+?)(?:\s+['"]|\))/g, // Markdown links/images - captures URL before space+quote or )
      /<img[^>]+src=["']([^"']+)["'][^>]*>/gi, // HTML images
      /<(?:link[^>]+href=["']([^"']+)["']|script[^>]+src=["']([^"']+)["'])[^>]*>/gi, // CSS/JS
      /url\(\s*(['"]?)([^'")\s]+)\1\s*\)/gi, // CSS url()
      /['"]([^'"]*\/[^'"]*\.(jpg|jpeg|png|gif|svg|webp|css|js|html))['"]/gi, // JS strings
      /\.\.\/resources\/[A-Za-z0-9_-]+\.(jpg|jpeg|png|gif|svg|webp)/g, // Direct resource paths
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(normalizedContent)) !== null) {
        // Get the URL from the appropriate capture group (or full match for direct paths)
        const url = match[1] || match[0];
        if (url && this.isLocalFile(url)) {
          const resolvedPath = this.resolvePath(url, sourceFile);
          if (resolvedPath) {
            this.referencedPaths.add(resolvedPath);
          }
        }
      }
    }
  }

  isLocalFile(url) {
    return !url.match(/^(https?:\/\/|mailto:|tel:|javascript:|data:|#)/i);
  }

  resolvePath(url, sourceFile) {
    try {
      if (url.startsWith('./') || url.startsWith('../')) {
        const currentDir = path.dirname(path.join(this.baseDir, sourceFile));
        const absolutePath = path.resolve(currentDir, url);
        return path.relative(this.baseDir, absolutePath);
      } else if (url.startsWith('/')) {
        let resolved = url.substring(1);
        resolved = resolved.replace(/^physics-book\//, '');
        return resolved;
      } else {
        return url;
      }
    } catch (_error) {
      return null;
    }
  }

  async findOrphanAssets() {
    console.log(chalk.gray('Checking assets directory...\n'));

    try {
      const assetFiles = await glob('**/*', {
        cwd: this.assetsDir,
        nodir: true,
      });

      this.stats.totalFiles = assetFiles.length;

      for (const file of assetFiles) {
        const relativePath = path.join('assets', file).replace(/\\/g, '/');
        const isReferenced = this.checkIfReferenced(relativePath, file);
        const isExcluded = this.excludedFiles.has(relativePath) || this.isInExcludedDir(relativePath);

        if (!isReferenced && !isExcluded) {
          this.stats.orphanFiles++;
          this.orphanFiles.push({
            path: relativePath,
            fullPath: path.join(this.assetsDir, file),
            size: this.getFileSize(path.join(this.assetsDir, file)),
          });
        } else {
          this.stats.referencedFiles++;
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not scan assets: ${error.message}`));
    }
  }

  async findOrphanImages() {
    console.log(chalk.gray('Checking resources directory...\n'));

    try {
      const imageFiles = await glob('**/*.{jpg,jpeg,png,gif,svg,webp}', {
        cwd: this.resourcesDir,
        nodir: true,
      });

      this.stats.totalImages = imageFiles.length;

      for (const file of imageFiles) {
        const relativePath = path.join('resources', file).replace(/\\/g, '/');
        const isReferenced = this.checkIfReferenced(relativePath, file);
        const isExcluded = this.excludedFiles.has(relativePath);

        if (!isReferenced && !isExcluded) {
          this.stats.orphanImages++;
          this.orphanImages.push({
            path: relativePath,
            fullPath: path.join(this.resourcesDir, file),
            size: this.getFileSize(path.join(this.resourcesDir, file)),
          });
        } else {
          this.stats.referencedImages++;
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not scan resources: ${error.message}`));
    }
  }

  checkIfReferenced(relativePath, fileName) {
    const possibleRefs = [
      relativePath,
      `/${relativePath}`,
      `./${relativePath}`,
      `../${relativePath}`,
      fileName,
      `/${fileName}`,
      `./${fileName}`,
      `../${fileName}`,
      `../resources/${fileName}`,
      `./resources/${fileName}`,
    ];

    return possibleRefs.some(ref => this.referencedPaths.has(ref));
  }

  isInExcludedDir(filePath) {
    return this.excludedDirs.some(dir => filePath.startsWith(dir));
  }

  getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const bytes = stats.size;
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    } catch {
      return 'Unknown';
    }
  }

  generateCleanupScript(outputPath = 'cleanup-orphans.sh') {
    if (this.orphanFiles.length === 0 && this.orphanImages.length === 0) {
      console.log(chalk.green('No cleanup script needed - no orphan files found!'));
      return;
    }

    const allOrphans = [...this.orphanFiles, ...this.orphanImages];
    const script = [
      '#!/bin/bash',
      '# Auto-generated script to remove orphan files',
      '# Review carefully before running!',
      '',
      'echo "This script will delete the following orphan files:"',
      ...allOrphans.map(file => `echo "  ${file.path}"`),
      '',
      'read -p "Are you sure you want to delete these files? (y/N): " -n 1 -r',
      'echo',
      'if [[ $REPLY =~ ^[Yy]$ ]]; then',
      ...allOrphans.map(file => `    rm "${file.fullPath}" && echo "Deleted: ${file.path}"`),
      '    echo "Cleanup complete!"',
      'else',
      '    echo "Cleanup cancelled."',
      'fi',
    ].join('\n');

    fs.writeFileSync(outputPath, script, 'utf8');
    console.log(chalk.blue(`\n📝 Generated cleanup script: ${outputPath}`));
    console.log(chalk.yellow('⚠️  Review the script carefully before running it!'));
  }

  printResults() {
    printDivider();

    console.log(chalk.gray(`Markdown files scanned: ${this.stats.totalMarkdownFiles}`));
    console.log(chalk.gray(`Asset files found: ${this.stats.totalFiles}`));
    console.log(chalk.gray(`Image files found: ${this.stats.totalImages}`));
    console.log(chalk.gray(`Referenced files: ${this.stats.referencedFiles}`));
    console.log(chalk.gray(`Referenced images: ${this.stats.referencedImages}`));
    console.log();

    if (this.orphanFiles.length === 0) {
      console.log(chalk.green('✅ No orphan asset files found!'));
    } else {
      console.log(chalk.red(`📁 Found ${this.orphanFiles.length} orphan asset files:`));
      this.orphanFiles.slice(0, 10).forEach((file, i) => {
        console.log(chalk.red(`   ${i + 1}. ${file.path} (${file.size})`));
      });
      if (this.orphanFiles.length > 10) {
        console.log(chalk.gray(`   ... and ${this.orphanFiles.length - 10} more`));
      }
    }

    console.log();

    if (this.orphanImages.length === 0) {
      console.log(chalk.green('✅ No orphan image files found!'));
    } else {
      console.log(chalk.red(`🖼️  Found ${this.orphanImages.length} orphan image files:`));
      this.orphanImages.slice(0, 10).forEach((file, i) => {
        console.log(chalk.red(`   ${i + 1}. ${file.path} (${file.size})`));
      });
      if (this.orphanImages.length > 10) {
        console.log(chalk.gray(`   ... and ${this.orphanImages.length - 10} more`));
      }
    }

    printDivider();

    const totalOrphans = this.orphanFiles.length + this.orphanImages.length;
    const totalFiles = this.stats.totalFiles + this.stats.totalImages;

    if (totalOrphans === 0) {
      printSuccess(`All files are referenced! (${totalFiles} files checked)`);
    } else {
      const percentage = totalFiles > 0 ? ((totalOrphans / totalFiles) * 100).toFixed(1) : 0;
      console.log(
        chalk.yellow(
          `📊 Summary: ${totalOrphans} orphan files out of ${totalFiles} (${percentage}%)`
        )
      );
    }

    printSummary(totalOrphans, 0);
  }
}

// CLI Configuration
runCli({
  name: 'check-orphans',
  description: `Finds files in assets/ and resources/ that are not referenced:
- Scans markdown, HTML, CSS, JS, and JSON files
- Detects orphan assets and images
- Optionally generates cleanup script`,
  flags: {
    generateCleanup: {
      flag: '--generate-cleanup',
      description: 'Generate a shell script to remove orphan files',
      default: false,
    },
  },
  examples: ['node scripts/check-orphans.js', 'node scripts/check-orphans.js --generate-cleanup'],
  run: async options => {
    const finder = new OrphanFileFinder(options);
    return finder.run();
  },
});

export default OrphanFileFinder;
