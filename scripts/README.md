# Scripts

This directory contains build and utility scripts for the Physics Book project.

## Quick Reference

| Script | Command | Description |
|--------|---------|-------------|
| Link Checker | `npm run check-links` | Validate all internal/external links |
| Find Orphans | `npm run find-orphans` | Find unreferenced files |
| Validate Figures | `npm run validate-figures` | Comprehensive figure validation |
| Check Math | `npm run check-math` | Check LaTeX delimiter balance |
| Generate PDF | `npm run pdf:all` | Generate PDF of all chapters |
| Generate Icons | `npm run generate-icons` | Generate PWA icons |
| Parse Summary | `npm run parse-summary` | Generate summary.json |
| Update Front Matter | `npm run update-front-matter` | Update chapter/section in YAML |
| Rename Figures | `npm run rename-figures` | Rename figures and update refs |
| Convert WebP | `npm run convert-webp` | Convert images to WebP |

---

## Quality Assurance Scripts

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

### find-orphan-files.js

Detects unreferenced files in `assets/` and `resources/` directories.

```bash
npm run find-orphans             # Report orphaned files
npm run find-orphans:cleanup     # Generate cleanup script
```

### validate-figures.js

Comprehensive figure validation combining multiple checks:

```bash
npm run validate-figures         # Run all checks
npm run validate-figures:pattern # Check filename patterns only
npm run validate-figures:missing # Check for missing files only
```

**Options:**
- `--check-pattern` - Validate figure filename patterns
- `--check-consistency` - Check figures match chapter/section
- `--check-duplicates` - Find duplicate references
- `--check-sequence` - Check sequential numbering
- `--check-missing` - Find references to missing files
- `--all` - Run all checks (default)

### check-math-delimiters.js

Checks for unbalanced LaTeX math delimiters (`$...$`) in markdown files.

```bash
npm run check-math               # Check contents/ directory
node scripts/check-math-delimiters.js path/to/dir  # Custom directory
```

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

## Build & Generation Scripts

### generatePdf.js

Generates PDF versions of chapters using Playwright.

```bash
npm run pdf:all                  # All chapters separately
npm run pdf:combined             # All chapters in one PDF
npm run pdf:chapter              # Specific chapter
npm run pdf:install              # Install Playwright browsers
npm run pdf:help                 # Show options
```

**Requirements:**
- Jekyll server running on `localhost:4000`
- Playwright Chromium browser (`npm run pdf:install`)

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

### convert-to-webp.js

Converts images to WebP format for better compression.

```bash
npm run convert-webp              # Convert resources/ to resources-webp/
node scripts/convert-to-webp.js --quality 90 --overwrite
```

**Options:**
- `--input <dir>` - Input directory (default: resources)
- `--output <dir>` - Output directory (default: resources-webp)
- `--quality <num>` - WebP quality 0-100 (default: 80)
- `--overwrite` - Overwrite existing files
- `--dry-run` - Preview without converting

---

## Configuration Files

### link-check-config.js

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
1. Link validation
2. Orphan file detection
3. Figure validation

---

## Physics Calculation Verification

The project includes `check_math.py` (in root) for verifying physics calculations in the textbook content. This Python script checks that numerical examples and problems have mathematically correct solutions.

```bash
python check_math.py
```

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
