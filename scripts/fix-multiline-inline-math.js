#!/usr/bin/env node
/**
 * Fix multi-line inline math expressions split by Prettier
 * 
 * Pattern:
 *   text $$equation_start
 *   equation_end$$
 * 
 * Should be:
 *   text $$equation_start equation_end$$
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentsDir = path.join(__dirname, '../contents');

function fixMultilineInlineMath(content) {
  const lines = content.split('\n');
  let changeCount = 0;
  let inEquationDiv = false;
  
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    
    // Track equation divs
    if (line.includes('<div class="equation"')) {
      inEquationDiv = true;
    }
    if (line.includes('</div>')) {
      inEquationDiv = false;
    }
    
    // Skip if in equation div
    if (inEquationDiv) continue;
    
    // Check for: line ends with $$ followed by non-$$ content
    // and next line has content ending with $$
    const endsWithDoubleDollar = /\$\$\s*$/.test(line);
    const nextStartsWithNonDollar = /^[^\$]/.test(nextLine.trim());
    const nextEndsWithDoubleDollar = /\$\$/.test(nextLine);
    
    if (endsWithDoubleDollar && nextStartsWithNonDollar && nextEndsWithDoubleDollar) {
      // Check if the $$ on current line is an opening (not a closing)
      const dollarsBeforeEnd = (line.match(/\$\$/g) || []).length;
      
      // If odd number of $$, the last one is an opening
      if (dollarsBeforeEnd % 2 === 1) {
        // Join the lines
        lines[i] = line.trimEnd() + ' ' + nextLine.trim();
        lines[i + 1] = ''; // Mark for removal
        changeCount++;
      }
    }
  }
  
  // Remove empty lines we created
  const filtered = lines.filter(line => line !== '');
  
  return { content: filtered.join('\n'), changes: changeCount };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { content: fixed, changes } = fixMultilineInlineMath(content);
  
  if (changes > 0) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return changes;
  }
  return 0;
}

function main() {
  console.log('Fixing multi-line inline math expressions...\n');
  
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
