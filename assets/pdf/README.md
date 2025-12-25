# PDF Files Directory

This directory contains auto-generated PDF files of the physics book.

## Contents

- **complete-book.pdf**: The complete physics book including preface and all chapters
- **chapter-XX-complete.pdf**: Individual chapter PDFs (one file per chapter with all sections)

## Generation

PDFs are automatically generated weekly by the [Generate PDFs workflow](../../.github/workflows/generate-pdfs.yml).

The workflow:
- Runs every Sunday at 00:00 UTC
- Can be manually triggered from the Actions tab
- Generates PDFs using Playwright and Chromium
- Commits updated PDFs to this directory only if they have changed

## Manual Generation

To generate PDFs locally:

```bash
# Install Playwright browsers (first time only)
npm run generate:pdf:install

# Start Jekyll server
bundle exec jekyll serve

# In another terminal, generate PDFs
npm run generate:pdf -- --book         # Generate complete book
npm run generate:pdf -- --combined     # Generate chapter PDFs
```

PDFs will be created in the `pdf-output/` directory.

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
