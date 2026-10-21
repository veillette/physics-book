"""Restricted LaTeX normalization and unit registry shared by physics verification.

Unknown commands and variables are rejected rather than silently removed.
"""
import math
import re


class Skip(Exception):
    """Unsupported notation or an unbound variable; verification was not performed."""


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
    r'=|\\approx(?![A-Za-z])|\\simeq(?![A-Za-z])|\\sim(?![A-Za-z])|\\Rightarrow\b|\\rightarrow\b|\\to\b|\\implies\b'
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
    aliases = {'meters': 'm', 'meter': 'm', 'hours': 'h', 'hour': 'h', 'minutes': 'min', 'minute': 'min', 'mins': 'min',
               'years': 'year', 'days': 'day', 'seconds': 's', 'second': 's', 'sec': 's', 'amu': 'u', 'ohms': 'Ω', 'ohm': 'Ω'}
    return aliases.get(t, '' if t in ('.', '·', ',', ';', ':') else t)


def _with_exp(body, exp):
    body = canonicalize_unit(body)
    if not body:
        return ' '
    if exp:
        exp = exp.strip()
        # \text{m/s}^2 and \text{g/cm}^3 mean m/s^2 and g/cm^3. A true (m/s)^2 is parenthesized.
        body = f'{body}^{exp}' if '/' in body or '·' in body else f'({body})^{exp}'
    return f' UNIT<{body}> '


def unit_token(text):
    return _with_exp(text, None)


def normalize(seg):
    s = seg
    # Braces used to style a unit are not a power of its numerator: the book
    # writes {\text{kg/m}}^3 for kg/m^3. Actual (kg/m)^3 keeps parentheses.
    s = re.sub(r'\{\s*(\\(?:text|textrm|mathrm|rm|mbox)\s*\{[^{}]*\})\s*\}(?=\s*\^)', r'\1', s)
    s = s.replace('×', '*').replace('·', '*').replace('−', '-')
    s = re.sub(r'\\(?:left|right|big|Big|bigg|Bigg)\b\s*([()\[\]|.]|\\[{}])?',
               lambda m: '' if m.group(1) in (None, '.') else m.group(1), s)
    for old, new in (('\\!', ''), ('\\,', ' '), ('\\;', ' '), ('\\:', ' '), ('\\ ', ' '), ('~', ' '),
                     ('\\displaystyle', ''), ('\\%', ' PCT ')):
        s = s.replace(old, new)
    # Temperatures before generic \\text, so °C is not wrapped a second time.
    s = re.sub(
        r'\\(?:text|textrm|mathrm|rm|mbox)\s*\{\s*(?:°|º|\\circ\s*)\s*([CFcf])\s*\.?\s*\}' + _EXP,
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
    s = re.sub(r'UNIT<([μµ])>\s*UNIT<([^>]+)>', lambda m: f'UNIT<{m[1]}{m[2]}>', s)
    s = re.sub(r'UNIT<([^>]*)>\s*UNIT<(/[^>]*)>', lambda m: f'UNIT<{m[1]}{m[2]}>', s)
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
    r'|(?P<word>DEG|PCT|pi|[A-Za-z][A-Za-z0-9_]*)'
    r'|(?P<op>[-+*/^()])'
    r'|(?P<other>\S))'
)


def tokenize(s, symbols=None):
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
            elif symbols is not None and word in symbols:
                toks.append(('symbol', word))
            else:
                raise Skip(f'unbound variable: {word}')
        elif m.group('op') is not None:
            toks.append(('op', m.group('op')))
        elif m.group('other') is not None:
            raise Skip(f'unsupported symbol: {m.group("other")}')
    return toks



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
    '%': (0.01, {}, 0.0),
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
    'year': (31557600.0, {'time': 1}, 0.0),
    'y': (31557600.0, {'time': 1}, 0.0),
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

