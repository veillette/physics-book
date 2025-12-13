#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import fetch from 'node-fetch';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LinkChecker {
  constructor(options = {}) {
    this.baseDir = options.baseDir || path.join(__dirname, '..');
    this.contentDir = path.join(this.baseDir, 'contents');
    this.timeout = options.timeout || 10000;
    this.retries = options.retries || 2;
    this.concurrent = options.concurrent || 10;
    this.userAgent = 'Mozilla/5.0 (compatible; LinkChecker/1.0)';
    
    this.stats = {
      totalFiles: 0,
      totalLinks: 0,
      brokenLinks: 0,
      externalLinks: 0,
      internalLinks: 0,
      warnings: 0
    };
    
    this.brokenLinks = [];
    this.warnings = [];
    this.checkedUrls = new Map(); // Cache for external URLs
  }

  async checkLinks() {
    console.log(chalk.blue('🔍 Starting link check...\n'));

    // Find all markdown files
    const markdownFiles = await glob('**/*.md', {
      cwd: this.baseDir,
      ignore: [
        'node_modules/**',
        '_site/**',
        '.jekyll-cache/**',
        // Skip migration documentation files that contain example/placeholder syntax
        'JEKYLL_TO_*.md',
        'KRAMDOWN_*.md',
        '*_MIGRATION_*.md'
      ]
    });

    this.stats.totalFiles = markdownFiles.length;
    console.log(chalk.gray(`Found ${markdownFiles.length} markdown files\n`));

    // Process files in batches to avoid overwhelming the system
    const batchSize = 5;
    for (let i = 0; i < markdownFiles.length; i += batchSize) {
      const batch = markdownFiles.slice(i, i + batchSize);
      await Promise.all(batch.map(file => this.checkFileLinks(file)));
    }

    this.printResults();
    return this.stats.brokenLinks === 0;
  }

  async checkFileLinks(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const links = this.extractLinks(content);
      
      if (links.length > 0) {
        console.log(chalk.gray(`Checking ${links.length} links in ${filePath}`));
      }

      for (const link of links) {
        await this.checkSingleLink(link, filePath);
      }
    } catch (error) {
      this.addWarning(`Error reading file ${filePath}: ${error.message}`);
    }
  }

  extractLinks(content) {
    const links = [];
    
    // Match markdown links: [text](url) and [text](url "title")
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const [fullMatch, text, url] = match;
      if (url && !url.startsWith('#')) { // Skip anchor-only links
        links.push({
          text: text.trim(),
          url: url.trim(),
          type: 'markdown',
          line: this.getLineNumber(content, match.index)
        });
      }
    }

    // Match HTML links: <a href="url">
    const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      const [fullMatch, url] = match;
      if (url && !url.startsWith('#')) {
        links.push({
          text: 'HTML link',
          url: url.trim(),
          type: 'html',
          line: this.getLineNumber(content, match.index)
        });
      }
    }

    // Match image links: ![alt](src) and ![alt](src "title")
    const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    
    while ((match = imageRegex.exec(content)) !== null) {
      const [fullMatch, alt, src] = match;
      if (src) {
        links.push({
          text: alt || 'Image',
          url: src.trim(),
          type: 'image',
          line: this.getLineNumber(content, match.index)
        });
      }
    }

    this.stats.totalLinks += links.length;
    return links;
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  async checkSingleLink(link, filePath) {
    const { url } = link;

    // Skip mailto and other protocol links
    if (url.match(/^(mailto:|tel:|javascript:|data:)/i)) {
      return;
    }

    // Skip template syntax (Jekyll/Liquid/Nunjucks variables)
    if (url.includes('{{') || url.includes('{%') || url.includes('${')) {
      return;
    }

    // Skip common placeholder/example URLs in documentation
    if (/^(src|image\.jpg|example\.|placeholder\.)/.test(url) || url === 'url') {
      return;
    }

    if (this.isExternalLink(url)) {
      this.stats.externalLinks++;
      await this.checkExternalLink(link, filePath);
    } else {
      this.stats.internalLinks++;
      await this.checkInternalLink(link, filePath);
    }
  }

  isExternalLink(url) {
    return /^https?:\/\//.test(url);
  }

  async checkExternalLink(link, filePath) {
    const { url } = link;
    
    // Check cache first
    if (this.checkedUrls.has(url)) {
      const cachedResult = this.checkedUrls.get(url);
      if (!cachedResult.success) {
        // Network errors should be warnings, not broken links
        if (cachedResult.isNetworkError) {
          this.addWarning(`${filePath}:${link.line} - External link may be unreachable: ${url} (${cachedResult.error})`);
        } else {
          this.addBrokenLink(link, filePath, cachedResult.error);
        }
      }
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'HEAD', // Use HEAD to avoid downloading content
        headers: {
          'User-Agent': this.userAgent
        },
        signal: controller.signal,
        redirect: 'follow'
      });

      clearTimeout(timeoutId);

      if (!response.ok && response.status !== 405) { // 405 = Method Not Allowed (some servers don't support HEAD)
        if (response.status === 405) {
          // Try GET request for servers that don't support HEAD
          const getResponse = await fetch(url, {
            method: 'GET',
            headers: { 'User-Agent': this.userAgent },
            signal: controller.signal
          });
          
          if (!getResponse.ok) {
            throw new Error(`HTTP ${getResponse.status}: ${getResponse.statusText}`);
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      this.checkedUrls.set(url, { success: true });
      
    } catch (error) {
      let errorMessage = error.message;
      let isNetworkError = false;

      // Detect various types of network/connection errors
      const networkErrorPatterns = [
        'EAI_AGAIN',      // DNS resolution failure (transient)
        'ENOTFOUND',      // DNS lookup failed
        'ECONNREFUSED',   // Connection refused
        'ECONNRESET',     // Connection reset
        'ETIMEDOUT',      // Connection timed out
        'ENETUNREACH',    // Network unreachable
        'EHOSTUNREACH',   // Host unreachable
        'getaddrinfo',    // DNS lookup errors
        'socket hang up', // Socket closed unexpectedly
      ];

      if (error.name === 'AbortError') {
        errorMessage = `Timeout after ${this.timeout}ms`;
        isNetworkError = true;
      } else if (networkErrorPatterns.some(pattern =>
          (error.code && error.code.includes(pattern)) ||
          (error.message && error.message.includes(pattern)))) {
        errorMessage = `Network error: ${error.message || error.code}`;
        isNetworkError = true;
      }

      this.checkedUrls.set(url, { success: false, error: errorMessage, isNetworkError });

      // Treat network errors as warnings (don't fail the build for transient network issues)
      // This prevents CI failures due to temporary DNS or connection problems
      if (isNetworkError) {
        this.addWarning(`${filePath}:${link.line} - External link may be unreachable: ${url} (${errorMessage})`);
      } else {
        this.addBrokenLink(link, filePath, errorMessage);
      }
    }
  }

  async checkInternalLink(link, filePath) {
    const { url } = link;
    let targetPath = url;

    // Handle relative paths
    if (url.startsWith('./') || url.startsWith('../')) {
      const currentDir = path.dirname(path.join(this.baseDir, filePath));
      targetPath = path.resolve(currentDir, url);
      targetPath = path.relative(this.baseDir, targetPath);
    } else if (url.startsWith('/')) {
      targetPath = url.substring(1);
    }

    // Remove URL fragments (anchors)
    targetPath = targetPath.split('#')[0];

    // Skip empty paths (pure anchor links that were stripped)
    if (!targetPath) {
      return;
    }

    const fullTargetPath = path.join(this.baseDir, targetPath);

    // Check if file exists, trying multiple extensions for Jekyll/MyST style links
    const pathsToTry = [fullTargetPath];

    // If the path has no extension, try common markdown extensions
    const ext = path.extname(fullTargetPath);
    if (!ext) {
      pathsToTry.push(fullTargetPath + '.md');
      pathsToTry.push(fullTargetPath + '.html');
      pathsToTry.push(path.join(fullTargetPath, 'index.md'));
      pathsToTry.push(path.join(fullTargetPath, 'index.html'));
    }

    let found = false;
    for (const pathToCheck of pathsToTry) {
      try {
        const stats = fs.statSync(pathToCheck);
        if (stats.isFile() || stats.isDirectory()) {
          found = true;
          break;
        }
      } catch (error) {
        // Continue trying other paths
      }
    }

    if (!found) {
      this.addBrokenLink(link, filePath, 'File not found');
    }
  }

  addBrokenLink(link, filePath, error) {
    this.stats.brokenLinks++;
    this.brokenLinks.push({
      file: filePath,
      line: link.line,
      text: link.text,
      url: link.url,
      type: link.type,
      error
    });
  }

  addWarning(message) {
    this.stats.warnings++;
    this.warnings.push(message);
  }

  printResults() {
    console.log('\n' + '='.repeat(80));
    console.log(chalk.bold('📊 LINK CHECK RESULTS'));
    console.log('='.repeat(80));
    
    console.log(chalk.gray(`Files checked: ${this.stats.totalFiles}`));
    console.log(chalk.gray(`Total links: ${this.stats.totalLinks}`));
    console.log(chalk.gray(`Internal links: ${this.stats.internalLinks}`));
    console.log(chalk.gray(`External links: ${this.stats.externalLinks}`));
    
    if (this.stats.brokenLinks === 0) {
      console.log(chalk.green(`✅ All links are working! (${this.stats.totalLinks} checked)`));
    } else {
      console.log(chalk.red(`❌ Found ${this.stats.brokenLinks} broken links:`));
      console.log();
      
      this.brokenLinks.forEach((broken, index) => {
        console.log(chalk.red(`${index + 1}. ${broken.file}:${broken.line}`));
        console.log(chalk.gray(`   Text: "${broken.text}"`));
        console.log(chalk.gray(`   URL: ${broken.url}`));
        console.log(chalk.gray(`   Type: ${broken.type}`));
        console.log(chalk.red(`   Error: ${broken.error}`));
        console.log();
      });
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`⚠️  ${this.warnings.length} warnings:`));
      this.warnings.forEach(warning => {
        console.log(chalk.yellow(`   ${warning}`));
      });
      console.log();
    }

    console.log('='.repeat(80));
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const options = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--timeout':
        options.timeout = parseInt(args[++i]) || 10000;
        break;
      case '--retries':
        options.retries = parseInt(args[++i]) || 2;
        break;
      case '--concurrent':
        options.concurrent = parseInt(args[++i]) || 10;
        break;
      case '--help':
        console.log(`
Usage: node scripts/check-links.js [options]

Options:
  --timeout <ms>     Request timeout in milliseconds (default: 10000)
  --retries <num>    Number of retries for failed requests (default: 2)
  --concurrent <num> Maximum concurrent requests (default: 10)
  --help             Show this help message
`);
        process.exit(0);
    }
  }

  const checker = new LinkChecker(options);
  
  try {
    const success = await checker.checkLinks();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(chalk.red('❌ Link checking failed:'), error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default LinkChecker;