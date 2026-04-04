## 1. Parsing and URL validation

- [x] 1.1 Add a small parser that turns a text string into ordered segments (plain / link) for `[label](url)` with literal fallback for invalid or incomplete tokens
- [x] 1.2 Implement `http`/`https` URL validation, normalization, max length, and rejection of `javascript:` and other disallowed schemes (shared helper in a suitable package, e.g. `@excalidraw/common` or `element`)
- [x] 1.3 Unit tests for parser edge cases (nested brackets, multiline, RTL, empty label, invalid URL)

## 2. Measurement and layout

- [x] 2.1 Extend text width/height measurement so wrapped lines account for per-segment font styling (link vs plain) without breaking existing text elements
- [ ] 2.2 Regression tests for text autosize and bound text when links are present

## 3. Canvas rendering and interaction

- [x] 3.1 Update `packages/element/src/renderElement.ts` text drawing to render segment-by-segment with link styling (underline + link color, theme-aware)
- [x] 3.2 Build link hit regions in element space and wire pointer handling so clicks on labels open validated URLs via `window.open` with `noopener,noreferrer`
- [ ] 3.3 Ensure hit testing composes with zoom, scroll, rotation, and element ordering; add integration or e2e coverage where the repo already tests pointer routing

## 4. SVG export

- [x] 4.1 Update `packages/excalidraw/renderer/staticSvgScene.ts` (or equivalent) to emit valid SVG hyperlinks for exported text with validated URLs
- [x] 4.2 Document or implement fallback for spans that cannot be expressed as SVG links without breaking spec constraints

## 5. Polish and scope confirmation

- [x] 5.1 Confirm scope for bound labels on arrows/shapes vs standalone text; align code paths or explicitly defer with a tracked follow-up
- [ ] 5.2 Manual QA matrix: light/dark theme, long URLs, wrapped lines, export/open in new tab, blocked popup behavior
