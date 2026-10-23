import { describe, expect, it } from 'vitest';
import { createCombinedDocument, renderCombinedHtml } from '../scripts/lib/pdf-content.js';

describe('combined PDF document', () => {
  it('links the site stylesheets and keeps the book layout wrappers', () => {
    const doc = createCombinedDocument('Chapter 1: Units & "Measurement"');
    doc.bookClass = 'book with-summary font-size-2 font-family-1';
    doc.stylesheets.set('http://localhost:4000/physics-book/assets/css/book.css', '');
    doc.stylesheets.set('http://localhost:4000/physics-book/assets/css/print.css', 'print');
    doc.mathCss.add('mjx-frac { display: inline-block; }');
    doc.pages.push('<main class="book-body">intro</main>', '<main class="book-body">one</main>');

    const html = renderCombinedHtml(doc);

    expect(html).toContain('<title>Chapter 1: Units &amp; &quot;Measurement&quot;</title>');
    expect(html).toContain(
      '<link rel="stylesheet" href="http://localhost:4000/physics-book/assets/css/book.css" />'
    );
    expect(html).toContain(
      '<link rel="stylesheet" href="http://localhost:4000/physics-book/assets/css/print.css" media="print" />'
    );
    expect(html).toContain('mjx-frac { display: inline-block; }');
    expect(html).toContain(
      '<div class="book with-summary font-size-2 font-family-1">\n<main class="book-body">intro</main>\n<main class="book-body">one</main>\n</div>'
    );
    expect(html).not.toContain('font-family: serif');
  });
});
