/**
 * Shared helpers for building combined PDFs from several rendered pages.
 *
 * Combined PDFs copy each page's rendered HTML into one blank document. MathJax CHTML output
 * is unstyled without the CSS MathJax injects into each page's <head> (fractions collapse to
 * flat text), so those rules are collected alongside the HTML and re-injected.
 */

/**
 * Return the rendered main content of the current page, adding its MathJax CSS rules to
 * `mathCss`.
 * @param {import('@playwright/test').Page} page
 * @param {Set<string>} mathCss - Accumulates MathJax CSS rules across pages (deduplicated)
 * @returns {Promise<string>} The main content's innerHTML
 */
export async function extractPageContent(page, mathCss) {
  const { html, rules } = await page.evaluate(() => {
    const main =
      document.querySelector('.markdown-section') ||
      document.querySelector('main') ||
      document.querySelector('article') ||
      document.body;
    const rules = [...document.querySelectorAll('style[id^="MJX-"]')].flatMap(style =>
      [...(style.sheet?.cssRules ?? [])].map(rule => rule.cssText)
    );
    return { html: main.innerHTML, rules };
  });
  for (const rule of rules) mathCss.add(rule);
  return html;
}

/**
 * Insert the collected MathJax CSS into a combined document's <head>.
 * @param {string} html - Combined document containing a </head>
 * @param {Set<string>} mathCss
 * @returns {string}
 */
export function injectMathCss(html, mathCss) {
  return html.replace('</head>', `<style>${[...mathCss].join('\n')}</style></head>`);
}
