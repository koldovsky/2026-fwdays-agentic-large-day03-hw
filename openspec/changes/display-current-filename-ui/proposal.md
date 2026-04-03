## Why

Users need quick visibility into the currently opened file name so they can decide whether to save, rename, or continue editing. This is especially important when working across multiple tabs or imported files where identity is not obvious from the canvas alone.

## What Changes

- Add a visible filename label in the editor UI for the currently active document.
- Define fallback behavior when the document has no explicit name (for example, untitled or default naming).
- Specify when the label updates (new file, open/import, save as, and rename flows).
- Ensure consistent behavior across desktop and mobile layouts without overlapping existing controls.

## Capabilities

### New Capabilities
- `current-filename-display`: Display and update the active document filename in the UI with a clear fallback for unnamed files.

### Modified Capabilities
- None.

## Impact

- Affected code in UI header/top bar components and app state selectors that expose current file metadata.
- Minimal risk to persistence logic; primary impact is presentation and event-to-label synchronization.
- No new external dependencies expected.
