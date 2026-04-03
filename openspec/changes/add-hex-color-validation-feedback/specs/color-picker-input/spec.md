## ADDED Requirements

### Requirement: Validation feedback for the hex code input

The system SHALL display visual and textual error feedback when the user enters an invalid color value in the hex code input field of the ColorPicker component. Validity is determined by `normalizeInputColor`: a value is invalid when `normalizeInputColor(value)` returns `null` and the trimmed value is non-empty.

#### Scenario: Invalid value on blur

- GIVEN the user has typed a non-empty value into the hex code input
- WHEN the input loses focus (blur)
- AND `normalizeInputColor` returns `null` for the current field text
- THEN the input container SHALL display a red error border
- AND an inline error message SHALL be visible below the input container

#### Scenario: Concrete invalid values from issue #9527

- GIVEN the user has typed `zzzzzz` into the hex code input
- WHEN the input loses focus
- THEN `normalizeInputColor` SHALL return `null` for this value
- AND the error border and error message SHALL be shown

- GIVEN the user has typed `12345` into the hex code input
- WHEN the input loses focus
- THEN `normalizeInputColor` SHALL return `null` for this value
- AND the error border and error message SHALL be shown

Additional repro values from the issue that SHALL show the error (assuming `normalizeInputColor` returns `null`): `123456789`, `1`, `12`, `1234567`.

#### Scenario: Named color accepted by parser

- GIVEN the user has typed `blue` into the hex code input
- WHEN the input loses focus
- AND `normalizeInputColor("blue")` returns a non-null value (the underlying parser accepts named CSS colors)
- THEN no error indicator SHALL be displayed

#### Scenario: Valid hex value on blur

- GIVEN the user has typed a valid hex value (e.g. `ff0000`, `f00`, or `ff000080`) into the hex code input
- WHEN the input loses focus
- THEN no error indicator SHALL be displayed

Note: the field strips a leading `#` from display (existing behavior); the user types digits only. `normalizeInputColor` prepends `#` when needed, so `ff0000` resolves to `#ff0000`.

#### Scenario: Error clears when user types a valid value

- GIVEN the hex code input is showing an error state
- WHEN the user modifies the field text to a value that `normalizeInputColor` accepts (including via paste)
- THEN the error border SHALL be removed immediately (on the same keystroke / input event)
- AND the error message SHALL be hidden

#### Scenario: Error clears on external color selection

- GIVEN the hex code input is showing an error state
- WHEN a color is selected via the palette, eye dropper, or shade picker (which updates the `color` prop)
- THEN the error state SHALL be cleared
- AND the input SHALL display the newly selected color

#### Scenario: Empty input does not show error

- GIVEN the hex code input field is empty (zero characters)
- WHEN the input loses focus
- THEN no error indicator SHALL be displayed

#### Scenario: Whitespace-only input does not show error

- GIVEN the user has typed only whitespace characters (e.g. three spaces) into the hex code input
- WHEN the input loses focus
- THEN no error indicator SHALL be displayed
- AND the field SHALL be treated as effectively empty for validation purposes

#### Scenario: Replacing one invalid value with another

- GIVEN the hex code input is showing an error state
- WHEN the user changes the field text to a different non-empty value that is also invalid
- AND the input loses focus again
- THEN the error state SHALL remain visible with the error message still shown

#### Scenario: Error state visible after blur resets displayed text

- GIVEN the user has entered an invalid value into the hex code input
- WHEN the input loses focus
- THEN the error border and error message SHALL be visible
- AND the field text MAY revert to the last applied color (existing blur-reset behavior)
- AND the error indicators SHALL remain visible despite the text revert, until the user focuses the field again or selects a new color

#### Scenario: Transparent color as current value

- GIVEN the current applied color is `"transparent"` (passed as the `color` prop)
- WHEN the hex code input displays this value
- THEN no error state SHALL be shown (because `normalizeInputColor("transparent")` returns a valid result)

#### Scenario: Rapid blur without typing

- GIVEN the user focuses the hex code input (which already contains a valid color)
- WHEN the user immediately blurs without changing any text
- THEN no error indicator SHALL be displayed

### Requirement: Error message localization

The error message displayed for an invalid value in the hex code input SHALL use the application's i18n system.

#### Scenario: Localized error message

- GIVEN the application locale is set to any supported language
- WHEN an invalid value triggers the error state on blur
- THEN the error message SHALL be rendered using the translated string for the configured i18n key

### Requirement: Accessibility for invalid hex code input

When the hex code input is in an error state, the system SHALL expose that state to assistive technologies.

#### Scenario: Input exposes invalid state via ARIA

- GIVEN the hex code input is showing an error state
- WHEN the error indicators are rendered
- THEN the `<input>` element SHALL have `aria-invalid="true"`
- AND when the error state clears, `aria-invalid` SHALL be removed from the element (not set to `"false"`)

#### Scenario: Error message programmatically associated with input

- GIVEN the hex code input is showing an error state
- WHEN the error message element is visible
- THEN the error message SHALL have a stable `id` attribute
- AND the `<input>` element SHALL have `aria-describedby` referencing that `id`
- AND when the error state clears, `aria-describedby` SHALL be removed

#### Scenario: Error message announced by screen readers

- GIVEN the error message element becomes visible after a blur event
- WHEN the message is inserted into / shown in the DOM
- THEN the error message container SHALL have `role="alert"` so screen readers announce it immediately
