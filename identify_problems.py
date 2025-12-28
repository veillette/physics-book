#!/usr/bin/env python3
"""
Script to identify all problems in chapters 10-14 and determine which need complete solutions.
"""

import re
import os
from pathlib import Path

def analyze_problem_solution(problem_text):
    """
    Analyze if a solution is complete (has Strategy, Solution, Discussion)
    or just a short answer.
    """
    if not problem_text:
        return "NO_SOLUTION"

    has_strategy = bool(re.search(r'\*\*Strategy\*\*', problem_text, re.IGNORECASE))
    has_solution = bool(re.search(r'\*\*Solution\*\*', problem_text, re.IGNORECASE))
    has_discussion = bool(re.search(r'\*\*Discussion\*\*', problem_text, re.IGNORECASE))

    if has_strategy and has_solution and has_discussion:
        return "COMPLETE"
    elif problem_text.strip():
        return "SHORT_ANSWER"
    else:
        return "NO_SOLUTION"

def find_problems_in_file(filepath):
    """Find all problems in a file and their solution status."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the Problems & Exercises section
    problems_match = re.search(r'###\s+Problems\s+&amp;\s+Exercises(.*)(?=###|\Z)', content, re.DOTALL | re.IGNORECASE)

    if not problems_match:
        return []

    problems_section = problems_match.group(1)

    # Find all exercise divs
    exercise_pattern = r'<div class="exercise"[^>]*data-element-type="problems-exercises"[^>]*>(.*?)</div>\s*</div>'
    exercises = re.findall(exercise_pattern, problems_section, re.DOTALL)

    results = []
    for i, exercise in enumerate(exercises, 1):
        # Extract problem text
        problem_match = re.search(r'<div class="problem"[^>]*>(.*?)</div>', exercise, re.DOTALL)
        solution_match = re.search(r'<div class="solution"[^>]*>(.*?)</div>', exercise, re.DOTALL)

        problem_text = problem_match.group(1) if problem_match else ""
        solution_text = solution_match.group(1) if solution_match else ""

        # Get first line of problem for description
        problem_first_line = problem_text.strip().split('\n')[0][:100]

        solution_status = analyze_problem_solution(solution_text)

        results.append({
            'number': i,
            'description': problem_first_line,
            'status': solution_status
        })

    return results

def main():
    """Main function to analyze all chapter files."""
    contents_dir = Path('/home/user/physics-book/contents')

    # Process chapters 10-14
    for chapter in range(10, 15):
        print(f"\n{'='*80}")
        print(f"CHAPTER {chapter}")
        print('='*80)

        # Find all files for this chapter
        chapter_files = sorted(contents_dir.glob(f'ch{chapter}*.md'))

        total_problems = 0
        need_solutions = 0

        for filepath in chapter_files:
            problems = find_problems_in_file(filepath)

            if not problems:
                continue

            print(f"\n{filepath.name}:")
            print(f"  Total problems: {len(problems)}")

            needs_work = [p for p in problems if p['status'] != 'COMPLETE']
            if needs_work:
                print(f"  Needs work: {len(needs_work)}")
                for problem in needs_work:
                    print(f"    Problem {problem['number']}: {problem['status']}")
                    print(f"      {problem['description'][:80]}...")

            total_problems += len(problems)
            need_solutions += len(needs_work)

        print(f"\n  Chapter {chapter} Summary: {need_solutions}/{total_problems} problems need work")

if __name__ == '__main__':
    main()
