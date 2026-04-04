# Story 1.3: Theme-aware resolved colors for text paint

Status: done

## Story

As a **diagram author**,
I want **text fill and outline to follow light/dark theme like other elements**,
So that **previews stay trustworthy in both themes**.

## Acceptance Criteria

1. **Given** light or dark theme is active **when** resolved paint is computed for a text element **then** the same theme pipeline used elsewhere (`applyDarkModeFilter` when `THEME.DARK`) applies to **both** glyph fill and outline colors (FR12, Architecture).

## Tasks / Subtasks

- [x] **AC1 — Shared resolver** (AC: #1)
  - [x] Add `getResolvedTextPaint(element, theme)` in `packages/element` (verb–noun naming per Architecture). It must read **fill** from `textFillColor ?? strokeColor` and **outline** from `textStrokeColor` when `textStrokeWidth > 0`, applying `applyDarkModeFilter` to each persisted color in dark theme only.
  - [x] Export the helper from `@excalidraw/element` (e.g. `textPaintResolve.ts` or alongside existing `textPaint` module).
- [x] **AC1 — Consumers** (AC: #1)
  - [x] **Canvas:** `packages/element/src/renderElement.ts` — draw text using resolved fill; when outline is on, draw **stroke then fill** per line (consistent with Architecture render-order note).
  - [x] **SVG:** `packages/excalidraw/renderer/staticSvgScene.ts` — set `<text>` fill (and stroke/stroke-width when outline enabled) from the same resolver so theme matches canvas intent.
  - [x] **Wysiwyg:** `packages/excalidraw/wysiwyg/textWysiwyg.tsx` — set editor text color (and outline via CSS where supported) from the resolver so inline edit matches themed preview.
- [x] **Tests**
  - [x] Unit tests in `packages/element` for `getResolvedTextPaint` (light vs dark, fill-only, fill+outline, outline off).

### Review Findings

- [x] [Review][Defer] Inline editor outline використовує лише `WebkitTextStrokeWidth` / `WebkitTextStrokeColor`; у браузерах без підтримки цього префікса обводка в режимі редагування може не збігатися з canvas — відкласти на Story 1.5 (wysiwyg parity) / 1.4 за потреби. [`packages/excalidraw/wysiwyg/textWysiwyg.tsx`] — deferred

## Dev Notes

### Architecture

- **Single resolver** consumed by canvas (element package), SVG (`staticSvgScene.ts`), and wysiwyg — [Source: `_bmad-output/planning-artifacts/architecture.md` — Naming Patterns, Structure Patterns, Pattern Examples (`resolveTextPaint` / `getResolvedTextPaint`)].
- **Theming:** reuse `applyDarkModeFilter` from `@excalidraw/common` — same as `renderElement` freedraw / current text fill path.
- **No** duplicate color math in app-only code for text paint; import resolver from `@excalidraw/element`.

### Previous story intelligence (1.1 / 1.2)

- Fields: `textFillColor?`, `textStrokeColor?`, `textStrokeWidth?`; `mergeTextPaintNormalization` keeps `strokeColor` and fill in sync on mutate.
- Property UI already writes these fields; this story only ensures **display paths** respect theme for both fill and outline.

### Code anchors

- Current text on canvas: `packages/element/src/renderElement.ts` (`drawElementOnCanvas` text branch) — today uses `element.strokeColor` + dark filter only.
- SVG text: `packages/excalidraw/renderer/staticSvgScene.ts` — `fill` from `strokeColor` + filter.
- Wysiwyg: `textWysiwyg.tsx` — `color` from `strokeColor` + filter.

### Verification

- [x] `yarn test:typecheck`
- [x] Targeted Vitest: `textPaintResolve.test.ts`, `export.test.ts`, `textWysiwyg.test.tsx`
- [ ] Manual: standalone text with outline in light vs dark theme — canvas, SVG export sample, and inline editor colors look consistent with other elements.

## Dev Agent Record

### Agent Model Used

Cursor agent (Claude) — create-story + dev-story single session

### Debug Log References

- SVG: stroke attributes are only emitted when outline is enabled (avoids noisy `stroke="none"` vs existing export snapshots).

### Completion Notes List

- Introduced `getResolvedTextPaint` in `packages/element/src/textPaintResolve.ts` and re-exported from package index.
- Canvas text: resolved fill + `strokeText` then `fillText` per line when outline width > 0.
- Wysiwyg: `color` + optional `WebkitTextStrokeWidth` / `WebkitTextStrokeColor` from resolver.

### File List

- `packages/element/src/textPaintResolve.ts` (new)
- `packages/element/src/index.ts`
- `packages/element/src/renderElement.ts`
- `packages/element/tests/textPaintResolve.test.ts` (new)
- `packages/excalidraw/renderer/staticSvgScene.ts`
- `packages/excalidraw/wysiwyg/textWysiwyg.tsx`
- `_bmad-output/implementation-artifacts/1-3-theme-aware-resolved-colors-for-text-paint.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Story completion status

- **Status:** done  
- **Note:** Code review 2026-04-03 — без обов’язкових patch; один defer (wysiwyg / WebKit outline). Manual verification у Verification лишається опційним для людини.
