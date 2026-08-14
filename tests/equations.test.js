import { describe, it, expect, beforeEach } from 'vitest';
import EquationProcessor, { fixSubSupBraces } from '../scripts/equations.js';

// The project's ONLY math delimiter is $$…$$ (a lone $ is literal text, e.g. currency), and a
// $$…$$ span may cross line boundaries. These tests lock in that behavior so the checker does
// not regress to the old single-$ / per-line logic that produced 19 false positives while
// missing real LaTeX bugs.

describe('EquationProcessor.validateMathSpans', () => {
  let proc;

  beforeEach(() => {
    proc = new EquationProcessor();
  });

  const messages = () => proc.errors.map(e => e.message);

  it('ignores a lone $ used as currency', () => {
    proc.validateMathSpans('t.md', 'The clock costs about $2.37 to run for a year.');
    expect(proc.errors).toHaveLength(0);
  });

  it('ignores currency $ on a line that also contains real $$ math', () => {
    proc.validateMathSpans('t.md', 'worth about $465 billion, i.e. $$2.5 \\times 10^{13}$$ kWh.');
    expect(proc.errors).toHaveLength(0);
  });

  it('accepts a multi-line $$ display block (array closing on a later line)', () => {
    const content = ['$$ v=\\sqrt{', '\\left( 1.20 \\right)^{2}', '} $$'].join('\n');
    proc.validateMathSpans('t.md', content);
    expect(proc.errors).toHaveLength(0);
  });

  it('accepts two adjacent inline $$ spans (no false "empty math")', () => {
    proc.validateMathSpans('t.md', 'given that $${}^{22}\\text{Na}$$ $$\\beta$$ decays');
    expect(proc.errors).toHaveLength(0);
  });

  it('accepts a standalone $$ delimiter opening a display block', () => {
    const content = ['<div class="equation">', '$$', '', 'E=mc^2 $$', '</div>'].join('\n');
    proc.validateMathSpans('t.md', content);
    expect(proc.errors).toHaveLength(0);
  });

  it('does not treat \\rightarrow / \\leftarrow as \\left/\\right', () => {
    proc.validateMathSpans('t.md', "$$r_2' \\rightarrow \\infty$$");
    expect(proc.errors).toHaveLength(0);
  });

  it('flags an unclosed $$ block (odd number of delimiters)', () => {
    proc.validateMathSpans('t.md', 'text $$a=b$$ and a stray $$ opener here');
    expect(messages()).toContain('Unclosed $$ math block (odd number of $$ delimiters)');
  });

  it('flags unbalanced braces inside a span', () => {
    proc.validateMathSpans('t.md', '$$\\frac{ \\gamma mc }^{2}}{ \\gamma mu}$$');
    expect(messages().some(m => m.startsWith('Unbalanced braces in math'))).toBe(true);
  });

  it('flags \\left/\\right split across two separate spans', () => {
    const content = 'from $$44\\text{ºC}$$ $$\\left(75\\text{ºF}$$\nto $$111\\text{ºF}\\right)$$.';
    proc.validateMathSpans('t.md', content);
    expect(messages().filter(m => m.startsWith('Unbalanced \\left/\\right')).length).toBe(2);
  });

  it('flags a genuinely empty math span', () => {
    proc.validateMathSpans('t.md', 'here $$ $$ nothing');
    expect(messages()).toContain('Empty math expression ($$ $$)');
  });

  it('ignores $$ inside fenced code blocks', () => {
    const content = ['```', '$$ unbalanced {', '```'].join('\n');
    proc.validateMathSpans('t.md', content);
    expect(proc.errors).toHaveLength(0);
  });
});

describe('fixSubSupBraces', () => {
  it('wraps multi-character subscripts', () => {
    expect(fixSubSupBraces(String.raw`\tau_L = F_L \times 2d`)).toBe(
      String.raw`\tau_{L} = F_L \times 2d`
    );
  });

  it('wraps multi-character superscripts', () => {
    expect(fixSubSupBraces(String.raw`\frac{1}{2}mv^2`)).toBe(String.raw`\frac{1}{2}mv^{2}`);
  });

  it('leaves single-character scripts unchanged', () => {
    expect(fixSubSupBraces(String.raw`x_1 + y^2`)).toBe(String.raw`x_1 + y^2`);
  });

  it('does not double-wrap already-braced scripts', () => {
    expect(fixSubSupBraces(String.raw`\tau_{1} + mv^{2}`)).toBe(String.raw`\tau_{1} + mv^{2}`);
  });
});

describe('EquationProcessor.fixSubSupInMathSpans', () => {
  let proc;

  beforeEach(() => {
    proc = new EquationProcessor({ fix: true });
  });

  it('fixes only inside $$ spans, not URLs or prose', () => {
    const content = ['see lunar-lander_en.html for the sim.', '$$ \\tau_L = F_L $$'].join('\n');
    const { content: fixed, fixes } = proc.fixSubSupInMathSpans(content, 't.md');
    expect(fixed).toContain(String.raw`\tau_{L} = F_L`);
    expect(fixed).toContain('lunar-lander_en.html');
    expect(fixes).toHaveLength(1);
  });

  it('ignores sub/sup issues inside fenced code blocks', () => {
    const content = ['```', String.raw`$$\tau_L$$`, '```'].join('\n');
    const { content: fixed, fixes } = proc.fixSubSupInMathSpans(content, 't.md');
    expect(fixed).toBe(content);
    expect(fixes).toHaveLength(0);
  });
});

describe('EquationProcessor sub/sup warnings', () => {
  let proc;

  beforeEach(() => {
    proc = new EquationProcessor();
  });

  it('warns inside math spans', () => {
    proc.validateMathSpans('t.md', String.raw`$$ \tau_L = 1 $$`);
    expect(proc.warnings.some(w => w.message.includes('subscript'))).toBe(true);
  });

  it('does not warn on iframe URLs outside math', () => {
    proc.checkFile(
      't.md',
      '<iframe src="https://phet.colorado.edu/sims/lunar-lander/lunar-lander_en.html">',
      't.md'
    );
    expect(proc.warnings).toHaveLength(0);
  });
});
