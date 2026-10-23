/**
 * Chapters 4–7: force components, stress–strain curves, circular-motion and
 * gravitation geometry, Kepler's laws, and work as an area.
 */
import {
  COLORS,
  Frame,
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

// Rear-view car geometry for the chapter 6 redraws. The local baseline is the
// tire contact line, so rotating the whole drawing keeps both tires on the road.
function rearCar6(svg, x, y, angle, color) {
  const c = Math.cos(rad(angle)),
    s = Math.sin(rad(angle));
  const p = (dx, dy) => [x + dx * c - dy * s, y + dx * s + dy * c];
  const poly = (points, options) =>
    svg.polygon(
      points.map(([dx, dy]) => p(dx, dy)),
      options
    );
  for (const dx of [-53, 53])
    poly(
      [
        [dx - 13, -35],
        [dx + 13, -35],
        [dx + 13, 0],
        [dx - 13, 0],
      ],
      { fill: '#303030', stroke: BLACK, width: 1.5 }
    );
  poly(
    [
      [-70, -23],
      [70, -23],
      [65, -65],
      [43, -100],
      [-43, -100],
      [-65, -65],
    ],
    { fill: color, stroke: BLACK, width: 2 }
  );
  poly(
    [
      [-48, -65],
      [48, -65],
      [34, -89],
      [-34, -89],
    ],
    { fill: '#c1dce8', stroke: BLACK, width: 1.2 }
  );
  svg.line(...p(0, -88), ...p(0, -65), { color: BLACK, width: 1.2 });
  for (const dx of [-55, 43])
    poly(
      [
        [dx, -53],
        [dx + 12, -53],
        [dx + 12, -35],
        [dx, -35],
      ],
      { fill: '#f4ad93', stroke: BLACK, width: 1 }
    );
  poly(
    [
      [-67, -30],
      [67, -30],
      [67, -22],
      [-67, -22],
    ],
    { fill: '#cccccc', stroke: BLACK, width: 1 }
  );
  poly(
    [
      [-15, -48],
      [15, -48],
      [15, -34],
      [-15, -34],
    ],
    { fill: '#f5e3bc', stroke: BLACK, width: 1 }
  );
}

function group6(svg, id, draw) {
  svg.add(`<g id="${id}">`);
  draw();
  svg.add('</g>');
}

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

  // 5.1 — crate with friction on rough surface
  Figure_05_01_01: () => {
    const svg = new Svg({
      width: 740,
      height: 430,
      title: 'Friction between crate and surface',
      desc: 'A crate moves or attempts to move right, while friction acts left at the contact surface. A magnified inset shows rough upper and lower surfaces touching at their peaks.',
    });
    const surfaceY = 350;
    svg.line(25, surfaceY, 710, surfaceY, { color: '#4a7c5a', width: 6 });
    svg.rect(140, 210, 180, 140, { fill: '#c89550', stroke: BLACK, width: 2.5 });
    for (let i = 1; i < 7; i++) {
      svg.line(150, 210 + i * 20, 310, 210 + i * 20, { color: '#8b6f3f', width: 1.2 });
    }
    svg.arrow(160, 175, 320, 175, { color: BLACK, width: 2.5, head: 14 });
    svg.lines(240, 130, ['Direction of motion', 'or attempted motion'], {
      size: 17,
      math: false,
      gap: 21,
    });
    svg.arrow(170, surfaceY - 5, 65, surfaceY - 5, { color: FORCE, width: 3.5, head: 14 });
    svg.text(102, surfaceY - 27, '**f**', { size: 23, color: FORCE });

    // The entire inset, including its stroke, lies inside the viewBox.
    const cx = 545;
    const cy = 140;
    svg.circle(cx, cy, 100, { fill: '#ffffff', stroke: BLACK, width: 2 });
    svg.circle(cx, cy, 104, { fill: 'none', stroke: BLACK, width: 1.2 });
    const upper = [];
    const lower = [];
    for (let i = 0; i < 7; i++) {
      const x = cx - 70 + i * 20;
      // Both surfaces meet at y = cy, but otherwise leave gaps.
      upper.push([x, cy - 15 - 5 * Math.sin(i)], [x + 10, cy]);
      lower.push([x, cy + 14 + 5 * Math.cos(i)], [x + 10, cy]);
    }
    svg.polygon([[cx - 70, cy - 45], [cx + 70, cy - 45], ...upper.slice().reverse()], {
      fill: '#c89550',
      stroke: BLACK,
      width: 1.5,
    });
    svg.polygon([...lower, [cx + 70, cy + 45], [cx - 70, cy + 45]], {
      fill: '#4a7c5a',
      stroke: BLACK,
      width: 1.5,
    });
    // A connector identifies the actual crate/surface interface, without a misleading arrowhead.
    svg.circle(316, surfaceY - 3, 11, { fill: 'none', stroke: BLACK, width: 1.5 });
    svg.line(325, surfaceY - 10, cx - 70, cy + 75, { color: BLACK, width: 1.3, dash: '5 4' });
    svg.text(cx, 19, 'Magnified contact', { size: 17, math: false });
    return svg.render();
  },

  // 5.1 — skier on a 25° slope, with x downhill and y outward
  Figure_05_01_03: () => {
    const svg = new Svg({
      width: 950,
      height: 470,
      title: 'Skier on slope with force components',
      desc: 'A skier descends left down a 25° slope. Weight w points vertically down, normal force N points outward, and friction f points uphill. Dashed weight components w perpendicular and w parallel sum to w. The x axis points downhill and the y axis outward. The free-body diagram repeats the same three forces; N and w share one scale, and the 45 N friction is enlarged so it stays visible.',
    });
    const angle = 25;
    const theta = rad(angle);
    const origin = [355, 396 - (355 - 30) * Math.tan(theta)];
    const downhill = [-Math.cos(theta), Math.sin(theta)];
    const outward = [-Math.sin(theta), -Math.cos(theta)];
    // N and w share one scale. The example's 45 N friction would be a 13 px stub
    // at that scale (w = 608 N), so it is drawn enlarged, as in the original art.
    const weight = 170;
    const w = [0, weight];
    const N = outward.map(v => v * weight * Math.cos(theta));
    const friction = downhill.map(v => -v * 48);
    const uphill = downhill.map(v => -v);
    const wPerp = N.map(v => -v);
    const wPar = downhill.map(v => v * weight * Math.sin(theta));

    svg.polygon(
      [
        [30, 396],
        [550, 396 - 520 * Math.tan(theta)],
        [550, 396],
      ],
      {
        fill: '#edf5ee',
        stroke: '#4a7c5a',
        width: 2.5,
      }
    );
    svg.arc(30, 396, 62, 0, angle, { color: BLACK });
    svg.text(112, 377, '25°', { size: 18 });
    const axes = [142, 243];
    for (const [v, label, length, offset] of [
      [downhill, 'x', 75, [-12, 9]],
      [outward, 'y', 75, [-8, -14]],
    ]) {
      const end = add(
        axes,
        v.map(a => a * length)
      );
      svg.arrow(...axes, ...end, { color: BLACK, width: 1.8, head: 10 });
      svg.text(...add(end, offset), label, { size: 20 });
    }

    // Bent knees, arms, helmet, pole, and two skis keep the skier recognizable.
    const [sx, sy] = origin;
    svg.line(sx - 67, sy + 67 * Math.tan(theta), sx + 70, sy - 70 * Math.tan(theta), {
      color: '#277e9e',
      width: 5,
    });
    svg.line(sx - 57, sy + 57 * Math.tan(theta) + 7, sx + 76, sy - 76 * Math.tan(theta) + 7, {
      color: '#277e9e',
      width: 4,
    });
    svg.polyline(
      [
        [sx + 20, sy - 50],
        [sx + 32, sy - 28],
        [sx, sy],
      ],
      { color: '#c99c49', width: 15 }
    );
    svg.polyline(
      [
        [sx + 20, sy - 50],
        [sx - 6, sy - 33],
        [sx - 7, sy + 3],
      ],
      { color: '#d4ad64', width: 12 }
    );
    svg.line(sx + 20, sy - 50, sx - 13, sy - 87, { color: '#4b87ad', width: 24 });
    svg.polyline(
      [
        [sx - 13, sy - 83],
        [sx - 25, sy - 53],
        [sx - 47, sy - 43],
      ],
      { color: '#4b87ad', width: 10 }
    );
    svg.line(sx - 47, sy - 43, sx + 37, sy - 129, { color: '#555555', width: 2 });
    svg.circle(sx - 28, sy - 104, 15, { fill: '#f1d1aa', stroke: BLACK, width: 1.2 });
    svg.path(
      `M ${sx - 43} ${sy - 104} Q ${sx - 43} ${sy - 128} ${sx - 18} ${sy - 118} L ${sx - 13} ${sy - 104} Z`,
      { fill: '#e4bc38', color: BLACK, width: 1.2 }
    );
    svg.line(sx - 41, sy - 104, sx - 25, sy - 100, { color: BLACK, width: 4 });

    // fFrom: where friction starts. In the scene it sits just above the skis,
    // ahead of the skier, so the body does not hide it.
    const forces = (at, fFrom = at) => {
      for (const [from, v] of [
        [at, N],
        [fFrom, friction],
        [at, w],
      ]) {
        svg.arrow(...from, ...add(from, v), { color: FORCE, width: 3, head: 12 });
      }
      svg.circle(...at, 4, { fill: BLACK });
      svg.text(...add(at, add(N, [-10, -16])), '**N**', { size: 22, color: FORCE });
      svg.text(...add(at, [-18, weight - 10]), '**w**', { size: 22, color: FORCE });
      svg.text(...add(fFrom, add(friction, [12, -14])), '**f**', { size: 22, color: FORCE });
    };
    svg.add('<g id="skier-forces">');
    forces(
      origin,
      add(
        origin,
        add(
          uphill.map(v => v * 92),
          outward.map(v => v * 14)
        )
      )
    );
    svg.add('</g>');
    svg.add('<g id="weight-components">');
    for (const v of [wPerp, wPar]) {
      svg.arrow(...origin, ...add(origin, v), {
        color: FORCE_LIGHT,
        width: 2.4,
        dash: '6 4',
        head: 10,
      });
      svg.line(...add(origin, v), ...add(origin, w), {
        color: FORCE_LIGHT,
        width: 1.5,
        dash: '5 4',
      });
    }
    svg.text(...add(origin, [90, 101]), 'w_⊥', { size: 22, color: FORCE });
    svg.text(...add(origin, [-62, 55]), 'w_∥', { size: 22, color: FORCE });
    svg.arc(...origin, 42, 270, 270 + angle, { color: BLACK, width: 1.2 });
    svg.text(...add(origin, [17, 64]), '25°', { size: 16 });
    svg.add('</g>');
    svg.text(745, 44, 'Free-body diagram', { size: 20, math: false });
    svg.add('<g id="skier-free-body">');
    forces([745, origin[1]]);
    svg.add('</g>');
    svg.text(745, 452, 'f enlarged for visibility (45 N vs. w = 608 N)', {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 5.1 — an inverted atomic probe contacting a three-dimensional substrate
  Figure_05_01_05: () => {
    const svg = new Svg({
      width: 700,
      height: 440,
      title: 'Atomic force microscopy probe',
      desc: 'An inverted, flat-tipped pyramid of atoms contacts a rectangular substrate of atoms. The probe moves right. Friction on its tip points left, and the tip bends left relative to the broad upper end. A callout identifies the atomic and molecular interactions at the contact.',
    });
    const atom = (x, y, color, highlight) => {
      svg.circle(x, y, 8, { fill: color, stroke: '#584663', width: 1 });
      svg.circle(x - 2, y - 2, 3, { fill: highlight });
    };
    // Draw the back rows first and the top layer last, forming a solid prism.
    svg.add('<g id="substrate-atoms">');
    for (let layer = 4; layer >= 0; layer--) {
      for (let depth = 3; depth >= 0; depth--) {
        for (let col = 0; col < 20; col++) {
          atom(150 + col * 18 + depth * 12, 300 + layer * 18 - depth * 8, '#8b4789', '#c799c5');
        }
      }
    }
    svg.add('</g>');
    // Broad at the top, narrowing to two atoms at the contacting, flattened tip.
    svg.add('<g id="probe-atoms">');
    for (let row = 0; row < 10; row++) {
      const count = 20 - row * 2;
      const center = 345 - (24 * row) / 9;
      const color = ['#e88139', '#c95132', '#d8ae38'][row % 3];
      for (let depth = 2; depth >= 0; depth--) {
        for (let col = 0; col < count; col++) {
          atom(
            center - (count - 1) * 9 + col * 18 + depth * 12,
            122 + row * 18 - depth * 8,
            color,
            '#f8d69d'
          );
        }
      }
    }
    svg.add('</g>');
    svg.arrow(290, 51, 430, 51, { color: BLACK, width: 2.5, head: 12 });
    svg.text(360, 27, 'Motion of probe', { size: 18, math: false });
    svg.add('<g id="probe-friction">');
    // A halo keeps the contact force legible over the substrate atoms.
    svg.arrow(321, 284, 237, 284, { color: '#ffffff', width: 7, head: 18 });
    svg.arrow(321, 284, 237, 284, { color: FORCE, width: 3, head: 12 });
    svg.text(237, 259, '**f**', { size: 22, color: FORCE });
    svg.lines(24, 325, ['Friction on', 'probe'], {
      size: 16,
      math: false,
      anchor: 'start',
      gap: 21,
    });
    svg.add('</g>');
    svg.lines(20, 190, ['Atomic and', 'molecular', 'interactions'], {
      size: 16,
      math: false,
      anchor: 'start',
      gap: 21,
    });
    svg.leader(132, 235, 312, 292, { bend: 0.16 });
    svg.text(350, 413, 'Substrate', { size: 18, math: false });
    return svg.render();
  },

  // 5.1 — retain the skaters, the vector sum, and the opposing friction
  Figure_05_01_06: () => {
    const svg = new Svg({
      width: 1000,
      height: 435,
      title: 'Ice skaters pushing with two forces',
      desc: 'Panel a is an overhead view of two skaters pushing a third, with F₁ rightward and F₂ upward along their arms. Her skate blades point along the northeast resultant. A head-to-tail triangle adds the two pushes. Panel b shows the horizontal forces on her: F₁, F₂, and friction opposite the motion or attempted motion. The vertical weight and normal force balance out of the page.',
    });
    const F1 = 26.4 * 5;
    const F2 = 18.6 * 5;
    const pushAngle = Math.atan2(F2, F1);
    const skater = (x, y, rotation, color) => {
      svg.add(`<g class="skater" transform="translate(${x} ${y}) rotate(${rotation})">`);
      svg.polyline(
        [
          [-12, 22],
          [-14, 40],
          [-12, 52],
        ],
        { color: '#334e69', width: 10 }
      );
      svg.polyline(
        [
          [12, 22],
          [14, 40],
          [12, 52],
        ],
        { color: '#334e69', width: 10 }
      );
      for (const side of [-1, 1]) {
        svg.line(side * 12, 42, side * 12, 63, { color: BLACK, width: 3 });
        svg.polyline(
          [
            [side * 21, -12],
            [side * 31, -38],
            [side * 22, -66],
          ],
          { color, width: 10 }
        );
        svg.circle(side * 22, -66, 5, { fill: '#f1d1aa', stroke: BLACK, width: 1 });
      }
      svg.ellipse(0, 0, 28, 24, { fill: color, stroke: BLACK, width: 1.5 });
      svg.circle(0, -7, 16, { fill: '#805b32', stroke: BLACK, width: 1 });
      svg.path('M -14 -12 Q 0 -31 14 -12', { color: '#493b2e', width: 5 });
      svg.add('</g>');
    };
    svg.text(34, 27, '(a)', { size: 21, math: false, weight: 'bold' });
    svg.text(250, 55, 'Overhead view', { size: 19, math: false });
    svg.add('<g id="skaters">');
    skater(160, 220, 90, '#a96d90');
    skater(260, 310, 0, '#5590b3');
    skater(260, 220, 90 - (pushAngle * 180) / Math.PI, '#e6bd49');
    svg.arrow(175, 220, 239, 220, { color: FORCE, width: 3.5, head: 13 });
    svg.text(182, 176, '**F**_1', { size: 22, color: FORCE });
    svg.arrow(260, 300, 260, 244, { color: FORCE, width: 3.5, head: 13 });
    svg.text(288, 282, '**F**_2', { size: 22, color: FORCE });
    svg.add('</g>');
    svg.text(502, 105, 'Vector addition', { size: 18, math: false });
    const origin = [420, 245];
    svg.add('<g id="skater-vector-sum">');
    svg.arrow(...origin, 420 + F1, 245, { color: FORCE, width: 3, head: 12 });
    svg.arrow(420 + F1, 245, 420 + F1, 245 - F2, { color: FORCE, width: 3, head: 12 });
    svg.arrow(...origin, 420 + F1, 245 - F2, { color: MAROON, width: 3, head: 12 });
    svg.polyline(
      [
        [420 + F1 - 13, 245],
        [420 + F1 - 13, 232],
        [420 + F1, 232],
      ],
      { color: BLACK, width: 1.2 }
    );
    svg.text(486, 271, '**F**_1', { size: 22 });
    svg.text(578, 200, '**F**_2', { size: 22 });
    svg.text(469, 173, '**F**_{tot}', { size: 22, color: MAROON });
    svg.add('</g>');

    svg.line(638, 65, 638, 365, { color: '#cccccc', width: 1 });
    svg.text(668, 27, '(b)', { size: 21, math: false, weight: 'bold' });
    svg.text(807, 66, 'Horizontal free-body diagram', { size: 18, math: false });
    const at = [800, 245];
    const friction = 0.02 * 65 * 9.8 * 5;
    svg.add('<g id="skater-free-body">');
    svg.arrow(...at, 800 + F1, 245, { color: FORCE, width: 3, head: 12 });
    svg.arrow(...at, 800, 245 - F2, { color: FORCE, width: 3, head: 12 });
    svg.arrow(...at, 800 - friction * Math.cos(pushAngle), 245 + friction * Math.sin(pushAngle), {
      color: FORCE,
      width: 3,
      head: 12,
    });
    svg.circle(...at, 5, { fill: BLACK });
    svg.text(928, 271, '**F**_1', { size: 22 });
    svg.text(824, 151, '**F**_2', { size: 22 });
    svg.text(724, 294, '**f**', { size: 22, color: FORCE });
    svg.add('</g>');
    svg.arrow(850, 347, 915, 347 - 65 * Math.tan(pushAngle), {
      color: BLACK,
      width: 1.8,
      head: 10,
    });
    svg.text(858, 371, 'Motion or attempted motion', { size: 15, math: false });
    svg.text(800, 408, 'Friction opposes motion; weight and normal balance.', {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 5.3 — a spatial bend, with true angles in plan and elevation views
  Figure_05_03_10: () => {
    const svg = new Svg({
      width: 1040,
      height: 530,
      title: 'Telephone pole at a right-angle bend with a guy wire',
      desc: 'An oblique view shows two power lines and a guy wire attached at the top of a pole. The plan view shows perpendicular horizontal line directions and a guy wire opposite their bisector. The elevation of either power line shows 80° to the downward vertical; the guy-wire elevation shows 30° to the vertical. Every tension arrow follows its wire away from the pole.',
    });
    // Orthogonal horizontal directions in 3D, each 80° from downward vertical.
    // Oblique projection is intentionally accompanied by true-angle views.
    const height = 320;
    const lineLength = 200;
    const horizontal = lineLength * Math.sin(rad(80));
    const drop = lineLength * Math.cos(rad(80));
    const top = [245, 90];
    const project = ([x, y, z]) => [top[0] + x + 0.62 * y, top[1] + 0.24 * x - 0.36 * y - z];
    const wires = [
      [horizontal, 0, -drop],
      [0, horizontal, -drop],
    ];
    const guyHorizontal = (height * Math.tan(rad(30))) / Math.sqrt(2);
    const anchor = project([-guyHorizontal, -guyHorizontal, -height]);
    const foot = project([0, 0, -height]);
    svg.text(265, 25, 'Oblique view', { size: 20, math: false });
    const groundY = x => foot[1] + ((x - foot[0]) * (anchor[1] - foot[1])) / (anchor[0] - foot[0]);
    svg.line(20, groundY(20), 496, groundY(496), { color: '#75866a', width: 2 });
    svg.rect(top[0] - 16, top[1], 32, height, { fill: '#bd955d', stroke: BLACK, width: 2 });
    svg.ellipse(...top, 16, 6, { fill: '#d6b17a', stroke: BLACK, width: 1.5 });
    for (const x of [-9, -2, 7]) {
      svg.line(top[0] + x, top[1] + 10, foot[0] + x, foot[1] - 6, { color: '#9c7549', width: 1 });
    }
    for (let i = 0; i < 5; i++) {
      const y = 170 + i * 42;
      svg.polyline(
        [
          [229, y],
          [216, y + 4],
          [216, y - 7],
        ],
        { color: '#555555', width: 3 }
      );
    }
    svg.add('<g id="pole-wires">');
    for (const [i, wire] of wires.entries()) {
      const end = project(wire);
      svg.line(...top, ...end, { color: '#444444', width: 2.5 });
      svg.arrow(...project(wire.map(v => v * 0.22)), ...project(wire.map(v => v * 0.8)), {
        color: FORCE,
        width: 3.5,
        head: 14,
      });
      svg.text(...add(end, [i ? 5 : 16, i ? -20 : 14]), '**T**', { size: 24, color: FORCE });
    }
    svg.line(...top, ...anchor, { color: '#444444', width: 2.5 });
    const guyVector = [-guyHorizontal, -guyHorizontal, -height];
    svg.arrow(...project(guyVector.map(v => v * 0.22)), ...project(guyVector.map(v => v * 0.72)), {
      color: FORCE,
      width: 3.5,
      head: 14,
    });
    svg.text(98, 273, '**T**_{gw}', { size: 23, color: FORCE });
    svg.rect(anchor[0] - 12, anchor[1] - 4, 24, 12, { fill: '#999999', stroke: BLACK });
    svg.circle(...top, 5, { fill: '#444444', stroke: BLACK });
    svg.add('</g>');
    svg.text(280, 460, 'All three wires attach at the pole top.', { size: 17, math: false });

    svg.text(780, 25, 'Plan view (from above)', { size: 19, math: false });
    svg.add('<g id="pole-plan">');
    const plan = [760, 180];
    svg.arrow(...plan, 900, 180, { color: FORCE, width: 3, head: 12 });
    svg.arrow(...plan, 760, 40, { color: FORCE, width: 3, head: 12 });
    svg.arrow(...plan, 684, 256, { color: FORCE, width: 3, head: 12 });
    svg.polyline(
      [
        [778, 180],
        [778, 162],
        [760, 162],
      ],
      { color: BLACK, width: 1.2 }
    );
    svg.text(812, 161, '90°', { size: 19 });
    svg.text(917, 180, '**T**', { size: 23, color: FORCE });
    svg.text(735, 61, '**T**', { size: 23, color: FORCE });
    svg.text(663, 244, '**T**_{gw}', { size: 22, color: FORCE, anchor: 'end' });
    svg.arrow(...plan, 830, 110, { color: '#666666', width: 1.5, head: 9, dash: '4 4' });
    svg.lines(855, 88, ['Direction', 'of bend'], {
      size: 15,
      math: false,
      anchor: 'start',
      gap: 19,
    });
    svg.circle(...plan, 5, { fill: BLACK });
    svg.add('</g>');

    svg.text(680, 304, 'Elevation of either power line', { size: 17, math: false });
    svg.add('<g id="power-line-elevation">');
    const lineTop = [610, 350];
    const lineEnd = [790, 350 + 180 / Math.tan(rad(80))];
    svg.line(610, 350, 610, 505, { color: '#9c7549', width: 7 });
    svg.line(...lineTop, ...lineEnd, { color: '#444444', width: 2 });
    svg.arrow(...lineTop, ...lineEnd, { color: FORCE, width: 2.5, head: 12 });
    svg.arc(...lineTop, 55, 270, 350, { color: BLACK });
    svg.text(666, 405, '80°', { size: 20 });
    svg.text(780, 359, '**T**', { size: 22, color: FORCE });
    svg.text(614, 520, 'Vertical pole', { size: 14, math: false });
    svg.add('</g>');

    svg.text(927, 304, 'Guy-wire elevation', { size: 17, math: false });
    svg.add('<g id="guy-wire-elevation">');
    const guyTop = [968, 350];
    const guyEnd = [968 - 155 * Math.tan(rad(30)), 505];
    svg.line(...guyTop, 968, 505, { color: '#9c7549', width: 7 });
    svg.line(...guyTop, ...guyEnd, { color: '#444444', width: 2 });
    svg.arrow(...guyTop, ...guyEnd, { color: FORCE, width: 2.5, head: 12 });
    svg.arc(...guyTop, 55, 240, 270, { color: BLACK });
    svg.text(941, 430, '30°', { size: 20 });
    svg.text(891, 451, '**T**_{gw}', { size: 21, color: FORCE, anchor: 'end' });
    svg.line(858, 505, 998, 505, { color: '#75866a', width: 2 });
    svg.add('</g>');
    return svg.render();
  },

  // 5.3 — stress versus strain for a tendon
  Figure_05_03_05: () => {
    const svg = new Svg({
      width: 595,
      height: 400,
      title: 'Tensile stress versus strain for a mammalian tendon',
      desc: 'Tensile stress increases gradually with strain in the toe region, then proportionally in the linear region. In the failure region the stress peaks and falls as fibers tear.',
    });
    const ox = 58;
    const oy = 315;
    svg.line(ox, oy, 520, oy, { color: BLACK, width: 2 });
    svg.line(ox, oy, ox, 10, { color: BLACK, width: 2 });
    svg.text(22, 175, 'Tensile stress', { size: 19, math: false, rotate: -90 });
    svg.text(520, 314, 'Strain', { size: 18, math: false, anchor: 'start' });
    svg.path(
      `M ${ox} ${oy} C 123 ${oy} 164 ${oy - 18} 196 ${oy - 52} L 370 ${oy - 233} C 390 60 413 51 440 91 C 466 129 499 195 540 200`,
      { color: BLACK, width: 3.5 }
    );
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
      // Path: an arc from −40° to 140°, traveled counterclockwise; it stops
      // short of the caption between the two turns.
      svg.arc(cx, cy, r, -40, 140, { color: BLACK, width: 1.8 });
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
    svg.text(280, 480, '**f** = **F**_c is parallel to **a**_c since **F**_c = \\it{m}**a**_c', {
      size: 20,
      italic: false,
    });
    turn(170, 720, 120, 150, (px, py, ux, uy) => {
      svg.text(px - 40, py - 85, '**v**', { size: 20 });
      svg.text(170 + (px - 170) * 0.5 + 14, 720 + (py - 720) * 0.5 + 16, 'r′', { size: 21 });
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

  // 6.3 — Friction supplies the inward force; it reaches μsN only at the limit.
  Figure_06_03_02: () => {
    const svg = new Svg({
      width: 720,
      height: 430,
      title: 'Car turning left on level ground',
      desc: 'Rear view of a car turning left. Normal force balances weight; static friction points left, toward the turn center. The separate free-body diagram shows the same three forces. Static friction is at most μsN.',
    });
    rearCar6(svg, 200, 310, 0, '#c0392b');
    svg.line(45, 310, 345, 310, { color: BLACK, width: 3 });
    svg.text(200, 45, 'Rear view', { size: 21, math: false });
    svg.text(535, 45, 'Free-body diagram', { size: 21, math: false });
    for (const [id, x, y, length] of [
      ['car', 200, 250, 110],
      ['fbd', 535, 235, 90],
    ]) {
      group6(svg, `${id}-normal`, () =>
        svg.arrow(x, y, x, y - length, { color: FORCE, width: 3, head: 12 })
      );
      group6(svg, `${id}-weight`, () =>
        svg.arrow(x, y, x, y + length, { color: FORCE, width: 3, head: 12 })
      );
      group6(svg, `${id}-friction`, () =>
        svg.arrow(x, y, x - length, y, { color: FORCE, width: 3, head: 12 })
      );
      svg.circle(x, y, 5, { fill: BLACK });
      svg.text(x + 20, y - length, '**N**', { size: 23 });
      svg.text(x + 20, y + length, '**w**', { size: 23 });
      svg.text(x - length + 10, y - 22, '**f**', { size: 23 });
    }
    svg.text(535, 385, 'f = F_c ≤ μ_s N', { size: 24 });
    svg.text(200, 398, 'Turn center is to the left', { size: 18, math: false });
    return svg.render();
  },

  // 6.3 — Both θ arcs measure the same acute banking angle.
  Figure_06_03_03: () => {
    const svg = new Svg({
      width: 760,
      height: 520,
      title: 'Car on a frictionless banked curve',
      desc: 'The car and road rise to the right by θ. The normal force is perpendicular to the road, tilted left of upward vertical by θ. Its upward component balances weight and its leftward component supplies the centripetal force.',
    });
    const theta = 22;
    const slope = Math.tan(rad(theta));
    const road = [65, 410];
    const right = [695, 410 - 630 * slope];
    group6(svg, 'banked-road', () =>
      svg.polygon([road, right, [right[0], right[1] + 24], [65, 434]], {
        fill: '#aaaaaa',
        stroke: BLACK,
        width: 2,
      })
    );
    const carX = 395;
    const baseY = road[1] - (carX - road[0]) * slope;
    group6(svg, 'banked-car', () => rearCar6(svg, carX, baseY, -theta, '#3aa7dc'));
    // Transform the local car center with exactly the same rotation as the wheels.
    const x = carX - 58 * Math.sin(rad(theta));
    const y = baseY - 58 * Math.cos(rad(theta));
    const n = 140;
    const nx = x - n * Math.sin(rad(theta));
    const ny = y - n * Math.cos(rad(theta));
    svg.line(x, y, x, ny - 24, { color: COLORS.guide, dash: '5 4' });
    svg.line(nx, ny, x, ny, { color: COLORS.guide, dash: '5 4' });
    group6(svg, 'normal', () => svg.arrow(x, y, nx, ny, { color: FORCE, width: 3.5, head: 13 }));
    group6(svg, 'weight', () =>
      svg.arrow(x, y, x, y + n * Math.cos(rad(theta)), { color: FORCE, width: 3.5, head: 13 })
    );
    // Dashed component is part of N, not an additional external force.
    group6(svg, 'inward-component', () =>
      svg.arrow(x, y, nx, y, { color: FORCE_LIGHT, width: 2, dash: '5 4', head: 9 })
    );
    svg.circle(x, y, 5, { fill: BLACK });
    svg.text(nx - 18, ny - 12, '**N**', { size: 24 });
    svg.text(x + 22, y + 110, '**w**', { size: 24 });
    group6(svg, 'normal-angle', () =>
      svg.arc(x, y, 48, 90, 90 + theta, { color: BLACK, width: 1.5 })
    );
    svg.text(x - 13, y - 65, 'θ', { size: 22 });
    svg.line(...road, 260, road[1], { color: BLACK, width: 1.5 });
    group6(svg, 'road-angle', () => svg.arc(...road, 70, 0, theta, { color: BLACK, width: 1.5 }));
    svg.text(155, 393, 'θ', { size: 22 });
    svg.text(585, 335, 'N cos θ = w', { size: 24 });
    svg.text(585, 382, 'N sin θ = F_c = F_{net}', { size: 24 });
    svg.text(380, 480, 'Leftward net force: toward the center of the turn', {
      size: 19,
      math: false,
    });
    return svg.render();
  },

  // 6.3 — A racing line uses the road width; its center differs from the bend's.
  Figure_06_03_04: () => {
    const svg = new Svg({
      width: 660,
      height: 660,
      title: 'Cutting the corner increases the turning radius',
      desc: 'Top view of a left turn. Path 2 follows the road bend. Path 1 starts wide, passes close to the inside edge at the apex, and exits wide. The corner-cutting arc has a larger radius than Path 2, allowing a greater speed for the same available friction.',
    });
    svg.rect(35, 40, 540, 535, { fill: '#dce8bd' });
    svg.path(
      'M 360 550 L 360 300 A 60 60 0 0 0 300 240 L 60 240 L 60 60 L 300 60 A 240 240 0 0 1 540 300 L 540 550 Z',
      { fill: '#b7b7b7', color: BLACK, width: 2.5 }
    );
    svg.path('M 450 550 L 450 300 A 150 150 0 0 0 300 150 L 60 150', {
      color: '#ffffff',
      width: 3,
      dash: '17 12',
    });
    group6(svg, 'path-2', () =>
      svg.path('M 450 550 L 450 300 A 150 150 0 0 0 300 150 L 60 150', {
        color: '#1f77c8',
        width: 3,
      })
    );
    // Radius 440, centered at (60,550), passes near the inside apex. It is
    // deliberately not concentric with the 150-pixel road-following curve.
    const race = Array.from({ length: 181 }, (_, i) => {
      const a = rad(i / 2);
      return [60 + 440 * Math.cos(a), 550 - 440 * Math.sin(a)];
    });
    group6(svg, 'path-1', () => svg.polyline(race, { color: FORCE, width: 3.5 }));
    const topCar = (cx, cy, angle, color) => {
      const p = (x, y) => [
        cx + x * Math.cos(rad(angle)) - y * Math.sin(rad(angle)),
        cy + x * Math.sin(rad(angle)) + y * Math.cos(rad(angle)),
      ];
      for (const x of [-16, 16])
        for (const y of [-15, 15])
          svg.polygon([p(x - 7, y - 3), p(x + 7, y - 3), p(x + 7, y + 3), p(x - 7, y + 3)], {
            fill: BLACK,
          });
      svg.polygon([p(-29, -13), p(29, -13), p(29, 13), p(-29, 13)], {
        fill: color,
        stroke: BLACK,
        width: 1.5,
      });
      svg.polygon([p(-8, -10), p(13, -10), p(13, 10), p(-8, 10)], {
        fill: '#cce4ee',
        stroke: BLACK,
        width: 1,
      });
      svg.line(...p(21, -10), ...p(21, 10), { color: '#ffffff', width: 2 });
    };
    topCar(450, 460, -90, '#3aa7dc');
    const a = rad(22);
    topCar(60 + 440 * Math.cos(a), 550 - 440 * Math.sin(a), -112, '#e27468');
    for (const angle of [14, 65]) {
      const t = rad(angle);
      const p = [60 + 440 * Math.cos(t), 550 - 440 * Math.sin(t)];
      svg.arrow(...p, p[0] - 25 * Math.sin(t), p[1] - 25 * Math.cos(t), {
        color: FORCE,
        width: 3,
        head: 12,
      });
    }
    svg.arrow(450, 340, 450, 312, { color: '#1f77c8', width: 3, head: 12 });
    svg.arrow(150, 150, 120, 150, { color: '#1f77c8', width: 3, head: 12 });
    svg.text(275, 300, 'Path 1', { size: 21, math: false, color: FORCE });
    svg.leader(315, 289, race[90][0], race[90][1], { bend: 0.05 });
    svg.text(587, 323, 'Path 2', { size: 21, math: false, color: '#1f77c8' });
    svg.leader(552, 320, 452, 350, { bend: 0.05 });
    svg.text(330, 597, 'Cut the inside apex, enter and exit wide', { size: 21, math: false });
    svg.text(330, 631, 'r_1 > r_2     ⇒     v_{max,1} > v_{max,2}', { size: 24 });
    return svg.render();
  },

  // 6.3 — A pair of clothoids: curvature grows continuously to the crown.
  Figure_06_03_10: () => {
    const svg = new Svg({
      width: 780,
      height: 650,
      title: 'Teardrop roller-coaster loop',
      desc: 'A teardrop loop runs leftward from entrance A at the lower right, up the left side past B, over the crown, down the right side past C, and out at D at the lower left. Curvature grows smoothly from zero at entry to its maximum at the crown; the radius is smallest at the top and larger near the base.',
    });
    const length = 1100;
    const steps = 1000;
    const heading = u =>
      u <= 0.5 ? Math.PI - 4 * Math.PI * u * u : -Math.PI + 4 * Math.PI * (1 - u) ** 2;
    const points = [[610, 480]];
    for (let k = 0; k < steps; k++) {
      const a = heading((k + 0.5) / steps);
      const p = points.at(-1);
      points.push([p[0] + (length / steps) * Math.cos(a), p[1] - (length / steps) * Math.sin(a)]);
    }
    // Trestle and bracing attach to the track, behind the two rails.
    for (let x = 175; x <= 625; x += 50) {
      svg.line(x, 486, x, 615, { color: '#c9a962', width: 5 });
      if (x < 625) {
        svg.line(x, 486, x + 50, 615, { color: '#dbc386', width: 3 });
        svg.line(x + 50, 486, x, 615, { color: '#dbc386', width: 3 });
      }
    }
    for (const i of [310, 690]) {
      const [x, y] = points[i];
      svg.line(x, y + 6, x, 615, { color: '#b78e49', width: 7 });
      svg.line(x, y + 6, x + (i < 500 ? -45 : 45), 615, { color: '#b78e49', width: 4 });
    }
    for (const y of [515, 565, 615]) svg.line(160, y, 640, y, { color: '#c9a962', width: 4 });
    svg.line(100, 620, 700, 620, { color: BLACK, width: 3 });
    svg.line(610, 480, 660, 480, { color: '#327b35', width: 12 });
    svg.line(150, 480, points.at(-1)[0], 480, { color: '#327b35', width: 12 });
    group6(svg, 'loop-centerline', () => svg.polyline(points, { color: '#327b35', width: 12 }));
    for (const offset of [-6, 6]) {
      const rail = points.map(([x, y], k) => {
        const a = heading(k / steps);
        return [x + offset * Math.sin(a), y + offset * Math.cos(a)];
      });
      svg.polyline(rail, { color: BLACK, width: 1.7 });
      svg.line(610, 480 + offset, 660, 480 + offset, { color: BLACK, width: 1.7 });
      svg.line(150, 480 + offset, points.at(-1)[0], 480 + offset, { color: BLACK, width: 1.7 });
    }
    for (const [name, i, dx, dy] of [
      ['A', 0, 35, 28],
      ['B', 360, -27, -5],
      ['C', 640, 28, -5],
      ['D', 1000, -30, 28],
    ]) {
      const [x, y] = points[i];
      svg.text(x + dx, y + dy, name, { size: 24, math: false, weight: 'bold' });
    }
    // Radius arrows use the local osculating centers, not a common loop center.
    for (const [id, i] of [
      ['minimum-radius', 500],
      ['base-radius', 220],
    ]) {
      const u = i / steps;
      const r = length / (8 * Math.PI * Math.min(u, 1 - u));
      const a = heading(u);
      const [x, y] = points[i];
      const center = [x + r * Math.sin(a), y + r * Math.cos(a)];
      svg.circle(...center, 3, { fill: MAROON });
      group6(svg, id, () => svg.arrow(...center, x, y, { color: MAROON, width: 2, head: 10 }));
    }
    svg.text(320, 177, 'r_{minimum}', { size: 22 });
    svg.leader(355, 185, points[500][0], points[500][1] + 40, { bend: 0.1 });
    svg.lines(620, 325, ['Larger radius', 'near the base'], { size: 20, math: false });
    svg.leader(553, 345, 440, 353, { bend: 0.05 });
    svg.text(400, 55, 'Straight entry and exit: curvature → 0', { size: 20, math: false });
    for (const i of [70, 330, 510, 670, 930]) {
      const [x, y] = points[i];
      const a = heading(i / steps);
      svg.arrow(x, y, x + 24 * Math.cos(a), y - 24 * Math.sin(a), {
        color: BLACK,
        width: 2,
        head: 10,
      });
    }
    return svg.render();
  },

  // 6.4 — A separate released rider follows a tangent in the inertial frame.
  Figure_06_04_02: () => {
    const svg = new Svg({
      width: 1120,
      height: 520,
      title: 'Rotating and inertial views of a merry-go-round',
      desc: 'Top views of counterclockwise rotation. In the rotating frame an outward fictitious centrifugal force balances the inward real force for a rider at rest. In the inertial frame a held rider has a real inward centripetal force; a separate unshaded released rider has zero net horizontal force and follows a straight tangent.',
    });
    const rider = (x, y, shaded) => {
      svg.ellipse(x, y, 25, 10, {
        fill: shaded ? '#dfb080' : '#ffffff',
        stroke: BLACK,
        width: 1.5,
      });
      svg.circle(x + 21, y - 7, 7, { fill: shaded ? '#dfb080' : '#ffffff', stroke: BLACK });
      for (const dx of [-16, 15])
        svg.line(x + dx, y + 6, x + dx - 5, y + 16, { color: BLACK, width: 2 });
      svg.ellipse(x - 4, y - 4, 9, 13, {
        fill: shaded ? '#ce6b9d' : '#ffffff',
        stroke: BLACK,
        width: 1.5,
      });
      svg.circle(x - 5, y - 17, 8, { fill: shaded ? '#f4cbaa' : '#ffffff', stroke: BLACK });
      svg.circle(x, y, 3, { fill: '#d1aa34' });
    };
    for (const [id, cx] of [
      ['rotating', 250],
      ['inertial', 800],
    ]) {
      const cy = 285;
      group6(svg, `${id}-platform`, () =>
        svg.circle(cx, cy, 155, { fill: '#f5d4be', stroke: '#b9865e', width: 2.5 })
      );
      for (let a = 0; a < 360; a += 30)
        svg.line(cx, cy, cx + 155 * Math.cos(rad(a)), cy - 155 * Math.sin(rad(a)), {
          color: '#dfb99b',
          width: 1.5,
        });
      svg.circle(cx, cy, 120, { fill: 'none', stroke: COLORS.guide, dash: '4 5', width: 1 });
      svg.circle(cx, cy, 7, { fill: '#d1aa34', stroke: BLACK });
      svg.arc(cx, cy, 139, 110, 165, { color: TEAL, width: 3 });
      const end = [cx + 139 * Math.cos(rad(165)), cy - 139 * Math.sin(rad(165))];
      svg.arrow(end[0] + 5, end[1] - 20, ...end, { color: TEAL, width: 3, head: 11 });
      svg.text(cx - 128, cy - 83, 'ω', { size: 23, color: TEAL });
      const unit = [Math.cos(rad(35)), -Math.sin(rad(35))];
      const p = [cx + 120 * unit[0], cy + 120 * unit[1]];
      svg.line(cx, cy, ...p, { color: BLACK, dash: '5 4' });
      group6(svg, `${id}-held-rider`, () => rider(...p, true));
      if (id === 'rotating') {
        group6(svg, 'fictitious-force', () =>
          svg.arrow(...p, p[0] + 90 * unit[0], p[1] + 90 * unit[1], {
            color: FORCE,
            width: 3.5,
            head: 12,
          })
        );
        svg.text(cx, 90, 'F_{fict} = F_{centrifugal}', { size: 24 });
        svg.leader(350, 103, p[0] + 55 * unit[0], p[1] + 55 * unit[1], { bend: 0.1 });
      } else {
        group6(svg, 'centripetal-force', () =>
          svg.arrow(...p, cx + 20 * unit[0], cy + 20 * unit[1], {
            color: FORCE,
            width: 3.5,
            head: 12,
          })
        );
        svg.text(760, 358, 'F_{net} = F_{centripetal}', { size: 23 });
        svg.leader(820, 342, cx + 65 * unit[0], cy + 65 * unit[1], { bend: 0.05 });
        // Release at the rightmost point of the circular orbit: v points up.
        group6(svg, 'released-trajectory', () =>
          svg.arrow(cx + 120, cy, cx + 120, 65, { color: TEAL, width: 2.5, dash: '7 5', head: 12 })
        );
        svg.circle(cx + 120, cy, 4, { fill: BLACK });
        group6(svg, 'released-rider', () => rider(cx + 120, 110, false));
        svg.text(1030, 108, 'F_{net} = 0', { size: 23 });
        svg.text(1030, 140, 'Released rider', { size: 17, math: false });
        svg.text(1020, 290, 'Release', { size: 17, math: false });
        svg.leader(980, 290, cx + 120, cy, { bend: 0.05 });
      }
    }
    svg.text(250, 35, '(a) Rotating frame', { size: 24, math: false });
    svg.text(800, 35, '(b) Inertial frame', { size: 24, math: false });
    svg.text(250, 487, 'Outward fictitious force', { size: 20, math: false });
    svg.text(800, 487, 'Real force inward; released motion straight', { size: 20, math: false });
    return svg.render();
  },

  // 6.5 — A cutaway and a magnified surface view show r ≈ re.
  Figure_06_05_03: () => {
    const svg = new Svg({
      width: 790,
      height: 480,
      title: 'Distance from Earth’s center to a surface object',
      desc: 'Earth with a cutaway of its interior, its center of mass, and a radius to an object at the surface. A magnified circular inset shows a building above the curved surface. The building height is negligible compared with Earth’s radius, so the center-to-object distance is approximately the radius of Earth.',
    });
    const cx = 205,
      cy = 240,
      r = 150;
    svg.circle(cx, cy, r, { fill: '#96c9d3', stroke: '#487f8a', width: 2 });
    svg.path(
      'M 125 220 L 146 197 L 183 202 L 200 227 L 224 247 L 218 279 L 198 303 L 189 336 L 171 316 L 165 281 L 145 266 L 127 240 Z',
      { fill: '#cfb079', color: '#987b45', width: 1.5 }
    );
    for (const [radius, fill] of [
      [150, '#e7d6af'],
      [100, '#ddbd6b'],
      [47, '#c58246'],
    ])
      svg.arc(cx, cy, radius, 0, 90, { fill, color: '#aa945d', width: 1 });
    const surface = [cx + r / Math.SQRT2, cy - r / Math.SQRT2];
    svg.circle(cx, cy, 5, { fill: BLACK });
    svg.text(cx - 18, cy + 24, 'CM', { size: 21, math: false });
    group6(svg, 'earth-radius', () =>
      svg.arrow(cx, cy, ...surface, { color: FORCE, width: 2.5, head: 10 })
    );
    svg.text(cx + 70, cy - 40, 'r_e', { size: 24 });
    svg.circle(...surface, 5, { fill: FORCE });
    svg.text(cx - 40, cy + 113, 'Earth', { size: 24, math: false });
    const zx = 585,
      zy = 235,
      zr = 133;
    svg.line(...surface, 494, 138, { color: BLACK, width: 1.2 });
    svg.line(...surface, 454, 260, { color: BLACK, width: 1.2 });
    svg.add(
      '<defs><clipPath id="surface-zoom"><circle cx="585" cy="235" r="133"/></clipPath></defs>'
    );
    svg.circle(zx, zy, zr, { fill: '#ffffff', stroke: BLACK, width: 2 });
    svg.add('<g clip-path="url(#surface-zoom)">');
    svg.circle(zx, 655, 410, { fill: '#dfc787', stroke: '#aa945d', width: 2 });
    svg.add('</g>');
    // The building is at the TOP of the surface; its vertical axis is radial.
    group6(svg, 'surface-building', () => {
      svg.rect(563, 182, 44, 63, { fill: '#ae4d3c', stroke: BLACK, width: 1.5 });
      svg.polygon(
        [
          [558, 182],
          [585, 164],
          [612, 182],
        ],
        { fill: '#71392e', stroke: BLACK }
      );
      for (let row = 0; row < 3; row++)
        for (let col = 0; col < 2; col++)
          svg.rect(570 + col * 20, 191 + row * 15, 8, 9, {
            fill: '#e4edf6',
            stroke: BLACK,
            width: 0.7,
          });
      svg.rect(581, 230, 8, 15, { fill: '#5c342a', stroke: BLACK, width: 0.7 });
    });
    svg.circle(zx, 245, 3, { fill: BLACK });
    // Like the main view, r_e points from Earth's center out to the object.
    group6(svg, 'zoom-radius', () =>
      svg.arrow(zx, 368, zx, 247, { color: FORCE, width: 2, head: 9 })
    );
    svg.path('M 578 298 l 5 -4 l 5 8 l 5 -4 M 578 305 l 5 -4 l 5 8 l 5 -4', {
      color: BLACK,
      width: 1.5,
    });
    svg.text(612, 282, 'r_e', { size: 24 });
    svg.text(zx, 398, 'From Earth’s center', { size: 19, math: false });
    svg.text(395, 450, 'Object near the surface: r ≈ r_e', { size: 24 });
    return svg.render();
  },

  // 6.5 — Opposite-side attracting masses give torques of the same sign.
  Figure_06_05_09: () => {
    const svg = new Svg({
      width: 900,
      height: 580,
      title: 'Cavendish torsion balance',
      desc: 'A top view shows two small masses on a suspended rod. The large attracting masses lie on opposite sides of the rod, so their attractions produce torques in the same counterclockwise direction. A mirror on the suspension reflects a light beam onto a scale. A side inset shows the fiber and suspended rod.',
    });
    svg.text(275, 35, 'Top view: gravitational torques add', { size: 22, math: false });
    // The separate stand carries M; the light suspended rod carries m.
    svg.line(130, 380, 390, 160, { color: '#bbbbbb', width: 18 });
    group6(svg, 'suspended-rod', () =>
      svg.line(130, 270, 390, 270, { color: '#555555', width: 6 })
    );
    for (const [id, x, y] of [
      ['left', 130, 380],
      ['right', 390, 160],
    ]) {
      group6(svg, `${id}-large-mass`, () =>
        svg.circle(x, y, 35, { fill: '#34495e', stroke: BLACK, width: 2 })
      );
      svg.text(x, y, 'M', { size: 26, color: '#ffffff', halo: false });
    }
    for (const [id, x, sign] of [
      ['left', 130, 1],
      ['right', 390, -1],
    ]) {
      group6(svg, `${id}-small-mass`, () =>
        svg.circle(x, 270, 19, { fill: '#c5cdd1', stroke: BLACK, width: 2 })
      );
      svg.text(x, 270, 'm', { size: 23 });
      group6(svg, `${id}-attraction`, () =>
        svg.arrow(x, 270, x, 270 + sign * 65, { color: FORCE, width: 3, head: 11 })
      );
      svg.text(x + 25, 270 + sign * 46, '**F**', { size: 22 });
    }
    svg.circle(260, 270, 7, { fill: '#f5d37b', stroke: BLACK });
    svg.text(220, 320, 'Pivot', { size: 18, math: false });
    svg.leader(232, 307, 260, 270, { bend: 0.05 });
    svg.arc(260, 270, 54, 40, 140, { color: TEAL, width: 2.5 });
    const turn = [260 + 54 * Math.cos(rad(140)), 270 - 54 * Math.sin(rad(140))];
    svg.arrow(turn[0] + 10, turn[1] - 12, ...turn, { color: TEAL, width: 2.5, head: 10 });
    // Specular reflection: mirror tangent is perpendicular to (outgoing − incoming).
    const source = [650, 300],
      mirror = [260, 270],
      scale = [650, 470];
    const unit = (a, b) => {
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      return [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
    };
    const incoming = unit(source, mirror),
      outgoing = unit(mirror, scale);
    const normal = [outgoing[0] - incoming[0], outgoing[1] - incoming[1]];
    const norm = Math.hypot(...normal);
    const tangent = [-normal[1] / norm, normal[0] / norm];
    group6(svg, 'mirror', () =>
      svg.line(
        mirror[0] - 17 * tangent[0],
        mirror[1] - 17 * tangent[1],
        mirror[0] + 17 * tangent[0],
        mirror[1] + 17 * tangent[1],
        { color: '#4793a6', width: 5 }
      )
    );
    svg.text(324, 225, 'Mirror', { size: 18, math: false });
    svg.leader(304, 238, ...mirror, { bend: 0.05 });
    group6(svg, 'incident-ray', () => svg.line(...source, ...mirror, { color: TEAL, width: 2 }));
    group6(svg, 'reflected-ray', () => svg.line(...mirror, ...scale, { color: TEAL, width: 2 }));
    svg.arrow(495, 288.08, 450, 284.62, { color: TEAL, width: 2, head: 10 });
    svg.arrow(455, 370, 494, 390, { color: TEAL, width: 2, head: 10 });
    svg.rect(650, 282, 90, 36, { fill: '#e4e8eb', stroke: BLACK, width: 1.5, rx: 4 });
    svg.text(695, 343, 'Light source', { size: 19, math: false });
    svg.rect(570, 453, 160, 34, { fill: '#f3f3ef', stroke: BLACK, width: 1.5 });
    for (let i = 0; i <= 10; i++)
      svg.line(580 + 14 * i, 457, 580 + 14 * i, i % 5 === 0 ? 484 : 475, {
        color: BLACK,
        width: 1,
      });
    svg.text(650, 512, 'Scale', { size: 19, math: false });
    svg.circle(...scale, 4, { fill: TEAL });
    // Side inset makes clear that the rod is suspended by a fiber.
    svg.text(730, 45, 'Side view', { size: 21, math: false });
    svg.line(650, 80, 810, 80, { color: BLACK, width: 4 });
    svg.line(730, 80, 730, 210, { color: '#777777', width: 2 });
    svg.line(675, 210, 785, 210, { color: '#555555', width: 4 });
    for (const x of [675, 785]) svg.circle(x, 210, 11, { fill: '#c5cdd1', stroke: BLACK });
    svg.rect(725, 175, 10, 20, { fill: '#cbe3ec', stroke: BLACK });
    svg.text(792, 130, 'Fiber', { size: 18, math: false });
    svg.leader(770, 140, 730, 140, { bend: 0.05 });
    svg.text(275, 548, 'Twisting of the fiber shifts the reflected spot', {
      size: 20,
      math: false,
    });
    return svg.render();
  },

  // 6.6 — Historical schematic models, with every planet on its own path.
  Figure_06_06_03: () => {
    const svg = new Svg({
      width: 1160,
      height: 730,
      title: 'Ptolemaic and Copernican models',
      desc: 'Left: the geocentric Ptolemaic model has Earth at the center, the Moon and Sun on circular paths, and Mercury, Venus, Mars, Jupiter, and Saturn on epicycles whose centers move around Earth. Stars surround the system. Right: the heliocentric Copernican model has the Sun at the center, with Mercury, Venus, Earth and its Moon, Mars, Jupiter, and Saturn orbiting it. Schematic, not to scale.',
    });
    svg.text(290, 35, '(a) Ptolemaic view', { size: 25, math: false });
    svg.text(870, 35, '(b) Copernican view', { size: 25, math: false });
    svg.line(580, 90, 580, 665, { color: '#bbbbbb', width: 1 });
    const px = 290,
      py = 375;
    svg.circle(px, py, 18, { fill: '#87ceeb', stroke: '#4682b4', width: 2 });
    svg.text(px, py + 31, 'Earth', { size: 17, math: false });
    const geo = [
      { name: 'Moon', r: 40, a: 0, epi: 0, color: '#bbbbbb', size: 6, label: [349, 396] },
      {
        name: 'Mercury',
        r: 70,
        a: 60,
        epi: 14,
        phase: 0,
        color: '#999999',
        size: 5,
        label: [384, 285],
      },
      {
        name: 'Venus',
        r: 103,
        a: 150,
        epi: 17,
        phase: 140,
        color: '#d5ac65',
        size: 6,
        label: [161, 288],
      },
      { name: 'Sun', r: 137, a: 270, epi: 0, color: '#f3cb3d', size: 13, label: [338, 512] },
      {
        name: 'Mars',
        r: 170,
        a: 0,
        epi: 22,
        phase: 0,
        color: '#c65c47',
        size: 6,
        label: [490, 407],
      },
      {
        name: 'Jupiter',
        r: 205,
        a: 210,
        epi: 20,
        phase: 220,
        color: '#cda148',
        size: 9,
        label: [95, 523],
      },
      {
        name: 'Saturn',
        r: 235,
        a: 100,
        epi: 23,
        phase: 40,
        color: '#d49f65',
        size: 8,
        label: [312, 125],
      },
    ];
    for (const planet of geo) {
      const { name, r, a, epi, phase = 0, color, size, label } = planet;
      svg.circle(px, py, r, { fill: 'none', stroke: '#aaaaaa', width: 1.2, dash: '4 4' });
      const center = [px + r * Math.cos(rad(a)), py - r * Math.sin(rad(a))];
      if (epi) {
        group6(svg, `epicycle-${name}`, () =>
          svg.circle(...center, epi, { fill: 'none', stroke: '#38894b', width: 2 })
        );
        svg.circle(...center, 2, { fill: '#38894b' });
      }
      const point = [
        center[0] + epi * Math.cos(rad(phase)),
        center[1] - epi * Math.sin(rad(phase)),
      ];
      group6(svg, `geocentric-${name}`, () =>
        svg.circle(...point, size, { fill: color, stroke: BLACK, width: 1 })
      );
      svg.text(...label, name, { size: 17, math: false });
      svg.line(label[0], label[1] + (label[1] < point[1] ? 11 : -11), ...point, {
        color: COLORS.guide,
        width: 0.8,
      });
    }
    svg.text(497, 304, 'Epicycle', { size: 17, math: false });
    svg.leader(486, 318, 474, 358, { bend: 0.05 });
    for (let a = 0; a < 360; a += 24)
      svg.circle(px + 274 * Math.cos(rad(a)), py - 274 * Math.sin(rad(a)), 2.7, {
        fill: '#a65e55',
      });
    svg.text(290, 680, 'Stars', { size: 19, math: false });
    // The heavens turn clockwise (westward) as seen from above the north pole.
    svg.arc(px, py, 281, 67, 110, { color: BLACK, width: 1.5 });
    const end = [px + 281 * Math.cos(rad(67)), py - 281 * Math.sin(rad(67))];
    svg.arrow(end[0] - 17 * Math.sin(rad(67)), end[1] - 17 * Math.cos(rad(67)), ...end, {
      color: BLACK,
      width: 1.5,
      head: 9,
    });
    svg.text(290, 78, 'Primary motion', { size: 17, math: false });
    const cx = 870,
      cy = 375;
    svg.circle(cx, cy, 20, { fill: '#f3cb3d', stroke: '#b5972c', width: 2 });
    svg.text(cx, cy + 33, 'Sun', { size: 18, math: false });
    const helio = [
      { name: 'Mercury', r: 45, a: 25, color: '#999999', size: 5, label: [974, 347] },
      { name: 'Venus', r: 77, a: 115, color: '#d5ac65', size: 6, label: [815, 274] },
      { name: 'Earth', r: 110, a: 205, color: '#87ceeb', size: 7, label: [735, 453] },
      { name: 'Mars', r: 150, a: 300, color: '#c65c47', size: 6, label: [978, 528] },
      { name: 'Jupiter', r: 195, a: 45, color: '#cda148', size: 10, label: [1058, 220] },
      { name: 'Saturn', r: 235, a: 145, color: '#d49f65', size: 9, label: [648, 211] },
    ];
    for (const { name, r, a, color, size, label } of helio) {
      svg.circle(cx, cy, r, { fill: 'none', stroke: '#aaaaaa', width: 1.2 });
      const point = [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
      group6(svg, `heliocentric-${name}`, () =>
        svg.circle(...point, size, { fill: color, stroke: BLACK, width: 1 })
      );
      if (name === 'Earth') {
        svg.circle(...point, 15, { fill: 'none', stroke: '#aaaaaa', width: 1 });
        svg.circle(point[0], point[1] - 15, 3, { fill: '#aaaaaa', stroke: BLACK, width: 0.5 });
      }
      if (name === 'Saturn') svg.ellipse(...point, 17, 4, { stroke: '#856f4b', width: 1.5 });
      svg.text(...label, name, { size: 17, math: false });
      svg.line(label[0], label[1] + (label[1] < point[1] ? 11 : -11), ...point, {
        color: COLORS.guide,
        width: 0.8,
      });
    }
    svg.text(580, 710, 'Schematic models — sizes and distances are not to scale', {
      size: 19,
      math: false,
    });
    return svg.render();
  },
};
