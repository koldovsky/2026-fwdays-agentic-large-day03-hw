## 1. Fix key-repeat flickering in actionCanvas.tsx

- [x] 1.1 In `actionToggleHandTool`'s `keyTest` (`packages/excalidraw/actions/actionCanvas.tsx`), add `!event.repeat` so the toggle only fires on the initial keydown

## 2. Add isHoldingH hold-state tracking in App.tsx

- [x] 2.1 Declare module-level `let isHoldingH: boolean = false` alongside `isHoldingSpace` in `packages/excalidraw/components/App.tsx`
- [x] 2.2 In `onKeyDown`, when `event.key === KEYS.H` and `!event.repeat` and `!isHandToolActive(this.state)`, set `isHoldingH = true`
- [x] 2.3 In `onKeyUp`, when `event.key === KEYS.H` and `isHoldingH` is `true` and the hand tool is currently active, dispatch the `toggleHandTool` action to restore the previous tool, then set `isHoldingH = false`
- [x] 2.4 In `onBlur`, reset `isHoldingH = false` alongside the existing `isHoldingSpace = false` reset

## 3. Tests

- [x] 3.1 Add regression test: holding `H` (simulated key-repeat events) keeps the hand tool active without flickering
- [x] 3.2 Add regression test: releasing `H` after a hold restores the previously active tool
- [x] 3.3 Add regression test: tapping `H` once (keydown + keyup, no repeat) toggles hand tool on and does NOT restore on keyup
- [x] 3.4 Run `yarn test:update` and verify all tests pass
