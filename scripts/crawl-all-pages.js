#!/usr/bin/env node
/**
 * Page Crawler - Navigate Through All Pages to Find Errors
 *
 * This script builds the Jekyll site and then navigates through every page
 * to detect errors such as:
 * - JavaScript errors (console errors)
 * - Failed resource loads (404s for CSS, JS, images)
 * - Unrendered MathJax equations
 * - Missing elements or broken layouts
 * - HTTP errors (500, 404, etc.)
 *
 * Usage:
 *   node scripts/crawl-all-pages.js              # Normal mode (progress every 20 pages)
 *   node scripts/crawl-all-pages.js --verbose    # Show all pages
 *   node scripts/crawl-all-pages.js --errors-only # Errors only, semi-verbose (progress every 10 pages)
 *   node scripts/crawl-all-pages.js -e           # Short form of --errors-only
 *   node scripts/crawl-all-pages.js --concurrent 10 # Set concurrency level (default: 5)
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const CONCURRENCY = parseInt(process.argv.find(arg => arg.startsWith('--concurrent='))?.split('=')[1]) ||
                    (process.argv.includes('--concurrent') ? parseInt(process.argv[process.argv.indexOf('--concurrent') + 1]) : 5) || 5;

const baseUrl = 'http://localhost:4000/physics-book/contents/';
const siteDir = '_site/contents';
const contentsDir = 'contents';

class PageCrawler {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.errorsOnly = options.errorsOnly || false;
    this.concurrency = options.concurrency || CONCURRENCY;
    this.stats = {
      totalPages: 0,
      pagesChecked: 0,
      pagesWithErrors: 0,
      totalErrors: 0,
      errorTypes: {
        jsErrors: 0,
        resourceErrors: 0,
        mathErrors: 0,
        httpErrors: 0,
      },
    };
    this.errors = [];
    this.browser = null;
    this.processLock = Promise.resolve();
  }

  /**
   * Find line numbers in source markdown file where pattern occurs
   */
  findLineNumbers(file, pattern) {
    try {
      // Convert HTML filename to markdown filename
      const mdFile = file.replace('.html', '.md');
      const sourcePath = path.join(contentsDir, mdFile);

      if (!fs.existsSync(sourcePath)) {
        return [];
      }

      const content = fs.readFileSync(sourcePath, 'utf-8');
      const lines = content.split('\n');
      const results = [];

      lines.forEach((line, index) => {
        if (line.includes(pattern)) {
          results.push({
            line: index + 1,
            text: line.trim().substring(0, 100),
          });
        }
      });

      return results;
    } catch (error) {
      return [];
    }
  }

  /**
   * Thread-safe stats update
   */
  updateStats(updates) {
    this.processLock = this.processLock.then(() => {
      Object.assign(this.stats, updates);
      if (updates.errorTypes) {
        Object.assign(this.stats.errorTypes, updates.errorTypes);
      }
    });
  }

  async initialize() {
    console.log(chalk.cyan.bold('\n📄 Page Crawler - Navigating Through All Pages\n'));
    console.log(chalk.gray(`Target: ${baseUrl}`));
    console.log(chalk.gray(`Source: ${siteDir}`));
    console.log(chalk.gray(`Concurrency: ${this.concurrency} parallel workers\n`));

    // Check if site is built
    if (!fs.existsSync(siteDir)) {
      console.log(chalk.red('❌ Jekyll site not built. Please run: bundle exec jekyll build\n'));
      process.exit(1);
    }

    // Launch browser
    this.browser = await chromium.launch({ headless: true });
  }

  /**
   * Create a new browser context with a page
   */
  async createContext() {
    const context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();

    // Collect errors for this page
    const pageErrors = {
      jsErrors: 0,
      resourceErrors: 0,
    };

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        pageErrors.jsErrors++;
      }
    });

    // Listen for failed requests
    page.on('requestfailed', request => {
      pageErrors.resourceErrors++;
    });

    return { page, context, pageErrors };
  }

  async crawlAllPages() {
    // Get all HTML files
    const files = fs
      .readdirSync(siteDir)
      .filter(f => f.endsWith('.html'))
      .sort();

    this.stats.totalPages = files.length;
    console.log(chalk.cyan(`Found ${files.length} pages to check\n`));

    // Process files in parallel with concurrency limit
    const fileQueue = files.map((file, index) => ({ file, index: index + 1 }));
    const workers = [];

    for (let i = 0; i < this.concurrency; i++) {
      workers.push(this.worker(fileQueue));
    }

    await Promise.all(workers);
  }

  /**
   * Worker that processes files from the queue
   */
  async worker(queue) {
    const { page, context, pageErrors } = await this.createContext();

    try {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item) break;

        await this.checkPage(page, pageErrors, item.file, item.index);
      }
    } finally {
      await context.close();
    }
  }

  async checkPage(page, pageErrors, file, index) {
    const url = baseUrl + file;
    const errors = [];
    let localErrorCounts = {
      jsErrors: 0,
      resourceErrors: 0,
      mathErrors: 0,
      httpErrors: 0,
    };

    // Reset page error counters
    pageErrors.jsErrors = 0;
    pageErrors.resourceErrors = 0;

    try {
      // Navigate to page
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 15000,
      });

      // Check HTTP status
      if (!response.ok()) {
        localErrorCounts.httpErrors++;
        errors.push(`HTTP ${response.status()}`);
      }

      // Wait for MathJax to process
      await page.waitForTimeout(2000);

      // Check for unrendered math and get specific instances
      const mathCheck = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        const unrenderedMatches = bodyText.match(/\$\$/g) || [];
        const unrendered = unrenderedMatches.length;
        const rendered = document.querySelectorAll('mjx-container').length;
        const jsErrors = [];

        // Extract actual unrendered math snippets with context
        const mathSnippets = [];
        const lines = document.body.innerText.split('\n');

        lines.forEach(line => {
          // Only look for lines with visible $$ (not rendered as math)
          if (line.includes('$$')) {
            // Extract the text around the $$ for better matching
            const parts = line.split('$$');
            if (parts.length > 1) {
              // Get context: text before first $$, between $$, and after
              for (let i = 0; i < parts.length - 1; i++) {
                const before = parts[i].trim().slice(-30);
                const after = parts[i + 1].trim().slice(0, 30);
                const snippet = `${before}$$${after}`;
                if (snippet && !mathSnippets.includes(snippet)) {
                  mathSnippets.push(snippet);
                }
              }
            }
          }
        });

        // Check for error messages in page
        const errorElements = document.querySelectorAll('.error, [role="alert"]');
        errorElements.forEach(el => {
          if (el.textContent.toLowerCase().includes('error')) {
            jsErrors.push(el.textContent.trim().substring(0, 100));
          }
        });

        return { unrendered, rendered, jsErrors, mathSnippets };
      });

      // Add page-level JS/resource errors
      localErrorCounts.jsErrors += pageErrors.jsErrors;
      localErrorCounts.resourceErrors += pageErrors.resourceErrors;

      if (mathCheck.unrendered > 0) {
        localErrorCounts.mathErrors++;
        errors.push(`${mathCheck.unrendered} unrendered $$`);

        // Show snippets and try to find line numbers
        if (mathCheck.mathSnippets.length > 0) {
          // Limit to first 3 snippets to avoid cluttering output
          const snippetsToShow = mathCheck.mathSnippets.slice(0, 3);

          snippetsToShow.forEach((snippet, idx) => {
            // Clean up the snippet for better matching
            const cleanSnippet = snippet.replace(/\s+/g, ' ').trim();

            // Show the snippet
            const displaySnippet = cleanSnippet.length > 60 ? cleanSnippet.substring(0, 60) + '...' : cleanSnippet;
            errors.push(`  → "${displaySnippet}"`);

            // Search for context around $$
            const parts = cleanSnippet.split('$$');
            if (parts.length >= 2) {
              const before = parts[0].trim().slice(-20);
              const after = parts[1].trim().slice(0, 20);

              // Search for the before or after context
              let lineRefs = [];
              if (before.length > 5) {
                lineRefs = this.findLineNumbers(file, before);
              }
              if (lineRefs.length === 0 && after.length > 5) {
                lineRefs = this.findLineNumbers(file, after);
              }

              if (lineRefs.length > 0 && lineRefs.length < 10) {
                const lineNumbers = lineRefs.map(r => r.line).join(', ');
                errors.push(`     Line(s): ${lineNumbers}`);
              }
            }
          });

          if (mathCheck.mathSnippets.length > 3) {
            errors.push(`  → ... and ${mathCheck.mathSnippets.length - 3} more`);
          }
        }
      }

      if (mathCheck.jsErrors.length > 0) {
        errors.push(...mathCheck.jsErrors);
      }

      // Thread-safe stats update
      await this.processLock;
      this.stats.pagesChecked++;
      const totalErrors = Object.values(localErrorCounts).reduce((a, b) => a + b, 0);

      if (errors.length > 0) {
        this.stats.pagesWithErrors++;
        this.stats.totalErrors += totalErrors;
        this.stats.errorTypes.jsErrors += localErrorCounts.jsErrors;
        this.stats.errorTypes.resourceErrors += localErrorCounts.resourceErrors;
        this.stats.errorTypes.mathErrors += localErrorCounts.mathErrors;
        this.stats.errorTypes.httpErrors += localErrorCounts.httpErrors;

        this.errors.push({ file, url, errors });
        console.log(chalk.red(`❌ [${index}/${this.stats.totalPages}] ${file}`));
        errors.forEach(err => console.log(chalk.yellow(`   └─ ${err}`)));
      } else {
        // Show successful pages in full verbose mode
        if (this.verbose && !this.errorsOnly) {
          console.log(chalk.green(`✓ [${index}/${this.stats.totalPages}] ${file}`));
        }
        // Show progress updates
        else {
          const progressInterval = this.errorsOnly ? 10 : 20;
          if (index % progressInterval === 0 || index === this.stats.totalPages) {
            const progress = Math.round((index / this.stats.totalPages) * 100);
            console.log(chalk.gray(`   Progress: ${index}/${this.stats.totalPages} (${progress}%)`));
          }
        }
      }
    } catch (error) {
      await this.processLock;
      this.stats.pagesWithErrors++;
      this.stats.totalErrors++;
      this.errors.push({ file, url, errors: [error.message] });
      console.log(chalk.red(`❌ [${index}/${this.stats.totalPages}] ${file}`));
      console.log(chalk.yellow(`   └─ ${error.message}`));
    }
  }

  printSummary() {
    console.log('\n' + chalk.cyan('='.repeat(60)));
    console.log(chalk.cyan.bold('SUMMARY'));
    console.log(chalk.cyan('='.repeat(60)));

    console.log(`Total pages:          ${this.stats.totalPages}`);
    console.log(`Pages checked:        ${this.stats.pagesChecked}`);

    if (this.stats.pagesWithErrors === 0) {
      console.log(chalk.green.bold(`\n✅ ALL PAGES LOADED SUCCESSFULLY!`));
    } else {
      console.log(chalk.red(`\nPages with errors:    ${this.stats.pagesWithErrors}`));
      console.log(chalk.yellow(`Total errors:         ${this.stats.totalErrors}`));
      console.log('\nError breakdown:');
      console.log(`  JavaScript errors:  ${this.stats.errorTypes.jsErrors}`);
      console.log(`  Resource errors:    ${this.stats.errorTypes.resourceErrors}`);
      console.log(`  Math errors:        ${this.stats.errorTypes.mathErrors}`);
      console.log(`  HTTP errors:        ${this.stats.errorTypes.httpErrors}`);

      if (this.errors.length > 0) {
        console.log(chalk.red('\n❌ FAILED PAGES:'));
        this.errors.forEach(({ file, errors }) => {
          console.log(chalk.yellow(`\n  ${file}:`));
          errors.forEach(err => console.log(chalk.gray(`    • ${err}`)));
        });
      }
    }

    console.log('\n');
    return this.stats.pagesWithErrors === 0;
  }

  async run() {
    try {
      await this.initialize();
      await this.crawlAllPages();
      const success = this.printSummary();
      await this.browser.close();
      process.exit(success ? 0 : 1);
    } catch (error) {
      console.error(chalk.red(`\nFatal Error: ${error.message}\n`));
      if (this.browser) {
        await this.browser.close();
      }
      process.exit(1);
    }
  }
}

// Parse command line args
const args = process.argv.slice(2);
const verbose = args.includes('--verbose') || args.includes('-v');
const errorsOnly = args.includes('--errors-only') || args.includes('-e');

const crawler = new PageCrawler({ verbose, errorsOnly, concurrency: CONCURRENCY });
crawler.run();
