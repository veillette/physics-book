import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  carMotion,
  elevatorMotion,
  frictionMotion,
  circularMotion,
  hydraulicMotion,
  pipeSpeed,
  skaterMotion,
  fragmentMotion,
  rocketMotion,
  venturiPosition,
  venturiHeight,
  displacementPaths,
  pathProgress,
} from '../scripts/figures/animation-models.js';
import redraws, { animationNames } from '../scripts/figures/animations01to13.js';

const derivative = (fn, t, h = 1e-5) => (fn(t + h) - fn(t - h)) / (2 * h);

describe('motion and force stay synchronized', () => {
  it('preserves the original path endpoints while keeping traveled distance through reversals', () => {
    const expected = [
      [7, 7],
      [7, 5],
      [10, 12],
      [5, 8],
    ];
    displacementPaths.forEach((points, i) => {
      const end = pathProgress(points, 1);
      expect([end.x, end.distance]).toEqual(expected[i]);
      expect(pathProgress(points, 0).x).toBe(points[0]);
      expect(end.distance).toBeGreaterThanOrEqual(Math.abs(end.x - points[0]));
    });
  });
  it('keeps all four cars in their stated direction while accelerating or decelerating', () => {
    for (let i = 0; i < 4; i += 1) {
      for (const t of [0.1, 1, 2.9]) {
        const state = carMotion(t, i);
        expect(derivative(q => carMotion(q, i).x, t)).toBeCloseTo(state.v, 7);
        expect(derivative(q => carMotion(q, i).v, t)).toBeCloseTo(state.a, 7);
        expect(Math.sign(state.v)).toBe(i < 2 ? 1 : -1);
        expect(Math.sign(state.a * state.v)).toBe(i === 0 || i === 3 ? 1 : -1);
      }
    }
  });

  it('preserves continuous elevator position and velocity and the example’s 75 kg scale readings', () => {
    for (const t of [0.4, 1.5, 3.2]) {
      const s = elevatorMotion(t);
      expect(s.normal - 75 * 9.8).toBeCloseTo(75 * s.a, 9);
      expect(derivative(q => elevatorMotion(q).y, t)).toBeCloseTo(s.v, 7);
      expect(derivative(q => elevatorMotion(q).v, t)).toBeCloseTo(s.a, 7);
    }
    for (const t of [1 / 1.2, 1 / 1.2 + 2]) {
      expect(elevatorMotion(t - 1e-7).y).toBeCloseTo(elevatorMotion(t + 1e-7).y, 5);
      expect(elevatorMotion(t - 1e-7).v).toBeCloseTo(elevatorMotion(t + 1e-7).v, 5);
    }
    expect(elevatorMotion(2 / 1.2 + 2).v).toBeCloseTo(0, 12);
  });

  it('holds the crate until the static threshold and obeys Fnet = ma after slipping', () => {
    expect(frictionMotion(2).x).toBe(0);
    expect(frictionMotion(2).friction).toBe(40);
    expect(frictionMotion(2.5).friction).toBe(50);
    for (const t of [2.6, 3, 3.9]) {
      const s = frictionMotion(t);
      expect(s.friction).toBe(30);
      expect(derivative(q => frictionMotion(q).x, t)).toBeCloseTo(s.v, 7);
      expect(derivative(q => frictionMotion(q).v, t)).toBeCloseTo(s.a, 7);
    }
  });

  it('resolves the actual derivative of velocity into radial and tangential acceleration', () => {
    for (const t of [0.2, 2, 5.5]) {
      const s = circularMotion(t);
      expect(s.at[0] * s.p[0] + s.at[1] * s.p[1]).toBeCloseTo(0, 10);
      expect(Math.hypot(...s.ar)).toBeCloseTo(Math.hypot(...s.v) ** 2, 10);
      for (let i = 0; i < 2; i += 1) {
        expect(derivative(q => circularMotion(q).p[i], t)).toBeCloseTo(s.v[i], 7);
        expect(derivative(q => circularMotion(q).v[i], t)).toBeCloseTo(s.a[i], 7);
      }
    }
  });
});

describe('conservation laws in animated companions', () => {
  it('preserves displaced fluid volume and ideal hydraulic work', () => {
    for (const q of [0.1, 0.5, 1]) {
      const s = hydraulicMotion(q);
      expect(s.a1 * s.dx1).toBeCloseTo(s.a2 * s.dx2, 12);
      expect(s.f1 * s.dx1).toBeCloseTo(s.f2 * s.dx2, 12);
    }
  });

  it('uses no slip, twice-mean center speed, and the correct area-weighted mean for circular pipe flow', () => {
    expect(pipeSpeed(-1)).toBe(0);
    expect(pipeSpeed(1)).toBe(0);
    expect(pipeSpeed(0)).toBe(2);
    let integral = 0;
    const n = 10000;
    for (let i = 0; i < n; i += 1) {
      const r = (i + 0.5) / n;
      integral += (2 * r * pipeSpeed(r)) / n;
    }
    expect(integral).toBeCloseTo(1, 7);
  });

  it('moves Venturi tracers at a constant volume flow rate through the changing circular area', () => {
    const fluxes = [0.1, 0.43, 0.49, 0.51, 0.57, 0.9].map(q => {
      const x = venturiPosition(q);
      return derivative(venturiPosition, q, 1e-4) * venturiHeight(x) ** 2;
    });
    for (const value of fluxes) expect(value / fluxes[0]).toBeCloseTo(1, 2);
  });

  it('conserves skater angular momentum with an angular position whose derivative is the displayed speed', () => {
    for (const t of [0.1, 1, 3.9]) {
      const s = skaterMotion(t);
      expect(s.inertia * s.omega).toBeCloseTo(1, 12);
      expect(derivative(q => skaterMotion(q).theta, t)).toBeCloseTo(s.omega, 7);
    }
    expect(skaterMotion(4).kinetic / skaterMotion(0).kinetic).toBeCloseTo(4, 10);
  });

  it('keeps the mass-weighted center of fragments on the original gravitational trajectory', () => {
    for (const t of [0, 0.8, 1, 1.4, 2.7]) {
      const s = fragmentMotion(t);
      for (let i = 0; i < 2; i += 1) {
        expect((s.first[i] + 2 * s.second[i]) / 3).toBeCloseTo(s.center[i], 12);
      }
    }
  });

  it('uses rocket momentum balance with exhaust measured relative to the rocket', () => {
    for (const t of [0.1, 1, 3.9]) {
      const s = rocketMotion(t);
      expect(derivative(q => rocketMotion(q).y, t)).toBeCloseTo(s.v, 7);
      expect(s.mass * derivative(q => rocketMotion(q).v, t)).toBeCloseTo(
        s.exhaustSpeed - s.mass * s.gravity,
        7
      );
    }
  });
});

it('keeps every new animation self-contained, accessible, finite, and complete without motion', () => {
  const names = [...animationNames, ...Object.keys(redraws)];
  expect(names).toHaveLength(40); // 39 ideas; the two accuracy targets are separate assets.
  for (const name of names) {
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8');
    const $ = load(svg, { xmlMode: true });
    expect($('svg').attr('role'), name).toBe('img');
    expect($('title').text().length, name).toBeGreaterThan(8);
    expect($('desc').text().length, name).toBeGreaterThan(50);
    expect($('image, script, foreignObject'), name).toHaveLength(0);
    const ids = $('[id]')
      .toArray()
      .map(el => $(el).attr('id'));
    expect(new Set(ids).size, name).toBe(ids.length);
    expect($('.anim-still').children().length, name).toBeGreaterThan(3);
    expect($('.anim-still animate'), name).toHaveLength(0);
    expect($('.anim-movie animate').length, name).toBeGreaterThan(0);
    expect(svg, name).toContain('prefers-reduced-motion:reduce');
    expect(svg, name).not.toMatch(/NaN|Infinity|undefined/);
    for (const el of $('animate').toArray()) {
      const values = $(el).attr('values').split(';');
      expect(values.length, name).toBe(61);
    }
  }
});
