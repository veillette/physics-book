"""Run with python3 -B -m unittest tests/test_find_incomplete_solutions.py."""

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from scripts import find_incomplete_solutions as scan


FIXTURE = '''
#### Conceptual Questions
<div class="exercise">
:::: problem
Why does light spread?
::::
</div>
<div class="exercise" data-element-type="conceptual-questions">
<div class="problem">
Can a beam be perfectly parallel?
</div>
<div class="solution">

</div>
</div>
### Problems &amp; Exercises
<div class="exercise">
::: problem
Calculate the diffraction angle.
:::
::: solution
**Strategy** Use the diffraction relation.
**Solution** The angle is 0.1 rad.
**Discussion** A smaller aperture increases spreading.
:::
</div>
<div class="exercise" data-element-type="CONCEPTUAL-QUESTIONS">
::: problem
How does aperture affect spreading?
:::
::: solution
**Strategy** Consider diffraction.
**Solution** A smaller aperture increases spreading.
**Discussion** This limits resolution.
:::
</div>
<div class="exercise" data-element-type="check-understanding">
::: problem
This explicitly typed check is excluded.
:::
</div>
### Section Summary
<div class="exercise">
::: problem
This untyped exercise is outside a recognized section.
:::
</div>
'''


class IncompleteSolutionsTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.path = self.root / 'ch27Diffraction.md'
        self.path.write_text(FIXTURE, encoding='utf-8')

    def test_both_types_and_separate_numbering(self):
        exercises = scan.analyze_file(self.path, 27, self.root)
        self.assertEqual([(p.exercise_type, p.number) for p in exercises], [
            ('conceptual-questions', 1),
            ('conceptual-questions', 2),
            ('problems-exercises', 1),
            ('conceptual-questions', 3),
        ])
        self.assertEqual([p.has_solution_block for p in exercises], [False, False, True, True])
        self.assertEqual([p.complete for p in exercises], [False, False, True, True])
        self.assertEqual(FIXTURE.splitlines()[exercises[0].line - 1], '<div class="exercise">')

    def test_type_filters_preserve_numbers(self):
        for exercise_type, expected_numbers in [
            ('problems-exercises', [1]), ('conceptual-questions', [1, 2, 3]),
        ]:
            with self.subTest(exercise_type=exercise_type):
                exercises = scan.analyze_file(self.path, 27, self.root, exercise_type)
                self.assertEqual([p.number for p in exercises], expected_numbers)
                self.assertTrue(all(p.exercise_type == exercise_type for p in exercises))

    def run_cli(self, *args):
        return subprocess.run(
            [sys.executable, '-B', str(Path(scan.__file__).resolve()),
             '--contents-dir', str(self.root), *args],
            capture_output=True, text=True, check=False,
        )

    def test_cli_reports_unanswered_conceptual_questions(self):
        result = self.run_cli('--type', 'conceptual-questions', '--missing', 'no-solution',
                              '--json', '--strict')
        self.assertEqual(result.returncode, 1, result.stderr)
        rows = json.loads(result.stdout)
        self.assertEqual([p['number'] for p in rows], [1, 2])
        self.assertTrue(all(p['exercise_type'] == 'conceptual-questions' for p in rows))
        self.assertTrue(all(p['status'] == 'no solution' for p in rows))

    def test_cli_default_includes_conceptual_and_problems_filter_excludes_them(self):
        result = self.run_cli('--strict')
        self.assertEqual(result.returncode, 1, result.stderr)
        self.assertIn('Conceptual question 1: no solution', result.stdout)
        result = self.run_cli('--type', 'problems-exercises', '--json', '--strict')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout), [])


if __name__ == '__main__':
    unittest.main()
