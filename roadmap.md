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
physics-book2/
├── contents/              # Textbook markdown (280+ sections)
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
npm run serve        # Dev server at http://localhost:4000/physics-book2/
npm run build        # Production build → _site/
npm run clean        # Remove _site/
```

After building, generate the client-side search index:

```bash
npm run generate:search-index
```

## URL & Path Prefix Behavior

Output paths follow a stable contract:

- `contents/<slug>.md` → `/contents/<slug>.html`
- `SUMMARY.md` → `/SUMMARY.html`
- `sw.njk` → `/sw.js`
- `index.njk` → `/index.html`

**GitHub Pages** serves the site under `/physics-book2/`. The build adds that prefix to
single-slash root-relative `href` and `src` attributes in HTML output.

**Vercel** serves at the domain root. When the `VERCEL` environment variable is set,
`eleventy.config.js` builds with no path prefix.

Use **root-relative links** in content (e.g. `/contents/ch2Kinematics.md`). Do not
hand-write the `/physics-book2` prefix or use legacy Liquid constructs like
`{{ site.baseurl }}`.

## Markdown Pipeline

Markdown bodies are rendered with **no template engine** (`markdownTemplateEngine: false`),
so Nunjucks/Liquid never touches math or brace-heavy LaTeX. Custom plugins in
`lib/eleventy/` provide Kramdown-compatible behavior:

- Math delimiter conversion (`markdown-it-kramdown-math.js` → MathJax `\\(...\\)` / `\\[...\\]`)
- Heading slug algorithm (`kramdown-slugify.js`)
- Block containers (`problem`, `solution`, `example`, `note`, `glossary`, …)
- Definition lists and footnotes

Pipeline behavior is covered by unit tests in `tests/markdown-pipeline.test.js`.

## Deployment

| Platform     | Config                         | Build                               |
| ------------ | ------------------------------ | ----------------------------------- |
| Vercel       | `vercel.json`                  | `npm run build` (sets `VERCEL=1`)   |
| GitHub Pages | `.github/workflows/deploy.yml` | `npx @11ty/eleventy` + search index |

CI (`.github/workflows/ci.yml`) runs linting, content checks, and an Eleventy build on
every pull request. The build job also greps `_site/` for leftover Kramdown/Liquid markers.

## Quality Assurance

Common commands:

```bash
npm run audit          # Links, orphans, figures, YAML, accessibility, content, …
npm run check:all      # Full validation suite
npm run test:unit      # Markdown pipeline unit tests
npm run crawl          # Playwright crawl of all pages (requires npm run serve)
```

See [`scripts/README.md`](./scripts/README.md) for the complete script reference.

## PDF Generation

Chapter PDFs are generated with Playwright against the local dev server:

```bash
npm run serve                              # Terminal 1
node scripts/generate-pdf-parallel.js      # Terminal 2
```

PDFs are gitignored under `assets/pdf/` and generated dynamically during GitHub Pages
deploy (`.github/workflows/deploy.yml`). A quarterly workflow
(`.github/workflows/generate-pdfs.yml`) also publishes them to the `pdfs` GitHub Release
as a downloadable archive.

## Further Reading

- [`README.md`](./README.md) — project overview and getting started
- [`CONTRIBUTE.md`](./CONTRIBUTE.md) — contribution guidelines
- [`claude.md`](./claude.md) — detailed project context for developers
- [`doc/SEARCH.md`](./doc/SEARCH.md) — client-side search feature
