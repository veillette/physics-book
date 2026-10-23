/**
 * Shared helpers for building combined PDFs from several rendered pages.
 *
 * Combined PDFs copy each page's rendered HTML into one blank document. To print the same way as
 * the single-page PDFs, that document links the site stylesheets (theme, book, and print CSS) and
 * keeps each page's `.book` and `main.book-body` wrappers, since most book.css selectors are
 * scoped to them. MathJax CHTML output is unstyled without the CSS MathJax injects into each
 * page's <head> (fractions collapse to flat text), so those rules are collected and re-injected.
 */

/**
 * Start an empty combined document.
 * @param {string} title - Document title, shown in the PDF page header
 */
export function createCombinedDocument(title) {
  return {
    title,
    pages: [],
    bookClass: 'book',
    stylesheets: new Map(),
    mathCss: new Set(),
  };
}

/**
 * Append the rendered main content of the current page to a combined document, collecting its
 * stylesheets and MathJax CSS rules.
 * @param {import('@playwright/test').Page} page
 * @param {ReturnType<typeof createCombinedDocument>} doc
 * @returns {Promise<string>} The page's main content HTML
 */
export async function addPageContent(page, doc) {
  const { html, bookClass, stylesheets, rules } = await page.evaluate(() => {
    const main = document.querySelector('main') || document.querySelector('article');
    const book = document.querySelector('.book');
    return {
      html: main ? main.outerHTML : `<main class="book-body">${document.body.innerHTML}</main>`,
      bookClass: book?.className ?? '',
      stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map(link => ({
        href: link.href,
        media: link.media,
      })),
      rules: [...document.querySelectorAll('style[id^="MJX-"]')].flatMap(style =>
        [...(style.sheet?.cssRules ?? [])].map(rule => rule.cssText)
      ),
    };
  });
  doc.pages.push(html);
  if (bookClass) doc.bookClass = bookClass;
  for (const { href, media } of stylesheets) doc.stylesheets.set(href, media);
  for (const rule of rules) doc.mathCss.add(rule);
  return html;
}

const escapeHtml = text =>
  String(text).replace(
    /[&<>"]/g,
    char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]
  );

/**
 * Serialize a combined document, starting each page after the first on a new sheet.
 * @param {ReturnType<typeof createCombinedDocument>} doc
 * @returns {string}
 */
export function renderCombinedHtml(doc) {
  const links = [...doc.stylesheets]
    .map(
      ([href, media]) =>
        `<link rel="stylesheet" href="${escapeHtml(href)}"${media ? ` media="${escapeHtml(media)}"` : ''} />`
    )
    .join('\n');
  return `<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(doc.title)}</title>
${links}
<style>
.book > main.book-body + main.book-body { break-before: page; }
${[...doc.mathCss].join('\n')}
</style>
</head>
<body>
<div class="${escapeHtml(doc.bookClass)}">
${doc.pages.join('\n')}
</div>
</body>
</html>`;
}
