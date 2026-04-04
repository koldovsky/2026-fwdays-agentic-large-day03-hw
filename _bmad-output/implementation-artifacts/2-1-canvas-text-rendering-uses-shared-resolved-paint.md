# Story 2.1: Canvas text rendering uses shared resolved paint

Status: done

## Story

As a **diagram author**,
I want **the canvas to draw text fill and optional outline using the same resolver as the data model**,
So that **on-screen text matches saved intent**.

## Acceptance

- Canvas uses `getResolvedTextPaint(element, renderConfig.theme)` in `packages/element/src/renderElement.ts`.
- Draw order: outline (`strokeText`) then fill (`fillText`) per line — documented inline next to the implementation (parity with SVG `paint-order: stroke fill`).

## Verification

- Covered by existing 1.3 implementation + `textPaintResolve.test.ts` + `textPaintCrossSurface.test.tsx` (shared resolver contract).
