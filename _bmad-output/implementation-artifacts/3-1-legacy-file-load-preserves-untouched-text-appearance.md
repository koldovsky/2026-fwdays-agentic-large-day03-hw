# Story 3.1: Legacy file load preserves untouched text appearance

Status: done

## Acceptance

- Legacy JSON without `textFillColor` / `textStrokeWidth` still renders fill from `strokeColor` via `getResolvedTextPaint` (no eager migration on load).
- `normalizeRestoredTextElementPaint` in `packages/excalidraw/data/restore.ts` only fixes corrupt values; it does not set `textFillColor` from `strokeColor`.

## Tests

- `packages/excalidraw/tests/data/restore.test.ts` — “legacy text without new paint keys resolves fill from strokeColor”.
