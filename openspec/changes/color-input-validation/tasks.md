# Tasks: Color Input Validation Feedback

## Implementation Tasks

- [x] Task 1: Add `isInvalid` state to `ColorInput` component
  - Add `useState<boolean>(false)` for tracking error state
  - Update `changeColor()` to set `isInvalid` based on `normalizeInputColor()` result
  - Reset `isInvalid` on blur

- [x] Task 2: Apply conditional CSS class for error state
  - Add `color-picker-input--error` class when `isInvalid` is true
  - Use `clsx` for conditional class application

- [x] Task 3: Add error border style in SCSS
  - Add `.color-picker-input--error` rule with `border-color: var(--color-danger)` or a red color
  - Ensure the style respects both LTR and RTL layouts

- [x] Task 4: Verify existing tests pass
  - Run `yarn test:app` to confirm no regressions
  - Run `yarn test:typecheck` to confirm type safety
