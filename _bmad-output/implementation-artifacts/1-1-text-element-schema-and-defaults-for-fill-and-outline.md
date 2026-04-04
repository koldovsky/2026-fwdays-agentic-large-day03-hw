# Story 1.1: Text element schema and defaults for fill and outline

Status: done

<!-- Optional: run validate-create-story before bmad-dev-story. -->

## Story

As a **developer**,
I want **persisted fields and defaults on `ExcalidrawTextElement` for text fill and optional outline (outline off by default)**,
So that **the UI and renderers can share one source of truth without parallel shadow state**.

## Acceptance Criteria

1. **Given** a new standalone text element is created **when** it is initialized **then** text outline is **off by default** and glyph fill uses explicit defaults aligned with UX-DR2 and the planned migration away from using `strokeColor` as the sole glyph-fill signal (see Dev Notes for compat bridge).
2. **Given** a text element in the scene graph **when** paint-related fields are mutated **then** invalid combinations are **normalized in one central place** (along `mutateElement` / scene mutation paths—not ad hoc in React).
3. **Given** the updated type model **when** fields are reviewed **then** names are **camelCase**, semantically clear, and the design **does not** plan for long-term ambiguous dual use of `strokeColor` as “text fill only” once follow-on stories switch render to a shared resolver (Architecture).

## Tasks / Subtasks

- [x] **AC1 — Types** (AC: #1, #3)
  - [x] Extend `ExcalidrawTextElement` in `packages/element/src/types.ts` with **text-only** optional or required fields for fill + optional outline (exact names: **lock in this story** and record in Dev Agent Record; Architecture suggests semantic names such as `textFillColor` / outline color + width—avoid names like `strokeColor2`).
  - [x] Ensure `ElementUpdate<ExcalidrawTextElement>` and any discriminated flows still typecheck across the monorepo (`yarn test:typecheck`).
- [x] **AC1 — Construction defaults** (AC: #1)
  - [x] Update `newTextElement` in `packages/element/src/newElement.ts` so **new** text elements persist defaults: outline **disabled**, fill set to match current product default for new text (today’s effective glyph fill comes from base `strokeColor` in `DEFAULT_ELEMENT_PROPS` / existing behavior—preserve visual parity for new text).
- [x] **AC2 — Normalization** (AC: #2)
  - [x] Add a small helper module in `packages/element` (e.g. `textPaint.ts` or next to `mutateElement.ts`) exporting `normalizeTextElementPaint` (or equivalent) that:
    - Coerces outline-off state (e.g. width `0` or explicit flag—**pick one model and document it**).
    - Rejects or corrects inconsistent combinations (e.g. outline “on” with zero width—define rule: either force width to minimum or turn outline off).
  - [x] Invoke normalization when mutating a text element and updates touch any paint-related key (including legacy `strokeColor` / `strokeWidth` if still used for text during the transition). Preferred hook point: end of `mutateElement` in `packages/element/src/mutateElement.ts` **or** a single pre-pass in `Scene.mutateElement`—**one path only**, not both.
- [x] **AC2 — Tests** (AC: #2)
  - [x] Add Vitest coverage next to existing `packages/element` tests: new text defaults; mutation normalization edge cases.
- [x] **Scope guard — restore / legacy** (AC: #1 implicit FR9 alignment)
  - [x] **Do not** change `packages/excalidraw/data/restore.ts` behavior for legacy files in this story unless required for TypeScript soundness. Old files may keep **undefined** new fields until Epic 3 migration stories; resolvers in Story 2.1+ will use `textFillColor ?? strokeColor` etc.
- [x] **Verification**
  - [x] `yarn test:typecheck`
  - [x] Targeted: `yarn vitest run packages/element/tests/textPaint.test.ts` (full `yarn test:update` not run—large suite).

## Dev Notes

### Architecture compliance

- **Single source of truth:** Scene JSON + `mutateElement`; no duplicate color state in React for text paint. [Source: `_bmad-output/planning-artifacts/architecture.md` — Frontend Architecture, Communication Patterns]
- **Package boundary:** All type defaults, normalization, and future `getResolvedTextPaint`-style helpers live in **`packages/element`**. Do **not** import `packages/excalidraw` from `packages/element`. [Source: architecture.md — Architectural Boundaries]
- **Naming:** camelCase JSON; semantic text field names; document chosen names for embedders (follow-up in Epic 4). [Source: architecture.md — Naming Patterns]
- **Migration timing:** Architecture marks **on load vs first edit** as a **team lock**—this story should **not** silently rewrite legacy scene files on load; defer bulk restore migration to Epic 3 unless a maintainer explicitly approves minimal in-memory-only behavior that does not alter save payload.

### UX / product

- **Outline off by default** for new text: UX-DR2. [Source: `_bmad-output/planning-artifacts/ux-design-specification.md`]
- Story 1.2 will add property UI; this story is **model + defaults + mutation rules** only.

### Code touchpoints (expected)

| Area | Path |
|------|------|
| Text element type | `packages/element/src/types.ts` |
| New element factory | `packages/element/src/newElement.ts` |
| Core mutation | `packages/element/src/mutateElement.ts` (and/or `packages/element/src/Scene.ts`) |
| Text helpers | `packages/element/src/textPaint.ts` (new) or adjacent existing text modules |
| Exports | `packages/element/package.json` / barrel files if the repo re-exports helpers |

### Current behavior (baseline)

- `ExcalidrawTextElement` extends `_ExcalidrawElementBase`, which includes **`strokeColor`**. Canvas text fill uses **`element.strokeColor`** in `drawElementOnCanvas` (`packages/element/src/renderElement.ts` ~558–561). SVG/wysiwyg follow the same mental model today—**do not remove or repurpose `strokeColor` in this story without wiring the resolver in Story 2.1+**; instead introduce explicit text fields and keep legacy field populated for compatibility until render paths consume shared resolution.

### Suggested implementation strategy (non-binding)

1. Add optional `textFillColor`, `textStrokeColor`, `textStrokeWidth` (example only—**rename if team prefers**).
2. `newTextElement`: set `textFillColor` from current default fill source; `textStrokeWidth = 0` (outline off); set `textStrokeColor` to a sensible default for when user enables outline later.
3. Keep **`strokeColor` synced** from `textFillColor` for new elements (or vice versa during transition) so **existing render code unchanged** until Epic 2 Story 2.1—**if** you choose this bridge, document it in Completion Notes to avoid duplicate edits later.

### Testing standards

- **Vitest**, colocated tests under `packages/element` (mirror existing patterns). [Source: `CLAUDE.md`, architecture.md]

### Latest stack context

- **Yarn workspaces**, TypeScript strict, Node ≥ 18 per Architecture. No new npm dependencies expected for schema/normalization alone.

### Git intelligence

- Recent upstream commits in this fork are unrelated to text paint; this feature is **greenfield inside brownfield**—expect large first PR touching types and `newElement`.

## Dev Agent Record

### Agent Model Used

Composer (Cursor agent) — implementation session 2026-04-03.

### Debug Log References

### Completion Notes List

- **Locked field names:** `textFillColor`, `textStrokeColor`, `textStrokeWidth` (optional on type for legacy JSON).
- **Outline model:** `textStrokeWidth === 0` (or undefined treated as 0 in normalization) = outline off; negative/NaN coerced to `0`.
- **Legacy bridge:** `mutateElement` prepass `mergeTextPaintNormalization` keeps `strokeColor` and `textFillColor` in sync when either is updated; new text sets both plus `textStrokeWidth: 0`. Canvas/SVG/wysiwyg still read `strokeColor` for glyph fill until Story 2.1 resolver.
- **Default outline color:** when width becomes positive without `textStrokeColor`, normalization sets `textStrokeColor` to `DEFAULT_ELEMENT_PROPS.strokeColor`.

### File List

- `packages/element/src/types.ts` — text paint fields on `ExcalidrawTextElement`
- `packages/element/src/textPaint.ts` — **new** `mergeTextPaintNormalization`
- `packages/element/src/mutateElement.ts` — hook for text elements
- `packages/element/src/newElement.ts` — `newTextElement` defaults
- `packages/element/src/index.ts` — export `textPaint`
- `packages/element/tests/textPaint.test.ts` — **new** Vitest coverage

### Review Findings

_Code review (bmad-code-review), 2026-04-03. Layers: Blind Hunter, Edge Case Hunter, Acceptance Auditor (same session)._

- [x] [Review][Patch] Prettier formatting in `packages/element/src/textPaint.ts` (early-return `if`) — fixed during review.
- [x] [Review][Defer] `mergeTextPaintNormalization` only hooks `mutateElement`; updates via `newElementWith` on text could skip normalization — audit call sites before broader text UI/render work (`deferred-work.md`).
- [x] [Review][Defer] Full `yarn test:update` not run in dev session — run before release/merge if policy requires.

## Story completion status

- **Status:** done  
- **Note:** Code review completed; minor patch applied; deferrals logged in `deferred-work.md`.
