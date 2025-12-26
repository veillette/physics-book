# Git Hooks

This directory contains Git hooks for the physics-book project.

## Pre-commit Hook

The pre-commit hook automatically runs before each commit to ensure code quality and consistent formatting.

### What it does

1. **ESLint**: Runs `npm run lint:fix` on staged JavaScript files to check and auto-fix linting issues
2. **Prettier**: Runs `npm run format` to format all code files according to the project's style guide
3. **Auto-stage**: Automatically stages any files that were modified by the formatters

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
