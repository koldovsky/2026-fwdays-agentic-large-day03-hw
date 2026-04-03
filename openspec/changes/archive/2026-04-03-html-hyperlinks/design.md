## Context

Excalidraw text elements render all content as plain text. The element-level
`link` property already allows any element to act as a clickable hyperlink
(icon in top-right, Ctrl/Cmd-click to open), but there is no shorthand to set
it from within the text itself. Users who type `[label](url)` see the raw
markdown syntax displayed literally.

The text editing lifecycle flows through a positioned `<textarea>` overlay
(`textWysiwyg`). On each keystroke, `originalText` is updated and
`refreshTextDimensions` recalculates geometry. On submit (blur / Escape /
Ctrl+Enter), `handleTextWysiwygForTextElement` in `App.tsx` finalises the
element. This submit handler is the natural integration point for parsing
markdown links.

## Goals / Non-Goals

**Goals:**

- Let users set an element link by typing `[label](url)` inside a text element.
- On submit, replace the visible text with the label and set `element.link` to
  the first valid URL.
- Reject dangerous URL schemes (`javascript:`, `data:`) using the existing
  `normalizeLink` / `sanitizeUrl` pipeline.
- Keep the change minimal: one new pure-function module and a small integration
  patch in the submit handler.

**Non-Goals:**

- Rich / inline link rendering (underline, color, per-word click targets).
- Multi-link support at the element level — only the first valid URL is used.
- Support for other markdown formatting (bold, italic, images, headings).
- Changes to the text editing UX (WYSIWYG preview, autocomplete, toolbar).
- Changes to existing element-link behaviour or link icon rendering.

## Decisions

### Decision 1: Parse at submit time, not during editing

**Choice:** Run the markdown link parser only in the `onSubmit` callback of
`handleTextWysiwygForTextElement`, not on every keystroke.

**Rationale:** Parsing during editing would cause the label to disappear
mid-typing, making it impossible to correct the URL. Parsing at submit keeps
the editing experience unchanged and limits the blast radius to a single
function call.

**Alternative considered:** Parse on every keystroke and show a preview — rejected
because it changes the editing UX (a non-goal) and introduces complexity.

### Decision 2: Pure function in a new module

**Choice:** Create `packages/excalidraw/utils/markdownLink.ts` containing a
single exported function `parseMarkdownLinks(text: string)` with no side
effects.

**Rationale:** A pure function is trivially testable, has no coupling to React
or the element model, and can be imported by both the app and the library
package without dependency issues.

**Alternative considered:** Inline the logic in `App.tsx` — rejected for
testability and separation of concerns.

### Decision 3: Regex with one level of balanced parentheses

**Choice:** Use the regex
`/\[([^\]]*)\]\(((?:[^()]*|\([^()]*\))+)\)/g` which supports one level of
nested parentheses in the URL segment.

**Rationale:** Wikipedia-style URLs like
`https://en.wikipedia.org/wiki/Foo_(bar)` are common. Deeper nesting is
extremely rare and would complicate the regex significantly.

**Alternative considered:** A full URL parser — rejected as over-engineered for
the scope.

### Decision 4: Reuse `normalizeLink` for security

**Choice:** Pass each extracted URL through `normalizeLink` (from
`@excalidraw/common`), which internally calls `sanitizeUrl`. If the result is
`"about:blank"`, treat the link as invalid and preserve the raw markdown.

**Rationale:** Reusing the existing sanitisation path avoids duplicating security
logic and ensures consistency with how element links are already validated.

### Decision 5: First valid URL wins

**Choice:** When multiple markdown links appear in one text element, all labels
are resolved into plain text, but only the first valid URL is assigned to
`element.link`.

**Rationale:** The element data model has a single `link: string | null` field.
Supporting multiple links would require a data model change (out of scope).

## Risks / Trade-offs

- **One-way transformation** — Once submitted, the raw markdown is lost;
  re-editing shows only the label. → Acceptable because the element link is
  visible in the link UI and users can re-type if needed.

- **Surprising behaviour for power users** — Users who intentionally want
  literal `[label](url)` text will see it transformed. → Low risk: this
  syntax is uncommon in freehand drawings; mitigation is to escape with a
  backslash in a future iteration if demand arises.

- **Regex edge cases** — Deeply nested parentheses or malformed brackets may
  produce unexpected matches. → Mitigated by comprehensive unit tests
  covering balanced parens, empty labels, empty URLs, and mixed safe/unsafe
  links.
