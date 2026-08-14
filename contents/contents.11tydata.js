// Directory data for contents/*.md — applies to every content page.
// Enforces the output-path contract: contents/x.md -> contents/x.html
// (not contents/x/index.html). Overriding permalink to `<filePathStem>.html` keeps
// every existing URL, anchor, PDF link, and search index entry stable.
export default {
  layout: 'page',
  eleventyComputed: {
    permalink: data => `${data.page.filePathStem}.html`,
  },
};
