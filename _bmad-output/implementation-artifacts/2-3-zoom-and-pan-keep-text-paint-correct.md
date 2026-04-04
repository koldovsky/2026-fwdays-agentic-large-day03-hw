# Story 2.3: Zoom and pan keep text paint correct

Status: done

## Story

As a **diagram author**,
I want **zoom and pan not to desync text styling**,
So that **I don’t need manual refresh**.

## Rationale

- Resolved paint depends only on **element + theme**, not scroll/zoom (`getResolvedTextPaint` has no viewport inputs).
- Text element canvas cache regenerates when **zoom** or **theme** changes (`generateElementWithCanvas` in `renderElement.ts`).

## Tests

- `packages/element/tests/textPaintResolve.test.ts` — “does not depend on viewport” (same element → same resolved paint).
