## Context

The `markdownTableToSkeletons()` function in `markdown-table.ts` currently uses fixed `CELL_WIDTH = 150` and `CELL_HEIGHT = 50` for all cells. When cell text exceeds ~12 characters, Excalidraw's bound text auto-wraps inside the rectangle, causing text to overflow vertically into the row below.

## Goals / Non-Goals

**Goals:**
- Each column width adapts to its longest cell content
- Cells within a column share the same width; cells within a row share the same height
- Tables with mixed short and long content render cleanly without overlap

**Non-Goals:**
- Text measurement using Excalidraw's font metrics (too complex for skeleton generation — use character count heuristic)
- Per-cell unique sizing
- Max width cap with text wrapping (keep it simple — just widen the column)

## Decisions

### 1. Per-column width based on character count heuristic

**Decision**: For each column, find the longest cell text (by character count) across all rows including header. Compute width as `max(MIN_CELL_WIDTH, longestCharCount * CHAR_WIDTH_ESTIMATE + CELL_PADDING)`. Use `MIN_CELL_WIDTH = 100`, `CHAR_WIDTH_ESTIMATE = 10`, `CELL_PADDING = 40`.

**Rationale**: Excalidraw's `measureText()` requires a font string and is synchronous but adds a dependency on font state. A character-count heuristic is simpler and sufficient — the bound text system handles minor mismatches by wrapping gracefully. The constants are tuned for the default Excalidraw font size (20px).

**Alternative considered**: Using `measureText()` from `@excalidraw/element` — rejected because it requires knowing the current font family/size from app state, which `markdownTableToSkeletons` doesn't have access to. Would require threading font config through the call chain.

### 2. Fixed row height (keep current behavior)

**Decision**: Keep `CELL_HEIGHT = 50` for all rows. With dynamic column widths, text should fit without wrapping in most cases.

**Rationale**: Row height variation adds layout complexity. Since column width now adapts to content, the main overflow issue is resolved. Edge cases with extremely long text in a single cell will wrap within a wider column rather than overflow.

### 3. Column widths stored as array, x-positions computed from prefix sum

**Decision**: Compute `columnWidths: number[]` array, then derive each cell's x-position as the sum of widths of all preceding columns.

**Rationale**: Simple and correct. Each column's x offset = `columnWidths[0] + ... + columnWidths[colIdx - 1]`.

## Risks / Trade-offs

- **[Character count heuristic inaccuracy]** → Some characters are wider than others (e.g. "W" vs "i"). Mitigation: the 10px estimate is generous for the default font, and Excalidraw's bound text handles minor overflow by wrapping.
- **[Very wide tables]** → A column with 100+ character text will produce a very wide column. Acceptable — matches user expectation that the table should fit its content.
