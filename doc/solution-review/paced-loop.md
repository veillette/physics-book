# Paced physics reasoning review

The controller calls the installed Codex CLI to perform substantive reasoning reviews. It independently asks the reviewer to derive the necessary relations or explanations, check the actual givens and all subparts, inspect relevant tables/figures, and assess assumptions, signs, units, and explanatory claims. Ordinary rounding differences are accepted. Unsupported claims and missing context must be recorded as ambiguity rather than invented certainty.

Run from the repository root:

```bash
# Start a detached run, bounded to the next 16 hours.
python3 -B scripts/pace_solution_reviews.py --hours 16 --detach

# Inspect progress, next request time, deadline, and any error.
python3 -B scripts/pace_solution_reviews.py --status

# Stop the loop, including its active reviewer, while keeping saved judgments.
python3 -B scripts/pace_solution_reviews.py --stop

# Preview pending work and pacing without calling a model.
python3 -B scripts/pace_solution_reviews.py --dry-run

# Optionally run one real batch in the foreground.
python3 -B scripts/pace_solution_reviews.py --once --batch-size 3
```

There is no need to start another copy when `--status` reports `process_active: true`. A lock prevents two controllers from running together. Restarting the start command after a stopped/crashed run resumes from the first pending supplied solution and creates a new 16-hour window. Existing current reviews, including recorded concerns and ambiguities, are retained and skipped. Missing solutions remain recorded as missing.

The default is one reviewer at a time, batches of at most 12 complete items, and a 60,000-character source budget. A batch never spans two chapters. Each new run starts at the first unfinished chapter and progresses through chapter 34. The controller estimates the remaining number of batches and divides the remaining window among them. It enforces at least 60 seconds between a completed batch and the next request; slower calls do not trigger a burst of catch-up requests. A batch has a 15-minute timeout, capped by the run deadline. No new reviewer starts after the deadline; an unfinished reviewer is terminated and its incomplete output is not recorded.

The initial inventory had 3,217 pending items, approximately 284 batches, corresponding to an initial start interval of about 203 seconds across 16 hours. These are planning estimates, not a promise to finish the book within the window. Request durations, model availability, retries, and source changes affect throughput. At the deadline the ledger retains all accepted results and clearly identifies remaining work.

The reviewer uses the Codex CLI's configured default model and current login. It runs with a read-only tool sandbox, no interactive approvals, no shared daemon, and an ephemeral session. Only the controller writes the review records and generated reports. It does not edit textbook problems, solutions, or figures, and does not commit or push. The existing figure/solution editing automation in `pace-agents.js` is not started or modified by this loop.

Each response must cover the exact batch IDs once, with a verdict, confidence, independent reasoning, calculation/conceptual cross-check, assumptions, and summary notes. The controller binds the response to the supplied source hashes, validates the entire response, then uses the ledger recorder to recheck the current source before saving anything. Changed sources or invalid/incomplete responses reject the batch. Valid batches are appended under a file lock and the chapter ledgers and mathematical checks are refreshed. A model verdict remains an AI assessment, with its evidence and uncertainty visible in the record.

Temporary failures retry with a paced backoff. Six consecutive ordinary failures stop the run with `status: failed`; no failure is converted into an invented correctness verdict. Account usage limits and rate limits instead put the loop into `waiting-for-quota`: it waits 30 minutes and retries the same pending work until the run deadline, without exhausting the ordinary failure budget. This interval can be changed with `--quota-retry-minutes`. `--status` includes the last error, next attempt time, and log location. The CLI uses the user's existing account; there is no new API key setup.

Artifacts:

- [Review ledger](README.md): current chapter progress and per-item findings.
- [Live state](paced-state.json): PID, run deadline, recorded count, current batch, next request time, and errors.
- [Review records](reviews.json): append-only judgments, including detailed reasoning and run IDs.
- `doc/solution-review/paced-events.jsonl`: durable run/batch events.
- `logs/solution-reasoning/controller.log`: controller output.
- `logs/solution-reasoning/<run-id>/`: exact prompts, raw reviewer events, structured answers, and validated batches.

This is a local background process. The machine and its network connection must remain available for the run. There is no automatic publication or external notification.
