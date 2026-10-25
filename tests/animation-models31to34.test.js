import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  sample,
  decayTimes,
  decayState,
  alphaState,
  betaProducts,
  bindingState,
  forceState,
  barrierTransmission,
  tunnelingState,
  fusionState,
  coulombState,
  fissionProducts,
  chainState,
  cyclotronState,
  synchrotronState,
  annihilationState,
  hadrons,
  probeState,
  expansionState,
  parallaxState,
  elevatorState,
  deflectionState,
  superconductingState,
} from '../scripts/figures/animation-models31to34.js';
import { animateFigure31to34, animationNames31to34 } from '../scripts/figures/animations31to34.js';
import ch31 from '../scripts/figures/ch31.js';
import ch32 from '../scripts/figures/ch32.js';
import ch33 from '../scripts/figures/ch33.js';
import ch34 from '../scripts/figures/ch34.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

const sum = (items, key) => items.reduce((n, item) => n + item[key], 0);
describe('nuclear companions', () => {
  it('halves expected populations at each half-life, with a fixed stochastic sample', () => {
    expect(decayTimes).toHaveLength(80);
    expect(decayTimes.every(t => t > 0)).toBe(true);
    for (let i = 0; i <= 4; i++) expect(decayState(i / 4).expected).toBe(80 / 2 ** i);
    const counts = sample(t => decayState(t).remaining);
    expect(counts[0]).toBe(80);
    for (let i = 1; i < counts.length; i++) expect(counts[i]).toBeLessThanOrEqual(counts[i - 1]);
  });
  it('conserves A, Z and center of mass in the alpha recoil approximation', () => {
    for (const s of sample(alphaState)) {
      expect(s.daughter.A + s.alpha.A).toBe(s.parent.A);
      expect(s.daughter.Z + s.alpha.Z).toBe(s.parent.Z);
      expect(234 * ((-s.separation * 4) / 238) + (4 * s.separation * 234) / 238).toBeCloseTo(0, 10);
    }
  });
  it('accounts for the antineutrino in beta-decay lepton conservation', () => {
    expect(sum(betaProducts, 'charge')).toBe(0);
    expect(sum(betaProducts, 'baryon')).toBe(1);
    expect(sum(betaProducts, 'lepton')).toBe(0);
    expect(
      sum(
        betaProducts.filter(p => p.label !== 'ν̅e'),
        'lepton'
      )
    ).toBe(1);
  });
  it('recovers the deuteron mass defect and the energy released', () => {
    const s = bindingState(1);
    expect(s.binding).toBeCloseTo(2.224566, 6);
    expect(s.deuteron + s.binding).toBeCloseTo(s.proton + s.neutron, 10);
  });
  it('compares ranges with independently normalized forces', () => {
    expect(forceState(0).nuclear).toBe(1);
    expect(forceState(0).coulomb).toBe(1);
    expect(forceState(1).nuclear).toBeLessThan(forceState(1).coulomb / 100);
  });
  it('has unit zero-width transmission and matches an independent transfer-matrix result', () => {
    expect(barrierTransmission(0)).toBe(1);
    for (const s of sample(tunnelingState)) {
      // Match psi and its derivative using a unit transmitted plane wave at the far edge.
      const k = Math.sqrt(s.energy),
        kappa = Math.sqrt(s.height - s.energy);
      const re = Math.cosh(kappa * s.width),
        im = ((k * k - kappa * kappa) * Math.sinh(kappa * s.width)) / (2 * k * kappa);
      const independent = 1 / (re ** 2 + im ** 2);
      expect(s.transmission).toBeCloseTo(independent, 12);
      expect(s.transmission + s.reflection).toBeCloseTo(1, 12);
    }
    expect(tunnelingState(1).transmission).toBeLessThan(tunnelingState(0).transmission);
  });
  it('balances fusion counts, released energy and approximate opposite momenta', () => {
    const s = fusionState(1);
    for (const key of ['A', 'Z']) expect(sum(s.inputs, key)).toBe(sum(s.products, key));
    expect(s.alphaK + s.neutronK).toBeCloseTo(s.q, 12);
    expect(4 * s.alphaK).toBeCloseTo(s.neutronK, 12);
  });
  it('reaches a classical Coulomb turning point without negative kinetic energy', () => {
    for (const s of sample(coulombState)) {
      expect(s.kinetic + s.potential).toBeCloseTo(1, 12);
      expect(s.kinetic).toBeGreaterThanOrEqual(0);
    }
    expect(coulombState(0.5).kinetic).toBe(0);
    expect(coulombState(0)).toEqual(coulombState(1));
  });
  it('conserves all nucleons and charge in the selected fission channel', () => {
    expect(sum(fissionProducts, 'A')).toBe(236);
    expect(sum(fissionProducts, 'Z')).toBe(92);
  });
  it('grows, preserves or reduces expected populations at integer generations', () => {
    expect(chainState(1, 0.7).population).toBeLessThan(1);
    expect(chainState(1, 1).population).toBe(1);
    expect(chainState(1, 1.5).population).toBeCloseTo(11.390625, 12);
    for (const s of sample(t => chainState(t, 1.5)))
      expect(Number.isInteger(s.generation)).toBe(true);
  });
});
describe('particle companions', () => {
  it('accelerates the cyclotron only at the gap, with constant frequency and continuous position', () => {
    for (let n = 0; n < 8; n++) {
      const a = cyclotronState((n + 0.2) / 8),
        b = cyclotronState((n + 0.7) / 8);
      expect(a.kinetic).toBe(b.kinetic);
      expect(a.speed ** 2 / 2).toBeCloseTo(a.kinetic, 12);
      expect(a.speed / a.radius).toBeCloseTo(2 * Math.PI * a.frequency, 12);
      if (n > 0) {
        const left = cyclotronState(n / 8 - 1e-10),
          right = cyclotronState(n / 8);
        expect(left.x).toBeCloseTo(right.x, 7);
        expect(left.y).toBeCloseTo(right.y, 7);
        expect(right.kinetic - left.kinetic).toBe(1);
      }
    }
  });
  it('keeps a synchrotron radius fixed while field tracks relativistic momentum', () => {
    for (const s of sample(synchrotronState)) {
      expect(s.gamma ** 2 - s.momentum ** 2).toBeCloseTo(1, 12);
      expect(s.momentum / s.field).toBe(s.radius);
      expect(s.beta).toBeLessThan(1);
    }
    // The integrated phase gives angular speed proportional to v at fixed R.
    for (const t of [0.1, 0.5, 0.9]) {
      const h = 1e-5,
        derivative = (synchrotronState(t + h).phase - synchrotronState(t - h).phase) / (2 * h);
      const reference =
        (synchrotronState(0.5 + h).phase - synchrotronState(0.5 - h).phase) / (2 * h);
      expect(derivative / reference).toBeCloseTo(
        synchrotronState(t).beta / synchrotronState(0.5).beta,
        8
      );
    }
  });
  it('includes incoming kinetic energy in annihilation photons', () => {
    const s = annihilationState(1);
    expect(2 * s.photon).toBe(2 * (s.rest + s.kinetic));
    expect(s.photon).toBeCloseTo(610.99895, 5);
    expect((s.rest + s.kinetic) ** 2 - s.momentum ** 2).toBeCloseTo(s.rest ** 2, 7);
  });
  it('sums fractional valence charges, including antiquarks', () => {
    for (const h of hadrons) expect(h.thirds.reduce((a, b) => a + b, 0) / 3).toBe(h.charge);
  });
  it('uses relativistic electron momentum for the probe wavelength', () => {
    for (const s of sample(probeState)) {
      expect(s.wavelength * s.momentum).toBeCloseTo(1239.841984, 8);
      expect(s.momentum ** 2).toBeCloseTo(s.kinetic * (s.kinetic + 2 * 0.51099895), 4);
    }
    expect(probeState(0).wavelength).toBeGreaterThan(10);
    expect(probeState(1).wavelength).toBeLessThan(0.02);
  });
});
describe('cosmology and frontier companions', () => {
  it('preserves comoving separations and cosmological wavelength ratios', () => {
    for (const s of sample(expansionState)) {
      s.distances.forEach((d, i) => expect(d / s.scale).toBeCloseTo(i + 1, 12));
      expect(1 + s.redshift).toBe(s.scale);
    }
  });
  it('reverses the parallax offset six months later and uses a half-angle', () => {
    expect(parallaxState(0).apparent).toBeCloseTo(-0.5, 10);
    expect(parallaxState(0.5).apparent).toBeCloseTo(0.5, 10);
    expect(parallaxState(1).apparent).toBeCloseTo(parallaxState(0).apparent, 12);
    expect(parallaxState(0.5).apparent - parallaxState(0).apparent).toBeCloseTo(
      2 * parallaxState(0).parallax,
      12
    );
  });
  it('shows the same photon event in inertial and accelerated room coordinates', () => {
    for (const s of sample(elevatorState)) {
      expect(s.x).toBe(s.time);
      expect(s.lift).toBeCloseTo((s.acceleration * s.time ** 2) / 2, 12);
    }
  });
  it('recovers the solar-limb deflection and its inverse impact dependence', () => {
    expect(deflectionState(0).angle).toBeCloseTo(1.751, 2);
    for (const s of sample(deflectionState))
      expect(s.angle * s.impact).toBeCloseTo(deflectionState(0).angle, 12);
  });
  it('switches the idealized resistance at the critical temperature', () => {
    expect(superconductingState(0).resistance).toBe(1);
    expect(superconductingState(1).resistance).toBe(0);
    for (const s of sample(superconductingState))
      expect(s.resistance).toBe(s.temperature < s.critical ? 0 : 1);
  });
});
it('generates twenty registered accessible animations with independent static alternatives', () => {
  const builders = { ...ch31, ...ch32, ...ch33, ...ch34 };
  expect(animationNames31to34).toHaveLength(20);
  for (const name of animationNames31to34) {
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
    expect(svg, name).toBe(animateFigure31to34(name, builders[name]()));
    expect(svg, name).toContain(builders[name]().match(/<title[^>]*>.*?<\/title>/s)[0]);
  }
});
