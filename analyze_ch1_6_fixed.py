#!/usr/bin/env python3
"""
Analyze all problems in chapters 1-6 to find those with incomplete solutions.
FIXED VERSION - properly handles nested divs in solution sections.
"""

import re
from pathlib import Path

def extract_matching_div(content, start_pos):
    """Extract content of a div by properly counting nested div tags."""
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
    return content[start_pos:i-6], i

def main():
    """Find all problems and check their solution structure."""
    contents_dir = Path('/home/user/physics-book/contents')

    problems_to_fix = []
    total_problems = 0

    # Process chapters 1-6
    for chapter in range(1, 7):
        # Get files for this chapter only
        chapter_files = []
        for f in sorted(contents_dir.glob(f'ch{chapter}*.md')):
            match = re.match(r'ch(\d+)', f.name)
            if match and int(match.group(1)) == chapter:
                chapter_files.append(f)

        for filepath in chapter_files:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find all exercise blocks
            pos = 0
            file_problem_num = 0
            while True:
                exercise_start = re.search(r'<div class="exercise"[^>]*data-element-type="problems-exercises"[^>]*>', content[pos:])
                if not exercise_start:
                    break

                file_problem_num += 1
                total_problems += 1
                start_pos = pos + exercise_start.end()

                # Extract exercise content properly
                exercise_content, end_pos = extract_matching_div(content, start_pos)

                # Find solution div start
                solution_start = re.search(r'<div class="solution"[^>]*>', exercise_content)

                if solution_start:
                    # Extract solution content properly by counting divs
                    sol_start_pos = solution_start.end()
                    solution_text, _ = extract_matching_div(exercise_content, sol_start_pos)

                    # Check for required sections
                    has_strategy = bool(re.search(r'\*\*Strategy\*\*', solution_text, re.IGNORECASE))
                    has_solution_marker = bool(re.search(r'\*\*Solution\*\*', solution_text, re.IGNORECASE))
                    has_discussion = bool(re.search(r'\*\*Discussion\*\*', solution_text, re.IGNORECASE))

                    if not (has_strategy and has_solution_marker and has_discussion):
                        problem_match = re.search(r'<div class="problem"[^>]*>(.*?)</div>', exercise_content, re.DOTALL)
                        problem_preview = problem_match.group(1).strip()[:100] if problem_match else "Unknown"
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

                pos += end_pos

    # Output results
    for chapter in range(1, 7):
        chapter_problems = [p for p in problems_to_fix if p['chapter'] == chapter]
        if chapter_problems:
            print(f"\n{'='*80}")
            print(f"CHAPTER {chapter}: {len(chapter_problems)} problems need complete solutions")
            print(f"{'='*80}")

            current_file = None
            for problem in chapter_problems[:10]:  # Show first 10 per chapter
                if problem['file'] != current_file:
                    print(f"\n{problem['file']}:")
                    current_file = problem['file']

                status = []
                if not problem['has_strategy']: status.append("no Strategy")
                if not problem['has_solution']: status.append("no Solution")
                if not problem['has_discussion']: status.append("no Discussion")

                print(f"  Problem {problem['problem_num']}: {', '.join(status)}")
                print(f"    {problem['preview'][:90]}...")

            if len(chapter_problems) > 10:
                print(f"\n  ... and {len(chapter_problems) - 10} more problems")

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
