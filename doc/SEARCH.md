# Client-Side Search

The textbook uses self-hosted MiniSearch for full-text search, including fuzzy
matching, title boosting, and prefix matching. Search works offline after its
index and JavaScript modules have been cached. Opening a result offline also
requires that page to have been cached previously.

## Build and Deployment

Eleventy regenerates `summary.json` before each build and
`_site/search_index.json` afterward, including development rebuilds.
`scripts/build-index.js` reads built HTML with Cheerio and serializes a MiniSearch
index with page titles, the first 5,000 characters of page content, URLs, and
200-character previews. Assets, offline pages, and
404 pages are excluded.

To rebuild the index manually after a site build:

```bash
npm run generate:search-index
```

The index contains deployment-relative URLs. `assets/js/search.js` resolves them
using `window.Book.rootUrl`, supporting both `/physics-book/` on GitHub Pages and
`/` on Vercel.

## Search Engine

`assets/js/search.js` exports a singleton, also available as
`window.searchManager`. Its public methods are:

- `init()`: Fetch and load the index.
- `ready()`: Report whether the index has loaded.
- `search(query, maxResults = 10)`: Return ranked results.
- `autoSuggest(query, maxSuggestions = 5)`: Return suggestions for queries of at least two characters.

The index is loaded from its parsed JSON object:

```javascript
this.miniSearch = MiniSearch.loadJS(data.index, {
  fields: ['title', 'content'],
  storeFields: ['title', 'url', 'preview'],
});
```

To adjust matching behavior, edit the options passed to `search()` and
`autoSuggest()` in that module. For example:

```javascript
const results = this.miniSearch.search(query, {
  boost: { title: 2 },
  fuzzy: 0.2,
  prefix: true,
});
```

## User Interface

`assets/js/search-ui.js` provides debounced input (300 ms), highlighted results,
keyboard navigation, a clear button, and click-outside dismissal. The UI requires
at least two characters. `Ctrl+K` / `Cmd+K` focuses the search box; `Escape` closes
the results. Styles live in `assets/css/theme.css`.

## Offline Cache

`sw.njk` includes the search index, self-hosted MiniSearch, and both search modules
in its core cache. It serves the index from cache first, falling back to the
network when absent. A new service-worker cache version replaces the old cache
on activation. When publishing changes that require a fresh cached index, update
`CACHE_VERSION` in `sw.njk`.

The worker covers `/physics-book/` on GitHub Pages and `/` on Vercel. It requires
HTTPS or localhost and must be enabled in the browser.

## Maintenance

- Change the `ignore` patterns in `SearchIndexBuilder.run()` in `scripts/build-index.js` to exclude additional HTML files.
- Dependency versions are maintained in `package.json` and `package-lock.json`.
- Run `npm run update:minisearch` after upgrading MiniSearch to refresh `assets/js/minisearch.js` and its license. The browser uses this local module.

## Troubleshooting

1. Verify `_site/search_index.json` exists after `npm run build`. Use the browser
   Network tab to check that the index and `assets/js/minisearch.js` load successfully.
2. In the browser console, check `window.searchManager?.ready()`. Initialization
   failures log `Failed to initialize search:` with the error.
3. For stale or missing offline results, inspect DevTools → Application → Cache
   Storage and Service Workers. Check the worker version and whether search files
   are cached. Clear site storage and reload online to test a fresh installation.
4. If results are missing, try a query of at least two characters and regenerate
   the index from current HTML. Check index exclusions and the generated URLs.
5. For performance issues, reduce the result count or fuzzy tolerance. Shortening
   previews reduces stored preview data; the indexed content has its own 5,000-character limit.

## Credits and License

Search uses [MiniSearch](https://github.com/lucaong/minisearch) by Luca Ongaro and
follows the project's license.
