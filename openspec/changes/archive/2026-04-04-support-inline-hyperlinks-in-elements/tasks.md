## 1. Inline hyperlink parsing

- [x] 1.1 Add a reusable parser/helper that extracts `[label](url)` segments from text while preserving the original source string for editing.
- [x] 1.2 Reuse existing link normalization and validation utilities so only supported URLs become inline hyperlink segments.
- [x] 1.3 Add focused unit tests for valid syntax, malformed syntax, and unsafe or invalid URL targets.

## 2. Canvas rendering and interaction

- [x] 2.1 Update text rendering/layout code to style recognized hyperlink labels distinctly without changing plain-text editing behavior.
- [x] 2.2 Add hit-testing for hyperlink label glyph bounds in rendered text, including wrapped text and transformed elements.
- [x] 2.3 Route inline hyperlink activation through the existing link-open callback and target-selection flow used by element-level hyperlinks.

## 3. Export behavior

- [x] 3.1 Preserve inline hyperlink targets in link-capable exports such as SVG using the rendered label text and normalized URL.
- [x] 3.2 Verify exported output degrades gracefully when viewers do not activate embedded links.

## 4. End-to-end verification

- [x] 4.1 Add integration tests covering text editing round-trips so `[label](url)` source text is preserved when reopening the editor.
- [x] 4.2 Add interaction tests covering click behavior, host interception via `onLinkOpen`, and external-link new-tab behavior.
- [x] 4.3 Run the relevant app/package test suite and type-checking for the affected `packages/excalidraw` paths, then fix any regressions.

