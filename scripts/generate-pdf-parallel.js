#!/usr/bin/env node
/**
 * Parallel PDF Generation Script for Physics Book
 *
 * Optimized version that generates PDFs in parallel with smart ordering:
 * 1. Individual sections (fastest, parallel)
 * 2. Chapter intros (fast, parallel)
 * 3. Combined chapter PDFs (slowest, parallel with concurrency limit)
 */

import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ParallelPDFGenerator {
  constructor(options = {}) {
    this.baseDir = path.resolve(__dirname, '..');
    this.outputDir = path.join(this.baseDir, 'pdf-output');
    this.baseUrl = options.baseUrl || 'http://localhost:4000/physics-book';
    this.maxConcurrency = options.maxConcurrency || 4; // Number of parallel browsers

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
      sections: { success: 0, failed: 0 },
      intros: { success: 0, failed: 0 },
      combined: { success: 0, failed: 0 },
    };
  }

  loadBookStructure() {
    const summaryPath = path.join(this.baseDir, 'summary.json');
    if (!fs.existsSync(summaryPath)) {
      throw new Error('summary.json not found. Please run parse-summary.js first.');
    }
    return JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
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
        // Ignore and retry
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
            if (MathJax.startup) {
              return MathJax.startup.promise !== undefined;
            }
          }
          return true;
        },
        { timeout: 10000 }
      );

      const hasMath = await page.evaluate(() => {
        return document.querySelectorAll('mjx-container, .MathJax, .mjx-chtml').length > 0;
      });

      if (hasMath) {
        await page.waitForSelector('mjx-container, .MathJax, .mjx-chtml', { timeout: 5000 });
        await page.waitForTimeout(500);
      }
    } catch (_e) {
      await page.waitForTimeout(this.mathJaxWaitTime);
    }
  }

  async preparePage(page) {
    await page.evaluate(() => {
      // Hide navigation elements
      const elementsToHide = [
        '.book-summary',
        '.navigation',
        '.toggle-summary',
        '.dark-mode-toggle',
        '.pdf-download-btn',
        'nav',
      ];
      elementsToHide.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none';
        });
      });

      // Expand main content
      const main = document.querySelector('main, .book-body');
      if (main) {
        main.style.marginLeft = '0';
        main.style.width = '100%';
      }
    });
  }

  async generateSinglePdf(browser, url, outputPath, title, type) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize(this.viewport);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await this.preparePage(page);
      await this.waitForMathJax(page);
      await page.waitForTimeout(this.additionalWait);

      await page.pdf({
        ...this.pdfOptions,
        path: outputPath,
      });

      this.stats[type].success++;
      return { success: true, title };
    } catch (e) {
      this.stats[type].failed++;
      return { success: false, title, error: e.message };
    } finally {
      await context.close();
    }
  }

  async generateCombinedPdf(browser, chapter) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize(this.viewport);

    const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
    const outputPath = path.join(this.outputDir, `chapter-${chapterNum}-complete.pdf`);

    try {
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
          // Skip failed sections
        }
      }

      combinedHtml += '</body></html>';

      await page.setContent(combinedHtml, { waitUntil: 'networkidle' });
      await page.waitForTimeout(this.mathJaxWaitTime);

      await page.pdf({
        ...this.pdfOptions,
        path: outputPath,
      });

      this.stats.combined.success++;
      return { success: true, title: chapter.chapterTitle };
    } catch (e) {
      this.stats.combined.failed++;
      return { success: false, title: chapter.chapterTitle, error: e.message };
    } finally {
      await context.close();
    }
  }

  async runParallel(tasks, maxConcurrency, label) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${label} (${tasks.length} items, ${maxConcurrency} parallel)`);
    console.log('='.repeat(60));

    const results = [];
    const startTime = Date.now();

    for (let i = 0; i < tasks.length; i += maxConcurrency) {
      const batch = tasks.slice(i, i + maxConcurrency);
      const batchNum = Math.floor(i / maxConcurrency) + 1;
      const totalBatches = Math.ceil(tasks.length / maxConcurrency);

      console.log(`\nBatch ${batchNum}/${totalBatches} (${batch.length} items)...`);

      const batchResults = await Promise.all(batch.map(task => task()));
      results.push(...batchResults);

      const completed = Math.min(i + maxConcurrency, tasks.length);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`Completed ${completed}/${tasks.length} in ${elapsed}s`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`\n✓ ${label} Complete: ${successful} succeeded, ${failed} failed in ${duration}s`);

    return results;
  }

  async run() {
    console.log('\n📄 Parallel PDF Generator\n');

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Check server
    console.log(`Checking server at ${this.baseUrl}...`);
    if (!(await this.checkServer())) {
      console.error('\nError: Server not running!');
      console.error('Please start: bundle exec jekyll serve');
      return false;
    }
    console.log('✓ Server is running');

    // Load chapters
    const chapters = this.loadBookStructure();
    console.log(`✓ Loaded ${chapters.length} chapters`);

    // Launch browsers
    console.log(`\nLaunching ${this.maxConcurrency} browser instances...`);
    const browsers = await Promise.all(
      Array(this.maxConcurrency)
        .fill(null)
        .map(() => chromium.launch({ headless: true }))
    );
    console.log('✓ Browsers ready');

    try {
      // PHASE 1: Generate individual sections (fastest)
      const sectionTasks = [];
      for (const chapter of chapters) {
        const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
        for (const section of chapter.sections) {
          const sectionUrl = this.fileToUrl(section.sectionFile);
          const outputPath = path.join(
            this.outputDir,
            `chapter-${chapterNum}-section-${String(section.sectionNumber).padStart(2, '0')}.pdf`
          );
          const browserIndex = sectionTasks.length % browsers.length;
          sectionTasks.push(() =>
            this.generateSinglePdf(
              browsers[browserIndex],
              sectionUrl,
              outputPath,
              `Ch${chapter.chapterNumber}.${section.sectionNumber}: ${section.sectionTitle}`,
              'sections'
            )
          );
        }
      }

      await this.runParallel(sectionTasks, this.maxConcurrency, 'PHASE 1: Section PDFs');

      // PHASE 2: Generate chapter intros (fast)
      const introTasks = [];
      for (const chapter of chapters) {
        const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
        const chapterUrl = this.fileToUrl(chapter.chapterFile);
        const outputPath = path.join(this.outputDir, `chapter-${chapterNum}-intro.pdf`);
        const browserIndex = introTasks.length % browsers.length;
        introTasks.push(() =>
          this.generateSinglePdf(
            browsers[browserIndex],
            chapterUrl,
            outputPath,
            `Ch${chapter.chapterNumber}: ${chapter.chapterTitle}`,
            'intros'
          )
        );
      }

      await this.runParallel(introTasks, this.maxConcurrency, 'PHASE 2: Chapter Intro PDFs');

      // PHASE 3: Generate combined chapter PDFs (slowest)
      const combinedTasks = [];
      for (const chapter of chapters) {
        const browserIndex = combinedTasks.length % browsers.length;
        combinedTasks.push(() => this.generateCombinedPdf(browsers[browserIndex], chapter));
      }

      // Use lower concurrency for combined PDFs (they're heavier)
      const combinedConcurrency = Math.max(2, Math.floor(this.maxConcurrency / 2));
      await this.runParallel(combinedTasks, combinedConcurrency, 'PHASE 3: Combined Chapter PDFs');

      // Print summary
      console.log('\n' + '='.repeat(60));
      console.log('FINAL SUMMARY');
      console.log('='.repeat(60));
      console.log(
        `Sections:   ${this.stats.sections.success} succeeded, ${this.stats.sections.failed} failed`
      );
      console.log(
        `Intros:     ${this.stats.intros.success} succeeded, ${this.stats.intros.failed} failed`
      );
      console.log(
        `Combined:   ${this.stats.combined.success} succeeded, ${this.stats.combined.failed} failed`
      );

      const total =
        this.stats.sections.success + this.stats.intros.success + this.stats.combined.success;
      const totalFailed =
        this.stats.sections.failed + this.stats.intros.failed + this.stats.combined.failed;
      console.log(`TOTAL:      ${total} succeeded, ${totalFailed} failed`);
      console.log('='.repeat(60) + '\n');

      return totalFailed === 0;
    } finally {
      console.log('Closing browsers...');
      await Promise.all(browsers.map(b => b.close()));
      console.log('✓ Done!\n');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new ParallelPDFGenerator({
    maxConcurrency: parseInt(process.env.MAX_CONCURRENCY) || 4,
  });

  generator.run().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export default ParallelPDFGenerator;
