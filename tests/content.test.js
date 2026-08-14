import { describe, it, expect } from 'vitest';
import { findUnitSpacingIssues, fixUnitSpacingInText } from '../scripts/lib/unit-spacing.js';

describe('unit spacing detection', () => {
  it('flags a missing space before a real unit', () => {
    const issues = findUnitSpacingIssues('push at a distance of 0.850m from the hinges.');
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({ match: '0.850m', unit: 'm' });
  });

  it('matches each full temperature value before °C', () => {
    const issues = findUnitSpacingIssues('Heat water from 5°C to 45°C.');
    expect(issues.map(issue => issue.match)).toEqual(['5°C', '45°C']);
  });

  it('does not flag compound units like kg·°C', () => {
    expect(findUnitSpacingIssues('Specific heat is 3.76 kJ/(kg·°C).')).toEqual([]);
  });

  it('does not flag decade suffixes ending in s', () => {
    expect(findUnitSpacingIssues('During the 1970s oil crisis in the United States,')).toEqual([]);
    expect(findUnitSpacingIssues('aging starts in the early 20s.')).toEqual([]);
  });

  it('does not flag g-force multiples', () => {
    expect(findUnitSpacingIssues('setting the acceleration to 7g for safety.')).toEqual([]);
    expect(findUnitSpacingIssues('The centripetal acceleration of 3.73g means')).toEqual([]);
  });

  it('does not flag coin-flip H/T notation', () => {
    expect(findUnitSpacingIssues('Change in entropy from 45H/55T to 51H/49T:')).toEqual([]);
  });

  it('does not flag supernova designations like 1987A', () => {
    expect(findUnitSpacingIssues('the 1987A supernova in the Magellanic Cloud')).toEqual([]);
  });

  it('does not flag harmonic wavelength lists like 3L, 5L, 7L', () => {
    const line =
      'Resonances occur at odd multiples of the fundamental length (L, 3L, 5L, 7L, ...).';
    expect(findUnitSpacingIssues(line)).toEqual([]);
  });

  it('does not flag electron orbital notation like 4s', () => {
    expect(findUnitSpacingIssues('**For l = 0 (4s orbital):**')).toEqual([]);
  });

  it('fixes real spacing issues without touching false positives', () => {
    const input = 'Room size 4m × 4m and acceleration limit 7g at 45°C.';
    const output = fixUnitSpacingInText(input);
    expect(output).toContain('4 m × 4 m');
    expect(output).toContain('7g');
    expect(output).toContain('45 °C');
  });
});
