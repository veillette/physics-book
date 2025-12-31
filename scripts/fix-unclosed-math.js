#!/usr/bin/env node
/**
 * Fix unclosed $$ math delimiters split across lines
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentsDir = path.join(__dirname, '../contents');

function fixUnclosedMath(content) {
  const lines = content.split('\n');
  let changeCount = 0;
  let inEquationDiv = false;
  let i = 0;

  while (i < lines.length - 1) {
    const line = lines[i];

    // Track equation divs
    if (line.includes('<div class="equation"')) {
      inEquationDiv = true;
    }
    if (line.includes('</div>')) {
      inEquationDiv = false;
    }

    // Skip if in equation div
    if (inEquationDiv) {
      i++;
      continue;
    }

    // Count $$ in current line
    const dollarsInLine = (line.match(/\$\$/g) || []).length;

    // If odd number of $$, there's an unclosed delimiter
    if (dollarsInLine % 2 === 1) {
      // Look ahead for the closing $$
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        const nextLine = lines[j];

        // Skip empty lines
        if (nextLine.trim() === '') continue;

        // Check if next line has $$
        if (nextLine.includes('$$')) {
          // Join the lines, preserving content between
          const between = [];
          for (let k = i + 1; k < j; k++) {
            if (lines[k].trim() !== '') {
              between.push(lines[k].trim());
            }
          }

          // Join current line with content and next line
          const joinedParts = [lines[i].trimEnd()];
          if (between.length > 0) {
            joinedParts.push(...between);
          }
          joinedParts.push(nextLine.trim());

          lines[i] = joinedParts.join(' ');

          // Mark intermediate lines for removal
          for (let k = i + 1; k <= j; k++) {
            lines[k] = '';
          }

          changeCount++;
          break;
        }
      }
    }

    i++;
  }

  // Remove empty lines we created
  const filtered = lines.filter(line => line !== '');

  return { content: filtered.join('\n'), changes: changeCount };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { content: fixed, changes } = fixUnclosedMath(content);

  if (changes > 0) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return changes;
  }
  return 0;
}

function main() {
  console.log('Fixing unclosed $$ math delimiters...\n');

  const files = fs
    .readdirSync(contentsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(contentsDir, f));

  let totalChanges = 0;
  let filesChanged = 0;

  files.forEach(file => {
    const changes = processFile(file);
    if (changes > 0) {
      filesChanged++;
      totalChanges += changes;
      console.log(`✓ ${path.basename(file)}: ${changes} fix(es)`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`Files processed: ${files.length}`);
  console.log(`Files changed: ${filesChanged}`);
  console.log(`Total fixes: ${totalChanges}`);
  console.log('='.repeat(60));
}

main();
