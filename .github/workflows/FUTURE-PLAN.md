# Future Plan: Exclude PDFs from Git

## Status: Completed (July 2026)

PDFs are no longer committed to the repository. They are generated dynamically during
GitHub Pages deployment and published quarterly to a GitHub Release archive.

## Implementation Summary

### What changed

1. **PDFs excluded from git** — `assets/pdf/*.pdf` is gitignored (only `README.md` is tracked)
2. **Dynamic generation on deploy** — `.github/workflows/deploy.yml` generates PDFs with Playwright before each Pages deployment
3. **Shared generation action** — `.github/actions/generate-chapter-pdfs/` encapsulates the serve → generate → copy pipeline
4. **Release archive** — `.github/workflows/generate-pdfs.yml` publishes PDFs to the `pdfs` GitHub Release quarterly (and on manual trigger)

### Benefits achieved

- Repository size reduced (~600 MB → ~40 MB)
- Faster git clones
- No binary merge conflicts
- PDFs always regenerated from latest content on deploy
- Same user experience (PDFs available on the deployed site)

### Architecture

```
push to main
    │
    ▼
deploy.yml
    ├── npm ci + Playwright install
    ├── Eleventy build (for serving)
    ├── generate-chapter-pdfs action (~60 min)
    ├── Eleventy rebuild (passthrough PDFs to _site/)
    ├── search index generation
    └── upload-pages-artifact → GitHub Pages

Quarterly (or manual):
generate-pdfs.yml → same generation → publish to `pdfs` release
```

### Notes

- Deploy jobs have a 120-minute timeout to accommodate PDF generation
- Vercel builds do not generate PDFs (GitHub Pages is the primary PDF host)
- The complete-book PDF (`complete-book.pdf`) is not yet implemented

## References

- [GitHub Pages Artifact Upload](https://github.com/actions/upload-pages-artifact)
- [Composite Actions](https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-composite-action)
