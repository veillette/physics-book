/** World energy figures, using the dated source snapshot shared with Table 1. */
import fs from 'node:fs';
import { Plot, Svg, fmt, pathThrough } from './svg.js';

const data = JSON.parse(
  fs.readFileSync(new URL('./data/world-energy.json', import.meta.url), 'utf8')
);
const plain = { math: false, halo: false };
const fuels = [
  ['oil', 'Oil', '#ad6524'],
  ['coal', 'Coal', '#434b53'],
  ['gas', 'Natural gas', '#1976ad'],
  ['nuclear', 'Nuclear', '#9b2858'],
  ['hydro', 'Hydroelectricity', '#337f89'],
  ['otherRenewables', 'Other renewables', '#56852a'],
];

export default {
  Figure_07_09_01: () => {
    const { totalEj, fuelsEj } = data.world;
    const svg = new Svg({
      width: 1000,
      height: 540,
      title: 'World total energy supply by source, 2025',
      desc: `A pie chart of ${totalEj} exajoules of total energy supply: ${fuels
        .map(([key, name]) => `${name} ${((100 * fuelsEj[key]) / totalEj).toFixed(1)}%`)
        .join(
          ', '
        )}. Physical energy content accounting; percentages may not sum to 100 because of rounding.`,
    });
    svg.text(30, 30, 'World total energy supply by source, 2025', {
      ...plain,
      size: 26,
      weight: 'bold',
      anchor: 'start',
    });
    svg.text(30, 66, `Total: ${totalEj.toFixed(2)} EJ (1 EJ = 10¹⁸ J)`, {
      ...plain,
      size: 20,
      anchor: 'start',
    });
    const [cx, cy, radius] = [245, 275, 170];
    let angle = -Math.PI / 2;
    for (const [i, [key, name, color]] of fuels.entries()) {
      const fraction = fuelsEj[key] / totalEj;
      const end = angle + 2 * Math.PI * fraction;
      const at = a => [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
      const [x1, y1] = at(angle);
      const [x2, y2] = at(end);
      svg.path(
        `M ${cx} ${cy} L ${fmt(x1)} ${fmt(y1)} A ${radius} ${radius} 0 ${fraction > 0.5 ? 1 : 0} 1 ${fmt(x2)} ${fmt(y2)} Z`,
        { fill: color, color: '#ffffff', width: 2 }
      );
      const y = 130 + i * 55;
      svg.rect(490, y - 10, 21, 21, { fill: color });
      svg.text(525, y, name, { ...plain, size: 20, anchor: 'start' });
      svg.text(920, y, `${(fraction * 100).toFixed(1)}%`, {
        ...plain,
        size: 20,
        anchor: 'end',
        weight: 'bold',
      });
      svg.text(920, y + 22, `${fuelsEj[key].toFixed(2)} EJ`, { ...plain, size: 15, anchor: 'end' });
      angle = end;
    }
    svg.text(
      30,
      478,
      'Physical energy content: wind, solar PV and hydro count their electricity output.',
      {
        ...plain,
        size: 18,
        anchor: 'start',
      }
    );
    svg.text(
      30,
      505,
      'Source: Energy Institute, Statistical Review 2026, p. 24. Shares rounded independently.',
      {
        ...plain,
        size: 16,
        anchor: 'start',
      }
    );
    return svg.render();
  },

  Figure_07_09_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 570,
      title: 'World total energy supply, 2015–2025',
      desc: 'A line chart of reported annual total energy supply, using physical energy content accounting throughout. Supply rises from 523.80 EJ in 2015 to 600.31 EJ in 2025, with a decline from 556.63 EJ in 2019 to 532.75 EJ in 2020. All points are historical estimates; no forecasts are shown.',
    });
    svg.text(30, 30, 'World total energy supply, 2015–2025', {
      ...plain,
      size: 26,
      weight: 'bold',
      anchor: 'start',
    });
    svg.text(30, 65, 'Reported annual supply (EJ) • Physical energy content throughout', {
      ...plain,
      size: 19,
      anchor: 'start',
    });
    const plot = new Plot(svg, {
      x: 85,
      y: 105,
      w: 805,
      h: 350,
      xRange: [2015, 2025],
      yRange: [0, 650],
      xTicks: [2015, 2017, 2019, 2021, 2023, 2025],
      yTicks: [0, 100, 200, 300, 400, 500, 600],
    });
    const points = data.worldHistory.map(d => plot.P(d.year, d.totalEj));
    svg.polygon([plot.P(2015, 0), ...points, plot.P(2025, 0)], { fill: '#e2eff5' });
    plot.axes({ grid: true, size: 17, xTitle: 'Year', titleSize: 18 });
    svg.path(pathThrough(points), { color: '#1976ad', width: 3.5 });
    for (const point of points) svg.circle(...point, 4.5, { fill: '#1976ad' });
    plot.text(2015.15, 570, '523.80 EJ', { ...plain, size: 19, anchor: 'start' });
    plot.text(2024.9, 630, '600.31 EJ', { ...plain, size: 19, anchor: 'end' });
    plot.text(2020, 435, '2020 decline', { ...plain, size: 18 });
    plot.line(2020, 460, 2020, 515, { color: '#666666', width: 1.2 });
    svg.text(30, 525, 'Source: Energy Institute, Statistical Review 2026, p. 23.', {
      ...plain,
      size: 16,
      anchor: 'start',
    });
    svg.text(
      30,
      550,
      'Historical estimates, including 2025; no projections. Earlier years use the revised method.',
      {
        ...plain,
        size: 16,
        anchor: 'start',
      }
    );
    return svg.render();
  },

  Figure_07_09_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 670,
      title: 'GDP and annual energy use per person, 2025',
      desc: 'A scatter plot for the eleven countries in Table 1. The horizontal axis shows GDP per person in constant 2021 international dollars, adjusted for purchasing power. The vertical axis shows annual total energy supply in kWh per person, using physical energy content accounting. Higher income generally accompanies higher energy use, but there is substantial variation: Germany uses less energy per person than Russia despite higher GDP per person.',
    });
    svg.text(30, 30, 'GDP and annual energy use per person, 2025', {
      ...plain,
      size: 26,
      weight: 'bold',
      anchor: 'start',
    });
    svg.text(30, 65, 'Selected countries from Table 1 • Same year and energy accounting method', {
      ...plain,
      size: 19,
      anchor: 'start',
    });
    const plot = new Plot(svg, {
      x: 115,
      y: 110,
      w: 785,
      h: 420,
      xRange: [0, 85000],
      yRange: [0, 85000],
      xTicks: [0, 20000, 40000, 60000, 80000],
      yTicks: [0, 20000, 40000, 60000, 80000],
      xFormat: v => v.toLocaleString('en-US'),
      yFormat: v => v.toLocaleString('en-US'),
    });
    plot.axes({
      grid: true,
      size: 16,
      titleSize: 18,
      xTitle: 'GDP per person (PPP, constant 2021 international $)',
      yTitle: 'Annual energy use (kWh per person)',
      yTitleOffset: 88,
      xTitleOffset: 55,
    });
    const offsets = {
      AUS: [12, -15, 'start'],
      BRA: [14, -15, 'start'],
      CHN: [14, -14, 'start'],
      EGY: [20, 22, 'start'],
      DEU: [12, -15, 'start'],
      IND: [-12, 18, 'end'],
      IDN: [-8, -27, 'end'],
      JPN: [12, -15, 'start'],
      GBR: [10, 22, 'start'],
      RUS: [12, -15, 'start'],
      USA: [-12, -17, 'end'],
    };
    for (const country of data.countries) {
      const [x, y] = plot.P(country.gdpPpp2021PerCapita, country.energyGjPerCapita / 0.0036);
      const [dx, dy, anchor] = offsets[country.iso3];
      svg.line(x, y, x + dx * 0.75, y + dy * 0.75, { color: '#777777', width: 1 });
      svg.circle(x, y, 6, { fill: '#1976ad', stroke: '#ffffff', width: 1.5 });
      svg.text(x + dx, y + dy, country.name, { size: 17, math: false, anchor });
    }
    svg.text(
      30,
      615,
      'Sources: Energy Institute, Statistical Review 2026, p. 25; World Bank, NY.GDP.PCAP.PP.KD.',
      {
        ...plain,
        size: 16,
        anchor: 'start',
      }
    );
    svg.text(
      30,
      643,
      'Energy: physical energy content, converted using 1 kWh = 0.0036 GJ. GDP data accessed 21 Oct 2026.',
      {
        ...plain,
        size: 16,
        anchor: 'start',
      }
    );
    return svg.render();
  },
};
