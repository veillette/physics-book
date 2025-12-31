# Future Plan: Exclude PDFs from Git

## Current Status
PDFs are currently committed to the repository for immediate availability:
- 309 PDFs totaling ~587 MB (plus 1 placeholder file)
- Committed directly to `assets/pdf/`
- Available via GitHub Pages immediately

## Future Enhancement

### Goal
Reduce repository size by excluding PDFs from git and generating them dynamically.

### Implementation Steps

1. **Add PDFs to .gitignore**
   ```bash
   echo "assets/pdf/*.pdf" >> .gitignore
   git rm --cached assets/pdf/*.pdf
   ```

2. **Update GitHub Actions Workflow**
   - Generate PDFs on every deployment
   - Upload to GitHub Pages artifact
   - No git commit needed

3. **Update GitHub Pages Deployment**
   Modify `.github/workflows/jekyll-gh-pages.yml` to:
   - Run PDF generation before deployment
   - Include PDFs in Pages artifact
   - Deploy both HTML and PDFs together

4. **Benefits**
   - Repository size: ~600 MB → ~40 MB
   - Faster git clones
   - No binary merge conflicts
   - PDFs always regenerated from latest content
   - Same user experience (PDFs available on site)

### Alternative: GitHub Releases
Instead of GitHub Pages, attach PDFs to releases:
- Tag releases (e.g., v2024.01)
- Attach PDF bundle as release asset
- Link from documentation

### Transition Plan

#### Completed
1. ✅ **Verify GitHub Actions PDF generation works reliably**
   - Weekly automated generation working since 2025-12-31
   - 100% success rate (310/310 PDFs)
   - Parallel processing with auto-recovery functional
   - 60-minute generation time consistently achieved

#### Remaining Steps
2. **Test Pages deployment with dynamic PDFs**
   - Modify deployment workflow to generate PDFs before Pages deployment
   - Test that PDFs are included in Pages artifact
   - Verify PDFs are accessible on deployed site

3. **Once stable, exclude PDFs from git**
   - Add `assets/pdf/*.pdf` to .gitignore
   - Remove PDFs from git history
   - Update documentation

4. **Archive final committed PDF set as a release**
   - Create release tag (e.g., v2025.1-pdf-archive)
   - Attach final PDF set as release assets
   - Document the transition in release notes

## References
- [GitHub Pages Artifact Upload](https://github.com/actions/upload-pages-artifact)
- [GitHub Large File Storage](https://git-lfs.github.com/)
