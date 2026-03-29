# Fix Mermaid `<br>` Tag Rendering

### SDD Approach

OpenSpec was chosen because Excalidraw is a large open-source monorepo with multiple packages, two affected call sites, and an active contributor base — making it important that the fix is traceable, reviewable, and testable before any code is merged. OpenSpec surfaces the placement decision (shared helper vs. inline) and the regex scope explicitly, so reviewers can challenge assumptions without reading the diff first.

### Why

When importing Mermaid diagrams with `<br>` tags in node labels (e.g., `"User Registration<br>Process"`), the tags are rendered as literal text instead of line breaks. This is a data fidelity bug that makes multi-line Mermaid node labels unusable in Excalidraw.

### What Changes

- Convert `<br>` and `<br/>` HTML tags to `\n` newline characters when processing skeleton elements from `@excalidraw/mermaid-to-excalidraw`
- Fix applies to two import paths: clipboard paste (in `App.tsx`) and the Text-to-Diagram dialog (in `TTDDialog/common.ts`)

### Capabilities

#### New Capabilities

- `mermaid-br-tag-normalization`: Normalizes `<br>` HTML tags in Mermaid skeleton element text into newline characters before converting to Excalidraw elements

#### Modified Capabilities

<!-- No existing spec-level requirement changes -->

### Risks

- **Regression in label parsing**: Replacing text fields on skeleton elements before `convertToExcalidrawElements()` could silently break labels if the regex is too broad. Mitigation: unit tests cover all three element types (`Text`, `Container`, `Arrow`) and the no-op case.
- **Compatibility between the two paths**: The clipboard paste path (`App.tsx`) and the TTD dialog path (`TTDDialog/common.ts`) must behave identically. Mitigation: integration tests cover both paths; the shared `normalizeMermaidBrTags` helper enforces consistency.
- **Performance**: `.map()` over skeleton elements on every import adds negligible overhead — the arrays are small and the operation is a simple string replace.

### Impact

- **Files**: `packages/excalidraw/components/App.tsx` (clipboard paste path), `packages/excalidraw/components/TTDDialog/common.ts` (TTD dialog path), `packages/excalidraw/mermaid.ts` (shared helper)
- **Behavior**: Mermaid node labels with `<br>` tags will now render as multi-line text
- **No breaking changes**: purely a rendering fix with no API changes
