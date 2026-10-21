import { describe, it, expect } from 'vitest';
import { convertContent, rendererSupports } from '../scripts/convert-math-delimiters.js';

const md = text => convertContent(text).content;

describe('convertContent', () => {
  it('converts embedded $$…$$ to inline and keeps the inner text as-is', () => {
    expect(md('Speed $$ v = d/t $$ here.')).toBe('Speed \\( v = d/t \\) here.');
  });

  it('converts a $$…$$ alone in its paragraph or list item to display', () => {
    expect(md('Text.\n\n$$x=1$$\n\nMore.')).toBe('Text.\n\n\\[x=1\\]\n\nMore.');
    expect(md('- $$a$$\n- b $$c$$')).toBe('- \\[a\\]\n- b \\(c\\)');
    expect(md('peak emf\n: $$e_0$$')).toBe('peak emf\n: \\[e_0\\]');
  });

  it('converts math inside <div class="equation"> to display', () => {
    expect(md('<div class="equation">\n$$ F = ma $$\n</div>')).toBe(
      '<div class="equation">\n\\[ F = ma \\]\n</div>'
    );
  });

  it('keeps the only paragraph of a ::: container inline, as the renderer does', () => {
    expect(md('::: solution\n\n $$30 \\mu A $$\n\n:::')).toBe(
      '::: solution\n\n \\(30 \\mu A \\)\n\n:::'
    );
  });

  it('pairs $$ per paragraph and leaves a file with an unpaired $$ untouched', () => {
    const text = 'Good $$a$$.\n\nBroken $$b here.\n\nAlso $$c$$.';
    const result = convertContent(text);
    expect(result.content).toBe(text);
    expect(result.problems).toEqual([{ line: 3, message: 'unpaired $$ in this paragraph' }]);
  });

  it('ignores $$ in fenced code and inline code', () => {
    const text = '```\n$$not math$$\n```\n\nUse `$$x$$` for $$y$$.';
    expect(md(text)).toBe('```\n$$not math$$\n```\n\nUse `$$x$$` for \\(y\\).');
  });

  it('uses custom delimiters', () => {
    const out = convertContent('a $$x$$ b\n\n$$y$$', {
      inlineOpen: '$',
      inlineClose: '$',
      displayOpen: '$$\n',
      displayClose: '\n$$',
    }).content;
    expect(out).toBe('a $x$ b\n\n$$\ny\n$$');
  });
});

describe('rendererSupports', () => {
  it('reports that the current renderer does not understand \\( \\) or \\[ \\]', () => {
    const reasons = rendererSupports();
    expect(reasons).toHaveLength(2);
    expect(reasons[0]).toMatch(/^inline/);
    expect(reasons[1]).toMatch(/^display/);
  });

  it('accepts delimiters the renderer turns into math', () => {
    expect(rendererSupports({ inlineOpen: '$$', inlineClose: '$$' })).toHaveLength(1);
  });
});
