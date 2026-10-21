#!/usr/bin/env python3
"""
Check the arithmetic in the physics textbook.

Two kinds of check run against contents/:

1. Equation scan (automatic). Every $$...$$ span is split at "=" and "\\approx".
   When one side is a purely numeric expression (numbers, units, \\frac,
   \\sqrt, powers, trig, ln) and the next side is a single stated number, the
   expression is evaluated and compared with the stated value. Anything with a
   variable left in it is skipped. A space used as a thousands separator
   (86 400) is part of the number, and a unit product such as N\\cdot m is a
   unit, not extra arithmetic.

   Two stated numbers are compared directly when they share a unit or a known
   conversion: SI prefixes, rad/deg/rev, temperature, eV, and the other units
   listed in parse_unit. Absolute temperatures and temperature intervals are
   both accepted, so 20°C = 293 K and 10°C = 10 K both pass.

   The allowed difference is the largest of
     - the relative tolerance (--tolerance, default 1%; 5% for \\approx),
     - the rounding uncertainty carried by the decimal inputs, propagated
       through the expression, plus half a unit in the last place of the result.
   On an expression (as opposed to two stated numbers), a result that differs
   by an exact power of ten is treated as a unit-prefix change (m -> mm) when
   units are present or the power is a multiple of three.

2. Worked-example checks (hand-written). Multi-step physics that a single
   equation cannot show, such as recomputing an answer from the givens. Each
   check also confirms that the stated value still appears in its source
   file, so the check goes stale loudly when the text changes.

Usage:
    python scripts/check_math.py                  # Whole book
    python scripts/check_math.py 14 15            # Specific chapters
    python scripts/check_math.py --range 1-10     # Chapter range
    python scripts/check_math.py --file contents/ch14Radiation.md
    python scripts/check_math.py --min-error 10   # Only discrepancies of 10% or more
    python scripts/check_math.py --json           # Machine-readable output
    python scripts/check_math.py --strict         # Exit 1 if anything is flagged
"""

import argparse
import json
import math
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path

if __package__:
    from .find_incomplete_solutions import DEFAULT_CONTENTS_DIR, chapter_files, parse_chapter_range
else:
    from find_incomplete_solutions import DEFAULT_CONTENTS_DIR, chapter_files, parse_chapter_range

LIKELY_ERROR_PCT = 10.0


# ---------------------------------------------------------------------------
# Equation scan: LaTeX -> tokens
# ---------------------------------------------------------------------------

class Skip(Exception):
    """The segment is not a purely numeric expression."""


# Unit macros defined in assets/js/math-config.js. Longest first, so \\mmss wins over \\m.
UNIT_MACROS = ('mmss', 'mms', 'mss', 'radss', 'rads', 'kg', 'ms', 'mm', 'mph', 'mile', 'inch', 'N', 'J', 's', 'm')
# What those macros mean. \\mm is square metres, not millimetres; \\ms is m/s, not milliseconds.
MACRO_UNITS = {
    'mmss': 'm^2/s^2', 'mms': 'm^2/s', 'mss': 'm/s^2', 'radss': 'rad/s^2', 'rads': 'rad/s',
    'kg': 'kg', 'ms': 'm/s', 'mm': 'm^2', 'mph': 'mph', 'mile': 'mi', 'inch': 'in',
    'N': 'N', 'J': 'J', 's': 's', 'm': 'm',
}
FUNCS = ('arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'sqrt', 'sin', 'cos', 'tan', 'exp', 'ln', 'log')
# A closing brace is part of ^{\circ} only when the opening brace was. Otherwise
# \sin{20^\circ} loses the brace that closes the argument.
DEGREE = r'(?:°|º|\^\s*\{\s*\\circ\s*\}|\^\s*\\circ|\\circ|\^\s*\{\s*o\s*\})'
_EXP = r'(?:\s*\^\s*(?:\{(?P<br>[^{}]*)\}|(?P<raw>-?\d)))?'
MATH_RE = re.compile(r'\$\$(.+?)\$\$', re.DOTALL)
RELATION_RE = re.compile(
    r'=|\\approx\b|\\simeq\b|\\sim\b|\\Rightarrow\b|\\rightarrow\b|\\to\b|\\implies\b'
    r'|\\quad\b|\\qquad\b|,|;|<|>|\\leq?\b|\\geq?\b|\\neq\b|\\ll\b|\\gg\b'
    r'|\\text\s*\{\s*(?:and|or|so|for|if|where|with|since|then)\b[^{}]*\}'
)


def match_brace(s, i):
    """s[i] is '{'; return the index of its matching '}'."""
    depth = 0
    for j in range(i, len(s)):
        if s[j] == '{':
            depth += 1
        elif s[j] == '}':
            depth -= 1
            if depth == 0:
                return j
    raise Skip('unbalanced braces')


def take_group(s, i):
    """Return (content, end) of the {group} or single character at or after i."""
    while i < len(s) and s[i] == ' ':
        i += 1
    if i >= len(s):
        raise Skip('missing argument')
    if s[i] == '{':
        j = match_brace(s, i)
        return s[i + 1:j], j + 1
    return s[i], i + 1


def expand_commands(s):
    """Rewrite \\frac and \\sqrt as parenthesised infix forms."""
    out = []
    i = 0
    while i < len(s):
        m = re.match(r'\\[dt]?frac', s[i:])
        if m:
            num, i = take_group(s, i + m.end())
            den, i = take_group(s, i)
            out.append(f'(({expand_commands(num)})/({expand_commands(den)}))')
            continue
        m = re.match(r'\\sqrt\s*(?:\[([^\]]*)\])?', s[i:])
        if m:
            arg, i = take_group(s, i + m.end())
            if m.group(1):
                out.append(f'(({expand_commands(arg)})^(1/({m.group(1)})))')
            else:
                out.append(f' sqrt(({expand_commands(arg)}))')
            continue
        out.append(s[i])
        i += 1
    return ''.join(out)


def canonicalize_unit(text):
    """Turn a unit fragment into a compact string parse_unit can read."""
    t = text.strip()
    t = t.replace('µ', 'μ').replace(r'\mu', 'μ').replace(r'\micro', 'μ')
    t = t.replace(r'\Omega', 'Ω').replace(r'\ohm', 'Ω')
    t = t.replace(r'\cdot', '·').replace(r'\times', '·').replace('*', '·')
    t = re.sub(r'\^\s*\{([^{}]*)\}', r'^\1', t)
    t = re.sub(r'\s+', '', t)
    t = t.replace('−', '-')
    t = t.replace('°C', 'degC').replace('ºC', 'degC').replace('°F', 'degF').replace('ºF', 'degF')
    t = t.replace('°', 'deg').replace('º', 'deg')
    t = t.rstrip('.')
    aliases = {'hours': 'h', 'hour': 'h', 'minutes': 'min', 'minute': 'min', 'mins': 'min',
               'seconds': 's', 'second': 's', 'sec': 's', 'amu': 'u', 'ohms': 'Ω', 'ohm': 'Ω'}
    return aliases.get(t, '' if t in ('.', '·') else t)


def _with_exp(body, exp):
    body = canonicalize_unit(body)
    if not body:
        return ' '
    if exp:
        exp = exp.strip()
        # \text{m/s}^2 and \text{g/cm}^3 mean m/s^2 and g/cm^3. A true (m/s)^2 is parenthesized.
        body = f'{body}^{exp}' if '/' in body else f'({body})^{exp}'
    return f' UNIT<{body}> '


def unit_token(text):
    return _with_exp(text, None)


def normalize(seg):
    s = seg
    s = s.replace('×', '*').replace('·', '*').replace('−', '-')
    s = re.sub(r'\\(?:left|right|big|Big|bigg|Bigg)\b\s*([()\[\]|.]|\\[{}])?',
               lambda m: '' if m.group(1) in (None, '.') else m.group(1), s)
    for old, new in (('\\!', ''), ('\\,', ' '), ('\\;', ' '), ('\\:', ' '), ('\\ ', ' '), ('~', ' '),
                     ('\\displaystyle', ''), ('\\%', ' PCT ')):
        s = s.replace(old, new)
    # Temperatures before generic \\text, so °C is not wrapped a second time.
    s = re.sub(
        r'\\(?:text|textrm|mathrm|rm|mbox)\s*\{\s*(?:°|º|\\circ\s*)?\s*([CFcf])\s*\.?\s*\}' + _EXP,
        lambda m: _with_exp('deg' + m.group(1).upper(), m.group('br') or m.group('raw')), s)
    s = re.sub(
        r'\\(?:text|textrm|mathrm|rm|mbox)\s*\{\s*' + DEGREE + r'\s*\}', ' DEG ', s)
    s = re.sub(
        DEGREE + r'\s*(?:\\(?:text|textrm|mathrm|rm|mbox)\s*\{\s*([CFcf])\s*\.?\s*\}|([CFcf])\b)',
        lambda m: unit_token('deg' + (m.group(1) or m.group(2)).upper()), s)
    # Units: \text{...}, \mathrm{...} (with any exponent) and the book's unit macros.
    s = re.sub(
        r'\\(?:text|textrm|mathrm|rm|mbox)\s*\{([^{}]*)\}' + _EXP,
        lambda m: _with_exp(m.group(1), m.group('br') or m.group('raw')), s)
    s = re.sub(
        r'\\(' + '|'.join(UNIT_MACROS) + r')(?![A-Za-z])' + _EXP,
        lambda m: _with_exp(MACRO_UNITS[m.group(1)], m.group('br') or m.group('raw')), s)
    s = re.sub(r'\\Omega(?![A-Za-z])', lambda m: unit_token('Ω'), s)
    s = re.sub(r'\\(?:mu|micro)(?![A-Za-z])', lambda m: unit_token('μ'), s)
    s = re.sub(DEGREE, ' DEG ', s)
    s = re.sub(r'\\(?:times|cdot|ast)(?![A-Za-z])', '*', s)
    s = s.replace('\\div', '/')
    s = re.sub(r'\\(?:arc)?(sin|cos|tan)\s*\^\s*\{?\s*-1\s*\}?', r' arc\1 ', s)
    # \sqrt is expanded below, so its optional [n] index is not lost.
    bare_funcs = '|'.join(f for f in FUNCS if f != 'sqrt')
    s = re.sub(r'\\(' + bare_funcs + r')(?![A-Za-z])', r' \1 ', s)
    s = s.replace('\\pi', ' pi ')
    s = expand_commands(s)
    # Scientific notation binds as one number: a / 6.02 \times 10^{23} means a / (6.02e23).
    s = re.sub(r'(\d+(?:\.\d*)?|\.\d+)\s*\*\s*10\s*\^\s*(?:\{\s*([-+]?\d+)\s*\}|([-+]?\d))',
               lambda m: f'{m.group(1)}e{m.group(2) or m.group(3)}', s)
    s = re.sub(r'(?<![\d.e])10\s*\^\s*(?:\{\s*([-+]?\d+)\s*\}|([-+]?\d))',
               lambda m: f'1e{m.group(1) or m.group(2)}', s)
    # SI thousands separator: 86 400 and 1 000 000. A group of exactly three digits.
    s = re.sub(r'(?<=\d) (?=\d{3}(?!\d))', '', s)
    return s.replace('{', '(').replace('}', ')').replace('[', '(').replace(']', ')')


TOKEN_RE = re.compile(
    r'\s*(?:(?P<num>(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?)'
    r'|UNIT<(?P<unit>[^>]*)>'
    r'|(?P<word>DEG|PCT|pi|[A-Za-z]+)'
    r'|(?P<op>[-+*/^()])'
    r'|(?P<other>\S))'
)


def tokenize(s):
    toks = []
    for m in TOKEN_RE.finditer(s):
        if m.group('num') is not None:
            toks.append(('num', m.group('num')))
        elif m.group('unit') is not None:
            toks.append(('unit', m.group('unit')))
        elif m.group('word') is not None:
            word = m.group('word')
            if word in ('DEG', 'PCT', 'pi'):
                toks.append((word, word))
            elif word in FUNCS:
                toks.append(('func', word))
            else:
                raise Skip(f'variable {word}')
        elif m.group('op') is not None:
            toks.append(('op', m.group('op')))
        elif m.group('other') is not None:
            raise Skip(f'symbol {m.group("other")}')
    return toks


def match_paren(toks, i):
    """toks[i] is '('; return the index just after the matching ')'."""
    depth = 0
    for j in range(i, len(toks)):
        if toks[j] == ('op', '('):
            depth += 1
        elif toks[j] == ('op', ')'):
            depth -= 1
            if depth == 0:
                return j + 1
    return None


def _exponent_end(toks, i):
    """Index after a numeric exponent starting at i, or None."""
    if i >= len(toks):
        return None
    if toks[i][0] == 'num':
        return i + 1
    if toks[i] == ('op', '-') and i + 1 < len(toks) and toks[i + 1][0] == 'num':
        return i + 2
    if toks[i] == ('op', '('):
        end = match_paren(toks, i)
        if end is None:
            return None
        inner = toks[i + 1:end - 1]
        if inner and all(t[0] in ('num', 'op') for t in inner):
            return end
    return None


def _unit_atom_end(toks, i):
    """Index after one pure unit atom (a unit, or a parenthesised unit product), or None."""
    if i >= len(toks):
        return None
    if toks[i][0] == 'unit':
        end = i + 1
    elif toks[i] == ('op', '('):
        end = match_paren(toks, i)
        if end is None or not _is_pure_unit_seq(toks[i + 1:end - 1]):
            return None
    else:
        return None
    if end < len(toks) and toks[end] == ('op', '^'):
        exp = _exponent_end(toks, end + 1)
        if exp is None:
            return None
        return exp
    return end


def pure_unit_factor_end(toks, i):
    """If a pure unit factor starts at i, return the index just after it."""
    end = _unit_atom_end(toks, i)
    if end is None:
        return None
    while end < len(toks) and toks[end] in (('op', '*'), ('op', '/')):
        nxt = _unit_atom_end(toks, end + 1)
        if nxt is None:
            break
        end = nxt
    return end


def _is_pure_unit_seq(toks):
    return bool(toks) and pure_unit_factor_end(toks, 0) == len(toks)


def peel_unit_factors(toks):
    """Drop unit tokens and unit-only factors so the numeric skeleton remains."""
    out = []
    i = 0
    while i < len(toks):
        if toks[i][0] == 'unit' or toks[i] == ('op', '('):
            end = pure_unit_factor_end(toks, i)
            if end is not None:
                i = end
                continue
        if toks[i] in (('op', '*'), ('op', '/')):
            end = pure_unit_factor_end(toks, i + 1)
            if end is not None:
                i = end
                continue
        out.append(toks[i])
        i += 1
    return out


# ---------------------------------------------------------------------------
# Equation scan: evaluation with rounding uncertainty
# ---------------------------------------------------------------------------

@dataclass
class Value:
    """A number with the absolute uncertainty implied by its rounding."""
    v: float
    e: float = 0.0
    deg: bool = False

    def __add__(self, o):
        return Value(self.v + o.v, self.e + o.e)

    def __sub__(self, o):
        return Value(self.v - o.v, self.e + o.e)

    def __mul__(self, o):
        return Value(self.v * o.v, abs(self.v) * o.e + abs(o.v) * self.e, self.deg or o.deg)

    def __truediv__(self, o):
        v = self.v / o.v
        return Value(v, abs(v) * (self.e / abs(self.v) if self.v else 0) + abs(v) * o.e / abs(o.v))

    def __neg__(self):
        return Value(-self.v, self.e, self.deg)

    def __pow__(self, o):
        v = self.v ** o.v
        if isinstance(v, complex):
            raise Skip('complex result')
        e = abs(v) * (abs(o.v) * self.e / abs(self.v) if self.v else 0)
        if o.e and self.v > 0:
            e += abs(v * math.log(self.v)) * o.e
        return Value(v, e)

    def apply(self, f):
        lo, hi = f(self.v - self.e), f(self.v + self.e)
        return Value(f(self.v), abs(hi - lo) / 2)


def number_value(text):
    """Parse a number token; decimals carry half a unit in the last place."""
    mant, _, exp = text.partition('e')
    scale = 10 ** int(exp) if exp else 1
    if '.' in mant:
        decimals = len(mant.split('.')[1])
        return Value(float(mant) * scale, 0.5 * 10 ** -decimals * scale)
    return Value(float(mant) * scale)


class Parser:
    """Recursive-descent evaluator over the token list."""

    def __init__(self, toks, inverse_trig_degrees):
        self.toks = toks
        self.i = 0
        self.ops = 0
        self.units = []
        self.last = None
        self.inverse_trig_degrees = inverse_trig_degrees

    def peek(self):
        while self.i < len(self.toks) and self.toks[self.i][0] == 'unit':
            prev = self.toks[self.i - 1] if self.i else None
            nxt = self.toks[self.i + 1] if self.i + 1 < len(self.toks) else None
            if prev and nxt and nxt[0] == 'num' and prev[0] in ('num', 'DEG', 'PCT'):
                raise Skip('juxtaposed numbers')
            self.units.append(self.toks[self.i][1])
            self.i += 1
        return self.toks[self.i] if self.i < len(self.toks) else None

    def take(self):
        tok = self.peek()
        self.i += 1
        if tok and tok[0] != 'unit':
            self.last = tok
        return tok

    def parse(self):
        if self.peek() is None:
            raise Skip('empty')
        value = self.expr()
        if self.peek() is not None:
            raise Skip('trailing tokens')
        return value

    def expr(self):
        self.units = []
        value = self.term()
        while (tok := self.peek()) in (('op', '+'), ('op', '-')):
            left_units = set(self.units)
            self.take()
            self.units = []
            self.ops += 1
            right = self.term()
            self.peek()
            if left_units and self.units and left_units != set(self.units):
                raise Skip('sum of different units')
            value = value + right if tok[1] == '+' else value - right
        return value

    def term(self):
        value = self.unary()
        while True:
            tok = self.peek()
            if tok in (('op', '*'), ('op', '/')):
                end = pure_unit_factor_end(self.toks, self.i + 1)
                if end is not None:
                    self.i = end  # N·m is a unit, not a product of two numbers
                    continue
                self.take()
                self.ops += 1
                right = self.unary()
                value = value * right if tok[1] == '*' else value / right
            elif tok == ('op', '('):
                end = pure_unit_factor_end(self.toks, self.i)
                if end is not None:
                    self.i = end
                    continue
                self.ops += 1
                value = value * self.unary()
            elif tok and tok[0] in ('func', 'pi'):
                self.ops += 1
                value = value * self.unary()
            elif tok and tok[0] == 'num' and self.last == ('op', ')'):
                self.ops += 1  # \frac{9}{5}25 and (1.2)3^{1/3}
                value = value * self.unary()
            else:
                return value

    def unary(self):
        tok = self.peek()
        if tok in (('op', '-'), ('op', '+')):
            self.take()
            value = self.unary()
            return -value if tok[1] == '-' else value
        return self.power()

    def power(self):
        value = self.postfix()
        if self.peek() == ('op', '^'):
            self.take()
            self.ops += 1
            value = value ** self.unary()
        return value

    def postfix(self):
        value = self.primary()
        while (tok := self.peek()) and tok[0] in ('DEG', 'PCT'):
            self.take()
            if tok[0] == 'DEG':
                value = Value(value.v, value.e, deg=True)
            else:
                value = Value(value.v * 0.01, value.e * 0.01)
        return value

    def primary(self):
        tok = self.take()
        if tok is None:
            raise Skip('unexpected end')
        if tok[0] == 'num':
            if (nxt := self.peek()) and nxt[0] == 'num':
                raise Skip('juxtaposed numbers')
            return number_value(tok[1])
        if tok[0] == 'pi':
            return Value(math.pi)
        if tok == ('op', '('):
            value = self.expr()
            if self.take() != ('op', ')'):
                raise Skip('unbalanced parentheses')
            return value
        if tok[0] == 'func':
            self.ops += 1
            arg = self.power()
            while self.peek() and self.peek()[0] == 'pi':  # \cos 2\pi
                self.take()
                arg = arg * Value(math.pi)
            return self.call(tok[1], arg)
        raise Skip(f'unexpected {tok}')

    def call(self, name, arg):
        if name in ('sin', 'cos', 'tan'):
            f = getattr(math, name)
            return arg.apply(lambda x: f(math.radians(x))) if arg.deg else arg.apply(f)
        if name in ('arcsin', 'arccos', 'arctan'):
            f = getattr(math, 'a' + name[3:])
            if self.inverse_trig_degrees:
                return arg.apply(lambda x: math.degrees(f(x)))
            return arg.apply(f)
        f = {'sqrt': math.sqrt, 'ln': math.log, 'log': math.log10, 'exp': math.exp,
             'sinh': math.sinh, 'cosh': math.cosh, 'tanh': math.tanh}[name]
        return arg.apply(f)


def ulp_of(text):
    """Unit in the last place of a number token, matching the stated-number rules."""
    mant, _, exp = text.partition('e')
    exp_i = int(exp) if exp else 0
    if '.' in mant:
        return 10 ** (exp_i - len(mant.split('.')[1]))
    ulp = 10 ** exp_i
    if len(mant) > 1 and mant.endswith('0'):
        ulp = 10 ** (exp_i + len(mant) - len(mant.rstrip('0')))  # trailing zeros: not significant
    if mant == '1' and exp:
        ulp = 2 * 10 ** exp_i  # a bare power of ten is an order-of-magnitude estimate
    return ulp


def _unwrap(toks):
    while len(toks) >= 2 and toks[0] == ('op', '(') and match_paren(toks, 0) == len(toks):
        toks = toks[1:-1]
    return toks


def simple_from_tokens(toks):
    """A single signed number, once units have been peeled. None if it is an expression."""
    if any(t[0] == 'PCT' for t in toks):
        return None
    has_deg = any(t[0] == 'DEG' for t in toks)
    toks = _unwrap([t for t in toks if t[0] != 'DEG'])
    sign = 1
    if toks and toks[0] in (('op', '+'), ('op', '-')):
        if toks[0][1] == '-':
            sign = -1
        toks = _unwrap(toks[1:])
    if len(toks) == 1 and toks[0][0] == 'num':
        text = toks[0][1]
        mant, _, exp = text.partition('e')
        return sign * float(mant) * 10 ** (int(exp) if exp else 0), ulp_of(text), has_deg
    return None


def unit_product(toks):
    """The unit algebra of a token list, with the quantity's own number removed."""
    parts = []
    for t in toks:
        if t[0] == 'unit':
            parts.append(t[1])
        elif t == ('op', '^'):
            parts.append('^')
        elif t[0] == 'num' and parts and parts[-1] == '^':
            parts.append(t[1])
        elif t == ('op', '*') and parts:
            parts.append('·')
        elif t == ('op', '/'):
            parts.append('/')
        elif t in (('op', '('), ('op', ')')):
            parts.append(t[1])
        elif t[0] == 'DEG':
            parts.append('deg')
    text = ''.join(parts).replace('μ·', 'μ').replace('µ·', 'μ')
    text = re.sub(r'\(\)', '', text)
    text = re.sub(r'^[·/]+', '', text)
    text = text.replace('(·', '(')
    return text.strip('·')


@dataclass
class Quantity:
    """A stated number, its rounding unit, and the unit product attached to it."""
    value: float
    ulp: float
    deg: bool
    unit: str


def stated_quantity(norm):
    """If `norm` is one number with optional units, return that quantity."""
    try:
        toks = tokenize(norm)
    except Skip:
        return None
    parsed = simple_from_tokens(peel_unit_factors(toks))
    if not parsed:
        return None
    value, ulp, deg = parsed
    unit = unit_product(toks)
    if deg and not unit:
        unit = 'deg'
    return Quantity(value, ulp, deg or unit == 'deg', unit)


def stated_number(norm):
    """If a normalized segment is one plain number, return (value, ulp, has_degrees)."""
    quantity = stated_quantity(norm)
    if not quantity:
        return None
    return quantity.value, quantity.ulp, quantity.deg


# (symbol, scale to SI, dimension, absolute-temperature offset).
# Mass is the kilogram, so the gram carries 10^-3. Offsets apply only when the
# whole unit is a pure temperature; a per-degree unit drops the offset.
_ENERGY = {'mass': 1, 'len': 2, 'time': -2}
_FORCE = {'mass': 1, 'len': 1, 'time': -2}
_POWER = {'mass': 1, 'len': 2, 'time': -3}
_PRESSURE = {'mass': 1, 'len': -1, 'time': -2}
_VOLT = {'mass': 1, 'len': 2, 'time': -3, 'current': -1}
_OHM = {'mass': 1, 'len': 2, 'time': -3, 'current': -2}
_BASES = {
    'degC': (1.0, {'Th': 1}, 273.15),
    'degF': (5.0 / 9.0, {'Th': 1}, 273.15 - 32 * 5.0 / 9.0),
    'mmHg': (133.322, _PRESSURE, 0.0),
    'kcal': (4184.0, _ENERGY, 0.0),
    'eV': (1.602176634e-19, _ENERGY, 0.0),
    'rpm': (2 * math.pi / 60, {'angle': 1, 'time': -1}, 0.0),
    'rad': (1.0, {'angle': 1}, 0.0),
    'rev': (2 * math.pi, {'angle': 1}, 0.0),
    'min': (60.0, {'time': 1}, 0.0),
    'mol': (1.0, {'amount': 1}, 0.0),
    'mph': (0.44704, {'len': 1, 'time': -1}, 0.0),
    'atm': (101325.0, _PRESSURE, 0.0),
    'cal': (4.184, _ENERGY, 0.0),
    'day': (86400.0, {'time': 1}, 0.0),
    'Hz': (1.0, {'time': -1}, 0.0),
    'Pa': (1.0, _PRESSURE, 0.0),
    'hr': (3600.0, {'time': 1}, 0.0),
    'mi': (1609.344, {'len': 1}, 0.0),
    'ft': (0.3048, {'len': 1}, 0.0),
    'in': (0.0254, {'len': 1}, 0.0),
    'Ci': (3.7e10, {'time': -1}, 0.0),
    'Bq': (1.0, {'time': -1}, 0.0),
    'Wb': (1.0, {'mass': 1, 'len': 2, 'time': -2, 'current': -1}, 0.0),
    'Ω': (1.0, _OHM, 0.0),
    'N': (1.0, _FORCE, 0.0),
    'J': (1.0, _ENERGY, 0.0),
    'W': (1.0, _POWER, 0.0),
    'V': (1.0, _VOLT, 0.0),
    'A': (1.0, {'current': 1}, 0.0),
    'C': (1.0, {'current': 1, 'time': 1}, 0.0),
    'F': (1.0, {'mass': -1, 'len': -2, 'time': 4, 'current': 2}, 0.0),
    'H': (1.0, {'mass': 1, 'len': 2, 'time': -2, 'current': -2}, 0.0),
    'T': (1.0, {'mass': 1, 'time': -2, 'current': -1}, 0.0),
    'K': (1.0, {'Th': 1}, 0.0),
    'L': (1e-3, {'len': 3}, 0.0),
    'g': (1e-3, {'mass': 1}, 0.0),
    'm': (1.0, {'len': 1}, 0.0),
    's': (1.0, {'time': 1}, 0.0),
    'h': (3600.0, {'time': 1}, 0.0),
    'u': (1.66053906660e-27, {'mass': 1}, 0.0),
    'deg': (math.pi / 180, {'angle': 1}, 0.0),
}
_PREFIXES = (
    ('da', 1e1), ('f', 1e-15), ('p', 1e-12), ('n', 1e-9), ('u', 1e-6), ('μ', 1e-6), ('µ', 1e-6),
    ('m', 1e-3), ('c', 1e-2), ('d', 1e-1), ('k', 1e3), ('M', 1e6), ('G', 1e9), ('T', 1e12),
)
_NO_PREFIX = {'degC', 'degF', 'deg'}


def _dim_key(dim):
    return tuple(sorted((k, v) for k, v in dim.items() if v))


def _add_dim(a, b, sign=1):
    out = dict(a)
    for k, v in b.items():
        out[k] = out.get(k, 0) + sign * v
    return out


def _prefer_atom(best, cand):
    """Longer match wins; a tie prefers the bare unit over a prefixed one (min, not milli-inch)."""
    if best is None or cand[0] > best[0] or (cand[0] == best[0] and not cand[4] and best[4]):
        return cand
    return best


def _best_atom(s, i):
    best = None
    for name, (scale, dim, offset) in _BASES.items():
        if s.startswith(name, i):
            best = _prefer_atom(best, (i + len(name), scale, dim, offset, False))
    for pname, pscale in _PREFIXES:
        if not s.startswith(pname, i):
            continue
        j = i + len(pname)
        for name, (scale, dim, offset) in _BASES.items():
            if name in _NO_PREFIX or offset:
                continue
            if s.startswith(name, j):
                best = _prefer_atom(best, (j + len(name), pscale * scale, dim, 0.0, True))
    return best


def _parse_exp(s, i):
    if i >= len(s) or s[i] != '^':
        return None, i
    i += 1
    if i < len(s) and s[i] == '(':
        end = s.find(')', i)
        if end < 0:
            raise ValueError('bad exponent')
        exp = float(s[i + 1:end])
        return exp, end + 1
    m = re.match(r'[+-]?\d+', s[i:])
    if not m:
        raise ValueError('bad exponent')
    return int(m.group(0)), i + m.end()


def _parse_term(s, i):
    if i < len(s) and s[i] == '(':
        scale, dim, offset, j = _parse_uexpr(s, i + 1)
        if j >= len(s) or s[j] != ')':
            raise ValueError('unbalanced unit')
        i = j + 1
    else:
        atom = _best_atom(s, i)
        if atom is None:
            raise ValueError('unknown unit')
        i, scale, dim, offset, _prefixed = atom
        dim = dict(dim)
    exp, i = _parse_exp(s, i)
    if exp is not None and exp != 1:
        scale = scale ** exp
        dim = {k: v * exp for k, v in dim.items()}
        offset = 0.0
    return scale, dim, offset, i


def _parse_factor(s, i):
    scale, dim, offset, i = _parse_term(s, i)
    while i < len(s) and s[i] != '/':
        if s[i] == '·':
            i += 1
        elif not (s[i].isalpha() or s[i] in 'μµΩ('):
            break
        scale2, dim2, _, i = _parse_term(s, i)
        scale *= scale2
        dim = _add_dim(dim, dim2)
        offset = 0.0
    return scale, dim, offset, i


def _parse_uexpr(s, i):
    scale, dim, offset, i = _parse_factor(s, i)
    while i < len(s) and s[i] == '/':
        scale2, dim2, _, i = _parse_factor(s, i + 1)
        if scale2 == 0:
            raise ValueError('unit division by zero')
        scale /= scale2
        dim = _add_dim(dim, dim2, sign=-1)
        offset = 0.0
    return scale, dim, offset, i


def parse_unit(unit):
    """Return (scale, dimension, offset) so that SI = value * scale + offset.

    Dimension is a sorted tuple of (name, exponent). None if the unit is not
    one this checker knows. An empty unit is dimensionless.
    """
    if unit is None:
        return None
    text = unit.strip()
    if text == '':
        return (1.0, (), 0.0)
    try:
        scale, dim, offset, i = _parse_uexpr(text, 0)
    except (ValueError, OverflowError, ZeroDivisionError):
        return None
    if i != len(text) or not math.isfinite(scale):
        return None
    key = _dim_key(dim)
    if key != (('Th', 1),):
        offset = 0.0
    return (scale, key, offset)


def _within(left_si, left_ulp, right_si, right_ulp, rel_tol):
    diff = abs(left_si - right_si)
    allowed = max(rel_tol * abs(right_si), 0.5 * left_ulp + 0.5 * right_ulp)
    return diff <= allowed, diff


def compare_quantities(left, right, rel, tolerance):
    """Compare two stated quantities. Return (computed, stated, error_pct), or None.

    None means they agree, or the units are not a conversion this checker knows.
    `computed` is expressed in the right-hand unit.
    """
    rel_tol = tolerance if rel == '=' else max(tolerance, 0.05)
    lk, rk = parse_unit(left.unit), parse_unit(right.unit)
    if lk and rk and lk[1] == rk[1]:
        for interval in (False, True):
            if interval and ((lk[2] == 0 and rk[2] == 0) or left.value == 0 or right.value == 0):
                continue
            loff = 0.0 if interval else lk[2]
            roff = 0.0 if interval else rk[2]
            lsi = left.value * lk[0] + loff
            rsi = right.value * rk[0] + roff
            ok, diff = _within(lsi, left.ulp * abs(lk[0]), rsi, right.ulp * abs(rk[0]), rel_tol)
            if ok:
                return None
            if not interval:
                computed = (lsi - roff) / rk[0] if rk[0] else lsi
                error_pct = 100 * diff / abs(rsi) if rsi else math.inf
                pending = (computed, right.value, error_pct)
        return pending
    if left.unit == right.unit:
        ok, diff = _within(left.value, left.ulp, right.value, right.ulp, rel_tol)
        if ok:
            return None
        error_pct = 100 * diff / abs(right.value) if right.value else math.inf
        return left.value, right.value, error_pct
    return None


def prefix_change(computed, stated, allowed, has_units):
    """True when the two values differ by a power of ten that is likely a prefix."""
    if not computed or not stated:
        return False
    ratio = computed / stated
    k = round(math.log10(abs(ratio)))
    if not k:
        return False
    return abs(ratio / 10 ** k - 1) * abs(stated) <= allowed and (has_units or k % 3 == 0)


def split_relations(src):
    """Yield, per row of the math, a list of (relation_before, segment)."""
    s = re.sub(r'\\(?:begin|end)\{[a-z*]+\}(?:\{[^{}]*\})?', ' ', src)
    s = s.replace('{,}', '')
    s = re.sub(r'(?<=\d),(?=\d{3}(?!\d))', '', s)          # 19,600
    s = re.sub(r'(?<=\d)\\[,;: ](?=\d{3}(?!\d))', '', s)   # 19\,600
    rows = []
    for row in re.split(r'\\\\', s):
        body = row.replace('&', ' ').strip()
        continues = re.match(r'^(?:[-+*/]|\\times|\\cdot)', body)
        if rows and (continues or re.search(r'(?:[-+*/]|\\times|\\cdot)\s*$', rows[-1])):
            rows[-1] += ' ' + body
        else:
            rows.append(body)

    for row in rows:
        parts, buf, rel, depth, i = [], '', None, 0, 0
        while i < len(row):
            ch = row[i]
            depth += (ch == '{') - (ch == '}')
            if depth == 0 and (m := RELATION_RE.match(row, i)):
                parts.append((rel, buf))
                tok = m.group(0)
                rel = '=' if tok == '=' else ('~' if tok in ('\\approx', '\\simeq') else None)
                buf = ''
                i = m.end()
                continue
            buf += ch
            i += 1
        parts.append((rel, buf))
        yield parts


@dataclass
class Finding:
    file: str
    line: int
    kind: str
    message: str
    computed: float
    stated: float
    error_pct: float

    @property
    def severity(self):
        if self.kind == 'stale':
            return 'stale'
        return 'error' if self.error_pct >= LIKELY_ERROR_PCT else 'check'


def _pure_angle(norm):
    try:
        parsed = parse_unit(unit_product(tokenize(norm)))
    except Skip:
        return False
    return bool(parsed) and parsed[1] == (('angle', 1),)


def _evaluate(norm, inverse_trig_degrees):
    parser = Parser(tokenize(norm), inverse_trig_degrees=inverse_trig_degrees)
    calc = parser.parse()
    if isinstance(calc.v, complex) or not math.isfinite(calc.v):
        raise Skip('non-finite')
    return calc, parser.ops


def _numbers_disagree(computed, stated, diff, rel, tolerance, uncertainty, has_units):
    rel_tol = tolerance if rel == '=' else max(tolerance, 0.05)
    allowed = max(rel_tol * abs(stated), uncertainty)
    if diff <= allowed or prefix_change(computed, stated, allowed, has_units):
        return None
    error_pct = 100 * diff / abs(stated) if stated else math.inf
    return computed, stated, error_pct


def scan_math(src, tolerance):
    """Yield (expression, stated_text, computed, stated, error_pct) for each mismatch."""
    for parts in split_relations(src):
        for (_, left), (rel, right) in zip(parts, parts[1:]):
            if rel is None:
                continue
            try:
                lnorm = normalize(left)
                rnorm = normalize(right)
            except Skip:
                continue
            show = (' '.join(left.split()), ' '.join(right.split()))
            lq, rq = stated_quantity(lnorm), stated_quantity(rnorm)
            if lq and rq:
                mismatch = compare_quantities(lq, rq, rel, tolerance)
                if mismatch:
                    yield (*show, *mismatch)
                continue
            if not rq:
                continue  # the right-hand side is still an expression, often a unit conversion
            try:
                has_units = 'UNIT' in lnorm or 'UNIT' in rnorm
                inverse_trig = re.search(r'\barc(?:sin|cos|tan)\b', lnorm)
                left_calc, left_ops = _evaluate(lnorm, inverse_trig_degrees=rq.deg)
                if left_ops == 0:
                    continue
                computed = left_calc.v
                if rq.deg and not inverse_trig and 'DEG' not in lnorm:
                    if _pure_angle(lnorm):
                        computed = computed * 180 / math.pi
                    else:
                        continue  # an angle assignment such as theta = 30°, not a conversion
                diff = abs(computed - rq.value)
                if inverse_trig and rq.deg and 'arctan' in lnorm:
                    diff = min(diff, abs(computed + 180 - rq.value), abs(computed - 180 - rq.value))
                mismatch = _numbers_disagree(
                    computed, rq.value, diff, rel, tolerance, left_calc.e + 0.5 * rq.ulp, has_units)
                if mismatch:
                    yield (*show, *mismatch)
            except (Skip, ZeroDivisionError, OverflowError, ValueError):
                continue


def scan_file(path, display, tolerance):
    text = path.read_text(encoding='utf-8')
    findings = []
    for m in MATH_RE.finditer(text):
        line = text.count('\n', 0, m.start()) + 1
        for left, right, calc, stated, err in scan_math(m.group(1), tolerance):
            findings.append(Finding(display, line, 'equation', f'{left} = {right}', calc, stated, err))
    return findings


# ---------------------------------------------------------------------------
# Worked-example checks
# ---------------------------------------------------------------------------

g = 9.80


class WorkedChecks:
    """Collects hand-written checks; each anchors its stated value in the source file."""

    def __init__(self, contents_dir, display_root, tolerance):
        self.contents_dir = contents_dir
        self.display_root = display_root
        self.tolerance = tolerance
        self.findings = []
        self.count = 0
        self._file = None
        self._text = ''

    def file(self, name):
        path = self.contents_dir / name
        self._file = display_path(path, self.display_root)
        self._text = path.read_text(encoding='utf-8') if path.exists() else None
        if self._text is None:
            self.findings.append(Finding(self._file, 0, 'stale', 'file not found', 0, 0, 0))

    def expect(self, label, computed, stated, tol_pct=None):
        """`stated` is the value as printed in the book, e.g. '5.26e5' or '-6.60'."""
        if self._text is None:
            return
        self.count += 1
        mant, _, exp = stated.partition('e')
        value = float(mant) * (10 ** int(exp) if exp else 1)
        line = self._locate(mant)
        if line is None:
            self.findings.append(Finding(self._file, 0, 'stale',
                                         f'{label}: stated value {stated} no longer appears in the text',
                                         computed, value, 0))
            return
        tol = tol_pct if tol_pct is not None else 100 * self.tolerance
        err = 100 * abs(computed - value) / abs(value) if value else abs(computed) * 100
        if err > tol:
            self.findings.append(Finding(self._file, line, 'worked', label, computed, value, err))

    def _locate(self, mantissa):
        digits = mantissa.lstrip('-+')
        m = re.search(r'(?<![\d.])' + re.escape(digits) + r'(?![\d])', self._text)
        return self._text.count('\n', 0, m.start()) + 1 if m else None


def worked_example_checks(c):
    c.file('ch2FallingObjects.md')
    v0, a = 13.0, -9.80
    for t, v, y in ((1.00, '3.20', '8.10'), (2.00, '-6.60', '6.40'), (3.00, '-16.4', '-5.10')):
        c.expect(f'rock thrown up: v at t={t:.2f} s', v0 + a * t, v)
        c.expect(f'rock thrown up: y at t={t:.2f} s', v0 * t + 0.5 * a * t ** 2, y)
    c.expect('rock thrown down: v^2', (-13.0) ** 2 + 2 * a * -5.10, '268.96')
    c.expect('measured g from 1.0000 m drop', 2 * -1.0000 / 0.45173 ** 2, '-9.8010')
    c.expect('ice falling 30.0 m: time', math.sqrt(2 * -30.0 / a), '2.47')
    c.expect('Problem 1(a): y at 0.500 s', 15.0 * 0.500 + 0.5 * a * 0.500 ** 2, '6.28')
    c.expect('Problem 1(a): v at 0.500 s', 15.0 + a * 0.500, '10.1')

    c.file('ch3ProjectileMotion.md')
    v0y, v0x = 70.0 * math.sin(math.radians(75)), 70.0 * math.cos(math.radians(75))
    c.expect('fireworks: v0y', v0y, '67.6')
    c.expect('fireworks: max height', v0y ** 2 / (2 * g), '233')
    c.expect('fireworks: time', 2 * 233 / 67.6, '6.90')
    c.expect('fireworks: v0x', v0x, '18.1')
    c.expect('fireworks: horizontal displacement', 18.1 * 6.90, '125')
    c.expect('hot rock: v0y', 25.0 * math.sin(math.radians(35)), '14.3')
    c.expect('hot rock: v0x', 25.0 * math.cos(math.radians(35)), '20.5')
    c.expect('hot rock: time of flight', (14.3 + math.sqrt(14.3 ** 2 + 4 * 4.90 * 20.0)) / (2 * 4.90), '3.96')
    c.expect('hot rock: final vy', 14.3 - g * 3.96, '-24.5')
    c.expect('hot rock: final speed', math.hypot(20.5, -24.5), '31.9')
    c.expect('hot rock: final angle', math.degrees(math.atan(-24.5 / 20.5)), '-50.1')

    c.file('ch4NewtonsSecondLawOfMotion.md')
    c.expect('lawn mower acceleration', 51 / 24, '2.13')
    c.expect('rocket sled total thrust', 2100 * 49 + 650, '1.0e5', tol_pct=4)
    c.expect('rocket sled thrust per engine', (2100 * 49 + 650) / 4, '2.6e4')
    c.expect('sprinter force', 63.0 * 4.20, '265')
    c.expect('laundry cart acceleration', 60.0 / 4.50, '13.3')

    c.file('ch5Friction.md')
    c.expect('skier mu_k', 45.0 / (62 * g * math.cos(math.radians(25))), '0.082')
    c.expect('crate max static friction', 0.45 * 100 * g, '440', tol_pct=2)
    c.expect('crate kinetic friction', 0.30 * 100 * g, '290', tol_pct=2)
    c.expect('spatula normal force', 0.200 / 0.04, '5.00')
    c.expect('wood crate max static friction', 0.5 * 120 * g, '588')
    c.expect('wood crate acceleration', (588 - 0.3 * 120 * g) / 120, '1.96')

    c.file('ch6CentripetalForce.md')
    c.expect('car on curve: centripetal force', 900 * 25.0 ** 2 / 500, '1125')
    c.expect('car on curve: friction coefficient', 25.0 ** 2 / (500 * g), '0.13', tol_pct=2)
    c.expect('banked curve speed', math.sqrt(100 * g * math.tan(math.radians(65.0))), '45.8')
    c.expect('Problem 1(a): child on merry-go-round', 22.0 * 1.25 * (40.0 * 2 * math.pi / 60) ** 2, '483')
    c.expect('Problem 3: banking angle', math.degrees(math.atan((105 / 3.6) ** 2 / (1200 * g))), '4.14')

    c.file('ch7KineticEnergyAndTheWorkEnergyTheorem.md')
    c.expect('package kinetic energy', 0.5 * 30.0 * 0.500 ** 2, '3.75')
    c.expect('net work on package', (120 - 5.00) * 0.800, '92.0')
    c.expect('final speed of package', math.sqrt(2 * 95.75 / 30.0), '2.53')
    c.expect('coasting distance', 95.75 / 5.00, '19.2')

    c.file('ch8ElasticCollisionsInOneDimension.md')
    m1, m2, v1 = 0.500, 3.50, 4.00
    c.expect("elastic collision: v1'", (m1 - m2) / (m1 + m2) * v1, '-3.00')
    c.expect("elastic collision: v2'", 2 * m1 / (m1 + m2) * v1, '1.00')
    c.expect('elastic collision: kinetic energy', 0.5 * m1 * v1 ** 2, '4.00')

    c.file('ch9TheSecondConditionForEquilibrium.md')
    c.expect('seesaw: r2', 1.60 * 26.0 / 32.0, '1.30')
    c.expect('seesaw: pivot force', (26.0 + 32.0) * g, '568')
    c.expect('seesaw with board mass: r2', (26.0 * 1.60 + 12.0 * 0.160) / 32.0, '1.36')
    c.expect('seesaw with board mass: pivot force', (26.0 + 32.0 + 12.0) * g, '686')
    c.expect('door torque', 0.850 * 55.0, '46.8')
    c.expect('two children pushing door', 17.5 * 0.600 / 0.450, '23.3')

    c.file('ch10RotationalKineticEnergy.md')
    inertia = 0.5 * 85.0 * 0.320 ** 2
    alpha = 0.320 * 200 / inertia
    c.expect('grindstone: work', 0.320 * 200 * 1.00, '64.0')
    c.expect('grindstone: moment of inertia', inertia, '4.352')
    c.expect('grindstone: angular acceleration', alpha, '14.7')
    c.expect('grindstone: angular velocity', math.sqrt(2 * alpha * 1.00), '5.42')
    omega = 300 * 2 * math.pi / 60
    blades = 4 * 50.0 * 4.00 ** 2 / 3
    c.expect('helicopter: omega', omega, '31.4')
    c.expect('helicopter: blade inertia', blades, '1067')
    c.expect('helicopter: rotational KE', 0.5 * blades * omega ** 2, '5.26e5')
    c.expect('helicopter: translational KE', 0.5 * 1000 * 20.0 ** 2, '2.00e5')
    c.expect('helicopter: height from rotational KE', 5.26e5 / (1000 * g), '53.7')
    c.expect('rolling cylinder speed', math.sqrt(4 * g * 2.00 / 3), '5.11')

    c.file('ch11ArchimedesPrinciple.md')
    volume = 1.00e7 / 7.8e3
    c.expect('steel volume', volume, '1.28e3')
    c.expect('displaced water mass', 1.0e3 * volume, '1.28e6')
    c.expect('buoyant force on solid steel', 1.0e3 * volume * g, '1.3e7', tol_pct=4)
    c.expect('steel weight', 1.00e7 * g, '9.80e7')
    c.expect('maximum buoyant force on hull', 1.0e3 * 1.00e5 * g, '9.80e8')
    c.expect('floating woman density', 0.97 * 1000, '970')
    c.expect('coin density', 8.630 / (8.630 - 7.800), '10.4')
    c.expect('fraction of ice submerged', 917 / 1000 * 100, '91.7')


# ---------------------------------------------------------------------------
# Command line
# ---------------------------------------------------------------------------

def display_path(path, root):
    try:
        return str(path.resolve().relative_to(root))
    except ValueError:
        return str(path)


def print_report(findings, scanned_files, worked_count):
    labels = {'error': 'LIKELY ERROR', 'check': 'CHECK', 'stale': 'STALE CHECK'}
    for f in findings:
        where = f'{f.file}:{f.line}' if f.line else f.file
        if f.kind == 'stale':
            print(f'{where}  {labels["stale"]}: {f.message}')
            continue
        err = 'n/a' if math.isinf(f.error_pct) else f'{f.error_pct:.1f}%'
        print(f'{where}  {labels[f.severity]} ({err}): {f.message}')
        print(f'    computed {f.computed:.4g}, stated {f.stated:.4g}')

    counts = {s: sum(1 for f in findings if f.severity == s) for s in labels}
    print(f"\n{'=' * 60}\nSUMMARY\n{'=' * 60}")
    print(f'Files scanned:            {scanned_files}')
    print(f'Worked-example checks:    {worked_count}')
    print(f'Likely errors (>= {LIKELY_ERROR_PCT:g}%):   {counts["error"]}')
    print(f'Worth a look (< {LIKELY_ERROR_PCT:g}%):     {counts["check"]}')
    print(f'Stale worked checks:      {counts["stale"]}')


def main():
    parser = argparse.ArgumentParser(
        description='Check the arithmetic in the physics textbook.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split('Usage:')[1],
    )
    parser.add_argument('chapters', nargs='*', type=int, help='Specific chapter numbers to check')
    parser.add_argument('--range', '-r', action='append', dest='ranges', type=parse_chapter_range,
                        metavar='START-END', help='Chapter range to check (e.g., 1-10)')
    parser.add_argument('--file', '-f', action='append', type=Path, dest='files',
                        help='Check this markdown file (repeatable); skips worked-example checks')
    parser.add_argument('--contents-dir', '-d', type=Path, default=DEFAULT_CONTENTS_DIR,
                        help=f'Path to the contents directory (default: {DEFAULT_CONTENTS_DIR})')
    parser.add_argument('--tolerance', '-t', type=float, default=1.0, metavar='PCT',
                        help='Relative tolerance in percent for "=" (default: 1)')
    parser.add_argument('--min-error', type=float, default=0.0, metavar='PCT',
                        help='Only report equation mismatches at least this large, in percent')
    parser.add_argument('--no-scan', action='store_true', help='Skip the equation scan')
    parser.add_argument('--no-worked', action='store_true', help='Skip the worked-example checks')
    parser.add_argument('--json', action='store_true', help='Print findings as JSON')
    parser.add_argument('--strict', action='store_true', help='Exit with status 1 if anything is flagged')
    args = parser.parse_args()

    if not args.contents_dir.is_dir():
        print(f'Error: contents directory not found: {args.contents_dir}', file=sys.stderr)
        return 2

    tolerance = args.tolerance / 100
    root = Path.cwd()
    if args.files:
        missing = [p for p in args.files if not p.is_file()]
        if missing:
            print(f'Error: file not found: {missing[0]}', file=sys.stderr)
            return 2
        paths = args.files
    else:
        requested = set(args.chapters)
        for chapters in args.ranges or []:
            requested.update(chapters)
        by_chapter = chapter_files(args.contents_dir, requested or None)
        if requested and not by_chapter:
            print(f'Error: no chapter files found for chapters {sorted(requested)}', file=sys.stderr)
            return 2
        paths = [p for files in by_chapter.values() for p in files]

    findings = []
    if not args.no_scan:
        for path in paths:
            findings.extend(f for f in scan_file(path, display_path(path, root), tolerance)
                            if f.error_pct >= args.min_error)

    worked = WorkedChecks(args.contents_dir, root, tolerance)
    if not args.no_worked and not args.files:
        worked_example_checks(worked)
        selected = {display_path(p, root) for p in paths}
        findings.extend(f for f in worked.findings if f.file in selected)

    findings.sort(key=lambda f: (f.file, f.line))
    if args.json:
        print(json.dumps([dict(asdict(f), severity=f.severity,
                               error_pct=None if math.isinf(f.error_pct) else round(f.error_pct, 2))
                          for f in findings], indent=2, ensure_ascii=False))
    else:
        print_report(findings, 0 if args.no_scan else len(paths), worked.count)

    return 1 if args.strict and findings else 0


if __name__ == '__main__':
    sys.exit(main())
