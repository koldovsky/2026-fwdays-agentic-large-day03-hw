## 1. Error State Logic

- [ ] 1.1 Add `isInvalid` boolean state to `ColorInput` component
- [ ] 1.2 In the blur handler: capture the current field text in a local variable, then determine validity (non-empty after trim AND `normalizeInputColor` returns `null` → invalid); set `isInvalid` accordingly; preserve the existing field-text reset to the last applied color
- [ ] 1.3 Clear `isInvalid` when a valid color is detected during the input-change callback
- [ ] 1.4 Clear `isInvalid` when the `color` prop changes (external selection resets error)

## 2. Visual Feedback

- [ ] 2.1 Add `is-invalid` CSS class to `.color-picker__input-label` container when `isInvalid` is true
- [ ] 2.2 Add SCSS rules for `.color-picker__input-label.is-invalid` (red border, red `#` prefix color)
- [ ] 2.3 Wrap the current `ColorInput` return value so the error message can be placed outside the grid container (e.g. a React Fragment or a thin wrapper `<div>`); add the error message element conditionally rendered when `isInvalid` is true
- [ ] 2.4 Style the error message: small font, red color, appropriate margin, RTL-aware alignment (mirror existing `:root[dir="rtl"]` patterns in `ColorPicker.scss`)

## 3. Accessibility

- [ ] 3.1 Set `aria-invalid="true"` on the hex `<input>` when `isInvalid` is true; remove the attribute entirely when valid (do not render `aria-invalid="false"`)
- [ ] 3.2 Give the error message a stable `id`; set `aria-describedby` on the `<input>` pointing to that `id` when `isInvalid` is true; remove `aria-describedby` when valid
- [ ] 3.3 Add `role="alert"` on the error message element so screen readers announce it immediately when it appears

## 4. Internationalization

- [ ] 4.1 Add a key under the `colorPicker` object in `packages/excalidraw/locales/en.json` for the error message (e.g. `"invalidColor": "Invalid hex color"`)
- [ ] 4.2 Use `t("colorPicker.invalidColor")` (or the chosen key) in the error message element
- [ ] 4.3 Add the same key to all 56 non-EN locale files under `packages/excalidraw/locales/` with the English string as a placeholder (a scripted update is recommended for consistency)

## 5. Tests

Spec scenario → task mapping:

| Spec scenario | Task |
|---|---|
| Valid hex on blur | 5.2 |
| Concrete invalid values (#9527) | 5.3 |
| Empty input — no error | 5.4 |
| Whitespace-only — no error | 5.5 |
| Error visible after blur text revert | 5.6 |
| Error clears on valid input | 5.7 |
| Error clears on external selection | 5.8 |
| Replacing invalid with invalid | 5.9 |
| Rapid blur without typing | 5.10 |
| `aria-invalid` and `aria-describedby` | 5.11 |
| `role="alert"` on error message | 5.11 |

- [ ] 5.1 Create `packages/excalidraw/tests/ColorInput.test.tsx`; wrap renders in the same provider setup used by sibling component tests (Jotai store, i18n, `EditorInterfaceContext`) so `useAtom`, `useEditorInterface`, and `t()` work
- [ ] 5.2 Test: no error indicators when a valid hex value is present on blur
- [ ] 5.3 Test: error border and error message appear on blur for at least `zzzzzz` and `12345`
- [ ] 5.4 Test: no error when field is empty on blur
- [ ] 5.5 Test: no error when field contains only whitespace on blur
- [ ] 5.6 Test: error border/message are visible after blur even though field text reverts to last applied color
- [ ] 5.7 Test: error clears immediately when user types a valid value
- [ ] 5.8 Test: error clears when `color` prop updates (simulating external selection)
- [ ] 5.9 Test: error persists when user replaces one invalid value with another and blurs
- [ ] 5.10 Test: no error when user focuses and immediately blurs without changing text
- [ ] 5.11 Test: `aria-invalid="true"`, `aria-describedby`, and `role="alert"` present when invalid; all three removed when valid
- [ ] 5.12 Keep `packages/excalidraw/tests/colorInput.test.ts` focused on `normalizeInputColor` only — no component tests there

## 6. Verification

- [ ] 6.1 Run `yarn test:typecheck` — no type errors
- [ ] 6.2 Run `yarn test:update` — all tests pass; update snapshots if legitimately changed
- [ ] 6.3 Run `yarn build` (or `yarn build:packages`) — production build succeeds
- [ ] 6.4 Run `yarn fix` — formatting and linting pass
- [ ] 6.5 Manual QA: open ColorPicker, blur after each value from the issue (`123456789`, `1`, `12`, `12345`, `1234567`, `zzzzzz`, `blue`); confirm `normalizeInputColor`-null values show error; confirm `blue` does not show error; confirm `ff0000` / `f00` are valid; confirm RTL layout looks correct
