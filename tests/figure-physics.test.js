import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import fbd04 from '../scripts/fbd/ch04.js';
import fbd05 from '../scripts/fbd/ch05.js';
import fbd06 from '../scripts/fbd/ch06.js';
import ch02 from '../scripts/figures/ch02.js';
import ch03 from '../scripts/figures/ch03.js';
import ch04to07 from '../scripts/figures/ch04to07.js';

// Measure the rendered arrow from the shaft's start to the triangular head's tip.
// SVG y points down; return vectors in math coordinates so force sums use +y up.
function arrows(svg, color = '#b03a2e') {
  const $ = load(svg, { xmlMode: true });
  return $(`polygon[fill="${color}"]`)
    .toArray()
    .map(head => {
      const shaft = $(head).prev('line');
      const [x, y] = $(head).attr('points').split(/[ ,]+/).map(Number);
      const start = [Number(shaft.attr('x1')), Number(shaft.attr('y1'))];
      return { start, dx: x - start[0], dy: start[1] - y };
    });
}

function resultant(vectors) {
  return vectors.reduce(([x, y], v) => [x + v.dx, y + v.dy], [0, 0]);
}

describe('force diagrams agree with Newton’s second law', () => {
  it.each([
    ['baby and basket', () => fbd04.fbd_04_05_p06(), true],
    ['cart', () => fbd04.fbd_04_06_p13(), false],
    ['rescued person', () => fbd04.fbd_04_07_p03(), false],
    ['climber', () => fbd05.fbd_05_01_p17(), false],
  ])('balances forces in every stationary %s panel', (_name, build, multiPanel) => {
    const svg = build();
    const $ = load(svg, { xmlMode: true });
    const panels = multiPanel
      ? $('svg > g')
          .toArray()
          .map(el => $.xml(el))
      : [svg];
    for (const panel of panels) {
      const [x, y] = resultant(arrows(panel));
      expect(x).toBeCloseTo(0, 1);
      expect(y).toBeCloseTo(0, 1);
    }
  });

  it('uses the stated wagon forces and gives a rightward net force', () => {
    const forces = arrows(fbd04.fbd_04_03_p09());
    const right = forces.find(v => v.dx > 0);
    const left = forces.filter(v => v.dx < 0).sort((a, b) => a.dx - b.dx);
    expect(-left[0].dx / right.dx).toBeCloseTo(75 / 90, 3);
    expect(-left[1].dx / right.dx).toBeCloseTo(12 / 90, 3);
    const [x, y] = resultant(forces);
    expect(x / right.dx).toBeCloseTo(3 / 90, 3);
    expect(y).toBeCloseTo(0, 2);
  });

  it('gives the banked car the required inward centripetal acceleration', () => {
    const forces = arrows(fbd06.fbd_06_03_p08());
    const weight = forces.find(v => v.dy < 0);
    const [x, y] = resultant(forces);
    expect(x).toBeGreaterThan(0);
    expect(x / -weight.dy).toBeCloseTo((20 / 3.6) ** 2 / (100 * 9.8), 4);
    expect(y).toBeCloseTo(0, 2);
  });

  it('keeps both tightrope tensions equal and consistent with the 5° angle', () => {
    const forces = arrows(ch04to07.Figure_04_05_07()).filter(v => v.start[0] > 400);
    const up = forces.filter(v => v.dy > 0);
    const horizontal = forces.filter(v => Math.abs(v.dx) > 0);
    expect(forces).toHaveLength(5);
    expect(up).toHaveLength(2);
    expect(up[0].dy).toBeCloseTo(up[1].dy, 2);
    expect(up[0].dy / Math.abs(horizontal[0].dx)).toBeCloseTo(Math.tan(Math.PI / 36), 4);
    const [x, y] = resultant(forces);
    expect(x).toBeCloseTo(0, 2);
    expect(y).toBeCloseTo(0, 1);
  });

  it('preserves the actual baby and scale weight ratio', () => {
    const $ = load(fbd04.fbd_04_05_p06(), { xmlMode: true });
    const weights = arrows($.xml($('svg > g').get(1)))
      .filter(v => v.dy < 0)
      .sort((a, b) => a.dy - b.dy);
    expect(weights[1].dy / weights[0].dy).toBeCloseTo(4.9 / 55, 3);
  });

  it('identifies the tooth drawing as wire forces only, without claiming equilibrium', () => {
    const svg = fbd04.fbd_04_06_p11();
    const $ = load(svg, { xmlMode: true });
    expect($('title').text()).toBe('Wire forces on the tooth');
    expect($('desc').text()).toContain('surrounding tissue are not shown');
    expect($('text').text()).not.toContain('a = 0');
    expect(arrows(svg)).toHaveLength(2);
    const [x, y] = resultant(arrows(svg));
    expect(x).toBeCloseTo(0, 2);
    expect(y).toBeLessThan(0);
  });
});

describe('motion graphs preserve the slopes used in conceptual questions', () => {
  it.each([
    ['Figure_02_08_09', [4]],
    ['Figure_02_08_10', [2, 4, 6, 11]],
    ['Figure_02_08_12', [3, 4, 7]],
  ])('%s has zero slopes at its labeled extrema and no overshoot', (name, flatPoints) => {
    const $ = load(ch02[name](), { xmlMode: true });
    const path = $('path').attr('d');
    const numbers = path.match(/-?\d+(?:\.\d+)?/g).map(Number);
    let start = numbers.slice(0, 2);
    for (let offset = 2, k = 0; offset < numbers.length; offset += 6, k += 1) {
      const [c1x, c1y, c2x, c2y, x, y] = numbers.slice(offset, offset + 6);
      if (flatPoints.includes(k)) {
        expect(c1y).toBe(start[1]);
        expect(c1x).toBeGreaterThan(start[0]);
      }
      if (flatPoints.includes(k + 1)) {
        expect(c2y).toBe(y);
        expect(c2x).toBeLessThan(x);
      }
      // Sample each cubic: the graph must not turn between labeled extrema.
      for (let step = 0; step <= 50; step += 1) {
        const t = step / 50;
        const slopeY =
          3 * (1 - t) ** 2 * (c1y - start[1]) +
          6 * (1 - t) * t * (c2y - c1y) +
          3 * t ** 2 * (y - c2y);
        expect(slopeY * (y - start[1])).toBeGreaterThanOrEqual(-0.01);
      }
      start = [x, y];
    }
  });
});

it('places the ellipse foci so the sum of distances is constant', () => {
  const $ = load(ch04to07.Figure_06_06_01(), { xmlMode: true });
  const ellipse = $('ellipse').first();
  const [cx, cy, a, b] = ['cx', 'cy', 'rx', 'ry'].map(attr => Number(ellipse.attr(attr)));
  const foci = $('circle[fill="#222222"][r="7"]')
    .toArray()
    .map(el => [Number($(el).attr('cx')), Number($(el).attr('cy'))]);
  expect(foci).toHaveLength(2);
  for (let k = 0; k < 36; k += 1) {
    const angle = (k * Math.PI) / 18;
    const point = [cx + a * Math.cos(angle), cy + b * Math.sin(angle)];
    const sum = foci.reduce((total, f) => total + Math.hypot(point[0] - f[0], point[1] - f[1]), 0);
    expect(sum).toBeCloseTo(2 * a, 2);
  }
});

it('keeps the checked-in SVGs identical to their generator output', () => {
  const figures = { ...ch02, ...ch03, ...ch04to07, ...fbd04, ...fbd05, ...fbd06 };
  for (const [name, build] of Object.entries(figures)) {
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8');
    expect(svg, name).toBe(build());
  }
});
