## Why

Diagrams and labels in Excalidraw are largely non-interactive; users cannot attach actionable references (docs, tickets, URLs) directly to text on the canvas. Adding markdown-style hyperlinks matches familiar authoring patterns and makes shared diagrams more useful for knowledge work and presentations. This addresses community demand ([excalidraw#11024](https://github.com/excalidraw/excalidraw/issues/11024)).

## What Changes

- Accept link syntax in text elements: `[label](url)` aligned with common markdown/GitHub-style links.
- Render recognized segments as clickable hyperlinks on the canvas with clear visual affordance (e.g., underline and distinct color).
- On activation, open the target URL in a new browser tab (or equivalent safe navigation in embedded contexts).
- Apply URL and content safeguards to reduce broken, misleading, or malicious links (validation, allow/deny patterns, and safe handling of `javascript:` and similar schemes).
- Ensure behavior is consistent for editing vs. viewing and does not regress text layout or export paths without explicit follow-up (export behavior scoped in design/specs as needed).

## Capabilities

### New Capabilities

- `text-hyperlinks`: Authoring, parsing, rendering, interaction, and security rules for markdown-style hyperlinks inside text-bearing elements on the canvas.

### Modified Capabilities

- _(none — no existing OpenSpec capabilities in this repository)_

## Impact

- **Text pipeline**: Parsing, measuring, and drawing text in `@excalidraw/element` / `packages/excalidraw` (and any shared text utilities).
- **Interaction**: Pointer handling and hit-testing for link regions within text bounds; possible property panel or context actions for link editing.
- **Security**: Central validation/sanitization for URLs before storage, render, and navigation.
- **Exports / API**: File format or scene JSON may need fields or conventions for link spans; embedding consumers must be considered (detailed in design).
