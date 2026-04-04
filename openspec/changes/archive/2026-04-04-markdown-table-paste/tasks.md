## 1. Markdown Table Parser

- [x] 1.1 Create `packages/excalidraw/markdown-table.ts` with `isMarkdownTable(text: string): boolean` — detect markdown table by checking for header row, separator row (`|---|`), and at least one data row
- [x] 1.2 Implement `parseMarkdownTable(text: string): { headers: string[], rows: string[][] }` — parse pipe-delimited rows, trim cells, skip separator row
- [x] 1.3 Implement `markdownTableToSkeletons(parsed, opts): ExcalidrawElementSkeleton[]` — generate rectangle skeletons with `label: { text }` for each cell, uniform dimensions, shared `groupIds`

## 2. Paste Pipeline Integration

- [x] 2.1 Add markdown table detection branch in `App.tsx` `insertClipboardContent()` between spreadsheet check (~line 3703) and SVG check — call `isMarkdownTable`, parse, generate skeletons, convert via `convertToExcalidrawElements`, and add via `addElementsFromPasteOrLibrary`

## 3. Tests

- [x] 3.1 Create `packages/excalidraw/markdown-table.test.ts` with unit tests for `isMarkdownTable` (valid tables, plain text with pipes, missing separator, single row)
- [x] 3.2 Add unit tests for `parseMarkdownTable` (standard table, whitespace trimming, varying column counts)
- [x] 3.3 Add unit tests for `markdownTableToSkeletons` (correct element count, uniform dimensions, groupIds, cell text values)

## 4. Verification

- [x] 4.1 Run `yarn test:typecheck` to verify TypeScript compiles
- [x] 4.2 Run `yarn test:update` to ensure all tests pass
- [x] 4.2 Run `yarn build` to build the app
