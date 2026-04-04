## Why

Diagrams are often used to share knowledge and present work; users need to attach references (docs, tickets, URLs) directly to labels and text on the canvas. Today text is plain; there is no way to express markdown-style links like `[label](https://example.com)` and have them behave as clickable hyperlinks ([GitHub issue #11024](https://github.com/excalidraw/excalidraw/issues/11024)). Adding this improves interactivity without forcing users to leave the drawing surface for every reference.

## What Changes

- Accept markdown link syntax `[label](url)` inside text elements (and any other text surfaces that share the same storage model, aligned with product scope in design).
- Parse link spans from stored text; render links distinctly (e.g., color and underline) on the canvas and in exports where technically feasible.
- On pointer activation, open the URL in a new browser tab (consistent with common web and GitHub markdown behavior).
- Validate and sanitize URLs to reduce malicious or broken links (scheme allowlist, encoding rules); invalid or disallowed URLs fall back to plain text or non-clickable display per design.

## Capabilities

### New Capabilities

- `text-hyperlinks`: User-visible behavior for recognizing `[label](url)` in text, visual styling of links, click-to-open in a new tab, and URL safety rules. Covers editor rendering, interaction hit-testing, and export behavior for linked text.

### Modified Capabilities

- _(none — no existing capability specs in this repository yet.)_

## Impact

- **Rendering**: Canvas text drawing (`packages/element` / `renderElement.ts`) currently uses `fillText` per line; links require either segmented drawing with styles or an overlay/DOM layer for pointer handling — see `design.md`.
- **Interaction**: `App` / interactive scene must distinguish clicks on link spans vs. selection/drag; may reuse patterns from embeddables or link-like UI elsewhere.
- **Editing**: WYSIWYG or raw text editing (`textWysiwyg` and related) must preserve link syntax and caret behavior inside or across link spans.
- **Export**: SVG (and PNG via canvas) need consistent appearance; SVG may use `<a>`; raster export may flatten to styled text without clickable regions unless specified.
- **Tests**: New unit and integration tests for parsing, security, rendering, and click behavior.
