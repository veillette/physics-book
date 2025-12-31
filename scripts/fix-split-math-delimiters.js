#!/usr/bin/env node
/**
 * Fix split $$ math delimiters that were broken by Prettier
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentsDir = path.join(__dirname, '../contents');

function fixSplitDelimiters(content) {
  let lines = content.split('\n');
  let changeCount = 0;
  let inEquationDiv = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track equation divs
    if (line.includes('<div class="equation"')) {
      inEquationDiv = true;
    }
    if (line.includes('</div>')) {
      inEquationDiv = false;
    }
    
    // Skip if we're in an equation div
    if (inEquationDiv) continue;
    
    // Look for standalone $$ on a line
    if (lines[i].trim() === '$$') {
      // Check if there's a previous line with $$ opening
      // Look backwards for an opening $$
      for (let j = i - 1; j >= Math.max(0, i - 3); j--) {
        const prevLine = lines[j];
        
        // Found an opening $$ without a closing $$
        if (prevLine.includes('$$') && !prevLine.match(/\$\$.*\$\$/)) {
          // Check if $$ is at the end or middle of the line
          const dollarIndex = prevLine.lastIndexOf('$$');
          const afterDollar = prevLine.substring(dollarIndex + 2).trim();
          
          // If there's content after $$, this is likely: text $$ equation
          if (afterDollar.length > 0 && !afterDollar.includes('$$')) {
            // Replace the standalone $$ with joining it to previous line
            lines[j] = prevLine + ' $$';
            lines[i] = ''; // Remove the standalone $$
            changeCount++;
            break;
          }
        }
      }
    }
  }
  
  // Remove empty lines that were standalone $$
  const filtered = lines.filter((line, idx) => {
    // Keep non-empty lines
    if (line.trim() !== '') return true;
    // Keep empty lines that are not the ones we just emptied
    // (i.e., keep original blank lines for formatting)
    // This is a simple heuristic - might need refinement
    return true;
  });
  
  return { content: lines.join('\n'), changes: changeCount };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { content: fixed, changes } = fixSplitDelimiters(content);
  
  if (changes > 0) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return changes;
  }
  return 0;
}

function main() {
  console.log('Fixing split math delimiters in markdown files...\n');
  
  const files = fs.readdirSync(contentsDir)
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
