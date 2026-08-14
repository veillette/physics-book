#!/usr/bin/env node
/**
 * Find Unrendered LaTeX Commands in HTML
 *
 * This script parses HTML files (after MathJax processing) to find LaTeX commands
 * that appear as plain text instead of being properly rendered.
 *
 * It looks for common LaTeX commands like:
 * - Greek letters: \alpha, \beta, \gamma, \theta, etc.
 * - Math operators: \sum, \int, \prod, \partial, etc.
 * - Functions: \sin, \cos, \tan, \log, \sqrt, \frac, etc.
 * - Text commands: \text, \mathrm, \mathbf, etc.
 * - Delimiters: \left, \right, etc.
 *
 * Usage:
 *   node scripts/find-unrendered-latex.js                    # Check all pages
 *   node scripts/find-unrendered-latex.js --file ch3*.html   # Check specific files
 *   node scripts/find-unrendered-latex.js --verbose          # Show all matches with context
 *   node scripts/find-unrendered-latex.js --json issues.json # Output to JSON file
 *   node scripts/find-unrendered-latex.js --by-type          # Group by issue type
 */

import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';
import chalk from 'chalk';
import { glob } from 'glob';

const baseUrl = 'http://localhost:4000/physics-book2/contents/';
const siteDir = '_site/contents';
const contentsDir = 'contents';

class LatexFinder {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.filePattern = options.filePattern || '*.html';
    this.jsonOutput = options.jsonOutput || null;
    this.groupByType = options.groupByType || false;
    this.stats = {
      totalFiles: 0,
      filesChecked: 0,
      filesWithIssues: 0,
      totalIssues: 0,
      byCategory: {
        imageAlt: 0,
        splitDelimiters: 0,
        missingSpaces: 0,
        otherLatex: 0,
      },
    };
    this.issues = [];
  }

  async findHtmlFiles() {
    const pattern = path.join(siteDir, this.filePattern);
    const files = await glob(pattern);
    return files.map(f => path.basename(f));
  }

  getSourceFile(htmlFile) {
    // Map HTML file to source .md file
    const baseName = htmlFile.replace('.html', '');
    const mdPath = path.join(contentsDir, `${baseName}.md`);
    if (fs.existsSync(mdPath)) {
      return `${baseName}.md`;
    }
    return null;
  }

  categorizeIssue(context, fullText, commands) {
    // Categorize the type of issue
    if (context.includes('![') || context.includes('](') || fullText.includes('alt=')) {
      return 'imageAlt';
    }

    if (commands.some(cmd => cmd.includes('\\left') || cmd.includes('\\right'))) {
      return 'splitDelimiters';
    }

    // Check for missing space patterns
    if (fullText.match(/[a-zA-Z]\$\$|\$\$[a-zA-Z]/)) {
      return 'missingSpaces';
    }

    return 'otherLatex';
  }

  extractSearchPattern(fullText, commands) {
    // Extract a unique search pattern for the .md file
    // Get 40 chars before and after the first command
    const firstCmd = commands[0];
    const cmdIndex = fullText.indexOf(firstCmd);

    if (cmdIndex === -1) return fullText.substring(0, 80);

    const start = Math.max(0, cmdIndex - 40);
    const end = Math.min(fullText.length, cmdIndex + firstCmd.length + 40);

    return fullText.substring(start, end).trim();
  }

  async checkPage(htmlFile) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      const url = `${baseUrl}${htmlFile}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

      // Wait for MathJax to finish rendering
      // Give extra time for MathJax to load from CDN and process all math on the page
      await page.waitForTimeout(5000);

      // Additional wait for MathJax typesetting to complete
      await page.evaluate(() => {
        return new Promise(resolve => {
          if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
            window.MathJax.startup.promise
              .then(() => {
                // Wait a bit more after startup completes to ensure all rendering is done
                setTimeout(resolve, 1500);
              })
              .catch(() => {
                // If there's an error, continue anyway
                setTimeout(resolve, 1500);
              });
          } else {
            // If MathJax isn't available, just wait a bit
            setTimeout(resolve, 1500);
          }
        });
      });

      // Get the text content of the page body, excluding script tags and MathJax elements
      const unrenderedLatex = await page.evaluate(() => {
        const results = [];

        // Get all text nodes, excluding those in script tags, style tags, and MathJax rendered elements
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
          acceptNode: node => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            // Skip script, style, and MathJax elements
            if (
              parent.tagName === 'SCRIPT' ||
              parent.tagName === 'STYLE' ||
              parent.tagName === 'NOSCRIPT' ||
              parent.classList.contains('MathJax') ||
              parent.classList.contains('MathJax_Display') ||
              parent.classList.contains('MathJax_Preview') ||
              parent.closest('.MathJax') ||
              parent.closest('mjx-container') ||
              parent.closest('[class*="MathJax"]')
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
          },
        });

        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
          textNodes.push(node);
        }

        // Check each text node for LaTeX commands
        textNodes.forEach(textNode => {
          const text = textNode.textContent;

          // Check for LaTeX command patterns (simple backslash followed by letters)
          const latexMatches = text.match(/\\[a-zA-Z]+\b|\\[_^{]/g);

          if (latexMatches && latexMatches.length > 0) {
            // Get context: find the containing paragraph or element
            let contextElement = textNode.parentElement;
            while (
              contextElement &&
              ![
                'P',
                'DIV',
                'LI',
                'TD',
                'TH',
                'H1',
                'H2',
                'H3',
                'H4',
                'H5',
                'H6',
                'FIGCAPTION',
              ].includes(contextElement.tagName)
            ) {
              contextElement = contextElement.parentElement;
            }

            const context = contextElement ? contextElement.innerText : text;
            const truncatedContext =
              context.length > 100 ? `${context.substring(0, 100)}...` : context;

            // Get parent element type for categorization
            const parentTag = contextElement ? contextElement.tagName : 'UNKNOWN';
            const isInImage =
              contextElement &&
              (contextElement.querySelector('img') !== null ||
                contextElement.closest('figure') !== null ||
                parentTag === 'FIGCAPTION');

            // Extract a better search pattern (surrounding text)
            const textContent = text.trim();
            const searchPattern =
              textContent.length > 150 ? `${textContent.substring(0, 150)}...` : textContent;

            results.push({
              commands: [...new Set(latexMatches)],
              context: truncatedContext,
              searchPattern,
              fullText: text,
              parentTag,
              isInImage,
            });
          }
        });

        return results;
      });

      await browser.close();

      // Enhance results with categorization and source file info
      const sourceFile = this.getSourceFile(htmlFile);
      return unrenderedLatex.map(issue => ({
        ...issue,
        sourceFile,
        category: this.categorizeIssue(issue.context, issue.fullText, issue.commands),
      }));
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  async run() {
    console.log(chalk.blue('\n🔍 Scanning for unrendered LaTeX commands...\n'));

    const htmlFiles = await this.findHtmlFiles();
    this.stats.totalFiles = htmlFiles.length;

    console.log(chalk.gray(`Found ${htmlFiles.length} HTML files to check\n`));

    // Process files in parallel batches
    const BATCH_SIZE = 5; // Number of concurrent browser instances
    const batches = [];

    for (let i = 0; i < htmlFiles.length; i += BATCH_SIZE) {
      batches.push(htmlFiles.slice(i, i + BATCH_SIZE));
    }

    for (const batch of batches) {
      // Process each batch in parallel
      const batchPromises = batch.map(async htmlFile => {
        try {
          const issues = await this.checkPage(htmlFile);

          this.stats.filesChecked++;

          if (issues.length > 0) {
            this.stats.filesWithIssues++;
            this.stats.totalIssues += issues.length;

            // Update category stats
            issues.forEach(issue => {
              this.stats.byCategory[issue.category]++;
            });

            if (!this.groupByType) {
              this.printFileIssues(htmlFile, issues);
            }

            this.issues.push({
              htmlFile,
              sourceFile: issues[0].sourceFile,
              issues,
            });
          }

          return { htmlFile, success: true };
        } catch (error) {
          this.stats.filesChecked++;

          if (error.message.includes('Timeout')) {
            console.log(chalk.gray(`    • Skipped (timeout): ${htmlFile}`));
          } else {
            console.log(chalk.red(`    • Error checking ${htmlFile}: ${error.message}`));
          }

          return { htmlFile, success: false, error };
        }
      });

      // Wait for the entire batch to complete
      await Promise.all(batchPromises);

      // Progress indicator after each batch
      if (!this.verbose) {
        console.log(
          chalk.gray(
            `  Progress: ${this.stats.filesChecked}/${this.stats.totalFiles} files checked...`
          )
        );
      }
    }

    if (this.groupByType) {
      this.printByType();
    }

    this.printSummary();

    if (this.jsonOutput) {
      this.saveToJson();
    }
  }

  printFileIssues(htmlFile, issues) {
    const sourceFile = issues[0].sourceFile || 'unknown';

    console.log(chalk.yellow(`\n  ${htmlFile}:`));
    console.log(chalk.gray(`    Source: ${sourceFile}`));
    console.log(
      chalk.yellow(`    • ${issues.length} unrendered LaTeX command${issues.length > 1 ? 's' : ''}`)
    );

    // Group by category
    const byCategory = {};
    issues.forEach(issue => {
      if (!byCategory[issue.category]) {
        byCategory[issue.category] = [];
      }
      byCategory[issue.category].push(issue);
    });

    Object.entries(byCategory).forEach(([category, categoryIssues]) => {
      const label =
        {
          imageAlt: '📷 Image/Figure',
          splitDelimiters: '✂️  Split delimiters',
          missingSpaces: '␣  Missing spaces',
          otherLatex: '📐 Other LaTeX',
        }[category] || category;

      console.log(chalk.cyan(`    ${label}: ${categoryIssues.length} issue(s)`));

      // Show first few examples
      categoryIssues.slice(0, this.verbose ? categoryIssues.length : 2).forEach(issue => {
        console.log(chalk.yellow(`      → ${issue.commands.join(', ')}`));
        console.log(chalk.gray(`         "${issue.context}"`));
        if (this.verbose) {
          console.log(chalk.gray(`         Search: "${issue.searchPattern}"`));
        }
      });

      if (!this.verbose && categoryIssues.length > 2) {
        console.log(chalk.gray(`      ... and ${categoryIssues.length - 2} more`));
      }
    });
  }

  printByType() {
    console.log(chalk.blue('\n\n═══════════════════════════════════════════════════════════'));
    console.log(chalk.blue('                   ISSUES BY TYPE'));
    console.log(chalk.blue('═══════════════════════════════════════════════════════════\n'));

    const byType = {
      imageAlt: [],
      splitDelimiters: [],
      missingSpaces: [],
      otherLatex: [],
    };

    this.issues.forEach(fileIssue => {
      fileIssue.issues.forEach(issue => {
        byType[issue.category].push({
          file: fileIssue.sourceFile || fileIssue.htmlFile,
          ...issue,
        });
      });
    });

    Object.entries(byType).forEach(([category, items]) => {
      if (items.length === 0) return;

      const label = {
        imageAlt: '📷 Image/Figure Alt Text',
        splitDelimiters: '✂️  Split Delimiters (\\left/\\right)',
        missingSpaces: '␣  Missing Spaces Around $$',
        otherLatex: '📐 Other LaTeX Commands',
      }[category];

      console.log(chalk.yellow(`\n${label}: ${items.length} issue(s)`));
      console.log(chalk.gray('─'.repeat(60)));

      // Group by file
      const byFile = {};
      items.forEach(item => {
        if (!byFile[item.file]) byFile[item.file] = [];
        byFile[item.file].push(item);
      });

      Object.entries(byFile).forEach(([file, fileItems]) => {
        console.log(chalk.cyan(`\n  ${file}: ${fileItems.length} occurrence(s)`));
        fileItems.slice(0, 3).forEach(item => {
          console.log(chalk.gray(`    Commands: ${item.commands.join(', ')}`));
          console.log(chalk.gray(`    Context: "${item.context}"`));
          console.log(chalk.gray(`    Search: "${item.searchPattern.substring(0, 100)}..."`));
        });
        if (fileItems.length > 3) {
          console.log(chalk.gray(`    ... and ${fileItems.length - 3} more`));
        }
      });
    });
  }

  printSummary() {
    console.log(chalk.blue('\n\n═══════════════════════════════════════════════════════════'));
    console.log(chalk.blue('                        SUMMARY'));
    console.log(chalk.blue('═══════════════════════════════════════════════════════════\n'));

    console.log(chalk.white(`Total files checked: ${this.stats.filesChecked}`));
    console.log(chalk.white(`Files with unrendered LaTeX: ${this.stats.filesWithIssues}`));
    console.log(chalk.white(`Total issues found: ${this.stats.totalIssues}`));

    console.log(chalk.white('\nBy category:'));
    console.log(chalk.white(`  📷 Image/Figure alt text: ${this.stats.byCategory.imageAlt}`));
    console.log(chalk.white(`  ✂️  Split delimiters: ${this.stats.byCategory.splitDelimiters}`));
    console.log(chalk.white(`  ␣  Missing spaces: ${this.stats.byCategory.missingSpaces}`));
    console.log(chalk.white(`  📐 Other LaTeX: ${this.stats.byCategory.otherLatex}`));

    if (this.stats.filesWithIssues === 0) {
      console.log(chalk.green('\n✓ No unrendered LaTeX commands found!\n'));
    } else {
      console.log(
        chalk.yellow(`\n⚠ Found unrendered LaTeX in ${this.stats.filesWithIssues} file(s)`)
      );

      if (!this.jsonOutput) {
        console.log(
          chalk.gray(
            '\nTip: Use --json output.json to save detailed results for programmatic fixes'
          )
        );
      }
      console.log(chalk.gray('Tip: Use --by-type to group issues by category'));
      console.log(chalk.gray('Tip: Use --verbose for full details\n'));
    }
  }

  saveToJson() {
    const output = {
      summary: this.stats,
      issues: this.issues,
      generatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(this.jsonOutput, JSON.stringify(output, null, 2));
    console.log(chalk.green(`\n✓ Results saved to ${this.jsonOutput}\n`));
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  verbose: args.includes('--verbose') || args.includes('-v'),
  groupByType: args.includes('--by-type') || args.includes('--group'),
  filePattern:
    args.find(arg => arg.startsWith('--file='))?.split('=')[1] ||
    (args.includes('--file') ? args[args.indexOf('--file') + 1] : '*.html'),
  jsonOutput:
    args.find(arg => arg.startsWith('--json='))?.split('=')[1] ||
    (args.includes('--json') ? args[args.indexOf('--json') + 1] : null),
};

// Run the finder
const finder = new LatexFinder(options);
finder.run().catch(console.error);
