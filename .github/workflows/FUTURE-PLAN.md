# Future Plan: Exclude PDFs from Git

## Current Status
PDFs are currently committed to the repository for immediate availability:
- 310 PDFs totaling ~594 MB
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
1. Verify GitHub Actions PDF generation works reliably
2. Test Pages deployment with dynamic PDFs
3. Once stable, exclude PDFs from git
4. Archive final committed PDF set as a release

## References
- [GitHub Pages Artifact Upload](https://github.com/actions/upload-pages-artifact)
- [GitHub Large File Storage](https://git-lfs.github.com/)
