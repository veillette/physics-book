#!/usr/bin/env node
/**
 * Convert math delimiters from $$ ... $$ to standard LaTeX delimiters.
 *
 * - Display math (inside <div class="equation">): $$ ... $$ → \[ ... \] (default)
 * - Inline math (elsewhere): $$ ... $$ → \( ... \) (default)
 *
 * Custom delimiters can be specified via command-line options.
 *
 * Usage:
 *   node scripts/convert_math_delimiters.js [options] [paths...]
 *
 * Options:
 *   --apply              Apply changes (default is dry-run)
 *   -v, --verbose        Show all files, not just modified ones
 *   --display-open STR   Opening delimiter for display math (default: "\\[")
 *   --display-close STR  Closing delimiter for display math (default: "\\]")
 *   --inline-open STR    Opening delimiter for inline math (default: "\\(")
 *   --inline-close STR   Closing delimiter for inline math (default: "\\)")
 *   --help               Show this help message
 */

import fs from 'fs';
import path from 'path';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { getBaseDir, readFile, writeFile } from './lib/files.js';

/**
 * Convert $$ ... $$ inside <div class="equation"> to display math delimiters
 */
function convertDisplayMathInEquationDiv(content, openDelim, closeDelim) {
  const pattern = /(<div class="equation"[^>]*>)\s*\$\$\s*([\s\S]*?)\s*\$\$\s*(<\/div>)/g;
  return content.replace(pattern, (_match, openTag, mathContent, closeTag) => {
    return `${openTag}\n${openDelim} ${mathContent} ${closeDelim}\n${closeTag}`;
  });
}

/**
 * Convert remaining $$ ... $$ (inline math) to inline math delimiters
 */
function convertInlineMath(content, openDelim, closeDelim) {
  const pattern = /\$\$\s*([\s\S]*?)\s*\$\$/g;
  return content.replace(pattern, (_match, mathContent) => {
    return `${openDelim} ${mathContent} ${closeDelim}`;
  });
}

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFilesRecursive(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFilesRecursive(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Math delimiter converter class.
 */
class MathDelimiterConverter {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.apply = options.apply || false;
    this.verbose = options.verbose || false;
    this.displayOpen = options.displayOpen || '\\[';
    this.displayClose = options.displayClose || '\\]';
    this.inlineOpen = options.inlineOpen || '\\(';
    this.inlineClose = options.inlineClose || '\\)';
    this.paths = options.paths || ['contents'];

    this.stats = {
      totalFiles: 0,
      modifiedFiles: 0,
      errors: 0,
    };
  }

  async run() {
    printHeader('🔢', 'Math Delimiter Converter');

    if (!this.apply) {
      console.log('DRY RUN - no files will be modified. Use --apply to make changes.\n');
    }

    console.log(`Display math: ${this.displayOpen} ... ${this.displayClose}`);
    console.log(`Inline math:  ${this.inlineOpen} ... ${this.inlineClose}\n`);

    // Collect files to process
    const filesToProcess = [];

    for (const p of this.paths) {
      const fullPath = path.isAbsolute(p) ? p : path.join(this.baseDir, p);

      if (!fs.existsSync(fullPath)) {
        console.error(`Warning: ${p} does not exist`);
        continue;
      }

      const stats = fs.statSync(fullPath);
      if (stats.isFile()) {
        filesToProcess.push(fullPath);
      } else if (stats.isDirectory()) {
        filesToProcess.push(...findMarkdownFilesRecursive(fullPath));
      }
    }

    filesToProcess.sort();
    this.stats.totalFiles = filesToProcess.length;

    console.log(`Found ${filesToProcess.length} markdown files to process\n`);

    // Process each file
    for (const filepath of filesToProcess) {
      await this.convertFile(filepath);
    }

    this.printResults();
    return this.stats.errors === 0;
  }

  async convertFile(filepath) {
    const content = readFile(filepath);
    let converted = content;

    // First convert display math in equation divs
    converted = convertDisplayMathInEquationDiv(converted, this.displayOpen, this.displayClose);

    // Then convert remaining inline math
    converted = convertInlineMath(converted, this.inlineOpen, this.inlineClose);

    if (converted === content) {
      if (this.verbose) {
        console.log(`  No changes: ${path.relative(this.baseDir, filepath)}`);
      }
      return;
    }

    const relativePath = path.relative(this.baseDir, filepath);

    if (this.apply) {
      writeFile(filepath, converted);
      console.log(`  ✓ Modified: ${relativePath}`);
    } else {
      console.log(`  Would modify: ${relativePath}`);
    }

    this.stats.modifiedFiles++;
  }

  printResults() {
    printDivider();

    console.log(`\nTotal files:   ${this.stats.totalFiles}`);
    console.log(`${this.apply ? 'Modified' : 'Would modify'}: ${this.stats.modifiedFiles}`);

    if (this.stats.errors === 0) {
      if (this.stats.modifiedFiles === 0) {
        printSuccess('No changes needed - all files already use correct delimiters!');
      } else if (this.apply) {
        printSuccess('Conversion completed!');
      } else {
        console.log('\n⚠️ DRY RUN - Use --apply to apply changes');
      }
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'convert_math_delimiters',
  description: `Convert $$ math $$ delimiters to LaTeX standard delimiters.

Converts:
- Display math in equation divs: $$ ... $$ → \\[ ... \\]
- Inline math elsewhere: $$ ... $$ → \\( ... \\)`,
  flags: {
    apply: STANDARD_FLAGS.apply,
    verbose: STANDARD_FLAGS.verbose,
    displayOpen: {
      flag: '--display-open',
      description: 'Opening delimiter for display math (default: "\\\\[")',
      type: 'string',
      default: '\\[',
    },
    displayClose: {
      flag: '--display-close',
      description: 'Closing delimiter for display math (default: "\\\\]")',
      type: 'string',
      default: '\\]',
    },
    inlineOpen: {
      flag: '--inline-open',
      description: 'Opening delimiter for inline math (default: "\\\\(")',
      type: 'string',
      default: '\\(',
    },
    inlineClose: {
      flag: '--inline-close',
      description: 'Closing delimiter for inline math (default: "\\\\)")',
      type: 'string',
      default: '\\)',
    },
  },
  examples: [
    'node scripts/convert_math_delimiters.js',
    'node scripts/convert_math_delimiters.js --apply',
    'node scripts/convert_math_delimiters.js --verbose',
    'node scripts/convert_math_delimiters.js --inline "$" "$"',
  ],
  run: async options => {
    // Extract paths from remaining args (not handled by runCli)
    const args = process.argv.slice(2);
    const paths = args.filter(arg => !arg.startsWith('-') && !arg.startsWith('\\'));

    const converter = new MathDelimiterConverter({
      ...options,
      paths: paths.length > 0 ? paths : ['contents'],
    });
    return converter.run();
  },
});
