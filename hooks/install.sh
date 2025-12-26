#!/bin/sh
# Script to install Git hooks

echo "Installing Git hooks..."

# Copy pre-commit hook
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "The pre-commit hook will now run ESLint and Prettier on every commit."
