/** Chapter 10: rotational motion, energy, collisions, and torque vectors. */
import { COLORS, Svg, rad } from './svg.js';

const INK = COLORS.black;
const FORCE = '#d52350';
const AXIS = '#438a32';
const PURPLE = '#c7b2d9';
const EDGE = '#77528c';
const GUIDE = { color: '#777777', width: 1.3, dash: '6 5' };
const WOOD = '#dcb878';
const WOOD_EDGE = '#a7803d';
const point = (cx, cy, r, angle) => [cx + r * Math.cos(rad(angle)), cy - r * Math.sin(rad(angle))];

function arcArrow(svg, cx, cy, r, start, end, color = COLORS.blue) {
  const direction = Math.sign(end - start);
  // Svg.arc traces counterclockwise; reverse the undirected arc for clockwise motion.
  const stop = end - direction * 3;
  svg.arc(cx, cy, r, direction > 0 ? start : stop, direction > 0 ? stop : start, {
    color,
    width: 2.5,
  });
  const headAngle = (18 / r) * (180 / Math.PI);
  svg.arrow(...point(cx, cy, r, end - direction * headAngle), ...point(cx, cy, r, end), {
    color,
    width: 2.5,
    head: 10,
  });
}

function uniformRotation() {
  const svg = new Svg({
    width: 660,
    height: 480,
    title: 'Angular displacement and tangential velocity in uniform circular motion',
    desc: 'Two radii of a disk enclose angular displacement Δθ. Equal-speed velocity vectors are tangent to the circle at both endpoints and point counterclockwise. Angular speed is ω = v/r.',
  });
  const [cx, cy, r] = [265, 240, 155];
  svg.circle(cx, cy, r, { fill: '#e7edf2', stroke: '#7a8995', width: 2 });
  [0, 45].forEach(a => {
    const p = point(cx, cy, r, a);
    svg.line(cx, cy, ...p, { width: 2.5 });
    const t = rad(a + 90);
    svg.arrow(...p, p[0] + 95 * Math.cos(t), p[1] - 95 * Math.sin(t), {
      color: COLORS.velocity,
      width: 3.5,
    });
    svg.text(p[0] + 105 * Math.cos(t) + 17, p[1] - 105 * Math.sin(t), 'v', {
      size: 26,
      color: COLORS.velocity,
    });
  });
  svg.circle(cx, cy, 5, { fill: INK });
  svg.text(cx + 80, cy + 20, 'r', { size: 25 });
  svg.arc(cx, cy, 55, 0, 45);
  svg.text(cx + 85, cy - 33, 'Δθ', { size: 25 });
  arcArrow(svg, cx, cy, 113, 125, 285);
  svg.text(165, 415, 'Direction of rotation', { size: 21, math: false });
  svg.text(540, 340, 'ω = v/r', { size: 30 });
  return svg.render();
}

function accelerations(centripetal) {
  const svg = new Svg({
    width: 650,
    height: 490,
    title: centripetal
      ? 'Tangential and centripetal acceleration in circular motion'
      : 'Tangential acceleration changes the speed in circular motion',
    desc: centripetal
      ? 'Velocity is tangent to the circular path. The tangential acceleration aₜ points along the tangent and changes speed; the perpendicular centripetal acceleration a꜀ points toward the center and changes the direction of velocity.'
      : 'A radius r joins the center to a point on the circular path. Velocity v and tangential acceleration aₜ are parallel to the tangent, perpendicular to the radius. Here aₜ points along the velocity and the speed increases.',
  });
  const [cx, cy, r, angle] = [220, 295, 165, 30];
  const p = point(cx, cy, r, angle);
  const normal = [Math.cos(rad(angle)), -Math.sin(rad(angle))];
  const tangent = [-Math.sin(rad(angle)), -Math.cos(rad(angle))];
  // The path stops short of the captions below it.
  svg.arc(cx, cy, r, -28, 155, { color: '#87949d', width: 2 });
  svg.line(cx, cy, ...p, { width: 1.7 });
  svg.circle(cx, cy, 4, { fill: INK });
  svg.circle(...p, 4, { fill: INK });
  svg.text(285, 275, 'r', { size: 24 });
  arcArrow(svg, cx, cy, r, 100, 125, INK);
  // Offset v radially so parallel velocity and acceleration arrows stay legible.
  const vStart = [p[0] - 19 * normal[0], p[1] - 19 * normal[1]];
  svg.arrow(...vStart, vStart[0] + 115 * tangent[0], vStart[1] + 115 * tangent[1], {
    color: COLORS.velocity,
    width: 3.5,
  });
  svg.text(vStart[0] + 125 * tangent[0] - 14, vStart[1] + 125 * tangent[1], 'v', {
    size: 26,
    color: COLORS.velocity,
  });
  svg.add('<g id="tangential-acceleration">');
  svg.arrow(...p, p[0] + 85 * tangent[0], p[1] + 85 * tangent[1], {
    color: COLORS.orange,
    width: 4,
  });
  svg.add('</g>');
  svg.text(p[0] + 67 * tangent[0] + 29, p[1] + 67 * tangent[1] - 8, 'a_t', {
    size: 26,
    color: COLORS.orange,
  });
  if (centripetal) {
    svg.add('<g id="centripetal-acceleration">');
    svg.arrow(...p, p[0] - 100 * normal[0], p[1] - 100 * normal[1], {
      color: COLORS.accel,
      width: 4,
    });
    svg.add('</g>');
    // Above the a_c arrow, clear of the r label below the radius.
    svg.text(
      p[0] - 72 * normal[0] + 24 * tangent[0],
      p[1] - 72 * normal[1] + 24 * tangent[1],
      'a_c',
      {
        size: 26,
        color: COLORS.accel,
      }
    );
    const a = 19;
    svg.polyline(
      [
        [p[0] + a * tangent[0], p[1] + a * tangent[1]],
        [p[0] + a * (tangent[0] - normal[0]), p[1] + a * (tangent[1] - normal[1])],
        [p[0] - a * normal[0], p[1] - a * normal[1]],
      ],
      { color: INK, width: 1.3 }
    );
    svg.lines(345, 418, ['a_t changes speed', 'a_c changes direction'], {
      size: 23,
      math: false,
      gap: 32,
    });
  } else {
    svg.text(345, 430, 'a_t changes speed', { size: 23, math: false });
  }
  return svg.render();
}

function rotationalWork() {
  const svg = new Svg({
    width: 660,
    height: 520,
    title: 'Work done by a tangential force on a rotating disk',
    desc: 'A tangential net force Fₙₑₜ acts perpendicular to radius r. As the disk rotates through θ, the point of application moves a distance Δs along the circular rim. The force is parallel to each infinitesimal displacement, so W = Fₙₑₜ Δs for constant force magnitude.',
  });
  const [cx, cy, r] = [255, 255, 150];
  svg.circle(cx, cy, r, { fill: '#e7edf2', stroke: '#7a8995', width: 2 });
  svg.line(cx, cy, cx + r, cy, { width: 2.5 });
  svg.line(cx, cy, ...point(cx, cy, r, 45), { width: 2.5 });
  svg.circle(cx, cy, 5, { fill: INK });
  svg.arc(cx, cy, 55, 0, 45);
  svg.text(cx + 78, cy - 31, 'θ', { size: 26 });
  svg.text(cx + 76, cy + 21, 'r', { size: 26 });
  arcArrow(svg, cx, cy, 177, 0, 45, INK);
  svg.text(451, 165, 'Δs', { size: 27 });
  svg.arrow(cx + r, cy, cx + r, cy - 107, { color: FORCE, width: 4 });
  svg.text(464, 235, 'F_{net}', { size: 27, color: FORCE });
  svg.polyline(
    [
      [cx + r - 18, cy],
      [cx + r - 18, cy - 18],
      [cx + r, cy - 18],
    ],
    { width: 1.3 }
  );
  arcArrow(svg, cx, cy, 106, 130, 265);
  svg.lines(330, 455, ['F_{net} ∥ Δs,    F_{net} ⟂ r', 'W = F_{net} Δs'], { size: 25, gap: 35 });
  return svg.render();
}

function fraction(svg, x, y, numerator, denominator, width = 100) {
  svg.text(x, y - 17, numerator, { size: 23 });
  svg.line(x - width / 2, y, x + width / 2, y, { width: 1.2 });
  svg.text(x, y + 19, denominator, { size: 23 });
}

function dimension(svg, x1, x2, y, label) {
  svg.line(x1, y - 8, x1, y + 8);
  svg.line(x2, y - 8, x2, y + 8);
  svg.arrow(x1, y, x2, y, { start: true, width: 1.2, head: 8 });
  svg.text((x1 + x2) / 2, y - 16, label, { size: 21 });
}

function cylinder(svg, x1, x2, y, radius, hollow = false) {
  svg.path(
    `M ${x1} ${y - radius} L ${x2} ${y - radius} A 17 ${radius} 0 0 1 ${x2} ${y + radius} L ${x1} ${y + radius} Z`,
    { fill: PURPLE, color: EDGE, width: 2 }
  );
  svg.ellipse(x1, y, 17, radius, { fill: '#ded0e8', stroke: EDGE });
  svg.path(`M ${x2} ${y - radius} A 17 ${radius} 0 0 0 ${x2} ${y + radius}`, { ...GUIDE });
  if (hollow) {
    svg.ellipse(x1, y, 11, radius * 0.6, { fill: '#ffffff', stroke: EDGE });
  }
}

function inertiaChart() {
  const svg = new Svg({
    width: 1000,
    height: 1450,
    title: 'Rotational inertias of ten common objects',
    desc: 'Ten objects with their rotation axes and moments of inertia: hoop about its cylinder axis, annular cylinder about its cylinder axis, solid cylinder about its cylinder axis and about a central diameter, thin rod about its center and one end, solid sphere and thin spherical shell about a diameter, hoop about a diameter, and rectangular slab about a perpendicular central axis. M is total mass, R is radius, ℓ is length, and a and b are slab side lengths. Green dashed lines indicate rotation axes.',
  });
  const labels = [
    ['Hoop about', 'cylinder axis'],
    ['Annular cylinder', 'about cylinder axis'],
    ['Solid cylinder', '(or disk) about', 'cylinder axis'],
    ['Solid cylinder', 'about a central', 'diameter'],
    ['Thin rod about', 'a central axis', '⊥ to its length'],
    ['Thin rod about', 'an end axis', '⊥ to its length'],
    ['Solid sphere about', 'any diameter'],
    ['Thin spherical shell', 'about any diameter'],
    ['Hoop about', 'any diameter'],
    ['Rectangular slab', 'about a central', 'perpendicular axis'],
  ];
  for (let i = 0; i < 10; i += 1) {
    const x = (i % 2) * 500;
    const y = Math.floor(i / 2) * 290;
    svg.add(`<g id="inertia-${i + 1}" transform="translate(${x} ${y})">`);
    svg.lines(235, 45, labels[i], { size: 24, math: false, anchor: 'start', gap: 29 });
    const axis = (x1, y1, x2, y2) => {
      svg.line(x1, y1, x2, y2, { color: AXIS, width: 2, dash: '9 5' });
      const horizontal = y1 === y2;
      svg.text(horizontal ? (x1 + x2) / 2 : x2, horizontal ? 38 : y2 - 16, 'Axis', {
        size: 17,
        math: false,
        color: AXIS,
      });
    };
    if (i === 0 || i === 8) {
      svg.ellipse(135, 130, 37, 68, { stroke: EDGE, width: 6 });
      svg.line(135, 130, 135, 62, { width: 1.3 });
      svg.text(153, 91, 'R', { size: 22 });
      if (i === 0) {
        axis(52, 130, 225, 130);
      } else {
        axis(135, 220, 135, 36);
      }
    } else if (i === 1) {
      cylinder(svg, 85, 190, 130, 57, true);
      axis(36, 130, 230, 130);
      svg.line(85, 130, 85, 73, { width: 1.2 });
      svg.text(60, 82, 'R_2', { size: 19 });
      svg.line(85, 130, 96, 105, { width: 1.2 });
      svg.text(110, 102, 'R_1', { size: 19 });
    } else if (i === 2 || i === 3) {
      cylinder(svg, 70, 210, 130, 42);
      if (i === 2) {
        axis(30, 130, 239, 130);
      } else {
        axis(140, 210, 140, 40);
      }
      svg.line(70, 130, 70, 88, { width: 1.2 });
      svg.text(49, 103, 'R', { size: 21 });
      dimension(svg, 70, 210, 198, 'ℓ');
    } else if (i === 4 || i === 5) {
      cylinder(svg, 50, 230, 130, 9);
      axis(i === 4 ? 140 : 50, 200, i === 4 ? 140 : 50, 40);
      dimension(svg, 50, 230, 180, 'ℓ');
    } else if (i === 6 || i === 7) {
      svg.circle(135, 130, 62, { fill: i === 6 ? PURPLE : '#f2eaf7', stroke: EDGE, width: 2 });
      svg.ellipse(135, 130, 62, 18, { stroke: EDGE, width: 1.2 });
      if (i === 7) {
        svg.ellipse(135, 130, 25, 62, { stroke: EDGE, width: 1.2 });
      }
      axis(135, 220, 135, 35);
      svg.vdimension(220, 68, 192, '2R', { size: 20 });
    } else {
      svg.polygon(
        [
          [45, 160],
          [160, 95],
          [235, 130],
          [120, 195],
        ],
        { fill: PURPLE, stroke: EDGE, width: 2 }
      );
      axis(140, 208, 140, 42);
      svg.text(78, 192, 'a', { size: 23 });
      svg.text(195, 173, 'b', { size: 23 });
      svg.line(45, 167, 120, 202, { width: 1 });
      svg.line(126, 202, 241, 137, { width: 1 });
    }
    svg.text(255, 218, 'I =', { size: 25 });
    switch (i) {
      case 0:
        svg.text(350, 218, 'MR^2', { size: 25 });
        break;
      case 1:
        fraction(svg, 370, 218, 'M(R_1^2 + R_2^2)', '2', 180);
        break;
      case 2:
        fraction(svg, 350, 218, 'MR^2', '2', 95);
        break;
      case 3:
        fraction(svg, 335, 218, 'MR^2', '4', 80);
        svg.text(395, 218, '+', { size: 25 });
        fraction(svg, 455, 218, 'Mℓ^2', '12', 80);
        break;
      case 4:
        fraction(svg, 350, 218, 'Mℓ^2', '12', 95);
        break;
      case 5:
        fraction(svg, 350, 218, 'Mℓ^2', '3', 95);
        break;
      case 6:
        fraction(svg, 350, 218, '2MR^2', '5', 105);
        break;
      case 7:
        fraction(svg, 350, 218, '2MR^2', '3', 105);
        break;
      case 8:
        fraction(svg, 350, 218, 'MR^2', '2', 95);
        break;
      case 9:
        fraction(svg, 370, 218, 'M(a^2 + b^2)', '12', 180);
        break;
    }
    svg.add('</g>');
    if (i % 2 === 0) {
      svg.line(500, y + 15, 500, y + 275, { color: '#dddddd', width: 1 });
    }
    if (i < 8) {
      svg.line(x + 20, y + 285, x + 480, y + 285, { color: '#dddddd', width: 1 });
    }
  }
  return svg.render();
}

function fishingReel() {
  const svg = new Svg({
    width: 760,
    height: 460,
    title: 'Fishing line unwinding from a rotating reel',
    desc: 'A fishing reel rotates counterclockwise, unwinding line tangentially to the right from a radius r = 4.5 cm. Rotational quantities θ, ω, α describe the reel; linear quantities x, v, a describe the fishing line. The line speed is v = rω.',
  });
  const [cx, cy, r] = [220, 205, 105];
  // Reel mount, rod, and crank distinguish the reel from a bare disk.
  svg.rect(195, 285, 48, 83, { fill: '#8b959d', stroke: '#56616b', width: 2, rx: 8 });
  svg.rect(70, 363, 300, 16, { fill: '#c7ced3', stroke: '#56616b', width: 2, rx: 6 });
  svg.rect(72, 355, 65, 32, { fill: WOOD, stroke: WOOD_EDGE, width: 2, rx: 8 });
  svg.circle(cx, cy, r + 14, { fill: '#c7ced3', stroke: '#56616b', width: 2.5 });
  svg.circle(cx, cy, r, { fill: '#edf2df', stroke: '#7d8c65', width: 2 });
  [97, 89, 81].forEach(radius => {
    svg.circle(cx, cy, radius, { fill: 'none', stroke: '#a6b58a', width: 1.5 });
  });
  svg.line(cx, cy, 150, 244, { color: '#56616b', width: 12, cap: 'round' });
  svg.ellipse(150, 244, 13, 22, { fill: WOOD, stroke: WOOD_EDGE, width: 2 });
  svg.circle(cx, cy, 17, { fill: '#8b959d', stroke: '#56616b', width: 2 });

  svg.add('<g id="reel-radius">');
  svg.arrow(cx, cy, ...point(cx, cy, r, 35), { width: 2, head: 9 });
  svg.text(286, 223, 'r = 4.5 \\rm{cm}', { size: 24 });
  svg.add('</g>');
  svg.add('<g id="reel-rotation">');
  arcArrow(svg, cx, cy, 145, -35, 85, COLORS.blue);
  svg.add('</g>');
  svg.text(85, 55, 'Reel', { size: 23, math: false });
  svg.leader(114, 62, 137, 119, { bend: 0.2 });
  svg.text(510, 75, 'Rotational quantities', { size: 23, math: false });
  svg.text(510, 110, 'θ, ω, α', { size: 29, color: COLORS.blue });
  svg.leader(410, 120, 362, 183, { bend: 0.2 });
  svg.text(510, 185, 'Counterclockwise', { size: 21, math: false, color: COLORS.blue });

  // At the bottom of a counterclockwise reel, the tangent points right.
  svg.add('<g id="fishing-line">');
  svg.line(cx, cy + r, 680, cy + r, { color: '#65754b', width: 3 });
  svg.add('</g>');
  svg.text(548, 251, 'Fishing line', { size: 23, math: false });
  svg.leader(548, 270, 555, cy + r, { bend: -0.3 });
  svg.add('<g id="line-motion">');
  svg.arrow(425, 350, 660, 350, { color: COLORS.velocity, width: 3.5 });
  svg.add('</g>');
  svg.text(544, 382, 'x, v, a', { size: 29, color: COLORS.velocity });
  svg.text(544, 423, 'Linear quantities', { size: 23, math: false });
  svg.text(214, 423, 'v = rω', { size: 27 });
  return svg.render();
}

function rollingCans() {
  const svg = new Svg({
    width: 820,
    height: 470,
    title: 'Soup cans racing down an incline: sliding versus rolling',
    desc: 'Three equal-mass cans start from rest at the same height h in separate lanes. Can 1 slides without rotating and is farthest downhill, finishing first. Can 2 rolls with thin soup that does not rotate, finishing second. Can 3 rolls with thick soup rotating with the can and finishes third. Clockwise arrows mark rotation only on cans 2 and 3.',
  });
  const top = [100, 160];
  const across = [240, -90];
  const downhill = [360, 220];
  const at = (lane, distance) => [
    top[0] + lane * across[0] + distance * downhill[0],
    top[1] + lane * across[1] + distance * downhill[1],
  ];
  svg.polygon([at(0, 0), at(1, 0), at(1, 1), at(0, 1)], {
    fill: '#e2eaf3',
    stroke: '#7991ac',
    width: 2,
  });
  [1 / 3, 2 / 3].forEach(lane => {
    svg.line(...at(lane, 0), ...at(lane, 1), { color: '#a5b5c7', dash: '7 5' });
  });
  svg.line(50, 160, 100, 160, GUIDE);
  svg.line(50, 380, 460, 380, GUIDE);
  svg.vdimension(55, 160, 380, 'h', { size: 26 });
  svg.text(230, 40, 'Common start', { size: 21, math: false });
  svg.text(640, 355, 'Finish', { size: 21, math: false });
  svg.line(...at(0, 1), ...at(1, 1), { color: '#56616b', width: 4 });

  // The projected can faces are tangent to the downhill direction. Their
  // support points lie on the ramp; all three cans have the same dimensions.
  const rx = 14;
  const ry = 19;
  const normal = [-downhill[1], downhill[0]];
  const support = Math.hypot(rx * normal[0], ry * normal[1]);
  const offset = [(rx ** 2 * normal[0]) / support, (ry ** 2 * normal[1]) / support];
  const cans = [
    { number: 3, lane: 5 / 6, distance: 0.24, fill: '#ded0e8', edge: EDGE },
    { number: 2, lane: 1 / 2, distance: 0.53, fill: '#c9e7df', edge: '#438b77' },
    { number: 1, lane: 1 / 6, distance: 0.84, fill: '#ffddd0', edge: '#c85d42' },
  ];
  for (const can of cans) {
    const ground = at(can.lane, can.distance);
    const [x, y] = [ground[0] - offset[0], ground[1] - offset[1]];
    const [bx, by] = [x + 30, y - 12];
    svg.add(`<g id="can-${can.number}">`);
    svg.ellipse(bx, by, rx, ry, { fill: can.fill, stroke: can.edge, width: 2 });
    svg.path(
      `M ${x} ${y - ry} L ${bx} ${by - ry} A ${rx} ${ry} 0 0 1 ${bx} ${by + ry} L ${x} ${y + ry} Z`,
      {
        fill: can.fill,
        color: can.edge,
        width: 2,
      }
    );
    svg.ellipse(x, y, rx, ry, { fill: can.fill, stroke: can.edge, width: 2 });
    svg.text(x, y, String(can.number), { size: 20, math: false, halo: false });
    svg.add('</g>');
    if (can.number !== 1) {
      svg.add(`<g id="can-${can.number}-rotation">`);
      arcArrow(svg, x, y, 29, 120, -60, can.edge);
      svg.add('</g>');
    }
    const start = at(can.lane, 0.06);
    const stop = at(can.lane, can.distance - 0.09);
    svg.arrow(...start, ...stop, { color: INK, width: 2.5, head: 10 });
    svg.arrow(ground[0] + 40, ground[1] + 15, ground[0] + 84, ground[1] + 42, {
      color: INK,
      width: 2,
      head: 9,
    });
  }
  svg.text(160, 421, '1: first — slides', { size: 22, math: false });
  svg.text(160, 450, 'No rotation', { size: 19, math: false });
  svg.text(420, 421, '2: second — rolls', { size: 22, math: false });
  svg.text(420, 450, 'Thin soup', { size: 19, math: false });
  svg.text(680, 421, '3: third — rolls', { size: 22, math: false });
  svg.text(680, 450, 'Thick soup', { size: 19, math: false });
  return svg.render();
}

function diskStickCollision() {
  const svg = new Svg({
    width: 800,
    height: 390,
    title: 'An inelastic collision between a disk and a pivoted stick',
    desc: 'Top views of a frictionless surface. (a) Before: disk m moves right with velocity v toward the upper tip of a stationary stick M of length r, nailed at its lower end. (b) After: the disk adheres to the tip and the stick and disk rotate clockwise together about the nail with angular velocity ω.',
  });
  svg.text(205, 38, '(a) Before', { size: 25, math: false });
  svg.text(600, 38, '(b) After', { size: 25, math: false });
  [35, 425].forEach(x => {
    svg.rect(x, 70, 340, 260, { fill: '#faf4df', stroke: '#c7b784', width: 2, rx: 5 });
  });
  svg.text(400, 366, 'Top view: frictionless surface', { size: 23, math: false });
  const [px, py, length] = [250, 270, 155];
  svg.add('<g id="stick-before">');
  svg.rect(px - 9, py - length, 18, length, { fill: WOOD, stroke: WOOD_EDGE, width: 2 });
  svg.add('</g>');
  svg.text(218, 193, 'M', { size: 27 });
  svg.add('<g id="disk-before">');
  svg.circle(92, py - length, 19, { fill: '#b9dce7', stroke: '#437b91', width: 2 });
  svg.text(92, py - length, 'm', { size: 25, halo: false });
  svg.add('</g>');
  svg.add('<g id="incident-velocity">');
  svg.arrow(123, py - length, 225, py - length, { color: COLORS.velocity, width: 3.5 });
  svg.add('</g>');
  svg.text(174, 92, 'v', { size: 27, color: COLORS.velocity });
  svg.line(px + 15, py - length, 317, py - length, GUIDE);
  svg.line(px + 15, py, 317, py, GUIDE);
  svg.vdimension(307, py - length, py, 'r', { size: 26 });
  svg.circle(px, py, 7, { fill: '#777777', stroke: INK, width: 2 });
  svg.text(166, 303, 'Nail (pivot)', { size: 21, math: false });
  svg.leader(226, 299, px, py, { bend: 0.1 });

  const [qx, qy, angle] = [567, py, 55];
  const end = point(qx, qy, length, angle);
  const normal = [Math.sin(rad(angle)), Math.cos(rad(angle))];
  svg.add('<g id="stick-after">');
  svg.polygon(
    [
      [qx - 9 * normal[0], qy - 9 * normal[1]],
      [end[0] - 9 * normal[0], end[1] - 9 * normal[1]],
      [end[0] + 9 * normal[0], end[1] + 9 * normal[1]],
      [qx + 9 * normal[0], qy + 9 * normal[1]],
    ],
    { fill: WOOD, stroke: WOOD_EDGE, width: 2 }
  );
  svg.add('</g>');
  svg.text((qx + end[0]) / 2 - 25, (qy + end[1]) / 2 - 10, 'M', { size: 27 });
  svg.add('<g id="disk-after">');
  svg.circle(...end, 19, { fill: '#b9dce7', stroke: '#437b91', width: 2 });
  svg.text(...end, 'm', { size: 25, halo: false });
  svg.add('</g>');
  svg.circle(qx, qy, 7, { fill: '#777777', stroke: INK, width: 2 });
  svg.text(481, 303, 'Nail (pivot)', { size: 21, math: false });
  svg.leader(541, 299, qx, qy, { bend: 0.1 });
  svg.add('<g id="collision-rotation">');
  arcArrow(svg, qx, qy, 113, 42, -12, COLORS.blue);
  svg.add('</g>');
  svg.text(711, 240, 'ω', { size: 29, color: COLORS.blue });
  svg.text(660, 92, 'Disk adheres', { size: 20, math: false });
  svg.leader(660, 108, end[0], end[1] - 19, { bend: 0.1 });
  return svg.render();
}

function torqueVectorDiagram() {
  const svg = new Svg({
    width: 880,
    height: 430,
    title: 'Torque and the direction of change in angular momentum',
    desc: '(a) The position vector r runs from a pivot to the point where force F acts in a plane. Their cross product τ points upward, perpendicular to that plane. (b) A child rides a carousel horse on a merry-go-round. A tangential force F at radius r produces upward torque, parallel to the change in angular momentum. For the counterclockwise rotation viewed from above, ω and L also point upward.',
  });
  svg.text(222, 45, '(a) Torque direction', { size: 24, math: false });
  svg.polygon(
    [
      [40, 330],
      [270, 330],
      [410, 185],
      [180, 185],
    ],
    {
      fill: '#fbe6da',
      stroke: '#c9a896',
      width: 2,
    }
  );
  svg.circle(160, 270, 5, { fill: INK });
  svg.add('<g id="plane-radius">');
  svg.arrow(160, 270, 295, 245, { color: COLORS.blue, width: 3 });
  svg.add('</g>');
  svg.text(224, 243, 'r', { size: 27, color: COLORS.blue });
  svg.add('<g id="plane-force">');
  svg.arrow(295, 245, 240, 190, { color: FORCE, width: 4 });
  svg.add('</g>');
  svg.text(280, 197, 'F', { size: 28, color: FORCE });
  svg.add('<g id="plane-torque">');
  svg.arrow(160, 270, 160, 115, { color: COLORS.orange, width: 4 });
  svg.add('</g>');
  svg.text(135, 154, 'τ', { size: 29, color: COLORS.orange });
  svg.polyline(
    [
      [160, 251],
      [178, 248],
      [178, 267],
    ],
    { width: 1.2 }
  );
  svg.text(224, 367, 'Plane formed by r and F', { size: 22, math: false });
  svg.text(224, 405, 'τ = r × F', { size: 27 });

  svg.text(650, 45, '(b) Merry-go-round', { size: 24, math: false });
  const [cx, cy] = [635, 280];
  svg.ellipse(cx, cy + 12, 165, 68, { fill: '#dea58c', stroke: '#c9856b', width: 2 });
  svg.ellipse(cx, cy, 165, 68, { fill: '#fbe6da', stroke: '#c9856b', width: 2 });
  // A point on the projected rim: (cos θ, sin θ) = (0.8, -0.6).
  // Its counterclockwise tangent has positive x and negative screen y.
  const rim = [cx + 165 * 0.8, cy + 68 * 0.6];
  svg.add('<g id="carousel-radius">');
  svg.arrow(cx, cy, ...rim, { color: COLORS.blue, width: 2.5 });
  svg.add('</g>');
  svg.text(690, 321, 'r', { size: 26, color: COLORS.blue });
  svg.line(750, 127, 750, 311, { color: '#d7b052', width: 5 });
  // Carousel horse, saddle, bridle, and seated child.
  svg.path('M 714 275 Q 700 261 696 282 Q 692 296 685 291', { color: EDGE, width: 6 });
  svg.ellipse(744, 277, 38, 15, { fill: PURPLE, stroke: EDGE, width: 2 });
  svg.polygon(
    [
      [765, 277],
      [772, 252],
      [786, 243],
      [802, 252],
      [793, 264],
      [785, 284],
    ],
    {
      fill: PURPLE,
      stroke: EDGE,
      width: 2,
    }
  );
  svg.polygon(
    [
      [783, 246],
      [782, 233],
      [790, 243],
    ],
    { fill: PURPLE, stroke: EDGE, width: 1.5 }
  );
  svg.circle(790, 252, 2.3, { fill: INK });
  svg.line(789, 258, 798, 260, { color: '#d7b052', width: 3 });
  svg.polyline([[771, 285], [779, 299], rim], { color: EDGE, width: 6 });
  svg.polyline(
    [
      [723, 286],
      [709, 303],
      [717, 314],
    ],
    { color: EDGE, width: 6 }
  );
  svg.rect(729, 261, 26, 9, { fill: '#ca864d', stroke: '#935d31', width: 1.5, rx: 3 });
  svg.circle(742, 214, 10, { fill: '#e9bb8b', stroke: '#9a6b45', width: 1.5 });
  svg.path('M 735 233 L 739 255 L 752 255 L 750 232 Z', {
    fill: '#ea9893',
    color: '#a45557',
    width: 2,
  });
  svg.polyline(
    [
      [749, 236],
      [759, 247],
      [777, 252],
    ],
    { color: '#9a6b45', width: 4 }
  );
  svg.polyline(
    [
      [742, 257],
      [760, 279],
      [752, 294],
    ],
    { color: '#456c9f', width: 7 }
  );

  svg.add('<g id="carousel-force">');
  svg.arrow(...rim, rim[0] + 165 * 0.6 * 0.65, rim[1] - 68 * 0.8 * 0.65, {
    color: FORCE,
    width: 4,
  });
  svg.add('</g>');
  svg.text(829, 260, 'F', { size: 29, color: FORCE });
  svg.circle(cx, cy, 5, { fill: INK });
  svg.add('<g id="carousel-axis">');
  svg.arrow(cx, cy, cx, 119, { color: COLORS.orange, width: 4 });
  svg.add('</g>');
  svg.text(cx, 90, 'τ, ω, L', { size: 28, color: COLORS.orange });
  svg.text(650, 405, 'τ ∥ ΔL', { size: 27 });
  return svg.render();
}

export default {
  Figure_10_01_01: uniformRotation,
  Figure_10_01_02: () => accelerations(false),
  Figure_10_01_03: () => accelerations(true),
  Figure_10_02_01: fishingReel,
  Figure_10_03_06: inertiaChart,
  Figure_10_04_02: rotationalWork,
  Figure_10_04_06: rollingCans,
  Figure_10_06_02: diskStickCollision,
  Figure_10_07_02: torqueVectorDiagram,
};
