import { describe, expect, it } from 'vitest';
import { normalizeCaptionMath } from '../assets/js/caption-math.js';

describe('caption math normalization', () => {
  it('normalizes doubled backslashes and legacy parentheses', () => {
    expect(normalizeCaptionMath(String.raw`The angle is ( \\theta_r = \\theta_i ).`)).toBe(
      String.raw`The angle is \(\theta_r = \theta_i\).`
    );
  });

  it('preserves explicit delimiters containing ordinary parentheses', () => {
    for (const text of [
      String.raw`A weight \( ( w ) \) is applied.`,
      String.raw`The foci are \( ( f_1 ) and ( f_2 ) \).`,
      String.raw`\(F=\gamma (2l)\)`,
      String.raw`\[ x = ( a + b ) \]`,
      '$$x = ( a + b )$$',
      '$x = ( a + b )$',
    ]) {
      expect(normalizeCaptionMath(text)).toBe(text);
    }
  });

  it('converts legacy math alongside explicit math without changing prose', () => {
    expect(normalizeCaptionMath(String.raw`(a) The mass \( m \) has weight ( mg ).`)).toBe(
      String.raw`(a) The mass \( m \) has weight \(mg\).`
    );
  });
});
