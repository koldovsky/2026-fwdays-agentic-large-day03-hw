# Story 1.2: Text-only property controls for Fill and Stroke (outline)

Status: done

## Story

As a **diagram author**,
I want **separate Fill and Stroke controls when exactly standalone text is selected**,
So that **I can set glyph fill and optional outline without shape-oriented confusion**.

## Acceptance Criteria

1. **Given** exactly one **standalone text** element is selected **when** the style / properties area is visible **then** there is a **Fill** (or **Text color**) control bound to **glyph fill** and a **Stroke** control that affects **text outline only** (UX-DR1), and fill can change independently of outline (FR1).
2. **Given** text outline is **disabled** (`textStrokeWidth === 0`) **when** the panel is shown **then** outline color and thickness controls are **hidden** or clearly **inactive/disabled** until the user enables outline (UX-DR2).
3. **Given** selection is **not** exactly one standalone text (e.g. multiple elements, text + shape, bound/container text, or only non-text) **when** properties render **then** the **new** text-only fill/outline block is **not shown** (or controls are disabled in a way that matches UX-DR3 — no mixed-selection UX for this feature).
4. **Given** outline is **enabled** **when** the user sets stroke color and thickness **then** updates persist on the element as **`textStrokeColor`** and **`textStrokeWidth`** (FR2) and combine correctly with fill for contrast use cases (FR3).

## Tasks / Subtasks

- [x] **AC1 — Selection gate** (AC: #1, #3)
  - [x] Implement a single helper (e.g. in `Actions.tsx` or `actionProperties.tsx`) such as `shouldShowStandaloneTextPaintControls(targetElements, elementsMap)` that is **true** iff: `targetElements.length === 1`, `isTextElement(el)`, and **`el.containerId == null`** (standalone text per PRD; bound labels stay on existing shape stroke/fill UX until product says otherwise).
  - [x] Use the same predicate for **compact** and **full** property layouts (`SelectedShapeActions`, `CompactShapeActions`, and any shared render path).
- [x] **AC1 — Panel UI** (AC: #1, #2, #4)
  - [x] When the gate is **true**, **replace** (or strongly override) the generic **Stroke** color row that currently maps to **`strokeColor`** (glyph fill today) with:
    - **Fill** / **Text color** `ColorPicker` writing **`textFillColor`** (and legacy **`strokeColor`** must stay synced — use `mergeTextPaintNormalization` from `@excalidraw/element` together with `newElementWith`, see Dev Notes).
    - **Outline** UX: toggle or equivalent to switch between `textStrokeWidth === 0` and a positive width (pick a sensible default width on enable, e.g. match common shape stroke or `1`).
    - When outline **on**: show **Stroke** (outline) color → `textStrokeColor`, and width/stepper → `textStrokeWidth` (reuse existing stroke-width UI patterns only if they fit; text is **not** in `hasStrokeWidth` today — see `packages/element/src/comparisons.ts`).
  - [x] When the gate is **false**, keep **existing** stroke/background behavior unchanged for shapes and mixed selections.
- [x] **AC2 — Mutation contract** (AC: #4, Story 1.1)
  - [x] Every paint update for standalone text must apply **`mergeTextPaintNormalization(textEl, partialUpdate)`** before `newElementWith` (or switch to `scene.mutateElement` for those updates) so `strokeColor` / `textFillColor` / outline fields stay consistent with Story 1.1.
- [x] **AC3 — Actions / state** (AC: #1–#4)
  - [x] Extend or add registered actions in `packages/excalidraw/actions/actionProperties.tsx` (and wire from `Actions.tsx`) following existing `register` / `PanelComponent` / `perform` patterns.
  - [x] Do **not** introduce parallel React-only state for colors; persisted fields on the element are the source of truth (Architecture).
- [x] **AC4 — i18n baseline** (AC: #1; full a11y in Story 1.4)
  - [x] Add **English** keys in `packages/excalidraw/locales/en.json` for new labels (**Fill** / **Text color**, **Outline** / enable toggle, **Stroke** for outline). Other locales: follow repo policy (often fallback to English until translators update).
- [x] **Tests** (recommended)
  - [x] Component or integration test: with one standalone text selected, Fill and Outline controls visible; with text+rectangle, text-only block hidden; outline off hides width/color. Place tests next to existing `Actions` / properties tests if present.

### Review Findings

- [x] [Review][Patch] `actionChangeStandaloneTextFill.perform` used a falsy check on `textFillColor`, so an empty string would not update the element; guard now uses `value?.textFillColor === undefined` only. [`packages/excalidraw/actions/actionProperties.tsx`]
- [x] [Review][Patch] Outline `RadioSelection` could show an inconsistent state when `textStrokeWidth` was not one of thin/bold/extraBold (e.g. legacy/imported files); the controlled `value` now falls back to `STROKE_WIDTH.thin` unless it matches a listed option. [`packages/excalidraw/actions/actionProperties.tsx`]
- [x] [Review][Defer] Outline toggle uses `CheckboxItem` without associating visible label text as the accessible name of the `role="checkbox"` control — defer fuller a11y to Story 1.4. [`packages/excalidraw/actions/actionProperties.tsx`] — deferred per epic plan

## Dev Notes

### Previous story (1.1) intelligence

- Fields: **`textFillColor?`**, **`textStrokeColor?`**, **`textStrokeWidth?`** on `ExcalidrawTextElement`; new text defaults: `textStrokeWidth: 0`, fill synced with `strokeColor`.
- **`mergeTextPaintNormalization`** in `packages/element/src/textPaint.ts` — **must** be used when applying paint patches so legacy `strokeColor` stays aligned.
- Code review deferral: **`newElementWith` without normalization** — this story should **explicitly** wrap text paint updates with `mergeTextPaintNormalization` (closes gap from `deferred-work.md` for UI paths).

### Architecture

- Property UI lives in **`packages/excalidraw`** (`components/Actions.tsx`, `actions/actionProperties.tsx`); element model in **`packages/element`** [Source: `_bmad-output/planning-artifacts/architecture.md` — Implementation Patterns, Requirements to Structure Mapping].
- **No** `packages/element` imports from `packages/excalidraw`.

### UX spec

- **Stroke** label = outline only for this flow; separate fill control (UX-DR1–DR3). [Source: `_bmad-output/planning-artifacts/ux-design-specification.md`]

### Code anchors

- Current stroke picker for elements: `actionChangeStrokeColor` in `packages/excalidraw/actions/actionProperties.tsx` (~317+); toolbar: `SelectedShapeActions` / `CompactShapeActions` in `packages/excalidraw/components/Actions.tsx`.
- `hasStrokeColor` includes **`text`**; **`hasStrokeWidth` does not include `text`** — outline width UI will need a **text-specific** control or a guarded extension.
- `getFormValue` / `changeProperty` patterns in `actionProperties.tsx` for multi-selection consistency; text-only branch may use simpler single-element reads when gate is true.

### Verification

- [x] `yarn test:typecheck`
- [x] `yarn test:update` or targeted tests for touched packages
- [ ] Manual: standalone text — fill vs outline; mixed selection — old behavior; bound text — no new block.

## Dev Agent Record

### Agent Model Used

Cursor agent (Claude) — continuation session

### Debug Log References

- `ExcalidrawTextElement` paint fields are `Readonly<>`; outline `perform` builds a mutable patch object before `mergeTextPaintNormalization` to satisfy TypeScript.

### Completion Notes List

- Wired `changeStandaloneTextFill` / `changeStandaloneTextOutline` in `Actions.tsx` for full, compact, and mobile shape actions; generic stroke row hidden when the standalone-text gate is true.
- `actionChangeStrokeColor` uses normalization for standalone text in `perform` and returns `null` from `PanelComponent` when the gate is true.
- Ran `yarn test:typecheck`, `yarn test:update` (snapshot refresh for text paint fields), and added properties tests for outline visibility and mixed selection.

### File List

- `packages/excalidraw/actions/actionProperties.tsx`
- `packages/excalidraw/actions/types.ts`
- `packages/excalidraw/actions/index.ts`
- `packages/excalidraw/components/Actions.tsx`
- `packages/excalidraw/locales/en.json`
- `packages/excalidraw/actions/actionProperties.test.tsx`
- Vitest snapshot files under `packages/excalidraw/tests/` and `packages/element/src/__tests__/` (updated via `yarn test:update`)

## Story completion status

- **Status:** done  
- **Note:** Code review completed 2026-04-03; two patch items fixed in-repo. Manual verification checklist in Verification section may still be run by a human if desired.
