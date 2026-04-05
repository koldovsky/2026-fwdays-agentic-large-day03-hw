## Why

The main toolbar shows a keyboard shortcut as a superscript on each tool button for quick discovery. The hand (pan) tool is the only primary tool without that label, even though **H** works ([excalidraw/excalidraw#11020](https://github.com/excalidraw/excalidraw/issues/11020)). That breaks visual consistency and makes the shortcut harder to discover.

## What Changes

- Show the **H** shortcut label on the hand tool button in the desktop/main toolbar, using the same superscript pattern as other tools.
- Align implementation with existing `ToolButton` / `keyBindingLabel` behavior used for other shapes (no change to actual shortcut handling).

## Capabilities

### New Capabilities

- `toolbar-shortcut-labels`: Toolbar primary tools that expose a keyboard shortcut must display that shortcut as the icon superscript consistently, including the hand tool when a letter or number is defined in tool metadata.

### Modified Capabilities

- (none — no existing spec files in `openspec/specs/`; this introduces the first capability spec for this project.)

## Impact

- **Code**: `packages/excalidraw/components/Actions.tsx` (`ShapesSwitcher` — `keybindingLabel` currently forced to `undefined` for `value === "hand"`). Possibly verify `HandButton` / mobile paths if they should stay unchanged (mobile often hides labels by design).
- **Tests**: Snapshot or component tests covering toolbar `keyBindingLabel` if present; otherwise manual/visual check.
- **APIs / dependencies**: None.
