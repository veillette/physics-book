/** Shared self-contained SVG animation rendering and static alternatives. */
import { escapeXml, morph } from './svg.js';

const C = {
  ink: '#222222',
  guide: '#657382',
  grid: '#d6dee4',
  blue: '#1f77c8',
  red: '#c0392b',
  green: '#3f8b38',
  purple: '#6a3d9a',
  fill: '#e6f1f7',
  gold: '#d99a35',
};
const f = n => Number(n.toFixed(3));
const clamp = x => Math.min(1, Math.max(0, x));
const dot = (x, y, r = 6, color = C.blue, opacity = 1) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
const line = (x1, y1, x2, y2, color = C.ink, width = 2, dash = '') =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const rect = (x, y, w, h, fill = C.fill, stroke = C.ink, opacity = 1) =>
  `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}" stroke="${stroke}" opacity="${opacity}"/>`;
const text = (x, y, value, size = 17, color = C.ink, anchor = 'middle') =>
  `<text x="${f(x)}" y="${f(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="${color}" text-anchor="${anchor}">${escapeXml(value)}</text>`;
const path = (points, color = C.blue, fill = 'none', width = 2) =>
  `<path d="${points.map(([x, y], i) => `${i ? 'L' : 'M'} ${f(x)} ${f(y)}`).join(' ')}" stroke="${color}" stroke-width="${width}" fill="${fill}"/>`;
const polygon = (points, fill = C.blue, stroke = 'none') =>
  `<polygon points="${points.map(p => p.map(f).join(',')).join(' ')}" fill="${fill}" stroke="${stroke}"/>`;
const arrow = (x, y, dx, dy, color = C.blue, width = 3) => {
  const length = Math.hypot(dx, dy),
    ux = length ? dx / length : 0,
    uy = length ? dy / length : 0,
    h = Math.min(9, length / 2);
  return (
    line(x, y, x + dx - h * ux, y + dy - h * uy, color, width) +
    polygon(
      [
        [x + dx, y + dy],
        [x + dx - h * ux - 4 * uy, y + dy - h * uy + 4 * ux],
        [x + dx - h * ux + 4 * uy, y + dy - h * uy - 4 * ux],
      ],
      color
    )
  );
};
const visible = (show, markup) => `<g opacity="${show ? 1 : 0}">${markup}</g>`;
// Fixed glyph structure permits script-free numerical readouts. Animate opacity
// discretely so two digits never overlap during a transition.
function number(x, y, value, integers = 2, decimals = 1, signed = false) {
  const digits = Math.round(Math.abs(value) * 10 ** decimals)
    .toString()
    .padStart(integers + decimals, '0');
  let result = '',
    offset = 0;
  if (signed) {
    result += visible(value >= 0, text(x, y, '+', 19));
    result += visible(value < 0, text(x, y, '−', 19));
    offset += 13;
  }
  for (let i = 0; i < integers + decimals; i += 1) {
    if (i === integers && decimals) {
      result += text(x + offset, y, '.', 19);
      offset += 7;
    }
    for (let digit = 0; digit < 10; digit += 1) {
      result += visible(Number(digits[i]) === digit, text(x + offset, y, digit, 19));
    }
    offset += 12;
  }
  return result;
}
const readout = (x, y, label, value, integers = 2, decimals = 1, signed = false) =>
  text(x, y, label, 17, C.guide, 'start') + number(x + 115, y, value, integers, decimals, signed);
const series = (fn, count = 60) => Array.from({ length: count + 1 }, (_, i) => fn(i / count));
const axes = (x, y, w, h, xLabel, yLabel) =>
  arrow(x, y, w, 0, C.ink, 1.5) +
  arrow(x, y, 0, -h, C.ink, 1.5) +
  text(x + w - 5, y + 40, xLabel, 16, C.ink, 'end') +
  text(x + 7, y - h - 10, yLabel, 16, C.ink, 'start');
const panel = (title, body, note) => {
  const lines = [''];
  for (const word of note.split(' ')) {
    const last = lines.length - 1;
    if (lines[last].length + word.length > 100) lines.push(word);
    else lines[last] += `${lines[last] ? ' ' : ''}${word}`;
  }
  return `${text(
    450,
    27,
    title,
    Math.min(22, 840 / (title.length * 0.53))
  )}<g clip-path="url(#animation-diagram-clip)">${body}</g>${lines
    .map((value, i) => text(450, 337 + 17 * i, value, 15, C.guide))
    .join('')}${text(450, 376, 'Illustrative motion • slowed down • cycle restarts', 12, C.guide)}`;
};
function animatedBody(draw, { discreteAttributes = [] } = {}) {
  const samples = series(q => draw(Math.min(q / 0.85, 1)), 60);
  return `<defs><clipPath id="animation-diagram-clip"><rect x="20" y="42" width="860" height="282"/></clipPath></defs><g id="animation-paused"/><g class="anim-still">${draw(0.75)}</g><g class="anim-movie" aria-hidden="true">${morph(samples, { dur: '10s', discreteAttributes, keyTimes: discreteAttributes.length ? series(q => q) : undefined })}</g>`;
}
const style = `<style>.anim-movie{display:none}@media (prefers-reduced-motion:no-preference){.anim-movie{display:inline}.anim-still{display:none}}#animation-paused:target~.anim-movie{display:none!important}#animation-paused:target~.anim-still{display:inline!important}@media (prefers-reduced-motion:reduce),print{.anim-movie{display:none!important}.anim-still{display:inline!important}}</style>`;
function standalone(title, desc, draw, options) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="380" viewBox="0 0 900 380" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(desc)} Animated motion has a static alternative for reduced motion and print.</desc>${style}<rect width="900" height="380" fill="white"/>${animatedBody(draw, options)}</svg>\n`;
}

function appendAnimation(svg, draw, options) {
  const match = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!match) throw new Error('Missing viewBox in animated figure');
  const w = Number(match[1]),
    h = Number(match[2]),
    height = f(h + (420 * w) / 900);
  let result = svg
    .replace(/height="[\d.]+"/, `height="${height}"`)
    .replace(match[0], `viewBox="0 0 ${w} ${height}"`);
  result = result.replace(
    '</desc>',
    ' An animated companion below illustrates the process; its complete static alternative is shown for reduced motion and print.</desc>'
  );
  const inset = `${style}<g transform="translate(0 ${h + 10}) scale(${w / 900})"><rect width="900" height="390" fill="white"/>${line(30, 1, 870, 1, C.grid, 1)}${animatedBody(draw, options)}</g>`;
  return result.replace('</svg>', `${inset}</svg>`);
}

export {
  C,
  f,
  clamp,
  dot,
  line,
  rect,
  text,
  path,
  polygon,
  arrow,
  visible,
  number,
  readout,
  series,
  axes,
  panel,
  standalone,
  appendAnimation,
};
