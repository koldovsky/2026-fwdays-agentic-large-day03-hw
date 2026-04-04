# Story 1.5: Inline editor reflects the same text paint

Status: done

## Story

As a **diagram author**,
I want **the wysiwyg text editor to show the same fill/outline as the canvas**,
So that **I edit what I see**.

## Acceptance Criteria

1. **Given** a text element with fill and optional outline set **when** entering inline edit mode **then** the editable text appearance matches the canvas for those paints (FR5).

## Tasks / Subtasks

- [x] Align **wysiwyg** CSS with canvas/SVG intent: resolved fill + outline via `WebkitTextStroke*` and explicit `WebkitTextFillColor` when outline is on; `paint-order: stroke fill` where supported.
- [x] `updateWysiwygStyle` already applies `getResolvedTextPaint` on each refresh (including theme).

### Review Findings

- [x] [Review][Defer] Усі браузери можуть по-різному інтерпретувати `paint-order` на `textarea`; основний шлях — WebKit stroke + fill.

## Dev Notes

- `packages/excalidraw/wysiwyg/textWysiwyg.tsx` + `getResolvedTextPaint` from `@excalidraw/element`.

## Dev Agent Record

### Agent Model Used

Cursor agent (Claude) — create + dev + review batch

### Completion Notes List

- При активній обводці: `-webkit-text-fill-color` = resolved fill, щоб заливка лишалась узгодженою з canvas після stroke.

### File List

- `packages/excalidraw/wysiwyg/textWysiwyg.tsx`

## Story completion status

- **Status:** done  
- **Note:** Візуальний QA вручну (різні браузери) — за бажанням.
