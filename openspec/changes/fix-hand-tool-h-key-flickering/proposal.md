## Why

When a user holds the `H` key to activate the hand/pan tool, the browser fires repeated `keydown` events, causing `actionToggleHandTool` to toggle on every repeat — rapidly switching between the hand tool and the previous tool, making smooth panning impossible. The fix eliminates the flickering and adds proper hold-to-activate semantics (like spacebar) so releasing `H` automatically restores the previous tool.

## What Changes

- Filter key repeat events in `actionToggleHandTool`'s `keyTest` so toggling only fires on the initial keydown, not on held-key repeats
- Introduce a module-level `isHoldingH` flag in `App.tsx` (mirroring the existing `isHoldingSpace` pattern)
- On `H` keydown (non-repeat, non-hand-active state): set `isHoldingH = true` and activate hand tool
- On `H` keyup: if `isHoldingH` is true and the hand tool is currently active, restore the previous tool and reset `isHoldingH = false`
- Reset `isHoldingH` in the `onBlur` handler alongside `isHoldingSpace`

## Capabilities

### New Capabilities
- `hand-tool-hold-key`: Hold-to-activate behavior for the hand tool via the `H` key — pressing activates the hand tool temporarily, releasing restores the previous tool (like the spacebar for panning)

### Modified Capabilities
<!-- No existing spec-level requirements are changing -->

## Impact

- **`packages/excalidraw/components/App.tsx`**: Add `isHoldingH` flag; update `onKeyUp` to handle `KEYS.H`; update `onBlur` to reset `isHoldingH`
- **`packages/excalidraw/actions/actionCanvas.tsx`**: Add `!event.repeat` guard to `actionToggleHandTool`'s `keyTest`
- No API changes, no breaking changes
