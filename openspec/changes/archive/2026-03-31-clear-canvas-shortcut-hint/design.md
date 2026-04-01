## Context

The Excalidraw main dropdown menu renders several items via `DropdownMenuItem` components in `packages/excalidraw/components/main-menu/DefaultItems.tsx`. Each menu item that has a keyboard shortcut passes a `shortcut` prop, which the `DropdownMenuItem` renders as an inline hint via `MenuItemContent`. The `ClearCanvas` menu item is the only shortcut-enabled item that omits this prop, even though the shortcut (`CtrlOrCmd+Delete`) is already registered in `shortcuts.ts` and functional.

The existing pattern is straightforward: `shortcut={getShortcutFromShortcutName("<name>")}` where `<name>` is a key in `shortcutMap`. The function `getShortcutFromShortcutName` is already imported at the top of `DefaultItems.tsx`.

## Goals / Non-Goals

**Goals:**

- Display the Ctrl/Cmd+Delete shortcut hint on the "Clear Canvas" menu item, consistent with all other shortcut-enabled items.

**Non-Goals:**

- Adding or changing any keyboard shortcut behavior.
- Modifying the Clear Canvas confirmation dialog.
- Touching shortcut registration (`shortcuts.ts`) or key handling (`App.tsx`).
- Cross-package changes.

## Decisions

### Use `getShortcutFromShortcutName` with the existing `"clearCanvas"` key

**Rationale**: This is the identical approach used by `LoadScene`, `SaveToActiveFile`, `SaveAsImage`, and `Help` in the same file. It resolves to `CtrlOrCmd+Delete` and handles platform-specific rendering (Ctrl on Windows/Linux, Cmd on macOS). No alternative was considered because the established pattern is unambiguous and already proven across peer items.

### No new test cases needed

**Rationale**: The shortcut behavior is already tested in `shortcuts.test.tsx`. The visual hint is a presentational concern handled generically by `MenuItemContent` / `DropdownMenuItemContent.tsx`. Snapshot tests will automatically capture the new prop on the next `yarn test:update` run.

## Risks / Trade-offs

- **[Snapshot diff]** → Snapshot files will update to include the shortcut text in the rendered `ClearCanvas` menu item. Mitigation: run `yarn test:update` and review the diff to confirm it only adds the expected shortcut string.
- **[Mobile rendering]** → No risk. `MenuItemContent` already hides shortcut hints on phone form factor via existing conditional logic.
