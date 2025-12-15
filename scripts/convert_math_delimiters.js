#!/usr/bin/env node
/**
 * Convert math delimiters from $$ ... $$ to standard LaTeX delimiters.
 *
 * - Display math (inside <div class="equation">): $$ ... $$ → \[ ... \]
 * - Inline math (elsewhere): $$ ... $$ → \( ... \)
 */

import fs from 'fs';
import path from 'path';

/**
 * Convert $$ ... $$ inside <div class="equation"> to \[ ... \]
 */
function convertDisplayMathInEquationDiv(content) {
  const pattern = /(<div class="equation"[^>]*>)\s*\$\$\s*([\s\S]*?)\s*\$\$\s*(<\/div>)/g;
  return content.replace(pattern, (match, openTag, mathContent, closeTag) => {
    return `${openTag}\n\\[ ${mathContent} \\]\n${closeTag}`;
  });
}

/**
 * Convert remaining $$ ... $$ (inline math) to \( ... \)
 */
function convertInlineMath(content) {
  const pattern = /\$\$\s*([\s\S]*?)\s*\$\$/g;
  return content.replace(pattern, (match, mathContent) => {
    return `\\( ${mathContent} \\)`;
  });
}

/**
 * Convert math delimiters in a single file.
 * @returns {[boolean, string]} - [changed, message]
 */
function convertFile(filepath, dryRun = true) {
  const content = fs.readFileSync(filepath, 'utf-8');
  let converted = content;

  // First convert display math in equation divs
  converted = convertDisplayMathInEquationDiv(converted);

  // Then convert remaining inline math
  converted = convertInlineMath(converted);

  if (converted === content) {
    return [false, `No changes: ${filepath}`];
  }

  if (dryRun) {
    return [true, `Would modify: ${filepath}`];
  } else {
    fs.writeFileSync(filepath, converted, 'utf-8');
    return [true, `Modified: ${filepath}`];
  }
}

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const args = process.argv.slice(2);

  const apply = args.includes('--apply');
  const verbose = args.includes('--verbose') || args.includes('-v');
  const paths = args.filter(arg => !arg.startsWith('-'));

  if (paths.length === 0) {
    paths.push('contents');
  }

  const dryRun = !apply;

  if (dryRun) {
    console.log('DRY RUN - no files will be modified. Use --apply to make changes.\n');
  }

  const filesToProcess = [];

  for (const p of paths) {
    if (!fs.existsSync(p)) {
      console.error(`Warning: ${p} does not exist`);
      continue;
    }

    const stats = fs.statSync(p);
    if (stats.isFile()) {
      filesToProcess.push(p);
    } else if (stats.isDirectory()) {
      filesToProcess.push(...findMarkdownFiles(p));
    }
  }

  filesToProcess.sort();

  let modifiedCount = 0;

  for (const filepath of filesToProcess) {
    const [changed, message] = convertFile(filepath, dryRun);
    if (changed) {
      modifiedCount++;
      console.log(message);
    } else if (verbose) {
      console.log(message);
    }
  }

  console.log(`\n${dryRun ? 'Would modify' : 'Modified'}: ${modifiedCount} files`);
}

main();
