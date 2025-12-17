# Scripts

Build and utility scripts for the Physics Book project.

## Quick Reference

| Script | Command | Description |
|--------|---------|-------------|
| check-links | `npm run check-links` | Validate internal/external links |
| check-orphans | `npm run check-orphans` | Find unreferenced files |
| check-figures | `npm run check-figures` | Validate figure references |
| check-math | `npm run check-math` | Check LaTeX delimiter balance |
| check-accessibility | `npm run check-accessibility` | Check alt text and accessibility |
| check-yaml | `npm run check-yaml` | Validate YAML front matter |
| standardize-links | `npm run standardize-links` | Convert links to Jekyll/MyST format |
| generate-pdf | `npm run generate-pdf` | Generate PDF of all chapters |
| generate-icons | `npm run generate-icons` | Generate PWA icons |
| parse-summary | `npm run parse-summary` | Generate summary.json |
| update-front-matter | `npm run update-front-matter` | Update chapter/section in YAML |
| rename-figures | `npm run rename-figures` | Rename figures and update refs |
| convert-webp | `npm run convert-webp` | Convert images to WebP |

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

For a comprehensive quality check, also run:

```bash
npm run check-accessibility    # Accessibility issues
npm run check-yaml             # YAML front matter
npm run check-math             # Math delimiter balance
```

---

## Physics Calculation Verification

The project includes `check_math.py` (in root) for verifying physics calculations in the textbook content. This Python script checks that numerical examples and problems have mathematically correct solutions.

```bash
python check_math.py
```

---

## Script Naming Conventions

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `check-*` | Validation/quality checks | check-links, check-yaml |
| `generate-*` | File/asset generation | generate-pdf, generate-icons |
| `parse-*` | Parse/extract data | parse-summary |
| `update-*` | Update existing files | update-front-matter |
| `convert-*` | Format conversion | convert-webp |
| `rename-*` | Rename operations | rename-figures |
| `standardize-*` | Normalize formats | standardize-links |

---

## Dependencies

Scripts use these npm packages:
- `chalk` - Terminal styling
- `glob` - File pattern matching
- `node-fetch` - HTTP requests
- `gray-matter` - YAML front matter parsing
- `js-yaml` - YAML processing
- `sharp` - Image processing
- `@playwright/test` - PDF generation
