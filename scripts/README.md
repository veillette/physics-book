# Scripts

Build and utility scripts for the Physics Book project.

## Quick Reference

| Script                  | Command                           | Description                       |
| ----------------------- | --------------------------------- | --------------------------------- |
| content                 | `npm run check:content`           | Validate and fix content quality  |
| equations               | `npm run check:equations`         | Validate and fix equations        |
| check-links             | `npm run check:links`             | Validate internal/external links  |
| check-orphans           | `npm run check:orphans`           | Find unreferenced files           |
| check-figures           | `npm run check:figures`           | Validate figure references        |
| check-math              | `npm run check:math`              | Check LaTeX delimiter balance     |
| find-unrendered-latex   | `npm run find:latex`              | Check math rendering in Chromium  |
| check-accessibility     | `npm run check:accessibility`     | Check alt text and accessibility  |
| check-yaml              | `npm run check:yaml`              | Validate YAML front matter        |
| check-structure         | `npm run check:structure`         | Validate document structure       |
| check-cross-references  | `npm run check:cross-refs`        | Validate cross-references         |
| lint-markdown           | `npm run lint:markdown`           | Lint markdown files               |
| generate-pdf            | `npm run generate:pdf`            | Generate PDF of chapters          |
| generate-icons          | `npm run generate:icons`          | Generate PWA icons                |
| generate-fbd            | `npm run generate:fbd`            | Generate free-body diagram SVGs   |
| build-index             | `npm run generate:search-index`   | Generate search index             |
| parse-summary           | `npm run parse:summary`           | Generate summary.json             |
| update-front-matter     | `npm run update:front-matter`     | Update YAML front matter          |
| rename-figures          | `npm run update:figures`          | Rename figures and update refs    |
| convert-webp            | `npm run convert:webp`            | Convert images to WebP            |
| convert-math-delimiters | `npm run convert:math-delimiters` | Convert LaTeX delimiters          |
| validate-deploy         | `npm run deploy:validate`         | Validate deployment               |
| crawl-all-pages         | `npm run crawl`                   | Navigate all pages to find errors |

---

## Script Naming Convention

All scripts follow a consistent naming convention using colons as separators:

| Prefix       | Purpose                   | Examples                               |
| ------------ | ------------------------- | -------------------------------------- |
| `check:*`    | Validation/quality checks | check:links, check:yaml, check:content |
| `fix:*`      | Auto-fix issues           | fix:content, fix:equations             |
| `lint:*`     | Lint files                | lint:markdown                          |
| `generate:*` | File/asset generation     | generate:pdf, generate:icons           |
| `parse:*`    | Parse/extract data        | parse:summary                          |
| `update:*`   | Update existing files     | update:front-matter, update:figures    |
| `convert:*`  | Format conversion         | convert:webp                           |
| `deploy:*`   | Deployment operations     | deploy:validate                        |

### Common Modifiers

- `:strict` - Enable stricter validation (e.g., `check:content:strict`)
- `:fix` - Apply fixes (e.g., `check:content:fix`)
- `:apply` - Apply changes to files (e.g., `lint:markdown:apply`)

---

## Shared Utilities Library

All scripts use a shared utilities library in `scripts/lib/`:

```
scripts/lib/
├── index.js       # Re-exports all utilities
├── constants.js   # Shared constants (UNITS, TERMINOLOGY, etc.)
├── parser.js      # Content parsing utilities
├── reporter.js    # Output formatting with chalk
├── cli.js         # CLI argument parsing
└── files.js       # File operations
```

### Using the Library

```javascript
// Import everything
import { UNITS, ContentParser, printHeader, runCli } from './lib/index.js';

// Or import specific modules
import { UNITS, TERMINOLOGY } from './lib/constants.js';
import { ContentParser } from './lib/parser.js';
import { printHeader, printResults } from './lib/reporter.js';
```

---

## Consolidated Scripts

### content.js

Combined content validation and fixing script. Replaces the old `check-content.js` and `validate-content.js`.

```bash
npm run check:content              # Check only
npm run check:content:strict       # Stricter validation
npm run check:content:fix          # Apply fixes
npm run fix:content                # Alias for --fix
```

**Checks/Fixes:**

- Physical units spacing (e.g., "20m" -> "20 m")
- Terminology consistency (British -> American English)
- Duplicate words
- Common typos
- Inconsistent notation

**Options:**

- `--fix` - Apply fixes to files
- `--strict` - Enable stricter validation
- `--check` - Check only mode

### equations.js

Combined equation validation and fixing script. Replaces the old `check-equations.js` and `validate-equations.js`.

```bash
npm run check:equations              # Check only
npm run check:equations:strict       # Stricter validation
npm run check:equations:fix          # Apply fixes
npm run fix:equations                # Alias for --fix
```

**Checks/Fixes:**

- Equation numbering consistency
- LaTeX syntax errors
- Unbalanced delimiters (braces, $, \left/\right)
- Equation references
- Common LaTeX mistakes
- Broken inline math

**Options:**

- `--fix` - Apply fixes to files
- `--strict` - Enable stricter validation

---

## Quality Assurance Scripts (`check:*`)

### check-links.js

Validates all links (internal and external) in markdown files.

```bash
npm run check:links              # Standard check
npm run check:links:fast         # Faster with shorter timeouts
```

**Options:**

- `--timeout <ms>` - Request timeout (default: 10000)
- `--retries <num>` - Retries for failed requests (default: 2)
- `--concurrent <num>` - Max concurrent requests (default: 10)

### check-orphans.js

Detects unreferenced files in `assets/` and `resources/` directories.

```bash
npm run check:orphans            # Report orphaned files
npm run check:orphans:cleanup    # Generate cleanup script
```

### check-figures.js

Comprehensive figure validation.

```bash
npm run check:figures            # Run all checks
npm run check:figures:pattern    # Check filename patterns only
npm run check:figures:missing    # Check for missing files only
```

### check-math.js

Checks for unbalanced LaTeX math delimiters.

```bash
npm run check:math               # Check contents/ directory
```

### find-unrendered-latex.js

Checks every built textbook page in Chromium for leftover LaTeX and MathJax error
messages, including math in captions and hidden solutions. Run `npm run serve`
first. Failed page loads and missing MathJax are reported as failures; findings or
failures return a nonzero exit status.

```bash
npm run find:latex
npm run find:latex -- --no-enrichment --json /tmp/latex-issues.json
npm run find:latex -- --file 'ch3*.html' --verbose
npm run find:latex -- --base-url http://localhost:4001/physics-book/contents/
```

`--no-enrichment` skips optional speech and braille enrichment to speed up the
audit while retaining the textbook's TeX macros and rendering rules. Use
`--by-type` to group findings and `--concurrent 3` to set the number of workers.

### check-accessibility.js

Checks accessibility concerns in markdown files.

```bash
npm run check:accessibility          # Standard check
npm run check:accessibility:strict   # Strict mode
```

**Checks:**

- Missing or empty alt text on images
- Uninformative alt text
- Heading level skips
- Empty or uninformative link text

### check-yaml.js

Validates YAML front matter structure.

```bash
npm run check:yaml               # Standard validation
npm run check:yaml:strict        # Strict mode
```

### check-structure.js

Validates document structure and organization.

```bash
npm run check:structure          # Standard validation
npm run check:structure:strict   # Strict mode
```

### check-cross-references.js

Validates cross-references between chapters.

```bash
npm run check:cross-refs          # Standard validation
npm run check:cross-refs:strict   # Strict mode
```

---

## Fix Scripts (`fix:*`)

`fix:content` and `fix:equations` apply the auto-fixes from `content.js` and `equations.js`.

---

## Lint Scripts (`lint:*`)

### lint-markdown.js

Lints markdown files for common issues and physics-specific rules.

```bash
npm run lint:markdown            # Dry run
npm run lint:markdown:apply      # Apply fixes
npm run lint:markdown:strict     # Strict mode
```

---

## Generation Scripts (`generate:*`)

### generate-pdf.js

Generates PDF versions of chapters using Playwright.

```bash
npm run generate:pdf             # All chapters separately
npm run generate:pdf:combined    # All chapters in one PDF
npm run generate:pdf:chapter     # Specific chapter
npm run generate:pdf:install     # Install Playwright browsers
```

### generate-pdf-parallel.js

Optimized parallel PDF generation with configurable concurrency. Generates all PDFs in three phases for maximum efficiency.

```bash
# Generate all PDFs with parallel processing (default: 4 concurrent)
node scripts/generate-pdf-parallel.js

# With custom concurrency
MAX_CONCURRENCY=8 node scripts/generate-pdf-parallel.js
```

**Features:**

- **Phase 1**: Section PDFs (241 items, 4 parallel) - ~683s
- **Phase 2**: Chapter intro PDFs (34 items, 4 parallel) - ~32s
- **Phase 3**: Combined chapter PDFs (34 items, 2 parallel) - ~1094s
- Automatic error handling and retry logic
- Real-time progress reporting
- Total generation: ~30 minutes for 309 PDFs

**Performance:**

- 4x-8x faster than sequential generation
- Memory-optimized with controlled concurrency
- Reuses browser instances across batches

### regenerate-failed-pdfs.js

Recovery script for failed PDF generations. Automatically regenerates problematic combined chapter PDFs with extended timeouts.

```bash
# Regenerate failed PDFs (hardcoded list)
node scripts/regenerate-failed-pdfs.js
```

**Features:**

- Extended timeout (300s vs standard 180s)
- No strict networkidle requirements for large content
- Sequential processing to avoid resource contention
- Detailed progress logging

This script is automatically called by the GitHub Actions workflow when parallel generation reports failures.

### generate-icons.js

Generates PWA icons and favicons from source logo.

```bash
npm run generate:icons
```

### generate-fbd.js

Generates the free-body diagrams used in the worked solutions of chapters 4–6.
Each diagram is defined in `scripts/fbd/ch04.js`, `ch05.js`, or `ch06.js` (built
with the small SVG helper in `scripts/fbd/fbd.js`) and written to
`resources/fbd_CC_SS_pNN.svg` (chapter, section, problem number). Every diagram
labels its `+x`/`+y` axes so the signs in the solution's `ΣFx` and `ΣFy`
equations can be read straight off the picture. Embed them with the `.fbd`
class, which lets multi-panel diagrams use their full width:

```markdown
![Alt text](../resources/fbd_04_05_p02.svg){: .fbd}
```

```bash
npm run generate:fbd          # all diagrams
npm run generate:fbd -- 05_01 # only names containing "05_01"
```

### build-index.js

Creates a searchable index for the PWA using MiniSearch.

```bash
npm run generate:search-index
```

---

## Content Management Scripts

### parse-summary.js

Parses `SUMMARY.md` to generate `summary.json`.

```bash
npm run parse:summary
```

### update-front-matter.js

Updates YAML front matter with chapter/section numbers.

```bash
npm run update:front-matter
```

### rename-figures.js

Renames figure files and updates all references.

```bash
npm run update:figures -- Figure_01_02_03 Figure_01_02_04
```

---

## Conversion Scripts

### convert-webp.js

Converts figure JPG/PNG files to WebP next to the originals in `resources/`. A WebP is kept
only when it is at least `--min-savings` percent smaller (default 10). Dry run by default.

```bash
npm run convert:webp                                              # Preview all figures
npm run convert:webp -- --files Figure_01_01_01.jpg --update-refs # Preview one figure + refs
npm run convert:webp -- --apply --update-refs                     # Convert and repoint contents/
```

`--update-refs` rewrites `../resources/<name>.jpg` references in `contents/` to the WebP name.
The originals are then unreferenced; `npm run check:orphans` lists them for cleanup.

### convert_math_delimiters.js

Converts LaTeX math delimiters between formats (e.g., `\(...\)` to `$...$`).

```bash
npm run convert:math-delimiters           # Dry run
npm run convert:math-delimiters -- --apply  # Apply changes
```

---

## Deployment Scripts (`deploy:*`)

### validate-deploy.js

Validates deployed site with Playwright browser tests.

```bash
npm run deploy:validate           # Validate Vercel deployment
npm run deploy:validate:github    # Validate GitHub Pages
npm run deploy:validate:verbose   # Verbose output
```

**Prerequisites:**

- Playwright browsers installed: `npx playwright install chromium`

### crawl-all-pages.js

Navigates through all pages on the local dev server to detect errors during development.

```bash
npm run crawl                     # Crawl all pages (quiet mode)
npm run crawl:verbose             # Show detailed output for every page
```

**What it checks:**

- JavaScript console errors
- Failed resource loads (CSS, JS, images)
- Unrendered MathJax equations ($$)
- HTTP errors (404, 500, etc.)
- Page load failures

**Prerequisites:**

- Eleventy dev server must be running: `npm run serve`
- Playwright browsers installed: `npx playwright install chromium`

**Typical workflow:**

```bash
# Terminal 1: Start dev server
npm run serve

# Terminal 2: Crawl all pages
npm run crawl
```

This is especially useful after major changes to catch errors across the entire site.

---

## Running Audits

Full audit of the project:

```bash
npm run audit
```

This runs all validation scripts:

1. `check:links` - Link validation
2. `check:orphans` - Orphan file detection
3. `check:figures` - Figure validation
4. `check:yaml` - YAML front matter validation
5. `check:accessibility` - Accessibility checks
6. `check:content` - Content quality validation
7. `check:structure` - Document structure validation
8. `check:cross-refs` - Cross-reference validation
9. `check:equations` - Equation validation

For a comprehensive check including all validations:

```bash
npm run check:all
```

---

## Dependencies

Scripts use these npm packages:

- `chalk` - Terminal styling
- `cheerio` - HTML parsing (for search index)
- `glob` - File pattern matching
- `@11ty/gray-matter` - YAML front matter parsing
- `js-yaml` - YAML processing
- `minisearch` - Full-text search indexing
- `sharp` - Image processing
- `simple-git` - Git operations
- `@playwright/test` - PDF generation

For physics calculation verification:

- `python` - Python 3.x (for check_math.py)
