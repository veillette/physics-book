import { readFileSync } from 'node:fs';
import { extractInfo } from '../scripts/parse-summary.js';

// Read the source on every build, including rebuilds during local development.
export default function () {
  return extractInfo(readFileSync(new URL('../SUMMARY.md', import.meta.url), 'utf8'));
}
