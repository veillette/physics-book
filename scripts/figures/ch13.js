/**
 * Chapter 13: temperature, kinetic theory, and the gas laws.
 *
 * The figures are drawn from the physics rather than traced. The scales of
 * 13.1 share one ruler (1.5 px per °F), so 0 °F, body temperature, and the
 * fixed points of water line up across the three rows. The density of water
 * is the tabulated value at each degree. The speed distributions are the
 * Maxwell–Boltzmann formula, and the PV isotherms are van der Waals curves with
 * the Maxwell equal-area construction, so the flat part of each isotherm and the
 * dome under them agree.
 *
 * Molecules, beakers, gauges, and thermometers are exported for chapters 14
 * and 15.
 */
import { COLORS, Plot, Svg, fmt, smoothPath } from './svg.js';

export const CURVE = '#c8102e';
export const GLASS = '#7cc6ea';
export const WATER = '#cfeaf8';
export const DEEP_WATER = '#a9d8f2';
const EXPAND = '#e6007e';
const ARROW = COLORS.black;
const GO = '#7ab32e';
const PURPLE = '#5b3a99';

/** Deterministic pseudo-random numbers (Park–Miller). */
export function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** Serif annotation with upright letters (OpenStax body text). */
function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 19, italic: false, ...o });
}

/** A gas molecule: a salmon sphere with a highlight. */
export function molecule(svg, x, y, r = 8) {
  svg.circle(x, y, r, { fill: '#f59a88', stroke: '#d4553f', width: 1.5 });
  svg.circle(x - r * 0.3, y - r * 0.35, r * 0.28, { fill: '#fde3dc' });
}

/**
 * `n` molecules scattered over the box (x, y, w, h), at least `gap` apart.
 * Each gets a velocity of random direction and a length between `vmin` and
 * `vmax`; returns [x, y, vx, vy] in pixels.
 */
export function scatter(n, [x, y, w, h], { seed = 1, gap = 34, vmin = 20, vmax = 60 } = {}) {
  const rand = rng(seed);
  const out = [];
  let tries = 0;
  while (out.length < n && tries < 20000) {
    tries += 1;
    const px = x + rand() * w;
    const py = y + rand() * h;
    if (out.some(([qx, qy]) => Math.hypot(px - qx, py - qy) < gap)) continue;
    const a = rand() * 2 * Math.PI;
    const v = vmin + rand() * (vmax - vmin);
    out.push([px, py, v * Math.cos(a), v * Math.sin(a)]);
  }
  return out;
}

/** Keep the molecules whose position and arrow tip both lie in [x0, y0, x1, y1]. */
export function within(list, [x0, y0, x1, y1]) {
  const ok = (x, y) => x > x0 && x < x1 && y > y0 && y < y1;
  return list.filter(([x, y, vx, vy]) => ok(x, y) && ok(x + vx, y + vy));
}

/** Molecules with velocity arrows. */
export function movingMolecules(svg, list, { r = 7, color = ARROW } = {}) {
  for (const [x, y, vx, vy] of list) {
    if (vx || vy) svg.arrow(x, y, x + vx, y + vy, { color, width: 1.6, head: 9 });
  }
  for (const [x, y] of list) molecule(svg, x, y, r);
}

/**
 * A round pressure gauge centered at (cx, cy) whose needle sits at `level`
 * (0 = empty, 1 = full scale) across a 270° dial.
 */
export function gauge(svg, cx, cy, r, level, { label = 'P', stem = true } = {}) {
  if (stem)
    svg.rect(cx - 6, cy + r - 2, 12, 16, { fill: '#7cc443', stroke: '#4e8a22', width: 1.2 });
  svg.circle(cx, cy, r, { fill: '#2fa58e', stroke: '#1d7a68', width: 1.5 });
  svg.circle(cx, cy, r * 0.8, { fill: '#fdf6dc', stroke: '#c9b98a', width: 1 });
  // Dial: from 225° (empty, lower left) clockwise to −45° (full, lower right).
  const ang = f => ((225 - 270 * f) * Math.PI) / 180;
  for (let k = 0; k <= 6; k += 1) {
    const a = ang(k / 6);
    svg.line(
      cx + r * 0.62 * Math.cos(a),
      cy - r * 0.62 * Math.sin(a),
      cx + r * 0.78 * Math.cos(a),
      cy - r * 0.78 * Math.sin(a),
      { color: COLORS.black, width: 1.5 }
    );
  }
  const a = ang(level);
  svg.arrow(cx, cy, cx + r * 0.6 * Math.cos(a), cy - r * 0.6 * Math.sin(a), {
    color: '#e0533d',
    width: 2.5,
    head: 9,
  });
  svg.circle(cx, cy, 3, { fill: COLORS.black });
  if (label) svg.text(cx + r * 0.85, cy - r * 0.95, label, { size: 20, anchor: 'start' });
}

/**
 * A liquid-in-glass thermometer standing with its bulb at (x, y), `h` tall,
 * filled to `level` (0–1) of the scale.
 */
export function thermometer(svg, x, y, h, level, { label = 'T', ticks = 12 } = {}) {
  const w = 22;
  svg.rect(x - w / 2, y - h, w, h, {
    fill: '#ffffff',
    stroke: COLORS.black,
    width: 1.5,
    rx: w / 2,
  });
  svg.circle(x, y, 17, { fill: '#ffffff', stroke: COLORS.black, width: 1.5 });
  svg.rect(x - w / 2 + 1.5, y - h + 12, w - 3, h - 12, { fill: '#ffffff' });
  svg.rect(x - 4, y - h + 8, 8, h - 8, { fill: '#9fd3f0', rx: 4 });
  const top = y - 12 - (h - 30) * level;
  svg.rect(x - 4, top, 8, y - top, { fill: '#f08a7a' });
  svg.circle(x, y, 10, { fill: '#f08a7a', stroke: '#9fd3f0', width: 2 });
  for (let k = 0; k < ticks; k += 1) {
    const ty = y - 24 - ((h - 36) * k) / (ticks - 1);
    svg.line(x + w / 2, ty, x + w / 2 + 8, ty, { color: COLORS.black, width: 1.2 });
  }
  if (label) svg.text(x + w / 2 + 6, y - h + 2, label, { size: 20, anchor: 'start' });
}

/**
 * A glass beaker (x, y top-left, w × h) holding liquid up to `fill` of its
 * height. With `lid` it is sealed by a plate across the top.
 */
export function beaker(svg, x, y, w, h, { fill = 0.6, lid = false, spout = false } = {}) {
  const t = 7;
  const surface = y + h * (1 - fill);
  svg.rect(x + t, surface, w - 2 * t, y + h - t - surface, { fill: WATER });
  svg.path(
    `M ${x} ${y} L ${x} ${y + h - 14} Q ${x} ${y + h} ${x + 14} ${y + h} L ${x + w - 14} ${y + h} Q ${x + w} ${y + h} ${x + w} ${y + h - 14} L ${x + w} ${y}`,
    { color: GLASS, width: t, fill: 'none' }
  );
  if (spout) svg.path(`M ${x - 4} ${y - 6} q 4 2 4 10`, { color: GLASS, width: 4 });
  svg.line(x + t, surface, x + w - t, surface, { color: '#8cc9e8', width: 1.5 });
  if (lid)
    svg.rect(x - 6, y - 10, w + 12, 10, { fill: '#f6b07a', stroke: '#e07b39', width: 1.5, rx: 4 });
  return surface;
}

/** A small burner flame (a Bunsen-style nozzle with a flame) centered on x. */
export function flame(svg, x, y, s = 1, { burner = true } = {}) {
  if (burner) {
    svg.rect(x - 13 * s, y, 26 * s, 9 * s, { fill: '#c9c9c9', stroke: '#8a8a8a', width: 1, rx: 2 });
    svg.rect(x - 10 * s, y + 9 * s, 20 * s, 26 * s, {
      fill: '#e8e8e8',
      stroke: '#8a8a8a',
      width: 1,
    });
  }
  const f = (h, w, c) =>
    svg.path(
      `M ${x - w * s} ${y} C ${x - w * s * 1.4} ${y - h * s * 0.45} ${x - w * s * 0.2} ${y - h * s * 0.6} ${x + w * s * 0.1} ${y - h * s} C ${x + w * s * 0.3} ${y - h * s * 0.65} ${x + w * s * 1.5} ${y - h * s * 0.45} ${x + w * s} ${y} Z`,
      { color: c, width: 1, fill: c }
    );
  f(48, 13, '#f26b3a');
  f(32, 8, '#f9b233');
  f(16, 4, '#fde58a');
}

/** Oblique projection of a box: front face w × h at (x, y) bottom-left, depth d along 40°. */
function obliqueBox(svg, x, y, w, h, d, { stroke = GLASS, width = 2.5, dash, top } = {}) {
  const dx = d * Math.cos((40 * Math.PI) / 180);
  const dy = -d * Math.sin((40 * Math.PI) / 180);
  const P = (u, v, s) => [x + u + s * dx, y - v + s * dy];
  if (top) svg.polygon([P(0, h, 0), P(w, h, 0), P(w, h, 1), P(0, h, 1)], { fill: top });
  const edges = [
    [P(0, 0, 0), P(w, 0, 0)],
    [P(w, 0, 0), P(w, h, 0)],
    [P(w, h, 0), P(0, h, 0)],
    [P(0, h, 0), P(0, 0, 0)],
    [P(0, h, 0), P(0, h, 1)],
    [P(w, h, 0), P(w, h, 1)],
    [P(w, 0, 0), P(w, 0, 1)],
    [P(0, h, 1), P(w, h, 1)],
    [P(w, h, 1), P(w, 0, 1)],
  ];
  for (const [a, b] of edges) svg.line(...a, ...b, { color: stroke, width, dash, cap: 'round' });
  return P;
}

/** Points of a van der Waals isotherm in reduced units, with the Maxwell construction below Tc. */
export function vdwIsotherm(t, v0, v1, n = 400) {
  const p = v => (8 * t) / (3 * v - 1) - 3 / (v * v);
  const pts = [];
  let flat = null;
  if (t < 1) {
    // Equal areas: find the pressure whose line cuts the loop into two equal lobes.
    const roots = ps => {
      // Volumes where p(v) = ps, scanning the loop region.
      const out = [];
      let prev = p(0.36) - ps;
      for (let v = 0.36; v < 300; v *= 1.0005) {
        const cur = p(v * 1.0005) - ps;
        if (prev * cur < 0) out.push(v);
        prev = cur;
      }
      return out;
    };
    const area = (ps, a, b) => {
      // ∫ (p − ps) dv from a to b, with ln and 1/v antiderivatives.
      const F = v => (8 * t * Math.log(3 * v - 1)) / 3 + 3 / v - ps * v;
      return F(b) - F(a);
    };
    let lo = 0.01;
    let hi = (8 * t) / 3;
    for (let k = 0; k < 80; k += 1) {
      const ps = (lo + hi) / 2;
      const r = roots(ps);
      if (r.length < 3) {
        // Only the gas root: the line is below the loop. Only the liquid root: above it.
        if (!r.length || r[0] > 1) lo = ps;
        else hi = ps;
        continue;
      }
      if (area(ps, r[0], r[2]) > 0) lo = ps;
      else hi = ps;
    }
    const ps = (lo + hi) / 2;
    const r = roots(ps);
    flat = { p: ps, vl: r[0], vg: r[2] };
  }
  for (let k = 0; k <= n; k += 1) {
    const v = v0 * (v1 / v0) ** (k / n);
    const inside = flat && v > flat.vl && v < flat.vg;
    pts.push([v, inside ? flat.p : p(v)]);
  }
  return { pts, flat };
}

/** Molecular speed distribution f(v) ∝ v² exp(−v²/vp²), normalized to unit area. */
export const maxwell = vp => v =>
  ((4 / Math.sqrt(Math.PI)) * v * v * Math.exp(-(v * v) / (vp * vp))) / vp ** 3;

/** Equally spaced labels near their targets: push apart until `gap` separates neighbors. */
function spread(ys, gap) {
  const out = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  for (let pass = 0; pass < 200; pass += 1) {
    let moved = false;
    for (let k = 1; k < out.length; k += 1) {
      const d = out[k].y - out[k - 1].y;
      if (d < gap) {
        const push = (gap - d) / 2;
        out[k - 1].y -= push;
        out[k].y += push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  const res = [];
  for (const { y, i } of out) res[i] = y;
  return res;
}

/**
 * A schematic phase diagram (P versus T, not to scale) in pixel coordinates:
 * the sublimation, melting, and vaporization curves meet at the triple point
 * `tp`; vaporization ends at the critical point `cp`. Ticks are [pixel, label].
 */
function phaseDiagram(
  svg,
  {
    origin,
    tp,
    cp,
    sublimation,
    melting,
    vaporization,
    guides = [],
    fullGrid,
    yTicks,
    xTicks,
    title,
    regions,
  }
) {
  const [x0, y0] = origin;
  const [right, top] = [x0 + 380, 40];
  const dash = { color: COLORS.black, width: 1.4, dash: '6 5' };
  const points = [tp, cp, ...guides];
  for (const [y] of yTicks) {
    const p = points.find(q => Math.abs(q[1] - y) < 0.5);
    svg.line(x0, y, fullGrid ? right - 10 : p[0], y, dash);
  }
  for (const [x] of xTicks) {
    const p = points.find(q => Math.abs(q[0] - x) < 0.5);
    if (p || fullGrid) svg.line(x, fullGrid ? top + 10 : p[1], x, y0, dash);
  }
  for (const pts of [sublimation, melting, vaporization]) {
    svg.path(smoothPath(pts, 0.5), { color: CURVE, width: 3 });
  }
  svg.arrow(x0, y0, right + 14, y0, { color: COLORS.axis, width: 1.6, head: 12 });
  svg.arrow(x0, y0, x0, top - 14, { color: COLORS.axis, width: 1.6, head: 12 });
  for (const [y, label] of yTicks) {
    svg.line(x0 - 7, y, x0, y, { color: COLORS.axis, width: 1.5 });
    note(svg, x0 - 12, y, label, { anchor: 'end' });
  }
  for (const [x, label] of xTicks) {
    svg.line(x, y0, x, y0 + 7, { color: COLORS.axis, width: 1.5 });
    note(svg, x, y0 + 26, label);
  }
  for (const p of [tp, cp]) svg.circle(...p, 7, { fill: COLORS.black });
  svg.lines(cp[0] - 8, cp[1] - 50, ['Critical', 'point'], {
    size: 19,
    italic: false,
    anchor: 'end',
    gap: 22,
  });
  svg.lines(tp[0] + 14, tp[1] + 26, ['Triple', 'point'], {
    size: 19,
    italic: false,
    anchor: 'start',
    gap: 22,
  });
  note(svg, melting.at(-1)[0] + 50, top + 4, title, { size: 21 });
  for (const [s, x, y] of regions) note(svg, x, y, s, { size: 21 });
  note(svg, (x0 + right) / 2, y0 + 64, 'Temperature, \\it{T} (°C)');
  note(svg, x0 - 88, (y0 + top) / 2, 'Pressure, \\it{P} (atm)', { rotate: -90 });
}

export default {
  // 13.1 Fig. 1 — a bimetallic strip bends when heated
  Figure_13_01_01: () => {
    const svg = new Svg({
      width: 340,
      height: 460,
      title: 'Bimetallic strip',
      desc: '(a) A blue metal strip bonded lengthwise to a yellow one stands straight at temperature T₀. (b) At a higher temperature T the strip curves to the right: the blue metal on the left has expanded more than the yellow metal on the right.',
    });
    const L = 360;
    const base = 400;
    const BLUE = '#8fd3f2';
    const YELLOW = '#fbd24e';
    // (a)
    svg.rect(60, base - L, 20, L, { fill: BLUE, stroke: '#4fb3df', width: 1 });
    svg.rect(80, base - L, 20, L, { fill: YELLOW, stroke: '#e0b42a', width: 1 });
    svg.text(110, base - L * 0.55, 'T_0', { size: 22, anchor: 'start' });
    // (b) An arc about a center to the right; blue on the outside is longer.
    const R = 560;
    const cx = 200 + R;
    const th = L / R;
    const P = (r, a) => [cx - r * Math.cos(a), base - r * Math.sin(a)];
    const band = (r1, r2, fill, stroke) => {
      const [a1, a2, b2, b1] = [P(r1, 0), P(r1, th), P(r2, th), P(r2, 0)];
      svg.path(
        `M ${fmt(a1[0])} ${fmt(a1[1])} A ${r1} ${r1} 0 0 1 ${fmt(a2[0])} ${fmt(a2[1])} L ${fmt(b2[0])} ${fmt(b2[1])} A ${r2} ${r2} 0 0 0 ${fmt(b1[0])} ${fmt(b1[1])} Z`,
        { color: stroke, width: 1, fill }
      );
    };
    band(R + 20, R, BLUE, '#4fb3df');
    band(R, R - 20, YELLOW, '#e0b42a');
    const [lx, ly] = P(R - 20, th * 0.55);
    svg.text(lx + 14, ly, 'T > T_0', { size: 22, anchor: 'start' });
    caption(svg, 80, base + 34, '(a)');
    caption(svg, 210, base + 34, '(b)');
    return svg.render();
  },

  // 13.1 Fig. 4 — the Fahrenheit, Celsius, and Kelvin scales
  Figure_13_01_04: () => {
    const svg = new Svg({
      width: 960,
      height: 500,
      title: 'Fahrenheit, Celsius, and Kelvin scales',
      desc: 'Three horizontal temperature scales, one above the other, aligned. Absolute zero is −459.67 °F, −273.15 °C, and 0 K. 0 °F is −17.8 °C or 255.37 K. Water freezes at 32 °F, 0 °C, 273.15 K; normal body temperature is 98.6 °F, 37 °C, 310.15 K; water boils at 212 °F, 100 °C, 373.15 K. At the right, a span of 9 °F equals 5 °C and 5 K.',
    });
    // One ruler for all three rows: 1.5 px per °F, i.e. 2.7 px per °C or kelvin.
    const xF = F => 400 + (F - 32) * 1.5;
    const xC = C => xF(32 + 1.8 * C);
    const xK = K => xC(K - 273.15);
    const x0 = 70;
    const brk = 160;
    const end = 735;
    const tick = (x, y) => svg.line(x, y - 9, x, y + 9, { color: COLORS.black, width: 1.8 });
    const num = (x, y, s, o = {}) => svg.text(x, y, s, { size: 19, italic: false, ...o });
    const row = (y, marks, unit) => {
      svg.arrow(x0, y, end, y, { color: CURVE, width: 2.2, head: 16 });
      // A break in the axis between absolute zero and the scale proper.
      svg.rect(brk - 4, y - 12, 9, 24, { fill: '#ffffff' });
      for (const dx of [-4, 4]) {
        svg.path(`M ${brk + dx - 3} ${y + 10} Q ${brk + dx + 4} ${y} ${brk + dx - 1} ${y - 10}`, {
          color: COLORS.black,
          width: 1.5,
        });
      }
      for (const [x, label, above] of marks) {
        tick(x, y);
        if (label) num(x, above ? y - 24 : y + 26, label);
      }
      num(end - 4, y + 26, unit, { anchor: 'start' });
    };
    row(
      190,
      [
        [x0, '−459.67'],
        [xF(0), '0'],
        [xF(32), '32'],
        [xF(98.6), '98.6'],
        [xF(212), '212'],
      ],
      '°F'
    );
    row(
      315,
      [
        [x0, '−273.15'],
        [xC(-17.78), '−17.8'],
        [xC(0), '0'],
        [xC(37), '37'],
        [xC(100), '100'],
      ],
      '°C'
    );
    row(
      440,
      [
        [x0, '0'],
        [xK(255.37), '255.37', true],
        [xK(273.15), '273.15'],
        [xK(310.15), '310.15', true],
        [xK(373.15), '373.15'],
      ],
      'K'
    );
    const heads = [
      [x0, ['Absolute zero']],
      [xF(32), ['Freezing point', 'of water']],
      [xF(98.6), ['Normal body', 'temperature']],
      [xF(212), ['Boiling point', 'of water']],
    ];
    for (const [x, list] of heads) {
      svg.lines(x - (list.length - 1) * 10 + 6, 168, list, {
        size: 18,
        italic: false,
        anchor: 'start',
        rotate: -90,
        gap: 21,
      });
    }
    // Equal temperature differences, drawn to a common (magnified) scale.
    const W = 170;
    const sx = 765;
    for (const [y, n, label] of [
      [190, 9, '9°F'],
      [315, 5, '5°C'],
      [440, 5, '5 K'],
    ]) {
      svg.line(sx, y, sx + W, y, { color: COLORS.black, width: 1.8 });
      for (const x of [sx, sx + W])
        svg.line(x, y - 36, x, y + 9, { color: COLORS.black, width: 1.8 });
      for (let k = 1; k < n; k += 1) {
        const x = sx + (W * k) / n;
        svg.line(x, y - 9, x, y + 9, { color: COLORS.black, width: 1.5 });
      }
      svg.arrow(sx + 2, y - 24, sx + W - 2, y - 24, {
        color: COLORS.black,
        width: 1.5,
        head: 11,
        start: true,
      });
      svg.rect(sx + W / 2 - 26, y - 36, 52, 24, { fill: '#ffffff' });
      num(sx + W / 2, y - 24, label);
    }
    return svg.render();
  },

  // 13.1 Fig. 6 — the range of temperatures in nature, on a log scale
  Figure_13_01_06: () => {
    const lo = -10;
    const hi = 12;
    const per = 42;
    const top = 50;
    const axisX = 150;
    const Y = e => top + 30 + (hi - e) * per;
    const svg = new Svg({
      width: 560,
      height: Y(lo) + 60,
      title: 'Temperatures on a logarithmic scale',
      desc: 'A vertical logarithmic temperature axis in kelvin from 10⁻¹⁰ K to 10¹² K, each tick a factor of ten higher. Marked, from the bottom: the lowest temperature achieved (about 10⁻¹⁰ K), the Boomerang Nebula (1 K), liquid helium (4 K), liquid nitrogen (77 K), Vostok, Antarctica (183 K), water freezing (273 K) and boiling (373 K), a fireplace fire (about 1200 K), the solar surface and the center of the Earth (about 6000 K), the solar corona (about 10⁶ K), the solar interior (about 10⁷ K), rapid hydrogen fusion (10⁸ K), the interior of a neutron star (10⁹ K), and experiments at the Relativistic Heavy Ion Collider (about 4 × 10¹² K).',
    });
    svg.arrow(axisX, Y(lo) + 26, axisX, Y(hi) - 44, { color: COLORS.black, width: 1.8, head: 12 });
    svg.arrow(axisX, Y(hi) - 40, axisX, Y(lo) + 30, { color: COLORS.black, width: 1.8, head: 12 });
    for (let e = lo; e <= hi; e += 1) {
      svg.line(axisX - 10, Y(e), axisX + 10, Y(e), { color: COLORS.black, width: 1.5 });
      const exp = e < 0 ? `−${-e}` : `${e}`;
      svg.text(axisX - 18, Y(e), `10^{${exp}}`, { size: 19, anchor: 'end', italic: false });
    }
    const events = [
      [Math.log10(4e12), ['Experiments at the Relativistic', 'Heavy Ion Collider (RHIC)']],
      [9, ['Interior of a neutron star']],
      [8, ['Rapid hydrogen fusion']],
      [Math.log10(1.5e7), ['Solar interior']],
      [Math.log10(1.5e6), ['Solar corona']],
      [Math.log10(6000), ['Center of the Earth']],
      [Math.log10(5800), ['Solar surface']],
      [Math.log10(1200), ['Fireplace fire']],
      [Math.log10(373), ['Water boils']],
      [Math.log10(273), ['Water freezes']],
      [Math.log10(183), ['Vostok, Antarctica']],
      [Math.log10(77), ['Liquid nitrogen']],
      [Math.log10(4.2), ['Liquid helium']],
      [0, ['Boomerang Nebula']],
      [-10, ['Lowest temperature', 'achieved']],
    ];
    const gap = 22;
    // Labels are spaced by line count; multi-line labels sit centered on their leader.
    const ys = spread(
      events.map(([e]) => Y(e)),
      gap
    );
    events.forEach(([e, list], k) => {
      const y = ys[k] + (list.length > 1 ? (k === 0 ? -gap / 2 : gap / 2) : 0);
      svg.circle(axisX, Y(e), 4.5, { fill: CURVE });
      svg.polyline(
        [
          [axisX + 4, Y(e)],
          [axisX + 22, Y(e)],
          [axisX + 42, y],
          [axisX + 50, y],
        ],
        { color: '#888888', width: 1 }
      );
      svg.lines(axisX + 56, y - ((list.length - 1) * gap) / 2, list, {
        size: 18,
        italic: false,
        anchor: 'start',
        gap,
      });
    });
    svg.text(40, (Y(lo) + Y(hi)) / 2, 'Temperature, T (K)', {
      size: 20,
      rotate: -90,
      weight: 'bold',
    });
    return svg.render();
  },

  // 13.1 Fig. 7 — constant-volume gas thermometers extrapolate to −273.15 °C
  Figure_13_01_07: () => {
    const svg = new Svg({
      width: 480,
      height: 440,
      title: 'Pressure versus temperature at constant volume',
      desc: 'Pressure versus temperature for four gases held at constant volume. Each graph is a straight line; the lines have different slopes, but all extrapolate (dashed) to zero pressure at −273.15 °C.',
    });
    const g = new Plot(svg, {
      x: 70,
      y: 40,
      w: 330,
      h: 300,
      xRange: [-320, 160],
      yRange: [0, 1],
      xTicks: [-273.15, -200, -100, 0, 100],
    });
    svg.arrow(g.X(-320), g.Y(0), g.X(160) + 14, g.Y(0), {
      color: COLORS.axis,
      width: 1.5,
      head: 11,
    });
    svg.arrow(g.X(-320), g.Y(0), g.X(-320), g.Y(1) - 14, {
      color: COLORS.axis,
      width: 1.5,
      head: 11,
    });
    for (const t of g.xTicks)
      svg.line(g.X(t), g.Y(0) - 6, g.X(t), g.Y(0) + 6, { color: COLORS.axis });
    for (const t of [-200, -100, 0, 100]) note(svg, g.X(t), g.Y(0) + 22, t < 0 ? `−${-t}` : `${t}`);
    note(svg, g.X(-273.15), g.Y(0) + 46, '−273.15');
    const slopes = [0.0023, 0.00168, 0.00112, 0.00058];
    slopes.forEach((k, i) => {
      const P = T => k * (T + 273.15);
      const solid = -140;
      g.line(-273.15, 0, solid, P(solid), { color: CURVE, width: 2.5, dash: '9 6' });
      g.line(solid, P(solid), 140, P(140), { color: CURVE, width: 2.5 });
      note(svg, g.X(140) + 8, g.Y(P(140)), `Gas ${i + 1}`, { anchor: 'start' });
    });
    note(svg, g.X(-80), g.Y(0) + 80, 'Temperature, \\it{T} (°C)');
    note(svg, g.X(-320) - 22, g.Y(0.5), 'Pressure, \\it{P}', { rotate: -90 });
    return svg.render();
  },

  // 13.2 Fig. 2 — objects expand in every direction
  Figure_13_02_02: () => {
    const svg = new Svg({
      width: 800,
      height: 300,
      title: 'Thermal expansion in two and three dimensions',
      desc: 'Original boundaries are solid and expanded boundaries dashed. (a) A square plate with a circular plug: the plate and the plug both grow. (b) The same plate with the plug removed: the hole grows too. (c) A box grows in length, width, and height, so its volume increases.',
    });
    // Every length grows by the same factor, the plug and the hole included.
    const s = 1.1;
    const dashed = { color: EXPAND, width: 2, dash: '6 4' };
    const plate = (cx, hole) => {
      const [h, c, r] = [210, 130, 46];
      svg.rect(cx - h / 2, c - h / 2, h, h, { fill: WATER, stroke: GLASS, width: 2.5 });
      svg.circle(cx, c, r, { fill: hole ? '#ffffff' : WATER, stroke: GLASS, width: 2.5 });
      svg.circle(cx, c, r * s, { fill: 'none', stroke: EXPAND, width: 2 });
      svg.items[svg.items.length - 1] = svg.items.at(-1).replace('/>', ' stroke-dasharray="6 4"/>');
      const H = (h * s) / 2;
      svg.path(`M ${cx - H} ${c - H} H ${cx + H} V ${c + H} H ${cx - H} Z`, dashed);
    };
    plate(130, false);
    plate(395, true);
    // (c) A box, solid, and the same box scaled about its center, dashed.
    const box = (k, opts) => {
      const [w, h, d] = [140 * k, 140 * k, 110 * k];
      const cx = 660;
      const cy = 140;
      const dx = d * Math.cos((40 * Math.PI) / 180);
      const dy = d * Math.sin((40 * Math.PI) / 180);
      obliqueBox(svg, cx - (w + dx) / 2, cy + (h + dy) / 2, w, h, d, opts);
    };
    box(1, { stroke: GLASS, width: 2.5 });
    box(1.12, { stroke: EXPAND, width: 2, dash: '6 4' });
    caption(svg, 130, 282, '(a)');
    caption(svg, 395, 282, '(b)');
    caption(svg, 660, 282, '(c)');
    return svg.render();
  },

  // 13.2 Fig. 3 — the density of water peaks at 4 °C
  Figure_13_02_03: () => {
    const svg = new Svg({
      width: 720,
      height: 460,
      title: 'Density of freshwater',
      desc: 'Density of freshwater in g/cm³ versus temperature from 0 to 12 °C. The density rises from 0.99984 g/cm³ at 0 °C to a maximum of 0.99997 g/cm³ at 4 °C, then falls ever more steeply, to 0.99950 g/cm³ at 12 °C.',
    });
    const yTicks = [0.9995, 0.9996, 0.9997, 0.9998, 0.9999, 1.0];
    const g = new Plot(svg, {
      x: 140,
      y: 60,
      w: 540,
      h: 320,
      xRange: [0, 12],
      yRange: [0.9995, 1.0],
      xTicks: [0, 2, 4, 6, 8, 10, 12],
      yTicks,
      yFormat: v => v.toFixed(5),
    });
    for (let v = 0.99955; v < 1; v += 0.0001) g.line(0, v, 12, v, { color: COLORS.grid, width: 1 });
    g.axes({
      xTitle: 'Temperature (°C)',
      yTitle: 'Density (g/cm^3)',
      title: 'Density of Freshwater',
      grid: true,
      size: 16,
      titleSize: 17,
      yTitleOffset: 100,
    });
    // Tabulated density of air-free water at 1 atm (g/cm³).
    const rho = [
      0.99984, 0.9999, 0.99994, 0.99996, 0.99997, 0.99996, 0.99994, 0.9999, 0.99985, 0.99978,
      0.9997, 0.99961, 0.9995,
    ];
    g.series(
      rho.map((r, t) => [t, r]),
      { color: CURVE, width: 3, marker: 'square', markerSize: 5 }
    );
    return svg.render();
  },

  // 13.2 Check Your Understanding — two blocks of the same material
  Figure_13_02_06: () => {
    const svg = new Svg({
      width: 840,
      height: 360,
      title: 'Blocks A and B',
      desc: 'Block A has length L, width 2L, and height L; Block B has length, width, and height all 2L. The top face of each block, length × width, is shaded and labeled cross-sectional area.',
    });
    const L = 90;
    const lab = (x, y, s, o = {}) => svg.text(x, y, s, { size: 20, italic: false, ...o });
    // Width runs into the page, drawn at half scale along 40°.
    const P = obliqueBox(svg, 90, 270, L, L, L, { top: WATER });
    obliqueBox(svg, 90, 270, L, L, L);
    lab(90 + L / 2, 292, 'length = \\it{L}');
    lab(P(L, L / 2, 1)[0] + 12, P(L, L / 2, 1)[1] - 18, 'height = \\it{L}', { anchor: 'start' });
    lab(P(0, L, 0.5)[0] - 10, P(0, L, 0.5)[1] - 4, 'width = 2\\it{L}', { anchor: 'end' });
    lab(P(L / 2, L, 1)[0] + 30, P(L / 2, L, 1)[1] - 20, 'cross-sectional area');
    lab(90 + L / 2 + 30, 336, 'Block A');
    const Q = obliqueBox(svg, 460, 270, 2 * L, 2 * L, L, { top: WATER });
    obliqueBox(svg, 460, 270, 2 * L, 2 * L, L);
    lab(460 + L, 292, 'length = 2\\it{L}');
    lab(Q(2 * L, L, 1)[0] + 12, Q(2 * L, L, 1)[1], 'height = 2\\it{L}', { anchor: 'start' });
    lab(Q(0, 2 * L, 0.5)[0] - 10, Q(0, 2 * L, 0.5)[1] - 4, 'width = 2\\it{L}', { anchor: 'end' });
    lab(Q(L, 2 * L, 1)[0], Q(L, 2 * L, 1)[1] - 20, 'cross-sectional area');
    lab(460 + L + 30, 336, 'Block B');
    return svg.render();
  },

  // 13.3 Fig. 2 — atoms in a gas are far apart
  Figure_13_03_02: () => {
    const svg = new Svg({
      width: 480,
      height: 230,
      title: 'Atoms and molecules in a gas',
      desc: 'Spheres representing gas atoms and molecules, scattered at random and far apart compared with their size.',
    });
    for (const [x, y] of scatter(14, [20, 20, 440, 190], { seed: 7, gap: 70 }))
      molecule(svg, x, y, 10);
    return svg.render();
  },

  // 13.3 Fig. 3 — tire pressure as air is added and as the tire warms
  Figure_13_03_03: () => {
    const svg = new Svg({
      width: 1150,
      height: 316,
      title: 'Tire pressure, air, and temperature',
      desc: 'Three pairs of before-and-after tires, each with a pressure gauge. (a) Adding air to a flat tire inflates it, but the gauge rises only from zero to slightly above zero. (b) Adding air to an inflated tire raises the pressure from half scale to three-quarters. (c) Raising the temperature of an inflated tire raises its pressure from three-quarters to nearly full scale.',
    });
    const tire = (cx, cy, flat) => {
      const R = 60;
      if (flat) {
        // A flat tire: the bottom squashed against the road and the sides bulging.
        svg.path(
          `M ${cx - R - 4} ${cy + 12} C ${cx - R - 6} ${cy - R * 1.2} ${cx + R + 6} ${cy - R * 1.2} ${cx + R + 4} ${cy + 12} C ${cx + R + 2} ${cy + R - 6} ${cx + R - 12} ${cy + R} ${cx} ${cy + R} C ${cx - R + 12} ${cy + R} ${cx - R - 2} ${cy + R - 6} ${cx - R - 4} ${cy + 12} Z`,
          { color: '#33475b', width: 2, fill: '#5b7690' }
        );
      } else {
        svg.circle(cx, cy, R, { fill: '#5b7690', stroke: '#33475b', width: 2 });
      }
      svg.circle(cx, cy + (flat ? 6 : 0), R * 0.66, {
        fill: '#a9c2d6',
        stroke: '#7d98ae',
        width: 1.5,
      });
      const hy = cy + (flat ? 6 : 0);
      svg.circle(cx, hy, R * 0.48, { fill: '#e3e3e3', stroke: '#9a9a9a', width: 1.5 });
      for (let k = 0; k < 8; k += 1) {
        const a = (k * Math.PI) / 4;
        svg.circle(cx + R * 0.33 * Math.cos(a), hy + R * 0.33 * Math.sin(a), 4.5, {
          fill: '#b0b0b0',
        });
      }
      svg.circle(cx, hy, R * 0.17, { fill: '#c9c9c9', stroke: '#8a8a8a', width: 1.2 });
      return [cx + R * 0.42, hy + R * 0.42];
    };
    const pair = (x0, before, after, words, flat) => {
      const ty = 205;
      for (const [k, level, label] of [
        [0, before, 'P'],
        [1, after, 'P′'],
      ]) {
        const cx = x0 + 95 + k * 205;
        const [vx, vy] = tire(cx, ty, flat && k === 0);
        const [gx, gy] = [cx - 40, 58];
        // The hose runs from the gauge down the tire's left side and under it to the valve.
        svg.path(
          `M ${gx} ${gy + 44} C ${gx - 4} ${gy + 90} ${cx - 104} ${ty - 40} ${cx - 86} ${ty + 50} C ${cx - 74} ${ty + 96} ${vx - 20} ${vy + 40} ${vx} ${vy}`,
          { color: '#8b8fa3', width: 4 }
        );
        gauge(svg, gx, gy, 28, level, { label });
      }
      svg.path(`M ${x0 + 140} ${132} Q ${x0 + 180} ${108} ${x0 + 218} ${126}`, {
        color: ARROW,
        width: 2.2,
      });
      svg.arrow(x0 + 210, 121, x0 + 224, 130, { color: ARROW, width: 2.2, head: 13 });
      svg.lines(x0 + 180, 104 - (words.length - 1) * 22, words, {
        size: 19,
        italic: false,
        gap: 22,
      });
    };
    pair(10, 0.02, 0.12, ['Add', 'air'], true);
    pair(390, 0.5, 0.72, ['Add', 'air'], false);
    pair(770, 0.72, 0.92, ['Increase', 'temperature'], false);
    for (const [k, s] of ['(a)', '(b)', '(c)'].entries()) caption(svg, 207 + 380 * k, 300, s);
    return svg.render();
  },

  // 13.3 Fig. 4 — a mole of table tennis balls would bury the Earth 40 km deep
  Figure_13_03_04: () => {
    const svg = new Svg({
      width: 790,
      height: 360,
      title: 'A mole of table tennis balls',
      desc: 'A cross-section of the ground with Mt. Everest drawn to scale. A layer of table tennis balls about 40 km deep, the depth one mole of them would cover the Earth to, rises far above the mountain, which is under 9 km tall.',
    });
    const ground = 250;
    const top = 70;
    const km = (ground - top) / 40;
    svg.add(
      `<defs><pattern id="balls" width="14" height="13" patternUnits="userSpaceOnUse"><rect width="14" height="13" fill="#fff6e8"/><circle cx="7" cy="6.5" r="5.2" fill="#fde3bf" stroke="#e9b778" stroke-width="0.9"/></pattern><linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead2b0"/><stop offset="1" stop-color="#c49a6c"/></linearGradient></defs>`
    );
    svg.rect(10, top, 770, ground - top, { fill: 'url(#balls)' });
    svg.line(10, top, 780, top, { color: '#e9b778', width: 2 });
    // Everest: 8.85 km on the same vertical scale as the 40 km layer.
    const peak = ground - 8.85 * km;
    svg.polygon(
      [
        [250, ground],
        [292, peak + 14],
        [305, peak],
        [318, peak + 10],
        [345, peak + 26],
        [370, ground],
      ],
      { fill: '#7f95a4', stroke: '#4f6574', width: 1.5 }
    );
    svg.polygon(
      [
        [292, peak + 14],
        [305, peak],
        [318, peak + 10],
        [310, peak + 16],
        [300, peak + 12],
      ],
      { fill: '#ffffff' }
    );
    svg.rect(10, ground, 770, 90, { fill: 'url(#soil)' });
    svg.line(10, ground, 780, ground, { color: '#9c7349', width: 1.5 });
    const ax = 470;
    svg.line(ax - 10, top, ax + 10, top, { color: ARROW, width: 2 });
    svg.line(ax - 10, ground, ax + 10, ground, { color: ARROW, width: 2 });
    svg.arrow(ax, top + 2, ax, ground - 2, { color: ARROW, width: 2, head: 13, start: true });
    svg.rect(ax + 14, 136, 210, 52, { fill: '#fff6e8' });
    svg.lines(ax + 20, 150, ['Table tennis balls', 'about 40 km deep'], {
      size: 20,
      italic: false,
      anchor: 'start',
      gap: 24,
    });
    svg.arrow(305, ground + 58, 305, peak + 8, { color: ARROW, width: 1.8, head: 12 });
    svg.rect(260, ground + 48, 160, 26, { fill: 'none' });
    svg.lines(305, ground + 70, ['Mt. Everest (for scale)'], {
      size: 20,
      italic: false,
      halo: false,
    });
    return svg.render();
  },

  // 13.4 Fig. 1 — a molecule bouncing off a wall pushes on it
  Figure_13_04_01: () => {
    const svg = new Svg({
      width: 340,
      height: 520,
      title: 'A molecule colliding with a wall',
      desc: 'A wall seen at an angle. A molecule with velocity v strikes it and leaves with velocity v′: the component of its velocity perpendicular to the wall (the dashed normal) is reversed, while the component along the wall is unchanged. The molecule exerts a force F on the wall, pointing into it.',
    });
    // Oblique axes: z runs along the wall, rising to the right; x is the
    // outward normal, toward the lower right; y is up.
    const S = 140;
    const [ox, oy] = [150, 270];
    const P = ([x, y, z]) => [ox + S * (0.78 * z + 0.62 * x), oy - S * (y + 0.42 * z - 0.36 * x)];
    const wall = [
      [0, -1.15, -1],
      [0, 1.35, -1],
      [0, 1.35, 1],
      [0, -1.15, 1],
    ];
    svg.polygon(
      wall.map(([x, y, z]) => P([x - 0.05, y, z])),
      { fill: '#e6c89a', stroke: '#b58d5c', width: 1 }
    );
    svg.polygon(wall.map(P), { fill: '#fdeccb', stroke: '#c49a6c', width: 1.5 });
    const I = [0, 0.15, 0.1];
    const add = (a, b, k = 1) => a.map((c, i) => c + k * b[i]);
    const vIn = [-0.7, 0.62, -0.05];
    const vOut = [0.7, 0.62, -0.05];
    svg.line(...P(I), ...P(add(I, [1.15, 0, 0])), { color: COLORS.black, width: 1.8, dash: '7 5' });
    svg.line(...P(add(I, [-0.25, 0, 0])), ...P(I), { color: COLORS.black, width: 1.8 });
    svg.arrow(...P(add(I, vIn, -1)), ...P(I), { color: GO, width: 2.6, head: 14 });
    svg.arrow(...P(I), ...P(add(I, vOut, 0.75)), { color: GO, width: 2.6, head: 14 });
    // The force on the wall points into it, along −x.
    svg.arrow(...P(add(I, [0, 0.42, 0.03])), ...P(add(I, [-0.62, 0.42, 0.03])), {
      color: CURVE,
      width: 4,
      head: 18,
    });
    svg.text(...add(P(add(I, vIn, -0.55)), [16, 6]), '**v**', { size: 22, anchor: 'start' });
    svg.text(...add(P(add(I, vOut, 0.4)), [-6, -20]), '**v**′', { size: 22 });
    const fp = P(add(I, [-0.35, 0.42, 0.03]));
    svg.text(fp[0] + 6, fp[1] - 22, '**F**', { size: 22 });
    return svg.render();
  },

  // 13.4 Fig. 2 — the gas pushes outward on each wall of its box
  Figure_13_04_02: () => {
    const svg = new Svg({
      width: 520,
      height: 640,
      title: 'Gas molecule striking a wall of its box',
      desc: 'A small box of gas at the upper left, with one wall enlarged at the right. A molecule strikes the wall: its velocity component v_x, perpendicular to the wall, reverses to v′_x, while its component v_y along the wall is unchanged, v′_y = v_y. The axes show x perpendicular to the wall and y and z along it.',
    });
    // x is the wall's outward normal (lower right), z runs along the wall
    // (toward the lower left), y is up.
    const S = 160;
    const P = ([x, y, z], o = [265, 420]) => [
      o[0] + S * (0.6 * x - 0.88 * z),
      o[1] - S * (y - 0.42 * x - 0.85 * z),
    ];
    // The enlarged wall: x = 0, z from −1 (back) to 0 (front), y from −0.95 to 1.6.
    const corners = [
      [0, -0.95, 0],
      [0, 1.6, 0],
      [0, 1.6, -1],
      [0, -0.95, -1],
    ].map(c => P(c));
    // The small box, its right face the wall we zoom in on.
    const s = 0.22;
    const b = ([x, y, z]) => P([x * s, y * s, z * s], [70, 150]);
    const box = [
      [-1, -0.95, 0],
      [0, -0.95, 0],
      [0, 1.6, 0],
      [-1, 1.6, 0],
      [-1, -0.95, -1],
      [0, -0.95, -1],
      [0, 1.6, -1],
      [-1, 1.6, -1],
    ].map(b);
    svg.add(
      '<defs><linearGradient id="zoom" x1="0" y1="0" x2="1" y2="0"><stop offset="0.2" stop-color="#ffffff"/><stop offset="1" stop-color="#bfe3f6"/></linearGradient></defs>'
    );
    svg.polygon([box[1], box[2], corners[1], corners[0]], { fill: 'url(#zoom)' });
    svg.polygon([box[2], box[6], corners[2], corners[1]], { fill: 'url(#zoom)', opacity: 0.6 });
    for (const [a, c] of [
      [box[1], corners[0]],
      [box[2], corners[1]],
      [box[6], corners[2]],
    ]) {
      svg.line(...a, ...c, { color: '#b58d5c', width: 1.2 });
    }
    // Box faces: top, left, front.
    svg.polygon([box[3], box[2], box[6], box[7]], {
      fill: '#efdcb8',
      stroke: '#b58d5c',
      width: 1.2,
    });
    svg.polygon([box[1], box[2], box[6], box[5]], {
      fill: '#fdeccb',
      stroke: '#b58d5c',
      width: 1.2,
    });
    svg.polygon([box[0], box[1], box[2], box[3]], {
      fill: '#d8b98a',
      stroke: '#b58d5c',
      width: 1.2,
    });
    svg.polygon(corners, { fill: '#fdeccb', stroke: '#c49a6c', width: 1.5 });
    // Faint lines show the planes behind continuing past the enlarged wall.
    for (const c of [
      [0, 1.6, -1],
      [0, -0.95, -1],
      [0, -0.95, 0],
    ]) {
      svg.line(...P(c), ...P([0.75, c[1], c[2]]), { color: '#999999', width: 1.5, dash: '6 5' });
    }
    // The collision, drawn on the face of the wall.
    const I = [0, 0.75, -0.55];
    const add = (a, d) => a.map((c, i) => c + d[i]);
    const [vx, vy] = [0.6, 0.55];
    const A = add(I, [vx, -vy, 0]);
    const B = add(I, [0, -vy, 0]);
    const C = add(I, [0, vy, 0]);
    const D = add(I, [vx, vy, 0]);
    const comp = { color: GO, width: 1.6, dash: '6 4', head: 11 };
    svg.arrow(...P(A), ...P(B), comp);
    svg.arrow(...P(B), ...P(I), comp);
    svg.arrow(...P(I), ...P(C), comp);
    svg.arrow(...P(C), ...P(D), comp);
    svg.arrow(...P(A), ...P(I), { color: GO, width: 3, head: 15 });
    svg.arrow(...P(I), ...P(D), { color: GO, width: 3, head: 15 });
    const at = (p, dx, dy, s) => svg.text(P(p)[0] + dx, P(p)[1] + dy, s, { size: 20 });
    at(add(A, [-vx / 2, 0, 0]), 4, 18, 'v_x');
    at(add(B, [0, vy / 2, 0]), -20, 0, 'v_y');
    at(add(I, [0, vy / 2, 0]), -20, 0, 'v′_y');
    at(add(C, [vx / 2, 0, 0]), 0, -16, 'v′_x');
    // Axes on the wall.
    const o = P([0, -0.55, -0.4]);
    const ax = (d, label, dx, dy) => {
      const e = P(add([0, -0.55, -0.4], d));
      svg.arrow(...o, ...e, { color: COLORS.black, width: 1.4, head: 9 });
      svg.text(e[0] + dx, e[1] + dy, label, { size: 18 });
    };
    ax([0.28, 0, 0], 'x', 10, 0);
    ax([0, 0.32, 0], 'y', -10, -4);
    ax([0, 0, 0.28], 'z', -6, 12);
    return svg.render();
  },

  // 13.4 Fig. 3 — molecular chaos and a sound wave passing through it
  Figure_13_04_03: () => {
    const svg = new Svg({
      width: 700,
      height: 360,
      title: 'Molecules in a gas and a sound wave',
      desc: '(a) Molecules in a gas move in random directions with a wide range of speeds. (b) A sound wave, shown as a curved band, passes through the gas: the molecules in the band move roughly along the direction the wave travels, to the right, while the others move at random.',
    });
    const GAS = '#cfe39a';
    const box = [10, 10, 310, 300];
    svg.rect(...box, { fill: GAS, stroke: '#3fa38a', width: 2 });
    movingMolecules(
      svg,
      within(
        scatter(34, [30, 30, 270, 260], { seed: 3, gap: 38, vmin: 22, vmax: 70 }),
        [18, 18, 312, 302]
      )
    );
    const bx = 380;
    svg.rect(bx, 10, 310, 300, { fill: GAS, stroke: '#3fa38a', width: 2 });
    // The compression: a band along a circle centered far to the left.
    const [cx, cy, R] = [bx - 260, 160, 420];
    const bandPath = (r1, r2) => {
      const ang = r => Math.asin(150 / r);
      const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const [p1, p2, p3, p4] = [
        pt(r1, -ang(r1)),
        pt(r1, ang(r1)),
        pt(r2, ang(r2)),
        pt(r2, -ang(r2)),
      ];
      return `M ${fmt(p1[0])} ${fmt(p1[1])} A ${r1} ${r1} 0 0 1 ${fmt(p2[0])} ${fmt(p2[1])} L ${fmt(p3[0])} ${fmt(p3[1])} A ${r2} ${r2} 0 0 0 ${fmt(p4[0])} ${fmt(p4[1])} Z`;
    };
    svg.add(
      `<defs><linearGradient id="wave" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#79b34a"/><stop offset="1" stop-color="#eef6dd"/></linearGradient></defs>`
    );
    svg.path(bandPath(R - 28, R + 28), { color: 'none', width: 0, fill: 'url(#wave)' });
    const inBand = ([x, y]) => Math.abs(Math.hypot(x - cx, y - cy) - R) < 34;
    const others = within(
      scatter(44, [bx + 20, 30, 270, 260], { seed: 11, gap: 36, vmin: 22, vmax: 62 }),
      [bx + 8, 18, bx + 302, 302]
    ).filter(m => !inBand(m));
    const rand = rng(5);
    const band = [];
    for (let k = 0; k < 9; k += 1) {
      const a = -0.32 + (0.64 * k) / 8;
      const r = R + (rand() - 0.5) * 30;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      // Moving outward, along the wave's direction, give or take a little.
      const d = a + (rand() - 0.5) * 0.5;
      const v = 40 + rand() * 18;
      band.push([x, y, v * Math.cos(d), v * Math.sin(d)]);
    }
    movingMolecules(svg, [...others, ...band]);
    svg.path(bandPath(R, R).split(' L ')[0], { color: '#1f6fb5', width: 1.8, dash: '6 5' });
    caption(svg, 165, 342, '(a)');
    caption(svg, bx + 155, 342, '(b)');
    return svg.render();
  },

  // 13.4 Fig. 4 — the Maxwell–Boltzmann distribution for oxygen at 300 K
  Figure_13_04_04: () => {
    const svg = new Svg({
      width: 650,
      height: 500,
      title: 'Maxwell–Boltzmann distribution of molecular speeds',
      desc: 'Probability versus speed v for oxygen molecules at T = 300 K. The curve rises from zero, peaks at the most probable speed v_p ≈ 395 m/s, and falls off in a long tail toward high speeds. The rms speed, v_rms ≈ 484 m/s, lies to the right of the peak.',
    });
    const g = new Plot(svg, {
      x: 70,
      y: 50,
      w: 530,
      h: 360,
      xRange: [0, 1300],
      yRange: [0, 2.6e-3],
      xTicks: [0, 200, 400, 600, 800, 1000, 1200],
    });
    g.axes({
      arrows: true,
      xTitle: 'Speed \\it{v} (m/s)',
      yTitle: 'Probability',
      size: 17,
      titleSize: 19,
      yTitleOffset: 30,
      xTitleOffset: 50,
    });
    // O₂ at 300 K: v_p = √(2kT/m), v_rms = √(3kT/m).
    const m = 32 * 1.6605e-27;
    const kT = 1.380649e-23 * 300;
    const vp = Math.sqrt((2 * kT) / m);
    const vrms = Math.sqrt((3 * kT) / m);
    const f = maxwell(vp);
    g.fn(f, 0, 1290, { color: CURVE, width: 3.5 });
    for (const [v, label, dx] of [
      [vp, 'v_p', 0],
      [vrms, 'v_{rms}', 18],
    ]) {
      g.line(v, 0, v, f(v), { color: COLORS.black, width: 2, dash: '7 5' });
      svg.circle(g.X(v), g.Y(f(v)), 6, { fill: COLORS.black });
      svg.text(g.X(v) + dx, g.Y(f(v)) - (dx ? 18 : 26), label, {
        size: 22,
        anchor: dx ? 'start' : 'middle',
      });
    }
    svg.text(g.X(780), g.Y(1.05e-3), 'O_2 at \\it{T} = 300 K', {
      size: 21,
      math: false,
      anchor: 'start',
    });
    return svg.render();
  },

  // 13.4 Fig. 5 — the distribution shifts and spreads at higher temperature
  Figure_13_04_05: () => {
    const svg = new Svg({
      width: 650,
      height: 520,
      title: 'Speed distributions at two temperatures',
      desc: 'Probability versus speed v at two temperatures, T₂ > T₁. The T₂ curve peaks at a higher speed and is broader and lower, since the area under each curve is the same.',
    });
    const g = new Plot(svg, {
      x: 80,
      y: 50,
      w: 520,
      h: 380,
      xRange: [0, 1300],
      yRange: [0, 3.5e-3],
    });
    g.axes({
      arrows: true,
      xTitle: 'Speed \\it{v} (m/s)',
      yTitle: 'Probability',
      size: 17,
      titleSize: 19,
      yTitleOffset: 30,
      xTitleOffset: 30,
    });
    // T₂ = 2.25 T₁, so v_p grows by 1.5 and the peak drops to 2/3.
    const [v1, v2] = [280, 420];
    g.fn(maxwell(v1), 0, 1000, { color: CURVE, width: 3.5 });
    g.fn(maxwell(v2), 0, 1290, { color: '#7ab32e', width: 3.5 });
    svg.text(g.X(v1) + 30, g.Y(maxwell(v1)(v1)) - 10, 'T_1', { size: 22, anchor: 'start' });
    svg.text(g.X(v2) + 40, g.Y(maxwell(v2)(v2)) - 10, 'T_2', { size: 22, anchor: 'start' });
    svg.text(g.X(1000), g.Y(3.2e-3), 'T_2 > T_1', { size: 22 });
    return svg.render();
  },

  // 13.5 Fig. 1 — a real gas condenses and freezes before reaching absolute zero
  Figure_13_05_01: () => {
    const svg = new Svg({
      width: 520,
      height: 500,
      title: 'Volume versus temperature for a real gas',
      desc: 'Volume versus temperature at constant pressure. Above about −183 °C the gas follows the ideal-gas straight line, which extrapolates (dashed) to zero volume at −273.15 °C. At about −183 °C the gas condenses to a liquid and the volume drops almost to zero; at about −218 °C the liquid freezes to a solid, a further small decrease.',
    });
    const g = new Plot(svg, {
      x: 80,
      y: 40,
      w: 390,
      h: 330,
      xRange: [-320, 160],
      yRange: [0, 1],
    });
    svg.arrow(g.X(-320), g.Y(0), g.X(160) + 14, g.Y(0), {
      color: COLORS.axis,
      width: 1.5,
      head: 11,
    });
    svg.arrow(g.X(-320), g.Y(0), g.X(-320), g.Y(1) - 14, {
      color: COLORS.axis,
      width: 1.5,
      head: 11,
    });
    for (const t of [-273.15, -200, -100, 0, 100]) {
      svg.line(g.X(t), g.Y(0) - 6, g.X(t), g.Y(0) + (t === -273.15 ? 24 : 6), {
        color: COLORS.axis,
      });
    }
    for (const t of [-200, -100, 0, 100]) note(svg, g.X(t), g.Y(0) + 22, t < 0 ? `−${-t}` : `${t}`);
    note(svg, g.X(-273.15), g.Y(0) + 46, '−273.15');
    const k = 0.0024;
    const V = T => k * (T + 273.15);
    const [boil, freeze] = [-183, -218];
    g.line(-273.15, 0, boil, V(boil), { color: CURVE, width: 3, dash: '9 6' });
    g.line(boil, V(boil), 130, V(130), { color: CURVE, width: 3 });
    // Liquid and solid take up a tiny fraction of the gas volume.
    g.series(
      [
        [boil, V(boil)],
        [boil, 0.035],
        [freeze, 0.03],
        [freeze, 0.022],
        [-273.15, 0.02],
      ],
      { color: COLORS.black, width: 2.2 }
    );
    note(svg, g.X(-110), g.Y(0.93), 'Ideal gas behavior');
    svg.squiggle(g.X(-60), g.Y(0.88), g.X(10) - 4, g.Y(V(10)) - 4, { waves: 1, amp: 4 });
    svg.lines(g.X(-305), g.Y(0.42), ['freezes to form', 'a solid'], {
      size: 19,
      italic: false,
      anchor: 'start',
      gap: 23,
    });
    svg.leader(g.X(-270), g.Y(0.31), g.X(freeze) + 4, g.Y(0.04), { bend: -0.3 });
    svg.lines(g.X(-130), g.Y(0.3), ['condenses to form', 'a liquid'], {
      size: 19,
      italic: false,
      anchor: 'start',
      gap: 23,
    });
    svg.leader(g.X(-135), g.Y(0.3), g.X(boil) + 4, g.Y(0.18), { bend: 0.2 });
    note(svg, g.X(-80), g.Y(0) + 84, 'Temperature, \\it{T} (°C)');
    note(svg, g.X(-320) - 22, g.Y(0.5), 'Volume, \\it{V}', { rotate: -90 });
    return svg.render();
  },

  // 13.5 Fig. 2 — van der Waals isotherms and the liquid–vapor dome
  Figure_13_05_04: () => {
    const svg = new Svg({
      width: 1220,
      height: 590,
      title: 'PV diagrams of a real substance',
      desc: '(a) Isotherms on a pressure–volume diagram for T₅ > T₄ > T₃ > T_c > T₂ > T₁. The upper curves are close to ideal-gas hyperbolas; below the critical temperature T_c each isotherm has a flat segment across a shaded dome, the liquid–vapor equilibrium region, with liquid to its left and vapor to its right. (b) An enlarged view near the critical point, at the top of the dome. The critical isotherm T_c just touches the dome there. To the left is the liquid region, under the dome the liquid–vapor region, to the right of the saturation curve the vapor region, and above, gas that is real but not ideal.',
    });
    // The dome (coexistence curve) from the Maxwell construction.
    const sides = [];
    for (let t = 0.45; t < 0.995; t += 0.01) sides.push(vdwIsotherm(t, 0.45, 6, 10).flat);
    const domePts = [
      ...sides.map(d => [d.vl, d.p]),
      [1, 1],
      ...sides.reverse().map(d => [d.vg, d.p]),
    ];
    const pv = t => v => (8 * t) / (3 * v - 1) - 3 / (v * v);
    // Volume runs on a log scale, which keeps both the steep liquid branch and
    // the long vapor tail in view and makes the dome a bell, as usually drawn.
    const panel = (x, isotherms, { vRange, pRange }) => {
      const g = new Plot(svg, {
        x: x + 90,
        y: 40,
        w: 470,
        h: 420,
        xRange: vRange.map(Math.log),
        yRange: pRange,
      });
      const at = (v, p) => g.P(Math.log(v), p);
      const clipId = `clip${x}`;
      svg.add(
        `<defs><clipPath id="${clipId}"><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}"/></clipPath></defs>`
      );
      const inner = svg.capture(() => {
        svg.path(
          `${smoothPath(
            domePts.map(([v, p]) => at(v, p)),
            0.3
          )} Z`,
          {
            color: GLASS,
            width: 2,
            fill: WATER,
          }
        );
        for (const { t, end = vRange[1] } of isotherms) {
          const { pts } = vdwIsotherm(t, vRange[0], end, 500);
          svg.polyline(
            pts
              .filter(([, p]) => p < pRange[1] * 1.3 && p > pRange[0] - 0.2)
              .map(([v, p]) => at(v, p)),
            { color: CURVE, width: 2.8 }
          );
        }
      });
      svg.add(`<g clip-path="url(#${clipId})">${inner}</g>`);
      const [bx, by] = [g.x, g.y + g.h];
      svg.arrow(bx, by, g.x + g.w + 16, by, { color: COLORS.axis, width: 1.6, head: 12 });
      svg.arrow(bx, by, bx, g.y - 16, { color: COLORS.axis, width: 1.6, head: 12 });
      note(svg, g.x + g.w / 2, by + 34, 'Volume, \\it{V}');
      note(svg, g.x - 34, g.y + g.h / 2, 'Pressure, \\it{P}', { rotate: -90 });
      for (const { t, label, end = vRange[1] } of isotherms) {
        if (label)
          svg.text(...add2(at(end, pv(t)(end)), [6, 2]), label, { size: 20, anchor: 'start' });
      }
      return { g, at };
    };
    const add2 = (a, b) => [a[0] + b[0], a[1] + b[1]];

    // (a) Each isotherm stops a little further right than the one above it, so
    // the labels at their ends stay apart.
    const a = panel(
      0,
      [
        { t: 0.8, label: 'T_1', end: 9 },
        { t: 0.9, label: 'T_2', end: 6.8 },
        { t: 1, label: 'T_c', end: 5.1 },
        { t: 1.12, label: 'T_3', end: 3.9 },
        { t: 1.26, label: 'T_4', end: 3.1 },
        { t: 1.42, label: 'T_5', end: 2.5 },
      ],
      { vRange: [0.42, 9.5], pRange: [0, 1.9] }
    );
    note(svg, a.g.x - 12, a.g.y + a.g.h, '0', { anchor: 'end' });
    const { flat } = vdwIsotherm(0.9, 0.45, 6, 10);
    for (const v of [flat.vl, flat.vg])
      svg.circle(...a.at(v, flat.p), 6, { fill: CURVE, stroke: '#5a0000', width: 1 });
    svg.text(...a.at(4.6, 1.8), 'T_5 > T_4 > T_3 > T_c > T_2 > T_1', { size: 20 });
    note(svg, ...a.at(0.425, 0.55), 'Liquid', { anchor: 'start', size: 18 });
    note(svg, ...a.at(7.6, 0.72), 'Vapor');
    svg.leader(...add2(a.at(7.6, 0.72), [-8, 10]), ...a.at(5.3, 0.29), { bend: -0.2 });
    // Inside the dome, below the lowest tie line: a leader from outside would
    // have to cross the column of isotherm labels.
    svg.lines(...a.at(1.4, 0.24), ['Liquid–vapor', 'equilibrium region'], {
      size: 19,
      italic: false,
      gap: 22,
    });
    caption(svg, 30, 565, '(a)');

    // (b) Close to the critical point.
    const b = panel(620, [{ t: 0.88 }, { t: 1, label: 'T_c', end: 3.4 }, { t: 1.1 }, { t: 1.22 }], {
      vRange: [0.45, 4],
      pRange: [0.3, 1.7],
    });
    const [cx, cy] = b.at(1, 1);
    svg.line(b.g.x, cy, cx, cy, { color: COLORS.black, width: 1.5, dash: '6 5' });
    svg.line(cx, cy, cx, b.g.y + b.g.h, { color: COLORS.black, width: 1.5, dash: '6 5' });
    svg.circle(cx, cy, 6.5, { fill: COLORS.black });
    note(svg, cx + 10, cy - 20, 'Critical point', { anchor: 'start' });
    svg.lines(...add2(b.at(0.5, 0.95), [30, 0]), ['Liquid', 'region'], {
      size: 19,
      italic: false,
      anchor: 'start',
      gap: 22,
    });
    note(svg, ...b.at(1, 0.42), 'Liquid–vapor region');

    note(svg, ...add2(b.at(2.1, 1.5), [24, 0]), 'True but not ideal gas');
    // Labels that run along a curve, rotated to its slope at v.
    const along = (f, v, label, off) => {
      const [x1, y1] = b.at(v * 0.97, f(v * 0.97));
      const [x2, y2] = b.at(v * 1.03, f(v * 1.03));
      const ang = Math.atan2(y2 - y1, x2 - x1);
      svg.text((x1 + x2) / 2 + off * Math.sin(ang), (y1 + y2) / 2 - off * Math.cos(ang), label, {
        size: 19,
        italic: false,
        rotate: (ang * 180) / Math.PI,
      });
    };
    along(pv(1), 2.1, 'Critical isotherm', 16);
    // Between the critical isotherm and the one below it, right of the dome.
    along(pv(0.94), 2.7, 'Vapor region', 0);
    // The vapor side of the dome, as p(v), for the saturation-curve label.
    const vapor = domePts.slice(sides.length + 1);
    const sat = v => {
      const k = vapor.findIndex(([q]) => q > v);
      const [[v1, p1], [v2, p2]] = [vapor[k - 1], vapor[k]];
      return p1 + ((p2 - p1) * (v - v1)) / (v2 - v1);
    };
    along(sat, 1.75, 'Saturation curve', -14);
    caption(svg, 650, 565, '(b)');
    return svg.render();
  },

  // 13.5 Fig. 3 — the phase diagram of water
  Figure_13_05_05: () => {
    const svg = new Svg({
      width: 540,
      height: 520,
      title: 'Phase diagram for water',
      desc: 'Pressure versus temperature for water, with nonlinear axes not to scale. The solid (s), liquid (l), and vapor (v) regions meet at the triple point, 0.006 atm and 0.01 °C. The solid–liquid boundary rises steeply and leans to the left: raising the pressure lowers the melting point. The liquid–vapor boundary passes through 1 atm at 100 °C and ends at the critical point, 218 atm and 374 °C. Below the triple point, solid sublimes directly to vapor.',
    });
    phaseDiagram(svg, {
      origin: [140, 420],
      tp: [228, 310],
      cp: [412, 82],
      sublimation: [
        [140, 420],
        [190, 368],
        [228, 310],
      ],
      melting: [
        [228, 310],
        [214, 200],
        [206, 70],
      ],
      vaporization: [
        [228, 310],
        [300, 280],
        [350, 240],
        [385, 175],
        [412, 82],
      ],
      guides: [[350, 240]],
      yTicks: [
        [82, '218'],
        [240, '1'],
        [310, '0.006'],
      ],
      xTicks: [
        [200, '0'],
        [228, '0.01'],
        [350, '100'],
        [412, '374'],
      ],
      title: 'H_2O',
      regions: [
        ['s', 175, 280],
        ['l', 272, 170],
        ['v', 385, 290],
      ],
    });
    return svg.render();
  },

  // 13.5 Fig. 4 — liquid and vapor in equilibrium at two temperatures
  Figure_13_05_06: () => {
    const svg = new Svg({
      width: 790,
      height: 500,
      title: 'Liquid–vapor equilibrium at two temperatures',
      desc: 'Two closed containers of liquid and its vapor, each with a pressure gauge and a thermometer. (a) The rate of vaporization (green arrow up) equals the rate of condensation (purple arrow down). (b) At a higher temperature, the pressure is higher and both rates are larger, but they are still equal.',
    });
    const panel = (x, level, temp, len) => {
      const [y, w, h, surface] = [140, 370, 285, 285];
      svg.rect(x, surface, w, y + h - surface, { fill: WATER, rx: 0 });
      svg.rect(x, y, w, h, { stroke: GLASS, width: 2.5, rx: 12 });
      svg.line(x, surface, x + w, surface, { color: '#8cc9e8', width: 1.5 });
      gauge(svg, x + 120, 72, 46, level);
      thermometer(svg, x + 320, 300, 260, temp);
      // Equal rates: arrows of equal length, longer at the higher temperature.
      svg.arrow(x + 120, surface + len * 0.35, x + 120, surface - len * 0.65, {
        color: GO,
        width: 3,
        head: 14,
      });
      svg.arrow(x + 190, surface - len * 0.65, x + 190, surface + len * 0.35, {
        color: PURPLE,
        width: 3,
        head: 14,
      });
      note(svg, x + 112, surface - len * 0.65 + 10, 'Vaporization', { anchor: 'end', size: 18 });
      note(svg, x + 198, surface - len * 0.65 + 10, 'Condensation', { anchor: 'start', size: 18 });
    };
    panel(10, 0.42, 0.4, 100);
    panel(410, 0.62, 0.85, 200);
    caption(svg, 195, 482, '(a)');
    caption(svg, 595, 482, '(b)');
    return svg.render();
  },

  // 13.5 Fig. 5 — the phase diagram of carbon dioxide
  Figure_13_05_08: () => {
    const svg = new Svg({
      width: 560,
      height: 520,
      title: 'Phase diagram for carbon dioxide',
      desc: 'Pressure versus temperature for carbon dioxide, with nonlinear axes not to scale. The solid, liquid, and vapor regions meet at the triple point, 5.11 atm and −56.6 °C; the solid–liquid boundary rises steeply and leans right. At 1 atm solid CO₂ sublimes at −78.5 °C, so there is no liquid at atmospheric pressure. The liquid–vapor boundary passes 56 atm at 20 °C and ends at the critical point, 73 atm and 31 °C.',
    });
    phaseDiagram(svg, {
      origin: [120, 428],
      tp: [273, 310],
      cp: [465, 124],
      sublimation: [
        [120, 428],
        [208, 376],
        [273, 310],
      ],
      melting: [
        [273, 310],
        [300, 210],
        [312, 120],
        [316, 50],
      ],
      vaporization: [
        [273, 310],
        [340, 252],
        [400, 188],
        [465, 124],
      ],
      guides: [
        [208, 376],
        [400, 188],
      ],
      fullGrid: true,
      yTicks: [
        [124, '73'],
        [188, '56'],
        [310, '5.11'],
        [376, '1'],
      ],
      xTicks: [
        [208, '−78.5'],
        [273, '−56.6'],
        [400, '20'],
        [465, '31'],
      ],
      title: 'CO_2',
      regions: [
        ['s', 160, 160],
        ['l', 355, 160],
        ['v', 430, 258],
      ],
    });
    return svg.render();
  },

  // 13.6 Fig. 2 — evaporation from an open and from a sealed container
  Figure_13_06_01: () => {
    const svg = new Svg({
      width: 680,
      height: 470,
      title: 'Evaporation in open and sealed containers',
      desc: '(a) In an open container of water, a few of the fastest molecules escape the surface and leave. (b) In a sealed container, vapor builds up above the water until as many molecules condense, some of them on the walls and lid, as evaporate.',
    });
    const container = (x, lid) => {
      const surface = beaker(svg, x, 30, 300, 380, { fill: 0.65, lid });
      const liquid = scatter(26, [x + 25, surface + 20, 250, 410 - surface - 45], {
        seed: lid ? 21 : 13,
        gap: 40,
        vmin: 22,
        vmax: 50,
      });
      const vapor = lid
        ? scatter(16, [x + 22, 50, 256, surface - 70], { seed: 4, gap: 40, vmin: 18, vmax: 42 })
        : scatter(6, [x + 30, 10, 240, surface - 40], { seed: 9, gap: 60, vmin: 26, vmax: 50 });
      if (lid) {
        // Condensation: droplets beading on the walls and under the lid.
        const rand = rng(17);
        for (let k = 0; k < 40; k += 1) {
          const side = k % 3;
          const [dx, dy] =
            side === 0
              ? [x + 10 + rand() * 12, 35 + rand() * (surface - 50)]
              : side === 1
                ? [x + 278 + rand() * 12, 35 + rand() * (surface - 50)]
                : [x + 10 + rand() * 280, 26 + rand() * 12];
          svg.circle(dx, dy, 2.5 + rand() * 3, { fill: '#d9eef9', stroke: '#9fd3f0', width: 0.8 });
        }
      }
      movingMolecules(svg, within([...liquid, ...vapor], [x + 12, lid ? 34 : 6, x + 288, 400]));
    };
    container(10, false);
    container(360, true);
    caption(svg, 160, 450, '(a)');
    caption(svg, 510, 450, '(b)');
    return svg.render();
  },

  // 13.6 Fig. 3 — an air bubble grows as water vapor enters it
  Figure_13_06_02: () => {
    const svg = new Svg({
      width: 680,
      height: 340,
      title: 'An air bubble in heated water',
      desc: 'A beaker of water over a flame at three temperatures. (a) At 20 °C a small bubble sits on the bottom. (b) At 50 °C the bubble is larger. (c) At 100 °C the bubble is larger still and rises toward the surface.',
    });
    const bubble = (x, y, r) => {
      svg.circle(x, y, r, { fill: '#a9daf5', stroke: '#5fb4e0', width: 1.5 });
      svg.circle(x - r * 0.35, y - r * 0.35, r * 0.3, { fill: '#e9f6fd' });
    };
    [
      ['20°C', 5, 0],
      ['50°C', 8, 0],
      ['100°C', 14, 1],
    ].forEach(([temp, r, rising], k) => {
      const x = 30 + k * 225;
      beaker(svg, x, 20, 170, 190, { fill: 0.85 });
      note(svg, x + 150, 85, temp, { anchor: 'end', size: 20 });
      if (rising) {
        bubble(x + 50, 125, r);
        svg.arrow(x + 50, 103, x + 50, 60, { color: ARROW, width: 2, head: 11 });
      } else {
        bubble(x + 55, 210 - 7 - r, r);
      }
      flame(svg, x + 85, 262, 1);
      caption(svg, x + 85, 322, `(${'abc'[k]})`);
    });
    return svg.render();
  },
};
