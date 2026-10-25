import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  sample,
  heatingBreaks,
  heatingTemperatures,
  heatingAtHeat,
  heatingState,
  tank,
  drainDuration,
  drainAtTime,
  drainState,
  jetPoint,
  dampingValues,
  response,
  resonancePeakRatio,
  resonanceState,
} from '../scripts/figures/animation-models-thermal-waves.js';
import {
  animateThermalWaves,
  animationNamesThermalWaves,
} from '../scripts/figures/animations-thermal-waves.js';
import lineArt from '../scripts/figures/fluids-and-thermal-line-art.js';
import ch14 from '../scripts/figures/ch14.js';
import ch16 from '../scripts/figures/ch16.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

it('uses the book heating breakpoints and keeps temperature continuous at both phase changes', () => {
  heatingBreaks.forEach((q, i) =>
    expect(heatingAtHeat(q).temperature).toBeCloseTo(heatingTemperatures[i], 10)
  );
  for (const q of heatingBreaks.slice(1, -1)) {
    expect(heatingAtHeat(q - 1e-8).temperature).toBeCloseTo(heatingAtHeat(q + 1e-8).temperature, 6);
  }
  expect(heatingState(0).temperature).toBe(-20);
  expect(heatingState(1).temperature).toBeCloseTo(120, 10);
});
it('accounts for sensible and latent heat without treating fractions as volumes', () => {
  for (const s of sample(heatingState, 300)) {
    expect(s.ice + s.liquid + s.vapor).toBeCloseTo(1, 12);
    for (const fraction of [s.ice, s.liquid, s.vapor]) {
      expect(fraction).toBeGreaterThanOrEqual(-1e-12);
      expect(fraction).toBeLessThanOrEqual(1);
    }
    const energy =
      s.phase === 0
        ? 0.5 * (s.temperature + 20)
        : s.phase === 1
          ? 10 + 79.8 * s.liquid
          : s.phase === 2
            ? 89.8 + s.temperature
            : s.phase === 3
              ? 189.8 + 539 * s.vapor
              : 728.8 + 0.482 * (s.temperature - 100);
    expect(s.heat).toBeCloseTo(energy, 10);
    if (s.phase === 1) expect(s.temperature).toBe(0);
    if (s.phase === 3) expect(s.temperature).toBe(100);
  }
});
it('obeys Torricelli and conserves reservoir volume over the drain clock', () => {
  expect(drainAtTime(0).head).toBe(2);
  expect(drainAtTime(drainDuration).head).toBeCloseTo(0, 12);
  expect(drainAtTime(drainDuration + 1).active).toBe(false);
  for (const s of sample(drainState)) {
    expect(s.speed ** 2).toBeCloseTo(2 * tank.g * s.head, 11);
    expect(s.flow).toBeCloseTo(tank.outletArea * s.speed, 12);
    expect(tank.area * s.head + s.drained).toBeCloseTo(tank.area * tank.initialHead, 12);
  }
  for (const t of [0.1, 0.5, 0.9]) {
    const s = drainState(t),
      h = 1e-4,
      a = drainAtTime(s.time - h),
      b = drainAtTime(s.time + h);
    expect((-tank.area * (b.head - a.head)) / (2 * h)).toBeCloseTo(s.flow, 10);
  }
  let volume = 0;
  const dt = drainDuration / 10000;
  for (let i = 0; i < 10000; i++) volume += drainAtTime((i + 0.5) * dt).flow * dt;
  expect(volume).toBeCloseTo(1, 10);
});
it('shortens a ballistic jet as the level falls and leaves water below the outlet', () => {
  for (const s of sample(drainState)) {
    const end = jetPoint(s, 1),
      mid = jetPoint(s, 0.5);
    expect(end[1]).toBeCloseTo(0, 12);
    expect(end[0]).toBeCloseTo(s.range, 12);
    expect(end[0]).toBeCloseTo(2 * Math.sqrt(s.head * tank.outletHeight), 10);
    expect(mid[1]).toBeCloseTo(tank.outletHeight - (tank.g * (s.flightTime / 2) ** 2) / 2, 12);
  }
  expect(drainState(1).drained).toBeCloseTo(1, 12);
  expect(tank.area * tank.outletHeight).toBe(0.25);
});
it('satisfies the forced-oscillator differential equation within each settled example', () => {
  for (const t of [0.07, 0.15, 0.27, 0.35, 0.47, 0.55, 0.67, 0.75, 0.87, 0.95]) {
    const s = resonanceState(t);
    for (const r of s.responses)
      expect(r.acceleration + r.damping * r.velocity + r.position).toBeCloseTo(
        Math.cos(s.phase),
        11
      );
    const a = resonanceState(t - 1e-6),
      b = resonanceState(t + 1e-6);
    for (let i = 0; i < 3; i++)
      expect((b.responses[i].position - a.responses[i].position) / (b.time - a.time)).toBeCloseTo(
        s.responses[i].velocity,
        7
      );
  }
});
it('places the amplitude peak just below natural frequency and includes the response phase lag', () => {
  for (const b of dampingValues) {
    const r = resonancePeakRatio(b);
    expect(r).toBeLessThan(1);
    expect(response(r, b).amplitude).toBeGreaterThan(response(r - 0.01, b).amplitude);
    expect(response(r, b).amplitude).toBeGreaterThan(response(r + 0.01, b).amplitude);
    expect(response(1, b).amplitude).toBeCloseTo(1 / b, 12);
    expect(response(1, b).lag).toBeCloseTo(Math.PI / 2, 12);
    expect(response(0, b).amplitude).toBe(1);
  }
  expect(response(1, 0.1).amplitude).toBeGreaterThan(response(1, 0.4).amplitude);
});
it('generates three accessible animations with independent static alternatives and the original artwork', () => {
  const builders = { ...lineArt, ...ch14, ...ch16 };
  expect(animationNamesThermalWaves).toHaveLength(3);
  for (const name of animationNamesThermalWaves) {
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
    expect($('.anim-still text[y="371"]'), `note overlaps footer: ${name}`).toHaveLength(0);
    const ids = $('[id]')
      .toArray()
      .map(el => $(el).attr('id'));
    expect(new Set(ids).size, name).toBe(ids.length);
    for (const el of $('animate').toArray())
      expect($(el).attr('values').split(';'), name).toHaveLength(61);
    expect(svg, name).toBe(animateThermalWaves(name, builders[name]()));
    const source = load(builders[name](), { xmlMode: true });
    // Original element markup precedes the appended inset unchanged.
    const originalChildren = source('svg').children().toArray().slice(2);
    const enhancedChildren = $('svg')
      .children()
      .toArray()
      .slice(2, 2 + originalChildren.length);
    expect(
      enhancedChildren.map(el => $(el).toString()),
      name
    ).toEqual(originalChildren.map(el => source(el).toString()));
  }
});
