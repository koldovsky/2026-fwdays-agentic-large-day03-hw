# AGENTS.md

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Development Workflow

1. **Package Development**: Work in `packages/*` for editor features
2. **App Development**: Work in `excalidraw-app/` for app-specific features
3. **Testing**: Always run `yarn test:update` before committing
4. **Type Safety**: Use `yarn test:typecheck` to verify TypeScript

## Development Commands


<CodeBlockWrapper v-bind="{}" :ranges='[]'>

```bash
yarn test:typecheck  # TypeScript type checking
yarn test:update     # Run all tests (with snapshot updates)
yarn fix             # Auto-fix formatting and linting issues
```

</CodeBlockWrapper>

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration

## Memory Bank Index

### Core Memory

- [docs/memory/projectbrief.md](docs/memory/projectbrief.md) - High-level summary of the product, stakeholders, business value, and system boundaries.
- [docs/memory/productContext.md](docs/memory/productContext.md) - UX goals, primary scenarios, expected outcomes, and product risks.
- [docs/memory/systemPatterns.md](docs/memory/systemPatterns.md) - Core architectural and data-flow patterns used across the system.
- [docs/memory/techContext.md](docs/memory/techContext.md) - Stack, repo layout, services, commands, environment model, and deployment notes.
- [docs/memory/activeContext.md](docs/memory/activeContext.md) - Current priorities, blockers, open questions, assumptions, and immediate risks.
- [docs/memory/progress.md](docs/memory/progress.md) - Completed work, current work, next work, and overall progress assessment.
- [docs/memory/decisionLog.md](docs/memory/decisionLog.md) - ADR-style decisions plus undocumented behavior findings captured from the codebase.

### Product Docs

- [docs/product/PRD.md](docs/product/PRD.md) - Product requirements, target users, jobs to be done, features, and main user flows.
- [docs/product/domain-glossary.md](docs/product/domain-glossary.md) - Shared terminology, naming conventions, abbreviations, and ambiguity to avoid.

### Technical Docs

- [docs/technical/architecture.md](docs/technical/architecture.md) - System breakdown, runtime topology, infrastructure, storage design, and critical sequences.
- [docs/technical/dev-setup.md](docs/technical/dev-setup.md) - Local setup, build and test workflow, Docker flow, and common troubleshooting paths.
