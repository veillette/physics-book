#!/usr/bin/env node

/**
 * Link Checker Script
 *
 * Validates internal and external links in markdown files.
 * Caches external link results for faster subsequent runs.
 *
 * Usage:
 *   node scripts/check-links.js [options]
 *
 * Options:
 *   --timeout <ms>     Request timeout in milliseconds (default: 10000)
 *   --no-cache         Disable persistent caching
 *   --cache-ttl <days> Cache TTL in days (default: 7)
 *   --help             Show this help message
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import fetch from 'node-fetch';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli } from './lib/cli.js';

import { getBaseDir, readFile } from './lib/files.js';

import { getLineNumber } from './lib/parser.js';

import chalk from 'chalk';

// Default cache settings
const DEFAULT_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Link checker class.
 */
class LinkChecker {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.contentDir = path.join(this.baseDir, 'contents');
    this.timeout = options.timeout || 10000;
    this.userAgent = 'Mozilla/5.0 (compatible; LinkChecker/1.0)';

    // Cache settings
    this.cacheFile = path.join(this.baseDir, '.link-cache.json');
    this.cacheTTL = options.cacheTTL || DEFAULT_CACHE_TTL;
    this.useCache = options.noCache !== true;

    this.stats = {
      totalFiles: 0,
      totalLinks: 0,
      brokenLinks: 0,
      externalLinks: 0,
      internalLinks: 0,
      warnings: 0,
      cachedLinks: 0,
    };

    this.brokenLinks = [];
    this.warnings = [];
    this.checkedUrls = new Map();

    if (this.useCache) {
      this.loadCache();
    }
  }

  async run() {
    printHeader('🔗', 'Link Checker');

    // Find all markdown files
    const markdownFiles = await glob('**/*.md', {
      cwd: this.baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**'],
    });

    this.stats.totalFiles = markdownFiles.length;
    console.log(chalk.gray(`Found ${markdownFiles.length} markdown files\n`));

    // Process files in batches
    const batchSize = 5;
    for (let i = 0; i < markdownFiles.length; i += batchSize) {
      const batch = markdownFiles.slice(i, i + batchSize);
      await Promise.all(batch.map(file => this.checkFileLinks(file)));
    }

    // Save cache
    if (this.useCache) {
      this.saveCache();
    }

    this.printResults();
    return this.stats.brokenLinks === 0;
  }

  loadCache() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const cacheData = JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
        const now = Date.now();

        for (const [url, entry] of Object.entries(cacheData)) {
          if (entry.timestamp && now - entry.timestamp < this.cacheTTL) {
            this.checkedUrls.set(url, entry);
          }
        }

        console.log(chalk.gray(`Loaded ${this.checkedUrls.size} cached link results\n`));
      }
    } catch (error) {
      console.log(chalk.yellow(`Warning: Could not load cache: ${error.message}\n`));
    }
  }

  saveCache() {
    try {
      const cacheData = {};
      for (const [url, entry] of this.checkedUrls) {
        if (entry.success || !entry.isNetworkError) {
          cacheData[url] = { ...entry, timestamp: entry.timestamp || Date.now() };
        }
      }

      fs.writeFileSync(this.cacheFile, JSON.stringify(cacheData, null, 2));
      console.log(chalk.gray(`Saved ${Object.keys(cacheData).length} link results to cache\n`));
    } catch (error) {
      console.log(chalk.yellow(`Warning: Could not save cache: ${error.message}\n`));
    }
  }

  async checkFileLinks(filePath) {
    const fullPath = path.join(this.baseDir, filePath);

    try {
      const content = readFile(fullPath);
      const links = this.extractLinks(content);

      if (links.length > 0) {
        console.log(chalk.gray(`Checking ${links.length} links in ${filePath}`));
      }

      for (const link of links) {
        await this.checkSingleLink(link, filePath, content);
      }
    } catch (error) {
      this.warnings.push(`Error reading ${filePath}: ${error.message}`);
    }
  }

  extractLinks(content) {
    const links = [];

    // Markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const [, text, url] = match;
      if (url && !url.startsWith('#')) {
        links.push({
          text: text.trim(),
          url: url.trim(),
          type: 'markdown',
          index: match.index,
        });
      }
    }

    // HTML links: <a href="url">
    const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      const [, url] = match;
      if (url && !url.startsWith('#')) {
        links.push({
          text: 'HTML link',
          url: url.trim(),
          type: 'html',
          index: match.index,
        });
      }
    }

    // Image links: ![alt](src)
    const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    while ((match = imageRegex.exec(content)) !== null) {
      const [, alt, src] = match;
      if (src) {
        links.push({
          text: alt || 'Image',
          url: src.trim(),
          type: 'image',
          index: match.index,
        });
      }
    }

    this.stats.totalLinks += links.length;
    return links;
  }

  async checkSingleLink(link, filePath, content) {
    const { url } = link;

    // Skip special protocols
    if (url.match(/^(mailto:|tel:|javascript:|data:)/i)) {
      return;
    }

    // Skip template syntax
    if (url.includes('{{') || url.includes('{%') || url.includes('${')) {
      return;
    }

    const lineNum = getLineNumber(content, link.index);

    if (this.isExternalLink(url)) {
      this.stats.externalLinks++;
      await this.checkExternalLink({ ...link, line: lineNum }, filePath);
    } else {
      this.stats.internalLinks++;
      await this.checkInternalLink({ ...link, line: lineNum }, filePath);
    }
  }

  isExternalLink(url) {
    return /^https?:\/\//.test(url);
  }

  async checkExternalLink(link, filePath) {
    const { url } = link;

    // Check cache first
    if (this.checkedUrls.has(url)) {
      const cached = this.checkedUrls.get(url);
      this.stats.cachedLinks++;
      if (!cached.success && !cached.isNetworkError) {
        this.addBrokenLink(link, filePath, cached.error);
      }
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': this.userAgent },
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      if (!response.ok && response.status !== 405) {
        throw new Error(`HTTP ${response.status}`);
      }

      this.checkedUrls.set(url, { success: true, timestamp: Date.now() });
    } catch (error) {
      let errorMessage = error.message;
      let isNetworkError = false;

      if (error.name === 'AbortError') {
        errorMessage = `Timeout after ${this.timeout}ms`;
        isNetworkError = true;
      } else if (error.code?.includes('ENOTFOUND') || error.code?.includes('EAI_AGAIN')) {
        errorMessage = `Network error: ${error.message}`;
        isNetworkError = true;
      }

      this.checkedUrls.set(url, {
        success: false,
        error: errorMessage,
        isNetworkError,
        timestamp: Date.now(),
      });

      if (!isNetworkError) {
        this.addBrokenLink(link, filePath, errorMessage);
      } else {
        this.warnings.push(`${filePath}:${link.line} - Network issue: ${url}`);
        this.stats.warnings++;
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

    // Remove anchors
    targetPath = targetPath.split('#')[0];
    if (!targetPath) return;

    const fullTargetPath = path.join(this.baseDir, targetPath);

    // Check if file exists (try multiple extensions)
    const pathsToTry = [fullTargetPath];
    if (!path.extname(fullTargetPath)) {
      pathsToTry.push(`${fullTargetPath}.md`, `${fullTargetPath}.html`);
    }

    const found = pathsToTry.some(p => {
      try {
        return fs.statSync(p).isFile();
      } catch {
        return false;
      }
    });

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
      error,
    });
  }

  printResults() {
    printDivider();

    console.log(chalk.gray(`Files checked: ${this.stats.totalFiles}`));
    console.log(chalk.gray(`Total links: ${this.stats.totalLinks}`));
    console.log(chalk.gray(`Internal links: ${this.stats.internalLinks}`));
    console.log(chalk.gray(`External links: ${this.stats.externalLinks}`));
    if (this.stats.cachedLinks > 0) {
      console.log(chalk.gray(`Cached results used: ${this.stats.cachedLinks}`));
    }

    if (this.stats.brokenLinks === 0) {
      printSuccess(`All links are working! (${this.stats.totalLinks} checked)`);
    } else {
      console.log(chalk.red(`\n❌ Found ${this.stats.brokenLinks} broken links:\n`));

      this.brokenLinks.slice(0, 20).forEach((broken, i) => {
        console.log(chalk.red(`${i + 1}. ${broken.file}:${broken.line}`));
        console.log(chalk.gray(`   URL: ${broken.url}`));
        console.log(chalk.red(`   Error: ${broken.error}`));
      });

      if (this.brokenLinks.length > 20) {
        console.log(chalk.gray(`\n... and ${this.brokenLinks.length - 20} more`));
      }
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`\n⚠️  ${this.warnings.length} warnings`));
    }

    printDivider();
    printSummary(this.stats.brokenLinks, this.stats.warnings);
  }
}

// CLI Configuration
runCli({
  name: 'check-links',
  description: `Validates internal and external links in markdown files:
- Checks for broken internal links
- Validates external URL accessibility
- Caches results for faster runs`,
  flags: {
    timeout: {
      flag: '--timeout',
      description: 'Request timeout in milliseconds (default: 10000)',
      type: 'number',
      default: 10000,
    },
    noCache: {
      flag: '--no-cache',
      description: 'Disable persistent caching',
      default: false,
    },
    cacheTTL: {
      flag: '--cache-ttl',
      description: 'Cache TTL in days (default: 7)',
      type: 'number',
      default: 7,
    },
  },
  examples: [
    'node scripts/check-links.js',
    'node scripts/check-links.js --timeout 5000',
    'node scripts/check-links.js --no-cache',
  ],
  run: async options => {
    const checker = new LinkChecker({
      timeout: options.timeout,
      noCache: options.noCache,
      cacheTTL: options.cacheTTL * 24 * 60 * 60 * 1000,
    });
    return checker.run();
  },
});

export default LinkChecker;
