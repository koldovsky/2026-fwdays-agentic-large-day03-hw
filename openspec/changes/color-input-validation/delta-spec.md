# Delta Spec: Color Input Validation Feedback

## Requirements

### REQ-1: Visual Error Indicator

The `ColorInput` component SHALL display a red border on the hex input field when the entered value is not a valid color as determined by `normalizeInputColor()`.

The error indicator MUST appear immediately as the user types (on each `onChange` event).

The error indicator MUST NOT appear when the input is empty or contains a valid color value.

### REQ-2: Error Message Display

The component SHALL display an inline error message below the input field when the value is invalid.

The error message MUST use the i18n key `colorPicker.invalidColor` via `t()` function.

The error message MUST have `role="alert"` for screen reader accessibility.

### REQ-3: Accessibility

The input field MUST set `aria-invalid="true"` when the value is invalid and `aria-invalid="false"` when valid.

The error message element MUST have `role="alert"` to announce the error to assistive technologies.

### REQ-4: Error State Reset

The error state MUST clear when:
- The user enters a valid color value
- The input field loses focus (blur event) — the value reverts to the last valid color

### REQ-5: Value Preservation During Editing

The input field MUST continue to display the user's typed value while editing, even if invalid, so the user can see and correct their input. The value SHALL only revert to the last valid color on blur.

### REQ-6: No Behavior Change for Valid Colors

The existing color processing logic (`normalizeInputColor` in `@excalidraw/common`) MUST NOT be modified. Valid color inputs MUST continue to work exactly as before.

### REQ-7: i18n Compliance

The error message text MUST be defined as an i18n key `colorPicker.invalidColor` in `packages/excalidraw/locales/en.json`.

The component MUST render the error message using `t("colorPicker.invalidColor")`.

## Scenarios

### Scenario 1: User enters invalid hex code

```
GIVEN the ColorPicker is open and the hex input is focused
WHEN the user types "zzzzzz" into the hex input
THEN the input border SHALL turn red
AND an error message "Invalid hex color" SHALL appear below the input
AND aria-invalid SHALL be set to true on the input
AND the element color SHALL NOT change
```

### Scenario 2: User corrects invalid input

```
GIVEN the hex input displays an invalid value with red border and error message
WHEN the user clears the input and types "ff0000"
THEN the input border SHALL return to the default style
AND the error message SHALL disappear
AND aria-invalid SHALL be set to false
AND the element color SHALL change to #ff0000
```

### Scenario 3: User blurs with invalid input

```
GIVEN the hex input displays an invalid value "xyz" with error visible
WHEN the input loses focus (blur)
THEN the input value SHALL revert to the last valid color
AND the error border and message SHALL be removed
AND aria-invalid SHALL be set to false
```

### Scenario 4: User enters valid short hex

```
GIVEN the ColorPicker is open
WHEN the user types "f00" into the hex input
THEN no error indicator SHALL appear
AND no error message SHALL appear
AND the element color SHALL change to #f00
```

### Scenario 5: Empty input

```
GIVEN the ColorPicker is open
WHEN the hex input is empty
THEN no error indicator SHALL appear
AND no error message SHALL appear
```

### Scenario 6: User enters too many characters

```
GIVEN the ColorPicker is open
WHEN the user types "123456789" (more than 8 characters)
THEN the input border SHALL turn red
AND the error message SHALL appear
AND the element color SHALL NOT change
```

### Scenario 7: User enters single digit

```
GIVEN the ColorPicker is open
WHEN the user types "1" into the hex input
THEN the input border SHALL turn red
AND the error message SHALL appear
AND the element color SHALL NOT change
```

### Scenario 8: Valid 8-digit hex with alpha

```
GIVEN the ColorPicker is open
WHEN the user types "ff000080" into the hex input
THEN no error indicator SHALL appear
AND the element color SHALL change to include alpha
```
