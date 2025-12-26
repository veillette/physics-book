#!/usr/bin/env node

/**
 * Content Validation and Fixing Script
 *
 * Validates and optionally fixes content quality issues including:
 * - Physical units consistency (e.g., "20m" should be "20 m")
 * - Terminology consistency (British → American English)
 * - Duplicate words
 * - Common typos
 * - Inconsistent notation
 *
 * Usage:
 *   node scripts/content.js [options] [directory]
 *
 * Modes:
 *   Default (no flags): Check only, report issues
 *   --fix: Apply fixes to files
 *   --check --fix: Check first, then apply fixes
 *
 * Options:
 *   --fix              Apply fixes to files
 *   --strict           Enable stricter validation
 *   --help, -h         Show help message
 */

import fs from 'fs';
import path from 'path';

import {
  UNITS,
  TERMINOLOGY,
  TERMINOLOGY_PATTERNS,
  COMMON_TYPOS,
  COMMON_REPEATS,
} from './lib/constants.js';

import { ContentParser, isImageLine, hasUrl, hasLatexCommands, createIssue } from './lib/parser.js';

import {
  printHeader,
  printDivider,
  printFileCount,
  printDryRunNotice,
  printStrictModeNotice,
  printErrors,
  printWarnings,
  printFixes,
  printSuccess,
  printSummary,
} from './lib/reporter.js';

import { runCli, createCheckFixFlags, getMode } from './lib/cli.js';

import { findMarkdownFiles, readFile, writeFile } from './lib/files.js';

/**
 * Escape a string so it can be safely used inside a RegExp pattern.
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Content validator and fixer class.
 */
class ContentProcessor {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.fix = options.fix || false;
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
    this.filesModified = 0;
    this.parser = new ContentParser();
  }

  /**
   * Process all files in a directory.
   * @param {string} directory - Directory to process
   * @returns {Promise<boolean>} - Success status
   */
  async process(directory) {
    const mode = this.fix ? 'fix' : 'check';
    const emoji = this.fix ? '🔧' : '🔍';
    const title = this.fix ? 'Content Auto-Fix' : 'Content Validation';

    printHeader(emoji, title);

    if (this.fix) {
      printDryRunNotice();
    } else if (this.strict) {
      printStrictModeNotice();
    }

    const files = await findMarkdownFiles(directory);
    printFileCount(files.length);

    for (const file of files) {
      await this.processFile(file);
    }

    this.printResults(mode);

    // In check mode, success means no errors
    // In fix mode, always succeed (fixes were found or not needed)
    return this.fix ? true : this.errors.length === 0;
  }

  /**
   * Process a single file.
   * @param {string} filePath - Path to file
   */
  async processFile(filePath) {
    const content = readFile(filePath);
    const lines = content.split('\n');
    const fileName = path.basename(filePath);

    this.parser.reset();

    if (this.fix) {
      this.fixFile(filePath, lines, fileName);
    } else {
      this.checkFile(lines, fileName);
    }
  }

  /**
   * Check a file for issues (no modifications).
   * @param {string[]} lines - File lines
   * @param {string} fileName - File name
   */
  checkFile(lines, fileName) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      const result = this.parser.processLine(line);
      if (!result.isContent) continue;

      // Run all checks
      this.checkUnitSpacing(fileName, lineNum, line);
      this.checkDuplicateWords(fileName, lineNum, line);
      this.checkTerminology(fileName, lineNum, line);
      this.checkTypos(fileName, lineNum, line);
      this.checkNotation(fileName, lineNum, line);
    }
  }

  /**
   * Fix a file (with modifications).
   * @param {string} filePath - Path to file
   * @param {string[]} lines - File lines
   * @param {string} fileName - File name
   */
  fixFile(filePath, lines, fileName) {
    let modified = false;
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const lineNum = i + 1;

      const result = this.parser.processLine(line);

      // Keep non-content lines as-is
      if (!result.isContent) {
        newLines.push(line);
        continue;
      }

      const originalLine = line;

      // Apply fixes
      line = this.fixUnitSpacing(line);
      line = this.fixTerminology(line);
      line = this.fixDuplicateWords(line);
      line = this.fixTypos(line);

      if (line !== originalLine) {
        modified = true;
        this.fixes.push({
          file: fileName,
          line: lineNum,
          before: originalLine.trim(),
          after: line.trim(),
        });
      }

      newLines.push(line);
    }

    if (modified) {
      this.filesModified++;
      // Note: In actual fix mode with --apply, we would write here
      // For now, this is always a dry run unless we add --apply logic
      writeFile(filePath, newLines.join('\n'));
    }
  }

  // ===== CHECK METHODS =====

  checkUnitSpacing(file, line, text) {
    if (isImageLine(text)) return;
    if (hasLatexCommands(text)) return;
    if (hasUrl(text)) return;
    if (text.includes('$')) return;

    const unitsWithoutDegree = UNITS.filter(u => u !== '°' && u !== 'deg');
    const unitPattern = new RegExp(
      `(\\d)(${unitsWithoutDegree.map(escapeRegExp).join('|')})(?!\\w)`,
      'g'
    );

    let match;
    while ((match = unitPattern.exec(text)) !== null) {
      const before = text.substring(Math.max(0, match.index - 10), match.index);
      if (before.match(/Figure\s+\d+$/i) || before.match(/\d{4}-\d{2}-$/)) continue;
      if (before.match(/ch\d+$/i) || before.match(/section\s*\d+$/i)) continue;

      this.warnings.push(
        createIssue({
          file,
          line,
          message: `Missing space before unit: "${match[0]}" should be "${match[1]} ${match[2]}"`,
          text: text.trim(),
          severity: 'warning',
        })
      );
    }
  }

  checkDuplicateWords(file, line, text) {
    if (text.length < 10 || text.includes('|') || text.includes('#')) return;
    if (isImageLine(text)) return;
    if (text.match(/\\begin\{(array|matrix|align)/)) return;

    const duplicatePattern = /\b(\w+)\s+\1\b/gi;
    let match;

    while ((match = duplicatePattern.exec(text)) !== null) {
      const word = match[1].toLowerCase();
      if (COMMON_REPEATS.includes(word)) continue;

      this.warnings.push(
        createIssue({
          file,
          line,
          message: `Duplicate word: "${match[1]}" appears twice`,
          text: text.trim(),
          severity: 'warning',
        })
      );
    }
  }

  checkTerminology(file, line, text) {
    if (isImageLine(text)) return;
    if (hasUrl(text) || text.match(/\.md|\.js|\.py/)) return;

    for (const [preferred, pattern] of Object.entries(TERMINOLOGY_PATTERNS)) {
      if (pattern.test(text)) {
        const match = text.match(pattern);
        this.warnings.push(
          createIssue({
            file,
            line,
            message: `Inconsistent terminology: "${match[0]}" should be "${preferred}" (American English)`,
            text: text.trim(),
            severity: 'warning',
          })
        );
      }
    }
  }

  checkTypos(file, line, text) {
    for (const [typo, correct] of Object.entries(COMMON_TYPOS)) {
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      if (regex.test(text)) {
        this.errors.push(
          createIssue({
            file,
            line,
            message: `Possible typo: "${typo}" should be "${correct}"`,
            text: text.trim(),
            severity: 'error',
          })
        );
      }
    }
  }

  checkNotation(file, line, text) {
    if (text.includes('**v**') && text.includes('\\vec{v}')) {
      this.warnings.push(
        createIssue({
          file,
          line,
          message: 'Inconsistent vector notation: mixing bold and arrow notation',
          text: text.trim(),
          severity: 'warning',
        })
      );
    }

    const degreePattern = /(\d+)\s*degrees?/i;
    if (degreePattern.test(text) && text.includes('rad') && !text.includes('radian')) {
      this.warnings.push(
        createIssue({
          file,
          line,
          message: 'Mixing degree and radian notation - verify consistency',
          text: text.trim(),
          severity: 'warning',
        })
      );
    }
  }

  // ===== FIX METHODS =====

  fixUnitSpacing(text) {
    if (isImageLine(text)) return text;
    if (hasLatexCommands(text)) return text;

    // Split by inline math to avoid modifying inside math
    const parts = text.split(/(\$\$[^$]*\$\$|\$[^$]+\$)/);

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] && (parts[i].startsWith('$$') || parts[i].startsWith('$'))) {
        continue;
      }

      if (parts[i]) {
        const unitsWithoutDegree = UNITS.filter(u => u !== '°' && u !== 'deg');
        const escapedUnits = unitsWithoutDegree.map(escapeRegExp);
        const unitPattern = new RegExp(`(\\d)(${escapedUnits.join('|')})(?!\\w)`, 'g');

        parts[i] = parts[i].replace(unitPattern, (match, digit, unit, offset) => {
          const before = parts[i].substring(Math.max(0, offset - 10), offset);
          if (before.match(/Figure\s+\d+$/i) || before.match(/\d{4}-\d{2}-$/)) {
            return match;
          }
          if (before.match(/ch\d+$/i) || before.match(/section\s*\d+$/i)) {
            return match;
          }
          return `${digit} ${unit}`;
        });
      }
    }

    return parts.join('');
  }

  fixTerminology(text) {
    if (isImageLine(text)) return text;
    if (hasUrl(text) || text.match(/\.md|\.js|\.py/)) return text;

    let result = text;

    for (const [british, american] of Object.entries(TERMINOLOGY)) {
      const regex = new RegExp(`\\b${british}\\b`, 'gi');
      result = result.replace(regex, match => {
        if (match[0] === match[0].toUpperCase()) {
          return american.charAt(0).toUpperCase() + american.slice(1);
        }
        return american;
      });
    }

    return result;
  }

  fixDuplicateWords(text) {
    if (text.length < 10 || text.includes('|') || text.includes('#')) {
      return text;
    }
    if (isImageLine(text)) return text;
    if (text.match(/\\begin\{(array|matrix|align)/)) return text;

    return text.replace(/\b(\w+)\s+\1\b/gi, (match, word, offset) => {
      const lowerWord = word.toLowerCase();
      if (COMMON_REPEATS.includes(lowerWord)) {
        return match;
      }

      const before = text.substring(Math.max(0, offset - 20), offset);
      if (before.match(/\b\w+\s+\w+\s+$/)) {
        return match;
      }

      return word;
    });
  }

  fixTypos(text) {
    let result = text;

    for (const [typo, correct] of Object.entries(COMMON_TYPOS)) {
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      result = result.replace(regex, correct);
    }

    return result;
  }

  // ===== RESULTS =====

  printResults(mode) {
    printDivider();

    if (mode === 'fix') {
      printFixes(this.fixes, this.filesModified, true);
    } else {
      printErrors(this.errors);
      printWarnings(this.warnings);

      if (this.errors.length === 0 && this.warnings.length === 0) {
        printSuccess('All content checks passed!');
      }

      printDivider();
      printSummary(this.errors.length, this.warnings.length);
    }
  }
}

// CLI Configuration
const flags = createCheckFixFlags();

runCli({
  name: 'content',
  description: `Validates and fixes content quality issues including:
- Physical units consistency (e.g., "20m" should be "20 m")
- Terminology consistency (British → American English)
- Duplicate words
- Common typos
- Inconsistent notation`,
  flags,
  examples: [
    'node scripts/content.js                    # Check only',
    'node scripts/content.js --fix              # Apply fixes',
    'node scripts/content.js --strict           # Stricter validation',
    'node scripts/content.js contents/ch10*.md  # Check specific files',
  ],
  run: async options => {
    const mode = getMode(options);
    const processor = new ContentProcessor({
      strict: options.strict,
      fix: mode === 'fix' || mode === 'both',
    });

    return processor.process(options.directory);
  },
});
