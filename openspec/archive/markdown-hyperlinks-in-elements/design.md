## Context

Excalidraw stores text on `ExcalidrawTextElement` as a single string and renders it on canvas with `fillText` per line (`packages/element/src/renderElement.ts`). There is no notion of inline spans or URLs. The interactive layer handles selection and editing via WYSIWYG (`packages/excalidraw/wysiwyg/textWysiwyg.tsx`). SVG export builds `<text>` nodes similarly (`packages/excalidraw/renderer/staticSvgScene.ts`). Adding hyperlinks requires parsing `[label](url)` from stored text, consistent styling, safe URL handling, and a strategy for hit-testing clicks without breaking existing text workflows.

## Goals / Non-Goals

**Goals:**

- Recognize markdown-style links `[label](url)` in text element content and treat them as a single logical span (label visible, URL on activation).
- Render links with clearly distinct styling (e.g., underline and link color) in the editor view.
- Open resolved, allowed URLs in a new browser tab on click (when the user intends to follow the link rather than select or edit).
- Reject or neutralize dangerous URLs (e.g., `javascript:`) and clearly defined disallowed schemes.
- Define export behavior: SVG should represent links accessibly where possible; raster exports match visual styling.

**Non-Goals:**

- Full CommonMark or rich markdown (headings, images, tables) inside text elements.
- Automatic link fetching, previews, or shortening.
- Changing the on-disk JSON schema in a breaking way without a migration story (if a new optional field is introduced, it must remain backward compatible with plain strings).

## Decisions

1. **Parsing model**  
   Parse `[label](url)` with explicit rules: nested brackets in labels can be deferred to v1 (simple regex or tokenizer with clear edge cases documented). Unmatched or malformed sequences remain literal text.  
   *Alternatives:* Full markdown parser (heavier, broader surface area) — rejected for scope.

2. **URL validation**  
   Allow `http:`, `https:`, and optionally `mailto:` for v1; block `javascript:`, `data:`, and other opaque or executable schemes. Normalize or reject percent-encoding abuse per existing security patterns in the codebase if any.  
   *Alternatives:* Allow all schemes — rejected for safety.

3. **Rendering strategy**  
   Split each text line into segments (plain vs. link). For canvas: draw each segment with appropriate `fillStyle` and underline (manual line metrics). For interactive hit-testing: compute bounding boxes per link span in scene coordinates (reuse text measurement helpers such as those used for bound text / WYSIWYG).  
   *Alternatives:* HTML overlay for all text — rejected due to sync cost with zoom/pan and RTL; *optional* targeted overlay only for link hit regions could be a follow-up if measurement complexity is high.

4. **Click vs. edit**  
   Primary click opens link when not in text-edit mode. While the WYSIWYG text editor is active, markdown stays literal in the textarea and caret placement always takes precedence, so inline links are not followed from the editor surface in v1.

5. **SVG export**  
   Emit `<a xlink:href="...">` (or HTML5-style `href` in SVG2) wrapping `<text>` tspan groups for link segments when URL is allowed; otherwise render as styled text without `href`.

6. **PNG / canvas export**  
   Render link appearance (color + underline) only; no embedded click map in PNG.

## Risks / Trade-offs

- **[Risk] Canvas measurement drift** — Underline and multi-line link spans must align with `fillText` positions; subtle font metrics bugs → **Mitigation:** share one code path for “line layout + segments” used by render and hit-test; add visual regression tests.
- **[Risk] Regex-based parsing** — Odd inputs may parse unexpectedly → **Mitigation:** document v1 grammar; add unit tests for edge cases; prefer failing closed (literal text) when ambiguous.
- **[Risk] Click vs. drag** — Users might accidentally open links → **Mitigation:** require clear mode separation (editing vs. viewing); consider small hit slop and pointer cursor change on hover.

## Migration Plan

- **Deploy:** Feature ships as pure additive behavior: existing scenes with no `[]( )` patterns unchanged.
- **Rollback:** Guard behind feature flag only if product requires it; otherwise revert commit.
- **Data:** No mandatory migration if links remain serialized as plain text strings containing markdown syntax.

## Resolved Questions

- Bound text on shapes and standalone text share the same parsing, layout, render, and hit-testing helpers in v1.
- While the text editor is focused, plain click places the caret and does not open links; link activation only happens outside edit mode.
- The v1 allowlist is restricted to normalized `http:` and `https:` URLs. `mailto:` and relative URLs are not interactive in this change.
