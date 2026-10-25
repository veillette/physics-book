import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  trainMotion,
  jetCarMotion,
  topSpeedMotion,
  vectorSum,
  tightropeTension,
  twoWireTensions,
  exchangeMotion,
  dragFall,
  startingForce,
  tendonStress,
  ellipsePoint,
  hillHeight,
  coastingEnergy,
  coastingDistance,
  rockOnSpring,
  rockInDirt,
  elasticCollision,
  darkRoomCollision,
  bicepsForce,
  poleHandForces,
  sandwichChainTension,
  twinSkaters,
  merryGoRound,
  hullDraft,
  arterialPressure,
  channelPosition,
  subcriticalIsotherm,
  oxygenVolume,
  waterDensity,
  tireState,
} from '../scripts/figures/animation-models.js';
import companions, { animationNames01to13extra } from '../scripts/figures/animations01to13extra.js';

const derivative = (fn, t, h = 1e-5) => (fn(t + h) - fn(t - h)) / (2 * h);

describe('kinematics companions match the book’s examples', () => {
  it('runs the subway train through its three phases continuously', () => {
    for (const t of [5, 30, 44]) {
      expect(derivative(q => trainMotion(q).x, t)).toBeCloseTo(trainMotion(t).v, 6);
      expect(derivative(q => trainMotion(q).v, t)).toBeCloseTo(trainMotion(t).a, 6);
    }
    expect(trainMotion(48).v).toBeCloseTo(0, 12);
    expect(trainMotion(48).x).toBeCloseTo(283.3, 1);
  });

  it('makes the area under the jet car’s v–t graph equal its displacement', () => {
    const t = 25,
      n = 2000;
    let area = 0;
    for (let i = 0; i < n; i += 1) area += (jetCarMotion(((i + 0.5) * t) / n).v * t) / n;
    expect(area).toBeCloseTo(jetCarMotion(t).x - 200, 6);
  });

  it('gives the top-speed run a(0) = 5 m/s² that decays toward v = 250 m/s', () => {
    expect(topSpeedMotion(0).a).toBeCloseTo(5, 12);
    expect(topSpeedMotion(0).v).toBe(165);
    for (const t of [3, 25, 60]) {
      expect(derivative(q => topSpeedMotion(q).x, t)).toBeCloseTo(topSpeedMotion(t).v, 5);
      expect(derivative(q => topSpeedMotion(q).v, t)).toBeCloseTo(topSpeedMotion(t).a, 6);
    }
  });

  it('reproduces the vector sum and difference of Examples 3.3', () => {
    const sum = vectorSum([
      [53, 20],
      [34, 63],
    ]);
    expect(sum.magnitude).toBeCloseTo(81.2, 1);
    expect(sum.degrees).toBeCloseTo(36.6, 1);
    const difference = vectorSum([
      [53, 20],
      [34, 243],
    ]);
    expect(difference.magnitude).toBeCloseTo(36.5, 1);
    expect(difference.degrees).toBeCloseTo(-19.5, 1);
  });
});

describe('force and energy companions balance', () => {
  it('needs 3.94 kN for a 70.0-kg tightrope walker at 5.0°', () => {
    expect(tightropeTension(70 * 9.8, 5)).toBeCloseTo(3934, -1);
    expect(tightropeTension(1, 30)).toBeCloseTo(1, 12);
  });

  it('balances the traffic light at 108 N and 132 N', () => {
    const { t1, t2 } = twoWireTensions(147, 30, 45);
    expect(t1).toBeCloseTo(108, 0);
    expect(t2).toBeCloseTo(132, 0);
    expect(t1 * Math.cos(Math.PI / 6)).toBeCloseTo(t2 * Math.cos(Math.PI / 4), 10);
    expect(t1 * Math.sin(Math.PI / 6) + t2 * Math.sin(Math.PI / 4)).toBeCloseTo(147, 10);
  });

  it('keeps the skaters’ total momentum zero through the throw and catch', () => {
    for (const t of [0.2, 1, 2.5]) {
      expect(exchangeMotion(t, { m: 5, M: 60, u: 6 }).momentum).toBeCloseTo(0, 10);
    }
  });

  it('reaches 98 m/s with drag equal to weight in the terminal limit', () => {
    const s = dragFall(60);
    expect(s.vt).toBeCloseTo(98, 0);
    expect(s.drag / s.weight).toBeCloseTo(1, 4);
    for (const t of [1, 8, 20]) {
      const state = dragFall(t);
      expect(75 * derivative(q => dragFall(q).v, t)).toBeCloseTo(state.weight - state.drag, 4);
      expect(derivative(q => dragFall(q).y, t)).toBeCloseTo(state.v, 5);
    }
  });

  it('matches the exercise’s 51.0 N push and 46.5 N pull at 25°', () => {
    expect(startingForce(25, true).force).toBeCloseTo(51.0, 1);
    expect(startingForce(25, false).force).toBeCloseTo(46.5, 1);
    for (const [deg, push] of [
      [10, true],
      [35, false],
    ]) {
      const s = startingForce(deg, push),
        r = (deg * Math.PI) / 180;
      expect(s.force * Math.cos(r)).toBeCloseTo(0.1 * s.normal, 10);
    }
  });

  it('draws a continuous tendon curve with a rising slope in the toe region', () => {
    for (const x of [0.25, 0.65])
      expect(tendonStress(x - 1e-9)).toBeCloseTo(tendonStress(x + 1e-9), 6);
    expect(derivative(tendonStress, 0.1)).toBeLessThan(derivative(tendonStress, 0.2));
  });

  it('keeps the string length constant around the ellipse', () => {
    for (const a of [0, 1, 2.5, 4])
      expect(ellipsePoint(a).d1 + ellipsePoint(a).d2).toBeCloseTo(420, 9);
  });

  it('conserves total energy for the coasting car and stops it at the pump', () => {
    for (const s of [10, 90, 150]) {
      const e = coastingEnergy(s);
      expect(e.kinetic + e.potential + e.thermal).toBeCloseTo(e.total, 6);
      expect(e.kinetic).toBeGreaterThan(0);
    }
    expect(coastingEnergy(200).kinetic).toBeCloseTo(0, 6);
    expect(hillHeight(200)).toBe(0);
    expect(coastingDistance(1)).toBeCloseTo(200, 6);
  });

  it('returns the rock to its height on the spring and stops it in the soil', () => {
    const total = 9.8 * 1;
    for (const t of [0.2, 0.5, 0.55, 0.8]) {
      const s = rockOnSpring(t, { k: 400 });
      expect(s.gravitational + s.kinetic + s.elastic).toBeCloseTo(total, 8);
    }
    const period = rockOnSpring(0, { k: 400 }).period;
    expect(rockOnSpring(period - 1e-9, { k: 400 }).y).toBeCloseTo(1, 6);
    expect(rockInDirt(1).v).toBe(0);
    expect(rockInDirt(1).y).toBeCloseTo(-0.05, 12);
  });
});

describe('momentum, torque, and fluid companions', () => {
  it('conserves momentum and kinetic energy in the elastic rebound', () => {
    const { v1, v2 } = elasticCollision(1, 5, 1);
    expect(v1 + 5 * v2).toBeCloseTo(1, 12);
    expect(v1 * v1 + 5 * v2 * v2).toBeCloseTo(1, 12);
  });

  it('solves the dark-room collision as in the example', () => {
    const c = darkRoomCollision();
    expect(c.v2f).toBeCloseTo(0.886, 3);
    expect((c.th2 * 180) / Math.PI).toBeCloseTo(-48.5, 1);
    expect(c.m1 * c.v1f * Math.cos(c.th1) + c.m2 * c.v2f * Math.cos(c.th2)).toBeCloseTo(0.5, 10);
    expect(c.m1 * c.v1f * Math.sin(c.th1) + c.m2 * c.v2f * Math.sin(c.th2)).toBeCloseTo(0, 10);
  });

  it('gives the example’s statics answers', () => {
    expect(bicepsForce(0.38)).toBeCloseTo(470, 0);
    expect(poleHandForces(0.6).right).toBeCloseTo(32.7, 1);
    expect(poleHandForces(0.6).left).toBeCloseTo(16.3, 1);
    expect(poleHandForces(-0.5).right).toBeLessThan(0);
    expect(sandwichChainTension(Math.atan(0.55 / 1.3))).toBeCloseTo(21.6, 1);
    expect(merryGoRound(1.5, 90).alpha).toBeCloseTo(6.67, 2);
    expect(merryGoRound(0.75, 90).torque).toBeCloseTo(merryGoRound(1.5, 30).torque, 10);
  });

  it('keeps the twin skaters’ position and speed continuous when they link hands', () => {
    const before = twinSkaters(-1e-7),
      after = twinSkaters(1e-7);
    expect(before.a[0]).toBeCloseTo(after.a[0], 5);
    expect(before.a[1]).toBeCloseTo(after.a[1], 5);
    expect(derivative(q => twinSkaters(q).a[0], -0.5)).toBeCloseTo(1, 8);
    expect(
      Math.hypot(
        derivative(q => twinSkaters(q).a[0], 0.7),
        derivative(q => twinSkaters(q).a[1], 0.7)
      )
    ).toBeCloseTo(1, 6);
  });

  it('floats the hull at a draft set by Archimedes’ principle', () => {
    expect(hullDraft(6.0e6, 2000)).toBe(3);
    expect(hullDraft(16.0e6, 2000)).toBe(8);
  });

  it('pulses between 80 and 120 mm Hg', () => {
    const values = Array.from({ length: 2000 }, (_, i) => arterialPressure(i / 500));
    expect(Math.min(...values)).toBeCloseTo(80, 0);
    expect(Math.max(...values)).toBeCloseTo(120, 0);
  });

  it('moves gap tracers with speed inversely proportional to the channel width', () => {
    const width = x => (x < 50 ? 2 : 1);
    const x = q => channelPosition(q, width, 0, 100);
    const wide = derivative(x, 0.1, 1e-4),
      narrow = derivative(x, 0.8, 1e-4);
    expect(narrow / wide).toBeCloseTo(2, 1);
  });
});

describe('thermal companions', () => {
  it('condenses at constant pressure inside the coexistence region', () => {
    expect(subcriticalIsotherm(4).pressure).toBe(1);
    expect(subcriticalIsotherm(2.5).pressure).toBe(1);
    expect(subcriticalIsotherm(2.5).liquidFraction).toBeCloseTo(0.5, 12);
    expect(subcriticalIsotherm(8).pressure).toBeCloseTo(0.5, 12);
  });

  it('extrapolates the oxygen volume to zero at −273.15 °C', () => {
    expect(oxygenVolume(0)).toBe(1);
    expect(oxygenVolume(-182)).toBeCloseTo(91.15 / 273.15, 12);
    expect(oxygenVolume(-200)).toBeLessThan(0.002);
  });

  it('puts the density maximum of water at 4 °C', () => {
    expect(waterDensity(4)).toBeGreaterThan(waterDensity(3.9));
    expect(waterDensity(4)).toBeGreaterThan(waterDensity(4.1));
    expect(waterDensity(0)).toBeCloseTo(0.99984, 5);
  });

  it('raises tire pressure with air at fixed volume and with absolute temperature', () => {
    expect(tireState(0.2).gauge).toBe(0);
    expect(tireState(2 / 3 - 1e-9).gauge).toBeCloseTo(220, 4);
    const warm = tireState(1);
    expect((warm.gauge + 101) / 321).toBeCloseTo(323.15 / 293.15, 10);
  });
});

it('keeps every new animation self-contained, accessible, finite, and complete without motion', () => {
  const names = [...animationNames01to13extra, ...Object.keys(companions)];
  expect(names).toHaveLength(44);
  for (const name of names) {
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8');
    const $ = load(svg, { xmlMode: true });
    expect($('svg').first().attr('role'), name).toBe('img');
    expect($('title').first().text().length, name).toBeGreaterThan(8);
    expect($('desc').first().text().length, name).toBeGreaterThan(50);
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
  }
});

it('references every standalone companion from the book', () => {
  const sources = [
    'ch1PhysicalQuantitiesAndUnits',
    'ch3VectorAdditionAndSubtractionAnalyticalMethods',
    'ch4NewtonsSecondLawOfMotion',
    'ch4FurtherApplicationsOfNewtonsLawsOfMotion',
    'ch4ExtendedTopics',
    'ch5DragForces',
    'ch5Friction',
    'ch6RotationAngleAndAngularVelocity',
    'ch7NonconservativeForces',
    'ch9ForcesAndTorquesInMusclesAndJoints',
    'ch9ApplicationsOfStaticsIncludingProblemSolvingStrategies',
    'ch10CollisionsOfExtendedBodiesInTwoDimensions',
    'ch10GyroscopicEffects',
    'ch10DynamicsOfRotationalMotion',
    'ch11WhatIsAFluid',
    'ch11ArchimedesPrinciple',
    'ch11GaugePressureAbsolutePressure',
    'ch12BernoullisEquation',
  ]
    .map(f => readFileSync(new URL(`../contents/${f}.md`, import.meta.url), 'utf8'))
    .join('\n');
  for (const name of Object.keys(companions))
    expect(sources, name).toContain(`/resources/${name}.svg`);
});
