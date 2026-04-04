# Spec: Auto-detect Markdown Links in Text Elements

## Goal

Auto-detect markdown-style `[label](url)` syntax in text elements upon submit and convert them into a visible label with an attached `element.link` hyperlink.

## Context

- **Issue**: [excalidraw#11024](https://github.com/excalidraw/excalidraw/issues/11024) — "Support HTML hyperlink creation in Excalidraw elements"
- **Reference PR**: [excalidraw#11049](https://github.com/excalidraw/excalidraw/pull/11049)
- **Current behavior**: When a user types `[Excalidraw](https://excalidraw.com)` in a text element, the raw markdown string is stored and displayed as-is.
- **Expected behavior**: The text element displays only the label (`Excalidraw`), and the URL (`https://excalidraw.com`) is attached to the element's `link` property. The existing hyperlink system (link icon, tooltip, click-to-open) activates automatically.

## Component / Module

| File | Action | Purpose |
|------|--------|---------|
| `packages/excalidraw/utils/markdownLink.ts` | New | Regex-based parser: `parseMarkdownLink(text)` returns `{ label, url }` or `null` |
| `packages/excalidraw/components/App.tsx` | Modified | Integrate parser into WYSIWYG `onSubmit` callback (~line 5724) |
| `packages/excalidraw/locales/en.json` | Modified | Add `toast.markdownLinkDetected` i18n key |
| `packages/excalidraw/tests/markdownLink.test.ts` | New | Unit tests for the parser |

## Changes Required

### `packages/excalidraw/utils/markdownLink.ts` (new file)

- Export `parseMarkdownLink(text: string): ParsedMarkdownLink | null`
- Regex `^\[([^\]]*)\]\(([^)]+)\)$` matches only whole-text markdown links (after trimming)
- Use `normalizeLink` from `@excalidraw/common` for URL sanitization
- Reject dangerous schemes: `normalizeLink` returns `"about:blank"` for `javascript:` and `data:` URLs — treat as invalid
- When label is empty, fall back to the raw URL as the label

### `packages/excalidraw/components/App.tsx` (modification)

- In the WYSIWYG `onSubmit` handler, call `parseMarkdownLink(nextOriginalText)` before `updateElement`
- If a link is detected:
  - Pass `parsedLink.label` (instead of raw text) to `updateElement`
  - Set `element.link` to `parsedLink.url` via `scene.mutateElement`
  - Show a toast notification (`t("toast.markdownLinkDetected")`)
- If no link is detected: existing behavior unchanged

### `packages/excalidraw/locales/en.json` (modification)

- Add key `"markdownLinkDetected"` inside the `"toast"` section

### `packages/excalidraw/tests/markdownLink.test.ts` (new file)

- 14 test cases covering valid links, edge cases, and security scenarios

## Non-goals

1. **Inline/partial markdown links** — text like `"See [here](url) for details"` is NOT parsed; only whole-text matches are handled. Full inline support would require a rich-text engine.
2. **Rich text rendering** — no inline styling, clickable text regions, or mixed content within a single text element.
3. **Round-trip editing** — when the user re-edits the element, they see the label only, not the original `[label](url)` markdown. Preserving the original format is out of scope.
4. **Bound text special handling** — no special logic for text bound to shapes (rectangles, ellipses); the standard flow applies.

## Acceptance Criteria

1. **AC-1**: Typing `[Excalidraw](https://excalidraw.com)` in a text element and pressing Enter/Escape sets the visible text to `"Excalidraw"` and `element.link` to `"https://excalidraw.com"`.
2. **AC-2**: Partial markdown like `"See [here](https://example.com) for details"` is left unchanged — no parsing, no link assignment.
3. **AC-3**: Dangerous URLs (`javascript:alert(1)`, `data:text/html,...`) are rejected — text remains as raw input, no link is set.
4. **AC-4**: An empty label `[](https://example.com)` uses the URL as the visible text: element shows `"https://example.com"`.
5. **AC-5**: A toast notification is shown when a markdown link is auto-detected and converted.
6. **AC-6**: Plain text, bare URLs, and empty strings are not affected by the change.

## Edge Cases

- **Empty URL** `[label]()` — parser returns `null`, no conversion
- **Two links concatenated** `[A](url1)[B](url2)` — regex does not match, no conversion
- **Whitespace around input** `"  [label](url)  "` — trimmed before matching, works correctly
- **URL with query/fragment** `[Search](https://example.com?q=test#section)` — parsed correctly
- **Relative URL** `[Home](/home)` — accepted by `normalizeLink`

## Constraints

- Must reuse the existing `normalizeLink` function from `@excalidraw/common` for URL sanitization — no custom sanitization logic.
- Must reuse the existing `element.link` + hyperlink rendering system — no new UI elements.
- Detection happens only at text-submit time (WYSIWYG `onSubmit`), not during live typing.
