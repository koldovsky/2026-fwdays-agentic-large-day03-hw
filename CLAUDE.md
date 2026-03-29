# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/common/`** - Shared utilities, constants, and types (`@excalidraw/common`)
- **`packages/math/`** - 2D math utilities: vectors, points, angles (`@excalidraw/math`)
- **`packages/element/`** - Element types, creation helpers, manipulation (`@excalidraw/element`)
- **`packages/utils/`** - Export/import, rendering, file handling (`@excalidraw/utils`)
- **`examples/`** - Integration examples (NextJS, browser script)

## Development Commands

```bash
yarn start                  # Start the app (dev server)
yarn test:typecheck         # TypeScript type checking
yarn test:update            # Run all tests with snapshot updates (run before committing)
yarn fix                    # Auto-fix formatting and linting issues

# Run a single test file
yarn test packages/excalidraw/clipboard.test.ts --watch=false

# Build packages (required if editing packages/* before running the app)
yarn build:packages
```

## Architecture Notes

### State Management

Three layers of state:

1. **Jotai atoms** (`packages/excalidraw/editor-jotai.ts`) — reactive atom-based state via `editorJotaiStore`
2. **AppState** (`packages/excalidraw/appState.ts`) — large interface (~70+ props) for UI, tool, canvas, and collaboration state; initialized via `getDefaultAppState()`
3. **React Context** (`packages/excalidraw/context/ui-appState.ts`) — `UIAppStateContext` and `useUIAppState()` hook for component access

### Element System

Defined in `packages/element/src/types.ts`. All elements extend `_ExcalidrawElementBase` with `id`, `x`, `y`, `angle` (as `Radians`), `version`, `versionNonce`, and `index` (`FractionalIndex` for multiplayer ordering).

Creation helpers: `newElement()`, `newArrowElement()`, `newTextElement()`, etc. (in `packages/element/src/`).

Always use the `Point` type from `@excalidraw/math` instead of plain `{x, y}` objects.

### Rendering

Canvas-based with two layers (background + interactive). Uses RoughJS for hand-drawn style. Scene logic is in `packages/excalidraw/scene/`.

### Testing

- Test environment: jsdom with canvas mock, FontFace mock, polyfills (see `setupTests.ts`)
- Test helpers: `packages/excalidraw/tests/helpers/api.ts` — `API.createElement()` for typed element creation
- Path aliases for `@excalidraw/*` packages are resolved automatically in tests (see `vitest.config.mts`)
- Coverage thresholds: lines 60%, branches 70%, functions 63%

### Coding Standards

- All new code must be TypeScript; prefer `const` and `readonly` for immutability
- Functional React components with hooks; no conditional hook calls
- Naming: `PascalCase` (components/types), `camelCase` (functions/variables), `ALL_CAPS` (constants)
- Prefer performant solutions; trade RAM for CPU cycles when appropriate
- Package build order: `common` → `math` → `element` → `excalidraw`