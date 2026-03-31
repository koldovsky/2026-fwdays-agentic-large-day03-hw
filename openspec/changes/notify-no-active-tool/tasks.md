# Tasks: Notify User When No Shape Tool Is Active

## 1. Localization

- [x] 1.1 Add i18n key `toast.toolDeactivated` with English translation (e.g., "Tool deactivated — select a shape to draw") in `packages/excalidraw/locales/en.json` under the existing `toast` object (after `toast.elementLinkCopied`)

## 2. Core Implementation in `actionDeselect`

- [x] 2.1 Define a `NON_SHAPE_TOOLS` constant (Set or array of `"selection"`, `"lasso"`, `"eraser"`, `"hand"`, `"laser"`) near the top of `packages/excalidraw/actions/actionDeselect.ts`
- [x] 2.2 Define a `TOAST_DURATION` constant (`3000`) near the top of `packages/excalidraw/actions/actionDeselect.ts`, replacing any magic numbers for the toast duration
- [x] 2.3 Import `t` from `"../i18n"` in `actionDeselect.ts`
- [x] 2.4 In `actionDeselect.perform`: after computing `activeTool` via `getNextActiveTool()`, check whether `appState.activeTool.type` (the tool being deactivated) is NOT in `NON_SHAPE_TOOLS`; if so, include `toast: { message: t(TOOL_DEACTIVATED_TOAST_MESSAGE), duration: TOAST_DURATION }` in both `appState` return branches (editing-group branch and default branch); otherwise preserve `appState.toast` (do not clobber unrelated toasts)
- [x] 2.5 In `actionDeselect.keyTest`: add an additional OR condition so that `actionDeselect` also triggers when `appState.toast?.message === t(TOOL_DEACTIVATED_TOAST_MESSAGE)` (allowing repeated Escape to refresh the tool-deactivated toast timer without triggering on unrelated toasts)

## 3. Testing in `tool.test.tsx`

- [x] 3.1 Add a `describe("Esc key tool deactivation toast", ...)` block in `packages/excalidraw/tests/tool.test.tsx` with the shared `h`, `excalidrawAPI`, `Keyboard`, and `KEYS` setup
- [x] 3.2 Add a test: activate rectangle tool, press Escape, assert `h.state.toast` is not null and contains the `toast.toolDeactivated` message
- [x] 3.3 Add a test: press Escape without first activating a shape tool (already in selection), assert `h.state.toast` remains null (no toast for non-shape deselect)
- [x] 3.4 Add a test using `vi.useFakeTimers()`: activate rectangle, press Escape, advance timers by `<=3000ms`, assert `h.state.toast` becomes null (auto-dismiss verification). Clean up with `vi.useRealTimers()` in `afterEach`.
- [x] 3.5 Add a test for repeated Escape: press Escape twice with a short delay, advance timers to between the resets (e.g., 2000ms after second Escape), assert toast still exists, then advance past 3s from last Escape and assert toast is null (timer reset verification). Use `vi.useFakeTimers()` / `vi.useRealTimers()`.

## 4. Verification

- [x] 4.1 Run `yarn test:typecheck` to confirm no TypeScript errors
- [x] 4.2 Run `yarn test:update` to confirm all tests pass (including new ones)
- [x] 4.3 Run `yarn build` to confirm build succeeds
