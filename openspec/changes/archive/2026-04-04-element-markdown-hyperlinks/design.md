## Context

Excalidraw today treats text element `text` as plain strings: canvas rendering uses `fillText` per line in `packages/element/src/renderElement.ts`, and SVG export emits one `<text>` node per line in `packages/excalidraw/renderer/staticSvgScene.ts`. There is no notion of inline spans or URLs. Adding hyperlinks touches parsing, measurement (width/height), rendering (canvas vs SVG vs interactive layer), pointer routing, persistence, and security.

## Goals / Non-Goals

**Goals:**

- Support `[label](url)` in text-bearing elements where plain text is already supported (primary focus: text elements and bound labels as scoped in tasks/specs).
- Render links with obvious affordance and open validated targets in a new browsing context with safe defaults (`noopener`, `noreferrer` where applicable).
- Centralize URL validation/sanitization so invalid or dangerous schemes never drive navigation.
- Keep file format backward compatible for documents that contain no link syntax.

**Non-Goals:**

- Full CommonMark or rich markdown in text (headings, images, autolinks-only, reference-style links, HTML passthrough).
- Server-side enforcement of link policies (this remains a client capability).
- Changing default typography for non-link text beyond what is required to lay out link spans.

## Decisions

1. **Representation of links in the element model**  
   - **Choice**: Keep the canonical `text` string as the user-editable source (including `[label](url)` tokens). Parse into a structured list of segments (plain / link) at runtime for measure, draw, and hit-test. Optionally cache parsed output per element revision in memory to avoid repeated parsing.  
   - **Alternatives**: Separate parallel array of links with offsets (more fragile for edits); store only URL map and strip markdown from display text (diverges from “what you type is what you see” for power users).  
   - **Rationale**: Matches issue request, keeps round-trip and collaboration semantics simple, and avoids a migration for existing scenes.

2. **Rendering strategy**  
   - **Choice**: Split drawing into per-segment layout: measure each segment with the same font metrics stack Excalidraw already uses for text, draw plain segments on canvas as today, and draw link segments with link styling. For pointer interaction, maintain segment bounding boxes in element-local coordinates and map clicks through existing hit-testing pipelines. For SVG export, emit nested `<a>` elements where the spec allows (e.g., `<text>` with `<tspan>` inside `<a>` per SVG rules) or document a fallback (plain text + footnote URL) if a target environment forbids links.  
   - **Alternatives**: DOM overlay of absolutely positioned `<a>` over canvas (simpler click targets, harder sync with zoom/scroll/rotation and export parity). Pure canvas with synthetic navigation on click (no real `<a>`; still need hit regions).  
   - **Rationale**: Bounding-box hit regions + canvas/SVG alignment keep behavior close to current architecture while meeting “clickable” and export needs.

3. **URL safety**  
   - **Choice**: Allow `http:` and `https:` only for navigation by default; reject `javascript:`, `data:` (except if explicitly out of scope), `vbscript:`, and unknown schemes. Normalize and validate URLs; enforce reasonable length limits; optionally block opaque or userinfo-heavy URLs per shared utility.  
   - **Alternatives**: Allow all schemes and rely on browser (unsafe); allow `mailto:` and `tel:` in v2 (can be ADDED later).  
   - **Rationale**: Matches “safeguards” in the issue while covering typical documentation links.

4. **Opening behavior**  
   - **Choice**: Use `window.open(url, '_blank', 'noopener,noreferrer')` or equivalent abstraction used elsewhere in the app for external navigation; ensure embedded contexts (iframe) degrade gracefully (e.g., noop if blocked).  
   - **Rationale**: Issue explicitly asks for a new tab and safe tab behavior.

5. **Editing UX**  
   - **Choice**: No separate “link tool” in v1 unless already trivial: users type markdown-like syntax in the existing text editor; optional future enhancement is a “link” affordance in the properties UI that inserts a template `[](https://)`.  
   - **Rationale**: Minimizes UI surface while delivering the requested syntax.

## Risks / Trade-offs

- **Canvas accessibility** — Native canvas text is not exposed as links to screen readers.  
  **Mitigation**: Document limitation; consider future `aria` description or a side panel listing links (out of initial scope unless low cost).

- **Layout parity** — Parsing may change wrapping if measurement treats link markers differently from plain text.  
  **Mitigation**: Parse before measure; include bracket/paren characters only inside link tokens; add visual/regression tests for wrapped paragraphs.

- **SVG `<a>` constraints** — SVG nesting rules may differ by exporter consumer.  
  **Mitigation**: Follow SVG spec for text linking; define explicit behavior in spec for unsupported export targets.

- **Malicious display** — Labels can misrepresent targets (`[safe](evil)`).  
  **Mitigation**: Browser shows real URL in UI on hover/status where possible; no substitute for user judgment—call out in docs.

## Migration Plan

- Ship as additive behavior: existing files unchanged; new syntax activates only when present.
- No forced rewrite of stored JSON; parsers treat absence of link pattern as plain text.
- Rollback: feature flag or revert commit bundle; stored data remains valid plain text.

## Open Questions

- Whether bound text on shapes and arrows is in scope for v1 or deferred (proposal mentions “text-bearing elements”; confirm with product/tasks).
- Exact SVG export structure for multi-line links (one `<a>` per line vs per span).
- Whether `mailto:` / `tel:` should be allowed in the first release alongside `http(s):`.
