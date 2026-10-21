/** Chapter 10: circular-motion vectors and the rotational-inertia reference. */
import { COLORS, Svg, rad } from './svg.js';

const INK = COLORS.black;
const FORCE = '#d52350';
const AXIS = '#438a32';
const PURPLE = '#c7b2d9';
const EDGE = '#77528c';
const GUIDE = { color: '#777777', width: 1.3, dash: '6 5' };
const point = (cx, cy, r, angle) => [cx + r * Math.cos(rad(angle)), cy - r * Math.sin(rad(angle))];

function arcArrow(svg, cx, cy, r, start, end, color = COLORS.blue) {
  svg.arc(cx, cy, r, start, end - 3, { color, width: 2.5 });
  svg.arrow(...point(cx, cy, r, end - 4), ...point(cx, cy, r, end), {
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
  svg.arc(cx, cy, r, -45, 155, { color: '#87949d', width: 2 });
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
    svg.text(p[0] - 85 * normal[0], p[1] - 85 * normal[1] + 28, 'a_c', {
      size: 26,
      color: COLORS.accel,
    });
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

export default {
  Figure_10_01_01: uniformRotation,
  Figure_10_01_02: () => accelerations(false),
  Figure_10_01_03: () => accelerations(true),
  Figure_10_03_06: inertiaChart,
  Figure_10_04_02: rotationalWork,
};
