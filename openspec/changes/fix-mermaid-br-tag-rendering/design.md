## Context

`@excalidraw/mermaid-to-excalidraw` parses Mermaid diagrams and returns skeleton elements whose `text` properties may contain raw `<br>` or `<br/>` HTML tags (used in Mermaid node labels for line breaks). Excalidraw's `convertToExcalidrawElements()` does not interpret HTML — it treats these tags as literal strings, so users see `<br>` in their diagrams instead of actual line breaks.

Two code paths call `parseMermaidToExcalidraw()` followed by `convertToExcalidrawElements()`:
1. `packages/excalidraw/components/App.tsx` (~line 3754) — clipboard paste path
2. `packages/excalidraw/components/TTDDialog/common.ts` (~line 97) — TTD dialog path

## Goals / Non-Goals

**Goals:**
- Normalize `<br>` and `<br/>` in skeleton element text to `\n` before `convertToExcalidrawElements()` is called
- Fix both import paths (clipboard paste + TTD dialog) consistently

**Non-Goals:**
- Full HTML sanitization of skeleton element text (other tags like `<b>`, `<i>` are not in scope)
- Changes to `@excalidraw/mermaid-to-excalidraw` library itself

## Decisions

### Where to apply the transformation

**Decision**: Apply normalization on the `elements` array returned by `parseMermaidToExcalidraw()`, immediately before calling `convertToExcalidrawElements()`, in each of the two call sites.

**Alternatives considered**:
- *Inside `convertToExcalidrawElements()`*: Would be a lower-level change in the shared utility, but that function is general-purpose and should not carry Mermaid-specific concerns.
- *Inline at each call site*: Would avoid introducing a new export, but duplicates the regex and the field-mapping logic across two files.

**Actual decision**: Extract `normalizeMermaidBrTags<T>()` as a shared helper in `packages/excalidraw/mermaid.ts` (already imported by `App.tsx`). Both call sites import and apply it immediately before `convertToExcalidrawElements()`.

### Regex pattern

Use `/<br\s*\/?>/gi` to match `<br>`, `<br/>`, and `<br />`. The `i` flag covers uppercase `<BR>` for robustness even though Mermaid only produces lowercase. The `g` flag replaces all occurrences in a single field.

## Risks / Trade-offs

- **Multiple text fields**: Skeleton elements may have both `text` and `label` fields. The fix must cover any field that holds visible text. → Inspect the skeleton element type and normalize all relevant string fields.
- **Regression risk is low**: The transformation is narrow and only fires on Mermaid import paths. Existing tests will catch regressions.