#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class OrphanFileFinder {
  constructor(options = {}) {
    this.baseDir = options.baseDir || path.join(__dirname, '..');
    this.contentDir = path.join(this.baseDir, 'contents');
    this.resourcesDir = path.join(this.baseDir, 'resources');
    this.assetsDir = path.join(this.baseDir, 'assets');
    
    this.stats = {
      totalFiles: 0,
      totalImages: 0,
      referencedFiles: 0,
      referencedImages: 0,
      orphanFiles: 0,
      orphanImages: 0,
      totalMarkdownFiles: 0
    };
    
    this.referencedPaths = new Set();
    this.orphanFiles = [];
    this.orphanImages = [];
    this.fileReferences = new Map(); // Track which files reference what
  }

  async findOrphans() {
    console.log(chalk.blue('🔍 Starting orphan file detection...\n'));

    // Step 1: Find all markdown files and extract references
    await this.scanMarkdownFiles();
    
    // Step 2: Find all potential orphan files
    await this.findOrphanAssets();
    
    // Step 3: Find orphan images in resources
    await this.findOrphanImages();
    
    this.printResults();
    return {
      orphanFiles: this.orphanFiles,
      orphanImages: this.orphanImages,
      stats: this.stats
    };
  }

  async scanMarkdownFiles() {
    console.log(chalk.gray('📄 Scanning markdown, HTML, JSON, JavaScript, and CSS files for references...'));

    // Find all markdown files
    const markdownFiles = await glob('**/*.md', {
      cwd: this.baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**']
    });

    // Find all HTML files (for Jekyll templates)
    const htmlFiles = await glob('**/*.html', {
      cwd: this.baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**']
    });

    // Find all JSON files (for manifests and configs)
    const jsonFiles = await glob('**/*.json', {
      cwd: this.baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**', 'package*.json']
    });

    // Find all JavaScript files (for service workers, configs, etc.)
    const jsFiles = await glob('**/*.js', {
      cwd: this.baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**', 'scripts/**']
    });

    // Find all CSS files (for background images, etc.)
    const cssFiles = await glob('**/*.css', {
      cwd: this.baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**']
    });

    const allFiles = [...markdownFiles, ...htmlFiles, ...jsonFiles, ...jsFiles, ...cssFiles];
    this.stats.totalMarkdownFiles = markdownFiles.length;

    for (const filePath of allFiles) {
      await this.extractReferences(filePath);
    }

    console.log(chalk.gray(`Found ${this.referencedPaths.size} unique file references\n`));
  }

  async extractReferences(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      this.extractLinksFromContent(content, filePath);
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not read ${filePath}: ${error.message}`));
    }
  }

  extractLinksFromContent(content, sourceFile) {
    const references = new Set();

    // Normalize content: join lines that are split within markdown links/images
    // This handles cases where image paths are split across multiple lines
    // Pattern 1: ](\n becomes ](
    // Pattern 2: ..\n/ becomes ../ (paths split mid-way like ..\n/resources/...)
    // Pattern 3: .jpg\n" becomes .jpg " (with space before quote)
    let normalizedContent = content
      .replace(/\]\(\s*\n\s*/g, '](')
      .replace(/\.\.\s*\n\s*\//g, '../')
      .replace(/(\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff|css|js|json|html))\n/gi, '$1 ')
      .replace(/\)\s*\n\s*\{/g, ') {'); // Also handle )\n{: for Jekyll attributes

    // Extract references from JavaScript files (string literals with image paths)
    if (sourceFile.endsWith('.js')) {
      this.extractJavaScriptReferences(normalizedContent, references, sourceFile);
    }

    // Extract references from CSS files (url() functions)
    if (sourceFile.endsWith('.css')) {
      this.extractCSSReferences(normalizedContent, references, sourceFile);
    }

    // Extract Jekyll/Liquid template references: {{'/path/to/file'| relative_url }}
    const jekyllRegex = /\{\{\s*['"]([^'"]+)['"]\s*\|\s*relative_url\s*\}\}/g;
    let match;

    while ((match = jekyllRegex.exec(normalizedContent)) !== null) {
      const [, url] = match;
      if (this.isLocalFile(url)) {
        const resolvedPath = this.resolvePath(url, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }

    // Extract markdown links: [text](path)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

    while ((match = markdownLinkRegex.exec(normalizedContent)) !== null) {
      const [, , url] = match;
      if (this.isLocalFile(url)) {
        const resolvedPath = this.resolvePath(url, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }

    // Extract image references: ![alt](path) or ![alt](path "title")
    // Use a more flexible pattern that handles titles with embedded quotes/HTML and escaped brackets
    // (?:[^\]\\]|\\.)* matches either non-bracket/non-backslash OR backslash followed by any char (handles \] and \[)
    const imageRegex = /!\[(?:[^\]\\]|\\.)*\]\(([^)"\s]+)(?:\s+[^)]+)?\)/g;

    while ((match = imageRegex.exec(normalizedContent)) !== null) {
      const src = match[1];
      if (this.isLocalFile(src)) {
        const resolvedPath = this.resolvePath(src, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }

    // Extract HTML img tags: <img src="path">
    const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

    while ((match = htmlImgRegex.exec(normalizedContent)) !== null) {
      const [, src] = match;
      if (this.isLocalFile(src)) {
        const resolvedPath = this.resolvePath(src, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }

    // Extract CSS/JS references in HTML
    const assetRegex = /<(?:link[^>]+href=["']([^"']+)["']|script[^>]+src=["']([^"']+)["'])[^>]*>/gi;

    while ((match = assetRegex.exec(normalizedContent)) !== null) {
      const url = match[1] || match[2];
      if (url && this.isLocalFile(url)) {
        const resolvedPath = this.resolvePath(url, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }

    // Extract JSON references (for manifest.json icon paths, etc.)
    if (sourceFile.endsWith('.json')) {
      try {
        const jsonData = JSON.parse(content);
        this.extractJsonReferences(jsonData, references, sourceFile);
      } catch (error) {
        // Not valid JSON or parsing error, skip
      }
    }

    // Store references for this file
    if (references.size > 0) {
      this.fileReferences.set(sourceFile, Array.from(references));
    }
  }

  extractJsonReferences(obj, references, sourceFile) {
    if (typeof obj === 'string') {
      // Check if the string looks like a file path
      if (this.isLocalFile(obj) && (obj.includes('/') || obj.includes('\\'))) {
        const resolvedPath = this.resolvePath(obj, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(item => this.extractJsonReferences(item, references, sourceFile));
    } else if (obj && typeof obj === 'object') {
      Object.values(obj).forEach(value => this.extractJsonReferences(value, references, sourceFile));
    }
  }

  extractJavaScriptReferences(content, references, sourceFile) {
    // Extract string literals that look like image paths
    // Matches strings in quotes that contain image extensions
    const jsStringRegex = /['"]((?:[^'"]*\/)?[^'"]*\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff|ico))['"]/gi;
    let match;

    while ((match = jsStringRegex.exec(content)) !== null) {
      const path = match[1];
      if (this.isLocalFile(path)) {
        const resolvedPath = this.resolvePath(path, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }

    // Also extract template literal paths
    const templateLiteralRegex = /`((?:[^`]*\/)?[^`]*\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff|ico))`/gi;

    while ((match = templateLiteralRegex.exec(content)) !== null) {
      const path = match[1];
      if (this.isLocalFile(path)) {
        const resolvedPath = this.resolvePath(path, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }
  }

  extractCSSReferences(content, references, sourceFile) {
    // Extract url() references from CSS
    // Matches: url('path'), url("path"), url(path)
    const cssUrlRegex = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;
    let match;

    while ((match = cssUrlRegex.exec(content)) !== null) {
      const url = match[2];
      if (this.isLocalFile(url)) {
        const resolvedPath = this.resolvePath(url, sourceFile);
        if (resolvedPath) {
          this.referencedPaths.add(resolvedPath);
          references.add(resolvedPath);
        }
      }
    }
  }

  isLocalFile(url) {
    // Skip external URLs, anchors, and special protocols
    return !url.match(/^(https?:\/\/|mailto:|tel:|#|javascript:|data:)/i);
  }

  resolvePath(url, sourceFile) {
    try {
      // Handle relative paths
      if (url.startsWith('./') || url.startsWith('../')) {
        const currentDir = path.dirname(path.join(this.baseDir, sourceFile));
        const absolutePath = path.resolve(currentDir, url);
        return path.relative(this.baseDir, absolutePath);
      }
      // Handle absolute paths from root
      else if (url.startsWith('/')) {
        let resolved = url.substring(1);
        // Remove common base paths like /physics-book/ (for GitHub Pages)
        resolved = resolved.replace(/^physics-book\//, '');
        return resolved;
      }
      // Handle paths already relative to base
      else {
        return url;
      }
    } catch (error) {
      return null;
    }
  }

  async findOrphanAssets() {
    console.log(chalk.gray('🎨 Checking assets directory for orphan files...'));
    
    try {
      const assetFiles = await glob('**/*', { 
        cwd: this.assetsDir,
        nodir: true
      });

      this.stats.totalFiles = assetFiles.length;

      for (const file of assetFiles) {
        const relativePath = path.join('assets', file);
        const normalizedPath = relativePath.replace(/\\/g, '/');
        
        let isReferenced = false;
        
        // Check various possible reference patterns
        const possibleRefs = [
          normalizedPath,
          `/${normalizedPath}`,
          `./${normalizedPath}`,
          `../${normalizedPath}`,
          file,
          `/${file}`,
          `./${file}`,
          `../${file}`
        ];

        for (const ref of possibleRefs) {
          if (this.referencedPaths.has(ref)) {
            isReferenced = true;
            this.stats.referencedFiles++;
            break;
          }
        }

        if (!isReferenced) {
          this.stats.orphanFiles++;
          this.orphanFiles.push({
            path: relativePath,
            fullPath: path.join(this.assetsDir, file),
            size: this.getFileSize(path.join(this.assetsDir, file)),
            type: this.getFileType(file)
          });
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not scan assets directory: ${error.message}`));
    }
  }

  async findOrphanImages() {
    console.log(chalk.gray('🖼️  Checking resources directory for orphan images...'));
    
    try {
      const imageFiles = await glob('**/*.{jpg,jpeg,png,gif,svg,webp,bmp,tiff}', { 
        cwd: this.resourcesDir,
        nodir: true
      });

      this.stats.totalImages = imageFiles.length;

      for (const file of imageFiles) {
        const relativePath = path.join('resources', file);
        const normalizedPath = relativePath.replace(/\\/g, '/');
        
        let isReferenced = false;
        
        // Check various possible reference patterns
        const possibleRefs = [
          normalizedPath,
          `/${normalizedPath}`,
          `./${normalizedPath}`,
          `../${normalizedPath}`,
          file,
          `/${file}`,
          `./${file}`,
          `../${file}`,
          `../resources/${file}`,
          `./resources/${file}`
        ];

        for (const ref of possibleRefs) {
          if (this.referencedPaths.has(ref)) {
            isReferenced = true;
            this.stats.referencedImages++;
            break;
          }
        }

        if (!isReferenced) {
          this.stats.orphanImages++;
          this.orphanImages.push({
            path: relativePath,
            fullPath: path.join(this.resourcesDir, file),
            size: this.getFileSize(path.join(this.resourcesDir, file)),
            type: this.getFileType(file),
            dimensions: await this.getImageDimensions(path.join(this.resourcesDir, file))
          });
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not scan resources directory: ${error.message}`));
    }
  }

  getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return this.formatBytes(stats.size);
    } catch {
      return 'Unknown';
    }
  }

  getFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const typeMap = {
      '.jpg': 'Image', '.jpeg': 'Image', '.png': 'Image', '.gif': 'Image', 
      '.svg': 'Vector', '.webp': 'Image', '.bmp': 'Image', '.tiff': 'Image',
      '.css': 'Stylesheet', '.js': 'Script', '.json': 'Data',
      '.md': 'Markdown', '.html': 'HTML', '.htm': 'HTML',
      '.pdf': 'Document', '.doc': 'Document', '.docx': 'Document'
    };
    return typeMap[ext] || 'Unknown';
  }

  async getImageDimensions(filePath) {
    try {
      // This is a simple approach - for production, you might want to use an image library
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        return 'Available'; // Placeholder - would need image processing library for actual dimensions
      }
    } catch {
      return 'Unknown';
    }
    return 'Unknown';
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  printResults() {
    console.log('\n' + '='.repeat(80));
    console.log(chalk.bold('🗂️  ORPHAN FILES REPORT'));
    console.log('='.repeat(80));
    
    // Summary stats
    console.log(chalk.gray(`Markdown files scanned: ${this.stats.totalMarkdownFiles}`));
    console.log(chalk.gray(`Asset files found: ${this.stats.totalFiles}`));
    console.log(chalk.gray(`Image files found: ${this.stats.totalImages}`));
    console.log(chalk.gray(`Referenced files: ${this.stats.referencedFiles}`));
    console.log(chalk.gray(`Referenced images: ${this.stats.referencedImages}`));
    console.log();

    // Orphan assets
    if (this.orphanFiles.length === 0) {
      console.log(chalk.green('✅ No orphan asset files found!'));
    } else {
      console.log(chalk.red(`📁 Found ${this.orphanFiles.length} orphan asset files:`));
      console.log();
      
      this.orphanFiles.forEach((file, index) => {
        console.log(chalk.red(`${index + 1}. ${file.path}`));
        console.log(chalk.gray(`   Type: ${file.type}`));
        console.log(chalk.gray(`   Size: ${file.size}`));
        console.log(chalk.gray(`   Full path: ${file.fullPath}`));
        console.log();
      });
    }

    // Orphan images
    if (this.orphanImages.length === 0) {
      console.log(chalk.green('✅ No orphan image files found!'));
    } else {
      console.log(chalk.red(`🖼️  Found ${this.orphanImages.length} orphan image files:`));
      console.log();
      
      this.orphanImages.forEach((image, index) => {
        console.log(chalk.red(`${index + 1}. ${image.path}`));
        console.log(chalk.gray(`   Type: ${image.type}`));
        console.log(chalk.gray(`   Size: ${image.size}`));
        console.log(chalk.gray(`   Full path: ${image.fullPath}`));
        console.log();
      });
    }

    // Summary
    const totalOrphans = this.orphanFiles.length + this.orphanImages.length;
    const totalFiles = this.stats.totalFiles + this.stats.totalImages;
    const orphanPercentage = totalFiles > 0 ? ((totalOrphans / totalFiles) * 100).toFixed(1) : 0;

    console.log('='.repeat(80));
    if (totalOrphans === 0) {
      console.log(chalk.green(`🎉 All files are referenced! (${totalFiles} files checked)`));
    } else {
      console.log(chalk.yellow(`📊 Summary: ${totalOrphans} orphan files out of ${totalFiles} total (${orphanPercentage}%)`));
    }
    console.log('='.repeat(80));
  }

  // Method to generate a cleanup script
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
      'fi'
    ].join('\n');

    fs.writeFileSync(outputPath, script, 'utf8');
    console.log(chalk.blue(`\n📝 Generated cleanup script: ${outputPath}`));
    console.log(chalk.yellow('⚠️  Review the script carefully before running it!'));
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const options = {};
  let generateCleanup = false;

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--generate-cleanup':
        generateCleanup = true;
        break;
      case '--help':
        console.log(`
Usage: node scripts/find-orphan-files.js [options]

Options:
  --generate-cleanup  Generate a shell script to remove orphan files
  --help             Show this help message

This script finds files in the assets/ and resources/ directories that are not
referenced by any markdown files in the project.
`);
        process.exit(0);
    }
  }

  const finder = new OrphanFileFinder(options);
  
  try {
    const results = await finder.findOrphans();
    
    if (generateCleanup) {
      finder.generateCleanupScript();
    }
    
    const hasOrphans = results.orphanFiles.length > 0 || results.orphanImages.length > 0;
    process.exit(hasOrphans ? 1 : 0);
  } catch (error) {
    console.error(chalk.red('❌ Orphan detection failed:'), error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default OrphanFileFinder;