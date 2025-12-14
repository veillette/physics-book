# Contributing to the Physics Book Project

Thank you for your interest in contributing to this open-source physics textbook! This guide will help you get started with contributing content, fixes, and improvements to the project.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Contribution Workflow](#contribution-workflow)
- [Content Guidelines](#content-guidelines)
- [Technical Guidelines](#technical-guidelines)
- [Style Guide](#style-guide)
- [Testing Your Changes](#testing-your-changes)
- [Submitting Your Contribution](#submitting-your-contribution)

## Ways to Contribute

There are many ways to contribute to this project:

### Content Contributions
- **Fix Errors**: Typos, grammatical errors, or incorrect physics concepts
- **Improve Explanations**: Make complex topics more accessible and clear
- **Add Examples**: Provide real-world examples and applications
- **Contribute Solutions**: Write worked solutions for end-of-chapter problems
- **Add Practice Problems**: Create new conceptual questions or numerical exercises

### Visual Contributions
- **Create Diagrams**: Develop clear, educational illustrations
- **Improve Figures**: Enhance existing diagrams for better clarity
- **Add Animations**: Contribute interactive visualizations (where applicable)

### Technical Contributions
- **Improve Accessibility**: Enhance screen reader support and navigation
- **Fix Bugs**: Resolve technical issues with the site or scripts
- **Add Features**: Develop new tools or capabilities
- **Improve Documentation**: Update or clarify project documentation

### Quality Assurance
- **Report Issues**: Identify bugs, broken links, or rendering problems
- **Review Pull Requests**: Help review and test contributions from others
- **Test Compatibility**: Verify content works across different browsers and devices

## Getting Started

### Prerequisites

To contribute to this project, you'll need:
- **Git**: For version control
- **Ruby** 2.7 or higher: For running Jekyll locally
- **Node.js** 16+: For running validation scripts (optional but recommended)
- **Text Editor**: Any editor that supports Markdown (VS Code, Atom, Sublime, etc.)

### Setup Instructions

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/physics-book.git
   cd physics-book
   ```
3. **Install dependencies**:
   ```bash
   # Ruby dependencies
   gem install bundler jekyll
   bundle install

   # Node.js dependencies (optional)
   npm install
   ```
4. **Start the local server**:
   ```bash
   bundle exec jekyll serve --incremental
   ```
5. **View the site** at `http://localhost:4000/physics-book/`

## Contribution Workflow

1. **Create a feature branch** from main:
   ```bash
   git checkout -b feature/your-improvement-name
   ```

2. **Make your changes** following the guidelines below

3. **Test locally** to ensure everything works:
   ```bash
   bundle exec jekyll build
   npm run check-links
   npm run check-math
   ```

4. **Commit your changes** with a clear message:
   ```bash
   git add .
   git commit -m "Brief description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push -u origin feature/your-improvement-name
   ```

6. **Create a Pull Request** on GitHub

## Content Guidelines

### Writing Style

- **Clear and Accessible**: Write for students encountering concepts for the first time
- **Accurate**: Ensure all physics content is scientifically correct
- **Consistent**: Match the tone and style of existing content
- **Concise**: Be thorough but avoid unnecessary verbosity
- **Active Voice**: Prefer active voice over passive voice when possible

### Formatting Content

#### Front Matter
All content files must include YAML front matter:
```yaml
---
title: "Your Section Title"
layout: page
---
```

#### Headings
- Use `##` for main section headings
- Use `###` for subsections
- Use `####` for sub-subsections
- Keep heading hierarchy logical and consistent

#### Equations
- Use MathJax notation for all mathematical content
- Inline math: `$E = mc^2$`
- Display math: `$$E = mc^2$$`
- Always escape backslashes: `\\frac` not `\frac`
- Test equation rendering locally before committing

#### Lists
- Use numbered lists for sequential steps
- Use bullet points for unordered items
- Maintain consistent indentation

#### Images and Figures
- Store images in the `resources/` directory
- Use descriptive filenames (e.g., `pendulum-motion-diagram.png`)
- Reference images with: `![Description]({{ site.baseurl }}/resources/image.png)`
- Always provide meaningful alt text for accessibility

#### Links
- **Internal links**: Always use `{{ site.baseurl }}/path/to/page`
- **External links**: Use standard Markdown syntax `[Google](https://www.google.com/)`
- Test all links before submitting

### Contributing Solutions to Problems

Many chapter sections include "Problems & Exercises" and "Conceptual Questions" at the end. When contributing solutions:

1. **Add solutions in the same file** as the problems
2. **Use a `### Solutions` heading** to separate solutions from problems
3. **Number solutions** to match problem numbers
4. **Show all work**:
   - State what is given
   - Identify relevant equations or principles
   - Show step-by-step calculations
   - State the final answer clearly
5. **Explain your reasoning**: Include brief explanations of your approach
6. **Use proper notation**: Apply MathJax for all equations

**Example**:
```markdown
### Solutions

**1.**
Given: $m = 5 \text{ kg}$, $a = 3 \text{ m/s}^2$

Find: Force $F$

Using Newton's second law: $F = ma$

$$F = (5 \text{ kg})(3 \text{ m/s}^2) = 15 \text{ N}$$

**Answer**: The force is 15 N.
```

## Technical Guidelines

### File Naming
- Follow the pattern: `ch[NUMBER][DescriptiveName].md`
- Use PascalCase for multi-word names
- Example: `ch2TimeVelocityAndSpeed.md`

### Markdown Format
- Use Kramdown syntax (GitHub-Flavored Markdown mode)
- Avoid HTML when Markdown is sufficient
- Use HTML entities for special characters when needed (e.g., `&amp;` for `&`)

### Table of Contents
When adding new content files:
1. Create the content file in `contents/`
2. Update `SUMMARY.md` to include the new file in the table of contents
3. Maintain proper indentation and numbering

### Baseurl Usage
**Critical**: Always use `{{ site.baseurl }}` for internal links
- Correct: `{{ site.baseurl }}/contents/ch2Kinematics.md`
- Incorrect: `/contents/ch2Kinematics.md`

## Style Guide

### Physics Notation
- **Vectors**: Use arrow notation `$\\vec{F}$` → $\vec{F}$
- **Units**: Use `\\text{}` for units: `$5 \\text{ m/s}$` → $5 \text{ m/s}$
- **Variables**: Italicize variables in text using `$v$` for velocity, etc.
- **Subscripts/Superscripts**: Use `$v_0$` for initial velocity, `$x^2$` for squared

### Terminology
- Use standard physics terminology from reputable sources
- Be consistent with terminology throughout the book
- Define new terms when first introduced

### Accessibility
- Provide alt text for all images
- Use semantic HTML when necessary
- Ensure sufficient color contrast
- Make content keyboard-navigable

## Testing Your Changes

Before submitting your contribution, run these checks:

### Build Test
```bash
bundle exec jekyll build
```
Ensure the build completes without errors.

### Link Validation
```bash
npm run check-links
```
Verify all links are valid and not broken.

### Math Validation
```bash
npm run check-math
```
Check that all mathematical notation is properly formatted.

### Visual Test
1. Run `bundle exec jekyll serve --incremental`
2. View your changes at `http://localhost:4000/physics-book/`
3. Check:
   - Equations render correctly
   - Images display properly
   - Links work
   - Formatting is consistent
   - Mobile responsiveness

### Browser Compatibility
Test in at least:
- Chrome/Edge
- Firefox
- Safari (if available)

## Submitting Your Contribution

### Pull Request Guidelines

When creating a pull request:

1. **Use a clear title**: Briefly describe what your PR does
   - Good: "Fix typo in kinematics chapter"
   - Good: "Add solutions to Chapter 10 problems"
   - Bad: "Updates"

2. **Provide a detailed description**:
   - What changes you made
   - Why you made them
   - Any relevant context or issues addressed

3. **Reference related issues**: Use "Fixes #123" if applicable

4. **Ensure CI passes**: All automated checks must pass

5. **Be responsive**: Address feedback and requested changes promptly

### Pull Request Template

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] Bug fix
- [ ] New content/feature
- [ ] Documentation update
- [ ] Style/formatting improvement

## Changes Made
- List specific changes
- Be detailed but concise

## Testing
- [ ] Local build succeeds
- [ ] Links checked and valid
- [ ] Math notation renders correctly
- [ ] Tested on mobile/tablet

## Screenshots (if applicable)
Add screenshots showing your changes

## Additional Notes
Any other relevant information
```

## Code of Conduct

This project is an educational resource. We expect all contributors to:
- Be respectful and professional
- Provide constructive feedback
- Focus on what is best for the learning community
- Be open to different perspectives and approaches

## Questions?

If you have questions about contributing:
1. Check the [claude.md](./claude.md) file for technical details
2. Review the [README.md](./README.md) for project overview
3. Look through existing pull requests for examples
4. Open an issue on GitHub to ask for clarification

## License

By contributing to this project, you agree that your contributions will be licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE.txt).

---

Thank you for helping make physics education more accessible! Your contributions make a real difference for students and educators around the world.
