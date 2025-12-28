#!/usr/bin/env python3
"""
Script to find problems with incomplete solutions (short answers only, no Strategy/Solution/Discussion).
"""

import re
from pathlib import Path

def main():
    """Find all problems with short answer solutions."""
    contents_dir = Path('/home/user/physics-book/contents')

    problems_to_fix = []

    # Process chapters 10-14
    for chapter in range(10, 15):
        chapter_files = sorted(contents_dir.glob(f'ch{chapter}*.md'))

        for filepath in chapter_files:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find the Problems section
            problems_match = re.search(r'###\s+Problems\s+&amp;\s+Exercises(.*)(?=###|\Z)', content, re.DOTALL | re.IGNORECASE)
            if not problems_match:
                continue

            # Split by exercise divs more carefully
            problems_section = problems_match.group(1)

            # Find all exercise blocks
            pos = 0
            problem_num = 0
            while True:
                # Find next exercise start
                exercise_start = re.search(r'<div class="exercise"[^>]*data-element-type="problems-exercises"[^>]*>', problems_section[pos:])
                if not exercise_start:
                    break

                problem_num += 1
                start_pos = pos + exercise_start.end()

                # Find the matching closing div by counting div tags
                depth = 1
                i = start_pos
                while i < len(problems_section) and depth > 0:
                    if problems_section[i:i+5] == '<div ':
                        depth += 1
                        i += 5
                    elif problems_section[i:i+6] == '</div>':
                        depth -= 1
                        i += 6
                    else:
                        i += 1

                exercise_content = problems_section[start_pos:i-6]

                # Extract solution
                solution_match = re.search(r'<div class="solution"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)

                if solution_match:
                    solution_text = solution_match.group(1)

                    # Check if it has Strategy/Solution/Discussion
                    has_strategy = bool(re.search(r'\*\*Strategy\*\*', solution_text, re.IGNORECASE))
                    has_solution_marker = bool(re.search(r'\*\*Solution\*\*', solution_text, re.IGNORECASE))
                    has_discussion = bool(re.search(r'\*\*Discussion\*\*', solution_text, re.IGNORECASE))

                    # If it doesn't have all three, it needs work
                    if not (has_strategy and has_solution_marker and has_discussion):
                        # Get problem text for reference
                        problem_match = re.search(r'<div class="problem"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)
                        problem_preview = problem_match.group(1).strip()[:80] if problem_match else "Unknown"

                        problems_to_fix.append({
                            'file': filepath.name,
                            'problem_num': problem_num,
                            'preview': problem_preview,
                            'has_strategy': has_strategy,
                            'has_solution': has_solution_marker,
                            'has_discussion': has_discussion
                        })
                else:
                    # No solution at all
                    problem_match = re.search(r'<div class="problem"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)
                    problem_preview = problem_match.group(1).strip()[:80] if problem_match else "Unknown"

                    problems_to_fix.append({
                        'file': filepath.name,
                        'problem_num': problem_num,
                        'preview': problem_preview,
                        'has_strategy': False,
                        'has_solution': False,
                        'has_discussion': False
                    })

                pos = i

    # Output results
    current_file = None
    for problem in problems_to_fix:
        if problem['file'] != current_file:
            print(f"\n{problem['file']}:")
            current_file = problem['file']

        status = []
        if not problem['has_strategy']: status.append("no Strategy")
        if not problem['has_solution']: status.append("no Solution")
        if not problem['has_discussion']: status.append("no Discussion")

        print(f"  Problem {problem['problem_num']}: {', '.join(status)}")
        print(f"    {problem['preview'][:70]}...")

    print(f"\n\nTotal problems needing complete solutions: {len(problems_to_fix)}")

if __name__ == '__main__':
    main()
