#!/usr/bin/env python3
"""
Convert math delimiters from $$ ... $$ to standard LaTeX delimiters.

- Display math (inside <div class="equation">): $$ ... $$ → \[ ... \]
- Inline math (elsewhere): $$ ... $$ → \( ... \)
"""

import re
import sys
from pathlib import Path


def convert_display_math_in_equation_div(content: str) -> str:
    """Convert $$ ... $$ inside <div class="equation"> to \[ ... \]"""
    # Pattern to match equation divs with $$ content $$
    # This handles multiline content within the div
    pattern = r'(<div class="equation"[^>]*>)\s*\$\$\s*(.*?)\s*\$\$\s*(</div>)'

    def replace_display(match):
        opening_tag = match.group(1)
        math_content = match.group(2)
        closing_tag = match.group(3)
        return f'{opening_tag}\n\\[ {math_content} \\]\n{closing_tag}'

    return re.sub(pattern, replace_display, content, flags=re.DOTALL)


def convert_inline_math(content: str) -> str:
    """Convert remaining $$ ... $$ (inline math) to \( ... \)"""
    # Match $$ ... $$ that are NOT inside equation divs
    # These are typically on a single line or span short segments
    pattern = r'\$\$\s*(.*?)\s*\$\$'

    def replace_inline(match):
        math_content = match.group(1)
        return f'\\( {math_content} \\)'

    return re.sub(pattern, replace_inline, content, flags=re.DOTALL)


def convert_file(filepath: Path, dry_run: bool = True) -> tuple[bool, str]:
    """
    Convert math delimiters in a single file.

    Returns:
        (changed, message) - whether the file was changed and a status message
    """
    content = filepath.read_text(encoding='utf-8')
    original = content

    # First convert display math in equation divs
    content = convert_display_math_in_equation_div(content)

    # Then convert remaining inline math
    content = convert_inline_math(content)

    if content == original:
        return False, f"No changes: {filepath}"

    if dry_run:
        return True, f"Would modify: {filepath}"
    else:
        filepath.write_text(content, encoding='utf-8')
        return True, f"Modified: {filepath}"


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='Convert $$ math $$ delimiters to LaTeX \\[ \\] and \\( \\)'
    )
    parser.add_argument(
        'paths',
        nargs='*',
        default=['contents'],
        help='Files or directories to process (default: contents/)'
    )
    parser.add_argument(
        '--apply',
        action='store_true',
        help='Actually apply changes (default is dry-run)'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Show all files, not just modified ones'
    )

    args = parser.parse_args()

    dry_run = not args.apply

    if dry_run:
        print("DRY RUN - no files will be modified. Use --apply to make changes.\n")

    files_to_process = []
    for path_str in args.paths:
        path = Path(path_str)
        if path.is_file():
            files_to_process.append(path)
        elif path.is_dir():
            files_to_process.extend(path.glob('**/*.md'))
        else:
            print(f"Warning: {path} does not exist", file=sys.stderr)

    modified_count = 0
    for filepath in sorted(files_to_process):
        changed, message = convert_file(filepath, dry_run=dry_run)
        if changed:
            modified_count += 1
            print(message)
        elif args.verbose:
            print(message)

    print(f"\n{'Would modify' if dry_run else 'Modified'}: {modified_count} files")


if __name__ == '__main__':
    main()
