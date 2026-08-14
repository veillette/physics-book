import { describe, it, expect } from 'vitest';
import { ContentParser } from '../scripts/lib/parser.js';

// Classify every line of a document and return the parser result per line.
function classify(lines) {
  const parser = new ContentParser();
  return lines.map(line => parser.processLine(line));
}

describe('ContentParser display-math tracking', () => {
  it('treats a single-line $$ … $$ block as self-contained (no state carry-over)', () => {
    // Regression: the old rule toggled inMathBlock on any line starting with $$, so each
    // single-line equation flipped the state and misclassified every following line.
    const lines = [
      '$$ \\omega = \\frac{\\Delta \\theta}{\\Delta t} $$',
      '',
      'See [Figure 1](#Figure1).',
      '{: #Figure1}',
    ];
    const [mathLine, , prose, ial] = classify(lines);
    expect(mathLine.isContent).toBe(false); // the equation line itself is math
    expect(prose.isContent).toBe(true); // prose after it must NOT be swallowed
    expect(ial.isContent).toBe(true); // the trailing IAL must be visible to collectors
  });

  it('does not desync on repeated single-line equations', () => {
    const lines = [
      '$$ a = b $$',
      '$$ c = d $$',
      '$$ e = f $$', // three of them: an odd count would have left state "inside math"
      '{: #anchor}',
    ];
    const results = classify(lines);
    expect(results[3].isContent).toBe(true);
    expect(results[3].state.inMathBlock).toBe(false);
  });

  it('tracks a multi-line block that opens with $$ and closes with …$$', () => {
    // Common shape: `$$\begin{array}…` … `…\end{array}$$` — the close line does NOT
    // start with $$, which the old rule never detected, leaving the block open forever.
    const lines = [
      '$$\\begin{array}{lll}',
      '  {Q}_{\\text{cold}} + {Q}_{\\text{hot}} & = & 0',
      '\\end{array}$$',
      'Now back to prose with a [link](./ch1PhysicsAnIntroduction).',
      '{: #afterMath}',
    ];
    const results = classify(lines);
    expect(results[0].isContent).toBe(false); // open delimiter
    expect(results[1].isContent).toBe(false); // inside the block
    expect(results[2].isContent).toBe(false); // close delimiter
    expect(results[3].isContent).toBe(true); // prose after the block resumes
    expect(results[3].state.inMathBlock).toBe(false);
    expect(results[4].isContent).toBe(true);
  });

  it('keeps a prose line with an inline $$…$$ pair as content', () => {
    const [line] = classify(['where $$\\theta$$ is the angle in [Figure 1](#Figure1).']);
    expect(line.isContent).toBe(true);
    expect(line.state.inMathBlock).toBe(false);
  });
});
