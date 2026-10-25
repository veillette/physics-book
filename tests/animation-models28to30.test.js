import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  gamma,
  lightClock,
  simultaneousEvents,
  contractedRod,
  addVelocity,
  relativisticState,
  hEV,
  hcEVnm,
  electronRestEV,
  planck,
  blackbodyReference,
  blackbodyState,
  photoelectricState,
  comptonState,
  diffractionDensity,
  diffractionBinProbability,
  diffractionSample,
  diffractionState,
  matterState,
  rutherfordTracks,
  scatteringPoint,
  hydrogenState,
  orbitWave,
  rubyState,
  pauliState,
} from '../scripts/figures/animation-models28to30.js';
import companions, {
  animationNames28to30,
  animateFigure28to30,
} from '../scripts/figures/animations28to30.js';
import ch28 from '../scripts/figures/ch28.js';
import ch29 from '../scripts/figures/ch29.js';
import ch30 from '../scripts/figures/ch30.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

const samples = [0, 0.1, 0.25, 0.49, 0.5, 0.51, 0.75, 1];
describe('relativistic companions', () => {
  it('keeps the light-clock photon at c and comoving with its moving mirrors in x', () => {
    for (const t of [0.1, 0.3, 0.7, 0.9]) {
      const s = lightClock(t),
        a = lightClock(t - 1e-5),
        b = lightClock(t + 1e-5);
      expect(s.lab / s.proper).toBeCloseTo(1.25, 12);
      expect(s.x).toBeCloseTo(0.6 * s.lab, 12);
      expect(Math.hypot((b.x - a.x) / (b.lab - a.lab), (b.y - a.y) / (b.lab - a.lab))).toBeCloseTo(
        1,
        9
      );
    }
    expect(lightClock(0).y).toBe(0);
    expect(lightClock(0.5).y).toBe(1);
    expect(lightClock(1).y).toBe(0);
  });
  it('transforms simultaneous emission events while preserving their spacetime interval', () => {
    for (const t of samples) {
      const s = simultaneousEvents(t);
      for (const e of [s.rear, s.front]) {
        expect(gamma(s.beta) * (e.time - s.beta * e.x)).toBeCloseTo(0, 12);
        expect(Math.abs(gamma(s.beta) * (e.x - s.beta * e.time))).toBeCloseTo(0.5, 12);
      }
      expect((s.front.time - s.rear.time) ** 2 - (s.front.x - s.rear.x) ** 2).toBeCloseTo(-1, 12);
    }
  });
  it('contracts only the measured longitudinal length', () => {
    for (const t of samples) {
      const s = contractedRod(t);
      expect(s.length * s.g).toBeCloseTo(1, 12);
    }
    expect(contractedRod(0).length).toBe(1);
    expect(contractedRod(1).length).toBeLessThan(0.32);
  });
  it('preserves c and bounds subluminal velocity addition even for backward launches', () => {
    for (const v of [-0.8, 0, 0.5, 0.8]) {
      expect(addVelocity(v, 1)).toBeCloseTo(1, 12);
      expect(addVelocity(v, -1)).toBeCloseTo(-1, 12);
      for (const u of [-0.75, 0.75]) expect(Math.abs(addVelocity(v, u))).toBeLessThan(1);
    }
    expect(addVelocity(0.5, 0.75)).toBeCloseTo(10 / 11, 12);
  });
  it('keeps energy, momentum and rest mass consistent and recovers the low-speed limits', () => {
    for (const t of samples) {
      const s = relativisticState(t);
      expect((s.kinetic + 1) ** 2 - s.momentum ** 2).toBeCloseTo(1, 11);
      expect(s.momentum).toBeGreaterThanOrEqual(s.classicalMomentum);
      expect(s.kinetic + 1e-14).toBeGreaterThanOrEqual(s.classicalKinetic);
    }
    const slow = relativisticState(0.001);
    expect(slow.kinetic / slow.classicalKinetic).toBeCloseTo(1, 5);
  });
});

describe('quantum companions', () => {
  it('uses a common Planck scale, Wien peak locations and total power proportional to T fourth', () => {
    for (const t of samples) {
      const s = blackbodyState(t);
      expect(s.peak * s.kelvin).toBeCloseTo(2.897771955e6, 6);
      expect(planck(s.peak, s.kelvin)).toBeGreaterThan(planck(s.peak * 0.98, s.kelvin));
      expect(planck(s.peak, s.kelvin)).toBeGreaterThan(planck(s.peak * 1.02, s.kelvin));
    }
    expect(planck(blackbodyState(0).peak, 3000) / blackbodyReference).toBeCloseTo(1 / 32, 12);
    expect(blackbodyState(1).power).toBe(16);
  });
  it('does not emit below threshold and balances photon energy above it', () => {
    expect(photoelectricState(0).emits).toBe(false);
    for (const t of samples) {
      const s = photoelectricState(t);
      expect(s.photon).toBeCloseTo(hEV * s.frequency, 12);
      if (s.emits) expect(s.work + s.kinetic).toBeCloseTo(s.photon, 12);
      else expect(s.kinetic).toBe(0);
    }
  });
  it('conserves relativistic electron energy and vector momentum in Compton scattering', () => {
    for (const t of samples) {
      const s = comptonState(t),
        [px, py] = s.recoil;
      expect(s.scattered + s.kinetic).toBeCloseTo(s.energy, 12);
      expect(px + s.photonMomentum[0]).toBeCloseTo(s.energy, 12);
      expect(py + s.photonMomentum[1]).toBeCloseTo(0, 12);
      expect((s.rest + s.kinetic) ** 2 - px ** 2 - py ** 2).toBeCloseTo(s.rest ** 2, 7);
      expect(s.shiftPm).toBeCloseTo(
        (hcEVnm / (electronRestEV / 1000)) * (1 - Math.cos(s.theta)),
        12
      );
    }
  });
  it('builds histograms from a reproducible sample of a normalized probability density', () => {
    expect(diffractionSample(10)).toEqual(diffractionSample(10));
    const n = 20000,
      hits = diffractionSample(n),
      probability = 0.05 - 1 / (10 * Math.PI);
    const measured = hits.filter(([x]) => x < 0.05).length / n;
    expect(Math.abs(measured - probability)).toBeLessThan(
      4 * Math.sqrt((probability * (1 - probability)) / n)
    );
    let integral = 0;
    for (let i = 0; i < 1000; i++) integral += diffractionDensity((i + 0.5) / 1000) / 1000;
    expect(integral).toBeCloseTo(1, 12);
    expect(
      Array.from({ length: 20 }, (_, i) => diffractionBinProbability(i)).reduce((a, b) => a + b, 0)
    ).toBeCloseTo(1, 12);
    expect(diffractionBinProbability(0)).toBeCloseTo(probability, 12);
    for (const t of samples) {
      const s = diffractionState(t);
      expect(s.bins.reduce((a, b) => a + b, 0)).toBe(s.count);
    }
  });
  it('relates electron momentum, wavelength and speed without assigning photon speed to electrons', () => {
    for (const t of samples) {
      const s = matterState(t);
      expect(s.lambda * s.pc).toBeCloseTo(hcEVnm, 9);
      expect(s.pc ** 2).toBeCloseTo(s.kinetic * (s.kinetic + 2 * electronRestEV), 6);
      expect((gamma(s.beta) - 1) * electronRestEV).toBeCloseTo(s.kinetic, 7);
      expect(s.beta).toBeGreaterThan(0);
      expect(s.beta).toBeLessThan(1);
    }
    expect(matterState(1).lambda).toBeLessThan(matterState(0).lambda);
  });
});

describe('atomic companions', () => {
  it('uses repulsive Coulomb hyperbolas with conserved energy and the Rutherford impact-angle relation', () => {
    for (const track of rutherfordTracks) {
      expect(1 / Math.tan(track.angle / 2)).toBeCloseTo(track.b, 12);
      expect(Math.min(...track.samples.map(s => s.r))).toBeCloseTo(track.minimum, 10);
      for (const s of track.samples) {
        expect(Math.hypot(s.x, s.y)).toBeCloseTo(s.r, 10);
        expect(s.speedSquared / 2 + 1 / s.r).toBeCloseTo(0.5, 10);
      }
      expect(scatteringPoint(track, 0)).toEqual(track.samples[0]);
      expect(scatteringPoint(track, track.duration + 1)).toEqual(track.samples.at(-1));
    }
  });
  it('emits discrete hydrogen photons whose wavelengths come from their energy gaps', () => {
    const seen = [];
    for (const t of [0.1, 0.35, 0.6, 0.85]) {
      const s = hydrogenState(t);
      seen.push(s.initial);
      expect(s.final).toBe(2);
      expect(s.energy * s.lambda).toBeCloseTo(hcEVnm, 9);
      expect(s.energy).toBeCloseTo(-13.6 / s.initial ** 2 - -13.6 / s.final ** 2, 12);
    }
    expect(seen).toEqual([3, 4, 5, 6]);
    expect(hydrogenState(0).lambda).toBeCloseTo(656.4, 0);
  });
  it('closes both integer ring modes without rotating nodes into a particle path', () => {
    for (const n of [3, 4])
      for (const t of samples) {
        expect(orbitWave(n, 0, t)).toBeCloseTo(orbitWave(n, 2 * Math.PI, t), 12);
        expect(orbitWave(n, Math.PI / (2 * n), t)).toBeCloseTo(0, 12);
      }
  });
  it('balances pump and seed energy against storage, heat and stimulated output throughout the ruby cycle', () => {
    for (const t of [...samples, 0.18, 0.3, 0.65]) {
      const s = rubyState(t);
      expect([0, 1.79, 2.3]).toContain(s.level);
      expect(s.pump + s.seed).toBeCloseTo(s.level + s.heat + s.output, 12);
    }
    expect(rubyState(1).output).toBeCloseTo(2 * 1.79, 12);
  });
  it('never fills a spatial orbital with more than two opposite-spin electrons', () => {
    for (const t of samples) {
      const s = pauliState(t),
        occupied = [];
      if (s.oneUp) occupied.push('1,0,0,+.5');
      if (s.oneDown) occupied.push('1,0,0,-.5');
      if (s.twoUp) occupied.push('2,0,0,+.5');
      expect(new Set(occupied).size).toBe(occupied.length);
      if (!s.allowed) expect(s.stage === 1 || s.stage === 3).toBe(true);
    }
    expect(pauliState(1).twoUp).toBe(true);
  });
});

it('generates sixteen self-contained accessible animations with independent static alternatives', () => {
  const names = [...animationNames28to30, ...Object.keys(companions)],
    builders = { ...ch28, ...ch29, ...ch30 };
  expect(names).toHaveLength(16);
  for (const name of names) {
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8'),
      $ = load(svg, { xmlMode: true });
    expect(animatedFigureNames.has(`${name}.svg`), name).toBe(true);
    expect($('svg').attr('role'), name).toBe('img');
    expect($('title').text().length, name).toBeGreaterThan(8);
    expect($('desc').text().length, name).toBeGreaterThan(70);
    expect($('image,script,foreignObject'), name).toHaveLength(0);
    expect($('.anim-still').children().length, name).toBeGreaterThan(3);
    expect($('.anim-still animate'), name).toHaveLength(0);
    expect($('.anim-movie animate').length, name).toBeGreaterThan(0);
    expect(svg, name).not.toMatch(/NaN|Infinity|undefined/);
    expect(svg, name).toContain('prefers-reduced-motion:reduce');
    expect(svg, name).toContain('#animation-paused:target');
    const ids = $('[id]')
      .toArray()
      .map(el => $(el).attr('id'));
    expect(new Set(ids).size, name).toBe(ids.length);
    for (const el of $('animate').toArray())
      expect($(el).attr('values').split(';'), name).toHaveLength(61);
    expect(svg, name).toBe(
      companions[name] ? companions[name]() : animateFigure28to30(name, builders[name]())
    );
  }
});
