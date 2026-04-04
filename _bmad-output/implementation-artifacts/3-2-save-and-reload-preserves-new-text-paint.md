# Story 3.2: Save and reload preserves new text paint

Status: done

## Acceptance

- `serializeAsJSON` + `JSON.parse` + `restoreElements` round-trip keeps `textFillColor`, `textStrokeColor`, `textStrokeWidth`.

## Tests

- `packages/excalidraw/tests/data/restore.test.ts` — “serializeAsJSON round-trip preserves text paint fields”.
