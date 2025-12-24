# Scripts

Build and utility scripts for the Physics Book project.

## Quick Reference

| Script              | Command                        | Description                         |
| ------------------- | ------------------------------ | ----------------------------------- |
| check-links         | `npm run check-links`          | Validate internal/external links    |
| check-orphans       | `npm run check-orphans`        | Find unreferenced files             |
| check-figures       | `npm run check-figures`        | Validate figure references          |
| check-math          | `npm run check-math`           | Check LaTeX delimiter balance       |
| check-accessibility | `npm run check-accessibility`  | Check alt text and accessibility    |
| check-yaml          | `npm run check-yaml`           | Validate YAML front matter          |
| check-physics       | `npm run check-physics`        | Verify physics calculations (Python)|
| fix-liquid-syntax   | `npm run fix-liquid-syntax`    | Fix Liquid syntax errors in math    |
| standardize-links   | `npm run standardize-links`    | Convert links to Jekyll/MyST format |
| generate-pdf        | `npm run generate-pdf`         | Generate PDF of all chapters        |
| generate-icons      | `npm run generate-icons`       | Generate PWA icons                  |
| build-search-index  | `npm run build-search-index`   | Generate search index for PWA       |
| parse-summary       | `npm run parse-summary`        | Generate summary.json               |
| update-front-matter | `npm run update-front-matter`  | Update chapter/section in YAML      |
| rename-figures      | `npm run rename-figures`       | Rename figures and update refs      |
| convert-webp        | `npm run convert-webp`         | Convert images to WebP              |
| sync-config         | `npm run sync-config`          | Sync package.json with \_config.yml |

---

## Quality Assurance Scripts (`check-*`)

All validation scripts follow the `check-*` naming convention.

### check-links.js

Validates all links (internal and external) in markdown files.

```bash
npm run check-links              # Standard check
npm run check-links:fast         # Faster with shorter timeouts
npm run test:ci                  # CI-optimized with longer timeouts
```

**Options:**

- `--timeout <ms>` - Request timeout (default: 10000)
- `--retries <num>` - Retries for failed requests (default: 2)
- `--concurrent <num>` - Max concurrent requests (default: 10)

### check-orphans.js

Detects unreferenced files in `assets/` and `resources/` directories by scanning all content and template files for references.

This script scans for file paths in:

- Markdown (`.md`)
- HTML (`.html`) - for Jekyll templates and includes
- CSS (`.css`) - for `url()` references
- JavaScript (`.js`) - for string literals containing paths
- JSON (`.json`) - for paths in configuration or manifest files

This ensures that even files referenced in templates or stylesheets are correctly identified.

```bash
npm run check-orphans            # Report orphaned files
npm run check-orphans:cleanup    # Generate a cleanup shell script (cleanup-orphans.sh)
```

### check-figures.js

Comprehensive figure validation combining multiple checks.

```bash
npm run check-figures            # Run all checks
npm run check-figures:pattern    # Check filename patterns only
npm run check-figures:missing    # Check for missing files only
```

**Options:**

- `--check-pattern` - Validate figure filename patterns
- `--check-consistency` - Check figures match chapter/section
- `--check-duplicates` - Find duplicate references
- `--check-sequence` - Check sequential numbering
- `--check-missing` - Find references to missing files
- `--all` - Run all checks (default)

### check-math.js

Checks for unbalanced LaTeX math delimiters (`$...$`) in markdown files.

```bash
npm run check-math               # Check contents/ directory
node scripts/check-math.js path/to/dir  # Custom directory
```

### check-accessibility.js

Checks accessibility concerns in markdown files.

```bash
npm run check-accessibility          # Standard check
npm run check-accessibility:strict   # Strict mode with more checks
```

**Checks performed:**

- Missing or empty alt text on images
- Uninformative alt text (e.g., "image", "figure")
- Heading level skips (e.g., h1 -> h3)
- Empty or uninformative link text ("click here", "read more")

**Strict mode adds:**

- Short alt text warnings
- Bare URL detection
- Table header validation

**Options:**

- `--strict` - Enable stricter checks

### check-yaml.js

Validates YAML front matter structure in markdown files.

```bash
npm run check-yaml               # Standard validation
npm run check-yaml:strict        # Strict mode
node scripts/check-yaml.js --required "title,layout,chapterNumber"
```

**Checks performed:**

- Required fields are present (default: title, layout)
- Field types are correct
- Layout values are valid
- YAML syntax is valid

**Strict mode adds:**

- Unknown field warnings
- Empty value warnings
- Chapter/section number validation
- Tab character detection
- Trailing whitespace warnings

**Options:**

- `--required <fields>` - Comma-separated list of required fields
- `--strict` - Enable stricter validation

---

## Fix/Repair Scripts (`fix-*`)

Scripts that automatically fix issues in content files.

### fix-liquid-syntax.js

Detects and fixes Liquid syntax errors that occur when LaTeX math expressions contain patterns that look like Liquid template variables.

**The Problem:**

Jekyll's Liquid templating engine interprets `{{` patterns in LaTeX (e.g., `{{v}_{\text{...}}}`) as variable tags. When these aren't properly closed from Liquid's perspective, it causes syntax errors:

```
Liquid Exception: Liquid syntax error (line 623): Variable '{{v}' was not properly terminated
```

**The Solution:**

Wraps problematic math expressions with `{% raw %}` tags to prevent Liquid from parsing them.

```bash
npm run fix-liquid-syntax              # Check for issues (dry run)
npm run fix-liquid-syntax:apply        # Apply fixes to files
node scripts/fix-liquid-syntax.js contents/ch13*.md  # Check specific files
```

**Options:**

- `--apply` - Apply fixes to files (default is check-only mode)

**Common patterns that trigger errors:**

- `{{v}_{\text{...}}}` - subscripted variable in double braces
- `{{f}_{...}}` - any variable in double braces with subscript
- `\frac{{a}_{...}}{{b}_{...}}` - fractions with subscripted numerator/denominator

**Example fix:**

Before:
```latex
$$\frac{{v}_{\text{rms,235}}}{{v}_{\text{rms,238}}}=\sqrt{\frac{m_{238}}{m_{235}}}$$
```

After:
```latex
{% raw %}$$\frac{{v}_{\text{rms,235}}}{{v}_{\text{rms,238}}}=\sqrt{\frac{m_{238}}{m_{235}}}$${% endraw %}
```

---

## Link Transformation

### standardize-links.js

Converts internal links to Jekyll/MyST convention (extension-less format).

```bash
npm run standardize-links        # Dry run - show what would change
npm run standardize-links:apply  # Apply the changes
node scripts/standardize-links.js --validate  # Just validate links
```

**Conversions:**

- `../contents/filename.md` → `./filename`
- `../contents/filename.md#anchor` → `./filename#anchor`

**Options:**

- `--apply` - Apply changes (default is dry run)
- `--validate` - Only validate existing links

---

## Content Management Scripts

### parse-summary.js

Parses `SUMMARY.md` to generate `summary.json` with book structure.

```bash
npm run parse-summary
node scripts/parse-summary.js --output _data/summary.json
```

**Options:**

- `--input <path>` - Input SUMMARY.md path
- `--output <path>` - Output JSON path

### update-front-matter.js

Updates YAML front matter in markdown files with chapter/section numbers.

```bash
npm run update-front-matter       # Update all files
node scripts/update-front-matter.js --dry-run  # Preview changes
```

**Options:**

- `--summary <path>` - Path to summary.json
- `--dry-run` - Preview without changes

### rename-figures.js

Renames figure files and updates all references in markdown.

```bash
npm run rename-figures -- Figure_01_02_03 Figure_01_02_04
npm run rename-figures -- --pattern "Figure_01_" "Figure_02_"
npm run rename-figures -- Figure_01_02_03 Figure_01_02_04 --dry-run
```

**Options:**

- `--pattern` - Use pattern matching for bulk renames
- `--dry-run` - Preview without changes

---

## Generation Scripts (`generate-*`)

### generate-pdf.js

Generates PDF versions of chapters using Playwright.

```bash
npm run generate-pdf             # All chapters separately
npm run generate-pdf:combined    # All chapters in one PDF
npm run generate-pdf:chapter     # Specific chapter
npm run generate-pdf:install     # Install Playwright browsers
npm run generate-pdf:help        # Show options
```

**Requirements:**

- Jekyll server running on `localhost:4000`
- Playwright Chromium browser (`npm run generate-pdf:install`)

### generate-icons.js

Generates PWA icons and favicons from source logo.

```bash
npm run generate-icons
```

**Generates:**

- Standard icons (48-512px)
- Maskable icons with safe zone
- Apple touch icons
- Favicon (PNG and ICO)

---

## Conversion Scripts

### convert-webp.js

Converts images to WebP format for better compression.

```bash
npm run convert-webp              # Convert resources/ to resources-webp/
node scripts/convert-webp.js --quality 90 --overwrite
```

**Options:**

- `--input <dir>` - Input directory (default: resources)
- `--output <dir>` - Output directory (default: resources-webp)
- `--quality <num>` - WebP quality 0-100 (default: 80)
- `--overwrite` - Overwrite existing files
- `--dry-run` - Preview without converting

---

## Build Scripts

### build-index.js

Creates a searchable index for the Physics Book PWA using MiniSearch.

```bash
npm run build-search-index
```

**Process:**

1. Scans all HTML files in `_site/` (excluding assets, offline.html, 404.html)
2. Extracts title and content from each page
3. Creates a MiniSearch index for full-text search
4. Outputs `search_index.json` to the `_site/` directory

**Requirements:**

- Jekyll build must be completed first (`npm run build`)

### sync-config.js

Synchronizes configuration values between `package.json` and `_config.yml`.

```bash
npm run sync-config
```

**Syncs:**

- Repository URL
- Base URL (from package name)

---

## Configuration Files

### check-links.config.js

Configuration for the link checker including:

- Domains to skip
- Timeout settings
- Rate limiting
- Feature toggles

---

## Running Audits

Full audit of the project:

```bash
npm run audit
```

This runs:

1. `check-links` - Link validation
2. `check-orphans` - Orphan file detection
3. `check-figures` - Figure validation
4. `check-yaml` - YAML front matter validation
5. `check-accessibility` - Accessibility checks

For a comprehensive check including all validations:

```bash
npm run check-all
```

This includes everything in `audit` plus:

- `check-math` - Math delimiter balance

To verify physics calculations (requires Python):

```bash
npm run check-physics
```

---

## Physics Calculation Verification

The project includes `check_math.py` (in root) for verifying physics calculations in the textbook content. This Python script checks that numerical examples and problems have mathematically correct solutions.

```bash
python check_math.py
```

---

## Script Naming Conventions

| Prefix          | Purpose                   | Examples                     |
| --------------- | ------------------------- | ---------------------------- |
| `check-*`       | Validation/quality checks | check-links, check-yaml      |
| `fix-*`         | Auto-fix issues           | fix-liquid-syntax            |
| `generate-*`    | File/asset generation     | generate-pdf, generate-icons |
| `build-*`       | Build outputs/indexes     | build-index                  |
| `parse-*`       | Parse/extract data        | parse-summary                |
| `update-*`      | Update existing files     | update-front-matter          |
| `convert-*`     | Format conversion         | convert-webp                 |
| `rename-*`      | Rename operations         | rename-figures               |
| `standardize-*` | Normalize formats         | standardize-links            |
| `sync-*`        | Synchronize data          | sync-config                  |

---

## Dependencies

Scripts use these npm packages:

- `chalk` - Terminal styling
- `cheerio` - HTML parsing (for search index)
- `glob` - File pattern matching
- `gray-matter` - YAML front matter parsing
- `js-yaml` - YAML processing
- `minisearch` - Full-text search indexing
- `node-fetch` - HTTP requests
- `sharp` - Image processing
- `simple-git` - Git operations
- `@playwright/test` - PDF generation

For physics calculation verification:

- `python` - Python 3.x (for check_math.py)
