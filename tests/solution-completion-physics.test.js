import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import completion, { impulsePlot } from '../scripts/figures/solution-completion.js';

function segment(line) {
  const start = [Number(line.attr('x1')), Number(line.attr('y1'))];
  const end = [Number(line.attr('x2')), Number(line.attr('y2'))];
  return { start, end, delta: [end[0] - start[0], end[1] - start[1]] };
}

describe('solution diagrams satisfy their physical constraints', () => {
  it('draws centripetal acceleration perpendicular to velocity', () => {
    const $ = load(completion.concept_10_01_q02(), { xmlMode: true });
    const v = segment($('line[stroke="#5e9e1e"]').first());
    const a = segment($('line[stroke="#6a3d9a"]').first());
    expect(v.start).toEqual(a.start);
    expect(v.delta[0] * a.delta[0] + v.delta[1] * a.delta[1]).toBeCloseTo(0, 3);
    expect(a.delta[0]).toBeLessThan(0);
    expect(v.delta[1]).toBeLessThan(0); // SVG upward velocity
  });

  it('draws the muscle moment arm perpendicular to and ending on the tendon line', () => {
    const $ = load(completion.concept_09_06_q06(), { xmlMode: true });
    const tendon = segment($('line[stroke="#1f77c8"]').first());
    const arm = segment($('line[stroke="#6a3d9a"]').first());
    const length = Math.hypot(...tendon.delta);
    const dot = tendon.delta[0] * arm.delta[0] + tendon.delta[1] * arm.delta[1];
    expect(Math.abs(dot) / length).toBeLessThan(0.02); // rounded SVG coordinates
    const offset = [arm.end[0] - tendon.start[0], arm.end[1] - tendon.start[1]];
    const cross = offset[0] * tendon.delta[1] - offset[1] * tendon.delta[0];
    expect(Math.abs(cross) / length).toBeLessThan(0.02);
    // The small proximal offset precludes treating the whole insertion distance as leverage.
    expect(Math.hypot(...arm.delta)).toBeLessThan(0.15 * Math.abs(tendon.delta[0]));
  });

  it('gives both plotted net-force pulses a 9 N s impulse', () => {
    const $ = load(impulsePlot(), { xmlMode: true });
    const impulses = ['#c62828', '#1f77c8'].map(color => {
      const points = $(`polyline[stroke="${color}"]`)
        .attr('points')
        .trim()
        .split(/\s+/)
        .map(p => p.split(',').map(Number))
        .map(([x, y]) => [((x - 105) / 520) * 25, ((290 - y) / 250) * 8]);
      // Horizontal units are ms and vertical units kN, so their product is N s.
      return points.slice(1).reduce((area, point, k) => {
        const previous = points[k];
        return area + ((point[0] - previous[0]) * (point[1] + previous[1])) / 2;
      }, 0);
    });
    for (const impulse of impulses) expect(impulse).toBeCloseTo(9, 2);
    expect(impulses[0]).toBeCloseTo(impulses[1], 2);
  });
});
