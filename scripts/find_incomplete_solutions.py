#!/usr/bin/env python3
"""
Find incomplete solutions in physics book markdown files.

Every end-of-section problem or conceptual question should carry a solution
with Strategy, Solution, and Discussion parts. Exercise blocks are identified
by data-element-type ("problems-exercises" or "conceptual-questions"), falling
back to the section heading for untyped blocks. This script reports each
exercise that has no solution block, an empty one, or a solution missing any
of those parts.

Both markups found in contents/ are understood:
    ::: problem / ::: solution            (markdown-it containers, any fence length)
    <div class="problem"> / <div class="solution">   (legacy HTML)

Section markers are matched loosely: bold (**Strategy:**, __Strategy__,
**Solution for (b)**, **(a) Discussion**, **Strategy and Solution for (a)**),
<strong> tags, <div class="title">Strategy</div> blocks, and headings all count.
A ::: container left open when its exercise <div> closes is reported as
unbalanced markup.

Usage:
    python scripts/find_incomplete_solutions.py              # All chapters
    python scripts/find_incomplete_solutions.py 16 17 18     # Specific chapters
    python scripts/find_incomplete_solutions.py --range 1-10 # Chapter range
    python scripts/find_incomplete_solutions.py --range 1-6 --range 20-25
    python scripts/find_incomplete_solutions.py --summary    # Per-chapter counts only
    python scripts/find_incomplete_solutions.py --json       # Machine-readable output
    python scripts/find_incomplete_solutions.py --type conceptual-questions --missing no-solution
    python scripts/find_incomplete_solutions.py --strict     # Exit 1 if anything is incomplete
"""

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass, field
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_CONTENTS_DIR = REPO_ROOT / 'contents'

PARTS = ('strategy', 'solution', 'discussion')
EXERCISE_TYPES = ('problems-exercises', 'conceptual-questions')

CHAPTER_FILE_RE = re.compile(r'^ch(\d+)[A-Z].*\.md$')
HEADING_RE = re.compile(r'^#{2,6}\s+(.*)$')
PROBLEMS_HEADING_RE = re.compile(r'problems?\s+(?:(?:&amp;|&|and)\s+)?exercises', re.IGNORECASE)
CONCEPTUAL_HEADING_RE = re.compile(r'conceptual\s+questions', re.IGNORECASE)
EXERCISE_OPEN_RE = re.compile(r'<div\b[^>]*\bclass="exercise"[^>]*>', re.IGNORECASE)
ELEMENT_TYPE_RE = re.compile(r'data-element-type="([^"]*)"', re.IGNORECASE)
PROBLEM_TYPE_RE = re.compile(r'^problems?-exercises$', re.IGNORECASE)
DIV_OPEN_RE = re.compile(r'<div\b', re.IGNORECASE)
DIV_CLOSE_RE = re.compile(r'</div\s*>', re.IGNORECASE)
FENCE_OPEN_RE = re.compile(r'^\s*:{3,}\s*([A-Za-z][\w-]*)')
FENCE_CLOSE_RE = re.compile(r'^\s*:{3,}\s*$')
LEGACY_BLOCK_RE = re.compile(r'<div\b[^>]*\bclass="(problem|solution)"[^>]*>', re.IGNORECASE)
# A part label is bold text, a <strong>/<b> tag, a <div class="title"> block,
# or a markdown heading inside the solution.
LABEL_RE = re.compile(
    r'(\*\*|__)(?P<bold>[^\n]+?)\1'
    r'|<(strong|b)>(?P<tag>[^\n]*?)</\3>'
    r'|<div\s+class="title"[^>]*>\s*(?P<title>.*?)\s*</div>'
    r'|^#{2,6}\s+(?P<heading>.*)$',
    re.DOTALL | re.MULTILINE | re.IGNORECASE,
)
PART_PREFIX_RE = re.compile(r'^(?:\([a-z]\)\s*)+')


@dataclass
class Problem:
    file: str
    line: int
    chapter: int
    number: int
    preview: str
    has_solution_block: bool
    present: list = field(default_factory=list)
    missing: list = field(default_factory=list)
    unclosed: list = field(default_factory=list)
    exercise_type: str = 'problems-exercises'

    @property
    def complete(self):
        return not self.missing and not self.unclosed


def parse_chapter_range(range_str):
    """Parse a range string like '1-10' into a list of chapter numbers."""
    try:
        if '-' in range_str:
            start, end = (int(s) for s in range_str.split('-', 1))
            if start > end:
                raise ValueError
            return list(range(start, end + 1))
        return [int(range_str)]
    except ValueError:
        raise argparse.ArgumentTypeError(f"invalid chapter range: {range_str!r}")


def div_delta(line):
    return len(DIV_OPEN_RE.findall(line)) - len(DIV_CLOSE_RE.findall(line))


def iter_exercises(lines):
    """Yield (start_line_index, body_lines, exercise_type) for each exercise block.

    exercise_type is None for blocks outside the supported end-of-section types.
    """
    section_type = None
    i = 0
    while i < len(lines):
        line = lines[i]
        heading = HEADING_RE.match(line)
        if heading:
            title = heading.group(1)
            if PROBLEMS_HEADING_RE.search(title):
                section_type = 'problems-exercises'
            elif CONCEPTUAL_HEADING_RE.search(title):
                section_type = 'conceptual-questions'
            else:
                section_type = None

        opener = EXERCISE_OPEN_RE.search(line)
        if not opener:
            i += 1
            continue

        type_match = ELEMENT_TYPE_RE.search(opener.group(0))
        if type_match:
            declared_type = type_match.group(1).strip().lower()
            if PROBLEM_TYPE_RE.match(declared_type):
                declared_type = 'problems-exercises'
            exercise_type = declared_type if declared_type in EXERCISE_TYPES else None
        else:
            exercise_type = section_type

        # Collect lines until the exercise div closes.
        start = i
        depth = div_delta(line[opener.start():])
        body = []
        i += 1
        while i < len(lines) and depth > 0:
            depth += div_delta(lines[i])
            if depth > 0:
                body.append(lines[i])
            i += 1
        yield start, body, exercise_type


def extract_blocks(body):
    """Return ({'problem': [text...], 'solution': [text...]}, unclosed_names).

    unclosed_names lists ::: containers still open when the exercise div ended,
    which usually means a stray or escaped </div> cut the exercise short.
    """
    blocks = {'problem': [], 'solution': []}

    # markdown-it containers: track a stack so nested containers close correctly.
    stack = []  # entries: [name, collected_lines]
    for line in body:
        if FENCE_CLOSE_RE.match(line):
            if stack:
                name, collected = stack.pop()
                if name in blocks:
                    blocks[name].append('\n'.join(collected))
                elif stack:
                    stack[-1][1].extend(collected)
            continue
        opened = FENCE_OPEN_RE.match(line)
        if opened:
            stack.append([opened.group(1).lower(), []])
            continue
        if stack:
            stack[-1][1].append(line)
    unclosed = [name for name, _ in stack]
    for name, collected in stack:  # unclosed fence: keep what we have
        if name in blocks:
            blocks[name].append('\n'.join(collected))

    # Legacy <div class="problem|solution"> blocks.
    text = '\n'.join(body)
    for match in LEGACY_BLOCK_RE.finditer(text):
        depth = 1
        pos = match.end()
        for tag in re.finditer(r'<div\b|</div\s*>', text[pos:], re.IGNORECASE):
            depth += 1 if tag.group(0).lower().startswith('<div') else -1
            if depth == 0:
                blocks[match.group(1).lower()].append(text[pos:pos + tag.start()])
                break

    return blocks, unclosed


def find_parts(solution_text):
    """Return the set of Strategy/Solution/Discussion parts marked in a solution."""
    found = set()
    for match in LABEL_RE.finditer(solution_text):
        label = next(g for g in match.group('bold', 'tag', 'title', 'heading') if g is not None)
        label = PART_PREFIX_RE.sub('', label.strip().lower()).rstrip(':').strip()
        if label.startswith('strategy'):
            found.add('strategy')
            if re.match(r'strategy\s+and\s+solution', label):
                found.add('solution')
        elif label.startswith('solution'):
            found.add('solution')
        elif label.startswith('discussion'):
            found.add('discussion')
    return found


def make_preview(text, width=80):
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text if len(text) <= width else text[:width - 1].rstrip() + '…'


def analyze_file(path, chapter, display_root, exercise_type='all'):
    lines = path.read_text(encoding='utf-8').splitlines()
    try:
        display = str(path.resolve().relative_to(display_root))
    except ValueError:
        display = str(path)

    problems = []
    counts = dict.fromkeys(EXERCISE_TYPES, 0)
    for start, body, block_type in iter_exercises(lines):
        if block_type is None or (exercise_type != 'all' and block_type != exercise_type):
            continue
        blocks, unclosed = extract_blocks(body)
        if not blocks['problem']:
            continue

        solution_text = '\n'.join(blocks['solution'])
        has_block = bool(blocks['solution'])
        present = find_parts(solution_text)
        counts[block_type] += 1
        problems.append(Problem(
            file=display,
            line=start + 1,
            chapter=chapter,
            number=counts[block_type],
            preview=make_preview(blocks['problem'][0]),
            has_solution_block=has_block and bool(solution_text.strip()),
            present=[p for p in PARTS if p in present],
            missing=[p for p in PARTS if p not in present],
            unclosed=unclosed,
            exercise_type=block_type,
        ))
    return problems


def chapter_files(contents_dir, chapters=None):
    """Map chapter number -> sorted list of section files."""
    by_chapter = {}
    for path in contents_dir.glob('ch*.md'):
        match = CHAPTER_FILE_RE.match(path.name)
        if not match:
            continue
        chapter = int(match.group(1))
        if chapters is None or chapter in chapters:
            by_chapter.setdefault(chapter, []).append(path)
    return {ch: sorted(files) for ch, files in sorted(by_chapter.items())}


def describe(problem):
    issues = []
    if not problem.has_solution_block:
        issues.append('no solution')
    elif problem.missing:
        issues.append('missing ' + ', '.join(p.capitalize() for p in problem.missing))
    if problem.unclosed:
        names = ', '.join(f'::: {name}' for name in problem.unclosed)
        issues.append(f'unclosed {names} (exercise <div> ends early; stray or escaped </div>?)')
    return '; '.join(issues)


def print_report(results, summary_only, reported):
    """Print the per-problem listing (filtered by `reported`) and the summary table."""
    totals = {'problems': 0, 'incomplete': 0, 'no_solution': 0}
    per_chapter = []

    for chapter, problems in results.items():
        incomplete = [p for p in problems if not p.complete]
        no_solution = sum(1 for p in incomplete if not p.has_solution_block)
        totals['problems'] += len(problems)
        totals['incomplete'] += len(incomplete)
        totals['no_solution'] += no_solution
        per_chapter.append((chapter, len(problems), len(incomplete), no_solution))

        listed = [p for p in incomplete if reported(p)]
        if summary_only or not listed:
            continue
        print(f"\n{'=' * 60}\nCHAPTER {chapter}\n{'=' * 60}")
        current_file = None
        for p in listed:
            if p.file != current_file:
                current_file = p.file
                print(f"\n{p.file}:")
            label = 'Conceptual question' if p.exercise_type == 'conceptual-questions' else 'Problem'
            print(f"  {p.file}:{p.line}  {label} {p.number}: {describe(p)}")
            print(f"    {p.preview}")

    print(f"\n{'=' * 60}\nSUMMARY\n{'=' * 60}")
    print(f"{'Chapter':>7}  {'Exercises':>9}  {'Incomplete':>10}  {'No solution':>11}  {'Complete':>8}")
    for chapter, total, incomplete, no_solution in per_chapter:
        pct = 100 * (total - incomplete) / total if total else 100
        print(f"{chapter:>7}  {total:>9}  {incomplete:>10}  {no_solution:>11}  {pct:>7.0f}%")
    total = totals['problems']
    pct = 100 * (total - totals['incomplete']) / total if total else 100
    print(f"{'Total':>7}  {total:>9}  {totals['incomplete']:>10}  {totals['no_solution']:>11}  {pct:>7.0f}%")
    return totals


def main():
    parser = argparse.ArgumentParser(
        description='Find incomplete solutions for problems and conceptual questions in physics book chapters.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                      Analyze all chapters
  %(prog)s 16 17 18             Analyze chapters 16, 17, and 18
  %(prog)s --range 1-10         Analyze chapters 1 through 10
  %(prog)s --range 1-6 --range 20-25   Analyze multiple ranges
  %(prog)s --missing discussion Only report problems lacking a Discussion
  %(prog)s --type conceptual-questions --missing no-solution
                               Only report unanswered conceptual questions
        """,
    )
    parser.add_argument('chapters', nargs='*', type=int, help='Specific chapter numbers to analyze')
    parser.add_argument('--range', '-r', action='append', dest='ranges', type=parse_chapter_range,
                        metavar='START-END', help='Chapter range to analyze (e.g., 1-10)')
    parser.add_argument('--contents-dir', '-d', type=Path, default=DEFAULT_CONTENTS_DIR,
                        help=f'Path to the contents directory (default: {DEFAULT_CONTENTS_DIR})')
    parser.add_argument('--missing', '-m', action='append', choices=PARTS + ('no-solution',),
                        help='Only list problems missing this part, or with no solution at all; '
                             'repeatable. Summary totals still cover every problem.')
    parser.add_argument('--summary', '-s', action='store_true', help='Print only the per-chapter summary')
    parser.add_argument('--type', choices=('all',) + EXERCISE_TYPES, default='all',
                        help='Exercise type to analyze (default: all)')
    parser.add_argument('--json', action='store_true', help='Print incomplete problems as JSON')
    parser.add_argument('--strict', action='store_true', help='Exit with status 1 if any problem is incomplete')
    args = parser.parse_args()

    if not args.contents_dir.is_dir():
        print(f"Error: contents directory not found: {args.contents_dir}", file=sys.stderr)
        return 2

    requested = set(args.chapters)
    for chapters in args.ranges or []:
        requested.update(chapters)

    files = chapter_files(args.contents_dir, requested or None)
    if requested and not files:
        print(f"Error: no chapter files found for chapters {sorted(requested)}", file=sys.stderr)
        return 2

    results = {}
    for chapter, paths in files.items():
        results[chapter] = [p for path in paths
                            for p in analyze_file(path, chapter, Path.cwd(), args.type)]

    def reported(p):
        if not args.missing:
            return True
        if 'no-solution' in args.missing and not p.has_solution_block:
            return True
        return p.has_solution_block and any(part in p.missing for part in args.missing)

    if args.json:
        incomplete = [dict(asdict(p), status=describe(p))
                      for probs in results.values() for p in probs if not p.complete and reported(p)]
        print(json.dumps(incomplete, indent=2, ensure_ascii=False))
        any_incomplete = bool(incomplete)
    else:
        totals = print_report(results, args.summary, reported)
        any_incomplete = totals['incomplete'] > 0

    return 1 if args.strict and any_incomplete else 0


if __name__ == '__main__':
    sys.exit(main())
