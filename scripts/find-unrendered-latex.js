#!/usr/bin/env node
/**
 * Check built textbook pages for visible TeX and MathJax rendering errors.
 * Start the local preview with npm run serve before running this script.
 *
 * Usage:
 *   npm run find:latex
 *   npm run find:latex -- --file 'ch3*.html' --verbose
 *   npm run find:latex -- --base-url http://localhost:4001/physics-book/contents/
 *   npm run find:latex -- --no-enrichment --json /tmp/latex-issues.json
 *
 * Hidden solutions are typeset too. --no-enrichment disables optional speech and
 * braille enrichment for this audit; the textbook's TeX configuration is retained.
 * A finding, failed page, or empty build returns a nonzero exit status.
 */

import fs from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';
import { chromium } from '@playwright/test';
import chalk from 'chalk';
import { glob } from 'glob';

const args = process.argv.slice(2);
function option(name, fallback) {
  const inline = args.find(arg => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  if (!args[index + 1] || args[index + 1].startsWith('--')) {
    throw new Error(`Missing value for ${name}`);
  }
  return args[index + 1];
}

const labels = {
  imageAlt: 'Figure captions',
  splitDelimiters: 'Split delimiters',
  missingSpaces: 'Leftover math delimiters',
  otherLatex: 'Other unrendered LaTeX',
  mathError: 'MathJax errors',
};

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split(' */')[0]);
    return;
  }
  const baseUrl = `${option('--base-url', 'http://localhost:4000/physics-book/contents/').replace(/\/+$/, '')}/`;
  const filePattern = option('--file', '*.html');
  const jsonOutput = option('--json', null);
  const verbose = args.includes('--verbose') || args.includes('-v');
  const groupByType = args.includes('--by-type') || args.includes('--group');
  const concurrency = Number(option('--concurrent', '3'));
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error('--concurrent must be a positive integer');
  }
  const files = (await glob(path.join('_site/contents', filePattern))).sort();
  if (!files.length) throw new Error('No matching built HTML pages. Run npm run build first.');

  const stats = {
    totalFiles: files.length,
    filesChecked: 0,
    filesFailed: 0,
    filesWithIssues: 0,
    totalIssues: 0,
    byCategory: Object.fromEntries(Object.keys(labels).map(key => [key, 0])),
  };
  const issues = [];
  const failures = [];
  console.log(chalk.blue(`\nScanning ${files.length} pages for unrendered math at ${baseUrl}\n`));

  const browser = await chromium.launch({ headless: true });
  try {
    // Reuse the browser, while giving each page a fresh context to avoid stale
    // service workers, cached MathJax state, and accumulation of math documents.
    const queue = [...files];
    await Promise.all(
      Array.from({ length: Math.min(concurrency, files.length) }, async () => {
        while (queue.length) {
          const file = queue.shift();
          const htmlFile = path.basename(file);
          const mdName = htmlFile.replace(/\.html$/, '.md');
          const sourceFile = fs.existsSync(path.join('contents', mdName)) ? mdName : null;
          const context = await browser.newContext({ serviceWorkers: 'block' });
          try {
            if (args.includes('--no-enrichment')) {
              await context.route('**/math-config.js', async route => {
                const response = await route.fetch();
                await route.fulfill({
                  response,
                  body:
                    `${await response.text()}\nMathJax.options.menuOptions.settings.enrich = false;` +
                    `\nMathJax.options.menuOptions.settings.speech = false;` +
                    `\nMathJax.options.menuOptions.settings.braille = false;`,
                });
              });
            }
            const page = await context.newPage();
            const response = await page.goto(new URL(htmlFile, baseUrl).href, {
              waitUntil: 'load',
              timeout: 60000,
            });
            if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
            await page.waitForFunction(
              () => window.MathJax?.startup?.promise && document.querySelector('.contents'),
              null,
              { timeout: 30000 }
            );
            await page.evaluate(async () => {
              await window.MathJax.startup.promise;
              // The viewer creates captions and schedules its own typesetting in
              // requestAnimationFrame after startup. Await that work and explicitly
              // typeset hidden solutions as if the reader had revealed them.
              await new Promise(resolve => window.requestAnimationFrame(resolve));
              document.querySelectorAll('.mathjax-skip').forEach(el => {
                el.classList.remove('mathjax-skip');
              });
              await window.MathJax.typesetPromise();
            });

            const found = await page.evaluate(() => {
              const found = [];
              for (const item of window.MathJax.startup.document.math) {
                const errors =
                  item.typesetRoot?.querySelectorAll('mjx-merror,[data-mjx-error]') || [];
                for (const error of errors) {
                  found.push({
                    category: 'mathError',
                    message:
                      error.getAttribute('data-mjx-error') ||
                      error.getAttribute('title') ||
                      error.textContent,
                    fullText: item.math,
                    context: item.math.trim().slice(0, 160),
                    searchPattern: item.math.trim(),
                    commands: [...new Set(item.math.match(/\\[a-zA-Z]+\b/g) || [])],
                  });
                }
              }

              const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                  return node.parentElement?.closest(
                    'script,style,noscript,pre,code,mjx-container,[class*="MathJax"]'
                  )
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT;
                },
              });
              let node;
              while ((node = walker.nextNode())) {
                const fullText = node.textContent;
                const commands = fullText.match(/\\[a-zA-Z]+\b|\\[_^{()[\]]|\$\$/g);
                if (!commands) continue;
                const parent = node.parentElement;
                const container = parent.closest('p,li,td,th,figcaption,h1,h2,h3,h4,h5,h6,div');
                const isInImage = Boolean(parent.closest('figcaption,figure'));
                const category = isInImage
                  ? 'imageAlt'
                  : commands.some(cmd => cmd === '\\left' || cmd === '\\right')
                    ? 'splitDelimiters'
                    : commands.includes('$$')
                      ? 'missingSpaces'
                      : 'otherLatex';
                found.push({
                  category,
                  commands: [...new Set(commands)],
                  context: (container?.textContent || fullText).trim().slice(0, 160),
                  searchPattern: fullText.trim(),
                  fullText,
                  parentTag: container?.tagName || parent.tagName,
                  isInImage,
                });
              }
              return found;
            });
            stats.filesChecked++;
            if (found.length) {
              stats.filesWithIssues++;
              stats.totalIssues += found.length;
              found.forEach(issue => stats.byCategory[issue.category]++);
              issues.push({
                htmlFile,
                sourceFile,
                issues: found.map(issue => ({ ...issue, sourceFile })),
              });
              if (!groupByType) printIssues(sourceFile || htmlFile, found, verbose);
            }
          } catch (error) {
            stats.filesFailed++;
            failures.push({ htmlFile, error: error.message });
            console.error(chalk.red(`Failed: ${htmlFile}: ${error.message}`));
          } finally {
            await context.close();
          }
          const completed = stats.filesChecked + stats.filesFailed;
          if (completed % 25 === 0 || completed === stats.totalFiles) {
            console.log(chalk.gray(`Progress: ${completed}/${stats.totalFiles}`));
          }
        }
      })
    );
  } finally {
    await browser.close();
  }

  issues.sort((a, b) => a.htmlFile.localeCompare(b.htmlFile));
  if (groupByType) {
    for (const [category, label] of Object.entries(labels)) {
      if (!stats.byCategory[category]) continue;
      console.log(chalk.blue(`\n${label}: ${stats.byCategory[category]}`));
      for (const file of issues) {
        const matches = file.issues.filter(issue => issue.category === category);
        if (matches.length) printIssues(file.sourceFile || file.htmlFile, matches, verbose);
      }
    }
  }
  console.log(`\nPages checked: ${stats.filesChecked}; failed: ${stats.filesFailed}`);
  console.log(`Pages with issues: ${stats.filesWithIssues}; total issues: ${stats.totalIssues}`);
  for (const [category, label] of Object.entries(labels)) {
    console.log(`  ${label}: ${stats.byCategory[category]}`);
  }
  if (jsonOutput) {
    fs.writeFileSync(
      jsonOutput,
      JSON.stringify(
        { summary: stats, issues, failures, generatedAt: new Date().toISOString() },
        null,
        2
      )
    );
    console.log(`Results saved to ${jsonOutput}`);
  }
  if (stats.totalIssues || stats.filesFailed) process.exitCode = 1;
}

function printIssues(file, issues, verbose) {
  console.log(chalk.yellow(`\n${file}: ${issues.length} issue(s)`));
  for (const issue of verbose ? issues : issues.slice(0, 3)) {
    console.log(`  ${issue.message || labels[issue.category]}: ${issue.context}`);
  }
  if (!verbose && issues.length > 3) console.log(`  ... and ${issues.length - 3} more`);
}

main().catch(error => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
