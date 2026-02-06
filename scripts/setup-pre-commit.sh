#!/bin/bash
# Pre-commit setup script for OrderUp project

set -e

echo "🔧 Setting up pre-commit hooks for OrderUp..."

# Check if pre-commit is installed
if ! command -v pre-commit &> /dev/null; then
    echo "Installing pre-commit..."
    pip install pre-commit
fi

# Install pre-commit hooks
echo "Installing pre-commit hooks..."
pre-commit install

# Install pre-commit hooks for all files (including those not tracked by git)
echo "Installing pre-commit hooks for all files..."
pre-commit install --hook-type pre-push
pre-commit install --hook-type commit-msg

# Run pre-commit on all files to ensure everything is clean
echo "Running pre-commit on all files to check initial status..."
pre-commit run --all-files || {
    echo "⚠️  Some pre-commit checks failed. Please fix the issues above and commit again."
    echo "You can run 'pre-commit run --all-files' to see all issues."
    echo "Or run 'pre-commit run <hook-id> --all-files' to fix specific issues automatically."
    exit 1
}

echo "✅ Pre-commit hooks setup completed successfully!"
echo ""
echo "Usage:"
echo "  - Pre-commit hooks will now run automatically on each commit"
echo "  - To run all hooks manually: pre-commit run --all-files"
echo "  - To run a specific hook: pre-commit run <hook-id>"
echo "  - To skip hooks (not recommended): git commit --no-verify"
echo ""
echo "Available hooks:"
echo "  - black: Python code formatting"
echo "  - flake8: Python linting"
echo "  - isort: Python import sorting"
echo "  - eslint: JavaScript/TypeScript linting"
echo "  - prettier: Code formatting"
echo "  - pytest: Python tests"
echo "  - npm-test: JavaScript tests"
echo "  - Basic file checks (trailing whitespace, YAML, JSON, etc.)"