## Why

Currently, Excalidraw silently ignores invalid color values entered in the ColorPicker hex code input field. When a user types a value that `normalizeInputColor` does not accept (e.g., `zzzzzz`, `12345`, `1234567`), the color simply does not change and no feedback is shown. This causes confusion because users have no way of knowing why their input was rejected.

Ref: https://github.com/excalidraw/excalidraw/issues/9527

## Related

- **Primary issue:** [excalidraw/excalidraw#9527](https://github.com/excalidraw/excalidraw/issues/9527)
- **Prior attempts:** Multiple community PRs reference this issue (e.g. [#9532](https://github.com/excalidraw/excalidraw/pull/9532), [#9576](https://github.com/excalidraw/excalidraw/pull/9576), [#10878](https://github.com/excalidraw/excalidraw/pull/10878)); none are merged upstream as of this spec. Treat them as prior art only — implementation must match this spec and current codebase conventions.

## What Changes

### 1. Add visual error state to the hex code input

Display a visual error indicator (red border on the input container) when the user enters an invalid color value. The error state appears on blur if the current field text does not resolve to a valid color via `normalizeInputColor`.

### 2. Add an inline error message

Show a short localized error message below the hex code input when the value is invalid, using existing i18n infrastructure (`t()` from `packages/excalidraw/i18n`).

### 3. Clear error state on valid input

When the user corrects the input to a valid value, or when the input receives a new color from an external source (e.g., palette click, eye dropper), the error state clears immediately.

### 4. Accessibility

Expose the error state to assistive technology: `aria-invalid` on the text field, programmatic association between the input and the error message, and a live region so screen readers announce the error when it appears.

## Complexity

**Low.** One leaf component with internal state, existing validation (`normalizeInputColor`), no API or global state changes, no edits to do-not-touch modules.

## Blast Radius

**Minimal.** Expected touch points:

- `ColorInput.tsx` and `ColorPicker.scss` in `packages/excalidraw/components/ColorPicker/`
- Locale JSON files under `packages/excalidraw/locales/` (new i18n key; English required, other locales receive the same key with English fallback)
- New test file under `packages/excalidraw/tests/`

No changes to `packages/common` validation, canvas rendering, `excalidraw-app/`, or do-not-touch files. Currently `ColorInput` is used in a single call site (`ColorPicker.tsx`, which passes `color={color || ""}`) so the `color` prop will always be a string at runtime.

## Scope

**In scope:**

- Visual error feedback (border color change) on invalid input in the hex code field
- Inline error text message
- i18n support for the error message
- Accessibility attributes for the invalid state and error text
- RTL layout support for the error message (existing `.color-picker-input` has RTL rules)
- Component-level tests in a new `ColorInput.test.tsx` (Vitest + RTL)

**Out of scope:**

- Changes to the underlying validation logic (`normalizeInputColor` in `@excalidraw/common`)
- Real-time character-by-character validation (errors show on blur only)
- Tooltip-based error display

## Capabilities

### New Capabilities

- `color-picker-input`: Validation error feedback (visual, textual, accessible) for the hex code input

### Modified Capabilities

- `color-picker-input`: Hex code field behavior gains an explicit invalid state on blur and coordinated clearing when input becomes valid or the color changes externally (previously silent rejection only)

## Impact

- `packages/excalidraw/components/ColorPicker/ColorInput.tsx` — error state, blur logic, inline message, a11y attributes, JSX wrapper for message placement
- `packages/excalidraw/components/ColorPicker/ColorPicker.scss` — `.is-invalid` styles and error text styles (including RTL)
- `packages/excalidraw/locales/en.json` — new key in the `colorPicker` object
- `packages/excalidraw/locales/*.json` (56 non-EN files) — same key with English string as placeholder
- `packages/excalidraw/tests/ColorInput.test.tsx` — **new** component-level tests for error UI

## Risks

| Risk | Mitigation |
|------|------------|
| `onBlur` currently resets field text to the last applied color; validation must read the user's text before that reset, and both state updates happen in one React render cycle | Capture the field text in a local variable at the top of the blur handler; derive `isInvalid` from that variable; then call the existing reset. React batches the two `setState` calls into a single render. |
| New DOM element for the error message may shift layout or break existing snapshot tests | The message element is placed outside the grid container (see design.md for JSX structure); keep it compact with `position: absolute` or minimal height; run `yarn test:update` for legitimate snapshot changes |
| `normalizeInputColor` accepts non-hex forms (named colors like `blue`, `rgb()`, `hsl()`, `transparent`); the field is labelled "Hex code" but validation is broader | Spec ties the invalid state to `normalizeInputColor(...) === null`, matching the existing apply-on-type semantics. This is intentional — the same parser decides whether a typed value takes effect. |
| i18n: a missing key in any locale file may cause a runtime fallback or empty string | Add the key to all 57 locale JSON files; use English string as placeholder per maintainer workflow |
| RTL layout: `.color-picker-input` has `:root[dir="rtl"]` overrides; the error message needs correct alignment in RTL | Add RTL-aware styles for the error text, mirroring the existing RTL rules in `.color-picker-input` |
| `ColorInput` depends on Jotai atoms, `useEditorInterface`, and `t()`; isolated tests require providers or mocks | Wrap test renders in the same provider setup used by sibling `*.test.tsx` files (e.g. `render(<Excalidraw />)` or minimal provider wrapper) |
