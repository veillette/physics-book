# Jekyll to Eleventy Migration Plan

## Physics Textbook Static Site Migration

**Current Stack:** Jekyll 4.4, Ruby, Kramdown
**Target Stack:** Eleventy (11ty), Node.js, markdown-it

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Pre-Migration Assessment](#2-pre-migration-assessment)
3. [Phase 1: Project Setup](#3-phase-1-project-setup)
4. [Phase 2: Configuration Migration](#4-phase-2-configuration-migration)
5. [Phase 3: Template Conversion](#5-phase-3-template-conversion)
6. [Phase 4: Markdown Processing](#6-phase-4-markdown-processing)
7. [Phase 5: Content Migration](#7-phase-5-content-migration)
8. [Phase 6: Asset Pipeline](#8-phase-6-asset-pipeline)
9. [Phase 7: Navigation & Data](#9-phase-7-navigation--data)
10. [Phase 8: PWA & Service Worker](#10-phase-8-pwa--service-worker)
11. [Phase 9: Build & Deploy](#11-phase-9-build--deploy)
12. [Phase 10: Testing & Validation](#12-phase-10-testing--validation)
13. [Appendix: File Mappings](#appendix-file-mappings)

---

## 1. Executive Summary

### Migration Scope

| Component | Count | Complexity |
|-----------|-------|------------|
| Markdown content files | 282 | Medium |
| Layout templates | 2 | Low |
| Include partials | 2 | Low |
| CSS files | 2 | Low (no changes) |
| JavaScript modules | 6 | Low (no changes) |
| Resource images | 100+ | Low (copy) |
| Custom Kramdown syntax | High | **High** |

### Key Challenges

1. **Kramdown attribute syntax** (`{: #id .class}`) - Not supported in standard markdown-it
2. **Nested HTML with `markdown="1"`** - Requires custom processing
3. **MathJax delimiters** - Need preservation during markdown processing
4. **Dynamic client-side rendering** - Keep existing JavaScript intact

### Migration Strategy

Use a **parallel migration** approach:
- Keep existing Jekyll site functional during migration
- Build Eleventy site in separate directory structure
- Validate content parity before cutover

---

## 2. Pre-Migration Assessment

### Current Jekyll Structure

```
physics-book/
├── _includes/
│   ├── head.html          → src/_includes/head.njk
│   └── foot.html          → src/_includes/foot.njk
├── _layouts/
│   ├── default.html       → src/_includes/layouts/default.njk
│   └── page.html          → src/_includes/layouts/page.njk
├── assets/
│   ├── css/               → src/assets/css/ (copy)
│   ├── js/                → src/assets/js/ (copy)
│   └── manifest/          → src/assets/manifest/ (copy)
├── contents/              → src/contents/ (process)
├── resources/             → src/resources/ (copy)
├── summary.json           → src/_data/summary.json
├── SUMMARY.md             → (keep for reference)
├── index.html             → src/index.njk
├── serviceWorker.js       → src/serviceWorker.js
├── Gemfile                → (remove after migration)
└── package.json           → package.json (update)
```

### Dependencies to Add

```json
{
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0",
    "@11ty/eleventy-plugin-syntaxhighlight": "^5.0.0",
    "markdown-it": "^14.0.0",
    "markdown-it-attrs": "^4.1.6",
    "markdown-it-bracketed-spans": "^1.0.1",
    "markdown-it-container": "^4.0.0",
    "markdown-it-implicit-figures": "^0.12.0",
    "markdown-it-anchor": "^8.6.7"
  }
}
```

---

## 3. Phase 1: Project Setup

### Step 1.1: Initialize Eleventy Project

```bash
# Create new directory structure (don't disrupt Jekyll)
mkdir -p src/_includes/layouts
mkdir -p src/_data
mkdir -p src/contents
mkdir -p src/assets

# Install Eleventy and dependencies
npm install --save-dev @11ty/eleventy@^3.0.0
npm install --save-dev markdown-it markdown-it-attrs markdown-it-container
npm install --save-dev markdown-it-implicit-figures markdown-it-anchor
npm install --save-dev markdown-it-bracketed-spans
```

### Step 1.2: Create `.eleventy.js` Configuration

Create file: **`.eleventy.js`**

```javascript
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItContainer from 'markdown-it-container';
import markdownItImplicitFigures from 'markdown-it-implicit-figures';

export default function(eleventyConfig) {

  // ============================================
  // MARKDOWN CONFIGURATION
  // ============================================

  const mdOptions = {
    html: true,           // Allow HTML in markdown
    breaks: false,        // Don't convert \n to <br>
    linkify: true,        // Auto-convert URLs to links
    typographer: false    // Don't smart-quote (interferes with math)
  };

  const md = markdownIt(mdOptions)
    .use(markdownItAttrs, {
      // Kramdown-style attributes: {: #id .class key="value"}
      leftDelimiter: '{:',
      rightDelimiter: '}',
      allowedAttributes: ['id', 'class', 'height', 'width', 'data-label', 'data-element-type']
    })
    .use(markdownItAnchor, {
      permalink: false,
      level: [1, 2, 3]
    })
    .use(markdownItImplicitFigures, {
      figcaption: true,
      copyAttrs: '^(id|class)$'
    });

  // Custom container for notes, examples, exercises
  const containerTypes = ['note', 'example', 'exercise', 'abstract', 'equation'];
  containerTypes.forEach(type => {
    md.use(markdownItContainer, type, {
      validate: () => true,
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          return `<div class="${type}">\n`;
        }
        return '</div>\n';
      }
    });
  });

  eleventyConfig.setLibrary('md', md);

  // ============================================
  // PASSTHROUGH COPIES
  // ============================================

  // Static assets (no processing needed)
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/assets/manifest');
  eleventyConfig.addPassthroughCopy('src/resources');
  eleventyConfig.addPassthroughCopy('src/serviceWorker.js');
  eleventyConfig.addPassthroughCopy('src/cover.png');
  eleventyConfig.addPassthroughCopy('src/cover_small.png');

  // ============================================
  // COLLECTIONS
  // ============================================

  // Create chapters collection sorted by chapterNumber
  eleventyConfig.addCollection('chapters', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/contents/*.md')
      .filter(item => item.data.sectionNumber === 0 || item.data.sectionNumber === undefined)
      .sort((a, b) => (a.data.chapterNumber || 0) - (b.data.chapterNumber || 0));
  });

  // Create all sections collection
  eleventyConfig.addCollection('sections', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/contents/*.md')
      .sort((a, b) => {
        const chapterDiff = (a.data.chapterNumber || 0) - (b.data.chapterNumber || 0);
        if (chapterDiff !== 0) return chapterDiff;
        return (a.data.sectionNumber || 0) - (b.data.sectionNumber || 0);
      });
  });

  // ============================================
  // FILTERS
  // ============================================

  // Convert .md links to .html
  eleventyConfig.addFilter('mdToHtml', (content) => {
    if (!content) return content;
    return content.replace(/\.md([)"'\s])/g, '.html$1');
  });

  // Get sections for a chapter
  eleventyConfig.addFilter('getSections', (sections, chapterNumber) => {
    return sections.filter(s => s.data.chapterNumber === chapterNumber && s.data.sectionNumber > 0);
  });

  // ============================================
  // SHORTCODES
  // ============================================

  // Figure shortcode for consistent image handling
  eleventyConfig.addShortcode('figure', function(src, alt, caption, id) {
    const idAttr = id ? ` id="${id}"` : '';
    const captionHtml = caption ? `<figcaption>${caption}</figcaption>` : '';
    return `<figure${idAttr}>
      <img src="${src}" alt="${alt || ''}" loading="lazy">
      ${captionHtml}
    </figure>`;
  });

  // Equation shortcode with auto-numbering via CSS
  eleventyConfig.addShortcode('equation', function(latex, id) {
    const idAttr = id ? ` id="${id}"` : '';
    return `<div class="equation"${idAttr}>
$$${latex}$$
</div>`;
  });

  // ============================================
  // TRANSFORMS
  // ============================================

  // Post-process HTML to handle remaining Kramdown syntax
  eleventyConfig.addTransform('kramdownCleanup', function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) {
      return content;
    }

    // Remove any remaining {: } attributes that weren't processed
    content = content.replace(/\{:\s*[^}]+\}/g, '');

    // Fix any double-encoded HTML entities in math
    content = content.replace(/&amp;/g, '&');

    return content;
  });

  // ============================================
  // CONFIGURATION
  // ============================================

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    pathPrefix: '/physics-book/'
  };
}
```

### Step 1.3: Update `package.json`

Add scripts to **`package.json`**:

```json
{
  "name": "physics-book",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "build": "eleventy",
    "serve": "eleventy --serve",
    "watch": "eleventy --watch",
    "debug": "DEBUG=Eleventy* eleventy",
    "clean": "rm -rf _site",
    "migrate:content": "node scripts/migrate-content.js",
    "migrate:validate": "node scripts/validate-migration.js"
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0",
    "markdown-it": "^14.0.0",
    "markdown-it-attrs": "^4.1.6",
    "markdown-it-anchor": "^8.6.7",
    "markdown-it-container": "^4.0.0",
    "markdown-it-implicit-figures": "^0.12.0",
    "markdown-it-bracketed-spans": "^1.0.1"
  },
  "dependencies": {
    "@playwright/test": "^1.57.0",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.1",
    "sharp": "^0.32.3",
    "simple-git": "^3.19.1"
  }
}
```

---

## 4. Phase 2: Configuration Migration

### Step 2.1: Create Global Data File

Create file: **`src/_data/site.json`**

```json
{
  "title": "General Physics",
  "description": "An open-source physics textbook",
  "url": "https://yourdomain.com",
  "baseUrl": "/physics-book/",
  "themeColor": "#3367D6",
  "author": "Physics Book Contributors",
  "buildTime": ""
}
```

### Step 2.2: Create Eleventy Data File for Build Time

Create file: **`src/_data/eleventyComputed.js`**

```javascript
export default {
  buildTime: () => new Date().toISOString()
};
```

### Step 2.3: Copy and Adapt summary.json

```bash
# Copy existing summary.json to _data folder
cp summary.json src/_data/summary.json
```

The existing `summary.json` structure works perfectly with Eleventy's data cascade.

---

## 5. Phase 3: Template Conversion

### Step 3.1: Convert `head.html` → `head.njk`

Create file: **`src/_includes/head.njk`**

```html
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="{{ site.themeColor }}">

  <title>{% if title %}{{ title }} | {% endif %}{{ site.title }}</title>

  <link rel="manifest" href="{{ site.baseUrl }}assets/manifest/manifest.json">
  <link rel="stylesheet" href="{{ site.baseUrl }}assets/css/theme.css">
  <link rel="stylesheet" href="{{ site.baseUrl }}assets/css/book.css">

  <script>
    window.Book = {
      basePath: '{{ site.baseUrl }}',
      contentPath: '{{ site.baseUrl }}contents/',
      summaryUrl: '{{ site.baseUrl }}summary.json'
    };
  </script>

  <script src="{{ site.baseUrl }}assets/js/math-config.js"></script>
  <script src="{{ site.baseUrl }}assets/js/book-config.js"></script>
  <script src="{{ site.baseUrl }}assets/js/util.js"></script>
  <script src="{{ site.baseUrl }}assets/js/book-viewer.js"></script>
  <script src="{{ site.baseUrl }}assets/js/register-sw.js"></script>
</head>
```

### Step 3.2: Convert `foot.html` → `foot.njk`

Create file: **`src/_includes/foot.njk`**

```html
<footer class="book-footer">
  <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">
    <img src="{{ site.baseUrl }}resources/by_license.svg" alt="Creative Commons License">
  </a>
</footer>
```

### Step 3.3: Convert `default.html` → `default.njk`

Create file: **`src/_includes/layouts/default.njk`**

```html
<!DOCTYPE html>
<html lang="en-us">
{% include "head.njk" %}
<body>
  {{ content | safe }}
  {% include "foot.njk" %}
</body>
</html>
```

### Step 3.4: Convert `page.html` → `page.njk`

Create file: **`src/_includes/layouts/page.njk`**

```html
<!DOCTYPE html>
<html lang="en-us">
{% include "head.njk" %}
<body>
  <article class="page-content">
    <h1 class="page-title">{{ title }}</h1>
    {{ content | safe }}
  </article>
  {% include "foot.njk" %}
</body>
</html>
```

### Template Conversion Reference

| Jekyll (Liquid) | Eleventy (Nunjucks) |
|-----------------|---------------------|
| `{{ page.title }}` | `{{ title }}` |
| `{{ content }}` | `{{ content \| safe }}` |
| `{% include head.html %}` | `{% include "head.njk" %}` |
| `{{ site.baseurl }}` | `{{ site.baseUrl }}` |
| `{% for item in collection %}` | `{% for item in collection %}` |
| `{% if condition %}` | `{% if condition %}` |
| `{{ variable \| filter }}` | `{{ variable \| filter }}` |

---

## 6. Phase 4: Markdown Processing

### Step 4.1: Create Custom Markdown Pre-processor

The biggest challenge is converting Kramdown-specific syntax. Create a migration script.

Create file: **`scripts/migrate-content.js`**

```javascript
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SOURCE_DIR = './contents';
const TARGET_DIR = './src/contents';

/**
 * Process Kramdown-specific syntax for markdown-it compatibility
 */
function processKramdownSyntax(content) {
  let processed = content;

  // 1. Convert Kramdown image attributes
  // FROM: ![alt](image.jpg "title")
  //       {: #Figure1 height="200"}
  // TO:   ![alt](image.jpg "title"){: #Figure1 height="200"}
  processed = processed.replace(
    /(\!\[.*?\]\(.*?\))\s*\n\{:\s*([^}]+)\}/g,
    '$1{: $2}'
  );

  // 2. Handle markdown="1" in HTML blocks
  // This requires the HTML to be on its own line and properly closed
  // markdown-it handles this with html: true option

  // 3. Convert standalone Kramdown class assignments on lists
  // FROM: * Item text
  //       {: .classname}
  // TO:   * Item text {: .classname}
  processed = processed.replace(
    /^(\s*[\*\-]\s+.+)\n(\{:\s*\.[^}]+\})/gm,
    '$1 $2'
  );

  // 4. Preserve math delimiters by adding markers
  // This prevents markdown-it from processing them
  // Inline math: $$ ... $$
  processed = processed.replace(
    /\$\$([^$]+)\$\$/g,
    (match, math) => `\\(${math}\\)`
  );

  // 5. Handle display math blocks
  // These should already work if html: true is enabled

  // 6. Fix relative image paths for new structure
  processed = processed.replace(
    /\(\.\.\/resources\//g,
    '(/physics-book/resources/'
  );

  // 7. Convert .md links to point to correct location
  processed = processed.replace(
    /\]\(contents\//g,
    '](/physics-book/contents/'
  );

  return processed;
}

/**
 * Process front matter adjustments
 */
function processFrontMatter(data) {
  const processed = { ...data };

  // Ensure layout is set
  if (!processed.layout) {
    processed.layout = 'page';
  }

  // Add permalink for clean URLs (optional)
  // processed.permalink = `/contents/{{ page.fileSlug }}/`;

  return processed;
}

/**
 * Migrate a single markdown file
 */
async function migrateFile(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const targetPath = path.join(TARGET_DIR, filename);

  try {
    const source = await readFile(sourcePath, 'utf-8');
    const { data, content } = matter(source);

    const processedData = processFrontMatter(data);
    const processedContent = processKramdownSyntax(content);

    const output = matter.stringify(processedContent, processedData);

    await writeFile(targetPath, output, 'utf-8');
    console.log(`✓ Migrated: ${filename}`);

    return { success: true, filename };
  } catch (error) {
    console.error(`✗ Error migrating ${filename}:`, error.message);
    return { success: false, filename, error: error.message };
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting content migration...\n');

  // Create target directory
  if (!existsSync(TARGET_DIR)) {
    await mkdir(TARGET_DIR, { recursive: true });
  }

  // Get all markdown files
  const files = await readdir(SOURCE_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  console.log(`Found ${mdFiles.length} markdown files to migrate.\n`);

  // Process all files
  const results = await Promise.all(mdFiles.map(migrateFile));

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success);

  console.log('\n========================================');
  console.log(`Migration complete: ${successful}/${mdFiles.length} files successful`);

  if (failed.length > 0) {
    console.log('\nFailed files:');
    failed.forEach(f => console.log(`  - ${f.filename}: ${f.error}`));
  }
}

migrate().catch(console.error);
```

### Step 4.2: Handle Complex Kramdown HTML Blocks

The existing content uses HTML blocks with `markdown="1"` attribute extensively:

```html
<div class="abstract" markdown="1">
* Learning objective 1
* Learning objective 2
</div>
```

**Solution A: markdown-it-container plugin (Recommended)**

Modify `.eleventy.js` to handle these patterns:

```javascript
// Add custom rule to handle markdown="1" attribute
md.core.ruler.push('markdown_in_html', function(state) {
  const tokens = state.tokens;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'html_block') {
      const content = tokens[i].content;

      // Check for markdown="1" attribute
      if (content.includes('markdown="1"')) {
        // Extract inner content and parse it
        const match = content.match(/<(\w+)[^>]*markdown="1"[^>]*>([\s\S]*?)<\/\1>/);
        if (match) {
          const [fullMatch, tag, innerContent] = match;
          const parsedInner = md.render(innerContent);
          tokens[i].content = content.replace(
            fullMatch,
            `<${tag}${match[0].match(/class="[^"]*"/)?.[0] || ''}>${parsedInner}</${tag}>`
          );
        }
      }
    }
  }
});
```

**Solution B: Pre-process during migration**

Add to `migrate-content.js`:

```javascript
/**
 * Convert markdown="1" blocks to fenced containers
 */
function convertMarkdownBlocks(content) {
  // Pattern: <div class="example" markdown="1">...</div>
  const blockPattern = /<(div|section)\s+([^>]*?)markdown="1"([^>]*)>([\s\S]*?)<\/\1>/g;

  return content.replace(blockPattern, (match, tag, beforeAttr, afterAttr, inner) => {
    // Extract class name
    const classMatch = (beforeAttr + afterAttr).match(/class="([^"]+)"/);
    const className = classMatch ? classMatch[1] : 'block';

    // Extract other attributes
    const dataAttrs = (beforeAttr + afterAttr)
      .match(/data-[^=]+="[^"]+"/g) || [];

    return `<div class="${className}"${dataAttrs.length ? ' ' + dataAttrs.join(' ') : ''}>

${inner.trim()}

</div>`;
  });
}
```

### Step 4.3: Math Delimiter Handling

Create file: **`src/_includes/mathjax-config.njk`** (already handled by existing `math-config.js`)

The existing JavaScript configuration should work as-is. Ensure delimiters are preserved:

```javascript
// In .eleventy.js - add escape for math
eleventyConfig.addFilter('escapeMath', (content) => {
  // Temporarily replace math blocks
  const mathBlocks = [];
  let idx = 0;

  content = content.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    mathBlocks.push(match);
    return `%%MATH_BLOCK_${idx++}%%`;
  });

  content = content.replace(/\\\([\s\S]*?\\\)/g, (match) => {
    mathBlocks.push(match);
    return `%%MATH_BLOCK_${idx++}%%`;
  });

  // Restore after markdown processing
  return { content, mathBlocks };
});

eleventyConfig.addFilter('restoreMath', (data) => {
  let { content, mathBlocks } = data;
  mathBlocks.forEach((block, idx) => {
    content = content.replace(`%%MATH_BLOCK_${idx}%%`, block);
  });
  return content;
});
```

---

## 7. Phase 5: Content Migration

### Step 5.1: Run Migration Script

```bash
# Ensure target directories exist
mkdir -p src/contents
mkdir -p src/resources
mkdir -p src/assets

# Run content migration
npm run migrate:content

# Copy static resources
cp -r resources/* src/resources/
cp -r assets/* src/assets/
cp summary.json src/_data/
cp serviceWorker.js src/
cp cover.png cover_small.png src/
```

### Step 5.2: Convert index.html

Create file: **`src/index.njk`**

```html
---
layout: default
title: Home
---

<main class="book-landing">
  <div class="book-cover">
    <img src="{{ site.baseUrl }}cover.png" alt="{{ site.title }} Cover">
  </div>

  <div class="book-info">
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>

    <nav class="book-toc">
      <h2>Table of Contents</h2>
      <ol>
        {% for chapter in summary.chapters %}
        <li>
          <a href="{{ site.baseUrl }}{{ chapter.chapterFile | replace('.md', '.html') }}">
            {{ chapter.chapterTitle }}
          </a>
          {% if chapter.sections.length %}
          <ol>
            {% for section in chapter.sections %}
            <li>
              <a href="{{ site.baseUrl }}{{ section.sectionFile | replace('.md', '.html') }}">
                {{ section.sectionTitle }}
              </a>
            </li>
            {% endfor %}
          </ol>
          {% endif %}
        </li>
        {% endfor %}
      </ol>
    </nav>
  </div>
</main>
```

### Step 5.3: Front Matter Defaults

Create file: **`src/contents/contents.json`** (directory data file)

```json
{
  "layout": "page",
  "tags": ["content"],
  "permalink": "/contents/{{ page.fileSlug }}.html"
}
```

This automatically applies to all files in the `contents/` directory.

---

## 8. Phase 6: Asset Pipeline

### Step 6.1: Passthrough Copy (Already configured)

The `.eleventy.js` configuration includes:

```javascript
eleventyConfig.addPassthroughCopy('src/assets/css');
eleventyConfig.addPassthroughCopy('src/assets/js');
eleventyConfig.addPassthroughCopy('src/assets/manifest');
eleventyConfig.addPassthroughCopy('src/resources');
```

### Step 6.2: Optional - Image Optimization Plugin

For production optimization, add:

```bash
npm install --save-dev @11ty/eleventy-img
```

Add to `.eleventy.js`:

```javascript
import Image from '@11ty/eleventy-img';

// Async shortcode for optimized images
eleventyConfig.addAsyncShortcode('image', async function(src, alt, sizes = '100vw') {
  const metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ['webp', 'jpeg'],
    outputDir: './_site/img/',
    urlPath: '/physics-book/img/'
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
});
```

### Step 6.3: CSS/JS Bundling (Optional)

For optimization, consider adding:

```bash
npm install --save-dev esbuild
```

Create file: **`scripts/bundle-assets.js`**

```javascript
import * as esbuild from 'esbuild';

// Bundle JavaScript
await esbuild.build({
  entryPoints: ['src/assets/js/book-viewer.js'],
  bundle: true,
  minify: true,
  outfile: '_site/assets/js/bundle.js',
});

// Minify CSS
await esbuild.build({
  entryPoints: ['src/assets/css/styles.css'],
  bundle: true,
  minify: true,
  outfile: '_site/assets/css/styles.min.css',
});
```

---

## 9. Phase 7: Navigation & Data

### Step 7.1: Use Existing summary.json

The `summary.json` file is already well-structured:

```json
{
  "chapters": [
    {
      "chapterNumber": 1,
      "chapterTitle": "Introduction: The Nature of Science and Physics",
      "chapterFile": "contents/ch1IntroductionTheNatureOfScienceAndPhysics.md",
      "sections": [...]
    }
  ]
}
```

Access in templates as `{{ summary.chapters }}`.

### Step 7.2: Create Navigation Include

Create file: **`src/_includes/navigation.njk`**

```html
<nav class="book-navigation" aria-label="Book navigation">
  <div class="nav-chapters">
    {% for chapter in summary.chapters %}
    <div class="nav-chapter">
      <a href="{{ site.baseUrl }}{{ chapter.chapterFile | replace('.md', '.html') }}"
         class="chapter-link{% if page.url == '/' + chapter.chapterFile | replace('.md', '.html') %} active{% endif %}">
        <span class="chapter-number">{{ chapter.chapterNumber }}.</span>
        {{ chapter.chapterTitle }}
      </a>

      {% if chapter.sections.length %}
      <ul class="nav-sections">
        {% for section in chapter.sections %}
        <li>
          <a href="{{ site.baseUrl }}{{ section.sectionFile | replace('.md', '.html') }}"
             class="section-link{% if page.url == '/' + section.sectionFile | replace('.md', '.html') %} active{% endif %}">
            {{ chapter.chapterNumber }}.{{ section.sectionNumber }} {{ section.sectionTitle }}
          </a>
        </li>
        {% endfor %}
      </ul>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</nav>
```

### Step 7.3: Previous/Next Navigation

Add to **`src/_includes/layouts/page.njk`**:

```html
{% set allContent = collections.sections %}
{% set currentIndex = 0 %}
{% for item in allContent %}
  {% if item.url == page.url %}
    {% set currentIndex = loop.index0 %}
  {% endif %}
{% endfor %}

{% set previousPage = allContent[currentIndex - 1] if currentIndex > 0 else null %}
{% set nextPage = allContent[currentIndex + 1] if currentIndex < allContent.length - 1 else null %}

<nav class="page-navigation" aria-label="Page navigation">
  {% if previousPage %}
  <a href="{{ previousPage.url }}" class="nav-prev">
    ← {{ previousPage.data.title }}
  </a>
  {% endif %}

  {% if nextPage %}
  <a href="{{ nextPage.url }}" class="nav-next">
    {{ nextPage.data.title }} →
  </a>
  {% endif %}
</nav>
```

---

## 10. Phase 8: PWA & Service Worker

### Step 10.1: Update Service Worker Paths

The existing `serviceWorker.js` should work with minimal changes. Update cache paths:

```javascript
// In serviceWorker.js - update CACHE_URLS if needed
const CACHE_URLS = [
  '/physics-book/',
  '/physics-book/assets/css/theme.css',
  '/physics-book/assets/css/book.css',
  '/physics-book/assets/js/book-viewer.js',
  // ... etc
];
```

### Step 10.2: Generate Service Worker Cache List

Create file: **`scripts/generate-sw-cache.js`**

```javascript
import { readdir, writeFile } from 'fs/promises';
import path from 'path';

async function generateCacheList() {
  const siteDir = './_site';
  const cacheUrls = ['/physics-book/'];

  // Add all HTML files
  const htmlFiles = await getFilesRecursive(siteDir, '.html');
  htmlFiles.forEach(f => {
    cacheUrls.push('/physics-book/' + f.replace(siteDir + '/', ''));
  });

  // Add assets
  const cssFiles = await getFilesRecursive(siteDir + '/assets/css', '.css');
  const jsFiles = await getFilesRecursive(siteDir + '/assets/js', '.js');

  // Generate updated service worker
  const swContent = `
const CACHE_NAME = 'physics-book-v${Date.now()}';
const CACHE_URLS = ${JSON.stringify(cacheUrls, null, 2)};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_URLS))
  );
});
// ... rest of service worker code
`;

  await writeFile('./_site/serviceWorker.js', swContent);
}

async function getFilesRecursive(dir, ext) {
  // Implementation to recursively get files
}

generateCacheList();
```

---

## 11. Phase 9: Build & Deploy

### Step 11.1: Build Commands

```bash
# Development
npm run serve    # Starts dev server at http://localhost:8080

# Production build
npm run build    # Outputs to _site/

# Clean build
npm run clean && npm run build
```

### Step 11.2: GitHub Pages Deployment

Create file: **`.github/workflows/deploy.yml`**

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 11.3: Netlify Deployment (Alternative)

Create file: **`netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "_site"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/physics-book/*"
  to = "/:splat"
  status = 200
```

---

## 12. Phase 10: Testing & Validation

### Step 12.1: Create Validation Script

Create file: **`scripts/validate-migration.js`**

```javascript
import { readdir, readFile } from 'fs/promises';
import path from 'path';

const JEKYLL_DIR = './contents';
const ELEVENTY_DIR = './_site/contents';

async function validateMigration() {
  console.log('Validating migration...\n');

  const sourceFiles = await readdir(JEKYLL_DIR);
  const mdFiles = sourceFiles.filter(f => f.endsWith('.md'));

  let passed = 0;
  let failed = 0;
  const errors = [];

  for (const file of mdFiles) {
    const htmlFile = file.replace('.md', '.html');
    const outputPath = path.join(ELEVENTY_DIR, htmlFile);

    try {
      const html = await readFile(outputPath, 'utf-8');

      // Check for critical elements
      const checks = [
        { name: 'Has title', test: html.includes('<h1') },
        { name: 'Has content', test: html.length > 500 },
        { name: 'No broken Kramdown', test: !html.includes('{:') },
        { name: 'Math preserved', test: !html.includes('$$') || html.includes('\\(') || html.includes('\\[') },
        { name: 'Images have src', test: !html.includes('src=""') },
      ];

      const failures = checks.filter(c => !c.test);

      if (failures.length === 0) {
        passed++;
      } else {
        failed++;
        errors.push({
          file: htmlFile,
          issues: failures.map(f => f.name)
        });
      }
    } catch (err) {
      failed++;
      errors.push({
        file: htmlFile,
        issues: ['File not generated']
      });
    }
  }

  console.log('========================================');
  console.log(`Validation complete: ${passed}/${mdFiles.length} passed\n`);

  if (errors.length > 0) {
    console.log('Issues found:');
    errors.forEach(e => {
      console.log(`\n  ${e.file}:`);
      e.issues.forEach(i => console.log(`    - ${i}`));
    });
  }
}

validateMigration().catch(console.error);
```

### Step 12.2: Visual Regression Testing

Leverage existing Playwright setup:

Create file: **`tests/migration-visual.spec.js`**

```javascript
import { test, expect } from '@playwright/test';

const PAGES_TO_TEST = [
  '/',
  '/contents/ch1PhysicsAnIntroduction.html',
  '/contents/ch10RotationalMotionAndAngularMomentum.html',
  '/contents/appendixA.html',
];

for (const pagePath of PAGES_TO_TEST) {
  test(`Visual check: ${pagePath}`, async ({ page }) => {
    await page.goto(`http://localhost:8080/physics-book${pagePath}`);

    // Wait for MathJax to render
    await page.waitForFunction(() => {
      return window.MathJax && window.MathJax.isReady;
    }, { timeout: 10000 }).catch(() => {});

    // Take screenshot
    await expect(page).toHaveScreenshot(`${pagePath.replace(/\//g, '_')}.png`, {
      fullPage: true,
      maxDiffPixels: 100
    });
  });
}
```

### Step 12.3: Content Parity Check

Create file: **`scripts/compare-output.js`**

```javascript
import { readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';

async function comparePages(jekyllUrl, eleventyUrl) {
  // Fetch both versions
  const jekyllHtml = await fetch(jekyllUrl).then(r => r.text());
  const eleventyHtml = await fetch(eleventyUrl).then(r => r.text());

  const jekyllDom = new JSDOM(jekyllHtml);
  const eleventyDom = new JSDOM(eleventyHtml);

  // Compare key elements
  const jekyllH1 = jekyllDom.window.document.querySelector('h1')?.textContent;
  const eleventyH1 = eleventyDom.window.document.querySelector('h1')?.textContent;

  const jekyllImages = jekyllDom.window.document.querySelectorAll('img').length;
  const eleventyImages = eleventyDom.window.document.querySelectorAll('img').length;

  return {
    titleMatch: jekyllH1 === eleventyH1,
    imageCountMatch: jekyllImages === eleventyImages,
    jekyllImages,
    eleventyImages
  };
}
```

---

## Appendix: File Mappings

### Complete Directory Mapping

```
JEKYLL                          ELEVENTY
──────────────────────────────────────────────────────────
_includes/                      src/_includes/
  head.html                       head.njk
  foot.html                       foot.njk

_layouts/                       src/_includes/layouts/
  default.html                    default.njk
  page.html                       page.njk

contents/                       src/contents/
  *.md                            *.md (processed)

assets/                         src/assets/
  css/                            css/ (copy)
  js/                             js/ (copy)
  manifest/                       manifest/ (copy)

resources/                      src/resources/
  *.jpg, *.png, *.svg             *.jpg, *.png, *.svg (copy)

index.html                      src/index.njk
summary.json                    src/_data/summary.json
serviceWorker.js                src/serviceWorker.js

(new files)
                                src/_data/site.json
                                src/contents/contents.json
                                .eleventy.js
                                scripts/migrate-content.js
                                scripts/validate-migration.js
```

### Syntax Conversion Reference

| Kramdown | markdown-it + plugins |
|----------|----------------------|
| `{: #id}` | `{: #id}` (via markdown-it-attrs) |
| `{: .class}` | `{: .class}` (via markdown-it-attrs) |
| `{: key="val"}` | `{: key="val"}` (via markdown-it-attrs) |
| `markdown="1"` | Native HTML parsing or pre-process |
| `$$inline$$` | `\(inline\)` (convert during migration) |
| `$$display$$` (block) | Keep as-is or use `\[display\]` |
| `[TOC]` | Use Eleventy collection |
| `{::nomarkdown}` | Raw HTML (no equivalent needed) |

---

## Migration Checklist

### Pre-Migration
- [ ] Back up existing Jekyll site
- [ ] Set up version control branch for migration
- [ ] Install Node.js 18+ and npm
- [ ] Review all custom Kramdown syntax in content

### Phase 1-3: Setup & Templates
- [ ] Initialize Eleventy project structure
- [ ] Install dependencies
- [ ] Create `.eleventy.js` configuration
- [ ] Convert all layout templates to Nunjucks
- [ ] Convert all include partials to Nunjucks

### Phase 4-5: Content
- [ ] Create and run migration script
- [ ] Verify Kramdown syntax conversion
- [ ] Test math rendering
- [ ] Copy static assets and resources

### Phase 6-7: Assets & Navigation
- [ ] Configure passthrough copies
- [ ] Verify CSS/JS loading
- [ ] Implement navigation components
- [ ] Test previous/next page links

### Phase 8-9: PWA & Deploy
- [ ] Update service worker paths
- [ ] Test offline functionality
- [ ] Configure deployment pipeline
- [ ] Deploy to staging environment

### Phase 10: Validation
- [ ] Run validation scripts
- [ ] Execute visual regression tests
- [ ] Compare content parity
- [ ] Fix any remaining issues
- [ ] Final deployment

---

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)
- [Eleventy Image Plugin](https://www.11ty.dev/docs/plugins/image/)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)

---

*Document Version: 1.0*
*Created: December 2024*
*Target: Eleventy 3.x, Node.js 20+*
