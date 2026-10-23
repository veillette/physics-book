#!/usr/bin/env node
/**
 * Pace Claude and Codex through the textbook, one chapter per hour.
 *
 * Phase 1 (svg): Claude redraws one chapter's line-art JPEGs as generated
 * SVGs. Codex reviews the diff. This script commits on that review's accept.
 * Phase 2 (solutions) starts only after every chapter has settled its SVG
 * pass. Claude rewrites incomplete end-of-section solutions into the book's
 * Strategy / Solution / Discussion / Answer layout. Codex reviews again.
 * A solution commit happens only when that review accepts. A rejected
 * solution review is saved under logs/paced-agents/ and the loop stops so
 * the review can be read before anything is retried.
 *
 * All edits happen in a separate git worktree on branch `paced-chapters`
 * (override with --branch). The checkout you launched from is left alone.
 * Nothing is pushed.
 *
 *   node scripts/pace-agents.js                 # hourly loop, both phases
 *   node scripts/pace-agents.js --once          # one Claude request, then exit
 *   node scripts/pace-agents.js --status
 *   node scripts/pace-agents.js --dry-run
 *   node scripts/pace-agents.js --phase svg --chapter 14
 */

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_BRANCH = 'paced-chapters';
const DEFAULT_INTERVAL_MINUTES = 60;
const PHASES = ['svg', 'solutions'];
const SETTLED = new Set(['committed', 'skipped', 'rejected']);

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: true,
  properties: {
    verdict: { type: 'string', enum: ['accept', 'reject'] },
    summary: { type: 'string' },
    findings: { type: 'array', items: { type: 'string' } },
  },
  required: ['verdict', 'summary', 'findings'],
};

const ALLOWED_PREFIXES = ['contents/', 'resources/', 'scripts/figures/', 'tests/'];
const ALLOWED_FILES = new Set(['scripts/generate-figures.js']);

export function textbookChapters(summary) {
  return summary.filter(chapter => chapter.chapterNumber >= 1);
}

export function chapterFiles(summary, chapterNumber) {
  const chapter = summary.find(item => item.chapterNumber === chapterNumber);
  if (!chapter) {
    return [];
  }
  return [chapter.chapterFile, ...chapter.sections.map(section => section.sectionFile)];
}

export function rasterNamesIn(markdown) {
  const re = /(?:\]\(|src=["'])(?:\.\.\/|\/)?resources\/([^)"'\s]+\.(?:jpe?g|png))/gi;
  return [...markdown.matchAll(re)].map(match => match[1]);
}

export function listRasterFigures(root, relativeFiles) {
  const names = new Set();
  for (const rel of relativeFiles) {
    const text = fs.readFileSync(path.join(root, rel), 'utf8');
    for (const name of rasterNamesIn(text)) {
      names.add(name);
    }
  }
  return [...names].sort();
}

export function isSettled(status) {
  return SETTLED.has(status);
}

/**
 * Next chapter that still needs a Claude request.
 * Solutions wait until every chapter's SVG pass has settled, unless a phase
 * was requested explicitly.
 */
export function nextJob(state, options = {}) {
  const numbers = Object.keys(state.chapters)
    .map(Number)
    .sort((a, b) => a - b);
  const phases = options.phase ? [options.phase] : PHASES;
  for (const phase of phases) {
    if (phase === 'solutions' && !options.phase) {
      const svgOpen = numbers.some(number => !isSettled(state.chapters[number].svg));
      if (svgOpen) {
        continue;
      }
    }
    for (const number of numbers) {
      if (options.chapter && number !== options.chapter) {
        continue;
      }
      const status = state.chapters[number][phase];
      if (!isSettled(status)) {
        return { chapter: number, phase, status };
      }
    }
  }
  return null;
}

/** Milliseconds until another Claude request is allowed. */
export function waitMs(lastRequestAt, intervalMs, now) {
  if (!lastRequestAt) {
    return 0;
  }
  const started = typeof lastRequestAt === 'number' ? lastRequestAt : Date.parse(lastRequestAt);
  if (Number.isNaN(started)) {
    return 0;
  }
  return Math.max(0, started + intervalMs - now);
}

export function parseVerdict(text) {
  const empty = {
    verdict: 'reject',
    summary: 'Codex returned no review.',
    findings: [],
  };
  if (!text || !text.trim()) {
    return empty;
  }
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try {
      const parsed = JSON.parse(text.slice(start, end + 1));
      if (parsed.verdict === 'accept' || parsed.verdict === 'reject') {
        return {
          verdict: parsed.verdict,
          summary: String(parsed.summary || ''),
          findings: Array.isArray(parsed.findings) ? parsed.findings.map(String) : [],
        };
      }
    } catch {
      // Fall through to the reject below.
    }
  }
  return {
    verdict: 'reject',
    summary: 'Codex review was not a verdict JSON object.',
    findings: [],
  };
}

export function allowedChange(filePath) {
  const normalized = filePath.replaceAll('\\', '/').replace(/^\.\//, '');
  if (ALLOWED_FILES.has(normalized)) {
    return true;
  }
  return ALLOWED_PREFIXES.some(prefix => normalized.startsWith(prefix));
}

export function unexpectedPaths(statusLines) {
  return statusLines
    .map(line => line.slice(3).trim())
    .map(entry => entry.split(' -> ').pop())
    .filter(filePath => filePath && !allowedChange(filePath));
}

export function svgPrompt(chapter, title, files, rasters) {
  const figureList = rasters.length
    ? rasters.map(name => `- resources/${name}`).join('\n')
    : '- (none found; confirm, then stop)';
  return `Redraw the line-art figures in chapter ${chapter} (${title}) as generated SVGs.

This is one chapter only. Do not edit other chapters. Do not commit. Do not push.

Raster images still referenced from this chapter:
${figureList}

Chapter files:
${files.map(file => `- ${file}`).join('\n')}

Do this:
1. Read each raster and the markdown around it. Photographs of real scenes, people, apparatus, or astronomical objects stay JPEG or PNG. Diagrams, graphs, maps drawn as line art, circuit schematics, free-body sketches, and geometry become SVG.
2. If every remaining raster is a photograph, change nothing.
3. Otherwise add one function per diagram to a chapter module under scripts/figures/ (create scripts/figures/ch${String(chapter).padStart(2, '0')}.js or extend the module that already owns this chapter). Use the helpers in scripts/figures/svg.js. Follow the label markup documented at the top of that file. Register new modules in scripts/generate-figures.js.
4. Take magnitudes, angles, and axis labels from the caption and the surrounding text so the picture agrees with the section. Run \`node scripts/generate-figures.js\` and commit the generated resources/*.svg files by leaving them in the worktree. Do not hand-edit SVG XML.
5. Point the markdown image at the new .svg. Keep the alt text and the caption. Leave the original JPEG in resources/.
6. Do not restyle unrelated prose, solutions, or navigation.

End your final message with a line that is exactly one of:
PACE_RESULT: done
PACE_RESULT: skipped
`;
}

export function solutionsPrompt(chapter, title, files) {
  return `Bring chapter ${chapter} (${title}) end-of-section solutions up to the book format.

This is one chapter only. Do not edit other chapters. Do not commit. Do not push.

Chapter files:
${files.map(file => `- ${file}`).join('\n')}

Run \`python3 -B scripts/find_incomplete_solutions.py ${chapter} --json\` and update every exercise it reports. That checker covers Problems & Exercises and Conceptual Questions. A solution is complete only when it has Strategy, Solution, and Discussion. Leave worked examples and other section prose alone unless an edit is required to keep a figure reference valid.

Use this layout inside the existing solution container (\`:::: solution\` or \`::: solution\`). Keep the problem statement unchanged.

**Strategy**

One short paragraph naming the physical principle and the quantities to find. No arithmetic yet.

**Solution**

The worked steps. Put displayed equations in \`<div class="equation">\` with \`$$...$$\`. Put a unit on every numeric value, using the macros already used in that chapter (\`\\m\`, \`\\s\`, \`\\kg\`, \`\\N\`, and so on). Label sub-parts \`**(a)**\`, \`**(b)**\`, and so on when the problem has them.

**Discussion**

Why the result is reasonable: a unit check, a limiting case, a sign, or a comparison with a value already in the section. Do not invent a different physical situation. A single assumed number is appropriate when it makes a conceptual question concrete and the assumption is stated. Do not change a numerical answer the solution already gives.

**Answer**

The final result, with units, one line per part.

Preserve correct physics that is already there; restructure it instead of replacing it. If a solution is missing, write it from the problem and the section. Do not add a solution to an exercise the checker does not list.

End your final message with a line that is exactly one of:
PACE_RESULT: done
PACE_RESULT: skipped
`;
}

export function reviewPrompt(chapter, phase) {
  const scope =
    phase === 'svg'
      ? `redrawing chapter ${chapter} line-art rasters as generated SVGs`
      : `updating chapter ${chapter} end-of-section solutions into Strategy, Solution, Discussion, and Answer`;
  return `Review the uncommitted changes in this worktree. They are supposed to be only ${scope}.

Accept only when all of these hold:
- Every changed file belongs to chapter ${chapter}, plus a figure module, scripts/generate-figures.js, or a test that covers that chapter.
- SVG figures are produced by scripts/figures and registered with the generator. Hand-written SVG XML with no generator function is a reject.
- Diagram labels and any numbers read off a figure agree with the caption and the section. Photographs are still raster images.
- Solutions keep the problem text, keep any numerical result that was already correct, put a unit on every value, and include Strategy, Solution, Discussion, and Answer.
- No unrelated rewrite, no deleted chapter content, no secrets, no generated site output.

Reject when any of those fail. Name the file and the problem in findings.

Return only a JSON object with verdict ("accept" or "reject"), summary (a short paragraph), and findings (an array of strings).
`;
}

function emptyState(branch, worktree, intervalMs) {
  return {
    branch,
    worktree,
    intervalMs,
    lastRequestAt: null,
    chapters: {},
  };
}

export function reconcileState(state, summary) {
  for (const chapter of textbookChapters(summary)) {
    const key = String(chapter.chapterNumber);
    if (!state.chapters[key]) {
      state.chapters[key] = { svg: 'pending', solutions: 'pending' };
    }
  }
  return state;
}

function loadSummary() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'summary.json'), 'utf8'));
}

function logDir() {
  return path.join(ROOT, 'logs', 'paced-agents');
}

function statePath() {
  return path.join(logDir(), 'state.json');
}

function loadState(options) {
  const summary = loadSummary();
  let state;
  if (fs.existsSync(statePath())) {
    state = JSON.parse(fs.readFileSync(statePath(), 'utf8'));
  } else {
    state = emptyState(options.branch, options.worktree, options.intervalMs);
  }
  state.branch = options.branch;
  state.worktree = options.worktree;
  state.intervalMs = options.intervalMs;
  return reconcileState(state, summary);
}

function saveState(state) {
  fs.mkdirSync(logDir(), { recursive: true });
  fs.writeFileSync(statePath(), `${JSON.stringify(state, null, 2)}\n`);
}

function git(args, cwd) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function gitOk(args, cwd) {
  const result = git(args, cwd);
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
  }
  return (result.stdout || '').trim();
}

function assertWorktree(worktree, branch) {
  const toplevel = gitOk(['rev-parse', '--show-toplevel'], worktree);
  const current = gitOk(['rev-parse', '--abbrev-ref', 'HEAD'], worktree);
  if (path.resolve(toplevel) !== path.resolve(worktree)) {
    throw new Error(`Refusing to edit ${toplevel}; expected worktree ${worktree}.`);
  }
  if (path.resolve(worktree) === path.resolve(ROOT)) {
    throw new Error('Refusing to edit the checkout that launched the script.');
  }
  if (current !== branch) {
    throw new Error(`Worktree is on ${current}, not ${branch}.`);
  }
  if (current === 'main' || current === 'master') {
    throw new Error(`Refusing to commit on ${current}.`);
  }
}

function trustWorktree(worktree) {
  const home = process.env.CODEX_HOME || path.join(os.homedir(), '.codex');
  const configPath = path.join(home, 'config.toml');
  if (!fs.existsSync(configPath)) {
    return;
  }
  const marker = `[projects.${JSON.stringify(worktree)}]`;
  const text = fs.readFileSync(configPath, 'utf8');
  if (text.includes(marker)) {
    return;
  }
  fs.appendFileSync(configPath, `\n${marker}\ntrust_level = "trusted"\n`);
}

function linkDependencies(worktree) {
  const link = path.join(worktree, 'node_modules');
  const source = path.join(ROOT, 'node_modules');
  if (!fs.existsSync(link) && fs.existsSync(source)) {
    fs.symlinkSync(source, link, 'dir');
  }
}

function ensureWorktree(branch, worktree) {
  if (path.resolve(worktree) === path.resolve(ROOT) || worktree.startsWith(`${ROOT}${path.sep}`)) {
    throw new Error('--worktree must be outside this checkout.');
  }
  const listed = gitOk(['worktree', 'list', '--porcelain'], ROOT);
  const already = listed.includes(`worktree ${path.resolve(worktree)}`);
  if (already) {
    linkDependencies(worktree);
    trustWorktree(path.resolve(worktree));
    assertWorktree(worktree, branch);
    return;
  }
  fs.mkdirSync(path.dirname(worktree), { recursive: true });
  const exists = git(['rev-parse', '--verify', '--quiet', branch], ROOT);
  if (exists.status === 0) {
    gitOk(['worktree', 'add', worktree, branch], ROOT);
  } else {
    gitOk(['worktree', 'add', '-b', branch, worktree, 'HEAD'], ROOT);
  }
  linkDependencies(worktree);
  trustWorktree(path.resolve(worktree));
  assertWorktree(worktree, branch);
}

function porcelain(worktree) {
  return gitOk(['status', '--porcelain'], worktree).split('\n').filter(Boolean);
}

let activeChild = null;

function runCommand(bin, args, { cwd, logPath }) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    const log = fs.createWriteStream(logPath, { flags: 'a' });
    log.write(
      `\n$ ${bin} ${args.map(arg => (arg.includes(' ') ? `'${arg}'` : arg)).join(' ')}\n\n`
    );
    const child = spawn(bin, args, { cwd, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
    activeChild = child;
    const pump = chunk => {
      process.stdout.write(chunk);
      log.write(chunk);
    };
    child.stdout.on('data', pump);
    child.stderr.on('data', pump);
    child.on('error', error => {
      activeChild = null;
      log.end();
      reject(error);
    });
    child.on('close', code => {
      activeChild = null;
      log.end();
      resolve(code ?? 1);
    });
  });
}

function incompleteCount(worktree, chapter) {
  const script = path.join(worktree, 'scripts', 'find_incomplete_solutions.py');
  const result = spawnSync('python3', ['-B', script, String(chapter), '--json'], {
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || `solution check failed for chapter ${chapter}`);
  }
  const problems = JSON.parse(result.stdout || '[]');
  return problems.length;
}

function acquireLock() {
  const lockPath = path.join(logDir(), 'pace-agents.lock');
  fs.mkdirSync(logDir(), { recursive: true });
  if (fs.existsSync(lockPath)) {
    const pid = Number(fs.readFileSync(lockPath, 'utf8'));
    if (pid && isAlive(pid)) {
      throw new Error(`Already running as pid ${pid}.`);
    }
  }
  fs.writeFileSync(lockPath, String(process.pid));
  return lockPath;
}

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function releaseLock(lockPath) {
  if (lockPath && fs.existsSync(lockPath)) {
    const pid = Number(fs.readFileSync(lockPath, 'utf8'));
    if (pid === process.pid) {
      fs.unlinkSync(lockPath);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function stamp() {
  return new Date().toISOString().replaceAll(':', '-');
}

function writeReview(chapter, phase, verdict, extra) {
  const file = path.join(logDir(), 'reviews', `ch${chapter}-${phase}-${stamp()}.md`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const findings = verdict.findings.length
    ? verdict.findings.map(item => `- ${item}`).join('\n')
    : '- (none)';
  const body = `# Chapter ${chapter} ${phase}\n\nVerdict: **${verdict.verdict}**\n\n${verdict.summary}\n\n## Findings\n\n${findings}\n\n${extra || ''}\n`;
  fs.writeFileSync(file, body);
  return file;
}

function savePatch(worktree, chapter, phase) {
  const file = path.join(logDir(), 'patches', `ch${chapter}-${phase}-${stamp()}.patch`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const diff = git(['diff', 'HEAD'], worktree);
  const untracked = porcelain(worktree).filter(line => line.startsWith('??'));
  let extra = '';
  for (const line of untracked) {
    const name = line.slice(3).trim();
    extra += `\n# untracked ${name}\n`;
  }
  fs.writeFileSync(file, `${diff.stdout || ''}${extra}`);
  return file;
}

function resetWorktree(worktree) {
  gitOk(['reset', '--hard', 'HEAD'], worktree);
  gitOk(['clean', '-fd'], worktree);
}

function commitWork(worktree, message, body) {
  gitOk(['add', '-A'], worktree);
  const cached = git(['diff', '--cached', '--quiet'], worktree);
  if (cached.status === 0) {
    return { ok: false, empty: true, output: 'Nothing to commit.' };
  }
  const first = git(['commit', '-m', message, '-m', body], worktree);
  if (first.status === 0) {
    return { ok: true, output: first.stdout };
  }
  git(['add', '-A'], worktree);
  const second = git(['commit', '-m', message, '-m', body], worktree);
  if (second.status === 0) {
    return { ok: true, output: second.stdout };
  }
  return { ok: false, empty: false, output: `${first.stderr}\n${first.stdout}\n${second.stderr}` };
}

function formatStatus(state) {
  const lines = ['Chapter  SVG            Solutions', '-------  -------------  -------------'];
  for (const number of Object.keys(state.chapters).sort((a, b) => Number(a) - Number(b))) {
    const record = state.chapters[number];
    lines.push(`${number.padStart(7)}  ${record.svg.padEnd(13)}  ${record.solutions.padEnd(13)}`);
  }
  const job = nextJob(state);
  lines.push('');
  lines.push(job ? `Next: chapter ${job.chapter} ${job.phase} (${job.status})` : 'Next: finished');
  lines.push(`Branch: ${state.branch}`);
  lines.push(`Worktree: ${state.worktree}`);
  const remaining = waitMs(state.lastRequestAt, state.intervalMs, Date.now());
  if (remaining > 0) {
    lines.push(`Next request allowed in ${Math.ceil(remaining / 60000)} min`);
  }
  return lines.join('\n');
}

function claudeArgs(prompt, interactive, model) {
  const args = ['-p', '--output-format', 'text'];
  if (interactive) {
    args.push('--permission-mode', 'acceptEdits');
  } else {
    args.push('--permission-mode', 'bypassPermissions', '--dangerously-skip-permissions');
  }
  if (model) {
    args.push('--model', model);
  }
  args.push(prompt);
  return args;
}

function codexArgs(prompt, worktree, schemaFile, lastMessage, model) {
  const args = [
    'exec',
    '-s',
    'read-only',
    '-C',
    worktree,
    '-o',
    lastMessage,
    '--output-schema',
    schemaFile,
    '--color',
    'never',
  ];
  if (model) {
    args.push('-m', model);
  }
  args.push(prompt);
  return args;
}

function which(bin) {
  const result = spawnSync('which', [bin], { encoding: 'utf8' });
  return result.status === 0;
}

async function runJob(state, job, options) {
  const summary = loadSummary();
  const meta = summary.find(chapter => chapter.chapterNumber === job.chapter);
  const files = chapterFiles(summary, job.chapter);
  const record = state.chapters[String(job.chapter)];
  const worktree = state.worktree;
  assertWorktree(worktree, state.branch);

  if (record[job.phase] === 'commit-failed') {
    return finishCommit(state, job, meta, options);
  }

  const dirty = porcelain(worktree);
  const resumeReview = record[job.phase] === 'in-progress' && dirty.length > 0;
  if (!resumeReview) {
    if (job.phase === 'svg') {
      const rasters = listRasterFigures(worktree, files);
      if (rasters.length === 0) {
        record.svg = 'skipped';
        record.svgNote = 'No raster figures remain.';
        saveState(state);
        console.log(`Chapter ${job.chapter}: no rasters, skipped without a request.`);
        return 'skipped';
      }
    } else {
      const remaining = incompleteCount(worktree, job.chapter);
      if (remaining === 0) {
        record.solutions = 'skipped';
        record.solutionsNote = 'Checker reports no incomplete solutions.';
        saveState(state);
        console.log(`Chapter ${job.chapter}: solutions already complete, skipped.`);
        return 'skipped';
      }
    }
    const logPath = path.join(logDir(), 'logs', `ch${job.chapter}-${job.phase}-${stamp()}.log`);
    const prompt =
      job.phase === 'svg'
        ? svgPrompt(job.chapter, meta.chapterTitle, files, listRasterFigures(worktree, files))
        : solutionsPrompt(job.chapter, meta.chapterTitle, files);
    record[job.phase] = 'in-progress';
    state.lastRequestAt = new Date().toISOString();
    saveState(state);
    console.log(`\nClaude: chapter ${job.chapter} ${job.phase}`);
    const code = await runCommand(
      options.claudeBin,
      claudeArgs(prompt, options.interactive, options.claudeModel),
      { cwd: worktree, logPath }
    );
    if (code !== 0) {
      const patch = savePatch(worktree, job.chapter, job.phase);
      resetWorktree(worktree);
      record[job.phase] = 'pending';
      record[`${job.phase}Note`] = `Claude exited ${code}. Patch: ${patch}`;
      saveState(state);
      console.error(`Claude exited ${code}. Worktree reset. Patch: ${patch}`);
      return 'pause';
    }
    const after = porcelain(worktree);
    const logText = fs.readFileSync(logPath, 'utf8');
    if (after.length === 0) {
      record[job.phase] = 'skipped';
      record[`${job.phase}Note`] = logText.includes('PACE_RESULT: skipped')
        ? 'Claude left the chapter unchanged.'
        : 'Claude exited cleanly with no edits.';
      saveState(state);
      console.log(`Chapter ${job.chapter} ${job.phase}: no edits, skipped.`);
      return 'done';
    }
  }

  return reviewAndMaybeCommit(state, job, meta, options);
}

async function reviewAndMaybeCommit(state, job, meta, options) {
  const worktree = state.worktree;
  const schemaFile = path.join(logDir(), 'review-schema.json');
  const lastMessage = path.join(logDir(), 'logs', `ch${job.chapter}-${job.phase}-verdict.json`);
  fs.mkdirSync(path.dirname(lastMessage), { recursive: true });
  fs.writeFileSync(schemaFile, `${JSON.stringify(REVIEW_SCHEMA, null, 2)}\n`);
  const logPath = path.join(
    logDir(),
    'logs',
    `ch${job.chapter}-${job.phase}-review-${stamp()}.log`
  );
  console.log(`\nCodex review: chapter ${job.chapter} ${job.phase}`);
  const code = await runCommand(
    process.env.CODEX_BIN || 'codex',
    codexArgs(
      reviewPrompt(job.chapter, job.phase),
      worktree,
      schemaFile,
      lastMessage,
      options.codexModel
    ),
    { cwd: worktree, logPath }
  );
  const raw = fs.existsSync(lastMessage) ? fs.readFileSync(lastMessage, 'utf8') : '';
  if (code !== 0) {
    const failure = parseVerdict(raw);
    failure.summary = `Codex exited ${code}. ${failure.summary}`;
    const reviewFile = writeReview(job.chapter, job.phase, failure, `Log: ${logPath}`);
    const record = state.chapters[String(job.chapter)];
    record[job.phase] = 'in-progress';
    record[`${job.phase}Review`] = reviewFile;
    saveState(state);
    console.error(`Codex exited ${code}. Edits kept for a retry.\nReview: ${reviewFile}`);
    return 'pause';
  }
  const verdict = parseVerdict(raw);
  const paths = unexpectedPaths(porcelain(worktree));
  if (paths.length > 0 && verdict.verdict === 'accept') {
    verdict.verdict = 'reject';
    verdict.findings.push(`Orchestrator refused paths outside the chapter: ${paths.join(', ')}`);
  }
  const reviewFile = writeReview(job.chapter, job.phase, verdict, `Log: ${logPath}`);
  console.log(`\nVerdict: ${verdict.verdict}\n${verdict.summary}\nReview: ${reviewFile}`);
  const record = state.chapters[String(job.chapter)];
  record[`${job.phase}Review`] = reviewFile;
  if (verdict.verdict !== 'accept') {
    const patch = savePatch(worktree, job.chapter, job.phase);
    resetWorktree(worktree);
    record[job.phase] = 'rejected';
    record[`${job.phase}Note`] = patch;
    saveState(state);
    console.log(`Not committed. Patch: ${patch}`);
    return job.phase === 'solutions' ? 'pause' : 'done';
  }
  return finishCommit(state, job, meta);
}

function finishCommit(state, job, meta) {
  const worktree = state.worktree;
  const record = state.chapters[String(job.chapter)];
  const title =
    job.phase === 'svg'
      ? `Redraw chapter ${job.chapter} line-art figures as generated SVGs`
      : `Bring chapter ${job.chapter} solutions up to Strategy, Solution, and Discussion`;
  const review = record[`${job.phase}Review`] || '';
  const body = [`Chapter: ${meta.chapterTitle}`, review ? `Codex review: ${review}` : '']
    .filter(Boolean)
    .join('\n\n');
  const result = commitWork(worktree, title, body);
  if (result.empty) {
    record[job.phase] = 'skipped';
    record[`${job.phase}Note`] = 'Review accepted an empty diff.';
    saveState(state);
    return 'done';
  }
  if (!result.ok) {
    record[job.phase] = 'commit-failed';
    record[`${job.phase}Note`] = result.output;
    saveState(state);
    console.error(result.output);
    return 'pause';
  }
  record[job.phase] = 'committed';
  saveState(state);
  console.log(result.output);
  return 'done';
}

function applyRetry(state, chapter) {
  const record = state.chapters[String(chapter)];
  if (!record) {
    throw new Error(`No chapter ${chapter} in the pace state.`);
  }
  for (const phase of PHASES) {
    if (record[phase] === 'rejected' || record[phase] === 'commit-failed') {
      record[phase] = 'pending';
      saveState(state);
      return phase;
    }
  }
  return null;
}

function skipJob(state, job) {
  state.chapters[String(job.chapter)][job.phase] = 'skipped';
  saveState(state);
}

function parseCli(argv) {
  const options = {
    once: false,
    status: false,
    dryRun: false,
    interactive: false,
    phase: null,
    chapter: null,
    retry: null,
    skipCurrent: false,
    branch: DEFAULT_BRANCH,
    worktree: path.resolve(ROOT, '..', 'physics-book-paced-chapters'),
    intervalMs: DEFAULT_INTERVAL_MINUTES * 60 * 1000,
    claudeBin: process.env.CLAUDE_BIN || 'claude',
    claudeModel: process.env.CLAUDE_MODEL || '',
    codexModel: process.env.CODEX_MODEL || '',
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === '--once') {
      options.once = true;
    } else if (arg === '--status') {
      options.status = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--interactive') {
      options.interactive = true;
    } else if (arg === '--skip-current') {
      options.skipCurrent = true;
    } else if (arg === '--phase' && next) {
      if (!PHASES.includes(next)) {
        throw new Error('--phase must be svg or solutions');
      }
      options.phase = next;
      i += 1;
    } else if (arg === '--chapter' && next) {
      options.chapter = Number(next);
      i += 1;
    } else if (arg === '--retry' && next) {
      options.retry = Number(next);
      i += 1;
    } else if (arg === '--interval' && next) {
      options.intervalMs = Number(next) * 60 * 1000;
      i += 1;
    } else if (arg === '--branch' && next) {
      options.branch = next;
      i += 1;
    } else if (arg === '--worktree' && next) {
      options.worktree = path.resolve(next);
      i += 1;
    } else if (arg === '--claude-model' && next) {
      options.claudeModel = next;
      i += 1;
    } else if (arg === '--codex-model' && next) {
      options.codexModel = next;
      i += 1;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (options.chapter !== null && !Number.isInteger(options.chapter)) {
    throw new Error('--chapter must be an integer');
  }
  if (!Number.isFinite(options.intervalMs) || options.intervalMs < 0) {
    throw new Error('--interval must be a number of minutes');
  }
  return options;
}

function helpText() {
  return `Pace Claude, then Codex, through every chapter.

  node scripts/pace-agents.js                  Hourly loop on a separate branch
  node scripts/pace-agents.js --once           One Claude request, then exit
  node scripts/pace-agents.js --status         Show chapter progress
  node scripts/pace-agents.js --dry-run        Show the next chapter only
  node scripts/pace-agents.js --phase svg      Figures only
  node scripts/pace-agents.js --phase solutions
  node scripts/pace-agents.js --chapter 12     Restrict to one chapter
  node scripts/pace-agents.js --interval 60    Minutes between Claude requests
  node scripts/pace-agents.js --retry 12       Queue a rejected chapter again
  node scripts/pace-agents.js --skip-current   Mark the next chapter settled

The loop uses its own worktree and never checks out that branch here.
A rejected solution review stops the loop. A rejected figure review is logged
and the loop continues an hour later. Nothing is pushed.
`;
}

function jobNeedsClaude(state, job, worktree) {
  const status = state.chapters[String(job.chapter)][job.phase];
  if (status === 'commit-failed') {
    return false;
  }
  if (status === 'in-progress' && porcelain(worktree).length > 0) {
    return false;
  }
  const files = chapterFiles(loadSummary(), job.chapter);
  if (job.phase === 'svg') {
    return listRasterFigures(worktree, files).length > 0;
  }
  return incompleteCount(worktree, job.chapter) > 0;
}

async function main(argv) {
  const options = parseCli(argv);
  if (options.help) {
    console.log(helpText());
    return 0;
  }
  const state = loadState(options);
  const jobFilter = { phase: options.phase, chapter: options.chapter };
  if (options.retry) {
    const phase = applyRetry(state, options.retry);
    console.log(
      phase ? `Chapter ${options.retry} ${phase} queued again.` : 'Nothing rejected to retry.'
    );
  }
  if (options.skipCurrent) {
    const job = nextJob(state, jobFilter);
    if (!job) {
      console.log('Nothing left to skip.');
      return 0;
    }
    skipJob(state, job);
    console.log(`Skipped chapter ${job.chapter} ${job.phase}.`);
  }
  if (options.dryRun) {
    const job = nextJob(state, jobFilter);
    console.log(formatStatus(state));
    if (!job) {
      console.log('Nothing left to do.');
      return 0;
    }
    const summary = loadSummary();
    const meta = summary.find(chapter => chapter.chapterNumber === job.chapter);
    const files = chapterFiles(summary, job.chapter);
    const root = fs.existsSync(state.worktree) ? state.worktree : ROOT;
    console.log('');
    if (job.phase === 'svg') {
      console.log(svgPrompt(job.chapter, meta.chapterTitle, files, listRasterFigures(root, files)));
    } else {
      console.log(solutionsPrompt(job.chapter, meta.chapterTitle, files));
    }
    return 0;
  }
  if (options.status || options.retry || options.skipCurrent) {
    console.log(formatStatus(state));
    return 0;
  }

  if (!which(options.claudeBin) || !which(process.env.CODEX_BIN || 'codex')) {
    throw new Error('claude and codex must both be on PATH.');
  }
  ensureWorktree(options.branch, options.worktree);
  const lock = acquireLock();
  const stop = () => {
    if (activeChild) {
      activeChild.kill('SIGTERM');
    }
    releaseLock(lock);
  };
  process.on('SIGINT', () => {
    stop();
    process.exit(130);
  });
  process.on('SIGTERM', () => {
    stop();
    process.exit(143);
  });

  try {
    for (;;) {
      const current = loadState(options);
      const job = nextJob(current, jobFilter);
      if (!job) {
        console.log('Every requested chapter has settled.');
        return 0;
      }
      const needsClaude = jobNeedsClaude(current, job, options.worktree);
      const remaining = waitMs(current.lastRequestAt, current.intervalMs, Date.now());
      if (needsClaude && remaining > 0) {
        const when = new Date(Date.now() + remaining);
        console.log(`Waiting until ${when.toLocaleString()} for the next request.`);
        await sleep(remaining);
      }
      const action = await runJob(loadState(options), job, options);
      if (action === 'pause') {
        console.log(formatStatus(loadState(options)));
        console.log('Paused. Read the review under logs/paced-agents/reviews/.');
        return 2;
      }
      if (options.once && action === 'done') {
        return 0;
      }
    }
  } finally {
    stop();
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main(process.argv.slice(2))
    .then(code => {
      process.exitCode = code;
    })
    .catch(error => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
