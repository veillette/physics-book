# Git Hooks

This directory contains Git hooks for the physics-book project.

## Pre-commit Hook

The pre-commit hook automatically runs before each commit to ensure code quality and consistent formatting.

### What it does

The hook runs `npx lint-staged` using the configuration in `package.json`:

1. **ESLint**: Checks and auto-fixes staged JavaScript files, with zero warnings allowed.
2. **Prettier**: Formats staged JavaScript, JSON, Markdown, and YAML files, respecting `.prettierignore`.
3. **Auto-stage**: Includes formatter changes in the commit. Changes to partially staged files that were not staged are hidden during the tasks and restored afterward.

If ESLint finds errors that cannot be auto-fixed, the commit will be blocked until you fix them manually.

## Installation

The hooks are automatically installed when you run `npm install` (via the `prepare` script).

To manually install or reinstall the hooks:

```bash
npm run install:hooks
```

Or directly:

```bash
sh hooks/install.sh
```

## Benefits

- Ensures all committed code follows the project's linting and formatting standards
- Prevents formatting-related PR comments and CI failures
- Keeps the codebase consistent across all contributors
- Saves time by auto-fixing issues before commit

## Skipping the Hook

In rare cases where you need to skip the pre-commit hook, you can use:

```bash
git commit --no-verify
```

**Note**: Only use this when absolutely necessary, as it bypasses code quality checks.
