## Why

Excalidraw text elements currently treat markdown-style links as plain text, so diagrams cannot contain actionable references to docs, tickets, or external resources. Adding first-class hyperlink parsing and interaction now addresses a common collaboration need and aligns editor behavior with user expectations from markdown tooling.

## What Changes

- Parse markdown-style inline links in text content using `[label](url)` syntax.
- Render detected links in text elements with clear interactive styling (e.g., underline and link color).
- Allow opening valid links in a new browser tab from canvas interactions without breaking normal editing/selection behavior.
- Add URL validation and sanitization rules to prevent unsafe schemes and reduce malformed-link behavior.
- Preserve plain-text fallback for non-matching markdown patterns so existing drawings continue to render unchanged.

## Capabilities

### New Capabilities

- `text-element-hyperlinks`: Parse, render, and activate markdown-style hyperlinks inside Excalidraw text elements.

### Modified Capabilities

- None.

## Impact

- Affected code: text parsing/rendering pipeline, element hit-testing/interaction handling, and canvas event logic.
- APIs/data model: serialized text content remains backward compatible; parsed hyperlink metadata may be derived at runtime.
- Security: introduces explicit URL allow/deny behavior for safe link activation.
- Tests/docs: requires behavior tests for parsing/interaction and documentation updates for supported link syntax.
