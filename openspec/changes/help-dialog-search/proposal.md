## Why

The Excalidraw help dialog lists 70+ keyboard shortcuts across three sections (Tools, View, Editor), making it hard to quickly find a specific shortcut. Adding a search/filter input lets users instantly locate shortcuts by typing a keyword, reducing friction for both new and experienced users.

## What Changes

- Add a compact search input in the upper right corner of the dialog title bar (inline with the "Keyboard shortcuts" heading)
- Shortcuts not matching the search query are hidden in real-time as the user types
- Section headers are hidden when all their shortcuts are filtered out
- Matching text within shortcut labels is highlighted
- Clearing the input restores the full list
- Input is auto-focused when the dialog opens

## Capabilities

### New Capabilities

- `help-dialog-search`: Real-time filter/search input in the help dialog that narrows the displayed shortcuts by label text as the user types

### Modified Capabilities

- (none)

## Impact

- `packages/excalidraw/components/HelpDialog.tsx` — add search state and filtering logic
- `packages/excalidraw/components/HelpDialog.scss` — style the search input and highlight matches
- `packages/excalidraw/locales/en.json` — add placeholder/label string for the search input
