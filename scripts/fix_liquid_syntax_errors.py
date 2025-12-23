#!/usr/bin/env python3
"""
Script to detect and fix Liquid syntax errors in markdown files.
These errors typically occur when LaTeX math expressions contain patterns
that look like Liquid variables (e.g., {{v} instead of {{v}}).
"""

import re
import sys
from pathlib import Path
from typing import List, Tuple


class LiquidSyntaxFixer:
    def __init__(self):
        # Pattern to detect improperly terminated Liquid-like variables in math
        # Matches {{ followed by content without proper }}
        self.liquid_var_pattern = re.compile(r'\{\{(?![^}]*\}\})')

        # Pattern to detect math expressions (both inline and block)
        self.inline_math_pattern = re.compile(r'\$(?!\$)([^\$]+)\$')
        self.block_math_pattern = re.compile(r'\$\$([^\$]+)\$\$', re.DOTALL)

        # Pattern to check if content is already wrapped in raw tags
        self.raw_wrapped_pattern = re.compile(r'\{%\s*raw\s*%\}.*?\{%\s*endraw\s*%\}', re.DOTALL)

    def check_for_liquid_conflicts(self, text: str) -> List[Tuple[int, str, str]]:
        """
        Check for Liquid syntax conflicts in text.
        Returns list of (line_number, problematic_text, context).
        """
        issues = []
        lines = text.split('\n')

        for line_num, line in enumerate(lines, 1):
            # Skip lines that are already wrapped in {% raw %} tags
            if '{%' in line and 'raw' in line:
                continue

            # Check if line contains math with potential Liquid conflicts
            if '$$' in line or '$' in line:
                # Check for {{ patterns that might conflict
                if '{{' in line:
                    # Check if {{ is followed by proper }}
                    pos = 0
                    while True:
                        pos = line.find('{{', pos)
                        if pos == -1:
                            break

                        # Look for closing }}
                        remaining = line[pos:]
                        if not re.search(r'\{\{[^}]*\}\}', remaining):
                            # Found an improperly closed {{ pattern
                            context = line.strip()
                            issues.append((line_num, '{{...}', context))
                        pos += 1

        return issues

    def fix_math_expression(self, math_content: str, delimiter: str = "$$") -> str:
        """
        Fix LaTeX math expression that contains Liquid-conflicting syntax.
        Wraps the expression with {% raw %} tags if needed.
        """
        # Check if the math contains {{ patterns
        if '{{' not in math_content:
            return f"{delimiter}{math_content}{delimiter}"

        # Check if there are improperly terminated {{ patterns
        has_liquid_conflict = False
        pos = 0
        while True:
            pos = math_content.find('{{', pos)
            if pos == -1:
                break

            # Look ahead to see if there's a proper closing }}
            remaining = math_content[pos:]
            # In LaTeX, we might have {{v}_ where the first } closes the inner brace
            # This looks like an incomplete Liquid variable to the parser
            if not re.search(r'\{\{[^}]*\}\}', remaining):
                has_liquid_conflict = True
                break
            pos += 1

        if has_liquid_conflict:
            # Wrap with raw tags
            return f"{{% raw %}}{delimiter}{math_content}{delimiter}{{% endraw %}}"

        return f"{delimiter}{math_content}{delimiter}"

    def fix_file(self, filepath: Path, dry_run: bool = False) -> Tuple[bool, List[str]]:
        """
        Fix Liquid syntax errors in a file.
        Returns (was_modified, list_of_changes).
        """
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            return False, [f"Error reading file: {e}"]

        original_content = content
        changes = []

        # First, check for issues
        issues = self.check_for_liquid_conflicts(content)
        if not issues:
            return False, ["No issues found"]

        # Process line by line to avoid processing already-wrapped content
        lines = content.split('\n')
        fixed_lines = []

        for line in lines:
            # Skip lines that are already wrapped in raw tags
            if '{%' in line and 'raw' in line:
                fixed_lines.append(line)
                continue

            # Check for block math ($$...$$)
            if '$$' in line:
                # Find all block math expressions in the line
                def fix_block_math(match):
                    math_content = match.group(1)
                    fixed = self.fix_math_expression(math_content, delimiter="$$")
                    if fixed != f"$${math_content}$$":
                        changes.append(f"Wrapped block math with raw tags")
                    return fixed

                line = self.block_math_pattern.sub(fix_block_math, line)
            elif '$' in line:
                # Process inline math only if no block math on this line
                def fix_inline_math(match):
                    math_content = match.group(1)
                    fixed = self.fix_math_expression(math_content, delimiter="$")
                    if fixed != f"${math_content}$":
                        changes.append(f"Wrapped inline math with raw tags")
                    return fixed

                line = self.inline_math_pattern.sub(fix_inline_math, line)

            fixed_lines.append(line)

        content = '\n'.join(fixed_lines)

        was_modified = content != original_content

        if was_modified and not dry_run:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            changes.append(f"File updated: {filepath}")

        return was_modified, changes

    def check_file(self, filepath: Path) -> List[Tuple[int, str, str]]:
        """Check a file for Liquid syntax issues without fixing."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            return self.check_for_liquid_conflicts(content)
        except Exception as e:
            print(f"Error reading {filepath}: {e}", file=sys.stderr)
            return []


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='Detect and fix Liquid syntax errors in markdown files'
    )
    parser.add_argument(
        'files',
        nargs='*',
        help='Files to check/fix. If not provided, checks all .md files in contents/'
    )
    parser.add_argument(
        '--check-only',
        action='store_true',
        help='Only check for issues without fixing'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Show what would be changed without modifying files'
    )

    args = parser.parse_args()

    fixer = LiquidSyntaxFixer()

    # Determine which files to process
    if args.files:
        files = [Path(f) for f in args.files]
    else:
        contents_dir = Path(__file__).parent.parent / 'contents'
        files = sorted(contents_dir.glob('*.md'))

    total_issues = 0
    files_with_issues = []

    for filepath in files:
        if not filepath.exists():
            print(f"File not found: {filepath}", file=sys.stderr)
            continue

        if args.check_only:
            issues = fixer.check_file(filepath)
            if issues:
                files_with_issues.append(filepath)
                print(f"\n{filepath}:")
                for line_num, issue_type, context in issues:
                    print(f"  Line {line_num}: {issue_type}")
                    print(f"    {context[:100]}{'...' if len(context) > 100 else ''}")
                    total_issues += 1
        else:
            was_modified, changes = fixer.fix_file(filepath, dry_run=args.dry_run)
            if was_modified:
                files_with_issues.append(filepath)
                mode = "Would fix" if args.dry_run else "Fixed"
                print(f"{mode}: {filepath}")
                for change in changes:
                    print(f"  - {change}")
                total_issues += len(changes)

    # Summary
    print(f"\n{'=' * 60}")
    if args.check_only:
        print(f"Found {total_issues} issue(s) in {len(files_with_issues)} file(s)")
        if files_with_issues:
            sys.exit(1)
    else:
        mode = "would be modified" if args.dry_run else "modified"
        print(f"{len(files_with_issues)} file(s) {mode}")
        if not args.dry_run and files_with_issues:
            print("Files have been fixed!")

    sys.exit(0 if not files_with_issues or not args.check_only else 1)


if __name__ == '__main__':
    main()
