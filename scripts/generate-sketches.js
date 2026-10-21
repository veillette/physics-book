#!/usr/bin/env node
/**
 * Generate the "sketch and coordinate system" drawings (SVG) that open the
 * worked solutions of the kinematics problems in chapters 2 and 3, and the
 * sketches with labeled positive directions in the chapter 7–9 solutions
 * (work and energy, momentum, statics).
 *
 * Each sketch is defined in scripts/sketch/chNN.js as a function that returns
 * an SVG string. Files are written to resources/sketch_CC_SS_pNN.svg, where CC
 * is the chapter, SS the section, and NN the problem number within that
 * section's Problems & Exercises. The drawing helpers live in
 * scripts/sketch/sketch.js and scripts/sketch/mechanics.js.
 *
 * Usage:
 *   node scripts/generate-sketches.js            # write every sketch
 *   node scripts/generate-sketches.js 02_05      # only names containing "02_05"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ch02 from './sketch/ch02.js';
import ch03 from './sketch/ch03.js';
import ch07 from './sketch/ch07.js';
import ch08 from './sketch/ch08.js';
import ch09 from './sketch/ch09.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'resources');
const filter = process.argv[2] || '';

const sketches = { ...ch02, ...ch03, ...ch07, ...ch08, ...ch09 };
let count = 0;
for (const [name, build] of Object.entries(sketches)) {
  if (filter && !name.includes(filter)) continue;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), build());
  count += 1;
}
console.log(`Wrote ${count} sketch(es) to resources/`);
