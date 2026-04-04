## Context

Excalidraw text elements store a plain `text` string rendered line-by-line via `context.fillText`. The only link mechanism today is the element-level `link: string | null` property on `_ExcalidrawElementBase`, which attaches a single URL to any element type. There is no inline formatting, markdown parsing, or rich-text span model.

The goal is to support `[label](url)` markdown-style hyperlinks **inside** text content, so a single text element can contain multiple independently clickable links with distinct visual styling — without breaking existing behavior or changing the persisted data model.

**Key constraints:**
- Canvas 2D API has no native inline formatting — each `fillText` call draws a single run in one style.
- Text wrapping (`textWrapping.ts`) operates on unicode-aware tokens and must remain consistent.
- The existing element-level `link` property must continue to work independently.
- URL handling must reuse the existing `normalizeLink` / `sanitizeUrl` pipeline.

## Goals / Non-Goals

**Goals:**
- Parse `[label](url)` from text content into structured segments at render time.
- Render link labels with underline and a distinct color on the canvas.
- Support per-link-span hit testing so individual links are clickable in view mode.
- Emit proper `<a>` wrappers per link span in SVG export.
- Sanitize all URLs through the existing pipeline.

**Non-Goals:**
- Editing UX changes (e.g., autocomplete, inline link toolbar) — the WYSIWYG textarea remains plain text.
- Support for other markdown syntax (bold, italic, images, headers).
- Replacing or deprecating the element-level `link` property.
- Nested or overlapping markdown links.
- Link preview tooltips or embeds.

## Decisions

### 1. Parse-at-render vs stored parsed data

**Decision:** Parse at render time from the raw `text` field. Cache results in a module-level `Map<string, ParsedSegment[]>` keyed by `element.id + element.version`.

**Rationale:** Parsing is deterministic from `text` content, so storing parsed segments in the element would be redundant and create sync issues. A version-keyed cache avoids repeated regex work during animation frames. This means zero data-model changes and full backward compatibility — older clients simply ignore the syntax and render it as literal text.

**Alternatives considered:**
- *Store parsed links in element `customData`*: Rejected because it couples serialization to a rendering concern and creates migration burden.
- *Parse on every frame without caching*: Rejected for performance; a text element with many links would re-run regex on every paint.

### 2. Segment model

**Decision:** A parsed text line is represented as an array of segments:

```typescript
type TextSegment =
  | { type: "text"; content: string }
  | { type: "link"; label: string; url: string; rawLength: number };
```

`rawLength` stores the character count of the full `[label](url)` in the original string, needed for cursor/offset calculations. The parser function signature:

```typescript
function parseMarkdownLinks(text: string): TextSegment[];
```

This operates on a single line of text (after newline splitting) and returns ordered segments.

**Rationale:** Flat segment array is the simplest model that supports per-span rendering without a tree structure. Each segment maps directly to a `fillText` call.

### 3. Rendering approach — per-segment `fillText`

**Decision:** Replace the single `fillText(lines[index], …)` call in `drawElementOnCanvas` with a loop over segments per line:
1. For each line, call `parseMarkdownLinks(line)`.
2. Track a running `xOffset` starting from the line's `horizontalOffset`.
3. For plain segments: draw with current element style.
4. For link segments: switch `fillStyle` to a link color (configurable, default `#1971c2` — same blue used for the existing link icon), draw the label, then draw an underline via `context.beginPath` / `lineTo` / `stroke`.
5. Advance `xOffset` by the measured width of each segment.

**Rationale:** This is the minimal-invasive change to the existing render path. It keeps the single-pass top-to-bottom line rendering and avoids off-screen canvases or DOM overlays.

**Alternatives considered:**
- *HTML overlay for links*: Rejected because it breaks the canvas-only rendering model and creates z-index / scrolling issues.
- *Off-screen canvas compositing per segment*: Over-engineered for this use case.

### 4. Text measurement and wrapping

**Decision:** When measuring text width for wrapping, use the **label text** width for link segments (not the raw `[label](url)` width). This means `wrapText` must be link-aware:
- Before wrapping, pre-process the text to replace `[label](url)` with the label for width measurement purposes.
- After wrapping, the render path uses the full raw text (which still contains the markdown syntax) and parses segments for styled rendering.

**Rationale:** Users expect the visual width to reflect what they see (the label), not the raw syntax. The wrapping module already has a token-based architecture that can accommodate a pre-processing step.

### 5. Hit testing for link spans

**Decision:** Compute link bounding boxes during rendering and store them in a module-level `Map<string, LinkHitBox[]>` keyed by element ID. Each `LinkHitBox` contains `{ x, y, width, height, url }` in element-local coordinates. The existing `isPointHittingLink` helper in `hyperlink/helpers.ts` is extended: for text elements, after checking the element-level `link`, also check against inline link hit boxes.

**Rationale:** Hit boxes are a natural by-product of the per-segment rendering loop (we already measure each segment). Storing them avoids re-parsing and re-measuring on every pointer event.

### 6. SVG export

**Decision:** In `staticSvgScene.ts`, when rendering text elements, split each line into segments. Plain text segments become `<tspan>` nodes; link segments become `<a xlink:href="…"><tspan>…</tspan></a>` with the underline and color attributes set via SVG `text-decoration` and `fill`.

**Rationale:** SVG natively supports `<a>` inside `<text>`, making this a clean mapping from the segment model.

### 7. Link color

**Decision:** Use a hardcoded link color `#1971c2` (matching the existing link icon color) for both canvas and SVG rendering. In dark mode, apply `applyDarkModeFilter` to the link color just like `strokeColor`.

**Rationale:** Keeps links visually consistent with the existing link icon affordance. A per-element link color setting is out of scope (non-goal: no editing UX changes).

## Risks / Trade-offs

- **Performance on large text elements**: Segment parsing + per-segment `fillText` is more expensive than a single `fillText` per line. → *Mitigation*: Version-keyed parse cache ensures parsing happens only on text changes. Canvas `fillText` overhead per segment is negligible compared to overall frame budget.

- **Wrapping inconsistency**: If the label-width substitution for wrapping does not perfectly match the actual rendered segment widths, text may overflow or wrap differently than expected. → *Mitigation*: Both paths use the same `charWidth` / `getLineWidth` measurement functions, so widths should be consistent. Add integration tests comparing wrapped output.

- **Backward compatibility of raw text**: Older clients that don't understand the feature will render `[label](url)` as literal text. → *Mitigation*: This is acceptable and expected. The raw text is unchanged; this is purely a rendering enhancement. Users editing on older clients can still see the full syntax.

- **Malicious URLs**: Users could embed `javascript:` or data URIs. → *Mitigation*: All URLs are passed through `normalizeLink` → `sanitizeUrl` (from `@braintree/sanitize-url`) before use, same as the element-level link property.

- **Interaction with element-level `link`**: A text element could have both `element.link` and inline `[label](url)` links. → *Mitigation*: Both work independently. The element-level link icon and behavior are unchanged. Inline links are an additive feature.
