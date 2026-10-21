# Build System & Architecture

This project is a static textbook site built with **Eleventy v4** (11ty). The site was
migrated from Jekyll/Kramdown in July 2026; see [`CHANGELOG.md`](./CHANGELOG.md) for the
full migration record.

## Technology Stack

| Layer                 | Technology                                                 |
| --------------------- | ---------------------------------------------------------- |
| Static site generator | Eleventy v4 (`@11ty/eleventy`, pinned to `4.0.0-alpha.10`) |
| Markdown renderer     | markdown-it with custom plugins in `lib/eleventy/`         |
| Templates             | Nunjucks (`.njk` in `_includes/`)                          |
| Math                  | MathJax v4 (self-hosted under `assets/js/mathjax/`)        |
| Hosting               | Vercel (primary) and GitHub Pages                          |
| Tooling               | Node.js ≥ 22.15, npm scripts in `scripts/`                 |

## Project Layout

```
physics-book/
├── contents/              # Textbook markdown (34 chapters, 241 sections)
├── _includes/             # Nunjucks layouts and partials
│   └── layouts/default.njk
├── _data/site.js          # Site metadata (title, description, repository URL)
├── eleventy.config.js     # Build configuration
├── index.njk              # Homepage → /index.html
├── sw.njk                 # Service worker source → /sw.js
├── manifest.njk           # PWA manifest → /assets/manifest/manifest.json
├── SUMMARY.md             # Table of contents → /SUMMARY.html
├── assets/                # CSS, JS, PWA assets (passthrough-copied)
├── resources/             # Figures and static media (passthrough-copied)
├── lib/eleventy/          # markdown-it plugins (math, containers, slugs, …)
├── scripts/               # Quality checks, PDF generation, search index
└── _site/                 # Build output (gitignored)
```

## Build Commands

```bash
npm install          # Install dependencies
npm run serve        # Dev server at http://localhost:4000/physics-book/
npm run build        # Production build → _site/
npm run clean        # Remove _site/
```

Every build regenerates `summary.json` and `_site/search_index.json`, including local development and Vercel. Search result paths are relative to the deployment root.

## URL & Path Prefix Behavior

Output paths follow a stable contract:

- `contents/<slug>.md` → `/contents/<slug>.html`
- `SUMMARY.md` → `/SUMMARY.html`
- `sw.njk` → `/sw.js`
- `index.njk` → `/index.html`

**GitHub Pages** serves the site under `/physics-book/`. The build adds that prefix to
single-slash root-relative `href` and `src` attributes in HTML output.

**Vercel** serves at the domain root. When the `VERCEL` environment variable is set,
`eleventy.config.js` builds with no path prefix.

Use **root-relative links** in content (e.g. `/contents/ch2Kinematics.md`). Do not
hand-write the `/physics-book` prefix or use legacy Liquid constructs like
`{{ site.baseurl }}`.

## Markdown Pipeline

Markdown bodies are rendered with **no template engine** (`markdownTemplateEngine: false`),
so Nunjucks/Liquid never touches math or brace-heavy LaTeX. Custom plugins in
`lib/eleventy/` provide Kramdown-compatible behavior:

- Math delimiter conversion (`markdown-it-kramdown-math.js` → MathJax `\(...\)` / `\[...\]`)
- Heading slug algorithm (`kramdown-slugify.js`)
- Block containers (`problem`, `solution`, `example`, `note`, `glossary`, …)
- Definition lists and footnotes

Pipeline behavior is covered by unit tests in `tests/markdown-pipeline.test.js`.

## Deployment

| Platform     | Config                         | Build                                           |
| ------------ | ------------------------------ | ----------------------------------------------- |
| Vercel       | `vercel.json`                  | `npm run build` (Vercel supplies `VERCEL=1`)    |
| GitHub Pages | `.github/workflows/deploy.yml` | Build → chapter PDFs → rebuild → Pages artifact |

CI (`.github/workflows/ci.yml`) runs linting, formatting, content and link checks,
physics verification, unit tests, and an Eleventy build on every pull request and push to `main`. The build job also greps `_site/` for leftover Kramdown/Liquid markers.

## Quality Assurance

Common commands:

```bash
npm run audit          # Links, orphans, figures, YAML, accessibility, content, …
npm run check:all      # Full validation suite
npm run test:unit      # JavaScript unit tests
npm run crawl          # Playwright crawl of all pages (requires npm run serve)
```

See [`scripts/README.md`](./scripts/README.md) for the complete script reference.

## PDF Generation

Chapter PDFs are generated with Playwright against the local dev server:

```bash
npm run serve                              # Terminal 1
node scripts/generate-pdf-parallel.js      # Terminal 2
```

The generators write to `pdf-output/`. To serve locally generated chapter PDFs,
copy them to `assets/pdf/`; both directories contain gitignored build artifacts.

GitHub Pages deployment (`.github/workflows/deploy.yml`) uses the shared
`.github/actions/generate-chapter-pdfs/` action to start a server, generate chapter
PDFs, and copy them into `assets/pdf/`. A final Eleventy build includes them in
the uploaded Pages artifact, which `actions/deploy-pages` publishes. Vercel builds
do not generate PDFs.

The quarterly/manual `.github/workflows/generate-pdfs.yml` workflow uses the same
action with `complete-book: "true"`. It also generates `complete-book.pdf` and its
page manifest, then publishes individual PDFs to the `pdfs` GitHub Release. The
Pages deployment leaves complete-book generation disabled. Both workflows allow
120 minutes for the build/generation job. See
[`assets/pdf/README.md`](./assets/pdf/README.md) for manual commands and download availability.

## Further Reading

- [`README.md`](./README.md) — project overview and getting started
- [`CONTRIBUTE.md`](./CONTRIBUTE.md) — contribution guidelines
- [`AGENTS.md`](./AGENTS.md) — detailed project context for developers
- [`doc/SEARCH.md`](./doc/SEARCH.md) — client-side search feature
