/**
 * Graphs for answers in chapters 11–20 that ask for one (outside the field
 * sketches of sections 18.7 and 19.4, which live in fields18to19.js).
 *
 * Names follow concept_CC_SS_pNN for the NNth problem of section CC.SS.
 */
import { COLORS, Plot, Svg } from './svg.js';

export default {
  // 14.3 P7 — temperature versus time for 0.200 kg of ice heated to steam
  concept_14_03_p07: () => {
    const svg = new Svg({
      width: 680,
      height: 420,
      title: 'Heating ice to steam: temperature versus time',
      desc: 'Temperature in degrees Celsius versus time in seconds for 0.200 kg of ice heated at a constant 20.0 kJ/s. The ice warms from −20 °C to 0 °C in 0.418 s; the temperature stays at 0 °C while the ice melts, until 3.76 s; the water warms from 0 °C to 100 °C, reaching it at 7.95 s; the temperature stays at 100 °C while the water boils, until 30.5 s; finally the steam warms from 100 °C to 130 °C, reaching it at 31.0 s. The two flat plateaus are the phase changes; the boiling plateau is by far the longest because the latent heat of vaporization is largest.',
    });
    const t = [0, 0.418, 3.758, 7.944, 30.504, 30.96];
    const T = [-20, 0, 0, 100, 100, 130];
    const g = new Plot(svg, {
      x: 90,
      y: 40,
      w: 540,
      h: 290,
      xRange: [0, 33],
      yRange: [-30, 140],
      xTicks: [0, 5, 10, 15, 20, 25, 30],
      yTicks: [-20, 0, 20, 40, 60, 80, 100, 120, 140],
    });
    g.axes({ xTitle: 'Time, t (s)', yTitle: 'Temperature, T (°C)', yTitleOffset: 58 });
    g.series(
      t.map((x, k) => [x, T[k]]),
      { color: COLORS.red, width: 3 }
    );
    for (let k = 0; k < t.length; k += 1) {
      const [px, py] = [g.X(t[k]), g.Y(T[k])];
      svg.circle(px, py, 3.5, { fill: COLORS.red });
    }
    g.text(2.1, 12, 'ice melts', { size: 13, math: false });
    g.text(1.4, -12, 'ice warms', { size: 13, math: false, anchor: 'start' });
    g.text(6.6, 50, 'water warms', { size: 13, math: false, anchor: 'start' });
    g.text(19.2, 110, 'water boils (22.6 s)', { size: 13, math: false });
    g.text(30.4, 136, 'steam warms', { size: 13, math: false, anchor: 'end' });
    svg.text(360, 400, 'Constant heating rate 20.0 kJ/s; the plateaus are the phase changes.', {
      size: 14,
      math: false,
    });
    return svg.render();
  },
};
