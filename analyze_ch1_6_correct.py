#!/usr/bin/env python3
"""
Analyze all problems in chapters 1-6 to find those with incomplete solutions.
"""

import re
from pathlib import Path

def main():
    """Find all problems and check their solution structure."""
    contents_dir = Path('/home/user/physics-book/contents')

    problems_to_fix = []
    total_problems = 0

    # Process chapters 1-6
    for chapter in range(1, 7):
        # Get files for this chapter only (not ch10, ch11, etc.)
        chapter_files = []
        for f in sorted(contents_dir.glob(f'ch{chapter}*.md')):
            match = re.match(r'ch(\d+)', f.name)
            if match and int(match.group(1)) == chapter:
                chapter_files.append(f)

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
                            'chapter': chapter,
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
                        'chapter': chapter,
                        'problem_num': file_problem_num,
                        'preview': problem_preview,
                        'has_strategy': False,
                        'has_solution': False,
                        'has_discussion': False
                    })

                pos = i

    # Output results organized by chapter
    for chapter in range(1, 7):
        chapter_problems = [p for p in problems_to_fix if p['chapter'] == chapter]
        if chapter_problems:
            print(f"\n{'='*80}")
            print(f"CHAPTER {chapter}: {len(chapter_problems)} problems need complete solutions")
            print(f"{'='*80}")

            current_file = None
            for problem in chapter_problems:
                if problem['file'] != current_file:
                    print(f"\n{problem['file']}:")
                    current_file = problem['file']

                status = []
                if not problem['has_strategy']: status.append("no Strategy")
                if not problem['has_solution']: status.append("no Solution")
                if not problem['has_discussion']: status.append("no Discussion")

                print(f"  Problem {problem['problem_num']}: {', '.join(status)}")
                print(f"    {problem['preview'][:90]}...")

    print(f"\n\n{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"Total problems in chapters 1-6: {total_problems}")
    print(f"Problems needing complete solutions: {len(problems_to_fix)}")
    print(f"Problems already complete: {total_problems - len(problems_to_fix)}")

    # Summary by chapter
    print(f"\nBy chapter:")
    for chapter in range(1, 7):
        chapter_files_correct = []
        for f in contents_dir.glob(f'ch{chapter}*.md'):
            match = re.match(r'ch(\d+)', f.name)
            if match and int(match.group(1)) == chapter:
                chapter_files_correct.append(f)

        chapter_total = sum(content.count('data-element-type="problems-exercises"')
                          for filepath in chapter_files_correct
                          for content in [open(filepath, 'r').read()])
        chapter_problems = [p for p in problems_to_fix if p['chapter'] == chapter]
        print(f"  Chapter {chapter}: {len(chapter_problems)} incomplete out of {chapter_total} total")

if __name__ == '__main__':
    main()
