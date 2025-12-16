#!/usr/bin/env node
/**
 * Convert math delimiters from $$ ... $$ to standard LaTeX delimiters.
 *
 * - Display math (inside <div class="equation">): $$ ... $$ → \[ ... \] (default)
 * - Inline math (elsewhere): $$ ... $$ → \( ... \) (default)
 *
 * Custom delimiters can be specified via command-line options.
 */

import fs from 'fs';
import path from 'path';

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert $$ ... $$ inside <div class="equation"> to display math delimiters
 */
function convertDisplayMathInEquationDiv(content, openDelim, closeDelim) {
  const pattern = /(<div class="equation"[^>]*>)\s*\$\$\s*([\s\S]*?)\s*\$\$\s*(<\/div>)/g;
  return content.replace(pattern, (match, openTag, mathContent, closeTag) => {
    return `${openTag}\n${openDelim} ${mathContent} ${closeDelim}\n${closeTag}`;
  });
}

/**
 * Convert remaining $$ ... $$ (inline math) to inline math delimiters
 */
function convertInlineMath(content, openDelim, closeDelim) {
  const pattern = /\$\$\s*([\s\S]*?)\s*\$\$/g;
  return content.replace(pattern, (match, mathContent) => {
    return `${openDelim} ${mathContent} ${closeDelim}`;
  });
}

/**
 * Convert math delimiters in a single file.
 * @returns {[boolean, string]} - [changed, message]
 */
function convertFile(filepath, options) {
  const { dryRun, displayOpen, displayClose, inlineOpen, inlineClose } = options;
  const content = fs.readFileSync(filepath, 'utf-8');
  let converted = content;

  // First convert display math in equation divs
  converted = convertDisplayMathInEquationDiv(converted, displayOpen, displayClose);

  // Then convert remaining inline math
  converted = convertInlineMath(converted, inlineOpen, inlineClose);

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

/**
 * Parse command-line arguments
 */
function parseArgs(args) {
  const options = {
    apply: false,
    verbose: false,
    displayOpen: '\\[',
    displayClose: '\\]',
    inlineOpen: '\\(',
    inlineClose: '\\)',
    paths: [],
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--apply') {
      options.apply = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--display-open' && args[i + 1]) {
      options.displayOpen = args[++i];
    } else if (arg === '--display-close' && args[i + 1]) {
      options.displayClose = args[++i];
    } else if (arg === '--inline-open' && args[i + 1]) {
      options.inlineOpen = args[++i];
    } else if (arg === '--inline-close' && args[i + 1]) {
      options.inlineClose = args[++i];
    } else if (arg === '--display' && args[i + 1]) {
      // Shorthand: --display "\\[" "\\]"
      options.displayOpen = args[++i];
      if (args[i + 1] && !args[i + 1].startsWith('-')) {
        options.displayClose = args[++i];
      }
    } else if (arg === '--inline' && args[i + 1]) {
      // Shorthand: --inline "\\(" "\\)"
      options.inlineOpen = args[++i];
      if (args[i + 1] && !args[i + 1].startsWith('-')) {
        options.inlineClose = args[++i];
      }
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      options.paths.push(arg);
    }
  }

  if (options.paths.length === 0) {
    options.paths.push('contents');
  }

  return options;
}

function printHelp() {
  console.log(`
Usage: node convert_math_delimiters.js [options] [paths...]

Convert \$\$ math \$\$ delimiters to LaTeX standard delimiters.

Options:
  --apply              Actually apply changes (default is dry-run)
  -v, --verbose        Show all files, not just modified ones

  --display-open STR   Opening delimiter for display math (default: "\\[")
  --display-close STR  Closing delimiter for display math (default: "\\]")
  --display OPEN CLOSE Shorthand for setting both display delimiters

  --inline-open STR    Opening delimiter for inline math (default: "\\(")
  --inline-close STR   Closing delimiter for inline math (default: "\\)")
  --inline OPEN CLOSE  Shorthand for setting both inline delimiters

  -h, --help           Show this help message

Examples:
  # Dry-run with default delimiters (\\[ \\] and \\( \\))
  node convert_math_delimiters.js

  # Apply changes
  node convert_math_delimiters.js --apply

  # Use \\begin{equation} for display math
  node convert_math_delimiters.js --display "\\\\begin{equation}" "\\\\end{equation}"

  # Use single $ for inline math
  node convert_math_delimiters.js --inline "$" "$"

  # Process specific files
  node convert_math_delimiters.js contents/ch1*.md
`);
}

function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  const dryRun = !options.apply;

  if (dryRun) {
    console.log('DRY RUN - no files will be modified. Use --apply to make changes.\n');
  }

  console.log(`Display math: ${options.displayOpen} ... ${options.displayClose}`);
  console.log(`Inline math:  ${options.inlineOpen} ... ${options.inlineClose}\n`);

  const filesToProcess = [];

  for (const p of options.paths) {
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

  const convertOptions = {
    dryRun,
    displayOpen: options.displayOpen,
    displayClose: options.displayClose,
    inlineOpen: options.inlineOpen,
    inlineClose: options.inlineClose,
  };

  for (const filepath of filesToProcess) {
    const [changed, message] = convertFile(filepath, convertOptions);
    if (changed) {
      modifiedCount++;
      console.log(message);
    } else if (options.verbose) {
      console.log(message);
    }
  }

  console.log(`\n${dryRun ? 'Would modify' : 'Modified'}: ${modifiedCount} files`);
}

main();
