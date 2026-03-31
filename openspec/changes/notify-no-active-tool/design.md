# Design: Notify User When No Shape Tool Is Active

## Context

Excalidraw's canvas interaction model routes pointer events through `handleCanvasPointerDown()` in `App.tsx`, dispatching to tool-specific handlers based on `appState.activeTool.type`. There is no `"none"` tool state — pressing Escape always reverts the active tool to `preferredSelectionTool` (either `"selection"` or `"lasso"`) via the `actionDeselect` action in `packages/excalidraw/actions/actionDeselect.ts`.

The deselect flow works as follows: `actionDeselect.keyTest` checks that the Escape key was pressed and that the current state warrants a deselect (tool is not already the preferred selection tool, or elements are selected, etc.). When triggered, `actionDeselect.perform` calls `getNextActiveTool()` which returns the `preferredSelectionTool`, and the action returns a new `appState` with the updated `activeTool`, cleared selections, and related state.

Currently, no feedback is provided to the user when a shape tool is deactivated. The toolbar updates to highlight the selection tool, but this can be easy to miss.

The codebase already has a mature toast notification system (`Toast` component at `packages/excalidraw/components/Toast.tsx`, `appState.toast`, `setToast()`) used throughout for clipboard operations, file saves, link copies, and more. Actions set toasts by including a `toast` property in the returned `appState` (e.g., `actionStyles.ts:63`, `actionExport.tsx:402`, `actionClipboard.tsx:163`). This makes adding a contextual hint in `actionDeselect` straightforward and consistent with existing patterns.

## Goals / Non-Goals

**Goals:**

- Show a brief, non-intrusive toast notification when the user presses Escape to deactivate a shape tool, triggered from `actionDeselect.perform` in `packages/excalidraw/actions/actionDeselect.ts`
- Reuse the existing Toast infrastructure with no new components or state — add `toast` to the returned `appState` like other actions do
- Allow repeated Escape presses to refresh the toast timer (not stack or duplicate)
- Add a localized message via `toast.toolDeactivated` in `packages/excalidraw/locales/en.json`

**Non-Goals:**

- Detecting "failed draw gestures" on pointer-up (the feedback is provided at deselect time, not after a confused drag)
- Changing the Escape key behavior or tool deactivation flow beyond adding the toast
- Adding a persistent "no tool" indicator to the toolbar (the toolbar already highlights the active tool)
- Introducing a new `"none"` tool type to the `ToolType` union

## Decisions

### 1. Trigger point: `actionDeselect.perform` on shape tool deactivation

**Decision**: Add the toast in `actionDeselect.perform` when the deactivated tool is a shape tool (not in `NON_SHAPE_TOOLS`). Define `NON_SHAPE_TOOLS` as a set containing `"selection"`, `"lasso"`, `"eraser"`, `"hand"`, and `"laser"` — all tools that are not used for creating shapes. Check `appState.activeTool.type` (the tool being deactivated) against this set.

**Alternatives considered**:

- _Detect at pointer-up on empty canvas_: Would only notify after a failed draw attempt, not at the moment of deactivation. Less immediate feedback and more complex detection logic.
- _Detect at pointer-down_: Too early — the user might intend a selection or lasso operation.

### 2. Feedback mechanism: toast notification via `appState.toast`

**Decision**: Return `toast: { message: t("toast.toolDeactivated"), duration: TOAST_DURATION }` in the `appState` from `actionDeselect.perform`, where `TOAST_DURATION` is a named constant (3000ms). This follows the exact same pattern as `actionStyles.ts:63` (`toast: { message: t("toast.copyStyles") }`) and `actionExport.tsx:402` (`toast: { message: t("toast.fileSaved"), duration: 3000 }`).

**Alternatives considered**:

- _Tooltip near cursor_: Would require new positioning logic and a new component. Toast is already built and consistent with the rest of the UI.
- _Cursor change_: Cursor already changes per tool, but users may not notice the difference. Toast is more explicit.
- _Inline hint on canvas_: Too visually heavy for an edge-case hint.

### 3. Repeated Escape: refresh toast timer via `keyTest` modification

**Decision**: Modify `actionDeselect.keyTest` to also return `true` when `appState.toast !== null` and the tool is already the preferred selection tool. This allows a repeated Escape press to re-trigger `perform`, which will return a new `toast` object with the same message, causing the `Toast` component's `useEffect` (keyed on `[message, duration]`) to reset the auto-dismiss timer. The single-slot `appState.toast` model ensures no stacking.

**Alternatives considered**:

- _Ignore repeated Escape_: The current `keyTest` blocks `actionDeselect` when already in selection mode. This means the toast cannot be refreshed, which is acceptable but less polished.
- _Separate timer management_: Adding instance-level throttle state to `App.tsx` is more complex and inconsistent with the action-based architecture.

### 4. Named constant for magic number

**Decision**: Define `const TOAST_DURATION = 3000` at the top of `actionDeselect.ts` alongside the `NON_SHAPE_TOOLS` set. This replaces the magic number `3000` and makes the duration reusable and self-documenting.

### 5. Localization

**Decision**: Add a new i18n key `toast.toolDeactivated` with value `"Tool deactivated — select a shape to draw"` in `packages/excalidraw/locales/en.json`. This follows the existing `toast.*` key convention. Other locales fall back to English until translated.

## Risks / Trade-offs

- **False positives** — The toast fires whenever Escape deactivates a shape tool, even if the user intentionally wanted to switch to selection. This is acceptable because the toast is short-lived (3s), non-blocking, and uses `role="status"` (polite announcement for screen readers).
- **keyTest broadening** — Adding `appState.toast !== null` to `keyTest` means `actionDeselect` can fire when already in selection mode. This only affects the `toast` property in the returned state; the `activeTool`, `selectedElementIds`, and other state are already at their deselected values, so re-applying them is a no-op.
- **Performance** — Returning an additional `toast` property in the action result is negligible. No new event listeners, timers, or component instances are created.
