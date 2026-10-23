/**
 * Chapter 28: special relativity — length contraction of a moving charge's
 * field, relativistic velocity addition, and relativistic momentum and
 * kinetic energy.
 *
 * The graphs come from their formulas with γ = 1/√(1 − u²/c²): momentum
 * p = γmu for an object with mc = 0.33 kg·m/s, and kinetic energy
 * (γ − 1)mc² beside the classical ½mv² for mc² = 0.5 J. Those masses give
 * the same scales as the original figures. The field lines of the moving
 * electron are those of a charge at 0.9c, crowded toward the plane
 * perpendicular to its motion by the factor in E ∝ 1/(1 − β² sin²ψ)^{3/2}.
 */
import { COLORS, Plot, Svg } from './svg.js';

const FIELD = '#1f78c8';
const VEL = '#7cb82f';
const LASER = '#e0245e';
const CURVE = '#c0222f';
const CLASSICAL = '#3aaa3a';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

/** A small rocket pointing right (dir = 1) or left (dir = −1), its nose at (x, y). */
function rocket(svg, x, y, { dir = 1, s = 1 } = {}) {
  const P = (dx, dy) => [x - dir * dx * s, y + dy * s];
  const fin = sy =>
    svg.polygon([P(88, 0), P(118, sy * 34), P(128, sy * 34), P(112, sy * 6)], {
      fill: '#9aa0a8',
      stroke: '#5f656c',
      width: 1.2,
    });
  fin(-1);
  fin(1);
  const body = [P(0, 0), P(30, -15), P(110, -16), P(118, -12), P(118, 12), P(110, 16), P(30, 15)];
  svg.polygon(body, { fill: '#e6eef2', stroke: '#6f7a80', width: 1.5 });
  svg.polygon([P(0, 0), P(30, -15), P(30, 15)], { fill: '#b9c2c8', stroke: '#6f7a80', width: 1.2 });
  svg.line(...P(118, 0), ...P(134, 0), { color: '#6f7a80', width: 2 });
}

/** The Earth: a blue disk with a few green continents. */
export function earth(svg, cx, cy, r) {
  svg.circle(cx, cy, r, { fill: '#58a6dd', stroke: '#2f6f9e', width: 1.5 });
  const blob = (dx, dy, w, h) =>
    svg.path(
      `M ${cx + dx * r} ${cy + dy * r} q ${w * r * 0.5} ${-h * r} ${w * r} 0 q ${-w * r * 0.2} ${h * r * 0.9} ${-w * r * 0.6} ${h * r * 0.8} z`,
      { color: '#4f8f2f', width: 0.8, fill: '#9ccf4a' }
    );
  blob(-0.6, -0.3, 0.7, 0.5);
  blob(0.1, -0.5, 0.6, 0.35);
  blob(-0.1, 0.25, 0.55, 0.6);
}

/** A tiny observer standing on top of a point (x, y). */
export function observer(svg, x, y, s = 1) {
  svg.line(x - 3 * s, y, x - 2 * s, y - 14 * s, { color: '#333333', width: 2.5 * s });
  svg.line(x + 3 * s, y, x + 2 * s, y - 14 * s, { color: '#333333', width: 2.5 * s });
  svg.rect(x - 4 * s, y - 30 * s, 8 * s, 17 * s, { fill: '#c98a3a', rx: 2 * s });
  svg.circle(x, y - 34 * s, 4 * s, { fill: '#e7b98c' });
}

export default {
  // 28.3 Fig. 4 — the field of a fast electron is squeezed toward its sides
  Figure_28_03_04: () => {
    const svg = new Svg({
      width: 560,
      height: 400,
      title: 'Field lines of a fast-moving electron',
      desc: 'An electron moves at high velocity v to the right through a tube. Its electric field lines, which point radially in toward it, are bunched toward the plane perpendicular to its motion by length contraction, so few lines point forward or backward.',
    });
    svg.add(
      '<defs><linearGradient id="tube28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb2e3"/><stop offset="0.45" stop-color="#eef6fd"/><stop offset="1" stop-color="#5b97d1"/></linearGradient><linearGradient id="fade28" x1="0" y1="0" x2="1" y2="0"><stop offset="0.7" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>'
    );
    // The tube rises gently to the right.
    svg.polygon(
      [
        [20, 238],
        [560, 168],
        [560, 208],
        [20, 296],
      ],
      { fill: 'url(#tube28)' }
    );
    svg.ellipse(22, 267, 12, 29, { fill: '#6fa5dc', stroke: '#3f78b0', width: 1.5 });
    svg.polygon(
      [
        [380, 160],
        [560, 160],
        [560, 240],
        [380, 240],
      ],
      { fill: 'url(#fade28)' }
    );
    const E = [240, 234];
    // Lines leave the charge at angles ψ from its motion; the field strength at ψ goes as
    // 1/(1 − β² sin²ψ)^{3/2}, so equal shares of flux crowd near ψ = 90°.
    const beta = 0.9;
    const weight = psi => 1 / (1 - beta * beta * Math.sin(psi) ** 2) ** 1.5;
    const n = 400;
    const cum = [0];
    for (let k = 1; k <= n; k += 1) {
      const psi = (Math.PI * k) / n;
      cum.push(cum[k - 1] + weight(psi) * Math.sin(psi));
    }
    const total = cum[n];
    const lines = 10;
    for (let j = 0; j < lines; j += 1) {
      const target = ((j + 0.5) / lines) * total;
      let k = 0;
      while (cum[k] < target) k += 1;
      const psi = (Math.PI * k) / n;
      // Draw the line in the plane of the page, alternating above and below the tube.
      for (const side of [-1, 1]) {
        const a = side * psi;
        const ux = Math.cos(a);
        const uy = Math.sin(a);
        if (Math.abs(ux) > 0.45) continue;
        const far = [E[0] + 190 * ux, E[1] + 190 * uy];
        svg.line(...far, ...E, { color: FIELD, width: 1.6 });
        const mid = [E[0] + 110 * ux, E[1] + 110 * uy];
        svg.arrow(...mid, E[0] + 90 * ux, E[1] + 90 * uy, { color: FIELD, width: 1.6, head: 11 });
      }
    }
    svg.circle(...E, 12, { fill: '#f07b3f', stroke: '#c2471a', width: 1.5 });
    svg.circle(E[0] - 3, E[1] - 3, 4, { fill: '#ffd0a8' });
    svg.arrow(E[0] + 14, E[1] - 2, E[0] + 140, E[1] - 20, { color: VEL, width: 3, head: 15 });
    lab(svg, E[0] - 30, E[1] - 4, 'e^−');
    lab(svg, E[0] + 100, E[1] + 26, 'v');
    return svg.render();
  },

  // 28.4 problem — laser light from ships moving toward and away from Earth
  Figure_28_04_04: () => {
    const svg = new Svg({
      width: 760,
      height: 380,
      title: 'Laser light from moving spaceships',
      desc: 'Top: a spaceship moving right at v = 0.500c, toward the Earth, fires laser light ahead of it, which travels at c. Bottom: a spaceship moving left at v = 0.500c, away from the Earth, fires laser light ahead of it, to the left, also at c.',
    });
    earth(svg, 680, 92, 44);
    earth(svg, 680, 262, 44);
    rocket(svg, 200, 90, { dir: 1 });
    svg.line(200, 100, 460, 100, { color: LASER, width: 2.5 });
    note(svg, 270, 76, 'laser light', { anchor: 'start', size: 24 });
    svg.arrow(460, 84, 560, 84, { color: FIELD, width: 3, head: 18 });
    lab(svg, 506, 62, 'c');
    svg.arrow(110, 150, 220, 150, { color: VEL, width: 3, head: 18 });
    lab(svg, 166, 184, 'v = 0.500c');
    rocket(svg, 420, 260, { dir: -1 });
    svg.line(160, 270, 420, 270, { color: LASER, width: 2.5 });
    note(svg, 200, 246, 'laser light', { anchor: 'start', size: 24 });
    svg.arrow(160, 254, 60, 254, { color: FIELD, width: 3, head: 18 });
    lab(svg, 110, 232, 'c');
    svg.arrow(510, 320, 400, 320, { color: VEL, width: 3, head: 18 });
    lab(svg, 456, 348, 'v = 0.500c');
    return svg.render();
  },

  // 28.4 problem — a canister fired toward and away from Earth
  Figure_28_04_05: () => {
    const svg = new Svg({
      width: 1060,
      height: 330,
      title: 'Canisters fired from a moving spaceship',
      desc: 'Left: a spaceship moving toward Earth at v = 0.50c fires a canister forward, toward Earth, at u′ = 0.75c relative to the ship, while an observer stands on Earth. Right: the same ship, still moving toward Earth at v = 0.50c, fires the canister backward, away from Earth, at u′ = −0.75c relative to the ship.',
    });
    const panel = (x0, forward, title) => {
      const ex = x0 + 420;
      earth(svg, ex, 190, 56);
      observer(svg, ex, 134, 1.6);
      rocket(svg, x0 + 210, 190, { dir: 1, s: 1.3 });
      svg.arrow(x0 + 90, 222, x0 + 340, 222, { color: VEL, width: 3, head: 18 });
      lab(svg, x0 + 270, 250, 'v = 0.50c', { size: 24 });
      const can = [forward ? x0 + 120 : x0 + 230, 118];
      svg.rect(can[0] - 16, can[1] - 11, 32, 22, {
        fill: '#6f737a',
        stroke: '#3f4348',
        width: 1.2,
        rx: 4,
      });
      if (forward)
        svg.arrow(can[0] + 22, can[1], x0 + 350, can[1], { color: VEL, width: 3, head: 18 });
      else svg.arrow(can[0] - 22, can[1], x0 + 10, can[1], { color: VEL, width: 3, head: 18 });
      lab(svg, can[0] + (forward ? 44 : -44), can[1] - 26, "u'", { size: 24 });
      lab(svg, x0 + 210, 46, forward ? "u' = 0.75c" : "u' = −0.75c", { size: 26 });
      note(svg, x0 + 240, 300, title, { size: 24 });
    };
    panel(30, true, 'Canister toward Earth');
    svg.line(530, 30, 530, 300, { color: COLORS.black, width: 2 });
    panel(570, false, 'Canister away from Earth');
    return svg.render();
  },

  // 28.5 Fig. 2 — relativistic momentum grows without limit near c
  Figure_28_05_02: () => {
    const svg = new Svg({
      width: 560,
      height: 460,
      title: 'Relativistic momentum versus speed',
      desc: 'Relativistic momentum p_rel = γmu versus speed u from 0 to the speed of light c. The momentum stays small at low speeds, rises steeply above about 0.8c, and grows without limit as u approaches c, shown by a dashed vertical line.',
    });
    const g = new Plot(svg, {
      x: 110,
      y: 40,
      w: 380,
      h: 330,
      xRange: [0, 1.1],
      yRange: [0, 4.6],
      xTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      yTicks: [0, 1, 2, 3, 4],
      xFormat: v => (v === 0 ? '0' : `${v.toFixed(1)}c`),
      yFormat: v => (v === 0 ? '0' : v.toFixed(1)),
    });
    g.axes({ arrows: true, size: 20 });
    svg.line(g.X(1), g.Y(0), g.X(1), g.Y(4.4), { color: COLORS.black, width: 1.5, dash: '6 5' });
    // p = γmu with mc = 0.33 kg·m/s, up to where p reaches 4.2.
    const p = b => (0.33 * b) / Math.sqrt(1 - b * b);
    // The speed at which p reaches a given value: β = p/√((mc)² + p²).
    const at = v => v / Math.sqrt(0.33 ** 2 + v * v);
    g.fn(p, 0, at(3.6), { n: 600, color: CURVE, width: 3.5 });
    svg.arrow(...g.P(at(3.6), 3.6), ...g.P(at(4.4), 4.4), { color: CURVE, width: 3.5, head: 18 });
    svg.text(g.X(0.55), g.Y(0) + 64, 'speed \\it{u} (m/s)', { size: 20, math: false });
    svg.text(36, g.Y(2.3), 'momentum \\it{p}_{rel} (kg·m/s)', {
      size: 20,
      math: false,
      rotate: -90,
    });
    return svg.render();
  },

  // 28.6 Fig. 3 — relativistic and classical kinetic energy
  Figure_28_06_03: () => {
    const svg = new Svg({
      width: 600,
      height: 470,
      title: 'Relativistic and classical kinetic energy',
      desc: 'Kinetic energy versus speed v from 0 to c. The relativistic kinetic energy (γ − 1)mc² agrees with the classical ½mv² at low speed, but rises far more steeply and grows without limit as v approaches c, shown by a dashed vertical line; the classical curve stays finite.',
    });
    const g = new Plot(svg, {
      x: 110,
      y: 40,
      w: 380,
      h: 330,
      xRange: [0, 1.1],
      yRange: [0, 4.6],
      xTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      yTicks: [0, 1, 2, 3, 4],
      xFormat: v => (v === 0 ? '0' : v === 1 ? 'c' : `${v.toFixed(1)}c`),
      yFormat: v => (v === 0 ? '0' : v.toFixed(1)),
    });
    g.axes({ arrows: true, size: 20 });
    svg.line(g.X(1), g.Y(0), g.X(1), g.Y(4.4), { color: COLORS.black, width: 1.5, dash: '6 5' });
    // mc² = 0.5 J.
    const rel = b => 0.5 * (1 / Math.sqrt(1 - b * b) - 1);
    // The speed at which KE reaches a given value: γ = 1 + KE/mc².
    const at = v => Math.sqrt(1 - 1 / (1 + v / 0.5) ** 2);
    g.fn(rel, 0, at(3.6), { n: 600, color: CURVE, width: 3.5 });
    svg.arrow(...g.P(at(3.6), 3.6), ...g.P(at(4.4), 4.4), { color: CURVE, width: 3.5, head: 18 });
    g.fn(b => 0.25 * b * b, 0, 1.12, { n: 200, color: CLASSICAL, width: 3.5 });
    svg.arrow(...g.P(1.1, 0.3025), ...g.P(1.14, 0.325), { color: CLASSICAL, width: 3.5, head: 18 });
    lab(svg, g.X(0.75), g.Y(0.85), '\\rm{KE}_{rel}', { weight: 'bold' });
    lab(svg, g.X(1.05), g.Y(0.7), '\\rm{KE}_{class}', { anchor: 'start', weight: 'bold' });
    svg.text(g.X(0.55), g.Y(0) + 64, 'Speed \\it{v} (m/s)', { size: 20, math: false });
    svg.text(36, g.Y(2.3), 'Kinetic energy, KE (J)', { size: 20, math: false, rotate: -90 });
    return svg.render();
  },
};
