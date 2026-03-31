# CLAUDE.md

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Documentation & Context (entrypoints for new sessions)

This repo contains **two documentation zones**:

- **`docs/`** — **canonical** for how we work in this fork/worktree: SSD process, product/spec, technical architecture, and the Memory Bank.
  - Start here: `docs/README.md`
  - SSD process: `docs/spec/SSD.md`
  - Memory Bank: `docs/memory/*` (especially `activeContext.md`, `progress.md`, `decisionLog.md`)
- **`dev-docs/`** — upstream-style Docusaurus docs, **canonical** for `@excalidraw/excalidraw` integration and API reference.

Rule of thumb: avoid duplicating full API tables in `docs/`; keep `docs/` as SSD + “cheatsheets with links” and point to `dev-docs/` for details.

## Development Workflow

1. **Package Development**: Work in `packages/*` for editor features
2. **App Development**: Work in `excalidraw-app/` for app-specific features
3. **Testing**: Always run `yarn test:update` before committing
4. **Type Safety**: Use `yarn test:typecheck` to verify TypeScript

## Development Commands

```bash
yarn test:typecheck  # TypeScript type checking
yarn test:update     # Run all tests (with snapshot updates)
yarn fix             # Auto-fix formatting and linting issues
```

## Constraints / Protected files

Do not modify these files without explicit approval and extra verification:

- `packages/excalidraw/scene/Renderer.ts`
- `packages/excalidraw/data/restore.ts`
- `packages/excalidraw/actions/manager.tsx`
- `packages/excalidraw/types.ts`

## Cursor rules & custom skills (repo-local)

- Rules live in `.cursor/rules/` (notably `excalidraw-protected-files.mdc`, `project-communication-language.mdc`, `security-svg-import-and-collab.mdc`).
- Custom skills live in `.cursor/skills/`:
  - `build-verify`
  - `codebase-explore`
  - `memory-bank-update`
  - `repomix-generated-docs`

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration
