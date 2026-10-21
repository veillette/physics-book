/**
 * Chapter 9: torque on a door, a braced wall, a sandwich-board sign, and
 * pulley systems with their mechanical advantage.
 */
import { COLORS, Svg, rad } from './svg.js';

const BLACK = COLORS.black;
const FORCE = '#e0245e';
const WOOD = '#dcb878';
const WOOD_EDGE = '#a7803d';
const STEEL = '#c9cbcf';
const STEEL_EDGE = '#7d8187';

/**
 * A door seen from above, hinged at H and opened `deg` degrees from the wall.
 * `at(u, v)` maps door coordinates (u along the door from the hinge, v across
 * it toward the side the door opens to) onto the page.
 */
function door(svg, H, { deg = 25, length = 280, half = 12 } = {}) {
  const e = [Math.cos(rad(deg)), -Math.sin(rad(deg))];
  const n = [-Math.sin(rad(deg)), -Math.cos(rad(deg))];
  const at = (u, v) => [H[0] + u * e[0] + v * n[0], H[1] + u * e[1] + v * n[1]];
  svg.rect(H[0] - 170, H[1] - 4, 160, 14, { fill: '#efdcb2', stroke: WOOD_EDGE, width: 1 });
  svg.polygon([at(0, -half), at(length, -half), at(length, half), at(0, half)], {
    fill: WOOD,
    stroke: WOOD_EDGE,
    width: 1.5,
  });
  // The handle, on the side the door opens toward.
  svg.line(...at(length - 24, half), ...at(length - 24, half + 8), { color: '#9a7a12', width: 3 });
  svg.circle(...at(length - 24, half + 14), 7, { fill: '#e8c547', stroke: '#9a7a12', width: 1.5 });
  svg.circle(...H, 7, { fill: '#c9a227', stroke: '#7a5e10', width: 1.5 });
  return { at, e, n };
}

/** Dimension line along the door from u = 0 to u = r, offset v pixels across it. */
function doorDimension(svg, d, r, v, label, { labelV = v + 20 } = {}) {
  const tick = (u, len) =>
    svg.line(...d.at(u, v - len), ...d.at(u, v + len), { color: BLACK, width: 1.3 });
  tick(0, 10);
  tick(r, 10);
  svg.arrow(...d.at(1, v), ...d.at(r - 1, v), { color: BLACK, width: 1.3, head: 10, start: true });
  if (label) svg.text(...d.at(r / 2, labelV), label, { size: 22 });
}

/** Rope: a tan cable drawn along an SVG path. */
function rope(svg, d) {
  svg.path(d, { color: '#a5843f', width: 7 });
  svg.path(d, { color: '#ddbf7d', width: 3.5 });
}

/** Pulley wheel of radius r centered at (x, y). */
function pulley(svg, x, y, r) {
  svg.circle(x, y, r, { fill: STEEL, stroke: STEEL_EDGE, width: 2 });
  svg.circle(x, y, r * 0.55, { fill: '#e4e5e8', stroke: STEEL_EDGE, width: 1.5 });
  svg.circle(x, y, r * 0.16, { fill: '#ffffff', stroke: STEEL_EDGE, width: 1.5 });
}

/** Tension arrow along the segment from p to q, covering the fraction [s1, s2]. */
function tension(svg, p, q, s1, s2, { label = 'T', dx = -18, dy = 0 } = {}) {
  const at = s => [p[0] + (q[0] - p[0]) * s, p[1] + (q[1] - p[1]) * s];
  const [a, b] = [at(s1), at(s2)];
  svg.arrow(...a, ...b, { color: FORCE, width: 4.5, head: 18 });
  svg.text((a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy, label, {
    size: 22,
    math: false,
    weight: 'bold',
  });
}

/** Hanging load: hook and ring below a pulley axle at (x, y), then a weight. */
function load(svg, x, y) {
  svg.line(x, y, x, y + 70, { color: STEEL_EDGE, width: 4 });
  svg.circle(x, y + 80, 9, { fill: 'none', stroke: '#444444', width: 3.5 });
  svg.polygon(
    [
      [x - 32, y + 92],
      [x + 32, y + 92],
      [x + 46, y + 160],
      [x - 46, y + 160],
    ],
    { fill: '#bfc1c5', stroke: STEEL_EDGE, width: 1.5 }
  );
}

/** Free-body diagram: weight down from a dot, n tension arrows fanning upward. */
function pulleyFbd(svg, x, n) {
  const y = 410;
  svg.arrow(x, y, x, 578, { color: BLACK, width: 1.6, head: 11 });
  svg.text(x + 16, 500, 'w', { size: 22, math: false, weight: 'bold', anchor: 'start' });
  for (let k = 0; k < n; k += 1) {
    const off = k - (n - 1) / 2;
    svg.arrow(x + off * 5, y - 8, x + off * 17, 300, { color: BLACK, width: 1.6, head: 10 });
    svg.text(x + off * 17, 284, 'T', { size: 22, math: false, weight: 'bold' });
  }
  svg.circle(x, y, 6, { fill: '#9b1b1b' });
}

/** Ceiling beam with a bracket holding a pulley axle at (x, y). */
function ceilingMount(svg, x, y) {
  svg.rect(x - 95, 6, 190, 32, { fill: '#c08a4a', stroke: '#8a5e2c', width: 1.5 });
  svg.polygon(
    [
      [x - 26, 38],
      [x + 26, 38],
      [x + 7, y],
      [x - 7, y],
    ],
    { fill: '#a9acb1', stroke: STEEL_EDGE, width: 1.5 }
  );
}

/** Point on a circle at math angle `deg` (y up), radius r. */
const onCircle = (c, r, deg) => [c[0] + r * Math.cos(rad(deg)), c[1] - r * Math.sin(rad(deg))];

export default {
  // 9.2 — torque on a door depends on F, r, and the angle between them
  Figure_09_02_01: () => {
    const svg = new Svg({
      width: 960,
      height: 760,
      title: 'Torque on a door seen from above',
      desc: 'Six overhead views of a door hinged on the left and opened 25° from the wall. (a) A force F pushes perpendicular to the door at distance r from the hinge, so r = r⊥ and the torque is counterclockwise. (b) A smaller force F′ at the same point gives a smaller counterclockwise torque. (c) The same force at a smaller distance r′ = r′⊥ gives a smaller counterclockwise torque. (d) The force −F, opposite to (a), gives a clockwise torque. (e) A horizontal force of the same magnitude at the same point makes angle θ with the door; the perpendicular distance from the hinge to its line of action is r⊥ = r sin θ, so the counterclockwise torque is smaller. (f) A force pulling straight along the door away from the hinge has θ = 0° and r⊥ = 0, so it produces no torque.',
    });
    const deg = 25;
    const r = 225;
    const panel = (col, row) => [190 + col * 455, 200 + row * 245];
    const caption = (H, label) => svg.text(H[0] + 100, H[1] + 48, label, { size: 20, math: false });
    const push = (d, u, len, sign = 1) => {
      // Perpendicular push on the face; sign = 1 pushes toward +v (counterclockwise).
      const tip = d.at(u, -sign * 12);
      const tail = d.at(u, -sign * (12 + len));
      svg.arrow(...tail, ...tip, { color: FORCE, width: 4, head: 18 });
      return tail;
    };
    // (a)
    let H = panel(0, 0);
    let d = door(svg, H, { deg });
    doorDimension(svg, d, r, 40, 'r = r_⊥');
    let tail = push(d, r, 80);
    svg.text(tail[0] + 18, tail[1], '**F**', { size: 24, anchor: 'start' });
    caption(H, '(a)');
    // (b)
    H = panel(0, 1);
    d = door(svg, H, { deg });
    doorDimension(svg, d, r, 40, 'r = r_⊥');
    tail = push(d, r, 48);
    svg.text(tail[0] + 18, tail[1], '**F′**', { size: 24, anchor: 'start' });
    caption(H, '(b)');
    // (c)
    H = panel(0, 2);
    d = door(svg, H, { deg });
    doorDimension(svg, d, 140, 40, 'r′ = r′_⊥');
    tail = push(d, 140, 80);
    svg.text(tail[0] + 18, tail[1], '**F**', { size: 24, anchor: 'start' });
    caption(H, '(c)');
    // (d)
    H = panel(1, 0);
    d = door(svg, H, { deg });
    doorDimension(svg, d, r, -40, 'r = r_⊥', { labelV: -62 });
    tail = push(d, r, 80, -1);
    svg.text(tail[0] - 14, tail[1], '−**F**', { size: 24, anchor: 'end' });
    caption(H, '(d)');
    // (e) A horizontal force; θ is measured between the door and the line of action.
    H = panel(1, 1);
    d = door(svg, H, { deg });
    const P = d.at(r, 0);
    const guide = { color: BLACK, width: 1.4, dash: '6 4' };
    svg.line(H[0], P[1], P[0], P[1], guide);
    svg.line(...H, H[0], P[1], guide);
    svg.arrow(P[0] + 92, P[1], P[0] + 2, P[1], { color: FORCE, width: 4, head: 18 });
    svg.text(P[0] + 60, P[1] + 26, '**F**', { size: 24 });
    svg.arc(...P, 80, 180, 180 + deg, { color: BLACK, width: 1.6 });
    svg.text(P[0] - 100, P[1] + 14, 'θ', { size: 22 });
    svg.text(H[0] - 10, (H[1] + P[1]) / 2, 'r_⊥ = r sin θ', { size: 22, anchor: 'end' });
    doorDimension(svg, d, r, -40, 'r', { labelV: -60 });
    caption(H, '(e)');
    // (f) A pull straight along the door.
    H = panel(1, 2);
    d = door(svg, H, { deg });
    const Q = d.at(r, 0);
    svg.line(...H, ...Q, guide);
    svg.arrow(...Q, ...d.at(r + 95, 0), { color: FORCE, width: 4, head: 18 });
    svg.text(...d.at(r + 80, 28), '**F**', { size: 24 });
    doorDimension(svg, d, r, 40, 'r');
    svg.text(H[0] - 12, H[1] - 26, 'θ = 0°', { size: 22, anchor: 'end' });
    svg.text(H[0] + 150, H[1] + 22, 'r_⊥ = 0', { size: 22, anchor: 'start' });
    caption(H, '(f)');
    return svg.render();
  },

  // 9.3 Problem — a wall under construction held by 10 braces against the wind
  Figure_09_03_11: () => {
    const svg = new Svg({
      width: 750,
      height: 370,
      title: 'A braced wall in the wind',
      desc: 'A 17.0 m high wall stands on the ground with a horizontal wind force Fwind pushing on its left face. On the right, a brace runs from a point 8.5 m up the wall down to the ground, making a 35° angle with the wall. There are 10 such braces. Heights are drawn to scale.',
    });
    const ground = 242;
    const scale = 240 / 17; // pixels per meter
    const [wx, ww] = [290, 38];
    const top = ground - 17 * scale;
    const contact = ground - 8.5 * scale;
    const foot = wx + ww + (ground - contact) * Math.tan(rad(35));
    svg.rect(0, ground, 700, 42, { fill: '#e8d8bc' });
    for (let x = 18; x < 700; x += 46) {
      svg.line(x, ground + 14, x + 9, ground + 18, { color: '#c49a5a', width: 2 });
      svg.line(x + 22, ground + 30, x + 30, ground + 27, { color: '#b9894a', width: 2 });
    }
    svg.line(0, ground, 700, ground, { color: '#3f9a2b', width: 3 });
    for (let y = top; y < ground - 1; y += 34) {
      svg.rect(wx, y, ww, Math.min(34, ground - y), {
        fill: '#d6d6d6',
        stroke: '#9a9a9a',
        width: 1.5,
      });
    }
    svg.line(wx + ww, contact, foot, ground, { color: '#b5852f', width: 6, cap: 'round' });
    svg.arc(wx + ww, contact, 42, 270, 305, { color: BLACK, width: 1.8 });
    svg.text(wx + ww + 22, contact + 98, '35°', { size: 24, math: false, anchor: 'start' });

    svg.arrow(150, 115, wx - 3, 115, { color: FORCE, width: 4, head: 22 });
    svg.text(152, 92, '**F**_{wind}', { size: 26, anchor: 'start', math: false });
    const guide = { color: BLACK, width: 1.4, dash: '7 5' };
    svg.line(wx + ww, top, 700, top, guide);
    svg.line(wx + ww + 4, contact, 530, contact, guide);
    svg.vdimension(510, contact, ground, '', { tick: 22 });
    svg.text(528, (contact + ground) / 2, '8.5 \\rm{m}', { size: 26, anchor: 'start' });
    svg.vdimension(684, top, ground, '', { tick: 22 });
    svg.text(666, (top + ground) / 2, '17.0 \\rm{m}', { size: 26, anchor: 'end' });
    svg.text(300, 348, '10 braces', { size: 24, math: false });
    svg.squiggle(338, 326, foot - 3, ground - 2, { waves: 1, amp: 6 });
    return svg.render();
  },

  // 9.3 Problem — a sandwich-board sign held by a chain
  Figure_09_03_14: () => {
    const svg = new Svg({
      width: 590,
      height: 650,
      title: 'A sandwich-board sign',
      desc: 'Two uniform boards are hinged together at the top and stand on the sidewalk as an upside-down V, their feet 1.10 m apart. The hinge is 1.30 m above the sidewalk. A horizontal chain joins the two boards 0.50 m below the hinge. Each board’s center of gravity, CG, is at its center. Drawn to scale.',
    });
    const scale = 400; // pixels per meter
    const H = [240, 30];
    const ground = H[1] + 1.3 * scale;
    const halfBase = 0.55 * scale;
    const legs = [-1, 1].map(s => [H[0] + s * halfBase, ground]);
    for (const F of legs) {
      const len = Math.hypot(F[0] - H[0], F[1] - H[1]);
      const [nx, ny] = [(F[1] - H[1]) / len, -(F[0] - H[0]) / len];
      const w = 17;
      svg.polygon(
        [
          [H[0] + nx * w, H[1] + ny * w],
          [F[0] + nx * w, F[1] + ny * w],
          [F[0] - nx * w, F[1] - ny * w],
          [H[0] - nx * w, H[1] - ny * w],
        ],
        { fill: '#f3d9a4', stroke: '#c9a466', width: 1.5 }
      );
    }
    svg.rect(0, ground, 520, 34, { fill: '#a96c3c', stroke: '#6e4422', width: 1.5 });
    for (let x = 10; x < 520; x += 38) {
      svg.line(x, ground + 32, x + 26, ground + 2, { color: '#6e4422', width: 1.5 });
    }
    // Chain 0.50 m below the hinge, between the boards' center lines.
    const chainY = H[1] + 0.5 * scale;
    const chainHalf = halfBase * (0.5 / 1.3);
    svg.line(H[0] - chainHalf, chainY, H[0] + chainHalf, chainY, {
      color: '#8a8a8a',
      width: 4,
      dash: '3 3',
    });
    svg.circle(...H, 17, { fill: '#6b6b6b', stroke: '#333333', width: 2 });
    svg.line(H[0] - 9, H[1] + 9, H[0] + 9, H[1] - 9, { color: '#dddddd', width: 2 });
    for (const F of legs) {
      const cg = [(H[0] + F[0]) / 2, (H[1] + F[1]) / 2];
      svg.circle(...cg, 7, { fill: '#9b1b1b' });
      svg.text(cg[0] + 22, cg[1] + 10, 'CG', { size: 20, math: false, anchor: 'start' });
    }

    const guide = { color: BLACK, width: 1.4, dash: '6 5' };
    svg.line(H[0] + 20, H[1], 520, H[1], guide);
    svg.vdimension(338, H[1], chainY, '');
    svg.text(352, (H[1] + chainY) / 2, '0.50 \\rm{m}', { size: 24, anchor: 'start' });
    svg.vdimension(492, H[1], ground, '');
    svg.text(504, (H[1] + ground) / 2, '1.30 \\rm{m}', { size: 24, anchor: 'start' });
    svg.line(legs[0][0], ground, legs[0][0], ground + 70, { color: BLACK, width: 1.3 });
    svg.line(legs[1][0], ground, legs[1][0], ground + 70, { color: BLACK, width: 1.3 });
    svg.arrow(legs[0][0] + 1, ground + 60, legs[1][0] - 1, ground + 60, {
      color: BLACK,
      width: 1.5,
      head: 12,
      start: true,
    });
    svg.rect(H[0] - 44, ground + 46, 88, 28, { fill: '#ffffff' });
    svg.text(H[0], ground + 60, '1.10 \\rm{m}', { size: 24 });
    svg.text(70, H[1] + 2, 'Hinge', { size: 22, math: false });
    svg.squiggle(108, H[1] + 2, H[0] - 20, H[1], { waves: 1, amp: 4 });
    svg.text(62, 180, 'Chain', { size: 22, math: false });
    svg.squiggle(98, 182, H[0] - chainHalf + 8, chainY - 6, { waves: 1, amp: 5 });
    svg.lines(250, 470, ['Uniform board', '(CG at center)'], { size: 22, math: false, gap: 28 });
    svg.squiggle(170, 448, 110, 398, { waves: 1, amp: 6 });
    return svg.render();
  },

  // 9.5 — pulley systems with mechanical advantage 2, 3 and 4
  Figure_09_05_04: () => {
    const svg = new Svg({
      width: 1030,
      height: 625,
      title: 'Pulley systems with mechanical advantage 2, 3 and 4',
      desc: 'Three pulley systems lifting a weight, each with its free-body diagram. (a) A rope tied to the fixed upper pulley runs down under a movable pulley carrying the load and back up over the fixed pulley to the free end, pulled with tension T. Two rope segments pull up on the load, so the free-body diagram shows 2T up and w down: MA ≈ 2. (b) With a second small pulley hung from the fixed one, three rope segments support the movable pulley: 3T up, MA ≈ 3. (c) With a small pulley mounted on the movable block and the free end pulled upward, four segments support the load: 4T up, MA ≈ 4.',
    });
    const R = 46;
    const wrap = R + 3;
    // (a)
    let A = [135, 110];
    let B = [135, 410];
    ceilingMount(svg, ...A);
    pulley(svg, ...A, R);
    pulley(svg, ...B, R);
    load(svg, ...B);
    let K = [A[0], A[1] + R + 4];
    let leave = onCircle(A, wrap, 120);
    let free = [leave[0] - 112 * Math.cos(rad(30)), leave[1] + 112 * Math.sin(rad(30))];
    rope(
      svg,
      `M ${K[0]} ${K[1]} L ${B[0] - wrap} ${B[1]} A ${wrap} ${wrap} 0 0 0 ${B[0] + wrap} ${B[1]} L ${A[0] + wrap} ${A[1]} A ${wrap} ${wrap} 0 0 0 ${leave[0]} ${leave[1]} L ${free[0]} ${free[1]}`
    );
    svg.circle(...K, 6, { fill: '#c9a45c', stroke: '#8a6a2c', width: 1.5 });
    tension(svg, leave, free, 0.45, 1, { dx: -4, dy: -22 });
    tension(svg, [B[0] - wrap, B[1]], K, 0.15, 0.5);
    tension(svg, [B[0] + wrap, B[1]], [A[0] + wrap, A[1]], 0.15, 0.45, { dx: 20 });
    svg.text(200, 160, 'MA ≈ 2', { size: 22, math: false, anchor: 'start' });
    pulleyFbd(svg, 262, 2);
    svg.text(B[0], 610, '(a)', { size: 20, math: false });

    // (b)
    A = [500, 110];
    B = [500, 410];
    const C = [500, 222];
    const r = 28;
    ceilingMount(svg, ...A);
    svg.line(...A, ...C, { color: '#a9acb1', width: 12 });
    pulley(svg, ...A, R);
    pulley(svg, ...C, r);
    pulley(svg, ...B, R);
    load(svg, ...B);
    leave = onCircle(A, wrap, 120);
    free = [leave[0] - 112 * Math.cos(rad(30)), leave[1] + 112 * Math.sin(rad(30))];
    K = [B[0] + 12, B[1] - R - 3];
    rope(
      svg,
      `M ${free[0]} ${free[1]} L ${leave[0]} ${leave[1]} A ${wrap} ${wrap} 0 0 1 ${A[0] + wrap} ${A[1]} L ${B[0] + wrap} ${B[1]} A ${wrap} ${wrap} 0 0 1 ${B[0] - wrap} ${B[1]} L ${C[0] - r - 3} ${C[1]} A ${r + 3} ${r + 3} 0 0 1 ${C[0] + r + 3} ${C[1]} L ${K[0]} ${K[1]}`
    );
    svg.circle(...K, 6, { fill: '#c9a45c', stroke: '#8a6a2c', width: 1.5 });
    tension(svg, leave, free, 0.45, 1, { dx: -4, dy: -22 });
    tension(svg, [B[0] - wrap, B[1]], [C[0] - r - 3, C[1]], 0.15, 0.5);
    tension(svg, K, [C[0] + r + 3, C[1]], 0.1, 0.45, { dx: -16 });
    tension(svg, [B[0] + wrap, B[1]], [A[0] + wrap, A[1]], 0.15, 0.45, { dx: 20 });
    svg.text(565, 160, 'MA ≈ 3', { size: 22, math: false, anchor: 'start' });
    pulleyFbd(svg, 632, 3);
    svg.text(B[0], 610, '(b)', { size: 20, math: false });

    // (c)
    A = [865, 110];
    B = [865, 418];
    const D = [865, 308];
    const rb = 50;
    const rc = 26;
    ceilingMount(svg, ...A);
    pulley(svg, ...A, R);
    svg.line(...D, ...B, { color: '#a9acb1', width: 12 });
    pulley(svg, ...D, rc);
    pulley(svg, ...B, rb);
    load(svg, ...B);
    K = [A[0], A[1] + R + 4];
    const top = [B[0] - rb - 30, 225];
    rope(
      svg,
      `M ${K[0]} ${K[1]} L ${D[0] + rc + 3} ${D[1]} A ${rc + 3} ${rc + 3} 0 0 1 ${D[0] - rc - 3} ${D[1]} L ${A[0] - wrap} ${A[1]} A ${wrap} ${wrap} 0 0 1 ${A[0] + wrap} ${A[1]} L ${B[0] + rb + 3} ${B[1]} A ${rb + 3} ${rb + 3} 0 0 1 ${B[0] - rb - 3} ${B[1]} L ${top[0]} ${top[1]}`
    );
    svg.circle(...K, 6, { fill: '#c9a45c', stroke: '#8a6a2c', width: 1.5 });
    tension(svg, [B[0] - rb - 3, B[1]], top, 0.35, 1.08, { dx: -18 });
    tension(svg, [D[0] - rc - 3, D[1]], [A[0] - wrap, A[1]], 0.15, 0.5, { dx: -20 });
    tension(svg, [D[0] + rc + 3, D[1]], K, 0.12, 0.5, { dx: -14, dy: -6 });
    tension(svg, [B[0] + rb + 3, B[1]], [A[0] + wrap, A[1]], 0.15, 0.45, { dx: 20 });
    svg.text(925, 200, 'MA ≈ 4', { size: 22, math: false, anchor: 'start' });
    pulleyFbd(svg, 988, 4);
    svg.text(B[0], 610, '(c)', { size: 20, math: false });
    return svg.render();
  },
};
