import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  wavelength,
  accommodation,
  visionCorrection,
  immersion,
  fiberState,
  fiberIndices,
  telescopePaths,
  pathLength,
  pathPoint,
  chromaticFocus,
  chromaticState,
  sphericalState,
  sphericalTrace,
  huygensState,
  doubleSlit,
  fringeState,
  slitState,
  slitIntensity,
  gratingCount,
  gratingIntensity,
  besselJ1,
  airyIntensity,
  airyFirstZero,
  resolutionState,
  filmState,
  malusState,
  crossedState,
} from '../scripts/figures/animation-models26to27.js';
import companions, {
  animationNames26to27,
  animateFigure26to27,
} from '../scripts/figures/animations26to27.js';
import ch26 from '../scripts/figures/ch26.js';
import ch27 from '../scripts/figures/ch27.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

const samples = [0, 0.1, 0.25, 0.49, 0.5, 0.51, 0.75, 1];
describe('geometric optics companions', () => {
  it('keeps the accommodated image at 2 cm while its power follows object vergence', () => {
    for (const t of samples) {
      const s = accommodation(t);
      expect(1 / (s.power - s.vergence)).toBeCloseTo(0.02, 12);
      for (const height of [-0.003, 0, 0.003]) {
        const incoming = height * s.vergence - 0.04;
        expect(height + (incoming - s.power * height) * s.imageDistance).toBeCloseTo(-0.0008, 12);
      }
    }
    expect(accommodation(0).power).toBe(50);
    expect(accommodation(1).power).toBe(54);
  });
  it('corrects a fixed-power eye with opposite lens signs in the contact approximation', () => {
    expect(visionCorrection(0).imageDistance).toBeLessThan(0.02);
    expect(visionCorrection(0, true).imageDistance).toBeGreaterThan(0.02);
    for (const hyperopic of [false, true]) {
      expect(visionCorrection(1, hyperopic).imageDistance).toBeCloseTo(0.02, 12);
      for (const t of samples) {
        const s = visionCorrection(t, hyperopic);
        expect(s.eyePower).toBe(visionCorrection(0, hyperopic).eyePower);
        expect(s.eyePower + s.correction).toBeCloseTo(s.vergence + 1 / s.imageDistance, 12);
      }
    }
    expect(visionCorrection(1).correction).toBe(-5);
    expect(visionCorrection(1, true).correction).toBe(5);
  });
  it('uses Snell angles and a collection half-angle measured in the immersion medium', () => {
    for (let i = 0; i < 3; i += 1) {
      const s = immersion(i);
      expect(s.n * Math.sin(s.angle)).toBeCloseTo(1.52 * Math.sin((35 * Math.PI) / 180), 12);
      expect(s.na).toBeCloseTo(s.n * Math.sin(s.halfAngle), 12);
    }
    expect([0, 1, 2].map(i => immersion(i).collected)).toEqual([false, true, true]);
  });
  it('ties fiber acceptance to the critical angle and retains partial Fresnel reflection outside it', () => {
    const { core, cladding, outside } = fiberIndices;
    for (const t of samples) {
      const s = fiberState(t);
      expect(outside * Math.sin(s.alpha)).toBeCloseTo(core * Math.sin(s.beta), 12);
      expect(outside * Math.sin(s.acceptance)).toBeCloseTo(
        Math.sqrt(core ** 2 - cladding ** 2),
        12
      );
      expect(s.guided).toBe(s.alpha <= s.acceptance);
      expect(s.reflectance).toBeGreaterThan(0);
      expect(s.reflectance).toBeLessThanOrEqual(1);
      if (!s.guided) {
        expect(core * Math.sin(s.incidence)).toBeCloseTo(
          cladding * Math.cos(s.transmittedAngle),
          12
        );
        expect(s.reflectance).toBeLessThan(1);
      }
      for (const segment of s.segments) {
        expect(Math.abs(segment.end[1])).toBeLessThanOrEqual(0.5 + 1e-10);
        expect(segment.end[0]).toBeLessThanOrEqual(8);
        if (segment.end[0] > segment.start[0]) {
          expect(
            Math.abs((segment.end[1] - segment.start[1]) / (segment.end[0] - segment.start[0]))
          ).toBeCloseTo(Math.tan(s.beta), 12);
        }
      }
    }
    expect(fiberState(0).guided).toBe(true);
    expect(fiberState(1).guided).toBe(false);
  });
  it('follows the original telescope mirror geometry at uniform arc length', () => {
    for (const route of telescopePaths) {
      const [, primary, diagonal] = route;
      expect(Math.hypot(primary[0] + 160, primary[1] - 240)).toBeCloseTo(800, 10);
      expect(diagonal[0] + diagonal[1]).toBeCloseTo(600, 10);
      const length = pathLength(route);
      expect(pathPoint(route, 0)).toEqual(route[0]);
      expect(pathPoint(route, length + 1)).toEqual(route.at(-1));
      const a = pathPoint(route, 40),
        b = pathPoint(route, 80);
      expect(Math.hypot(b[0] - a[0], b[1] - a[1])).toBeCloseTo(40, 10);
    }
  });
  it('scans a detector across fixed color foci and retains secondary spectrum in the doublet', () => {
    expect(chromaticFocus(410)).toBeLessThan(chromaticFocus(700));
    expect(chromaticFocus(410, true)).toBeCloseTo(chromaticFocus(700, true), 12);
    expect(chromaticFocus(555, true)).not.toBe(chromaticFocus(410, true));
    expect(chromaticState(0).detector).toBeLessThan(chromaticFocus(410));
    expect(chromaticState(1).detector).toBeGreaterThan(chromaticFocus(700));
  });
  it('uses the same spherical-surface ray trace while reducing geometric blur by stopping down', () => {
    const open = sphericalState(0),
      stopped = sphericalState(1);
    expect(open.marginal).toBeLessThan(open.paraxial);
    expect(stopped.blur).toBeLessThan(open.blur / 50);
    for (const t of samples) {
      const s = sphericalState(t),
        ray = sphericalTrace(s.aperture);
      expect(s.paraxial).toBe(open.paraxial);
      expect(Math.hypot(ray.H1[0] - 380, ray.H1[1] - 165)).toBeCloseTo(230, 9);
      expect(Math.hypot(ray.H2[0] - 10, ray.H2[1] - 165)).toBeCloseTo(230, 9);
      expect(Math.hypot(...ray.d2)).toBeCloseTo(1, 12);
    }
  });
});

describe('wave optics companions', () => {
  it('advances every Huygens radius at the same speed', () => {
    for (const t of samples) {
      const s = huygensState(t);
      expect(s.radius).toBeCloseTo(s.speed * s.time, 12);
    }
  });
  it('derives double-slit phase and brightness from exact geometric path differences', () => {
    expect(doubleSlit(0.5).intensity).toBe(1);
    for (const t of samples) {
      const s = doubleSlit(t),
        reflected = doubleSlit(1 - t);
      expect(s.lower - s.upper).toBe(s.difference);
      expect(s.phase).toBeCloseTo((2 * Math.PI * s.difference) / wavelength, 12);
      expect(s.intensity).toBeCloseTo((1 + Math.cos(s.phase)) / 2, 12);
      expect(s.intensity).toBeCloseTo(reflected.intensity, 9);
    }
  });
  it('changes one fringe-spacing parameter per stage', () => {
    const a = fringeState(0),
      b = fringeState(1 / 3),
      c = fringeState(2 / 3),
      d = fringeState(1);
    expect(a.d).toBe(b.d);
    expect(a.screen).toBe(b.screen);
    expect(b.lambda).toBe(c.lambda);
    expect(b.screen).toBe(c.screen);
    expect(c.lambda).toBe(d.lambda);
    expect(c.d).toBe(d.d);
    expect(c.spacing / b.spacing).toBeCloseTo(0.5, 12);
    expect(d.spacing / c.spacing).toBeCloseTo(2, 12);
  });
  it('widens the single-slit central band and places minima at a sin θ = mλ', () => {
    expect(slitState(1).firstMinimum).toBeGreaterThan(slitState(0).firstMinimum);
    for (const t of samples) {
      const s = slitState(t);
      expect(slitIntensity(0, s.width)).toBe(1);
      expect(slitIntensity(s.firstMinimum, s.width)).toBeCloseTo(0, 12);
      expect(s.width * s.firstMinimum).toBeCloseTo(wavelength, 15);
    }
  });
  it('keeps grating orders fixed while integer slit counts narrow principal peaks', () => {
    expect([0, 0.3, 0.6, 1].map(gratingCount)).toEqual([2, 4, 8, 16]);
    for (const n of [2, 4, 8, 16]) {
      for (const m of [-1, 0, 1]) expect(gratingIntensity(m, n)).toBe(1);
      expect(gratingIntensity(1 / n, n)).toBeCloseTo(0, 12);
    }
    expect(gratingIntensity(0.08, 16)).toBeLessThan(gratingIntensity(0.08, 2));
  });
  it('computes finite Airy profiles and the circular-aperture Rayleigh angle', () => {
    expect(besselJ1(1)).toBeCloseTo(0.4400505857449335, 12);
    expect(besselJ1(20)).toBeCloseTo(0.06683312417585, 12);
    expect(besselJ1(-20)).toBeCloseTo(-besselJ1(20), 12);
    expect(airyIntensity(0)).toBe(1);
    expect(airyIntensity(1)).toBeCloseTo(0, 12);
    expect(airyFirstZero / Math.PI).toBeCloseTo(1.22, 2);
    for (const t of samples) {
      const s = resolutionState(t);
      expect(airyIntensity(1 / s.aperture, s.aperture)).toBeCloseTo(0, 12);
      expect(s.rayleighRatio).toBeCloseTo(s.separation * s.aperture, 12);
      for (const angle of [-3, -1, 0, 1, 3])
        expect(airyIntensity(angle, s.aperture)).toBeGreaterThanOrEqual(0);
    }
    expect(resolutionState(1).separation).toBe(resolutionState(0.5).separation);
    expect(resolutionState(1).rayleighRatio).toBeGreaterThan(resolutionState(0.5).rayleighRatio);
  });
  it('includes reflection phase and unequal Fresnel amplitudes in the two-beam film model', () => {
    for (const t of samples) {
      const s = filmState(t);
      expect(s.propagationPhase).toBeCloseTo(
        (4 * Math.PI * s.index * s.thickness) / wavelength,
        12
      );
      expect(s.reflectance).toBeCloseTo(
        s.first ** 2 + s.second ** 2 + 2 * s.first * s.second * Math.cos(s.propagationPhase),
        12
      );
    }
    expect(filmState(0.25).reflectance).toBeCloseTo((0.2 + 0.192) ** 2, 12);
    expect(filmState(0).reflectance).toBeCloseTo((0.2 - 0.192) ** 2, 12);
  });
  it('distinguishes signed field projection from nonnegative Malus intensity', () => {
    for (const t of samples) {
      const s = malusState(t);
      expect(s.intensity).toBeCloseTo(s.field ** 2, 12);
    }
    expect(malusState(0.5).intensity).toBeCloseTo(0, 12);
    expect(malusState(1).field).toBe(-1);
    expect(malusState(1).intensity).toBe(1);
  });
  it('uses sequential projections through three filters with a maximum I0/8', () => {
    expect(crossedState(0).final).toBe(0);
    expect(crossedState(1).final).toBeCloseTo(0, 12);
    expect(crossedState(0.5).final).toBeCloseTo(1 / 8, 12);
    for (const t of samples) {
      const s = crossedState(t);
      expect(s.middle).toBeLessThanOrEqual(s.first);
      expect(s.final).toBeLessThanOrEqual(s.middle);
      expect(s.final).toBeCloseTo(0.5 * Math.cos(s.theta) ** 2 * Math.sin(s.theta) ** 2, 12);
    }
  });
});

it('generates sixteen registered, accessible SVGs with independent static alternatives', () => {
  const names = [...animationNames26to27, ...Object.keys(companions)];
  expect(names).toHaveLength(16);
  for (const name of names) {
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8');
    const $ = load(svg, { xmlMode: true });
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
    if (companions[name]) expect(svg, name).toBe(companions[name]());
    else expect(svg, name).toBe(animateFigure26to27(name, { ...ch26, ...ch27 }[name]()));
  }
});
