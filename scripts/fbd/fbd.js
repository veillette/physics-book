/**
 * fbd.js — a tiny SVG builder for free-body diagrams.
 *
 * Every diagram uses the same visual language so students learn to read it once:
 *   - the object is a dot (particle model) with its name beside it;
 *   - forces are solid red arrows drawn from the dot, labeled with the same
 *     symbols the worked solution uses;
 *   - force components are dashed red arrows;
 *   - the coordinate axes are thin gray arrows through the dot, labeled +x and +y;
 *   - the acceleration is a green arrow drawn beside the diagram (or "a = 0").
 *
 * Coordinates passed to the builder are "math" coordinates in pixels: the origin
 * is the dot, +x to the right, +y up. Angles are in degrees, counterclockwise from
 * the +x direction of the page.
 *
 * Label markup (see `renderLabel`):
 *   F_{app}  → italic F with upright subscript "app"
 *   T_1      → italic T with subscript 1
 *   mg sin θ → italic m g, upright "sin", italic θ
 */

const COLORS = {
  force: '#b03a2e',
  component: '#c0675e',
  accel: '#1e8449',
  axis: '#555555',
  text: '#222222',
  note: '#444444',
  object: '#1f3a5f',
};

const FONT_MATH = "'Times New Roman', Times, serif";
const FONT_SANS = 'Helvetica, Arial, sans-serif';
const FUNCTION_WORDS = ['sin', 'cos', 'tan'];
const SIZE = 20;
const CAPTION_STRIP = 22;

const rad = deg => (deg * Math.PI) / 180;
const fmt = n => Number(n.toFixed(2)).toString();
const escapeXml = s =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Turn label markup into a sequence of <tspan> elements.
 * Letters are italic (math variables) except function names; digits, spaces and
 * punctuation are upright; subscripts are upright and smaller.
 */
function renderLabel(markup, size) {
  const parts = [];
  const subSize = size * 0.7;
  const shift = size * 0.3;
  let i = 0;
  let buffer = '';

  const flush = () => {
    if (!buffer) return;
    const tokens = buffer.match(/[A-Za-zͰ-Ͽ]+|[^A-Za-zͰ-Ͽ]+/g) || [];
    for (const token of tokens) {
      if (/^[A-Za-zͰ-Ͽ]+$/.test(token)) {
        if (FUNCTION_WORDS.includes(token)) {
          parts.push(`<tspan font-style="normal">${escapeXml(token)}</tspan>`);
        } else {
          parts.push(`<tspan font-style="italic">${escapeXml(token)}</tspan>`);
        }
      } else {
        parts.push(`<tspan font-style="normal">${escapeXml(token)}</tspan>`);
      }
    }
    buffer = '';
  };

  while (i < markup.length) {
    const ch = markup[i];
    if (ch === '_') {
      flush();
      let sub;
      if (markup[i + 1] === '{') {
        const end = markup.indexOf('}', i + 2);
        sub = markup.slice(i + 2, end);
        i = end + 1;
      } else {
        sub = markup[i + 1];
        i += 2;
      }
      parts.push(
        `<tspan font-style="normal" font-size="${fmt(subSize)}" dy="${fmt(shift)}">${escapeXml(sub)}</tspan>` +
          `<tspan dy="${fmt(-shift)}"></tspan>`
      );
    } else {
      buffer += ch;
      i += 1;
    }
  }
  flush();
  return parts.join('');
}

export class FBD {
  /**
   * @param {object} opts
   * @param {number} opts.width   - SVG width in px
   * @param {number} opts.height  - SVG height in px
   * @param {number} opts.cx      - x of the dot in SVG px
   * @param {number} opts.cy      - y of the dot in SVG px
   * @param {string} opts.title   - accessible title
   * @param {string} opts.desc    - accessible long description
   */
  constructor({
    width = 400,
    height = 320,
    cx = 200,
    cy = 160,
    title = '',
    desc = '',
    caption = '',
  }) {
    Object.assign(this, { width, height, cx, cy, title, desc, caption });
    this.layers = { axes: [], components: [], forces: [], labels: [], extra: [] };
    this.markerIds = new Set();
  }

  /** Math coordinates (y up, origin at dot) → SVG coordinates. */
  toSvg(x, y) {
    return [this.cx + x, this.cy - y];
  }

  /** Point at distance r along angle (degrees) from (ox, oy) in math coordinates. */
  static polar(r, angle, ox = 0, oy = 0) {
    return [ox + r * Math.cos(rad(angle)), oy + r * Math.sin(rad(angle))];
  }

  arrowPath(x1, y1, x2, y2, { color, width = 3, dashed = false, head = 12 }) {
    const [sx1, sy1] = this.toSvg(x1, y1);
    const [sx2, sy2] = this.toSvg(x2, y2);
    const len = Math.hypot(sx2 - sx1, sy2 - sy1);
    // Short vectors get a proportionally smaller head so their shaft stays visible.
    head = Math.min(head, len * 0.45);
    const ux = (sx2 - sx1) / len;
    const uy = (sy2 - sy1) / len;
    const halfWidth = head * 0.42;
    // Stop the shaft at the base of the head so the tip stays sharp.
    const bx = sx2 - ux * head;
    const by = sy2 - uy * head;
    const dash = dashed ? ' stroke-dasharray="7 5"' : '';
    const shaft = `<line x1="${fmt(sx1)}" y1="${fmt(sy1)}" x2="${fmt(bx + ux)}" y2="${fmt(by + uy)}" stroke="${color}" stroke-width="${width}"${dash}/>`;
    const p1 = [bx - uy * halfWidth, by + ux * halfWidth];
    const p2 = [bx + uy * halfWidth, by - ux * halfWidth];
    const tip = `<polygon points="${fmt(sx2)},${fmt(sy2)} ${fmt(p1[0])},${fmt(p1[1])} ${fmt(p2[0])},${fmt(p2[1])}" fill="${color}"/>`;
    return shaft + tip;
  }

  /**
   * Place a label near (x, y) in math coordinates.
   * anchor: 'start' | 'middle' | 'end'; vshift: extra SVG-y offset in px.
   */
  text(
    x,
    y,
    markup,
    {
      size = SIZE,
      color = COLORS.text,
      anchor = 'middle',
      font = FONT_MATH,
      vshift = 0,
      raw = false,
    } = {}
  ) {
    const [sx, sy] = this.toSvg(x, y);
    const body = raw ? escapeXml(markup) : renderLabel(markup, size);
    this.layers.labels.push(
      `<text x="${fmt(sx)}" y="${fmt(sy + vshift)}" font-family="${font}" font-size="${size}" fill="${color}" text-anchor="${anchor}" xml:space="preserve">${body}</text>`
    );
  }

  /** Plain sans-serif annotation (not math). */
  note(x, y, str, { size = 14, anchor = 'middle', color = COLORS.note, italic = false } = {}) {
    const [sx, sy] = this.toSvg(x, y);
    const style = italic ? ' font-style="italic"' : '';
    this.layers.labels.push(
      `<text x="${fmt(sx)}" y="${fmt(sy)}" font-family="${FONT_SANS}" font-size="${size}" fill="${color}" text-anchor="${anchor}"${style}>${escapeXml(str)}</text>`
    );
  }

  /** Automatic label position just beyond the tip of a vector. */
  labelAtTip(
    x,
    y,
    angle,
    markup,
    { offset = 14, size = SIZE, color = COLORS.text, dx = 0, dy = 0 } = {}
  ) {
    const ux = Math.cos(rad(angle));
    const uy = Math.sin(rad(angle));
    // Vectors lying along an axis get their label beside the arrowhead, so the
    // label never sits on top of the axis line or its +x / +y label.
    if (Math.abs(uy) > 0.97) {
      this.text(x + 12 + dx, y - uy * 12 + dy, markup, {
        size,
        color,
        anchor: 'start',
        vshift: size * 0.35,
      });
      return;
    }
    if (Math.abs(ux) > 0.97) {
      this.text(x - ux * 14 + dx, y + 12 + dy, markup, {
        size,
        color,
        anchor: 'middle',
        vshift: 0,
      });
      return;
    }
    const lx = x + ux * offset + dx;
    const ly = y + uy * offset + dy;
    let anchor = 'middle';
    if (ux > 0.35) anchor = 'start';
    else if (ux < -0.35) anchor = 'end';
    let vshift = size * 0.35;
    if (uy < -0.35) vshift = size * 0.8;
    else if (uy > 0.35) vshift = 0;
    this.text(lx, ly, markup, { size, color, anchor, vshift });
  }

  /**
   * A force vector from (ox, oy) (default: the dot) with the given length and angle.
   * label: markup string; labelOpts: { offset, dx, dy, at: [x, y] } to override placement.
   */
  force(angle, length, label, { from = [0, 0], dashed = false, color, labelOpts = {} } = {}) {
    const [ox, oy] = from;
    const [ex, ey] = FBD.polar(length, angle, ox, oy);
    const col = color || (dashed ? COLORS.component : COLORS.force);
    const layer = dashed ? this.layers.components : this.layers.forces;
    layer.push(this.arrowPath(ox, oy, ex, ey, { color: col, dashed, width: dashed ? 2.5 : 3.5 }));
    if (label) {
      if (labelOpts.at) {
        this.text(labelOpts.at[0], labelOpts.at[1], label, {
          anchor: labelOpts.anchor || 'middle',
          vshift: SIZE * 0.35,
          color: dashed ? COLORS.component : COLORS.text,
          size: labelOpts.size || SIZE,
        });
      } else {
        this.labelAtTip(ex, ey, angle, label, {
          ...labelOpts,
          color: dashed ? COLORS.component : COLORS.text,
        });
      }
    }
    return [ex, ey];
  }

  /** A dashed component arrow (shorthand). */
  component(angle, length, label, opts = {}) {
    return this.force(angle, length, label, { ...opts, dashed: true });
  }

  /**
   * Coordinate axes through `origin` (default: the dot), rotated by `angle`.
   * xLen/yLen are the positive half-lengths; neg is the length drawn on the
   * negative side. Labels default to +x / +y.
   */
  axes({
    angle = 0,
    xLen = 150,
    yLen = 130,
    xNeg = 90,
    yNeg = 90,
    origin = [0, 0],
    xLabel = '+x',
    yLabel = '+y',
    labelOffset = 16,
  } = {}) {
    const [ox, oy] = origin;
    const axis = (a, pos, neg, label) => {
      const [x1, y1] = FBD.polar(neg, a + 180, ox, oy);
      const [x2, y2] = FBD.polar(pos, a, ox, oy);
      this.layers.axes.push(
        this.arrowPath(x1, y1, x2, y2, { color: COLORS.axis, width: 1.5, head: 10 })
      );
      // Long labels such as "+x (east)" start just past the arrowhead instead of
      // being centered on it.
      const long = label.length > 3 && Math.abs(Math.cos(rad(a))) > 0.7;
      const [lx, ly] = FBD.polar(pos + (long ? 6 : labelOffset), a, ox, oy);
      const anchor = long ? (Math.cos(rad(a)) > 0 ? 'start' : 'end') : 'middle';
      this.text(lx, ly, label, { size: 18, color: COLORS.axis, anchor, vshift: 6 });
    };
    axis(angle, xLen, xNeg, xLabel);
    axis(angle + 90, yLen, yNeg, yLabel);
  }

  /** Angle arc of radius r centered at `center`, from angle a1 to a2 (degrees, CCW). */
  arc(
    a1,
    a2,
    r,
    label,
    { center = [0, 0], labelR, color = COLORS.text, size = 18, dx = 0, dy = 0 } = {}
  ) {
    const [cx, cy] = center;
    const [x1, y1] = this.toSvg(...FBD.polar(r, a1, cx, cy));
    const [x2, y2] = this.toSvg(...FBD.polar(r, a2, cx, cy));
    let sweep = a2 - a1;
    while (sweep < 0) sweep += 360;
    const large = sweep > 180 ? 1 : 0;
    // SVG y is flipped, so a CCW sweep in math coordinates is sweep-flag 0.
    this.layers.extra.push(
      `<path d="M ${fmt(x1)} ${fmt(y1)} A ${r} ${r} 0 ${large} 0 ${fmt(x2)} ${fmt(y2)}" fill="none" stroke="${color}" stroke-width="1.5"/>`
    );
    if (label) {
      const mid = a1 + sweep / 2;
      const [lx, ly] = FBD.polar(labelR || r + 14, mid, cx, cy);
      this.text(lx + dx, ly + dy, label, { size, anchor: 'middle', vshift: size * 0.35 });
    }
  }

  /** Thin dashed guide line (e.g. a reference horizontal or the incline direction). */
  guide(x1, y1, x2, y2, { color = '#999999' } = {}) {
    const [a, b] = this.toSvg(x1, y1);
    const [c, d] = this.toSvg(x2, y2);
    this.layers.extra.push(
      `<line x1="${fmt(a)}" y1="${fmt(b)}" x2="${fmt(c)}" y2="${fmt(d)}" stroke="${color}" stroke-width="1.2" stroke-dasharray="4 4"/>`
    );
  }

  /** Acceleration arrow placed at `at` (math coordinates), or "a = 0" if length is 0. */
  accel(angle, length, { at = [0, 0], label = 'a', labelOpts = {} } = {}) {
    if (!length) {
      this.text(at[0], at[1], 'a = 0', { color: COLORS.accel, anchor: 'middle', vshift: 6 });
      return;
    }
    const [ex, ey] = FBD.polar(length, angle, at[0], at[1]);
    this.layers.forces.push(
      this.arrowPath(at[0], at[1], ex, ey, { color: COLORS.accel, width: 3 })
    );
    this.labelAtTip(ex, ey, angle, label, { ...labelOpts, color: COLORS.accel });
  }

  /** The object itself: a dot, with its name written next to it. */
  objectLabel(name, { dx = 10, dy = -22, anchor = 'start' } = {}) {
    this.objectName = { name, dx, dy, anchor };
  }

  /** Drawing elements without the <svg> wrapper (used for multi-panel figures). */
  renderInner() {
    const dot = `<circle cx="${fmt(this.cx)}" cy="${fmt(this.cy)}" r="6" fill="${COLORS.object}"/>`;
    let name = '';
    if (this.objectName) {
      const { name: n, dx, dy, anchor } = this.objectName;
      name = `<text x="${fmt(this.cx + dx)}" y="${fmt(this.cy - dy)}" font-family="${FONT_SANS}" font-size="14" fill="${COLORS.object}" text-anchor="${anchor}">${escapeXml(n)}</text>`;
    }
    const caption = this.caption
      ? `<text x="12" y="24" font-family="${FONT_SANS}" font-size="15" font-weight="bold" fill="${COLORS.text}">${escapeXml(this.caption)}</text>`
      : '';
    const drawing = [
      ...this.layers.axes,
      ...this.layers.extra,
      ...this.layers.components,
      ...this.layers.forces,
      dot,
      name,
      ...this.layers.labels,
    ].filter(Boolean);
    if (!caption) return drawing;
    // A caption gets its own strip above the drawing so it never overlaps the axes.
    return [caption, `<g transform="translate(0 ${CAPTION_STRIP})">`, ...drawing, '</g>'];
  }

  /** Full height, including the caption strip if there is one. */
  get totalHeight() {
    return this.height + (this.caption ? CAPTION_STRIP : 0);
  }

  render() {
    return svgDocument(this.width, this.totalHeight, this.title, this.desc, this.renderInner());
  }
}

function svgDocument(width, height, title, desc, body) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`,
    `<title id="title">${escapeXml(title)}</title>`,
    `<desc id="desc">${escapeXml(desc)}</desc>`,
    `<rect width="${width}" height="${height}" fill="#ffffff"/>`,
    ...body,
    '</svg>',
    '',
  ].join('\n');
}

/**
 * Place several FBD panels side by side in one SVG, separated by thin rules.
 * Each panel keeps its own caption (set `panel.caption`).
 */
export function panels(list, { title = '', desc = '' } = {}) {
  let x = 0;
  const body = [];
  const height = Math.max(...list.map(p => p.totalHeight));
  list.forEach((p, i) => {
    if (i > 0) {
      body.push(
        `<line x1="${x}" y1="10" x2="${x}" y2="${height - 10}" stroke="#cccccc" stroke-width="1"/>`
      );
    }
    body.push(`<g transform="translate(${x} 0)">`, ...p.renderInner(), '</g>');
    x += p.width;
  });
  return svgDocument(x, height, title, desc, body);
}

export { COLORS };
