# Client-Side Search Feature

This document describes the offline-capable search functionality implemented for the Physics Book PWA.

## Overview

The search feature provides a fast, offline-capable full-text search across all pages of the textbook using the [MiniSearch](https://github.com/lucaong/minisearch) library.

## Features

- **100% Offline**: Search works completely offline once the index is cached
- **Fuzzy Matching**: Tolerates typos with 0.2 fuzzy tolerance
- **Title Boost**: Search results prioritize title matches with 2x boost
- **Real-time Search**: Results update as you type (with 300ms debounce)
- **Keyboard Shortcuts**: Press `Ctrl+K` (or `Cmd+K` on Mac) to focus the search box
- **Highlighted Results**: Matching terms are highlighted in search results
- **Mobile-Friendly**: Responsive design works on all screen sizes

## Components

### 1. Build Script (`scripts/build-index.js`)

Generates the search index from HTML files after Jekyll builds the site.

**Usage:**

```bash
npm run build-search-index
```

**What it does:**

- Scans all HTML files in the `_site` directory
- Extracts page titles and content using Cheerio
- Creates a MiniSearch index with fuzzy matching and title boosting
- Outputs `search_index.json` to the `_site` directory

**Requirements:**

- Must be run AFTER Jekyll builds the site
- Requires `_site` directory to exist with built HTML files

### 2. Search Module (`assets/js/search.js`)

Client-side search engine that loads and queries the search index.

**Key Functions:**

- `init()`: Loads the search index from `search_index.json`
- `search(query, maxResults)`: Performs a search and returns results
- `autoSuggest(query, maxSuggestions)`: Provides autocomplete suggestions
- `ready()`: Checks if search is initialized

**Configuration:**

- Fuzzy matching: 0.2 tolerance
- Title boost: 2x weight
- Prefix search: Enabled
- Max results: 10 (default)

### 3. Search UI (`assets/js/search-ui.js`)

User interface component that integrates with the book viewer.

**Features:**

- Search input with clear button
- Dropdown results display
- Click-outside-to-close behavior
- Keyboard navigation support
- Debounced input (300ms)

**Keyboard Shortcuts:**

- `Ctrl+K` / `Cmd+K`: Focus search box
- `Escape`: Close search results

### 4. Service Worker Cache

The search index is cached using a "Cache First" strategy to ensure offline availability.

**Cached Files:**

- `search_index.json` - The search index
- `assets/js/search.js` - Search engine
- `assets/js/search-ui.js` - Search UI

**Cache Strategy:**

- Search index uses Cache First strategy
- Always serves from cache when available
- Falls back to network if not cached
- Ensures 100% offline functionality

## Build Process

To integrate search into your build pipeline:

1. **Build the Jekyll site:**

   ```bash
   bundle exec jekyll build
   ```

2. **Generate the search index:**

   ```bash
   npm run build-search-index
   ```

3. **Deploy the `_site` directory** with the generated `search_index.json`

## Configuration

### Adjusting Search Behavior

Edit `assets/js/search.js` to modify search parameters:

```javascript
this.miniSearch = MiniSearch.loadJSON(data.index, {
  fields: ['title', 'content'],
  storeFields: ['title', 'url', 'preview'],
  searchOptions: {
    boost: { title: 2 }, // Adjust title importance
    fuzzy: 0.2, // Adjust fuzzy tolerance (0-1)
    prefix: true, // Enable/disable prefix matching
  },
});
```

### Customizing UI

Edit `assets/css/styles.css` under the "Search UI Styles" section to customize:

- Colors
- Spacing
- Font sizes
- Animation effects

### Excluding Files from Index

Edit `scripts/build-index.js` to exclude specific files:

```javascript
const htmlFiles = glob.sync(`${SITE_DIR}/**/*.html`, {
  ignore: [
    '**/assets/**',
    '**/offline.html',
    '**/404.html',
    '**/your-custom-exclusion.html', // Add here
  ],
});
```

## Troubleshooting

### Search not working

1. **Check if index is loaded:**
   - Open browser console
   - Look for "Search index loaded: N documents indexed"
   - If not present, the index failed to load

2. **Check index file exists:**
   - Verify `search_index.json` exists in the `_site` directory
   - Check network tab to see if file loads successfully

3. **Check service worker cache:**
   - Open DevTools → Application → Cache Storage
   - Verify search files are cached

### No results found

1. **Check index generation:**
   - Run `npm run build-search-index`
   - Check console output for errors
   - Verify HTML files exist in `_site`

2. **Check search query:**
   - Minimum 2 characters required
   - Try different search terms
   - Check for typos (fuzzy match has limits)

### Performance issues

1. **Large index size:**
   - Consider limiting content preview size in `build-index.js`
   - Reduce max results in search UI

2. **Slow search:**
   - Check browser console for errors
   - Verify MiniSearch CDN is accessible
   - Consider reducing fuzzy tolerance

## Dependencies

- **minisearch** (^7.1.0): Client-side search library
- **cheerio** (^1.0.0): HTML parsing for index generation
- **glob** (^10.3.10): File pattern matching

## License

This search implementation is part of the Physics Book project and follows the same license.

## Credits

- Built with [MiniSearch](https://github.com/lucaong/minisearch) by Luca Ongaro
- Inspired by GitBook's search functionality
