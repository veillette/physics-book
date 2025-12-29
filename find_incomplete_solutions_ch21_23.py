#!/usr/bin/env python3
"""
Find incomplete solutions in Chapter 21-23 markdown files.
A solution is considered incomplete if it's missing Strategy, Solution, or Discussion sections.
"""

import os
import re
from pathlib import Path

def find_incomplete_solutions(chapter_numbers):
    """Find all problems with incomplete solutions in specified chapters."""

    contents_dir = Path("/home/user/physics-book/contents")

    chapter_stats = {}

    for chapter_num in chapter_numbers:
        print(f"\n{'='*60}")
        print(f"CHAPTER {chapter_num}")
        print(f"{'='*60}")

        # Find all files for this chapter
        chapter_files = sorted(contents_dir.glob(f"ch{chapter_num}*.md"))

        total_problems = 0
        total_incomplete = 0

        for filepath in chapter_files:
            filename = filepath.name

            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find the Problems & Exercises section
            problems_match = re.search(r'### Problems &amp; Exercises(.*?)(?=###|\Z)', content, re.DOTALL)

            if not problems_match:
                continue

            problems_section = problems_match.group(1)

            # Find all exercise blocks
            pos = 0
            problem_num = 0
            incomplete_problems = []

            while True:
                exercise_start = re.search(r'<div class="exercise"[^>]*data-element-type="problems-exercises"[^>]*>', problems_section[pos:])

                if not exercise_start:
                    break

                start_idx = pos + exercise_start.end()

                # Find the matching closing div (simplified - may have issues with nested divs)
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

                # Extract problem text (first 80 chars)
                problem_match = re.search(r'<div class="problem"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)

                if problem_match:
                    problem_num += 1
                    total_problems += 1
                    problem_text = problem_match.group(1).strip()
                    problem_preview = re.sub(r'<[^>]+>', '', problem_text)[:80].strip()

                    # Check for solution
                    solution_match = re.search(r'<div class="solution"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)

                    if solution_match:
                        solution_text = solution_match.group(1)

                        # Check for required sections
                        has_strategy = bool(re.search(r'\*\*Strategy\*\*', solution_text, re.IGNORECASE))
                        has_solution_marker = bool(re.search(r'\*\*Solution\*\*', solution_text, re.IGNORECASE))
                        has_discussion = bool(re.search(r'\*\*Discussion\*\*', solution_text, re.IGNORECASE))

                        missing = []
                        if not has_strategy:
                            missing.append("no Strategy")
                        if not has_solution_marker:
                            missing.append("no Solution")
                        if not has_discussion:
                            missing.append("no Discussion")

                        if missing:
                            incomplete_problems.append((problem_num, ", ".join(missing), problem_preview))
                            total_incomplete += 1

                pos = end_idx

            if incomplete_problems:
                print(f"\n{filename}:")
                for prob_num, missing, preview in incomplete_problems:
                    print(f"  Problem {prob_num}: {missing}")
                    print(f"    {preview}...")

        chapter_stats[chapter_num] = (total_problems, total_incomplete)

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")

    grand_total_problems = 0
    grand_total_incomplete = 0

    for chapter_num in chapter_numbers:
        total, incomplete = chapter_stats.get(chapter_num, (0, 0))
        print(f"Chapter {chapter_num} problems needing work: {incomplete}")
        grand_total_problems += total
        grand_total_incomplete += incomplete

    print(f"Total problems needing complete solutions: {grand_total_incomplete}")

if __name__ == "__main__":
    find_incomplete_solutions([21, 22, 23])
