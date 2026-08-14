import { createMarkdown } from './lib/eleventy/markdown.js';

// GitHub Pages serves this project site under /physics-book2/ (D5). Vercel serves it at a
// domain root, so it must build with no path prefix — detected via the VERCEL env var that
// Vercel sets automatically. (A CLI `--pathprefix=/` does NOT override, since `/` is
// Eleventy's default, so we key off the environment instead.)
const PATH_PREFIX = process.env.VERCEL ? '/' : '/physics-book2/';

export default function (eleventyConfig) {
  // Input is the repo root, so drive input exclusions explicitly from .eleventyignore
  // rather than .gitignore (which would also drop tracked things we DO build). Eleventy
  // always ignores node_modules regardless.
  eleventyConfig.setUseGitIgnore(false);

  // Custom markdown-it stack (math passthrough, IAL attrs, Kramdown slugs,
  // containers, deflist, footnotes). Shared with the pipeline tests.
  eleventyConfig.setLibrary('md', createMarkdown());

  // Root-relative asset/link URLs get the pathPrefix at build time. We do this with a
  // narrow regex transform instead of HtmlBasePlugin because HtmlBasePlugin normalises
  // relative URLs (`./ch8Foo` -> `ch8Foo`), diverging from the legacy baseurl handling,
  // which prefixes ONLY single-slash root-relative href/src and leaves ./ ../ # http(s)
  // verbatim. This transform reproduces that exactly (byte-parity, D5). Script-body
  // values (window.Book) are attribute-free, so they keep using the `| url` filter,
  // which applies the same pathPrefix once.
  eleventyConfig.addTransform('pathPrefix', function (content) {
    const out = this.page && this.page.outputPath;
    if (typeof out !== 'string' || !out.endsWith('.html')) return content;
    const prefix = PATH_PREFIX.replace(/\/+$/, '');
    if (!prefix) return content; // root-hosted (Vercel): nothing to add
    return content.replace(
      /(\s(?:href|src)=)"(\/(?!\/)[^"]*)"/g,
      (_, pre, url) => `${pre}"${prefix}${url}"`
    );
  });

  // window.Book.rootUrl/baseHref must have NO trailing slash (they concatenate
  // with /SUMMARY.html etc.) — roadmap section 2.3.
  eleventyConfig.addFilter('trimSlash', v => String(v).replace(/\/+$/, ''));

  // Passthrough paths are relative to the project root.
  eleventyConfig.addPassthroughCopy({
    assets: 'assets', // includes js/mathjax, pwa, pdf (when present)
    resources: 'resources',
    'summary.json': 'summary.json',
    'search_index.json': 'search_index.json', // committed copy for local dev; CI regenerates
  });

  return {
    dir: {
      input: '.',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data',
    },
    templateFormats: ['md', 'njk'], // no .html templates (index/sw are .njk now)
    markdownTemplateEngine: false, // D2: nothing touches markdown bodies (protects math)
    htmlTemplateEngine: 'njk',
    pathPrefix: PATH_PREFIX,
  };
}
