# Proposal: Display Error Feedback for Invalid Hex Color Input

## Issue Reference

https://github.com/excalidraw/excalidraw/issues/9527

## Problem Statement

When a user enters an invalid hexadecimal color value in the ColorPicker input field, the input is silently ignored. No visual or textual feedback is provided, leaving users confused about why their color did not change. This violates basic UX principles for input validation.

## Proposed Solution

Add comprehensive error feedback to the `ColorInput` component:

1. **Visual indicator**: red border on the hex input when value is invalid
2. **Error message**: inline text below the input showing "Invalid hex color" (i18n-ready)
3. **Accessibility**: `aria-invalid` attribute on the input, `role="alert"` on the error message
4. **Recovery**: error clears on valid input or blur (reverts to last valid color)

## Scope

### In Scope

- Visual error indicator (red border) on the hex color input
- Inline error message below the input with i18n key
- Accessibility attributes (`aria-invalid`, `role="alert"`)
- Unit tests for color validation logic
- SCSS styling for error state and message

### Out of Scope

- Tooltip-style error popups
- Color format auto-correction or suggestions
- Support for named CSS colors beyond what tinycolor already handles
- Changes to the color validation logic itself (`normalizeInputColor`)

## Non-goals

- Do not modify the existing `normalizeInputColor()` function in `@excalidraw/common`
- Do not add validation to the color swatch picker (only the hex text input)
- Do not show errors for programmatic color changes (only user-typed input)

## Files Affected

| File | Change Type | Description |
|------|------------|-------------|
| `packages/excalidraw/components/ColorPicker/ColorInput.tsx` | Modified | Add `isInvalid` state, `aria-invalid`, error message element |
| `packages/excalidraw/components/ColorPicker/ColorPicker.scss` | Modified | Add error border style, input wrapper, error message positioning |
| `packages/excalidraw/locales/en.json` | Modified | Add `colorPicker.invalidColor` i18n key |
| `packages/excalidraw/components/ColorPicker/__tests__/ColorInput.test.tsx` | New | Unit tests for color validation |

## Risk Assessment

- **Blast radius:** Minimal — changes are isolated to the ColorPicker component and locale file
- **Regression risk:** Low — no changes to color processing logic (`normalizeInputColor`), only UI feedback layer
- **Performance impact:** None — adds a single boolean state comparison per keystroke
- **i18n impact:** One new key added to `en.json`; other locales will fall back to English until translated
- **Accessibility impact:** Positive — adds `aria-invalid` and `role="alert"` for screen readers
