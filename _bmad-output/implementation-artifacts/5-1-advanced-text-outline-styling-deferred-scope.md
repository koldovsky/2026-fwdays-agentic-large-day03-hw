# Story 5.1: Advanced text outline styling (deferred scope)

Status: ready-for-dev

<!-- Ultimate context engine analysis completed — comprehensive developer guide created. Validation: optional via validate-create-story before dev-story. -->

## Story

As a **diagram author**,
I want **dashes, joins, or miter controls for text outline**,
so that **I can match specialized design tools**.

## Acceptance Criteria

1. **Given** MVP standalone text outline (color + width) is already shipped **when** this story is implemented **then** at least one **product-approved** advanced dimension is exposed (e.g. dashed outline **or** join style **or** miter limit — not necessarily all in one PR unless scoped).
2. **Given** new optional fields are added to `ExcalidrawTextElement` **when** legacy files load **then** appearance matches pre-change behavior (no eager migration; same rules as Epic 3 — use `getResolvedTextPaint` / restore normalization patterns).
3. **Given** a styled text element **when** it is drawn on canvas, exported to SVG, and shown in inline edit (where the browser allows) **then** behavior follows the **same parity rules as Epic 2** (shared resolver / semantics in `packages/element`, no app-only color or stroke math).
4. **Given** property UI for standalone text **when** advanced outline is enabled **then** controls meet the **accessibility baseline** (labels, keyboard reachability, no orphan `aria` — mirror Story 1.4 patterns).
5. **Given** serialization **when** the document is saved and reopened **then** new fields round-trip; **and** `packages/element/text-paint-serialization.md` + `packages/excalidraw/CHANGELOG.md` are updated for embedders (extends Epic 4).

## Tasks / Subtasks

- [ ] **Product gate (AC: #1)**  
  - [ ] Confirm with PM/design which subset ships first: dash pattern, `lineJoin` / `lineCap`, and/or `miterLimit` (Epics: “per product decision”).
- [ ] **Schema & normalization (AC: #2, #5)**  
  - [ ] Add optional field(s) on `ExcalidrawTextElement` in `packages/element/src/types.ts` (e.g. `textStrokeStyle`, `textStrokeLineJoin`, `textStrokeMiterLimit` — **exact names** should align with existing `StrokeStyle` / roundness conventions where sensible, not duplicate shape `strokeStyle` semantics blindly).  
  - [ ] Extend `mergeTextPaintNormalization` / `mutateElement` paths in `packages/element/src/textPaint.ts` & `mutateElement.ts` so invalid combos are clamped or ignored consistently.  
  - [ ] Extend `normalizeRestoredTextElementPaint` in `packages/excalidraw/data/restore.ts` only if corrupt JSON needs coercion (follow Epic 3 minimal-touch approach).
- [ ] **Resolver / render contract (AC: #3)**  
  - [ ] Extend `getResolvedTextPaint` (or adjacent helper) in `packages/element/src/textPaintResolve.ts` to expose resolved outline **style** primitives consumed by all surfaces (avoid duplicating dash math in excalidraw-only code).  
  - [ ] **Canvas:** `packages/element/src/renderElement.ts` — apply `setLineDash`, `lineJoin`, `lineCap`, `miterLimit` on `strokeText` path when outline width &gt; 0.  
  - [ ] **SVG:** `packages/excalidraw/renderer/staticSvgScene.ts` — set matching `stroke-dasharray`, `stroke-linejoin`, `stroke-linecap`, `stroke-miterlimit` on `<text>` when outline on.  
  - [ ] **Wysiwyg:** `packages/excalidraw/wysiwyg/textWysiwyg.tsx` — best-effort CSS; document known gaps (Safari / non-WebKit dashed text stroke may differ — [Source: `_bmad-output/planning-artifacts/architecture.md` — browser variance]).
- [ ] **UI (AC: #1, #4)**  
  - [ ] `packages/excalidraw/actions/actionProperties.tsx` — controls under standalone text outline section only (`shouldShowStandaloneTextPaintControls`); reuse patterns from shape stroke UI where possible (e.g. existing stroke style controls) without breaking “text-only selection” scope (UX-DR3).  
  - [ ] `packages/excalidraw/locales/en.json` (+ repo locale policy) — clear strings, distinct from fill control (FR4).
- [ ] **Tests (AC: #3, #5)**  
  - [ ] `packages/element/tests/` — unit tests for resolver + normalization.  
  - [ ] Extend `packages/excalidraw/tests/textPaintCrossSurface.test.tsx` (or sibling) so SVG attributes reflect new outline style for at least one fixture.  
  - [ ] Restore / JSON round-trip test for new optional keys (pattern after Epic 3 `restore.test.ts`).
- [ ] **Docs (AC: #5)**  
  - [ ] Update `packages/element/text-paint-serialization.md` and `packages/excalidraw/README.md` “Text element paint” table.  
  - [ ] `packages/excalidraw/CHANGELOG.md` Unreleased bullet.

## Dev Notes

### Epic / PRD context

- Epic 5 is **post-MVP**; FR21 explicitly defers advanced outline until after color+width MVP ([Source: `_bmad-output/planning-artifacts/epics.md` — Epic 5, Story 5.1]).  
- Do **not** break legacy migration or silent semantic drop for viewers (FR15) — document any limitation (e.g. wysiwyg vs canvas).

### Architecture compliance

- **Package boundary:** `packages/element` must not depend on `packages/excalidraw` ([Source: `_bmad-output/planning-artifacts/architecture.md` — boundaries]). Shared stroke semantics live in element; SVG app code imports from `@excalidraw/element`.  
- **Render order:** keep outline drawn **before** fill on canvas; SVG `paint-order: stroke fill` where outline exists ([Source: `packages/element/src/renderElement.ts` inline contract; `staticSvgScene.ts`]).  
- **Theme:** outline color still passes through existing dark-mode pipeline for colors already handled by `getResolvedTextPaint`; new props are structural, not alternate color pipelines.

### File structure (primary touchpoints)

| Area | Path |
| --- | --- |
| Types | `packages/element/src/types.ts` |
| Text paint merge | `packages/element/src/textPaint.ts`, `packages/element/src/mutateElement.ts` |
| Resolver | `packages/element/src/textPaintResolve.ts` |
| Canvas | `packages/element/src/renderElement.ts` |
| SVG | `packages/excalidraw/renderer/staticSvgScene.ts` |
| Wysiwyg | `packages/excalidraw/wysiwyg/textWysiwyg.tsx` |
| Actions / UI | `packages/excalidraw/actions/actionProperties.tsx`, `packages/excalidraw/components/Actions.tsx` (if compact actions need entries) |
| Restore | `packages/excalidraw/data/restore.ts` |
| i18n | `packages/excalidraw/locales/en.json` |
| Tests | `packages/element/tests/*`, `packages/excalidraw/tests/textPaintCrossSurface.test.tsx`, `packages/excalidraw/tests/data/restore.test.ts` |
| Docs | `packages/element/text-paint-serialization.md`, `packages/excalidraw/README.md`, `CHANGELOG.md` |

### Library / API notes

- **Canvas 2D:** `CanvasRenderingContext2D.setLineDash`, `lineJoin`, `lineCap`, `miterLimit` — standard; dash lengths are typically in **CSS pixels** in the scaled text coordinate system used by `drawElementOnCanvas` (verify against how `lineWidth` is already interpreted for text outline).  
- **SVG:** `stroke-dasharray`, `stroke-linejoin`, `stroke-linecap`, `stroke-miterlimit` on `<text>` — widely supported; match canvas semantics as closely as repo does for linear elements.

### Testing standards

- Run `yarn test:typecheck` before merge.  
- Run targeted Vitest for changed packages; update snapshots only when behavior is intentional (`yarn test:update` per `CLAUDE.md`).  
- Prefer resolver-level assertions + SVG export parity over brittle full-canvas pixel tests unless repo already has a pattern for text golden images.

### Previous story intelligence (Epic 4)

- **4.4** standardized user/embedder messaging in CHANGELOG and README; extend those sections rather than duplicating conflicting prose.  
- **Cross-surface tests** live in `textPaintCrossSurface.test.tsx` — extend rather than adding parallel parity files.

### Project context reference

- No `project-context.md` found in repo root; rely on `CLAUDE.md`, Architecture, and this story.

## Dev Agent Record

### Agent Model Used

_To be filled by dev agent_

### Debug Log References

### Completion Notes List

### File List

## Story completion status

- [ ] Ready for review (all AC satisfied)
- [ ] Record completion notes and file list in Dev Agent Record above
