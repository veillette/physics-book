import { readdirSync, readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { load } from 'cheerio';
import {
  enableNativeStaticView,
  nativeAnimationNames,
} from '../scripts/figures/native-animation-controls.js';
import ch02 from '../scripts/figures/ch02.js';
import ch03 from '../scripts/figures/ch03.js';
import projectile from '../scripts/figures/projectile-to-satellite.js';
import ch04to07 from '../scripts/figures/ch04to07.js';
import ch08 from '../scripts/figures/ch08.js';
import ch09 from '../scripts/figures/ch09.js';
import ch11to12 from '../scripts/figures/ch11to12.js';
import ch13 from '../scripts/figures/ch13.js';
import ch14 from '../scripts/figures/ch14.js';
import ch15 from '../scripts/figures/ch15.js';
import ch16 from '../scripts/figures/ch16.js';
import { animatedFigureNames } from '../assets/js/animated-figure-names.js';

it('registers all forty-eight original animations without changing their artwork or timing', () => {
  const builders = {
    ...ch02,
    ...ch03,
    ...projectile,
    ...ch04to07,
    ...ch08,
    ...ch09,
    ...ch11to12,
    ...ch13,
    ...ch14,
    ...ch15,
    ...ch16,
  };
  expect(nativeAnimationNames).toHaveLength(48);
  for (const name of nativeAnimationNames) {
    const original = builders[name](),
      source = load(original, { xmlMode: true });
    const svg = readFileSync(new URL(`../resources/${name}.svg`, import.meta.url), 'utf8'),
      $ = load(svg, { xmlMode: true });
    expect(animatedFigureNames.has(`${name}.svg`), name).toBe(true);
    expect(svg, name).toBe(enableNativeStaticView(name, original));
    expect($('#animation-paused'), name).toHaveLength(1);
    expect($('style[data-native-animation-controls]'), name).toHaveLength(1);
    expect($('.motion').length, name).toBeGreaterThan(0);
    expect($('script,image,foreignObject'), name).toHaveLength(0);
    expect($('svg').attr('viewBox'), name).toBe(source('svg').attr('viewBox'));
    expect($('title').text(), name).toBe(source('title').text());
    expect($('desc').text(), name).toBe(source('desc').text());
    const ids = $('[id]')
      .toArray()
      .map(el => $(el).attr('id'));
    expect(new Set(ids).size, name).toBe(ids.length);
    // Removing only the adapter restores every original element, including
    // fallback panels and animation timing attributes.
    $('#animation-paused,style[data-native-animation-controls]').remove();
    expect($('svg').children().toString(), name).toBe(source('svg').children().toString());
  }
});
it('does not duplicate controls or alter unrelated figures and rejects incompatible sources', () => {
  const name = nativeAnimationNames[0],
    original = ch02[name](),
    enabled = enableNativeStaticView(name, original);
  expect(enableNativeStaticView(name, enabled)).toBe(enabled);
  expect(enableNativeStaticView('Figure_02_02_02', original)).toBe(original);
  expect(() => enableNativeStaticView(name, '<svg/>')).toThrow('Unexpected motion structure');
});
it('leaves no animated textbook SVG in chapters 1–16 without viewer controls', () => {
  const root = new URL('../resources/', import.meta.url);
  const moving = readdirSync(root).filter(
    name =>
      /^(Figure|companion|concept)_(0[1-9]|1[0-6])_.*\.svg$/.test(name) &&
      /<animate\b|<animateTransform\b|<animateMotion\b/.test(
        readFileSync(new URL(name, root), 'utf8')
      )
  );
  expect(moving.length).toBeGreaterThanOrEqual(146);
  for (const name of moving) expect(animatedFigureNames.has(name), name).toBe(true);
});
