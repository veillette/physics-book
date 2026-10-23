"""Meaningful coverage and checkpoint-integrity tests for the review ledger."""
import contextlib
import io
import json
from pathlib import Path
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

from scripts import review_solutions as review


EXERCISE = '''<div class="exercise" data-element-type="conceptual-questions">
::: problem
Why?
:::
::: solution
**Strategy** Think.
**Solution** Because.
**Discussion** The stated assumptions matter.
:::
</div>
'''


class ReviewSolutionsTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.contents = self.root / 'contents'
        self.contents.mkdir()
        self.output = self.root / 'doc' / 'solution-review'
        self.output.mkdir(parents=True)
        self.path = self.contents / 'ch1Test.md'
        self.path.write_text(EXERCISE)
        root_patch = patch.object(review, 'ROOT', self.root)
        output_patch = patch.object(review, 'OUTPUT', self.output)
        root_patch.start()
        output_patch.start()
        self.addCleanup(root_patch.stop)
        self.addCleanup(output_patch.stop)

    def inventory(self):
        return review.inventory(self.contents)[0]

    def row(self, item):
        return {key: item[key] for key in ('id', 'source_sha256', 'file_sha256')} | dict(
            verdict='appropriate', confidence='high', notes='Checked the physical argument.',
            reviewer='test reviewer')

    def test_includes_all_chapters_and_both_inline_and_integrated_solutions(self):
        self.path.write_text(EXERCISE + '''
:::: example
An integrated worked solution.
**Strategy** Choose a model.
**Solution** Derive the answer.
**Discussion** Check its limits.
::::
<div class="exercise" data-element-type="check-understanding">
::: problem
Check this too.
:::
::: solution
An inline answer.
:::
</div>
''')
        (self.contents / 'ch34Test.md').write_text(EXERCISE)
        items = self.inventory()
        self.assertEqual([item['chapter'] for item in items], [1, 1, 1, 34])
        self.assertEqual([item['kind'] for item in items[:3]], [
            'conceptual-questions', 'worked-example', 'check-understanding'])
        self.assertTrue(all(item['has_solution'] for item in items))
        self.assertTrue(all(item['review_status'] == 'pending' for item in [
            dict(i, review_status=review.status(i, {})) for i in items]))

    def test_uncovered_solution_is_error_not_silent_omission(self):
        self.path.write_text(EXERCISE + '\n::: solution\nAn orphan.\n:::\n')
        with self.assertRaisesRegex(ValueError, 'outside an inventoried'):
            self.inventory()
        self.path.write_text(EXERCISE + '\n<div class="solution">Legacy orphan</div>\n')
        with self.assertRaisesRegex(ValueError, 'outside inventory'):
            self.inventory()

    def test_missing_solution_is_separate_from_pending_reasoning_review(self):
        self.path.write_text(EXERCISE.replace('::: solution\n', '::: aside\n'))
        item = self.inventory()[0]
        self.assertFalse(item['has_solution'])
        self.assertEqual(review.status(item, {}), 'missing')
        self.assertEqual(review.status(self.row(self.inventory()[0]) | dict(
            id='other', has_solution=True), {}), 'pending')

    def test_changed_problem_and_changed_context_invalidate_judgment(self):
        item = self.inventory()[0]
        reviews = {item['id']: [self.row(item)]}
        self.assertEqual(review.status(item, reviews), 'appropriate')
        self.path.write_text('New assumptions in the surrounding prose.\n' + EXERCISE)
        changed_context = self.inventory()[0]
        self.assertEqual(item['source_sha256'], changed_context['source_sha256'])
        self.assertEqual(review.status(changed_context, reviews), 'stale-review')
        self.path.write_text(EXERCISE.replace('Why?', 'Why, with different givens?'))
        changed_problem = self.inventory()[0]
        self.assertNotEqual(item['source_sha256'], changed_problem['source_sha256'])
        self.assertEqual(review.status(changed_problem, reviews), 'stale-review')

    def test_inserted_exercise_does_not_inherit_an_old_ordinal_review(self):
        item = self.inventory()[0]
        reviews = {item['id']: [self.row(item)]}
        self.path.write_text(EXERCISE.replace('Why?', 'Different first question?') + EXERCISE)
        first, second = self.inventory()
        self.assertEqual(review.status(first, reviews), 'stale-review')
        self.assertEqual(review.status(second, reviews), 'pending')

    def test_record_is_append_only_and_rejects_whole_stale_batch(self):
        item = self.inventory()[0]
        source = self.path.read_bytes()
        batch = self.root / 'batch.json'
        with contextlib.redirect_stdout(io.StringIO()):
            batch.write_text(json.dumps([self.row(item)]))
            review.record_reviews(batch)
            review.record_reviews(batch)
            saved = (self.output / 'reviews.json').read_bytes()
            self.assertEqual(len(json.loads(saved)[item['id']]), 2)
            stale = self.row(item) | dict(source_sha256='outdated')
            batch.write_text(json.dumps([self.row(item), stale]))
            with self.assertRaisesRegex(ValueError, 'Stale source'):
                review.record_reviews(batch)
            self.assertEqual((self.output / 'reviews.json').read_bytes(), saved)
        self.assertEqual(self.path.read_bytes(), source)

    def checker(self, command, **kwargs):
        if command[0] == 'node':
            return SimpleNamespace(returncode=0, stdout='All delimiters balanced.\n', stderr='')
        chapter = int(command[-2])
        results = []
        if chapter == 1:
            results = [dict(file=str(self.path), line=5, status='failed',
                            reason='needs contextual review', kind='equation', expression='1=2')]
        summary = dict(checked=0, failed=len(results), skipped=0)
        return SimpleNamespace(returncode=0, stdout=json.dumps(dict(
            summary=summary, results=results)), stderr='')

    def test_full_loop_retains_flags_without_inventing_correctness_verdicts(self):
        before = self.path.read_bytes()
        with patch.object(review.subprocess, 'run', side_effect=self.checker) as runner:
            with contextlib.redirect_stdout(io.StringIO()):
                self.assertEqual(review.refresh(), 0)
        self.assertEqual(runner.call_count, 35)
        chapter_calls = [int(call.args[0][-2]) for call in runner.call_args_list[:-1]]
        self.assertEqual(chapter_calls, list(range(1, 35)))
        ledger = json.loads((self.output / 'ledger.json').read_text())
        self.assertEqual(ledger['items'][0]['review_status'], 'pending')
        self.assertEqual(len(ledger['items'][0]['automatic_flags']), 1)
        self.assertEqual(len(ledger['all_automatic_flags']), 1)
        self.assertIsNone(ledger['items'][0]['review'])
        self.assertEqual(self.path.read_bytes(), before)

    def test_failed_chapter_preserves_preexisting_aggregate_ledger(self):
        saved = '{"previous": "complete snapshot"}\n'
        (self.output / 'ledger.json').write_text(saved)

        def fail_after_first(command, **kwargs):
            if command[-2] == '2':
                return SimpleNamespace(returncode=1, stdout='', stderr='checker interrupted')
            return self.checker(command, **kwargs)

        with patch.object(review.subprocess, 'run', side_effect=fail_after_first):
            with contextlib.redirect_stdout(io.StringIO()):
                with self.assertRaisesRegex(RuntimeError, 'Chapter 2 checker failed'):
                    review.refresh()
        self.assertTrue((self.output / 'chapter-01.json').exists())
        self.assertFalse((self.output / 'chapter-02.json').exists())
        self.assertEqual((self.output / 'ledger.json').read_text(), saved)

    def test_next_batch_advances_to_first_unfinished_chapter(self):
        (self.contents / 'ch2Test.md').write_text(EXERCISE)
        first, second = self.inventory()
        review.save_json(self.output / 'reviews.json', {first['id']: [self.row(first)]})
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            review.read_packet(None, 5, 0, False)
        self.assertIn('# Chapter 2 review batch', stdout.getvalue())
        self.assertIn(second['id'], stdout.getvalue())
        self.assertNotIn(first['id'], stdout.getvalue())


if __name__ == '__main__':
    unittest.main()
