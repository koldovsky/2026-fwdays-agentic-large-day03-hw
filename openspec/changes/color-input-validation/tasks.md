# Tasks: Color Input Validation Feedback

## Implementation Tasks

- [x] Task 1: Add `isInvalid` state to `ColorInput` component
  - Add `useState<boolean>(false)` for tracking error state
  - Update `changeColor()` to set `isInvalid` based on `normalizeInputColor()` result
  - Reset `isInvalid` on blur and when color prop changes

- [x] Task 2: Apply conditional CSS class and accessibility attributes
  - Add `color-picker-input--error` class when `isInvalid` is true (via `clsx`)
  - Add `aria-invalid` attribute reflecting `isInvalid` state

- [x] Task 3: Add inline error message element
  - Wrap input in `color-picker__input-wrapper` div for positioning context
  - Render error message `<div>` conditionally when `isInvalid` is true
  - Use `t("colorPicker.invalidColor")` for i18n-compliant text
  - Add `role="alert"` for screen reader announcements

- [x] Task 4: Add error styles in SCSS
  - Add `.color-picker-input--error` rule with `border-color: #e03131`
  - Add `.color-picker__input-wrapper` with `position: relative` for error positioning
  - Add `.color-picker__input-error` for error message text styling and absolute positioning

- [x] Task 5: Add i18n key
  - Add `"invalidColor": "Invalid hex color"` to `colorPicker` section in `en.json`

- [x] Task 6: Write unit tests
  - Create `__tests__/ColorInput.test.tsx` with tests for `normalizeInputColor()`
  - Test valid inputs: 3-digit, 6-digit, 8-digit hex, with/without #, transparent
  - Test invalid inputs: non-hex chars, wrong lengths (1, 2, 5, 7, 9+), empty string

- [x] Task 7: Verify existing tests and build pass
  - Run `yarn test:typecheck` to confirm type safety
  - Run `yarn build` to confirm build passes
  - Run `yarn test:app` to confirm no regressions (pre-existing failures only)
