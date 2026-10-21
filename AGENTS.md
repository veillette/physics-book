# Agent Context for the Physics Book Project

This file guides AI assistants (Claude, Codex, Cursor, etc.) working in this repo.

## Quick Start

**For Quick Understanding:**

- **What**: Open-source, algebra-based college physics textbook with 34 chapters and 241 sections.
- **Tech**: Eleventy v4 (Node), markdown-it, MathJax v4, Vercel, GitHub Pages.
- **Live Sites**:
  - **Vercel (Primary)**: https://physics-book.vercel.app/
  - **GitHub Pages**: https://veillette.github.io/physics-book/
- **Local Dev**: `npm run serve` → `http://localhost:4000/physics-book/` (Node ≥ 22.15).
- **Structure**: Content in `contents/`, scripts in `scripts/`, service worker `sw.njk` in root.
- **Key Files**: `SUMMARY.md` (TOC), `eleventy.config.js` (build), `vercel.json` (Vercel), `AGENTS.md` (this file).

**Common Tasks:**

- **Add content**: Update `contents/` + `SUMMARY.md`.
- **Fix links**: Use root-relative `/path` (the build adds the `/physics-book` prefix).
- **Run full check**: Run `npm run audit` for content checks, or `npm run check:all` to add physics checks and unit tests.
- **Check math**: Run `npm run check:math` to validate delimiter balance.
- **Generate PDFs**: Run `npm run generate:pdf` or use GitHub Actions workflow for automated generation.

---

## Project Overview

This is an **open-source physics textbook** built with Eleventy (11ty) and deployed on Vercel and GitHub Pages. The project provides an accessible, interactive college-level physics education resource that's free and customizable. See [`roadmap.md`](./roadmap.md) for build architecture and [`CHANGELOG.md`](./CHANGELOG.md) for migration history.

- **Vercel Site (Primary)**: https://physics-book.vercel.app/
- **GitHub Pages Site**: https://veillette.github.io/physics-book/
- **Repository**: https://github.com/veillette/physics-book
- **License**: Creative Commons BY-NC-SA 4.0

## Technology Stack

### Core Technologies

- **Eleventy (11ty) v4**: Node-based static site generator (alpha; pinned to `4.0.0-alpha.10`).
- **markdown-it**: Markdown renderer, with custom math/typography/slug/container plugins in `lib/eleventy/`.
- **MathJax v4**: Client-side math rendering (self-hosted under `assets/js/mathjax/`).

### Deployment & Hosting

- **Vercel**: Primary hosting platform, providing fast builds and previews.
- **GitHub Pages**: Secondary hosting and deployment.
- **GitHub Actions**: CI/CD workflows for deployment and quality checks.

### Development Tools

- **Node.js** ≥ 22.15: Runs the build and all tooling.
- **Playwright**: Browser automation for PDF generation.
- **npm**: Package management for scripts and tools.

## Project Structure

```
physics-book/
├── contents/           # All textbook content (Markdown files)
├── assets/             # CSS, JavaScript, images (incl. self-hosted MathJax)
├── scripts/            # Build and utility scripts
├── lib/eleventy/       # markdown-it plugins (math, typography, slug, containers)
├── resources/          # Static resources (e.g., high-res images)
├── _includes/          # Nunjucks layouts/includes (head.njk, foot.njk, layouts/)
├── _data/              # Eleventy data (site.js)
├── eleventy.config.js  # Eleventy build configuration
├── vercel.json         # Vercel deployment configuration
├── SUMMARY.md          # Table of contents (book structure)
├── sw.njk              # Service worker source (built to /sw.js)
└── index.njk           # Homepage
```

## Content Organization

Content is structured modularly in the `contents/` directory.

- **File Naming**: `ch[NUMBER][DescriptiveName].md` (e.g., `ch2TimeVelocityAndSpeed.md`).
- **Chapter Structure**: Each chapter has a main file (`ch2Kinematics.md`) and separate files for each section.
- **Solutions**: Keep each problem and its `::: solution` container in the same exercise block. Use Strategy, Solution, and Discussion labels plus a final Answer; see `CONTRIBUTE.md` for a complete example. Run `npm run check:solutions` to report incomplete solutions.

## Mathematics and Equations

- **Engine**: MathJax v4, self-hosted under `assets/js/mathjax/` and rendered client-side.
- **Configuration**: `assets/js/math-config.js` (delimiters, macros, `processEscapes`).
- **Delimiters** (configured in `math-config.js`, emitted by the markdown pipeline):
  - Inline math: `$...$` or `\(...\)`
  - Display math: `$$...$$` or `\[...\]`
- The build passes math through verbatim (no markdown escaping inside `$$…$$`), so backslashes and LaTeX arrays survive.
- **Validation**: Use `npm run check:math` to find unbalanced delimiters before committing.

### Math and Templating

Markdown bodies are rendered with **no template engine** (`markdownTemplateEngine: false` in `eleventy.config.js`), so Liquid/Nunjucks never touches math or `{{…}}` patterns. You can freely write `{{v}_{\text{...}}}` and other brace-heavy LaTeX; it is passed through verbatim to MathJax.

## Development Workflow

### Local Development

#### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/veillette/physics-book.git
cd physics-book

# 2. Install Node.js dependencies
npm install

# 3. Start the local dev server
npm run serve

# 4. View at http://localhost:4000/physics-book/
```

### Building for Production

```bash
# GitHub Pages build (served under /physics-book/)
npm run build

# Vercel build (served at the domain root; Vercel sets VERCEL=1 automatically,
# which eleventy.config.js reads to drop the path prefix)
VERCEL=1 npm run build
```

## CI/CD and Automation

The project is configured for dual deployment and robust quality assurance.

### Deployment Workflows

- **Vercel**: The `main` branch is automatically deployed to production via the Vercel GitHub integration. The build process is defined in `vercel.json` (`npm run build`).
- **GitHub Actions**: `.github/workflows/deploy.yml` builds the site and chapter PDFs, uploads a Pages artifact, and publishes it with `actions/deploy-pages`. No deployment branch is used.

### Automated Quality Checks

On every pull request, GitHub Actions run a series of checks:

1. **Lint and formatting**: ESLint and Prettier checks.
2. **Content checks**: Math delimiters, orphaned assets, figures, YAML, accessibility, cross-references, and equations.
3. **Physics checks**: Python unit tests, an arithmetic scan, and strict source-bound physics cases with coverage enforcement.
4. **Link checking**: `npm run test:ci` checks internal and external links.
5. **Build and unit tests**: JavaScript unit tests, an Eleventy build, and checks for leftover Kramdown/Liquid markers.

CI runs selected checks individually; it does not invoke the full `npm run audit` command.

**Best Practice:** Always check your changes locally before pushing:

```bash
# Verify build succeeds
npm run build

# Run the full audit script
npm run audit

# Validate math equations
npm run check:math
```

## Utilities and Scripts

The `scripts/` directory contains a powerful suite of Node.js utilities. See `scripts/README.md` for full documentation.

### Key Scripts

- **`npm run audit`**: Runs links, orphans, figures, YAML, accessibility, math delimiters, content, structure, cross-reference, and equation checks. `npm run check:all` also runs the physics checker and JavaScript/Python unit tests.
- **`check-orphans.js`**: Scans for unreferenced files in `assets/` and `resources/`. It's smart enough to parse Markdown, HTML, CSS, JS, and JSON files to find references. Use `npm run check:orphans:cleanup` to generate a script to remove orphan files.
- **PDF Generation**: `npm run generate:pdf:book` creates a single PDF of the entire book. `npm run generate:pdf:combined` creates one combined PDF per chapter. Requires Playwright (`npm run generate:pdf:install`). To generate a combined PDF for a specific chapter (e.g., Chapter 1) using the correct base URL: `npm run generate:pdf -- --chapter 1 --combined --base-url http://localhost:4000/physics-book`.

## Common Issues and Solutions

### Navigation Links Broken on GitHub Pages

- **Symptom**: Links work locally and on Vercel but are broken on GitHub Pages.
- **Solution**: Use **root-relative** links/asset paths (e.g. `/contents/ch2Kinematics.md`, `/resources/x.png`). `eleventy.config.js` adds the `/physics-book` prefix to single-slash root-relative `href`/`src` at build time for GitHub Pages, and drops it for Vercel (detected via the `VERCEL` env var). Don't hand-write the prefix.

### Service Worker Issues

- **Symptom**: Offline mode isn't working or content is stale.
- **Solution**:
  1.  The service worker source is `sw.njk`; it is served at `/physics-book/sw.js` on GitHub Pages and `/sw.js` on Vercel.
  2.  Check the browser DevTools (Application → Service Workers) to inspect its status and clear storage if needed.
  3.  Service workers require HTTPS or localhost to function.

## Advanced Features

### Service Worker & Offline Support

- **File**: `sw.njk` at the repo root (built to `/sw.js`).
- **Functionality**: Caches visited pages and assets for offline access.
- **Scope**: `register-sw.njk` registers the worker for `/physics-book/` on GitHub Pages and `/` on Vercel.

### Content Validation Suite

- **Link Validation (`check-links`)**: Checks all internal and external hyperlinks.
- **Orphan Detection (`check-orphans`)**: Finds unreferenced images and assets.
- **Figure Checking (`check-figures`)**: Validates figure numbering, references, and filenames.
- **Math Validation (`check-math`)**: Ensures LaTeX delimiters are balanced.
- **Accessibility (`check-accessibility`)**: Checks for common accessibility issues like missing alt text.
- **YAML Validation (`check-yaml`)**: Validates the front matter of all content files.

This comprehensive suite, run via `npm run audit` and other commands, ensures high-quality, maintainable content.

## PDF Automation

GitHub Pages deploys generate section, chapter-intro, and combined chapter PDFs
through `.github/actions/generate-chapter-pdfs/`. The quarterly/manual
`.github/workflows/generate-pdfs.yml` workflow also generates the complete book
and publishes individual PDF assets to the `pdfs` GitHub Release. Vercel builds
do not generate PDFs. See `assets/pdf/README.md` for generation and hosting details.

Historical changes are recorded in [`CHANGELOG.md`](./CHANGELOG.md).

## Documentation Notes

- Keep `AGENTS.md` as the single source of agent/developer context (this file); `CONTRIBUTE.md` covers contributor workflow and `README.md` the general overview. Don't add a separate `CLAUDE.md`.

## Contributing

This is an open educational resource. When contributing, please adhere to the following guidelines.

### Technical Guidelines

- **Test Thoroughly**: Before submitting a PR, run the build and audit scripts locally.
- **Follow Conventions**: Adhere to existing file naming and content structure.
- **Update `SUMMARY.md`**: If you add a new section, add it to the table of contents.
- **Use root-relative paths**: Ensure all internal links and asset paths are root-relative (e.g. `/contents/...`); the build adds the `/physics-book` prefix automatically.

### Code Review

- Review the checks listed in `AGENTS.md` before submitting a PR.
- Address any failures from the automated checks in your PR.
- Be prepared for feedback and collaborative iteration.

See the main `README.md` for more general contribution ideas.
