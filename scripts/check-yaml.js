#!/usr/bin/env node

/**
 * YAML Front Matter Validation Script
 *
 * Validates YAML front matter in markdown files:
 * - Ensures required fields are present
 * - Validates field types and formats
 * - Checks for common issues (missing quotes, invalid values)
 * - Optionally validates against a schema
 *
 * Usage:
 *   node scripts/check-yaml.js [options]
 *
 * Options:
 *   --required <fields>  Comma-separated list of required fields
 *   --strict             Enable stricter validation
 *   --help               Show this help message
 */

import path from 'path';
import yaml from 'js-yaml';

import { YAML_SCHEMA, DEFAULT_GLOB_PATTERNS } from './lib/constants.js';

import {
  printHeader,
  printDivider,
  printFileCount,
  printStrictModeNotice,
  printErrors,
  printWarnings,
  printSuccess,
  printIssueSummary,
} from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { findFiles, readFile, getBaseDir } from './lib/files.js';

/**
 * YAML validator class.
 */
class YAMLValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.requiredFields = options.required || YAML_SCHEMA.required;
    this.schema = YAML_SCHEMA;
    this.baseDir = getBaseDir(import.meta.url);
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
    this.filesWithIssues = 0;
  }

  /**
   * Run the YAML validation.
   * @returns {Promise<boolean>} - Success status
   */
  async run() {
    printHeader('📋', 'YAML Front Matter Validation');

    if (this.strict) {
      printStrictModeNotice();
    }

    console.log(`Required fields: ${this.requiredFields.join(', ')}\n`);

    const files = await findFiles(DEFAULT_GLOB_PATTERNS.markdown, {
      cwd: this.baseDir,
      ignore: DEFAULT_GLOB_PATTERNS.ignore,
    });

    printFileCount(files.length);

    for (const file of files) {
      await this.validateFile(file);
    }

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * Validate a single file.
   */
  async validateFile(filePath) {
    const fullPath = path.join(this.baseDir, filePath);
    const content = readFile(fullPath);

    this.filesChecked++;

    // Extract YAML front matter
    const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

    if (!yamlMatch) {
      if (this.shouldHaveFrontMatter(filePath)) {
        this.errors.push({
          file: filePath,
          message: 'Missing YAML front matter',
          code: 'YAML_MISSING',
        });
        this.filesWithIssues++;
      }
      return;
    }

    const yamlContent = yamlMatch[1];
    let data;

    // Try to parse YAML
    try {
      data = yaml.load(yamlContent);
    } catch (error) {
      this.errors.push({
        file: filePath,
        message: `Invalid YAML syntax: ${error.message}`,
        code: 'YAML_PARSE_ERROR',
        text: error.mark ? `Line ${error.mark.line + 1}, Column ${error.mark.column + 1}` : null,
      });
      this.filesWithIssues++;
      return;
    }

    const fileErrors = [];
    const fileWarnings = [];

    // Check required fields
    for (const field of this.requiredFields) {
      if (!(field in data) || data[field] === null || data[field] === '') {
        fileErrors.push({
          file: filePath,
          message: `Missing required field: ${field}`,
          code: 'YAML_MISSING_FIELD',
        });
      }
    }

    // Validate field types
    for (const [field, value] of Object.entries(data)) {
      const expectedType = this.schema.types[field];

      if (expectedType && value !== null && value !== undefined) {
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        const validTypes = Array.isArray(expectedType) ? expectedType : [expectedType];

        if (!validTypes.includes(actualType)) {
          fileWarnings.push({
            file: filePath,
            message: `Field "${field}" should be ${validTypes.join(' or ')}, got ${actualType}`,
            code: 'YAML_WRONG_TYPE',
          });
        }
      }

      // Check valid values
      const validValues = this.schema.validValues[field];
      if (validValues && value && !validValues.includes(value)) {
        fileWarnings.push({
          file: filePath,
          message: `Field "${field}" has invalid value "${value}". Expected: ${validValues.join(', ')}`,
          code: 'YAML_INVALID_VALUE',
        });
      }
    }

    // Strict mode checks
    if (this.strict) {
      this.strictValidation(data, filePath, fileWarnings);
    }

    // Check for formatting issues
    this.checkFormattingIssues(yamlContent, filePath, fileWarnings);

    if (fileErrors.length > 0 || fileWarnings.length > 0) {
      this.filesWithIssues++;
      this.errors.push(...fileErrors);
      this.warnings.push(...fileWarnings);
    }
  }

  /**
   * Strict mode validation.
   */
  strictValidation(data, filePath, warnings) {
    // Check for unknown fields
    const knownFields = [...this.schema.required, ...this.schema.optional];
    for (const field of Object.keys(data)) {
      if (!knownFields.includes(field)) {
        warnings.push({
          file: filePath,
          message: `Unknown field: ${field}`,
          code: 'YAML_UNKNOWN_FIELD',
        });
      }
    }

    // Check for empty values
    for (const [field, value] of Object.entries(data)) {
      if (value === '' || value === null) {
        warnings.push({
          file: filePath,
          message: `Field "${field}" has empty value`,
          code: 'YAML_EMPTY_VALUE',
        });
      }
    }

    // Check chapter/section consistency
    if ('chapterNumber' in data && 'sectionNumber' in data) {
      if (typeof data.chapterNumber !== 'number' || data.chapterNumber < 0) {
        warnings.push({
          file: filePath,
          message: `Invalid chapterNumber: ${data.chapterNumber}`,
          code: 'YAML_INVALID_CHAPTER',
        });
      }
      if (typeof data.sectionNumber !== 'number' || data.sectionNumber < 0) {
        warnings.push({
          file: filePath,
          message: `Invalid sectionNumber: ${data.sectionNumber}`,
          code: 'YAML_INVALID_SECTION',
        });
      }
    }
  }

  /**
   * Check for formatting issues.
   */
  checkFormattingIssues(yamlContent, filePath, warnings) {
    const lines = yamlContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 2;

      // Check for tabs
      if (line.includes('\t')) {
        warnings.push({
          file: filePath,
          message: `Line ${lineNum}: Contains tabs (use spaces for indentation)`,
          code: 'YAML_TABS',
        });
      }

      // Check for trailing whitespace (strict mode)
      if (this.strict && line !== line.trimEnd()) {
        warnings.push({
          file: filePath,
          message: `Line ${lineNum}: Trailing whitespace`,
          code: 'YAML_TRAILING_SPACE',
        });
      }

      // Check for unquoted special values
      const colonMatch = line.match(/^(\s*)(\w+):\s*(.+)$/);
      if (colonMatch) {
        const value = colonMatch[3];
        if (/^[@*&!|>]/.test(value) && !value.startsWith('"') && !value.startsWith("'")) {
          warnings.push({
            file: filePath,
            message: `Line ${lineNum}: Value starting with special character should be quoted: ${value}`,
            code: 'YAML_UNQUOTED_SPECIAL',
          });
        }
      }
    }
  }

  /**
   * Check if file should have front matter.
   */
  shouldHaveFrontMatter(filePath) {
    return filePath.startsWith('contents/') || filePath.includes('/contents/');
  }

  /**
   * Print results.
   */
  printResults() {
    printDivider();

    console.log(`\nFiles checked: ${this.filesChecked}`);
    console.log(`Files with issues: ${this.filesWithIssues}`);

    printErrors(this.errors);
    printWarnings(this.warnings);

    printDivider();

    if (this.errors.length === 0 && this.warnings.length === 0) {
      printSuccess('All YAML front matter is valid!');
    } else if (this.errors.length === 0) {
      printSuccess('No errors, but some warnings to review.');
    } else {
      console.log(`\n❌ Found ${this.errors.length} error(s) that should be fixed.`);
    }

    // Issue summary
    const codeDescriptions = {
      YAML_MISSING: 'Missing front matter',
      YAML_PARSE_ERROR: 'YAML syntax errors',
      YAML_MISSING_FIELD: 'Missing required fields',
      YAML_WRONG_TYPE: 'Incorrect field types',
      YAML_INVALID_VALUE: 'Invalid field values',
      YAML_UNKNOWN_FIELD: 'Unknown fields',
      YAML_EMPTY_VALUE: 'Empty values',
      YAML_INVALID_CHAPTER: 'Invalid chapter numbers',
      YAML_INVALID_SECTION: 'Invalid section numbers',
      YAML_TABS: 'Tab characters',
      YAML_TRAILING_SPACE: 'Trailing whitespace',
      YAML_UNQUOTED_SPECIAL: 'Unquoted special values',
    };

    printIssueSummary([...this.errors, ...this.warnings], codeDescriptions);
  }
}

// CLI Configuration
runCli({
  name: 'check-yaml',
  description: `Validates YAML front matter in markdown files:
- Required fields are present
- Field types are correct
- Values are valid
- YAML syntax is valid`,
  flags: {
    strict: STANDARD_FLAGS.strict,
    required: {
      flag: '--required',
      description: 'Comma-separated list of required fields',
      type: 'array',
      default: YAML_SCHEMA.required,
    },
  },
  examples: [
    'node scripts/check-yaml.js',
    'node scripts/check-yaml.js --strict',
    'node scripts/check-yaml.js --required "title,layout,chapterNumber"',
  ],
  run: async options => {
    const validator = new YAMLValidator({
      strict: options.strict,
      required: options.required,
    });
    return validator.run();
  },
});
