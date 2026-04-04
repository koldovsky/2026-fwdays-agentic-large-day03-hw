## Why

Excalidraw already supports attaching a single link to an element, but text content cannot express inline clickable references. Supporting markdown-style links inside element text makes diagrams more actionable for documentation, tickets, and presentations without requiring a separate hyperlink editing flow.

## What Changes

- Add support for recognizing markdown-style links in text content using the `[label](url)` syntax.
- Render recognized links as visibly interactive inline text in editable and exported scenes.
- Open recognized external links in a new browser tab and keep existing link validation/sanitization safeguards.
- Preserve plain-text editing semantics when content does not match the supported link syntax or contains invalid URLs.

## Capabilities

### New Capabilities
- `inline-element-hyperlinks`: Parse, render, validate, and open markdown-style hyperlinks embedded in Excalidraw element text.

### Modified Capabilities
- None.

## Impact

- Affected code will likely include text editing/rendering, hyperlink helpers, export/rendering paths, and UI interaction handling in `packages/excalidraw`.
- Existing hyperlink-related callbacks and URL normalization rules may need to be reused or extended for inline links.
- New tests will be needed for parsing, rendering, interaction, and invalid-link edge cases.

