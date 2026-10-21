/**
 * mechanics.js — drawing helpers shared by the chapter 7–9 sketches (work and
 * energy, momentum, statics). They extend the visual language of sketch.js:
 *   - forces are solid red arrows, labeled with the symbols the solution uses;
 *   - displacements are blue arrows (red is taken by forces here);
 *   - velocities are green and accelerations purple, as in chapters 2 and 3;
 *   - every sketch states its positive directions with labeled +x / +y axes,
 *     and torque sketches add a curved "+" arrow for the positive sense.
 *
 * Coordinates are SVG pixels (y down). Angles are math angles: degrees,
 * counterclockwise from the +x direction of the page.
 */

import { rad } from '../figures/svg.js';
import { C } from './sketch.js';

export const K = {
  force: '#b03a2e',
  comp: '#c0675e',
  disp: '#1f77c8',
  vel: C.vel,
  acc: C.acc,
  torque: '#555555',
};

/** Unit vector (screen coordinates) of a math angle. */
export const unit = a => [Math.cos(rad(a)), -Math.sin(rad(a))];

/** The point `len` pixels from (x, y) along math angle `a`. */
export const along = (x, y, a, len) => {
  const [ux, uy] = unit(a);
  return [x + ux * len, y + uy * len];
};

/**
 * An arrow of length `len` from (x, y) along math angle `a`, labeled beyond
 * its tip (or at `at`). Returns the tip.
 */
export function vecA(
  s,
  x,
  y,
  a,
  len,
  label,
  { color = K.force, width = 3, dash, at, dx = 0, dy = 0, size = 16, anchor, gap = 13 } = {}
) {
  const [tx, ty] = along(x, y, a, len);
  s.svg.arrow(x, y, tx, ty, { color, width, dash });
  if (label) {
    const [ux, uy] = unit(a);
    let lx;
    let ly;
    let anc = anchor;
    if (at) {
      [lx, ly] = at;
      anc = anc ?? 'middle';
    } else {
      lx = tx + ux * gap;
      ly = ty + uy * gap;
      if (!anc) anc = ux > 0.4 ? 'start' : ux < -0.4 ? 'end' : 'middle';
      if (Math.abs(uy) > 0.4) ly += uy * 2;
    }
    s.label(lx + dx, ly + dy, label, { color, anchor: anc, size });
  }
  return [tx, ty];
}

export const force = (s, x, y, a, len, label, opts = {}) =>
  vecA(s, x, y, a, len, label, { color: K.force, ...opts });
export const comp = (s, x, y, a, len, label, opts = {}) =>
  vecA(s, x, y, a, len, label, { color: K.comp, width: 2.2, dash: '6 4', size: 14, ...opts });
export const disp = (s, x, y, a, len, label, opts = {}) =>
  vecA(s, x, y, a, len, label, { color: K.disp, ...opts });
export const vel = (s, x, y, a, len, label, opts = {}) =>
  vecA(s, x, y, a, len, label, { color: K.vel, ...opts });
export const acc = (s, x, y, a, len, label, opts = {}) =>
  vecA(s, x, y, a, len, label, { color: K.acc, ...opts });

/**
 * A pair of axes through (ox, oy), rotated by `angle` (math degrees). Notes
 * such as "(up the ramp)" tie each axis to a physical direction.
 */
export function axesAt(
  s,
  ox,
  oy,
  {
    angle = 0,
    xPos = 150,
    xNeg = 60,
    yPos = 120,
    yNeg = 60,
    xLabel = '+x',
    yLabel = '+y',
    xNote,
    yNote,
    noY = false,
    noX = false,
  } = {}
) {
  const draw = (a, pos, neg, label, note) => {
    const [x1, y1] = along(ox, oy, a + 180, neg);
    const [x2, y2] = along(ox, oy, a, pos);
    s.svg.arrow(x1, y1, x2, y2, { color: C.axis, width: 1.5, head: 10 });
    const [ux, uy] = unit(a);
    const lx = x2 + ux * 16;
    const ly = y2 + uy * 16;
    const anchor = ux > 0.5 ? 'start' : ux < -0.5 ? 'end' : 'middle';
    s.svg.text(lx, ly, label, { size: 17, anchor, color: C.axis });
    if (note) {
      // Horizontal-ish axes get the note under the label; others beside it.
      if (Math.abs(ux) > 0.5) {
        s.svg.text(lx, ly + 17, note, { size: 12.5, math: false, color: C.note, anchor });
      } else {
        s.svg.text(lx + 14, ly, note, {
          size: 12.5,
          math: false,
          color: C.note,
          anchor: 'start',
        });
      }
    }
  };
  if (!noX) draw(angle, xPos, xNeg, xLabel, xNote);
  if (!noY) draw(angle + 90, yPos, yNeg, yLabel, yNote);
}

/**
 * A ramp (right triangle) with its low corner at (x0, y0), rising to the right
 * (or to the left with `dir: -1`) at `angle` degrees over a horizontal run.
 * Returns P(d, h): the point d pixels up the slope from the low corner and h
 * pixels above the surface (along the outward normal).
 */
export function ramp(s, x0, y0, run, angle, { dir = 1, fill = '#efe6dc' } = {}) {
  const rise = run * Math.tan(rad(angle));
  s.svg.polygon(
    [
      [x0, y0],
      [x0 + dir * run, y0],
      [x0 + dir * run, y0 - rise],
    ],
    { fill, stroke: C.ground, width: 1.5 }
  );
  const ux = dir * Math.cos(rad(angle));
  const uy = -Math.sin(rad(angle));
  // Outward normal: the slope direction turned toward the open (upper) side.
  const n = [-dir * Math.sin(rad(angle)), -Math.cos(rad(angle))];
  return (d, h = 0) => [x0 + ux * d + n[0] * h, y0 + uy * d + n[1] * h];
}

/** A rectangle centered at (x, y), rotated by math angle `a`. */
export function box(s, x, y, w, h, a = 0, { name, nameDx = 0, nameDy, fill = '#d6e4f0' } = {}) {
  const [ux, uy] = unit(a);
  const [vx, vy] = unit(a + 90);
  const pts = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([p, q]) => [
    x + (ux * p * w) / 2 + (vx * q * h) / 2,
    y + (uy * p * w) / 2 + (vy * q * h) / 2,
  ]);
  s.svg.polygon(pts, { fill, stroke: C.body, width: 2 });
  if (name) {
    s.svg.text(x + nameDx, y + (nameDy ?? -h / 2 - 14), name, {
      size: 13,
      math: false,
      color: C.body,
    });
  }
}

/**
 * Curved arrow showing the positive (counterclockwise) sense of rotation,
 * centered at (x, y), with a label such as "+τ (counterclockwise)".
 */
export function ccw(s, x, y, { r = 16, label = '+  (counterclockwise)', anchor = 'start' } = {}) {
  s.svg.arc(x, y, r, 200, 70, { color: K.torque, width: 1.6 });
  const [tx, ty] = [x + r * Math.cos(rad(70)), y - r * Math.sin(rad(70))];
  // Arrowhead tangent to the arc at its counterclockwise end.
  const [hx, hy] = unit(160);
  s.svg.arrow(tx - hx * 6, ty - hy * 6, tx + hx * 2, ty + hy * 2, {
    color: K.torque,
    width: 1.6,
    head: 8,
  });
  if (label) {
    s.svg.text(x + r + 8, y, label, { size: 13, math: false, color: C.note, anchor });
  }
}

/** A pivot (filled triangle) whose apex is at (x, y). */
export function pivot(s, x, y, { size = 14 } = {}) {
  s.svg.polygon(
    [
      [x, y],
      [x - size * 0.7, y + size],
      [x + size * 0.7, y + size],
    ],
    { fill: '#999999', stroke: C.axis, width: 1.2 }
  );
}

/** A small hinge (open circle on a bracket) at (x, y). */
export function hinge(s, x, y) {
  s.svg.circle(x, y, 6, { fill: '#ffffff', stroke: C.axis, width: 2 });
  s.svg.circle(x, y, 1.8, { fill: C.axis });
}

/** Panel caption in the sketch's upper-left corner (bold sans). */
export function caption(s, x, y, text) {
  s.svg.text(x, y, text, { size: 14, math: false, weight: 'bold', anchor: 'start' });
}

/** Vertical separator between panels. */
export function divider(s, x, y1, y2) {
  s.svg.line(x, y1, x, y2, { color: '#cccccc', width: 1 });
}

/** A coil spring drawn as a zigzag from (x1, y1) to (x2, y2). */
export function spring(
  s,
  x1,
  y1,
  x2,
  y2,
  { coils = 7, amp = 9, lead = 10, color = '#555555' } = {}
) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const pts = [
    [x1, y1],
    [x1 + ux * lead, y1 + uy * lead],
  ];
  const body = len - 2 * lead;
  for (let k = 0; k < coils * 2; k += 1) {
    const t = lead + (body * (k + 0.5)) / (coils * 2);
    const side = k % 2 ? -amp : amp;
    pts.push([x1 + ux * t - uy * side, y1 + uy * t + ux * side]);
  }
  pts.push([x2 - ux * lead, y2 - uy * lead], [x2, y2]);
  s.svg.polyline(pts, { color, width: 1.8 });
}

/** A fixed wall (hatched) whose face is the vertical line x from y1 to y2. */
export function wall(s, x, y1, y2, { side = 1 } = {}) {
  s.svg.line(x, y1, x, y2, { color: C.ground, width: 2.2 });
  for (let y = y1 + 4; y < y2; y += 12) {
    s.svg.line(x, y, x + side * 9, y - 8, { color: C.ground, width: 1.1 });
  }
}

/**
 * A horizontal axis from x1 to x2 at height y, positive to the right. The
 * label sits past the arrowhead with its note ("(east)") underneath, so the
 * note never collides with tick labels. `origin` and `ticks` are [px, text].
 */
export function hAxis(s, x1, x2, y, { label = '+x', note, origin, ticks = [] } = {}) {
  s.svg.arrow(x1, y, x2, y, { color: C.axis, width: 1.6, head: 11 });
  s.svg.text(x2 + 8, y, label, { size: 17, anchor: 'start', color: C.axis });
  if (note)
    s.svg.text(x2 + 8, y + 18, note, { size: 12.5, math: false, color: C.note, anchor: 'start' });
  for (const [px, text] of [origin, ...ticks].filter(Boolean)) {
    s.svg.line(px, y - 5, px, y + 5, { color: C.axis, width: 1.6 });
    if (text) s.svg.text(px, y + 17, text, { size: 14, color: C.axis });
  }
}
