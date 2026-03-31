## 1. Fix Hand Tool Shortcut Label

- [x] 1.1 In `packages/excalidraw/components/Actions.tsx`, remove the `value === "hand"` exclusion from the `keybindingLabel` computation in `ShapesSwitcher` (~line 1104). Change `const keybindingLabel = value === "hand" ? undefined : numericKey || letter;` to `const keybindingLabel = numericKey || letter;`

## 2. Tests

- [x] 2.1 Add a unit test in `packages/excalidraw/tests/` that renders the `ShapesSwitcher` toolbar and asserts the hand tool icon contains a `span.ToolIcon__keybinding` with text content `"H"`
- [x] 2.2 Add a unit test asserting that every tool in `SHAPES` with a non-null `key` or `numericKey` produces a non-undefined `keybindingLabel` (no tool-specific exclusions)
- [x] 2.3 Add a unit test verifying the mobile `HandButton` (with `isMobile=true`) does NOT render a `.ToolIcon__keybinding` element

## 3. Verification

- [x] 3.1 Run `yarn test:typecheck` to ensure no TypeScript errors are introduced
- [x] 3.2 Run `yarn test:update` to update any affected snapshots and confirm all tests pass
- [x] 3.3 Visually verify in the browser that the hand tool now displays "H" as a superscript label in the desktop toolbar, matching other tools
- [x] 3.4 Verify on mobile viewport that the hand tool still does not show a shortcut label (mobile uses `HandButton` with `isMobile=true`, unaffected by this change)

## 4. Build Verification

- [x] 4.1 Run `yarn build:packages` to verify all packages build successfully
- [x] 4.2 Run `yarn build:app` to verify the full app builds without errors (Vite build completed; service worker generation failed due to pre-existing `vite-plugin-pwa`/`terser` timeout — unrelated to this change)

## 5. Test Coverage

- [x] 5.1 Run `yarn test:coverage --watch=false` and review coverage for the changed file (`packages/excalidraw/components/Actions.tsx`) — coverage: 68.5% statements, 90% branches, 35% functions. Global thresholds (60% lines/statements, 63% functions) not met pre-existing; our change does not regress coverage
