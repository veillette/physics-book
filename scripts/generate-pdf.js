#!/usr/bin/env node
/**
 * PDF Generation Script for Physics Book
 *
 * Generates PDF files from the Jekyll-based physics textbook using Playwright.
 * Supports generating individual chapters or the complete book.
 *
 * Usage:
 *   node scripts/generatePdf.js                    # Generate all chapters
 *   node scripts/generatePdf.js --chapter 1       # Generate chapter 1 only
 *   node scripts/generatePdf.js --all             # Generate complete book PDF
 *   node scripts/generatePdf.js --url <url>       # Generate PDF from specific URL
 *   node scripts/generatePdf.js --help            # Show help
 */

import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Configuration
const CONFIG = {
  outputDir: join(ROOT_DIR, 'pdf-output'),
  baseUrl: 'http://localhost:4000',
  viewport: { width: 1200, height: 800 },
  pdfOptions: {
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
  },
  // Time to wait for MathJax rendering (ms)
  mathJaxWaitTime: 2000,
  // Additional wait after page load (ms)
  additionalWait: 1000,
};

/**
 * Load the summary.json file containing book structure
 */
function loadBookStructure() {
  const summaryPath = join(ROOT_DIR, 'summary.json');
  if (!existsSync(summaryPath)) {
    throw new Error('summary.json not found. Please run parseSummary.js first.');
  }
  return JSON.parse(readFileSync(summaryPath, 'utf-8'));
}

/**
 * Convert a markdown file path to its Jekyll URL
 */
function fileToUrl(filePath) {
  // Remove 'contents/' prefix and '.md' extension
  const urlPath = filePath.replace(/^contents\//, '').replace(/\.md$/, '.html');
  return `${CONFIG.baseUrl}/${urlPath}`;
}

/**
 * Wait for MathJax to finish rendering
 */
async function waitForMathJax(page) {
  try {
    await page.waitForFunction(
      () => {
        // Check if MathJax is loaded and has finished processing
        if (typeof MathJax !== 'undefined') {
          if (MathJax.Hub && MathJax.Hub.Queue) {
            // MathJax 2.x
            return (
              MathJax.Hub.getAllJax().length === 0 ||
              document.querySelectorAll('.MathJax_Processing').length === 0
            );
          } else if (MathJax.startup) {
            // MathJax 3.x
            return MathJax.startup.promise !== undefined;
          }
        }
        return true;
      },
      { timeout: 10000 }
    );
  } catch (_e) {
    // MathJax might not be present on all pages
    console.log('  Note: MathJax wait timed out or not present');
  }

  // Additional wait for any remaining rendering
  await page.waitForTimeout(CONFIG.mathJaxWaitTime);
}

/**
 * Inject print-specific CSS for better PDF output
 */
async function injectPrintStyles(page) {
  await page.addStyleTag({
    content: `
      @media print {
        /* Page break controls */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          page-break-inside: avoid;
        }

        p, blockquote, ul, ol, dl, table, pre {
          page-break-inside: avoid;
        }

        img, figure {
          page-break-inside: avoid;
          page-break-after: avoid;
          max-width: 100% !important;
        }

        /* Ensure equations don't break */
        .MathJax, .MathJax_Display, mjx-container {
          page-break-inside: avoid !important;
        }

        /* Clean up navigation and other web elements */
        nav, .navigation, .sidebar, .menu, .toc-toggle,
        .book-search, .gitbook-link, #gitbook-toolbar {
          display: none !important;
        }

        /* Ensure content is full width */
        .book-body, .body-inner, .page-wrapper, .page-inner,
        .markdown-section, main, article {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Better link handling for print */
        a[href^="http"]:after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          color: #666;
        }

        a[href^="#"]:after,
        a[href^="/"]:after {
          content: "";
        }

        /* Improve table printing */
        table {
          border-collapse: collapse;
          width: 100%;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }

        /* Code blocks */
        pre, code {
          background-color: #f5f5f5 !important;
          border: 1px solid #ddd;
          page-break-inside: avoid;
        }

        /* Example and note boxes */
        .example, .note, .warning, .info {
          page-break-inside: avoid;
          border: 1px solid #ddd;
          padding: 10px;
          margin: 10px 0;
        }
      }
    `,
  });
}

/**
 * Generate PDF for a single page
 */
async function generatePagePdf(page, url, outputPath, _title) {
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

  // Inject print styles
  await injectPrintStyles(page);

  // Wait for MathJax
  console.log('  Waiting for MathJax rendering...');
  await waitForMathJax(page);

  // Additional wait for any lazy-loaded content
  await page.waitForTimeout(CONFIG.additionalWait);

  // Generate PDF
  console.log(`  Generating PDF: ${outputPath}`);
  await page.pdf({
    ...CONFIG.pdfOptions,
    path: outputPath,
  });

  return true;
}

/**
 * Generate PDFs for all chapters
 */
async function generateChapterPdfs(browser, chapters, specificChapter = null) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize(CONFIG.viewport);

  const results = {
    success: [],
    failed: [],
  };

  for (const chapter of chapters) {
    if (specificChapter !== null && chapter.chapterNumber !== specificChapter) {
      continue;
    }

    const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
    const _chapterTitle = chapter.chapterTitle.replace(/[\\/:*?"<>|]/g, '-');

    console.log(`\nProcessing Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`);

    // Generate chapter intro PDF
    const chapterUrl = fileToUrl(chapter.chapterFile);
    const chapterPdfPath = join(CONFIG.outputDir, `chapter-${chapterNum}-intro.pdf`);

    const introSuccess = await generatePagePdf(
      page,
      chapterUrl,
      chapterPdfPath,
      chapter.chapterTitle
    );
    if (introSuccess) {
      results.success.push(chapterPdfPath);
    } else {
      results.failed.push({ url: chapterUrl, path: chapterPdfPath });
    }

    // Generate section PDFs
    for (const section of chapter.sections) {
      const sectionUrl = fileToUrl(section.sectionFile);
      const sectionPdfPath = join(
        CONFIG.outputDir,
        `chapter-${chapterNum}-section-${String(section.sectionNumber).padStart(2, '0')}.pdf`
      );

      console.log(`  Section ${section.sectionNumber}: ${section.sectionTitle}`);

      const sectionSuccess = await generatePagePdf(
        page,
        sectionUrl,
        sectionPdfPath,
        section.sectionTitle
      );
      if (sectionSuccess) {
        results.success.push(sectionPdfPath);
      } else {
        results.failed.push({ url: sectionUrl, path: sectionPdfPath });
      }
    }
  }

  await context.close();
  return results;
}

/**
 * Generate a single combined PDF for a chapter (intro + all sections)
 */
async function generateCombinedChapterPdf(browser, chapter) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize(CONFIG.viewport);

  const chapterNum = String(chapter.chapterNumber).padStart(2, '0');
  const outputPath = join(CONFIG.outputDir, `chapter-${chapterNum}-complete.pdf`);

  console.log(
    `\nGenerating combined PDF for Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`
  );

  // Collect all URLs for this chapter
  const urls = [fileToUrl(chapter.chapterFile)];
  for (const section of chapter.sections) {
    urls.push(fileToUrl(section.sectionFile));
  }

  // Create a combined HTML page
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
      await page.goto(urls[i], { waitUntil: 'networkidle', timeout: 60000 });
      await waitForMathJax(page);

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

  // Load combined content and generate PDF
  await page.setContent(combinedHtml, { waitUntil: 'networkidle' });
  await injectPrintStyles(page);
  await page.waitForTimeout(CONFIG.mathJaxWaitTime);

  await page.pdf({
    ...CONFIG.pdfOptions,
    path: outputPath,
  });

  console.log(`  Generated: ${outputPath}`);

  await context.close();
  return outputPath;
}

/**
 * Generate PDF from a single URL
 */
async function generateUrlPdf(browser, url, outputName = 'output.pdf') {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize(CONFIG.viewport);

  const outputPath = join(CONFIG.outputDir, outputName);
  console.log(`\nGenerating PDF from URL: ${url}`);

  await generatePagePdf(page, url, outputPath, 'Custom PDF');

  await context.close();
  return outputPath;
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    chapter: null,
    all: false,
    combined: false,
    url: null,
    output: null,
    baseUrl: null,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--chapter':
      case '-c':
        options.chapter = parseInt(args[++i], 10);
        break;
      case '--all':
      case '-a':
        options.all = true;
        break;
      case '--combined':
        options.combined = true;
        break;
      case '--url':
      case '-u':
        options.url = args[++i];
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--base-url':
      case '-b':
        options.baseUrl = args[++i];
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }

  return options;
}

/**
 * Display help message
 */
function showHelp() {
  console.log(`
Physics Book PDF Generator

Usage:
  node scripts/generatePdf.js [options]

Options:
  -c, --chapter <num>   Generate PDF for specific chapter number
  -a, --all             Generate separate PDFs for all chapters and sections
  --combined            Generate combined PDFs (one per chapter with all sections)
  -u, --url <url>       Generate PDF from a specific URL
  -o, --output <name>   Output filename (for --url mode)
  -b, --base-url <url>  Base URL for Jekyll server (default: http://localhost:4000)
  -h, --help            Show this help message

Examples:
  # Generate all chapter PDFs (requires Jekyll server running)
  node scripts/generatePdf.js --all

  # Generate chapter 5 only
  node scripts/generatePdf.js --chapter 5

  # Generate combined chapter PDFs
  node scripts/generatePdf.js --combined

  # Generate PDF from specific URL
  node scripts/generatePdf.js --url http://localhost:4000/ch1PhysicsAnIntroduction.html

  # Use different base URL
  node scripts/generatePdf.js --all --base-url http://localhost:3000

Prerequisites:
  - Jekyll server must be running: bundle exec jekyll serve
  - Playwright browsers installed: npx playwright install chromium
`);
}

/**
 * Check if Jekyll server is running
 */
async function checkServer(baseUrl) {
  try {
    const response = await fetch(baseUrl);
    return response.ok;
  } catch (_e) {
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // Update base URL if provided
  if (options.baseUrl) {
    CONFIG.baseUrl = options.baseUrl;
  }

  // Ensure output directory exists
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`Created output directory: ${CONFIG.outputDir}`);
  }

  // Check if server is running
  console.log(`Checking if server is running at ${CONFIG.baseUrl}...`);
  const serverRunning = await checkServer(CONFIG.baseUrl);
  if (!serverRunning) {
    console.error(`\nError: Jekyll server not running at ${CONFIG.baseUrl}`);
    console.error('Please start the server first: bundle exec jekyll serve');
    process.exit(1);
  }
  console.log('Server is running!\n');

  // Launch browser
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    if (options.url) {
      // Generate PDF from specific URL
      const outputName = options.output || 'custom-output.pdf';
      await generateUrlPdf(browser, options.url, outputName);
    } else {
      // Load book structure
      const chapters = loadBookStructure();
      console.log(`Loaded ${chapters.length} chapters from summary.json`);

      if (options.combined) {
        // Generate combined chapter PDFs
        for (const chapter of chapters) {
          if (options.chapter !== null && chapter.chapterNumber !== options.chapter) {
            continue;
          }
          await generateCombinedChapterPdf(browser, chapter);
        }
      } else if (options.all || options.chapter !== null) {
        // Generate individual PDFs
        const results = await generateChapterPdfs(browser, chapters, options.chapter);

        console.log(`\n${'='.repeat(50)}`);
        console.log('PDF Generation Complete');
        console.log('='.repeat(50));
        console.log(`Successfully generated: ${results.success.length} PDFs`);
        if (results.failed.length > 0) {
          console.log(`Failed: ${results.failed.length} PDFs`);
          results.failed.forEach(f => console.log(`  - ${f.url}`));
        }
      } else {
        // Default: show help
        showHelp();
      }
    }
  } finally {
    await browser.close();
    console.log('\nBrowser closed.');
  }
}

// Run main function
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
