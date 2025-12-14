#!/usr/bin/env node

/**
 * validate-yaml.js
 *
 * Validates YAML front matter in markdown files:
 * - Ensures required fields are present
 * - Validates field types and formats
 * - Checks for common issues (missing quotes, invalid values)
 * - Optionally validates against a schema
 *
 * Usage:
 *   node scripts/validate-yaml.js [options]
 *
 * Options:
 *   --required <fields>  Comma-separated list of required fields
 *   --strict             Enable stricter validation
 *   --fix                Attempt to fix common issues
 *   --help               Show this help message
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

// Default schema for physics book front matter
const DEFAULT_SCHEMA = {
  required: ['title', 'layout'],
  optional: ['chapterNumber', 'sectionNumber', 'description', 'keywords', 'author', 'date', 'order', 'toc', 'mathjax'],
  types: {
    title: 'string',
    layout: 'string',
    chapterNumber: 'number',
    sectionNumber: 'number',
    description: 'string',
    keywords: ['string', 'array'],
    author: 'string',
    date: ['string', 'date'],
    order: 'number',
    toc: 'boolean',
    mathjax: 'boolean'
  },
  validValues: {
    layout: ['default', 'chapter', 'section', 'page', 'home', 'post']
  }
};

class YAMLValidator {
  constructor(options = {}) {
    this.strict = options.strict || false;
    this.fix = options.fix || false;
    this.requiredFields = options.required || DEFAULT_SCHEMA.required;
    this.schema = DEFAULT_SCHEMA;
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
    this.filesWithIssues = 0;
    this.fixedFiles = 0;
  }

  async run() {
    console.log('YAML Front Matter Validator');
    console.log('='.repeat(60));

    if (this.strict) {
      console.log('(Strict mode enabled)');
    }
    console.log(`Required fields: ${this.requiredFields.join(', ')}\n`);

    const files = await glob('**/*.md', {
      cwd: baseDir,
      ignore: ['node_modules/**', '_site/**', '.jekyll-cache/**', 'scripts/**']
    });

    for (const file of files) {
      await this.validateFile(file);
    }

    this.printResults();
    return this.errors.length === 0;
  }

  async validateFile(filePath) {
    const fullPath = path.join(baseDir, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');

    this.filesChecked++;

    // Extract YAML front matter
    const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

    if (!yamlMatch) {
      // Check if file should have front matter
      if (this.shouldHaveFrontMatter(filePath)) {
        this.errors.push({
          file: filePath,
          message: 'Missing YAML front matter',
          code: 'YAML_MISSING'
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
        details: error.mark ? `Line ${error.mark.line + 1}, Column ${error.mark.column + 1}` : null
      });
      this.filesWithIssues++;
      return;
    }

    // Validate the parsed YAML
    const fileErrors = [];
    const fileWarnings = [];

    // Check required fields
    for (const field of this.requiredFields) {
      if (!(field in data) || data[field] === null || data[field] === '') {
        fileErrors.push({
          file: filePath,
          message: `Missing required field: ${field}`,
          code: 'YAML_MISSING_FIELD',
          field
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
            field,
            expected: validTypes,
            actual: actualType
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
          field,
          value,
          validValues
        });
      }
    }

    // Strict mode checks
    if (this.strict) {
      // Check for unknown fields
      const knownFields = [...this.schema.required, ...this.schema.optional];
      for (const field of Object.keys(data)) {
        if (!knownFields.includes(field)) {
          fileWarnings.push({
            file: filePath,
            message: `Unknown field: ${field}`,
            code: 'YAML_UNKNOWN_FIELD',
            field
          });
        }
      }

      // Check for empty values
      for (const [field, value] of Object.entries(data)) {
        if (value === '' || value === null) {
          fileWarnings.push({
            file: filePath,
            message: `Field "${field}" has empty value`,
            code: 'YAML_EMPTY_VALUE',
            field
          });
        }
      }

      // Check chapter/section consistency
      if ('chapterNumber' in data && 'sectionNumber' in data) {
        if (typeof data.chapterNumber !== 'number' || data.chapterNumber < 0) {
          fileWarnings.push({
            file: filePath,
            message: `Invalid chapterNumber: ${data.chapterNumber}`,
            code: 'YAML_INVALID_CHAPTER'
          });
        }
        if (typeof data.sectionNumber !== 'number' || data.sectionNumber < 0) {
          fileWarnings.push({
            file: filePath,
            message: `Invalid sectionNumber: ${data.sectionNumber}`,
            code: 'YAML_INVALID_SECTION'
          });
        }
      }
    }

    // Check for common formatting issues
    this.checkFormattingIssues(yamlContent, filePath, fileWarnings);

    if (fileErrors.length > 0 || fileWarnings.length > 0) {
      this.filesWithIssues++;
      this.errors.push(...fileErrors);
      this.warnings.push(...fileWarnings);
    }
  }

  checkFormattingIssues(yamlContent, filePath, warnings) {
    const lines = yamlContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 2; // +2 for 0-index and opening ---

      // Check for tabs (YAML prefers spaces)
      if (line.includes('\t')) {
        warnings.push({
          file: filePath,
          message: `Line ${lineNum}: Contains tabs (use spaces for indentation)`,
          code: 'YAML_TABS'
        });
      }

      // Check for trailing whitespace
      if (this.strict && line !== line.trimEnd()) {
        warnings.push({
          file: filePath,
          message: `Line ${lineNum}: Trailing whitespace`,
          code: 'YAML_TRAILING_SPACE'
        });
      }

      // Check for unquoted strings that might cause issues
      const colonMatch = line.match(/^(\s*)(\w+):\s*(.+)$/);
      if (colonMatch) {
        const value = colonMatch[3];
        // Values starting with special characters should be quoted
        if (/^[@*&!|>]/.test(value) && !value.startsWith('"') && !value.startsWith("'")) {
          warnings.push({
            file: filePath,
            message: `Line ${lineNum}: Value starting with special character should be quoted: ${value}`,
            code: 'YAML_UNQUOTED_SPECIAL'
          });
        }
      }
    }
  }

  shouldHaveFrontMatter(filePath) {
    // Files in contents/ directory should have front matter
    return filePath.startsWith('contents/') || filePath.includes('/contents/');
  }

  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('RESULTS');
    console.log('='.repeat(60));

    console.log(`\nFiles checked: ${this.filesChecked}`);
    console.log(`Files with issues: ${this.filesWithIssues}`);

    if (this.errors.length > 0) {
      console.log(`\n❌ ${this.errors.length} Error(s):\n`);
      for (const error of this.errors) {
        console.log(`  ${error.file}`);
        console.log(`    [${error.code}] ${error.message}`);
        if (error.details) {
          console.log(`    ${error.details}`);
        }
      }
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  ${this.warnings.length} Warning(s):\n`);
      for (const warning of this.warnings) {
        console.log(`  ${warning.file}`);
        console.log(`    [${warning.code}] ${warning.message}`);
      }
    }

    console.log('\n' + '='.repeat(60));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All YAML front matter is valid!');
    } else if (this.errors.length === 0) {
      console.log('\n✅ No errors, but some warnings to review.');
    } else {
      console.log(`\n❌ Found ${this.errors.length} error(s) that should be fixed.`);
    }

    // Summary by code
    console.log('\nIssue Summary:');
    const codeCounts = {};
    [...this.errors, ...this.warnings].forEach(issue => {
      codeCounts[issue.code] = (codeCounts[issue.code] || 0) + 1;
    });

    const codeDescriptions = {
      'YAML_MISSING': 'Missing front matter',
      'YAML_PARSE_ERROR': 'YAML syntax errors',
      'YAML_MISSING_FIELD': 'Missing required fields',
      'YAML_WRONG_TYPE': 'Incorrect field types',
      'YAML_INVALID_VALUE': 'Invalid field values',
      'YAML_UNKNOWN_FIELD': 'Unknown fields',
      'YAML_EMPTY_VALUE': 'Empty values',
      'YAML_INVALID_CHAPTER': 'Invalid chapter numbers',
      'YAML_INVALID_SECTION': 'Invalid section numbers',
      'YAML_TABS': 'Tab characters',
      'YAML_TRAILING_SPACE': 'Trailing whitespace',
      'YAML_UNQUOTED_SPECIAL': 'Unquoted special values'
    };

    for (const [code, count] of Object.entries(codeCounts).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${code}: ${count} (${codeDescriptions[code] || code})`);
    }
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/validate-yaml.js [options]

Validates YAML front matter in markdown files.

Options:
  --required <fields>  Comma-separated list of required fields
                       (default: title,layout)
  --strict             Enable stricter validation
  --help               Show this help message

Examples:
  node scripts/validate-yaml.js
  node scripts/validate-yaml.js --strict
  node scripts/validate-yaml.js --required "title,layout,chapterNumber"

Validation checks:
  - Required fields are present
  - Field types are correct
  - Values are valid (e.g., layout values)
  - YAML syntax is valid

Strict mode adds:
  - Unknown field warnings
  - Empty value warnings
  - Chapter/section number validation
  - Trailing whitespace warnings
`);
    process.exit(0);
  }

  const options = {
    strict: args.includes('--strict'),
    fix: args.includes('--fix')
  };

  // Parse required fields
  const reqIndex = args.indexOf('--required');
  if (reqIndex !== -1 && args[reqIndex + 1]) {
    options.required = args[reqIndex + 1].split(',').map(f => f.trim());
  }

  const validator = new YAMLValidator(options);
  const success = await validator.run();
  process.exit(success ? 0 : 1);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
