/**
 * svg.js — a small SVG builder for the book's line-art figures (graphs, vector
 * diagrams, geometry). It complements scripts/fbd/fbd.js, which only draws
 * free-body diagrams.
 *
 * Coordinates are SVG pixels (y down) unless a helper says otherwise. The
 * `Frame` helper maps "math" coordinates (y up, arbitrary units) onto pixels, and
 * `Plot` draws a data graph with ticks and axis titles.
 *
 * Label markup (see `renderLabel`) is shared by every text call:
 *   v_0, F_{app}   → subscripts (upright, smaller)
 *   m/s^2, x^{-1}  → superscripts
 *   **A**          → bold upright vector symbol with an arrow, like \vb{A}
 *   ā, v̄           → overbars: write `\bar{v}`
 *   \rm{m/s}       → upright text (units, so "m" and "s" are not italic)
 *   \it{t}         → italic text (variables inside plain annotations)
 * One- and two-letter tokens and lowercase Greek are italic (variables, "mx");
 * words of three or more letters, uppercase Greek (Δ), digits, spaces and
 * punctuation are upright. Write units as \rm{...}.
 */

export const COLORS = {
  text: '#222222',
  axis: '#333333',
  grid: '#dddddd',
  guide: '#666666',
  position: '#c0392b',
  velocity: '#5e9e1e',
  accel: '#6a3d9a',
  vector: '#8e4f8e',
  red: '#c62828',
  blue: '#1f77c8',
  maroon: '#7b1145',
  orange: '#ef7d22',
  green: '#3f9a2b',
  black: '#222222',
  fill: '#cfe3ea',
};

export const FONT_MATH = "'Times New Roman', Times, serif";
export const FONT_SANS = 'Helvetica, Arial, sans-serif';

export const rad = deg => (deg * Math.PI) / 180;
export const fmt = n => Number(n.toFixed(2)).toString();

/** SMIL list. Four decimals so nearby keyTimes stay distinct. */
export function smilList(values) {
  return values
    .map(v => (typeof v === 'number' ? Number(v.toFixed(4)).toString() : String(v)))
    .join(';');
}

/** Looping SMIL attribute animation. `values` are numbers or raw tokens. */
export function smilAnimate(attributeName, values, { dur = '8s', keyTimes } = {}) {
  const kt = keyTimes ? ` keyTimes="${smilList(keyTimes)}"` : '';
  return `<animate attributeName="${attributeName}" dur="${dur}" repeatCount="indefinite" calcMode="linear" values="${smilList(values)}"${kt}/>`;
}

/** `translate` animation through pixel points. */
export function smilTranslate(points, { dur = '8s', keyTimes } = {}) {
  const values = points
    .map(([x, y]) => `${Number(x.toFixed(2))} ${Number(y.toFixed(2))}`)
    .join(';');
  const kt = keyTimes ? ` keyTimes="${smilList(keyTimes)}"` : '';
  return `<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" calcMode="linear" values="${values}"${kt}/>`;
}

/** Linear vertical scale about the origin, from y0 to y1. */
export function smilScaleY(y0, y1, { dur = '8s' } = {}) {
  return `<animateTransform attributeName="transform" type="scale" dur="${dur}" repeatCount="indefinite" calcMode="linear" values="1 ${y0};1 ${y1}"/>`;
}

/**
 * Motion along `path`. Pass `keyPoints` and `keyTimes` when equal time should
 * not mean equal distance (a projectile, a Keplerian orbit). Otherwise the
 * default pacing moves at constant speed, which is what a circle wants.
 */
export function smilMotion(path, { dur = '8s', rotate = '0', keyPoints, keyTimes } = {}) {
  const timing =
    keyPoints && keyTimes
      ? ` calcMode="linear" keyPoints="${smilList(keyPoints)}" keyTimes="${smilList(keyTimes)}"`
      : '';
  return `<animateMotion dur="${dur}" repeatCount="indefinite" rotate="${rotate}"${timing} path="${path}"/>`;
}

/** SVG path through pixel points. */
export function pathThrough(points) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'} ${fmt(x)} ${fmt(y)}`).join(' ');
}

/**
 * Path timing that reaches each vertex at equal times, whatever the segment
 * lengths. `keyPoints` are fractions of path length, as animateMotion expects.
 */
export function timedPath(points) {
  const n = points.length - 1;
  let total = 0;
  const seg = [];
  for (let k = 0; k < n; k += 1) {
    const d = Math.hypot(points[k + 1][0] - points[k][0], points[k + 1][1] - points[k][1]);
    seg.push(d);
    total += d;
  }
  let acc = 0;
  const keyPoints = [0];
  for (let k = 0; k < n; k += 1) {
    acc += seg[k];
    keyPoints.push(total === 0 ? 1 : acc / total);
  }
  keyPoints[keyPoints.length - 1] = 1;
  return {
    path: pathThrough(points),
    keyPoints,
    keyTimes: points.map((_, k) => (n === 0 ? 0 : k / n)),
  };
}

/**
 * Arrow from the local origin toward (x, y). With `lengths`, that direction is
 * redrawn at each length, in step with `dur`.
 */
export function localArrow(
  x,
  y,
  color,
  { width = 3.5, head = 12, lengths, dur = '8s', keyTimes } = {}
) {
  const full = Math.hypot(x, y) || 1;
  const ux = x / full;
  const uy = y / full;
  const px = -uy;
  const py = ux;
  const half = head * 0.42;
  const frame = L => {
    const tip = [ux * L, uy * L];
    const b = Math.max(L - head, 0);
    const base = [ux * b, uy * b];
    const left = [base[0] + px * half, base[1] + py * half];
    const right = [base[0] - px * half, base[1] - py * half];
    const points = `${fmt(tip[0])},${fmt(tip[1])} ${fmt(left[0])},${fmt(left[1])} ${fmt(right[0])},${fmt(right[1])}`;
    return { base, points };
  };
  const frames = (lengths || [full]).map(frame);
  const opt = { dur, keyTimes };
  const shaft = lengths
    ? `${smilAnimate(
        'x2',
        frames.map(f => f.base[0]),
        opt
      )}${smilAnimate(
        'y2',
        frames.map(f => f.base[1]),
        opt
      )}`
    : '';
  const headAnim = lengths
    ? smilAnimate(
        'points',
        frames.map(f => f.points),
        opt
      )
    : '';
  const { base, points } = frames[0];
  return `<line x1="0" y1="0" x2="${fmt(base[0])}" y2="${fmt(base[1])}" stroke="${color}" stroke-width="${width}" stroke-linecap="round">${shaft}</line><polygon points="${points}" fill="${color}">${headAnim}</polygon>`;
}
export const escapeXml = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Zero-width space: an empty tspan would be dropped, losing its baseline reset.
const ZWSP = String.fromCharCode(0x200b);

// Advance widths (em) of Times bold letters, used to center the vector arrow.
// Times New Roman, Times and Liberation Serif share these metrics.
const BOLD_WIDTH = {
  A: 0.722,
  B: 0.667,
  C: 0.722,
  D: 0.722,
  E: 0.667,
  F: 0.611,
  G: 0.778,
  H: 0.778,
  I: 0.389,
  J: 0.5,
  K: 0.778,
  L: 0.667,
  M: 0.944,
  N: 0.722,
  O: 0.778,
  P: 0.611,
  Q: 0.778,
  R: 0.722,
  S: 0.556,
  T: 0.667,
  U: 0.722,
  V: 0.722,
  W: 1.0,
  X: 0.722,
  Y: 0.722,
  Z: 0.667,
  a: 0.5,
  b: 0.556,
  c: 0.444,
  d: 0.556,
  e: 0.444,
  f: 0.333,
  g: 0.5,
  h: 0.556,
  i: 0.278,
  j: 0.333,
  k: 0.556,
  l: 0.278,
  m: 0.833,
  n: 0.556,
  o: 0.5,
  p: 0.556,
  q: 0.556,
  r: 0.444,
  s: 0.389,
  t: 0.333,
  u: 0.556,
  v: 0.5,
  w: 0.722,
  x: 0.5,
  y: 0.5,
  z: 0.444,
};
const ASCENDERS = /[A-Zbdfhklt]/;

/**
 * An arrow accent over the letter just written, as tspans: step back over half
 * the letter, raise a small "→" above it, then step forward and down again so
 * the following text starts where it would have without the arrow. Only the
 * arrow's own width is estimated, so a font with slightly different metrics
 * shifts the arrow by a pixel or so but never the rest of the label.
 */
function vectorArrow(letter, size) {
  const arrowSize = size * 0.62;
  const arrowWidth = arrowSize * 0.92;
  const letterWidth = (BOLD_WIDTH[letter] ?? 0.6) * size;
  const raise = (ASCENDERS.test(letter) ? 0.62 : 0.42) * size;
  const back = -(letterWidth + arrowWidth) / 2;
  const forward = (letterWidth + arrowWidth) / 2 - arrowWidth;
  return (
    `<tspan font-size="${fmt(arrowSize)}" font-weight="normal" dx="${fmt(back)}" dy="${fmt(-raise)}">→</tspan>` +
    `<tspan dx="${fmt(forward)}" dy="${fmt(raise)}">${ZWSP}</tspan>`
  );
}

const LETTER = /[A-Za-zͰ-Ͽ]/;

/** Read a `{...}` group or a single character starting at index i. */
function readGroup(markup, i) {
  if (markup[i] === '\\') {
    // A command such as \rm{f}: keep the command and its argument together.
    let j = i + 1;
    while (j < markup.length && /[a-z]/.test(markup[j])) j += 1;
    const [, next] = readGroup(markup, j);
    return [markup.slice(i, next), next];
  }
  if (markup[i] === '{') {
    let depth = 1;
    let j = i + 1;
    while (j < markup.length && depth) {
      if (markup[j] === '{') depth += 1;
      else if (markup[j] === '}') depth -= 1;
      j += 1;
    }
    return [markup.slice(i + 1, j - 1), j];
  }
  return [markup[i], i + 1];
}

/**
 * Turn label markup into <tspan> elements. `italic` controls whether single
 * letters are italic (true for math labels, false for plain annotations).
 */
export function renderLabel(markup, size, { italic = true } = {}) {
  const out = [];
  const subSize = fmt(size * 0.7);
  let i = 0;
  let plain = '';

  const flushPlain = () => {
    if (!plain) return;
    // Uppercase Greek (Δ, Σ) is always its own upright token, so "Δx" splits
    // into an upright Δ and an italic x, as in the book's typeset math.
    const tokens =
      plain.match(/[\u0391-\u03a9]|(?:[A-Za-z\u03b1-\u03c9]|\u0304)+|[^A-Za-z\u0370-\u03ff]+/g) ||
      [];
    for (const token of tokens) {
      const isWord = LETTER.test(token[0]) && !/[\u0391-\u03a9]/.test(token);
      // Words of three or more letters ("Slope", "sin", "Average") are upright;
      // one- and two-letter tokens ("x", "mx", "Fd") are products of variables.
      const letters = token.replace(/̄/g, '').length;
      const slant = isWord && italic && letters <= 2;
      out.push(`<tspan font-style="${slant ? 'italic' : 'normal'}">${escapeXml(token)}</tspan>`);
    }
    plain = '';
  };

  while (i < markup.length) {
    const ch = markup[i];
    if (ch === '_' || ch === '^') {
      flushPlain();
      const [group, next] = readGroup(markup, i + 1);
      const shift = ch === '_' ? size * 0.28 : -size * 0.4;
      const inner = renderLabel(group, size * 0.7, { italic: false });
      out.push(
        `<tspan font-size="${subSize}" dy="${fmt(shift)}">${inner}</tspan><tspan dy="${fmt(-shift)}">${ZWSP}</tspan>`
      );
      i = next;
    } else if (markup.startsWith('**', i)) {
      flushPlain();
      const end = markup.indexOf('**', i + 2);
      const body = markup.slice(i + 2, end);
      // The symbol letter gets an arrow accent, as \vb{A} does in the text;
      // anything after it (a prime, say) is plain bold.
      const head = body[0];
      const rest = body.slice(1);
      out.push(
        `<tspan font-weight="bold" font-style="normal">${escapeXml(head)}${vectorArrow(head, size)}${rest ? renderLabel(rest, size, { italic: false }) : ''}</tspan>`
      );
      i = end + 2;
    } else if (markup.startsWith('\\rm', i) || markup.startsWith('\\it', i)) {
      flushPlain();
      const style = markup[i + 1] === 'r' ? 'normal' : 'italic';
      const [group, next] = readGroup(markup, i + 3);
      out.push(`<tspan font-style="${style}">${escapeXml(group)}</tspan>`);
      i = next;
    } else if (markup.startsWith('\\bar', i)) {
      const [group, next] = readGroup(markup, i + 4);
      plain += `${group}̄`;
      i = next;
    } else {
      plain += ch;
      i += 1;
    }
  }
  flushPlain();
  return out.join('');
}

function attrs(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k}="${typeof v === 'number' ? fmt(v) : escapeXml(v)}"`)
    .join(' ');
}

export class Svg {
  constructor({ width, height, title = '', desc = '' }) {
    Object.assign(this, { width, height, title, desc });
    this.items = [];
    this.motion = false;
  }

  /**
   * Overlay that plays only when the reader has not asked for reduced motion.
   * The group is opacity 0 in the file, so print and viewers that skip CSS
   * keep the still figure. `markup` may include SMIL.
   */
  motionGroup(markup) {
    this.motion = true;
    return this.add(`<g class="motion" opacity="0" aria-hidden="true">${markup}</g>`);
  }

  add(markup) {
    this.items.push(markup);
    return this;
  }

  line(x1, y1, x2, y2, { color = COLORS.axis, width = 1.5, dash, cap } = {}) {
    return this.add(
      `<line ${attrs({ x1, y1, x2, y2, stroke: color, 'stroke-width': width, 'stroke-dasharray': dash, 'stroke-linecap': cap })}/>`
    );
  }

  polyline(points, { color = COLORS.axis, width = 2, dash, fill = 'none', join = 'round' } = {}) {
    const pts = points.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(' ');
    return this.add(
      `<polyline ${attrs({ points: pts, fill, stroke: color, 'stroke-width': width, 'stroke-dasharray': dash, 'stroke-linejoin': join })}/>`
    );
  }

  polygon(points, { fill = COLORS.fill, stroke, width = 1.5, opacity } = {}) {
    const pts = points.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(' ');
    return this.add(
      `<polygon ${attrs({ points: pts, fill, stroke, 'stroke-width': stroke ? width : undefined, 'fill-opacity': opacity })}/>`
    );
  }

  path(d, { color = COLORS.axis, width = 2, fill = 'none', dash, opacity } = {}) {
    return this.add(
      `<path ${attrs({ d, fill, stroke: color, 'stroke-width': width, 'stroke-dasharray': dash, 'fill-opacity': opacity, 'stroke-linejoin': 'round' })}/>`
    );
  }

  circle(cx, cy, r, { fill = COLORS.axis, stroke, width = 1.5 } = {}) {
    return this.add(
      `<circle ${attrs({ cx, cy, r, fill, stroke, 'stroke-width': stroke ? width : undefined })}/>`
    );
  }

  ellipse(cx, cy, rx, ry, { fill = 'none', stroke = COLORS.axis, width = 2 } = {}) {
    return this.add(`<ellipse ${attrs({ cx, cy, rx, ry, fill, stroke, 'stroke-width': width })}/>`);
  }

  rect(x, y, w, h, { fill = 'none', stroke, width = 1.5, rx } = {}) {
    return this.add(
      `<rect ${attrs({ x, y, width: w, height: h, rx, fill, stroke, 'stroke-width': stroke ? width : undefined })}/>`
    );
  }

  /**
   * Arrow from (x1, y1) to (x2, y2) with a filled triangular head.
   * `start: true` adds a head at the tail as well (dimension lines).
   */
  arrow(x1, y1, x2, y2, { color = COLORS.axis, width = 2, head, dash, start = false } = {}) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1e-6) return this;
    head = Math.min(head || 6 + width * 2.2, len * (start ? 0.45 : 0.6));
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const half = head * 0.4;
    const headAt = (tx, ty, dx, dy) => {
      const bx = tx - dx * head;
      const by = ty - dy * head;
      return `<polygon points="${fmt(tx)},${fmt(ty)} ${fmt(bx - dy * half)},${fmt(by + dx * half)} ${fmt(bx + dy * half)},${fmt(by - dx * half)}" fill="${color}"/>`;
    };
    const sx = start ? x1 + ux * (head - 1) : x1;
    const sy = start ? y1 + uy * (head - 1) : y1;
    this.line(sx, sy, x2 - ux * (head - 1), y2 - uy * (head - 1), { color, width, dash });
    this.add(headAt(x2, y2, ux, uy));
    if (start) this.add(headAt(x1, y1, -ux, -uy));
    return this;
  }

  /**
   * Text label. `math: true` (default) uses the serif font with italic
   * variables; `math: false` gives a plain sans-serif annotation.
   */
  text(
    x,
    y,
    markup,
    {
      size = 16,
      anchor = 'middle',
      color = COLORS.text,
      math = true,
      weight,
      rotate,
      baseline = 'middle',
      italic,
      halo = true,
    } = {}
  ) {
    const font = math ? FONT_MATH : FONT_SANS;
    const body = renderLabel(String(markup), size, { italic: italic ?? math });
    // dominant-baseline is unevenly supported in <img> renderers, so shift by
    // hand: "middle" centers the x-height on y.
    const dy = baseline === 'middle' ? size * 0.35 : baseline === 'hanging' ? size * 0.8 : 0;
    const transform = rotate ? `rotate(${rotate} ${fmt(x)} ${fmt(y)})` : undefined;
    // A white halo keeps labels legible where they cross lines.
    const outline = halo
      ? {
          stroke: '#ffffff',
          'stroke-width': 4,
          'stroke-linejoin': 'round',
          'paint-order': 'stroke',
        }
      : {};
    return this.add(
      `<text ${attrs({ x, y: y + dy, 'font-family': font, 'font-size': size, 'font-weight': weight, fill: color, 'text-anchor': anchor, transform, ...outline })} xml:space="preserve">${body}</text>`
    );
  }

  /** Several lines of text, `gap` pixels apart, starting at y. */
  lines(x, y, list, opts = {}) {
    const gap = opts.gap || (opts.size || 16) * 1.3;
    list.forEach((s, k) => this.text(x, y + k * gap, s, opts));
    return this;
  }

  /**
   * Circular arc centered at (cx, cy) from angle a1 to a2, measured in degrees
   * counterclockwise from +x with y up (the usual math convention).
   */
  arc(cx, cy, r, a1, a2, { color = COLORS.axis, width = 1.5, dash, fill = 'none' } = {}) {
    const p1 = [cx + r * Math.cos(rad(a1)), cy - r * Math.sin(rad(a1))];
    const p2 = [cx + r * Math.cos(rad(a2)), cy - r * Math.sin(rad(a2))];
    let sweep = (a2 - a1) % 360;
    if (sweep < 0) sweep += 360;
    const large = sweep > 180 ? 1 : 0;
    const wedge = fill !== 'none' ? `M ${fmt(cx)} ${fmt(cy)} L ` : 'M ';
    const close = fill !== 'none' ? ' Z' : '';
    return this.path(
      `${wedge}${fmt(p1[0])} ${fmt(p1[1])} A ${fmt(r)} ${fmt(r)} 0 ${large} 0 ${fmt(p2[0])} ${fmt(p2[1])}${close}`,
      { color, width, dash, fill }
    );
  }

  /** Curved leader line (OpenStax-style callout) from a label to a target. */
  leader(x1, y1, x2, y2, { color = COLORS.axis, bend = 0.35, width = 1.2, arrow = true } = {}) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const nx = -(y2 - y1) * bend;
    const ny = (x2 - x1) * bend;
    const cx = mx + nx;
    const cy = my + ny;
    // Stop the curve short of the target so the arrowhead stays sharp.
    const len = Math.hypot(x2 - cx, y2 - cy);
    const ux = (x2 - cx) / len;
    const uy = (y2 - cy) / len;
    const ex = arrow ? x2 - ux * 7 : x2;
    const ey = arrow ? y2 - uy * 7 : y2;
    this.path(`M ${fmt(x1)} ${fmt(y1)} Q ${fmt(cx)} ${fmt(cy)} ${fmt(ex)} ${fmt(ey)}`, {
      color,
      width,
    });
    if (arrow) this.arrow(ex - ux * 2, ey - uy * 2, x2, y2, { color, width, head: 8 });
    return this;
  }

  /**
   * Wavy callout line (the OpenStax "squiggle") from a label at (x1, y1) to a
   * target at (x2, y2): a sine wave along the first 80% that ends in an arrow.
   */
  squiggle(x1, y1, x2, y2, { waves = 1.5, amp = 7, color = COLORS.black } = {}) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const [ux, uy] = [(x2 - x1) / len, (y2 - y1) / len];
    const pts = [];
    for (let k = 0; k <= 40; k += 1) {
      const s = (0.8 * k) / 40;
      const w = amp * Math.sin((2 * Math.PI * waves * s) / 0.8);
      pts.push([x1 + ux * len * s - uy * w, y1 + uy * len * s + ux * w]);
    }
    this.polyline(pts, { color, width: 1.4 });
    return this.arrow(...pts.at(-1), x2, y2, { color, width: 1.4, head: 10 });
  }

  /**
   * Coil spring seen side-on, from x1 to x2 about height y, with n turns of
   * radius r. It starts and ends on the center line, so leads can attach there.
   */
  spring(x1, x2, y, { n = 9, r = 18, color = '#333333', width = 2.2 } = {}) {
    const pitch = (x2 - x1) / n;
    const pts = [];
    for (let k = 0; k <= n * 24; k += 1) {
      const t = (2 * Math.PI * k) / 24;
      pts.push([x1 + 6 * (1 - Math.cos(t)) + (pitch * t) / (2 * Math.PI), y - r * Math.sin(t)]);
    }
    return this.polyline(pts, { color, width });
  }

  /** Vertical dimension line from y1 to y2 at x, with end ticks and a centered label. */
  vdimension(x, y1, y2, label, { size = 22, tick = 22, color = COLORS.black } = {}) {
    this.line(x - tick / 2, y1, x + tick / 2, y1, { color, width: 1.5 });
    this.line(x - tick / 2, y2, x + tick / 2, y2, { color, width: 1.5 });
    this.arrow(x, y1 + 1, x, y2 - 1, { color, width: 1.5, head: 12, start: true });
    if (label) this.text(x, (y1 + y2) / 2, label, { size });
    return this;
  }

  /** Horizontal curly brace from x1 to x2 at height y; `up` opens downward. */
  brace(x1, x2, y, { up = true, depth = 10, color = COLORS.axis, width = 1.5 } = {}) {
    const s = up ? -1 : 1;
    const m = (x1 + x2) / 2;
    const q = depth / 2;
    const d = [
      `M ${fmt(x1)} ${fmt(y)}`,
      `Q ${fmt(x1)} ${fmt(y + s * q)} ${fmt(x1 + q * 2)} ${fmt(y + s * q)}`,
      `L ${fmt(m - q * 2)} ${fmt(y + s * q)}`,
      `Q ${fmt(m)} ${fmt(y + s * q)} ${fmt(m)} ${fmt(y + s * depth)}`,
      `Q ${fmt(m)} ${fmt(y + s * q)} ${fmt(m + q * 2)} ${fmt(y + s * q)}`,
      `L ${fmt(x2 - q * 2)} ${fmt(y + s * q)}`,
      `Q ${fmt(x2)} ${fmt(y + s * q)} ${fmt(x2)} ${fmt(y)}`,
    ].join(' ');
    return this.path(d, { color, width });
  }

  /** Point marker: 'circle' | 'diamond' | 'square' | 'triangle' | 'x'. */
  marker(x, y, shape = 'circle', { color = COLORS.axis, size = 5 } = {}) {
    const s = size;
    switch (shape) {
      case 'diamond':
        return this.polygon(
          [
            [x, y - s],
            [x + s, y],
            [x, y + s],
            [x - s, y],
          ],
          { fill: color }
        );
      case 'square':
        return this.rect(x - s * 0.85, y - s * 0.85, s * 1.7, s * 1.7, { fill: color });
      case 'triangle':
        return this.polygon(
          [
            [x, y - s],
            [x + s, y + s * 0.8],
            [x - s, y + s * 0.8],
          ],
          { fill: color }
        );
      case 'x':
        this.line(x - s * 0.8, y - s * 0.8, x + s * 0.8, y + s * 0.8, { color, width: 1.5 });
        return this.line(x - s * 0.8, y + s * 0.8, x + s * 0.8, y - s * 0.8, {
          color,
          width: 1.5,
        });
      default:
        return this.circle(x, y, s, { fill: color });
    }
  }

  /** Compass rose (N/E/S/W) centered at (x, y). */
  compass(x, y, { r = 28, size = 15 } = {}) {
    this.line(x - r, y, x + r, y, { color: COLORS.axis, width: 1.3 });
    this.arrow(x, y + r, x, y - r, { color: COLORS.axis, width: 1.3, head: 9 });
    this.text(x, y - r - 11, 'N', { size, math: false });
    this.text(x, y + r + 11, 'S', { size, math: false });
    this.text(x + r + 6, y, 'E', { size, math: false, anchor: 'start' });
    this.text(x - r - 6, y, 'W', { size, math: false, anchor: 'end' });
    return this;
  }

  /** Small x–y axes indicator (an "L" of two arrows) with its corner at (x, y). */
  xyIndicator(x, y, { len = 55, size = 17 } = {}) {
    this.arrow(x, y, x + len, y, { color: COLORS.axis, width: 1.5, head: 9 });
    this.arrow(x, y, x, y - len, { color: COLORS.axis, width: 1.5, head: 9 });
    this.text(x + len + 10, y, 'x', { size });
    this.text(x, y - len - 12, 'y', { size });
    return this;
  }

  render() {
    const { width, height } = this;
    // The still is the file with this overlay hidden. Animation is opt-in for
    // readers who have not requested reduced motion, and it is dropped in
    // print so a PDF keeps the figure the text describes.
    const style = this.motion
      ? `<style>
.motion{opacity:0}
@media (prefers-reduced-motion:no-preference){.motion{opacity:1}}
@media (prefers-reduced-motion:reduce), print{.motion{display:none !important}}
</style>`
      : '';
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(width)}" height="${fmt(height)}" viewBox="0 0 ${fmt(width)} ${fmt(height)}" role="img" aria-labelledby="title desc">`,
      `<title id="title">${escapeXml(this.title)}</title>`,
      `<desc id="desc">${escapeXml(this.desc || this.title)}</desc>`,
      style,
      `<rect width="${fmt(width)}" height="${fmt(height)}" fill="#ffffff"/>`,
      ...this.items,
      '</svg>',
      '',
    ].join('\n');
  }
}

/**
 * Catmull-Rom spline through the points, returned as an SVG path string of
 * cubic Bézier segments. `horizontalTangents` lists point indices where both
 * handles must be horizontal, preserving the zero slopes used in exercises.
 */
export function smoothPath(points, tension = 0.5, { horizontalTangents = [] } = {}) {
  if (points.length < 3) {
    return points.map(([x, y], k) => `${k ? 'L' : 'M'} ${fmt(x)} ${fmt(y)}`).join(' ');
  }
  let d = `M ${fmt(points[0][0])} ${fmt(points[0][1])}`;
  for (const [, c1, c2, p2] of splineSegments(points, tension, { horizontalTangents })) {
    d += ` C ${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return d;
}

/**
 * The cubic Bézier segments [p1, c1, c2, p2] that `smoothPath` draws. The
 * construction is affine-invariant, so it can be run on data coordinates to
 * differentiate a graph exactly as it is drawn.
 */
export function splineSegments(points, tension = 0.5, { horizontalTangents = [] } = {}) {
  const t = tension / 3;
  const segments = [];
  for (let k = 0; k < points.length - 1; k += 1) {
    const p0 = points[k - 1] || points[k];
    const p1 = points[k];
    const p2 = points[k + 1];
    const p3 = points[k + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
    if (horizontalTangents.includes(k)) c1[1] = p1[1];
    if (horizontalTangents.includes(k + 1)) c2[1] = p2[1];
    segments.push([p1, c1, c2, p2]);
  }
  return segments;
}

/**
 * Slope dy/dx along a `smoothPath` curve, sampled `n` times per segment.
 * Returns [x, slope] pairs; the first sample of segment k is the data point k.
 */
export function splineSlope(points, tension = 0.5, { horizontalTangents = [], n = 24 } = {}) {
  const out = [];
  const segments = splineSegments(points, tension, { horizontalTangents });
  segments.forEach(([p1, c1, c2, p2], k) => {
    const last = k === segments.length - 1;
    for (let j = 0; j <= (last ? n : n - 1); j += 1) {
      const s = j / n;
      const u = 1 - s;
      const at = i =>
        u * u * u * p1[i] + 3 * u * u * s * c1[i] + 3 * u * s * s * c2[i] + s * s * s * p2[i];
      const d = i =>
        3 * u * u * (c1[i] - p1[i]) + 6 * u * s * (c2[i] - c1[i]) + 3 * s * s * (p2[i] - c2[i]);
      out.push([at(0), d(1) / d(0)]);
    }
  });
  return out;
}

/**
 * Maps math coordinates (y up) to SVG pixels: px = ox + x*scale, py = oy - y*scale.
 * Used for vector and geometry diagrams.
 */
export class Frame {
  constructor(svg, { ox, oy, scale = 1 }) {
    Object.assign(this, { svg, ox, oy, scale });
  }

  p(x, y) {
    return [this.ox + x * this.scale, this.oy - y * this.scale];
  }

  /** Point at distance r along angle (deg) from (x0, y0), in math units. */
  static polar(r, angle, x0 = 0, y0 = 0) {
    return [x0 + r * Math.cos(rad(angle)), y0 + r * Math.sin(rad(angle))];
  }

  /** Vector arrow between two math points; returns the tip. */
  vec(from, to, opts = {}) {
    const [x1, y1] = this.p(...from);
    const [x2, y2] = this.p(...to);
    this.svg.arrow(x1, y1, x2, y2, { width: 3, ...opts });
    return to;
  }

  /** Vector arrow of length r at angle a (deg) starting at `from`; returns the tip. */
  pvec(from, r, a, opts = {}) {
    return this.vec(from, Frame.polar(r, a, ...from), opts);
  }

  line(from, to, opts = {}) {
    const [x1, y1] = this.p(...from);
    const [x2, y2] = this.p(...to);
    this.svg.line(x1, y1, x2, y2, opts);
  }

  /** Text at a math point, offset by (dx, dy) pixels. */
  text(at, markup, { dx = 0, dy = 0, ...opts } = {}) {
    const [x, y] = this.p(...at);
    this.svg.text(x + dx, y + dy, markup, opts);
  }

  /** Label placed beside the midpoint of a segment, `off` px to its left (+) or right (−). */
  labelSeg(from, to, markup, { off = 16, along = 0.5, ...opts } = {}) {
    const [x1, y1] = this.p(...from);
    const [x2, y2] = this.p(...to);
    const len = Math.hypot(x2 - x1, y2 - y1);
    // Normal pointing to the left of the direction of travel (in screen space).
    const nx = (y2 - y1) / len;
    const ny = -(x2 - x1) / len;
    const mx = x1 + (x2 - x1) * along;
    const my = y1 + (y2 - y1) * along;
    this.svg.text(mx + nx * off, my + ny * off, markup, opts);
  }

  /** Angle arc (math degrees) at a math point, radius in pixels, optional label. */
  angle(at, a1, a2, r, label, { labelR, size = 15, color = COLORS.axis, dx = 0, dy = 0 } = {}) {
    const [cx, cy] = this.p(...at);
    this.svg.arc(cx, cy, r, a1, a2, { color });
    if (label) {
      let sweep = (a2 - a1) % 360;
      if (sweep < 0) sweep += 360;
      const mid = rad(a1 + sweep / 2);
      const lr = labelR || r + 14;
      this.svg.text(cx + lr * Math.cos(mid) + dx, cy - lr * Math.sin(mid) + dy, label, { size });
    }
  }

  /** Right-angle mark at corner `at`, with legs along angles a1 and a2 (deg). */
  rightAngle(at, a1, a2, size = 12, { color = COLORS.axis } = {}) {
    const [cx, cy] = this.p(...at);
    const u = [Math.cos(rad(a1)), -Math.sin(rad(a1))];
    const v = [Math.cos(rad(a2)), -Math.sin(rad(a2))];
    this.svg.polyline(
      [
        [cx + u[0] * size, cy + u[1] * size],
        [cx + (u[0] + v[0]) * size, cy + (u[1] + v[1]) * size],
        [cx + v[0] * size, cy + v[1] * size],
      ],
      { color, width: 1.2 }
    );
  }

  /** Coordinate axes through the math origin with arrowheads and x / y labels. */
  axes({ xMin, xMax, yMin, yMax, xLabel = 'x', yLabel = 'y', size = 18, color = COLORS.axis }) {
    const [x0, y0] = this.p(xMin, 0);
    const [x1] = this.p(xMax, 0);
    const [, ya] = this.p(0, yMin);
    const [xo, yb] = this.p(0, yMax);
    this.svg.arrow(x0, y0, x1, y0, { color, width: 1.5, head: 10 });
    this.svg.arrow(xo, ya, xo, yb, { color, width: 1.5, head: 10 });
    if (xLabel) this.svg.text(x1 + 4, y0 + 16, xLabel, { size, anchor: 'start' });
    if (yLabel) this.svg.text(xo - 14, yb + 6, yLabel, { size, anchor: 'end' });
  }
}

/**
 * A data graph. Data coordinates are mapped into the box (x, y, w, h).
 *   const g = new Plot(svg, { x: 70, y: 40, w: 400, h: 250,
 *                             xRange: [0, 30], yRange: [0, 3000],
 *                             xTicks: [0, 10, 20, 30], yTicks: [...] });
 *   g.axes({ xTitle: 'Time, t (s)', yTitle: 'Position, x (m)' });
 *   g.series([[0, 200], ...], { color, marker: 'diamond', smooth: true });
 */
export class Plot {
  constructor(
    svg,
    { x, y, w, h, xRange, yRange, xTicks = [], yTicks = [], xFormat = String, yFormat = String }
  ) {
    Object.assign(this, { svg, x, y, w, h, xRange, yRange, xTicks, yTicks, xFormat, yFormat });
  }

  X(v) {
    const [a, b] = this.xRange;
    return this.x + ((v - a) / (b - a)) * this.w;
  }

  Y(v) {
    const [a, b] = this.yRange;
    return this.y + this.h - ((v - a) / (b - a)) * this.h;
  }

  P(px, py) {
    return [this.X(px), this.Y(py)];
  }

  /**
   * Draw the axes. The x axis sits at y = 0 when 0 is in range (otherwise at the
   * bottom); tick labels go below the bottom edge unless `xLabelsAtAxis`.
   * `arrows` adds arrowheads (for sketch graphs); `box` draws a full frame.
   */
  axes({
    xTitle,
    yTitle,
    title,
    size = 14,
    titleSize = 15,
    arrows = false,
    box = false,
    grid = false,
    xLabelsAtAxis = false,
    yTitleOffset = 48,
    xTitleOffset = 38,
    tickLen = 5,
    xAxisAt,
  } = {}) {
    const { svg } = this;
    const [ya, yb] = this.yRange;
    const axisY = this.Y(xAxisAt ?? (ya <= 0 && yb >= 0 ? 0 : ya));
    const left = this.x;
    const right = this.x + this.w;
    const top = this.y;
    const bottom = this.y + this.h;
    const col = COLORS.axis;

    if (grid) {
      for (const t of this.yTicks) {
        svg.line(left, this.Y(t), right, this.Y(t), { color: COLORS.grid, width: 1 });
      }
    }
    if (box) svg.rect(left, top, this.w, this.h, { stroke: col, width: 1.2 });

    if (arrows) {
      svg.arrow(left, axisY, right + 14, axisY, { color: col, width: 1.5, head: 10 });
      svg.arrow(left, bottom, left, top - 14, { color: col, width: 1.5, head: 10 });
    } else {
      svg.line(left, axisY, right, axisY, { color: col, width: 1.3 });
      svg.line(left, bottom, left, top, { color: col, width: 1.3 });
    }

    // Typographic minus sign for negative tick values.
    const minus = s => String(s).replace(/^-/, '−');
    const xLabelY = xLabelsAtAxis ? axisY + tickLen + 12 : bottom + tickLen + 12;
    for (const t of this.xTicks) {
      const px = this.X(t);
      svg.line(px, axisY, px, axisY + tickLen, { color: col, width: 1.2 });
      // On an axis drawn through the plot, "0" would sit on the vertical axis.
      if (xLabelsAtAxis && px === left) continue;
      svg.text(px, xLabelY, minus(this.xFormat(t)), { size, math: false });
    }
    for (const t of this.yTicks) {
      const py = this.Y(t);
      svg.line(left - tickLen, py, left, py, { color: col, width: 1.2 });
      svg.text(left - tickLen - 4, py, minus(this.yFormat(t)), {
        size,
        math: false,
        anchor: 'end',
      });
    }
    if (xTitle) {
      svg.text((left + right) / 2, bottom + xTitleOffset, xTitle, {
        size: titleSize,
        math: false,
        weight: 'bold',
      });
    }
    if (yTitle) {
      const cx = left - yTitleOffset;
      const cy = (top + bottom) / 2;
      svg.text(cx, cy, yTitle, { size: titleSize, math: false, weight: 'bold', rotate: -90 });
    }
    if (title) {
      svg.text((left + right) / 2, top - 18, title, {
        size: titleSize + 1,
        math: false,
        weight: 'bold',
      });
    }
  }

  /** Data series: straight segments, or a smooth curve with `smooth: true`. */
  series(
    points,
    {
      color = COLORS.position,
      width = 3,
      marker,
      markerSize = 5,
      smooth = false,
      tension = 0.5,
      horizontalTangents = [],
      dash,
    } = {}
  ) {
    const px = points.map(([a, b]) => this.P(a, b));
    if (smooth)
      this.svg.path(smoothPath(px, tension, { horizontalTangents }), { color, width, dash });
    else this.svg.polyline(px, { color, width, dash });
    if (marker) for (const [a, b] of px) this.svg.marker(a, b, marker, { color, size: markerSize });
  }

  /** Smooth curve of a function sampled over [x0, x1]. */
  fn(f, x0, x1, { n = 120, color = COLORS.position, width = 3, dash } = {}) {
    const pts = [];
    for (let k = 0; k <= n; k += 1) {
      const t = x0 + ((x1 - x0) * k) / n;
      pts.push(this.P(t, f(t)));
    }
    this.svg.polyline(pts, { color, width, dash });
  }

  line(x1, y1, x2, y2, opts = {}) {
    this.svg.line(this.X(x1), this.Y(y1), this.X(x2), this.Y(y2), opts);
  }

  text(x, y, markup, opts = {}) {
    this.svg.text(this.X(x), this.Y(y), markup, opts);
  }
}
