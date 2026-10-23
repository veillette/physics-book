/**
 * Chapter 14: heat and heat transfer methods.
 *
 * The heating curve of 14.3 is computed from the specific and latent heats the
 * text quotes (0.50, 1.00, and 0.482 cal/g·°C; 79.8 and 539 cal/g), so its
 * corners fall where the numbers put them. The absorb/radiate panels of 14.7
 * keep the arrow widths in proportion: a black surface absorbs and emits most
 * of the energy, a silver one reflects and retains most of it.
 *
 * The wavy heat arrow (`heatArrow`), the sofa, and the cylinder are exported
 * for chapter 15.
 */
import { CURVE, GLASS, WATER, flame, molecule, rng, thermometer } from './ch13.js';
import { COLORS, Plot, Svg, fmt } from './svg.js';

const ARROW = COLORS.black;
const COLD = '#2f7fc1';
const GO = '#7ab32e';

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** Sans-serif annotation, as in the OpenStax originals of this chapter. */
function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function notes(svg, x, y, list, o = {}) {
  svg.lines(x, y, list, { size: 20, math: false, gap: 24, ...o });
}

/** A gradient definition with a fresh id; `stops` are [offset, color] pairs. */
export function gradient(svg, stops, { x1 = 0, y1 = 0, x2 = 1, y2 = 0, user = false } = {}) {
  svg.gradients = (svg.gradients || 0) + 1;
  const id = `g${svg.gradients}`;
  const units = user ? ' gradientUnits="userSpaceOnUse"' : '';
  const s = stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
  svg.add(
    `<defs><linearGradient id="${id}" x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}"${units}>${s}</linearGradient></defs>`
  );
  return `url(#${id})`;
}

/**
 * Outline of the OpenStax heat-flow arrow: a broad wavy band along `path` (a
 * list of center-line points) that ends in a wide head. With `noHead` the band
 * just stops. The edge waves have period `period` (default: `waves` along the
 * band), measured from the tail, or from the tip with `anchor: 'end'`, so bands
 * that run side by side and share an end stay in phase. `taper` flattens the
 * waves toward the head.
 */
export function heatPolygon(
  path,
  {
    w = 28,
    amp = 4,
    waves = 1.5,
    period,
    taper = true,
    anchor = 'start',
    head = 1.8,
    noHead = false,
  } = {}
) {
  const seg = [];
  let total = 0;
  for (let k = 1; k < path.length; k += 1) {
    const d = Math.hypot(path[k][0] - path[k - 1][0], path[k][1] - path[k - 1][1]);
    seg.push(d);
    total += d;
  }
  const at = s => {
    let k = 0;
    while (k < seg.length - 1 && s > seg[k]) {
      s -= seg[k];
      k += 1;
    }
    const f = Math.min(s / seg[k], 1);
    const [a, b] = [path[k], path[k + 1]];
    return [
      a[0] + (b[0] - a[0]) * f,
      a[1] + (b[1] - a[1]) * f,
      (b[0] - a[0]) / seg[k],
      (b[1] - a[1]) / seg[k],
    ];
  };
  const headLen = noHead ? 0 : Math.min(w * 1.1, total * 0.45);
  const L = total - headLen;
  const per = period || L / waves;
  const left = [];
  const right = [];
  const n = Math.max(60, Math.round(L / 3));
  for (let k = 0; k <= n; k += 1) {
    const s = (L * k) / n;
    const [x, y, ux, uy] = at(s);
    const phase = anchor === 'end' ? total - s : s;
    const off = amp * Math.sin((2 * Math.PI * phase) / per) * (taper ? 1 - k / n : 1);
    const [cx, cy] = [x - uy * off, y + ux * off];
    left.push([cx - (uy * w) / 2, cy + (ux * w) / 2]);
    right.push([cx + (uy * w) / 2, cy - (ux * w) / 2]);
  }
  if (noHead) return { poly: [...left, ...right.reverse()], at, L };
  const [bx, by, ux, uy] = at(L);
  const [tx, ty] = at(total);
  const hw = (w * head) / 2;
  const poly = [
    ...left,
    [bx - uy * hw, by + ux * hw],
    [tx, ty],
    [bx + uy * hw, by - ux * hw],
    ...right.reverse(),
  ];
  return { poly, at, L };
}

/**
 * The OpenStax heat-flow arrow (see `heatPolygon`), shading from `fade` at its
 * tail to `color` at its tip.
 */
export function heatArrow(
  svg,
  path,
  { color = '#ef8a68', fade = '#fde6db', label, labelOpts, ...opts } = {}
) {
  const { poly, at, L } = heatPolygon(path, opts);
  const [p0, p1] = [path[0], path.at(-1)];
  const fill = gradient(
    svg,
    [
      [0, fade],
      [1, color],
    ],
    { x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], user: true }
  );
  svg.polygon(poly, { fill });
  if (label) {
    const [mx, my] = at(L * 0.45);
    svg.text(mx, my, label, { size: 22, halo: false, ...labelOpts });
  }
}

/** Points along a quadratic Bézier from a through control c to b. */
export function curve(a, c, b, n = 30) {
  const out = [];
  for (let k = 0; k <= n; k += 1) {
    const t = k / n;
    const u = 1 - t;
    out.push([
      u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
      u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
    ]);
  }
  return out;
}

/** An upright cylinder with its top ellipse, filled with a horizontal gradient. */
export function cylinder(
  svg,
  cx,
  top,
  rx,
  h,
  { colors = ['#b8892b', '#f1d27a', '#fff6d0', '#c99a35'], ry = rx * 0.28 } = {}
) {
  const fill = gradient(
    svg,
    colors.map((c, k) => [k / (colors.length - 1), c])
  );
  svg.path(
    `M ${cx - rx} ${top} L ${cx - rx} ${top + h} A ${rx} ${ry} 0 0 0 ${cx + rx} ${top + h} L ${cx + rx} ${top} Z`,
    { color: '#9a7322', width: 1, fill }
  );
  svg.ellipse(cx, top, rx, ry, { fill: colors[1], stroke: '#9a7322', width: 1 });
}

/** A green sofa seen from the front, its seat front at height y, centered on x. */
export function sofa(svg, x, y, s = 1) {
  const c = '#7fb8a4';
  const dark = '#4f8a76';
  const R = (a, b, w, h, r = 8) =>
    svg.rect(x + a * s, y + b * s, w * s, h * s, { fill: c, stroke: dark, width: 1.4, rx: r * s });
  R(-105, -95, 210, 70, 12);
  for (const k of [-1, 0, 1]) R(-100 + (k + 1) * 67, -90, 66, 60, 10);
  R(-105, -35, 210, 35, 8);
  R(-125, -60, 28, 70, 10);
  R(97, -60, 28, 70, 10);
  for (const dx of [-110, 110])
    svg.line(x + dx * s, y + 10 * s, x + dx * s, y + 22 * s, { color: dark, width: 3 * s });
}

/** A four-pane window with a frame. */
function window4(svg, pts) {
  svg.polygon(pts, { fill: '#cfe6f5', stroke: '#9b7a4a', width: 6 });
  const [a, b, c, d] = pts;
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  svg.line(...mid(a, b), ...mid(d, c), { color: '#9b7a4a', width: 4 });
  svg.line(...mid(a, d), ...mid(b, c), { color: '#9b7a4a', width: 4 });
}

/** A curved arrow along a quadratic Bézier. */
function bend(svg, a, c, b, { color = ARROW, width = 2.2, head = 12, dash } = {}) {
  const pts = curve(a, c, b);
  svg.polyline(pts.slice(0, -2), { color, width, dash });
  svg.arrow(...pts.at(-3), ...b, { color, width, head });
}

/** A wavy radiation ray from a to b. */
function ray(
  svg,
  [x1, y1],
  [x2, y2],
  { color = '#f2c500', waves = 6, amp = 5, width = 2.2, head = 11 } = {}
) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / len, (y2 - y1) / len];
  const pts = [];
  for (let k = 0; k <= 120; k += 1) {
    const s = ((len - head) * k) / 120;
    const off = amp * Math.sin((2 * Math.PI * waves * s) / (len - head));
    pts.push([x1 + ux * s - uy * off, y1 + uy * s + ux * off]);
  }
  svg.polyline(pts, { color, width });
  svg.arrow(...pts.at(-1), x2, y2, { color, width, head });
}

/** A soda can standing on y. */
function can(svg, cx, y, h = 200, w = 120) {
  const body = gradient(svg, [
    [0, '#c43a24'],
    [0.15, '#e9694a'],
    [0.45, '#f9d2c1'],
    [0.8, '#e9694a'],
    [1, '#d6452c'],
  ]);
  svg.rect(cx - w / 2, y - h, w, h, { fill: body });
  svg.path(
    `M ${cx - w * 0.38} ${y - 8} C ${cx - w * 0.38} ${y - h * 0.7} ${cx - w * 0.1} ${y - h * 0.9} ${cx + w * 0.32} ${y - h * 0.85} C ${cx} ${y - h * 0.82} ${cx - w * 0.15} ${y - h * 0.55} ${cx + w * 0.42} ${y - 8} Z`,
    { color: 'none', width: 0, fill: '#ffffff', opacity: 0.85 }
  );
  svg.circle(cx + w * 0.1, y - h * 0.68, w * 0.14, { fill: '#ffffff' });
  for (const yy of [y - h, y])
    svg.rect(cx - w / 2 - 3, yy - 5, w + 6, 10, {
      fill: '#a7a9ac',
      stroke: '#6d6e71',
      width: 1,
      rx: 4,
    });
}

/** A rounded ice cube resting on y. */
function ice(svg, x, y, s = 110) {
  svg.path(
    `M ${x + 8} ${y} C ${x - 4} ${y - s * 0.4} ${x + 4} ${y - s * 0.85} ${x + 18} ${y - s} C ${x + s * 0.4} ${y - s * 1.06} ${x + s * 0.75} ${y - s * 1.04} ${x + s - 6} ${y - s * 0.94} C ${x + s + 8} ${y - s * 0.6} ${x + s + 2} ${y - s * 0.25} ${x + s - 6} ${y} Z`,
    { color: '#8fa5cf', width: 1.5, fill: '#dfe7f6' }
  );
  svg.path(
    `M ${x + s * 0.2} ${y - s * 0.3} C ${x + s * 0.35} ${y - s * 0.7} ${x + s * 0.55} ${y - s * 0.75} ${x + s * 0.8} ${y - s * 0.6} C ${x + s * 0.6} ${y - s * 0.5} ${x + s * 0.45} ${y - s * 0.35} ${x + s * 0.3} ${y - s * 0.15} Z`,
    { color: 'none', width: 0, fill: '#b9c8e8' }
  );
  svg.path(
    `M ${x + s * 0.15} ${y - s * 0.8} C ${x + s * 0.3} ${y - s * 0.95} ${x + s * 0.6} ${y - s * 0.95} ${x + s * 0.75} ${y - s * 0.85}`,
    { color: '#ffffff', width: 6 }
  );
}

/** Hatched ground (a section through the surface) from x to x + w below y. */
function ground(svg, x, y, w, h = 60) {
  svg.rect(x, y, w, h, { fill: '#8c8c8c' });
  for (let k = -h; k < w; k += 9) {
    svg.line(
      x + Math.max(k, 0),
      y + h - Math.max(-k, 0),
      x + Math.min(k + h, w),
      y + h - Math.min(k + h, w) + k,
      {
        color: '#7a7a7a',
        width: 1,
      }
    );
  }
}

export default {
  // 14.1 Fig. 1 — a soft drink and ice come to the same temperature
  Figure_14_01_01: () => {
    const svg = new Svg({
      width: 720,
      height: 680,
      title: 'A soft drink and ice reaching thermal equilibrium',
      desc: '(a) A soft-drink can at temperature T₁ and an ice cube at T₂ sit apart; T₁ ≠ T₂, so they are not in thermal equilibrium. (b) Placed in contact, they exchange energy until both are at the same temperature T′.',
    });
    const lab = (x, y, s) => svg.text(x, y, s, { size: 30, math: false, italic: true });
    // (a)
    ground(svg, 50, 300, 660);
    can(svg, 210, 295);
    ice(svg, 560, 295);
    svg.text(400, 50, 'T_1 ≠ T_2', { size: 32, math: false, italic: true });
    lab(190, 165, 'T_1');
    lab(620, 190, 'T_2');
    caption(svg, 22, 345, '(a)');
    // (b)
    ground(svg, 50, 615, 660);
    can(svg, 310, 610);
    ice(svg, 372, 610);
    lab(325, 545, 'T′');
    lab(430, 545, 'T′');
    caption(svg, 22, 660, '(b)');
    return svg.render();
  },

  // 14.1 Fig. 2 — Joule's paddle-wheel experiment
  Figure_14_01_02: () => {
    const svg = new Svg({
      width: 820,
      height: 760,
      title: 'Joule’s experiment',
      desc: 'Two masses m, each of weight w, hang from cords that pass over pulleys and wind around a roller. A crank on top winds them up; as they fall a measured height h, the roller turns paddles in an insulated container holding a known volume of water. A thermometer in the water measures the rise in temperature that the work produces.',
    });
    const cx = 420;
    // Base and container.
    svg.polygon(
      [
        [260, 700],
        [610, 700],
        [580, 670],
        [290, 670],
      ],
      { fill: '#e7c48d', stroke: '#b98f50', width: 1.5 }
    );
    svg.rect(260, 700, 350, 30, { fill: '#d6ad6c', stroke: '#b98f50', width: 1.5 });
    const [bx, bw, btop, bbot] = [cx - 115, 230, 470, 690];
    svg.rect(bx, btop + 18, bw, bbot - btop - 18, { fill: '#bfe1f4' });
    svg.ellipse(cx, bbot, bw / 2, 16, { fill: '#bfe1f4', stroke: GLASS, width: 2 });
    svg.rect(bx + 1, btop + 18, bw - 2, bbot - btop - 18, { fill: '#bfe1f4' });
    svg.ellipse(cx, btop + 18, bw / 2 - 4, 14, { fill: '#d9eefa', stroke: '#8cc9e8', width: 1.5 });
    // Rod and paddles: three tiers of vanes, alternately tilted.
    svg.rect(cx - 4, 300, 8, 380, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1 });
    for (const [k, y] of [520, 575, 630].entries()) {
      const s = k % 2 ? -1 : 1;
      svg.line(cx - 85, y - 12 * s, cx + 85, y + 12 * s, { color: '#8a8c8f', width: 3 });
      svg.line(cx - 85, y + 12 * s, cx + 85, y - 12 * s, { color: '#8a8c8f', width: 3 });
      for (const [dx, dy] of [
        [-85, -12 * s],
        [85, 12 * s],
        [-85, 12 * s],
        [85, -12 * s],
      ]) {
        svg.rect(cx + dx - 11, y + dy - 11, 22, 22, {
          fill: '#9a9c9f',
          stroke: '#6d6e71',
          width: 1,
        });
      }
    }
    bend(svg, [cx - 40, 664], [cx, 690], [cx + 34, 666], { width: 1.8, head: 10 });
    svg.path(
      `M ${bx} ${btop + 18} L ${bx} ${bbot} M ${bx + bw} ${btop + 18} L ${bx + bw} ${bbot}`,
      { color: GLASS, width: 2 }
    );
    thermometer(svg, cx + 75, 545, 120, 0.35, { label: '', ticks: 6 });
    svg.rect(cx - 16, 385, 32, 70, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1.2, rx: 3 });
    // Roller with the cords wound on it, and the crank.
    svg.rect(cx - 30, 110, 60, 175, { fill: '#c7c8ca', stroke: '#6d6e71', width: 1.5, rx: 4 });
    for (let y = 130; y < 270; y += 13) svg.rect(cx - 33, y, 66, 6, { fill: '#222222', rx: 3 });
    svg.rect(cx - 10, 92, 20, 18, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1 });
    svg.rect(cx - 6, 285, 12, 18, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1 });
    svg.rect(cx - 4, 70, 8, 22, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1 });
    svg.rect(cx - 4, 64, 60, 8, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1 });
    svg.rect(cx + 48, 20, 16, 48, { fill: '#c0873e', stroke: '#8a5a20', width: 1.2, rx: 8 });
    svg.ellipse(cx, 52, 110, 26, { stroke: ARROW, width: 1.8 });
    svg.arrow(cx + 80, 30, cx + 100, 35, { color: ARROW, width: 1.8, head: 11 });
    // Pulleys, cords, masses.
    const pulley = (x, y) => {
      svg.circle(x, y, 34, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1.5 });
      svg.circle(x, y, 22, { fill: '#c7c8ca', stroke: '#8a8c8f', width: 1 });
      svg.circle(x, y, 5, { fill: '#6d6e71' });
    };
    const mass = (x, top) => {
      svg.path(`M ${x} ${top - 14} q 10 -4 6 -12`, { color: '#555555', width: 2.5 });
      cylinder(svg, x, top, 44, 75, { colors: ['#9a9c9f', '#e2e3e4', '#ffffff', '#a7a9ac'] });
      svg.text(x, top + 42, 'm', { size: 26 });
      svg.arrow(x, top + 88, x, top + 175, { color: '#d81b60', width: 5, head: 20 });
      svg.text(x + 30, top + 130, '**w**', { size: 24 });
    };
    const [lx, ly] = [200, 270];
    const [rx, ry] = [640, 150];
    pulley(lx, ly);
    pulley(rx, ry);
    svg.line(lx, ly - 34, cx - 30, ly - 34, { color: ARROW, width: 2.5 });
    svg.line(rx, ry - 34, cx + 30, ry - 34, { color: ARROW, width: 2.5 });
    svg.line(lx - 34, ly, lx - 34, 450, { color: ARROW, width: 2.5 });
    svg.line(rx + 34, ry, rx + 34, 330, { color: ARROW, width: 2.5 });
    mass(lx - 34, 465);
    mass(rx + 34, 345);
    // The height each mass falls.
    const dim = (x, y1, y2) => {
      svg.arrow(x, y1 + 2, x, y2 - 2, { color: ARROW, width: 2, head: 14, start: true });
    };
    svg.line(30, 400, 300, 400, { color: ARROW, width: 1.5, dash: '6 5' });
    svg.line(30, 700, 300, 700, { color: ARROW, width: 1.5, dash: '6 5' });
    dim(70, 400, 700);
    svg.rect(10, 500, 125, 90, { fill: '#ffffff' });
    notes(svg, 72, 515, ['Measured', 'height of', 'descent'], { size: 21 });
    svg.line(580, 280, 800, 280, { color: ARROW, width: 1.5, dash: '6 5' });
    svg.line(560, 580, 800, 580, { color: ARROW, width: 1.5, dash: '6 5' });
    dim(770, 280, 580);
    svg.rect(758, 415, 26, 30, { fill: '#ffffff' });
    svg.text(770, 430, 'h', { size: 26 });
    note(svg, 580, 340, 'Thermometer', { anchor: 'middle' });
    svg.squiggle(560, 356, cx + 80, 420, { waves: 1, amp: 5 });
    notes(svg, 800, 650, ['Insulated, known', 'volume of water'], { anchor: 'end' });
    svg.squiggle(650, 660, bx + bw + 4, 640, { waves: 1, amp: 5 });
    return svg.render();
  },

  // 14.2 Fig. 1 — heat needed depends on mass, temperature change, and substance
  Figure_14_02_01: () => {
    const svg = new Svg({
      width: 720,
      height: 860,
      title: 'Heat, mass, temperature change, and substance',
      desc: '(a) Doubling the heat transferred to the same mass doubles its temperature change: Q gives ΔT, Q′ = 2Q gives 2ΔT. (b) Twice the heat is needed to give twice the mass the same temperature change ΔT. (c) For the same mass and temperature change, water needs 10.8 times as much heat as copper.',
    });
    const row = (y, left, right, tag) => {
      heatArrow(
        svg,
        [
          [10, y + 70],
          [175, y + 70],
        ],
        { w: 46, label: 'Q', labelOpts: { dy: -42, size: 26, math: false, italic: true } }
      );
      cylinder(svg, 245, y + 20, 62, 140);
      svg.lines(245, y + 52, left, { size: 26, math: false, gap: 64 });
      heatArrow(
        svg,
        [
          [355, y + 70],
          [520, y + 70],
        ],
        { w: 46 }
      );
      svg.text(440, y + 22, right.q, { size: 26, math: false });
      right.draw(590, y);
      caption(svg, 22, y + 210, tag);
    };
    row(
      30,
      ['\\it{m}', 'Δ\\it{T}'],
      {
        q: '\\it{Q}′ = 2\\it{Q}',
        draw: (x, y) => {
          cylinder(svg, x, y + 20, 62, 140);
          svg.lines(x, y + 52, ['\\it{m}', '2 Δ\\it{T}'], { size: 26, math: false, gap: 64 });
          // Wiggles: the second cylinder gets hotter.
          const rand = rng(4);
          for (const [dx, dy] of [
            [95, 30],
            [100, 95],
            [95, 160],
            [-85, 170],
            [-20, -24],
            [30, -24],
            [70, -14],
          ]) {
            const a = rand() * 6;
            const [px, py] = [x + dx, y + dy + 20];
            svg.path(
              `M ${fmt(px - 10 * Math.cos(a))} ${fmt(py - 10 * Math.sin(a))} q ${fmt(5 * Math.cos(a) + 5 * Math.sin(a))} ${fmt(5 * Math.sin(a) - 5 * Math.cos(a))} ${fmt(10 * Math.cos(a))} ${fmt(10 * Math.sin(a))} t ${fmt(10 * Math.cos(a))} ${fmt(10 * Math.sin(a))}`,
              { color: ARROW, width: 3 }
            );
          }
        },
      },
      '(a)'
    );
    row(
      310,
      ['\\it{m}', 'Δ\\it{T}'],
      {
        q: '\\it{Q}′ = 2\\it{Q}',
        // Twice the mass of the same metal: √2 times the radius at the same height.
        draw: (x, y) => {
          cylinder(svg, x + 18, y + 20, 62 * Math.SQRT2, 140);
          svg.lines(x + 18, y + 52, ['2\\it{m}', 'Δ\\it{T}'], { size: 26, math: false, gap: 64 });
        },
      },
      '(b)'
    );
    row(
      590,
      ['\\it{m}', 'Δ\\it{T}'],
      {
        q: '\\it{Q}′ = 10.8 \\it{Q}',
        draw: (x, y) => {
          // A glass of water, of the same mass.
          svg.rect(x - 62, y + 55, 124, 125, { fill: WATER });
          svg.ellipse(x, y + 55, 62, 17, { fill: '#dff1fb', stroke: '#8cc9e8', width: 1.5 });
          svg.path(
            `M ${x - 62} ${y + 20} L ${x - 62} ${y + 180} A 62 17 0 0 0 ${x + 62} ${y + 180} L ${x + 62} ${y + 20}`,
            {
              color: GLASS,
              width: 2.5,
            }
          );
          svg.ellipse(x, y + 20, 62, 17, { stroke: GLASS, width: 2.5 });
          svg.lines(x, y + 52, ['\\it{m}', 'water', 'Δ\\it{T}'], {
            size: 26,
            math: false,
            gap: 40,
          });
        },
      },
      '(c)'
    );
    svg.text(245, 680, 'Cu', { size: 24, math: false });
    return svg.render();
  },

  // 14.3 Fig. 2 — molecules in solids, liquids, and gases
  Figure_14_03_02: () => {
    const svg = new Svg({
      width: 900,
      height: 880,
      title: 'Phase changes at the molecular level',
      desc: '(a) In a solid, molecules are held in a lattice by spring-like bonds and vibrate within limits of motion about fixed positions. Energy input melts the solid into a liquid, whose molecules move about while staying close together; freezing releases energy. (b) Energy input boils the liquid into a gas, whose molecules are far apart and move freely; condensation releases energy.',
    });
    const R = 11;
    // (a) Solid: a 4 × 4 lattice of molecules joined by springs.
    const [sx, sy, gap] = [30, 25, 100];
    const coil = (x1, y1, x2, y2) => {
      const len = Math.hypot(x2 - x1, y2 - y1);
      const [ux, uy] = [(x2 - x1) / len, (y2 - y1) / len];
      const pts = [];
      for (let k = 0; k <= 160; k += 1) {
        const s = (len * k) / 160;
        const off = s < 10 || s > len - 10 ? 0 : 6 * Math.sin((s - 10) * 0.75);
        pts.push([x1 + ux * s - uy * off, y1 + uy * s + ux * off]);
      }
      svg.polyline(pts, { color: '#555555', width: 1.2 });
    };
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const [x, y] = [sx + i * gap, sy + j * gap];
        if (i < 3) coil(x, y, x + gap, y);
        if (j < 3) coil(x, y, x, y + gap);
      }
    }
    const rand = rng(8);
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const [x, y] = [sx + i * gap, sy + j * gap];
        const a = rand() * 2 * Math.PI;
        svg.arrow(x, y, x + 30 * Math.cos(a), y + 30 * Math.sin(a), {
          color: ARROW,
          width: 1.5,
          head: 9,
        });
        molecule(svg, x, y, R);
      }
    }
    svg.add(
      `<circle cx="${sx + 2 * gap}" cy="${sy + 2 * gap}" r="52" fill="none" stroke="${ARROW}" stroke-width="1.5" stroke-dasharray="6 4"/>`
    );
    svg.rect(sx + 2 * gap - 8, sy + 1.2 * gap - 4, 100, 46, { fill: '#ffffff' });
    notes(svg, sx + 2 * gap + 42, sy + 1.2 * gap + 8, ['Limits of', 'motion'], {
      size: 18,
      gap: 21,
    });
    svg.squiggle(sx + 2 * gap + 72, sy + 1.2 * gap + 40, sx + 2 * gap + 42, sy + 2 * gap - 30, {
      waves: 1,
      amp: 3,
    });
    note(svg, sx + 1.5 * gap, sy + 3 * gap + 55, 'Solid', { size: 19 });
    /** A molecule moving along a short curved path, or straight when `c` is null. */
    const mover = (x, y, c, b) => {
      if (c) bend(svg, [x, y], c, b, { width: 1.5, head: 9 });
      else svg.arrow(x, y, ...b, { color: ARROW, width: 1.5, head: 9 });
      molecule(svg, x, y, R);
    };
    const liquid = (ox, oy) => {
      mover(ox + 20, oy + 130, [ox - 10, oy + 70], [ox + 20, oy + 10]);
      mover(ox + 90, oy + 30, [ox + 40, oy - 10], [ox - 10, oy + 20]);
      mover(ox + 80, oy + 120, [ox + 60, oy + 130], [ox + 55, oy + 150]);
      mover(ox + 160, oy + 60, [ox + 170, oy + 120], [ox + 140, oy + 160]);
      mover(ox + 50, oy + 200, [ox + 110, oy + 190], [ox + 160, oy + 230]);
      mover(ox + 150, oy + 140, [ox + 120, oy + 90], [ox + 140, oy + 40]);
      mover(ox + 110, oy + 210, null, [ox + 135, oy + 235]);
      mover(ox + 30, oy + 290, [ox + 0, oy + 230], [ox + 25, oy + 170]);
      mover(ox + 100, oy + 250, null, [ox + 125, oy + 270]);
    };
    liquid(640, 60);
    note(svg, 730, sy + 3 * gap + 55, 'Liquid', { size: 19 });
    /** A broad curved gray arrow for a phase change, turning `dir` (1 right, −1 left). */
    const swoop = (x, y, dir, top, bottom) => {
      const pts = curve([x - 60 * dir, y + 10], [x, y - 30], [x + 60 * dir, y + 10]);
      svg.polyline(pts.slice(0, -4), { color: '#7b7d80', width: 7 });
      svg.arrow(...pts.at(-5), x + 66 * dir, y + 14, { color: '#7b7d80', width: 7, head: 22 });
      notes(svg, x, y - 70, top, { size: 18, gap: 21 });
      note(svg, x, y + 22, bottom, { size: 18 });
    };
    const swoopBack = (x, y, top, bottom) => {
      const pts = curve([x + 60, y - 10], [x, y + 30], [x - 60, y - 10]);
      svg.polyline(pts.slice(0, -4), { color: '#7b7d80', width: 7 });
      svg.arrow(...pts.at(-5), x - 66, y - 14, { color: '#7b7d80', width: 7, head: 22 });
      note(svg, x, y - 22, top, { size: 18 });
      notes(svg, x, y + 46, bottom, { size: 18, gap: 21 });
    };
    swoop(500, 110, 1, ['Energy', 'input'], 'Melt');
    swoopBack(500, 250, 'Freeze', ['Energy', 'output']);
    caption(svg, 450, 420, '(a)');
    // (b) Liquid to gas.
    liquid(30, 480);
    note(svg, 110, 820, 'Liquid', { size: 19 });
    const gas = [
      [560, 490, null, [680, 560]],
      [720, 500, [730, 540], [700, 600]],
      [790, 515, [830, 490], [870, 520]],
      [560, 630, null, [600, 595]],
      [760, 630, null, [610, 630]],
      [660, 700, null, [540, 730]],
      [850, 680, null, [790, 680]],
      [840, 770, [820, 700], [830, 580]],
    ];
    for (const [x, y, c, b] of gas) mover(x, y, c, b);
    note(svg, 700, 820, 'Gas', { size: 19 });
    swoop(370, 590, 1, ['Energy', 'input'], 'Boil');
    swoopBack(370, 730, 'Condense', ['Energy', 'output']);
    caption(svg, 450, 866, '(b)');
    return svg.render();
  },

  // 14.3 Fig. 3 — heating ice from −20 °C to steam at 120 °C
  Figure_14_03_03: () => {
    const svg = new Svg({
      width: 880,
      height: 560,
      title: 'Temperature versus heat added to water',
      desc: 'Temperature versus energy added per gram, ΔQ/m, starting with ice at −20 °C. The ice warms to 0 °C after 10 cal/g. The temperature stays at 0 °C while the ice melts, absorbing 79.8 cal/g, to about 90 cal/g. The liquid water then warms to 100 °C, reached at about 190 cal/g. The temperature stays at 100 °C while the water boils, absorbing 539 cal/g, to about 729 cal/g. The steam then warms to 120 °C at about 738 cal/g.',
    });
    const g = new Plot(svg, {
      x: 90,
      y: 30,
      w: 740,
      h: 440,
      xRange: [0, 800],
      yRange: [-20, 130],
      xTicks: [0, 100, 200, 300, 400, 500, 600, 700, 800],
      yTicks: [-20, 0, 20, 40, 60, 80, 100, 120],
    });
    g.axes({
      arrows: true,
      xTitle: 'Δ\\it{Q}/\\it{m} (cal/g)',
      yTitle: '\\it{T} (°C)',
      size: 17,
      titleSize: 19,
      yTitleOffset: 62,
      xTitleOffset: 46,
      xAxisAt: -20,
    });
    // Specific heats (cal/g·°C) and latent heats (cal/g) from the text.
    const q1 = 0.5 * 20;
    const q2 = q1 + 79.8;
    const q3 = q2 + 100;
    const q4 = q3 + 539;
    const q5 = q4 + 0.482 * 20;
    const pts = [
      [0, -20],
      [q1, 0],
      [q2, 0],
      [q3, 100],
      [q4, 100],
      [q5, 120],
    ];
    g.series(pts, { color: CURVE, width: 3 });
    for (const p of pts.slice(1, 5)) svg.circle(...g.P(...p), 6, { fill: COLORS.black });
    note(svg, g.X(28), g.Y(-12), 'Ice', { anchor: 'start' });
    notes(svg, g.X(50), g.Y(22), ['Ice', '+', 'Water']);
    note(svg, g.X(150) + 12, g.Y(50), 'Water', { anchor: 'start' });
    note(svg, g.X(460), g.Y(93), 'Water + Steam');
    note(svg, g.X(q5) - 8, g.Y(122), 'Steam', { anchor: 'end' });
    return svg.render();
  },

  // 14.4 Fig. 1 — a fireplace transfers heat by all three methods
  Figure_14_04_01: () => {
    const svg = new Svg({
      width: 960,
      height: 740,
      title: 'Heat transfer from a fireplace',
      desc: 'A room with a fireplace at the lower left. Hot air rises up the chimney by convection. Radiation (wavy lines) goes from the fire into the room. Cold air enters around the window at the right and flows across the floor toward the fire by convection. Heat is conducted from the fire down into the floor beneath it.',
    });
    // The room, seen from the front with its far wall smaller.
    const [x0, y0, x1, y1] = [150, 205, 730, 640];
    const [b0, c0, b1, c1] = [215, 255, 610, 555];
    svg.rect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 10, {
      fill: '#e6e6e6',
      stroke: '#9a9a9a',
      width: 1.5,
    });
    svg.polygon(
      [
        [x0, y0],
        [x1, y0],
        [b1, c0],
        [b0, c0],
      ],
      { fill: '#c99a52' }
    );
    svg.polygon(
      [
        [x0, y1],
        [x1, y1],
        [b1, c1],
        [b0, c1],
      ],
      { fill: '#f6efd9' }
    );
    svg.polygon(
      [
        [x0, y0],
        [b0, c0],
        [b0, c1],
        [x0, y1],
      ],
      { fill: '#d9c08e' }
    );
    svg.polygon(
      [
        [x1, y0],
        [b1, c0],
        [b1, c1],
        [x1, y1],
      ],
      { fill: '#d9c08e' }
    );
    svg.rect(b0, c0, b1 - b0, c1 - c0, { fill: '#e8d6a8', stroke: '#b99a5e', width: 1 });
    window4(svg, [
      [635, 315],
      [705, 296],
      [705, 470],
      [635, 462],
    ]);
    sofa(svg, 400, 590, 0.95);
    // Chimney and hearth, with the fire in its opening.
    svg.rect(50, 70, 135, 570, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1.5 });
    svg.rect(95, 70, 90, 440, { fill: '#c7c8ca' });
    svg.rect(62, 510, 123, 92, { fill: '#5d5f62' });
    svg.rect(50, 600, 160, 40, { fill: '#8a8c8f' });
    svg.rect(50, 640, 680, 90, { fill: '#e6e6e6', stroke: '#9a9a9a', width: 1.5 });
    flame(svg, 115, 592, 1.25, { burner: false });
    for (const x of [92, 122])
      svg.circle(x, 600, 15, { fill: '#ffffff', stroke: '#6d6e71', width: 1.5 });
    svg.rect(125, 586, 50, 28, { fill: '#ffffff', stroke: '#6d6e71', width: 1.5, rx: 10 });
    // Convection up the chimney.
    for (const x of [72, 118]) {
      for (const y of [110, 270, 420])
        svg.arrow(x, y + 110, x, y, { color: '#8e1a1a', width: 3, head: 14 });
    }
    svg.text(30, 300, 'Convection (hot air)', { size: 22, math: false, rotate: -90 });
    // Radiation.
    ray(svg, [160, 555], [320, 450], { waves: 8 });
    ray(svg, [160, 590], [340, 505], { waves: 8 });
    note(svg, 270, 488, 'Radiation', { rotate: -22, size: 22 });
    // Cold air around the window flows to the fire.
    bend(svg, [640, 360], [520, 350], [470, 425], { color: COLD, width: 3, head: 14 });
    bend(svg, [640, 410], [540, 450], [470, 520], { color: COLD, width: 3, head: 14 });
    bend(svg, [390, 510], [370, 610], [185, 600], { color: COLD, width: 3, head: 14 });
    bend(svg, [360, 625], [270, 610], [190, 625], { color: COLD, width: 3, head: 14 });
    note(svg, 360, 595, 'Convection', { rotate: -22, size: 22 });
    notes(svg, 850, 330, ['Convection', 'around windows', 'and doors', '(cold air)'], {
      size: 22,
      gap: 27,
    });
    svg.squiggle(780, 420, 700, 440, { waves: 1, amp: 4 });
    // Conduction into the floor.
    svg.path('M 108 655 L 108 695 Q 108 705 118 705 L 200 705', { color: ARROW, width: 2.5 });
    svg.arrow(195, 705, 255, 705, { color: ARROW, width: 2.5, head: 14 });
    note(svg, 270, 705, 'Conduction', { anchor: 'start', size: 24 });
    return svg.render();
  },

  // 14.4 Fig. 2 — a thermos bottle
  Figure_14_04_02: () => {
    const svg = new Svg({
      width: 680,
      height: 800,
      title: 'Thermos bottle',
      desc: 'A cutaway of a thermos bottle. A double-walled glass bottle with silvered surfaces sits inside an outer container, held by a rubber support at the bottom and spring centering devices at the sides. The space between the glass walls is a vacuum. The hot or cold liquid is in the inner bottle, closed by a stopper.',
    });
    const cx = 330;
    /** A bottle outline: shoulders at y = s, body from x = cx ± r down to y = b, neck half-width n from y = t. */
    const bottle = (r, n, t, s, b, rr = 30) =>
      `M ${cx - n} ${t} L ${cx - n} ${s - 30} C ${cx - n} ${s} ${cx - r} ${s} ${cx - r} ${s + 50} L ${cx - r} ${b - rr} Q ${cx - r} ${b} ${cx - r + rr} ${b} L ${cx + r - rr} ${b} Q ${cx + r} ${b} ${cx + r} ${b - rr} L ${cx + r} ${s + 50} C ${cx + r} ${s} ${cx + n} ${s} ${cx + n} ${s - 30} L ${cx + n} ${t} Z`;
    svg.path(bottle(125, 82, 95, 165, 695, 20), { color: '#e2343c', width: 4, fill: '#eab593' });
    svg.path(bottle(100, 62, 95, 175, 595, 40), { color: '#9a9c9f', width: 3, fill: '#f2f2f2' });
    const glass = gradient(svg, [
      [0, '#8a8c8f'],
      [0.35, '#e6e7e8'],
      [0.7, '#bcbec0'],
      [1, '#7a7c7f'],
    ]);
    svg.path(bottle(82, 46, 105, 195, 575, 34), { color: '#7a7c7f', width: 2.5, fill: glass });
    // The liquid fills the lower part of the inner bottle.
    svg.path(
      `M ${cx - 80} 360 L ${cx - 80} 545 Q ${cx - 80} 573 ${cx - 50} 573 L ${cx + 50} 573 Q ${cx + 80} 573 ${cx + 80} 545 L ${cx + 80} 360 Z`,
      {
        color: 'none',
        width: 0,
        fill: '#bfe1f4',
      }
    );
    svg.line(cx - 80, 360, cx + 80, 360, { color: '#8cc9e8', width: 1.5 });
    // Stopper and cap.
    svg.path(`M ${cx - 46} 100 L ${cx + 46} 100 L ${cx + 40} 150 Q ${cx} 170 ${cx - 40} 150 Z`, {
      color: '#e4936b',
      width: 1.5,
      fill: '#f8cdb2',
    });
    svg.rect(cx - 66, 55, 132, 40, { fill: '#e8453c', stroke: '#b5251d', width: 1.5, rx: 3 });
    // Rubber support and springs.
    svg.rect(cx - 25, 597, 50, 96, { fill: '#d0d2d3', stroke: '#8a8c8f', width: 1.2 });
    svg.rect(cx - 12, 597, 24, 96, { fill: '#ffffff' });
    for (const s of [-1, 1]) {
      const x = cx + s * 112;
      svg.path(`M ${x} 340 c ${s * 14} 20 ${-s * 14} 30 0 50 c ${s * 14} 20 ${-s * 14} 30 0 50`, {
        color: '#3a3a3a',
        width: 2.5,
      });
      svg.circle(x, 340, 4, { fill: '#3a3a3a' });
      svg.circle(x, 440, 4, { fill: '#3a3a3a' });
    }
    const lab = (x, y, list, to, anchor = 'start') => {
      notes(svg, x, y, list, { size: 24, gap: 28, anchor });
      for (const [a, b] of to) svg.squiggle(...a, ...b, { waves: 1, amp: 5 });
    };
    lab(
      500,
      25,
      ['Glass walls', 'with silvered', 'surfaces'],
      [
        [
          [470, 115],
          [cx + 92, 175],
        ],
        [
          [490, 120],
          [cx + 70, 210],
        ],
      ],
      'middle'
    );
    lab(
      600,
      260,
      ['Spring', 'centering', 'device'],
      [
        [
          [540, 320],
          [cx + 118, 380],
        ],
      ],
      'middle'
    );
    lab(
      570,
      490,
      ['Container'],
      [
        [
          [510, 490],
          [cx + 128, 520],
        ],
      ]
    );
    lab(
      560,
      655,
      ['Vacuum'],
      [
        [
          [555, 655],
          [cx + 70, 590],
        ],
      ]
    );
    lab(
      110,
      525,
      ['Hot or cold', 'liquid'],
      [
        [
          [100, 495],
          [cx - 20, 470],
        ],
      ],
      'middle'
    );
    lab(
      cx,
      770,
      ['Rubber support'],
      [
        [
          [cx, 745],
          [cx, 680],
        ],
      ],
      'middle'
    );
    return svg.render();
  },

  // 14.5 Fig. 2 — molecular collisions carry heat across a surface
  Figure_14_05_02: () => {
    const svg = new Svg({
      width: 880,
      height: 720,
      title: 'Conduction by molecular collisions',
      desc: 'Two regions meet at a surface: higher temperature on the left, lower on the right. A high-energy molecule from the left collides at the surface with a low-energy molecule from the right. After the collision the left molecule moves back more slowly and the right one moves away faster, so energy has passed from the hot side to the cold side. The net effect is heat conduction, Q, to the right.',
    });
    const bg = gradient(svg, [
      [0, '#f8d5c3'],
      [0.35, '#fdf3e2'],
      [0.6, '#fdfbe9'],
      [1, '#cfe6f6'],
    ]);
    svg.rect(0, 85, 880, 510, { fill: bg });
    const X = 440;
    svg.line(X, 85, X, 580, { color: '#c28265', width: 5 });
    note(svg, 560, 18, 'Surface', { anchor: 'middle' });
    svg.arrow(520, 30, X + 2, 84, { color: ARROW, width: 1.8, head: 12 });
    const C = [X, 295];
    const ball = (x, y, hot) => {
      svg.circle(x, y, 22, {
        fill: hot ? '#f39a7e' : '#4fa9b8',
        stroke: hot ? '#d8664c' : '#2f7f8c',
        width: 2,
      });
      svg.circle(x, y, 10, { fill: hot ? '#fbd7c9' : '#b5e1e8' });
      svg.circle(x, y, 4, { fill: '#ffffff' });
    };
    const dash = { color: ARROW, width: 2, dash: '7 6' };
    // Before: hot molecule fast from lower left, cold one slow from upper right.
    svg.line(390, 340, ...C, dash);
    svg.line(...C, 470, 255, dash);
    svg.line(...C, 370, 238, dash);
    svg.line(...C, 480, 355, dash);
    svg.arrow(260, 470, 388, 342, { color: GO, width: 4, head: 20 });
    ball(240, 478, true);
    svg.arrow(505, 205, 470, 252, { color: GO, width: 4, head: 20 });
    ball(512, 175, false);
    // After: the hot molecule leaves slowly, the cold one fast.
    ball(375, 240, true);
    svg.arrow(357, 225, 300, 170, { color: GO, width: 4, head: 20 });
    ball(480, 360, false);
    svg.arrow(492, 382, 570, 520, { color: GO, width: 4, head: 20 });
    notes(svg, 25, 300, ['Higher', 'temperature'], { anchor: 'start', size: 26, gap: 32 });
    notes(svg, 835, 300, ['Lower', 'temperature'], { anchor: 'end', size: 26, gap: 32 });
    notes(svg, 25, 512, ['High energy', 'before collision'], {
      anchor: 'start',
      size: 26,
      gap: 32,
    });
    notes(svg, 555, 135, ['Low energy', 'before collision'], {
      anchor: 'start',
      size: 26,
      gap: 32,
    });
    heatArrow(
      svg,
      [
        [310, 600],
        [570, 600],
      ],
      { w: 40, color: '#cfe6f6', fade: '#ec8b6a', amp: 5 }
    );
    svg.text(X, 602, '\\it{Q}', { size: 26, math: false, halo: false });
    notes(svg, X, 660, ['Heat', 'conduction'], { size: 26, gap: 32 });
    return svg.render();
  },

  // 14.5 Fig. 3 — conduction through a bar between two reservoirs
  Figure_14_05_03: () => {
    const svg = new Svg({
      width: 960,
      height: 470,
      title: 'Heat conduction through a slab',
      desc: 'A bar of material with thermal conductivity k and cross-sectional area A connects a hot block at temperature T₂ to a cold block at T₁, a distance d apart, with T₂ > T₁. Heat Q flows through the bar from the hot block to the cold block.',
    });
    // Oblique view: depth runs up and to the right.
    const [dx, dy] = [95, -80];
    const block = (x, w, top, bottom, front, side, topc) => {
      svg.polygon(
        [
          [x, top],
          [x + w, top],
          [x + w + dx, top + dy],
          [x + dx, top + dy],
        ],
        { fill: topc }
      );
      svg.polygon(
        [
          [x + w, top],
          [x + w + dx, top + dy],
          [x + w + dx, bottom + dy],
          [x + w, bottom],
        ],
        { fill: side }
      );
      svg.rect(x, top, w, bottom - top, { fill: front });
    };
    block(0, 105, 180, 395, '#ee7a55', '#f5b394', '#f7c3a8');
    // The bar.
    const bar = gradient(svg, [
      [0, '#e8603c'],
      [0.45, '#fde8de'],
      [0.6, '#f4f6fb'],
      [1, '#7f9ac8'],
    ]);
    const [b0, b1, by0, by1] = [150, 760, 230, 320];
    svg.polygon(
      [
        [b0, by0],
        [b1, by0],
        [b1, by1],
        [b0, by1],
      ],
      { fill: bar }
    );
    svg.polygon(
      [
        [b0, by0],
        [b0 + dx * 0.6, by0 + dy * 0.6],
        [b1 + dx * 0.6, by0 + dy * 0.6],
        [b1, by0],
      ],
      { fill: bar, opacity: 0.6 }
    );
    svg.line(b0, by0, b1, by0, { color: '#f7c3a8', width: 3 });
    svg.line(b0 + dx * 0.6, by0 + dy * 0.6, b1, by0 + dy * 0.6, { color: '#f7c3a8', width: 3 });
    svg.line(b0, by1, b1, by1, { color: '#f7c3a8', width: 2 });
    svg.line(b0, by0, b0 + dx * 0.6, by0 + dy * 0.6, { color: '#f7c3a8', width: 2 });
    svg.line(b0, by0, b0, by1, { color: '#f7c3a8', width: 2 });
    // The cross-section A.
    const ax = 420;
    svg.polygon(
      [
        [ax, by0],
        [ax + dx * 0.6, by0 + dy * 0.6],
        [ax + dx * 0.6, by1 + dy * 0.6],
        [ax, by1],
      ],
      { fill: '#7fb89c', opacity: 0.9 }
    );
    heatArrow(
      svg,
      [
        [215, 245],
        [415, 245],
      ],
      { w: 44, color: '#f9b9a1', fade: '#fde6db' }
    );
    svg.text(180, 268, '\\it{Q}', { size: 26, math: false, halo: false });
    svg.line(180, 268, 708, 268, { color: '#f3b29a', width: 3, dash: '10 8' });
    block(708, 105, 180, 395, '#7f9ac8', '#a8b8dd', '#c2cee9');
    svg.text(55, 300, '\\it{T}_2', { size: 28, math: false, halo: false });
    svg.text(745, 280, '\\it{T}_1', { size: 28, math: false, halo: false });
    // Labels.
    notes(svg, 360, 30, ['Material having', 'thermal conductivity \\it{k}'], { size: 24, gap: 28 });
    svg.squiggle(380, 90, 330, 185, { waves: 1.5, amp: 6 });
    note(svg, 600, 95, 'Area \\it{A}', { size: 24 });
    svg.squiggle(565, 112, ax + 30, 190, { waves: 1.2, amp: 6 });
    svg.line(105, 375, 105, 420, { color: ARROW, width: 1.5 });
    svg.line(708, 375, 708, 420, { color: ARROW, width: 1.5 });
    svg.arrow(107, 405, 706, 405, { color: ARROW, width: 1.8, head: 14, start: true });
    svg.rect(392, 392, 30, 26, { fill: '#ffffff' });
    svg.text(407, 405, 'd', { size: 26 });
    svg.rect(345, 425, 125, 38, { stroke: ARROW, width: 1.5, fill: '#ffffff' });
    svg.text(407, 444, '\\it{T}_2 > \\it{T}_1', { size: 24, math: false });
    return svg.render();
  },

  // 14.5 Fig. 4 — fiberglass batts
  Figure_14_05_04: () => {
    const svg = new Svg({
      width: 440,
      height: 360,
      title: 'Fiberglass batts',
      desc: 'Two thick rectangular pieces of fiberglass batt insulation, one lying on top of the other.',
    });
    const rand = rng(3);
    // A box seen from above: corner p, length a, depth b (screen vectors), thickness h.
    const batt = (p, a, b, h) => {
      const add = (...v) => v.reduce((q, r) => [q[0] + r[0], q[1] + r[1]]);
      const down = q => [q[0], q[1] + h];
      const top = [p, add(p, a), add(p, a, b), add(p, b)];
      svg.polygon([top[0], top[1], down(top[1]), down(top[0])], {
        fill: '#f9e7b0',
        stroke: '#c9a25c',
        width: 1.5,
      });
      svg.polygon([top[1], top[2], down(top[2]), down(top[1])], {
        fill: '#f6dd93',
        stroke: '#c9a25c',
        width: 1.5,
      });
      for (let k = 1; k < 9; k += 1) {
        const dy = (h * k) / 9;
        svg.line(top[0][0], top[0][1] + dy, top[1][0], top[1][1] + dy, {
          color: '#efc65a',
          width: 0.8,
        });
        svg.line(top[1][0], top[1][1] + dy, top[2][0], top[2][1] + dy, {
          color: '#efc65a',
          width: 0.8,
        });
      }
      svg.polygon(top, { fill: '#fdf5d6', stroke: '#c9a25c', width: 1.5 });
      // Fibers on the top face, jittered on a grid so they don't clump.
      for (let k = 0; k < 12; k += 1) {
        const [i, j] = [k % 4, Math.floor(k / 4)];
        const [u, v] = [0.08 + (i + rand() * 0.5) * 0.2, 0.2 + (j + rand() * 0.5) * 0.22];
        const x = p[0] + a[0] * u + b[0] * v;
        const y = p[1] + a[1] * u + b[1] * v;
        svg.path(`M ${fmt(x)} ${fmt(y)} q 6 -6 12 0 t 12 0`, { color: '#f0b928', width: 1.6 });
      }
    };
    svg.polygon(
      [
        [70, 300],
        [190, 350],
        [430, 285],
        [420, 240],
      ],
      { fill: '#e6e6e6' }
    );
    batt([10, 175], [250, 85], [150, -95], 58);
    batt([30, 100], [255, 15], [95, -95], 55);
    return svg.render();
  },

  // 14.6 Fig. 1 — a convection loop driven by a gravity furnace
  Figure_14_06_01: () => {
    const svg = new Svg({
      width: 880,
      height: 690,
      title: 'Convection from a gravity furnace',
      desc: 'A room with a gravity furnace at the lower left. Hot air from the furnace rises along the left wall, crosses under the ceiling, cools, sinks along the right wall, and returns along the floor to the furnace, forming a convection loop.',
    });
    // Roof.
    svg.polygon(
      [
        [0, 240],
        [440, 5],
        [880, 240],
        [855, 255],
        [440, 30],
        [25, 255],
      ],
      { fill: '#5f9f8c' }
    );
    svg.polygon(
      [
        [60, 225],
        [440, 30],
        [820, 225],
      ],
      { fill: '#9fc8b8', stroke: '#5f9f8c', width: 2 }
    );
    for (let y = 55; y < 225; y += 17) {
      const half = ((y - 30) / 195) * 380;
      svg.line(440 - half + 6, y, 440 + half - 6, y, { color: '#5f9f8c', width: 1.2 });
    }
    // Room in perspective.
    const [x0, y0, x1, y1] = [65, 225, 815, 680];
    const [b0, c0, b1, c1] = [175, 275, 605, 610];
    svg.polygon(
      [
        [x0, y0],
        [x1, y0],
        [b1, c0],
        [b0, c0],
      ],
      { fill: '#c99a52' }
    );
    svg.polygon(
      [
        [x0, y1],
        [x1, y1],
        [b1, c1],
        [b0, c1],
      ],
      { fill: '#f6efd9' }
    );
    svg.polygon(
      [
        [x0, y0],
        [b0, c0],
        [b0, c1],
        [x0, y1],
      ],
      { fill: '#d9c08e' }
    );
    svg.polygon(
      [
        [x1, y0],
        [b1, c0],
        [b1, c1],
        [x1, y1],
      ],
      { fill: '#d9c08e' }
    );
    svg.rect(b0, c0, b1 - b0, c1 - c0, { fill: '#e8d6a8', stroke: '#b99a5e', width: 1 });
    svg.rect(x0, y0, x1 - x0, y1 - y0, { stroke: '#b99a5e', width: 2 });
    svg.rect(290, 310, 195, 130, { fill: '#cfe6f5', stroke: '#9b7a4a', width: 7 });
    for (const x of [355, 420]) svg.line(x, 310, x, 440, { color: '#9b7a4a', width: 5 });
    svg.line(290, 375, 485, 375, { color: '#9b7a4a', width: 5 });
    sofa(svg, 390, 585, 1.05);
    // Furnace and flue.
    svg.path('M 30 560 L 30 190', { color: '#9a9c9f', width: 22 });
    svg.path('M 30 555 Q 30 580 55 580 L 95 580', { color: '#9a9c9f', width: 22 });
    svg.polygon(
      [
        [12, 190],
        [30, 150],
        [48, 190],
      ],
      { fill: '#c7c8ca', stroke: '#8a8c8f', width: 1.5 }
    );
    svg.polygon(
      [
        [95, 540],
        [175, 540],
        [195, 520],
        [115, 520],
      ],
      { fill: '#d0d2d3', stroke: '#8a8c8f', width: 1.2 }
    );
    svg.polygon(
      [
        [175, 540],
        [195, 520],
        [195, 640],
        [175, 660],
      ],
      { fill: '#bcbec0', stroke: '#8a8c8f', width: 1.2 }
    );
    svg.rect(95, 540, 80, 120, { fill: '#e6e7e8', stroke: '#8a8c8f', width: 1.2 });
    svg.rect(105, 560, 60, 85, { fill: '#fff7d6' });
    flame(svg, 135, 640, 1.05, { burner: false });
    svg.rect(110, 640, 50, 5, { fill: '#fff7d6' });
    // The convection loop: red while hot, blue once cooled.
    const red = { color: '#a3122a', width: 3.5, head: 15, dash: '22 12' };
    const blue = { color: '#5b84bd', width: 3.5, head: 15, dash: '22 12' };
    bend(svg, [110, 510], [110, 260], [190, 255], red);
    bend(svg, [140, 510], [140, 300], [200, 292], red);
    svg.arrow(230, 255, 640, 255, red);
    svg.arrow(240, 292, 560, 292, red);
    bend(svg, [640, 255], [700, 255], [710, 310], red);
    bend(svg, [560, 292], [620, 292], [640, 360], blue);
    svg.arrow(710, 320, 710, 590, blue);
    svg.arrow(640, 370, 640, 550, blue);
    bend(svg, [710, 590], [710, 650], [620, 650], blue);
    bend(svg, [640, 560], [640, 610], [560, 615], blue);
    svg.arrow(610, 650, 200, 625, blue);
    svg.arrow(545, 615, 230, 600, blue);
    svg.rect(176, 330, 105, 66, { fill: '#e8d6a8' });
    notes(svg, 180, 345, ['Hot air', 'rises'], { anchor: 'start', size: 30, gap: 34 });
    notes(svg, 730, 420, ['Air cooled', 'by room', 'sinks'], {
      anchor: 'start',
      size: 28,
      gap: 32,
    });
    notes(svg, 195, 462, ['Gravity', 'furnace'], { anchor: 'start', size: 24, gap: 28 });
    svg.squiggle(215, 500, 178, 560, { waves: 1, amp: 4 });
    return svg.render();
  },

  // 14.6 Fig. 2 — convection in a pot of water on a burner
  Figure_14_06_02: () => {
    const svg = new Svg({
      width: 820,
      height: 780,
      title: 'Convection in a pot of water',
      desc: 'A pot of water on a gas burner, its front cut away. Water heated at the bottom rises up the middle and sinks along the cooler sides, forming two circulating loops. A few bubbles are in the water.',
    });
    const metal = gradient(svg, [
      [0, '#8a8c8f'],
      [0.25, '#c7c8ca'],
      [0.6, '#e6e7e8'],
      [1, '#8a8c8f'],
    ]);
    // Burner.
    svg.ellipse(410, 690, 330, 50, { fill: '#9a9c9f', stroke: '#555555', width: 2 });
    svg.ellipse(410, 680, 320, 46, { fill: '#e6e7e8', stroke: '#6d6e71', width: 1.5 });
    for (const x of [140, 680]) svg.rect(x - 14, 650, 28, 120, { fill: '#555555', rx: 6 });
    for (let k = 0; k < 13; k += 1) {
      const x = 150 + k * 43;
      svg.circle(x, 665 + 8 * Math.sin((k / 12) * Math.PI), 10, { fill: '#333333' });
      svg.path(`M ${x - 7} 655 Q ${x} 615 ${x + 7} 655 Z`, {
        color: '#6fb6e8',
        width: 1,
        fill: '#bfe3f8',
      });
    }
    // Pot: back wall, water, cut front.
    svg.path('M 60 110 L 60 590 Q 410 680 760 590 L 760 110', {
      color: '#6d6e71',
      width: 2,
      fill: metal,
    });
    svg.ellipse(410, 110, 350, 70, { fill: '#9a9c9f', stroke: '#6d6e71', width: 2 });
    svg.ellipse(410, 120, 330, 62, { fill: '#c9e7f7' });
    const cut = 'M 90 235 Q 140 400 110 545 Q 410 620 720 520 Q 700 380 730 235 Q 410 300 90 235 Z';
    svg.path(cut, { color: '#555555', width: 6, fill: '#bfe1f4' });
    svg.path('M 90 235 Q 410 300 730 235', { color: '#a9d8f2', width: 3 });
    for (const [x, y] of [
      [-30, 90],
      [760, 175],
    ]) {
      svg.rect(x, y, 90, 22, { fill: '#555555', rx: 11 });
    }
    // Two convection loops: up the middle, down the sides.
    const loop = (cx, cy, dir) => {
      const r = 105;
      const arcPts = (a1, a2) => {
        const pts = [];
        for (let k = 0; k <= 30; k += 1) {
          const a = ((a1 + ((a2 - a1) * k) / 30) * Math.PI) / 180;
          pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
        }
        return pts;
      };
      for (const [a1, a2] of dir > 0
        ? [
            [-20, 110],
            [160, 290],
          ]
        : [
            [200, 70],
            [20, -110],
          ]) {
        const pts = arcPts(a1, a2);
        svg.polyline(pts.slice(0, -2), { color: ARROW, width: 2.5 });
        svg.arrow(...pts.at(-3), ...pts.at(-1), { color: ARROW, width: 2.5, head: 16 });
      }
    };
    loop(290, 420, 1);
    loop(540, 420, -1);
    for (const [x, y] of [
      [240, 300],
      [180, 360],
      [400, 345],
      [290, 430],
      [240, 490],
      [470, 465],
      [560, 455],
    ]) {
      svg.circle(x, y, 9, { fill: '#e9f6fd', stroke: '#8cc9e8', width: 1.5 });
    }
    return svg.render();
  },

  // 14.6 Fig. 3 — fur breaks air into many small convection loops
  Figure_14_06_03: () => {
    const svg = new Svg({
      width: 750,
      height: 750,
      title: 'Fur as insulation',
      desc: 'A cross-section of a warm body covered by a thick layer of fur, with cold air outside. The air trapped in the fur forms many small convection loops, which transfer heat only slowly.',
    });
    const [cx, cy] = [1150, 1050];
    const ring = (r, fill) => svg.circle(cx, cy, r, { fill });
    ring(1120, '#c0885a');
    ring(800, '#f1d2b5');
    ring(785, '#cf7a64');
    // Hair strokes in the fur.
    const rand = rng(12);
    for (let k = 0; k < 900; k += 1) {
      const a = Math.PI + 0.12 + rand() * 1.4;
      const r = 805 + rand() * 300;
      const t = a + Math.PI / 2;
      const [x, y] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      if (x > 760 || y > 760 || x < -10 || y < -10) continue;
      const len = 10 + rand() * 18;
      svg.line(x, y, x + len * Math.cos(t), y + len * Math.sin(t), {
        color: rand() < 0.5 ? '#9a6338' : '#e2b386',
        width: 1.2,
      });
    }
    svg.rect(0, 0, 750, 750, { stroke: '#ffffff', width: 0 });
    // Convection loops: small circles with arrowheads.
    for (let i = 0; i < 4; i += 1) {
      for (let j = -1; j < 10; j += 1) {
        const a = Math.PI + 0.25 + j * 0.13 + (i % 2) * 0.065;
        const r = 865 + i * 70;
        const [x, y] = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
        if (x < 15 || y < 15 || x > 735 || y > 735) continue;
        svg.circle(x, y, 18, { fill: 'none', stroke: ARROW, width: 1.6 });
        // Counterclockwise: leftward across the top, rightward across the bottom.
        svg.arrow(x + 5, y - 18, x - 7, y - 17, { color: ARROW, width: 1.6, head: 9 });
        svg.arrow(x - 5, y + 18, x + 7, y + 17, { color: ARROW, width: 1.6, head: 9 });
      }
    }
    notes(svg, 75, 470, ['Air', '(cold)'], { size: 32, gap: 38 });
    notes(svg, 650, 630, ['Body', '(warm)'], { size: 32, gap: 38 });
    svg.rect(330, 45, 80, 44, { fill: '#ffffff' });
    note(svg, 380, 70, 'Fur', { size: 32 });
    svg.squiggle(425, 75, 580, 128, { waves: 1, amp: 6 });
    svg.rect(125, 155, 125, 140, { fill: '#ffffff' });
    notes(svg, 185, 185, ['Many', 'convection', 'loops'], { size: 32, gap: 40 });
    svg.squiggle(265, 230, 418, 272, { waves: 1, amp: 6 });
    return svg.render();
  },

  // 14.7 Fig. 4 — black and silver surfaces absorbing and radiating
  Figure_14_07_04: () => {
    const svg = new Svg({
      width: 780,
      height: 1000,
      title: 'Absorption and radiation by black and silver surfaces',
      desc: 'A black block absorbs most of the radiant energy that falls on it and reflects little; it also radiates well, emitting most of its energy and retaining little. A silver-coated block reflects most of the incident energy and absorbs little; it radiates poorly, emitting little and retaining most.',
    });
    const [RED, VIOLET] = ['#e0155d', '#7b3fa0'];
    const box = (x, y, black) => {
      const [w, h, dx, dy] = [270, 140, 60, -70];
      const face = gradient(
        svg,
        black
          ? [
              [0, '#d4d4d4'],
              [1, '#7a7a7a'],
            ]
          : [
              [0, '#dfe8ef'],
              [1, '#a9bccb'],
            ],
        { x1: 0, y1: 0, x2: 0, y2: 1 }
      );
      svg.polygon(
        [
          [x, y],
          [x + dx, y + dy],
          [x + w + dx, y + dy],
          [x + w, y],
        ],
        { fill: black ? '#5a5a5a' : '#c9d7e2', stroke: '#9a9a9a', width: 1 }
      );
      svg.polygon(
        [
          [x + w, y],
          [x + w + dx, y + dy],
          [x + w + dx, y + h + dy],
          [x + w, y + h],
        ],
        { fill: black ? '#6e6e6e' : '#b9cad8', stroke: '#9a9a9a', width: 1 }
      );
      svg.rect(x, y, w, h, { fill: face, stroke: '#9a9a9a', width: 1 });
    };
    /** A broad flat arrow (a ribbon of width w) from a to b. */
    const band = (a, b, w, color) => {
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const [ux, uy] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
      const head = Math.max(w * 1.2, 14);
      const hw = Math.max(w * 0.9, 7);
      const [bx, by] = [b[0] - ux * head, b[1] - uy * head];
      svg.polygon(
        [
          [a[0] - (uy * w) / 2, a[1] + (ux * w) / 2],
          [bx - (uy * w) / 2, by + (ux * w) / 2],
          [bx - uy * hw, by + ux * hw],
          b,
          [bx + uy * hw, by - ux * hw],
          [bx + (uy * w) / 2, by - (ux * w) / 2],
          [a[0] + (uy * w) / 2, a[1] - (ux * w) / 2],
        ],
        { fill: color, opacity: 0.92 }
      );
    };
    const absorbPanel = (x, y, black) => {
      box(x, y, black);
      const hit = [x + 140, y - 20];
      band([x, y - 110], hit, 40, '#b02a6a');
      // Black: most absorbed, a little reflected. Silver: the reverse.
      band(hit, [x + 280, y - 145], black ? 6 : 34, RED);
      band(hit, [x + 270, y + 75], black ? 34 : 6, VIOLET);
      notes(svg, x - 10, y - 220, ['Incident', 'radiant', 'energy'], {
        anchor: 'start',
        size: 26,
        gap: 30,
      });
      note(svg, x + 300, y - 170, 'Reflected', { anchor: 'end', size: 26 });
      note(svg, x + 300, y + 105, 'Absorbed', { anchor: 'end', size: 26 });
      note(svg, x + 135, y + 175, black ? 'Black' : 'Silver coated', { size: 26 });
    };
    const radiatePanel = (x, y, black) => {
      box(x, y, black);
      const src = [x + 20, y + 40];
      const out = [x + 150, y - 20];
      // A black surface emits most of its energy; silver retains most.
      band(src, out, 34, '#b02a6a');
      band(out, [x + 310, y - 140], black ? 30 : 6, RED);
      band(out, [x + 265, y + 70], black ? 6 : 30, VIOLET);
      note(svg, x + 260, y - 165, 'Emitted', { anchor: 'end', size: 26 });
      note(svg, x + 275, y + 100, 'Retained', { anchor: 'end', size: 26 });
      note(svg, x + 135, y + 175, black ? 'Black' : 'Silver coated', { size: 26 });
    };
    note(svg, 190, 25, 'Absorb', { size: 28, weight: 'bold' });
    note(svg, 590, 25, 'Radiate', { size: 28, weight: 'bold' });
    absorbPanel(30, 300, true);
    radiatePanel(420, 300, true);
    absorbPanel(30, 780, false);
    radiatePanel(420, 780, false);
    return svg.render();
  },

  // 14.7 Fig. 6 — the greenhouse effect
  Figure_14_07_06: () => {
    const svg = new Svg({
      width: 880,
      height: 640,
      title: 'The greenhouse effect',
      desc: 'Ultraviolet, visible, and infrared radiation from the Sun passes through the atmosphere and is absorbed by the Earth’s surface. The Earth re-emits energy as infrared radiation, much of which is absorbed in the atmosphere and sent back toward the surface.',
    });
    const sky = gradient(
      svg,
      [
        [0, '#ffffff'],
        [0.25, '#ffffff'],
        [0.55, '#cde6f4'],
        [1, '#fbe0d6'],
      ],
      { x1: 0, y1: 0, x2: 0, y2: 1 }
    );
    svg.rect(0, 0, 880, 640, { fill: sky });
    // The Earth: a large disk whose top shows as a gentle arc.
    const sea = gradient(
      svg,
      [
        [0, '#7fb7e0'],
        [1, '#7d86c8'],
      ],
      { x1: 0, y1: 0, x2: 0, y2: 1 }
    );
    svg.circle(440, 2420, 2000, { fill: sea });
    const land = d => svg.path(d, { color: 'none', width: 0, fill: '#a8cf8c' });
    land('M 0 560 C 60 520 200 520 300 540 C 380 560 440 590 430 640 L 0 640 Z');
    land('M 620 640 C 600 560 660 520 740 525 C 820 530 870 560 880 590 L 880 640 Z');
    // The Sun.
    for (let k = 0; k < 24; k += 1) {
      const a = (k * Math.PI) / 12;
      svg.line(
        70 + 34 * Math.cos(a),
        45 + 34 * Math.sin(a),
        70 + 46 * Math.cos(a),
        45 + 46 * Math.sin(a),
        { color: '#f7c948', width: 3 }
      );
    }
    svg.circle(70, 45, 32, { fill: '#f9c83a' });
    svg.circle(70, 45, 20, { fill: '#fbe08a' });
    const blue = '#21a6dc';
    for (const [x, label] of [
      [165, 'UV'],
      [240, 'Visible'],
      [325, 'IR'],
    ]) {
      ray(svg, [x, 252], [x + 105, 437 - (x - 165) * 0.02], {
        color: blue,
        waves: x === 165 ? 9 : x === 240 ? 7 : 4,
        amp: 5,
        width: 2,
      });
      note(svg, x - 6, 232, label, { size: 26 });
    }
    // Infrared from the ground, absorbed and sent back by the atmosphere.
    const top = [600, 282];
    const [g1, g2] = [
      [410, 430],
      [705, 452],
    ];
    for (const [a, b] of [
      [g1, top],
      [top, g2],
    ]) {
      svg.arrow(...a, ...b, { color: ARROW, width: 2, head: 14 });
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const [ux, uy] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
      const pts = [];
      for (let k = 0; k <= 80; k += 1) {
        const s = (len * k) / 80;
        const off = 14 * Math.sin((2 * Math.PI * 2 * s) / len);
        pts.push([a[0] + ux * s - uy * off, a[1] + uy * s + ux * off]);
      }
      svg.polyline(pts, { color: blue, width: 1.8 });
    }
    svg.text(485, 322, 'IR', { size: 26, italic: false });
    note(svg, 18, 410, 'Atmosphere', { anchor: 'start', size: 26 });
    note(svg, 470, 500, 'Earth', { size: 28 });
    return svg.render();
  },
};
