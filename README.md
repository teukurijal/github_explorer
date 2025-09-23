# GitHub Explorer

Search GitHub users and explore their repositories with modern UI/UX.

## Features

- 🔍 Search GitHub users (up to 5 results)
- 📊 View user repositories with details
- ⌨️ Keyboard navigation (arrows, Enter, Escape, **Ctrl+K** to clear)
- ❌ Clear button with loading states
- 📱 Responsive design
- 🔄 Network status monitoring

## Tech Stack

- **React 19** + TypeScript
- **Vite** + Tailwind CSS
- **TanStack Query** for caching
- **Clean Architecture** pattern
- **Vitest** + Testing Library
- **Path aliases** for clean imports

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd github_explorer
npm install

# Setup environment
echo 'BASE_URL="https://api.github.com"' > .env

# Run development server
npm run dev
```

Open `http://localhost:5173`

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Code linting

## Usage

1. Type a GitHub username in the search box
2. Select a user from results (click or arrow keys + Enter)
3. Browse their repositories

### Keyboard Shortcuts
- **↑ ↓** Navigate search results
- **Enter** Select user
- **Escape** Close results
- **Ctrl+K** Clear search

## Project Structure

Clean Architecture implementation:

```
src/
├── domain/          # Business entities (User, Repository)
├── application/     # Use cases (SearchUsers, GetRepos)
├── infrastructure/  # External deps (GitHub API, Network)
├── ui/             # Components and hooks
├── services/       # API layer
└── test/           # Test setup
```

## Key Features

- **Debounced search** (300ms) with TanStack Query caching
- **Keyboard navigation** with arrow keys and shortcuts
- **Loading states** with clear/X button management
- **Error boundaries** and network status monitoring
- **Responsive design** with Tailwind CSS
- **Clean Architecture** with path aliases
- **Comprehensive tests** with Vitest

## What This Demonstrates

Modern React development practices:
- Clean Architecture pattern
- TypeScript + React 19
- TanStack Query for state management
- Path aliases for clean imports
- Comprehensive testing strategy
- Performance optimization
- Accessibility features
