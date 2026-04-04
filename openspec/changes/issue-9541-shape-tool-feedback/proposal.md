## Why

After the user selects a shape tool and presses Esc, Excalidraw returns to selection mode, but some users still expect “draw on drag” behavior. A drag on empty canvas performs box (or lasso) selection instead of creating a shape, which can feel like “nothing happened,” especially for first-time or infrequent users. This change documents and specifies a lightweight, non-intrusive hint aligned with [excalidraw/excalidraw#9541](https://github.com/excalidraw/excalidraw/issues/9541).

## What Changes

- When the active tool is **selection** or **lasso**, the user performs a **meaningful drag** on **empty canvas** (no element hit at pointer down), and other editing gestures are not in progress, the editor may show a **short, dismissible toast** explaining that a shape tool must be chosen to draw.
- The hint is shown **at most once per browser tab session** (e.g. via `sessionStorage`) to limit noise for experienced users, addressing maintainer concerns in the upstream thread that perpetual toasts would be distracting.
- Add or reuse an **i18n** string for the message (English source + locale entries per project convention).
- **No breaking changes** to public APIs; behavior is additive UX only.

## Capabilities

### New Capabilities

- `editor-selection-draw-hint`: User-visible feedback when a drag in selection-like modes on empty canvas likely reflects an attempt to draw without an active shape tool, including frequency caps and eligibility rules.

### Modified Capabilities

- _(none — no existing `openspec/specs/` baseline in this repository yet.)_

## Impact

- **Code**: Pointer lifecycle in the main editor app (typically `App.tsx` pointer-up path), small pure predicate module for testability, existing `setToast` / toast UI, locale JSON files.
- **Tests**: Unit tests for the predicate; optional integration test simulating pointer down/move/up.
- **Product / UX**: One-time-per-session messaging; must not fire during resize, crop, linear point edit, element hit, or when a new element is being created.
- **Upstream**: Optional contribution path to [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw); maintainers may prefer stronger reliance on cursor + selection rectangle alone ([discussion on #9541](https://github.com/excalidraw/excalidraw/issues/9541)).

## Pull request reference

When opening a PR that implements this change, link **[excalidraw#9541](https://github.com/excalidraw/excalidraw/issues/9541)** and this OpenSpec folder: `openspec/changes/issue-9541-shape-tool-feedback/`.
