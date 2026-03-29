## 1. Core Fix

- [x] 1.1 In `packages/excalidraw/components/App.tsx`, after `parseMermaidToExcalidraw()` returns `skeletonElements`, map over the array and replace `<br>`, `<br/>`, and `<br />` with `\n` in all text/label fields before calling `convertToExcalidrawElements()`
- [x] 1.2 In `packages/excalidraw/components/TTDDialog/common.ts`, apply the same normalization to `elements` after `parseMermaidToExcalidraw()` returns and before calling `convertToExcalidrawElements()`

## 2. Tests

- [x] 2.1 Add a test in `packages/excalidraw/components/TTDDialog/common.test.ts` verifying that `<br>` in a node label becomes `\n` in the resulting element text
- [x] 2.2 Add a test covering `<br/>` and `<br />` variants
- [x] 2.3 Verify existing Mermaid tests still pass: `yarn test packages/excalidraw/mermaid.test.ts --watch=false`

## 3. Snapshot Updates

- [x] 3.1 Run `yarn test:update` to regenerate any affected snapshots (e.g., `MermaidToExcalidraw.test.tsx.snap`)
