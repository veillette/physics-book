#!/usr/bin/env python3
"""
Fix subscripts in LaTeX equations by replacing asterisks with underscores within math mode.
"""

import re
import sys
from pathlib import Path


def fix_math_subscripts(content):
    """
    Replace asterisks with underscores within math delimiters.
    Handles both inline math ($...$) and display math ($$...$$).
    """

    def replace_in_math(match):
        """Replace asterisks with underscores in a math expression."""
        math_content = match.group(1)
        # Replace asterisks with underscores
        fixed_content = math_content.replace("*", "_")
        return (
            match.group(0)[0 : match.start(1) - match.start(0)]
            + fixed_content
            + match.group(0)[match.end(1) - match.start(0) :]
        )

    # Process display math ($$...$$) first to avoid conflicts with inline math
    # We need to be careful to match the delimiters properly
    result = content

    # Pattern to match math expressions (both $...$ and $$...$$)
    # We'll process them by finding all math regions and replacing asterisks within them

    # Find all math regions (including nested/escaped dollars)
    # Strategy: Find pairs of $ or $$ and replace asterisks within them

    # First, let's do a simpler approach: replace all instances of *{ with _{
    # and *} patterns that appear in math contexts

    # Actually, let's be more sophisticated and properly parse math regions
    new_content = []
    i = 0
    in_display_math = False
    in_inline_math = False

    while i < len(content):
        # Check for display math delimiter $$
        if i < len(content) - 1 and content[i : i + 2] == "$$":
            if in_display_math:
                # Ending display math
                in_display_math = False
                new_content.append("$$")
                i += 2
            else:
                # Starting display math
                in_display_math = True
                new_content.append("$$")
                i += 2
        # Check for inline math delimiter $
        elif content[i] == "$" and not in_display_math:
            if in_inline_math:
                # Ending inline math
                in_inline_math = False
                new_content.append("$")
                i += 1
            else:
                # Starting inline math
                in_inline_math = True
                new_content.append("$")
                i += 1
        # Replace asterisks with underscores when in math mode
        elif content[i] == "*" and (in_display_math or in_inline_math):
            new_content.append("_")
            i += 1
        else:
            new_content.append(content[i])
            i += 1

    return "".join(new_content)


def process_file(filepath):
    """Process a single markdown file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if file contains any asterisks in math mode (both $ and $$)
        if not re.search(r"\$+[^$]*\*[^$]*\$+", content):
            return 0

        fixed_content = fix_math_subscripts(content)

        if fixed_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(fixed_content)
            # Count the number of replacements
            count = content.count("*") - fixed_content.count("*")
            print(f"Fixed {count} subscripts in {filepath}")
            return count

        return 0
    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)
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

    # Also check the Glossary
    glossary = repo_root / "contents" / "Glossary.md"
    if glossary.exists():
        count = process_file(glossary)
        if count > 0:
            total_fixes += count
            files_modified += 1

    print(f"\nTotal: Fixed {total_fixes} subscripts in {files_modified} files")


if __name__ == "__main__":
    main()
