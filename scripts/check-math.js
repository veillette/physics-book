#!/usr/bin/env node

/**
 * check-math-delimiters.js
 *
 * Validates math delimiters ($...$) in markdown files to ensure they are balanced.
 * Finds lines with uneven number of $ delimiters (accounting for escaped \$).
 *
 * Usage:
 *   node scripts/check-math-delimiters.js [directory]
 *
 * Arguments:
 *   directory    Directory to check (default: contents/)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '..');

/**
 * Count unescaped $ delimiters in a line
 */
function countDelimiters(line) {
  let count = 0;
  let ignoreNext = false;

  for (const char of line) {
    if (char === '\\') {
      ignoreNext = true;
    } else if (char === '$' && !ignoreNext) {
      count += 1;
    } else {
      ignoreNext = false;
    }
  }

  return count;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  const issues = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    const delimiterCount = countDelimiters(line);

    if (delimiterCount % 2 !== 0) {
      issues.push({
        line: lineNumber,
        content: line.trim(),
        count: delimiterCount,
      });
    }
  }

  return issues;
}

/**
 * Process all markdown files in a directory
 */
function processDirectory(directoryPath) {
  const results = [];
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && file.endsWith('.md')) {
      const issues = processFile(filePath);
      if (issues.length > 0) {
        results.push({ file, issues });
      }
    } else if (stats.isDirectory()) {
      // Recursively process subdirectories
      const subResults = processDirectory(filePath);
      results.push(...subResults);
    }
  }

  return results;
}

// CLI
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage: node scripts/check-math-delimiters.js [directory]

Arguments:
  directory    Directory to check (default: contents/)

Options:
  --help       Show this help message

Examples:
  node scripts/check-math-delimiters.js
  node scripts/check-math-delimiters.js contents/
`);
    process.exit(0);
  }

  const targetDir = args[0] || 'contents';
  const fullPath = path.isAbsolute(targetDir) ? targetDir : path.join(baseDir, targetDir);

  if (!fs.existsSync(fullPath)) {
    console.error(`Error: Directory not found: ${fullPath}`);
    process.exit(1);
  }

  console.log(`Checking math delimiters in: ${fullPath}`);
  console.log('='.repeat(60));

  const results = processDirectory(fullPath);

  if (results.length === 0) {
    console.log('\n✅ All files have balanced math delimiters!');
    process.exit(0);
  }

  console.log(`\n❌ Found ${results.length} file(s) with unbalanced delimiters:\n`);

  let totalIssues = 0;
  for (const { file, issues } of results) {
    console.log(`📄 ${file}:`);
    for (const issue of issues) {
      totalIssues++;
      console.log(
        `   Line ${issue.line} (${issue.count} delimiters): ${issue.content.substring(0, 80)}...`
      );
    }
    console.log();
  }

  console.log('='.repeat(60));
  console.log(`Total: ${totalIssues} issue(s) in ${results.length} file(s)`);

  process.exit(1);
}

main();
