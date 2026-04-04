## Why

When a markdown table cell contains long text, it overflows the fixed 150px cell width, causing text to wrap and overlap into adjacent rows. The table becomes visually broken and unreadable. Cell width should adapt to content so tables always render cleanly.

## What Changes

- Compute per-column width based on the longest cell content in that column (with padding), instead of using a fixed 150px width
- Compute row height dynamically to accommodate wrapped text if a max column width cap is hit
- Maintain uniform width per column and uniform height per row, but allow columns/rows to differ from each other

## Capabilities

### New Capabilities

### Modified Capabilities
- `markdown-table-paste`: Cell sizing changes from fixed 150px to dynamic per-column width based on content. The "uniform" requirement is relaxed — cells in the same column share width, cells in the same row share height, but different columns/rows may have different sizes.

## Impact

- `packages/excalidraw/markdown-table.ts` — replace fixed `CELL_WIDTH`/`CELL_HEIGHT` constants with dynamic sizing logic in `markdownTableToSkeletons()`
- `packages/excalidraw/markdown-table.test.ts` — update tests for dynamic sizing behavior
