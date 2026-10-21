"""Quantity arithmetic for the restricted, non-eval physics expression parser.

Values and rounding bounds are normalized to SI as soon as a unit is attached.
Radians are dimensionless in SI; the angle flag preserves their interpretation.
Absolute temperatures and temperature intervals are deliberately distinct.
"""
import math
from dataclasses import dataclass, replace

if __package__:
    from .physics_latex import Skip, parse_unit, tokenize, normalize
else:
    from physics_latex import Skip, parse_unit, tokenize, normalize


class Invalid(ValueError):
    """An evaluable expression violates dimensions or a mathematical domain."""


def dimensions(left, right, sign=1):
    result = dict(left)
    for name, exponent in right:
        result[name] = result.get(name, 0) + sign * exponent
    return tuple(sorted((name, exponent) for name, exponent in result.items() if abs(exponent) > 1e-12))


@dataclass(frozen=True)
class Value:
    v: float
    e: float = 0.0
    dim: tuple = ()
    angle: bool = False
    absolute: bool = False

    def __post_init__(self):
        if not math.isfinite(self.v) or not math.isfinite(self.e):
            raise Invalid('non-finite value or rounding bound')

    def compatible(self, other):
        if self.dim != other.dim:
            raise Invalid(f'incompatible dimensions: {self.dim or "dimensionless"} and '
                          f'{other.dim or "dimensionless"}')

    def _sum(self, other, subtract=False):
        # A printed zero often omits its unit (e.g. y - 0). Only exact zero
        # may inherit a dimension; arbitrary dimensionless numbers may not.
        if not self.dim and self.v == 0 and self.e == 0 and other.dim:
            return -other if subtract else other
        if not other.dim and other.v == 0 and other.e == 0:
            return self
        self.compatible(other)
        if self.absolute and other.absolute and not subtract:
            raise Invalid('cannot add two absolute temperatures')
        if subtract and other.absolute and not self.absolute:
            raise Invalid('cannot subtract an absolute temperature from an interval')
        return Value(self.v - other.v if subtract else self.v + other.v,
                     self.e + other.e, self.dim, self.angle or other.angle,
                     (self.absolute or other.absolute) and not
                     (subtract and self.absolute and other.absolute))

    def __add__(self, other):
        return self._sum(other)

    def __sub__(self, other):
        return self._sum(other, True)

    def __neg__(self):
        if self.absolute:
            raise Invalid('negating an absolute temperature requires a signed literal')
        return replace(self, v=-self.v)

    def __mul__(self, other):
        if self.absolute or other.absolute:
            raise Invalid('absolute temperature in a product; specify interval or kelvin')
        return Value(self.v * other.v,
                     abs(self.v) * other.e + abs(other.v) * self.e + self.e * other.e,
                     dimensions(self.dim, other.dim), self.angle or other.angle)

    def __truediv__(self, other):
        if self.absolute or other.absolute:
            raise Invalid('absolute temperature in a quotient; specify interval or kelvin')
        if abs(other.v) <= other.e:
            raise Invalid('divisor is zero or its rounding interval includes zero')
        value = self.v / other.v
        error = (self.e + abs(value) * other.e) / (abs(other.v) - other.e)
        return Value(value, error, dimensions(self.dim, other.dim, -1))

    def __pow__(self, other):
        if other.dim or other.absolute:
            raise Invalid('exponent must be dimensionless')
        if self.absolute:
            raise Invalid('absolute temperature raised to a power')
        if self.dim and other.e:
            raise Invalid('dimensional power needs an exact exponent')
        if self.v < 0 and not float(other.v).is_integer():
            raise Invalid('fractional power of a negative number')
        if self.v == 0 and other.v <= 0:
            raise Invalid('undefined power of zero')
        value = self.v ** other.v
        low, high = self.v - self.e, self.v + self.e
        if (low < 0 and not float(other.v).is_integer()) or (low <= 0 and other.v < 0):
            raise Invalid('power is undefined within the rounding interval')
        if other.e and low <= 0:
            raise Invalid('uncertain exponent needs a positive base interval')
        bounds = [low ** other.v, high ** other.v]
        if low <= 0 <= high and other.v > 0:
            bounds.append(0.0)
        if other.e:
            bounds.extend(base ** exponent for base in (low, high)
                          for exponent in (other.v - other.e, other.v + other.e))
        error = max(abs(bound - value) for bound in bounds)
        return Value(value, error, tuple((name, exponent * other.v) for name, exponent in self.dim))

    def attach(self, unit, temperature='absolute'):
        if temperature not in ('absolute', 'interval'):
            raise Invalid(f'unknown temperature interpretation: {temperature}')
        parsed = parse_unit(unit)
        if parsed is None:
            raise Skip(f'unknown unit: {unit}')
        scale, dim, offset = parsed
        angle = any(name == 'angle' for name, _ in dim)
        dim = tuple((name, exponent) for name, exponent in dim if name != 'angle')
        absolute = bool(offset) and temperature == 'absolute'
        if absolute:
            if self.dim:
                raise Invalid('absolute temperature unit attached to a dimensional value')
            return Value(self.v * scale + offset, self.e * abs(scale), dim, False, True)
        return self * Value(scale, 0.0, dim, angle)


def number_value(text, exact=False, stated=False):
    mantissa, _, exponent = text.lower().partition('e')
    scale = 10.0 ** int(exponent) if exponent else 1.0
    error = 0.0
    if not exact and ('.' in mantissa or stated):
        decimals = len(mantissa.split('.')[1]) if '.' in mantissa else 0
        error = 0.5 * 10.0 ** -decimals * abs(scale)
    return Value(float(text), error)


class Parser:
    """Recursive descent; no Python eval, imports, attributes, or arbitrary calls."""

    def __init__(self, toks, inverse_trig_degrees=False, symbols=None,
                 exact_literals=False, temperature='absolute', stated_literals=False):
        self.toks = toks
        self.i = 0
        self.ops = 0
        self.symbols = symbols or {}
        self.exact_literals = exact_literals
        self.temperature = temperature
        self.stated_literals = stated_literals

    def peek(self):
        return self.toks[self.i] if self.i < len(self.toks) else None

    def take(self):
        token = self.peek()
        self.i += 1
        return token

    def parse(self):
        if not self.toks:
            raise Skip('empty expression')
        value = self.expr()
        if self.peek() is not None:
            raise Skip(f'trailing tokens: {self.peek()[1]}')
        return value

    def expr(self):
        value = self.term()
        while self.peek() in (('op', '+'), ('op', '-')):
            operator = self.take()[1]
            self.ops += 1
            other = self.term()
            value = value + other if operator == '+' else value - other
        return value

    def term(self):
        value = self.unary()
        while True:
            token = self.peek()
            if token in (('op', '*'), ('op', '/')):
                self.take()
                self.ops += 1
                other = self.unary()
                value = value * other if token[1] == '*' else value / other
            elif token and (token == ('op', '(') or token[0] in ('unit', 'func', 'pi', 'symbol')):
                self.ops += 1
                value = value * self.unary()
            elif token and token[0] == 'num' and self.i and self.toks[self.i - 1] == ('op', ')'):
                self.ops += 1
                value = value * self.unary()
            else:
                return value

    def unary(self):
        if self.peek() in (('op', '+'), ('op', '-')):
            sign = self.take()[1]
            # The sign belongs to a temperature literal before applying offset.
            if self.peek() and self.peek()[0] == 'num':
                start = self.i
                number = self.take()[1]
                if self.peek() and self.peek()[0] == 'unit':
                    value = number_value(('-' if sign == '-' else '') + number,
                                         self.exact_literals, self.stated_literals)
                    return self.postfix(value)
                self.i = start
            value = self.unary()
            return -value if sign == '-' else value
        return self.power()

    def power(self):
        value = self.postfix(self.primary())
        if self.peek() == ('op', '^'):
            self.take()
            self.ops += 1
            value = value ** self.exponent()
        return self.postfix(value)

    def exponent(self):
        # A following unit belongs to the powered quantity, not its exponent:
        # (3)^{2} m^2 and (8)^{1/3} m must retain length dimensions.
        was_exact = self.exact_literals
        self.exact_literals = True
        try:
            sign = 1
            if self.peek() in (('op', '+'), ('op', '-')):
                sign = -1 if self.take()[1] == '-' else 1
            value = self.primary()
            if self.peek() == ('op', '^'):
                self.take()
                value = value ** self.exponent()
            return -value if sign == -1 else value
        finally:
            self.exact_literals = was_exact

    def postfix(self, value):
        if self.peek() and self.peek()[0] == 'unit':
            # Consume one contiguous unit product, including external exponents.
            # This gives 2 m/s^2 the unit m/s^2 rather than squaring its number.
            unit = self.take()[1]
            if self.peek() == ('op', '^'):
                self.take()
                exponent = self.exponent()
                if exponent.dim or exponent.e:
                    raise Invalid('unit exponent must be exact and dimensionless')
                unit = f'({unit})^({exponent.v})'
            while self.peek() in (('op', '*'), ('op', '/')):
                if self.i + 1 >= len(self.toks) or self.toks[self.i + 1][0] != 'unit':
                    break
                operator = self.take()[1]
                next_unit = self.take()[1]
                if self.peek() == ('op', '^'):
                    self.take()
                    exponent = self.exponent()
                    if exponent.dim or exponent.e:
                        raise Invalid('unit exponent must be exact and dimensionless')
                    next_unit = f'({next_unit})^({exponent.v})'
                unit += ('·' if operator == '*' else '/') + next_unit
            value = value.attach(unit, self.temperature)
        while self.peek() and self.peek()[0] in ('DEG', 'PCT'):
            kind = self.take()[0]
            value = value.attach('deg') if kind == 'DEG' else value * Value(0.01)
        return value

    def primary(self):
        token = self.take()
        if token is None:
            raise Skip('missing operand')
        kind, text = token
        if kind == 'num':
            return number_value(text, self.exact_literals, self.stated_literals)
        if kind == 'unit':
            self.i -= 1
            previous = self.temperature
            self.temperature = 'interval'
            try:
                return self.postfix(Value(1.0))
            finally:
                self.temperature = previous
        if kind == 'symbol':
            return self.symbols[text]
        if kind == 'pi':
            return Value(math.pi)
        if token == ('op', '('):
            value = self.expr()
            if self.take() != ('op', ')'):
                raise Skip('unbalanced parentheses')
            return value
        if kind == 'func':
            self.ops += 1
            argument = self.primary() if self.peek() == ('op', '(') else self.power()
            while self.peek() and self.peek()[0] == 'pi':
                self.take()
                argument = argument * Value(math.pi)
            return self.call(text, argument)
        raise Skip(f'unsupported operand: {text}')

    def call(self, name, arg):
        if name == 'sqrt':
            return arg ** Value(0.5)
        if arg.dim or arg.absolute:
            raise Invalid(f'{name} requires a dimensionless argument or angle')
        functions = {
            'sin': (math.sin, math.cos), 'cos': (math.cos, lambda x: -math.sin(x)),
            'tan': (math.tan, lambda x: 1 / math.cos(x) ** 2),
            'arcsin': (math.asin, lambda x: 1 / math.sqrt(1 - x * x)),
            'arccos': (math.acos, lambda x: -1 / math.sqrt(1 - x * x)),
            'arctan': (math.atan, lambda x: 1 / (1 + x * x)),
            'ln': (math.log, lambda x: 1 / x),
            'log': (math.log10, lambda x: 1 / (x * math.log(10))),
            'exp': (math.exp, math.exp), 'sinh': (math.sinh, math.cosh),
            'cosh': (math.cosh, math.sinh), 'tanh': (math.tanh, lambda x: 1 / math.cosh(x) ** 2),
        }
        function, derivative = functions[name]
        if name == 'tan' and abs(math.cos(arg.v)) < 1e-14:
            raise Invalid('tangent is undefined at a pole')
        if name == 'tan' and math.floor((arg.v - arg.e + math.pi / 2) / math.pi) != math.floor(
                (arg.v + arg.e + math.pi / 2) / math.pi):
            raise Invalid('tangent rounding interval crosses a pole')
        # Endpoint sampling also catches domain errors in the rounding interval.
        values = [function(arg.v), function(arg.v - arg.e), function(arg.v + arg.e)]
        if name in ('sin', 'cos'):
            start = math.ceil((arg.v - arg.e) / (math.pi / 2))
            end = math.floor((arg.v + arg.e) / (math.pi / 2))
            if end - start > 4:
                values.extend((-1.0, 1.0))
            else:
                values.extend(function(k * math.pi / 2) for k in range(start, end + 1))
        error = max(abs(value - values[0]) for value in values)
        if arg.e:
            error = max(error, abs(derivative(arg.v)) * arg.e)
        return Value(values[0], error, angle=name.startswith('arc'))


def evaluate(expression, symbols=None, exact_literals=False, temperature='absolute', stated=False):
    tokens = tokenize(normalize(expression), symbols)
    # A displayed single integer may be rounded to the nearest unit. Integers
    # inside calculations (notably coefficients and exponents) remain exact.
    single = (sum(kind == 'num' for kind, _ in tokens) == 1 and
              not any(kind in ('func', 'symbol', 'pi') or
                      (kind == 'op' and text in ('*', '/', '^')) for kind, text in tokens))
    return Parser(tokens, symbols=symbols, exact_literals=exact_literals,
                  temperature=temperature, stated_literals=stated and single).parse()
