## ADDED Requirements

### Requirement: Inline font size bar with compact presets
The properties panel SHALL display font size presets (S, M, L, XL, 2XL) as compact buttons in an inline bar when a text element or text-bound container is selected. The buttons MUST be visually smaller than current RadioSelection buttons, matching the density of color swatch TopPicks. After the presets, a vertical separator and a "current style" trigger button MUST be displayed showing the actual numeric font size value of the selected element. The trigger MUST reflect the real fontSize at all times — including when the size is changed manually (e.g., via keyboard shortcuts Ctrl+Shift+</>, via the popover, or by any other means).

#### Scenario: Selecting a text element shows compact font size bar
- **WHEN** user selects a text element on the canvas
- **THEN** the properties panel shows an inline bar with buttons [S] [M] [L] [XL] [2XL], a vertical separator, and a trigger showing the current font size value (e.g., "20")

#### Scenario: Clicking a preset applies the font size
- **WHEN** user clicks the "L" preset button
- **THEN** the selected text element's fontSize changes to 28px
- **AND** the current style trigger updates to show "28"

#### Scenario: Active preset is highlighted
- **WHEN** the selected text element has fontSize=36
- **THEN** the "XL" preset button is shown in the active/selected state
- **AND** the current style trigger shows "36"

#### Scenario: Non-standard size shows no active preset
- **WHEN** the selected text element has fontSize=50 (not matching any preset)
- **THEN** no preset button is in the active state
- **AND** the current style trigger shows "50"

#### Scenario: Trigger reflects manual size changes in real time
- **WHEN** user changes font size via keyboard shortcut (Ctrl+Shift+>)
- **THEN** the current style trigger immediately updates to show the new actual font size value
- **AND** the active preset button updates accordingly (highlights matching preset or deactivates all if no match)

#### Scenario: Multiple elements with different sizes
- **WHEN** user selects multiple text elements with different font sizes
- **THEN** no preset button is in the active state
- **AND** the current style trigger shows a mixed indicator (e.g., "—")

---

### Requirement: Font size popover with extended presets
The system SHALL display a popover when the user clicks the current style trigger button. The popover MUST contain smaller size presets (2XS, XS), the full range of larger size presets (2XL through 10XL), and MUST be rendered using the `PropertiesPopover` component. The presets SHALL be arranged in rows for visual clarity.

#### Scenario: Opening the font size popover
- **WHEN** user clicks the current style trigger in the font size bar
- **THEN** a popover opens showing size presets in rows: smaller sizes (2XS, XS) and larger sizes (2XL, 3XL, 4XL, 5XL, 6XL, 7XL, 8XL, 9XL, 10XL)
- **AND** the `appState.openPopup` is set to `"fontSize"`

#### Scenario: Clicking an extended preset applies the size
- **WHEN** user clicks "4XL" (72px) in the popover
- **THEN** the selected text element's fontSize changes to 72px
- **AND** the popover remains open
- **AND** the inline bar's current style trigger updates to "72"

#### Scenario: Clicking a smaller preset applies the size
- **WHEN** user clicks "XS" (12px) in the popover
- **THEN** the selected text element's fontSize changes to 12px
- **AND** the inline bar's current style trigger updates to "12"

#### Scenario: Active extended preset is highlighted
- **WHEN** the selected text element has fontSize=96 and the popover is open
- **THEN** the "6XL" preset button in the popover is shown in the active state

#### Scenario: Closing the popover
- **WHEN** user clicks outside the popover
- **THEN** the popover closes
- **AND** `appState.openPopup` is set to `null`

#### Scenario: Only one popup open at a time
- **WHEN** the font size popover is open and user clicks a color picker trigger
- **THEN** the font size popover closes
- **AND** the color picker popover opens

---

### Requirement: Numeric font size dropdown in popover
The font size popover SHALL contain a dropdown/select below the preset rows with predefined numeric font size values: 8, 10, 12, 14, 16, 20, 24, 28, 36, 48, 64, 72, 96, 128. Selecting a value from the dropdown MUST apply that font size to the selected element(s).

#### Scenario: Selecting a numeric size from dropdown
- **WHEN** user opens the font size popover and selects "72" from the numeric dropdown
- **THEN** the selected text element's fontSize changes to 72px
- **AND** the inline bar's current style trigger updates to "72"

#### Scenario: Current size is highlighted in dropdown
- **WHEN** the selected text element has fontSize=24 and the popover is open
- **THEN** "24" is highlighted as the active option in the numeric dropdown

#### Scenario: Non-listed size does not break dropdown
- **WHEN** the selected text element has fontSize=50 (not in the predefined list) and the popover is open
- **THEN** no option in the dropdown is highlighted as active
- **AND** the dropdown still functions normally for selecting new values

---

### Requirement: Unit type display selector
The font size popover SHALL include a unit type selector allowing the user to switch the displayed units between px and pt. The selector MUST NOT change the internal storage — fontSize MUST always be stored in px. When pt is selected, displayed values MUST be converted using the ratio 1pt = 1.333px (96px/72pt).

#### Scenario: Default display unit is px
- **WHEN** user opens the font size popover
- **THEN** the unit selector shows "px" as the active unit
- **AND** all numeric values are displayed in pixels

#### Scenario: Switching to pt display
- **WHEN** user selects "pt" in the unit selector
- **THEN** all displayed numeric values convert to pt (e.g., 36px shows as ~27pt)
- **AND** the inline bar trigger also shows the value in pt
- **AND** the internal fontSize remains 36 (px)

#### Scenario: Selecting a value while in pt mode
- **WHEN** the unit selector is set to "pt" and user selects "36" from the numeric dropdown
- **THEN** the system converts 36pt to 48px
- **AND** the element's fontSize is set to 48px
- **AND** the displayed value shows "36" (in pt)

---

### Requirement: Extended FONT_SIZES constant
The `FONT_SIZES` constant in `packages/common/src/constants.ts` SHALL be extended with smaller sizes (2xs, xs) and larger sizes (2xl through 10xl). Existing values (sm=16, md=20, lg=28, xl=36) MUST NOT change.

#### Scenario: FONT_SIZES includes all named sizes
- **WHEN** code imports `FONT_SIZES` from `@excalidraw/common`
- **THEN** it contains keys: 2xs(10), xs(12), sm(16), md(20), lg(28), xl(36), 2xl(48), 3xl(60), 4xl(72), 5xl(84), 6xl(96), 7xl(108), 8xl(120), 9xl(132), 10xl(144)

#### Scenario: Backward compatibility
- **WHEN** existing code references `FONT_SIZES.sm`, `FONT_SIZES.md`, `FONT_SIZES.lg`, or `FONT_SIZES.xl`
- **THEN** the values are identical to the current values (16, 20, 28, 36)

---

### Requirement: Compact mode support
In compact panel mode (`CompactShapeActions`), the font size picker MUST adapt to the narrower layout. The inline presets MAY be reduced (showing fewer quick-pick buttons) while the popover MUST remain fully functional.

#### Scenario: Compact mode shows trigger only
- **WHEN** the properties panel is in compact mode and a text element is selected
- **THEN** the font size control shows at minimum a trigger button with the current size value
- **AND** clicking the trigger opens the full font size popover

#### Scenario: Popover works identically in compact mode
- **WHEN** user opens the font size popover in compact mode
- **THEN** the popover contains the same preset grid, numeric dropdown, and unit selector as in full mode
