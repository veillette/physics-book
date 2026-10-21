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
  it('wraps multi-digit subscripts', () => {
    expect(fixSubSupBraces(String.raw`{}_10^{22}\text{Ne}`)).toBe(
      String.raw`{}_{10}^{22}\text{Ne}`
    );
  });

  it('wraps signed and decimal superscripts', () => {
    expect(fixSubSupBraces('10^-3 + x^2.5')).toBe('10^{-3} + x^{2.5}');
  });

  it('leaves single-token scripts unchanged, even after a multi-letter base', () => {
    const s = String.raw`\mu_s N = mv^2 + x_1 + \tau_L`;
    expect(fixSubSupBraces(s)).toBe(s);
  });

  it('leaves tight products of single-letter subscripts unchanged', () => {
    const s = String.raw`m_1v_1 = m_ec^{2} + k_BT`;
    expect(fixSubSupBraces(s)).toBe(s);
  });

  it('does not double-wrap already-braced scripts or touch escaped underscores', () => {
    const s = String.raw`x_{10} + 10^{-3} + \_10`;
    expect(fixSubSupBraces(s)).toBe(s);
  });
});

describe('EquationProcessor.fixSubSupInMathSpans', () => {
  let proc;

  beforeEach(() => {
    proc = new EquationProcessor({ fix: true });
  });

  it('fixes only inside $$ spans, not URLs or prose', () => {
    const content = ['see page_10.html for the sim.', '$$ x_10 = F_L $$'].join('\n');
    const { content: fixed, fixes } = proc.fixSubSupInMathSpans(content, 't.md');
    expect(fixed).toContain('x_{10} = F_L');
    expect(fixed).toContain('page_10.html');
    expect(fixes).toHaveLength(1);
  });

  it('ignores sub/sup issues inside fenced code blocks', () => {
    const content = ['```', '$$x_10$$', '```'].join('\n');
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
    proc.validateMathSpans('t.md', '$$ x_10 = 1 $$');
    expect(proc.warnings.some(w => w.message.includes('subscript'))).toBe(true);
  });

  it('does not warn on single-token scripts after a multi-letter base', () => {
    proc.validateMathSpans('t.md', String.raw`$$ mg \le \mu_s N = \mu_s m r\omega^2 $$`);
    expect(proc.warnings).toHaveLength(0);
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
