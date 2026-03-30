## Why

The "Wrap text in a container" feature (GitHub issue [#6340](https://github.com/excalidraw/excalidraw/issues/6340)) is only accessible through the right-click context menu. Adding a keyboard shortcut (Alt+Shift+W / Option+Shift+W) makes this common operation faster and more discoverable for power users who prefer keyboard-driven workflows.

## What Changes

- Add a `keyTest` handler to the existing `actionWrapTextInContainer` action so it triggers on Alt+Shift+W
- Register a display shortcut string in the shortcuts map so the key combo appears in the context menu and help dialog
- Add `"wrapTextInContainer"` to the `ShortcutName` type union so the shortcut system recognizes it

## Capabilities

### New Capabilities

- `wrap-text-shortcut`: Keyboard shortcut (Alt+Shift+W) to wrap selected text element(s) in a rectangle container, matching the existing context menu action

### Modified Capabilities

_(none — no existing spec-level requirements change; this adds a new input path to an existing action)_

## Impact

- **Code**: `packages/excalidraw/actions/actionBoundText.tsx` (add `keyTest`), `packages/excalidraw/actions/shortcuts.ts` (add shortcut display string and type)
- **APIs**: No public API changes
- **Dependencies**: None
- **Systems**: Keyboard event handling in `ActionManager.handleKeyDown`
