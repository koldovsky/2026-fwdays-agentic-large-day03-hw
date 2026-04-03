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

```bash
yarn test:typecheck  # TypeScript type checking
yarn test:update     # Run all tests (with snapshot updates)
yarn fix             # Auto-fix formatting and linting issues
yarn build           # Production build (app + packages as configured)
```

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration

---

## Rules

All rules are defined in:
.cursor/rules/*.mdc

Rule categories:
- architecture — state management, rendering constraints
- conventions — code style, exports, typing
- do-not-touch — protected files
- testing — validation rules
- memory — documentation updates

Rules MUST be followed in all generated code.

---

## Architecture Constraints (Critical)

- State updates ONLY via `actionManager.dispatch()`
- DO NOT introduce Redux, Zustand, MobX or other state managers
- Canvas rendering ONLY (NOT React DOM for drawing)
- Respect existing types from `packages/excalidraw/types.ts`

---

## Guardrails

- NEVER modify protected files without explicit understanding
- NEVER introduce new dependencies without approval
- NEVER break undocumented behaviors
- ALWAYS follow safe refactor boundaries

---

## Skills

Agent can use the following skills:

- build-verify — ensure project builds successfully
- codebase-explore — understand unfamiliar code
- memory-bank-update — sync documentation after changes

---

## Commands

Custom commands:

- /review-code — analyze code quality and architecture alignment
- /create-component — generate component following conventions
- /run-rule-ab-test — A/B validation for one `.mdc` rule (see `.cursor/commands/run-rule-ab-test.md`)

---

## Memory Bank

Documentation is stored in:

- docs/memory/*
- docs/technical/*

Rules:
- Memory layer = short operational summaries
- Technical layer = detailed behavior
- ALWAYS update memory after significant changes

---

## Validation

All rules must be validated using:

- A/B testing (rule ON vs OFF)
- build success (`yarn test:update`)
- type safety (`yarn test:typecheck`)

---

## Agent Goal

Ensure generated code:
- follows real Excalidraw architecture
- avoids hallucinated APIs
- respects constraints and patterns
- integrates cleanly into existing codebase
