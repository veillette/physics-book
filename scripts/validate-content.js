#!/usr/bin/env node

/**
 * Content Auto-Fix Script
 *
 * Automatically fixes common content issues:
 * - Missing spaces before units (20m → 20 m)
 * - Terminology consistency (British → American English)
 * - Duplicate words
 * - Common typos
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';

// Physical units that should have a space before them
const UNITS = [
  'm',
  'km',
  'cm',
  'mm',
  'nm',
  's',
  'ms',
  'ns',
  'kg',
  'g',
  'mg',
  'N',
  'J',
  'W',
  'Pa',
  'm/s',
  'km/h',
  'm/s²',
  'km/s',
  'rad',
  'deg',
  '°',
  'Hz',
  'kHz',
  'MHz',
  'V',
  'A',
  'Ω',
  'K',
  '°C',
  '°F',
];

// Terminology replacements (British → American English)
const TERMINOLOGY = {
  'centre of mass': 'center of mass',
  metre: 'meter',
  metres: 'meters',
  analyser: 'analyzer',
  analysers: 'analyzers',
  labelled: 'labeled',
  modelling: 'modeling',
  travelled: 'traveled',
  travelling: 'traveling',
  colour: 'color',
  colours: 'colors',
  favour: 'favor',
  favours: 'favors',
  honour: 'honor',
  honours: 'honors',
};

// Common typos in physics texts
const COMMON_TYPOS = {
  acceleratoin: 'acceleration',
  velcoity: 'velocity',
  graivty: 'gravity',
  fricion: 'friction',
  enegy: 'energy',
  momentun: 'momentum',
  equaiton: 'equation',
  equlibrium: 'equilibrium',
  themodynamics: 'thermodynamics',
};

class ContentFixer {
  constructor(options = {}) {
    this.apply = options.apply || false;
    this.fixes = [];
    this.filesModified = 0;
  }

  async fix(directory = 'contents') {
    console.log(chalk.blue.bold('🔧 Content Auto-Fix'));
    console.log(chalk.gray('─'.repeat(60)));

    if (!this.apply) {
      console.log(chalk.yellow('DRY RUN MODE - No files will be modified'));
      console.log(chalk.gray('Use --apply to actually fix files\n'));
    }

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    for (const file of files) {
      await this.fixFile(file);
    }

    this.printResults();
    return true;
  }

  async fixFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const fileName = path.basename(filePath);

    let modified = false;
    let inCodeBlock = false;
    let inMathBlock = false;
    let inFrontMatter = false;
    let frontMatterEnded = false;

    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const lineNum = i + 1;

      // Track front matter
      if (line.trim() === '---') {
        if (!frontMatterEnded) {
          inFrontMatter = !inFrontMatter;
          if (!inFrontMatter) frontMatterEnded = true;
        }
        newLines.push(line);
        continue;
      }

      if (inFrontMatter) {
        newLines.push(line);
        continue;
      }

      // Track code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        newLines.push(line);
        continue;
      }

      // Track display math blocks
      if (line.trim().startsWith('$$')) {
        inMathBlock = !inMathBlock;
        newLines.push(line);
        continue;
      }

      // Skip fixing inside code and math blocks
      if (inCodeBlock || inMathBlock) {
        newLines.push(line);
        continue;
      }

      const originalLine = line;

      // Fix unit spacing
      line = this.fixUnitSpacing(line);

      // Fix terminology
      line = this.fixTerminology(line);

      // Fix duplicate words
      line = this.fixDuplicateWords(line);

      // Fix common typos
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
      if (this.apply) {
        fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
      }
    }
  }

  fixUnitSpacing(text) {
    // Skip image markdown lines (alt text shouldn't be modified)
    if (text.trim().startsWith('![')) return text;

    // Skip lines with inline LaTeX commands (likely in formulas)
    if (text.match(/\\(text|mathrm|frac|sqrt|begin)/)) return text;

    let result = text;

    // Split by inline math delimiters to avoid modifying inside math
    const parts = text.split(/(\$\$[^$]*\$\$|\$[^$]+\$)/);

    for (let i = 0; i < parts.length; i++) {
      // Skip math parts (odd indices after split)
      if (parts[i] && (parts[i].startsWith('$$') || parts[i].startsWith('$'))) {
        continue;
      }

      // Only process non-math parts
      if (parts[i]) {
        // Pattern: digit followed directly by unit (without space)
        // Exclude degree symbol (°) as it's often intentional
        const unitsWithoutDegree = UNITS.filter(u => u !== '°' && u !== 'deg');
        const unitPattern = new RegExp(
          `(\\d)(${unitsWithoutDegree.join('|').replace(/\//g, '\\/')})(?!\\w)`,
          'g'
        );

        parts[i] = parts[i].replace(unitPattern, (match, digit, unit, offset) => {
          // Avoid false positives in references like "Figure 20m" or dates
          const before = parts[i].substring(Math.max(0, offset - 10), offset);
          if (before.match(/Figure\s+\d+$/i) || before.match(/\d{4}-\d{2}-$/)) {
            return match;
          }
          // Avoid chapter/section references like "ch20m"
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
    // Skip image markdown lines
    if (text.trim().startsWith('![')) return text;

    // Skip URLs and file paths
    if (text.match(/https?:\/\//) || text.match(/\.md|\.js|\.py/)) return text;

    let result = text;

    for (const [british, american] of Object.entries(TERMINOLOGY)) {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${british}\\b`, 'gi');
      result = result.replace(regex, match => {
        // Preserve case
        if (match[0] === match[0].toUpperCase()) {
          return american.charAt(0).toUpperCase() + american.slice(1);
        }
        return american;
      });
    }

    return result;
  }

  fixDuplicateWords(text) {
    // Skip if line is very short or contains special formatting
    if (text.length < 10 || text.includes('|') || text.includes('#')) {
      return text;
    }

    // Skip image markdown lines
    if (text.trim().startsWith('![')) return text;

    // Skip LaTeX array/matrix definitions which may have repeated delimiters
    if (text.match(/\\begin\{(array|matrix|align)/)) return text;

    // Pattern: word repeated with space
    return text.replace(/\b(\w+)\s+\1\b/gi, (match, word, offset) => {
      // Ignore intentional repetitions and common patterns
      const lowerWord = word.toLowerCase();
      const commonRepeats = [
        'that',
        'can',
        'had',
        'will',
        'very',
        'long',
        'well',
        'is',
        'was',
        'the',
        'no',
        'so',
        'go',
        'do',
        'to',
      ];

      if (commonRepeats.includes(lowerWord)) {
        return match;
      }

      // Check context - don't fix if it looks intentional (e.g., "row row row")
      const before = text.substring(Math.max(0, offset - 20), offset);
      if (before.match(/\b\w+\s+\w+\s+$/)) {
        // Multiple words before suggests intentional pattern
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

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    if (this.fixes.length === 0) {
      console.log(chalk.green('\n✅ No fixes needed - content is clean!'));
    } else {
      console.log(chalk.cyan.bold(`\n🔧 Fixes Applied: ${this.fixes.length}`));
      console.log(chalk.gray(`Files Modified: ${this.filesModified}\n`));

      // Show sample of fixes
      const samplesToShow = Math.min(20, this.fixes.length);
      this.fixes.slice(0, samplesToShow).forEach(fix => {
        console.log(chalk.yellow(`  ${fix.file}:${fix.line}`));
        console.log(chalk.red(`    - ${fix.before.substring(0, 70)}`));
        console.log(chalk.green(`    + ${fix.after.substring(0, 70)}`));
      });

      if (this.fixes.length > samplesToShow) {
        console.log(chalk.gray(`  ... and ${this.fixes.length - samplesToShow} more fixes`));
      }

      if (!this.apply) {
        console.log(chalk.yellow('\n⚠️  DRY RUN - No files were actually modified'));
        console.log(chalk.gray('Run with --apply to apply these fixes'));
      } else {
        console.log(chalk.green('\n✅ Fixes have been applied to files'));
      }
    }

    console.log(chalk.gray('\n' + '─'.repeat(60)));
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  apply: args.includes('--apply'),
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const fixer = new ContentFixer(options);
fixer.fix(directory).then(success => {
  process.exit(success ? 0 : 1);
});
