# AGENTS.md

## Project Overview

Excalidraw provides a fast, low-friction digital whiteboard for visual thinking.  
The product is optimized for quickly turning ideas into diagrams that feel informal, editable, and easy to share.

See `docs/memory/productContext.md`.

## Tech Stack

- Node.js: `>=18.0.0` (from root `package.json` engines)
- React `19.0.0` / React DOM `19.0.0` (app)
- TypeScript `5.9.3`

See `docs/memory/techContext.md`.

## Quick Start

Use these commands from the repository root:

```bash
corepack yarn install
corepack yarn start
corepack yarn test:typecheck
corepack yarn test:update
corepack yarn fix
```

For setup details, see the `Build and run` section in `docs/memory/projectBrief.md`.

## Repository Layout

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Scope and Boundaries

- Implement editor/package behavior in `packages/*`.
- Implement app-only behavior (hosting, integrations, app shell flows) in `excalidraw-app/*`.
- Prefer minimal, targeted changes in the affected package or app area instead of broad refactors.
- If change scope is unclear, check architecture and system patterns before editing.

## Coding Rules

Follow `docs/memory/systemPatterns.md`.

## Development Workflow

1. **Package Development**: Work in `packages/*` for editor features
2. **App Development**: Work in `excalidraw-app/` for app-specific features
3. **Testing**: Always run `corepack yarn test:update` before committing
4. **Type Safety**: Use `corepack yarn test:typecheck` to verify TypeScript

For more command and tooling details, see `docs/memory/techContext.md`.

## Validation Checklist

Before considering work done:

- Run `corepack yarn test:typecheck`.
- Run `corepack yarn test:update` for behavior changes and snapshot-sensitive updates.
- Run `corepack yarn fix` when formatting/lint cleanup is needed.
- Confirm changes are scoped to the intended package/app area.

## Documentation Priority Order

When gathering context, read in this order:

1. `AGENTS.md`
2. `docs/memory/projectBrief.md`
3. `docs/memory/techContext.md`
4. `docs/memory/systemPatterns.md`
5. `docs/technical/architecture.md`

## Common Pitfalls

- Mixing package and app changes in one broad edit when only one layer is required.
- Skipping `corepack yarn test:update` for snapshot-affecting changes.
- Running commands from a subdirectory instead of repository root.
- Making architectural changes without checking `docs/technical/architecture.md`.

## Architecture Notes

See `docs/technical/architecture.md`.