import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { expect, it } from 'vitest';
import { buildSearchIndex } from '../scripts/build-index.js';

it('writes relative search URLs into a custom absolute build directory', async () => {
  const siteDir = mkdtempSync(path.join(tmpdir(), 'physics-index-'));
  try {
    writeFileSync(
      path.join(siteDir, 'lesson.html'),
      '<html><body><h1>Velocity</h1><p>Velocity describes how position changes with time in a specified direction.</p></body></html>'
    );
    expect(await buildSearchIndex({ siteDir, silent: true })).toBe(true);
    const data = JSON.parse(readFileSync(path.join(siteDir, 'search_index.json'), 'utf8'));
    expect(data.documents).toHaveLength(1);
    expect(data.documents[0].url).toBe('lesson.html');
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
