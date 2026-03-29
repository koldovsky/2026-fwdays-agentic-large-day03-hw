## Why

When importing Mermaid diagrams with `<br>` tags in node labels (e.g., `"User Registration<br>Process"`), the tags are rendered as literal text instead of line breaks. This is a data fidelity bug that makes multi-line Mermaid node labels unusable in Excalidraw.

## What Changes

- Convert `<br>` and `<br/>` HTML tags to `\n` newline characters when processing skeleton elements from `@excalidraw/mermaid-to-excalidraw`
- Fix applies to two import paths: clipboard paste (in `App.tsx`) and the Text-to-Diagram dialog (in `TTDDialog/common.ts`)

## Capabilities

### New Capabilities

- `mermaid-br-tag-normalization`: Normalizes `<br>` HTML tags in Mermaid skeleton element text into newline characters before converting to Excalidraw elements

### Modified Capabilities

<!-- No existing spec-level requirement changes -->

## Impact

- **Files**: `excalidraw-app/App.tsx` (clipboard paste path), `packages/excalidraw/components/TTDDialog/common.ts` (TTD dialog path)
- **Behavior**: Mermaid node labels with `<br>` tags will now render as multi-line text
- **No breaking changes**: purely a rendering fix with no API changes