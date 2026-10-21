import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import sketches from '../scripts/figures/mechanics-sketches.js';

const parse = name => load(sketches[name](), { xmlMode: true });

/** Arrows in a group as { start, end, dx, dy } with y up. */
function arrows($, id) {
  return $(`#${id} > line`)
    .toArray()
    .map((line, k) => {
      const [x, y] = $(`#${id} > polygon`).eq(k).attr('points').split(/[ ,]+/).map(Number);
      const start = [Number($(line).attr('x1')), Number($(line).attr('y1'))];
      return { start, end: [x, y], dx: x - start[0], dy: start[1] - y };
    });
}

/** Sense of the arcs in a group about a center: +1 counterclockwise, −1 clockwise. */
function spin($, id, [cx, cy]) {
  return $(`#${id} > polyline`)
    .toArray()
    .map(el => {
      const pts = $(el)
        .attr('points')
        .split(' ')
        .map(p => p.split(',').map(Number));
      const [a, b] = [pts[0], pts.at(-1)];
      return Math.sign((a[0] - cx) * (cy - b[1]) - (cy - a[1]) * (b[0] - cx));
    });
}

const center = ($, id) => {
  const c = $(`#${id} > circle`).first();
  return [Number(c.attr('cx')), Number(c.attr('cy'))];
};

describe('hockey-stick torque diagrams', () => {
  it.each([
    ['A', 1],
    ['B', -1],
  ])('the force about pivot %s turns the stick the way the arc shows', (pivot, sense) => {
    const $ = parse('Figure_09_02_02');
    const O = center($, `pivot-${pivot}`);
    const [F] = arrows($, `force-${pivot}`);
    const torque = (F.end[0] - O[0]) * F.dy - (O[1] - F.end[1]) * F.dx;
    expect(Math.sign(torque)).toBe(sense);
    expect(spin($, `spin-${pivot}`, O)).toEqual([sense]);
  });

  it('applies equal, opposite, collinear forces for equilibrium', () => {
    const $ = parse('Figure_09_01_03');
    const [left] = arrows($, 'left-force');
    const [right] = arrows($, 'right-force');
    expect(left.dx).toBeCloseTo(-right.dx, 6);
    expect(left.dy).toBe(0);
    expect(left.end[1]).toBe(right.end[1]);
  });

  it('applies the same forces on different lines for a clockwise couple', () => {
    const $ = parse('Figure_09_01_04');
    const [upper] = arrows($, 'upper-force');
    const [lower] = arrows($, 'lower-force');
    expect(upper.dx).toBeCloseTo(-lower.dx, 6);
    const torque = (p, f) => p.end[0] * f.dy - -p.end[1] * f.dx;
    expect(Math.sign(torque(upper, upper) + torque(lower, lower))).toBe(-1);
  });
});

it('gives each fly a tangential velocity matching the clockwise spin', () => {
  const $ = parse('Figure_06_01_05');
  const [top] = arrows($, 'top-velocity');
  const [right] = arrows($, 'right-velocity');
  expect(top.dy).toBe(0);
  expect(top.dx).toBeGreaterThan(0);
  expect(right.dx).toBe(0);
  expect(right.dy).toBeLessThan(0);
  expect(spin($, 'spin', [360, 400])).toEqual([-1]);
});

it('stretches the tidal bulge toward the Moon in each panel', () => {
  const $ = parse('Figure_06_05_06');
  const axes = tag => {
    const e = $(`#bulge-${tag} > ellipse`).first();
    return Number(e.attr('rx')) - Number(e.attr('ry'));
  };
  expect(axes('a')).toBeGreaterThan(0);
  expect(axes('b')).toBeGreaterThan(0);
  expect(axes('c')).toBeLessThan(0);
});

it('draws the cabin-to-lake displacement 40° north of east', () => {
  const [S] = arrows(parse('Figure_03_02_18'), 'displacement');
  expect((Math.atan2(S.dy, S.dx) * 180) / Math.PI).toBeCloseTo(40, 1);
});

it('inclines the slope at 5°', () => {
  const $ = parse('Figure_07_05_05');
  const hyp = $('#slope > line').first();
  const [x1, y1, x2, y2] = ['x1', 'y1', 'x2', 'y2'].map(a => Number(hyp.attr(a)));
  expect((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI).toBeCloseTo(5, 1);
});

it('makes the small-normal-force arrows shorter than the large ones', () => {
  const $ = parse('Figure_05_01_04');
  const len = id => arrows($, id)[0].dy;
  expect(-len('small-top-force')).toBeLessThan(-len('large-top-force'));
  expect(len('small-bottom-force')).toBeLessThan(len('large-bottom-force'));
});
