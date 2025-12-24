#!/usr/bin/env node

/**
 * Equation Auto-Fix Script
 *
 * Automatically fixes common equation issues:
 * - Standalone $$ delimiters (merges broken inline math)
 * - Removes empty inline math blocks
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

class EquationFixer {
  constructor(options = {}) {
    this.apply = options.apply || false;
    this.fixes = [];
    this.filesModified = 0;
  }

  async fix(directory = 'contents') {
    console.log(chalk.blue.bold('📐 Equation Auto-Fix'));
    console.log(chalk.gray('─'.repeat(60)));

    if (!this.apply) {
      console.log(chalk.yellow('DRY RUN MODE - No files will be modified'));
      console.log(chalk.gray('Use --apply to actually fix files\n'));
    }

    const files = await glob(`${directory}/**/*.md`);
    console.log(chalk.gray(`Found ${files.length} markdown files\n`));

    for (const file of files) {
      await this.fixFile(file);
    }

    this.printResults();
    return true;
  }

  async fixFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: bodyContent } = matter(content);
    const lines = bodyContent.split('\n');
    const fileName = path.basename(filePath);

    let modified = false;
    let inCodeBlock = false;

    const newLines = [];
    let i = 0;

    while (i < lines.length) {
      let line = lines[i];

      // Track code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        newLines.push(line);
        i++;
        continue;
      }

      if (inCodeBlock) {
        newLines.push(line);
        i++;
        continue;
      }

      // Fix standalone $$ delimiter (broken inline math)
      if (line.trim() === '$$' && i > 0 && i < lines.length - 1) {
        const prevLine = lines[i - 1];
        const nextLine = lines[i + 1];

        // Check if this is inline math broken across lines
        // Pattern: "text $$ formula" on prev line, "$$" standalone, "more text" on next line
        // OR: "text" on prev line, "$$" standalone, "$$" on next (closing delimiter)
        const shouldMerge = (
          // Case 1: Opening delimiter on prev line
          (prevLine.includes('$$') && !prevLine.trim().startsWith('$$') &&
           !prevLine.trim().startsWith('<div class="equation">')) ||
          // Case 2: Both prev and next lines are short and this looks like a delimiter
          (prevLine.trim().length > 0 && nextLine.trim().length > 0 &&
           prevLine.trim().length < 100 && !prevLine.trim().startsWith('#'))
        );

        if (shouldMerge) {
          // Count $$ on previous line to determine if this is opening or closing
          const prevDollarCount = (prevLine.match(/\$\$/g) || []).length;

          // If odd number of $$ on prev line, this is a closing delimiter
          if (prevDollarCount % 2 === 1) {
            // Merge: prevLine + $$ + space + nextLine
            const mergedLine = `${prevLine.trimEnd()}$$ ${nextLine.trimStart()}`;

            // Remove the last line we added (it was prevLine)
            newLines.pop();

            // Add merged line
            newLines.push(mergedLine);

            modified = true;
            this.fixes.push({
              file: fileName,
              line: i,
              type: 'Merged broken inline math',
              before: `${prevLine}\\n$$\\n${nextLine}`,
              after: mergedLine
            });

            // Skip the next line (already merged)
            i += 2;
            continue;
          }
        }
      }

      // Fix empty inline math and extra spaces
      let fixedLine = line;

      // Remove empty inline math $$ $$
      fixedLine = fixedLine.replace(/\$\$\s*\$\$/g, '');

      if (fixedLine !== line) {
        modified = true;
        const changeType = line.includes('$$ $$')
          ? 'Removed empty inline math'
          : 'Fixed math spacing';

        this.fixes.push({
          file: fileName,
          line: i + 1,
          type: changeType,
          before: line.trim(),
          after: fixedLine.trim()
        });
        newLines.push(fixedLine);
      } else {
        newLines.push(line);
      }

      i++;
    }

    if (modified) {
      this.filesModified++;
      if (this.apply) {
        // Reconstruct with front matter
        const newContent = matter.stringify(newLines.join('\n'), data);
        fs.writeFileSync(filePath, newContent, 'utf-8');
      }
    }
  }

  printResults() {
    console.log(chalk.gray('─'.repeat(60)));

    if (this.fixes.length === 0) {
      console.log(chalk.green('\n✅ No fixes needed - equations are clean!'));
    } else {
      console.log(chalk.cyan.bold(`\n🔧 Fixes Applied: ${this.fixes.length}`));
      console.log(chalk.gray(`Files Modified: ${this.filesModified}\n`));

      // Group fixes by type
      const byType = {};
      this.fixes.forEach(fix => {
        if (!byType[fix.type]) byType[fix.type] = [];
        byType[fix.type].push(fix);
      });

      Object.entries(byType).forEach(([type, fixes]) => {
        console.log(chalk.cyan(`\n  ${type}: ${fixes.length}`));
        fixes.slice(0, 5).forEach(fix => {
          console.log(chalk.yellow(`    ${fix.file}:${fix.line}`));
          if (fix.type === 'Merged broken inline math') {
            console.log(chalk.gray(`      Merged 3 lines into 1`));
          } else {
            console.log(chalk.red(`      - ${fix.before.substring(0, 60)}`));
            console.log(chalk.green(`      + ${fix.after.substring(0, 60)}`));
          }
        });
        if (fixes.length > 5) {
          console.log(chalk.gray(`    ... and ${fixes.length - 5} more`));
        }
      });

      if (!this.apply) {
        console.log(chalk.yellow('\n⚠️  DRY RUN - No files were actually modified'));
        console.log(chalk.gray('Run with --apply to apply these fixes'));
      } else {
        console.log(chalk.green('\n✅ Fixes have been applied to files'));
      }
    }

    console.log(chalk.gray('\n' + '─'.repeat(60)));
  }
}

// CLI
const args = process.argv.slice(2);
const options = {
  apply: args.includes('--apply')
};

const directory = args.find(arg => !arg.startsWith('--')) || 'contents';

const fixer = new EquationFixer(options);
fixer.fix(directory).then(success => {
  process.exit(success ? 0 : 1);
});
