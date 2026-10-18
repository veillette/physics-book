#!/usr/bin/env python3
"""
Check the arithmetic in the physics textbook.

Two kinds of check run against contents/:

1. Equation scan (automatic). Every $$...$$ span is split at "=" and "\\approx".
   When one side is a purely numeric expression (numbers, units, \\frac,
   \\sqrt, powers, trig, ln) and the next side is a single stated number, the
   expression is evaluated and compared with the stated value. Units are
   stripped; anything with a variable left in it is skipped.

   The allowed difference is the largest of
     - the relative tolerance (--tolerance, default 1%; 5% for \\approx),
     - the rounding uncertainty carried by the decimal inputs, propagated
       through the expression, plus half a unit in the last place of the result.
   A result that differs by an exact power of ten is treated as a unit-prefix
   change (m -> mm, s -> ns) when units are present or the power is a multiple
   of three.

2. Worked-example checks (hand-written). Multi-step physics that a single
   equation cannot show, such as recomputing an answer from the givens. Each
   check also confirms that the stated value still appears in its source
   file, so the check goes stale loudly when the text changes.

Usage:
    python check_math.py                  # Whole book
    python check_math.py 14 15            # Specific chapters
    python check_math.py --range 1-10     # Chapter range
    python check_math.py --file contents/ch14Radiation.md
    python check_math.py --min-error 10   # Only discrepancies of 10% or more
    python check_math.py --json           # Machine-readable output
    python check_math.py --strict         # Exit 1 if anything is flagged
"""

import argparse
import json
import math
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path

from find_incomplete_solutions import DEFAULT_CONTENTS_DIR, chapter_files, parse_chapter_range

LIKELY_ERROR_PCT = 10.0


# ---------------------------------------------------------------------------
# Equation scan: LaTeX -> tokens
# ---------------------------------------------------------------------------

class Skip(Exception):
    """The segment is not a purely numeric expression."""


# Unit macros defined in assets/js/math-config.js.
UNIT_MACROS = ('mmss', 'mms', 'mss', 'radss', 'rads', 'kg', 'ms', 'mm', 'mph', 'mile', 'inch', 'N', 'J', 's', 'm')
FUNCS = ('arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'sqrt', 'sin', 'cos', 'tan', 'exp', 'ln', 'log')
UNIT_EXP = r'(?:\s*\^\s*(?:\{[^{}]*\}|-?\d))?'
DEGREE = r'(?:°|º|\^\s*\{?\s*\\circ\s*\}?|\^\s*\{\s*o\s*\})'
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


def unit_token(text):
    return f' UNIT[{re.sub(r"[^A-Za-z0-9]", "", text)}] '


def normalize(seg):
    s = seg
    s = re.sub(r'\\(?:left|right|big|Big|bigg|Bigg)\b\s*([()\[\]|.]|\\[{}])?',
               lambda m: '' if m.group(1) in (None, '.') else m.group(1), s)
    for old, new in (('\\!', ''), ('\\,', ' '), ('\\;', ' '), ('\\:', ' '), ('\\ ', ' '), ('~', ' '),
                     ('\\displaystyle', ''), ('\\%', ' PCT ')):
        s = s.replace(old, new)
    # Angles: \text{°} is an angle; °C / °F is a temperature unit.
    s = re.sub(r'\\(?:text|mathrm)\s*\{\s*' + DEGREE + r'\s*\}', ' DEG ', s)
    s = re.sub(DEGREE + r'\s*(?:\\(?:text|mathrm)\s*\{\s*([CF])\s*\}|([CF])\b)',
               lambda m: unit_token('deg' + (m.group(1) or m.group(2))), s)
    # Units: \text{...}, \mathrm{...} (with any exponent) and the book's unit macros.
    s = re.sub(r'\\(?:text|textrm|mathrm|rm|mbox)\s*\{([^{}]*)\}' + UNIT_EXP, lambda m: unit_token(m.group(1)), s)
    s = re.sub(r'\\(' + '|'.join(UNIT_MACROS) + r')(?![A-Za-z])' + UNIT_EXP, lambda m: unit_token(m.group(1)), s)
    s = re.sub(r'\\(?:Omega|mu|micro)(?![A-Za-z])', lambda m: unit_token(m.group(0)[1:]), s)
    s = re.sub(DEGREE, ' DEG ', s)
    s = re.sub(r'\\(?:times|cdot|ast)(?![A-Za-z])', '*', s)
    s = s.replace('\\div', '/')
    s = re.sub(r'\\(?:arc)?(sin|cos|tan)\s*\^\s*\{?\s*-1\s*\}?', r' arc\1 ', s)
    s = re.sub(r'\\(' + '|'.join(FUNCS) + r')(?![A-Za-z])', r' \1 ', s)
    s = s.replace('\\pi', ' pi ')
    s = expand_commands(s)
    # Scientific notation binds as one number: a / 6.02 \times 10^{23} means a / (6.02e23).
    s = re.sub(r'(\d+(?:\.\d*)?|\.\d+)\s*\*\s*10\s*\^\s*(?:\{\s*([-+]?\d+)\s*\}|([-+]?\d))',
               lambda m: f'{m.group(1)}e{m.group(2) or m.group(3)}', s)
    s = re.sub(r'(?<![\d.e])10\s*\^\s*(?:\{\s*([-+]?\d+)\s*\}|([-+]?\d))',
               lambda m: f'1e{m.group(1) or m.group(2)}', s)
    return s.replace('{', '(').replace('}', ')').replace('[', '(').replace(']', ')')


TOKEN_RE = re.compile(
    r'\s*(?:(?P<num>(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?)'
    r'|UNIT[\[(](?P<unit>\w*)[\])]'
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
                self.take()
                self.ops += 1
                right = self.unary()
                value = value * right if tok[1] == '*' else value / right
            elif tok and (tok == ('op', '(') or tok[0] in ('func', 'pi')):
                self.ops += 1
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


SIMPLE_RE = re.compile(r'^\s*([-+]?)\s*(\d+(?:\.\d*)?|\.\d+)(?:e([-+]?\d+))?\s*$')


def stated_number(norm):
    """If a normalized segment is one plain number, return (value, ulp, has_degrees)."""
    has_deg = ' DEG ' in norm
    stripped = re.sub(r'UNIT[\[(]\w*[\])]|\bDEG\b', ' ', norm)
    m = SIMPLE_RE.match(stripped)
    if not m:
        return None
    sign, mant, exp = m.groups()
    exp = int(exp) if exp else 0
    decimals = len(mant.split('.')[1]) if '.' in mant else 0
    value = float(mant) * 10 ** exp * (-1 if sign == '-' else 1)
    ulp = 10 ** (exp - decimals)
    if '.' not in mant and len(mant) > 1 and mant.endswith('0'):
        ulp = 10 ** (exp + len(mant) - len(mant.rstrip('0')))  # trailing zeros: not significant
    if mant == '1' and exp:
        ulp = 2 * 10 ** exp  # a bare power of ten is an order-of-magnitude estimate
    return value, ulp, has_deg


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


def scan_math(src, tolerance):
    """Yield (expression, stated_text, computed, stated, error_pct) for each mismatch."""
    for parts in split_relations(src):
        for (_, left), (rel, right) in zip(parts, parts[1:]):
            if rel is None:
                continue
            try:
                rnorm = normalize(right)
                stated = stated_number(rnorm)
                if not stated:
                    continue
                stated_v, ulp, rhs_deg = stated
                lnorm = normalize(left)
                if stated_number(lnorm):
                    continue  # a bare number restated, usually in other units
                inverse_trig = re.search(r'\barc(?:sin|cos|tan)\b', lnorm)
                if rhs_deg and not inverse_trig and ' DEG ' not in lnorm:
                    continue  # an angle conversion such as 2\pi rad = 360°
                parser = Parser(tokenize(lnorm), inverse_trig_degrees=rhs_deg)
                calc = parser.parse()
                if parser.ops == 0 or isinstance(calc.v, complex) or not math.isfinite(calc.v):
                    continue
            except (Skip, ZeroDivisionError, OverflowError, ValueError):
                continue

            rel_tol = tolerance if rel == '=' else max(tolerance, 0.05)
            allowed = max(rel_tol * abs(stated_v), calc.e + 0.5 * ulp)
            diff = abs(calc.v - stated_v)
            if inverse_trig and rhs_deg and 'arctan' in lnorm:
                diff = min(diff, abs(calc.v + 180 - stated_v), abs(calc.v - 180 - stated_v))  # quadrant fix
            if diff <= allowed:
                continue
            if calc.v and stated_v:
                ratio = calc.v / stated_v
                k = round(math.log10(abs(ratio)))
                has_units = 'UNIT' in lnorm or 'UNIT' in rnorm
                if k and abs(ratio / 10 ** k - 1) * abs(stated_v) <= allowed and (has_units or k % 3 == 0):
                    continue  # unit-prefix change, e.g. 1.65e-3 m = 1.65 mm
                error_pct = 100 * diff / abs(stated_v)
            else:
                error_pct = math.inf
            yield ' '.join(left.split()), ' '.join(right.split()), calc.v, stated_v, error_pct


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
