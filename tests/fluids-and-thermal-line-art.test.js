import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import figures, {
  microstates,
  spectralExitance,
  wallProfile,
} from '../scripts/figures/fluids-and-thermal-line-art.js';

describe('computed thermal figures', () => {
  it.each([3000, 4000, 6000])('puts the %i K spectrum peak at the Wien wavelength', temperature => {
    const peak = 2.897771955e6 / temperature;
    expect(spectralExitance(peak, temperature)).toBeGreaterThan(
      spectralExitance(peak * 0.98, temperature)
    );
    expect(spectralExitance(peak, temperature)).toBeGreaterThan(
      spectralExitance(peak * 1.02, temperature)
    );
  });

  it('integrates the spectrum to Stefan–Boltzmann exitance with the stated wavelength units', () => {
    // Integrate independently on a logarithmic wavelength mesh. The generator
    // returns MW/m²/μm, so integrate in μm and convert MW to W for sigma T^4.
    for (const temperature of [3000, 4000, 6000]) {
      const n = 20000,
        lo = 0.01,
        hi = 200;
      let integral = 0;
      for (let i = 0; i < n; i += 1) {
        const a = lo * (hi / lo) ** (i / n);
        const b = lo * (hi / lo) ** ((i + 1) / n);
        integral +=
          ((b - a) *
            (spectralExitance(a * 1000, temperature) + spectralExitance(b * 1000, temperature))) /
          2;
      }
      expect((integral * 1e6) / (5.670374419e-8 * temperature ** 4)).toBeCloseTo(1, 5);
    }
  });

  it('conserves steady heat flux across each wall layer and reverses with the temperature difference', () => {
    const wall = wallProfile();
    expect(wall.points[0]).toEqual([0, 20]);
    expect(wall.points.at(-1)[0]).toBeCloseTo(0.2025, 12);
    expect(wall.points.at(-1)[1]).toBeCloseTo(0, 12);
    wall.layers.forEach((layer, i) => {
      const gradient =
        (wall.points[i][1] - wall.points[i + 1][1]) / (wall.points[i + 1][0] - wall.points[i][0]);
      expect(layer.k * gradient).toBeCloseTo(wall.flux, 10);
    });
    const drops = wall.points.slice(1).map((p, i) => wall.points[i][1] - p[1]);
    expect(drops[1] / 20).toBeGreaterThan(0.9);
    expect(wallProfile(0, 20).flux).toBeCloseTo(-wall.flux, 12);
    expect(wallProfile(20, 20).flux).toBe(0);
  });
});

it('enumerates 32 distinct fair-coin outcomes with the binomial multiplicities', () => {
  const groups = microstates();
  const all = groups.flat();
  expect(groups.map(g => g.length)).toEqual([1, 5, 10, 10, 5, 1]);
  expect(new Set(all).size).toBe(32);
  groups.forEach((group, heads) =>
    group.forEach(sequence => expect([...sequence].filter(c => c === 'H')).toHaveLength(heads))
  );
  // Each labeled coin is fair, and each ordered pair has four equiprobable outcomes.
  for (let i = 0; i < 5; i += 1) {
    expect(all.filter(sequence => sequence[i] === 'H')).toHaveLength(16);
    for (let j = i + 1; j < 5; j += 1) {
      for (const pair of ['HH', 'HT', 'TH', 'TT']) {
        expect(all.filter(sequence => sequence[i] + sequence[j] === pair)).toHaveLength(8);
      }
    }
  }
});

it('keeps every new line drawing accessible and independent of raster or external content', () => {
  expect(Object.keys(figures)).toHaveLength(12);
  for (const build of Object.values(figures)) {
    const $ = load(build(), { xmlMode: true });
    expect($('svg').attr('role')).toBe('img');
    expect($('title').text().length).toBeGreaterThan(10);
    expect($('desc').text().length).toBeGreaterThan(50);
    expect($('image, script, foreignObject')).toHaveLength(0);
  }
});
