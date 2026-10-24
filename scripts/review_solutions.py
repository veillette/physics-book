#!/usr/bin/env python3
"""Build a resumable, read-only solution audit, looping over chapters 1–34.

Refresh: python3 -B scripts/review_solutions.py
Read next batch: python3 -B scripts/review_solutions.py --next --limit 5
Record judgments: python3 -B scripts/review_solutions.py --record /tmp/reviews.json

Only doc/solution-review/ is written. No model is invoked and no textbook
content is changed. A checker pass is never a substantive correctness verdict.
"""
import argparse
from collections import Counter, defaultdict
from datetime import datetime, timezone
import hashlib
import fcntl
import json
from pathlib import Path
import posixpath
import re
import subprocess
import sys

if __package__:
    from .find_incomplete_solutions import (
        chapter_files, extract_blocks, find_parts, iter_exercises, make_preview,
    )
else:
    from find_incomplete_solutions import (
        chapter_files, extract_blocks, find_parts, iter_exercises, make_preview,
    )

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'doc' / 'solution-review'
VERDICTS = {'appropriate', 'concern', 'ambiguous', 'missing'}
CONFIDENCE = {'high', 'medium', 'low'}


def digest(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds')


def load_json(path, default):
    return json.loads(path.read_text()) if path.exists() else default


def save_json(path, data):
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
    temp.replace(path)


def inventory(contents=None):
    """Include all exercise types, worked examples, and any detached solutions.

    An explicit coverage check ensures every ::: solution opener belongs to an
    inventory item. All ordinal identifiers are paired with a source hash;
    moving/inserting an item cannot silently transfer an old judgment.
    """
    contents = contents or ROOT / 'contents'
    items, sources = [], {}
    for chapter in range(1, 35):
        for path in chapter_files(contents, [chapter]).get(chapter, []):
            text = path.read_text()
            lines = text.splitlines()
            relative = path.relative_to(ROOT).as_posix()
            sources[relative] = digest(text)
            spans = []
            for start, body, kind in iter_exercises(lines):
                blocks, unclosed = extract_blocks(body)
                problem = '\n'.join(blocks['problem'])
                solution = '\n'.join(blocks['solution'])
                if not problem.strip() and not solution.strip():
                    # Retain malformed exercise blocks rather than drop them.
                    problem = '\n'.join(body)
                    unclosed.append('unparsed-problem')
                declared = re.search(r'data-element-type="([^"]*)"', lines[start])
                kind = kind or (declared[1] if declared else 'exercise')
                end = min(start + len(body) + 2, len(lines))
                spans.append((start, end, kind, problem, solution, unclosed))

            # Parse nested colon containers, respecting fence lengths.
            stack, solution_lines = [], []
            code_fence = None
            for index, line in enumerate(lines):
                code = re.match(r'^\s*(`{3,}|~{3,})', line)
                if code:
                    if code_fence is None:
                        code_fence = code[1]
                    elif code[1][0] == code_fence[0] and len(code[1]) >= len(code_fence):
                        code_fence = None
                    continue
                if code_fence:
                    continue
                opened = re.match(r'^\s*(:{3,})\s+([\w-]+)(?:\s+.*)?$', line)
                closed = re.match(r'^\s*(:{3,})\s*$', line)
                if opened:
                    stack.append((len(opened[1]), opened[2], index))
                    if opened[2] == 'solution':
                        solution_lines.append(index)
                elif closed and stack and len(closed[1]) >= stack[-1][0]:
                    _, kind, start = stack.pop()
                    if kind == 'example':
                        body = '\n'.join(lines[start:index + 1])
                        spans.append((start, index + 1, 'worked-example', body, body, []))
            for _, kind, start in stack:
                if kind == 'example':
                    body = '\n'.join(lines[start:])
                    spans.append((start, len(lines), 'worked-example', body, body, ['example']))
            # Legacy examples (if introduced) must be explicitly supported.
            if re.search(r'<div\b[^>]*class=["\'][^"\']*\bexample\b', text):
                raise ValueError(f'{relative}: legacy example needs explicit inventory support')
            for line in solution_lines:
                if not any(start <= line < end for start, end, *_ in spans):
                    raise ValueError(f'{relative}:{line + 1}: solution outside an inventoried exercise/example')
            for match in re.finditer(r'<div\b[^>]*class=["\']solution["\']', text):
                line = text.count('\n', 0, match.start())
                if not any(start <= line < end for start, end, *_ in spans):
                    raise ValueError(f'{relative}:{line + 1}: legacy solution outside inventory')
            counts = Counter()
            for start, end, kind, problem, solution, unclosed in sorted(spans):
                counts[kind] += 1
                block = '\n'.join(lines[start:end])
                source_id = re.search(r'\bid=["\']([^"\']+)', lines[start])
                if not source_id:
                    attrs = re.search(r'"id"\s*:\s*"([^"]+)"', lines[start])
                    source_id = attrs
                key = relative + (f'#{source_id[1]}' if source_id else f'::{kind}:{counts[kind]}')
                items.append(dict(
                    id=key, chapter=chapter, file=relative, line=start + 1, end_line=end,
                    kind=kind, ordinal=counts[kind], source_sha256=digest(block),
                    file_sha256=sources[relative], preview=make_preview(problem, 180),
                    has_solution=bool(solution.strip()),
                    missing_labels=[label for label in ('strategy', 'solution', 'discussion')
                                    if label not in find_parts(solution)],
                    markup_flags=unclosed,
                ))
    keys = [item['id'] for item in items]
    if len(keys) != len(set(keys)):
        raise ValueError('Duplicate inventory IDs')
    return items, sources


def active_reviews(item, reviews):
    matching = [r for r in reviews.get(item['id'], [])
                if r['source_sha256'] == item['source_sha256']
                and r['file_sha256'] == item['file_sha256']]
    return matching[-1] if matching else None


def status(item, reviews):
    reviewed = active_reviews(item, reviews)
    if reviewed:
        return reviewed['verdict']
    if reviews.get(item['id']):
        return 'stale-review'
    if not item['has_solution']:
        return 'missing'
    return 'pending'


def read_packet(chapter, limit, offset, include_reviewed):
    items, _ = inventory()
    reviews = load_json(OUTPUT / 'reviews.json', {})
    if chapter is None:
        chapter = next((i['chapter'] for i in items
                        if status(i, reviews) in ('pending', 'stale-review')), None)
        if chapter is None:
            print('No pending supplied solutions in chapters 1–34. See the ledger for missing solutions.')
            return
    selected = [i for i in items if i['chapter'] == chapter
                and (include_reviewed or status(i, reviews) in ('pending', 'stale-review'))]
    print(f'# Chapter {chapter} review batch\n')
    print('Review the supplied problem and solution together. Check the physical model, assumptions, '
          'signs, units, each requested part, and whether the answer follows. Accept ordinary rounding. '
          'Record ambiguity instead of editing the textbook. A label omission alone is not a physics error.\n')
    print(f'{len(selected)} eligible items; offset {offset}; batch limit {limit}.\n')
    for item in selected[offset:offset + limit]:
        print('## ' + item['id'])
        print(json.dumps({key: item[key] for key in ('id', 'source_sha256', 'file_sha256', 'line')}) + '\n')
        lines = (ROOT / item['file']).read_text().splitlines()
        print('\n'.join(lines[item['line'] - 1:item['end_line']]))
        print('\n')
    print('Record a JSON array of {id, source_sha256, file_sha256, verdict, confidence, notes, reviewer}. '
          'Verdicts: appropriate / concern / ambiguous / missing. Confidence: high / medium / low. '
          'Use --record FILE to append reviews; then refresh the ledger. '
          'Rerun the same packet command to get the next unreviewed batch.\n')


def record_reviews(path):
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with (OUTPUT / 'reviews.lock').open('a+') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        _record_reviews(path)


def _record_reviews(path):
    entries = load_json(path, None)
    if not isinstance(entries, list) or not entries:
        raise ValueError('Review input must be a nonempty JSON array')
    items, _ = inventory()
    by_id = {i['id']: i for i in items}
    reviews = load_json(OUTPUT / 'reviews.json', {})
    # Validate the entire batch before changing any saved reviews.
    for r in entries:
        item = by_id.get(r.get('id'))
        if not item:
            raise ValueError(f'Unknown item: {r.get("id")}')
        for key in ('source_sha256', 'file_sha256'):
            if r.get(key) != item[key]:
                raise ValueError(f'Stale source for {r["id"]}: {key}')
        if r.get('verdict') not in VERDICTS or r.get('confidence') not in CONFIDENCE:
            raise ValueError(f'Invalid verdict or confidence: {r["id"]}')
        if not str(r.get('notes', '')).strip() or not str(r.get('reviewer', '')).strip():
            raise ValueError('Each review requires notes and a reviewer')
    for r in entries:
        saved = dict(r, reviewed_at=now())
        reviews.setdefault(r['id'], []).append(saved)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    save_json(OUTPUT / 'reviews.json', reviews)
    print(f'Appended {len(entries)} substantive reviews.')


def cell(value):
    return str(value).replace('|', '\\|').replace('\n', ' ').replace('<', '&lt;')


def preview_links(value, source_file):
    """Keep copied relative links pointing at their original textbook targets."""
    def rebase(match):
        target, separator, fragment = match[1].partition('#')
        target = posixpath.normpath(posixpath.join(posixpath.dirname(source_file), target))
        if not Path(target).suffix and (ROOT / (target + '.md')).is_file():
            target += '.md'
        return '/' + target + separator + fragment

    return re.sub(r'(?<=\]\()(\.\.?/[^)\s]+)(?=\))', rebase, value)


def refresh():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    if not (OUTPUT / 'reviews.json').exists():
        save_json(OUTPUT / 'reviews.json', {})
    items, sources = inventory()
    reviews = load_json(OUTPUT / 'reviews.json', {})
    previous = load_json(OUTPUT / 'ledger.json', {})
    by_chapter = defaultdict(list)
    for item in items:
        by_chapter[item['chapter']].append(item)
    automatic, summaries = [], {}
    # This is the chapter loop. Every chapter is independently checkpointed.
    for chapter in range(1, 35):
        process = subprocess.run(
            [sys.executable, '-B', str(ROOT / 'scripts/check_math.py'), str(chapter), '--json'],
            cwd=ROOT, capture_output=True, text=True, check=False)
        if process.returncode:
            raise RuntimeError(f'Chapter {chapter} checker failed: {process.stderr or process.stdout}')
        report = json.loads(process.stdout)
        summaries[str(chapter)] = report['summary']
        chapter_results = []
        for result in report['results']:
            result['file'] = Path(result['file']).relative_to(ROOT).as_posix()
            chapter_results.append(result)
        for item in by_chapter[chapter]:
            related = [r for r in chapter_results if r['file'] == item['file']
                       and item['line'] <= r['line'] <= item['end_line']]
            item['automatic'] = dict(Counter(r['status'] for r in related))
            item['automatic_flags'] = [r for r in related if r['status'] == 'failed']
            item['review_status'] = status(item, reviews)
            item['review'] = active_reviews(item, reviews)
            item['previous_review_count'] = len(reviews.get(item['id'], []))
        automatic.extend(r for r in chapter_results if r['status'] == 'failed')
        print(f'Chapter {chapter:02}: {len(by_chapter[chapter]):3} items, '
              f'{sum(i["review"] is not None for i in by_chapter[chapter]):3} substantive reviews, '
              f'{report["summary"]["failed"]:2} automatic flags', flush=True)
        # Preserve completed chapter work even if a subsequent checker fails.
        save_json(OUTPUT / f'chapter-{chapter:02}.json', dict(
            chapter=chapter, checked_at=now(), summary=report['summary'], items=by_chapter[chapter]))
    delimiter = subprocess.run(['node', 'scripts/check-math.js'], cwd=ROOT,
                               capture_output=True, text=True, check=False)
    (OUTPUT / 'math-delimiters.txt').write_text(delimiter.stdout + delimiter.stderr)
    # Do not publish a mixed snapshot if another process edited the textbook
    # while the chapter loop was running.
    _, latest_sources = inventory()
    if latest_sources != sources:
        raise RuntimeError('Textbook sources changed during the scan; rerun to obtain a consistent ledger')
    old_items = previous.get('items', []) + previous.get('retired_items', [])
    current_ids = {i['id'] for i in items}
    retired = {i['id']: i for i in old_items if i['id'] not in current_ids}
    book_hash = digest(json.dumps(sources, sort_keys=True))
    counts = dict(Counter(i['review_status'] for i in items))
    ledger = dict(schema_version=1, checked_at=now(), source_digest=book_hash,
                  sources=sources, status_counts=counts, chapter_checks=summaries,
                  delimiter_check_exit_code=delimiter.returncode, items=items,
                  retired_items=list(retired.values()), all_automatic_flags=automatic)
    save_json(OUTPUT / 'ledger.json', ledger)
    run = dict(checked_at=ledger['checked_at'], source_digest=book_hash,
               item_count=len(items), statuses=counts,
               checked=sum(s['checked'] for s in summaries.values()),
               failed=sum(s['failed'] for s in summaries.values()),
               skipped=sum(s['skipped'] for s in summaries.values()),
               delimiter_exit_code=delimiter.returncode)
    with (OUTPUT / 'runs.jsonl').open('a') as stream:
        stream.write(json.dumps(run) + '\n')
    write_markdown(ledger)
    print(f'Ledger: doc/solution-review/README.md; {len(items)} items; {counts}')
    return delimiter.returncode


def write_markdown(ledger):
    items = ledger['items']
    substantive = sum(i['review'] is not None for i in items)
    text = [
        '# Solution review ledger: chapters 1–34', '',
        f'Last refresh: {ledger["checked_at"]}. Source digest: `{ledger["source_digest"]}`.', '',
        f'**{len(items)} inventoried items; {substantive} current substantive reviews; '
        f'{sum(not i["has_solution"] for i in items)} items without solution text.**', '',
        '**Status: automated screening covers all 34 chapters. The substantive reasoning review '
        'is in progress; pending entries have no correctness verdict.**', '',
        'Scope includes end-of-section numerical exercises, conceptual questions, check-understanding '
        'answers, and worked examples. One row represents one whole problem/solution pair (including '
        'its subparts). Examples with integrated solutions count as one item. Items without supplied '
        'solutions are recorded as missing, rather than judged incorrect.', '',
        'Review criteria: does the solution address the actual question and all its parts; choose '
        'an appropriate physical model; state necessary assumptions; use valid reasoning, signs, '
        'directions, and units; and reach an answer supported by the work? Ordinary rounding and '
        'small differences in constants are accepted. Missing Strategy/Solution/Discussion labels '
        'are editorial metadata, not evidence of incorrect physics.', '',
        'Substantive verdicts: **appropriate**, **concern**, **ambiguous**, **missing**. '
        '**Pending** means the reasoning has not been assessed. **Stale-review** means the saved '
        'judgment refers to different source/context. Confidence (high/medium/low) belongs to the '
        'recorded finding, never to an automatically inferred correctness score. High means '
        'direct derivation or clear evidence; medium means a material assumption/context remains; '
        'low means insufficient evidence.', '',
        'Automatic counts below cover the entire source block, sometimes including the problem '
        'statement, and are **not** solution-verification percentages. “Checked” means only that a '
        'supported equality or one of the existing source-bound cases passed; “skipped” remains '
        'unverified. A clean scan cannot establish that the model or given values were chosen correctly. '
        'Flags require contextual review; common causes include temperature intervals, symbolic units, '
        'dimensional shorthand, and deliberately approximate estimates.', '',
        '## Chapter loop', '',
        '| Chapter | Items | Supplied solutions | Current substantive reviews | Pending / stale | Automatic flags (whole chapter) | Details |',
        '| --- | ---: | ---: | ---: | ---: | ---: | --- |',
    ]
    for chapter in range(1, 35):
        group = [i for i in items if i['chapter'] == chapter]
        summary = ledger['chapter_checks'][str(chapter)]
        text.append(f'| {chapter} | {len(group)} | {sum(i["has_solution"] for i in group)} | '
                    f'{sum(i["review"] is not None for i in group)} | '
                    f'{sum(i["review_status"] in ("pending", "stale-review") for i in group)} | '
                    f'{summary["failed"]} | [Chapter {chapter:02}](chapter-{chapter:02}.md) |')
        details = [f'# Chapter {chapter}: solution review', '',
                   'See the [ledger](README.md) for criteria and limits. Line numbers are from the latest refresh. '
                   'The JSON companion holds source hashes and individual automatic flags.', '',
                   '| Item / source | Problem preview | Review | Confidence | Checked / flagged / skipped | Notes |',
                   '| --- | --- | --- | --- | --- | --- |']
        for item in group:
            review = item['review']
            counts = item['automatic']
            note = review['notes'] if review else (
                'No solution supplied; correctness cannot be assessed.' if not item['has_solution']
                else 'Awaiting substantive review of model, reasoning, and requested parts.')
            if item['markup_flags']:
                note += ' Markup/parser flags: ' + ', '.join(item['markup_flags']) + '.'
            if item['missing_labels'] and item['has_solution']:
                note += ' Editorial labels absent: ' + ', '.join(item['missing_labels']) + '.'
            if item['previous_review_count'] and not review:
                note += ' Earlier review retained in reviews.json; source/context changed.'
            link = f'[{cell(item["kind"])} {item["ordinal"]}](/' + item['file'] + f'#L{item["line"]})'
            details.append('| ' + ' | '.join(map(cell, [
                link, preview_links(item['preview'], item['file']), item['review_status'], review['confidence'] if review else '—',
                f'{counts.get("checked", 0)} / {counts.get("failed", 0)} / {counts.get("skipped", 0)}', note])) + ' |')
        (OUTPUT / f'chapter-{chapter:02}.md').write_text('\n'.join(details) + '\n')
    totals = Counter()
    for summary in ledger['chapter_checks'].values():
        totals.update({k: summary[k] for k in ('checked', 'failed', 'skipped')})
    text += ['', '## Checks and evidence', '',
             f'- Math delimiters: exit {ledger["delimiter_check_exit_code"]}; [full output](math-delimiters.txt).',
             f'- Physics/arithmetic scan: {totals["checked"]} checked, {totals["failed"]} flagged, '
             f'{totals["skipped"]} skipped across the chapter source files.',
             '- Existing source-bound cases provide only selected coverage; their per-chapter counts '
             'are in ledger.json. They do not cover every exercise.',
             '- [Contextual review of automatic flags](automatic-flag-review.md).',
             '- [Machine-readable ledger](ledger.json), append-only substantive judgments in '
             '[reviews.json](reviews.json), and [run history](runs.jsonl).', '',
             '## Paced physics reasoning review', '',
             'The [paced controller](paced-loop.md) runs a read-only Codex reviewer in small '
             'batches, records its independent reasoning and confidence, and spreads requests '
             'across a bounded run (16 hours by default). This is separate from the arithmetic '
             'screening loop below. [Live run state](paced-state.json) records its deadline, '
             'progress, errors, and next request time.', '',
             '## Corrections', '',
             'The reviewer never edits the book. Findings that survive an independent check are '
             'fixed in a separate maintainer pass, and each edited item gets a new post-fix review. '
             '[Corrections](corrections.md) logs each round: the fixes, the findings not acted on, '
             'and how reviews of unchanged items in an edited file are carried over.', '',
             '## Repeat and resume', '',
             'Run from the repository root:', '', '```bash',
             '# Loop through chapters 1–34; refresh checks and ledger without editing content.',
             'python3 -B scripts/review_solutions.py', '',
             '# Read the next five unreviewed items in a chapter, with complete source text.',
             'python3 -B scripts/review_solutions.py --packet 1 --limit 5', '',
             '# Automatically choose the first unfinished chapter, in order from 1 to 34.',
             'python3 -B scripts/review_solutions.py --next --limit 5', '',
             '# Append a reviewed batch, then refresh the reports.',
             'python3 -B scripts/review_solutions.py --record /tmp/review-batch.json',
             'python3 -B scripts/review_solutions.py', '```', '',
             'The packet prints IDs and both required hashes. Each review is a JSON object with '
             '`id`, `source_sha256`, `file_sha256`, `verdict`, `confidence`, `notes`, and `reviewer`; '
             '`--record` takes an array of those objects. It rejects stale sources before writing '
             'the batch. Repeat the packet command after recording to advance to the next batch. '
             '`--next` advances to the next unfinished chapter automatically. '
             'Use `--include-reviewed` and `--offset` to revisit a batch. No external AI service '
             'or background process is started by this script.', '',
             'Reviews are retained when a refresh changes the inventory. An exact source block hash '
             'plus the surrounding file hash prevents transferring a judgment to an inserted/reordered '
             'exercise or silently trusting a changed context. A changed file conservatively makes '
             'its previous reviews stale. Referenced figures/tables in other files still need manual '
             'rechecking when those dependencies change. Removed inventory entries are retained in '
             '`retired_items` in ledger.json. Per-chapter JSON files checkpoint completed scan work; '
             'a failed run never replaces the aggregate ledger with a partial success.', '']
    (OUTPUT / 'README.md').write_text('\n'.join(text))


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--packet', type=int, choices=range(1, 35), metavar='CHAPTER')
    mode.add_argument('--next', action='store_true', dest='next_packet',
                      help='Print a batch from the first chapter with pending supplied solutions')
    mode.add_argument('--record', type=Path)
    parser.add_argument('--limit', type=int, default=5)
    parser.add_argument('--offset', type=int, default=0)
    parser.add_argument('--include-reviewed', action='store_true')
    args = parser.parse_args()
    if args.limit < 1 or args.offset < 0:
        parser.error('limit must be positive and offset must be nonnegative')
    try:
        if args.packet or args.next_packet:
            read_packet(args.packet, args.limit, args.offset, args.include_reviewed)
            return 0
        if args.record:
            record_reviews(args.record)
            return 0
        return refresh()
    except (ValueError, RuntimeError, OSError) as error:
        print(f'Review failed: {error}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
