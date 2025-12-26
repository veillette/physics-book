#!/usr/bin/env python3
"""
Revert incorrect markdown formatting changes (__text__ back to **text**)
that were made by the subscript fix script when it got confused by unmatched
math delimiters.

This script ONLY changes markdown bold formatting, not math equations.
"""

import re
from pathlib import Path


def revert_markdown_bold(content):
    """
    Revert __text__ back to **text** for common section headers and emphasis.
    Only reverts patterns that are clearly markdown formatting, not math.
    """
    # Common section headers that should use **bold**
    headers = [
        "Strategy",
        "Solution",
        "Discussion",
        "Answer",
        "Example",
        "Problem",
        "Note",
        "Warning",
        "Important",
        "Tip",
    ]

    changes = 0
    for header in headers:
        # Match __Header__ or __Header:__ but NOT if it's in math mode
        # Pattern: __Header__ at start of line or after whitespace
        pattern = rf"(^|\s)__({header})__(:|$)"
        replacement = rf"\1**\2**\3"
        new_content, count = re.subn(pattern, replacement, content, flags=re.MULTILINE)
        if count > 0:
            content = new_content
            changes += count

    # Also handle parenthetical sections like __(a)__, __(b)__, etc.
    # Pattern: __(letter)__ or __(text):__
    pattern = r"__((?:\([a-z]\)|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*))__(\s*:)"
    new_content, count = re.subn(pattern, r"**\1**\2", content)
    if count > 0:
        changes += count
        content = new_content

    return content, changes


def process_file(filepath):
    """Process a single markdown file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        fixed_content, changes = revert_markdown_bold(content)

        if changes > 0:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(fixed_content)
            print(f"Reverted {changes} markdown formatting changes in {filepath}")
            return changes

        return 0
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return 0


def main():
    """Main function to process all markdown files."""
    repo_root = Path(__file__).parent
    contents_dir = repo_root / "contents"

    total_fixes = 0
    files_modified = 0

    # Process all markdown files
    for md_file in sorted(contents_dir.glob("*.md")):
        count = process_file(md_file)
        if count > 0:
            total_fixes += count
            files_modified += 1

    print(f"\nTotal: Reverted {total_fixes} changes in {files_modified} files")


if __name__ == "__main__":
    main()
