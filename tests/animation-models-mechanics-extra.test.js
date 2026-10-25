import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  g,
  sample,
  inclineState,
  skierState,
  turnState,
  loopGeometry,
  loopMetresPerUnit,
  loopState,
  leverState,
  reelState,
  impactState,
} from '../scripts/figures/animation-models-mechanics-extra.js';
import {
  animateMechanicsExtra,
  animationNamesMechanicsExtra,
} from '../scripts/figures/animations-mechanics-extra.js';
import ch04to07 from '../scripts/figures/ch04to07.js';
import ch09 from '../scripts/figures/ch09.js';
import ch10 from '../scripts/figures/ch10.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

describe('seven mechanics simulations', () => {
  it('keeps gravity fixed while the incline components form a closed vector triangle', () => {
    for (const s of sample(inclineState)) {
      expect(s.along[0] + s.into[0]).toBeCloseTo(0, 12);
      expect(s.along[1] + s.into[1]).toBeCloseTo(s.weight, 12);
      expect(Math.hypot(s.parallel, s.perpendicular)).toBeCloseTo(100, 12);
    }
    expect(inclineState(1).parallel).toBeGreaterThan(inclineState(0).parallel);
    expect(inclineState(1).perpendicular).toBeLessThan(inclineState(0).perpendicular);
  });
  it('uses the book skier forces and balances kinetic-energy change against net work', () => {
    const start = skierState(0);
    expect(start.normal).toBeCloseTo(550.6726114, 7);
    expect(start.mu).toBeCloseTo(0.0817182461, 9);
    expect(start.acceleration).toBeCloseTo(3.4158525134, 9);
    for (const s of sample(skierState)) {
      expect(s.normal).toBeCloseTo(s.mass * g * Math.cos(s.angle), 12);
      expect((s.mass * (s.speed ** 2 - 1)) / 2).toBeCloseTo(
        (s.mass * g * Math.sin(s.angle) - s.friction) * s.distance,
        9
      );
    }
    for (const t of [0.1, 0.5, 0.9]) {
      const a = skierState(t - 1e-5),
        b = skierState(t + 1e-5);
      expect((b.distance - a.distance) / (b.time - a.time)).toBeCloseTo(skierState(t).speed, 8);
    }
  });
  it('runs both turn radii at the same linear speed and uses half the force at twice the radius', () => {
    for (const t of [0.1, 0.5, 0.9]) {
      const inner = turnState(t, 30),
        outer = turnState(t, 60);
      expect(inner.time).toBe(outer.time);
      expect(inner.angle).toBe(2 * outer.angle);
      expect(inner.force).toBe(2 * outer.force);
      for (const r of [30, 60]) {
        const s = turnState(t, r),
          a = turnState(t - 1e-6, r),
          b = turnState(t + 1e-6, r);
        expect(Math.hypot(s.x, s.y)).toBeCloseTo(r, 10);
        expect(Math.hypot(b.x - a.x, b.y - a.y) / (b.time - a.time)).toBeCloseTo(12, 8);
      }
    }
  });
  it('uses the original clothoid heading, a physical clock and positive track normal around the whole loop', () => {
    const states = sample(loopState, 1000);
    expect(states[0].position).toEqual(loopGeometry.points[0]);
    expect(states.at(-1).position[0]).toBeCloseTo(loopGeometry.points.at(-1)[0], 10);
    expect(states[0].normalPerMass).toBeCloseTo(g, 10);
    expect(states.at(-1).normalPerMass).toBeCloseTo(g, 10);
    for (const s of states) {
      expect(s.kineticPerMass + s.potentialPerMass).toBeCloseTo(22 ** 2 / 2, 10);
      expect(s.normalPerMass).toBeGreaterThan(0);
      expect(s.normalPerMass + g * Math.cos(s.heading)).toBeCloseTo(s.speed ** 2 * s.curvature, 10);
    }
    for (const t of [0.1, 0.25, 0.6, 0.9]) {
      const a = loopState(t - 1e-5),
        b = loopState(t + 1e-5),
        s = loopState(t);
      const measured =
        (Math.hypot(b.position[0] - a.position[0], b.position[1] - a.position[1]) *
          loopMetresPerUnit) /
        (b.time - a.time);
      expect(measured / s.speed).toBeCloseTo(1, 3);
    }
    for (const u of [0.2, 0.4, 0.6, 0.8]) {
      const h = 1e-5;
      const measured =
        Math.abs(loopGeometry.heading(u + h) - loopGeometry.heading(u - h)) /
        (2 * h * loopGeometry.length * loopMetresPerUnit);
      expect(measured).toBeCloseTo(
        (8 * Math.PI * Math.min(u, 1 - u)) / (loopGeometry.length * loopMetresPerUnit),
        10
      );
    }
  });
  it('trades endpoint travel for force while balancing lever torques, force and work', () => {
    for (const s of sample(leverState)) {
      expect(s.inputForce * s.inputArm * Math.cos(s.angle)).toBeCloseTo(
        s.outputForce * s.outputArm * Math.cos(s.angle),
        12
      );
      expect(s.inputWork).toBeCloseTo(s.outputWork, 12);
      expect(s.inputTravel).toBeCloseTo(6 * s.outputTravel, 12);
      expect(s.reaction).toBe(s.inputForce + s.outputForce);
    }
  });
  it('links no-slip reel kinematics, applied torque and rotational work', () => {
    for (const s of sample(reelState)) {
      expect(s.torque).toBeCloseTo(s.inertia * s.alpha, 12);
      expect(s.speed).toBeCloseTo(s.radius * s.omega, 12);
      expect(s.distance).toBeCloseTo(s.radius * s.angle, 12);
      expect(s.acceleration).toBeCloseTo(s.radius * s.alpha, 12);
      expect(s.work).toBeCloseTo(s.kinetic, 12);
    }
    for (const t of [0.1, 0.5, 0.9]) {
      const a = reelState(t - 1e-5),
        b = reelState(t + 1e-5);
      expect((b.angle - a.angle) / (b.time - a.time)).toBeCloseTo(reelState(t).omega, 8);
    }
  });
  it('conserves angular momentum about the pivot and records the inelastic kinetic-energy loss', () => {
    const s = impactState(1);
    expect(s.inertia).toBeCloseTo(1.032, 12);
    expect(s.angularMomentum).toBeCloseTo(1.8, 12);
    expect(s.inertia * s.omega).toBeCloseTo(s.angularMomentum, 12);
    expect(s.omega).toBeCloseTo(1.7441860465, 9);
    expect(s.initialKinetic).toBe(22.5);
    expect(s.finalKinetic).toBeCloseTo(1.56976744186, 10);
    for (const state of sample(impactState))
      expect(state.kinetic + state.dissipated).toBeCloseTo(22.5, 12);
    const justBefore = impactState(0.35 - 1e-9),
      justAfter = impactState(0.35);
    expect(justBefore.disk[0]).toBeCloseTo(justAfter.disk[0], 7);
    expect(justBefore.disk[1]).toBe(justAfter.disk[1]);
    expect(justBefore.linearMomentum[0]).not.toBeCloseTo(justAfter.linearMomentum[0], 3);
  });
  it('keeps impact trajectories consistent with SI velocities despite differing playback slowdowns', () => {
    for (const t of [0.1, 0.2, 0.5, 0.8]) {
      const a = impactState(t - 1e-6),
        b = impactState(t + 1e-6),
        s = impactState(t);
      for (let i = 0; i < 2; i++)
        expect((b.disk[i] - a.disk[i]) / (b.time - a.time)).toBeCloseTo(s.diskVelocity[i], 7);
    }
  });
});

it('generates seven registered accessible SVGs with complete static alternatives and unchanged original art', () => {
  const builders = { ...ch04to07, ...ch09, ...ch10 };
  expect(animationNamesMechanicsExtra).toHaveLength(7);
  for (const name of animationNamesMechanicsExtra) {
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
    expect(svg, name).toBe(animateMechanicsExtra(name, builders[name]()));
    const original = load(builders[name](), { xmlMode: true });
    original('svg > g[id]').each((i, el) =>
      expect($(`svg > g[id="${original(el).attr('id')}"]`).toString(), name).toBe(
        original(el).toString()
      )
    );
  }
});
