#!/usr/bin/env node
/**
 * Script to detect and fix Liquid syntax errors in markdown files.
 * These errors typically occur when LaTeX math expressions contain patterns
 * that look like Liquid variables (e.g., {{v} instead of {{v}}).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LiquidSyntaxFixer {
    constructor() {
        // Pattern to detect math expressions
        this.inlineMathPattern = /\$(?!\$)([^\$]+)\$/g;
        this.blockMathPattern = /\$\$([^\$]+)\$\$/g;
    }

    /**
     * Check for Liquid syntax conflicts in text.
     * Returns array of {lineNumber, issueType, context}.
     */
    checkForLiquidConflicts(text) {
        const issues = [];
        const lines = text.split('\n');

        lines.forEach((line, index) => {
            const lineNum = index + 1;

            // Skip lines that are already wrapped in {% raw %} tags
            if (line.includes('{%') && line.includes('raw')) {
                return;
            }

            // Check if line contains math with potential Liquid conflicts
            if (line.includes('$$') || line.includes('$')) {
                // Check for {{ patterns that might conflict
                if (line.includes('{{')) {
                    // Check if {{ is followed by proper }}
                    let pos = 0;
                    while (true) {
                        pos = line.indexOf('{{', pos);
                        if (pos === -1) break;

                        // Look for closing }}
                        const remaining = line.substring(pos);
                        if (!remaining.match(/\{\{[^}]*\}\}/)) {
                            // Found an improperly closed {{ pattern
                            const context = line.trim();
                            issues.push({
                                lineNumber: lineNum,
                                issueType: '{{...}',
                                context: context
                            });
                        }
                        pos += 1;
                    }
                }
            }
        });

        return issues;
    }

    /**
     * Fix LaTeX math expression that contains Liquid-conflicting syntax.
     * Wraps the expression with {% raw %} tags if needed.
     */
    fixMathExpression(mathContent, delimiter = '$$') {
        // Check if the math contains {{ patterns
        if (!mathContent.includes('{{')) {
            return `${delimiter}${mathContent}${delimiter}`;
        }

        // Check if there are improperly terminated {{ patterns
        let hasLiquidConflict = false;
        let pos = 0;
        while (true) {
            pos = mathContent.indexOf('{{', pos);
            if (pos === -1) break;

            // Look ahead to see if there's a proper closing }}
            const remaining = mathContent.substring(pos);
            // In LaTeX, we might have {{v}_ where the first } closes the inner brace
            // This looks like an incomplete Liquid variable to the parser
            if (!remaining.match(/\{\{[^}]*\}\}/)) {
                hasLiquidConflict = true;
                break;
            }
            pos += 1;
        }

        if (hasLiquidConflict) {
            // Wrap with raw tags
            return `{% raw %}${delimiter}${mathContent}${delimiter}{% endraw %}`;
        }

        return `${delimiter}${mathContent}${delimiter}`;
    }

    /**
     * Fix Liquid syntax errors in a file.
     * Returns {wasModified, changes}.
     */
    fixFile(filepath, dryRun = false) {
        let content;
        try {
            content = fs.readFileSync(filepath, 'utf-8');
        } catch (error) {
            return {
                wasModified: false,
                changes: [`Error reading file: ${error.message}`]
            };
        }

        const originalContent = content;
        const changes = [];

        // First, check for issues
        const issues = this.checkForLiquidConflicts(content);
        if (issues.length === 0) {
            return {
                wasModified: false,
                changes: ['No issues found']
            };
        }

        // Process line by line to avoid processing already-wrapped content
        const lines = content.split('\n');
        const fixedLines = [];

        lines.forEach(line => {
            // Skip lines that are already wrapped in raw tags
            if (line.includes('{%') && line.includes('raw')) {
                fixedLines.push(line);
                return;
            }

            // Check for block math ($$...$$)
            if (line.includes('$$')) {
                // Find all block math expressions in the line
                line = line.replace(this.blockMathPattern, (match, mathContent) => {
                    const fixed = this.fixMathExpression(mathContent, '$$');
                    if (fixed !== `$$${mathContent}$$`) {
                        changes.push('Wrapped block math with raw tags');
                    }
                    return fixed;
                });
            } else if (line.includes('$')) {
                // Process inline math only if no block math on this line
                line = line.replace(this.inlineMathPattern, (match, mathContent) => {
                    const fixed = this.fixMathExpression(mathContent, '$');
                    if (fixed !== `$${mathContent}$`) {
                        changes.push('Wrapped inline math with raw tags');
                    }
                    return fixed;
                });
            }

            fixedLines.push(line);
        });

        content = fixedLines.join('\n');

        const wasModified = content !== originalContent;

        if (wasModified && !dryRun) {
            fs.writeFileSync(filepath, content, 'utf-8');
            changes.push(`File updated: ${filepath}`);
        }

        return { wasModified, changes };
    }

    /**
     * Check a file for Liquid syntax issues without fixing.
     */
    checkFile(filepath) {
        try {
            const content = fs.readFileSync(filepath, 'utf-8');
            return this.checkForLiquidConflicts(content);
        } catch (error) {
            console.error(`Error reading ${filepath}: ${error.message}`);
            return [];
        }
    }
}

async function main() {
    const args = process.argv.slice(2);

    // Parse arguments
    const checkOnly = args.includes('--check-only');
    const dryRun = args.includes('--dry-run');
    const fileArgs = args.filter(arg => !arg.startsWith('--'));

    const fixer = new LiquidSyntaxFixer();

    // Determine which files to process
    let files;
    if (fileArgs.length > 0) {
        files = fileArgs;
    } else {
        // Default to all .md files in contents/
        const contentsDir = path.join(__dirname, '..', 'contents');
        try {
            const allFiles = fs.readdirSync(contentsDir);
            files = allFiles
                .filter(file => file.endsWith('.md'))
                .map(file => path.join(contentsDir, file))
                .sort();
        } catch (error) {
            console.error('Error finding markdown files:', error.message);
            process.exit(1);
        }
    }

    let totalIssues = 0;
    const filesWithIssues = [];

    for (const filepath of files) {
        if (!fs.existsSync(filepath)) {
            console.error(`File not found: ${filepath}`);
            continue;
        }

        if (checkOnly) {
            const issues = fixer.checkFile(filepath);
            if (issues.length > 0) {
                filesWithIssues.push(filepath);
                console.log(`\n${filepath}:`);
                issues.forEach(issue => {
                    console.log(`  Line ${issue.lineNumber}: ${issue.issueType}`);
                    const contextPreview = issue.context.length > 100
                        ? issue.context.substring(0, 100) + '...'
                        : issue.context;
                    console.log(`    ${contextPreview}`);
                    totalIssues++;
                });
            }
        } else {
            const { wasModified, changes } = fixer.fixFile(filepath, dryRun);
            if (wasModified) {
                filesWithIssues.push(filepath);
                const mode = dryRun ? 'Would fix' : 'Fixed';
                console.log(`${mode}: ${filepath}`);
                changes.forEach(change => {
                    console.log(`  - ${change}`);
                });
                totalIssues += changes.length;
            }
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    if (checkOnly) {
        console.log(`Found ${totalIssues} issue(s) in ${filesWithIssues.length} file(s)`);
        if (filesWithIssues.length > 0) {
            process.exit(1);
        }
    } else {
        const mode = dryRun ? 'would be modified' : 'modified';
        console.log(`${filesWithIssues.length} file(s) ${mode}`);
        if (!dryRun && filesWithIssues.length > 0) {
            console.log('Files have been fixed!');
        }
    }

    process.exit(filesWithIssues.length > 0 && checkOnly ? 1 : 0);
}

// Show help if --help is passed
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Liquid Syntax Error Fixer

Usage: node fix_liquid_syntax_errors.js [options] [files...]

Options:
  --check-only    Only check for issues without fixing
  --dry-run       Show what would be changed without modifying files
  --help, -h      Show this help message

Examples:
  node fix_liquid_syntax_errors.js --check-only
  node fix_liquid_syntax_errors.js --dry-run
  node fix_liquid_syntax_errors.js contents/ch13KineticTheory.md
  node fix_liquid_syntax_errors.js

If no files are specified, all .md files in contents/ will be processed.
    `);
    process.exit(0);
}

main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
