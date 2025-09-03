#!/bin/bash

echo "🚀 Setting up Primavera3D development environment..."

# Check Node version
required_node_version="20.11.0"
current_node_version=$(node -v | cut -d'v' -f2)

if [ "$current_node_version" != "$required_node_version" ]; then
  echo "⚠️  Node version mismatch. Required: v$required_node_version, Current: v$current_node_version"
  echo "   Please use nvm to switch to the correct version:"
  echo "   nvm use"
else
  echo "✅ Node version is correct"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Check environment variables
echo "🔍 Checking environment variables..."
node scripts/check-env.js

# Setup husky
echo "🔨 Setting up git hooks..."
npx husky install

# Build packages
echo "🏗️  Building packages..."
npm run build

echo ""
echo "✨ Setup complete! You can now run:"
echo "   npm run dev    - Start development server"
echo "   npm run test   - Run tests"
echo "   npm run lint   - Run linter"
echo ""