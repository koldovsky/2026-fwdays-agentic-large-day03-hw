## Context

The ColorPicker hex code input (`ColorInput.tsx`) already uses `normalizeInputColor` from `@excalidraw/common` to validate input on every keystroke. This function returns `null` for invalid values. However, the component silently swallows that result: it updates only the local field-text state without any user-facing feedback when the value is invalid.

`ColorInput` is currently used in a single call site — `ColorPickerPopupContent` in `ColorPicker.tsx` — which passes `color={color || ""}`, so the `color` prop is always a string at runtime.

## Goals / Non-Goals

**Goals:**

- Provide clear visual feedback when an invalid color value is entered in the hex code input
- Use the existing `normalizeInputColor` function as the single source of validation truth
- Follow Excalidraw's existing i18n patterns for the error message
- Meet basic accessibility expectations for invalid form fields (ARIA attributes, live region)
- Support RTL layout for the error message
- Keep the change minimal and non-breaking

**Non-Goals:**

- Rewriting or extending the validation logic in `@excalidraw/common`
- Adding character-level input masking or filtering
- Showing validation errors while the user is still actively typing

## Decisions

### Decision 1: Error state triggers on blur, not on every keystroke

Show the error indicator only when the input loses focus (`onBlur`) and the current value is invalid. This avoids distracting the user while they are still typing a partial value like `ff00` (4 characters — not yet a valid 6-digit hex, but the user is mid-entry).

While the user types, `normalizeInputColor` still evaluates each change and applies valid colors immediately (existing behavior). The error state is purely visual feedback on blur.

### Decision 2: CSS class-based error styling on the parent container

Add an `is-invalid` CSS class to the `.color-picker__input-label` container. This provides:

- Red border on the input area
- Red color on the `#` prefix text

Excalidraw already styles picker controls with SCSS and state classes (`active`, `selected`, `focus-within`). Using a class on the same container keeps styling consistent with the rest of `ColorPicker.scss` and avoids inline style sprawl. The new styles must include `:root[dir="rtl"]` overrides to match the existing RTL patterns for `.color-picker-input`.

### Decision 3: Inline error message placement

The error message element needs to appear below the `.color-picker__input-label` grid container. Since `ColorInput` currently returns `<div className="color-picker__input-label">` as its root, the component must be wrapped in a React Fragment (or a thin wrapper `<div>`) so the error message is a sibling below the grid — not inside the grid, which would break the column layout.

The message uses `t("colorPicker.invalidColor")` for i18n support.

### Decision 4: Error state managed via local component state

Add an `isInvalid` boolean state to `ColorInput`. This is a UI-only concern and does not need to be in global AppState or Jotai atoms. The state is:

- Set to `true` on blur when `normalizeInputColor` returns `null` and the trimmed field text is non-empty
- Set to `false` when `normalizeInputColor` returns a valid color (during typing) or when the `color` prop changes (external color selection)
- Whitespace-only input (`" "`) is treated as effectively empty — no error

**Blur handler ordering:** The existing `onBlur` resets the field text to the `color` prop (last applied color). To validate based on what the user actually typed, the blur handler must capture the current field text into a local variable _before_ calling the state reset. Both `setIsInvalid(...)` and `setInnerValue(color)` are called in the same handler; React batches them into a single render cycle, so the component re-renders once with the error flag set and the display text reverted. The error border/message remain visible even though the text content has reverted.

### Decision 5: Accessibility

- `aria-invalid="true"` on the `<input>` while invalid; attribute removed entirely when valid (not set to `"false"`, since the absence is semantically cleaner and avoids screen readers announcing "not invalid")
- Stable `id` on the error message (generated via React's `useId()` hook — SSR-safe and unique per component instance) and `aria-describedby` on the `<input>` pointing to that `id` when invalid; `aria-describedby` removed when valid so assistive tech is not pointed at a hidden node
- `role="alert"` on the error message container — this implicitly sets `aria-live="assertive"`, which causes screen readers to announce the message immediately when it appears. We use `role="alert"` rather than `aria-live="polite"` because the error appears as a direct result of the user's action (blur) and should be communicated promptly.

### Decision 6: Component tests in a dedicated file

`colorInput.test.ts` today covers `normalizeInputColor` only. New RTL tests for `ColorInput` live in a separate `ColorInput.test.tsx` to mirror other component tests in `packages/excalidraw/tests/*.test.tsx` and to keep utility vs UI test concerns separate. The test file needs to provide the same context providers that `ColorInput` depends on (Jotai store for atoms, `EditorInterfaceContext`, i18n initialization).

## File Changes

- `packages/excalidraw/components/ColorPicker/ColorInput.tsx` — `isInvalid` state, blur handler, error message JSX, wrapper element for message placement, a11y attributes
- `packages/excalidraw/components/ColorPicker/ColorPicker.scss` — `.is-invalid` styles, error text styles, RTL overrides
- `packages/excalidraw/locales/en.json` — new key in the `colorPicker` object
- `packages/excalidraw/locales/*.json` (56 non-EN files) — same key with English string as placeholder
- `packages/excalidraw/tests/ColorInput.test.tsx` — new component tests with provider setup
