# Jekyll to MyST MD Migration Analysis

## Physics Textbook: Comprehensive Migration Evaluation

**Current Stack:** Jekyll 4.4, Ruby, Kramdown
**Proposed Alternatives:**
- **Option A:** Eleventy (11ty), Node.js, markdown-it
- **Option B:** MyST MD (mystmd), Node.js, MyST Parser

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [MyST MD Overview](#3-myst-md-overview)
4. [Detailed Migration Challenges](#4-detailed-migration-challenges)
5. [MyST MD Migration Plan](#5-myst-md-migration-plan)
6. [Eleventy vs MyST MD Comparison](#6-eleventy-vs-myst-md-comparison)
7. [Recommendation](#7-recommendation)

---

## 1. Executive Summary

### Migration Scope

| Component | Count | MyST Complexity | Eleventy Complexity |
|-----------|-------|-----------------|---------------------|
| Markdown content files | 282 | **High** | Medium |
| `markdown="1"` blocks | **5,703** | **Critical** | **Critical** |
| `{: #id}` attributes | ~1,322 | Medium | High |
| `{: .class}` attributes | ~300 | Medium | High |
| `$$` math equations | ~2,383 | **Low** (native) | Medium |
| Semantic block types | 15,553+ | Medium | High |
| Resource images | 100+ | Low | Low |

### Key Finding

**MyST MD is the superior choice for a physics textbook** because:
1. Native LaTeX math support without plugins
2. First-class scientific publishing features
3. Built-in cross-referencing system
4. Export to PDF, Word, JATS (journal format)
5. Part of Jupyter ecosystem (future Jupyter notebook integration)

**However**, the migration requires significant content transformation due to incompatible Kramdown syntax.

---

## 2. Current State Analysis

### 2.1 Kramdown Syntax Patterns in Use

Based on analysis of 282 content files:

#### Pattern 1: HTML blocks with `markdown="1"` (5,703 occurrences)

```html
<div class="abstract" markdown="1">
* Define pressure.
* Explain the relationship between pressure and force.
</div>

<div class="note" data-label="" markdown="1">
<div class="title">
Models, Theories, and Laws
</div>
Models, theories, and laws are used to help scientists analyze...
</div>

<div class="exercise" data-element-type="conceptual-questions">
<div class="problem" markdown="1">
What determines the validity of a theory?
</div>
<div class="solution" markdown="1">
The solution text here...
</div>
</div>
```

#### Pattern 2: Kramdown ID attributes (1,322 occurrences)

```markdown
![Image description](../resources/Figure_01_01_01.jpg "Caption")
{: #Figure1}

![Another image](../resources/Figure_01_01_02.jpg "Caption")
{: #Figure2 height="250"}
```

#### Pattern 3: Kramdown class attributes (~300 occurrences)

```markdown
### Glossary
{: class="glossary-title"}

1. {: .chapter} [Chapter Title](contents/chapter.md)
   1. {: .section} [Section Title](contents/section.md)
```

#### Pattern 4: Block type distribution

| Block Type | Count | Purpose |
|-----------|-------|---------|
| problem | 3,272 | Exercise problems |
| exercise | 3,254 | Exercise containers |
| equation | 2,383 | Math equations |
| solution | 1,217 | Problem solutions |
| title | 813 | Block titles |
| note | 456 | Important notes/definitions |
| abstract | 247 | Chapter abstracts |
| glossary | 229 | Glossary entries |
| example | 212 | Worked examples |

---

## 3. MyST MD Overview

### 3.1 What is MyST MD?

MyST (Markedly Structured Text) is a markdown superset designed for scientific and technical documentation. It is:

- Part of the **Jupyter ecosystem** (Project Jupyter organization)
- Built on **CommonMark** with extensions via directives and roles
- Designed for **publication-quality** documents
- Capable of exporting to **PDF, Word, JATS, LaTeX, HTML**

### 3.2 MyST Syntax Fundamentals

#### Directives (Block-level extensions)

```markdown
:::{note}
This is a note admonition.
:::

:::{figure} ./image.png
:label: fig-example
:align: center

This is the figure caption.
:::

:::{math}
:label: eq-einstein
E = mc^2
:::
```

#### Roles (Inline extensions)

```markdown
See {ref}`fig-example` for details.
The equation {eq}`eq-einstein` shows...
This is {abbr}`MyST (Markedly Structured Text)`.
```

#### Cross-references

```markdown
(section-label)=
## My Section

Reference it with {ref}`section-label` or [](#section-label).
```

### 3.3 MyST Native Features Aligned with Physics Book

| Feature | MyST Support | Current Kramdown |
|---------|--------------|------------------|
| Math (LaTeX) | `$inline$` and `$$display$$` native | Same |
| Figures with labels | `:::{figure}` with `:label:` | `{: #Figure1}` |
| Admonitions/Notes | `:::{note}`, `:::{warning}` | `<div class="note">` |
| Cross-references | `{ref}`, `{numref}`, `{eq}` | Manual `[](#id)` links |
| Glossary | `{term}` role + glossary directive | `<div class="glossary">` |
| Exercises | Custom directive possible | `<div class="exercise">` |
| Solutions (hideable) | `:::{dropdown}` or custom | `<div class="solution">` |
| Equations (numbered) | `:::{math}` with `:label:` | `<div class="equation">` |

---

## 4. Detailed Migration Challenges

### 4.1 CRITICAL: `markdown="1"` Attribute (5,703 instances)

**The Problem:**
Kramdown's `markdown="1"` attribute enables markdown processing inside HTML blocks. MyST does **not** support this syntax.

**Current:**
```html
<div class="note" data-label="" markdown="1">
<div class="title">
Important Concept
</div>
Content with **bold** and $$ E = mc^2 $$.
</div>
```

**MyST Equivalent:**
```markdown
:::{note}
:class: important-concept

**Important Concept**

Content with **bold** and $E = mc^2$.
:::
```

**Pain Points:**
1. **5,703 blocks must be converted** - Cannot be automated with simple regex
2. **Nested structures** - Many blocks contain nested divs (title, problem, solution)
3. **Data attributes** - `data-element-type`, `data-label` must map to MyST options
4. **Semantic preservation** - Must maintain meaning (note vs warning vs example)

### 4.2 HIGH: Kramdown ID Attributes (1,322 instances)

**The Problem:**
Kramdown places `{: #id}` on a separate line after the element. MyST uses different syntax.

**Current:**
```markdown
![Alt text](../resources/Figure_01.jpg "Caption")
{: #Figure1 height="250"}
```

**MyST Equivalent:**
```markdown
:::{figure} ../resources/Figure_01.jpg
:label: Figure1
:height: 250px
:alt: Alt text

Caption
:::
```

**Pain Points:**
1. **Every figure requires restructuring** - Not just attribute relocation
2. **Inline images** - Some images don't need figure treatment
3. **Height/width units** - Must add CSS units (px, em, %)
4. **Cross-references** - All `[](#Figure1)` links must become `{ref}`Figure1``

### 4.3 MEDIUM: Block Type Mapping

| Current Block | MyST Directive | Notes |
|---------------|----------------|-------|
| `<div class="abstract">` | `:::{abstract}` or frontmatter | Built-in |
| `<div class="note">` | `:::{note}` | Built-in |
| `<div class="example">` | `:::{admonition} Example` | Custom title |
| `<div class="exercise">` | `:::{exercise}` | **Custom directive needed** |
| `<div class="problem">` | Nested in exercise | **Custom directive needed** |
| `<div class="solution">` | `:::{solution}` or `:::{dropdown}` | **Custom directive needed** |
| `<div class="equation">` | `:::{math}` | Built-in |
| `<div class="glossary">` | `:::{glossary}` | Built-in |

**Pain Points:**
1. **Custom directives required** - Exercise/problem/solution pattern not built-in
2. **Nested blocks** - MyST supports nesting but syntax differs
3. **Semantic fidelity** - Must preserve pedagogical structure

### 4.4 MEDIUM: Math Delimiter Handling

**Current (works in both):**
```markdown
Inline: $$ F = ma $$
Display:
$$
E = mc^2
$$
```

**MyST Preference:**
```markdown
Inline: $F = ma$
Display:
$$
E = mc^2
$$
```

**Pain Points:**
1. **Double-dollar inline math** - Current uses `$$ ... $$` for inline which MyST accepts but single `$` is preferred
2. **Equation labeling** - Current uses `<div class="equation">`, MyST uses `:::{math}` with `:label:`
3. **Equation numbering** - MyST auto-numbers; need to preserve existing numbers

### 4.5 LOW: SUMMARY.md Table of Contents

**Current:**
```markdown
1. {: .chapter} [Introduction](contents/ch1.md)
   1. {: .section} [Physics: An Introduction](contents/ch1s1.md)
```

**MyST Equivalent:**
```markdown
# Table of Contents

:::{toctree}
:maxdepth: 2

contents/ch1
contents/ch1s1
:::
```

Or use `_toc.yml`:
```yaml
format: jb-book
root: index
chapters:
  - file: contents/ch1
    sections:
      - file: contents/ch1s1
```

---

## 5. MyST MD Migration Plan

### Phase 1: Project Setup & Custom Directives

#### Step 1.1: Initialize MyST Project

```bash
# Install MyST CLI
npm install -g mystmd

# Initialize project
cd physics-book
myst init

# Install development dependencies
npm install --save-dev typescript @types/node
```

#### Step 1.2: Create `myst.yml` Configuration

```yaml
version: 1
project:
  title: General Physics
  description: An open-source physics textbook
  keywords: [physics, textbook, education]
  license: CC-BY-4.0
  github: https://github.com/user/physics-book

  # Custom settings
  math:
    macros:
      \vb: ["\\mathbf{#1}", 1]
      \mss: "\\text{ m/s}^2"

  # Export settings
  exports:
    - format: pdf
      template: plain-latex
    - format: docx

site:
  title: General Physics
  template: book-theme
  nav:
    - title: Contents
      children:
        - file: contents/ch1IntroductionTheNatureOfScienceAndPhysics.md
```

#### Step 1.3: Create Custom Directives

Create file: **`_extensions/physics-book/exercise.mjs`**

```javascript
/**
 * Custom exercise directive for physics problems
 */
export const exerciseDirective = {
  name: 'exercise',
  doc: 'An exercise block containing problem and optional solution',
  arg: { type: String, doc: 'Exercise title (optional)' },
  options: {
    label: { type: String, doc: 'Label for cross-referencing' },
    type: { type: String, doc: 'Exercise type: conceptual, numerical, check-understanding' },
  },
  body: { type: String, doc: 'Exercise content (may include problem/solution)' },
  run(data) {
    const children = this.parseMarkdown(data.body);
    return {
      type: 'exercise',
      label: data.options?.label,
      exerciseType: data.options?.type || 'default',
      children,
    };
  },
};

export const problemDirective = {
  name: 'problem',
  doc: 'A problem statement within an exercise',
  body: { type: String },
  run(data) {
    return {
      type: 'problem',
      children: this.parseMarkdown(data.body),
    };
  },
};

export const solutionDirective = {
  name: 'solution',
  doc: 'A solution to a problem',
  options: {
    hidden: { type: Boolean, doc: 'Hide solution initially' },
  },
  body: { type: String },
  run(data) {
    return {
      type: 'solution',
      hidden: data.options?.hidden ?? true,
      children: this.parseMarkdown(data.body),
    };
  },
};

const plugin = { directives: [exerciseDirective, problemDirective, solutionDirective] };
export default plugin;
```

### Phase 2: Content Transformation Scripts

#### Step 2.1: Master Transformation Script

Create file: **`scripts/transform-to-myst.js`**

```javascript
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SOURCE_DIR = './contents';
const TARGET_DIR = './myst-contents';

/**
 * Transform Kramdown markdown="1" blocks to MyST directives
 */
function transformMarkdownBlocks(content) {
  let result = content;

  // 1. Transform abstract blocks
  result = result.replace(
    /<div class="abstract" markdown="1">([\s\S]*?)<\/div>/g,
    (match, inner) => {
      return `:::{abstract}\n${inner.trim()}\n:::`;
    }
  );

  // 2. Transform note blocks with titles
  result = result.replace(
    /<div class="note"[^>]*markdown="1">\s*<div class="title">\s*([\s\S]*?)\s*<\/div>([\s\S]*?)<\/div>/g,
    (match, title, content) => {
      return `:::{note} ${title.trim()}\n${content.trim()}\n:::`;
    }
  );

  // 3. Transform note blocks without titles
  result = result.replace(
    /<div class="note"[^>]*markdown="1">([\s\S]*?)<\/div>/g,
    (match, content) => {
      return `:::{note}\n${content.trim()}\n:::`;
    }
  );

  // 4. Transform example blocks
  result = result.replace(
    /<div class="example"[^>]*markdown="1">\s*<div class="title">\s*([\s\S]*?)\s*<\/div>([\s\S]*?)<\/div>/g,
    (match, title, content) => {
      return `:::{admonition} ${title.trim()}\n:class: example\n${content.trim()}\n:::`;
    }
  );

  // 5. Transform exercise blocks (complex - with nested problem/solution)
  result = result.replace(
    /<div class="exercise"([^>]*)>([\s\S]*?)<\/div>\s*(?=<div class="exercise"|$|<div class="glossary"|### )/g,
    (match, attrs, innerContent) => {
      // Extract data-element-type
      const typeMatch = attrs.match(/data-element-type="([^"]+)"/);
      const exerciseType = typeMatch ? typeMatch[1] : 'default';

      // Transform inner problem/solution blocks
      let content = innerContent;

      // Transform title if present
      content = content.replace(
        /<div class="title">\s*([\s\S]*?)\s*<\/div>/g,
        (m, title) => `**${title.trim()}**\n\n`
      );

      // Transform problem blocks
      content = content.replace(
        /<div class="problem"[^>]*markdown="1">([\s\S]*?)<\/div>/g,
        (m, problem) => `::::{problem}\n${problem.trim()}\n::::\n`
      );

      // Transform solution blocks
      content = content.replace(
        /<div class="solution"[^>]*markdown="1">([\s\S]*?)<\/div>/g,
        (m, solution) => `::::{solution}\n${solution.trim()}\n::::\n`
      );

      return `:::{exercise}\n:type: ${exerciseType}\n${content.trim()}\n:::`;
    }
  );

  // 6. Transform equation blocks
  result = result.replace(
    /<div class="equation">\s*\$\$([\s\S]*?)\$\$\s*<\/div>/g,
    (match, equation) => {
      return `:::{math}\n${equation.trim()}\n:::`;
    }
  );

  // 7. Transform glossary blocks
  result = result.replace(
    /<div class="glossary"[^>]*markdown="1">([\s\S]*?)<\/div>/g,
    (match, content) => {
      // Transform definition list format
      let glossaryContent = content.trim();
      // Remove the ### Glossary header if present
      glossaryContent = glossaryContent.replace(/###\s*Glossary\s*\{[^}]*\}\s*/g, '');
      return `:::{glossary}\n${glossaryContent}\n:::`;
    }
  );

  return result;
}

/**
 * Transform Kramdown figure attributes to MyST figure directives
 */
function transformFigures(content) {
  // Pattern: ![alt](src "caption")\n{: #id attrs}
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\s*(?:"([^"]*)")?\)\s*\n\{:\s*#(\w+)([^}]*)\}/g,
    (match, alt, src, caption, id, attrs) => {
      // Parse additional attributes
      const heightMatch = attrs.match(/height="(\d+)"/);
      const height = heightMatch ? `:height: ${heightMatch[1]}px\n` : '';

      const widthMatch = attrs.match(/width="(\d+)"/);
      const width = widthMatch ? `:width: ${widthMatch[1]}px\n` : '';

      // Build MyST figure directive
      return `:::{figure} ${src}
:label: ${id}
:alt: ${alt}
${height}${width}
${caption || alt}
:::`;
    }
  );
}

/**
 * Transform inline images (without figure attributes)
 */
function transformInlineImages(content) {
  // Images without {: #id} - keep as markdown images
  // But fix relative paths
  return content.replace(
    /!\[([^\]]*)\]\(\.\.\/resources\//g,
    '![$1](./resources/'
  );
}

/**
 * Transform cross-references
 */
function transformCrossReferences(content) {
  // [Figure 1](#Figure1) -> {numref}`Figure1`
  // [[Figure 1]](#Figure1) -> {numref}`Figure1`
  let result = content;

  result = result.replace(
    /\[\[?([^\]]+)\]?\]\(#(\w+)\)/g,
    (match, text, ref) => {
      if (text.toLowerCase().includes('figure')) {
        return `{numref}\`${ref}\``;
      } else if (text.toLowerCase().includes('table')) {
        return `{numref}\`${ref}\``;
      } else if (text.toLowerCase().includes('equation')) {
        return `{eq}\`${ref}\``;
      }
      return `{ref}\`${ref}\``;
    }
  );

  return result;
}

/**
 * Transform section headers with Kramdown attributes
 */
function transformHeaders(content) {
  // ### Glossary\n{: class="glossary-title"}
  return content.replace(
    /(#{1,6}\s+[^\n]+)\n\{:\s*[^}]*\}/g,
    '$1'
  );
}

/**
 * Transform math delimiters (optional - MyST supports both)
 */
function transformMath(content) {
  // Convert inline $$ x $$ to $x$
  // Be careful not to match display math
  return content.replace(
    /\$\$\s*([^$\n]+?)\s*\$\$/g,
    (match, math) => {
      // If it contains newlines, it's display math - keep as is
      if (math.includes('\n')) return match;
      return `$${math.trim()}$`;
    }
  );
}

/**
 * Process front matter for MyST compatibility
 */
function transformFrontMatter(data) {
  const result = { ...data };

  // Remove Jekyll-specific fields
  delete result.layout;

  // Add MyST-specific fields
  if (result.chapterNumber !== undefined && result.sectionNumber !== undefined) {
    result.numbering = {
      heading_1: result.chapterNumber,
      heading_2: result.sectionNumber,
    };
  }

  return result;
}

/**
 * Main transformation function for a single file
 */
async function transformFile(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const targetPath = path.join(TARGET_DIR, filename);

  try {
    const source = await readFile(sourcePath, 'utf-8');
    const { data, content } = matter(source);

    let processed = content;

    // Apply transformations in order
    processed = transformMarkdownBlocks(processed);
    processed = transformFigures(processed);
    processed = transformInlineImages(processed);
    processed = transformCrossReferences(processed);
    processed = transformHeaders(processed);
    processed = transformMath(processed);

    // Process front matter
    const newData = transformFrontMatter(data);

    // Reconstruct file
    const output = matter.stringify(processed, newData);

    await writeFile(targetPath, output, 'utf-8');
    console.log(`✓ Transformed: ${filename}`);

    return { success: true, filename };
  } catch (error) {
    console.error(`✗ Error transforming ${filename}:`, error.message);
    return { success: false, filename, error: error.message };
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting MyST transformation...\n');

  if (!existsSync(TARGET_DIR)) {
    await mkdir(TARGET_DIR, { recursive: true });
  }

  const files = await readdir(SOURCE_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  console.log(`Found ${mdFiles.length} markdown files to transform.\n`);

  const results = await Promise.all(mdFiles.map(transformFile));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success);

  console.log('\n========================================');
  console.log(`Transformation complete: ${successful}/${mdFiles.length} files successful`);

  if (failed.length > 0) {
    console.log('\nFailed files:');
    failed.forEach(f => console.log(`  - ${f.filename}: ${f.error}`));
  }
}

migrate().catch(console.error);
```

### Phase 3: Manual Review & Edge Cases

#### Step 3.1: Files Requiring Manual Review

The following patterns cannot be fully automated:

1. **Nested exercises with multiple problems**
```html
<div class="exercise">
  <div class="problem" markdown="1">Problem 1</div>
  <div class="problem" markdown="1">Problem 2</div>
</div>
```

2. **PhET simulations embedded in notes**
```html
<div class="note" data-label="PhET Exploration" markdown="1">
<figure markdown="1">
<iframe src="https://phet.colorado.edu/..."></iframe>
</figure>
</div>
```

3. **Complex table structures** with merged cells

4. **Definition lists in glossary** with Kramdown syntax

#### Step 3.2: Create Manual Review Checklist

```markdown
## Manual Review Checklist

For each file, verify:
- [ ] All figures render correctly
- [ ] Cross-references resolve
- [ ] Math equations display properly
- [ ] Exercise/problem/solution structure is correct
- [ ] Admonitions (notes, examples) have proper styling
- [ ] Embedded iframes (PhET) work
- [ ] Glossary terms are properly formatted
```

### Phase 4: Build & Validation

#### Step 4.1: Build Commands

```bash
# Start development server
myst start

# Build static site
myst build --html

# Build PDF
myst build --pdf

# Build all formats
myst build
```

#### Step 4.2: Validation Script

Create file: **`scripts/validate-myst.js`**

```javascript
import { readdir, readFile } from 'fs/promises';
import path from 'path';

const TARGET_DIR = './myst-contents';

const VALIDATION_CHECKS = [
  {
    name: 'No remaining markdown="1"',
    pattern: /markdown="1"/,
    shouldFind: false,
  },
  {
    name: 'No remaining {: #id}',
    pattern: /\{:\s*#\w+/,
    shouldFind: false,
  },
  {
    name: 'No remaining {: .class}',
    pattern: /\{:\s*\.\w+/,
    shouldFind: false,
  },
  {
    name: 'MyST directives present',
    pattern: /:::\{/,
    shouldFind: true,
  },
  {
    name: 'Math preserved',
    pattern: /\$[^$]+\$|\\\[|\\\(/,
    shouldFind: true,
  },
];

async function validate() {
  const files = await readdir(TARGET_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  let totalIssues = 0;

  for (const file of mdFiles) {
    const content = await readFile(path.join(TARGET_DIR, file), 'utf-8');
    const issues = [];

    for (const check of VALIDATION_CHECKS) {
      const found = check.pattern.test(content);
      if (found !== check.shouldFind) {
        issues.push(check.name);
      }
    }

    if (issues.length > 0) {
      console.log(`\n${file}:`);
      issues.forEach(i => console.log(`  - ${i}`));
      totalIssues += issues.length;
    }
  }

  console.log(`\n========================================`);
  console.log(`Validation complete: ${totalIssues} issues found`);
}

validate().catch(console.error);
```

### Phase 5: Table of Contents & Navigation

#### Step 5.1: Create `_toc.yml`

```yaml
format: jb-book
root: index
parts:
  - caption: Mechanics
    chapters:
      - file: contents/ch1IntroductionTheNatureOfScienceAndPhysics
        sections:
          - file: contents/ch1PhysicsAnIntroduction
          - file: contents/ch1PhysicalQuantitiesAndUnits
          - file: contents/ch1AccuracyPrecisionAndSignificantFigures
          - file: contents/ch1Approximation
      - file: contents/ch2Kinematics
        sections:
          - file: contents/ch2Displacement
          # ... etc
  - caption: Electricity & Magnetism
    chapters:
      - file: contents/ch18ElectricChargeAndElectricField
      # ... etc
  - caption: Appendices
    chapters:
      - file: contents/appendixA
      - file: contents/appendixB
```

---

## 6. Eleventy vs MyST MD Comparison

### 6.1 Feature Comparison

| Feature | Eleventy + markdown-it | MyST MD | Winner |
|---------|------------------------|---------|--------|
| **Math Support** | Plugin required | Native | **MyST** |
| **Cross-references** | Manual/plugin | Native with auto-numbering | **MyST** |
| **Scientific publishing** | DIY | Purpose-built | **MyST** |
| **PDF export** | External tool needed | Built-in | **MyST** |
| **Word export** | Not supported | Built-in | **MyST** |
| **JATS (journal) export** | Not supported | Built-in | **MyST** |
| **Jupyter integration** | Not supported | Native | **MyST** |
| **Template flexibility** | High | Medium | Eleventy |
| **Build speed** | Fast | Medium | Eleventy |
| **Community size** | Large | Growing | Eleventy |
| **Plugin ecosystem** | Extensive | Limited | Eleventy |
| **Learning curve** | Moderate | Moderate | Tie |
| **Kramdown compatibility** | Via plugins | None | Eleventy* |

*Neither has native Kramdown compatibility; both require transformation.

### 6.2 Migration Effort Comparison

| Migration Task | Eleventy Effort | MyST Effort | Notes |
|----------------|-----------------|-------------|-------|
| `markdown="1"` conversion | High | High | Both require transformation |
| `{: #id}` attributes | Medium (plugin) | High (restructure) | MyST figures need full rewrite |
| Math handling | Medium (plugins) | Low (native) | MyST handles naturally |
| Cross-references | High (manual) | Low (native) | MyST auto-numbers |
| Custom blocks (exercise) | High (custom code) | Medium (custom directive) | Both need customization |
| Template conversion | Medium | Low | MyST has themes |
| Build pipeline | Medium | Low | MyST is integrated |

### 6.3 Maintenance & Future Considerations

| Factor | Eleventy | MyST MD |
|--------|----------|---------|
| Long-term viability | Strong (established) | Strong (Jupyter backing) |
| Scientific community adoption | Low | High (growing) |
| Jupyter notebook support | No | Yes |
| Interactive content | Via JS | Native (JupyterLite) |
| Collaboration features | No | Via Curvenote |
| Standards compliance | Web | Scientific publishing |

### 6.4 Pros and Cons Summary

#### Eleventy Pros
- Mature, battle-tested static site generator
- Large plugin ecosystem (markdown-it plugins)
- Flexible templating (Nunjucks, Liquid, etc.)
- Fast builds
- Great for general web publishing

#### Eleventy Cons
- No native scientific publishing features
- Math requires plugins and configuration
- No built-in cross-referencing
- PDF/Word export requires external tools
- No Jupyter integration

#### MyST MD Pros
- **Purpose-built for scientific/technical content**
- **Native LaTeX math support**
- **Auto-numbered cross-references**
- **Multi-format export (PDF, Word, JATS, LaTeX)**
- **Part of Jupyter ecosystem**
- **Growing scientific community**
- Semantic AST (future-proof)

#### MyST MD Cons
- Younger project (less battle-tested)
- Smaller plugin ecosystem
- Less template flexibility
- Requires more content restructuring from Kramdown
- Some features still in development

---

## 7. Recommendation

### 7.1 For a Physics Textbook: MyST MD is the Better Choice

**Rationale:**

1. **Native math support** - Physics content is math-heavy; MyST handles this elegantly
2. **Cross-references** - Figures, equations, tables auto-number and cross-reference
3. **PDF export** - Critical for textbooks; MyST supports 100s of journal templates
4. **Future-proof** - Jupyter integration opens possibilities for interactive content
5. **Semantic structure** - AST-based approach preserves meaning

### 7.2 Migration Strategy Recommendation

**Phased Approach:**

1. **Phase 1 (Week 1-2):** Setup & Proof of Concept
   - Initialize MyST project
   - Create custom directives for exercise/problem/solution
   - Transform 5 representative files manually
   - Validate output quality

2. **Phase 2 (Week 2-4):** Automated Transformation
   - Run transformation scripts on all 282 files
   - Review and fix edge cases
   - Validate cross-references
   - Test math rendering

3. **Phase 3 (Week 4-5):** Navigation & Polish
   - Create `_toc.yml` structure
   - Configure themes and styling
   - Set up PDF export templates
   - Configure service worker for PWA

4. **Phase 4 (Week 5-6):** Testing & Deployment
   - Visual regression testing
   - Cross-browser testing
   - Deploy to staging
   - Final review and launch

### 7.3 Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Custom directive complexity | Start with simple implementations; iterate |
| Transformation script bugs | Manual review of 10% sample |
| Math rendering issues | Test on complex equations first |
| Cross-reference breaks | Automated link checking |
| Build performance | Profile and optimize if needed |

---

## Appendix A: Sample Transformed Content

### Before (Kramdown):

```html
<div class="note" data-label="" markdown="1">
<div class="title">
Models, Theories, and Laws
</div>
Models, theories, and laws are used to help scientists analyze the data.
The equation $$ F = ma $$ is an example.
</div>

![Newton portrait](../resources/Figure_01_01_07.jpg "Isaac Newton")
{: #Figure7 height="275"}

See [Figure 7](#Figure7) for Newton's portrait.
```

### After (MyST MD):

```markdown
:::{note} Models, Theories, and Laws
Models, theories, and laws are used to help scientists analyze the data.
The equation $F = ma$ is an example.
:::

:::{figure} ./resources/Figure_01_01_07.jpg
:label: Figure7
:height: 275px
:alt: Newton portrait

Isaac Newton
:::

See {numref}`Figure7` for Newton's portrait.
```

---

## Appendix B: Resource Links

- [MyST Markdown Documentation](https://mystmd.org/guide)
- [MyST Syntax Overview](https://mystmd.org/guide/syntax-overview)
- [MyST Directives Reference](https://mystmd.org/guide/directives)
- [MyST Cross-references Guide](https://mystmd.org/guide/cross-references)
- [MyST Specification](https://mystmd.org/spec)
- [Curvenote Blog - Scientific Writing](https://curvenote.com/blog/writing-a-scientific-paper-faster-myst-markdown)

---

*Document Version: 1.0*
*Created: December 2024*
*Target: MyST MD (mystmd) latest*
