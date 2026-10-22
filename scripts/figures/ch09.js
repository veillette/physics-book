/**
 * Chapter 9: torque on a door, a braced wall, a sandwich-board sign, and
 * simple machines, and pulley systems with their mechanical advantage.
 */
import { COLORS, Svg, rad } from './svg.js';

const BLACK = COLORS.black;
const FORCE = '#e0245e';
const WOOD = '#dcb878';
const WOOD_EDGE = '#a7803d';
const STEEL = '#c9cbcf';
const STEEL_EDGE = '#7d8187';

/**
 * A door seen from above, hinged at H and opened `deg` degrees from the wall.
 * `at(u, v)` maps door coordinates (u along the door from the hinge, v across
 * it toward the side the door opens to) onto the page.
 */
function door(svg, H, { deg = 25, length = 280, half = 12 } = {}) {
  const e = [Math.cos(rad(deg)), -Math.sin(rad(deg))];
  const n = [-Math.sin(rad(deg)), -Math.cos(rad(deg))];
  const at = (u, v) => [H[0] + u * e[0] + v * n[0], H[1] + u * e[1] + v * n[1]];
  svg.rect(H[0] - 170, H[1] - 4, 160, 14, { fill: '#efdcb2', stroke: WOOD_EDGE, width: 1 });
  svg.polygon([at(0, -half), at(length, -half), at(length, half), at(0, half)], {
    fill: WOOD,
    stroke: WOOD_EDGE,
    width: 1.5,
  });
  // The handle, on the side the door opens toward.
  svg.line(...at(length - 24, half), ...at(length - 24, half + 8), { color: '#9a7a12', width: 3 });
  svg.circle(...at(length - 24, half + 14), 7, { fill: '#e8c547', stroke: '#9a7a12', width: 1.5 });
  svg.circle(...H, 7, { fill: '#c9a227', stroke: '#7a5e10', width: 1.5 });
  return { at, e, n };
}

/** Dimension line along the door from u = 0 to u = r, offset v pixels across it. */
function doorDimension(svg, d, r, v, label, { labelV = v + 20 } = {}) {
  const tick = (u, len) =>
    svg.line(...d.at(u, v - len), ...d.at(u, v + len), { color: BLACK, width: 1.3 });
  tick(0, 10);
  tick(r, 10);
  svg.arrow(...d.at(1, v), ...d.at(r - 1, v), { color: BLACK, width: 1.3, head: 10, start: true });
  if (label) svg.text(...d.at(r / 2, labelV), label, { size: 22 });
}

/** Rope: a tan cable drawn along an SVG path. */
function rope(svg, d) {
  svg.path(d, { color: '#a5843f', width: 7 });
  svg.path(d, { color: '#ddbf7d', width: 3.5 });
}

/** Pulley wheel of radius r centered at (x, y). */
function pulley(svg, x, y, r) {
  svg.circle(x, y, r, { fill: STEEL, stroke: STEEL_EDGE, width: 2 });
  svg.circle(x, y, r * 0.55, { fill: '#e4e5e8', stroke: STEEL_EDGE, width: 1.5 });
  svg.circle(x, y, r * 0.16, { fill: '#ffffff', stroke: STEEL_EDGE, width: 1.5 });
}

/** Tension arrow along the segment from p to q, covering the fraction [s1, s2]. */
function tension(svg, p, q, s1, s2, { label = 'T', dx = -18, dy = 0 } = {}) {
  const at = s => [p[0] + (q[0] - p[0]) * s, p[1] + (q[1] - p[1]) * s];
  const [a, b] = [at(s1), at(s2)];
  svg.arrow(...a, ...b, { color: FORCE, width: 4.5, head: 18 });
  svg.text((a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy, label, {
    size: 22,
    math: false,
    weight: 'bold',
  });
}

/** Hanging load: hook and ring below a pulley axle at (x, y), then a weight. */
function load(svg, x, y) {
  svg.line(x, y, x, y + 70, { color: STEEL_EDGE, width: 4 });
  svg.circle(x, y + 80, 9, { fill: 'none', stroke: '#444444', width: 3.5 });
  svg.polygon(
    [
      [x - 32, y + 92],
      [x + 32, y + 92],
      [x + 46, y + 160],
      [x - 46, y + 160],
    ],
    { fill: '#bfc1c5', stroke: STEEL_EDGE, width: 1.5 }
  );
}

/** Free-body diagram: weight down from a dot, n tension arrows fanning upward. */
function pulleyFbd(svg, x, n) {
  const y = 410;
  svg.arrow(x, y, x, 578, { color: BLACK, width: 1.6, head: 11 });
  svg.text(x + 16, 500, 'w', { size: 22, math: false, weight: 'bold', anchor: 'start' });
  for (let k = 0; k < n; k += 1) {
    const off = k - (n - 1) / 2;
    svg.arrow(x + off * 5, y - 8, x + off * 17, 300, { color: BLACK, width: 1.6, head: 10 });
    svg.text(x + off * 17, 284, 'T', { size: 22, math: false, weight: 'bold' });
  }
  svg.circle(x, y, 6, { fill: '#9b1b1b' });
}

/** Ceiling beam with a bracket holding a pulley axle at (x, y). */
function ceilingMount(svg, x, y) {
  svg.rect(x - 95, 6, 190, 32, { fill: '#c08a4a', stroke: '#8a5e2c', width: 1.5 });
  svg.polygon(
    [
      [x - 26, 38],
      [x + 26, 38],
      [x + 7, y],
      [x - 7, y],
    ],
    { fill: '#a9acb1', stroke: STEEL_EDGE, width: 1.5 }
  );
}

/** Point on a circle at math angle `deg` (y up), radius r. */
const onCircle = (c, r, deg) => [c[0] + r * Math.cos(rad(deg)), c[1] - r * Math.sin(rad(deg))];

/** A force arrow, grouped so its point of application can be checked separately. */
function machineForce(svg, name, from, to, labelAt, { color = BLACK, dash } = {}) {
  svg.add(`<g data-force="${name}">`);
  svg.arrow(...from, ...to, { color, width: 4, head: 14, dash });
  svg.text(...labelAt, name === 'w' ? 'w' : name === 'N' ? '**N**' : `**F**_{${name}}`, {
    size: 25,
  });
  svg.add('</g>');
}

/** Horizontal perpendicular distance between two vertical lines of action. */
function machineArm(svg, x1, x2, y, label) {
  svg.add(`<g data-arm="${label}">`);
  svg.line(x1, y - 9, x1, y + 9, { color: BLACK });
  svg.line(x2, y - 9, x2, y + 9, { color: BLACK });
  svg.arrow(x1 + 1, y, x2 - 1, y, { color: BLACK, width: 1.5, head: 9, start: true });
  svg.text((x1 + x2) / 2, y + 24, label, { size: 24 });
  svg.add('</g>');
}

/** Parallel vertical forces, with the same relative lengths as in the scene. */
function machineFbd(svg, x, y, forces) {
  svg.add('<g data-diagram="fbd">');
  svg.text(x, y - 160, 'Free-body diagram', { size: 20, math: false });
  for (const [name, offset, length] of forces) {
    machineForce(
      svg,
      name,
      [x + offset, y],
      [x + offset, y - length],
      [x + offset + (offset < 0 ? (name === 'pivot' ? -50 : -28) : 30), y - length / 2],
      { color: name === 'i' ? FORCE : BLACK }
    );
  }
  svg.circle(x, y, 6, { fill: '#9b1b1b' });
  svg.add('</g>');
}

export default {
  // 9.5 — nail puller as a lever with large mechanical advantage
  Figure_09_05_01: () => {
    const svg = new Svg({
      width: 740,
      height: 670,
      title: 'Nail puller lever',
      desc: 'The hand pushes down with F_i at the long handle. The puller rests directly on the plank at the pivot, which supplies upward N. The nail pushes down on the claw with F_n. Horizontal perpendicular arms l_i and l_o straddle the pivot, with l_i much longer. The dashed upward F_o acts on the nail, not on the puller, and equals F_n in magnitude. The separate free-body diagram includes only the three forces on the puller.',
    });
    const handle = [100, 240];
    const pivot = [445, 444];
    const nail = [500, 420];
    // Use one force scale: F_i l_i = F_n l_o and N = F_i + F_n.
    const fi = 28;
    const fn = (fi * (pivot[0] - handle[0])) / (nail[0] - pivot[0]);
    const normal = fi + fn;
    const guide = { color: '#888888', width: 1.2, dash: '5 4' };

    svg.add('<g data-diagram="puller">');
    svg.rect(45, pivot[1], 650, 62, { fill: WOOD, stroke: WOOD_EDGE, width: 2 });
    for (let x = 65; x < 670; x += 45) {
      svg.line(x, 460, x + 22, 490, { color: WOOD_EDGE, width: 0.8 });
    }
    svg.rect(nail[0] - 4, nail[1], 8, 65, { fill: STEEL, stroke: STEEL_EDGE });
    svg.ellipse(...nail, 14, 5, { fill: STEEL, stroke: STEEL_EDGE });
    // The rounded heel touches the plank; the claw reaches under the nail head.
    svg.path('M 80 268 Q 85 235 100 240 L 417 420 Q 436 437 445 435 Q 469 432 500 425', {
      color: '#5a6268',
      width: 18,
    });
    svg.line(488, 421, 506, 419, { color: '#5a6268', width: 5 });
    svg.polygon(
      [
        [57, 197],
        [80, 175],
        [119, 214],
        [96, 244],
      ],
      {
        fill: '#f4c2a0',
        stroke: '#d4a280',
        width: 1.5,
      }
    );
    svg.ellipse(114, 238, 27, 19, { fill: '#f4c2a0', stroke: '#d4a280', width: 1.5 });
    for (let x = 105; x <= 129; x += 8) {
      svg.line(x, 231, x + 5, 249, { color: '#d4a280', width: 1.2 });
    }

    machineForce(svg, 'i', [handle[0], handle[1] - fi], handle, [65, 218], { color: FORCE });
    machineForce(svg, 'n', [nail[0], nail[1] - fn], nail, [535, 330], { color: FORCE });
    machineForce(svg, 'N', pivot, [pivot[0], pivot[1] - normal], [412, 320]);
    machineForce(svg, 'o', [nail[0], nail[1] + fn], nail, [535, 545], {
      color: FORCE,
      dash: '7 5',
    });
    svg.text(610, 590, 'Force on nail', { size: 19, math: false });
    svg.line(handle[0], 280, handle[0], 550, guide);
    svg.line(pivot[0], 450, pivot[0], 630, guide);
    machineArm(svg, handle[0], pivot[0], 535, 'l_i');
    machineArm(svg, pivot[0], nail[0], 625, 'l_o');
    svg.circle(...pivot, 5, { fill: '#d4a017', stroke: '#8b6914' });
    svg.text(365, 485, 'Pivot', { size: 19, math: false });
    svg.leader(390, 477, 440, 447);
    svg.add('</g>');
    machineFbd(svg, 625, 200, [
      ['i', -18, -fi * 0.6],
      ['n', 18, -fn * 0.6],
      ['N', 0, normal * 0.6],
    ]);
    return svg.render();
  },

  // 9.5 — wheelbarrow and shovel as levers
  Figure_09_05_02: () => {
    const svg = new Svg({
      width: 1080,
      height: 900,
      title: 'Wheelbarrow and shovel as levers',
      desc: '(a) The wheelbarrow load at CG lies between the handles and the wheel axle. F_i and ground reaction N point up; weight w points down. R_i is longer than R_o, giving MA greater than one. (b) Two hands hold a shovel: the right hand at the handle end is the pivot and pushes down, while the hand nearer the blade supplies upward F_i. The load weight points down beyond the input, with R_i shorter than R_o and MA less than one. Separate free-body diagrams show the same force directions. F_o is the upward force supporting each load and equals w in magnitude.',
    });
    const guide = { color: '#888888', width: 1.2, dash: '5 4' };
    const wheel = [560, 320];
    const handle = [100, 220];
    const cg = [500, 210];
    const w = 184;
    const fi = (w * (wheel[0] - cg[0])) / (wheel[0] - handle[0]);
    const normal = w - fi;

    svg.text(345, 30, '(a) Wheelbarrow: MA > 1', { size: 24, math: false });
    svg.add('<g data-diagram="wheelbarrow">');
    svg.rect(45, 365, 650, 24, { fill: '#e4e9cc' });
    svg.line(45, 365, 695, 365, { color: '#6c9248', width: 2 });
    svg.circle(...wheel, 45, { fill: '#4a4a4a', stroke: BLACK, width: 2.5 });
    svg.circle(...wheel, 34, { fill: '#e8e8e8', stroke: BLACK });
    svg.circle(...wheel, 9, { fill: STEEL, stroke: BLACK });
    svg.path('M 270 250 L 285 304 Q 295 326 311 304 L 350 265', { color: STEEL_EDGE, width: 9 });
    svg.line(75, 215, 560, 300, { color: WOOD_EDGE, width: 11, cap: 'round' });
    svg.line(560, 270, ...wheel, { color: WOOD_EDGE, width: 12 });
    svg.polygon(
      [
        [260, 160],
        [625, 160],
        [555, 270],
        [300, 235],
      ],
      {
        fill: '#c94c38',
        stroke: '#8b3426',
        width: 2,
      }
    );
    svg.path('M 440 159 L 450 127 L 477 137 L 497 118 L 523 134 L 548 128 L 570 159 Z', {
      fill: '#8b7355',
      color: '#5a4a38',
      width: 1.5,
    });
    svg.circle(...cg, 5, { fill: BLACK });
    svg.text(466, 210, 'CG', { size: 18, math: false });
    machineForce(svg, 'i', [handle[0], handle[1] + fi], handle, [65, 250], { color: FORCE });
    machineForce(svg, 'w', [cg[0], cg[1] - w], cg, [530, 77]);
    machineForce(svg, 'N', [wheel[0], 365], [wheel[0], 365 - normal], [590, 300]);
    svg.text(626, 329, 'Pivot', { size: 18, math: false });
    svg.leader(608, 325, 571, 320);
    svg.line(handle[0], 260, handle[0], 414, guide);
    svg.line(wheel[0], 370, wheel[0], 465, guide);
    svg.line(cg[0], 220, cg[0], 465, guide);
    machineArm(svg, handle[0], wheel[0], 405, 'R_i');
    machineArm(svg, cg[0], wheel[0], 455, 'R_o');
    svg.add('</g>');
    machineFbd(svg, 850, 225, [
      ['i', -18, fi * 0.8],
      ['N', 0, normal * 0.8],
      ['w', 18, -w * 0.8],
    ]);
    svg.text(850, 433, 'Load: F_o = w', { size: 23 });

    // Horizontal shovel: hand positions and CG also fix the lever-arm ratio.
    const pivot = [110, 680];
    const input = [330, 680];
    const loadPoint = [560, 665];
    const shovelFi = 132;
    const shovelW = (shovelFi * (input[0] - pivot[0])) / (loadPoint[0] - pivot[0]);
    const reaction = shovelFi - shovelW;
    svg.text(345, 510, '(b) Shovel: MA < 1', { size: 24, math: false });
    svg.add('<g data-diagram="shovel">');
    svg.line(...pivot, 530, 680, { color: WOOD_EDGE, width: 12, cap: 'round' });
    svg.rect(110, 673, 75, 14, { fill: '#c94c38', stroke: '#8b3426', rx: 5 });
    svg.polygon(
      [
        [515, 668],
        [619, 650],
        [648, 687],
        [535, 701],
      ],
      {
        fill: STEEL,
        stroke: STEEL_EDGE,
        width: 2,
      }
    );
    svg.path('M 527 668 L 530 642 L 549 628 L 568 638 L 587 634 L 608 662 Z', {
      fill: '#b59b72',
      color: '#8b7355',
      width: 1.5,
    });
    for (const [hx, hy] of [pivot, input]) {
      svg.polygon(
        [
          [hx - 32, hy - 55],
          [hx - 7, hy - 65],
          [hx + 20, hy - 12],
          [hx - 4, hy + 3],
        ],
        {
          fill: '#f4c2a0',
          stroke: '#d4a280',
          width: 1.5,
        }
      );
      svg.ellipse(hx, hy, 27, 17, { fill: '#f4c2a0', stroke: '#d4a280', width: 1.5 });
      for (let dx = -12; dx <= 12; dx += 8) {
        svg.line(hx + dx, hy - 7, hx + dx + 3, hy + 10, { color: '#d4a280', width: 1.2 });
      }
    }
    machineForce(svg, 'i', input, [input[0], input[1] - shovelFi], [365, 585], { color: FORCE });
    machineForce(svg, 'pivot', pivot, [pivot[0], pivot[1] + reaction], [63, 722]);
    machineForce(svg, 'w', loadPoint, [loadPoint[0], loadPoint[1] + shovelW], [592, 716]);
    svg.circle(...loadPoint, 5, { fill: BLACK });
    svg.text(598, 619, 'CG', { size: 18, math: false });
    svg.leader(586, 631, 565, 660);
    svg.circle(...pivot, 5, { fill: '#d4a017', stroke: '#8b6914' });
    svg.text(102, 589, 'Pivot', { size: 18, math: false });
    svg.leader(122, 600, 111, 674);
    for (const [x, y] of [pivot, input, loadPoint]) svg.line(x, y + 80, x, 848, guide);
    machineArm(svg, pivot[0], input[0], 787, 'R_i');
    machineArm(svg, pivot[0], loadPoint[0], 840, 'R_o');
    svg.add('</g>');
    machineFbd(svg, 850, 710, [
      ['i', 0, shovelFi],
      ['pivot', -18, -reaction],
      ['w', 18, -shovelW],
    ]);
    svg.text(850, 842, 'Load: F_o = w', { size: 23 });
    return svg.render();
  },

  // 9.5 — crank, car axle, and single pulley
  Figure_09_05_03: () => {
    const svg = new Svg({
      width: 1080,
      height: 560,
      title: 'Crank, car axle, and pulley as simple machines',
      desc: '(a) A crank with a long input radius R_i and a short but nonzero output shaft radius R_o. Both delivered forces are tangential and drive clockwise rotation; F_o is the force on the driven shaft. (b) A small axle drives a larger wheel: F_i is tangential at the top of the axle and F_o is the leftward force delivered to the road at the bottom of the wheel. Both radii are perpendicular to their forces. (c) A single fixed pulley carries one continuous rope over its upper rim, with the input pulled down on the left and a connected load supported on the right. Equal lever arms give F_i = F_o = T and MA = 1.',
    });
    const guide = { color: '#888888', width: 1.2, dash: '5 4' };
    const center = [170, 260];
    const ri = 110;
    const ro = 25;
    svg.text(170, 35, '(a) Crank', { size: 24, math: false });
    svg.text(170, 73, 'MA > 1', { size: 23, math: false });
    svg.add('<g data-diagram="crank">');
    svg.circle(...center, ri, { fill: 'none', stroke: '#cccccc', width: 2, dash: '8 6' });
    svg.line(...center, center[0], center[1] - ri, { color: STEEL_EDGE, width: 14, cap: 'round' });
    svg.circle(...center, ro, { fill: STEEL, stroke: STEEL_EDGE, width: 2 });
    svg.circle(...center, 5, { fill: BLACK });
    svg.circle(center[0], center[1] - ri, 16, { fill: '#e74c3c', stroke: '#c0392b', width: 2 });
    svg.ellipse(center[0] - 12, center[1] - ri, 26, 20, {
      fill: '#f4c2a0',
      stroke: '#d4a280',
      width: 1.5,
    });
    machineForce(svg, 'i', [170, 150], [206, 150], [238, 143], { color: FORCE });
    machineForce(svg, 'o', [170, 235], [170 + (36 * ri) / ro, 235], [292, 210]);
    svg.line(50, 150, 157, 150, guide);
    svg.line(50, 260, 235, 260, guide);
    svg.add('<g data-arm="R_i">');
    svg.vdimension(55, 150, 260, '');
    svg.text(29, 205, 'R_i', { size: 23 });
    svg.add('</g>');
    svg.add('<g data-arm="R_o">');
    svg.vdimension(225, 235, 260, '', { tick: 16 });
    svg.text(254, 255, 'R_o', { size: 23 });
    svg.add('</g>');
    svg.text(170, 398, 'Pivot', { size: 18, math: false });
    svg.leader(170, 382, 170, 270);
    svg.lines(180, 450, ['F_o acts on the driven shaft', '(reaction on crank not shown)'], {
      size: 17,
      math: false,
      gap: 24,
    });
    svg.add('</g>');

    const axle = [540, 260];
    const axleR = 24;
    const wheelR = 108;
    svg.text(540, 35, '(b) Wheel and axle', { size: 24, math: false });
    svg.text(540, 73, 'MA < 1', { size: 23, math: false });
    svg.add('<g data-diagram="axle">');
    svg.circle(...axle, wheelR, { fill: '#e8e8e8', stroke: BLACK, width: 2.5 });
    svg.circle(...axle, wheelR - 15, { fill: 'none', stroke: '#999999' });
    for (let angle = 0; angle < 360; angle += 60) {
      svg.line(...onCircle(axle, axleR + 4, angle), ...onCircle(axle, wheelR - 15, angle), {
        color: '#999999',
        width: 2.5,
      });
    }
    svg.circle(...axle, axleR, { fill: STEEL, stroke: STEEL_EDGE, width: 2 });
    svg.circle(...axle, 4, { fill: BLACK });
    svg.rect(420, 368, 250, 27, { fill: '#a8875f', stroke: '#8b6f47' });
    svg.line(420, 368, 670, 368, { color: '#6c9248', width: 2 });
    machineForce(svg, 'i', [540, 260 - axleR], [630, 260 - axleR], [603, 211], { color: FORCE });
    machineForce(
      svg,
      'o',
      [540, 260 + wheelR],
      [540 - (90 * axleR) / wheelR, 260 + wheelR],
      [493, 343]
    );
    for (const y of [260 - axleR, 260, 260 + wheelR]) svg.line(545, y, 672, y, guide);
    svg.add('<g data-arm="R_i">');
    svg.vdimension(663, 260 - axleR, 260, '', { tick: 16 });
    svg.text(692, 245, 'R_i', { size: 23 });
    svg.add('</g>');
    svg.add('<g data-arm="R_o">');
    svg.vdimension(663, 260, 260 + wheelR, '', { tick: 16 });
    svg.text(692, 314, 'R_o', { size: 23 });
    svg.add('</g>');
    svg.lines(540, 450, ['F_o acts on the road', '(reaction on wheel not shown)'], {
      size: 17,
      math: false,
      gap: 24,
    });
    svg.add('</g>');

    const p = [900, 240];
    const wrap = 54;
    svg.text(900, 35, '(c) Fixed pulley', { size: 24, math: false });
    svg.text(900, 73, 'MA = 1', { size: 23, math: false });
    svg.add('<g data-diagram="pulley">');
    svg.rect(860, 105, 80, 22, { fill: '#c08a4a', stroke: '#8a5e2c' });
    svg.line(900, 127, ...p, { color: STEEL_EDGE, width: 8 });
    pulley(svg, ...p, 50);
    // One continuous rope: down the left, over the top, down the right to the load.
    rope(svg, `M 846 390 L 846 240 A ${wrap} ${wrap} 0 0 1 954 240 L 954 420`);
    svg.rect(932, 420, 44, 55, { fill: '#bfc1c5', stroke: STEEL_EDGE, width: 1.5 });
    machineForce(svg, 'i', [846, 330], [846, 390], [815, 360], { color: FORCE });
    machineForce(svg, 'o', [954, 420], [954, 360], [990, 390]);
    machineArm(svg, p[0] - wrap, p[0], p[1], 'R_i');
    machineArm(svg, p[0], p[0] + wrap, p[1], 'R_o');
    svg.text(900, 520, 'F_i = F_o = T', { size: 25 });
    svg.add('</g>');
    return svg.render();
  },

  // 9.2 — torque on a door depends on F, r, and the angle between them
  Figure_09_02_01: () => {
    const svg = new Svg({
      width: 960,
      height: 775,
      title: 'Torque on a door seen from above',
      desc: 'Six overhead views of a door hinged on the left and opened 25° from the wall. (a) A force F pushes perpendicular to the door at distance r from the hinge, so r = r⊥ and the torque is counterclockwise. (b) A smaller force F′ at the same point gives a smaller counterclockwise torque. (c) The same force at a smaller distance r′ = r′⊥ gives a smaller counterclockwise torque. (d) The force −F, opposite to (a), gives a clockwise torque. (e) A horizontal force of the same magnitude at the same point makes angle θ with the door; the perpendicular distance from the hinge to its line of action is r⊥ = r sin θ, so the counterclockwise torque is smaller. (f) A force pulling straight along the door away from the hinge has θ = 0° and r⊥ = 0, so it produces no torque.',
    });
    const deg = 25;
    const r = 225;
    const panel = (col, row) => [190 + col * 455, 200 + row * 245];
    const caption = (H, label) => svg.text(H[0] + 100, H[1] + 62, label, { size: 20, math: false });
    const push = (d, u, len, sign = 1) => {
      // Perpendicular push on the face; sign = 1 pushes toward +v (counterclockwise).
      const tip = d.at(u, -sign * 12);
      const tail = d.at(u, -sign * (12 + len));
      svg.arrow(...tail, ...tip, { color: FORCE, width: 4, head: 18 });
      return tail;
    };
    // Animation: each door starts from rest and turns with angular
    // acceleration in proportion to its torque, (a) turning 10° in 2.5 s. In
    // (e) the torque follows r⊥ = r sin θ as the door turns. The doors hold,
    // then fade out and reappear at the start, since swinging back would look
    // like a torque in the opposite direction.
    const [hold, pushT, rest, fade, T] = [0.5, 2.5, 1, 0.4, 5.5];
    const step = 0.25;
    const swing = (torque, draw) => {
      const c = (2 * 10) / pushT ** 2; // degrees per second squared for the torque in (a)
      const sub = 40;
      let [a, w] = [deg, 0];
      const angles = [a];
      for (let k = 0; k < pushT / step; k += 1) {
        for (let j = 0; j < sub; j += 1) {
          w += c * torque(a) * (step / sub);
          a += w * (step / sub);
        }
        angles.push(a);
      }
      const times = angles.map((_, k) => hold + k * step);
      const out = hold + pushT + rest + fade;
      const frames = [deg, ...angles, a].map(f => [f, 1]);
      svg.animated(
        ([f, shown]) => {
          svg.add(`<g opacity="${shown}">`);
          draw(f);
          svg.add('</g>');
        },
        [...frames, [a, 0], [deg, 0], [deg, 1], [deg, 1]],
        {
          dur: `${T}s`,
          keyTimes: [0, ...times, out - fade, out, out + 0.001, out + fade, T].map(t => t / T),
        }
      );
    };
    // (a)
    let H = panel(0, 0);
    swing(
      () => 1,
      a => {
        const d = door(svg, H, { deg: a });
        doorDimension(svg, d, r, 40, 'r = r_⊥');
        const tail = push(d, r, 80);
        svg.text(tail[0] + 18, tail[1], '**F**', { size: 24, anchor: 'start' });
      }
    );
    caption(H, '(a)');
    // (b)
    H = panel(0, 1);
    swing(
      () => 48 / 80,
      a => {
        const d = door(svg, H, { deg: a });
        doorDimension(svg, d, r, 40, 'r = r_⊥');
        const tail = push(d, r, 48);
        svg.text(tail[0] + 18, tail[1], '**F′**', { size: 24, anchor: 'start' });
      }
    );
    caption(H, '(b)');
    // (c)
    H = panel(0, 2);
    swing(
      () => 140 / r,
      a => {
        const d = door(svg, H, { deg: a });
        doorDimension(svg, d, 140, 40, 'r′ = r′_⊥');
        const tail = push(d, 140, 80);
        svg.text(tail[0] + 18, tail[1], '**F**', { size: 24, anchor: 'start' });
      }
    );
    caption(H, '(c)');
    // (d)
    H = panel(1, 0);
    swing(
      () => -1,
      a => {
        const d = door(svg, H, { deg: a });
        doorDimension(svg, d, r, -40, 'r = r_⊥', { labelV: -62 });
        const tail = push(d, r, 80, -1);
        svg.text(tail[0] - 14, tail[1], '−**F**', { size: 24, anchor: 'end' });
      }
    );
    caption(H, '(d)');
    // (e) A horizontal force; θ is measured between the door and the line of action.
    H = panel(1, 1);
    const guide = { color: BLACK, width: 1.4, dash: '6 4' };
    swing(
      a => Math.sin(rad(a)),
      a => {
        const d = door(svg, H, { deg: a });
        const P = d.at(r, 0);
        svg.line(H[0], P[1], P[0], P[1], guide);
        svg.line(...H, H[0], P[1], guide);
        svg.arrow(P[0] + 92, P[1], P[0] + 2, P[1], { color: FORCE, width: 4, head: 18 });
        svg.text(P[0] + 60, P[1] + 26, '**F**', { size: 24 });
        svg.arc(...P, 80, 180, 180 + a, { color: BLACK, width: 1.6 });
        svg.text(P[0] - 100, P[1] + 14, 'θ', { size: 22 });
        svg.text(H[0] - 10, (H[1] + P[1]) / 2, 'r_⊥ = r sin θ', { size: 22, anchor: 'end' });
        doorDimension(svg, d, r, -40, 'r', { labelV: -60 });
      }
    );
    caption(H, '(e)');
    // (f) A pull straight along the door: no torque, so no animation.
    H = panel(1, 2);
    const d = door(svg, H, { deg });
    const Q = d.at(r, 0);
    svg.line(...H, ...Q, guide);
    svg.arrow(...Q, ...d.at(r + 95, 0), { color: FORCE, width: 4, head: 18 });
    svg.text(...d.at(r + 80, 28), '**F**', { size: 24 });
    doorDimension(svg, d, r, 40, 'r');
    svg.text(H[0] - 12, H[1] - 26, 'θ = 0°', { size: 22, anchor: 'end' });
    svg.text(H[0] + 150, H[1] + 22, 'r_⊥ = 0', { size: 22, anchor: 'start' });
    caption(H, '(f)');
    return svg.render();
  },
  // 9.3 Problem — a wall under construction held by 10 braces against the wind
  Figure_09_03_11: () => {
    const svg = new Svg({
      width: 750,
      height: 370,
      title: 'A braced wall in the wind',
      desc: 'A 17.0 m high wall stands on the ground with a horizontal wind force Fwind pushing on its left face. On the right, a brace runs from a point 8.5 m up the wall down to the ground, making a 35° angle with the wall. There are 10 such braces. Heights are drawn to scale.',
    });
    const ground = 242;
    const scale = 240 / 17; // pixels per meter
    const [wx, ww] = [290, 38];
    const top = ground - 17 * scale;
    const contact = ground - 8.5 * scale;
    const foot = wx + ww + (ground - contact) * Math.tan(rad(35));
    svg.rect(0, ground, 700, 42, { fill: '#e8d8bc' });
    for (let x = 18; x < 700; x += 46) {
      svg.line(x, ground + 14, x + 9, ground + 18, { color: '#c49a5a', width: 2 });
      svg.line(x + 22, ground + 30, x + 30, ground + 27, { color: '#b9894a', width: 2 });
    }
    svg.line(0, ground, 700, ground, { color: '#3f9a2b', width: 3 });
    for (let y = top; y < ground - 1; y += 34) {
      svg.rect(wx, y, ww, Math.min(34, ground - y), {
        fill: '#d6d6d6',
        stroke: '#9a9a9a',
        width: 1.5,
      });
    }
    svg.line(wx + ww, contact, foot, ground, { color: '#b5852f', width: 6, cap: 'round' });
    svg.arc(wx + ww, contact, 42, 270, 305, { color: BLACK, width: 1.8 });
    svg.text(wx + ww + 22, contact + 98, '35°', { size: 24, math: false, anchor: 'start' });

    svg.arrow(150, 115, wx - 3, 115, { color: FORCE, width: 4, head: 22 });
    svg.text(152, 92, '**F**_{wind}', { size: 26, anchor: 'start', math: false });
    const guide = { color: BLACK, width: 1.4, dash: '7 5' };
    svg.line(wx + ww, top, 700, top, guide);
    svg.line(wx + ww + 4, contact, 530, contact, guide);
    svg.vdimension(510, contact, ground, '', { tick: 22 });
    svg.text(528, (contact + ground) / 2, '8.5 \\rm{m}', { size: 26, anchor: 'start' });
    svg.vdimension(684, top, ground, '', { tick: 22 });
    svg.text(666, (top + ground) / 2, '17.0 \\rm{m}', { size: 26, anchor: 'end' });
    svg.text(300, 348, '10 braces', { size: 24, math: false });
    svg.squiggle(338, 326, foot - 3, ground - 2, { waves: 1, amp: 6 });
    return svg.render();
  },

  // 9.3 Problem — a sandwich-board sign held by a chain
  Figure_09_03_14: () => {
    const svg = new Svg({
      width: 590,
      height: 650,
      title: 'A sandwich-board sign',
      desc: 'Two uniform boards are hinged together at the top and stand on the sidewalk as an upside-down V, their feet 1.10 m apart. The hinge is 1.30 m above the sidewalk. A horizontal chain joins the two boards 0.50 m below the hinge. Each board’s center of gravity, CG, is at its center. Drawn to scale.',
    });
    const scale = 400; // pixels per meter
    const H = [240, 30];
    const ground = H[1] + 1.3 * scale;
    const halfBase = 0.55 * scale;
    const legs = [-1, 1].map(s => [H[0] + s * halfBase, ground]);
    for (const F of legs) {
      const len = Math.hypot(F[0] - H[0], F[1] - H[1]);
      const [nx, ny] = [(F[1] - H[1]) / len, -(F[0] - H[0]) / len];
      const w = 17;
      svg.polygon(
        [
          [H[0] + nx * w, H[1] + ny * w],
          [F[0] + nx * w, F[1] + ny * w],
          [F[0] - nx * w, F[1] - ny * w],
          [H[0] - nx * w, H[1] - ny * w],
        ],
        { fill: '#f3d9a4', stroke: '#c9a466', width: 1.5 }
      );
    }
    svg.rect(0, ground, 520, 34, { fill: '#a96c3c', stroke: '#6e4422', width: 1.5 });
    for (let x = 10; x < 520; x += 38) {
      svg.line(x, ground + 32, x + 26, ground + 2, { color: '#6e4422', width: 1.5 });
    }
    // Chain 0.50 m below the hinge, between the boards' center lines.
    const chainY = H[1] + 0.5 * scale;
    const chainHalf = halfBase * (0.5 / 1.3);
    svg.line(H[0] - chainHalf, chainY, H[0] + chainHalf, chainY, {
      color: '#8a8a8a',
      width: 4,
      dash: '3 3',
    });
    svg.circle(...H, 17, { fill: '#6b6b6b', stroke: '#333333', width: 2 });
    svg.line(H[0] - 9, H[1] + 9, H[0] + 9, H[1] - 9, { color: '#dddddd', width: 2 });
    for (const F of legs) {
      const cg = [(H[0] + F[0]) / 2, (H[1] + F[1]) / 2];
      svg.circle(...cg, 7, { fill: '#9b1b1b' });
      svg.text(cg[0] + 22, cg[1] + 10, 'CG', { size: 20, math: false, anchor: 'start' });
    }

    const guide = { color: BLACK, width: 1.4, dash: '6 5' };
    svg.line(H[0] + 20, H[1], 520, H[1], guide);
    svg.vdimension(338, H[1], chainY, '');
    svg.text(352, (H[1] + chainY) / 2, '0.50 \\rm{m}', { size: 24, anchor: 'start' });
    svg.vdimension(492, H[1], ground, '');
    svg.text(504, (H[1] + ground) / 2, '1.30 \\rm{m}', { size: 24, anchor: 'start' });
    svg.line(legs[0][0], ground, legs[0][0], ground + 70, { color: BLACK, width: 1.3 });
    svg.line(legs[1][0], ground, legs[1][0], ground + 70, { color: BLACK, width: 1.3 });
    svg.arrow(legs[0][0] + 1, ground + 60, legs[1][0] - 1, ground + 60, {
      color: BLACK,
      width: 1.5,
      head: 12,
      start: true,
    });
    svg.rect(H[0] - 44, ground + 46, 88, 28, { fill: '#ffffff' });
    svg.text(H[0], ground + 60, '1.10 \\rm{m}', { size: 24 });
    svg.text(70, H[1] + 2, 'Hinge', { size: 22, math: false });
    svg.squiggle(108, H[1] + 2, H[0] - 20, H[1], { waves: 1, amp: 4 });
    svg.text(62, 180, 'Chain', { size: 22, math: false });
    svg.squiggle(98, 182, H[0] - chainHalf + 8, chainY - 6, { waves: 1, amp: 5 });
    svg.lines(250, 470, ['Uniform board', '(CG at center)'], { size: 22, math: false, gap: 28 });
    svg.squiggle(170, 448, 110, 398, { waves: 1, amp: 6 });
    return svg.render();
  },

  // 9.5 — pulley systems with mechanical advantage 2, 3 and 4
  Figure_09_05_04: () => {
    const svg = new Svg({
      width: 1030,
      height: 625,
      title: 'Pulley systems with mechanical advantage 2, 3 and 4',
      desc: 'Three pulley systems lifting a weight, each with its free-body diagram. (a) A rope tied to the fixed upper pulley runs down under a movable pulley carrying the load and back up over the fixed pulley to the free end, pulled with tension T. Two rope segments pull up on the load, so the free-body diagram shows 2T up and w down: MA ≈ 2. (b) With a second small pulley hung from the fixed one, three rope segments support the movable pulley: 3T up, MA ≈ 3. (c) With a small pulley mounted on the movable block and the free end pulled upward, four segments support the load: 4T up, MA ≈ 4.',
    });
    const R = 46;
    const wrap = R + 3;
    // Animation: in every panel the load rises by the same height while a
    // mark on the free end of the rope travels MA times as far. The rope runs
    // on out of the picture, so its drawn free end stays put. A dashed line
    // marks where the bottom of the load started.
    const lift = 28;
    const [hold, rise, rest, T] = [0.6, 3, 1.5, 6.5];
    const lifts = [0, 0, 0.25, 0.5, 0.75, 1, 1, 0].map(s => s * lift);
    const keyTimes = [0, hold, hold + rise / 4, hold + rise / 2, hold + (3 * rise) / 4];
    keyTimes.push(hold + rise, hold + rise + rest, T);
    const up = (p, h) => [p[0], p[1] - h];
    const mark = (p, q, from) => {
      // A dark band across the rope, `from` pixels along it from p toward q.
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const [ux, uy] = [(q[0] - p[0]) / len, (q[1] - p[1]) / len];
      const [mx, my] = [p[0] + ux * from, p[1] + uy * from];
      svg.line(mx + uy * 9, my - ux * 9, mx - uy * 9, my + ux * 9, { color: '#7a1f1f', width: 4 });
    };
    const lifted = draw => {
      svg.animated(draw, lifts, { dur: `${T}s`, keyTimes: keyTimes.map(t => t / T) });
    };
    const startLine = (x, B) => {
      svg.motionGroup(
        svg.capture(() =>
          svg.line(x - 70, B[1] + 160, x + 70, B[1] + 160, {
            color: BLACK,
            width: 1.4,
            dash: '6 4',
          })
        )
      );
    };
    // (a)
    let A = [135, 110];
    let B = [135, 410];
    ceilingMount(svg, ...A);
    pulley(svg, ...A, R);
    let K = [A[0], A[1] + R + 4];
    let leave = onCircle(A, wrap, 120);
    let free = [leave[0] - 112 * Math.cos(rad(30)), leave[1] + 112 * Math.sin(rad(30))];
    lifted((h, moving) => {
      const Bh = up(B, h);
      pulley(svg, ...Bh, R);
      load(svg, ...Bh);
      rope(
        svg,
        `M ${K[0]} ${K[1]} L ${Bh[0] - wrap} ${Bh[1]} A ${wrap} ${wrap} 0 0 0 ${Bh[0] + wrap} ${Bh[1]} L ${A[0] + wrap} ${A[1]} A ${wrap} ${wrap} 0 0 0 ${leave[0]} ${leave[1]} L ${free[0]} ${free[1]}`
      );
      if (moving) mark(leave, free, 10 + 2 * h);
      svg.circle(...K, 6, { fill: '#c9a45c', stroke: '#8a6a2c', width: 1.5 });
      tension(svg, leave, free, 0.45, 1, { dx: -4, dy: -22 });
      tension(svg, [Bh[0] - wrap, Bh[1]], up(K, h), 0.15, 0.5);
      tension(svg, [Bh[0] + wrap, Bh[1]], [A[0] + wrap, A[1] - h], 0.15, 0.45, { dx: 20 });
    });
    startLine(B[0], B);
    svg.text(200, 160, 'MA ≈ 2', { size: 22, math: false, anchor: 'start' });
    pulleyFbd(svg, 262, 2);
    svg.text(B[0], 610, '(a)', { size: 20, math: false });

    // (b)
    A = [500, 110];
    B = [500, 410];
    const C = [500, 222];
    const r = 28;
    ceilingMount(svg, ...A);
    svg.line(...A, ...C, { color: '#a9acb1', width: 12 });
    pulley(svg, ...A, R);
    pulley(svg, ...C, r);
    leave = onCircle(A, wrap, 120);
    free = [leave[0] - 112 * Math.cos(rad(30)), leave[1] + 112 * Math.sin(rad(30))];
    lifted((h, moving) => {
      const Bh = up(B, h);
      pulley(svg, ...Bh, R);
      load(svg, ...Bh);
      const Kh = [Bh[0] + 12, Bh[1] - R - 3];
      rope(
        svg,
        `M ${free[0]} ${free[1]} L ${leave[0]} ${leave[1]} A ${wrap} ${wrap} 0 0 1 ${A[0] + wrap} ${A[1]} L ${Bh[0] + wrap} ${Bh[1]} A ${wrap} ${wrap} 0 0 1 ${Bh[0] - wrap} ${Bh[1]} L ${C[0] - r - 3} ${C[1]} A ${r + 3} ${r + 3} 0 0 1 ${C[0] + r + 3} ${C[1]} L ${Kh[0]} ${Kh[1]}`
      );
      if (moving) mark(leave, free, 10 + 3 * h);
      svg.circle(...Kh, 6, { fill: '#c9a45c', stroke: '#8a6a2c', width: 1.5 });
      tension(svg, leave, free, 0.45, 1, { dx: -4, dy: -22 });
      tension(svg, [Bh[0] - wrap, Bh[1]], [C[0] - r - 3, C[1] - h], 0.15, 0.5);
      tension(svg, Kh, [C[0] + r + 3, C[1] - h], 0.1, 0.45, { dx: -16 });
      tension(svg, [Bh[0] + wrap, Bh[1]], [A[0] + wrap, A[1] - h], 0.15, 0.45, { dx: 20 });
    });
    startLine(B[0], B);
    svg.text(565, 160, 'MA ≈ 3', { size: 22, math: false, anchor: 'start' });
    pulleyFbd(svg, 632, 3);
    svg.text(B[0], 610, '(b)', { size: 20, math: false });

    // (c)
    A = [865, 110];
    B = [865, 418];
    const D = [865, 308];
    const rb = 50;
    const rc = 26;
    ceilingMount(svg, ...A);
    pulley(svg, ...A, R);
    K = [A[0], A[1] + R + 4];
    const top = [B[0] - rb - 30, 225];
    const reach = Math.hypot(top[0] - (B[0] - rb - 3), top[1] - B[1]);
    lifted((h, moving) => {
      const [Bh, Dh] = [up(B, h), up(D, h)];
      svg.line(...Dh, ...Bh, { color: '#a9acb1', width: 12 });
      pulley(svg, ...Dh, rc);
      pulley(svg, ...Bh, rb);
      load(svg, ...Bh);
      const low = [Bh[0] - rb - 3, Bh[1]];
      rope(
        svg,
        `M ${K[0]} ${K[1]} L ${Dh[0] + rc + 3} ${Dh[1]} A ${rc + 3} ${rc + 3} 0 0 1 ${Dh[0] - rc - 3} ${Dh[1]} L ${A[0] - wrap} ${A[1]} A ${wrap} ${wrap} 0 0 1 ${A[0] + wrap} ${A[1]} L ${Bh[0] + rb + 3} ${Bh[1]} A ${rb + 3} ${rb + 3} 0 0 1 ${low[0]} ${low[1]} L ${top[0]} ${top[1]}`
      );
      // The free run shortens as the block rises; its arrow and mark keep
      // their distances from the top.
      const len = Math.hypot(top[0] - low[0], top[1] - low[1]);
      if (moving) mark(top, low, reach - 15 - 4 * h);
      svg.circle(...K, 6, { fill: '#c9a45c', stroke: '#8a6a2c', width: 1.5 });
      tension(svg, low, top, 1 - (0.65 * reach) / len, 1 + (0.08 * reach) / len, { dx: -18 });
      tension(svg, [Dh[0] - rc - 3, Dh[1]], [A[0] - wrap, A[1] - h], 0.15, 0.5, { dx: -20 });
      tension(svg, [Dh[0] + rc + 3, Dh[1]], up(K, h), 0.12, 0.5, { dx: -14, dy: -6 });
      tension(svg, [Bh[0] + rb + 3, Bh[1]], [A[0] + wrap, A[1] - h], 0.15, 0.45, { dx: 20 });
    });
    startLine(B[0], B);
    svg.text(925, 200, 'MA ≈ 4', { size: 22, math: false, anchor: 'start' });
    pulleyFbd(svg, 988, 4);
    svg.text(B[0], 610, '(c)', { size: 20, math: false });
    return svg.render();
  },
};
