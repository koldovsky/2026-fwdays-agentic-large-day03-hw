## 1. Tool transition tracking

- [x] 1.1 Add transient app-level state/flag in `packages/excalidraw/components/App.tsx` to record when a drawing tool is deactivated to selection via `Esc`.
- [x] 1.2 Set and clear this flag in keyboard handling and tool-switch paths so it only represents the immediate post-`Esc` transition.

## 2. Feedback trigger implementation

- [x] 2.1 In canvas pointer interaction flow (`handleCanvasPointerDown` and/or related drag path), detect the first qualifying draw-like interaction after the `Esc` transition.
- [x] 2.2 Trigger `setToast` with a new localized message key and ensure default selection behavior still runs unchanged.
- [x] 2.3 Add one-shot/rate-limit guard so repeated drags do not spam the same feedback.

## 3. Localization and UI wiring

- [x] 3.1 Add the new toast message key to `packages/excalidraw/locales/en.json`.
- [x] 3.2 Verify the toast renders through existing `LayerUI`/`Toast` flow without additional component changes.

## 4. Tests and validation

- [x] 4.1 Add/extend tests in `packages/excalidraw/tests` (e.g., `tool.test.tsx` or `dragCreate.test.tsx`) for: draw tool -> `Esc` -> drag -> feedback shown.
- [x] 4.2 Add/extend tests asserting anti-spam behavior (feedback shown once per qualifying transition).
- [x] 4.3 Run `yarn test:typecheck` and targeted test files for touched behavior.
