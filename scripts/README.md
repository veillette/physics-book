# Scripts

Build and utility scripts for the Jekyll-based open textbook project. These scripts provide quality assurance, content management, and asset generation capabilities.

## Overview

This directory contains Node.js scripts that help maintain content quality and automate common tasks. All scripts are designed to be run via npm commands defined in `package.json`.

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

All validation scripts follow the `check-*` naming convention. These scripts are designed to catch issues before deployment and can be run locally or in CI/CD pipelines.

### check-links.js

Validates all links (internal and external) in markdown files. This is essential for maintaining a working textbook where cross-references are reliable.

**Purpose:** Prevent broken links from reaching production by validating all internal paths and external URLs.

```bash
npm run check-links              # Standard check
npm run check-links:fast         # Faster with shorter timeouts
npm run test:ci                  # CI-optimized with longer timeouts
```

**Options:**
- `--timeout <ms>` - Request timeout (default: 10000)
- `--retries <num>` - Retries for failed requests (default: 2)
- `--concurrent <num>` - Max concurrent requests (default: 10)

**Use Cases:**
- Pre-commit validation to catch broken internal links
- CI/CD pipeline integration for automated testing
- Periodic audits of external URL availability

**Exit Codes:**
- `0` - All links valid
- `1` - One or more broken links found

### check-orphans.js

Detects unreferenced files in `assets/` and `resources/` directories. Helps identify unused assets that can be removed to reduce repository size.

**Purpose:** Keep the repository clean by identifying files that are no longer referenced by any content.

```bash
npm run check-orphans            # Report orphaned files
npm run check-orphans:cleanup    # Generate cleanup script
```

**Options:**
- `--generate-cleanup` - Generate a shell script to remove orphan files

**Use Cases:**
- Repository maintenance to remove unused assets
- Storage optimization before releases
- Identifying assets that may have been forgotten after content updates

**Output:**
- Lists all files in `assets/` and `resources/` that are not referenced
- Shows file sizes and types for each orphan
- Generates cleanup script when requested

### check-figures.js

Comprehensive figure validation combining multiple checks to ensure all figure references are valid and consistent.

**Purpose:** Maintain consistency between figure references in content and actual image files.

```bash
npm run check-figures            # Run all checks
npm run check-figures:pattern    # Check filename patterns only
npm run check-figures:missing    # Check for missing files only
```

**Options:**
- `--check-pattern` - Validate figure filename patterns match conventions
- `--check-consistency` - Check figures match chapter/section naming
- `--check-duplicates` - Find duplicate references to same figure
- `--check-sequence` - Check sequential numbering (e.g., Figure_01_02_01, 02, 03...)
- `--check-missing` - Find references to files that don't exist
- `--all` - Run all checks (default)

**Use Cases:**
- Ensuring figure files follow naming conventions
- Finding missing images that would show as broken on the site
- Verifying figure numbering is consistent

### check-math.js

Checks for unbalanced LaTeX math delimiters (`$...$`) in markdown files. Prevents rendering issues where equations fail to display properly.

**Purpose:** Catch unbalanced math delimiters that would cause MathJax rendering failures.

```bash
npm run check-math               # Check contents/ directory
node scripts/check-math.js path/to/dir  # Custom directory
```

**What It Checks:**
- Matching `$` and `$$` delimiters
- Proper nesting of inline and display math
- Common delimiter mistakes

**Use Cases:**
- Pre-commit validation for content with equations
- CI integration to prevent broken math from deploying
- Batch validation after content migrations

### check-accessibility.js

Checks accessibility concerns in markdown files to ensure content is accessible to all users.

**Purpose:** Ensure content meets basic accessibility standards for images, links, and document structure.

```bash
npm run check-accessibility          # Standard check
npm run check-accessibility:strict   # Strict mode with more checks
```

**Checks performed:**
- Missing or empty alt text on images
- Uninformative alt text (e.g., "image", "figure", "photo")
- Heading level skips (e.g., h1 → h3 without h2)
- Empty or uninformative link text ("click here", "read more")

**Strict mode adds:**
- Short alt text warnings (less than 10 characters)
- Bare URL detection (URLs used as link text)
- Table header validation

**Options:**
- `--strict` - Enable stricter checks

**Use Cases:**
- Accessibility compliance auditing
- Preparing content for accessibility certifications
- Improving screen reader experience

### check-yaml.js

Validates YAML front matter structure in markdown files.

**Purpose:** Ensure all content files have valid and complete front matter required by Jekyll.

```bash
npm run check-yaml               # Standard validation
npm run check-yaml:strict        # Strict mode
node scripts/check-yaml.js --required "title,layout,chapterNumber"
```

**Checks performed:**
- Required fields are present (default: title, layout)
- Field types are correct (strings, numbers, booleans)
- Layout values are valid (page, default, etc.)
- YAML syntax is valid (proper indentation, colons, quotes)

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

Converts internal links to Jekyll/MyST convention (extension-less format). Useful for preparing content for different static site generators.

**Purpose:** Normalize link formats across content for portability and consistency.

```bash
npm run standardize-links        # Dry run - show what would change
npm run standardize-links:apply  # Apply the changes
node scripts/standardize-links.js --validate  # Just validate links
```

**Conversions:**
- `../contents/filename.md` → `./filename`
- `../contents/filename.md#anchor` → `./filename#anchor`
- Removes `.html` and `.md` extensions for Jekyll compatibility

**Options:**
- `--apply` - Apply changes (default is dry run for safety)
- `--validate` - Only validate existing links without suggesting changes

**Use Cases:**
- Preparing content for Jekyll builds
- Migrating content between static site generators
- Standardizing link formats after content imports

---

## Content Management Scripts

### parse-summary.js

Parses `SUMMARY.md` to generate `summary.json` with book structure. Creates a machine-readable representation of the table of contents.

**Purpose:** Generate structured data from SUMMARY.md for programmatic access to book structure.

```bash
npm run parse-summary
node scripts/parse-summary.js --output _data/summary.json
```

**Options:**
- `--input <path>` - Input SUMMARY.md path (default: ./SUMMARY.md)
- `--output <path>` - Output JSON path (default: ./summary.json)

**Output Format:**
```json
{
  "chapters": [
    {
      "title": "Chapter 1: Introduction",
      "path": "contents/ch1Introduction.md",
      "sections": [...]
    }
  ]
}
```

**Use Cases:**
- Generating navigation data for JavaScript components
- Creating chapter/section indexes
- Building search indexes

### update-front-matter.js

Updates YAML front matter in markdown files with chapter/section numbers based on SUMMARY.md structure.

**Purpose:** Automatically maintain chapter and section numbers in content files.

```bash
npm run update-front-matter       # Update all files
node scripts/update-front-matter.js --dry-run  # Preview changes
```

**Options:**
- `--summary <path>` - Path to summary.json
- `--dry-run` - Preview without changes

**What It Updates:**
- `chapterNumber` - The chapter number (1, 2, 3...)
- `sectionNumber` - The section within the chapter (1.1, 1.2...)
- `order` - The global ordering for navigation

**Use Cases:**
- After reorganizing chapters in SUMMARY.md
- When adding new sections to existing chapters
- Maintaining consistent numbering across all content

### rename-figures.js

Renames figure files and updates all references in markdown. Safely handles renaming across the entire project.

**Purpose:** Safely rename figure files while automatically updating all references.

```bash
npm run rename-figures -- Figure_01_02_03 Figure_01_02_04
npm run rename-figures -- --pattern "Figure_01_" "Figure_02_"
npm run rename-figures -- Figure_01_02_03 Figure_01_02_04 --dry-run
```

**Options:**
- `--pattern` - Use pattern matching for bulk renames
- `--dry-run` - Preview without changes

**Safety Features:**
- Validates new filename doesn't already exist
- Updates all markdown references before renaming file
- Shows all affected files before applying changes

**Use Cases:**
- Fixing figure naming after reorganization
- Renaming figures to follow naming conventions
- Bulk renaming when restructuring chapters

---

## Generation Scripts (`generate-*`)

### generate-pdf.js

Generates PDF versions of chapters using Playwright. Creates print-ready PDFs from the rendered Jekyll site.

**Purpose:** Generate PDF versions of content for offline distribution or printing.

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

**Output:**
- Individual chapter PDFs in `pdfs/` directory
- Combined PDF when using `--combined` flag

**Use Cases:**
- Creating printable versions for students without internet access
- Generating PDFs for accessibility (screen readers often work better with PDFs)
- Archiving content versions

### generate-icons.js

Generates PWA icons and favicons from source logo.

**Purpose:** Generate all required icon sizes for Progressive Web App support.

```bash
npm run generate-icons
```

**Generates:**
- Standard icons (48px, 72px, 96px, 128px, 144px, 192px, 384px, 512px)
- Maskable icons with safe zone for Android
- Apple touch icons (120px, 152px, 167px, 180px)
- Favicon (PNG and ICO formats)

**Input:**
- Source image from `assets/image/imagePWA.png`

**Output:**
- Icons in `assets/manifest/icons/`
- Favicon in `assets/image/`

---

## Conversion Scripts

### convert-webp.js

Converts images to WebP format for better compression and faster loading.

**Purpose:** Optimize images for web delivery while maintaining quality.

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

**Supported Formats:**
- Input: JPG, JPEG, PNG, GIF, BMP, TIFF
- Output: WebP (lossy or lossless based on source)

**Use Cases:**
- Optimizing image assets before deployment
- Reducing page load times
- Creating responsive image sets

---

## Configuration Files

### check-links.config.js

Configuration for the link checker including:
- Domains to skip (known-problematic sites)
- Timeout settings per domain
- Rate limiting configuration
- Feature toggles

Modify this file to customize link checking behavior for your specific needs.

---

## Running Full Audits

Run a comprehensive audit of the entire project:

```bash
npm run audit
```

This runs:
1. `check-links` - Link validation
2. `check-orphans` - Orphan file detection
3. `check-figures` - Figure validation

For a complete quality check, also run:

```bash
npm run check-accessibility    # Accessibility issues
npm run check-yaml             # YAML front matter
npm run check-math             # Math delimiter balance
```

---

## Physics Calculation Verification

The project includes `check_math.py` (in repository root) for verifying physics calculations in the textbook content. This Python script checks that numerical examples and problems have mathematically correct solutions.

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

| Package | Purpose |
|---------|---------|
| `chalk` | Terminal styling and colored output |
| `glob` | File pattern matching |
| `node-fetch` | HTTP requests for link checking |
| `gray-matter` | YAML front matter parsing |
| `js-yaml` | YAML processing |
| `sharp` | Image processing and conversion |
| `@playwright/test` | Browser automation for PDF generation |

Install all dependencies with:

```bash
npm install
```

---

## Adding New Scripts

When adding new scripts:

1. Follow the naming conventions above
2. Add npm scripts in `package.json`
3. Document the script in this README
4. Include `--help` output for complex scripts
5. Use appropriate exit codes (0 for success, 1 for errors)
6. Add chalk for colored console output
7. Support `--dry-run` for destructive operations

---

## Troubleshooting

### Script fails with "Module not found"

```bash
npm install
```

### PDF generation fails

1. Ensure Jekyll server is running: `bundle exec jekyll serve`
2. Install Playwright browsers: `npm run generate-pdf:install`
3. Check that port 4000 is not in use

### Check-links times out

Use the fast version or increase timeout:

```bash
npm run check-links:fast
# or
node scripts/check-links.js --timeout 30000
```

### Sharp installation fails

Sharp requires native dependencies. On some systems:

```bash
npm rebuild sharp
```
