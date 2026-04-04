## Why

Excalidraw text elements are currently plain strings with no inline formatting. The only way to attach a URL is via the element-level `link` property, which applies a single hyperlink to the entire element. Users need the ability to embed multiple clickable hyperlinks directly inside text content using the familiar markdown `[label](url)` syntax, making diagrams actionable for knowledge sharing, presentations, and documentation references (see [excalidraw#11024](https://github.com/excalidraw/excalidraw/issues/11024)).

## What Changes

- **Markdown link parsing**: Detect `[label](url)` patterns within text element content and extract structured link segments (label text, URL, position offsets).
- **Styled link rendering on canvas**: Render recognized link labels with visual affordances (underline, distinct color) so users can distinguish clickable spans from regular text.
- **Per-span click handling**: Detect clicks/hovers on individual link spans within a text element and open the target URL in a new browser tab.
- **SVG/export support**: Wrap link spans in `<a>` tags when exporting to SVG so hyperlinks remain functional in exported assets.
- **URL sanitization**: Reuse the existing `normalizeLink` / `sanitizeUrl` pipeline to prevent broken or malicious links.

## Capabilities

### New Capabilities
- `markdown-link-detection`: Parse `[label](url)` syntax from text element content into structured link segments with label, URL, and character offsets.
- `inline-link-rendering`: Render link label spans on the canvas with distinct styling (underline, color) and handle per-span hit testing and click-to-open behavior, including SVG export support.

### Modified Capabilities
<!-- No existing spec-level capabilities are changing. The element-level `link` property is unaffected. -->

## Impact

- **`packages/element/`**: New parsing utility; changes to `renderElement.ts` (canvas drawing), `textWrapping.ts` / `textMeasurements.ts` (segment-aware measurement), and `types.ts` (optional cached parsed links on the element).
- **`packages/excalidraw/`**: Changes to click/hover handling in the interactive canvas, hyperlink helpers, and SVG export renderer (`staticSvgScene.ts`).
- **`packages/common/`**: Reuses existing `normalizeLink` / `sanitizeUrl`; no breaking changes.
- **Dependencies**: No new external dependencies required — uses existing `@braintree/sanitize-url` already in the tree.
- **Backward compatibility**: Fully backward-compatible. Existing text elements without markdown links render identically. The raw `text` field format is unchanged; parsing is read-time only.
