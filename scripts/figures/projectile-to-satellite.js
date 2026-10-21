/** Newton's cannon: inverse-square gravity, a spherical Earth, and no drag. */
import { Svg, fmt, smilMotion } from './svg.js';

const CX = 315;
const CY = 342;
const EARTH = 168;
const LAUNCH = 210;
const DURATION = '16s';
// Units: launch radius = 1, GM = 1, so circular speed = 1 and period = 2π.
const CLOCK = 2 * Math.PI + 1;
const CASES = [
  { speed: 0.35, color: '#ad5800', name: 'Low speed', detail: 'Falls near the tower.' },
  { speed: 0.65, color: '#c13747', name: 'More speed', detail: 'Travels farther before impact.' },
  {
    speed: 0.9,
    color: '#2563b5',
    name: 'Still more speed',
    detail: 'Earth curves away beneath it.',
  },
  {
    speed: 1,
    color: '#087e83',
    name: 'Circular-orbit speed',
    detail: 'Keeps falling; never hits Earth.',
  },
];

/**
 * Launch is the apoapsis of each subcircular conic. With q = (v/vc)²,
 * r(θ) = q / [1 − (1 − q) cos θ]. End at the first surface intersection.
 * Integrate dt/dθ = r²/v (angular momentum conservation) for SMIL timing;
 * using constant speed along these eccentric paths would be incorrect.
 */
export function trajectory(speed) {
  const q = speed * speed;
  const surface = EARTH / LAUNCH;
  const end = speed === 1 ? 2 * Math.PI : Math.acos((1 - q / surface) / (1 - q));
  const points = [];
  const times = [0];
  const lengths = [0];
  const steps = 240;
  let previousRadius = 1;
  for (let i = 0; i <= steps; i += 1) {
    const theta = (end * i) / steps;
    const radius = q / (1 - (1 - q) * Math.cos(theta));
    points.push([CX + LAUNCH * radius * Math.sin(theta), CY - LAUNCH * radius * Math.cos(theta)]);
    if (i) {
      times.push(
        times[i - 1] + ((radius ** 2 + previousRadius ** 2) / (2 * speed)) * (end / steps)
      );
      lengths.push(lengths[i - 1] + Math.hypot(...points[i].map((p, j) => p - points[i - 1][j])));
    }
    previousRadius = radius;
  }
  const distance = lengths.at(-1);
  return {
    points,
    path: points.map(([x, y], i) => `${i ? 'L' : 'M'} ${fmt(x)} ${fmt(y)}`).join(' '),
    keyPoints: [...lengths.map(d => d / distance), 1],
    keyTimes: [...times.map(t => t / CLOCK), 1],
  };
}

function projectileToSatellite() {
  const svg = new Svg({
    width: 1000,
    height: 640,
    title: 'Projectile to satellite',
    desc: 'Four projectiles launch horizontally to the right from the same high tower. Increasing launch speed produces three progressively longer paths ending at Earth’s surface. At circular-orbit speed, the fourth projectile circles Earth at constant altitude. All launch together on a shared clock; impacted projectiles stop while the satellite completes its orbit. A dashed level-ground comparison shows why neglecting Earth’s curvature underestimates the range. Tower height is exaggerated; air resistance and Earth’s rotation are neglected.',
  });
  const text = (x, y, label, options = {}) =>
    svg.text(x, y, label, { size: 18, math: false, halo: false, anchor: 'start', ...options });

  text(30, 35, 'Projectile to satellite', { size: 27, weight: 'bold' });
  text(30, 68, 'Same launch point and direction. Increasing initial speed.', {
    size: 18,
    color: '#526173',
  });

  // A quiet globe keeps the trajectory geometry readable, even in print.
  svg.circle(CX, CY, EARTH, { fill: '#e6f2f7', stroke: '#527d92', width: 2 });
  svg.ellipse(CX, CY, EARTH * 0.46, EARTH, { stroke: '#c4dce5', width: 1 });
  svg.ellipse(CX, CY, EARTH, EARTH * 0.34, { stroke: '#c4dce5', width: 1 });
  text(CX, CY + 9, 'Earth', { size: 25, anchor: 'middle', color: '#375f74' });

  // The tower reaches from Earth's north pole to the common launch point.
  svg.polygon(
    [
      [CX - 11, CY - EARTH],
      [CX - 5, CY - LAUNCH],
      [CX + 5, CY - LAUNCH],
      [CX + 11, CY - EARTH],
    ],
    {
      fill: '#e0e5ea',
      stroke: '#526173',
      width: 1.5,
    }
  );
  svg.line(CX - 7, 148, CX + 9, 161, { color: '#526173', width: 1 });
  svg.line(CX + 7, 148, CX - 9, 161, { color: '#526173', width: 1 });
  svg.line(CX - 15, CY - LAUNCH, CX + 16, CY - LAUNCH, { color: '#344253', width: 4 });
  text(174, 110, 'High tower', { size: 17 });
  svg.line(259, 113, CX - 13, 152, { color: '#526173', width: 1 });

  // Flat ground is tangent to Earth's surface beneath the tower. Use the
  // fastest impacting launch for the constant-g, level-ground comparison.
  const flatEnd = 0.9 * Math.sqrt(2 * (1 - EARTH / LAUNCH));
  const flat = Array.from({ length: 45 }, (_, i) => {
    const x = (flatEnd * i) / 44;
    return [CX + LAUNCH * x, CY - LAUNCH + (LAUNCH * x * x) / (2 * 0.9 ** 2)];
  });
  svg.line(CX + 13, CY - EARTH, 574, CY - EARTH, { color: '#7d8996', width: 1.4, dash: '5 5' });
  svg.polyline(flat, { color: '#77828e', width: 1.8, dash: '4 4' });
  const [fx, fy] = flat.at(-1);
  svg.rect(fx - 4, fy - 4, 8, 8, { fill: '#77828e' });
  text(495, 159, 'Level ground', { size: 15, color: '#627080' });

  const orbits = CASES.map(c => trajectory(c.speed));
  // Draw the orbit first so the short paths remain distinguishable at launch.
  for (const index of [3, 2, 1, 0]) {
    const c = CASES[index];
    const orbit = orbits[index];
    svg.path(orbit.path, { color: c.color, width: 2.6, dash: index === 3 ? '9 5' : undefined });
    if (index < 3) {
      const [x, y] = orbit.points.at(-1);
      svg.circle(x, y, 4, { fill: c.color, stroke: '#ffffff', width: 1.4 });
      svg.circle(x + 15, y + 13, 11, { fill: '#ffffff', stroke: c.color, width: 1.5 });
      text(x + 15, y + 14, `${index + 1}`, { size: 14, anchor: 'middle', color: c.color });
    }
  }
  text(122, 500, '4', { size: 19, color: CASES[3].color });
  svg.line(137, 496, 159, 484, { color: CASES[3].color, width: 1.2 });

  svg.arrow(CX + 5, CY - LAUNCH - 22, CX + 104, CY - LAUNCH - 22, {
    color: '#344253',
    width: 2,
    head: 11,
  });
  text(CX + 53, 91, 'v_0', { math: true, size: 20, anchor: 'middle' });

  // A static set of positions replaces the moving markers for reduced motion
  // and print. Paths, impact points, and the legend are always visible.
  CASES.forEach((c, i) => {
    const orbit = orbits[i];
    const [sx, sy] = orbit.points[Math.round(orbit.points.length * (i === 3 ? 0.68 : 0.6))];
    svg.still(() => svg.circle(sx, sy, 6.5, { fill: c.color, stroke: '#ffffff', width: 2 }));
    svg.motionGroup(
      `<g>${smilMotion(orbit.path, { dur: DURATION, keyPoints: orbit.keyPoints, keyTimes: orbit.keyTimes })}<circle r="6.5" fill="${c.color}" stroke="#ffffff" stroke-width="2"/></g>`
    );
  });
  svg.circle(CX, CY - LAUNCH, 4, { fill: '#344253' });

  svg.rect(625, 111, 345, 374, { fill: '#f6f8fa', rx: 12 });
  text(647, 140, 'Increasing launch speed', { size: 19, weight: 'bold' });
  CASES.forEach((c, i) => {
    const y = 187 + i * 76;
    svg.circle(656, y, 12, { fill: c.color });
    text(656, y + 1, `${i + 1}`, { size: 15, color: '#ffffff', anchor: 'middle' });
    text(681, y - 1, c.name, { size: 19, color: c.color, weight: 'bold' });
    text(681, y + 25, c.detail, { size: 16, color: '#465467' });
  });
  text(646, 511, 'Orbit is continuous free fall.', { size: 20, color: CASES[3].color });
  text(646, 540, 'Earth curves away as the satellite falls.', { size: 16, color: '#465467' });

  svg.line(30, 576, 970, 576, { color: '#dce3e9', width: 1 });
  text(30, 601, 'All four launch together; animation repeats.', { size: 16, color: '#526173' });
  text(30, 625, 'Tower height exaggerated. No air resistance or Earth rotation.', {
    size: 15,
    color: '#526173',
  });
  return svg.render();
}

export default { Figure_03_04_06: projectileToSatellite };
