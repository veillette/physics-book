/**
 * Shared parsing utilities for physics book scripts.
 *
 * This module provides common parsing functions used across
 * validation and fixing scripts.
 */

/**
 * Tracks the state of content parsing (code blocks, math blocks, front matter).
 */
export class ContentParser {
  constructor() {
    this.reset();
  }

  /**
   * Reset parser state for a new file.
   */
  reset() {
    this.inCodeBlock = false;
    this.inMathBlock = false;
    this.inFrontMatter = false;
    this.frontMatterEnded = false;
  }

  /**
   * Process a line and update parser state.
   * @param {string} line - The line to process
   * @returns {Object} - { isContent: boolean, state: Object }
   */
  processLine(line) {
    const trimmedLine = line.trim();

    // Track front matter (--- delimiters)
    if (trimmedLine === '---') {
      if (!this.frontMatterEnded) {
        this.inFrontMatter = !this.inFrontMatter;
        if (!this.inFrontMatter) {
          this.frontMatterEnded = true;
        }
      }
      return {
        isContent: false,
        isFrontMatterDelimiter: true,
        state: this.getState(),
      };
    }

    // Inside front matter - not content
    if (this.inFrontMatter) {
      return {
        isContent: false,
        isFrontMatter: true,
        state: this.getState(),
      };
    }

    // Track code blocks (``` or ~~~)
    if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
      this.inCodeBlock = !this.inCodeBlock;
      return {
        isContent: false,
        isCodeBlockDelimiter: true,
        state: this.getState(),
      };
    }

    // Inside code block - not content for validation
    if (this.inCodeBlock) {
      return {
        isContent: false,
        isCodeBlock: true,
        state: this.getState(),
      };
    }

    // Track display math blocks ($$)
    if (trimmedLine.startsWith('$$')) {
      this.inMathBlock = !this.inMathBlock;
      return {
        isContent: false,
        isMathBlockDelimiter: true,
        state: this.getState(),
      };
    }

    // Inside math block
    if (this.inMathBlock) {
      return {
        isContent: false,
        isMathBlock: true,
        state: this.getState(),
      };
    }

    // Regular content line
    return {
      isContent: true,
      state: this.getState(),
    };
  }

  /**
   * Get the current parser state.
   * @returns {Object} - Current state
   */
  getState() {
    return {
      inCodeBlock: this.inCodeBlock,
      inMathBlock: this.inMathBlock,
      inFrontMatter: this.inFrontMatter,
      frontMatterEnded: this.frontMatterEnded,
    };
  }

  /**
   * Check if currently inside any block that should skip content validation.
   * @returns {boolean}
   */
  shouldSkipValidation() {
    return this.inCodeBlock || this.inMathBlock || this.inFrontMatter;
  }
}

/**
 * Get code block ranges in content.
 * @param {string} content - File content
 * @returns {Array<{start: number, end: number}>} - Array of line number ranges
 */
export function getCodeBlockRanges(content) {
  const lines = content.split('\n');
  const ranges = [];
  let inCodeBlock = false;
  let codeBlockStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().match(/^```|^~~~/)) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockStart = i + 1; // Line numbers are 1-based
      } else {
        inCodeBlock = false;
        ranges.push({ start: codeBlockStart, end: i + 1 });
      }
    }
  }

  // Handle unclosed code block
  if (inCodeBlock) {
    ranges.push({ start: codeBlockStart, end: lines.length });
  }

  return ranges;
}

/**
 * Check if a line number is inside any code block.
 * @param {number} lineNum - Line number (1-based)
 * @param {Array<{start: number, end: number}>} codeBlockRanges - Code block ranges
 * @returns {boolean}
 */
export function isInsideCodeBlock(lineNum, codeBlockRanges) {
  return codeBlockRanges.some(range => lineNum >= range.start && lineNum <= range.end);
}

/**
 * Get line number from content index.
 * @param {string} content - Full content
 * @param {number} index - Character index
 * @returns {number} - Line number (1-based)
 */
export function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

/**
 * Count unescaped occurrences of a character in a string.
 * @param {string} text - Text to search
 * @param {string} char - Character to count
 * @returns {number} - Count of unescaped occurrences
 */
export function countUnescaped(text, char) {
  let count = 0;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\\' && !escaped) {
      escaped = true;
      continue;
    }

    if (text[i] === char && !escaped) {
      count++;
    }

    escaped = false;
  }

  return count;
}

/**
 * Check if braces are balanced in LaTeX content.
 * @param {string} content - LaTeX content
 * @returns {Object} - { balanced: boolean, count: number }
 */
export function checkBraceBalance(content) {
  let braceCount = 0;
  let escaped = false;

  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\\' && !escaped) {
      escaped = true;
      continue;
    }

    if (!escaped) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
    }

    escaped = false;
  }

  return {
    balanced: braceCount === 0,
    count: braceCount,
  };
}

/**
 * Extract inline math expressions from a line.
 * @param {string} line - Text line
 * @returns {Array<{content: string, start: number, end: number}>}
 */
export function extractInlineMath(line) {
  const expressions = [];
  const regex = /\$([^$]+)\$/g;
  let match;

  while ((match = regex.exec(line)) !== null) {
    expressions.push({
      content: match[1],
      fullMatch: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return expressions;
}

/**
 * Check if a line is an image markdown line.
 * @param {string} line - Text line
 * @returns {boolean}
 */
export function isImageLine(line) {
  return line.trim().startsWith('![');
}

/**
 * Check if a line contains URL patterns.
 * @param {string} line - Text line
 * @returns {boolean}
 */
export function hasUrl(line) {
  return /https?:\/\//.test(line);
}

/**
 * Check if a line contains LaTeX commands that should skip certain validations.
 * @param {string} line - Text line
 * @returns {boolean}
 */
export function hasLatexCommands(line) {
  return /\\(text|mathrm|frac|sqrt|begin)/.test(line);
}

/**
 * Parse a heading line.
 * @param {string} line - Text line
 * @returns {Object|null} - { level: number, text: string } or null
 */
export function parseHeading(line) {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  if (match) {
    return {
      level: match[1].length,
      text: match[2].trim(),
    };
  }
  return null;
}

/**
 * Create an issue/error object with consistent structure.
 * @param {Object} options - Issue options
 * @returns {Object} - Structured issue object
 */
export function createIssue({ file, line, message, text, code, severity = 'error' }) {
  const issue = {
    file,
    line,
    message,
    severity,
  };

  if (text) {
    issue.text = text.substring(0, 80);
  }

  if (code) {
    issue.code = code;
  }

  return issue;
}
