# Proposal: Display Error Feedback for Invalid Hex Color Input

## Issue Reference

https://github.com/excalidraw/excalidraw/issues/9527

## Problem Statement

When a user enters an invalid hexadecimal color value in the ColorPicker input field, the input is silently ignored. No visual feedback is provided, leaving users confused about why their color did not change.

## Proposed Solution

Add visual error feedback to the `ColorInput` component when the entered value is not a valid color. The input border will turn red and the value will remain visible (instead of being silently ignored) so users can see and correct their mistake. On blur, if the value is still invalid, it will revert to the last valid color.

## Scope

- **In scope:** Visual error indicator (red border) on the hex color input when an invalid value is entered
- **Out of scope:** Tooltip error messages, color format auto-correction, support for named CSS colors beyond what tinycolor already handles

## Files Affected

1. `packages/excalidraw/components/ColorPicker/ColorInput.tsx` — add error state tracking and conditional CSS class
2. `packages/excalidraw/components/ColorPicker/ColorPicker.scss` — add error border style

## Risk Assessment

- **Blast radius:** Minimal — changes are isolated to the ColorPicker component
- **Regression risk:** Low — no changes to color processing logic (`normalizeInputColor`), only UI feedback
- **Performance impact:** None — adds a single boolean state comparison per keystroke
