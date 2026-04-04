# Story 4.3: Automated cross-surface verification

Status: done

## Acceptance

- Tests cover fill-only, fill+outline, dark export, and legacy-shaped text after restore; exported SVG `<text>` matches `getResolvedTextPaint` (same contract as canvas drawing).

## Deliverables

- `packages/excalidraw/tests/textPaintCrossSurface.test.tsx` (replaces the slimmer Epic 2 SVG-only file).
