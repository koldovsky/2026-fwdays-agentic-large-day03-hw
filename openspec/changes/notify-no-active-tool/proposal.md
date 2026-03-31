## Why

When a user selects a shape tool (rectangle, ellipse, diamond, arrow, etc.) and immediately presses Escape, the tool silently reverts to the selection tool via `actionDeselect` in `packages/excalidraw/actions/actionDeselect.ts`. The user receives no feedback that the tool was deactivated. If they then try to draw on the canvas, nothing happens and no explanation is provided. This creates confusion, especially for new users who may not realize the Escape key deactivated their tool. Adding a brief toast notification at the moment of deactivation would close this feedback gap. (Ref: [GitHub Issue #9541](https://github.com/excalidraw/excalidraw/issues/9541))

## What Changes

- Modify the `actionDeselect` perform handler in `packages/excalidraw/actions/actionDeselect.ts` so that when Escape deactivates a shape tool (any tool not in `NON_SHAPE_TOOLS`: `selection`, `lasso`, `eraser`, `hand`, `laser`), the returned `appState` includes a toast notification via the `toast` property
- Use the existing `Toast` component and `setToast()` / `appState.toast` infrastructure already used throughout Excalidraw (e.g., `actionStyles.ts`, `actionClipboard.tsx`, `actionExport.tsx`)
- Add a new i18n key `toast.toolDeactivated` in `packages/excalidraw/locales/en.json`
- Use a short auto-dismiss duration (3000ms via a `TOAST_DURATION` constant) so the notification is non-intrusive
- Modify `actionDeselect`'s `keyTest` to allow repeated Escape to refresh the toast timer when `appState.toast` is already present, rather than being blocked by the "already in selection" guard

## Capabilities

### New Capabilities

- `no-tool-draw-feedback`: Notify the user via toast when a shape tool is deactivated by the Escape key through `actionDeselect`, using the existing toast notification system and the `toast.toolDeactivated` i18n key in `locales/en.json`

### Modified Capabilities

<!-- No existing spec-level capabilities need requirement changes -->

## Impact

- **Code**: `packages/excalidraw/actions/actionDeselect.ts` — deselect perform handler and keyTest gating logic; `packages/excalidraw/locales/en.json` — new i18n key; `packages/excalidraw/tests/tool.test.tsx` — new test coverage
- **UX**: Adds a non-intrusive toast notification on Escape-triggered tool deactivation; no changes to existing drawing, pointer handling (`handleCanvasPointerDown`), or shortcut behavior
- **APIs**: No public API changes; the existing `AppState.toast` state mechanism is reused within the action return value
- **Dependencies**: None — uses only existing components (`Toast`, `appState.toast`, `t()` from `../i18n`)

## Risks

### 1. Toast spam on rapid Escape presses

**Risk**: A user rapidly pressing Escape could trigger repeated toast notifications, creating a distracting flicker as each press replaces the previous toast and resets the auto-dismiss timer.

**Mitigation**: The `appState.toast` model is single-slot (not a queue) — calling `setToast()` or returning `toast` in `appState` replaces any existing toast rather than stacking. Repeated Escape refreshes the timer via the modified `keyTest` in `actionDeselect.ts` but does not create additional toasts. The `TOAST_DURATION` constant (3000ms) ensures each toast is short-lived.

**Acceptance criteria**: Pressing Escape 5 times rapidly results in at most one visible toast that auto-dismisses 3 seconds after the last press.

### 2. Accessibility / screen-reader compatibility

**Risk**: The toast may not be announced by screen readers, or may be announced intrusively, depending on ARIA attributes.

**Mitigation**: The existing `Toast` component (`packages/excalidraw/components/Toast.tsx:61`) uses `role="status"`, which maps to `aria-live="polite"` per WAI-ARIA. This means screen readers will announce the message at the next convenient pause without interrupting the user. The close button already has `aria-label="close"`. No additional ARIA changes are needed for the `no-tool-draw-feedback` capability since it reuses the same component.

**Acceptance criteria**: Screen reader (VoiceOver / NVDA) announces the toast message without interrupting ongoing navigation; the toast is not announced when already dismissed.

### 3. Regressions in deselect behavior

**Risk**: Modifying `actionDeselect.ts` — specifically the `perform` return value and `keyTest` conditions — could introduce regressions in selection clearing, group editing exit, or eraser tool reversion.

**Mitigation**: The toast is added as an additional `toast` property in the returned `appState` object, which does not interfere with `activeTool`, `selectedElementIds`, `editingGroupId`, or `selectedLinearElement` handling. The `keyTest` change adds only one additional OR condition (`appState.toast !== null`) and does not alter the existing conditions. Existing tests in `packages/excalidraw/tests/selection.test.tsx` and `packages/excalidraw/tests/regressionTests.test.tsx` cover deselect/Escape flows and will catch regressions. New tests in `packages/excalidraw/tests/tool.test.tsx` specifically cover the toast trigger and timer behavior.

**Acceptance criteria**: All existing tests pass (`yarn test:update`); the `actionDeselect` keyTest still correctly handles group editing exit, linear element deselect, and eraser reversion paths.

### 4. i18n coverage for the new `toast.toolDeactivated` key

**Risk**: The new key is only added to `locales/en.json`; other locale files will show a missing-key fallback or the raw key string until translated.

**Mitigation**: Excalidraw's i18n system (`packages/excalidraw/i18n.ts`) falls back to English for missing keys, so untranslated locales will display the English string. The key follows the existing `toast.*` naming convention (alongside `toast.copyStyles`, `toast.fileSaved`, etc.), making it discoverable for translators. Community translation PRs can add the key to other locales incrementally.

**Acceptance criteria**: Switching to a non-English locale does not produce a raw key string or crash; the English fallback is displayed.
