# Story 3.3: Migration rules and backward readability documented

Status: done

## Deliverables

- **`packages/element/text-paint-serialization.md`** — field table, legacy behavior, restore normalization, round-trip, older-client notes.
- **`packages/excalidraw/CHANGELOG.md`** (Unreleased) — user-facing summary of optional text paint fields and legacy compatibility.
- **`ExcalidrawTextElement.textFillColor`** JSDoc in `types.ts` links to the markdown doc.

## Tests

- Restore tests cover legacy omit keys, invalid width coercion, empty string strip, and JSON round-trip (shared with 3.1 / 3.2).
