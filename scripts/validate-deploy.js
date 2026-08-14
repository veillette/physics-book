#!/usr/bin/env node

/**
 * Post-Deployment Validation Script
 *
 * Performs health checks on the deployed physics book site:
 * - Verifies critical pages load successfully
 * - Checks MathJax is loading and rendering
 * - Tests search functionality
 * - Validates PWA manifest and service worker
 * - Checks for broken assets (CSS, JS, images)
 * - Verifies HTTPS and security headers
 * - Tests responsive design basics
 *
 * Usage:
 *   node scripts/validate-deploy.js [url] [options]
 *
 * Options:
 *   -v, --verbose      Show detailed output
 *   --timeout <ms>     Request timeout in milliseconds (default: 30000)
 *   --github           Use GitHub Pages URL
 *   --help             Show this help message
 */

import { chromium } from '@playwright/test';
import chalk from 'chalk';
import { printHeader, printDivider, printSummary } from './lib/reporter.js';
import { runCli, STANDARD_FLAGS } from './lib/cli.js';

const DEFAULT_URLS = {
  vercel: 'https://physics-book.vercel.app',
  github: 'https://veillette.github.io/physics-book2',
};

// Critical pages to check
const CRITICAL_PAGES = [
  '/',
  '/contents/ch1PhysicsAnIntroduction.html',
  '/contents/ch2Kinematics.html',
  '/contents/ch18ElectricChargeAndElectricField.html',
  '/SUMMARY.html',
];

// Sample images to check
const SAMPLE_IMAGES = ['/resources/Figure_01_01_01.jpg', '/resources/Figure_02_01_01.jpg'];

/**
 * Deployment validator class.
 */
class DeploymentValidator {
  constructor(options = {}) {
    this.baseUrl = (options.url || DEFAULT_URLS.vercel).replace(/\/$/, '');
    this.verbose = options.verbose || false;
    this.timeout = options.timeout || 30000;

    this.checks = {
      passed: 0,
      failed: 0,
      warnings: 0,
    };

    this.results = [];
    this.browser = null;
    this.page = null;
  }

  async run() {
    printHeader('🚀', 'Post-Deployment Validation');

    console.log(chalk.cyan(`Target: ${this.baseUrl}\n`));

    try {
      // Launch browser
      this.browser = await chromium.launch({ headless: true });
      const context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (compatible; DeploymentValidator/1.0)',
      });
      this.page = await context.newPage();
      this.page.setDefaultTimeout(this.timeout);

      // Run all checks
      await this.checkCriticalPages();
      await this.checkMathJax();
      await this.checkSearchFunctionality();
      await this.checkPWA();
      await this.checkAssets();
      await this.checkSecurityHeaders();
      await this.checkResponsive();

      await this.browser.close();

      this.printResults();
      return this.checks.failed === 0;
    } catch (error) {
      console.error(chalk.red(`\nFatal Error: ${error.message}`));
      if (this.browser) {
        await this.browser.close();
      }
      return false;
    }
  }

  async checkCriticalPages() {
    console.log(chalk.blue('\n📄 Checking Critical Pages...'));

    for (const pagePath of CRITICAL_PAGES) {
      try {
        const url = `${this.baseUrl}${pagePath}`;
        const response = await this.page.goto(url, { waitUntil: 'networkidle' });

        if (response.status() === 200) {
          this.pass(`✓ ${pagePath} - Loaded successfully`);

          const bodyText = await this.page.textContent('body');
          if (bodyText && bodyText.length > 100) {
            this.pass(`  └─ Has content (${bodyText.length} chars)`);
          } else {
            this.warn(`  └─ Page seems empty (${bodyText?.length || 0} chars)`);
          }
        } else {
          this.fail(`✗ ${pagePath} - HTTP ${response.status()}`);
        }
      } catch (error) {
        this.fail(`✗ ${pagePath} - ${error.message}`);
      }
    }
  }

  async checkMathJax() {
    console.log(chalk.blue('\n🔢 Checking MathJax Rendering...'));

    try {
      const url = `${this.baseUrl}/contents/ch2Kinematics.html`;
      await this.page.goto(url, { waitUntil: 'networkidle' });

      const mathJaxLoaded = await this.page.evaluate(() => {
        return typeof window.MathJax !== 'undefined';
      });

      if (mathJaxLoaded) {
        this.pass('✓ MathJax library loaded');

        const renderedMath = await this.page.$$('mjx-container, .MathJax, .mjx-math');

        if (renderedMath.length > 0) {
          this.pass(`✓ Math rendered (${renderedMath.length} elements)`);

          const mathErrors = await this.page.$$('.MathJax_Error, mjx-error');
          if (mathErrors.length > 0) {
            this.fail(`✗ Math rendering errors: ${mathErrors.length}`);
          } else {
            this.pass('✓ No math rendering errors detected');
          }
        } else {
          this.warn('⚠ No rendered math elements found');
        }
      } else {
        this.fail('✗ MathJax library not loaded');
      }
    } catch (error) {
      this.fail(`✗ MathJax check failed: ${error.message}`);
    }
  }

  async checkSearchFunctionality() {
    console.log(chalk.blue('\n🔍 Checking Search Functionality...'));

    try {
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });

      const searchInput = await this.page.$('input[type="search"], #search-input, .search-input');

      if (searchInput) {
        this.pass('✓ Search input found');

        const searchIndexLoaded = await this.page.evaluate(() => {
          return (
            typeof window.searchIndex !== 'undefined' ||
            typeof window.MiniSearch !== 'undefined' ||
            document.querySelector('script[src*="minisearch"]') !== null
          );
        });

        if (searchIndexLoaded) {
          this.pass('✓ Search index/library detected');
        } else {
          this.warn('⚠ Search index not detected');
        }
      } else {
        this.warn('⚠ Search input not found');
      }
    } catch (error) {
      this.fail(`✗ Search check failed: ${error.message}`);
    }
  }

  async checkPWA() {
    console.log(chalk.blue('\n📱 Checking PWA Features...'));

    try {
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });

      const manifest = await this.page.$('link[rel="manifest"]');
      if (manifest) {
        const manifestUrl = await manifest.getAttribute('href');
        this.pass(`✓ PWA manifest linked: ${manifestUrl}`);

        try {
          const manifestFullUrl = manifestUrl.startsWith('http')
            ? manifestUrl
            : `${this.baseUrl}${manifestUrl}`;

          const response = await this.page.request.get(manifestFullUrl);
          if (response.ok()) {
            const manifestData = await response.json();
            if (manifestData.name && manifestData.icons) {
              this.pass(`✓ Manifest valid (${manifestData.icons.length} icons)`);
            } else {
              this.warn('⚠ Manifest missing name or icons');
            }
          } else {
            this.fail(`✗ Manifest not accessible: HTTP ${response.status()}`);
          }
        } catch (error) {
          this.warn(`⚠ Could not fetch manifest: ${error.message}`);
        }
      } else {
        this.warn('⚠ PWA manifest not found');
      }

      const swRegistered = await this.page.evaluate(async () => {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.getRegistration();
          return registration !== undefined;
        }
        return false;
      });

      if (swRegistered) {
        this.pass('✓ Service worker registered');
      } else {
        this.warn('⚠ Service worker not registered');
      }
    } catch (error) {
      this.fail(`✗ PWA check failed: ${error.message}`);
    }
  }

  async checkAssets() {
    console.log(chalk.blue('\n📦 Checking Assets...'));

    try {
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });

      const stylesheets = await this.page.$$('link[rel="stylesheet"]');
      this.pass(`✓ Found ${stylesheets.length} stylesheets`);

      const scripts = await this.page.$$('script[src]');
      this.pass(`✓ Found ${scripts.length} external scripts`);

      for (const imagePath of SAMPLE_IMAGES) {
        try {
          const response = await this.page.request.get(`${this.baseUrl}${imagePath}`);
          if (response.ok()) {
            this.pass(`✓ Image loads: ${imagePath}`);
          } else {
            this.warn(`⚠ Image not found: ${imagePath} (HTTP ${response.status()})`);
          }
        } catch (_error) {
          this.warn(`⚠ Image check failed: ${imagePath}`);
        }
      }
    } catch (error) {
      this.fail(`✗ Asset check failed: ${error.message}`);
    }
  }

  async checkSecurityHeaders() {
    console.log(chalk.blue('\n🔒 Checking Security...'));

    try {
      const response = await this.page.goto(this.baseUrl);
      const headers = response.headers();

      if (this.baseUrl.startsWith('https://')) {
        this.pass('✓ Using HTTPS');
      } else {
        this.warn('⚠ Not using HTTPS');
      }

      const securityHeaders = {
        'x-frame-options': 'X-Frame-Options',
        'x-content-type-options': 'X-Content-Type-Options',
        'strict-transport-security': 'Strict-Transport-Security',
      };

      let headersFound = 0;
      for (const [header, name] of Object.entries(securityHeaders)) {
        if (headers[header]) {
          this.pass(`✓ ${name} present`);
          headersFound++;
        }
      }

      if (headersFound === 0) {
        this.warn('⚠ No security headers detected');
      }
    } catch (error) {
      this.fail(`✗ Security check failed: ${error.message}`);
    }
  }

  async checkResponsive() {
    console.log(chalk.blue('\n📱 Checking Responsive Design...'));

    try {
      await this.page.setViewportSize({ width: 375, height: 667 });
      await this.page.goto(`${this.baseUrl}/contents/ch1PhysicsAnIntroduction.html`, {
        waitUntil: 'networkidle',
      });

      const bodyWidth = await this.page.evaluate(() => {
        return document.body.scrollWidth;
      });
      const viewportWidth = 375;

      if (bodyWidth <= viewportWidth + 20) {
        this.pass('✓ Mobile: No horizontal overflow');
      } else {
        this.warn(`⚠ Mobile: Possible horizontal overflow (body: ${bodyWidth}px)`);
      }

      await this.page.setViewportSize({ width: 1280, height: 720 });
      await this.page.goto(this.baseUrl);

      const viewportMeta = await this.page.$('meta[name="viewport"]');
      if (viewportMeta) {
        const content = await viewportMeta.getAttribute('content');
        this.pass(`✓ Viewport meta tag: ${content}`);
      } else {
        this.warn('⚠ No viewport meta tag found');
      }
    } catch (error) {
      this.fail(`✗ Responsive check failed: ${error.message}`);
    }
  }

  pass(message) {
    this.checks.passed++;
    this.results.push({ type: 'pass', message });
    if (this.verbose) {
      console.log(chalk.green(message));
    }
  }

  fail(message) {
    this.checks.failed++;
    this.results.push({ type: 'fail', message });
    console.log(chalk.red(message));
  }

  warn(message) {
    this.checks.warnings++;
    this.results.push({ type: 'warn', message });
    if (this.verbose) {
      console.log(chalk.yellow(message));
    }
  }

  printResults() {
    printDivider();

    console.log(chalk.blue.bold('\n📊 Validation Results\n'));

    console.log(chalk.green(`Passed:   ${this.checks.passed}`));
    console.log(chalk.red(`Failed:   ${this.checks.failed}`));
    console.log(chalk.yellow(`Warnings: ${this.checks.warnings}`));

    const total = this.checks.passed + this.checks.failed + this.checks.warnings;
    const successRate = total > 0 ? ((this.checks.passed / total) * 100).toFixed(1) : 0;

    console.log(chalk.cyan(`\nSuccess Rate: ${successRate}%`));

    if (this.checks.failed === 0) {
      console.log(chalk.green.bold('\n✅ DEPLOYMENT VALIDATION PASSED'));
      console.log(chalk.gray('Site is healthy and ready for use!'));
    } else {
      console.log(chalk.red.bold('\n❌ DEPLOYMENT VALIDATION FAILED'));
      console.log(chalk.gray('Critical issues need to be addressed.'));
    }

    printDivider();
    printSummary(this.checks.failed, this.checks.warnings);
  }
}

// CLI Configuration
runCli({
  name: 'validate-deploy',
  description: `Performs health checks on the deployed physics book site:
- Verifies critical pages load
- Checks MathJax rendering
- Tests search functionality
- Validates PWA features
- Checks assets and security headers
- Tests responsive design`,
  flags: {
    verbose: STANDARD_FLAGS.verbose,
    timeout: {
      flag: '--timeout',
      description: 'Request timeout in milliseconds (default: 30000)',
      type: 'number',
      default: 30000,
    },
    github: {
      flag: '--github',
      description: 'Use GitHub Pages URL',
      default: false,
    },
  },
  examples: [
    'node scripts/validate-deploy.js',
    'node scripts/validate-deploy.js https://example.com',
    'node scripts/validate-deploy.js --github --verbose',
    'node scripts/validate-deploy.js --timeout 60000',
  ],
  run: async options => {
    // Get URL from positional argument or flags
    const args = process.argv.slice(2);
    let url = args.find(arg => arg.startsWith('http'));

    if (!url) {
      if (options.github) {
        url = DEFAULT_URLS.github;
      } else if (process.env.VERCEL_URL) {
        url = `https://${process.env.VERCEL_URL}`;
      } else {
        url = DEFAULT_URLS.vercel;
      }
    }

    const validator = new DeploymentValidator({
      url,
      verbose: options.verbose,
      timeout: options.timeout,
    });
    return validator.run();
  },
});
