#!/bin/sh
# Script to install Git hooks

# This runs from npm's `prepare` lifecycle on every `npm install`/`npm ci`, including
# environments with no git hooks directory (Docker builds that COPY without .git, git
# worktrees, tarball installs). Skip gracefully there instead of failing the whole install.
if [ ! -d .git/hooks ]; then
  echo "ℹ️  No .git/hooks directory found — skipping Git hook installation."
  exit 0
fi

echo "Installing Git hooks..."

# Copy pre-commit hook
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "The pre-commit hook will now run ESLint and Prettier on every commit."
