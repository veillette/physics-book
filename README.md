# Open Textbook Project

<div align="center">

[![Table of Contents](https://img.shields.io/badge/TOC-Table%20of%20Contents-orange?style=for-the-badge&logo=bookmark)](./SUMMARY.md)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=for-the-badge)](LICENSE.txt)

**A modern, open-source textbook built with Jekyll and GitHub Pages**

</div>

---

## Overview

This project provides a complete, customizable open textbook with rich content features and quality assurance tooling. Built with Jekyll and Kramdown, it offers a powerful platform for educational content that's accessible, maintainable, and easy to deploy.

### Key Features

- **Rich Mathematical Notation**: Powered by MathJax v4 for beautifully rendered equations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Offline Support**: Progressive Web App (PWA) with service worker for offline access
- **PDF Generation**: Generate print-ready PDFs of individual chapters or the complete book
- **Quality Assurance**: Automated tools for link checking, accessibility, and content validation
- **Fully Customizable**: Fork and adapt for your own educational content
- **Free & Open**: Licensed under CC BY-NC-SA 4.0 for educational use

### Content Features

- Organized chapter/section structure with table of contents
- Support for inline and display math equations
- Image figures with automatic validation
- Practice problems and solutions
- Cross-references and internal linking
- Search-friendly content structure

---

## Quick Start

### Prerequisites

- **Ruby** 2.7+ ([Installation Guide](https://www.ruby-lang.org/en/documentation/installation/))
- **Node.js** 16+ (for utility scripts)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd <repository-name>

# Install Ruby dependencies
gem install bundler jekyll
bundle install

# Install Node.js dependencies (for utilities)
npm install
```

### Local Development

```bash
# Start the Jekyll development server
bundle exec jekyll serve --incremental

# View at http://localhost:4000/
```

### Configuration

Before deploying, update `_config.yml` with your settings:

```yaml
# Site information
title: "Your Textbook Title"
tagline: "Your Tagline"
author: "Your Name"

# GitHub Pages deployment settings
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"
repository: yourusername/your-repo-name
```

---

## Project Structure

```
├── contents/           # Textbook content (Markdown files)
│   ├── ch1*.md        # Chapter 1 sections
│   ├── ch2*.md        # Chapter 2 sections
│   └── ...
├── assets/            # Static assets
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript files
│   └── manifest/     # PWA manifest and icons
├── resources/         # Images and figures
├── scripts/           # Utility scripts
├── _layouts/          # Jekyll page templates
├── _includes/         # Reusable components
├── _config.yml        # Jekyll configuration
├── SUMMARY.md         # Table of contents
└── index.html         # Homepage
```

---

## Content Management

### Adding Content

1. Create a new markdown file in `contents/` following the naming convention:
   ```
   ch[NUMBER][SectionName].md
   ```

2. Add required front matter:
   ```yaml
   ---
   title: 'Your Section Title'
   layout: page
   ---
   ```

3. Update `SUMMARY.md` to include in the table of contents

### Writing Equations

Use MathJax notation for mathematical content:

```markdown
Inline math: $E = mc^2$

Display math:
$$F = ma$$
```

### Adding Images

Store images in `resources/` and reference with:

```markdown
![Description]({{ site.baseurl }}/resources/your-image.png)
```

---

## Quality Assurance

The project includes comprehensive validation tools. See [scripts/README.md](./scripts/README.md) for full documentation.

### Essential Commands

```bash
# Check for broken links
npm run check-links

# Validate mathematical notation
npm run check-math

# Check accessibility
npm run check-accessibility

# Validate YAML front matter
npm run check-yaml

# Find orphaned files
npm run check-orphans

# Run full audit
npm run audit
```

### PDF Generation

```bash
# Install Playwright browsers (first time only)
npm run generate-pdf:install

# Start Jekyll server in another terminal
bundle exec jekyll serve

# Generate all chapter PDFs
npm run generate-pdf

# Generate combined book PDF
npm run generate-pdf:combined
```

---

## Deployment

### GitHub Pages

1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the branch and folder to deploy from
4. The site will be available at `https://yourusername.github.io/your-repo-name/`

### Manual Build

```bash
# Build the site
bundle exec jekyll build

# Output will be in _site/ directory
```

---

## Contributing

We welcome contributions! Here's how to help:

### Ways to Contribute

- **Fix Errors**: Typos, grammatical errors, or incorrect content
- **Improve Explanations**: Make complex topics more accessible
- **Add Examples**: Provide real-world applications
- **Contribute Solutions**: Write worked solutions for problems
- **Improve Accessibility**: Enhance screen reader support

### Contribution Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-improvement`
3. Make your changes
4. Test locally: `bundle exec jekyll serve`
5. Run validation: `npm run audit`
6. Submit a pull request

For detailed guidelines, see:
- [CONTRIBUTE.md](./CONTRIBUTE.md) - Contribution guidelines
- [claude.md](./claude.md) - Technical reference for AI assistants and developers

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Jekyll | Static site generation |
| Kramdown | Markdown parsing (GFM mode) |
| MathJax v4 | Mathematical equation rendering |
| GitHub Pages | Hosting and deployment |
| Node.js | Utility scripts |
| Playwright | PDF generation |

---

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE.txt).

**You are free to:**
- Share and adapt the material for non-commercial educational purposes
- Customize the content for your courses

**Under the following terms:**
- Attribution required
- Non-commercial use only
- Share derivatives under the same license

---

## Acknowledgments

This project uses open source software and follows open education principles. Thank you to all contributors who help make education more accessible.

---

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: See `claude.md` for technical details
- **Scripts**: See `scripts/README.md` for utility documentation
