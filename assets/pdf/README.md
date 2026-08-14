# PDF Files Directory

This directory contains auto-generated PDF files of the physics book.

## Contents

- **chapter-XX-section-YY.pdf**: Individual section PDFs (241 total)
- **chapter-XX-intro.pdf**: Chapter introduction pages (34 total)
- **chapter-XX-complete.pdf**: Combined chapter PDFs (34 total — one file per chapter with all sections)
- **complete-book.pdf**: The complete physics book including preface and all chapters (not yet generated)

**Total:** ~309 PDFs (~587 MB)

## Automated Generation

PDFs are **not committed to git**. They are generated automatically:

1. **On every GitHub Pages deploy** — `.github/workflows/deploy.yml` generates PDFs with Playwright before publishing (~60 minutes)
2. **Quarterly archive** — `.github/workflows/generate-pdfs.yml` publishes PDFs to the [`pdfs` GitHub Release](https://github.com/veillette/physics-book2/releases) (1st of Jan, Apr, Jul, Oct)

### Processing Details

- **Parallel generation** in 3 phases (sections → intros → combined chapters)
- **Total time**: ~60 minutes for 309 PDFs
- **Auto-recovery**: Failed PDFs are automatically regenerated with extended timeouts

## Manual Generation

### Quick Method (Parallel Processing)

```bash
# Install Playwright browsers (first time only)
npm run generate:pdf:install

# Start Eleventy server
npm run serve

# In another terminal, generate all PDFs in parallel
node scripts/generate-pdf-parallel.js
cp pdf-output/*.pdf assets/pdf/
```

PDFs are created in `pdf-output/` (~30 minutes for 309 PDFs), then copy to this directory.

### Standard Method

```bash
npm run generate:pdf:install
npm run serve
npm run generate:pdf -- --book         # Generate complete book only
npm run generate:pdf -- --combined     # Generate chapter PDFs only
npm run generate:pdf                   # Generate all PDFs sequentially (~2+ hours)
```

### Custom Concurrency

```bash
MAX_CONCURRENCY=8 node scripts/generate-pdf-parallel.js
MAX_CONCURRENCY=2 node scripts/generate-pdf-parallel.js  # lower for limited memory
```

## File Sizes

PDF files can be large (multiple MB each) due to mathematical equations, images, and comprehensive content coverage.

## Excluded from PDF

The following elements are automatically removed during PDF generation:

- Navigation buttons
- Sidebars and menus
- PDF download buttons (to avoid recursion)
- Interactive UI elements
