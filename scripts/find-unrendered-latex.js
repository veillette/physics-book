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
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { glob } from 'glob';

const baseUrl = 'http://localhost:4000/physics-book/contents/';
const siteDir = '_site/contents';

// Common LaTeX commands to search for
const LATEX_PATTERNS = [
  // Greek letters
  /\\alpha\b/g,
  /\\beta\b/g,
  /\\gamma\b/g,
  /\\delta\b/g,
  /\\epsilon\b/g,
  /\\varepsilon\b/g,
  /\\zeta\b/g,
  /\\eta\b/g,
  /\\theta\b/g,
  /\\vartheta\b/g,
  /\\iota\b/g,
  /\\kappa\b/g,
  /\\lambda\b/g,
  /\\mu\b/g,
  /\\nu\b/g,
  /\\xi\b/g,
  /\\pi\b/g,
  /\\rho\b/g,
  /\\sigma\b/g,
  /\\tau\b/g,
  /\\upsilon\b/g,
  /\\phi\b/g,
  /\\varphi\b/g,
  /\\chi\b/g,
  /\\psi\b/g,
  /\\omega\b/g,
  /\\Delta\b/g,
  /\\Gamma\b/g,
  /\\Lambda\b/g,
  /\\Phi\b/g,
  /\\Psi\b/g,
  /\\Omega\b/g,
  /\\Sigma\b/g,
  /\\Theta\b/g,

  // Math operators
  /\\sum\b/g,
  /\\prod\b/g,
  /\\int\b/g,
  /\\oint\b/g,
  /\\partial\b/g,
  /\\nabla\b/g,
  /\\infty\b/g,
  /\\times\b/g,
  /\\cdot\b/g,
  /\\pm\b/g,
  /\\mp\b/g,
  /\\div\b/g,

  // Functions and commands
  /\\frac\{/g,
  /\\sqrt\{/g,
  /\\text\{/g,
  /\\mathrm\{/g,
  /\\mathbf\{/g,
  /\\mathit\{/g,
  /\\mathrm\{/g,
  /\\overline\{/g,
  /\\underline\{/g,
  /\\hat\{/g,
  /\\vec\{/g,
  /\\bar\{/g,
  /\\dot\{/g,
  /\\ddot\{/g,

  // Trig functions
  /\\sin\b/g,
  /\\cos\b/g,
  /\\tan\b/g,
  /\\cot\b/g,
  /\\sec\b/g,
  /\\csc\b/g,
  /\\arcsin\b/g,
  /\\arccos\b/g,
  /\\arctan\b/g,

  // Logarithms
  /\\log\b/g,
  /\\ln\b/g,
  /\\exp\b/g,

  // Delimiters
  /\\left[\(\[\{\\|]/g,
  /\\right[\)\]\}\\|]/g,

  // Relations
  /\\leq\b/g,
  /\\geq\b/g,
  /\\neq\b/g,
  /\\approx\b/g,
  /\\equiv\b/g,
  /\\propto\b/g,

  // Arrows
  /\\rightarrow\b/g,
  /\\leftarrow\b/g,
  /\\Rightarrow\b/g,
  /\\Leftarrow\b/g,

  // Subscripts/superscripts indicators (when not in math mode)
  /\\_{/g,
  /\\\^{/g,
];

class LatexFinder {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.filePattern = options.filePattern || '*.html';
    this.stats = {
      totalFiles: 0,
      filesChecked: 0,
      filesWithIssues: 0,
      totalIssues: 0,
    };
    this.issues = [];
  }

  async findHtmlFiles() {
    const pattern = path.join(siteDir, this.filePattern);
    const files = await glob(pattern);
    return files.map(f => path.basename(f));
  }

  async checkPage(htmlFile) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      const url = `${baseUrl}${htmlFile}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

      // Wait for MathJax to finish rendering
      await page.waitForTimeout(1000);

      // Get the text content of the page body, excluding script tags and MathJax elements
      const unrenderedLatex = await page.evaluate((patterns) => {
        const results = [];

        // Get all text nodes, excluding those in script tags, style tags, and MathJax rendered elements
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;

              // Skip script, style, and MathJax elements
              if (parent.tagName === 'SCRIPT' ||
                  parent.tagName === 'STYLE' ||
                  parent.tagName === 'NOSCRIPT' ||
                  parent.classList.contains('MathJax') ||
                  parent.classList.contains('MathJax_Display') ||
                  parent.classList.contains('MathJax_Preview') ||
                  parent.closest('.MathJax') ||
                  parent.closest('mjx-container') ||
                  parent.closest('[class*="MathJax"]')) {
                return NodeFilter.FILTER_REJECT;
              }

              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
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
            while (contextElement && !['P', 'DIV', 'LI', 'TD', 'TH', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(contextElement.tagName)) {
              contextElement = contextElement.parentElement;
            }

            const context = contextElement ? contextElement.innerText : text;
            const truncatedContext = context.length > 100
              ? context.substring(0, 100) + '...'
              : context;

            // Find line number approximation (count <br> and block elements before this node)
            let lineNum = 1;
            const allElements = document.body.getElementsByTagName('*');
            for (let el of allElements) {
              if (el === contextElement) break;
              if (['P', 'DIV', 'BR', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
                lineNum++;
              }
            }

            results.push({
              commands: [...new Set(latexMatches)],
              context: truncatedContext,
              lineApprox: lineNum,
              fullText: text,
            });
          }
        });

        return results;
      }, LATEX_PATTERNS);

      await browser.close();
      return unrenderedLatex;

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

    for (const htmlFile of htmlFiles) {
      this.stats.filesChecked++;

      try {
        const issues = await this.checkPage(htmlFile);

        if (issues.length > 0) {
          this.stats.filesWithIssues++;
          this.stats.totalIssues += issues.length;

          console.log(chalk.yellow(`\n  ${htmlFile}:`));
          console.log(chalk.yellow(`    • ${issues.length} unrendered LaTeX command${issues.length > 1 ? 's' : ''}`));

          // Group by command
          const commandGroups = {};
          issues.forEach(issue => {
            issue.commands.forEach(cmd => {
              if (!commandGroups[cmd]) {
                commandGroups[cmd] = [];
              }
              commandGroups[cmd].push(issue);
            });
          });

          // Show each command and its occurrences
          Object.entries(commandGroups).forEach(([cmd, occurrences]) => {
            console.log(chalk.yellow(`    •   → "${occurrences[0].context}"`));
            const lines = [...new Set(occurrences.map(o => o.lineApprox))].sort((a, b) => a - b);
            console.log(chalk.yellow(`    •      Line(s): ${lines.join(', ')}`));

            if (this.verbose && occurrences.length > 1) {
              occurrences.slice(1).forEach(occ => {
                console.log(chalk.gray(`    •   → "${occ.context}"`));
                console.log(chalk.gray(`    •      Line: ${occ.lineApprox}`));
              });
            }
          });

          this.issues.push({
            file: htmlFile,
            issues: issues,
          });
        }

        // Progress indicator
        if (!this.verbose && this.stats.filesChecked % 10 === 0) {
          console.log(chalk.gray(`  Progress: ${this.stats.filesChecked}/${this.stats.totalFiles} files checked...`));
        }

      } catch (error) {
        if (error.message.includes('Timeout')) {
          console.log(chalk.gray(`    • Skipped (timeout): ${htmlFile}`));
        } else {
          console.log(chalk.red(`    • Error checking ${htmlFile}: ${error.message}`));
        }
      }
    }

    this.printSummary();
  }

  printSummary() {
    console.log(chalk.blue('\n\n═══════════════════════════════════════════════════════════'));
    console.log(chalk.blue('                        SUMMARY'));
    console.log(chalk.blue('═══════════════════════════════════════════════════════════\n'));

    console.log(chalk.white(`Total files checked: ${this.stats.filesChecked}`));
    console.log(chalk.white(`Files with unrendered LaTeX: ${this.stats.filesWithIssues}`));
    console.log(chalk.white(`Total issues found: ${this.stats.totalIssues}`));

    if (this.stats.filesWithIssues === 0) {
      console.log(chalk.green('\n✓ No unrendered LaTeX commands found!\n'));
    } else {
      console.log(chalk.yellow(`\n⚠ Found unrendered LaTeX in ${this.stats.filesWithIssues} file(s)\n`));
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  verbose: args.includes('--verbose') || args.includes('-v'),
  filePattern: args.find(arg => arg.startsWith('--file='))?.split('=')[1] ||
               (args.includes('--file') ? args[args.indexOf('--file') + 1] : '*.html'),
};

// Run the finder
const finder = new LatexFinder(options);
finder.run().catch(console.error);
