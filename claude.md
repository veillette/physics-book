# Claude Context for Physics Book Project

## Quick Start

**For Quick Understanding:**

- **What**: Open-source, algebra-based college physics textbook with 280+ sections.
- **Tech**: Jekyll, Kramdown, MathJax v4, Vercel, GitHub Pages.
- **Live Sites**:
  - **Vercel (Primary)**: https://physics-book.vercel.app/
  - **GitHub Pages**: https://veillette.github.io/physics-book/
- **Local Dev**: `bundle exec jekyll serve --incremental` → `http://localhost:4000/physics-book/`
- **Structure**: Content in `contents/`, scripts in `scripts/`, service worker `sw.js` in root.
- **Key Files**: `SUMMARY.md` (TOC), `_config.yml` (Jekyll), `vercel.json` (Vercel), `claude.md` (this file).

**Common Tasks:**

- **Add content**: Update `contents/` + `SUMMARY.md`.
- **Fix links**: Always use `{{ site.baseurl }}/path` for Jekyll context.
- **Run full check**: Run `npm run audit` to check links, orphans, and figures.
- **Check math**: Run `npm run check-math` to validate delimiter balance.
- **Check Liquid conflicts**: Run `npm run fix-liquid-syntax` to detect LaTeX/Liquid conflicts.

---

## Project Overview

This is an **open-source physics textbook** built with Jekyll and deployed on Vercel and GitHub Pages. The project provides an accessible, interactive college-level physics education resource that's free and customizable.

- **Vercel Site (Primary)**: https://physics-book.vercel.app/
- **GitHub Pages Site**: https://veillette.github.io/physics-book/
- **Repository**: https://github.com/veillette/physics-book
- **License**: Creative Commons BY-NC-SA 4.0

## Technology Stack

### Core Technologies

- **Jekyll**: Static site generator (v3.9+).
- **Kramdown**: Markdown parser (GitHub-Flavored Markdown mode).
- **MathJax v4**: Asynchronous mathematical equation rendering.
- **Ruby**: 2.7+ required for Jekyll.

### Deployment & Hosting

- **Vercel**: Primary hosting platform, providing fast builds and previews.
- **GitHub Pages**: Secondary hosting and deployment.
- **GitHub Actions**: CI/CD workflows for deployment and quality checks.

### Development Tools

- **Node.js**: For a rich ecosystem of utility scripts.
- **Playwright**: Browser automation for PDF generation.
- **npm**: Package management for scripts and tools.

## Project Structure

```
physics-book/
├── contents/           # All textbook content (Markdown files)
├── assets/             # CSS, JavaScript, images
├── scripts/            # Build and utility scripts
├── resources/          # Static resources (e.g., high-res images)
├── _layouts/           # Jekyll page templates
├── _includes/          # Reusable Jekyll components
├── _config.yml         # Jekyll configuration
├── vercel.json         # Vercel deployment configuration
├── SUMMARY.md          # Table of contents (book structure)
├── sw.js               # Service Worker for offline support
└── index.html          # Homepage
```

## Content Organization

Content is structured modularly in the `contents/` directory.

- **File Naming**: `ch[NUMBER][DescriptiveName].md` (e.g., `ch2TimeVelocityAndSpeed.md`).
- **Chapter Structure**: Each chapter has a main file (`ch2Kinematics.md`) and separate files for each section.
- **Solutions**: Worked solutions for practice problems are placed in the same file as the problems, under a `### Solutions` heading.

## Mathematics and Equations

- **Engine**: MathJax v4, loaded asynchronously from a CDN.
- **Configuration**: `_includes/mathjax.html`.
- **Delimiters**:
  - Inline math: `$...$` or `\\(...\\)`
  - Display math: `$$...$$` or `\\[...\\]`
- **Validation**: Use `npm run check-math` to find unbalanced delimiters before committing.

### Avoiding Liquid Syntax Conflicts

**IMPORTANT**: Jekyll uses the Liquid templating engine, which can conflict with certain LaTeX patterns. Avoid writing math that uses `{{` patterns that aren't properly closed from Liquid's perspective.

**Problematic patterns to avoid:**

- `{{v}_{\text{...}}}` - Variable in double braces with subscript
- `{{f}_{...}}` - Any variable in double braces followed by subscript
- `\frac{{a}_{...}}{{b}_{...}}` - Fractions with subscripted terms in double braces

**Why this is a problem:**

Liquid interprets `{{` as the start of a variable tag (like `{{ site.baseurl }}`). When LaTeX uses `{{v}_{\text{...}}}`, Liquid sees `{{v}` and expects it to be closed with `}}`, but the first `}` actually closes the inner LaTeX brace, causing a Liquid syntax error.

**How to avoid:**

1. **Preferred**: Use single braces where possible: `{v}_{\text{...}}` instead of `{{v}_{\text{...}}}`
2. **If double braces are necessary**: The script will automatically wrap them with `{% raw %}` tags during checks

**Detection and fixing:**

```bash
npm run fix-liquid-syntax        # Check for Liquid conflicts (dry run)
npm run fix-liquid-syntax:apply  # Automatically fix issues
```

The `fix-liquid-syntax` script will detect these patterns and wrap them with `{% raw %}...{% endraw %}` tags to prevent Liquid from parsing them.

## Development Workflow

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/veillette/physics-book.git
cd physics-book

# 2. Install Ruby dependencies
gem install bundler jekyll
bundle install

# 3. Install Node.js dependencies
npm install

# 4. Start the local server
bundle exec jekyll serve --incremental

# 5. View at http://localhost:4000/physics-book/
```

### Building for Production

```bash
# Build for GitHub Pages (respects baseurl)
bundle exec jekyll build

# Build for Vercel (empty baseurl)
JEKYLL_ENV=production bundle exec jekyll build --baseurl ''
```

## CI/CD and Automation

The project is configured for dual deployment and robust quality assurance.

### Deployment Workflows

- **Vercel**: The `main` branch is automatically deployed to production via the Vercel GitHub integration. The build process is defined in `vercel.json`.
- **GitHub Actions**: A workflow in `.github/workflows/deploy.yml` builds the Jekyll site and deploys it to the `gh-pages` branch, which serves the GitHub Pages site.

### Automated Quality Checks

On every pull request, GitHub Actions run a series of checks:

1.  **Jekyll Build**: Validates that the site builds successfully.
2.  **Link Checking**: `npm run test:ci` validates all internal and external links to prevent broken ones.
3.  **Content Auditing**: `npm run audit` runs a comprehensive check for broken links, orphaned files, and figure reference issues.

**Best Practice:** Always check your changes locally before pushing:

```bash
# Verify build succeeds
bundle exec jekyll build

# Run the full audit script
npm run audit

# Validate math equations
npm run check-math

# Check for Liquid syntax conflicts in LaTeX
npm run fix-liquid-syntax
```

## Utilities and Scripts

The `scripts/` directory contains a powerful suite of Node.js utilities. See `scripts/README.md` for full documentation.

### Key Scripts

- **`npm run audit`**: The most important script for general quality control. It runs `check-links`, `check-orphans`, and `check-figures` together.
- **`check-orphans.js`**: Scans for unreferenced files in `assets/` and `resources/`. It's smart enough to parse Markdown, HTML, CSS, JS, and JSON files to find references. Use `npm run check-orphans:cleanup` to generate a script to remove orphan files.
- **PDF Generation**: `npm run generate-pdf:combined` creates a single PDF of the entire book. Requires Playwright (`npm run generate-pdf:install`). To generate a combined PDF for a specific chapter (e.g., Chapter 1) using the correct base URL: `npm run generate-pdf -- --chapter 1 --combined --base-url http://localhost:4000/physics-book`.

## Common Issues and Solutions

### Navigation Links Broken on GitHub Pages

- **Symptom**: Links work locally and on Vercel but are broken on GitHub Pages.
- **Solution**: Ensure all internal links use the `{{ site.baseurl }}` prefix. This variable is `/physics-book` for GitHub Pages and empty for Vercel, allowing links to work on both platforms.

### Service Worker Issues

- **Symptom**: Offline mode isn't working or content is stale.
- **Solution**:
  1.  The service worker file is now `sw.js` in the project root.
  2.  Check the browser DevTools (Application → Service Workers) to inspect its status and clear storage if needed.
  3.  Service workers require HTTPS or localhost to function.

## Advanced Features

### Service Worker & Offline Support

- **File**: `sw.js` (at the project root).
- **Functionality**: Caches visited pages and assets for offline access.
- **Scope**: The root-level scope allows it to control all pages under the site's domain.

### Content Validation Suite

- **Link Validation (`check-links`)**: Checks all internal and external hyperlinks.
- **Orphan Detection (`check-orphans`)**: Finds unreferenced images and assets.
- **Figure Checking (`check-figures`)**: Validates figure numbering, references, and filenames.
- **Math Validation (`check-math`)**: Ensures LaTeX delimiters are balanced.
- **Liquid Syntax Fixing (`fix-liquid-syntax`)**: Detects and fixes LaTeX patterns that conflict with Liquid templating.
- **Accessibility (`check-accessibility`)**: Checks for common accessibility issues like missing alt text.
- **YAML Validation (`check-yaml`)**: Validates the front matter of all content files.

This comprehensive suite, run via `npm run audit` and other commands, ensures high-quality, maintainable content.

## Contributing

This is an open educational resource. When contributing, please adhere to the following guidelines.

### Technical Guidelines

- **Test Thoroughly**: Before submitting a PR, run the build and audit scripts locally.
- **Follow Conventions**: Adhere to existing file naming and content structure.
- **Update `SUMMARY.md`**: If you add a new section, add it to the table of contents.
- **Use `baseurl`**: Ensure all internal links and asset paths use `{{ site.baseurl }}`.

### Code Review

- Review the Testing Checklist in `claude.md` before submitting a PR.
- Address any failures from the automated checks in your PR.
- Be prepared for feedback and collaborative iteration.

See the main `README.md` for more general contribution ideas.
