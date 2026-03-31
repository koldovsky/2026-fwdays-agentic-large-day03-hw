## Why

The Ctrl/Cmd+Delete keyboard shortcut to clear the canvas already works — it is registered in `shortcuts.ts`, handled in `App.tsx`, and displayed in both the Command Palette and the Help dialog. However, the "Clear Canvas" item in the main dropdown menu is the only shortcut-enabled menu item that **omits** its shortcut hint. Every peer item (Load, Save, Export Image, Help) shows its shortcut inline. This inconsistency makes the shortcut hard to discover for users who rely on the menu, undermining a feature that already exists.

Resolves [GitHub issue #10558](https://github.com/excalidraw/excalidraw/issues/10558).

## What Changes

- **Add `shortcut` prop to the `ClearCanvas` menu item** in `packages/excalidraw/components/main-menu/DefaultItems.tsx`. The single-line addition `shortcut={getShortcutFromShortcutName("clearCanvas")}` follows the identical pattern used by `LoadScene`, `SaveToActiveFile`, `SaveAsImage`, and `Help` in the same file.
- No new imports — `getShortcutFromShortcutName` is already imported at the top of `DefaultItems.tsx`.
- No new keybinding registration — `"clearCanvas"` already exists in `shortcutMap` (resolves to `CtrlOrCmd+Delete`).
- No behavioral change — the shortcut already fires; this only makes it **visible** in the menu.
- The hint is automatically hidden on mobile form factor by existing logic in `MenuItemContent`.

### Non-goals

- Adding a new keyboard shortcut.
- Changing Clear Canvas behavior or the confirmation dialog flow.
- Modifying shortcut registration in `shortcuts.ts` or key handling in `App.tsx`.

## Capabilities

### New Capabilities

- `clear-canvas-shortcut-hint`: Display the existing Ctrl/Cmd+Delete shortcut hint on the "Clear Canvas" dropdown menu item for discoverability.

### Modified Capabilities

_(none — no existing spec-level behavior is changing)_

## Impact

- **Code**: Single file change in `packages/excalidraw` (`DefaultItems.tsx`). No cross-package impact.
- **Tests**: Existing `shortcuts.test.tsx` covers the Ctrl+Delete behavior. Snapshot tests may need updating to reflect the new `shortcut` prop on the rendered menu item.
- **APIs / Dependencies**: None affected. The `DropdownMenuItem` component already supports the `shortcut` prop.
