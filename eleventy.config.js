import { createMarkdown } from './lib/eleventy/markdown.js';
import { buildSearchIndex } from './scripts/build-index.js';
import { SummaryParser } from './scripts/parse-summary.js';

// GitHub Pages serves this project site under /physics-book/ (D5). Vercel serves it at a
// domain root, so it must build with no path prefix — detected via the VERCEL env var that
// Vercel sets automatically. (A CLI `--pathprefix=/` does NOT override, since `/` is
// Eleventy's default, so we key off the environment instead.)
const PATH_PREFIX = process.env.VERCEL ? '/' : '/physics-book/';

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

  // Automatically parse SUMMARY.md before each build so summary.json is always fresh.
  eleventyConfig.on('eleventy.before', async () => {
    const parser = new SummaryParser({ silent: true });
    if (!(await parser.run())) throw new Error('Failed to generate summary.json');
  });

  // Automatically generate client-side search index after each build.
  eleventyConfig.on('eleventy.after', async ({ directories }) => {
    const siteDir = directories.output;
    const success = await buildSearchIndex({
      siteDir,
      output: 'search_index.json',
      baseUrl: '',
      silent: true,
    });
    if (!success) throw new Error('Failed to generate search index');
  });

  // Passthrough paths are relative to the project root.
  eleventyConfig.addPassthroughCopy({
    assets: 'assets', // includes js/mathjax, pwa, pdf (when present)
    resources: 'resources',
    'summary.json': 'summary.json',
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
