/**
 * Shared file utilities for physics book scripts.
 *
 * This module provides consistent file operations across all scripts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';
import { DEFAULT_GLOB_PATTERNS } from './constants.js';

/**
 * Get the base directory of the project.
 * @param {string} importMetaUrl - import.meta.url of the calling script
 * @returns {string} - Base directory path
 */
export function getBaseDir(importMetaUrl) {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = path.dirname(__filename);
  // Go up from scripts/ to project root
  return path.join(__dirname, '..');
}

/**
 * Get the scripts directory.
 * @param {string} importMetaUrl - import.meta.url of the calling script
 * @returns {string} - Scripts directory path
 */
export function getScriptsDir(importMetaUrl) {
  const __filename = fileURLToPath(importMetaUrl);
  return path.dirname(__filename);
}

/**
 * Find markdown files matching a pattern.
 * @param {string} directory - Directory to search
 * @param {Object} options - Options
 * @returns {Promise<string[]>} - Array of file paths
 */
export async function findMarkdownFiles(directory, options = {}) {
  const {
    pattern = DEFAULT_GLOB_PATTERNS.markdown,
    ignore = DEFAULT_GLOB_PATTERNS.ignore,
    absolute = false,
  } = options;

  const fullPattern = `${directory}/${pattern}`;
  const files = await glob(fullPattern, { ignore });

  if (absolute) {
    return files.map(f => path.resolve(f));
  }

  return files;
}

/**
 * Find files with custom glob pattern.
 * @param {string} pattern - Glob pattern
 * @param {Object} options - Options
 * @returns {Promise<string[]>} - Array of file paths
 */
export async function findFiles(pattern, options = {}) {
  const { cwd, ignore = DEFAULT_GLOB_PATTERNS.ignore } = options;

  return glob(pattern, { cwd, ignore });
}

/**
 * Read a file and return its content.
 * @param {string} filePath - Path to file
 * @param {string} encoding - File encoding (default: utf-8)
 * @returns {string} - File content
 */
export function readFile(filePath, encoding = 'utf-8') {
  return fs.readFileSync(filePath, encoding);
}

/**
 * Write content to a file.
 * @param {string} filePath - Path to file
 * @param {string} content - Content to write
 * @param {string} encoding - File encoding (default: utf-8)
 */
export function writeFile(filePath, content, encoding = 'utf-8') {
  fs.writeFileSync(filePath, content, encoding);
}

/**
 * Read a markdown file and parse its front matter.
 * @param {string} filePath - Path to file
 * @returns {Object} - { data: Object, content: string, rawContent: string }
 */
export function readMarkdownFile(filePath) {
  const rawContent = readFile(filePath);
  const { data, content } = matter(rawContent);

  return {
    data,
    content,
    rawContent,
    lines: rawContent.split('\n'),
    fileName: path.basename(filePath),
  };
}

/**
 * Write a markdown file with front matter.
 * @param {string} filePath - Path to file
 * @param {Object} data - Front matter data
 * @param {string} content - Markdown content
 */
export function writeMarkdownFile(filePath, data, content) {
  const output = matter.stringify(content, data);
  writeFile(filePath, output);
}

/**
 * Check if a file exists.
 * @param {string} filePath - Path to file
 * @returns {boolean}
 */
export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Get file info.
 * @param {string} filePath - Path to file
 * @returns {Object} - File information
 */
export function getFileInfo(filePath) {
  const stats = fs.statSync(filePath);
  return {
    path: filePath,
    name: path.basename(filePath),
    extension: path.extname(filePath),
    directory: path.dirname(filePath),
    size: stats.size,
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
  };
}

/**
 * Process files with a callback function.
 * @param {string[]} files - Array of file paths
 * @param {Function} processor - Async function to process each file
 * @param {Object} options - Options
 * @returns {Promise<Object>} - Processing results
 */
export async function processFiles(files, processor, options = {}) {
  const { onProgress } = options;
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await processor(file, i, files.length);
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, files.length, file);
    }
  }

  return results;
}

/**
 * Batch process files and collect issues.
 * @param {string} directory - Directory to process
 * @param {Function} validator - Function to validate each file
 * @param {Object} options - Options
 * @returns {Promise<Object>} - { files: number, errors: Array, warnings: Array }
 */
export async function validateFiles(directory, validator, options = {}) {
  const files = await findMarkdownFiles(directory, options);
  const allErrors = [];
  const allWarnings = [];

  for (const file of files) {
    const { errors = [], warnings = [] } = await validator(file);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
  }

  return {
    files: files.length,
    errors: allErrors,
    warnings: allWarnings,
  };
}

/**
 * Batch process and fix files.
 * @param {string} directory - Directory to process
 * @param {Function} fixer - Function to fix each file
 * @param {Object} options - Options
 * @returns {Promise<Object>} - { files: number, fixes: Array, filesModified: number }
 */
export async function fixFiles(directory, fixer, options = {}) {
  const { apply = false } = options;
  const files = await findMarkdownFiles(directory, options);
  const allFixes = [];
  let filesModified = 0;

  for (const file of files) {
    const { fixes = [], modified = false } = await fixer(file, apply);
    allFixes.push(...fixes);
    if (modified) filesModified++;
  }

  return {
    files: files.length,
    fixes: allFixes,
    filesModified,
    applied: apply,
  };
}
