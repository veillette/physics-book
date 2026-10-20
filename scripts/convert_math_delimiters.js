#!/usr/bin/env node
/**
 * Convert math delimiters from $$ ... $$ to standard LaTeX delimiters.
 *
 * - Display math → \[ ... \] (default): a $$…$$ inside <div class="equation">, or one that is
 *   the sole content of its paragraph or list item (the same rule the Markdown renderer uses
 *   to pick display math, see lib/eleventy/markdown-it-kramdown-math.js).
 * - Inline math → \( ... \) (default): every other $$…$$.
 *
 * Safety:
 * - $$ is paired within each blank-line-separated block, exactly as the renderer pairs it, so
 *   one stray $$ cannot shift the pairing of the rest of the file. A file with a block holding
 *   an odd number of $$ is reported and left untouched.
 * - $$ inside fenced code blocks and `inline code` is ignored.
 * - --apply refuses to run unless the Markdown renderer turns the new delimiters into math.
 *   Today it only recognizes $$…$$ and renders \( as a plain "(", so converting would break
 *   every equation. The dry run always works.
 *
 * Usage:
 *   node scripts/convert_math_delimiters.js [options] [paths...]
 *
 * Options:
 *   --apply              Apply changes (default is dry-run)
 *   -v, --verbose        List every conversion, not just per-file counts
 *   --display-open STR   Opening delimiter for display math (default: "\\[")
 *   --display-close STR  Closing delimiter for display math (default: "\\]")
 *   --inline-open STR    Opening delimiter for inline math (default: "\\(")
 *   --inline-close STR   Closing delimiter for inline math (default: "\\)")
 *   --help               Show this help message
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { createMarkdown } from '../lib/eleventy/markdown.js';
import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';
import { runCli, STANDARD_FLAGS } from './lib/cli.js';
import { getBaseDir, readFile, writeFile } from './lib/files.js';

export const DEFAULT_DELIMITERS = {
  displayOpen: '\\[',
  displayClose: '\\]',
  inlineOpen: '\\(',
  inlineClose: '\\)',
};

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const BLANK = /^\s*$/;
// Lines that start a new paragraph-level unit even without a blank line before them.
// List items, definitions (": …") and headings.
const UNIT_START = /^\s*([-*+:]|\d+[.)])\s+|^\s{0,3}#{1,6}\s/;
const LIST_MARKER = /^\s*([-*+:]|\d+[.)])\s+/;
const CONTAINER_OPEN = /^\s*:{3,}\s*\S/;
const CONTAINER_CLOSE = /^\s*:{3,}\s*$/;
const EQUATION_DIV_OPEN = /<div\b[^>]*class="[^"]*\bequation\b[^"]*"[^>]*>/g;

/**
 * Split content into blocks of consecutive non-blank lines outside fenced code.
 * Each block is { start, end } as character offsets into content, plus its first line number.
 */
function findBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');
  let offset = 0;
  let fence = null;
  let current = null;

  const close = () => {
    if (current) blocks.push(current);
    current = null;
  };

  lines.forEach((line, idx) => {
    const lineStart = offset;
    offset += line.length + 1;

    const fenceMatch = line.match(FENCE);
    if (fence) {
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) {
        fence = null;
      }
      return;
    }
    if (fenceMatch) {
      close();
      fence = fenceMatch[1];
      return;
    }
    if (BLANK.test(line)) {
      close();
      return;
    }
    if (!current) current = { start: lineStart, end: lineStart, line: idx + 1 };
    current.end = lineStart + line.length;
  });
  close();
  return blocks;
}

/** Character ranges of `inline code` spans within text. */
function codeSpanRanges(text) {
  const ranges = [];
  for (const m of text.matchAll(/(`+)[\s\S]*?[^`]\1(?!`)/g)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  return ranges;
}

/** Offsets of every $$ in text that is not inside inline code and not escaped. */
function findDelimiters(text) {
  const code = codeSpanRanges(text);
  const positions = [];
  for (let i = text.indexOf('$$'); i !== -1; i = text.indexOf('$$', i)) {
    let backslashes = 0;
    while (text[i - 1 - backslashes] === '\\') backslashes++;
    const inCode = code.some(([s, e]) => i >= s && i < e);
    if (!inCode && backslashes % 2 === 0) {
      positions.push(i);
      i += 2;
    } else {
      i += 1;
    }
  }
  return positions;
}

/** True if offset in text lies inside an open <div class="equation"> element. */
function insideEquationDiv(text, offset) {
  let lastOpen = -1;
  for (const m of text.slice(0, offset).matchAll(EQUATION_DIV_OPEN)) lastOpen = m.index;
  if (lastOpen === -1) return false;
  return !text.slice(lastOpen, offset).includes('</div>');
}

/**
 * Text of the paragraph or list item containing offset: the lines from the nearest unit start
 * at or before offset up to the next unit start, with any list marker removed.
 */
function enclosingUnit(text, offset) {
  const lines = text.split('\n');
  let pos = 0;
  let unit = [];
  for (const line of lines) {
    const lineEnd = pos + line.length;
    if (UNIT_START.test(line) && unit.length > 0) {
      if (pos > offset) break;
      unit = [];
    }
    unit.push(line);
    pos = lineEnd + 1;
  }
  return unit.join('\n').replace(LIST_MARKER, '').trim();
}

/**
 * Convert the $$…$$ math in one markdown document.
 * @returns {{ content: string, display: number, inline: number, problems: Array<{line, message}>,
 *   changes: Array<{line, kind, from}> }}
 *   On any problem, content is returned unchanged.
 */
export function convertContent(content, delimiters = DEFAULT_DELIMITERS) {
  const { displayOpen, displayClose, inlineOpen, inlineClose } = {
    ...DEFAULT_DELIMITERS,
    ...delimiters,
  };
  const result = { content, display: 0, inline: 0, problems: [], changes: [] };
  const edits = [];

  const blocks = findBlocks(content);
  const blockText = b => (b ? content.slice(b.start, b.end) : '');

  blocks.forEach((block, b) => {
    const text = blockText(block);
    // The renderer keeps a lone $$…$$ inline when its paragraph is the only thing inside a
    // ::: container (e.g. a one-line ::: solution), blank lines or not.
    const onlyChildOfContainer =
      CONTAINER_OPEN.test(
        blockText(blocks[b - 1])
          .split('\n')
          .pop()
      ) && CONTAINER_CLOSE.test(blockText(blocks[b + 1]).split('\n')[0]);

    const positions = findDelimiters(text);
    if (positions.length % 2 !== 0) {
      const last = positions[positions.length - 1];
      const line = block.line + text.slice(0, last).split('\n').length - 1;
      result.problems.push({ line, message: 'unpaired $$ in this paragraph' });
      return;
    }

    for (let p = 0; p < positions.length; p += 2) {
      const open = positions[p];
      const closeEnd = positions[p + 1] + 2;
      const span = text.slice(open, closeEnd);
      const inner = text.slice(open + 2, closeEnd - 2);
      const unit = enclosingUnit(text, open);
      const soleInParagraph = unit === span && !(onlyChildOfContainer && unit === text.trim());
      const display = insideEquationDiv(text, open) || soleInParagraph;

      edits.push({
        start: block.start + open,
        end: block.start + closeEnd,
        replacement: display
          ? `${displayOpen}${inner}${displayClose}`
          : `${inlineOpen}${inner}${inlineClose}`,
      });
      result[display ? 'display' : 'inline']++;
      result.changes.push({
        line: block.line + text.slice(0, open).split('\n').length - 1,
        kind: display ? 'display' : 'inline',
        from: span,
      });
    }
  });

  if (result.problems.length > 0) {
    return { ...result, display: 0, inline: 0, changes: [] };
  }

  let converted = content;
  for (const edit of edits.reverse()) {
    converted = converted.slice(0, edit.start) + edit.replacement + converted.slice(edit.end);
  }
  result.content = converted;
  return result;
}

/**
 * Check that the site's Markdown renderer turns the given delimiters into MathJax math.
 * The probe body uses underscores so it also fails when Markdown emphasis mangles the math.
 * @returns {string[]} - reasons the renderer is not ready (empty when it is)
 */
export function rendererSupports(delimiters = DEFAULT_DELIMITERS, md = createMarkdown()) {
  const { displayOpen, displayClose, inlineOpen, inlineClose } = {
    ...DEFAULT_DELIMITERS,
    ...delimiters,
  };
  const body = 'x_1 + y_1';
  const mathjaxInline = /\\\(\s*x_1 \+ y_1\s*\\\)/;
  const mathjaxDisplay = /\\\[\s*x_1 \+ y_1\s*\\\]/;
  const reasons = [];

  const inlineHtml = md.render(`Text ${inlineOpen}${body}${inlineClose} text.`);
  if (!mathjaxInline.test(inlineHtml)) {
    reasons.push(
      `inline ${inlineOpen}…${inlineClose} renders as ${JSON.stringify(inlineHtml.trim())}`
    );
  }
  const displayHtml = md.render(`${displayOpen}${body}${displayClose}`);
  if (!mathjaxDisplay.test(displayHtml)) {
    reasons.push(
      `display ${displayOpen}…${displayClose} renders as ${JSON.stringify(displayHtml.trim())}`
    );
  }
  return reasons;
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
    this.delimiters = {
      displayOpen: options.displayOpen || DEFAULT_DELIMITERS.displayOpen,
      displayClose: options.displayClose || DEFAULT_DELIMITERS.displayClose,
      inlineOpen: options.inlineOpen || DEFAULT_DELIMITERS.inlineOpen,
      inlineClose: options.inlineClose || DEFAULT_DELIMITERS.inlineClose,
    };
    this.paths = options.paths || ['contents'];

    this.stats = {
      totalFiles: 0,
      modifiedFiles: 0,
      skippedFiles: 0,
      display: 0,
      inline: 0,
    };
  }

  async run() {
    printHeader('🔢', 'Math Delimiter Converter');
    const { displayOpen, displayClose, inlineOpen, inlineClose } = this.delimiters;

    if (this.apply) {
      const reasons = rendererSupports(this.delimiters);
      if (reasons.length > 0) {
        console.error('Refusing to --apply: the Markdown renderer would not render the result');
        console.error('as math, so every converted equation would break on the site.\n');
        for (const reason of reasons) console.error(`  - ${reason}`);
        console.error(
          '\nTeach lib/eleventy/markdown-it-kramdown-math.js these delimiters first, then rerun.'
        );
        return false;
      }
    } else {
      console.log('DRY RUN - no files will be modified. Use --apply to make changes.\n');
    }

    console.log(`Display math: ${displayOpen} ... ${displayClose}`);
    console.log(`Inline math:  ${inlineOpen} ... ${inlineClose}\n`);

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

    for (const filepath of filesToProcess) {
      this.convertFile(filepath);
    }

    this.printResults();
    return this.stats.skippedFiles === 0;
  }

  convertFile(filepath) {
    const relativePath = path.relative(this.baseDir, filepath);
    const result = convertContent(readFile(filepath), this.delimiters);

    if (result.problems.length > 0) {
      console.log(`  ✗ Skipped: ${relativePath}`);
      for (const { line, message } of result.problems) {
        console.log(`      line ${line}: ${message}`);
      }
      this.stats.skippedFiles++;
      return;
    }

    if (result.display + result.inline === 0) return;

    if (this.apply) writeFile(filepath, result.content);
    const verb = this.apply ? '✓ Modified' : 'Would modify';
    console.log(`  ${verb}: ${relativePath} (${result.display} display, ${result.inline} inline)`);
    if (this.verbose) {
      for (const { line, kind, from } of result.changes) {
        const preview = from.replace(/\s+/g, ' ');
        console.log(
          `      line ${line} ${kind}: ${preview.length > 70 ? `${preview.slice(0, 67)}...` : preview}`
        );
      }
    }

    this.stats.modifiedFiles++;
    this.stats.display += result.display;
    this.stats.inline += result.inline;
  }

  printResults() {
    printDivider();

    const { totalFiles, modifiedFiles, skippedFiles, display, inline } = this.stats;
    console.log(`\nTotal files:   ${totalFiles}`);
    console.log(`${this.apply ? 'Modified:     ' : 'Would modify: '} ${modifiedFiles}`);
    console.log(`Display math:  ${display}`);
    console.log(`Inline math:   ${inline}`);
    if (skippedFiles > 0) {
      console.log(`Skipped:       ${skippedFiles} (unpaired $$ - fix these by hand first)`);
    }

    if (skippedFiles === 0) {
      if (modifiedFiles === 0) {
        printSuccess('No changes needed - no $$ math left to convert.');
      } else if (this.apply) {
        printSuccess('Conversion completed!');
      } else {
        console.log('\n⚠️ DRY RUN - Use --apply to apply changes');
      }
    }

    printDivider();
    printSummary(skippedFiles, 0);
  }
}

const FLAGS = {
  apply: STANDARD_FLAGS.apply,
  verbose: STANDARD_FLAGS.verbose,
  displayOpen: {
    flag: '--display-open',
    description: 'Opening delimiter for display math (default: "\\\\[")',
    type: 'string',
    default: DEFAULT_DELIMITERS.displayOpen,
  },
  displayClose: {
    flag: '--display-close',
    description: 'Closing delimiter for display math (default: "\\\\]")',
    type: 'string',
    default: DEFAULT_DELIMITERS.displayClose,
  },
  inlineOpen: {
    flag: '--inline-open',
    description: 'Opening delimiter for inline math (default: "\\\\(")',
    type: 'string',
    default: DEFAULT_DELIMITERS.inlineOpen,
  },
  inlineClose: {
    flag: '--inline-close',
    description: 'Closing delimiter for inline math (default: "\\\\)")',
    type: 'string',
    default: DEFAULT_DELIMITERS.inlineClose,
  },
};

/** Positional path arguments: everything that is neither a flag nor a flag's value. */
function positionalPaths(args) {
  const valueFlags = new Set(
    Object.values(FLAGS)
      .filter(def => def.type === 'string')
      .flatMap(def => [def.flag].flat())
  );
  const paths = [];
  for (let i = 0; i < args.length; i++) {
    if (valueFlags.has(args[i])) i++;
    else if (!args[i].startsWith('-')) paths.push(args[i]);
  }
  return paths;
}

// CLI Configuration — only runs when this file is executed directly, so tests can import the
// conversion functions without triggering the CLI.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  runCli({
    name: 'convert_math_delimiters',
    description: `Convert $$ math $$ delimiters to LaTeX standard delimiters.

Converts:
- Display math (equation divs, or $$…$$ alone in a paragraph): $$ ... $$ → \\[ ... \\]
- Inline math elsewhere: $$ ... $$ → \\( ... \\)

--apply refuses to run until the Markdown renderer supports the new delimiters.`,
    flags: FLAGS,
    examples: [
      'node scripts/convert_math_delimiters.js',
      'node scripts/convert_math_delimiters.js --verbose contents/ch1PhysicsAnIntroduction.md',
      'node scripts/convert_math_delimiters.js --apply',
    ],
    run: async options => {
      const paths = positionalPaths(process.argv.slice(2));
      const converter = new MathDelimiterConverter({
        ...options,
        paths: paths.length > 0 ? paths : ['contents'],
      });
      return converter.run();
    },
  });
}
