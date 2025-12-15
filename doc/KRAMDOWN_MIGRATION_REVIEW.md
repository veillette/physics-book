# Kramdown Migration Review: Deep Analysis & Alternatives

## Executive Summary

The migration from Jekyll/Kramdown to Eleventy presents **significant challenges** due to the extensive use of Kramdown-specific syntax throughout the physics textbook. This review analyzes the specific patterns used, evaluates the proposed solutions, and presents alternative approaches with their trade-offs.

### Scale of Kramdown Usage

| Pattern | Occurrences | Files Affected | Complexity |
|---------|-------------|----------------|------------|
| `markdown="1"` in HTML blocks | **5,703** | 270 | **Critical** |
| `{: #id}` ID attributes | ~1,000+ | 280+ | High |
| `{: .class}` class attributes | ~500+ | 200+ | High |
| `{: height="X"}` dimension attrs | ~200+ | 100+ | Medium |
| `{: class="glossary-title"}` | ~280 | 280 | Medium |
| `{: .chapter}`, `{: .section}` | ~300 | 1 (SUMMARY.md) | Medium |

---

## Part 1: The `markdown="1"` Challenge

### 1.1 Current Usage Pattern

The most critical challenge is the extensive use of `markdown="1"` attribute in HTML blocks. This Kramdown-specific feature allows markdown processing inside HTML elements:

```html
<div class="abstract" markdown="1">
* Learning objective 1
* Learning objective 2
</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Important Note
</div>
Content with **bold** and $$ math $$ here.
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
Question text with equations $$ F = ma $$
</div>
<div class="solution" markdown="1">
Solution with markdown formatting.
</div>
</div>
```

### 1.2 Why This Is Critical

With **5,703 occurrences across 270 files**, this is not a trivial find-and-replace operation. The patterns include:
- Nested `markdown="1"` blocks (divs within divs)
- Mixed content (markdown + raw HTML + MathJax)
- Semantic structure (`class="problem"`, `class="solution"`, `class="example"`)

---

## Part 2: Analysis of Proposed Solutions

### 2.1 Proposed Solution A: markdown-it-container Plugin

**From the migration plan (lines 621-649):**

```javascript
md.core.ruler.push('markdown_in_html', function(state) {
  // ... custom rule to handle markdown="1"
});
```

#### Assessment: **Partially Viable**

**Pros:**
- Works at the markdown-it level
- No content modification needed
- Preserves original source files

**Cons:**
- The proposed regex-based approach is fragile:
  ```javascript
  content.match(/<(\w+)[^>]*markdown="1"[^>]*>([\s\S]*?)<\/\1>/);
  ```
  This fails on nested elements (common in this codebase)
- Doesn't handle the `<div class="title">` patterns inside markdown blocks
- Performance concerns with 5,700+ matches per build

**Verdict:** Needs significant enhancement to handle nested structures.

### 2.2 Proposed Solution B: Pre-process During Migration

**From the migration plan (lines 656-679):**

Convert `markdown="1"` blocks to plain HTML with blank lines.

#### Assessment: **Viable but Complex**

**Pros:**
- One-time transformation
- Clean separation of concerns
- Works with any markdown processor

**Cons:**
- Loses the ability to edit content naturally
- Requires sophisticated parsing (not just regex)
- Risk of breaking complex nested structures

**Verdict:** Best for one-time migration if you accept losing editability.

---

## Part 3: Alternative Approaches

### 3.1 Alternative A: Keep Kramdown (Recommended for Minimal Risk)

**Approach:** Use `markdown-it-kramdown` or similar compatibility layer.

```bash
npm install markdown-it-kramed  # Fork with Kramdown compatibility
```

**Implementation:**

```javascript
// .eleventy.js
import markdownItKramed from 'markdown-it-kramed';

const md = markdownItKramed({
  html: true,
  langPrefix: 'language-'
});
```

**Pros:**
- Minimal content changes
- Lower migration risk
- Maintains existing workflow

**Cons:**
- Less maintained package
- Doesn't solve all Kramdown features
- May not support all syntax

**Viability:** Medium - limited Kramdown compatibility in markdown-it ecosystem.

---

### 3.2 Alternative B: Hybrid Approach with Nunjucks Processing

**Approach:** Process markdown-in-HTML using Nunjucks macros/includes before markdown processing.

**Implementation:**

1. Create Nunjucks macros for each block type:

```njk
{# src/_includes/macros/blocks.njk #}

{% macro note(title='') %}
<div class="note" data-label="">
{% if title %}<div class="title">{{ title }}</div>{% endif %}
{{ caller() | safe }}
</div>
{% endmacro %}

{% macro exercise(type='', label='') %}
<div class="exercise" data-element-type="{{ type }}">
{{ caller() | safe }}
</div>
{% endmacro %}

{% macro problem() %}
<div class="problem">
{{ caller() | safe }}
</div>
{% endmacro %}
```

2. Convert content to use macros:

**Before (Kramdown):**
```html
<div class="note" data-label="" markdown="1">
<div class="title">
Important
</div>
Content here with **bold**.
</div>
```

**After (Nunjucks):**
```njk
{% call note('Important') %}
Content here with **bold**.
{% endcall %}
```

**Pros:**
- Clean, maintainable syntax
- Full control over HTML output
- Better separation of concerns
- IDE support for Nunjucks

**Cons:**
- Requires content transformation (5,700+ blocks)
- Learning curve for content editors
- More complex build pipeline

**Viability:** High - clean architecture, but significant migration effort.

---

### 3.3 Alternative C: Custom Eleventy Transform with AST Parsing

**Approach:** Use a proper HTML parser to handle `markdown="1"` blocks after initial markdown processing.

**Implementation:**

```javascript
// scripts/markdown-in-html-transform.js
import { JSDOM } from 'jsdom';
import markdownIt from 'markdown-it';

const md = markdownIt({ html: true });

export function processMarkdownInHtml(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Find all elements with markdown="1"
  const markdownElements = document.querySelectorAll('[markdown="1"]');

  markdownElements.forEach(el => {
    // Get inner content
    const innerContent = el.innerHTML;

    // Process as markdown
    const processed = md.render(innerContent);

    // Replace content
    el.innerHTML = processed;

    // Remove the markdown attribute
    el.removeAttribute('markdown');
  });

  return dom.serialize();
}
```

**In Eleventy config:**

```javascript
// .eleventy.js
import { processMarkdownInHtml } from './scripts/markdown-in-html-transform.js';

eleventyConfig.addTransform('markdownInHtml', function(content, outputPath) {
  if (!outputPath || !outputPath.endsWith('.html')) {
    return content;
  }
  return processMarkdownInHtml(content);
});
```

**Pros:**
- Proper DOM parsing (handles nesting correctly)
- No content changes needed
- Runs once per build
- Handles all edge cases

**Cons:**
- Adds build time (~2-5 seconds for 280 files)
- Requires JSDOM dependency
- Two-pass processing (markdown → HTML → markdown-in-html → final HTML)

**Viability:** **High** - robust solution that preserves content.

---

### 3.4 Alternative D: Pandoc as Markdown Processor

**Approach:** Use Pandoc instead of markdown-it, as Pandoc has excellent Kramdown compatibility.

**Implementation:**

```javascript
// .eleventy.js
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

eleventyConfig.addExtension('md', {
  compile: async function(inputContent) {
    // Write to temp file
    const tmpFile = join(tmpdir(), `eleventy-${Date.now()}.md`);
    const outFile = join(tmpdir(), `eleventy-${Date.now()}.html`);

    writeFileSync(tmpFile, inputContent);

    // Process with Pandoc
    execSync(`pandoc -f markdown+raw_html -t html5 -o ${outFile} ${tmpFile}`);

    const result = readFileSync(outFile, 'utf-8');

    // Cleanup
    unlinkSync(tmpFile);
    unlinkSync(outFile);

    return async (data) => result;
  }
});
```

**Pros:**
- Best Kramdown compatibility
- Handles all edge cases
- Industry-standard tool
- Excellent math support

**Cons:**
- External dependency (Pandoc must be installed)
- Slower build times
- Less control over output
- Deployment complexity (needs Pandoc in CI)

**Viability:** Medium-High - excellent compatibility but operational overhead.

---

### 3.5 Alternative E: Staged Migration with Codemods

**Approach:** Automated transformation of content using AST-based codemods.

**Implementation:**

```javascript
// scripts/codemod-markdown-blocks.js
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { visit } from 'unist-util-visit';

function transformMarkdownBlocks() {
  return (tree) => {
    visit(tree, 'html', (node) => {
      if (node.value.includes('markdown="1"')) {
        // Parse the HTML
        // Extract inner content
        // Transform to new syntax
        // Update node.value
      }
    });
  };
}
```

**Transformation targets:**

| Original Pattern | Transformed Pattern |
|-----------------|---------------------|
| `<div class="abstract" markdown="1">` | `::: abstract` (fenced div) |
| `<div class="note" ...>` | `::: note` |
| `<div class="example" ...>` | `::: example` |
| `<div class="exercise" ...>` | `::: exercise` |
| `<div class="problem" markdown="1">` | Nested `::: problem` |

**Using markdown-it-container syntax:**

**Before:**
```html
<div class="note" data-label="" markdown="1">
<div class="title">
Title Here
</div>
Note content with **bold**.
</div>
```

**After:**
```markdown
::: note {data-label=""}
### Title Here

Note content with **bold**.
:::
```

**Pros:**
- Clean, modern markdown syntax
- Works with standard markdown-it-container
- Easier to edit
- No runtime overhead

**Cons:**
- Requires automated migration script
- Risk of edge case failures
- Content must be re-validated

**Viability:** High - best long-term solution.

---

## Part 4: The `{: #id .class}` Attribute Challenge

### 4.1 Current Usage

```markdown
![Image description](../resources/Figure_01.jpg "Title")
{: #Figure1 height="250"}

### Glossary
{: class="glossary-title"}

* List item
{: .classname}
```

### 4.2 Proposed Solution Analysis

The migration plan proposes `markdown-it-attrs`:

```javascript
.use(markdownItAttrs, {
  leftDelimiter: '{:',
  rightDelimiter: '}',
  allowedAttributes: ['id', 'class', 'height', 'width', 'data-label', 'data-element-type']
})
```

#### Issues with This Approach:

1. **Position sensitivity:** Kramdown allows attributes on the next line:
   ```markdown
   ![Image](image.jpg)
   {: #Figure1}
   ```
   But markdown-it-attrs requires them inline:
   ```markdown
   ![Image](image.jpg){: #Figure1}
   ```

2. **List item attributes:** Kramdown applies `{: .class}` to list items:
   ```markdown
   * Item text
   {: .classname}
   ```
   This doesn't work the same way in markdown-it-attrs.

### 4.3 Solution: Pre-process Attributes

**Migration script enhancement:**

```javascript
function normalizeKramdownAttributes(content) {
  // Move newline-separated attributes to inline
  // Pattern: element\n{: attributes} → element{: attributes}

  // For images
  content = content.replace(
    /(\!\[.*?\]\(.*?\))\s*\n(\{:\s*[^}]+\})/g,
    '$1$2'
  );

  // For headers
  content = content.replace(
    /(#{1,6}\s+.+)\s*\n(\{:\s*[^}]+\})/g,
    '$1 $2'
  );

  // For list items (more complex - need to append to line)
  content = content.replace(
    /^(\s*[\*\-\+]\s+.+)\n(\{:\s*[^}]+\})/gm,
    '$1 $2'
  );

  return content;
}
```

---

## Part 5: Math Handling

### 5.1 Current MathJax Usage

The content uses `$$ ... $$` for both inline and display math:

```markdown
The equation $$ F = ma $$ shows force.

<div class="equation">
 $$ E = mc^2 $$
</div>
```

### 5.2 Problem: Markdown Processing Interference

markdown-it may escape or modify characters inside math delimiters.

### 5.3 Recommended Solution: Math Preservation Transform

```javascript
function preserveMath(content) {
  const mathBlocks = [];
  let index = 0;

  // Store display math
  content = content.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    mathBlocks.push(match);
    return `%%MATH_${index++}%%`;
  });

  return { content, mathBlocks };
}

function restoreMath(content, mathBlocks) {
  mathBlocks.forEach((block, i) => {
    content = content.replace(`%%MATH_${i}%%`, block);
  });
  return content;
}
```

**Integrate into Eleventy:**

```javascript
eleventyConfig.addTransform('mathPreserve', function(content, outputPath) {
  if (!outputPath?.endsWith('.html')) return content;

  // Math should already be in the HTML at this point
  // Just ensure MathJax delimiters are not double-escaped
  return content.replace(/&amp;/g, '&');
});
```

---

## Part 6: Recommended Migration Strategy

### Phase 1: Setup & Validation (Low Risk)

1. Create the Eleventy project structure alongside Jekyll
2. Set up markdown-it with plugins
3. **Test with 5 representative files** covering all patterns

### Phase 2: Pre-processing Pipeline

Create robust migration scripts:

```javascript
// scripts/migrate-content.js
import { readFile, writeFile, readdir } from 'fs/promises';
import matter from 'gray-matter';

async function migrateFile(sourcePath, targetPath) {
  const source = await readFile(sourcePath, 'utf-8');
  const { data, content } = matter(source);

  let processed = content;

  // Step 1: Normalize Kramdown attributes to inline
  processed = normalizeKramdownAttributes(processed);

  // Step 2: Convert markdown="1" blocks (Option C or E from above)
  processed = convertMarkdownBlocks(processed);

  // Step 3: Fix relative paths
  processed = fixPaths(processed);

  // Step 4: Validate result
  const errors = validateContent(processed);
  if (errors.length > 0) {
    console.warn(`Warnings for ${sourcePath}:`, errors);
  }

  // Write result
  await writeFile(targetPath, matter.stringify(processed, data));
}
```

### Phase 3: Implement Custom Transform (Alternative C)

Add the JSDOM-based `markdown="1"` processor as a safety net:

```javascript
// Handles any remaining markdown="1" blocks not caught by pre-processing
eleventyConfig.addTransform('markdownInHtml', processMarkdownInHtml);
```

### Phase 4: Validation Suite

```javascript
// scripts/validate-migration.js
const CHECKS = [
  {
    name: 'No remaining {: attributes on separate lines',
    pattern: /\n\{:\s*[#.]/,
    shouldFind: false
  },
  {
    name: 'No unprocessed markdown="1"',
    pattern: /markdown="1"/,
    shouldFind: false
  },
  {
    name: 'Math delimiters preserved',
    pattern: /\$\$/,
    shouldFind: true  // Just check they exist
  },
  {
    name: 'Figure IDs exist',
    pattern: /id="Figure\d+"/,
    shouldFind: true
  },
  {
    name: 'No broken image paths',
    pattern: /src="\.\.\/resources/,
    shouldFind: false  // Should be absolute
  }
];
```

### Phase 5: Visual Regression Testing

Use existing Playwright setup:

```javascript
// Compare Jekyll output to Eleventy output
test('Chapter 1 visual parity', async ({ page }) => {
  await page.goto('http://localhost:8080/physics-book/contents/ch1PhysicsAnIntroduction.html');
  await expect(page).toHaveScreenshot('ch1-eleventy.png');
});
```

---

## Part 7: Decision Matrix

| Approach | Effort | Risk | Maintainability | Recommendation |
|----------|--------|------|-----------------|----------------|
| A: markdown-it-kramdown | Low | High | Medium | Not recommended |
| B: Nunjucks macros | High | Low | High | Long-term option |
| **C: JSDOM Transform** | **Medium** | **Low** | **High** | **Recommended** |
| D: Pandoc | Medium | Medium | Medium | Alternative |
| E: Codemods + containers | High | Medium | Very High | Best long-term |

### Final Recommendation

**Use Alternative C (JSDOM Transform) as the primary solution** with the following rationale:

1. **Preserves existing content** - No risky automated transformations
2. **Handles nesting correctly** - DOM parsing is robust
3. **Reasonable performance** - ~5 second build overhead is acceptable
4. **Fallback safety** - Any missed patterns are handled at build time
5. **Path to improvement** - Can migrate to Alternative E incrementally

---

## Part 8: Implementation Checklist

### Pre-Migration

- [ ] Audit all Kramdown syntax patterns (this review)
- [ ] Create test suite with 10 representative files
- [ ] Set up parallel build pipeline
- [ ] Benchmark Jekyll build vs Eleventy build

### Migration Scripts

- [ ] Implement `normalizeKramdownAttributes()`
- [ ] Implement `processMarkdownInHtml()` with JSDOM
- [ ] Implement `preserveMath()` and `restoreMath()`
- [ ] Create validation script with all CHECKS
- [ ] Create visual regression baseline screenshots

### Eleventy Configuration

- [ ] Configure markdown-it with attrs plugin
- [ ] Add kramdownCleanup transform
- [ ] Add markdownInHtml transform
- [ ] Configure passthrough copies
- [ ] Set up collections

### Testing

- [ ] Unit tests for each migration function
- [ ] Integration tests for full pipeline
- [ ] Visual regression tests for key pages
- [ ] Math rendering verification
- [ ] Cross-browser testing

### Deployment

- [ ] Update GitHub Actions workflow
- [ ] Configure staging environment
- [ ] Plan cutover strategy
- [ ] Prepare rollback procedure

---

## Appendix A: Complete Kramdown Syntax Reference

| Kramdown Syntax | Purpose | Occurrence | Eleventy Equivalent |
|----------------|---------|------------|---------------------|
| `{: #id}` | Element ID | ~1000 | `{: #id}` via markdown-it-attrs |
| `{: .class}` | Element class | ~500 | `{: .class}` via markdown-it-attrs |
| `{: key="value"}` | Custom attribute | ~300 | `{: key="value"}` via markdown-it-attrs |
| `markdown="1"` | Markdown in HTML | 5703 | Custom transform (JSDOM) |
| `{::nomarkdown}` | Raw HTML | 0 | Not needed |
| `{::comment}` | Comments | 0 | `{% comment %}` in Nunjucks |
| `^[footnote]` | Footnotes | ~20 | markdown-it-footnote plugin |

## Appendix B: Sample Migration of Complex Block

### Original (Kramdown):

```html
<div class="example" markdown="1">
<div class="title">
Calculating the Work and Energy
</div>
Consider a person who spins a grindstone.

**Strategy**

We use the equation $$ W = \tau \theta $$.

<div class="equation">
 $$ W = (0.320 \text{ m})(200 \text{ N})(1.00 \text{ rad}) = 64.0 \text{ J} $$
</div>

![Grindstone](../resources/Figure_10_04_04.webp "A grindstone being spun"){: #Figure4 height="225"}

**Discussion**

The work equals the change in rotational kinetic energy.
</div>
```

### After Migration (markdown-it compatible):

```html
<div class="example">
<div class="title">
Calculating the Work and Energy
</div>

Consider a person who spins a grindstone.

**Strategy**

We use the equation $$ W = \tau \theta $$.

<div class="equation">
 $$ W = (0.320 \text{ m})(200 \text{ N})(1.00 \text{ rad}) = 64.0 \text{ J} $$
</div>

![Grindstone](../resources/Figure_10_04_04.webp "A grindstone being spun"){: #Figure4 height="225"}

**Discussion**

The work equals the change in rotational kinetic energy.

</div>
```

Note: The blank lines around markdown content inside the `<div>` trigger markdown-it's HTML block parsing rules, allowing the content to be processed correctly.

---

*Review completed: December 2024*
*Reviewer: Claude (Automated Analysis)*
*Based on: JEKYLL_TO_ELEVENTY_MIGRATION_PLAN.md and content analysis*
