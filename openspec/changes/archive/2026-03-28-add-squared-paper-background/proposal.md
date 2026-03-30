## Why

Users want a notebook-style squared paper background for handwriting and math-heavy diagrams. The existing grid toggle is aimed at snapping and on-canvas guidance, but it does not provide a persistent paper-style background or satisfy export expectations for this workflow.

## What Changes

- Add a canvas background pattern option for squared paper in addition to the current flat background color.
- Keep the new paper background independent from the existing grid/snapping mode so users can choose either or both.
- Persist the selected background pattern in app state and include it anywhere canvas background presentation is expected to remain consistent.
- Render the squared paper pattern in export output when background export is enabled.

## Capabilities

### New Capabilities
- `canvas-background-patterns`: Allow the canvas to use a patterned background, starting with a squared paper option that behaves consistently in the editor and exports.

### Modified Capabilities

## Impact

- Affected areas include canvas background controls, app state defaults and serialization, scene rendering, export rendering, and related tests.
- No new external dependencies are required.
- Public behavior changes for consumers that read or write Excalidraw app state because a new background presentation field will need to round-trip safely.