## Context

Excalidraw already supports element-level hyperlinks through `element.link`, hyperlink popovers, exported anchors, and the `onLinkOpen` interception hook. Issue `#11024` asks for inline clickable references authored directly in text content via markdown-style syntax (`[label](url)`).

This is a cross-cutting change because it touches text authoring, canvas rendering, pointer hit-testing, and export behavior. The existing text model stores plain strings in `originalText`/`text`, so the design should avoid introducing a rich-text data model unless strictly necessary.

## Goals / Non-Goals

**Goals:**
- Support a constrained inline-link syntax in text content using `[label](url)`.
- Reuse existing URL normalization and link-opening safeguards.
- Keep text editing plain-text based, with the raw markdown source preserved while editing.
- Make valid links discoverable and clickable in both the live canvas and exported output.

**Non-Goals:**
- Supporting arbitrary HTML anchors or a general rich-text formatting system.
- Adding inline links to non-textual primitives that do not already render text content.
- Changing the persisted element schema beyond what can be derived from existing text fields.

## Decisions

1. **Parse inline links from text on demand instead of changing the element schema.**
   - Rationale: the existing text element model is string-based, and the requested syntax is representable without adding stored runs/marks. Parsing at render and interaction time keeps the change incremental and backward-compatible.
   - Alternative considered: storing structured link spans in the element. Rejected because it would require migrations, new serialization logic, and broader editor changes for a single formatting feature.

2. **Limit the initial syntax to valid markdown-style link tokens with a valid URL target.**
   - Rationale: a narrow grammar avoids ambiguity in the WYSIWYG/plain-text editor and keeps wrapping/measurement predictable.
   - Alternative considered: accepting raw URLs, HTML anchors, or nested markdown. Rejected for the initial change because it expands parsing complexity and increases the chance of inconsistent rendering.

3. **Reuse existing URL normalization/opening behavior for inline links.**
   - Rationale: `normalizeLink`, URL validation helpers, target selection (`_blank` vs `_self`), and `onLinkOpen` already encode Excalidraw's current expectations. Inline links should behave like existing element links wherever possible.
   - Alternative considered: a separate inline-link click path. Rejected because it would duplicate security and host-integration behavior.

4. **Render link styling and click targets from measured text runs.**
   - Rationale: clickable inline links must align with wrapped text, scaling, rotation, and export output. The implementation should derive visual runs and hit areas from the same layout information used to draw text.
   - Alternative considered: overlaying DOM anchors above the canvas. Rejected because it complicates zoom/rotation sync and diverges from export rendering.

## Risks / Trade-offs

- [Wrapped text hit-testing can drift from rendered glyph positions] → Mitigation: compute link segments from the same wrapped line layout and font metrics used by text rendering/export paths.
- [Markdown syntax may reduce text-editing clarity] → Mitigation: keep editing in raw source form and only render interactive styling outside the active editor.
- [Unsafe or malformed URLs could become clickable] → Mitigation: gate interactivity on existing URL validation/normalization and fall back to plain text for invalid targets.
- [Inline links may overlap with existing element-level hyperlink affordances] → Mitigation: preserve current element-level link behavior and only activate inline hit areas inside text glyph bounds.

## Migration Plan

- No persisted schema migration is required if inline-link state is derived from existing text fields.
- Rollback is low risk: removing inline parsing/styling returns elements to plain text rendering without data loss because the raw markdown text remains intact.

## Open Questions

- Should the first version support inline links only in standalone text elements or also in bound text inside containers and shapes? The proposal assumes all rendered text elements, but implementation effort may differ.
- Should inline links participate in exported SVG/PDF as separate anchors per link run, or is SVG support sufficient for the first iteration?
- Should local links use `_self` consistently for inline links as they do for existing element links?

