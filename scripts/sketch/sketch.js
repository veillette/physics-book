/**
 * sketch.js — the "sketch and coordinate system" drawings that open the worked
 * solutions of the kinematics problems (chapters 2 and 3).
 *
 * Each sketch translates the word problem into a mathematical model before any
 * equation is written, using one visual language throughout:
 *   - the coordinate axis (or axes) is a thin gray arrow labeled +x or +y, with
 *     its origin marked "0"; the arrow points in the positive direction, and a
 *     note such as "(east)" or "(up)" ties it to the physical direction;
 *   - the object is a dark-blue dot (particle model) with its name beside it;
 *     earlier or later positions are open circles;
 *   - velocities are green arrows, accelerations purple, displacements red;
 *   - the knowns (and the unknowns, marked "?") are written beside each state,
 *     with the signs they take in this coordinate system.
 *
 * The drawing primitives come from ../figures/svg.js. Coordinates are SVG
 * pixels (y down) unless a helper says otherwise; label markup is the same
 * as in svg.js (v_0, \rm{m/s}^2, **A**, Δx).
 */

import { COLORS, Frame, rad, Svg } from '../figures/svg.js';

export const C = {
  axis: '#555555',
  body: '#1f3a5f',
  vel: '#3f8a1e',
  acc: '#6a3d9a',
  disp: '#c0392b',
  ground: '#8d6e63',
  path: '#7f8c8d',
  note: '#444444',
  text: COLORS.text,
  water: '#2e86c1',
  alt: '#d35400',
};

export class Sketch {
  constructor({ width, height, title, desc }) {
    this.svg = new Svg({ width, height, title, desc });
  }

  /** Math-style text (italic variables), centered on (x, y) by default. */
  label(x, y, markup, opts = {}) {
    this.svg.text(x, y, markup, { size: 16, ...opts });
    return this;
  }

  /** Plain sans-serif annotation. */
  note(x, y, str, opts = {}) {
    this.svg.text(x, y, str, { size: 13, math: false, color: C.note, ...opts });
    return this;
  }

  /** A column of math labels starting at (x, y). */
  lines(x, y, list, { gap = 21, ...opts } = {}) {
    list.forEach((s, k) => this.label(x, y + k * gap, s, opts));
    return this;
  }

  /**
   * A coordinate axis from (x1, y1) to (x2, y2): the arrowhead marks the
   * positive direction. `label` sits beyond the head, `note` (e.g. "(east)")
   * next to it, and `origin` [x, y] gets a tick labeled `originLabel`.
   */
  axis(x1, y1, x2, y2, { label = '+x', note, origin, originLabel = '0', ticks = [] } = {}) {
    const s = this.svg;
    s.arrow(x1, y1, x2, y2, { color: C.axis, width: 1.6, head: 11 });
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const horizontal = Math.abs(ux) > Math.abs(uy);
    // Label just past the arrowhead.
    const lx = x2 + ux * 16;
    const ly = y2 + uy * 16;
    if (horizontal) {
      s.text(lx, ly, label, { size: 17, anchor: ux > 0 ? 'start' : 'end', color: C.axis });
      // The note sits under the arrowhead, reading back along the axis.
      if (note) {
        s.text(x2, y2 + 20, note, {
          size: 12.5,
          math: false,
          color: C.note,
          anchor: ux > 0 ? 'end' : 'start',
        });
      }
    } else {
      // "+y" just beyond the arrowhead, its note on the same line to the right.
      const ty = ly + (uy > 0 ? 4 : -2);
      s.text(x2, ty, label, { size: 17, color: C.axis });
      if (note)
        s.text(x2 + 16, ty, note, { size: 12.5, math: false, color: C.note, anchor: 'start' });
    }
    const tick = (tx, ty, text, { side = 1 } = {}) => {
      // Perpendicular tick mark, text on the "below" (horizontal) or "left" (vertical) side.
      const nx = -uy;
      const ny = ux;
      s.line(tx - nx * 5, ty - ny * 5, tx + nx * 5, ty + ny * 5, { color: C.axis, width: 1.6 });
      if (text) {
        if (horizontal) {
          s.text(tx, ty + side * 17, text, { size: 14, color: C.axis });
        } else {
          s.text(tx - side * 10, ty, text, { size: 14, color: C.axis, anchor: 'end' });
        }
      }
    };
    if (origin) tick(origin[0], origin[1], originLabel);
    for (const t of ticks) tick(t[0], t[1], t[2], t[3] || {});
    return this;
  }

  /**
   * A pair of x–y axes through (ox, oy) with half-lengths. Positive x is to the
   * right and positive y is up unless `flipY` is set (positive y down).
   */
  axes2(
    ox,
    oy,
    {
      xNeg = 40,
      xPos = 200,
      yNeg = 40,
      yPos = 150,
      xLabel = '+x',
      yLabel = '+y',
      xNote,
      yNote,
      originLabel = '0',
      flipY = false,
    } = {}
  ) {
    const s = this.svg;
    s.line(ox - xNeg, oy, ox, oy, { color: C.axis, width: 1.6 });
    s.arrow(ox, oy, ox + xPos, oy, { color: C.axis, width: 1.6, head: 11 });
    const yTip = flipY ? oy + yPos : oy - yPos;
    const yTail = flipY ? oy - yNeg : oy + yNeg;
    s.line(ox, yTail, ox, oy, { color: C.axis, width: 1.6 });
    s.arrow(ox, oy, ox, yTip, { color: C.axis, width: 1.6, head: 11 });
    s.text(ox + xPos + 8, oy, xLabel, { size: 17, anchor: 'start', color: C.axis });
    if (xNote)
      s.text(ox + xPos + 8, oy + 18, xNote, {
        size: 12.5,
        math: false,
        color: C.note,
        anchor: 'start',
      });
    s.text(ox, flipY ? yTip + 18 : yTip - 12, yLabel, { size: 17, color: C.axis });
    if (yNote) {
      s.text(ox + 16, flipY ? yTip + 18 : yTip - 12, yNote, {
        size: 12.5,
        math: false,
        color: C.note,
        anchor: 'start',
      });
    }
    if (originLabel)
      s.text(ox - 8, oy + 14, originLabel, { size: 14, color: C.axis, anchor: 'end' });
    return this;
  }

  /** Compass (N/E/S/W) whose N and E arms are also labeled +y and +x. */
  compassAxes(x, y, { r = 34 } = {}) {
    const s = this.svg;
    s.line(x - r, y, x, y, { color: C.axis, width: 1.4 });
    s.line(x, y + r, x, y, { color: C.axis, width: 1.4 });
    s.arrow(x, y, x + r, y, { color: C.axis, width: 1.6, head: 9 });
    s.arrow(x, y, x, y - r, { color: C.axis, width: 1.6, head: 9 });
    s.text(x + r + 6, y, 'E', {
      size: 13,
      math: false,
      anchor: 'start',
      weight: 'bold',
      color: C.axis,
    });
    s.text(x + r + 6, y + 15, '(+x)', { size: 12.5, math: false, anchor: 'start', color: C.note });
    s.text(x, y - r - 22, '(+y)', { size: 12.5, math: false, color: C.note });
    s.text(x, y - r - 9, 'N', { size: 13, math: false, weight: 'bold', color: C.axis });
    s.text(x - r - 6, y, 'W', { size: 13, math: false, anchor: 'end', color: C.axis });
    s.text(x, y + r + 10, 'S', { size: 13, math: false, color: C.axis });
    return this;
  }

  /** The object (filled) or a ghost position of it (open). */
  dot(
    x,
    y,
    {
      open = false,
      r = 7,
      color = C.body,
      name,
      nameDx = 0,
      nameDy = -18,
      nameAnchor = 'middle',
    } = {}
  ) {
    if (open) this.svg.circle(x, y, r, { fill: '#ffffff', stroke: color, width: 2 });
    else this.svg.circle(x, y, r, { fill: color });
    if (name) {
      this.svg.text(x + nameDx, y + nameDy, name, {
        size: 13,
        math: false,
        color: C.body,
        anchor: nameAnchor,
      });
    }
    return this;
  }

  /** A small rectangle (car, train, sled), centered on (x, y). */
  block(x, y, { w = 44, h = 22, name, open = false, nameDy = -h / 2 - 11 } = {}) {
    this.svg.rect(x - w / 2, y - h / 2, w, h, {
      fill: open ? '#ffffff' : '#d6e4f0',
      stroke: C.body,
      width: 2,
      rx: 4,
    });
    if (name) this.svg.text(x, y + nameDy, name, { size: 13, math: false, color: C.body });
    return this;
  }

  /** Horizontal ground (or floor, deck) with hatching below it. */
  ground(x1, x2, y, { color = C.ground, hatch = true } = {}) {
    const s = this.svg;
    s.line(x1, y, x2, y, { color, width: 2.2 });
    if (hatch) {
      for (let x = x1 + 6; x < x2; x += 14) s.line(x, y, x - 8, y + 9, { color, width: 1.1 });
    }
    return this;
  }

  /** Water surface: a wavy blue line. */
  water(x1, x2, y) {
    let d = `M ${x1} ${y}`;
    for (let x = x1; x < x2; x += 16) d += ` q 4 -4 8 0 q 4 4 8 0`;
    this.svg.path(d, { color: C.water, width: 2 });
    return this;
  }

  /** Vertical cliff / building face drawn as a filled block from top y down to bottom y. */
  cliff(x1, x2, yTop, yBottom) {
    this.svg.polygon(
      [
        [x1, yTop],
        [x2, yTop],
        [x2, yBottom],
        [x1, yBottom],
      ],
      { fill: '#e8dcd0', stroke: C.ground, width: 1.5 }
    );
    return this;
  }

  arrow(
    x1,
    y1,
    x2,
    y2,
    color,
    label,
    { width = 3, lx, ly, anchor = 'middle', size = 16, dash } = {}
  ) {
    this.svg.arrow(x1, y1, x2, y2, { color, width, dash });
    if (label) {
      const mx = lx ?? (x1 + x2) / 2;
      const my = ly ?? (y1 + y2) / 2 - 12;
      this.svg.text(mx, my, label, { size, color, anchor });
    }
    return this;
  }

  vel(x1, y1, x2, y2, label, opts = {}) {
    return this.arrow(x1, y1, x2, y2, C.vel, label, opts);
  }

  acc(x1, y1, x2, y2, label, opts = {}) {
    return this.arrow(x1, y1, x2, y2, C.acc, label, opts);
  }

  disp(x1, y1, x2, y2, label, opts = {}) {
    return this.arrow(x1, y1, x2, y2, C.disp, label, opts);
  }

  /** Dashed path line (polyline or smooth path string). */
  path(points, { color = C.path, dash = '6 5', width = 1.8 } = {}) {
    if (typeof points === 'string') this.svg.path(points, { color, dash, width });
    else this.svg.polyline(points, { color, dash, width });
    return this;
  }

  /** Dimension line with arrowheads at both ends and a centered label. */
  dim(
    x1,
    y1,
    x2,
    y2,
    label,
    { off = 0, color = C.note, size = 15, lx, ly, anchor = 'middle' } = {}
  ) {
    this.svg.arrow(x1, y1, x2, y2, { color, width: 1.2, head: 8, start: true });
    if (label) {
      const vertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);
      const mx = lx ?? (x1 + x2) / 2 + (vertical ? off || 8 : 0);
      const my = ly ?? (y1 + y2) / 2 + (vertical ? 0 : off || -11);
      this.svg.text(mx, my, label, {
        size,
        color,
        anchor: vertical && lx === undefined ? 'start' : anchor,
      });
    }
    return this;
  }

  /** Angle arc at (cx, cy) between math angles a1 → a2 (deg, CCW from +x, y up). */
  angle(cx, cy, r, a1, a2, label, { lr, size = 15, color = C.axis, dx = 0, dy = 0 } = {}) {
    this.svg.arc(cx, cy, r, a1, a2, { color });
    if (label) {
      let sweep = (a2 - a1) % 360;
      if (sweep < 0) sweep += 360;
      const mid = rad(a1 + sweep / 2);
      const rr = lr || r + 14;
      this.svg.text(cx + rr * Math.cos(mid) + dx, cy - rr * Math.sin(mid) + dy, label, {
        size,
        color,
      });
    }
    return this;
  }

  /** Thin dashed reference line (e.g. the horizontal at a launch point). */
  ref(x1, y1, x2, y2) {
    this.svg.line(x1, y1, x2, y2, { color: '#999999', width: 1.2, dash: '4 4' });
    return this;
  }

  frame(opts) {
    return new Frame(this.svg, opts);
  }

  render() {
    return this.svg.render();
  }
}

/** Unit vector of a compass heading given as math angle (deg, CCW from east). */
export const dir = deg => [Math.cos(rad(deg)), -Math.sin(rad(deg))];
