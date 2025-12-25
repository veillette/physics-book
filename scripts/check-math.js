#!/usr/bin/env node

/**
 * Math Delimiter Validation Script
 *
 * Validates math delimiters ($...$) in markdown files to ensure they are balanced.
 * Finds lines with uneven number of $ delimiters (accounting for escaped \$).
 *
 * Usage:
 *   node scripts/check-math.js [options] [directory]
 *
 * Options:
 *   --strict           Enable stricter validation
 *   --help, -h         Show help message
 */

import path from 'path';

import {
  printHeader,
  printDivider,
  printErrors,
  printSuccess,
  printSummary,
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findMarkdownFiles, readFile } from './lib/files.js';

/**
 * Count unescaped $ delimiters in a line, ignoring currency amounts
 */
function countDelimiters(line) {
  let count = 0;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    // Skip escaped characters
    if (char === '\\' && i + 1 < line.length) {
      i += 2; // Skip backslash and next character
      continue;
    }

    // Found a dollar sign
    if (char === '$') {
      // Check if it's a display math delimiter ($$)
      // This must be checked BEFORE currency detection
      if (i + 1 < line.length && line[i + 1] === '$') {
        // This is $$, count both as math delimiters
        count += 2;
        i += 2;
        continue;
      }

      // Check if it's likely a currency amount:
      // $ followed by digit(s), possibly with decimals and/or commas
      // Examples: $5, $2.37, $1,000, $123.45
      // BUT NOT if followed by LaTeX commands or if there's a closing $ nearby (inline math)
      const remainingText = line.substring(i + 1);

      // First check: is there a closing $ within a reasonable distance (likely inline math)?
      const hasNearbyClosingDollar =
        remainingText.indexOf('$') !== -1 && remainingText.indexOf('$') < 50;

      // Simple currency: digits, optional decimal, followed by space/punctuation/end
      // But NOT followed by backslash (LaTeX), math symbols, or degree sign
      const simpleNumberPattern = /^(\d{1,3}(,\d{3})*|\d+)(\.\d+)?/;
      const match = remainingText.match(simpleNumberPattern);

      if (match && !hasNearbyClosingDollar) {
        const afterNumber = remainingText.substring(match[0].length);
        // Check what comes after the number
        // If it's followed by: word boundary + normal text (not LaTeX or math symbols), treat as currency
        const isFollowedByText = /^(\s|\/|,|\)|;|\.|\s+[a-z])/i.test(afterNumber);
        const isFollowedByMath = /^(\s*\\|\s*\^|\s*_|\{|°|\s+times|\s+text)/.test(afterNumber);

        if (isFollowedByText && !isFollowedByMath) {
          // This is likely currency, skip it
          i++;
          continue;
        }
      }

      // Not currency or $$, count it as a single math delimiter
      count++;
    }

    i++;
  }

  return count;
}

/**
 * Math delimiter validator class.
 */
class MathDelimiterValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
  }

  /**
   * Validate all files in a directory.
   * @param {string} directory - Directory to validate
   * @returns {Promise<boolean>} - Success status
   */
  async validate(directory = 'contents') {
    printHeader('🔢', 'Math Delimiter Validation');

    const files = await findMarkdownFiles(directory);
    console.log(`Found ${files.length} markdown files\n`);

    for (const file of files) {
      this.validateFile(file);
    }

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * Validate a single file.
   * @param {string} filePath - Path to file
   */
  validateFile(filePath) {
    this.filesChecked++;
    const content = readFile(filePath);
    const lines = content.split('\n');
    const fileName = path.basename(filePath);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;
      const delimiterCount = countDelimiters(line);

      if (delimiterCount % 2 !== 0) {
        this.errors.push({
          file: fileName,
          line: lineNumber,
          message: `Unbalanced math delimiters (${delimiterCount} $ found)`,
          text: line.trim().substring(0, 80) + (line.trim().length > 80 ? '...' : ''),
        });
      }
    }
  }

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    console.log(`Files checked: ${this.filesChecked}`);

    printErrors(this.errors);

    if (this.errors.length === 0) {
      printSuccess('All files have balanced math delimiters!');
    }

    printDivider();
    printSummary(this.errors.length, this.warnings.length);
  }
}

// CLI Configuration
runCli({
  name: 'check-math',
  description: `Validates math delimiters ($...$) in markdown files:
- Checks for balanced $ delimiters
- Accounts for escaped \\$ characters
- Ignores currency amounts (e.g., $5, $2.37)`,
  flags: {
    strict: STANDARD_FLAGS.strict,
  },
  examples: [
    'node scripts/check-math.js',
    'node scripts/check-math.js --strict',
    'node scripts/check-math.js contents/',
  ],
  run: async options => {
    const validator = new MathDelimiterValidator({
      strict: options.strict,
    });
    return validator.validate(options.directory);
  },
});

// Export functions for testing
export { countDelimiters };
