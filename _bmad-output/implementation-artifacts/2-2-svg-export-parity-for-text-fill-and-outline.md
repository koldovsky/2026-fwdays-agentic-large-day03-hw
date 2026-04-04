# Story 2.2: SVG export parity for text fill and outline

Status: done

## Story

As a **diagram author**,
I want **exported SVG to match canvas text appearance**,
So that **vector exports are trustworthy**.

## Acceptance

- `packages/excalidraw/renderer/staticSvgScene.ts` uses `getResolvedTextPaint` for `<text>` fill and optional stroke; `paint-order: stroke fill` when outline is on (comment links to canvas contract).

## Tests

- Covered by `packages/excalidraw/tests/textPaintCrossSurface.test.tsx` (resolver ↔ SVG; expanded in Epic 4 with legacy fixture).
