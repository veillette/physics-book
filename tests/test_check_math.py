"""Arithmetic checks for check_math.py. Run from the repo root:

    python -m unittest tests/test_check_math.py
"""

import math
import contextlib
import copy
import io
import json
import tempfile
import unittest
from pathlib import Path

from scripts import check_math as cm
from scripts.physics_cases import run_cases, source_scopes
from scripts.physics_quantity import evaluate, Invalid, Value


def flags(src, tolerance=0.01):
    return list(cm.scan_math(src, tolerance))


class UnitParserTests(unittest.TestCase):
    def test_radiation_dose_units_and_prefixes(self):
        expected = cm.parse_unit('J/kg')[1]
        for unit, scale in [('Gy', 1), ('mGy', 1e-3), ('μGy', 1e-6), ('Sv', 1), ('mSv', 1e-3)]:
            with self.subTest(unit=unit):
                parsed = cm.parse_unit(unit)
                self.assertEqual(parsed[1], expected)
                self.assertEqual(parsed[0], scale)
        self.assertEqual(cm.parse_unit('rad')[1], (('angle', 1),))

    def test_unknown_words_are_not_decomposed_into_unit_products(self):
        for unit in ('spin', 'using', 'sum', 'Mgh', 'Au', 'Hg', 'mday', 'Gyear',
                     'mmin', 'kft', 'mGyunknown', 'kgfurlong'):
            with self.subTest(unit=unit):
                self.assertIsNone(cm.parse_unit(unit))
        self.assertEqual(cm.parse_unit('kWh')[0], 3.6e6)
        self.assertEqual(cm.parse_unit('mAh')[0], 3.6)
        self.assertEqual(cm.parse_unit('hg')[0], 0.1)
        self.assertEqual(cm.parse_unit('My')[0], 1e6 * cm.parse_unit('year')[0])
        self.assertEqual(evaluate(r'2\text{J s}').dim, cm.parse_unit('J·s')[1])
        self.assertEqual(evaluate(r'2\text{J / kg K}').dim, cm.parse_unit('J/kg·K')[1])
        self.assertEqual(evaluate(r'1\text{mm Hg}').dim, cm.parse_unit('Pa')[1])
        self.assertEqual(evaluate(r'1\text{Pa/mm Hg}').dim, ())
        self.assertAlmostEqual(evaluate(r'365.25\text{days/year}').v, 1)
        self.assertEqual(evaluate(r'365.25\text{days/year}').dim, ())

    def test_prefixes_and_compound_units(self):
        self.assertEqual(cm.parse_unit('mm')[0], 1e-3)
        self.assertEqual(cm.parse_unit('cm')[1], (('len', 1),))
        self.assertEqual(cm.parse_unit('min')[0], 60)  # minute, not a milli-inch
        self.assertEqual(cm.parse_unit('ms')[1], (('time', 1),))
        self.assertEqual(cm.parse_unit('m/s')[1], (('len', 1), ('time', -1)))
        self.assertEqual(cm.parse_unit('m/s^2')[1], (('len', 1), ('time', -2)))
        self.assertEqual(cm.parse_unit('kg')[0], 1)
        self.assertAlmostEqual(cm.parse_unit('g/cm^3')[0], 1000)  # kg/m^3
        self.assertEqual(cm.parse_unit('N·m')[1], cm.parse_unit('J')[1])
        self.assertAlmostEqual(cm.parse_unit('kWh')[0], 3.6e6)
        self.assertAlmostEqual(cm.parse_unit('km/h')[0], 1000 / 3600)

    def test_temperature_offset_is_only_absolute(self):
        self.assertEqual(cm.parse_unit('degC')[2], 273.15)
        self.assertEqual(cm.parse_unit('K')[2], 0)
        self.assertEqual(cm.parse_unit('(degC)^-1')[2], 0)


class EquationScanTests(unittest.TestCase):
    def test_trig_with_braced_degrees(self):
        self.assertEqual(flags(r'\sin{30^\circ} = 0.5'), [])
        self.assertEqual(flags(r'\cos{110^\circ} = -0.342'), [])
        self.assertTrue(flags(r'\sin{30^\circ} = 0.9'))
        self.assertEqual(
            flags(r'\sin^{-1}\frac{(1.000)\sin 20^\circ}{1.309} = 15.1^\circ'), [])

    def test_roots_and_juxtaposition(self):
        self.assertEqual(flags(r'\sqrt{4} = 2'), [])
        self.assertEqual(flags(r'\sqrt[3]{8} = 2'), [])
        self.assertEqual(
            flags(r'\sqrt[3]{3.7 \times 10^{-8}} = 3.3 \times 10^{-3}'), [])
        self.assertEqual(flags(r'\frac{9}{5}25 + 32 = 77'), [])
        self.assertAlmostEqual(
            cm.Parser(cm.tokenize(cm.normalize(r'(1.2)3^{1/3}')), False).parse().v,
            1.2 * 3 ** (1 / 3), places=6)

    def test_compound_units_do_not_block_the_arithmetic(self):
        self.assertTrue(flags(r'(2.0\N\cdot\m)/(0.50\kg\cdot\mm) = 4.0'))
        self.assertEqual(flags(r'(2.0\N\cdot\m)/(0.50\kg\cdot\mm) = 4.0\text{s}^{-2}'), [])
        self.assertEqual(flags(r'(4.0\N)(0.340\m) = 1.36\N\cdot\m'), [])
        self.assertTrue(flags(r'(27)(12) = 330'))

    def test_thousands_separator(self):
        self.assertEqual(
            flags(r'11 200 \text{ m/s} = 1.12 \times 10^{4} \text{ m/s}'), [])
        self.assertEqual(
            flags(r'\left(86 400\text{ s}\right) = 8.64 \times 10^{4}\text{ s}'), [])

    def test_unit_conversions(self):
        self.assertEqual(flags(r'20\text{ cm} = 0.200\text{ m}'), [])
        self.assertTrue(flags(r'20\text{ cm} = 0.500\text{ m}'))
        self.assertTrue(flags(r'3\text{ cm} = 3\text{ m}'))
        self.assertTrue(flags(r'1.5\text{ m} = 1.5\text{ km}'))
        self.assertEqual(flags(r'1\text{ N}\cdot\text{m} = 1\text{ J}'), [])
        self.assertEqual(flags(r'1 \text{ eV} = 1.60 \times 10^{-19} \text{ J}'), [])
        self.assertEqual(flags(r'1\text{ kWh} = 3.60 \times 10^{6}\text{ J}'), [])
        self.assertEqual(
            flags(r'1.29 \times 10^{-3} \text{ g/cm}^3 = 1.29 \text{ kg/m}^3'), [])
        self.assertEqual(
            flags(r'1.0 \times 10^{-11} \text{ W/m}^{2} = 10 \text{ pW/m}^{2}'), [])
        self.assertEqual(flags(r'2\pi \text{rad} = 360^\circ'), [])
        self.assertEqual(flags(r'-(20\text{ cm}) = -0.200\text{ m}'), [])
        self.assertTrue(flags(r'-(20\text{ cm}) = -5\text{ m}'))

    def test_temperature_absolute_and_interval(self):
        self.assertEqual(flags(r'20\text{ºC} = 293\text{ K}'), [])
        self.assertEqual(flags(r'0\text{ºC} = 273\text{ K}'), [])
        self.assertTrue(flags(r'10\text{ºC} = 10\text{ K}'))
        self.assertAlmostEqual(evaluate(r'10\text{ºC}', temperature='interval').v, 10)
        self.assertEqual(flags(r'100\text{ºC} = 212\text{ºF}'), [])
        self.assertTrue(flags(r'0\text{ºC} = 0\text{ K}'))
        self.assertTrue(flags(r'20\text{ºC} = 270\text{ K}'))

    def test_variables_and_plain_rounding_are_left_alone(self):
        self.assertEqual(flags(r'\theta = 30^\circ'), [])
        self.assertEqual(flags(r'1.41 = 1.4'), [])
        self.assertEqual(flags(r'v_0 = 13.0'), [])

    def test_known_book_mismatch_still_flags(self):
        found = flags(r'\frac{70 \text{ years}}{3} = 25 \text{ years}')
        self.assertEqual(len(found), 1)
        self.assertAlmostEqual(found[0][2], 70 * cm.parse_unit('year')[0] / 3)


class AngleConversionTests(unittest.TestCase):
    def test_full_circle(self):
        self.assertEqual(flags(r'2\pi \text{rad} = 360^\circ'), [])
        self.assertAlmostEqual(2 * math.pi * 180 / math.pi, 360)


class QuantityVerificationTests(unittest.TestCase):
    def status(self, expression):
        return next(cm.verify_math(expression)).status

    def test_integer_inputs_cannot_borrow_answer_rounding(self):
        for expression in (r'1\m=2\m', r'2\m=1\m', '1=2', '0=1', '-1=-2',
                           r'100\text{cm}=200\text{cm}', r'1\m=200\text{cm}'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'failed')
        self.assertEqual(self.status('31.62=32'), 'checked')
        self.assertEqual(self.status('1.41=1.4'), 'checked')
        self.assertEqual(self.status(r'100\text{cm}=1\m'), 'checked')
        self.assertEqual(evaluate('1', stated=True).e, 0.5)
        self.assertEqual(evaluate('1', exact_literals=True, stated=True).e, 0)

    def test_bare_zero_can_omit_units_without_hiding_errors(self):
        for expression in (r'2\m-2\m=0', r'0=2\m-2\m', r'0\J=0',
                           r'0=0\text{N}', r'(2\kg)(0\mss)=0',
                           r'\cos(90^\circ)=0', r'\sin(180^\circ)=0',
                           r'(98\N)(8.0\m)\cos(90^\circ)=0\J'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'checked')
        for expression in (r'1\m=0', r'0.01\m=0', r'0=1\m', r'0\m=0\s',
                           r'0\text{°C}=0', r'0\m=0^\circ', r'\cos(90^\circ)=0.01',
                           r'5.0\times10^{-30}\J=0'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'failed')

    def test_inverse_trig_rounding_at_domain_boundaries(self):
        for expression in (r'\arcsin(1.00)=90^\circ', r'\arcsin(-1.00)=-90^\circ',
                           r'\arccos(1.00)=0^\circ', r'\arccos(-1.00)=180^\circ',
                           r'\arcsin(0.00)=0^\circ'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'checked')
        for expression in (r'\arcsin(1.001)=90^\circ', r'\arccos(-1.001)=180^\circ',
                           r'\arcsin(1.00)=45^\circ', r'\ln(0)=0'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'failed')

    def test_large_trig_arguments_do_not_gain_unbounded_roundoff_allowances(self):
        result = next(cm.verify_math(r'\sin(10^{100})=1000'))
        self.assertEqual(result.status, 'skipped')
        self.assertIn('floating-point precision', result.reason)

    def test_dose_equations_and_unsupported_units(self):
        self.assertEqual(self.status(r'1\text{Gy}=1\text{J/kg}'), 'checked')
        self.assertEqual(self.status(r'2\text{mGy}=0.002\text{J/kg}'), 'checked')
        self.assertEqual(self.status(r'1\text{Gy}=1\s'), 'failed')
        self.assertEqual(self.status(r'1\text{spin}=1\s'), 'skipped')
        self.assertEqual(self.status(r'1\text{mm Hg}=133\text{Pa}'), 'checked')

    def test_single_dollar_spans_and_offsets(self):
        source = r'Before $2+2=5$, $$3+3=6$$, \(4=4\), \[5=5\], $x=2$.'
        spans = list(cm.math_spans(source))
        self.assertEqual([body for _, body in spans], ['2+2=5', '3+3=6', '4=4', '5=5', 'x=2'])
        self.assertEqual([source[start] for start, _ in spans], ['$', '$', '\\', '\\', '$'])
        self.assertEqual(next(cm.verify_math(spans[0][1])).status, 'failed')

    def test_inline_math_ignores_escaped_currency_comments_and_code(self):
        source = (r'Price \$5 and \$10. $2+2=4$ and $5\text{USD}+\$1=6$.'
                  '\n<!-- $1=2$ -->\n`$1=2$`\n``code `$1=2$` code``\n```tex\n$1=2$\n```\n'
                  + r'\\$3=3$ and \$not math\$')
        self.assertEqual([body for _, body in cm.math_spans(source)],
                         ['2+2=4', r'5\text{USD}+\$1=6', '3=3'])
        self.assertEqual(list(cm.math_spans('$unclosed\n\n$$4=4$$')), [(11, '4=4')])
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'inline.md'
            path.write_text('An inline error:\n$2+2=5$\n')
            results = cm.scan_file(path, str(path), 0.01)
            self.assertEqual([(r.line, r.status) for r in results], [(2, 'failed')])

    def test_demonstrated_false_negatives_are_detected(self):
        for expression in (r'2\times3=6000', r'2\m+3\m=500\m',
                           r'2\m+3\m=5\s', r'5\m=5\s', '2+3=2+4'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'failed')

    def test_valid_quantities_and_both_sides(self):
        for expression in (r'2\m+30\text{cm}=230\text{cm}',
                           r'2\m+30\text{cm}=1\m+130\text{cm}',
                           r'(100\text{cm})^2=1\text{m}^2',
                           r'(2\kg)(3\mss)=6\N',
                           r'\sqrt{9\text{m}^2}=3\m',
                           r'(8)^{1/3}\m=2\m',
                           r'2\m^2=20000\text{cm}^2',
                           r'20\text{mA}*5\text{kΩ}=100\text{V}',
                           r'2.0\text{km}/4.0\text{min}=8.33\ms'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'checked')

    def test_tex_spacing_does_not_split_a_quantity(self):
        self.assertEqual(self.status(r'\left(2+3\right)\,\text{m}=5\text{m}'), 'checked')
        self.assertEqual(self.status(r'20\,\text{cm}=0.20\,\text{m}'), 'checked')

    def test_conversion_factors_require_their_units(self):
        self.assertEqual(self.status(r'(2/5)*100\%=40\%'), 'checked')
        self.assertEqual(self.status(r'(2/5)*100=40\%'), 'failed')
        self.assertEqual(self.status(r'1.25\text{rev/s}*\frac{2\pi\text{rad}}{1\text{rev}}=7.85\rads'), 'checked')
        self.assertEqual(self.status(r'1.25\text{rev/s}*2\pi=7.85\rads'), 'failed')

    def test_invalid_dimensions_in_operations_and_functions(self):
        for expression in (r'2\m+3\s=5', r'\ln(2\m)=0.69',
                           r'\sin(30\kg)=0.5', r'(2\m)^{3\s}=8',
                           r'\sqrt{4\m}=2\m'):
            with self.subTest(expression=expression):
                self.assertEqual(self.status(expression), 'failed')

    def test_skips_are_not_passes(self):
        for expression in (r'v=3\ms', r'\unknown{2}=2', r'3\text{furlongs}=3\m', r'\theta'):
            result = next(cm.verify_math(expression))
            self.assertEqual(result.status, 'skipped')
            self.assertTrue(result.reason)

    def test_math_domain_failures_are_visible(self):
        for expression in ('1/0=0', r'\sqrt{-1}=0', r'\ln(0)=0'):
            result = next(cm.verify_math(expression))
            self.assertEqual(result.status, 'failed')
            self.assertIn('invalid calculation', result.reason)

    def test_all_chain_comparisons_are_reported(self):
        results = list(cm.verify_math(r'v=2\m+3\m=5\m=8\m'))
        self.assertEqual([result.status for result in results], ['skipped', 'checked', 'failed'])
        counts = cm.summary(results)
        self.assertEqual((counts['checked'], counts['failed'], counts['skipped']), (1, 1, 1))
        self.assertEqual(counts['total'], 3)

    def test_units_and_scales_are_preserved_during_rounding(self):
        quantity = evaluate(r'1.20\text{cm}+2.30\text{cm}')
        self.assertAlmostEqual(quantity.v, 0.035)
        self.assertAlmostEqual(quantity.e, 0.0001)
        self.assertEqual(quantity.dim, (('len', 1),))
        product = evaluate(r'2.00\m*3.00\m')
        self.assertGreaterEqual(product.e, 0.025)
        self.assertEqual(product.dim, (('len', 2),))

    def test_nonlinear_rounding_bounds_include_extrema(self):
        squared = Value(0.0, 0.1) ** Value(2.0)
        self.assertAlmostEqual(squared.e, 0.01)
        parser = cm.Parser([], symbols={})
        sine = parser.call('sin', Value(math.pi / 2, 2 * math.pi))
        self.assertAlmostEqual(sine.e, 2)
        with self.assertRaises(Invalid):
            Value(1.0) / Value(0.1, 0.2)

    def test_temperature_semantics_are_explicit(self):
        interval = evaluate(r'30\text{°C}-20\text{°C}')
        self.assertEqual(interval.v, 10)
        self.assertFalse(interval.absolute)
        self.assertEqual(evaluate(r'10\text{°C}', temperature='interval').v, 10)
        self.assertAlmostEqual(evaluate(r'-20\text{°C}').v, 253.15)
        self.assertEqual(self.status(r'30\text{°C}=30\text{K}'), 'failed')

    def test_explicit_interval_annotation_and_invalid_annotation(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'temperature.md'
            equation = r'$$\Delta T=30\text{°C}-20\text{°C}=10\text{°C}$$'
            path.write_text(equation)
            self.assertTrue(any(result.status == 'failed' for result in cm.scan_file(path, str(path), 0.01)))
            path.write_text('<!-- physics-scan: temperature=interval -->\n' + equation)
            results = cm.scan_file(path, str(path), 0.01)
            self.assertEqual([result.status for result in results], ['skipped', 'checked'])
            path.write_text('<!-- physics-scan: temperature=guess -->\n' + equation)
            self.assertEqual(cm.scan_file(path, str(path), 0.01)[0].status, 'failed')

    def test_charge_and_capacitance_are_not_temperatures(self):
        self.assertEqual(self.status(r'2\text{C}/4\s=0.5\text{A}'), 'checked')
        self.assertEqual(self.status(r'2\text{F}*3\text{V}=6\text{C}'), 'checked')

    def test_compound_unit_powers_and_explicit_grouping(self):
        self.assertEqual(self.status(r'1\text{N·m}^2/\text{m}^2=1\N'), 'checked')
        self.assertEqual(self.status(r'1(\text{N·m})^2=1\text{J}^2'), 'checked')
        self.assertEqual(self.status(r'1\text{mol}*(1\text{J/mol}\cdot\text{K})*1\text{K}=1\J'), 'checked')
        self.assertEqual(self.status(r'1\mu\text{F}=10^{-6}\text{F}'), 'checked')

    def test_text_labels_are_not_treated_as_numeric_unit_products(self):
        result = next(cm.verify_math(r'\text{Mgh}=(10\kg)(9.80\mss)(2\m)'))
        self.assertEqual(result.status, 'skipped')
        self.assertIn('text label', result.reason)

    def test_delimiters_code_and_comments(self):
        text = '$$2+2=4$$\n<!-- $$1=2$$ -->\n```tex\n$$1=2$$\n```\n`$$1=2$$`\n' + r'\[3=3\] and \(4=4\)'
        spans = list(cm.math_spans(text))
        self.assertEqual([body for _, body in spans], ['2+2=4', '3=3', '4=4'])

    def test_scientific_notation_and_unary_precedence(self):
        for expression in ('2^3^2=512', '-2^2=-4', '(-2)^2=4',
                           r'2\times10^{3}=2000', r'1{,}000=1000', r'2\approx2.0'):
            self.assertEqual(self.status(expression), 'checked')

    def test_no_arbitrary_code_execution(self):
        for expression in ('__import__(os)', 'x.__class__', 'open(file)', 'lambda:1'):
            with self.assertRaises(cm.Skip):
                evaluate(expression)


MOTION_SOURCE = r''':::: example {"class":"example","id":"motion"}
<!-- physics: initial -->$$v_0=13.0\ms$$
<!-- physics: acceleration -->$$a=-9.80\mss$$
<!-- physics: time -->$$t=2.00\s$$
<!-- physics: answer -->$$v=-6.60\ms$$
::::

An unrelated answer elsewhere: $$v=-6.60\ms$$.
'''


def motion_document():
    return {
        'version': 1,
        'relations': {'velocity': {'inputs': ['v0', 'a', 't'], 'expression': 'v0+a*t'}},
        'cases': [{'id': 'motion', 'file': 'ch2Motion.md', 'source_id': 'motion',
                   'inputs': {'v0': {'marker': 'initial'}, 'a': {'marker': 'acceleration'},
                              't': {'marker': 'time'}},
                   'checks': [{'id': 'velocity', 'relation': 'velocity',
                               'arguments': {'v0': 'v0', 'a': 'a', 't': 't'},
                               'expected': {'marker': 'answer'}}]}],
    }


class DeclarativeCaseTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.path = self.root / 'ch2Motion.md'
        self.path.write_text(MOTION_SOURCE)
        self.document = motion_document()

    def run_cases(self, document=None):
        return run_cases(document or self.document, self.root, None, cm.Verification,
                         cm.compare, cm.math_spans, cm.split_relations)

    def test_correct_case(self):
        results = self.run_cases()
        self.assertEqual([result.status for result in results], ['checked'])
        self.assertEqual(results[0].line, 5)

    def test_source_bound_markers_support_single_dollar_math(self):
        self.path.write_text(MOTION_SOURCE.replace('$$', '$'))
        self.assertEqual(self.run_cases()[0].status, 'checked')

    def test_mutations_of_sign_exponent_unit_given_and_answer(self):
        for name, old, new in (
            ('sign', 'v=-6.60', 'v=+6.60'),
            ('exponent', 'v=-6.60', r'v=-6.60\times10^3'),
            ('unit', r'answer -->$$v=-6.60\ms', r'answer -->$$v=-6.60\m'),
            ('given', 'v_0=13.0', 'v_0=14.0'),
            ('answer', 'v=-6.60', 'v=-8.60'),
        ):
            with self.subTest(mutation=name):
                self.path.write_text(MOTION_SOURCE.replace(old, new, 1))
                self.assertEqual(self.run_cases()[0].status, 'failed')

    def test_missing_or_ambiguous_source_references_fail(self):
        for source in (MOTION_SOURCE.replace('"motion"', '"renamed"'),
                       MOTION_SOURCE + MOTION_SOURCE,
                       MOTION_SOURCE.replace('physics: answer', 'physics: removed'),
                       MOTION_SOURCE.replace('<!-- physics: answer -->', '<!-- physics: answer -->$$1$$\n<!-- physics: answer -->')):
            self.path.write_text(source)
            result = self.run_cases()[0]
            self.assertEqual(result.status, 'failed')
            self.assertIn('expected one match', result.reason)

    def test_missing_file_cannot_remove_coverage(self):
        self.path.unlink()
        result = self.run_cases()[0]
        self.assertEqual(result.status, 'failed')
        self.assertIn('file not found', result.reason)

    def test_unrelated_value_does_not_satisfy_missing_answer(self):
        self.path.write_text(MOTION_SOURCE.replace('<!-- physics: answer -->$$v=-6.60\\ms$$', ''))
        self.assertEqual(self.run_cases()[0].status, 'failed')

    def test_unsupported_required_case_fails_instead_of_skipping(self):
        self.path.write_text(MOTION_SOURCE.replace('v=-6.60', 'v=unknown', 1))
        self.assertEqual(self.run_cases()[0].status, 'failed')

    def test_bound_regex_rejects_ambiguity(self):
        reference = {'pattern': r'v_0=(?P<value>[^$]+)'}
        self.document['cases'][0]['inputs']['v0'] = reference
        self.assertEqual(self.run_cases()[0].status, 'checked')
        self.path.write_text(MOTION_SOURCE.replace('<!-- physics: time -->', '$$v_0=13.0\\ms$$\n<!-- physics: time -->'))
        self.assertEqual(self.run_cases()[0].status, 'failed')

    def test_html_exercises_and_nested_containers(self):
        source = MOTION_SOURCE.replace(':::: example {"class":"example","id":"motion"}',
                                       '<div id="motion" class="exercise extra">\n<div class="problem">prompt</div>')
        source = source.replace('\n::::\n', '\n</div>\n')
        self.path.write_text(source)
        self.assertEqual(self.run_cases()[0].status, 'checked')
        self.assertEqual(len(source_scopes(source)['motion']), 1)

    def test_actual_book_cases_all_pass(self):
        document = json.loads(cm.DEFAULT_CASES.read_text())
        cm.validate_coverage(document, json.loads(cm.DEFAULT_COVERAGE.read_text()))
        results = run_cases(document, cm.DEFAULT_CONTENTS_DIR, None, cm.Verification,
                            cm.compare, cm.math_spans, cm.split_relations)
        self.assertEqual(len(results), sum(len(case['checks']) for case in document['cases']))
        self.assertGreaterEqual(len(results), 76)  # Preserve the migrated baseline; permit new cases.
        self.assertEqual([result for result in results if result.status != 'checked'], [])

    def test_reusable_relations_across_domains(self):
        relations = json.loads(cm.DEFAULT_CASES.read_text())['relations']
        examples = [
            ('constant_acceleration_velocity', {'v0': r'10\ms', 'a': r'2\mss', 't': r'3\s'}, r'16\ms'),
            ('energy_speed', {'mass': r'2\kg', 'initial_energy': r'0\J', 'work': r'9\J'}, r'3\ms'),
            ('ohms_law', {'voltage': r'12\text{V}', 'resistance': r'4\text{Ω}'}, r'3\text{A}'),
            ('radioactive_decay', {'initial': '100', 'time': r'2\s', 'half_life': r'2\s'}, '50'),
            ('elastic_first_velocity', {'m1': r'1\kg', 'm2': r'1\kg',
                                        'v1': r'2\ms', 'v2': r'-1\ms'}, r'-1\ms'),
            ('elastic_second_velocity', {'m1': r'1\kg', 'm2': r'1\kg',
                                         'v1': r'2\ms', 'v2': r'-1\ms'}, r'2\ms'),
            ('angular_velocity', {'omega0': r'3\rads', 'acceleration': r'2\radss',
                                  'angle': r'4\text{rad}'}, r'5\rads'),
        ]
        for name, inputs, expected in examples:
            env = {key: evaluate(text, exact_literals=True) for key, text in inputs.items()}
            value = evaluate(relations[name]['expression'], env, exact_literals=True)
            self.assertEqual(cm.compare(value, evaluate(expected), '=', 0.01)[0], 'checked')

    def test_json_cli_and_file_filter_include_cases(self):
        document_path = self.root / 'cases.json'
        document_path.write_text(json.dumps(self.document))
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = cm.main(['--contents-dir', str(self.root), '--cases', str(document_path),
                              '--file', str(self.path), '--no-scan', '--strict', '--json'])
        self.assertEqual(result, 0)
        report = json.loads(output.getvalue())
        self.assertEqual(report['summary']['by_kind']['case']['checked'], 1)
        self.assertEqual(report['results'][0]['status'], 'checked')

    def test_strict_exit_is_not_hidden_by_display_filter(self):
        self.path.write_text('$$2+3=7$$')
        with contextlib.redirect_stdout(io.StringIO()):
            result = cm.main(['--contents-dir', str(self.root), '--no-cases', '--strict',
                              '--min-error', '1000'])
        self.assertEqual(result, 1)

    def test_schema_rejects_duplicate_ids(self):
        self.document['cases'].append(copy.deepcopy(self.document['cases'][0]))
        with self.assertRaisesRegex(ValueError, 'duplicate case ID'):
            cm.validate_cases(self.document)

    def test_empty_case_documents_are_rejected(self):
        document = copy.deepcopy(self.document)
        document['cases'] = []
        with self.assertRaisesRegex(ValueError, 'at least one case'):
            cm.validate_cases(document)

    def test_coverage_protects_identities_and_allows_additions(self):
        baseline = {'version': 1, 'required_checks': {'motion': ['velocity']}}
        cm.validate_coverage(self.document, baseline)
        addition = copy.deepcopy(self.document['cases'][0])
        addition['id'] = 'more-motion'
        self.document['cases'].append(addition)
        cm.validate_coverage(self.document, baseline)
        self.document['cases'][0]['checks'][0]['id'] = 'replacement'
        with self.assertRaisesRegex(ValueError, 'motion/velocity'):
            cm.validate_coverage(self.document, baseline)
        self.document['cases'].pop(0)
        with self.assertRaisesRegex(ValueError, 'motion/velocity'):
            cm.validate_coverage(self.document, baseline)

    def test_coverage_baseline_cannot_be_empty_or_malformed(self):
        for baseline in ({}, {'version': 1, 'required_checks': {}},
                         {'version': 1, 'required_checks': {'motion': []}},
                         {'version': 1, 'required_checks': {'motion': ['velocity', 'velocity']}},
                         {'version': 1, 'required_checks': {'motion': [None]}}):
            with self.subTest(baseline=baseline), self.assertRaises(ValueError):
                cm.validate_coverage(self.document, baseline)

    def test_cli_enforces_coverage_even_without_strict(self):
        document_path = self.root / 'cases.json'
        baseline_path = self.root / 'coverage.json'
        document_path.write_text(json.dumps(self.document))
        baseline_path.write_text(json.dumps({'version': 1, 'required_checks': {'motion': ['velocity']}}))
        args = ['--contents-dir', str(self.root), '--cases', str(document_path),
                '--check-coverage', str(baseline_path), '--no-scan', '--json']
        with contextlib.redirect_stdout(io.StringIO()) as output:
            self.assertEqual(cm.main(args), 0)
        self.assertEqual(json.loads(output.getvalue())['summary']['case_coverage'],
                         {'cases': 1, 'assertions': 1, 'chapters': [2]})
        self.document['cases'][0]['checks'][0]['id'] = 'replacement'
        document_path.write_text(json.dumps(self.document))
        with contextlib.redirect_stderr(io.StringIO()) as errors, self.assertRaises(SystemExit) as exit_status:
            cm.main(args)
        self.assertEqual(exit_status.exception.code, 2)
        self.assertIn('required case checks missing', errors.getvalue())
        for extra in (['--file', str(self.path)], ['--range', '2-3'], ['--no-cases']):
            with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
                cm.main(args + extra)

    def test_schema_rejects_malformed_inputs_and_tolerances(self):
        self.document['cases'][0]['inputs'] = []
        with self.assertRaisesRegex(ValueError, 'inputs object'):
            cm.validate_cases(self.document)
        document = motion_document()
        document['cases'][0]['checks'][0]['tolerance'] = float('nan')
        with self.assertRaisesRegex(ValueError, 'invalid tolerance'):
            cm.validate_cases(document)


if __name__ == '__main__':
    unittest.main()
