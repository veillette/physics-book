# 📚 General Physics Open Textbook

<div align="center">

[![Live Preview](https://img.shields.io/badge/Live%20Preview-View%20Book-blue?style=for-the-badge&logo=github)](https://veillette.github.io/physics-book/)
[![Table of Contents](https://img.shields.io/badge/TOC-Table%20of%20Contents-orange?style=for-the-badge&logo=bookmark)](./SUMMARY.md)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=for-the-badge)](LICENSE.txt)

</div>

## ✨ Welcome to the Open Physics Textbook Project!

This open-source textbook aims to make physics education accessible to everyone. Whether you're a student, educator, or just curious about physics, this resource is for you!

**Comprehensive Coverage**: An introductory, algebra-based college physics textbook covering mechanics, thermodynamics, waves, electricity, magnetism, optics, and modern physics across 280+ sections.

## 🔍 Preview

Get a feel for the textbook:

- 🌐 [Browse the Book Online](https://veillette.github.io/physics-book/)
- 📋 [View Table of Contents](./SUMMARY.md)

## ⚡ Features

- **Rich Mathematical Notation**: Powered by MathJax v4 for beautifully rendered equations
- **Interactive & Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Offline Support**: Service worker enables offline access after initial visit
- **Fully Customizable**: Fork and modify to suit your teaching needs
- **Quality Assurance**: Automated link checking and content validation
- **PDF Export**: Generate PDF versions of individual chapters or the complete book
- **Free & Open**: Licensed under CC BY-NC-SA 4.0 for educational use

## 📖 About the Project

This modern, interactive textbook is built with:

- **Kramdown**: A powerful superset of Markdown for rich text formatting
- **JavaScript & CSS**: For interactive elements and beautiful rendering
- **GitHub Pages & Jekyll**: For seamless publishing and distribution

The entire book is stored directly in GitHub and automatically regenerated whenever changes are made - making contributions easy!

## 🚀 Get Involved

Want to contribute or run a local copy? It's easy!

### Prerequisites

- **Ruby** 2.7 or higher ([Installation Guide](https://www.ruby-lang.org/en/documentation/installation/))
- **Node.js** 16+ (for optional scripts like link checking and PDF generation)
- **Git** for version control

### Local Development

```console
# 1. Clone the repository (Alternatively you can fork it)
git clone https://github.com/veillette/physics-book.git
cd physics-book

# 2. Install Ruby dependencies
gem install bundler jekyll
bundle install

# 3. Install Node.js dependencies (optional, for utilities)
npm install

# 4. Start the local server
bundle exec jekyll serve --incremental

# 5. View your local copy at http://localhost:4000/physics-book/
```

### Useful Development Commands

```console
# Check for broken links
npm run check-links

# Find orphaned files not referenced in SUMMARY.md
npm run check-orphans

# Generate PDF of a specific chapter
npm run generate-pdf:chapter

# Generate combined PDF of entire book
npm run generate-pdf:combined

# Validate mathematical notation
npm run check-math
```

## 👥 Contributing

We welcome contributions from the physics education community! Here's how you can help:

### Ways to Contribute

- **Fix Errors**: Found a typo or mistake? Submit a pull request!
- **Add Examples**: Help students understand with real-world examples
- **Improve Explanations**: Make complex topics more accessible
- **Add Solutions**: Contribute worked solutions to practice problems
- **Enhance Visuals**: Create or improve diagrams and illustrations
- **Report Issues**: Found a bug or broken link? [Open an issue](https://github.com/veillette/physics-book/issues)

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-improvement`)
3. Make your changes following the existing style and formatting
4. Test locally with `bundle exec jekyll serve`
5. Ensure all links work and equations render properly
6. Submit a pull request with a clear description

For detailed guidance, see [`claude.md`](./claude.md) for project structure and conventions.

## 📝 License

This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE.txt).

**You are free to:**

- Share and adapt the material for non-commercial educational purposes
- Customize the content for your courses

**Under the following terms:**

- Attribution required
- Non-commercial use only
- Share derivatives under the same license

See the [full license text](LICENSE.txt) for details.
