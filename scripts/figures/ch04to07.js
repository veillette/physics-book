/**
 * Chapters 4–7: force components, stress–strain curves, circular-motion and
 * gravitation geometry, Kepler's laws, work as an area, and world energy use.
 */
import {
  COLORS,
  Frame,
  Plot,
  Svg,
  fmt,
  localArrow,
  morph,
  pathThrough,
  rad,
  smilMotion,
  smoothPath,
  timedPath,
} from './svg.js';

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

/**
 * A smooth profile made of cubic Bézier segments [p0, c1, c2, p3], each running
 * left to right. `d` is its SVG path; `y(x)` and `slope(x)` read the curve at x
 * (degrees, screen y down), so labels and objects can sit exactly on it.
 */
function profile(segments) {
  const at = ([p0, c1, c2, p3], t, i) => {
    const u = 1 - t;
    return u * u * u * p0[i] + 3 * u * u * t * c1[i] + 3 * u * t * t * c2[i] + t * t * t * p3[i];
  };
  const find = x => {
    const seg = segments.find(s => x <= s[3][0]) || segments.at(-1);
    let [lo, hi] = [0, 1];
    for (let k = 0; k < 40; k += 1) {
      const mid = (lo + hi) / 2;
      if (at(seg, mid, 0) < x) lo = mid;
      else hi = mid;
    }
    return [seg, lo];
  };
  const y = x => {
    const [seg, t] = find(x);
    return at(seg, t, 1);
  };
  const d = segments
    .map(
      ([p0, c1, c2, p3], k) =>
        `${k ? '' : `M ${p0[0]} ${p0[1]} `}C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p3[0]} ${p3[1]}`
    )
    .join(' ');
  const slope = x => (Math.atan2(y(x + 1) - y(x - 1), 2) * 180) / Math.PI;
  return { d, y, slope };
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
    const tx = 135;
    const ty = tx * Math.tan(rad(tip));
    svg.text(cx, 32, 'Free-body diagram', { size: 17, math: false });
    svg.arrow(cx, cy, cx - tx, cy, { color: FORCE, width: 3, head: 14 });
    svg.arrow(cx, cy, cx + tx, cy, { color: FORCE, width: 3, head: 14 });
    // Separate the equal upward components so both remain visible.
    svg.arrow(cx - 7, cy, cx - 7, cy - ty, { color: FORCE, width: 3, head: 6 });
    svg.arrow(cx + 7, cy, cx + 7, cy - ty, { color: FORCE, width: 3, head: 6 });
    svg.arrow(cx, cy, cx, cy + 2 * ty, { color: FORCE, width: 3, head: 9 });
    svg.circle(cx, cy, 6, { fill: COLORS.blue });
    svg.text(cx - 16, cy - 45, '**T**_{Ly}', { size: 19, anchor: 'end' });
    svg.text(cx + 16, cy - 45, '**T**_{Ry}', { size: 19, anchor: 'start' });
    svg.line(cx - 20, cy - 32, cx - 7, cy - ty - 3, { width: 1 });
    svg.line(cx + 20, cy - 32, cx + 7, cy - ty - 3, { width: 1 });
    svg.text(cx - 60, cy + 22, '**T**_{Lx}', { size: 19 });
    svg.text(cx + 60, cy + 22, '**T**_{Rx}', { size: 19 });
    svg.text(cx + 12, cy + 2 * ty + 8, '**W**', { size: 19, anchor: 'start' });
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
    // Constant speed around the circle. Local +x is the tangent; local −y
    // points to the center for counterclockwise motion.
    const lap = [];
    for (let k = 0; k <= 72; k += 1) {
      const a = aB + (360 * k) / 72;
      lap.push([cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))]);
    }
    svg.motionGroup(
      `${smilMotion(pathThrough(lap), { dur: '8s', rotate: 'auto' })}<circle r="8" fill="${GREEN}" stroke="#ffffff" stroke-width="2"/>${localArrow(70, 0, GREEN, { width: 3.5, head: 14 })}${localArrow(0, -46, MAROON, { width: 3.5, head: 14 })}`
    );
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
    const c = Math.sqrt(a * a - b * b);
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
    // Equal mean-anomaly steps are equal times, so the planet is fastest at perihelion.
    // Decreasing anomaly follows the velocity arrow already drawn on the planet.
    const N = 72;
    const samples = [];
    const initialMean = mean(Pe);
    for (let k = 0; k <= N; k += 1) {
      samples.push(at(eccentricAnomaly(initialMean - (2 * Math.PI * k) / N, e)));
    }
    const speeds = [];
    for (let k = 0; k < N; k += 1) {
      speeds.push(Math.hypot(samples[k + 1][0] - samples[k][0], samples[k + 1][1] - samples[k][1]));
    }
    speeds.push(speeds[0]);
    const maxSpeed = Math.max(...speeds);
    const lengths = speeds.map(s => 80 + (s / maxSpeed) * 160);
    const orbit = timedPath(samples);
    const orbitDur = '14s';
    svg.motionGroup(
      `${smilMotion(orbit.path, { dur: orbitDur, rotate: 'auto', keyPoints: orbit.keyPoints, keyTimes: orbit.keyTimes })}<circle r="22" fill="#c9d3e6" stroke="#5b6f99" stroke-width="2"/>${localArrow(1, 0, GREEN, { lengths, dur: orbitDur, width: 4, head: 20 })}`
    );
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

  // 7.2 Example 1 — a package pushed along a roller belt
  Figure_07_02_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 305,
      title: 'A package pushed along a roller belt',
      desc: 'A 30.0 kg package rests on a row of rollers. An applied force Fapp = 120 N pushes it to the right and a friction force f = 5.00 N acts to the left. Its weight w points down and the normal force N points up, with equal magnitude. The package moves through a displacement d = 0.800 m to the right.',
    });
    const floor = 158;
    for (let x = 32; x < 960; x += 31.5) {
      svg.path(`M ${x - 14} ${floor} A 14 14 0 0 1 ${x + 14} ${floor} Z`, {
        color: '#2f6f73',
        width: 1.5,
        fill: '#7cc2bf',
      });
    }
    svg.line(15, floor, 985, floor, { color: BLACK, width: 2 });
    // The package: a box with envelope flaps and a strip of tape.
    const [bx, by, bw, bh] = [345, 6, 207, 138];
    svg.rect(bx, by, bw, bh, { fill: '#dcb563', stroke: '#a77f2b', width: 2 });
    svg.polyline(
      [
        [bx, by],
        [bx + 60, 86],
        [bx + bw - 60, 86],
        [bx + bw, by],
      ],
      { color: '#a77f2b', width: 2 }
    );
    svg.line(bx, by + bh, bx + 60, 94, { color: '#a77f2b', width: 2 });
    svg.line(bx + bw, by + bh, bx + bw - 60, 94, { color: '#a77f2b', width: 2 });
    svg.rect(bx + 70, 74, bw - 140, 30, { fill: '#ecd08f', stroke: '#c49a45', width: 1.5 });
    svg.text(bx + bw / 2, 32, 'm = 30.0 \\rm{kg}', { size: 24, halo: false });

    svg.arrow(0, 70, bx - 2, 70, { color: FORCE, width: 3.5, head: 20 });
    // Break marks: the 120 N arrow is not drawn to scale with f.
    for (const dx of [0, 9]) {
      svg.line(72 + dx, 86, 80 + dx, 54, { color: '#ffffff', width: 6 });
      svg.line(72 + dx, 86, 80 + dx, 54, { color: BLACK, width: 1.5 });
    }
    svg.text(105, 42, '**F**_{app} = 120 \\rm{N}', { size: 24, anchor: 'start' });
    svg.arrow(622, 70, bx + bw + 2, 70, { color: FORCE, width: 3.5, head: 20 });
    svg.text(572, 42, '**f** = 5.00 \\rm{N}', { size: 24, anchor: 'start' });
    svg.arrow(bx + bw, 108, 995, 108, { color: MAROON, width: 3, head: 18 });
    svg.text(730, 84, '**d** = 0.800 \\rm{m}', { size: 24, anchor: 'start' });
    svg.arrow(403, floor, 403, 258, { color: FORCE, width: 3.5, head: 20 });
    svg.arrow(493, 258, 493, floor, { color: FORCE_LIGHT, width: 3.5, head: 20 });
    svg.text(403, 286, '**w**', { size: 24 });
    svg.text(493, 286, '**N**', { size: 24 });
    return svg.render();
  },

  // 7.3 Example 3 — a roller coaster drops 25 m and finishes 20 m below the start
  Figure_07_03_04: () => {
    const svg = new Svg({
      width: 1020,
      height: 400,
      title: 'A roller coaster drop',
      desc: 'A roller coaster car starts from rest (v0 = 0) at the top of a hill. The track drops h = 25 m to its lowest point, then rises to a level finish h = 20 m below the start, where the speed v is unknown. Heights are drawn to scale.',
    });
    const top = 68;
    const scale = 10.4; // pixels per meter
    const bottom = top + 25 * scale;
    const finish = top + 20 * scale;
    const track = profile([
      [
        [0, 150],
        [55, 95],
        [100, top],
        [150, top],
      ],
      [
        [150, top],
        [260, top],
        [285, bottom],
        [390, bottom],
      ],
      [
        [390, bottom],
        [480, bottom],
        [520, finish],
        [600, finish],
      ],
      [
        [600, finish],
        [700, finish],
        [900, finish],
        [1020, finish],
      ],
    ]);
    // Wooden trestle: a lattice clipped to the region under the track.
    svg.add(
      `<defs><clipPath id="trestle-07-03-04"><path d="${track.d} L 1020 400 L 0 400 Z"/></clipPath></defs>`
    );
    svg.add('<g clip-path="url(#trestle-07-03-04)">');
    svg.rect(0, 0, 1020, 400, { fill: '#fbf1dc' });
    for (let x = 0; x <= 1020; x += 51) {
      svg.line(x, 0, x + 51, 51 * 8, { color: '#efdcb4', width: 3 });
      svg.line(x + 51, 0, x, 51 * 8, { color: '#efdcb4', width: 3 });
      svg.line(x, 0, x, 400, { color: '#e3c88f', width: 5 });
    }
    for (let y = 100; y <= 400; y += 52) svg.line(0, y, 1020, y, { color: '#e3c88f', width: 5 });
    svg.add('</g>');
    svg.path(track.d, { color: BLACK, width: 10 });
    svg.path(track.d, { color: '#3f9a2b', width: 5 });
    // The car, drawn about the middle of its wheelbase on the track.
    const car = () => {
      svg.rect(-27, -30, 54, 22, { fill: '#f2a7a0', stroke: '#b5544b', width: 2, rx: 8 });
      svg.circle(-15, -7, 6, { fill: '#555555' });
      svg.circle(15, -7, 6, { fill: '#555555' });
    };
    // The car at the start, sitting on the crest.
    svg.still(() => {
      svg.add(`<g transform="translate(151 ${top})">`);
      car();
      svg.add('</g>');
    });
    // Animation: after a moment at rest, the car rolls off the crest with
    // v = √(2g Δh) in real time at the drawn scale, from a nudge of 2 m/s, and
    // leaves at the right edge. Samples are equal times apart.
    const g = 9.8;
    const nudge = 2;
    const [hold, dt] = [0.8, 0.04];
    const xs = [];
    for (let x = 151; x <= 1080; x += 1) xs.push(x);
    const ys = xs.map(x => (x > 1020 ? finish : track.y(x)));
    const ts = [0];
    for (let k = 1; k < xs.length; k += 1) {
      const ds = Math.hypot(xs[k] - xs[k - 1], ys[k] - ys[k - 1]) / scale;
      const v = Math.sqrt(nudge ** 2 + (2 * g * ((ys[k] + ys[k - 1]) / 2 - top)) / scale);
      ts.push(ts[k - 1] + ds / v);
    }
    const ride = Array.from({ length: Math.round(hold / dt) }, () => [xs[0], ys[0]]);
    for (let t = 0, k = 0; t < ts.at(-1); t += dt) {
      while (ts[k + 1] < t) k += 1;
      const u = (t - ts[k]) / (ts[k + 1] - ts[k]);
      ride.push([xs[k] + (xs[k + 1] - xs[k]) * u, ys[k] + (ys[k + 1] - ys[k]) * u]);
    }
    ride.push([xs.at(-1), ys.at(-1)]);
    const run = timedPath(ride);
    const runDur = `${fmt(dt * (ride.length - 1))}s`;
    svg.motionGroup(
      `<g>${smilMotion(run.path, { dur: runDur, rotate: 'auto', keyPoints: run.keyPoints, keyTimes: run.keyTimes })}${svg.capture(car)}</g>`
    );
    svg.text(151, 18, 'Start', { size: 22, math: false });
    svg.text(200, top - 16, 'v_0 = 0', { size: 22, anchor: 'start' });

    svg.line(190, top, 1020, top, { color: BLACK, width: 1.5, dash: '6 5' });
    svg.vdimension(390, top, bottom - 4, 'h = 25 \\rm{m}', { size: 24 });
    svg.vdimension(815, top, finish - 4, 'h = 20 \\rm{m}', { size: 24 });
    svg.text(962, finish - 62, 'Finish', { size: 22, math: false });
    svg.text(962, finish - 32, 'v = ?', { size: 22 });
    return svg.render();
  },

  // 7.4 — the work to stretch a spring is the area under F = kx
  Figure_07_04_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 290,
      title: 'Potential energy stored in a stretched spring',
      desc: '(a) An undeformed spring attached to a wall stores no potential energy. (b) The spring stretched a distance x from its unstretched position 0 by a force F = kx; the work done is W = ½kx², stored as PEs = ½kx². (c) A graph of F versus x is a straight line through the origin with slope k. The area under it from 0 to x is a triangle with base x and height kx, so Area = ½kx².',
    });
    const WALL = { fill: '#f8d3d6', stroke: '#de9aa2', width: 1.5 };
    const end = { fill: '#9ccc65', stroke: '#558b2f', width: 1.5 };
    const guide = { color: BLACK, width: 1.3, dash: '5 4' };
    const wall = x => [
      [x, 55],
      [x + 55, 55],
      [x + 55, 190],
      [x + 335, 190],
      [x + 335, 225],
      [x, 225],
    ];
    const relaxed = 107; // unstretched spring length, pixels
    const stretch = 53;
    // (a)
    svg.polygon(wall(10), WALL);
    svg.line(65, 105, 75, 105, { color: '#333333', width: 2.2 });
    svg.spring(75, 65 + relaxed - 10, 105, { n: 10, r: 12 });
    svg.line(65 + relaxed - 10, 105, 65 + relaxed, 105, { color: '#333333', width: 2.2 });
    svg.circle(65 + relaxed + 4, 105, 6, end);
    svg.line(65 + relaxed + 4, 112, 65 + relaxed + 4, 190, guide);
    svg.text(175, 268, '(a)', { size: 20, math: false });
    // (b)
    const x0 = 410 + relaxed + 4;
    const x1 = x0 + stretch;
    svg.polygon(wall(355), WALL);
    svg.line(410, 68, 420, 68, { color: '#333333', width: 2.2 });
    // Animation: the spring stretches steadily from 0 to x, while in (c) the
    // area under F = kx fills in up to the same point; then it relaxes.
    const T = 7;
    const stretches = [0, 0, stretch, stretch, 0];
    const timing = { dur: `${T}s`, keyTimes: [0, 0.6, 3.4, 5.6, T].map(t => t / T) };
    svg.animated(
      s => {
        const xs = x0 + s;
        svg.spring(420, xs - 14, 68, { n: 10, r: 12 });
        svg.line(xs - 14, 68, xs - 4, 68, { color: '#333333', width: 2.2 });
        svg.circle(xs, 68, 6, end);
        svg.line(xs, 75, xs, 225, guide);
      },
      stretches,
      { still: 2, ...timing }
    );
    svg.line(x0, 190, x0, 225, guide);
    svg.arrow(x0 + 1, 202, x1 - 1, 202, { color: BLACK, width: 1.3, head: 9, start: true });
    svg.rect((x0 + x1) / 2 - 9, 192, 18, 20, { fill: WALL.fill });
    svg.text((x0 + x1) / 2, 202, 'x', { size: 20 });
    svg.text(x0, 242, '0', { size: 20, math: false });
    svg.text(x1, 242, 'x', { size: 20 });
    svg.text(612, 48, 'F = kx', { size: 22, anchor: 'start' });
    svg.arrow(612, 74, 665, 74, { color: BLACK, width: 1.5, head: 10 });
    svg.text(636, 118, 'W =', { size: 22, anchor: 'end' });
    fraction(svg, 652, 118, '1', '2', { size: 16, width: 14 });
    svg.text(664, 118, 'kx^2', { size: 22, anchor: 'start' });
    svg.text(636, 162, '\\rm{PE}_s =', { size: 22, anchor: 'end' });
    fraction(svg, 652, 162, '1', '2', { size: 16, width: 14 });
    svg.text(664, 162, 'kx^2', { size: 22, anchor: 'start' });
    svg.text(522, 268, '(b)', { size: 20, math: false });
    // (c)
    const O = [735, 215];
    const k = 0.787; // slope of the line in pixels
    const X = 905;
    const Y = O[1] - k * (X - O[0]);
    const reach = s => O[0] + ((X - O[0]) * s) / stretch;
    svg.animated(
      s => {
        const Xs = reach(s);
        svg.polygon(
          [
            [O[0], O[1]],
            [Xs, O[1]],
            [Xs, O[1] - k * (Xs - O[0])],
          ],
          { fill: '#b9dde2' }
        );
      },
      stretches,
      { still: 2, ...timing }
    );
    svg.arrow(O[0], O[1], 985, O[1], { color: BLACK, width: 1.5, head: 12 });
    svg.arrow(O[0], O[1], O[0], 8, { color: BLACK, width: 1.5, head: 12 });
    svg.line(...O, 972, O[1] - k * (972 - O[0]), { color: '#a01b3c', width: 4 });
    svg.line(X, Y, X, O[1], { color: '#2b8a99', width: 2.5, dash: '7 4' });
    svg.motionGroup(
      morph(
        stretches.map(s =>
          svg.capture(() =>
            svg.circle(reach(s), O[1] - k * (reach(s) - O[0]), 6, {
              fill: '#a01b3c',
              stroke: '#ffffff',
              width: 2,
            })
          )
        ),
        timing
      )
    );
    svg.vdimension(927, Y, O[1], '', { tick: 16 });
    svg.text(948, (Y + O[1]) / 2, 'kx', { size: 22 });
    svg.line(O[0], O[1] + 6, O[0], O[1] + 30, { color: BLACK, width: 1.3 });
    svg.line(X, O[1] + 6, X, O[1] + 30, { color: BLACK, width: 1.3 });
    svg.arrow(O[0] + 1, O[1] + 22, X - 1, O[1] + 22, {
      color: BLACK,
      width: 1.3,
      head: 10,
      start: true,
    });
    svg.text((O[0] + X) / 2, O[1] + 22, 'x', { size: 22 });
    svg.text(O[0] - 14, 18, 'F', { size: 22 });
    svg.text(990, O[1] + 22, 'x', { size: 22 });
    svg.text(822, 44, '\\rm{Slope} = k', { size: 21, anchor: 'start' });
    svg.leader(870, 58, X - 4, Y + 2, { bend: -0.3 });
    svg.text(778, 198, '\\rm{Area} =', { size: 19, anchor: 'start', halo: false });
    fraction(svg, 850, 198, '1', '2', { size: 14, width: 12 });
    svg.text(859, 198, 'kx^2', { size: 19, anchor: 'start', halo: false });
    svg.text(870, 270, '(c)', { size: 20, math: false });
    return svg.render();
  },

  // 7.4 Example 1 — a spring-launched toy car; either path gives the same final speed
  Figure_07_04_03: () => {
    const svg = new Svg({
      width: 1030,
      height: 262,
      title: 'A spring-launched toy car on two possible paths',
      desc: 'A compressed spring launches a toy race car to the right along a level track. The path of the car curves gently upward and levels off h = 18 cm above its starting level. An alternate path first dips down, goes around a vertical loop, and then climbs to the same level, 18 cm above the start.',
    });
    const base = 93;
    const high = 18;
    const PURPLE = '#7b4fa0';
    const path = profile([
      [
        [430, base],
        [650, base],
        [700, high],
        [880, high],
      ],
    ]);
    const C = [580, 172];
    const R = 78;
    svg.line(430, base, 1015, base, { color: BLACK, width: 1.4, dash: '6 5' });
    svg.path(
      `M 250 ${base} C 380 ${base} 470 ${C[1] + R} ${C[0]} ${C[1] + R} C 700 ${C[1] + R} 780 ${high} 880 ${high} L 900 ${high}`,
      { color: TEAL, width: 3 }
    );
    svg.circle(...C, R, { fill: 'none', stroke: TEAL, width: 3 });
    svg.arrow(890, high, 925, high, { color: TEAL, width: 3, head: 16 });
    svg.line(0, base, 430, base, { color: PURPLE, width: 3 });
    svg.path(path.d, { color: PURPLE, width: 3 });
    svg.arrow(880, high, 1015, high, { color: PURPLE, width: 3, head: 16 });

    // The compressed spring and its end plate.
    svg.spring(4, 100, 70, { n: 7, r: 22, width: 2.5 });
    svg.ellipse(108, 70, 6, 24, { stroke: '#555555', width: 2.5, fill: '#dddddd' });
    // The race car.
    svg.path(
      `M 124 ${base - 6} L 126 74 Q 140 64 172 65 L 190 58 Q 204 50 214 61 L 246 68 Q 259 73 258 ${base - 6} Z`,
      { color: '#8c1530', width: 2, fill: '#e2264d' }
    );
    svg.circle(197, 74, 9, { fill: '#f5e04a', stroke: '#8c1530', width: 1.5 });
    for (const wx of [158, 230]) {
      svg.circle(wx, base - 8, 9, { fill: '#333333' });
      svg.circle(wx, base - 8, 3.5, { fill: '#cccccc' });
    }

    const h = 965;
    svg.vdimension(h, high, base, '');
    svg.text(950, 55, 'h = 18 \\rm{cm}', { size: 21, anchor: 'end' });
    svg.text(495, 22, 'Path of the Car', { size: 19, math: false });
    svg.squiggle(565, 40, 600, path.y(600) - 3, { waves: 1, amp: 5 });
    svg.text(370, 203, 'Alternate path', { size: 19, math: false, anchor: 'end' });
    svg.squiggle(380, 205, 461, 202, { waves: 1, amp: 5 });
    return svg.render();
  },

  // 7.6 Example 2 — a car coasting with friction stops at a gas station
  Figure_07_06_02: () => {
    const svg = new Svg({
      width: 1040,
      height: 450,
      title: 'A car coasting over hilly terrain',
      desc: 'A car experiencing non-negligible friction coasts down a hill, up over a small crest, down a second hill, and comes to a stop at a gas pump on the level ground at the bottom. Arrows mark each stage: coasts down hill, coasts up over crest, coasts down hill, stops for gasoline.',
    });
    const road = profile([
      [
        [5, 178],
        [120, 225],
        [180, 272],
        [240, 276],
      ],
      [
        [240, 276],
        [285, 279],
        [300, 262],
        [335, 258],
      ],
      [
        [335, 258],
        [385, 252],
        [420, 268],
        [470, 292],
      ],
      [
        [470, 292],
        [600, 350],
        [690, 398],
        [780, 407],
      ],
      [
        [780, 407],
        [860, 415],
        [920, 413],
        [1035, 413],
      ],
    ]);
    svg.add(
      '<defs><linearGradient id="ground-07-06-02" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcc4a3"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>'
    );
    svg.path(`${road.d} L 1035 450 L 5 450 Z`, { color: 'none', fill: 'url(#ground-07-06-02)' });
    svg.path(road.d, { color: '#9b7653', width: 16 });
    svg.add(`<g transform="translate(0 -3)">`);
    svg.path(road.d, { color: '#c8c8c8', width: 10 });
    svg.add('</g>');

    // The car, tilted to the slope, on the second downhill stretch.
    const cx = 545;
    svg.add(
      `<g transform="translate(${cx} ${road.y(cx) - 8}) rotate(${road.slope(cx).toFixed(1)})">`
    );
    svg.path(
      'M -56 -8 L -56 -26 Q -50 -32 -32 -32 L -18 -50 L 22 -50 L 40 -32 Q 54 -31 58 -22 L 58 -8 Z',
      {
        color: '#2b8a99',
        width: 2,
        fill: '#5bc8d6',
      }
    );
    svg.polygon(
      [
        [-14, -46],
        [0, -46],
        [0, -33],
        [-25, -33],
      ],
      { fill: '#d8f1f5' }
    );
    svg.polygon(
      [
        [5, -46],
        [20, -46],
        [33, -33],
        [5, -33],
      ],
      { fill: '#d8f1f5' }
    );
    for (const wx of [-32, 34]) {
      svg.circle(wx, -8, 10, { fill: '#333333' });
      svg.circle(wx, -8, 4, { fill: '#cccccc' });
    }
    svg.add('</g>');

    // The gas pump on its island.
    const gy = road.y(955) - 6;
    svg.rect(918, gy - 6, 115, 8, { fill: '#a0a0a0' });
    svg.rect(938, gy - 56, 34, 50, { fill: '#f2c14e', stroke: '#b3862a', width: 2, rx: 4 });
    svg.rect(941, gy - 70, 28, 18, { fill: '#1f4e79', stroke: '#173a5a', width: 1.5, rx: 3 });
    svg.line(946, gy - 61, 964, gy - 61, { color: '#ffffff', width: 2 });
    svg.path(`M 972 ${gy - 44} Q 990 ${gy - 44} 985 ${gy - 18}`, { color: '#333333', width: 2.5 });

    const marks = [
      [78, ['Coasts Down', 'Hill'], 20],
      [312, ['Coasts Up', 'Over Crest'], 22],
      [cx + 5, ['Coasts Down', 'Hill'], 72],
      [955, ['Stops for', 'Gasoline'], 82],
    ];
    for (const [x, words, gap] of marks) {
      const tip = (x === 955 ? gy - 74 : x === cx + 5 ? road.y(x) - 58 : road.y(x)) - gap;
      const top = tip - 95;
      svg.lines(x, top - 52, words, { size: 21, math: false, gap: 25 });
      svg.arrow(x, top, x, tip, { color: BLACK, width: 2.2, head: 16 });
    }
    return svg.render();
  },

  // 7.8 — where the energy in food goes
  Figure_07_08_01: () => {
    const svg = new Svg({
      width: 1030,
      height: 640,
      title: 'Energy conversion in humans',
      desc: 'Food energy, the initial other energy OEi, branches into three forms: work, which is nonconservative work Wnc and is negative; thermal energy; and stored fat. Arrows are schematic; their widths do not represent energy fractions. Thermal energy and stored fat together make up the final other energy OEf. So OEi + Wnc = OEf.',
    });
    const box = (x, y, w, h, fill, stroke, lines) => {
      svg.rect(x, y, w, h, { fill, stroke, width: 2.5 });
      const gap = 52;
      svg.lines(x + w / 2, y + h / 2 - ((lines.length - 1) * gap) / 2, lines, {
        size: 40,
        math: false,
        gap,
        halo: false,
      });
    };
    box(5, 185, 245, 155, '#aebbd8', '#6e8fc7', ['Food', 'energy']);
    box(415, 4, 250, 156, '#c7dea0', '#8fc153', ['Work']);
    box(415, 184, 250, 157, '#f4a687', '#e5845d', ['Thermal', 'energy']);
    box(415, 365, 250, 155, '#e9c5b0', '#d4a58a', ['Stored', 'fat']);

    // Three thick branches from the food box, each ending in an arrowhead.
    const GOLD = '#b8941f';
    const head = (x, y) =>
      svg.polygon(
        [
          [x, y - 40],
          [x + 44, y],
          [x, y + 40],
        ],
        { fill: GOLD }
      );
    svg.path('M 248 262 C 320 262 300 82 372 82', { color: GOLD, width: 36 });
    svg.path('M 248 262 L 372 262', { color: GOLD, width: 36 });
    svg.path('M 248 262 C 320 262 300 443 372 443', { color: GOLD, width: 36 });
    head(370, 82);
    head(370, 262);
    head(370, 443);

    svg.text(125, 130, 'OE_i', { size: 40, math: false });
    svg.text(678, 70, '\\it{W}_{nc} (negative)', { size: 38, math: false, anchor: 'start' });
    // A brace grouping thermal energy and stored fat.
    const [bx, y1, y2, depth] = [695, 184, 520, 70];
    const m = (y1 + y2) / 2;
    const q = depth / 2;
    svg.path(
      [
        `M ${bx} ${y1}`,
        `Q ${bx + q} ${y1} ${bx + q} ${y1 + q * 2}`,
        `L ${bx + q} ${m - q * 2}`,
        `Q ${bx + q} ${m} ${bx + depth} ${m}`,
        `Q ${bx + q} ${m} ${bx + q} ${m + q * 2}`,
        `L ${bx + q} ${y2 - q * 2}`,
        `Q ${bx + q} ${y2} ${bx} ${y2}`,
      ].join(' '),
      { color: BLACK, width: 2.5 }
    );
    svg.text(bx + depth + 10, m, 'OE_f', { size: 40, math: false, anchor: 'start' });
    svg.text(515, 551, 'Arrows are schematic; widths do not represent energy fractions.', {
      size: 25,
      math: false,
    });
    svg.text(350, 595, 'OE_i + \\it{W}_{nc} = OE_f', { size: 40, math: false });
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
