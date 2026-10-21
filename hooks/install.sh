#!/bin/sh
# Script to install Git hooks

# Skip gracefully if not in a git repository (Docker builds, tarball installs, CI)
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ℹ️  Not a git repository — skipping Git hook installation."
  exit 0
fi

echo "Installing Git hooks via core.hooksPath..."

# Set git hooks path to version-controlled hooks directory (works in worktrees and checkouts)
git config core.hooksPath hooks
chmod +x hooks/pre-commit 2>/dev/null || true

echo "✅ Git hooks configured successfully (core.hooksPath = hooks)!"
echo ""
echo "The pre-commit hook will run lint-staged on every commit."
