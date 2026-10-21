"""Declarative physics relations bound to stable IDs and exact source locations."""
import json
import re
from dataclasses import dataclass

if __package__:
    from .physics_latex import Skip
    from .physics_quantity import Invalid, evaluate, Value
else:
    from physics_latex import Skip
    from physics_quantity import Invalid, evaluate, Value


class BindingError(ValueError):
    """A required source reference is missing or ambiguous."""


NUMBER = r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?'


@dataclass
class Scope:
    text: str
    offset: int


def source_scopes(text):
    """Index actual example containers and exercise divs, including nested divs.

    IDs must belong to the container itself. A heading or unrelated image with
    the same ID cannot keep a missing example check alive.
    """
    scopes = {}
    stack = []
    position = 0
    for line in text.splitlines(keepends=True):
        opened = re.match(r'^\s*(:{3,})\s+([\w-]+)(?:\s+(\{.*\}))?\s*$', line)
        closed = re.match(r'^\s*(:{3,})\s*$', line)
        if opened:
            attrs = json.loads(opened[3]) if opened[3] else {}
            stack.append((len(opened[1]), opened[2], attrs.get('id'), position))
        elif closed and stack and len(closed[1]) >= stack[-1][0]:
            _, kind, source_id, start = stack.pop()
            if kind == 'example' and source_id:
                scopes.setdefault(source_id, []).append(Scope(text[start:position + len(line)], start))
        position += len(line)

    divs = []
    for tag in re.finditer(r'<div\b[^>]*>|</div\s*>', text, re.I):
        if tag[0].lower().startswith('</'):
            if divs:
                source_id, start = divs.pop()
                if source_id:
                    scopes.setdefault(source_id, []).append(Scope(text[start:tag.end()], start))
        else:
            attrs = dict(re.findall(r'([\w-]+)=["\']([^"\']*)["\']', tag[0]))
            kind = set(attrs.get('class', '').split())
            source_id = attrs.get('id') if kind.intersection({'exercise', 'example'}) else None
            divs.append((source_id, tag.start()))
    for match in re.finditer(r'<!-- physics-scope: ([\w-]+) -->(.*?)<!-- /physics-scope -->', text, re.S):
        scopes.setdefault(match[1], []).append(Scope(match[2], match.start(2)))
    return scopes


def unique(matches, description):
    if len(matches) != 1:
        raise BindingError(f'{description}: expected one match, found {len(matches)}')
    return matches[0]


def read_value(scope, reference, math_spans, split_relations, stated=False):
    """Read a quantity from a marked equation or one uniquely matching capture.

    Markers are invisible comments immediately before $$ math. The last
    equality segment is the default; a numeric segment index or named regex
    capture handles a given embedded in an equation or in prose.
    """
    text, offset = scope.text, scope.offset
    if 'marker' in reference:
        marker = re.escape(reference['marker'])
        found = list(re.finditer(r'<!--\s*physics:\s*' + marker + r'\s*-->\s*', text))
        match = unique(found, f'marker {reference["marker"]}')
        spans = list(math_spans(text[match.end():]))
        if not spans or spans[0][0] != 0:
            raise BindingError(f'marker {reference["marker"]}: must immediately precede math')
        start, body = spans[0]
        offset += match.end() + start
        text = body
        if 'pattern' not in reference:
            rows = list(split_relations(body))
            if len(rows) != 1 and 'row' not in reference:
                raise BindingError('reference needs a row for a multi-row equation')
            row = reference.get('row', 0)
            if not isinstance(row, int) or not -len(rows) <= row < len(rows):
                raise BindingError(f'invalid equation row: {row}')
            segments = [part for _, part in rows[row] if part.strip()]
            index = reference.get('segment', -1)
            if not isinstance(index, int) or not -len(segments) <= index < len(segments):
                raise BindingError(f'invalid equation segment: {index}')
            text = segments[index].strip().rstrip('.,')
    if 'pattern' in reference:
        pattern = reference['pattern'].replace('{number}', NUMBER)
        matches = list(re.finditer(pattern, text, re.S))
        match = unique(matches, 'source pattern')
        if 'value' not in match.groupdict() or match['value'] is None:
            raise BindingError('source pattern needs a named (?P<value>...) capture')
        offset += match.start('value')
        text = match['value']
    if 'marker' not in reference and 'pattern' not in reference:
        raise BindingError('source reference needs a marker or a pattern')
    if reference.get('format') == 'prose':
        literal = re.fullmatch(r'\s*(' + NUMBER + r')\s*-?\s*([^\d\s].*?)\s*', text)
        if not literal:
            raise BindingError(f'expected a prose quantity, got {text!r}')
        text = literal[1] + r'\text{' + literal[2] + '}'
    elif reference.get('format') == 'count':
        words = {'one': 1, 'two': 2, 'three': 3, 'four': 4}
        if text.strip() not in words:
            raise BindingError(f'unsupported exact count: {text}')
        return Value(float(words[text.strip()])), offset
    value = evaluate(text, exact_literals=reference.get('exact', False),
                     temperature=reference.get('temperature', 'absolute'), stated=stated)
    if reference.get('unit'):
        if value.dim or value.angle or value.absolute:
            raise BindingError('a unit annotation may only supply an omitted unit')
        value = value.attach(reference['unit'], reference.get('temperature', 'absolute'))
    return value, offset


def run_cases(document, contents_dir, selected, make_result, compare, math_spans, split_relations,
              tolerance=0.01):
    """Return one explicit result for each declarative assertion (including binding failures)."""
    relations = document['relations']
    results = []
    cache = {}
    for case in document['cases']:
        path = contents_dir / case['file']
        if selected is not None and path.resolve() not in selected:
            continue
        file = str(path)
        if path not in cache:
            if path.is_file():
                source = path.read_text(encoding='utf8')
                try:
                    cache[path] = (source, source_scopes(source))
                except (ValueError, TypeError) as error:
                    cache[path] = (source, f'invalid source container: {error}')
            else:
                cache[path] = ('', {})
        source, scopes = cache[path]
        for check in case['checks']:
            label = f'{case["id"]}/{check["id"]}'
            line = 0
            try:
                if not path.is_file():
                    raise BindingError('source file not found')
                if isinstance(scopes, str):
                    raise BindingError(scopes)
                scope = unique(scopes.get(case['source_id'], []), f'source ID {case["source_id"]}')
                line = source.count('\n', 0, scope.offset) + 1
                env = {}
                for name, reference in case['inputs'].items():
                    env[name], _ = read_value(scope, reference, math_spans, split_relations)
                for name, reference in case.get('constants', {}).items():
                    env[name] = evaluate(reference, exact_literals=True)

                def relation_value(specification):
                    relation = relations[specification['relation']]
                    required = relation['inputs']
                    supplied = specification['arguments']
                    if set(required) != set(supplied):
                        raise BindingError(f'relation {specification["relation"]}: arguments must be {required}')
                    arguments = {name: evaluate(expression, env, exact_literals=True)
                                 for name, expression in supplied.items()}
                    return evaluate(relation['expression'], arguments, exact_literals=True)

                for name, derivation in case.get('derived', {}).items():
                    env[name] = relation_value(derivation)
                expected, offset = read_value(scope, check['expected'], math_spans, split_relations, stated=True)
                line = source.count('\n', 0, offset) + 1
                computed = relation_value(check)
                result = compare(computed, expected, '=', check.get('tolerance', tolerance * 100) / 100)
                results.append(make_result(file, line, 'case', label, *result))
            except (BindingError, Skip, Invalid, KeyError, TypeError, ValueError,
                    ZeroDivisionError, OverflowError) as error:
                # A required declarative case must never silently disappear.
                results.append(make_result(file, line, 'case', label, 'failed',
                                           f'case cannot be verified: {error}', None, None, None))
    return results
