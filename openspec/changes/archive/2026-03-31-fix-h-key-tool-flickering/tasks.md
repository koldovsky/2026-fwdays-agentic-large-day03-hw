## 1. Remove H key from action system keyboard trigger

- [x] 1.1 In `packages/excalidraw/actions/actionCanvas.tsx`, remove the `keyTest` property from `actionToggleHandTool` so the action no longer fires on keyboard events (toolbar click path is unaffected)

## 2. Implement hold-to-activate in App.tsx

- [x] 2.1 In `packages/excalidraw/components/App.tsx`, add a module-level `let isHoldingH: boolean = false;` flag near the existing `isHoldingSpace` and `isPanning` flags (around line 590)
- [x] 2.2 In `onKeyDown`, add an H key handler: when `event.key === KEYS.H`, `!event.repeat`, `!event.altKey`, `!event[KEYS.CTRL_OR_CMD]`, and the hand tool is not already active, set `isHoldingH = true` and call `this.actionManager.executeAction(actionToggleHandTool)` to switch to the hand tool
- [x] 2.3 In `onKeyUp`, add an H key handler: when `event.key === KEYS.H` and `isHoldingH === true`, clear `isHoldingH = false` and call `this.actionManager.executeAction(actionToggleHandTool)` to restore the previous tool

## 3. Verify existing tests and add new test coverage

- [x] 3.1 Run existing tests (`yarn test:update`) to confirm no regressions in hand tool or keyboard shortcut behaviour
- [x] 3.2 Add a test case in the relevant test file (e.g. `packages/excalidraw/tests/`) asserting that simulating repeated H keydown events does not change the active tool after the first activation
- [x] 3.3 Add a test case asserting that the hand tool is restored to the previous tool after H keyup
- [x] 3.4 Add a test case asserting that the toolbar button still toggles the hand tool independently

## 4. Type check

- [x] 4.1 Run `yarn test:typecheck` and resolve any TypeScript errors introduced by the changes
