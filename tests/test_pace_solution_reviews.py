"""Paced reasoning controller tests; all reviewers are offline local fixtures."""
import contextlib
import fcntl
import io
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import threading
import time
import unittest
from unittest.mock import patch

from scripts import pace_solution_reviews as pace
from scripts import review_solutions as review

EXERCISE = '''<div class="exercise" data-element-type="conceptual-questions">
::: problem
Why is momentum conserved for an isolated system?
:::
::: solution
**Strategy** Sum the external forces.
**Solution** Zero net external force implies constant total momentum.
**Discussion** Internal forces cancel in action-reaction pairs.
:::
</div>
'''

FAKE = '''#!/usr/bin/env python3
import json,re,sys
from pathlib import Path
prompt=sys.stdin.read()
rows=[]
for item_id in re.findall(r'^## ITEM (.+)$',prompt,re.M):
 rows.append(dict(id=item_id,verdict='appropriate',confidence='high',
  reasoning_check='For an isolated system the net external force vanishes.',
  calculation_check='dP/dt equals external force, so total momentum is constant.',
  assumptions='A closed Newtonian system.',notes='Appropriate: sums forces and uses momentum balance.'))
Path(sys.argv[sys.argv.index('-o')+1]).write_text(json.dumps(dict(reviews=rows)))
'''


class PacedReviewTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.contents = self.root / 'contents'
        self.contents.mkdir()
        self.path = self.contents / 'ch1Test.md'
        self.path.write_text(EXERCISE * 3)
        self.output = self.root / 'doc' / 'solution-review'
        self.logs = self.root / 'logs' / 'solution-reasoning'
        for module, attrs in [
            (review, dict(ROOT=self.root, OUTPUT=self.output)),
            (pace, dict(ROOT=self.root, OUTPUT=self.output, LOGS=self.logs,
                        STATE=self.output/'paced-state.json', LOCK=self.logs/'controller.lock',
                        STOP=self.logs/'stop-request')),
        ]:
            for key, value in attrs.items():
                patcher = patch.object(module, key, value)
                patcher.start()
                self.addCleanup(patcher.stop)
        self.fake = self.root / 'fake-codex'
        self.fake.write_text(FAKE)
        self.fake.chmod(0o755)
        self.batch = pace.pending_items()[:2]
        self.options = type('Options', (), dict(
            codex_bin=str(self.fake), hours=16, batch_size=2, max_chars=60000,
            minimum_pause=60, batch_timeout=1, max_failures=2,
            quota_retry_minutes=30, once=True))()

    def answer(self):
        return dict(reviews=[dict(id=i['id'], verdict='appropriate', confidence='high',
            reasoning_check='The net external force vanishes, so momentum is constant.',
            calculation_check='dP/dt=0 follows from the external force balance.',
            assumptions='An isolated Newtonian system.', notes='Appropriate use of total momentum balance.')
            for i in self.batch])

    def test_batches_obey_chapter_and_size_boundaries_without_truncation(self):
        (self.contents / 'ch2Test.md').write_text(EXERCISE)
        items = pace.pending_items()
        self.assertEqual(len(pace.choose_batch(items, 2, 60000)), 2)
        self.assertEqual(len(pace.choose_batch(items, 20, 60000)), 3)
        self.assertEqual(len(pace.choose_batch(items, 20, 1)), 1)
        self.assertEqual(pace.batches_remaining(items, 2, 60000), 3)
        self.assertEqual(pace.batches_remaining(items, 20, 1), 4)
        self.assertEqual(pace.source_block(items[0]), EXERCISE.rstrip('\n'))

    def test_pacing_adapts_to_remaining_time_without_catchup_bursts(self):
        self.assertEqual(pace.interval_seconds(1600, 0, 16, 60), 100)
        self.assertEqual(pace.interval_seconds(1600, 800, 4, 60), 200)
        self.assertEqual(pace.interval_seconds(1600, 1590, 4, 60), 60)

    def test_response_must_cover_exact_batch_once_and_include_reasoning(self):
        document = self.answer()
        saved = pace.validate_answer(document, self.batch, 'test-run')
        self.assertEqual(saved[0]['source_sha256'], self.batch[0]['source_sha256'])
        self.assertEqual(saved[0]['run_id'], 'test-run')
        for broken in [dict(reviews=document['reviews'][:1]),
                       dict(reviews=document['reviews']*2),
                       dict(reviews=[dict(r,id='unknown') for r in document['reviews']]),
                       dict(reviews=[dict(r,reasoning_check='') for r in document['reviews']])]:
            with self.subTest(broken=broken):
                with self.assertRaises(ValueError):
                    pace.validate_answer(broken, self.batch, 'test-run')

    def test_codex_command_is_readonly_noninteractive_and_does_not_bypass_permissions(self):
        command = pace.codex_command('codex', Path('/tmp/schema'), Path('/tmp/answer'))
        self.assertIn('read-only', command)
        self.assertEqual(command[1:3], ['-a', 'never'])
        self.assertIn('--ephemeral', command)
        self.assertIn('--output-schema', command)
        self.assertNotIn('--dangerously-bypass-approvals-and-sandbox', command)
        self.assertNotIn('--approve-for-me', command)

    def test_real_subprocess_records_batch_and_never_writes_source(self):
        source = self.path.read_bytes()
        with patch.object(review, 'refresh', return_value=0), \
                contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(pace.run_loop(self.options), 0)
        state = json.loads(pace.STATE.read_text())
        self.assertEqual(state['recorded_reviews'], 2)
        self.assertEqual(state['completed_batches'], 1)
        self.assertEqual(state['status'], 'one-batch-finished')
        reviews = json.loads((self.output/'reviews.json').read_text())
        self.assertEqual(len(reviews), 2)
        self.assertEqual(self.path.read_bytes(), source)
        self.assertFalse(pace.is_active())
        self.assertEqual(len(pace.pending_items()), 1)

    def test_failed_reviewer_creates_no_judgments_and_saves_failure(self):
        self.fake.write_text('#!/usr/bin/env python3\nraise SystemExit(7)\n')
        with contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(pace.run_loop(self.options), 1)
        state = json.loads(pace.STATE.read_text())
        self.assertEqual(state['status'], 'failed')
        self.assertEqual(state['recorded_reviews'], 0)
        self.assertIn('exited 7', state['last_error'])
        self.assertFalse((self.output/'reviews.json').exists())
        self.assertFalse(pace.is_active())

    def quota_reviewer(self):
        self.fake.write_text('#!/usr/bin/env python3\nimport json\n'
                            'print(json.dumps(dict(type="error",message="You have hit your usage limit")))\n'
                            'raise SystemExit(1)\n')

    def test_usage_limit_waits_without_exhausting_generic_failure_budget(self):
        self.quota_reviewer()
        self.options.once = False
        self.options.max_failures = 1
        with patch.object(pace, 'wait_until', side_effect=[True, False]) as waiter, \
                contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(pace.run_loop(self.options), 0)
        state = json.loads(pace.STATE.read_text())
        self.assertEqual(state['quota_waits'], 1)
        self.assertEqual(state['consecutive_failures'], 0)
        self.assertEqual(state['recorded_reviews'], 0)
        target, deadline, _ = waiter.call_args_list[1].args
        self.assertGreater(target - time.time(), 1790)
        self.assertLess(target, deadline)
        events = [json.loads(line) for line in (self.output/'paced-events.jsonl').read_text().splitlines()]
        self.assertTrue(any(e['event'] == 'waiting-for-quota' for e in events))
        self.assertFalse((self.output/'reviews.json').exists())

    def test_one_batch_usage_limit_is_not_reported_as_success(self):
        self.quota_reviewer()
        with contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(pace.run_loop(self.options), 1)
        self.assertEqual(json.loads(pace.STATE.read_text())['status'], 'usage-limited')

    def test_duplicate_controller_cannot_start(self):
        self.logs.mkdir(parents=True)
        with pace.LOCK.open('a+') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            self.assertTrue(pace.is_active())
            with self.assertRaisesRegex(RuntimeError, 'already running'):
                pace.run_loop(self.options)

    def test_timeout_terminates_real_subprocess_without_recording(self):
        with self.assertRaises(TimeoutError):
            pace.run_reviewer([sys.executable, '-c', 'import time; time.sleep(20)'],
                              'test', self.root/'events', time.time()+0.1, threading.Event())
        self.assertFalse((self.output/'reviews.json').exists())

    def test_expired_deadline_prevents_new_reviewer_launch(self):
        with patch.object(subprocess, 'Popen') as launch:
            with self.assertRaises(TimeoutError):
                pace.run_reviewer(['codex'], '', self.root/'events',
                                  time.time()-1, threading.Event())
            launch.assert_not_called()

    def test_source_edit_during_review_rejects_stale_judgments(self):
        self.fake.write_text(FAKE + '\nPath("contents/ch1Test.md").write_text("Changed source")\n')
        with contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(pace.run_loop(self.options), 1)
        self.assertFalse((self.output/'reviews.json').exists())
        self.assertIn('Unknown item', json.loads(pace.STATE.read_text())['last_error'])


if __name__ == '__main__':
    unittest.main()
