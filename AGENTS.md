# AGENTS.md — Excalidraw Coding Agent Instructions

> Instructions for AI coding agents (Copilot, Codex, Cursor, Devin, etc.) and new developers
> working in this repository. **Read this file first at the start of every session.**
>
> For the current sprint context, open `docs/memory/activeContext.md`.
> For architectural patterns, open `docs/memory/systemPatterns.md`.

---

## 1. Project Overview

Excalidraw is a **free, open-source, client-side whiteboard** application for sketching
hand-drawn-style diagrams. The core library is published as `@excalidraw/excalidraw` and
embeddable in any React application. The production deployment at `excalidraw.com` is a
**static single-page application** — there is no application server in this repository;
all runtime logic runs in the browser. Real-time collaboration relies on an externally
operated Socket.IO relay and Firebase (Firestore + Storage) for encrypted cloud persistence.

---

## 2. Tech Stack

| Concern              | Technology                    | Version        |
|:---------------------|:------------------------------|:---------------|
| Language             | TypeScript (strict mode)      | 5.9.3          |
| UI framework         | React                         | 19.0.0         |
| Build tool           | Vite                          | 5.0.12         |
| Testing              | Vitest                        | 3.0.6          |
| State management     | Jotai atoms                   | 2.11.0         |
| Canvas rendering     | HTML5 Canvas 2D API           | —              |
| Sketch aesthetic     | Rough.js                      | 4.6.4          |
| Freehand strokes     | perfect-freehand              | 1.2.0          |
| Linting              | ESLint (0 warnings allowed)   | —              |
| Formatting           | Prettier                      | 2.6.2          |
| Package manager      | **yarn v1 (classic)**         | 1.22.22        |
| Monorepo             | Yarn workspaces               | —              |
| Deployment           | Vercel (static SPA)           | —              |

> **Use `yarn` exclusively.** Do not use `npm` or `pnpm` — they corrupt the lockfile.

---

## 3. Project Structure

This is a **yarn-workspaces monorepo**. Packages must only import *downward* in this chain:

```text
@excalidraw/common → @excalidraw/math → @excalidraw/element → @excalidraw/excalidraw → excalidraw-app
```

```
/
├── packages/
│   ├── common/        # @excalidraw/common   — shared constants, types, utilities
│   ├── math/          # @excalidraw/math     — geometry & canvas math primitives
│   ├── element/       # @excalidraw/element  — element types, mutation helpers
│   └── excalidraw/    # @excalidraw/excalidraw — core React library (published to npm)
├── excalidraw-app/    # Production web app (excalidraw.com)
├── examples/          # Integration examples (with-script-in-browser, etc.)
├── docs/
│   └── memory/        # Memory bank: activeContext, systemPatterns, decisionLog, …
├── firebase-project/  # Firebase security rules
├── scripts/           # Release & build helper scripts
├── package.json       # Root workspace manifest (yarn workspaces)
└── vitest.config.mts  # Vitest configuration
```

Key constraint: **`excalidraw-app` is not imported by any package.** Nothing may import
upward. New `import type` upward references from `element → excalidraw` are tracked tech
debt — do not add more.

---

## 4. Key Commands

**Requirements:** Node.js ≥ 18, yarn v1 classic.

```bash
# Setup
yarn install                  # install all workspace dependencies

# Development
yarn start                    # start Vite dev server for excalidraw-app (port 3000)
yarn build:packages           # build all @excalidraw/* packages (required before yarn start)

# Individual package builds (in dependency order)
yarn build:common
yarn build:math
yarn build:element
yarn build:excalidraw
yarn build:app                # production build of excalidraw-app

# Testing
yarn test                     # run Vitest unit tests (watch mode)
yarn test:typecheck           # TypeScript type-check (noEmit — Vite handles compilation)
yarn test:code                # ESLint (0 warnings allowed)
yarn test:other               # Prettier format check
yarn test:all                 # typecheck + code + other + app tests (CI gate)

# Fixing
yarn fix                      # auto-fix lint and formatting issues

# Cleaning
yarn rm:build                 # delete all dist/ and build/ output directories
yarn clean-install            # remove node_modules and reinstall from scratch
```

> After **any non-documentation change**: run `yarn test && yarn test:typecheck` before
> committing.

---

## 5. Architecture

### State management

- **Cross-component state:** Jotai atoms — eliminates global re-renders and supports multiple
  `<Excalidraw />` instances on the same page via `jotai-scope`.
- **Local UI state:** `React.useState` / `React.useReducer`.
- **Action system:** `actionManager.executeAction()` — the only sanctioned path for state
  mutations that must be recorded in history or synced to collaborators.
- **Forbidden:** Redux, MobX, React Context for reactive data.

### Rendering

- **Two-canvas model:** `StaticCanvas` renders the scene; `InteractiveCanvas` renders
  selection handles, cursor overlays, and in-progress drawing.
- **Pipeline:** Scene → `renderStaticScene()` / `renderInteractiveScene()` → Canvas 2D context.
- Changes must go through `requestAnimationFrame`; no direct DOM mutation.
- Forbidden: react-konva, fabric.js, pixi.js.

### Collaboration & encryption

- All data leaving the client is **AES-GCM 128-bit encrypted** via `crypto.subtle`.
- The room encryption key lives **only in the URL fragment** (`#key=…`) — it is never sent
  to the server, stored in localStorage, or logged.
- Always generate a fresh IV per encryption call (`createIV()` uses `crypto.getRandomValues`).

### Element mutations

- Use `mutateElement()` (increments `version`/`versionNonce`) or `newElementWith()`.
- **Never** assign element properties directly — this bypasses history and collab sync.

---

## 6. Conventions

### TypeScript

- Strict mode — no `any`, no `@ts-ignore`.
- Prefer `type` over `interface` for simple shapes.
- `import type { X } from "..."` for type-only imports.
- Use optional chaining (`?.`) and nullish coalescing (`??`).
- Always use the `Point` type from `packages/math/src/types.ts` instead of `{ x, y }`.

### React components

- Functional components + hooks **only** — no class components.
- Props type: `{ComponentName}Props`.
- **Named exports only** — no default exports.
- CSS modules for styling.
- No conditional hooks.

### File naming

- kebab-case for non-component files: `element-utils.ts`
- PascalCase for component files: `LayerUI.tsx`
- Colocated tests: `ComponentName.test.tsx`

### Naming

- PascalCase: component names, type aliases
- camelCase: variables, functions, methods
- ALL_CAPS: constants

### PR workflow

1. Run `yarn fix` (auto-fix lint + formatting).
2. Run `yarn test && yarn test:typecheck` — both must pass.
3. Open a PR with a clear description of the change and its rationale.
4. Request review from at least one maintainer.
5. Address any review feedback and ensure all tests still pass.
6. After approval, merge the PR and verify the changes in a test environment.

---

## 7. Do-Not-Touch / Constraints

### Protected files — never modify without explicit approval + full `yarn test:all` pass

| File                                      | Reason                              |
|:------------------------------------------|:------------------------------------|
| `packages/excalidraw/scene/Renderer.ts`   | Core render pipeline                |
| `packages/excalidraw/data/restore.ts`     | File format backward compatibility  |
| `packages/excalidraw/actions/manager.tsx` | Action system                       |
| `packages/excalidraw/types.ts`            | Core type definitions               |

### Hard constraints

- **No new npm packages** without explicit approval — check `packages/utils/` first.
- **No server-side runtime** — Node.js ≥ 18 is build toolchain only.
- **No upward package imports** — e.g., `element` must not import from `excalidraw`.
- **No plaintext writes to Firebase** — always encrypt with `encryptData()` before any
  `setDoc`, `updateDoc`, or `uploadBytes` call.
- **No Redux / MobX / Context for reactive data.**
- **No direct DOM mutation** for canvas content.
- **No `dangerouslySetInnerHTML`** with user-supplied content.
- **No `Math.random()`** for room IDs — use `generateRoomId()` (`crypto.getRandomValues`).
- **`allow list: if false`** in `firebase-project/firestore.rules` is intentional — do not
  change to `true`.
- Firebase rules (`firebase-project/`) are intentionally permissive because confidentiality
  is enforced by client-side AES-GCM encryption, not server ACLs.

---

## Memory Bank

Read these at the start of each session to avoid re-discovering context:

| File                              | Purpose                                         |
|:----------------------------------|:------------------------------------------------|
| `docs/memory/activeContext.md`    | Current sprint, ongoing work, known issues      |
| `docs/memory/systemPatterns.md`   | Architecture patterns — read before core work   |
| `docs/memory/decisionLog.md`      | Implicit constraints and high-risk clusters     |
| `docs/memory/techContext.md`      | Full tech stack, env vars, integrations         |
| `docs/memory/productContext.md`   | Product goals, user flows, pain points          |
| `docs/memory/projectbrief.md`     | Project scope and boundaries                    |
| `docs/memory/progress.md`         | Completed work log                              |

> Update `docs/memory/activeContext.md` at sprint boundaries.
> Append to `docs/memory/progress.md` after completing significant work.

---

*Last updated: 2026-04-01. Update this file when build commands, conventions, or protected
files change.*
