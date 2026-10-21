#!/usr/bin/env python3
"""Verify textbook arithmetic and declarative physics cases.

Every math span produces checked, failed, or skipped results. Unsupported
notation remains visible as skips. Quantities carry SI dimensions and rounding
bounds. Source-bound declarative cases independently recompute selected answers.
Use --details for individual passes/skips, --json for all results and coverage,
and --strict to exit nonzero on any failed verification.
"""
import argparse
import json
import math
import re
import sys
from collections import Counter
from dataclasses import asdict, dataclass
from pathlib import Path

if __package__:
    from .find_incomplete_solutions import DEFAULT_CONTENTS_DIR, chapter_files, parse_chapter_range
    from .physics_latex import normalize, tokenize, parse_unit, Skip, RELATION_RE
    from .physics_quantity import Parser, Value, Invalid, evaluate
    from .physics_cases import run_cases
else:
    from find_incomplete_solutions import DEFAULT_CONTENTS_DIR, chapter_files, parse_chapter_range
    from physics_latex import normalize, tokenize, parse_unit, Skip, RELATION_RE
    from physics_quantity import Parser, Value, Invalid, evaluate
    from physics_cases import run_cases

DEFAULT_CASES = Path(__file__).with_name('physics-cases.json')
MATH_RE = re.compile(r'\$\$(.+?)\$\$|\\\[(.+?)\\\]|\\\((.+?)\\\)', re.S)


def math_spans(text):
    """Yield (source offset, body), ignoring comments and fenced/inline code."""
    masked = list(text)
    fence = None
    position = 0
    for line in text.splitlines(keepends=True):
        match = re.match(r'^\s*(`{3,}|~{3,})', line)
        if fence:
            masked[position:position + len(line)] = ' ' * len(line)
            if match and match[1][0] == fence[0] and len(match[1]) >= len(fence):
                fence = None
        elif match:
            fence = match[1]
            masked[position:position + len(line)] = ' ' * len(line)
        position += len(line)
    for match in re.finditer(r'<!--[\s\S]*?-->|(`+)[^`]*?\1', ''.join(masked)):
        masked[match.start():match.end()] = ' ' * len(match[0])
    for match in MATH_RE.finditer(''.join(masked)):
        yield match.start(), next(group for group in match.groups() if group is not None)


def split_relations(src):
    """Yield rows of (preceding equality, expression) pairs."""
    s = re.sub(r'\\(?:begin|end)\{[a-z*]+\}(?:\{[^{}]*\})?', ' ', src)
    s = re.sub(r'(?<=\d)\{,\}(?=\d)', '', s)
    s = re.sub(r'(?<=\d),(?=\d{3}(?!\d))', '', s)
    s = re.sub(r'(?<=\d)\\[,;: ](?=\d{3}(?!\d))', '', s)
    rows = []
    for row in re.split(r'\\\\', s):
        body = row.replace('&', ' ').strip()
        continues = re.match(r'^(?:[-+*/]|\\times|\\cdot)', body)
        if rows and (continues or re.search(r'(?:[-+*/]|\\times|\\cdot)\s*$', rows[-1])):
            rows[-1] += ' ' + body
        else:
            rows.append(body)
    for row in rows:
        parts, buffer, relation, depth, i = [], '', None, 0, 0
        while i < len(row):
            char = row[i]
            if char == '\\' and i + 1 < len(row) and row[i + 1] in ',;: ':
                buffer += row[i:i + 2]
                i += 2
                continue
            depth += (char == '{') - (char == '}')
            if depth == 0 and (match := RELATION_RE.match(row, i)):
                parts.append((relation, buffer))
                token = match[0]
                relation = '=' if token == '=' else ('~' if token in ('\\approx', '\\simeq') else None)
                buffer = ''
                i = match.end()
                continue
            buffer += char
            i += 1
        parts.append((relation, buffer))
        yield parts


@dataclass
class Verification:
    file: str
    line: int
    kind: str
    expression: str
    status: str
    reason: str
    computed: float | None = None
    stated: float | None = None
    error_pct: float | None = None


def compare(left, right, relation, tolerance):
    if left.dim != right.dim:
        return ('failed', f'incompatible dimensions: {left.dim or "dimensionless"} versus '
                f'{right.dim or "dimensionless"}', left.v, right.v, None)
    difference = abs(left.v - right.v)
    relative = tolerance if relation == '=' else max(tolerance, 0.05)
    allowed = max(relative * abs(right.v), left.e + right.e)
    error = 100 * difference / abs(right.v) if right.v else (0.0 if difference == 0 else None)
    if difference <= allowed + 1e-14 * max(abs(left.v), abs(right.v)):
        return 'checked', 'agrees within rounding and tolerance', left.v, right.v, error
    return 'failed', 'numeric mismatch (SI values)', left.v, right.v, error


def verify_math(src, tolerance=0.01, file='', line=1, temperature='absolute'):
    """Return a result per equality; a span without equality is an explicit skip."""
    found = False
    for parts in split_relations(src):
        for (_, left), (relation, right) in zip(parts, parts[1:]):
            if relation is None:
                continue
            found = True
            expression = f'{left.strip()} {"=" if relation == "=" else "≈"} {right.strip()}'
            try:
                for side in (left, right):
                    tokens = tokenize(normalize(side.strip().rstrip('.')))
                    if not any(kind in ('num', 'pi', 'func') for kind, _ in tokens):
                        raise Skip('unit-only expression or text label needs a numeric value')
                lhs = evaluate(left.strip().rstrip('.'), stated=True, temperature=temperature)
                rhs = evaluate(right.strip().rstrip('.'), stated=True, temperature=temperature)
                verdict = compare(lhs, rhs, relation, tolerance)
            except Skip as error:
                verdict = ('skipped', str(error), None, None, None)
            except (Invalid, ValueError, ZeroDivisionError, OverflowError) as error:
                verdict = ('failed', f'invalid calculation: {error}', None, None, None)
            yield Verification(file, line, 'equation', expression, *verdict)
    if not found:
        yield Verification(file, line, 'equation', src.strip(), 'skipped', 'no supported equality')


def scan_math(src, tolerance=0.01):
    """Compatibility adapter returning only failed comparisons."""
    for result in verify_math(src, tolerance):
        if result.status == 'failed':
            parts = re.split(r' = | ≈ ', result.expression, maxsplit=1)
            yield (*parts, result.computed, result.stated, result.error_pct)


def scan_file(path, display, tolerance):
    text = path.read_text(encoding='utf8')
    results = []
    for start, body in math_spans(text):
        line = text.count('\n', 0, start) + 1
        annotation = re.search(r'<!-- physics-scan: temperature=([\w-]+) -->\s*'
                               r'(?:<!--\s*physics:[^>]*-->\s*)?$', text[max(0, start - 512):start])
        temperature = annotation[1] if annotation else 'absolute'
        if temperature not in ('absolute', 'interval'):
            results.append(Verification(display, line, 'equation', body, 'failed',
                                        f'unknown temperature annotation: {temperature}'))
        else:
            results.extend(verify_math(body, tolerance, display, line, temperature))
    return results


def summary(results):
    counts = Counter(result.status for result in results)
    kinds = {}
    for kind in ('equation', 'case'):
        part = Counter(result.status for result in results if result.kind == kind)
        kinds[kind] = {status: part[status] for status in ('checked', 'failed', 'skipped')}
    return dict(total=len(results), **{status: counts[status] for status in ('checked', 'failed', 'skipped')},
                by_kind=kinds,
                skip_reasons=dict(Counter(result.reason.split(':', 1)[0] for result in results
                                          if result.status == 'skipped')))


def validate_cases(document):
    if document.get('version') != 1:
        raise ValueError('unsupported physics case schema version (expected 1)')
    if not isinstance(document.get('relations'), dict) or not isinstance(document.get('cases'), list):
        raise ValueError('case document needs relations and cases')
    for name, relation in document['relations'].items():
        if (not isinstance(relation, dict) or not isinstance(relation.get('inputs'), list)
                or not all(isinstance(parameter, str) for parameter in relation['inputs'])
                or not isinstance(relation.get('expression'), str)):
            raise ValueError(f'invalid relation definition: {name}')
    ids = set()
    for case in document['cases']:
        if not isinstance(case, dict):
            raise ValueError('each case must be an object')
        for field in ('id', 'file', 'source_id', 'inputs', 'checks'):
            if field not in case:
                raise ValueError(f'case missing {field}')
        if case['id'] in ids:
            raise ValueError(f'duplicate case ID: {case["id"]}')
        ids.add(case['id'])
        if not isinstance(case['inputs'], dict) or not isinstance(case['checks'], list):
            raise ValueError(f'case {case["id"]} needs an inputs object and checks list')
        if not all(isinstance(reference, dict) for reference in case['inputs'].values()):
            raise ValueError(f'case {case["id"]} has an invalid source reference')
        for field in ('derived', 'constants'):
            if not isinstance(case.get(field, {}), dict):
                raise ValueError(f'case {case["id"]}: {field} must be an object')
        for check in case['checks']:
            if (not isinstance(check, dict) or not isinstance(check.get('id'), str)
                    or not isinstance(check.get('relation'), str)
                    or not isinstance(check.get('arguments'), dict)
                    or not isinstance(check.get('expected'), dict)):
                raise ValueError(f'case {case["id"]} has an invalid check')
            tolerance = check.get('tolerance', 1.0)
            if not isinstance(tolerance, (int, float)) or not math.isfinite(tolerance) or tolerance < 0:
                raise ValueError(f'case {case["id"]} has an invalid tolerance')
        path = Path(case['file'])
        if path.is_absolute() or '..' in path.parts:
            raise ValueError('case file must be relative to the contents directory')
        check_ids = [check['id'] for check in case['checks']]
        if not check_ids or len(check_ids) != len(set(check_ids)):
            raise ValueError(f'case {case["id"]} needs nonempty, unique check IDs')


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('chapters', nargs='*', type=int)
    parser.add_argument('--range', '-r', action='append', dest='ranges', type=parse_chapter_range)
    parser.add_argument('--file', '-f', action='append', type=Path, dest='files')
    parser.add_argument('--contents-dir', '-d', type=Path, default=DEFAULT_CONTENTS_DIR)
    parser.add_argument('--cases', type=Path, default=DEFAULT_CASES)
    parser.add_argument('--tolerance', '-t', type=float, default=1.0, metavar='PCT')
    parser.add_argument('--min-error', type=float, default=0.0, metavar='PCT',
                        help='Filter displayed numeric failures; counts and exit status retain all results')
    parser.add_argument('--no-scan', action='store_true')
    parser.add_argument('--no-cases', '--no-worked', action='store_true', dest='no_cases')
    parser.add_argument('--details', action='store_true', help='Print checked and skipped results too')
    parser.add_argument('--json', action='store_true', help='Emit {summary, results}, including skips')
    parser.add_argument('--strict', action='store_true', help='Exit 1 on any failed verification')
    args = parser.parse_args(argv)
    if any(not math.isfinite(number) or number < 0 for number in (args.tolerance, args.min_error)):
        parser.error('tolerance and min-error must be finite and nonnegative')
    if not args.contents_dir.is_dir():
        parser.error(f'contents directory not found: {args.contents_dir}')
    if args.files:
        paths = args.files
        for path in paths:
            if not path.is_file():
                parser.error(f'file not found: {path}')
    else:
        requested = set(args.chapters)
        for chapters in args.ranges or []:
            requested.update(chapters)
        paths = ([path for files in chapter_files(args.contents_dir, requested).values() for path in files]
                 if requested else sorted(args.contents_dir.glob('*.md')))
        if not paths:
            parser.error('no matching content files found')
    results = []
    if not args.no_scan:
        for path in paths:
            results.extend(scan_file(path, str(path), args.tolerance / 100))
    if not args.no_cases:
        try:
            document = json.loads(args.cases.read_text(encoding='utf8'))
            validate_cases(document)
        except (OSError, ValueError, KeyError, TypeError) as error:
            parser.error(f'invalid case document: {error}')
        # Whole-book runs include missing source files, so deleting a source
        # cannot silently delete its required assertions from the report.
        selected = ({path.resolve() for path in paths} if args.files or args.chapters or args.ranges else None)
        if selected is not None and not args.files:
            selected.update((args.contents_dir / case['file']).resolve() for case in document['cases']
                            if (match := re.match(r'ch(\d+)', case['file'])) and int(match[1]) in requested)
        results.extend(run_cases(document, args.contents_dir, selected, Verification, compare,
                                 math_spans, split_relations, args.tolerance / 100))
    coverage = summary(results)
    if args.json:
        print(json.dumps({'summary': coverage, 'results': [asdict(result) for result in results]},
                         indent=2, ensure_ascii=False, allow_nan=False))
    else:
        for result in results:
            if not args.details and result.status != 'failed':
                continue
            if result.status == 'failed' and result.error_pct is not None and result.error_pct < args.min_error:
                continue
            print(f'{result.file}:{result.line}  {result.status.upper()} [{result.kind}]: {result.expression}')
            print(f'    {result.reason}')
            if result.computed is not None:
                print(f'    SI computed {result.computed:.6g}, stated {result.stated:.6g}')
        print(f'\nFiles scanned: {0 if args.no_scan else len(paths)}')
        for kind, counts in coverage['by_kind'].items():
            print(f'{kind.capitalize()} results: ' + ', '.join(f'{count} {status}' for status, count in counts.items()))
        print('Skipped reasons:')
        for reason, count in sorted(coverage['skip_reasons'].items(), key=lambda item: (-item[1], item[0])):
            print(f'  {count}: {reason}')
    return 1 if args.strict and coverage['failed'] else 0


if __name__ == '__main__':
    sys.exit(main())
