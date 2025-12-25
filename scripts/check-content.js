#!/usr/bin/env node

/**
 * Content Validation Script
 *
 * Validates content quality and consistency including:
 * - Physical units consistency
 * - Common terminology spelling
 * - Inconsistent notation
 * - Missing spaces in units (e.g., "20m" should be "20 m")
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

// Common physics terminology that should be consistent
const TERMINOLOGY = {
  'center of mass': /centre of mass/gi,
  meter: /metre(?!d)/g, // metre but not metered
  analyzer: /analyser/g,
  labeled: /labelled/g,
  modeling: /modelling/g,
  traveled: /travelled/g,
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

class ContentValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.errors = [];
    this.warnings = [];
  }

  async validate(directory = 'contents') {
    console.log(chalk.blue.bold('🔍 Content Validation'));
    console.log(chalk.gray('─'.repeat(60)));

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    for (const file of files) {
      await this.validateFile(file);
    }

    this.printResults();
    return this.errors.length === 0;
  }

  async validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const fileName = path.basename(filePath);

    let inCodeBlock = false;
    let inMathBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Track code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }

      // Track display math blocks
      if (line.trim().startsWith('$$')) {
        inMathBlock = !inMathBlock;
        continue;
      }

      // Skip validation inside code and math blocks
      if (inCodeBlock || inMathBlock) continue;

      // Check for missing spaces before units
      this.checkUnitSpacing(fileName, lineNum, line);

      // Check for duplicate words
      this.checkDuplicateWords(fileName, lineNum, line);

      // Check for terminology consistency
      this.checkTerminology(fileName, lineNum, line);

      // Check for common typos
      this.checkTypos(fileName, lineNum, line);

      // Check for inconsistent notation
      this.checkNotation(fileName, lineNum, line);
    }
  }

  checkUnitSpacing(file, line, text) {
    // Skip image markdown lines (alt text)
    if (text.trim().startsWith('![')) return;

    // Skip lines with LaTeX commands
    if (text.match(/\\(text|mathrm|frac|sqrt|begin)/)) return;

    // Skip URLs
    if (text.match(/https?:\/\//)) return;

    // Skip if line contains inline LaTeX math (preserve math content)
    if (text.includes('$')) return;

    // Exclude degree symbol from checking as it's often intentional
    const unitsWithoutDegree = UNITS.filter(u => u !== '°' && u !== 'deg');
    const unitPattern = new RegExp(
      `(\\d)(${unitsWithoutDegree.join('|').replace(/\//g, '\\/')})(?!\\w)`,
      'g'
    );

    let match;
    while ((match = unitPattern.exec(text)) !== null) {
      // Avoid false positives in references like "Figure 20m" or dates
      const before = text.substring(Math.max(0, match.index - 10), match.index);
      if (before.match(/Figure\s+\d+$/i) || before.match(/\d{4}-\d{2}-$/)) continue;

      // Avoid chapter/section references
      if (before.match(/ch\d+$/i) || before.match(/section\s*\d+$/i)) continue;

      this.warnings.push({
        file,
        line,
        message: `Missing space before unit: "${match[0]}" should be "${match[1]} ${match[2]}"`,
        text: text.trim(),
      });
    }
  }

  checkDuplicateWords(file, line, text) {
    // Skip if line is very short or contains special formatting
    if (text.length < 10 || text.includes('|') || text.includes('#')) return;

    // Skip image markdown lines
    if (text.trim().startsWith('![')) return;

    // Skip LaTeX array/matrix definitions
    if (text.match(/\\begin\{(array|matrix|align)/)) return;

    // Pattern: word repeated with possible space/punctuation
    const duplicatePattern = /\b(\w+)\s+\1\b/gi;

    let match;
    while ((match = duplicatePattern.exec(text)) !== null) {
      // Ignore intentional repetitions and common phrases
      const word = match[1].toLowerCase();
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
        'c',
        'r',
      ];

      if (commonRepeats.includes(word)) continue;

      this.warnings.push({
        file,
        line,
        message: `Duplicate word: "${match[1]}" appears twice`,
        text: text.trim(),
      });
    }
  }

  checkTerminology(file, line, text) {
    // Skip image markdown lines
    if (text.trim().startsWith('![')) return;

    // Skip URLs and file paths
    if (text.match(/https?:\/\//) || text.match(/\.md|\.js|\.py/)) return;

    for (const [preferred, pattern] of Object.entries(TERMINOLOGY)) {
      if (pattern.test(text)) {
        const match = text.match(pattern);
        this.warnings.push({
          file,
          line,
          message: `Inconsistent terminology: "${match[0]}" should be "${preferred}" (American English)`,
          text: text.trim(),
        });
      }
    }
  }

  checkTypos(file, line, text) {
    for (const [typo, correct] of Object.entries(COMMON_TYPOS)) {
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      if (regex.test(text)) {
        this.errors.push({
          file,
          line,
          message: `Possible typo: "${typo}" should be "${correct}"`,
          text: text.trim(),
        });
      }
    }
  }

  checkNotation(file, line, text) {
    // Check for inconsistent vector notation
    // Should use either bold or arrow consistently
    if (text.includes('**v**') && text.includes('\\vec{v}')) {
      this.warnings.push({
        file,
        line,
        message: 'Inconsistent vector notation: mixing bold and arrow notation',
        text: text.trim(),
      });
    }

    // Check for inconsistent angle notation (degrees vs radians)
    const degreePattern = /(\d+)\s*degrees?/i;
    const radianPattern = /(\d+)\s*radians?/i;

    if (degreePattern.test(text) && text.includes('rad') && !text.includes('radian')) {
      this.warnings.push({
        file,
        line,
        message: 'Mixing degree and radian notation - verify consistency',
        text: text.trim(),
      });
    }
  }

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    if (this.errors.length > 0) {
      console.log(chalk.red.bold(`\n❌ Errors: ${this.errors.length}`));
      this.errors.slice(0, 20).forEach(error => {
        console.log(chalk.red(`  ${error.file}:${error.line}`));
        console.log(chalk.gray(`    ${error.message}`));
        console.log(
          chalk.gray(`    "${error.text.substring(0, 80)}${error.text.length > 80 ? '...' : ''}"`)
        );
      });

      if (this.errors.length > 20) {
        console.log(chalk.gray(`  ... and ${this.errors.length - 20} more errors`));
      }
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow.bold(`\n⚠️  Warnings: ${this.warnings.length}`));
      this.warnings.slice(0, 20).forEach(warning => {
        console.log(chalk.yellow(`  ${warning.file}:${warning.line}`));
        console.log(chalk.gray(`    ${warning.message}`));
        console.log(
          chalk.gray(
            `    "${warning.text.substring(0, 80)}${warning.text.length > 80 ? '...' : ''}"`
          )
        );
      });

      if (this.warnings.length > 20) {
        console.log(chalk.gray(`  ... and ${this.warnings.length - 20} more warnings`));
      }
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green('✅ All content checks passed!'));
    }

    console.log(chalk.gray('\n' + '─'.repeat(60)));
    console.log(
      chalk.gray(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`)
    );
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  strict: args.includes('--strict'),
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const validator = new ContentValidator(options);
validator.validate(directory).then(success => {
  process.exit(success ? 0 : 1);
});
