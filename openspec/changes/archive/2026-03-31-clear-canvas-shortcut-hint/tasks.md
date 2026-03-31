## 1. Implementation

- [x] 1.1 Add `shortcut={getShortcutFromShortcutName("clearCanvas")}` prop to the `ClearCanvas` component's `DropdownMenuItem` in `packages/excalidraw/components/main-menu/DefaultItems.tsx`

## 2. Verification

- [x] 2.1 Run `yarn test:typecheck` to confirm no type errors in `packages/excalidraw`
- [x] 2.2 Run `yarn test:update` to verify tests pass and update any snapshots affected by the new shortcut hint
- [x] 2.3 Run `yarn fix` to ensure formatting and linting pass
