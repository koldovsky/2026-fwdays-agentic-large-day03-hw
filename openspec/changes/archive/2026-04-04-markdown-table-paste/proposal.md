## Why

When users paste a markdown table (e.g. from GitHub, docs, or any markdown source) into Excalidraw, it renders as plain text lines — each row becomes a separate text element showing raw pipe characters and dashes. Users expect a visual table with cells and grid lines, rendered in Excalidraw's hand-drawn style.

## What Changes

- Add markdown table detection in the clipboard paste pipeline (`insertClipboardContent`)
- Parse markdown table syntax into structured data (headers + rows)
- Generate Excalidraw elements (rectangles with bound text labels) composing a visual table
- Group all generated elements so the table moves as a single unit
- Insert the detection between existing spreadsheet and SVG checks in the paste flow

## Capabilities

### New Capabilities
- `markdown-table-paste`: Detect and convert pasted markdown tables into visual Excalidraw table elements composed of grouped rectangles with text labels

### Modified Capabilities

## Impact

- `packages/excalidraw/components/App.tsx` — new branch in `insertClipboardContent()` between spreadsheet and SVG detection (~line 3703)
- New file `packages/excalidraw/markdown-table.ts` — parser and element skeleton generator
- New file `packages/excalidraw/markdown-table.test.ts` — unit tests
- Uses existing `convertToExcalidrawElements` and `addElementsFromPasteOrLibrary` APIs — no new dependencies
