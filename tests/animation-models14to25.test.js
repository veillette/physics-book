import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import {
  wallProbe,
  heatPumpEnergy,
  entropyTransfer,
  interferenceState,
  coulombPair,
  pointEquipotential,
  uniformEquipotential,
  electronCharge,
  carrierCurrent,
  wireGeometry,
  resistiveAC,
  batteryLoad,
  spectrumState,
} from '../scripts/figures/animation-models14to25.js';
import { animationNames14to25 } from '../scripts/figures/animations14to25.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

const samples = [0, 0.1, 0.25, 0.49, 0.5, 0.51, 0.75, 1];
describe('thermal animation accounting', () => {
  it('keeps the wall temperature continuous and heat flux constant across materials', () => {
    const { wall } = wallProbe(0),
      width = wall.points.at(-1)[0];
    expect(wallProbe(0).temperature).toBeCloseTo(20, 10);
    expect(wallProbe(1).temperature).toBeCloseTo(0, 10);
    wall.layers.forEach((layer, i) => {
      const [x0, t0] = wall.points[i],
        [x1, t1] = wall.points[i + 1];
      expect((-layer.k * (t1 - t0)) / (x1 - x0)).toBeCloseTo(wall.flux, 10);
      const probe = wallProbe((x0 + x1) / (2 * width));
      expect(probe.temperature).toBeCloseTo((t0 + t1) / 2, 10);
      if (i > 0) {
        expect(wallProbe(x0 / width - 1e-9).temperature).toBeCloseTo(
          wallProbe(x0 / width + 1e-9).temperature,
          5
        );
      }
    });
  });
  it('conserves heat-pump energy even when heating COP exceeds one', () => {
    for (const t of samples) {
      const s = heatPumpEnergy(t);
      expect(s.hot).toBeCloseTo(s.cold + s.work, 10);
      if (t) expect(s.hot / s.work).toBeCloseTo(4, 10);
    }
  });
  it('uses absolute reservoir temperatures and a positive total entropy change', () => {
    for (const t of samples) {
      const s = entropyTransfer(t);
      expect(s.hot * 600).toBeCloseTo(-s.heat, 9);
      expect(s.cold * 250).toBeCloseTo(s.heat, 9);
      expect(s.total).toBeGreaterThanOrEqual(0);
    }
    expect(entropyTransfer(1).total).toBeCloseTo(28 / 3, 10);
  });
});

describe('waves and electrostatic work', () => {
  it('adds wave displacement pointwise and resolves constructive and destructive phase', () => {
    for (const phase of [0, 0.5, Math.PI, 1.5 * Math.PI, 2 * Math.PI]) {
      const values = Array.from({ length: 4096 }, (_, i) =>
        interferenceState((2 * Math.PI * i) / 4096, phase)
      );
      for (const s of values) expect(s.sum).toBeCloseTo(s.first + s.second, 12);
      expect(Math.max(...values.map(s => Math.abs(s.sum)))).toBeCloseTo(values[0].amplitude, 5);
    }
    expect(interferenceState(0.8, Math.PI).sum).toBeCloseTo(0, 12);
  });
  it('gives equal and opposite inverse-square forces for both charge-sign cases', () => {
    for (const unlike of [false, true]) {
      for (const t of samples) {
        const s = coulombPair(t, unlike);
        expect(s.leftForce + s.rightForce).toBe(0);
        expect(Math.sign(s.rightForce)).toBe(unlike ? -1 : 1);
      }
      expect(coulombPair(0, unlike).rightForce / coulombPair(1, unlike).rightForce).toBeCloseTo(
        4,
        12
      );
    }
  });
  it('does no electric work on equipotentials and uses W = −qΔV across them', () => {
    for (const t of [0, 0.1, 0.25, 0.5]) {
      expect(pointEquipotential(t).work).toBeCloseTo(0, 12);
      expect(uniformEquipotential(t).work).toBeCloseTo(0, 12);
    }
    for (const t of samples) {
      const point = pointEquipotential(t),
        plate = uniformEquipotential(t);
      expect(Math.hypot(point.x, point.y)).toBeCloseTo(point.r, 12);
      expect(point.potential * point.r).toBeCloseTo(1, 12);
      expect(point.work).toBeCloseTo(-1e-6 * (point.potential - 10), 12);
      expect(plate.work).toBeCloseTo(-1e-6 * (plate.potential - 75), 12);
    }
    expect(pointEquipotential(1).work * 1e6).toBeCloseTo(5, 10);
    expect(uniformEquipotential(1).work * 1e6).toBeCloseTo(50, 10);
  });
});

describe('circuits and electromagnetic scale', () => {
  it('gives the same conventional current for opposite carrier signs and drift directions', () => {
    const n = 8.5e28,
      area = 1e-6,
      velocity = 2 / (n * electronCharge * area);
    expect(velocity * 1000).toBeCloseTo(0.146858, 5);
    expect(carrierCurrent(n, electronCharge, area, velocity)).toBeCloseTo(2, 12);
    expect(carrierCurrent(n, -electronCharge, area, -velocity)).toBeCloseTo(2, 12);
  });
  it('varies length and area independently at fixed resistivity and voltage', () => {
    const start = wireGeometry(0),
      middle = wireGeometry(0.5),
      end = wireGeometry(1);
    expect(middle.resistance / start.resistance).toBeCloseTo(2, 12);
    expect(end.resistance / middle.resistance).toBeCloseTo(0.5, 12);
    expect(start.area).toBe(middle.area);
    expect(middle.length).toBe(end.length);
    for (const t of samples) {
      const s = wireGeometry(t);
      expect(s.resistance).toBeCloseTo((s.resistivity * s.length) / s.area, 12);
      expect(s.current * s.resistance).toBeCloseTo(5, 12);
    }
  });
  it('keeps resistive power nonnegative with twice-frequency peaks and the correct mean', () => {
    let total = 0;
    for (let i = 0; i < 1000; i += 1) {
      const t = i / 1000,
        s = resistiveAC(t);
      expect(s.power).toBeGreaterThanOrEqual(0);
      expect(s.voltage / 5).toBeCloseTo(s.current, 12);
      expect(s.power).toBeCloseTo(resistiveAC(t + 0.5).power, 10);
      total += s.power;
    }
    expect(total / 1000).toBeCloseTo(resistiveAC(0).meanPower, 10);
    expect(resistiveAC(0.25).power).toBeCloseTo(20, 10);
    expect(resistiveAC(0.75).power).toBeCloseTo(20, 10);
  });
  it('balances emf, terminal voltage, internal loss, and dissipated power', () => {
    for (const t of samples) {
      const s = batteryLoad(t);
      expect(s.terminal + s.loss).toBeCloseTo(s.emf, 12);
      expect(s.loss).toBeCloseTo(s.current * s.internal, 12);
      expect(s.current * s.emf).toBeCloseTo(s.current ** 2 * (s.load + s.internal), 10);
    }
    expect(batteryLoad(1).terminal).toBeGreaterThan(batteryLoad(0).terminal);
    expect(batteryLoad(1).current).toBeLessThan(batteryLoad(0).current);
  });
  it('keeps vacuum wave speed fixed across sixteen orders of frequency', () => {
    for (const t of samples) {
      const s = spectrumState(t);
      expect(s.frequency * s.wavelength).toBeCloseTo(299792458, 5);
    }
    expect(spectrumState(1).frequency / spectrumState(0).frequency).toBe(1e16);
  });
});

it('registers all thirteen SVGs with complete static alternatives and finite self-contained motion', () => {
  expect(animationNames14to25).toHaveLength(13); // Eleven ideas, with paired equipotential/current figures.
  for (const name of animationNames14to25) {
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8');
    const $ = load(svg, { xmlMode: true });
    expect(animatedFigureNames.has(`${name}.svg`), name).toBe(true);
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
    expect(svg, name).toContain('#animation-paused:target');
    expect(svg, name).not.toMatch(/NaN|Infinity|undefined/);
    for (const el of $('animate[attributeName="opacity"]').toArray()) {
      expect($(el).attr('calcMode'), name).toBe('discrete');
      expect($(el).attr('keyTimes').split(';'), name).toHaveLength(61);
    }
    for (const el of $('animate').toArray())
      expect($(el).attr('values').split(';'), name).toHaveLength(61);
  }
});
