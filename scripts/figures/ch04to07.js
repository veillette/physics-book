/**
 * Chapters 4–7: force components, stress–strain curves, circular-motion and
 * gravitation geometry, Kepler's laws, work as an area, and world energy use.
 */
import { COLORS, Frame, Plot, Svg, rad, smoothPath } from './svg.js';

const FORCE = '#b03a2e';
const FORCE_LIGHT = '#d98b84';
const BLACK = COLORS.black;
const TEAL = '#2aa1b3';
const GREEN = '#4caf3d';
const MAROON = COLORS.maroon;
const PINK = '#e0245e';

const polar = Frame.polar;
const add = (...vs) => vs.reduce(([a, b], [c, d]) => [a + c, b + d], [0, 0]);

/** Fraction label: numerator over a bar over denominator, centered at (x, y). */
function fraction(svg, x, y, num, den, { size = 18, width = 30 } = {}) {
  svg.text(x, y - size * 0.62, num, { size });
  svg.line(x - width / 2, y, x + width / 2, y, { color: COLORS.text, width: 1.2 });
  svg.text(x, y + size * 0.72, den, { size });
}

/** Dimension line with arrowheads at both ends and end ticks, label centered. */
function dimension(svg, x1, x2, y, label, { tick = 14, size = 16, math = false } = {}) {
  svg.line(x1, y - tick / 2, x1, y + tick / 2, { color: BLACK, width: 1.2 });
  svg.line(x2, y - tick / 2, x2, y + tick / 2, { color: BLACK, width: 1.2 });
  svg.arrow(x1, y, x2, y, { color: BLACK, width: 1.2, head: 9, start: true });
  if (label) svg.text((x1 + x2) / 2, y, label, { size, math });
}

/** Solve Kepler's equation M = E − e sin E for E (radians). */
function eccentricAnomaly(M, e) {
  let E = M;
  for (let k = 0; k < 30; k += 1) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

export default {
  // 4.5 — weight resolved parallel and perpendicular to an incline
  Figure_04_05_03: () => {
    const th = 33;
    const svg = new Svg({
      width: 800,
      height: 310,
      title: 'Weight resolved into components on an incline',
      desc: 'On an incline at angle θ, the weight w is split into w∥ = w sin θ = mg sin θ down the slope and w⊥ = w cos θ = mg cos θ into the slope. The tilted axes have x along the incline and y perpendicular to it; the angle between w and w⊥ is θ.',
    });
    const f = new Frame(svg, { ox: 315, oy: 100, scale: 1 });
    // The incline: base and slope meeting at the lower-left corner.
    const corner = [-305, -195];
    svg.polyline([f.p(...add(corner, polar(260, th))), f.p(...corner), f.p(0, -195)], {
      color: '#2b3990',
      width: 4,
    });
    const angleAt = f.p(...corner);
    svg.arc(angleAt[0], angleAt[1], 55, 0, th, { color: BLACK });
    svg.text(angleAt[0] + 66, angleAt[1] - 16, 'θ', { size: 20 });
    // Tilted axes through the point of application.
    f.vec([0, 0], polar(110, th), { color: BLACK, width: 1.8, head: 13 });
    f.vec([0, 0], polar(105, th + 90), { color: BLACK, width: 1.8, head: 13 });
    f.text(polar(118, th), 'x', { dx: 4, dy: 14, size: 20, math: false });
    f.text(polar(110, th + 90), 'y', { dx: -12, dy: 6, size: 20, math: false });
    const w = 180;
    const par = polar(w * Math.sin(rad(th)), 180 + th);
    const perp = polar(w * Math.cos(rad(th)), th - 90);
    const wv = [0, -w];
    f.line(par, wv, { color: FORCE_LIGHT, width: 1.5, dash: '6 4' });
    f.line(perp, wv, { color: FORCE_LIGHT, width: 1.5, dash: '6 4' });
    f.vec([0, 0], par, { color: FORCE, width: 2.5, head: 15 });
    f.vec([0, 0], perp, { color: FORCE, width: 2.5, head: 15 });
    f.vec([0, 0], wv, { color: FORCE, width: 4, head: 18 });
    f.angle([0, 0], -90, th - 90, 60, 'θ', { labelR: 76, size: 20 });
    f.text(par, '**w**_∥', { dx: -6, dy: -18, size: 21, anchor: 'end' });
    f.text(perp, '**w**_⊥', { dx: 10, dy: 2, size: 21, anchor: 'start' });
    f.text(wv, '**w**', { dx: 14, dy: 4, size: 21, anchor: 'start' });
    svg.text(485, 120, 'w_∥ = w sin(θ) = mg sin(θ)', { size: 21, anchor: 'start' });
    svg.text(485, 150, 'w_⊥ = w cos(θ) = mg cos(θ)', { size: 21, anchor: 'start' });
    return svg.render();
  },

  // 4.5 Example — tightrope walker: tension components and free-body diagram
  Figure_04_05_07: () => {
    const svg = new Svg({
      width: 720,
      height: 330,
      title: 'Tension components for the tightrope walker',
      desc: 'Left: the tension TL in the left part of the wire points 5.0° above the −x direction and has components TLx (left) and TLy (up); the tension TR points 5.0° above the +x direction and has components TRx (right) and TRy (up). Right: the free-body diagram of the walker with TLx left, TRx right, TLy and TRy up and the weight W down; the net force in x and in y is zero.',
    });
    const L = 280;
    const tip = 5;
    // T_L: drawn from the right end, pointing left and 5° up.
    let f = new Frame(svg, { ox: 340, oy: 95, scale: 1 });
    const TL = polar(L, 180 - tip);
    f.vec([0, 0], [TL[0], 0], { color: FORCE_LIGHT, width: 2, dash: '6 4', head: 13 });
    f.vec([TL[0], 0], TL, { color: FORCE_LIGHT, width: 2, head: 11 });
    f.vec([0, 0], TL, { color: FORCE, width: 3.5, head: 17 });
    f.angle([0, 0], 180 - tip, 180, 90, null);
    f.text(polar(100, 177), '5.0°', { dx: -8, dy: -26, size: 17 });
    f.text(polar(L * 0.5, 180 - tip), '**T**_L', { dy: -18, size: 20 });
    f.text([TL[0] * 0.5, 0], '**T**_{Lx}', { dy: 18, size: 20 });
    f.text(TL, '**T**_{Ly}', { dx: -12, dy: 8, size: 20, anchor: 'end' });
    // T_R: drawn from the left end, pointing right and 5° up.
    f = new Frame(svg, { ox: 60, oy: 240, scale: 1 });
    const TR = polar(L, tip);
    f.vec([0, 0], [TR[0], 0], { color: FORCE_LIGHT, width: 2, dash: '6 4', head: 13 });
    f.vec([TR[0], 0], TR, { color: FORCE_LIGHT, width: 2, head: 11 });
    f.vec([0, 0], TR, { color: FORCE, width: 3.5, head: 17 });
    f.angle([0, 0], 0, tip, 90, null);
    f.text(polar(100, 3), '5.0°', { dx: -40, dy: -28, size: 17 });
    f.text(polar(L * 0.55, tip), '**T**_R', { dy: -18, size: 20 });
    f.text([TR[0] * 0.55, 0], '**T**_{Rx}', { dy: 18, size: 20 });
    f.text(TR, '**T**_{Ry}', { dx: 12, dy: 8, size: 20, anchor: 'start' });
    // Free-body diagram.
    const cx = 560;
    const cy = 165;
    svg.text(cx, 32, 'Free-body diagram', { size: 17, math: false });
    svg.arrow(cx, cy, cx - 110, cy, { color: FORCE, width: 3, head: 14 });
    svg.arrow(cx, cy, cx + 110, cy, { color: FORCE, width: 3, head: 14 });
    svg.arrow(cx, cy, cx, cy - 90, { color: FORCE, width: 3, head: 14 });
    svg.arrow(cx, cy, cx, cy - 45, { color: FORCE, width: 3, head: 14 });
    svg.arrow(cx, cy, cx, cy + 90, { color: FORCE, width: 3, head: 14 });
    svg.circle(cx, cy, 6, { fill: COLORS.blue });
    svg.text(cx + 10, cy - 82, '**T**_{Ly}', { size: 19, anchor: 'start' });
    svg.text(cx + 10, cy - 40, '**T**_{Ry}', { size: 19, anchor: 'start' });
    svg.text(cx - 60, cy + 22, '**T**_{Lx}', { size: 19 });
    svg.text(cx + 60, cy + 22, '**T**_{Rx}', { size: 19 });
    svg.text(cx - 10, cy + 60, '**W**', { size: 19, anchor: 'end' });
    svg.text(cx, cy + 135, '\\rm{net} F_x = 0;  \\rm{net} F_y = 0', { size: 18 });
    return svg.render();
  },

  // 4.6 Example — two perpendicular forces adding to 20 N at 35°
  Figure_04_06_04: () => {
    const svg = new Svg({
      width: 600,
      height: 260,
      title: 'Two perpendicular forces adding to Ftot = 20 N at 35°',
      desc: 'A right triangle: F1 along the base, F2 vertical, and their sum Ftot = 20 N along the hypotenuse at 35° above F1. A free-body diagram shows F1 to the right and F2 up.',
    });
    const f = new Frame(svg, { ox: 20, oy: 215, scale: 1 });
    const T = polar(300, 35);
    f.vec([0, 0], [T[0], 0], { color: FORCE, width: 3.5, head: 16 });
    f.vec([T[0], 0], T, { color: FORCE, width: 3.5, head: 16 });
    f.vec([0, 0], T, { color: FORCE, width: 4, head: 19 });
    f.rightAngle([T[0], 0], 180, 90, 22);
    f.angle([0, 0], 0, 35, 70, '35°', { labelR: 92 });
    f.text([T[0] / 2, 0], '**F**_1', { dy: 22, size: 20 });
    f.text([T[0], T[1] / 2], '**F**_2', { dx: 14, size: 20, anchor: 'start' });
    f.text(polar(150, 35), '**F**_\\rm{tot}', { dx: -14, dy: -20, size: 20, anchor: 'end' });
    svg.text(40, 35, 'F_\\rm{tot} = 20 \\rm{N}', { size: 20, anchor: 'start' });
    const cx = 455;
    const cy = 190;
    svg.text(cx + 30, 55, 'Free-body diagram', { size: 18, math: false });
    svg.arrow(cx, cy, cx + 115, cy, { color: COLORS.axis, width: 2, head: 13 });
    svg.arrow(cx, cy, cx, cy - 85, { color: COLORS.axis, width: 2, head: 13 });
    svg.circle(cx, cy, 5, { fill: FORCE });
    svg.text(cx + 70, cy + 22, '**F**_1', { size: 19 });
    svg.text(cx + 12, cy - 52, '**F**_2', { size: 19, anchor: 'start' });
    return svg.render();
  },

  // 5.3 — stretch versus applied force up to fracture
  Figure_05_03_01: () => {
    const svg = new Svg({
      width: 820,
      height: 640,
      title: 'Change in length versus applied force',
      desc: 'ΔL rises in proportion to F where Hooke’s law is obeyed, then curves; the material returns to its original length anywhere in the elastic region. Beyond that the deformation is permanent, and the curve rises steeply to the fracture point.',
    });
    const ox = 60;
    const oy = 450;
    svg.arrow(ox - 50, oy, 800, oy, { color: BLACK, width: 1.6, head: 13 });
    svg.arrow(ox, oy + 10, ox, 20, { color: BLACK, width: 1.6, head: 13 });
    svg.text(ox - 10, 22, 'ΔL', { size: 21, anchor: 'end' });
    svg.text(790, oy + 34, 'F', { size: 21 });
    const xHooke = 290;
    const xElastic = 555;
    const xFracture = 680;
    const curve = [
      [ox, oy],
      [xHooke, oy - 155],
      [350, oy - 205],
      [460, oy - 230],
      [xElastic, oy - 248],
      [625, oy - 290],
      [xFracture, oy - 420],
    ];
    svg.path(
      `M ${ox} ${oy} L ${xHooke} ${oy - 155} ${smoothPath(curve.slice(1)).replace(/^M [^C]+/, '')}`,
      { color: FORCE, width: 4 }
    );
    for (const [x, y] of [
      [xHooke, oy - 155],
      [xElastic, oy - 248],
      [xFracture, oy - 420],
    ]) {
      svg.line(x, y, x, oy, { color: BLACK, width: 1.2, dash: '6 4' });
    }
    svg.line(xHooke, oy, xHooke, oy + 60, { color: BLACK, width: 1.2 });
    svg.line(xElastic, oy, xElastic, oy + 140, { color: BLACK, width: 1.2 });
    svg.line(xFracture, oy, xFracture, oy + 90, { color: BLACK, width: 1.2 });
    svg.line(ox, oy, ox, oy + 110, { color: BLACK, width: 1.2 });
    svg.arrow(ox + 2, oy + 25, xHooke - 2, oy + 25, {
      color: BLACK,
      width: 1.3,
      head: 10,
      start: true,
    });
    svg.rect(ox + 45, oy + 10, 150, 54, { fill: '#ffffff' });
    svg.lines(ox + 117, oy + 26, ["Hooke's law", 'obeyed'], { size: 19, math: false });
    svg.arrow(ox + 2, oy + 105, xElastic - 2, oy + 105, {
      color: BLACK,
      width: 1.3,
      head: 10,
      start: true,
    });
    svg.rect(220, oy + 92, 150, 26, { fill: '#ffffff' });
    svg.text(295, oy + 105, 'Elastic region', { size: 19, math: false });
    svg.arrow(xElastic + 2, oy + 30, xFracture - 2, oy + 30, {
      color: BLACK,
      width: 1.3,
      head: 10,
      start: true,
    });
    svg.leader(xElastic + 70, oy + 95, xElastic + 62, oy + 34, { bend: 0.4 });
    svg.lines(xElastic + 8, oy + 122, ['Permanent', 'deformation'], {
      size: 19,
      math: false,
      anchor: 'start',
    });
    svg.leader(xFracture + 22, oy + 60, xFracture + 3, oy + 4, { bend: -0.4 });
    svg.text(xFracture + 14, oy + 75, 'Fracture', { size: 19, math: false, anchor: 'start' });
    return svg.render();
  },

  // 5.3 — stretch versus force for a tendon
  Figure_05_03_05: () => {
    const svg = new Svg({
      width: 560,
      height: 400,
      title: 'Stretch versus force for a mammalian tendon',
      desc: 'In the toe region the tendon stretches easily; in the linear region ΔL grows in proportion to F; in the failure region the curve peaks and falls as fibers tear.',
    });
    const ox = 58;
    const oy = 315;
    svg.line(ox, oy, 520, oy, { color: BLACK, width: 2 });
    svg.line(ox, oy, ox, 10, { color: BLACK, width: 2 });
    svg.text(ox - 10, 22, 'ΔL', { size: 20, anchor: 'end' });
    svg.text(525, 352, 'F', { size: 20 });
    const pts = [
      [ox, oy],
      [130, oy - 25],
      [196, oy - 52],
      [290, oy - 145],
      [370, oy - 233],
      [400, oy - 248],
      [460, oy - 175],
      [510, oy - 112],
      [540, oy - 115],
    ];
    svg.path(smoothPath(pts, 0.45), { color: BLACK, width: 3.5 });
    svg.line(196, oy - 52, 196, oy, { color: BLACK, width: 2.5, dash: '3 3' });
    svg.line(370, oy - 233, 370, oy, { color: BLACK, width: 2.5, dash: '3 3' });
    svg.lines(125, 348, ['Toe', 'region'], { size: 19, math: false, gap: 26 });
    svg.lines(282, 355, ['Linear', 'region'], { size: 19, math: false, gap: 26 });
    svg.lines(440, 348, ['Failure', 'region'], { size: 19, math: false, gap: 26 });
    return svg.render();
  },

  // 6.1 — rotation angle Δθ = Δs / r
  Figure_06_01_02: () => {
    const svg = new Svg({
      width: 420,
      height: 350,
      title: 'Rotation angle and arc length',
      desc: 'A circle of radius r centered at O. As the radius turns from OA to OB through the angle Δθ, a point on the circle moves along the arc Δs, so Δθ = Δs/r.',
    });
    const cx = 160;
    const cy = 185;
    const r = 155;
    const blue = '#3aa7dc';
    svg.circle(cx, cy, r, { fill: 'none', stroke: blue, width: 2 });
    const a1 = 20;
    const a2 = 75;
    const A = [cx + r * Math.cos(rad(a1)), cy - r * Math.sin(rad(a1))];
    const B = [cx + r * Math.cos(rad(a2)), cy - r * Math.sin(rad(a2))];
    svg.arc(cx, cy, r, a1, a2, { color: GREEN, width: 4.5 });
    svg.line(cx, cy, A[0], A[1], { color: blue, width: 2.5 });
    svg.line(cx, cy, B[0], B[1], { color: blue, width: 2.5 });
    svg.circle(cx, cy, 7, { fill: blue });
    svg.arc(cx, cy, 34, a1, a2, { color: BLACK });
    svg.text(cx + 52, cy - 44, 'Δθ', { size: 20 });
    svg.text(cx + 100, cy - 6, 'r', { size: 20 });
    svg.text(cx - 12, cy + 25, 'O', { size: 20, math: false, weight: 'bold' });
    svg.text(A[0] + 18, A[1] - 6, 'A', { size: 20, math: false, weight: 'bold' });
    svg.text(B[0] - 4, B[1] - 16, 'B', { size: 20, math: false, weight: 'bold' });
    svg.text(cx + r * Math.cos(rad(47)) + 22, cy - r * Math.sin(rad(47)) - 14, 'Δs', {
      size: 20,
    });
    svg.text(338, 265, 'Δθ =', { size: 20, anchor: 'end' });
    fraction(svg, 362, 265, 'Δs', 'r', { size: 20, width: 36 });
    return svg.render();
  },

  // 6.1 — the same angle at two radii
  Figure_06_01_03: () => {
    const svg = new Svg({
      width: 560,
      height: 560,
      title: 'The same rotation angle at two radii',
      desc: 'Points 1 and 2 lie at radii r1 and r2 on the same radius line. Turning through Δθ, point 1 moves along the arc Δs1 and point 2 along the longer arc Δs2, but Δθ = Δs1/r1 = Δs2/r2.',
    });
    const cx = 210;
    const cy = 340;
    const r2 = 205;
    const r1 = 100;
    const dth = 40;
    svg.circle(cx, cy, r2, { fill: 'none', stroke: '#7d3c98', width: 3 });
    svg.line(cx, cy, cx + r2, cy, { color: FORCE, width: 3 });
    svg.line(cx, cy, cx + r2 * Math.cos(rad(dth)), cy - r2 * Math.sin(rad(dth)), {
      color: FORCE,
      width: 3,
    });
    svg.arc(cx, cy, r1, 0, dth, { color: BLACK, width: 2 });
    svg.arc(cx, cy, r2, 0, dth, { color: BLACK, width: 3.5 });
    svg.circle(cx + r1, cy, 7, { fill: '#5fd0d8', stroke: '#2b8a91' });
    svg.circle(cx + r2, cy, 7, { fill: '#5fd0d8', stroke: '#2b8a91' });
    svg.text(cx + 50, cy - 20, 'Δθ', { size: 20 });
    svg.text(cx + r1 + 22, cy - 46, 'Δs_1', { size: 20 });
    svg.text(cx + r2 + 30, cy - 85, 'Δs_2', { size: 20 });
    svg.text(cx + r1 + 14, cy + 22, '1', { size: 20, math: false });
    svg.text(cx + r2 + 14, cy + 22, '2', { size: 20, math: false });
    svg.line(cx, cy + 6, cx, cy + 105, { color: BLACK, width: 1.2 });
    dimension(svg, cx, cx + r1, cy + 20, '', { tick: 0 });
    svg.rect(cx + r1 / 2 - 14, cy + 9, 28, 24, { fill: '#ffffff' });
    svg.text(cx + r1 / 2, cy + 20, 'r_1', { size: 19 });
    svg.line(cx + r2, cy + 6, cx + r2, cy + 105, { color: BLACK, width: 1.2 });
    dimension(svg, cx, cx + r2, cy + 90, '', { tick: 0 });
    svg.rect(cx + r2 / 2 - 14, cy + 79, 28, 24, { fill: '#ffffff' });
    svg.text(cx + r2 / 2, cy + 90, 'r_2', { size: 19 });
    svg.text(460, 55, 'Δθ =', { size: 20, anchor: 'end' });
    fraction(svg, 490, 55, 'Δs_1', 'r_1', { size: 20, width: 40 });
    svg.text(460, 150, 'Δθ =', { size: 20, anchor: 'end' });
    fraction(svg, 490, 150, 'Δs_2', 'r_2', { size: 20, width: 40 });
    return svg.render();
  },

  // 6.2 — the change in velocity for uniform circular motion
  Figure_06_02_01: () => {
    const svg = new Svg({
      width: 620,
      height: 760,
      title: 'Change in velocity for uniform circular motion',
      desc: 'A circle centered at A. In a time Δt the object moves from B to C through the angle Δθ; the chord BC is Δr and the arc is Δs. Velocities v1 at B and v2 at C are tangent to the circle and equal in magnitude. In the vector triangle PQR, Δv = v2 − v1, which points toward the center of the circle.',
    });
    const cx = 250;
    const cy = 500;
    const r = 245;
    const aB = 18;
    const aC = 76;
    svg.circle(cx, cy, r, { fill: 'none', stroke: BLACK, width: 2 });
    const B = [cx + r * Math.cos(rad(aB)), cy - r * Math.sin(rad(aB))];
    const C = [cx + r * Math.cos(rad(aC)), cy - r * Math.sin(rad(aC))];
    svg.polygon([[cx, cy], B, C], { fill: 'none', stroke: '#a01b3c', width: 3 });
    svg.circle(cx, cy, 7, { fill: BLACK });
    svg.arc(cx, cy, 40, aB, aC, { color: BLACK });
    svg.text(cx + 58, cy - 54, 'Δθ', { size: 21 });
    const v = 75;
    const tangent = a => [-Math.sin(rad(a)) * v, -Math.cos(rad(a)) * v];
    const [t1x, t1y] = tangent(aB);
    const [t2x, t2y] = tangent(aC);
    svg.arrow(B[0], B[1], B[0] + t1x, B[1] + t1y, { color: GREEN, width: 3.5, head: 16 });
    svg.arrow(C[0], C[1], C[0] + t2x, C[1] + t2y, { color: GREEN, width: 3.5, head: 16 });
    svg.text(B[0] + 26, B[1] - 55, '**v**_1', { size: 21 });
    svg.text(C[0] - 34, C[1] - 40, '**v**_2', { size: 21 });
    svg.text(cx - 6, cy + 38, 'A', { size: 21, math: false });
    svg.text(B[0] - 22, B[1] + 18, 'B', { size: 21, math: false });
    svg.text(C[0] - 30, C[1] + 16, 'C', { size: 21, math: false });
    svg.text((cx + B[0]) / 2 + 14, (cy + B[1]) / 2 + 26, 'r', { size: 21 });
    svg.text((cx + C[0]) / 2 - 22, (cy + C[1]) / 2, 'r', { size: 21 });
    svg.text((B[0] + C[0]) / 2 + 22, (B[1] + C[1]) / 2 + 2, 'Δr', { size: 21 });
    svg.text(cx + r * Math.cos(rad(47)) + 26, cy - r * Math.sin(rad(47)) - 14, 'Δs', {
      size: 21,
    });
    // Vector triangle: v1 from P to Q, v2 from P to R, Δv from Q to R.
    const P = [560, 195];
    const k = 2.1;
    const Q = [P[0] + t1x * k, P[1] + t1y * k];
    const R = [P[0] + t2x * k, P[1] + t2y * k];
    svg.arrow(P[0], P[1], Q[0], Q[1], { color: GREEN, width: 3.5, head: 17 });
    svg.arrow(P[0], P[1], R[0], R[1], { color: GREEN, width: 3.5, head: 17 });
    svg.arrow(Q[0], Q[1], R[0], R[1], { color: GREEN, width: 3.5, head: 17 });
    svg.text(P[0] + 14, P[1] + 22, 'P', { size: 21, math: false });
    svg.text(Q[0] + 4, Q[1] - 20, 'Q', { size: 21, math: false });
    svg.text(R[0] - 20, R[1] + 6, 'R', { size: 21, math: false });
    svg.text((P[0] + Q[0]) / 2 + 26, (P[1] + Q[1]) / 2, '**v**_1', { size: 21 });
    svg.text((P[0] + R[0]) / 2 - 8, (P[1] + R[1]) / 2 + 26, '**v**_2', { size: 21 });
    svg.text((Q[0] + R[0]) / 2 - 22, (Q[1] + R[1]) / 2 - 18, 'Δ**v**', { size: 21 });
    svg.text(190, 90, 'Δ**v** = **v**_2 − **v**_1', { size: 22 });
    return svg.render();
  },

  // 6.3 — a smaller radius needs a larger centripetal force at the same speed
  Figure_06_03_01: () => {
    const svg = new Svg({
      width: 560,
      height: 900,
      title: 'Friction supplies the centripetal force',
      desc: 'Top: a car on a curve of large radius r with velocity v tangent to the path; friction f points toward the center. Bottom: on a curve of smaller radius r′ at the same speed v, the centripetal force Fc must be larger. Since Fc = mac, f = Fc is parallel to ac.',
    });
    const turn = (cx, cy, r, fLen, labels) => {
      // Path: an arc from about −50° to 135°, traveled counterclockwise.
      svg.arc(cx, cy, r, -55, 140, { color: BLACK, width: 1.8 });
      const ap = 125;
      const ax = cx + r * Math.cos(rad(ap));
      const ay = cy - r * Math.sin(rad(ap));
      svg.arrow(ax + 6, ay + 4, ax - 2, ay - 1, { color: BLACK, width: 1.8, head: 11 });
      const a = 40;
      const px = cx + r * Math.cos(rad(a));
      const py = cy - r * Math.sin(rad(a));
      svg.circle(cx, cy, 6, { fill: '#5fd0d8', stroke: '#2b8a91' });
      svg.arrow(cx, cy, px, py, { color: MAROON, width: 5, head: 20 });
      svg.arrow(px, py, px - Math.sin(rad(a)) * 90, py - Math.cos(rad(a)) * 90, {
        color: GREEN,
        width: 3.5,
        head: 16,
      });
      const ux = Math.cos(rad(a));
      const uy = -Math.sin(rad(a));
      svg.arrow(px + ux * (fLen + 6), py + uy * (fLen + 6), px + ux * 6, py + uy * 6, {
        color: PINK,
        width: 5,
        head: 22,
      });
      labels(px, py, ux, uy);
    };
    turn(170, 300, 210, 130, (px, py, ux, uy) => {
      svg.text(70, 60, 'Path', { size: 20, math: false });
      svg.text(px - 40, py - 85, '**v**', { size: 20 });
      svg.text(170 + (px - 170) * 0.5 + 18, 300 + (py - 300) * 0.5 + 18, 'r', { size: 21 });
      svg.text(px + ux * 120 - 30, py + uy * 120 - 12, '**f**', { size: 24 });
      svg.text(px + ux * 75 + 18, py + uy * 75 + 4, 'large r', {
        size: 20,
        math: false,
        rotate: -50,
      });
    });
    svg.text(280, 455, '**f** = **F**_c is parallel to **a**_c since **F**_c = \\it{m}**a**_c', {
      size: 20,
      italic: false,
    });
    turn(170, 690, 120, 150, (px, py, ux, uy) => {
      svg.text(px - 40, py - 85, '**v**', { size: 20 });
      svg.text(170 + (px - 170) * 0.5 + 14, 690 + (py - 690) * 0.5 + 16, 'r′', { size: 21 });
      svg.text(px + ux * 85 - 26, py + uy * 85 - 30, 'large **F**_\\rm{c}', {
        size: 20,
        math: false,
        rotate: -50,
      });
      svg.lines(px + ux * 85 + 40, py + uy * 85 + 6, ['small r′', 'same **v**'], {
        size: 20,
        rotate: -50,
      });
    });
    return svg.render();
  },

  // 6.5 — gravitational attraction between two masses
  Figure_06_05_02: () => {
    const svg = new Svg({
      width: 700,
      height: 600,
      title: 'Gravitational attraction between two masses',
      desc: 'Masses m and M, a distance r apart between their centers of mass (CM), attract each other with forces F of equal magnitude pointing toward each other along the line between them.',
    });
    const m = [60, 520];
    const M = [640, 95];
    const ang = Math.atan2(M[1] - m[1], M[0] - m[0]);
    const ux = Math.cos(ang);
    const uy = Math.sin(ang);
    svg.circle(...m, 30, { fill: 'none', stroke: TEAL, width: 3 });
    svg.circle(...M, 55, { fill: 'none', stroke: TEAL, width: 3 });
    svg.circle(...m, 7, { fill: '#5fd0d8', stroke: '#2b8a91' });
    svg.circle(...M, 7, { fill: '#5fd0d8', stroke: '#2b8a91' });
    const len = Math.hypot(M[0] - m[0], M[1] - m[1]);
    const at = s => [m[0] + ux * s, m[1] + uy * s];
    // Forces drawn along the line, each pointing toward the other mass.
    svg.line(...at(0), ...at(len * 0.42), { color: PINK, width: 5 });
    svg.arrow(...at(len * 0.25), ...at(len * 0.38), { color: PINK, width: 5, head: 22 });
    svg.line(...at(len), ...at(len * 0.6), { color: PINK, width: 5 });
    svg.arrow(...at(len * 0.75), ...at(len * 0.62), { color: PINK, width: 5, head: 22 });
    svg.line(...at(len * 0.42), ...at(len * 0.6), { color: BLACK, width: 1.5, dash: '6 5' });
    // Dimension line r, offset above the line of centers.
    const nx = uy * 22;
    const ny = -ux * 22;
    svg.arrow(m[0] + nx, m[1] + ny, M[0] + nx, M[1] + ny, {
      color: BLACK,
      width: 1.4,
      head: 11,
      start: true,
    });
    svg.text((m[0] + M[0]) / 2 + nx * 1.6, (m[1] + M[1]) / 2 + ny * 1.6, 'r', { size: 24 });
    svg.text(m[0] + 115, m[1] - 25, '**F**', { size: 24 });
    svg.text(M[0] - 80, M[1] + 110, '**F**', { size: 24 });
    svg.text(m[0] - 18, m[1] - 50, 'm', { size: 24 });
    svg.text(M[0] - 15, M[1] - 75, 'M', { size: 24 });
    svg.text(m[0] + 20, m[1] + 68, 'CM', { size: 19, math: false });
    svg.leader(m[0] + 8, m[1] + 52, m[0] + 1, m[1] + 9, { bend: -0.5 });
    svg.text(M[0] + 10, M[1] + 110, 'CM', { size: 19, math: false });
    svg.leader(M[0] + 2, M[1] + 92, M[0] + 1, M[1] + 9, { bend: -0.5 });
    return svg.render();
  },

  // 6.6 — an ellipse and Kepler's first law
  Figure_06_06_01: () => {
    const svg = new Svg({
      width: 820,
      height: 1150,
      title: "An ellipse and Kepler's first law",
      desc: '(a) An ellipse with foci f1 and f2: for any point m on it, the sum of the distances to the two foci is the same, so it can be drawn with a pencil held taut against a loop of string pinned at the foci. (b) A planet of mass m follows an elliptical orbit with the Sun, of mass M, at one focus; r is the distance between their centers.',
    });
    const a = 305;
    const b = 210;
    const c = Math.sqrt(a * a - b * b) * 0.95;
    // (a)
    const cx = 395;
    const cy = 380;
    svg.arrow(35, cy, 800, cy, { color: BLACK, width: 1.5, head: 12 });
    svg.arrow(cx, 640, cx, 30, { color: BLACK, width: 1.5, head: 12 });
    svg.text(805, cy + 22, 'x', { size: 21, anchor: 'start' });
    svg.text(cx - 20, 30, 'y', { size: 21 });
    svg.ellipse(cx, cy, a, b, { stroke: BLACK, width: 3 });
    const F1 = [cx - c, cy];
    const F2 = [cx + c, cy];
    const mx = F2[0];
    const my = cy - b * Math.sqrt(1 - ((mx - cx) / a) ** 2);
    svg.polyline([F1, [mx, my], F2, F1], { color: TEAL, width: 3 });
    svg.circle(...F1, 7, { fill: BLACK });
    svg.circle(...F2, 7, { fill: BLACK });
    svg.text(F1[0], cy + 30, 'f_1', { size: 21 });
    svg.text(F2[0], cy + 30, 'f_2', { size: 21 });
    svg.text(F1[0] - 12, cy - 28, 'M', { size: 21 });
    svg.text(mx + 10, my - 16, 'm', { size: 21, anchor: 'start' });
    // A pencil touching the ellipse at m.
    const pang = rad(103);
    const tipX = mx - 2;
    const tipY = my - 6;
    const dx = Math.cos(pang);
    const dy = -Math.sin(pang);
    const L = 150;
    const w = 7;
    const nx = -dy * w;
    const ny = dx * w;
    const p1 = [tipX + dx * 22, tipY + dy * 22];
    const p2 = [tipX + dx * L, tipY + dy * L];
    svg.polygon(
      [
        [tipX, tipY],
        [p1[0] + nx, p1[1] + ny],
        [p1[0] - nx, p1[1] - ny],
      ],
      { fill: '#e8c48a', stroke: '#8a6a2c', width: 1 }
    );
    svg.polygon(
      [
        [p1[0] + nx, p1[1] + ny],
        [p2[0] + nx, p2[1] + ny],
        [p2[0] - nx, p2[1] - ny],
        [p1[0] - nx, p1[1] - ny],
      ],
      {
        fill: '#f2c94c',
        stroke: '#a07a1c',
        width: 1,
      }
    );
    svg.circle(p2[0], p2[1], w, { fill: '#f4a9a8', stroke: '#a07a1c', width: 1 });
    svg.text(30, 620, '(a)', { size: 18, math: false });
    // (b)
    const cy2 = 900;
    svg.line(35, cy2, 790, cy2, { color: BLACK, width: 1.5 });
    svg.ellipse(cx, cy2, a, b, { stroke: BLACK, width: 3 });
    const S = [cx - c, cy2];
    const spikes = [];
    for (let k = 0; k < 64; k += 1) {
      const rr = k % 2 ? 44 : 34;
      spikes.push([
        S[0] + rr * Math.cos((k * Math.PI) / 32),
        S[1] + rr * Math.sin((k * Math.PI) / 32),
      ]);
    }
    svg.polygon(spikes, { fill: '#d4a52a' });
    svg.circle(...S, 32, { fill: '#e6c376', stroke: '#c79b2e', width: 1.5 });
    svg.circle(...S, 6, { fill: '#a01b3c' });
    svg.circle(cx + c, cy2, 7, { fill: '#a01b3c' });
    const planetX = S[0];
    const planetY = cy2 - b * Math.sqrt(1 - ((planetX - cx) / a) ** 2);
    svg.circle(planetX, planetY, 18, { fill: '#5cc244', stroke: '#2e7d32', width: 2 });
    svg.line(planetX - 8, planetY, planetX + 8, planetY, { color: BLACK, width: 1.5 });
    svg.arrow(planetX, planetY + 2, planetX, cy2 - 3, { color: BLACK, width: 1.5, head: 12 });
    svg.text(planetX - 14, (planetY + cy2) / 2 - 18, 'r', { size: 21 });
    svg.text(planetX - 30, planetY - 6, 'Planet', { size: 18, math: false, anchor: 'end' });
    svg.text(planetX + 30, planetY - 20, 'm', { size: 21, anchor: 'start' });
    svg.text(S[0] + 50, cy2 - 42, 'M', { size: 21, anchor: 'start' });
    svg.text(S[0], cy2 + 26, 'f_1', { size: 21 });
    svg.text(cx + c, cy2 + 30, 'f_2', { size: 21 });
    svg.text(S[0] + 42, cy2 + 66, 'Sun', { size: 18, math: false });
    svg.text(30, 1130, '(b)', { size: 18, math: false });
    return svg.render();
  },

  // 6.6 — Kepler's second law: equal areas in equal times
  Figure_06_06_02: () => {
    const svg = new Svg({
      width: 760,
      height: 680,
      title: "Kepler's second law",
      desc: 'A planet of mass m moves on an ellipse around the Sun, of mass M, at one focus. The shaded regions A1 (from A to B), A2 (from C to D) and A3 (from E to F) are swept out in equal times and have equal areas: the arcs are long near the Sun and short far from it.',
    });
    const a = 318;
    const e = 0.44;
    const c = a * e;
    const b = a * Math.sqrt(1 - e * e);
    const cx = 372;
    const cy = 330;
    // Mirror of the standard parametrization so the Sun sits at the left focus.
    const at = E => [cx - a * Math.cos(E), cy - b * Math.sin(E)];
    const S = [cx - c, cy];
    const mean = E => E - e * Math.sin(E);
    const dM = 0.4;
    const sector = E0 => {
      const E1 = eccentricAnomaly(mean(E0) - dM, e);
      const pts = [S];
      for (let k = 0; k <= 40; k += 1) pts.push(at(E0 + ((E1 - E0) * k) / 40));
      svg.polygon(pts, { fill: '#c49a85' });
      return [at(E0), at(E1), at((E0 + E1) / 2)];
    };
    const [A, B, mid1] = sector(rad(-15));
    const [C, D, mid2] = sector(rad(-72));
    const [E, F, mid3] = sector(Math.PI);
    svg.line(cx, 10, cx, 650, { color: BLACK, width: 1.5, dash: '8 6' });
    svg.line(20, cy, 740, cy, { color: BLACK, width: 1.5, dash: '8 6' });
    svg.ellipse(cx, cy, a, b, { stroke: BLACK, width: 4 });
    svg.circle(cx + c, cy, 8, { fill: BLACK });
    svg.circle(...S, 36, { fill: '#e6c376', stroke: '#b8902a', width: 2 });
    svg.text(S[0], cy - 50, 'Sun', { size: 17, math: false });
    svg.text(S[0] + 52, cy + 30, 'M', { size: 23 });
    const label = (p, mid, name) => {
      const k = 0.62;
      svg.text(S[0] + (mid[0] - S[0]) * k, S[1] + (mid[1] - S[1]) * k, name, { size: 23 });
    };
    label(A, mid1, 'A_1');
    label(C, mid2, 'A_2');
    label(E, mid3, 'A_3');
    const out = (p, name, dx, dy) =>
      svg.text(p[0] + dx, p[1] + dy, name, { size: 22, math: false });
    out(A, 'A', -24, 10);
    out(B, 'B', -14, 24);
    out(C, 'C', -10, 28);
    out(D, 'D', 12, 26);
    out(E, 'E', 22, 4);
    out(F, 'F', 20, -14);
    const Pe = rad(58);
    const P = at(Pe);
    const tx = -a * Math.sin(Pe);
    const ty = b * Math.cos(Pe);
    const tl = Math.hypot(tx, ty);
    svg.arrow(P[0], P[1], P[0] + (tx / tl) * 190, P[1] + (ty / tl) * 190, {
      color: GREEN,
      width: 3.5,
      head: 20,
    });
    svg.circle(...P, 22, { fill: '#c9d3e6', stroke: '#5b6f99', width: 2 });
    svg.text(P[0] - 2, P[1] - 36, 'Planet', { size: 17, math: false });
    svg.text(P[0] + 40, P[1] + 20, 'm', { size: 23 });
    svg.text(P[0] - 150, P[1] + 30, '**v**', { size: 23 });
    return svg.render();
  },

  // 7.2 — work as the area under a graph of F cos θ versus d
  Figure_07_02_01: () => {
    const svg = new Svg({
      width: 840,
      height: 1240,
      title: 'Work as the area under a force graph',
      desc: '(a) For a constant force component F cos θ acting over a distance d, the work W = Fd cos θ is the area of the rectangle under the graph. (b) For a varying force, the distance is split into small pieces di; each contributes Wi = (F cos θ)i(ave) di, and the total work W = ΣWi is the total area under the curve.',
    });
    // (a)
    let ox = 120;
    let oy = 370;
    svg.arrow(ox, oy, 800, oy, { color: BLACK, width: 1.6, head: 12 });
    svg.arrow(ox, oy, ox, 20, { color: BLACK, width: 1.6, head: 12 });
    svg.text(ox - 10, 22, 'F cos θ', { size: 22, anchor: 'end' });
    svg.text(760, oy + 36, 'd', { size: 22 });
    const x1 = 210;
    const x2 = 490;
    const top = 162;
    svg.rect(x1, top, x2 - x1, oy - top, { fill: '#bcd5dd' });
    svg.line(x1, top, x2, top, { color: FORCE, width: 4 });
    svg.circle(x1, top, 6, { fill: BLACK });
    svg.circle(x2, top, 6, { fill: BLACK });
    svg.line(ox, top, x1, top, { color: BLACK, width: 1.2, dash: '5 4' });
    svg.line(x1, top, x1, oy + 55, { color: BLACK, width: 1.2, dash: '5 4' });
    svg.line(x2, top, x2, oy + 55, { color: BLACK, width: 1.2, dash: '5 4' });
    svg.text(ox - 10, top, 'F cos θ', { size: 22, anchor: 'end' });
    svg.arrow(x1 + 2, oy + 38, x2 - 2, oy + 38, {
      color: BLACK,
      width: 1.3,
      head: 12,
      start: true,
    });
    svg.rect((x1 + x2) / 2 - 16, oy + 26, 32, 24, { fill: '#ffffff' });
    svg.text((x1 + x2) / 2, oy + 38, 'd', { size: 22 });
    svg.text(545, 190, '\\rm{Area} = F cos θ × d', { size: 22, anchor: 'start' });
    svg.text(605, 236, '= Fd cos θ', { size: 22, anchor: 'start' });
    svg.text(605, 282, '= \\rm{work} = W', { size: 22, anchor: 'start' });
    svg.leader(595, 200, 420, 225, { bend: -0.35 });
    svg.text(420, 490, '(a)', { size: 20, math: false });
    // (b)
    ox = 145;
    oy = 1055;
    svg.arrow(ox, oy, 800, oy, { color: BLACK, width: 1.6, head: 12 });
    svg.arrow(ox, oy, ox, 640, { color: BLACK, width: 1.6, head: 12 });
    svg.text(ox - 10, 645, 'F cos θ', { size: 22, anchor: 'end' });
    svg.text(790, oy + 40, 'd', { size: 22 });
    const line = x => 965 - 0.42 * (x - 280);
    svg.line(280, line(280), 710, line(710), { color: BLACK, width: 3 });
    const w = 43;
    for (let k = 0; k < 6; k += 1) {
      const xa = 372 + k * w;
      const h = line(xa + w / 2);
      svg.rect(xa, h, w, oy - h, {
        fill: k === 0 ? '#bcd5dd' : '#ffffff',
        stroke: '#a01b3c',
        width: 3.5,
      });
    }
    svg.line(280, line(280), 710, line(710), { color: BLACK, width: 3 });
    svg.line(372, oy, 372, oy + 50, { color: BLACK, width: 1.2 });
    svg.line(415, oy, 415, oy + 50, { color: BLACK, width: 1.2 });
    svg.arrow(373, oy + 30, 414, oy + 30, { color: BLACK, width: 1.2, head: 8, start: true });
    svg.text(393, oy + 75, 'd_i', { size: 22 });
    svg.text(330, 815, 'W_i = (F cos θ)_{i (ave)}d_i', { size: 22 });
    svg.leader(300, 835, 392, 950, { bend: 0.3 });
    svg.text(820, 680, 'W = ΣW_i = \\rm{total area}', { size: 22, anchor: 'end' });
    svg.text(820, 712, '\\rm{under curve}', { size: 22, anchor: 'end' });
    svg.text(420, 1215, '(b)', { size: 20, math: false });
    return svg.render();
  },

  // 7.9 — world primary energy consumption by source, 2010–2050
  Figure_07_09_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 520,
      title: 'Global primary energy consumption by energy source, 2010–2050',
      desc: 'A stacked area chart in quadrillion British thermal units. Total use grows from about 540 in 2010 to about 600 in 2020 (history) and is projected to reach about 890 by 2050. Petroleum and other liquids, natural gas, coal and nuclear grow slowly; renewables grow fastest, from about 60 to about 235.',
    });
    // Cumulative tops of each layer (quadrillion Btu), read from the EIA chart.
    const years = [
      2010, 2012, 2014, 2016, 2018, 2019, 2020, 2021, 2025, 2030, 2035, 2040, 2045, 2050,
    ];
    const tops = {
      nuclear: [28, 26, 27, 28, 28, 29, 28, 30, 31, 32, 33, 33, 33, 33],
      coal: [185, 196, 199, 184, 193, 192, 183, 192, 190, 190, 196, 203, 208, 212],
      gas: [305, 320, 325, 316, 338, 342, 330, 340, 347, 356, 368, 380, 393, 405],
      oil: [483, 503, 512, 510, 535, 543, 513, 532, 556, 570, 590, 612, 633, 650],
      renew: [540, 568, 583, 588, 620, 633, 600, 625, 670, 705, 750, 800, 845, 887],
    };
    const layers = [
      ['renew', 'Renewables', '#5f9a32'],
      ['oil', 'Petroleum and other liquids', '#bd732a'],
      ['gas', 'Natural gas', '#0096d6'],
      ['coal', 'Coal', '#333333'],
      ['nuclear', 'Nuclear', '#a23340'],
    ];
    const g = new Plot(svg, {
      x: 80,
      y: 90,
      w: 690,
      h: 370,
      xRange: [2010, 2050],
      yRange: [0, 1000],
      xTicks: [2010, 2020, 2030, 2040, 2050],
      yTicks: [0, 200, 400, 600, 800, 1000],
      yFormat: v => v.toLocaleString('en-US'),
    });
    g.axes({ grid: true, size: 15 });
    const order = ['nuclear', 'coal', 'gas', 'oil', 'renew'];
    for (const [key, , color] of layers) {
      const below = order[order.indexOf(key) - 1];
      const upper = years.map((y, k) => g.P(y, tops[key][k]));
      const lower = years.map((y, k) => g.P(y, below ? tops[below][k] : 0)).reverse();
      svg.polygon([...upper, ...lower], { fill: color });
    }
    g.line(2020, 0, 2020, 1000, { color: BLACK, width: 1.8, dash: '6 4' });
    g.text(2019.3, 920, 'history', { size: 16, math: false, anchor: 'end' });
    g.text(2020.7, 920, 'projection', { size: 16, math: false, anchor: 'start' });
    const mid = key => {
      const k = years.length - 1;
      const below = order[order.indexOf(key) - 1];
      return (tops[key][k] + (below ? tops[below][k] : 0)) / 2;
    };
    for (const [key, name] of layers) {
      const y = g.Y(mid(key));
      if (key === 'oil')
        svg.lines(g.X(2050) + 10, y - 10, ['Petroleum and', 'other liquids'], {
          size: 15,
          math: false,
          anchor: 'start',
          gap: 20,
        });
      else svg.text(g.X(2050) + 10, y, name, { size: 15, math: false, anchor: 'start' });
    }
    svg.text(20, 30, 'Global primary energy consumption by energy source (2010–2050)', {
      size: 17,
      math: false,
      weight: 'bold',
      anchor: 'start',
    });
    svg.text(20, 55, 'quadrillion British thermal units', {
      size: 15,
      math: false,
      anchor: 'start',
    });
    return svg.render();
  },
};
