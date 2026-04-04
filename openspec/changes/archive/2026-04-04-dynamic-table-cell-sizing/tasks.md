## 1. Dynamic Column Width

- [x] 1.1 In `markdown-table.ts`, replace fixed `CELL_WIDTH = 150` with a `computeColumnWidths()` function that calculates per-column width as `max(MIN_CELL_WIDTH, longestCharCount * CHAR_WIDTH_ESTIMATE + CELL_PADDING)` across all rows including header
- [x] 1.2 Update `markdownTableToSkeletons()` to use `columnWidths[]` array for cell width and compute x-positions as prefix sums of preceding column widths

## 2. Tests

- [x] 2.1 Update `markdownTableToSkeletons` tests in `markdown-table.test.ts` — replace "uniform dimensions" test with per-column width tests: same-column cells share width, long-content column is wider than short-content column, minimum width is respected
- [x] 2.2 Add test for a table with one long cell — verify that column is wider and other columns remain at minimum width

## 3. Verification

- [x] 3.1 Run `yarn test:typecheck` to verify TypeScript compiles
- [x] 3.2 Run tests to ensure all pass
- [x] 3.3 Run `yarn build` to build the app
