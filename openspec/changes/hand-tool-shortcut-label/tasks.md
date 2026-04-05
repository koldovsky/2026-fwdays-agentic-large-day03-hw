## 1. Implementation

- [x] 1.1 In `packages/excalidraw/components/Actions.tsx` (`ShapesSwitcher`), remove the special case that sets `keybindingLabel` to `undefined` when `value === "hand"`, so hand uses the same `numericKey || letter` expression as other tools (yielding **H** from `shapes.tsx` metadata).
- [x] 1.2 Manually verify desktop toolbar: hand tool shows **H** superscript like neighboring tools; **H** still activates hand tool.

## 2. Verification

- [x] 2.1 Run `yarn test:typecheck` and fix any TypeScript issues.
- [x] 2.2 Run `yarn test:update` (or targeted tests if any cover `toolbar-hand` / `ToolButton` labels) and accept snapshot updates only if the change is expected.
