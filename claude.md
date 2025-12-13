# Claude Context for Physics Book Project

## Project Overview

This is an **open-source physics textbook** built with Jekyll and GitHub Pages. The project provides an accessible, interactive college-level physics education resource that's free and customizable.

**Live Site:** https://veillette.github.io/physics-book/

## Technology Stack

- **Jekyll**: Static site generator
- **Kramdown**: Markdown parser (GitHub-Flavored Markdown mode)
- **MathJax v4**: For rendering mathematical equations
- **GitHub Pages**: Hosting and deployment
- **Ruby**: Required for local development

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

## Mathematics and Equations

### MathJax Configuration
- **Version**: MathJax 4.0 (loaded asynchronously)
- **Location**: `_includes/mathjax.html`
- **Inline math**: `$...$` or `\\(...\\)`
- **Display math**: `$$...$$` or `\\[...\\]`

### Important Notes
- MathJax loads asynchronously to prevent blocking page render
- Equations are rendered after content loads
- Test equation rendering when adding/modifying math content

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
  title: "Page Title"
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

### Site Settings (_config.yml)
- **baseurl**: `/physics-book` (important for GitHub Pages)
- **url**: `https://veillette.github.io`
- **markdown**: kramdown
- **math_engine**: null (using MathJax CDN instead)

### Recent Fixes
- Navigation bar loads correctly with site.url + baseurl
- MathJax v4 configured with async loading
- Equations render properly with `startup.ready()` promise

## Git Workflow

### Branch Strategy
- Main branch: Default branch for production
- Feature branches: Use `claude/[description]-[session-id]` pattern
- Always push to your designated branch

### Commit Guidelines
- Clear, descriptive commit messages
- Focus on "why" not just "what"
- Reference issues/PRs when applicable

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

### Available Scripts
- `check_math.py`: Validates mathematical notation
- Various parsing scripts in `parsingScripts/`
- Build scripts in `scripts/`

### Package Management
- Ruby gems via `Gemfile`
- Node packages via `package.json` (if used)

## Common Issues and Solutions

### MathJax Not Rendering
- Ensure MathJax include is in layout
- Check for async loading completion
- Verify equation syntax ($$...$$ for display)

### Navigation Links Broken
- Always use `{{ site.baseurl }}` prefix
- Check `_config.yml` baseurl setting
- Test on GitHub Pages, not just locally

### Build Failures
- Check Kramdown syntax
- Validate front matter YAML
- Review Jekyll error messages

## Resources

- **Jekyll Docs**: https://jekyllrb.com/docs/
- **Kramdown Syntax**: https://kramdown.gettalong.org/syntax.html
- **MathJax Docs**: https://docs.mathjax.org/
- **GitHub Pages**: https://docs.github.com/en/pages

## Contributing

This is an open educational resource. When contributing:
- Maintain consistent formatting and style
- Ensure scientific accuracy
- Add examples and explanations where helpful
- Test thoroughly before committing
- Keep accessibility in mind

## License

See LICENSE.txt for full details.
