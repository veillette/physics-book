# Claude Context for Physics Book Project

## Quick Start

**For Quick Understanding:**

- **What**: Open-source, algebra-based college physics textbook with 280+ sections
- **Tech**: Jekyll + Kramdown + MathJax v4 + GitHub Pages
- **Local Dev**: `bundle exec jekyll serve --incremental` → `http://localhost:4000/physics-book/`
- **Structure**: Content in `contents/`, organized as `ch[N][SectionName].md`
- **Key Files**: `SUMMARY.md` (TOC), `_config.yml` (config), `claude.md` (this file)

**Common Tasks:**

- Add content → Update `contents/` + `SUMMARY.md`
- Fix links → Always use `{{ site.baseurl }}/path`
- Check math → Run `npm run check-math`
- Validate links → Run `npm run check-links`

---

## Project Overview

This is an **open-source physics textbook** built with Jekyll and GitHub Pages. The project provides an accessible, interactive college-level physics education resource that's free and customizable.

**Live Site:** https://veillette.github.io/physics-book/
**Repository:** https://github.com/veillette/physics-book
**License:** Creative Commons BY-NC-SA 4.0

## Technology Stack

### Core Technologies

- **Jekyll**: Static site generator (v3.9+)
- **Kramdown**: Markdown parser (GitHub-Flavored Markdown mode)
- **MathJax v4**: Asynchronous mathematical equation rendering
- **GitHub Pages**: Automated hosting and deployment
- **Ruby**: 2.7+ required for Jekyll

### Development Tools

- **Node.js**: For utility scripts (link checking, PDF generation, math validation)
- **Playwright**: Browser automation for PDF generation
- **GitHub Actions**: CI/CD workflows for deployment and quality checks

## Project Structure

```
physics-book/
├── contents/           # All textbook content (Markdown files)
│   ├── ch1*.md        # Chapter 1 sections
│   ├── ch2*.md        # Chapter 2 sections
│   └── ...            # Additional chapters
├── assets/            # CSS, JavaScript, images
├── _layouts/          # Jekyll page templates
├── _includes/         # Reusable Jekyll components (navigation, MathJax config)
├── scripts/           # Build and utility scripts
├── parsingScripts/    # Content parsing utilities
├── resources/         # Static resources
├── _config.yml        # Jekyll configuration
├── SUMMARY.md         # Table of contents
└── index.html         # Homepage
```

## Content Organization

### Chapter Structure

- Each chapter has a main file (e.g., `ch2Kinematics.md`)
- Sections are in separate files (e.g., `ch2Displacement.md`, `ch2Acceleration.md`)
- Organized by chapter number (ch1-ch22+)
- Special files: `Glossary.md`, `appendixA.md`, `appendixB.md`

### File Naming Convention

- Format: `ch[NUMBER][DescriptiveName].md`
- Example: `ch2TimeVelocityAndSpeed.md`
- Use PascalCase for multi-word names

### End-of-Chapter Problems and Solutions

Many chapter sections include practice problems at the end:

- **Conceptual Questions**: Questions testing understanding of concepts without complex calculations
- **Problems & Exercises**: Numerical problems requiring calculations and problem-solving

**Location**: These sections appear at the end of individual section files (e.g., `ch10AngularAcceleration.md`)

**Format**:

- Problems are typically numbered and formatted as ordered lists
- Questions use HTML entities for special characters (e.g., `&amp;` for `&`)
- Math notation uses MathJax delimiters (`$...$` or `$$...$$`)

**Contributing Solutions**:
When contributing worked solutions to practice problems:

1. Place solutions in the same file as the problems, under a `### Solutions` heading
2. Number solutions to match the corresponding problem numbers
3. Show all work and intermediate steps for clarity
4. Use proper MathJax notation for equations and calculations
5. Include brief explanations of the approach and reasoning
6. Test that all equations render correctly locally before committing

**Example Solution Format**:

```markdown
### Solutions

**1.** Given: initial velocity $v_0 = 10 \text{ m/s}$, acceleration $a = 2 \text{ m/s}^2$, time $t = 5 \text{ s}$

Using the kinematic equation: $v = v_0 + at$

$$v = 10 + (2)(5) = 10 + 10 = 20 \text{ m/s}$$

**Answer**: The final velocity is 20 m/s.
```

## Mathematics and Equations

### MathJax Configuration

- **Version**: MathJax 4.0 (loaded asynchronously from CDN)
- **Location**: `_includes/mathjax.html`
- **Inline math**: `$...$` or `\\(...\\)`
- **Display math**: `$$...$$` or `\\[...\\]`

### Common Usage Examples

**Inline equations:**

```markdown
The equation $E = mc^2$ represents mass-energy equivalence.
Newton's second law is $F = ma$.
```

**Display equations:**

```markdown
The quadratic formula is:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Kinetic energy:

$$KE = \frac{1}{2}mv^2$$
```

**Aligned equations:**

```markdown
$$
\begin{align}
v &= v_0 + at \\
x &= x_0 + v_0 t + \frac{1}{2}at^2
\end{align}
$$
```

**Matrices and vectors:**

```markdown
$$\vec{F} = m\vec{a}$$

$$\begin{pmatrix} x \\ y \\ z \end{pmatrix}$$
```

### Important Notes

- MathJax loads asynchronously to prevent blocking page render
- Equations are rendered after content loads via `startup.ready()` promise
- Always escape backslashes in Markdown: `\\frac` not `\frac`
- Test equation rendering when adding/modifying math content
- Use `npm run check-math` to validate before committing

## Development Workflow

### Local Development

```bash
# Install dependencies
gem install bundler jekyll
bundle install

# Start local server
bundle exec jekyll serve --incremental

# View at http://localhost:4000/physics-book/
```

### Building

```bash
# Production build
bundle exec jekyll build

# Output to _site/ directory
```

## Code Conventions

### Markdown Format

- Use Kramdown syntax (GFM input mode)
- Front matter required for all content pages:
  ```yaml
  ---
  title: 'Page Title'
  layout: page
  ---
  ```

### Jekyll Includes

- Navigation: Configured in `_includes/navigation.html`
- MathJax: Loaded via `_includes/mathjax.html`
- Reusable components go in `_includes/`

### CSS and JavaScript

- Main styles in `assets/css/`
- Scripts in `assets/js/`
- Use compressed/minified for production

## Common Tasks

### Adding a New Chapter Section

1. Create file in `contents/` with naming pattern `ch[N][SectionName].md`
2. Add front matter with title and layout
3. Update `SUMMARY.md` to include in table of contents
4. Test MathJax rendering if equations present

### Updating Navigation

- Edit `_includes/navigation.html`
- Update `SUMMARY.md` for table of contents
- Ensure baseurl is correctly used: `{{ site.baseurl }}/path`

### Working with Images

- Store in `resources/` directory
- Reference with: `![alt text]({{ site.baseurl }}/resources/image.png)`
- Use descriptive filenames

## Important Configuration

### Site Settings (\_config.yml)

- **baseurl**: `/physics-book` (important for GitHub Pages)
- **url**: `https://veillette.github.io`
- **markdown**: kramdown
- **math_engine**: null (using MathJax CDN instead)

### Recent Fixes

- Navigation bar loads correctly with site.url + baseurl
- MathJax v4 configured with async loading
- Equations render properly with `startup.ready()` promise

## CI/CD and Automation

### GitHub Actions Workflows

The project uses automated workflows in `.github/workflows/`:

**1. Deployment (deploy.yml)**

- Triggered on push to main branch
- Builds Jekyll site automatically
- Deploys to GitHub Pages
- Ensures live site is always up-to-date

**2. Link Checking (link-check.yml)**

- Runs on pull requests and scheduled intervals
- Validates all internal and external links
- Prevents broken links from being merged
- Uses the same `check-links` script as local development

### Automated Quality Checks

When you push changes:

1. Jekyll build is validated
2. Links are checked for validity
3. Site is deployed if on main branch
4. Any failures are reported in PR checks

**Best Practice:** Always check your changes locally before pushing:

```bash
bundle exec jekyll build    # Verify build succeeds
npm run check-links         # Check for broken links
npm run check-math          # Validate equations
```

## Git Workflow

### Branch Strategy

- **Main branch**: Production branch, auto-deploys to GitHub Pages
- **Feature branches**: Use `claude/[description]-[session-id]` pattern
- **Pull requests**: Required for contributing changes
- Always push to your designated branch (never force-push to main)

### Commit Guidelines

- Clear, descriptive commit messages
- Focus on "why" not just "what"
- Reference issues/PRs when applicable
- Group related changes in single commits
- Test locally before committing

### Typical Workflow

```bash
# Create feature branch
git checkout -b claude/improve-chapter-2

# Make changes and test
bundle exec jekyll serve --incremental
# ... edit files ...
npm run check-links

# Commit and push
git add contents/ch2*.md
git commit -m "Improve explanations in kinematics chapter"
git push -u origin claude/improve-chapter-2

# Create pull request on GitHub
```

## Testing Checklist

When making changes, verify:

- [ ] Local Jekyll build succeeds
- [ ] MathJax equations render correctly
- [ ] Navigation links work (include baseurl)
- [ ] Images display properly
- [ ] Responsive design on mobile
- [ ] No console errors in browser
- [ ] Links use correct baseurl

## Utilities and Scripts

### Node.js Scripts (package.json)

**Link Validation:**

```bash
npm run check-links              # Check all internal and external links
npm run check-links:fast         # Faster checking with reduced timeout
npm test                         # Alias for check-links
npm test:ci                      # CI-optimized link checking
```

**Content Auditing:**

```bash
npm run check-orphans            # Find unreferenced content files
npm run check-orphans:cleanup    # Generate cleanup script for orphans
npm run audit                    # Run link check, orphan detection, and figure checking
```

**PDF Generation:**

```bash
npm run generate-pdf:install     # Install Playwright Chromium
npm run generate-pdf --all       # Generate PDFs for all chapters
npm run generate-pdf:combined    # Create single PDF of entire book
npm run generate-pdf:chapter     # Generate PDF for specific chapter
npm run generate-pdf:help        # Show PDF generation help
```

**Note:** PDF generation requires Playwright to be installed first with `npm run generate-pdf:install`.

### Additional Scripts

**Figure and Accessibility Checking:**

```bash
npm run check-figures            # Check for figure issues
npm run check-accessibility      # Check accessibility compliance
npm run check-yaml               # Validate YAML front matter
```

### Parsing Scripts (parsingScripts/)

Utility scripts for content processing and migration:

- Content format conversion helpers
- Batch processing tools for content updates
- Migration utilities (see `JEKYLL_TO_*.md` files)

### Package Management

- **Ruby gems**: Managed via `Gemfile` and `bundle`
- **Node packages**: Managed via `package.json` and `npm`
  - Key dependencies: Playwright, gray-matter, chalk, sharp

## Common Issues and Solutions

### MathJax Not Rendering

**Symptoms:** Equations show as raw LaTeX or don't appear
**Solutions:**

- Ensure `{% include mathjax.html %}` is in your layout
- Check browser console for MathJax loading errors
- Verify equation delimiters: `$...$` for inline, `$$...$$` for display
- Test with `npm run check-math` to validate syntax
- Wait for async loading completion (MathJax loads after page)

### Navigation Links Broken

**Symptoms:** Links return 404 on GitHub Pages but work locally
**Solutions:**

- Always use `{{ site.baseurl }}` prefix for internal links
- Check `_config.yml` baseurl is set to `/physics-book`
- Test with the full local URL: `http://localhost:4000/physics-book/`
- Remember: GitHub Pages uses baseurl, plain localhost doesn't

### Build Failures

**Symptoms:** Jekyll build fails or produces errors
**Solutions:**

- Check Kramdown syntax (especially in tables and lists)
- Validate YAML front matter (colons, quotes, indentation)
- Review Jekyll error messages in terminal output
- Ensure Ruby version compatibility (2.7+)
- Try `bundle update` if gem versions conflict

### PDF Generation Issues

**Symptoms:** PDF scripts fail or produce incomplete output
**Solutions:**

- Run `npm run generate-pdf:install` to ensure Playwright is installed
- Check that Jekyll server is running for local PDF generation
- Verify MathJax has loaded before PDF capture
- Use `--help` flag to see available options
- Ensure sufficient disk space for large PDFs

### Service Worker / Offline Issues

**Symptoms:** Offline mode not working or stale content
**Solutions:**

- Check `serviceWorker.js` is being served correctly
- Clear browser cache and re-register service worker
- Inspect service worker in browser DevTools → Application tab
- Verify HTTPS (service workers require secure context or localhost)

## Resources

- **Jekyll Docs**: https://jekyllrb.com/docs/
- **Kramdown Syntax**: https://kramdown.gettalong.org/syntax.html
- **MathJax Docs**: https://docs.mathjax.org/
- **GitHub Pages**: https://docs.github.com/en/pages

## Advanced Features

### Service Worker & Offline Support

- **File**: `serviceWorker.js`
- **Functionality**: Caches pages for offline access after first visit
- **Scope**: All pages under `/physics-book/`
- **Debugging**: Use browser DevTools → Application → Service Workers

### Interactive Elements

- Responsive navigation with mobile support
- Smooth scrolling and anchor links
- Cross-referenced equations and sections
- External resource links to simulations and labs

### Performance Optimizations

- MathJax loaded asynchronously to prevent render blocking
- Incremental Jekyll builds during development (`--incremental` flag)
- Compressed assets for production
- CDN-hosted libraries (MathJax, fonts)

### Content Validation

- **Math checking**: Node.js script validates equation syntax
- **Link validation**: Automated checking of internal/external links
- **Orphan detection**: Finds unreferenced content files
- **Figure checking**: Validates figure references and availability
- **CI integration**: Automated checks on pull requests

## Project Documentation

Additional reference documents in the repository:

- **CHANGELOG.md**: Version history and notable changes
- **SUMMARY.md**: Complete table of contents
- **JEKYLL_TO_ELEVENTY_MIGRATION_PLAN.md**: Future migration planning
- **JEKYLL_TO_MYSTMD_MIGRATION_ANALYSIS.md**: Alternative platform analysis
- **KRAMDOWN_MIGRATION_REVIEW.md**: Markdown format decisions

## Contributing

This is an open educational resource. When contributing:

### Content Guidelines

- Maintain consistent formatting and style
- Ensure scientific accuracy (cite sources when needed)
- Add worked examples and explanations where helpful
- Include practice problems with solutions
- Use clear, accessible language

### Technical Guidelines

- Test thoroughly before committing (build, links, math)
- Follow existing file naming conventions
- Update `SUMMARY.md` when adding new sections
- Ensure all links use `{{ site.baseurl }}`
- Keep accessibility in mind (alt text, semantic HTML)

### Code Review

- Review the Testing Checklist before submitting PRs
- Respond to automated check failures
- Be open to feedback and iteration

## License

This project is licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International**.

See LICENSE.txt for full details.

**Summary**: Free for educational use, requires attribution, non-commercial, share-alike terms apply.
