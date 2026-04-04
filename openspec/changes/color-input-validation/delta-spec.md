# Delta Spec: Color Input Validation Feedback

## Requirements

### REQ-1: Visual Error Indicator

The `ColorInput` component SHALL display a red border on the hex input field when the entered value is not a valid color as determined by `normalizeInputColor()`.

The error indicator MUST appear immediately as the user types (on each `onChange` event).

The error indicator MUST NOT appear when the input is empty or contains a valid color value.

### REQ-2: Error State Reset

The error state MUST clear when:
- The user enters a valid color value
- The input field loses focus (blur event) — the value reverts to the last valid color

### REQ-3: Value Preservation During Editing

The input field MUST continue to display the user's typed value while editing, even if invalid, so the user can see and correct their input. The value SHALL only revert to the last valid color on blur.

### REQ-4: No Behavior Change for Valid Colors

The existing color processing logic (`normalizeInputColor`) MUST NOT be modified. Valid color inputs MUST continue to work exactly as before.

## Scenarios

### Scenario 1: User enters invalid hex code

```
GIVEN the ColorPicker is open and the hex input is focused
WHEN the user types "zzzzzz" into the hex input
THEN the input border SHALL turn red
AND the input SHALL display "zzzzzz"
AND the element color SHALL NOT change
```

### Scenario 2: User corrects invalid input

```
GIVEN the hex input displays an invalid value with red border
WHEN the user clears the input and types "ff0000"
THEN the input border SHALL return to the default style
AND the element color SHALL change to #ff0000
```

### Scenario 3: User blurs with invalid input

```
GIVEN the hex input displays an invalid value "xyz"
WHEN the input loses focus (blur)
THEN the input value SHALL revert to the last valid color
AND the error border SHALL be removed
```

### Scenario 4: User enters valid short hex

```
GIVEN the ColorPicker is open
WHEN the user types "f00" into the hex input
THEN no error indicator SHALL appear
AND the element color SHALL change to #f00
```

### Scenario 5: Empty input

```
GIVEN the ColorPicker is open
WHEN the hex input is empty
THEN no error indicator SHALL appear
```
