# Liquid Syntax Error Fixer

This script detects and fixes Liquid syntax errors in markdown files that occur when LaTeX math expressions contain patterns that look like Liquid template variables.

## The Problem

Jekyll uses the Liquid templating engine to process markdown files. When LaTeX math expressions contain double curly braces (e.g., `{{v}_{\text{...}}}`), Liquid interprets them as variable tags. If these are not properly closed (in Liquid's perspective), it causes syntax errors like:

```
Liquid Exception: Liquid syntax error (line 623): Variable '{{v}' was not properly terminated with regexp: /\}\}/
```

## The Solution

The script wraps problematic math expressions with `{% raw %}` and `{% endraw %}` tags, which tells Liquid to ignore the content between them. For example:

**Before:**
```markdown
$$\frac{{v}_{\text{rms,235}}}{{v}_{\text{rms,238}}}=\sqrt{\frac{m_{238}}{m_{235}}}$$
```

**After:**
```markdown
{% raw %}$$\frac{{v}_{\text{rms,235}}}{{v}_{\text{rms,238}}}=\sqrt{\frac{m_{238}}{m_{235}}}$${% endraw %}
```

## Usage

### Check for issues without fixing

```bash
node scripts/fix_liquid_syntax_errors.js --check-only
```

This will scan all markdown files in the `contents/` directory and report any issues found.

### Check specific files

```bash
node scripts/fix_liquid_syntax_errors.js --check-only contents/ch13KineticTheory.md
```

### Fix issues (dry run)

```bash
node scripts/fix_liquid_syntax_errors.js --dry-run
```

This shows what would be changed without actually modifying files.

### Fix issues

```bash
node scripts/fix_liquid_syntax_errors.js
```

This will automatically fix all detected issues in all markdown files in `contents/`.

### Fix specific files

```bash
node scripts/fix_liquid_syntax_errors.js contents/ch13KineticTheory.md
```

### Getting Help

```bash
node scripts/fix_liquid_syntax_errors.js --help
```

## How It Works

1. **Detection**: The script scans for `{{` patterns in math expressions (both `$...$` and `$$...$$`) that are not followed by a proper `}}` closing tag.

2. **Smart Filtering**: It skips lines already wrapped in `{% raw %}` tags to avoid double-wrapping.

3. **Preservation**: The script preserves all LaTeX formatting and only adds the minimal Liquid tags needed.

## Integration with CI/CD

You can add this script to your CI/CD pipeline to catch these errors early:

```bash
node scripts/fix_liquid_syntax_errors.js --check-only
if [ $? -ne 0 ]; then
    echo "Liquid syntax errors found. Run fix_liquid_syntax_errors.js to fix them."
    exit 1
fi
```

## Exit Codes

- `0`: Success (no issues found when using `--check-only`, or files were fixed successfully)
- `1`: Issues found (when using `--check-only`)

## Common Patterns That Trigger Errors

The script detects these common LaTeX patterns that conflict with Liquid:

- `{{v}_{\text{...}}}` - subscripted variable in double braces
- `{{f}_{...}}` - any variable in double braces with subscript
- `\frac{{a}_{...}}{{b}_{...}}` - fractions with subscripted numerator/denominator

## Requirements

- Node.js 14 or higher
- No external dependencies (uses only built-in modules)

## Notes

- The script is safe to run multiple times - it won't double-wrap already-fixed content
- It only modifies lines that contain actual Liquid syntax conflicts
- Original file formatting and spacing are preserved
