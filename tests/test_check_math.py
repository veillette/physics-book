"""Arithmetic checks for check_math.py. Run from the repo root:

    python -m unittest tests/test_check_math.py
"""

import math
import unittest

import check_math as cm


def flags(src, tolerance=0.01):
    return list(cm.scan_math(src, tolerance))


class UnitParserTests(unittest.TestCase):
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
        self.assertEqual(
            flags(r'(2.0\N\cdot\m)/(0.50\kg\cdot\mm) = 4.0'), [])
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
        self.assertEqual(flags(r'10\text{ºC} = 10\text{ K}'), [])
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
        self.assertAlmostEqual(found[0][2], 70 / 3)


class AngleConversionTests(unittest.TestCase):
    def test_full_circle(self):
        self.assertEqual(flags(r'2\pi \text{rad} = 360^\circ'), [])
        self.assertAlmostEqual(2 * math.pi * 180 / math.pi, 360)


if __name__ == '__main__':
    unittest.main()
