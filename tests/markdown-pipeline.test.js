import { describe, it, expect } from 'vitest';
import { createMarkdown } from '../lib/eleventy/markdown.js';
import { kramdownSlugify } from '../lib/eleventy/kramdown-slugify.js';

// One shared instance — the very same factory eleventy.config.js uses via
// setLibrary, so these tests exercise the real build pipeline (roadmap P4.4).
const md = createMarkdown();

// Helpers to build expected MathJax delimiter output without tripping template-literal ${}.
const span = x => `\\(${x}\\)`;
const blockDiv = x => `\\[\n${x}\n\\]\n`;

describe('kramdown math parity (roadmap 4.1, verified vs kramdown 2.5.1)', () => {
  it('inline $$…$$ becomes \\(...\\) delimiters with trimmed content', () => {
    expect(md.renderInline('$$Q $$')).toBe(span('Q'));
    expect(md.renderInline(String.raw`$$\Delta \text{PE}=q\Delta V $$`)).toBe(
      span(String.raw`\Delta \text{PE}=q\Delta V`)
    );
  });

  it('emits math body RAW (unescaped & and <), exactly as Kramdown does', () => {
    expect(md.renderInline('$$a& =&b$$')).toBe(span('a& =&b'));
    // {d}_{\text{o}}<f  — built by concat so ${ never starts an interpolation
    const inner = `{d}_{${String.raw`\text{o}`}}<f`;
    expect(md.renderInline(`$$${inner} $$`)).toBe(span(inner));
  });

  it('does NOT treat single $ as math (currency stays literal)', () => {
    expect(md.renderInline('costs $5 and $10 total')).toBe('costs $5 and $10 total');
  });

  it('lets the escape rule collapse \\(…\\) / \\[…\\] like Kramdown (not math)', () => {
    expect(md.renderInline(String.raw`Slope of \(v \) vs. \(t\)`)).toBe('Slope of (v ) vs. (t)');
    expect(md.renderInline(String.raw`see \[SID\]`)).toBe('see [SID]');
  });

  it('standalone $$…$$ becomes \\[...\\] display delimiters (no <p> wrapper)', () => {
    expect(md.render(String.raw`$$E_{\text{cap}} = \frac{1}{2}CV^2$$`)).toBe(
      blockDiv(String.raw`E_{\text{cap}} = \frac{1}{2}CV^2`)
    );
  });

  it('preserves \\\\ row separators and & inside a multi-line display block', () => {
    const body = String.raw`\begin{array}{ll} a & b \\ c & d \end{array}`;
    expect(md.render(`$$${body}$$`)).toBe(blockDiv(body));
  });

  it('$$…$$ embedded in a paragraph stays an inline span', () => {
    expect(md.render('where $$Q $$ is the charge')).toBe(
      `<p>where ${span('Q')} is the charge</p>\n`
    );
  });

  it('leaves $$…$$ inside a raw HTML block verbatim (equation divs)', () => {
    const out = md.render(['<div class="equation">', '$$E=mc^2$$', '</div>'].join('\n'));
    expect(out).toContain('<div class="equation">');
    expect(out).toContain('$$E=mc^2$$'); // untouched — raw HTML block left alone
    expect(out).not.toContain('\\(');
    expect(out).not.toContain('\\[');
  });

  it('renders math inside a table cell (inline span)', () => {
    const out = md.render(['| col |', '| --- |', '| $$x^2_0$$ |'].join('\n'));
    expect(out).toContain('<table>');
    expect(out).toContain(span('x^2_0'));
  });

  it('renders math inside a container', () => {
    const out = md.render(['::: example', '', 'Energy is $$E=mc^2$$.', '', ':::'].join('\n'));
    expect(out).toContain('<div class="example">');
    expect(out).toContain(span('E=mc^2'));
  });
});

describe('kramdown-compatible heading ids (roadmap 4.2)', () => {
  it('slugifies like Kramdown auto_id', () => {
    expect(kramdownSlugify('Test Heading Here')).toBe('test-heading-here');
    expect(kramdownSlugify('1. Physics: An Introduction')).toBe('physics-an-introduction');
    expect(kramdownSlugify('')).toBe('section');
  });

  it('emits id= but no tabindex on headings (parity with Kramdown)', () => {
    const out = md.render('## Test Heading Here');
    expect(out).toContain('id="test-heading-here"');
    expect(out).not.toContain('tabindex');
  });
});

describe('IAL folding via markdown-it-attrs (roadmap 4.2)', () => {
  it('binds an inline image IAL to the <img> element', () => {
    const out = md.renderInline(`![alt](../resources/x.jpg 'A caption'){: #Figure1}`);
    expect(out).toMatch(/<img[^>]*id="Figure1"/); // id lands on the img, not a wrapper
  });

  it('binds an end-of-line IAL to the <li> (SUMMARY.md pattern)', () => {
    const out = md.render('1. [Title](file.md) {: .chapter}');
    expect(out).toContain('<li class="chapter">');
  });
});

describe('containers rebuild original elements (roadmap 4.3)', () => {
  it('rebuilds a <div> with all JSON attributes and processes inner markdown', () => {
    const out = md.render(
      [
        '::: note {"class":"note","data-has-label":"true","data-label":"Video"}',
        '',
        '- item one',
        '- item two',
        ':::',
      ].join('\n')
    );
    expect(out).toContain('<div class="note" data-has-label="true" data-label="Video">');
    expect(out).toContain('<li>item one</li>');
    expect(out).toContain('</div>');
  });

  it('defaults to class=type when no JSON blob is given', () => {
    const out = md.render(['::: problem', '', 'Solve it.', '', ':::'].join('\n'));
    expect(out).toContain('<div class="problem">');
  });

  it('emits a <figure> tag for the figure container', () => {
    const out = md.render(['::: figure {"class":"figure"}', '', 'caption', '', ':::'].join('\n'));
    expect(out).toContain('<figure class="figure">');
    expect(out).toContain('</figure>');
  });
});

describe('deflist and footnote plugins', () => {
  it('renders a Kramdown-style definition list', () => {
    const out = md.render(['Term', ': Definition of the term'].join('\n'));
    expect(out).toContain('<dl>');
    expect(out).toContain('<dt>Term</dt>');
    expect(out).toContain('<dd>Definition of the term</dd>');
  });

  it('renders footnotes', () => {
    const out = md.render(['A claim.[^1]', '', '[^1]: The evidence.'].join('\n'));
    expect(out).toContain('footnote');
    expect(out).toContain('The evidence.');
  });
});
