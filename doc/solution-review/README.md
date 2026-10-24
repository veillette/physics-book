# Solution review ledger: chapters 1–34

Last refresh: 2026-10-24T13:25:51+00:00. Source digest: `f2db9e905728ca251969d63cfc8a71150c1b9d7ce191e6e06f41452591d58e73`.

**3561 inventoried items; 3140 current substantive reviews; 269 items without solution text.**

**Status: automated screening covers all 34 chapters. The substantive reasoning review is in progress; pending entries have no correctness verdict.**

Scope includes end-of-section numerical exercises, conceptual questions, check-understanding answers, and worked examples. One row represents one whole problem/solution pair (including its subparts). Examples with integrated solutions count as one item. Items without supplied solutions are recorded as missing, rather than judged incorrect.

Review criteria: does the solution address the actual question and all its parts; choose an appropriate physical model; state necessary assumptions; use valid reasoning, signs, directions, and units; and reach an answer supported by the work? Ordinary rounding and small differences in constants are accepted. Missing Strategy/Solution/Discussion labels are editorial metadata, not evidence of incorrect physics.

Substantive verdicts: **appropriate**, **concern**, **ambiguous**, **missing**. **Pending** means the reasoning has not been assessed. **Stale-review** means the saved judgment refers to different source/context. Confidence (high/medium/low) belongs to the recorded finding, never to an automatically inferred correctness score. High means direct derivation or clear evidence; medium means a material assumption/context remains; low means insufficient evidence.

Automatic counts below cover the entire source block, sometimes including the problem statement, and are **not** solution-verification percentages. “Checked” means only that a supported equality or one of the existing source-bound cases passed; “skipped” remains unverified. A clean scan cannot establish that the model or given values were chosen correctly. Flags require contextual review; common causes include temperature intervals, symbolic units, dimensional shorthand, and deliberately approximate estimates.

## Chapter loop

| Chapter | Items | Supplied solutions | Current substantive reviews | Pending / stale | Automatic flags (whole chapter) | Details |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 59 | 59 | 59 | 0 | 1 | [Chapter 01](chapter-01.md) |
| 2 | 123 | 123 | 123 | 0 | 3 | [Chapter 02](chapter-02.md) |
| 3 | 99 | 99 | 99 | 0 | 0 | [Chapter 03](chapter-03.md) |
| 4 | 92 | 92 | 92 | 0 | 0 | [Chapter 04](chapter-04.md) |
| 5 | 66 | 66 | 66 | 0 | 0 | [Chapter 05](chapter-05.md) |
| 6 | 80 | 80 | 80 | 0 | 0 | [Chapter 06](chapter-06.md) |
| 7 | 108 | 108 | 108 | 0 | 2 | [Chapter 07](chapter-07.md) |
| 8 | 94 | 94 | 94 | 0 | 1 | [Chapter 08](chapter-08.md) |
| 9 | 64 | 64 | 64 | 0 | 0 | [Chapter 09](chapter-09.md) |
| 10 | 100 | 100 | 100 | 0 | 0 | [Chapter 10](chapter-10.md) |
| 11 | 139 | 139 | 139 | 0 | 3 | [Chapter 11](chapter-11.md) |
| 12 | 110 | 110 | 110 | 0 | 1 | [Chapter 12](chapter-12.md) |
| 13 | 116 | 116 | 116 | 0 | 26 | [Chapter 13](chapter-13.md) |
| 14 | 123 | 123 | 123 | 0 | 17 | [Chapter 14](chapter-14.md) |
| 15 | 110 | 110 | 110 | 0 | 4 | [Chapter 15](chapter-15.md) |
| 16 | 116 | 116 | 116 | 0 | 1 | [Chapter 16](chapter-16.md) |
| 17 | 117 | 117 | 117 | 0 | 11 | [Chapter 17](chapter-17.md) |
| 18 | 106 | 106 | 106 | 0 | 1 | [Chapter 18](chapter-18.md) |
| 19 | 104 | 104 | 104 | 0 | 1 | [Chapter 19](chapter-19.md) |
| 20 | 138 | 138 | 138 | 0 | 9 | [Chapter 20](chapter-20.md) |
| 21 | 130 | 130 | 130 | 0 | 1 | [Chapter 21](chapter-21.md) |
| 22 | 130 | 130 | 130 | 0 | 1 | [Chapter 22](chapter-22.md) |
| 23 | 150 | 150 | 150 | 0 | 5 | [Chapter 23](chapter-23.md) |
| 24 | 78 | 78 | 78 | 0 | 0 | [Chapter 24](chapter-24.md) |
| 25 | 105 | 105 | 105 | 0 | 0 | [Chapter 25](chapter-25.md) |
| 26 | 64 | 64 | 64 | 0 | 0 | [Chapter 26](chapter-26.md) |
| 27 | 147 | 115 | 115 | 0 | 1 | [Chapter 27](chapter-27.md) |
| 28 | 108 | 84 | 84 | 0 | 1 | [Chapter 28](chapter-28.md) |
| 29 | 122 | 94 | 94 | 0 | 8 | [Chapter 29](chapter-29.md) |
| 30 | 105 | 78 | 78 | 0 | 1 | [Chapter 30](chapter-30.md) |
| 31 | 117 | 49 | 48 | 1 | 0 | [Chapter 31](chapter-31.md) |
| 32 | 94 | 65 | 0 | 65 | 10 | [Chapter 32](chapter-32.md) |
| 33 | 88 | 55 | 0 | 55 | 1 | [Chapter 33](chapter-33.md) |
| 34 | 59 | 31 | 0 | 31 | 0 | [Chapter 34](chapter-34.md) |

## Checks and evidence

- Math delimiters: exit 0; [full output](math-delimiters.txt).
- Physics/arithmetic scan: 8876 checked, 110 flagged, 48514 skipped across the chapter source files.
- Existing source-bound cases provide only selected coverage; their per-chapter counts are in ledger.json. They do not cover every exercise.
- [Contextual review of automatic flags](automatic-flag-review.md).
- [Machine-readable ledger](ledger.json), append-only substantive judgments in [reviews.json](reviews.json), and [run history](runs.jsonl).

## Paced physics reasoning review

The [paced controller](paced-loop.md) runs a read-only Codex reviewer in small batches, records its independent reasoning and confidence, and spreads requests across a bounded run (16 hours by default). This is separate from the arithmetic screening loop below. [Live run state](paced-state.json) records its deadline, progress, errors, and next request time.

## Repeat and resume

Run from the repository root:

```bash
# Loop through chapters 1–34; refresh checks and ledger without editing content.
python3 -B scripts/review_solutions.py

# Read the next five unreviewed items in a chapter, with complete source text.
python3 -B scripts/review_solutions.py --packet 1 --limit 5

# Automatically choose the first unfinished chapter, in order from 1 to 34.
python3 -B scripts/review_solutions.py --next --limit 5

# Append a reviewed batch, then refresh the reports.
python3 -B scripts/review_solutions.py --record /tmp/review-batch.json
python3 -B scripts/review_solutions.py
```

The packet prints IDs and both required hashes. Each review is a JSON object with `id`, `source_sha256`, `file_sha256`, `verdict`, `confidence`, `notes`, and `reviewer`; `--record` takes an array of those objects. It rejects stale sources before writing the batch. Repeat the packet command after recording to advance to the next batch. `--next` advances to the next unfinished chapter automatically. Use `--include-reviewed` and `--offset` to revisit a batch. No external AI service or background process is started by this script.

Reviews are retained when a refresh changes the inventory. An exact source block hash plus the surrounding file hash prevents transferring a judgment to an inserted/reordered exercise or silently trusting a changed context. A changed file conservatively makes its previous reviews stale. Referenced figures/tables in other files still need manual rechecking when those dependencies change. Removed inventory entries are retained in `retired_items` in ledger.json. Per-chapter JSON files checkpoint completed scan work; a failed run never replaces the aggregate ledger with a partial success.
