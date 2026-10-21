/**
 * Chapter 8: impulse as the area under a force–time graph, and the
 * two-dimensional collision diagrams of section 8.6.
 */
import { COLORS, Plot, Svg, rad } from './svg.js';

const BLACK = COLORS.black;
const VEL = COLORS.velocity;
const TEAL = '#2aa1b3';
const TEAL_LIGHT = '#d3ebf0';
const PURPLE = '#4b2a7b';
const PURPLE_LIGHT = '#ddd3e8';

/** A point mass: a white disk with a thick purple rim and its label inside. */
function mass(svg, x, y, label, { r = 34, size = 22 } = {}) {
  svg.circle(x, y, r, { fill: '#ffffff', stroke: PURPLE, width: 6 });
  svg.text(x, y, label, { size, halo: false });
}

export default {
  // 8.2 — an actual force and the constant effective force with equal impulse
  Figure_08_02_01: () => {
    const svg = new Svg({
      width: 680,
      height: 470,
      title: 'Actual and effective force versus time',
      desc: 'A graph of force F versus time t. The actual force rises smoothly from zero at t1 to a peak midway between t1 and t2 and falls back to zero at t2. The effective force Feff is constant from t1 to t2 at half the peak value. The area under the actual-force curve equals the area of the Feff rectangle, so both forces deliver the same impulse.',
    });
    const t1 = 0.1;
    const t2 = 1;
    const g = new Plot(svg, { x: 90, y: 40, w: 520, h: 340, xRange: [0, 1.1], yRange: [0, 2.3] });
    // F = 2 Feff sin²(π(t − t1)/(t2 − t1)) averages exactly Feff over [t1, t2].
    const actual = t => 2 * Math.sin((Math.PI * (t - t1)) / (t2 - t1)) ** 2;
    const curve = [];
    for (let k = 0; k <= 120; k += 1) {
      const t = t1 + ((t2 - t1) * k) / 120;
      curve.push(g.P(t, actual(t)));
    }
    svg.polygon([g.P(t1, 0), g.P(t1, 1), g.P(t2, 1), g.P(t2, 0)], { fill: PURPLE_LIGHT });
    svg.polygon([g.P(t1, 0), ...curve, g.P(t2, 0)], { fill: TEAL, opacity: 0.22 });
    svg.polyline(curve, { color: TEAL, width: 4 });
    g.line(0, 1, t2, 1, { color: BLACK, width: 2, dash: '7 5' });
    g.line(t1, 0, t1, 1, { color: PURPLE, width: 3.5 });
    g.line(t2, 0, t2, 1, { color: PURPLE, width: 3.5 });
    g.axes({ arrows: true });
    svg.text(g.X(0) - 4, g.Y(2.3) - 22, 'F', { size: 26 });
    svg.text(g.X(1.1) + 26, g.Y(0) + 4, 't', { size: 26 });
    svg.text(g.X(t1), g.Y(0) + 30, 't_1', { size: 24 });
    svg.text(g.X(t2), g.Y(0) + 30, 't_2', { size: 24 });
    svg.text(g.X(0) - 10, g.Y(1), 'F_{eff}', { size: 24, anchor: 'end' });
    svg.text(g.X(0.3) - 30, g.Y(2.05), 'F_{actual}', { size: 24 });
    svg.leader(g.X(0.3) - 20, g.Y(2.05) + 18, g.X(0.36), g.Y(actual(0.36)) - 6, { bend: 0.4 });
    return svg.render();
  },

  // 8.6 — Example 1: m1 scatters off an unseen m2 inside a dark room
  Figure_08_06_02: () => {
    const svg = new Svg({
      width: 760,
      height: 770,
      title: 'A collision in a dark room',
      desc: 'Net F = 0. Before: p1 = ptot. After: p1′ + p2′ = ptot. Mass m1 moves to the right with velocity v1 into a dark room, where it strikes m2 = 0.400 kg, initially at rest (v2 = 0). Mass m1 leaves through the top of the room with velocity v1′ at θ1 = 45° above its incoming direction. The final velocity v2′ and angle θ2 of m2 are unknown. An x–y axis indicator shows x to the right and y up.',
    });
    svg.text(380, 28, 'net **F** = 0', { size: 26, math: false });
    svg.text(210, 98, 'Before', { size: 26, math: false });
    svg.text(210, 136, '**p**_1 = **p**_{tot}', { size: 26, math: false });
    svg.text(510, 98, 'After', { size: 26, math: false });
    svg.text(510, 136, '**p′**_1 + **p′**_2 = **p**_{tot}', { size: 26, math: false });
    svg.xyIndicator(65, 305, { len: 120, size: 26 });

    // The room: a light square whose teal walls have gaps where m1 passes.
    const [left, top, side] = [258, 448, 297];
    const right = left + side;
    const bottom = top + side;
    const yIn = 600;
    const hit = [340, yIn];
    const exitX = hit[0] + (yIn - top); // the 45° path crosses the top wall here
    svg.rect(left, top, side, side, { fill: TEAL_LIGHT });
    const wall = { color: TEAL, width: 5, cap: 'square' };
    svg.line(left, top, left, yIn - 40, wall);
    svg.line(left, yIn + 40, left, bottom, wall);
    svg.line(left, bottom, right, bottom, wall);
    svg.line(right, bottom, right, yIn + 40, wall);
    svg.line(right, yIn - 40, right, top, wall);
    svg.line(right, top, exitX + 30, top, wall);
    svg.line(exitX - 40, top, left, top, wall);

    const guide = { color: BLACK, width: 1.5, dash: '6 5' };
    svg.line(hit[0] - 60, yIn, 680, yIn, guide);
    const d = 225;
    const after = [hit[0] + d, yIn - d];
    const r = 38;
    const out = [Math.cos(rad(45)), -Math.sin(rad(45))];
    svg.line(...hit, after[0] - out[0] * r, after[1] - out[1] * r, guide);
    // Measure θ1 just inside the wall, where the outgoing path crosses y = top + 18.
    const vertex = [exitX - 18, top + 18];
    svg.line(...vertex, 680, vertex[1], guide);
    svg.arc(...vertex, 55, 0, 45, { color: BLACK, width: 2 });
    svg.text(exitX + 120, top - 30, 'θ_1 = 45°', { size: 25, anchor: 'start' });

    mass(svg, 72, yIn, 'm_1', { r });
    svg.arrow(72 + r + 4, yIn, hit[0] - 62, yIn, { color: VEL, width: 4, head: 18 });
    svg.text(155, yIn - 26, '**v**_1', { size: 26 });
    mass(svg, ...after, 'm_1', { r });
    svg.arrow(
      after[0] + out[0] * (r + 4),
      after[1] + out[1] * (r + 4),
      after[0] + out[0] * 150,
      after[1] + out[1] * 150,
      {
        color: VEL,
        width: 4,
        head: 18,
      }
    );
    svg.text(after[0] + 66, after[1] - 18, '**v′**_1', { size: 26 });

    svg.text(20, 412, 'm_2 = 0.400 \\rm{kg}    v_2 = 0', { size: 25, anchor: 'start' });
    svg.leader(150, 432, 325, 525, { bend: 0.35 });
    svg.text(left + side / 2, bottom - 50, 'v′_2 = ?    θ_2 = ?', { size: 25 });
    return svg.render();
  },

  // 8.6 — Conceptual Question 3: a small object glances off a massive cube
  Figure_08_06_03: () => {
    const svg = new Svg({
      width: 1010,
      height: 530,
      title: 'A small object scattering from a massive cube',
      desc: 'Before: mass m1 moves to the right with velocity v1 along a horizontal line a distance b, the impact parameter, above the center of a massive cube M2 at rest (v2 = 0). The cube is turned so the face that m1 strikes slopes up at 30°. After: m1 leaves along a line at angle θ1 = ? above its incoming direction with velocity v1′, while the cube stays essentially at rest (v2′ ≈ 0). An x–y axis indicator shows x to the right and y up.',
    });
    // Cube turned α = 30° counterclockwise; m1 strikes its upper-left face.
    const C = [425, 418];
    const s = 82; // half the side
    const alpha = 30;
    const corner = a => [
      C[0] + s * Math.SQRT2 * Math.cos(rad(alpha + a)),
      C[1] - s * Math.SQRT2 * Math.sin(rad(alpha + a)),
    ];
    const b = 0.7 * s;
    // Along the face from its midpoint, the height above C is s cos α + t sin α.
    const t = (b - s * Math.cos(rad(alpha))) / Math.sin(rad(alpha));
    const H = [C[0] + s * Math.cos(rad(alpha + 90)) + t * Math.cos(rad(alpha)), C[1] - b];
    // An elastic bounce off a fixed face at α turns the path through 2α.
    const theta = 2 * alpha;
    const out = [Math.cos(rad(theta)), -Math.sin(rad(theta))];

    const guide = { color: BLACK, width: 1.5, dash: '6 5' };
    svg.line(20, H[1], 1000, H[1], guide);
    svg.line(20, C[1], C[0], C[1], guide);
    svg.polygon([corner(45), corner(135), corner(225), corner(315)], {
      fill: TEAL_LIGHT,
      stroke: TEAL,
      width: 4,
    });
    svg.line(20, C[1], C[0] - 8, C[1], guide);
    svg.circle(...C, 6, { fill: TEAL });
    svg.text(C[0], C[1] - 24, 'M_2', { size: 24, halo: false });

    const r = 36;
    const d = 245;
    const after = [H[0] + out[0] * d, H[1] + out[1] * d];
    svg.line(...H, after[0] - out[0] * r, after[1] - out[1] * r, guide);
    svg.arc(...H, 165, 0, theta, { color: BLACK, width: 2 });
    svg.text(
      H[0] + 185 * Math.cos(rad(theta / 2)),
      H[1] - 185 * Math.sin(rad(theta / 2)),
      'θ_1 = ?',
      {
        size: 24,
        anchor: 'start',
      }
    );

    svg.text(25, 172, 'Before', { size: 25, math: false, anchor: 'start' });
    mass(svg, 50, H[1], 'm_1', { r });
    svg.arrow(50 + r + 4, H[1], 186, H[1], { color: VEL, width: 4, head: 18 });
    svg.text(120, H[1] - 30, '**v**_1', { size: 25 });
    svg.text(268, H[1] - 30, '**v**_2 = 0', { size: 25 });
    svg.arrow(236, H[1] + 4, 236, C[1] - 4, { color: BLACK, width: 1.5, head: 10, start: true });
    svg.line(222, C[1], 250, C[1], { color: BLACK, width: 1.5 });
    svg.line(222, H[1], 250, H[1], { color: BLACK, width: 1.5 });
    svg.text(258, (H[1] + C[1]) / 2, 'b', { size: 25, anchor: 'start' });
    svg.text(C[0] + 115, C[1] - 10, '**v′**_2 ≈ 0', { size: 25, anchor: 'start' });

    svg.text(after[0] - 50, after[1] - 62, 'After', { size: 25, math: false });
    mass(svg, ...after, 'm_1', { r });
    svg.arrow(
      after[0] + out[0] * (r + 4),
      after[1] + out[1] * (r + 4),
      after[0] + out[0] * 120,
      after[1] + out[1] * 120,
      {
        color: VEL,
        width: 4,
        head: 18,
      }
    );
    svg.text(after[0] + 70, after[1] + 10, '**v′**_1', { size: 25, anchor: 'start' });
    svg.xyIndicator(790, 268, { len: 110, size: 25 });
    return svg.render();
  },
};
