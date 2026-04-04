## Context

Excalidraw's `insertClipboardContent()` in `App.tsx` processes pasted content through a chain of detectors: spreadsheet (TSV/CSV), SVG, Excalidraw elements, Mermaid diagrams, embeddable URLs, and finally plain text as fallback. Markdown tables currently fall through to the plain text handler, creating separate text elements per line.

The Mermaid paste handler demonstrates the exact pattern we need: parse text → generate `ExcalidrawElementSkeleton[]` → `convertToExcalidrawElements()` → `addElementsFromPasteOrLibrary()`.

## Goals / Non-Goals

**Goals:**
- Detect markdown table syntax on paste and render as a visual table
- Use existing Excalidraw primitives (rectangles with bound text) — no new element types
- Group all table elements so the table moves as one unit
- Uniform cell sizes across the entire table

**Non-Goals:**
- Editable table cells after paste (treat as static grouped elements)
- New `table` element type in Excalidraw's type system
- Supporting nested tables or complex markdown (colspan, rowspan, HTML within cells)
- Differentiating header row styling from data rows

## Decisions

### 1. Insertion point: between spreadsheet and SVG detection

**Decision**: Add markdown table check at `App.tsx:~3703`, after `tryParseSpreadsheet` and before SVG detection.

**Rationale**: Spreadsheet detection handles TSV/CSV for chart generation — it must run first since its format overlaps. Markdown tables use pipe `|` delimiters which won't match TSV/CSV. Placing it before SVG/Mermaid/embeddable keeps the specificity order correct.

**Alternative considered**: After Mermaid detection — rejected because it would delay table handling unnecessarily and Mermaid has no format overlap with markdown tables.

### 2. Element composition: rectangles with bound text labels

**Decision**: Each cell is a `rectangle` skeleton with a `label: { text }` property. This leverages Excalidraw's existing container-with-bound-text system.

**Rationale**: `ValidContainer` in `transform.ts` already supports `{ type: "rectangle", label: { text } }` — the `convertToExcalidrawElements` function handles text binding, measurement, and positioning automatically.

**Alternative considered**: Separate rectangle + text elements manually positioned — rejected because it duplicates logic already in `convertToExcalidrawElements` and doesn't benefit from auto text centering.

### 3. Uniform cell sizing

**Decision**: All cells have the same width and height. Width = `max(150, longest cell text width + padding)`. Height = fixed per font size.

**Rationale**: User explicitly requested uniform sizing. Simplifies layout calculation — just `col * cellWidth` and `row * cellHeight`.

### 4. Grouping via `groupIds`

**Decision**: Assign a shared `groupId` to all generated elements so the table is selected and moved as a unit.

**Rationale**: Excalidraw's group system already handles this. Each element skeleton receives the same `groupIds: [tableGroupId]`.

### 5. New file `markdown-table.ts`

**Decision**: Create `packages/excalidraw/markdown-table.ts` with three exports: `isMarkdownTable()`, `parseMarkdownTable()`, `markdownTableToSkeletons()`.

**Rationale**: Keeps the parser isolated and testable. Follows the pattern of `mermaid.ts` (detection) and `charts/charts.parse.ts` (parsing).

## Risks / Trade-offs

- **[Conflict with spreadsheet parser]** → Markdown tables use `|` which doesn't match TSV/CSV delimiters (tab, comma, semicolon). No conflict expected. Spreadsheet check runs first as a safety net.
- **[False positive detection]** → A single-row pipe-separated text could be misdetected. Mitigation: require both a header row AND a separator row (`|---|`) for detection.
- **[Cell text overflow]** → Very long cell content could make the table excessively wide. Mitigation: cap cell width at a reasonable maximum and let text wrap.
