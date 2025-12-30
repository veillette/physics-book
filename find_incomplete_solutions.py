#!/usr/bin/env python3
"""
Find incomplete solutions in physics book markdown files.
A solution is considered incomplete if it's missing Strategy, Solution, or Discussion sections.

Usage:
    python find_incomplete_solutions.py              # Analyze all chapters (1-34)
    python find_incomplete_solutions.py 16 17 18     # Analyze specific chapters
    python find_incomplete_solutions.py --range 1-10 # Analyze chapter range
    python find_incomplete_solutions.py --range 1-6 --range 20-25  # Multiple ranges
"""

import argparse
import re
from pathlib import Path


def parse_chapter_range(range_str):
    """Parse a range string like '1-10' into a list of chapter numbers."""
    if '-' in range_str:
        start, end = range_str.split('-', 1)
        return list(range(int(start), int(end) + 1))
    else:
        return [int(range_str)]


def find_incomplete_solutions(chapter_numbers, contents_dir):
    """Find all problems with incomplete solutions in specified chapters."""

    chapter_stats = {}
    all_problems = []

    for chapter_num in sorted(set(chapter_numbers)):
        # Find all files for this chapter
        # Use regex to match exact chapter number (ch1 should not match ch10, ch11, etc.)
        chapter_pattern = re.compile(rf'^ch{chapter_num}[A-Z].*\.md$')
        chapter_files = sorted(
            f for f in contents_dir.glob(f"ch{chapter_num}*.md")
            if chapter_pattern.match(f.name)
        )

        if not chapter_files:
            continue

        print(f"\n{'='*60}")
        print(f"CHAPTER {chapter_num}")
        print(f"{'='*60}")

        total_problems = 0
        total_incomplete = 0

        for filepath in chapter_files:
            filename = filepath.name

            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find the Problems & Exercises section (handle both &amp; and &)
            problems_match = re.search(
                r'###\s+Problems\s+(?:&amp;|&)\s+Exercises(.*?)(?=###|\Z)',
                content,
                re.DOTALL | re.IGNORECASE
            )

            if not problems_match:
                continue

            problems_section = problems_match.group(1)

            # Find all exercise blocks
            pos = 0
            problem_num = 0
            incomplete_problems = []

            while True:
                exercise_start = re.search(
                    r'<div class="exercise"[^>]*data-element-type="problems-exercises"[^>]*>',
                    problems_section[pos:]
                )

                if not exercise_start:
                    break

                start_idx = pos + exercise_start.end()

                # Find the matching closing div by counting div tags
                div_count = 1
                end_idx = start_idx

                while div_count > 0 and end_idx < len(problems_section):
                    if problems_section[end_idx:end_idx+5] == '<div ':
                        div_count += 1
                        end_idx += 5
                    elif problems_section[end_idx:end_idx+6] == '</div>':
                        div_count -= 1
                        end_idx += 6
                    else:
                        end_idx += 1

                exercise_content = problems_section[start_idx:end_idx]

                # Extract problem text
                problem_match = re.search(
                    r'<div class="problem"[^>]*>(.*?)</div>',
                    exercise_content,
                    re.DOTALL
                )

                if problem_match:
                    problem_num += 1
                    total_problems += 1
                    problem_text = problem_match.group(1).strip()
                    # Strip HTML tags for preview
                    problem_preview = re.sub(r'<[^>]+>', '', problem_text)[:80].strip()

                    # Check for solution
                    solution_match = re.search(
                        r'<div class="solution"[^>]*>(.*?)</div>',
                        exercise_content,
                        re.DOTALL
                    )

                    has_strategy = False
                    has_solution_marker = False
                    has_discussion = False

                    if solution_match:
                        solution_text = solution_match.group(1)

                        # Check for required sections
                        has_strategy = bool(re.search(r'\*\*Strategy\*\*', solution_text, re.IGNORECASE))
                        has_solution_marker = bool(re.search(r'\*\*Solution\*\*', solution_text, re.IGNORECASE))
                        has_discussion = bool(re.search(r'\*\*Discussion\*\*', solution_text, re.IGNORECASE))

                    # Build missing sections list
                    missing = []
                    if not has_strategy:
                        missing.append("no Strategy")
                    if not has_solution_marker:
                        missing.append("no Solution")
                    if not has_discussion:
                        missing.append("no Discussion")

                    if missing:
                        incomplete_problems.append({
                            'file': filename,
                            'chapter': chapter_num,
                            'problem_num': problem_num,
                            'missing': ", ".join(missing),
                            'preview': problem_preview,
                            'has_strategy': has_strategy,
                            'has_solution': has_solution_marker,
                            'has_discussion': has_discussion
                        })
                        total_incomplete += 1

                pos = end_idx

            if incomplete_problems:
                print(f"\n{filename}:")
                for prob in incomplete_problems:
                    print(f"  Problem {prob['problem_num']}: {prob['missing']}")
                    print(f"    {prob['preview']}...")

                all_problems.extend(incomplete_problems)

        chapter_stats[chapter_num] = {
            'total': total_problems,
            'incomplete': total_incomplete
        }

    # Print summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")

    grand_total_problems = 0
    grand_total_incomplete = 0

    for chapter_num in sorted(chapter_stats.keys()):
        stats = chapter_stats[chapter_num]
        if stats['incomplete'] > 0:
            print(f"Chapter {chapter_num}: {stats['incomplete']} incomplete (of {stats['total']} total)")
        grand_total_problems += stats['total']
        grand_total_incomplete += stats['incomplete']

    print(f"\nTotal problems analyzed: {grand_total_problems}")
    print(f"Total problems needing complete solutions: {grand_total_incomplete}")

    return all_problems, chapter_stats


def main():
    parser = argparse.ArgumentParser(
        description='Find incomplete solutions in physics book chapters.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                      Analyze all chapters (1-34)
  %(prog)s 16 17 18             Analyze chapters 16, 17, and 18
  %(prog)s --range 1-10         Analyze chapters 1 through 10
  %(prog)s --range 1-6 --range 20-25   Analyze multiple ranges
        """
    )

    parser.add_argument(
        'chapters',
        nargs='*',
        type=int,
        help='Specific chapter numbers to analyze'
    )

    parser.add_argument(
        '--range', '-r',
        action='append',
        dest='ranges',
        metavar='START-END',
        help='Chapter range to analyze (e.g., 1-10)'
    )

    parser.add_argument(
        '--contents-dir', '-d',
        type=Path,
        default=Path('/home/user/physics-book/contents'),
        help='Path to the contents directory'
    )

    args = parser.parse_args()

    # Collect chapter numbers from all sources
    chapter_numbers = []

    if args.chapters:
        chapter_numbers.extend(args.chapters)

    if args.ranges:
        for range_str in args.ranges:
            chapter_numbers.extend(parse_chapter_range(range_str))

    # Default to all chapters if none specified
    if not chapter_numbers:
        chapter_numbers = list(range(1, 35))  # Chapters 1-34

    # Validate contents directory
    if not args.contents_dir.exists():
        print(f"Error: Contents directory not found: {args.contents_dir}")
        return 1

    find_incomplete_solutions(chapter_numbers, args.contents_dir)
    return 0


if __name__ == "__main__":
    exit(main())
