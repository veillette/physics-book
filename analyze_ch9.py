#!/usr/bin/env python3
"""
Analyze all problems in chapter 9 to find those with incomplete solutions.
"""

import re
from pathlib import Path

def main():
    """Find all problems and check their solution structure."""
    contents_dir = Path('/home/user/physics-book/contents')

    problems_to_fix = []
    total_problems = 0

    # Process chapter 9
    chapter_files = sorted(contents_dir.glob(f'ch9*.md'))

    for filepath in chapter_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all exercise blocks anywhere in the file
        pos = 0
        file_problem_num = 0
        while True:
            # Find next exercise start
            exercise_start = re.search(r'<div class="exercise"[^>]*data-element-type="problems-exercises"[^>]*>', content[pos:])
            if not exercise_start:
                break

            file_problem_num += 1
            total_problems += 1
            start_pos = pos + exercise_start.end()

            # Find the matching closing div by counting div tags
            depth = 1
            i = start_pos
            while i < len(content) and depth > 0:
                if content[i:i+5] == '<div ':
                    depth += 1
                    i += 5
                elif content[i:i+6] == '</div>':
                    depth -= 1
                    i += 6
                else:
                    i += 1

            exercise_content = content[start_pos:i-6]

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
                    problem_preview = problem_match.group(1).strip()[:100] if problem_match else "Unknown"
                    # Remove newlines and extra spaces
                    problem_preview = ' '.join(problem_preview.split())

                    problems_to_fix.append({
                        'file': filepath.name,
                        'problem_num': file_problem_num,
                        'preview': problem_preview,
                        'has_strategy': has_strategy,
                        'has_solution': has_solution_marker,
                        'has_discussion': has_discussion
                    })
            else:
                # No solution at all
                problem_match = re.search(r'<div class="problem"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)
                problem_preview = problem_match.group(1).strip()[:100] if problem_match else "Unknown"
                problem_preview = ' '.join(problem_preview.split())

                problems_to_fix.append({
                    'file': filepath.name,
                    'problem_num': file_problem_num,
                    'preview': problem_preview,
                    'has_strategy': False,
                    'has_solution': False,
                    'has_discussion': False
                })

            pos = i

    # Output results
    print(f"{'='*80}")
    print(f"CHAPTER 9: {len(problems_to_fix)} problems need complete solutions")
    print(f"{'='*80}")

    if problems_to_fix:
        current_file = None
        for problem in problems_to_fix:
            if problem['file'] != current_file:
                print(f"\n{problem['file']}:")
                current_file = problem['file']

            status = []
            if not problem['has_strategy']: status.append("needs Strategy")
            if not problem['has_solution']: status.append("needs Solution")
            if not problem['has_discussion']: status.append("needs Discussion")

            print(f"  Problem {problem['problem_num']}: {', '.join(status)}")
            print(f"    Preview: {problem['preview'][:90]}...")
    else:
        print("\nAll problems in Chapter 9 are complete!")

    print(f"\n{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"Total problems in chapter 9: {total_problems}")
    print(f"Problems needing complete solutions: {len(problems_to_fix)}")
    print(f"Problems already complete: {total_problems - len(problems_to_fix)}")

if __name__ == '__main__':
    main()
