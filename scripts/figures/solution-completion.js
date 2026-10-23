/** Diagrams and corrected plots for the chapter 1–10 solution completion. */
import { FBD } from '../fbd/fbd.js';
import { COLORS, Frame, Plot, Svg, rad } from './svg.js';

export function brakingPlot() {
  const svg = new Svg({
    width: 680,
    height: 410,
    title: 'Braking force with a firm or eased pedal',
    desc: 'Braking-force magnitude in kN versus time in seconds for a 1200 kg car initially moving at 12 m/s. A firm pedal gives 3.6 kN until the car stops at 4 s, then zero. An eased pedal gives 3.6 kN until 2.5 s, then tapers linearly to zero at 5.5 s. Both impulses are 14.4 kN s. No jump to the maximum static-friction limit is assumed.',
  });
  const g = new Plot(svg, {
    x: 95,
    y: 40,
    w: 525,
    h: 250,
    xRange: [0, 6.5],
    yRange: [0, 4.2],
    xTicks: [0, 1, 2, 3, 4, 5, 6],
    yTicks: [0, 1, 2, 3, 4],
  });
  g.axes({ xTitle: 'Time, t (s)', yTitle: 'Braking-force magnitude (kN)', yTitleOffset: 58 });
  g.series(
    [
      [0, 3.6],
      [4, 3.6],
      [4, 0],
      [6.3, 0],
    ],
    { color: COLORS.red, width: 3 }
  );
  g.series(
    [
      [0, 3.6],
      [2.5, 3.6],
      [5.5, 0],
      [6.3, 0],
    ],
    {
      color: COLORS.blue,
      width: 3,
      dash: '8 5',
    }
  );
  g.text(3.9, 3.95, 'abrupt stop', { size: 14, math: false });
  g.text(5.0, 1.55, 'tapered stop', { size: 14, math: false, color: COLORS.blue });
  svg.text(340, 357, 'Red: firm pedal; blue dashed: pedal eased', { size: 15, math: false });
  svg.text(340, 385, 'Same initial speed and impulse; easing here takes longer to stop.', {
    size: 14,
    math: false,
  });
  return svg.render();
}

export function dragRegimesPlot() {
  const svg = new Svg({
    width: 760,
    height: 430,
    title: 'Drag laws in two distinct flow regimes',
    desc: 'Separate numerical examples, not competing extrapolations for one object. Left: Stokes drag on a sphere of radius 1 micrometer in water of viscosity 0.001 Pa s, linear in speed, with speed in micrometers per second and force in piconewtons. Right: car drag in air with C=0.30, area 2.0 square meters, density 1.21 kg per cubic meter, quadratic in speed, with speed in m/s and force in N.',
  });
  const low = new Plot(svg, {
    x: 85,
    y: 70,
    w: 260,
    h: 240,
    xRange: [0, 100],
    yRange: [0, 2.0],
    xTicks: [0, 50, 100],
    yTicks: [0, 0.5, 1, 1.5, 2],
  });
  low.axes({ xTitle: 'Speed (μm/s)', yTitle: 'Drag (pN)', yTitleOffset: 50 });
  low.fn(v => (6 * Math.PI * 1e-3 * 1e-6 * v * 1e-6) / 1e-12, 0, 100, { color: COLORS.blue });
  svg.text(215, 35, 'Creeping flow: F = 6πηrv', { size: 16 });
  const high = new Plot(svg, {
    x: 455,
    y: 70,
    w: 260,
    h: 240,
    xRange: [0, 30],
    yRange: [0, 350],
    xTicks: [0, 10, 20, 30],
    yTicks: [0, 100, 200, 300],
  });
  high.axes({ xTitle: 'Speed (m/s)', yTitle: 'Drag (N)', yTitleOffset: 50 });
  high.fn(v => 0.5 * 0.3 * 1.21 * 2.0 * v * v, 0, 30, { color: COLORS.red });
  svg.text(585, 35, 'Inertial flow: F = ½CρAv^2', { size: 16 });
  svg.text(
    380,
    395,
    'Choose the regime from flow conditions, not from which extrapolated curve is larger.',
    {
      size: 14,
      math: false,
    }
  );
  return svg.render();
}

export function divingBoardPlot() {
  const svg = new Svg({
    width: 680,
    height: 410,
    title: 'Elastic energy in an ideal massless diving board',
    desc: 'Schematic time graph for a massless spring board, k=6000 N/m. Its energy is initially zero, rises to approximately 29 J at the static deflection, then to 270 J at maximum depression of 0.30 m, and falls to zero at separation at zero deflection. This idealized massless board retains no kinetic energy and does not vibrate afterward; a real massive board can.',
  });
  const g = new Plot(svg, {
    x: 95,
    y: 45,
    w: 530,
    h: 240,
    xRange: [0, 10],
    yRange: [0, 310],
    yTicks: [0, 100, 200, 300],
  });
  g.axes({
    xTitle: 'Time, t (schematic)',
    yTitle: 'Elastic potential energy (J)',
    yTitleOffset: 60,
  });
  const ease = s => 0.5 * (1 - Math.cos(Math.PI * s));
  const energy = t => {
    if (t <= 1) return 0;
    if (t <= 3) return 29 * ease((t - 1) / 2);
    if (t <= 4.5) return 29;
    if (t <= 6.3) return 29 + 241 * ease((t - 4.5) / 1.8);
    if (t <= 8) return 270 * (1 - ease((t - 6.3) / 1.7));
    return 0;
  };
  g.fn(energy, 0, 9.5, { color: COLORS.red, n: 300 });
  g.text(3.65, 55, 'standing: 29 J', { size: 14, math: false });
  g.text(6.3, 292, 'maximum: 270 J', { size: 14, math: false });
  g.text(8.15, 32, 'feet leave', { size: 14, math: false });
  svg.text(
    340,
    365,
    'Explicit model: massless spring, no damping, separation at zero deflection.',
    {
      size: 14,
      math: false,
    }
  );
  return svg.render();
}

export function impulsePlot() {
  const svg = new Svg({
    width: 680,
    height: 430,
    title: 'Equal net impulses for hard and compliant landings',
    desc: 'Net upward force, not floor contact force, versus time. Symmetric half-sine pulses stop a 3.0 kg point mass initially moving downward at 3.0 m/s. The tile pulse lasts 2 ms and averages 4500 N; the compliant pulse lasts 20 ms and averages 450 N. Each net impulse is 9.0 N s. Average floor forces additionally include the 29.4 N weight, giving 4529 N and 479 N.',
  });
  const g = new Plot(svg, {
    x: 105,
    y: 40,
    w: 520,
    h: 250,
    xRange: [0, 25],
    yRange: [0, 8],
    xTicks: [0, 5, 10, 15, 20, 25],
    yTicks: [0, 2, 4, 6, 8],
  });
  g.axes({ xTitle: 'Time, t (ms)', yTitle: 'Net upward force (kN)', yTitleOffset: 58 });
  const pulse = (duration, t) =>
    ((Math.PI * 9) / ((2 * duration) / 1000) / 1000) * Math.sin((Math.PI * t) / duration);
  g.fn(t => pulse(2, t), 0, 2, { color: COLORS.red, width: 3 });
  g.fn(t => pulse(20, t), 0, 20, { color: COLORS.blue, width: 3 });
  g.text(13, 6.5, 'tile: average net force 4500 N', { size: 14, math: false });
  g.text(14, 1.3, 'compliant: average net force 450 N', { size: 14, math: false });
  g.text(14, 4.1, 'equal net impulse: 9.0 N·s', { size: 15, math: false });
  svg.text(340, 365, 'Floor force = net upward force + weight (29.4 N).', {
    size: 15,
    math: false,
  });
  svg.text(
    340,
    395,
    'The 20 ms pulse requires 3 cm of total stopping displacement in this model.',
    {
      size: 14,
      math: false,
    }
  );
  return svg.render();
}

export default {
  concept_10_01_q02: () => {
    const svg = new Svg({
      width: 520,
      height: 390,
      title: 'Radial and tangential directions in circular motion',
      desc: 'A particle at the right side of a circle moves counterclockwise. Its velocity points upward along the positive tangent; centripetal acceleration points left along the positive inward normal, perpendicular to velocity. The center and radius are marked.',
    });
    const f = new Frame(svg, { ox: 195, oy: 220 });
    svg.circle(...f.p(0, 0), 100, { fill: 'none', stroke: COLORS.guide, width: 2 });
    svg.circle(...f.p(0, 0), 4, { fill: COLORS.black });
    f.text([-35, -18], 'center', { size: 14, math: false });
    f.line([0, 0], [100, 0], { color: COLORS.guide, dash: '5 4' });
    f.text([48, -25], 'r', { size: 18 });
    f.vec([100, 0], [100, 125], { color: COLORS.velocity });
    f.text([100, 125], '**v**, +t', { dx: 20, size: 18, anchor: 'start' });
    f.vec([100, 0], [15, 0], { color: COLORS.accel });
    // Left of the right-angle mark at the particle.
    f.text([38, 22], '**a**_c, +n inward', { size: 16 });
    svg.circle(...f.p(100, 0), 7, { fill: COLORS.orange });
    f.rightAngle([100, 0], 90, 180, 17);
    svg.text(260, 350, 'Local axes: +t along motion; +n toward the center.', {
      size: 15,
      math: false,
    });
    return svg.render();
  },

  concept_10_01_q04: () => {
    const svg = new Svg({
      width: 760,
      height: 390,
      title: 'Food acceleration on a rotating microwave plate',
      desc: 'Three top views at a nonzero angular speed. With counterclockwise motion at the right edge, velocity is upward. During spin-up, tangential acceleration is upward and radial acceleration inward; at constant speed only inward acceleration remains; during slowing tangential acceleration is downward and radial acceleration remains inward. At the exact initially stationary instant radial acceleration is zero, and after the stop all acceleration is zero.',
    });
    ['Spin-up (ω > 0)', 'Steady rotation', 'Slowing (ω > 0)'].forEach((name, k) => {
      const f = new Frame(svg, { ox: 100 + 250 * k, oy: 210 });
      svg.circle(...f.p(0, 0), 60, { fill: COLORS.fill, stroke: COLORS.guide });
      svg.circle(...f.p(60, 0), 6, { fill: COLORS.orange });
      f.vec([60, 0], [-5, 0], { color: COLORS.accel });
      f.text([15, -25], 'a_c', { size: 18 });
      f.vec([73, 0], [73, 92], { color: COLORS.velocity, width: 2 });
      f.text([73, 92], 'v, +t', { dx: 5, size: 16, anchor: 'start' });
      if (k !== 1) {
        f.vec([60, 0], [60, k === 0 ? 55 : -55], { color: COLORS.red });
        f.text([60, k === 0 ? 45 : -50], 'a_t', { dx: -20, size: 17 });
      } else f.text([10, 85], 'a_t = 0', { size: 17 });
      svg.text(120 + 250 * k, 40, name, { size: 15, math: false, weight: 'bold' });
    });
    svg.text(
      380,
      335,
      'Top views: inward radial acceleration and signed tangential acceleration.',
      {
        size: 15,
        math: false,
      }
    );
    svg.text(
      380,
      365,
      'At the initial instant ω = 0, a_c = 0; after the full stop, both components vanish.',
      {
        size: 14,
        math: false,
      }
    );
    return svg.render();
  },

  concept_09_06_q06: () => {
    const svg = new Svg({
      width: 720,
      height: 490,
      title: 'Both attachment points determine the muscle moment arm',
      desc: 'Geometry sketch, not a complete free-body diagram. The elbow is the x-y origin, x points along the horizontal forearm toward the wrist, and y upward along the upper arm. The upper attachment is (0,a), and the distal attachment is (b,0). The tendon pulls obliquely from the distal point toward the upper attachment. The perpendicular distance from the elbow to its line is r perpendicular = ab/sqrt(a squared + b squared), not b. Example a=0.0400 m, b=0.350 m, hand at 0.380 m.',
    });
    const f = new Frame(svg, { ox: 120, oy: 305, scale: 1000 });
    const a = 0.04,
      b = 0.35;
    f.axes({ xMin: -0.04, xMax: 0.46, yMin: -0.1, yMax: 0.19, xLabel: '+x', yLabel: '+y' });
    f.line([0, 0], [0, 0.14], { color: COLORS.guide, width: 9 });
    f.line([0, 0], [0.38, 0], { color: COLORS.guide, width: 9 });
    f.line([0, a], [b, 0], { color: COLORS.blue, width: 3 });
    for (const p of [
      [0, 0],
      [0, a],
      [b, 0],
      [0.38, 0],
    ])
      svg.circle(...f.p(...p), 5, { fill: COLORS.black });
    const dist = Math.hypot(a, b);
    f.vec([b, 0], [b - (0.13 * b) / dist, (0.13 * a) / dist], { color: COLORS.red });
    f.text([0.25, 0.035], 'F_m along tendon', { size: 17 });
    const foot = [(a * a * b) / (a * a + b * b), (a * b * b) / (a * a + b * b)];
    f.line([0, 0], foot, { color: COLORS.accel, width: 3, dash: '5 3' });
    f.text([-0.015, 0.02], 'r_⊥', { size: 19, anchor: 'end' });
    f.text([0, a], '(0, a)', { dx: -22, dy: -12, size: 17, anchor: 'end' });
    f.text([b, 0], '(b, 0)', { dy: 32, size: 17 });
    f.text([0, 0], 'elbow', { dx: -15, dy: 32, size: 15, math: false, anchor: 'end' });
    f.vec([0.38, 0], [0.38, -0.085], { color: COLORS.red });
    f.text([0.38, -0.085], '39.2 N load', { dx: 20, size: 15, math: false, anchor: 'start' });
    svg.text(360, 40, 'Geometry of a direct tendon between the two attachments', {
      size: 17,
      math: false,
    });
    svg.text(360, 75, 'Illustration: a = 0.0400 m, b = 0.350 m, hand distance R = 0.380 m', {
      size: 15,
      math: false,
    });
    svg.text(
      360,
      450,
      'r_⊥ = ab / √(a^2 + b^2) = 0.03974 m; the tendon is nearly along the forearm.',
      { size: 16 }
    );
    return svg.render();
  },

  concept_10_05_q12: () => {
    const svg = new Svg({
      width: 620,
      height: 500,
      title: 'External torque on a diver during board contact',
      desc: 'The origin is the diver center of mass, x points toward the board end to the right, and y upward. Weight acts downward at the center, and the upward board force acts at the feet to its right. The horizontal offset d gives a positive counterclockwise torque d times N about the center. Once contact ends, the board force disappears.',
    });
    const f = new Frame(svg, { ox: 270, oy: 220 });
    f.axes({ xMin: -100, xMax: 210, yMin: -220, yMax: 160, xLabel: '+x', yLabel: '+y' });
    f.line([-70, -175], [200, -175], { color: COLORS.black, width: 5 });
    f.line([0, 0], [50, -175], { color: COLORS.guide, width: 7 });
    f.vec([0, 0], [0, -147], { color: COLORS.red });
    f.text([0, -95], 'mg', { dx: -25, size: 20 });
    f.vec([50, -175], [50, 50], { color: COLORS.red });
    f.text([50, -70], 'N (board \\rm{on} feet)', { dx: 12, dy: 0, size: 18, anchor: 'start' });
    f.line([0, 0], [50, 0], { color: COLORS.blue, width: 3, dash: '5 4' });
    f.text([25, 0], 'd', { dy: -14, size: 18 });
    svg.circle(...f.p(0, 0), 7, { fill: COLORS.black });
    svg.circle(...f.p(50, -175), 5, { fill: COLORS.black });
    f.text([0, 0], 'center of mass', { dx: -20, dy: -12, size: 14, math: false, anchor: 'end' });
    f.text([115, -200], 'board', { size: 15, math: false });
    f.angle([0, 0], 20, 100, 80, '+τ_z', { labelR: 110, size: 18 });
    // Arrowhead at the end of the arc: positive torque is counterclockwise.
    {
      const [cx, cy] = f.p(0, 0);
      const a = (100 * Math.PI) / 180;
      const [ex, ey] = [cx + 80 * Math.cos(a), cy - 80 * Math.sin(a)];
      svg.arrow(ex + 12 * Math.sin(a), ey + 12 * Math.cos(a), ex, ey, { head: 11, width: 1.5 });
    }
    svg.text(
      310,
      40,
      'During contact: τ_z = dN; weight has zero moment about the center \\rm{of} mass.',
      { size: 15 }
    );
    svg.text(310, 472, '+z out of the page; positive torque is counterclockwise.', {
      size: 15,
      math: false,
    });
    return svg.render();
  },

  concept_10_07_q01: () => {
    const svg = new Svg({
      width: 780,
      height: 470,
      title: 'Countersteering initiates a lean before the sustained turn',
      desc: 'Left, top view with forward x upward and left y to the left: pulling the right grip backward briefly turns the front wheel right and shifts its contact path right, initiating left lean. Right, rear view looking forward: the motorcycle leans left, the road resultant points upward and left through the center of mass, and weight points down. The sustained turn is left after the initial opposite steering input.',
    });
    svg.line(390, 20, 390, 440, { color: '#cccccc' });
    svg.text(190, 35, '1. Brief initiating steer (top view)', {
      size: 16,
      math: false,
      weight: 'bold',
    });
    svg.line(190, 320, 190, 195, { color: COLORS.guide, width: 8 });
    svg.line(190, 350, 190, 295, { color: COLORS.black, width: 8 });
    svg.line(170, 195, 210, 120, { color: COLORS.black, width: 8 });
    svg.line(125, 135, 245, 195, { color: COLORS.blue, width: 5 });
    svg.arrow(245, 195, 245, 265, { color: COLORS.red, width: 3 });
    svg.text(265, 280, 'pull right grip back', { size: 13, math: false });
    svg.arrow(210, 120, 280, 95, { color: COLORS.orange, width: 3 });
    svg.text(282, 70, 'brief steer right', { size: 13, math: false });
    svg.arrow(80, 355, 80, 280, { color: COLORS.axis, width: 1.5 });
    svg.text(80, 260, '+x forward', { size: 14, math: false });
    svg.arrow(80, 355, 25, 355, { color: COLORS.axis, width: 1.5 });
    svg.text(50, 385, '+y left', { size: 14, math: false });
    svg.text(190, 425, '+z out of page', { size: 14, math: false });
    svg.text(580, 35, '2. Established left turn (rear view)', {
      size: 16,
      math: false,
      weight: 'bold',
    });
    svg.line(425, 365, 750, 365, { color: COLORS.black, width: 2 });
    svg.line(615, 365, 615, 100, { color: COLORS.guide, dash: '6 4' });
    svg.line(615, 365, 545, 150, { color: COLORS.black, width: 8 });
    svg.circle(560, 196, 8, { fill: COLORS.orange });
    svg.arrow(615, 365, 532, 110, { color: COLORS.blue, width: 3 });
    svg.text(490, 90, 'road resultant', { size: 14, math: false });
    svg.arrow(560, 196, 560, 315, { color: COLORS.red, width: 3 });
    svg.text(540, 300, 'mg', { size: 18, anchor: 'end' });
    svg.arrow(560, 196, 460, 196, { color: COLORS.accel, width: 3 });
    svg.text(480, 174, 'a inward (left)', { size: 13, math: false });
    svg.text(585, 425, '+y left; +z up; +x forward into page', { size: 13, math: false });
    return svg.render();
  },

  solution_02_08_p08: () => {
    const svg = new Svg({
      width: 670,
      height: 660,
      title: 'Velocity and acceleration for piecewise-linear position',
      desc: 'Velocity is +1 m/s from 0 to 2 s, minus 5 m/s from 2 to 3 s, zero from 3 to 5 s, and +1 m/s from 5 to 6 s. Acceleration is zero on those open intervals. At 2, 3, and 5 s, arrows indicate idealized impulses of areas minus 6, plus 5, and plus 1 m/s, not finite acceleration heights.',
    });
    const v = new Plot(svg, {
      x: 100,
      y: 50,
      w: 510,
      h: 230,
      xRange: [0, 6.5],
      yRange: [-6, 2],
      xTicks: [0, 1, 2, 3, 4, 5, 6],
      yTicks: [-5, -3, 0, 1],
    });
    v.axes({ xTitle: 'Time (s)', yTitle: 'Velocity (m/s)', yTitleOffset: 58 });
    for (const [a, b, value] of [
      [0, 2, 1],
      [2, 3, -5],
      [3, 5, 0],
      [5, 6, 1],
    ])
      v.line(a, value, b, value, { color: COLORS.velocity, width: 3 });
    const a = new Plot(svg, {
      x: 100,
      y: 400,
      w: 510,
      h: 150,
      xRange: [0, 6.5],
      yRange: [-1.5, 1.5],
      xTicks: [0, 1, 2, 3, 4, 5, 6],
      yTicks: [0],
    });
    a.axes({ xTitle: 'Time (s)', yTitle: 'Acceleration (m/s^2)', yTitleOffset: 58 });
    a.line(0, 0, 6, 0, { color: COLORS.accel, width: 3 });
    for (const [t, sign, label] of [
      [2, -1, 'Δv = −6 m/s'],
      [3, 1, 'Δv = +5 m/s'],
      [5, 1, 'Δv = +1 m/s'],
    ]) {
      svg.arrow(a.X(t), a.Y(0), a.X(t), a.Y(sign), { color: COLORS.accel, width: 3 });
      a.text(t, sign * 1.25, label, { size: 13, math: false });
    }
    svg.text(
      335,
      635,
      'Impulse arrows show signs and areas; they do not represent finite acceleration heights.',
      { size: 13, math: false }
    );
    return svg.render();
  },

  solution_04_06_p08: () => {
    const svg = new Svg({
      width: 760,
      height: 410,
      title: 'Two addition orders and an alternative force pair',
      desc: 'Force diagrams share x to the right, y up, and a scale of 10 pixels per newton. Left: horizontal F1 and vertical F2 added in either order form the same 20.0 N resultant at 35 degrees. Right: F3 at 75 degrees followed by horizontal F4 reaches the same tip, with magnitudes approximately 11.9 N and 13.3 N.',
    });
    const X = 20 * Math.cos(rad(35)),
      Y = 20 * Math.sin(rad(35));
    for (const k of [0, 1]) {
      const f = new Frame(svg, { ox: 65 + k * 385, oy: 280, scale: 10 });
      f.axes({ xMin: -1, xMax: 22, yMin: -1, yMax: 18, xLabel: '+x', yLabel: '+y', size: 16 });
      if (k === 0) {
        f.vec([0, 0], [X, 0], { color: COLORS.blue });
        f.vec([X, 0], [X, Y], { color: COLORS.red });
        f.vec([0, 0], [0, Y], { color: COLORS.red });
        f.vec([0, Y], [X, Y], { color: COLORS.blue });
        f.text([X / 2, -2.6], 'F_1 = 16.4 N', { size: 15 });
        f.text([X + 2.1, Y / 2], 'F_2', { size: 18 });
      } else {
        const x3 = Y / Math.tan(rad(75));
        f.vec([0, 0], [x3, Y], { color: COLORS.red });
        f.vec([x3, Y], [X, Y], { color: COLORS.blue });
        f.text([0, Y / 2], 'F_3', { dx: -15, size: 18 });
        f.text([(x3 + X) / 2, Y + 2], 'F_4 = 13.3 N', { size: 15 });
      }
      f.vec([0, 0], [X, Y], { color: COLORS.vector, width: 4 });
      f.text([X * 0.7, Y * 0.7], '20.0 N', { dy: -20, size: 16 });
      svg.text(190 + 385 * k, 35, k ? 'Alternative pair' : 'Both addition orders', {
        size: 16,
        math: false,
      });
    }
    svg.text(
      380,
      365,
      'Both panels use the same force scale: each 50-pixel bar represents 5.0 N.',
      { size: 14, math: false }
    );
    svg.line(320, 390, 370, 390, { color: COLORS.black, width: 3 });
    svg.text(410, 390, '5.0 N', { size: 14, math: false });
    return svg.render();
  },

  solution_04_06_p14: () => {
    const d = new FBD({
      width: 430,
      height: 370,
      cx: 200,
      cy: 180,
      title: 'Elevator and load accelerating upward',
      desc: 'The elevator plus load is the system. With origin at its center, positive y upward and x right, cable tension points upward and is larger than downward weight. Upward acceleration is shown separately. Example tension is approximately 13400 N and weight 11760 N.',
    });
    d.axes({ xLen: 170, xNeg: 140, yLen: 135, yNeg: 130 });
    d.force(90, 91, 'T');
    d.force(270, 80, 'mg');
    d.accel(90, 45, { at: [110, 15] });
    d.objectLabel('elevator + load', { dx: -20, dy: 15, anchor: 'end' });
    d.note(0, -160, '+y upward: T − mg = ma', { size: 16 });
    return d.render();
  },
};
