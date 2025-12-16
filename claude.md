# Claude Context for Open Textbook Project

This document provides context for AI assistants and developers working with this Jekyll-based open textbook project.

---

## Quick Start

**What This Is:**
- An open-source textbook platform built with Jekyll + Kramdown + MathJax v4
- Designed for educational content with rich mathematical notation
- Includes quality assurance tools for content validation

**Essential Commands:**

```bash
# Local development
bundle exec jekyll serve --incremental   # Start dev server at localhost:4000

# Quality checks
npm run check-links                       # Validate all links
npm run check-math                        # Check LaTeX delimiters
npm run audit                             # Run all validation

# Content tools
npm run check-orphans                     # Find unreferenced files
npm run check-accessibility               # Check accessibility
npm run check-yaml                        # Validate front matter
```

**Key Files:**
- `SUMMARY.md` - Table of contents (update when adding content)
- `_config.yml` - Jekyll configuration
- `contents/` - All textbook content files

---

## Project Architecture

### Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Site Generator | Jekyll 3.9+ | Static site generation |
| Markdown | Kramdown (GFM mode) | Content parsing |
| Math Rendering | MathJax v4 | Equation display |
| Hosting | GitHub Pages | Deployment |
| Scripts | Node.js | Quality assurance tools |
| PDF Generation | Playwright | Print-ready exports |

### Directory Structure

```
project-root/
├── contents/              # Textbook content (Markdown)
│   ├── ch1*.md           # Chapter 1 sections
│   ├── ch2*.md           # Chapter 2 sections
│   └── ...               # Additional chapters
├── assets/               # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── image/           # Site images (favicon, logo)
│   ├── icon/            # Icon assets
│   ├── manifest/        # PWA manifest and icons
│   └── pwa/             # PWA support files
├── resources/            # Content images and figures
├── scripts/              # Node.js utility scripts
├── tests/                # Unit tests for scripts
├── doc/                  # Migration and planning docs
├── _layouts/             # Jekyll page templates
├── _includes/            # Reusable Jekyll components
├── _config.yml           # Jekyll configuration
├── SUMMARY.md            # Table of contents
├── index.html            # Homepage
├── sw.js                 # Service worker (PWA)
├── package.json          # Node.js dependencies
├── Gemfile               # Ruby dependencies
└── claude.md             # This file
```

---

## Content Guidelines

### File Naming Convention

Content files follow this pattern:
```
ch[NUMBER][SectionName].md
```

Examples:
- `ch1Introduction.md` - Chapter 1 introduction
- `ch2TimeVelocityAndSpeed.md` - Chapter 2 section
- `ch10AngularAcceleration.md` - Chapter 10 section

Use PascalCase for multi-word names. The number prefix determines chapter organization.

### Required Front Matter

Every content file needs YAML front matter:

```yaml
---
title: 'Section Title'
layout: page
---
```

Optional fields:
```yaml
---
title: 'Section Title'
layout: page
chapterNumber: 2
sectionNumber: 3
description: 'Brief description for metadata'
---
```

### Mathematical Notation

The project uses MathJax v4 for rendering equations.

**Inline Math:**
```markdown
The equation $E = mc^2$ shows mass-energy equivalence.
```

**Display Math:**
```markdown
The quadratic formula is:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

**Aligned Equations:**
```markdown
$$
\begin{align}
v &= v_0 + at \\
x &= x_0 + v_0 t + \frac{1}{2}at^2
\end{align}
$$
```

**Important:**
- Always escape backslashes in Markdown: `\\frac` not `\frac`
- Test equations locally before committing
- Run `npm run check-math` to validate delimiter balance

### Internal Links

**Always use `{{ site.baseurl }}` for internal links:**

```markdown
<!-- Correct -->
[Next Section]({{ site.baseurl }}/contents/ch2Kinematics)
![Figure]({{ site.baseurl }}/resources/figure.png)

<!-- Incorrect - will break on GitHub Pages -->
[Next Section](/contents/ch2Kinematics)
```

### Images and Figures

Store images in `resources/` directory:

```markdown
![Description of the image]({{ site.baseurl }}/resources/Figure_02_01_01.jpg)
```

Figure naming convention: `Figure_[Chapter]_[Section]_[Number].ext`

---

## Development Workflow

### Local Setup

```bash
# 1. Install Ruby dependencies
gem install bundler jekyll
bundle install

# 2. Install Node.js dependencies
npm install

# 3. Start development server
bundle exec jekyll serve --incremental

# 4. View at http://localhost:4000/ (or with baseurl if configured)
```

### Making Changes

1. **Edit content** in `contents/` directory
2. **Test locally** with Jekyll server
3. **Run validation:**
   ```bash
   npm run check-links    # Verify links work
   npm run check-math     # Validate equations
   npm run check-yaml     # Check front matter
   ```
4. **Commit** with clear message
5. **Push** to trigger deployment

### Adding New Content

1. Create file in `contents/` with proper naming
2. Add front matter
3. Write content with proper Markdown/MathJax
4. Update `SUMMARY.md` to add to table of contents
5. Run `npm run check-links` to verify

---

## Quality Assurance Scripts

See `scripts/README.md` for complete documentation.

### Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run check-links` | Validate internal/external links |
| `npm run check-math` | Check LaTeX delimiter balance |
| `npm run check-yaml` | Validate YAML front matter |
| `npm run check-accessibility` | Check alt text, headings |
| `npm run check-orphans` | Find unreferenced files |
| `npm run check-figures` | Validate figure references |
| `npm run audit` | Run all validation checks |

### Running Before Commits

Always run before committing content changes:

```bash
npm run check-math && npm run check-links
```

For comprehensive validation:

```bash
npm run audit
```

---

## Common Tasks

### Fix Broken Links

1. Run `npm run check-links` to identify broken links
2. Check if link should use `{{ site.baseurl }}`
3. Verify file exists at referenced path
4. Update SUMMARY.md if section was renamed

### Fix Math Rendering

1. Run `npm run check-math` to find issues
2. Common fixes:
   - Balance `$` delimiters
   - Escape backslashes: `\\frac`, `\\sqrt`
   - Use `$$` for display math (not `$` on its own line)

### Add Practice Problems

Add at end of section files:

```markdown
## Conceptual Questions

1. Question about concepts...

2. Another conceptual question...

## Problems & Exercises

1. Numerical problem with calculations...

2. Another exercise...

### Solutions

**1.** Given: $m = 5 \text{ kg}$, $a = 3 \text{ m/s}^2$

Using $F = ma$:
$$F = (5)(3) = 15 \text{ N}$$

**Answer:** 15 N
```

### Generate PDFs

```bash
# Install browser (first time)
npm run generate-pdf:install

# Start Jekyll server (in separate terminal)
bundle exec jekyll serve

# Generate PDFs
npm run generate-pdf             # All chapters
npm run generate-pdf:combined    # Single book PDF
npm run generate-pdf:chapter     # Specific chapter
```

---

## Configuration Reference

### _config.yml

Key settings to customize:

```yaml
# Site identity
title: "Your Textbook Title"
tagline: "Your Tagline"
author: "Author Name"

# GitHub Pages deployment
url: "https://yourusername.github.io"    # Your GitHub Pages URL
baseurl: "/your-repo-name"                # Repository name with leading slash
repository: yourusername/your-repo-name   # For GitHub metadata

# Build settings (usually don't change)
markdown: kramdown
highlighter: rouge
```

### MathJax Configuration

Located in `_includes/mathjax.html`:
- Loads MathJax v4 from CDN
- Configures `$...$` for inline math
- Configures `$$...$$` for display math
- Async loading to prevent render blocking

---

## CI/CD Integration

### GitHub Actions Workflows

Located in `.github/workflows/`:

**deploy.yml** - Automatic deployment
- Triggers on push to main
- Builds Jekyll site
- Deploys to GitHub Pages

**link-check.yml** - Link validation
- Runs on pull requests
- Validates internal/external links
- Prevents broken links from merging

**ci.yml** - Continuous integration
- Runs quality checks
- Validates build succeeds

---

## Troubleshooting

### MathJax Not Rendering

**Symptoms:** Equations show as raw LaTeX

**Solutions:**
1. Check `{% include mathjax.html %}` in layout
2. Verify delimiter balance: `$...$` or `$$...$$`
3. Run `npm run check-math`
4. Check browser console for errors

### Links Broken on GitHub Pages

**Symptoms:** 404 errors on deployed site

**Solutions:**
1. Always use `{{ site.baseurl }}/path`
2. Check `_config.yml` has correct `url` and `baseurl`
3. Verify file exists at path

### Jekyll Build Fails

**Symptoms:** Build errors in terminal

**Solutions:**
1. Check Kramdown syntax (tables, lists)
2. Validate YAML front matter: `npm run check-yaml`
3. Look for unclosed HTML tags
4. Try `bundle update` for gem issues

### PDF Generation Fails

**Solutions:**
1. Ensure Jekyll server running: `bundle exec jekyll serve`
2. Install browsers: `npm run generate-pdf:install`
3. Check port 4000 is free
4. Wait for MathJax to load (script handles this)

---

## Git Workflow

### Branch Strategy

- **main**: Production branch, auto-deploys
- **feature branches**: Use `feature/description` pattern
- Always create PRs for changes

### Commit Guidelines

- Clear, descriptive messages
- Focus on "why" not "what"
- Reference issues when applicable
- Test before committing

### Example Workflow

```bash
# Create feature branch
git checkout -b feature/improve-chapter-5

# Make changes
# ... edit files ...

# Validate
npm run audit

# Commit
git add contents/ch5*.md
git commit -m "Improve explanations in chapter 5 wave mechanics"

# Push
git push -u origin feature/improve-chapter-5

# Create PR on GitHub
```

---

## Resources

### Documentation

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)
- [MathJax Docs](https://docs.mathjax.org/)
- [GitHub Pages](https://docs.github.com/en/pages)

### Project Files

- [scripts/README.md](./scripts/README.md) - Script documentation
- [CONTRIBUTE.md](./CONTRIBUTE.md) - Contribution guidelines
- [SUMMARY.md](./SUMMARY.md) - Table of contents

---

## Contributing

When contributing to this project:

### Content Guidelines

- Maintain consistent formatting and style
- Ensure accuracy (cite sources when needed)
- Add worked examples where helpful
- Include practice problems with solutions
- Use clear, accessible language

### Technical Guidelines

- Test thoroughly before committing
- Follow file naming conventions
- Update `SUMMARY.md` for new sections
- Use `{{ site.baseurl }}` for all internal links
- Keep accessibility in mind (alt text, semantic HTML)

### Before Submitting

- [ ] Local build succeeds
- [ ] Math equations render correctly
- [ ] Links work (run `npm run check-links`)
- [ ] YAML is valid (run `npm run check-yaml`)
- [ ] Images have alt text

---

## License

This project is licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International**.

See [LICENSE.txt](./LICENSE.txt) for full details.
