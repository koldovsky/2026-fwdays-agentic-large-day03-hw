## Why

On mobile devices, newly created text elements in Excalidraw are positioned and sized based on desktop assumptions — the text box extends horizontally beyond the visible viewport, forcing users to manually reposition and resize it before they can read or edit their content. This friction is particularly acute on phones and narrow screens, where users expect content to fit within the current view.

## What Changes

- When a text element is created or committed on a mobile viewport (screen width ≤ 768 px), automatically reposition and resize it so it fits within the current visible viewport bounds.
- The repositioning logic snaps the element's `x` position and constrains its `width` to the viewport width (with a small horizontal margin), then re-centers it vertically if needed so the element is fully visible.
- Behaviour is unchanged on desktop resolutions (screen width > 768 px).

## Capabilities

### New Capabilities

- `mobile-text-fit-viewport`: On mobile viewports, newly created/committed text elements are automatically repositioned and resized to fill the visible viewport width, ensuring the text is immediately readable without manual adjustment.

### Modified Capabilities

_(none — desktop text element behaviour is untouched)_

## Non-goals

- Changing the font size, line height, or any other text style property.
- Affecting existing text elements that were created before this feature.
- Modifying behaviour on desktop/tablet resolutions (> 768 px width).
- Auto-wrapping or reflowing text content itself — only the element container is repositioned/resized.
- Persisting a "mobile mode" preference or making this configurable via settings.

## Impact

- `packages/excalidraw/` — text element creation/commit path (likely `textWysiwyg.tsx` or the action that finalises text editing).
- `packages/excalidraw/` — viewport/scene coordinate helpers to convert screen bounds to scene coords.
- No new npm dependencies required.
- No API surface changes; the feature is entirely internal to the editor interaction layer.
