# 📚 General Physics Open Textbook

<div align="center">

[![Live Preview (Vercel)](https://img.shields.io/badge/Live%20Preview-Vercel-blue?style=for-the-badge&logo=vercel)](https://physics-book.vercel.app/)
[![Live Preview (GitHub Pages)](https://img.shields.io/badge/Live%20Preview-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://veillette.github.io/physics-book/)
[![Table of Contents](https://img.shields.io/badge/TOC-Table%20of%20Contents-orange?style=for-the-badge&logo=bookmark)](./SUMMARY.md)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=for-the-badge)](LICENSE.txt)

</div>

## ✨ Welcome to the Open Physics Textbook Project!

This open-source textbook aims to make physics education accessible to everyone. Whether you're a student, educator, or just curious about physics, this resource is for you!

**Comprehensive Coverage**: An introductory, algebra-based college physics textbook covering mechanics, thermodynamics, waves, electricity, magnetism, optics, and modern physics across 280+ sections.

## ⚡ Features

- **Rich Mathematical Notation**: Powered by MathJax v4 for beautifully rendered equations.
- **Interactive & Responsive**: Works seamlessly on desktop, tablet, and mobile devices.
- **Offline Support**: A root-level service worker (`sw.js`) enables offline access after the first visit.
- **Dual Deployment**: Automatically deployed to both Vercel and GitHub Pages.
- **Fully Customizable**: Fork and modify to suit your teaching needs.
- **PDF Export**: Generate PDF versions of individual chapters or the complete book.
- **Free & Open**: Licensed under CC BY-NC-SA 4.0 for educational use.

## 📖 About the Project

This modern, interactive textbook is built with:

- **Jekyll**: A powerful static site generator.
- **Kramdown**: A superset of Markdown for rich text formatting.
- **MathJax v4**: For advanced mathematical and scientific notation.
- **Vercel & GitHub Pages**: For seamless publishing and distribution.

The entire book is stored directly in GitHub and automatically regenerated whenever changes are made, making contributions easy!

## 🚀 Local Development

Want to contribute or run a local copy? It's easy!

### Prerequisites

- **Ruby** 2.7 or higher ([Installation Guide](https://www.ruby-lang.org/en/documentation/installation/))
- **Node.js** 16+ (for utility scripts)
- **Git** for version control

### Setup & Execution

```console
# 1. Clone or fork the repository
git clone https://github.com/veillette/physics-book.git
cd physics-book

# 2. Install Ruby dependencies
gem install bundler jekyll
bundle install

# 3. Install Node.js dependencies
npm install

# 4. Start the local Jekyll server
bundle exec jekyll serve --incremental

# 5. View your local copy at http://localhost:4000/physics-book/
```

### Useful Development Commands

The project includes a suite of Node.js scripts for quality assurance and content management. See the [scripts README](./scripts/README.md) for full details.

```console
# Run a full audit (links, orphans, figures)
npm run audit

# Check for broken links (internal & external)
npm run check-links

# Find unreferenced files in assets/ and resources/
npm run check-orphans

# Validate mathematical notation (LaTeX delimiters)
npm run check-math

# Check for accessibility issues (alt text, heading levels)
npm run check-accessibility

# Generate a combined PDF of the entire book
npm run generate-pdf:combined
```

## 部署

This project is automatically deployed to two platforms:

- **Vercel**: The primary, production-ready version of the book. Deploys from the `main` branch.
- **GitHub Pages**: A secondary version for redundancy and testing. Deploys from the `main` branch.

Configuration files for each platform (`vercel.json` and `_config.yml`) manage the specific build settings required.

## 👥 Contributing

We welcome contributions from the physics education community! Your help makes this resource better for everyone.

### How to Contribute

1.  **Fork the repository** to your own GitHub account.
2.  **Create a feature branch** for your changes (`git checkout -b feature/your-improvement`).
3.  **Make your changes**, following the existing style and formatting.
4.  **Test your changes locally** by running `bundle exec jekyll serve --incremental` and using the quality assurance scripts (e.g., `npm run audit`).
5.  **Commit your changes** with a clear and descriptive message.
6.  **Push your branch** to your fork (`git push origin feature/your-improvement`).
7.  **Submit a pull request** to the main repository.

### Contribution Ideas

- **Fix Errors**: Correct typos, formatting issues, or scientific inaccuracies.
- **Add Examples**: Provide real-world examples to clarify concepts.
- **Improve Explanations**: Make complex topics more accessible.
- **Add Solutions**: Contribute worked solutions to end-of-chapter problems.
- **Enhance Visuals**: Create or improve diagrams, illustrations, and figures.
- **Report Issues**: Found a bug or broken link? [Open an issue](https://github.com/veillette/physics-book/issues).

For detailed project conventions, see [`claude.md`](./claude.md).

## 📝 License

This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE.txt).

**You are free to:**

- Share and adapt the material for non-commercial educational purposes.
- Customize the content for your courses.

**Under the following terms:**

- Attribution is required.
- Non-commercial use only.
- Share derivatives under the same license.

See the [full license text](LICENSE.txt) for details.
