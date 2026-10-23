/**
 * Chapter 32: applications of nuclear physics — fusion, fission, chain
 * reactions, and the energy output of weapons.
 *
 * The binding-energy curve and the nucleus drawings are shared with chapter
 * 31. The fusion potential is a deep nuclear well joined smoothly to a Coulomb
 * 1/r tail. In the chain reaction every fission releases three neutrons, two
 * of which go on to split another nucleus, so each generation doubles.
 * The pie charts use the percentages the caption gives.
 */
import { NEUTRON, bindingEnergy, nucleon, nucleus } from './ch31.js';
import { COLORS, Plot, Svg } from './svg.js';

const GO = '#5ab43c';
const CURVE = '#a5182f';
const GAMMA = '#1aa6b7';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** A free neutron with an arrow along (dx, dy). */
function neutron(svg, x, y, [dx, dy], { r = 7, color = GO, width = 3 } = {}) {
  nucleon(svg, x, y, r, NEUTRON);
  if (dx || dy) svg.arrow(x, y, x + dx, y + dy, { color, width, head: 14 });
}

/** A gamma ray: a wavy line ending in an arrow, from P along direction u for length L. */
function gamma(svg, [x, y], [ux, uy], L) {
  const pts = [];
  for (let k = 0; k <= 60; k += 1) {
    const s = (L * 0.8 * k) / 60;
    const w = 6 * Math.sin((s / 9) * Math.PI);
    pts.push([x + ux * s - uy * w, y + uy * s + ux * w]);
  }
  svg.polyline(pts, { color: GAMMA, width: 2.5 });
  svg.arrow(...pts.at(-1), x + ux * L, y + uy * L, { color: GAMMA, width: 2.5, head: 14 });
}

/** A pie chart of [label, percent, color] slices starting at 12 o'clock, going clockwise. */
function pie(svg, cx, cy, r, slices) {
  let a = -90;
  const mid = [];
  for (const [, pct, color] of slices) {
    const a2 = a + pct * 3.6;
    const P = d => [cx + r * Math.cos((d * Math.PI) / 180), cy + r * Math.sin((d * Math.PI) / 180)];
    const [p1, p2] = [P(a), P(a2)];
    svg.path(
      `M ${cx} ${cy} L ${p1[0]} ${p1[1]} A ${r} ${r} 0 ${pct > 50 ? 1 : 0} 1 ${p2[0]} ${p2[1]} Z`,
      {
        color: '#5a1a1a',
        width: 1.2,
        fill: color,
      }
    );
    mid.push((a + a2) / 2);
    a = a2;
  }
  return mid;
}

const BLAST = '#e8534a';
const THERMAL = '#f7c6cf';
const DELAYED = '#b8742a';
const PROMPT = '#e6cfa6';

export default {
  // 32.5 Fig. 2 — fusion moves light nuclei up the binding-energy curve
  Figure_32_05_02: () =>
    bindingEnergy({
      title: 'Binding energy per nucleon and fusion',
      desc: 'Binding energy per nucleon, BE/A, versus mass number A for stable nuclei. A brace spans the light nuclei, from ²H up toward A ≈ 20, labeled “Fusion produces energy”: fusing light nuclei into heavier ones raises BE/A, so mass is converted to energy.',
      fusion: (svg, g) => {
        const [x, y1, y2] = [g.X(16), g.Y(7.4), g.Y(1.2)];
        svg.path(
          `M ${x} ${y1} Q ${x + 10} ${y1} ${x + 10} ${y1 + 10} L ${x + 10} ${(y1 + y2) / 2 - 8} L ${x + 18} ${(y1 + y2) / 2} L ${x + 10} ${(y1 + y2) / 2 + 8} L ${x + 10} ${y2 - 10} Q ${x + 10} ${y2} ${x} ${y2}`,
          {
            color: COLORS.black,
            width: 1.5,
          }
        );
        svg.lines(x + 30, (y1 + y2) / 2 - 26, ['Fusion', 'produces', 'energy'], {
          size: 20,
          math: false,
          anchor: 'start',
        });
      },
    }),

  // 32.5 Fig. 3 — the potential energy between two light nuclei
  Figure_32_05_03: () => {
    const svg = new Svg({
      width: 640,
      height: 470,
      title: 'Potential energy between two light nuclei',
      desc: 'Potential energy of two light nuclei versus their separation r. At large r the repulsive Coulomb force makes the energy positive and falling off slowly; closer in it rises to a hump, then plunges into a deep well where the attractive nuclear force takes over. A nucleus with enough energy to get over the hump is pulled together into the well; one without enough is repelled.',
    });
    const g = new Plot(svg, { x: 90, y: 30, w: 500, h: 420, xRange: [0, 5], yRange: [-1.1, 1.3] });
    g.axes({ arrows: true, xAxisAt: 0 });
    // The nuclear well (−1) hands over smoothly, through the switch s, to the positive Coulomb tail ∝ 1/r.
    const s = r => 1 / (1 + Math.exp(-(r - 1.1) / 0.16));
    const pe = r => -(1 - s(r)) + s(r) * 1.6 * (1.2 / Math.max(r, 1.2)) ** 1.1;
    g.fn(pe, 0, 4.7, { n: 600, color: CURVE, width: 4 });
    const ball = (r, dir) => {
      const [x, y] = g.P(r, pe(r));
      svg.circle(x, y - 8, 9, { fill: '#5ba7dc', stroke: '#1f5f8a', width: 2 });
      svg.circle(x - 3, y - 11, 3, { fill: '#ffffff' });
      // A short arrow down the slope; on the steep inner wall a fixed step in r
      // would run the arrow far past the ball.
      const [x2, y2] = g.P(r + dir * 0.18, pe(r + dir * 0.18));
      const len = Math.hypot(x2 - x, y2 - y);
      const [ux, uy] = [(x2 - x) / len, (y2 - y) / len];
      const [sx, sy] = [x + ux * 12, y - 8 + uy * 12];
      svg.arrow(sx + dir * 4, sy + 4, sx + dir * 4 + ux * 42, sy + 4 + uy * 42, {
        color: COLORS.black,
        width: 2,
        head: 12,
      });
    };
    ball(1.18, -1);
    ball(2.4, 1);
    svg.text(g.X(0) - 10, g.Y(0), '0', { size: 26, math: false, anchor: 'end' });
    svg.text(g.X(0) - 6, g.Y(1.3) + 6, '\\rm{PE}_{tot}', { size: 26, anchor: 'end' });
    svg.text(g.X(5) + 16, g.Y(0) + 6, 'r', { size: 26, anchor: 'start' });
    svg.lines(g.X(0.1), g.Y(1.28), ['Pulled', 'together'], {
      size: 24,
      math: false,
      anchor: 'start',
    });
    svg.squiggle(g.X(0.6), g.Y(1.06), g.X(1.1), g.Y(pe(1.18)) - 14, { waves: 1, amp: 4 });
    note(svg, g.X(2.85), g.Y(1.0), 'Repelled', { size: 24, anchor: 'start' });
    svg.squiggle(g.X(2.82), g.Y(1.0), g.X(2.48), g.Y(pe(2.4)) - 12, { waves: 1, amp: 4 });
    svg.lines(g.X(3.9), g.Y(0.86), ['Repulsive', 'Coulomb'], {
      size: 24,
      math: false,
      anchor: 'start',
    });
    svg.squiggle(g.X(3.85), g.Y(0.78), g.X(3.65), g.Y(pe(3.65)) - 6, { waves: 1, amp: 4 });
    note(svg, g.X(1.75), g.Y(-0.45), 'Attractive nuclear', { size: 24, anchor: 'start' });
    svg.squiggle(g.X(1.7), g.Y(-0.45), g.X(1.02), g.Y(pe(0.98)), { waves: 1, amp: 4 });
    return svg.render();
  },

  // 32.5 Fig. 4 — two nuclei bounce apart, or fuse by tunneling
  Figure_32_05_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 400,
      title: 'Two nuclei colliding with less and more energy',
      desc: '(a) Two nuclei heading toward each other slow down, stop without touching, and fly apart again. (b) At higher energies they come close enough to fuse by tunneling, forming a single nucleus that gives off gamma rays and a particle.',
    });
    const trail = (cx, cy, dir, fade) => {
      // Faded copies behind a moving nucleus show its motion.
      for (const [k, op] of fade
        ? [
            [2, 0.25],
            [1, 0.5],
          ]
        : []) {
        svg.add(
          `<g opacity="${op}">${svg.capture(() => nucleus(svg, cx - dir * k * 18, cy, 9, 4, { r: 11, seed: 4 }))}</g>`
        );
      }
      nucleus(svg, cx, cy, 9, 4, { r: 11, seed: 4 });
    };
    const pair = (x0, y, gap, out) => {
      trail(x0 - gap, y, out ? -1 : 1, true);
      trail(x0 + gap, y, out ? 1 : -1, true);
      const head = out ? 1 : -1;
      svg.arrow(x0 - gap + head * -30, y, x0 - gap + head * -90, y, {
        color: GO,
        width: 3,
        head: 13,
      });
      svg.arrow(x0 + gap + head * 30, y, x0 + gap + head * 90, y, {
        color: GO,
        width: 3,
        head: 13,
      });
    };
    // (a) In, stopped, out again.
    pair(220, 70, 120, false);
    trail(180, 180, 0, false);
    trail(260, 180, 0, false);
    pair(220, 290, 120, true);
    caption(svg, 220, 380, '(a)');
    // (b) In, touching, fused.
    pair(730, 70, 120, false);
    trail(700, 180, 0, false);
    trail(752, 180, 0, false);
    nucleus(svg, 730, 290, 18, 8, { r: 11, seed: 8 });
    gamma(svg, [700, 280], [-0.9, 0.44], 110);
    gamma(svg, [760, 280], [0.9, -0.44], 110);
    neutron(svg, 810, 316, [40, 24]);
    caption(svg, 730, 380, '(b)');
    return svg.render();
  },

  // 32.6 Fig. 2 — neutron-induced fission
  Figure_32_06_02: () => {
    const svg = new Svg({
      width: 660,
      height: 1000,
      title: 'Neutron-induced fission',
      desc: '(a) A neutron strikes a large nucleus and is absorbed. (b) The nucleus deforms like a struck liquid drop and narrows in the middle. (c) With fewer nucleons in contact, the Coulomb repulsion between the positively charged halves pushes them apart. (d) The nucleus splits into two fission fragments, FF1 and FF2, and some neutrons fly away.',
    });
    // (a)
    neutron(svg, 150, 90, [110, 30], { r: 12, width: 4 });
    nucleus(svg, 330, 140, 42, 17, { r: 13, seed: 21 });
    caption(svg, 60, 190, '(a)');
    // (b) Two lobes joined by a narrow neck.
    nucleus(svg, 255, 370, 19, 8, { r: 13, seed: 22 });
    nucleus(svg, 330, 372, 6, 2, { r: 12, seed: 23 });
    nucleus(svg, 405, 370, 19, 7, { r: 13, seed: 24 });
    caption(svg, 60, 420, '(b)');
    // (c) The halves repel.
    nucleus(svg, 230, 600, 21, 9, { r: 13, seed: 22 });
    nucleus(svg, 430, 600, 21, 8, { r: 13, seed: 24 });
    lab(svg, 220, 540, '+', { math: false, size: 34 });
    lab(svg, 440, 540, '+', { math: false, size: 34 });
    svg.arrow(190, 620, 70, 660, { color: GO, width: 4, head: 20 });
    svg.arrow(470, 580, 600, 540, { color: GO, width: 4, head: 20 });
    caption(svg, 60, 650, '(c)');
    // (d) Fragments and neutrons fly apart.
    nucleus(svg, 220, 860, 20, 9, { r: 13, seed: 25 });
    nucleus(svg, 440, 860, 20, 8, { r: 13, seed: 26 });
    svg.arrow(180, 880, 50, 920, { color: GO, width: 4, head: 20 });
    svg.arrow(480, 840, 610, 800, { color: GO, width: 4, head: 20 });
    neutron(svg, 300, 740, [-90, -20], { r: 12, width: 4 });
    neutron(svg, 350, 760, [50, -50], { r: 12, width: 4 });
    neutron(svg, 340, 940, [70, 40], { r: 12, width: 4 });
    lab(svg, 220, 950, '\\rm{FF}_1', { size: 30 });
    lab(svg, 440, 950, '\\rm{FF}_2', { size: 30 });
    caption(svg, 60, 960, '(d)');
    return svg.render();
  },

  // 32.6 Fig. 3 — a chain reaction
  Figure_32_06_03: () => {
    const svg = new Svg({
      width: 680,
      height: 820,
      title: 'A fission chain reaction',
      desc: 'A neutron strikes a uranium-235 nucleus, which splits into two fission fragments and three neutrons. Two of those neutrons strike other uranium-235 nuclei, which split in turn, and so on: each generation doubles the number of fissions, so the reaction sustains itself.',
    });
    // Each fission: the nucleus, two fragments, three outgoing neutrons; two neutrons feed the next generation.
    const fission = (x, y, next, seed) => {
      nucleus(svg, x, y, 30, 12, { r: 9, seed });
      nucleus(svg, x + 2, y - 70, 8, 3, { r: 7, seed: seed + 1 });
      svg.arrow(x + 2, y - 86, x + 10, y - 110, { color: COLORS.black, width: 1.5, head: 9 });
      nucleus(svg, x - 4, y + 66, 8, 3, { r: 7, seed: seed + 2 });
      svg.arrow(x - 4, y + 82, x - 8, y + 106, { color: COLORS.black, width: 1.5, head: 9 });
      svg.line(x + 2, y - 30, x + 2, y - 54, { color: COLORS.black, width: 1.4 });
      svg.line(x - 4, y + 30, x - 4, y + 50, { color: COLORS.black, width: 1.4 });
      for (const [tx, ty] of next) {
        const L = Math.hypot(tx - x, ty - y);
        const [ux, uy] = [(tx - x) / L, (ty - y) / L];
        svg.arrow(x + ux * 40, y + uy * 40, tx - ux * 40, ty - uy * 40, {
          color: COLORS.black,
          width: 1.5,
          head: 11,
        });
        nucleon(svg, x + ux * 0.6 * L, y + uy * 0.6 * L, 6, NEUTRON);
      }
      // The third neutron escapes.
      svg.arrow(x + 34, y + 8, x + 110, y + 12, { color: COLORS.black, width: 1.5, head: 11 });
      nucleon(svg, x + 70, y + 10, 6, NEUTRON);
    };
    const g3 = [
      [560, 100],
      [600, 290],
      [580, 490],
      [600, 680],
    ];
    const g2 = [
      [380, 200],
      [400, 560],
    ];
    svg.arrow(20, 380, 80, 380, { color: COLORS.black, width: 1.5, head: 11 });
    nucleon(svg, 90, 380, 6, NEUTRON);
    fission(160, 380, g2, 31);
    fission(...g2[0], g3.slice(0, 2), 41);
    fission(...g2[1], g3.slice(2), 51);
    g3.forEach(([x, y], i) => nucleus(svg, x, y, 30, 12, { r: 9, seed: 61 + i }));
    // Legend.
    nucleon(svg, 40, 690, 7, NEUTRON);
    note(svg, 64, 690, 'Neutron', { anchor: 'start', size: 20 });
    nucleus(svg, 40, 730, 8, 3, { r: 7, seed: 71 });
    note(svg, 64, 730, 'Fission fragment nuclei', { anchor: 'start', size: 20 });
    nucleus(svg, 40, 775, 30, 12, { r: 7, seed: 72 });
    note(svg, 74, 775, '^{235}_{92}\\rm{U} nucleus', { anchor: 'start', size: 20 });
    return svg.render();
  },

  // 32.7 Fig. 6 — where the energy of a bomb goes
  Figure_32_07_06: () => {
    const svg = new Svg({
      width: 560,
      height: 1100,
      title: 'Energy output of conventional and nuclear weapons',
      desc: '(a) A conventional chemical bomb: 90% blast and 10% thermal. (b) A conventional nuclear bomb: 50% blast, 35% thermal, 10% delayed radiation and 5% prompt radiation. (c) A radiation-enhanced nuclear bomb (neutron bomb): 40% blast, 25% thermal, 5% delayed radiation and 30% prompt radiation.',
    });
    const charts = [
      [
        210,
        '(a)',
        ['Conventional', 'chemical bomb'],
        [
          ['Thermal 10%', 10, THERMAL, [110, -70, 'start']],
          ['Blast 90%', 90, BLAST],
        ],
      ],
      [
        560,
        '(b)',
        ['Conventional', 'nuclear bomb'],
        [
          ['Thermal 35%', 35, THERMAL],
          ['Delayed radiation 10%', 10, DELAYED, [110, 80, 'start']],
          ['Prompt radiation 5%', 5, PROMPT, [-40, 130, 'end']],
          ['Blast 50%', 50, BLAST],
        ],
      ],
      [
        920,
        '(c)',
        ['Radiation-enhanced', 'nuclear bomb (neutron bomb)'],
        [
          ['Thermal 25%', 25, THERMAL],
          ['Delayed radiation 5%', 5, DELAYED, [120, 30, 'start']],
          ['Prompt radiation 30%', 30, PROMPT],
          ['Blast 40%', 40, BLAST],
        ],
      ],
    ];
    const R = 90;
    for (const [cy, cap, title, slices] of charts) {
      const cx = 220;
      svg.text(30, cy - R - 85, cap, { size: 18, math: false, anchor: 'start' });
      svg.lines(cx, cy - R - 85, title, { size: 20, math: false });
      const mids = pie(svg, cx, cy, R, slices);
      slices.forEach(([text, , , at], i) => {
        const a = (mids[i] * Math.PI) / 180;
        const [ux, uy] = [Math.cos(a), Math.sin(a)];
        const words = text.split(' ');
        const label = [words.slice(0, -1).join(' '), words.at(-1)];
        // Wide slices are labeled inside; thin ones at a chosen spot [dx, dy, anchor] with a leader.
        if (!at) {
          svg.lines(cx + ux * R * 0.5, cy + uy * R * 0.5 - 10, label, {
            size: 17,
            math: false,
            halo: false,
          });
          return;
        }
        const [dx, dy, anchor] = at;
        svg.leader(
          cx + dx + (anchor === 'start' ? -6 : 6),
          cy + dy - 6,
          cx + ux * R * 0.8,
          cy + uy * R * 0.8,
          {
            bend: 0.25,
            width: 1.2,
          }
        );
        svg.lines(cx + dx, cy + dy - 8, label, { size: 17, math: false, anchor });
      });
    }
    return svg.render();
  },
};
