import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import mechanics from '../scripts/figures/mechanics-line-art.js';
import ch10 from '../scripts/figures/ch10.js';

function arrow($, id) {
  const line = $(`#${id} > line`).first();
  const [x, y] = $(`#${id} > polygon`).first().attr('points').split(/[ ,]+/).map(Number);
  const start = [Number(line.attr('x1')), Number(line.attr('y1'))];
  return { start, end: [x, y], dx: x - start[0], dy: start[1] - y };
}

describe('replacement velocity diagrams preserve the worked examples', () => {
  it.each(['Figure_03_05_01', 'Figure_03_05_09'])(
    '%s adds the boat and current head to tail',
    name => {
      const $ = load(mechanics[name](), { xmlMode: true });
      const boat = arrow($, 'boat-velocity');
      const river = arrow($, 'river-velocity');
      const total = arrow($, 'total-velocity');
      expect(boat.end).toEqual(river.start);
      expect(total.start).toEqual(boat.start);
      expect(total.end).toEqual(river.end);
      expect(boat.dx).toBe(0);
      expect(river.dy).toBe(0);
      expect(total.dx / total.dy).toBeCloseTo(1.2 / 0.75, 4);
    }
  );

  it.each(['Figure_03_05_02', 'Figure_03_05_04'])(
    '%s shows a southwest wind and a 20° drift west of north',
    name => {
      const $ = load(mechanics[name](), { xmlMode: true });
      const plane = arrow($, 'plane-velocity');
      const wind = arrow($, 'wind-velocity');
      const total = arrow($, 'total-velocity');
      expect(plane.end).toEqual(wind.start);
      expect(total.end).toEqual(wind.end);
      expect(plane.dx).toBe(0);
      expect(wind.dx).toBeLessThan(0);
      expect(wind.dy).toBeLessThan(0);
      expect(Math.hypot(total.dx, total.dy) / plane.dy).toBeCloseTo(38 / 45, 4);
      expect((Math.atan2(-total.dx, total.dy) * 180) / Math.PI).toBeCloseTo(20, 2);
      expect((wind.dx / plane.dy) * 45).toBeCloseTo(-13, 1);
      expect((wind.dy / plane.dy) * 45).toBeCloseTo(-9.29, 2);
    }
  );
});

it('plots free fall with a quadratic position curve, linear velocity, and constant acceleration', () => {
  const $ = load(mechanics.Figure_02_07_06(), { xmlMode: true });
  const values = id =>
    $(`#${id} > polyline`)
      .attr('points')
      .split(' ')
      .map(p => p.split(',').map(Number));
  const position = values('position-graph');
  const velocity = values('velocity-graph');
  const acceleration = values('acceleration-graph');
  const halfway = Math.floor(position.length / 2);
  const drop = position.at(-1)[1] - position[0][1];
  expect((position[halfway][1] - position[0][1]) / drop).toBeCloseTo(0.25, 3);
  const dv = velocity.at(-1)[1] - velocity[0][1];
  expect((velocity[halfway][1] - velocity[0][1]) / dv).toBeCloseTo(0.5, 3);
  expect(new Set(acceleration.map(p => p[1])).size).toBe(1);
  // Convert the displayed graph endpoints back using their printed axis limits.
  expect((drop / 210) * 1.4).toBeCloseTo(1.225, 3);
  expect((dv / 200) * 6).toBeCloseTo(4.9, 3);
  expect(((acceleration[0][1] - 890) / 200) * -10).toBeCloseTo(-9.8, 3);
});

it.each([
  ['Figure_09_03_02', 0],
  ['Figure_09_03_03', -1],
  ['Figure_09_03_04', 1],
  ['Figure_09_03_05', 0],
  ['Figure_09_03_06', 1],
])('%s gives the weight the stated torque about the support', (name, sign) => {
  const $ = load(mechanics[name](), { xmlMode: true });
  const weight = arrow($, 'weight');
  const normal = arrow($, 'normal');
  const moment = (weight.start[0] - normal.end[0]) * weight.dy;
  expect(Math.sign(moment)).toBeCloseTo(sign, 5);
});

it('keeps tangential and centripetal accelerations perpendicular with the latter pointing inward', () => {
  const $ = load(ch10.Figure_10_01_03(), { xmlMode: true });
  const t = arrow($, 'tangential-acceleration');
  const c = arrow($, 'centripetal-acceleration');
  expect(t.start).toEqual(c.start);
  expect((t.dx * c.dx + t.dy * c.dy) / Math.hypot(t.dx, t.dy) / Math.hypot(c.dx, c.dy)).toBeCloseTo(
    0,
    3
  );
  // The diagram's circle center is the black dot joined to the radius.
  const center = $('circle[r="4"]').first();
  const inward = [Number(center.attr('cx')) - c.start[0], c.start[1] - Number(center.attr('cy'))];
  expect(c.dx * inward[0] + c.dy * inward[1]).toBeGreaterThan(0);
  expect(c.dx * inward[1] - c.dy * inward[0]).toBeCloseTo(0, 0);
});
