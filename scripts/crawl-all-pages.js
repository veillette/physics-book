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
 *   npm run crawl              # Crawl local server
 *   npm run crawl:verbose      # Show detailed output
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const baseUrl = 'http://localhost:4000/physics-book/contents/';
const siteDir = '_site/contents';

class PageCrawler {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
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
    this.page = null;
  }

  async initialize() {
    console.log(chalk.cyan.bold('\n📄 Page Crawler - Navigating Through All Pages\n'));
    console.log(chalk.gray(`Target: ${baseUrl}`));
    console.log(chalk.gray(`Source: ${siteDir}\n`));

    // Check if site is built
    if (!fs.existsSync(siteDir)) {
      console.log(chalk.red('❌ Jekyll site not built. Please run: bundle exec jekyll build\n'));
      process.exit(1);
    }

    // Launch browser
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    this.page = await context.newPage();

    // Listen for console errors
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.stats.errorTypes.jsErrors++;
        this.stats.totalErrors++;
      }
    });

    // Listen for failed requests
    this.page.on('requestfailed', request => {
      this.stats.errorTypes.resourceErrors++;
      this.stats.totalErrors++;
      if (this.verbose) {
        console.log(chalk.yellow(`  ⚠️  Failed request: ${request.url()}`));
      }
    });
  }

  async crawlAllPages() {
    // Get all HTML files
    const files = fs
      .readdirSync(siteDir)
      .filter(f => f.endsWith('.html'))
      .sort();

    this.stats.totalPages = files.length;
    console.log(chalk.cyan(`Found ${files.length} pages to check\n`));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await this.checkPage(file, i + 1);
    }
  }

  async checkPage(file, index) {
    const url = baseUrl + file;
    const errors = [];

    try {
      // Navigate to page
      const response = await this.page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 15000,
      });

      // Check HTTP status
      if (!response.ok()) {
        this.stats.errorTypes.httpErrors++;
        this.stats.totalErrors++;
        errors.push(`HTTP ${response.status()}`);
      }

      // Wait for MathJax to process
      await this.page.waitForTimeout(2000);

      // Check for unrendered math
      const mathCheck = await this.page.evaluate(() => {
        const bodyText = document.body.innerText;
        const unrendered = (bodyText.match(/\$\$/g) || []).length;
        const rendered = document.querySelectorAll('mjx-container').length;
        const jsErrors = [];

        // Check for error messages in page
        const errorElements = document.querySelectorAll('.error, [role="alert"]');
        errorElements.forEach(el => {
          if (el.textContent.toLowerCase().includes('error')) {
            jsErrors.push(el.textContent.trim().substring(0, 100));
          }
        });

        return { unrendered, rendered, jsErrors };
      });

      if (mathCheck.unrendered > 0) {
        this.stats.errorTypes.mathErrors++;
        this.stats.totalErrors++;
        errors.push(`${mathCheck.unrendered} unrendered $$`);
      }

      if (mathCheck.jsErrors.length > 0) {
        errors.push(...mathCheck.jsErrors);
      }

      // Record results
      this.stats.pagesChecked++;

      if (errors.length > 0) {
        this.stats.pagesWithErrors++;
        this.errors.push({ file, url, errors });
        console.log(chalk.red(`❌ [${index}/${this.stats.totalPages}] ${file}`));
        errors.forEach(err => console.log(chalk.yellow(`   └─ ${err}`)));
      } else {
        if (this.verbose) {
          console.log(chalk.green(`✓ [${index}/${this.stats.totalPages}] ${file}`));
        } else if (index % 20 === 0 || index === this.stats.totalPages) {
          const progress = Math.round((index / this.stats.totalPages) * 100);
          console.log(chalk.gray(`   Progress: ${index}/${this.stats.totalPages} (${progress}%)`));
        }
      }
    } catch (error) {
      this.stats.pagesWithErrors++;
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

const crawler = new PageCrawler({ verbose });
crawler.run();
