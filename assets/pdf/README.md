# PDF Files Directory

This directory contains auto-generated PDF files of the physics book.

## Contents

- **section-XX.Y-*.pdf**: Individual section PDFs (241 total)
- **chapter-XX-intro.pdf**: Chapter introduction pages (34 total)
- **chapter-XX-complete.pdf**: Individual chapter PDFs (34 total - one file per chapter with all sections)
- **complete-book.pdf**: The complete physics book including preface and all chapters (not yet generated)

**Total:** 309 PDFs (587MB) + 1 placeholder for complete book

## Automated Generation

PDFs are automatically generated weekly by the [Generate PDFs workflow](../../.github/workflows/generate-pdfs.yml) using parallel processing for optimal performance.

### Workflow Details

- **Schedule**: Runs every Sunday at 00:00 UTC
- **Manual Trigger**: Available from the GitHub Actions tab
- **Processing**: Parallel generation in 3 phases
  - Phase 1: Section PDFs (4 concurrent) - ~11 minutes
  - Phase 2: Chapter intros (4 concurrent) - ~30 seconds
  - Phase 3: Combined chapters (2 concurrent) - ~18 minutes
- **Total Time**: ~60 minutes for 309 PDFs
- **Auto-Recovery**: Failed PDFs are automatically regenerated with extended timeouts
- **Smart Commits**: Only commits PDFs if they have changed

### Generation Statistics

Latest generation (2025-12-31):
- **PDFs Generated**: 309 actual PDFs (310 files tracked including placeholder)
- **Total Size**: 587M
- **Generation Time**: 61m 36s
- **Success Rate**: 100% (309/309)
- **Largest PDF**: 15.4MB (Chapter 13 complete)

## Manual Generation

### Quick Method (Parallel Processing)

```bash
# Install Playwright browsers (first time only)
npm run generate:pdf:install

# Start Jekyll server
bundle exec jekyll serve

# In another terminal, generate all PDFs in parallel
node scripts/generate-pdf-parallel.js
```

PDFs will be created in the `pdf-output/` directory (~30 minutes for 309 PDFs).

### Standard Method

```bash
# Install Playwright browsers (first time only)
npm run generate:pdf:install

# Start Jekyll server
bundle exec jekyll serve

# In another terminal, generate PDFs
npm run generate:pdf -- --book         # Generate complete book only
npm run generate:pdf -- --combined     # Generate chapter PDFs only
npm run generate:pdf                   # Generate all PDFs sequentially (~2+ hours)
```

### Custom Concurrency

```bash
# Adjust concurrency for your system (default: 4)
MAX_CONCURRENCY=8 node scripts/generate-pdf-parallel.js

# Lower for systems with limited memory
MAX_CONCURRENCY=2 node scripts/generate-pdf-parallel.js
```

## File Sizes

PDF files can be large (multiple MB each) due to:
- Mathematical equations rendered with MathJax
- Images and diagrams
- Comprehensive content coverage

## Excluded from PDF

The following elements are automatically removed during PDF generation:
- Navigation buttons
- Sidebars and menus
- PDF download buttons (to avoid recursion)
- Interactive UI elements
