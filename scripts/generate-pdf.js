#!/usr/bin/env node
/**
 * PDF Generation Script for Physics Book
 *
 * Generates PDF files from the Jekyll-based physics textbook using Playwright.
 * Supports generating individual chapters or the complete book.
 *
 * Usage:
 *   node scripts/generate-pdf.js [options]
 *
 * Options:
 *   -c, --chapter <num>   Generate PDF for specific chapter number
 *   -a, --all             Generate separate PDFs for all chapters and sections
 *   --combined            Generate combined PDFs (one per chapter with all sections)
 *   -u, --url <url>       Generate PDF from a specific URL
 *   -o, --output <name>   Output filename (for --url mode)
 *   -b, --base-url <url>  Base URL for Jekyll server
 *   --help                Show this help message
 */

import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli } from './lib/cli.js';

import { getBaseDir, readFile } from './lib/files.js';

/**
 * PDF generator class.
 */
class PDFGenerator {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.outputDir = path.join(this.baseDir, 'pdf-output');
    this.baseUrl = options.baseUrl || 'http://localhost:4000/physics-book';
    this.chapter = options.chapter || null;
    this.all = options.all || false;
    this.combined = options.combined || false;
    this.url = options.url || null;
    this.output = options.output || null;

    this.viewport = { width: 1200, height: 800 };
    this.pdfOptions = {
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.75in',
        bottom: '0.75in',
        left: '0.75in',
        right: '0.75in',
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          <span class="title"></span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    };
    this.mathJaxWaitTime = 2000;
    this.additionalWait = 1000;

    this.stats = {
      success: 0,
      failed: 0,
    };

    this.browser = null;
  }

  async run() {
    printHeader('📄', 'PDF Generator');

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`Created output directory: ${this.outputDir}`);
    }

    // Check if server is running
    console.log(`Checking if server is running at ${this.baseUrl}...`);
    const serverRunning = await this.checkServer();
    if (!serverRunning) {
      console.error(`\nError: Jekyll server not running at ${this.baseUrl}`);
      console.error('Please start the server first: bundle exec jekyll serve');
      return false;
    }
    console.log('Server is running!\n');

    // Launch browser
    console.log('Launching browser...');
    this.browser = await chromium.launch({ headless: true });

    try {
      if (this.url) {
        // Generate PDF from specific URL
        const outputName = this.output || 'custom-output.pdf';
        await this.generateUrlPdf(this.url, outputName);
      } else {
        // Load book structure
        const chapters = this.loadBookStructure();
        console.log(`Loaded ${chapters.length} chapters from summary.json\n`);

        if (this.combined) {
          await this.generateCombinedPdfs(chapters);
        } else if (this.all || this.chapter !== null) {
          await this.generateChapterPdfs(chapters);
        } else {
          console.log('No action specified. Use --all, --chapter, or --url');
          return false;
        }
      }

      this.printResults();
      return this.stats.failed === 0;
    } finally {
      await this.browser.close();
      console.log('Browser closed.');
    }
  }

  loadBookStructure() {
    const summaryPath = path.join(this.baseDir, 'summary.json');
    if (!fs.existsSync(summaryPath)) {
      throw new Error('summary.json not found. Please run parse-summary.js first.');
    }
    return JSON.parse(readFile(summaryPath));
  }

  fileToUrl(filePath) {
    const urlPath = filePath.replace(/\.md$/, '.html');
    return `${this.baseUrl}/${urlPath}`;
  }

  async checkServer(retries = 5, delay = 2000) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(this.baseUrl);
        if (response.ok || response.status === 404) {
          return true;
        }
      } catch (_e) {
        // Ignore connection errors and retry
      }
      console.log(`  Server not ready, retrying in ${delay / 1000}s... (${i + 1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
    return false;
  }

  async waitForMathJax(page) {
    try {
      await page.waitForFunction(
        () => {
          if (typeof MathJax !== 'undefined') {
            if (MathJax.Hub && MathJax.Hub.Queue) {
              return (
                MathJax.Hub.getAllJax().length === 0 ||
                document.querySelectorAll('.MathJax_Processing').length === 0
              );
            } else if (MathJax.startup) {
              return MathJax.startup.promise !== undefined;
            }
          }
          return true;
        },
        { timeout: 10000 }
      );
    } catch (_e) {
      console.log('  Note: MathJax wait timed out or not present');
    }

    await page.waitForTimeout(this.mathJaxWaitTime);
  }

  async preparePage(page, injectCSS = false) {
    await page.evaluate(() => {
      const selectorsToRemove = [
        'nav',
        '.navigation',
        '.nav',
        '.sidebar',
        '.menu',
        '.toc-toggle',
        '.book-search',
        '.book-summary',
        '.book-header',
        '.gitbook-link',
        '#gitbook-toolbar',
        '.toolbar',
        '.book-menu-btn',
        '.font-settings',
        '.pull-right',
        '.dropdown',
        '.social-share',
        'header nav',
        'footer nav',
        '.book-menu',
        '.summary',
        'aside',
        '.toc',
        '.table-of-contents',
        '.solution',
        'div.solution',
        '[data-element-type="solution"]',
      ];

      selectorsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });
    });

    if (injectCSS) {
      const printCssPath = path.join(this.baseDir, 'assets', 'css', 'print.css');
      if (fs.existsSync(printCssPath)) {
        const cssContent = readFile(printCssPath);
        await page.addStyleTag({ content: cssContent });
      }
    }
  }

  async generatePagePdf(page, url, outputPath, _title) {
    console.log(`  Navigating to: ${url}`);

    try {
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 60000,
      });
    } catch (e) {
      console.error(`  Failed to load page: ${e.message}`);
      return false;
    }

    await this.preparePage(page);
    console.log('  Waiting for MathJax rendering...');
    await this.waitForMathJax(page);
    await page.waitForTimeout(this.additionalWait);

    console.log(`  Generating PDF: ${outputPath}`);
    await page.pdf({
      ...this.pdfOptions,
      path: outputPath,
    });

    return true;
  }

  async generateChapterPdfs(chapters) {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize(this.viewport);

    for (const chapter of chapters) {
      if (this.chapter !== null && chapter.chapterNumber !== this.chapter) {
        continue;
      }

      const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
      console.log(`\nProcessing Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`);

      // Generate chapter intro PDF
      const chapterUrl = this.fileToUrl(chapter.chapterFile);
      const chapterPdfPath = path.join(this.outputDir, `chapter-${chapterNum}-intro.pdf`);

      const introSuccess = await this.generatePagePdf(
        page,
        chapterUrl,
        chapterPdfPath,
        chapter.chapterTitle
      );
      if (introSuccess) {
        this.stats.success++;
      } else {
        this.stats.failed++;
      }

      // Generate section PDFs
      for (const section of chapter.sections) {
        const sectionUrl = this.fileToUrl(section.sectionFile);
        const sectionPdfPath = path.join(
          this.outputDir,
          `chapter-${chapterNum}-section-${String(section.sectionNumber).padStart(2, '0')}.pdf`
        );

        console.log(`  Section ${section.sectionNumber}: ${section.sectionTitle}`);

        const sectionSuccess = await this.generatePagePdf(
          page,
          sectionUrl,
          sectionPdfPath,
          section.sectionTitle
        );
        if (sectionSuccess) {
          this.stats.success++;
        } else {
          this.stats.failed++;
        }
      }
    }

    await context.close();
  }

  async generateCombinedPdfs(chapters) {
    for (const chapter of chapters) {
      if (this.chapter !== null && chapter.chapterNumber !== this.chapter) {
        continue;
      }
      await this.generateCombinedChapterPdf(chapter);
    }
  }

  async generateCombinedChapterPdf(chapter) {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize(this.viewport);

    const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
    const outputPath = path.join(this.outputDir, `chapter-${chapterNum}-complete.pdf`);

    console.log(
      `\nGenerating combined PDF for Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`
    );

    const urls = [this.fileToUrl(chapter.chapterFile)];
    for (const section of chapter.sections) {
      urls.push(this.fileToUrl(section.sectionFile));
    }

    let combinedHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}</title>
        <style>
          body { font-family: serif; }
          .chapter-break { page-break-before: always; }
          h1 { font-size: 24pt; }
          h2 { font-size: 18pt; }
        </style>
      </head>
      <body>
    `;

    for (let i = 0; i < urls.length; i++) {
      console.log(`  Loading: ${urls[i]}`);
      try {
        await page.goto(urls[i], { waitUntil: 'networkidle', timeout: 200000 });
        await this.waitForMathJax(page);

        const content = await page.evaluate(() => {
          const main =
            document.querySelector('.markdown-section') ||
            document.querySelector('main') ||
            document.querySelector('article') ||
            document.body;
          return main.innerHTML;
        });

        combinedHtml += `<div class="${i > 0 ? 'chapter-break' : ''}">${content}</div>`;
      } catch (_e) {
        console.error(`  Failed to load: ${urls[i]}`);
      }
    }

    combinedHtml += '</body></html>';

    await page.setContent(combinedHtml, { waitUntil: 'networkidle' });
    await this.preparePage(page, true);
    await page.waitForTimeout(this.mathJaxWaitTime);

    await page.pdf({
      ...this.pdfOptions,
      path: outputPath,
    });

    console.log(`  Generated: ${outputPath}`);
    this.stats.success++;

    await context.close();
  }

  async generateUrlPdf(url, outputName) {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize(this.viewport);

    const outputPath = path.join(this.outputDir, outputName);
    console.log(`\nGenerating PDF from URL: ${url}`);

    const success = await this.generatePagePdf(page, url, outputPath, 'Custom PDF');
    if (success) {
      this.stats.success++;
    } else {
      this.stats.failed++;
    }

    await context.close();
  }

  printResults() {
    printDivider();

    console.log(`\nSuccessfully generated: ${this.stats.success} PDFs`);
    if (this.stats.failed > 0) {
      console.log(`Failed: ${this.stats.failed} PDFs`);
    }

    if (this.stats.failed === 0) {
      printSuccess('PDF generation completed!');
    }

    printDivider();
    printSummary(this.stats.failed, 0);
  }
}

// CLI Configuration
runCli({
  name: 'generate-pdf',
  description: `Generates PDF files from the Jekyll-based physics textbook using Playwright.

Modes:
- --all: Generate separate PDFs for all chapters and sections
- --chapter N: Generate PDFs for a specific chapter
- --combined: Generate one PDF per chapter with all sections
- --url: Generate PDF from a specific URL

Prerequisites:
- Jekyll server must be running: bundle exec jekyll serve
- Playwright browsers installed: npx playwright install chromium`,
  flags: {
    chapter: {
      flag: ['-c', '--chapter'],
      description: 'Generate PDF for specific chapter number',
      type: 'number',
    },
    all: {
      flag: ['-a', '--all'],
      description: 'Generate separate PDFs for all chapters and sections',
      default: false,
    },
    combined: {
      flag: '--combined',
      description: 'Generate combined PDFs (one per chapter with all sections)',
      default: false,
    },
    url: {
      flag: ['-u', '--url'],
      description: 'Generate PDF from a specific URL',
      type: 'string',
    },
    output: {
      flag: ['-o', '--output'],
      description: 'Output filename (for --url mode)',
      type: 'string',
    },
    baseUrl: {
      flag: ['-b', '--base-url'],
      description: 'Base URL for Jekyll server (default: http://localhost:4000/physics-book)',
      type: 'string',
      default: 'http://localhost:4000/physics-book',
    },
  },
  examples: [
    'node scripts/generate-pdf.js --all',
    'node scripts/generate-pdf.js --chapter 5',
    'node scripts/generate-pdf.js --combined',
    'node scripts/generate-pdf.js --url http://localhost:4000/physics-book/contents/ch1PhysicsAnIntroduction.html',
  ],
  run: async options => {
    const generator = new PDFGenerator(options);
    return generator.run();
  },
});
