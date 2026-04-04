## ADDED Requirements

### Requirement: Inline font size bar with SVG icon presets and numeric trigger
The properties panel (full mode) SHALL display 4 font size presets (S, M, L, XL) as SVG icon buttons — the same icons as the original RadioSelection but slightly smaller to leave room for the numeric trigger. After the presets, a vertical separator and a "current style" trigger button MUST be displayed showing the actual numeric font size value. The trigger MUST reflect the real fontSize at all times. Clicking a preset applies the font size immediately.

#### Scenario: Selecting a text element shows inline bar
- **WHEN** user selects a text element on the canvas
- **THEN** the properties panel shows an inline bar with SVG icon buttons [S] [M] [L] [XL], a vertical separator, and a trigger showing the current font size value (e.g., "20")

#### Scenario: Clicking a preset applies font size and closes popover
- **WHEN** the font size popover is open and user clicks the "L" preset button
- **THEN** the selected text element's fontSize changes to 28px
- **AND** the popover closes (`appState.openPopup` is set to `null`)
- **AND** the current style trigger updates to show "28"

#### Scenario: Active preset is highlighted
- **WHEN** the selected text element has fontSize=36
- **THEN** the "XL" preset button is shown in the active/selected state
- **AND** the current style trigger shows "36"

#### Scenario: Non-standard size shows no active preset
- **WHEN** the selected text element has fontSize=50 (not matching any preset)
- **THEN** no preset button is in the active state
- **AND** the current style trigger shows "50"

#### Scenario: Fractional font size is displayed rounded to integer
- **WHEN** the selected text element has fontSize=23.76 (result of manual increment via Ctrl+Shift+>)
- **THEN** the current style trigger shows "24" (rounded to nearest integer)
- **AND** the internal fontSize value remains 23.76 (no mutation occurs from display rounding)

#### Scenario: Trigger reflects manual size changes in real time
- **WHEN** user changes font size via keyboard shortcut (Ctrl+Shift+>)
- **THEN** the current style trigger immediately updates to show the new actual font size value
- **AND** the active preset button updates accordingly (highlights matching preset or deactivates all if no match)

#### Scenario: Multiple elements with different sizes
- **WHEN** user selects multiple text elements with different font sizes
- **THEN** no preset button is in the active state
- **AND** the current style trigger shows a mixed indicator (e.g., "—")

---

### Requirement: Font size popover with 12 preset buttons in 3 rows
The system SHALL display a popover when the user clicks the current style trigger button. The popover MUST contain exactly 12 named size presets arranged in 3 rows of 4 — all FONT_SIZES values. The popover has two labeled sections: "Presets" (grid of buttons) and "Custom size" (dropdown + unit selector). The popover MUST be rendered using the `PropertiesPopover` component.

#### Scenario: Opening the font size popover
- **WHEN** user clicks the current style trigger in the font size bar
- **THEN** a popover opens showing a "Presets" label followed by 3 rows of 4 preset buttons: row 1 (2XS, XS, S, M), row 2 (L, XL, 2XL, 3XL), row 3 (4XL, 5XL, 8XL, 10XL)
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
- **WHEN** the selected text element has fontSize=120 and the popover is open
- **THEN** the "8XL" preset button in the popover is shown in the active state

#### Scenario: Closing the popover
- **WHEN** user clicks outside the popover
- **THEN** the popover closes
- **AND** `appState.openPopup` is set to `null`

#### Scenario: Only one popup open at a time
- **WHEN** the font size popover is open and user clicks a color picker trigger
- **THEN** the font size popover closes
- **AND** the color picker popover opens

#### Scenario: Opening popover MUST NOT change fontSize (action perform guard)
- **WHEN** the FontSizePicker calls `updateData({ openPopup: "fontSize" })` to open the popover
- **THEN** `actionChangeFontSize.perform()` SHALL detect the `{ openPopup }` object and update only `appState.openPopup`
- **AND** the element's fontSize and `appState.currentItemFontSize` MUST remain unchanged
- **AND** `captureUpdate` SHALL be `EVENTUALLY` (not `IMMEDIATELY`) since no element mutation occurred

> **Invariant:** Because `PanelComponent.updateData()` flows through `action.perform()`, the perform function MUST discriminate between a numeric fontSize value and an `{ openPopup }` state-management object. Passing `{ openPopup }` directly to `changeFontSize()` will cause a React rendering crash ("Objects are not valid as a React child"). This guard MUST be tested.

---

### Requirement: Numeric font size dropdown with inline unit selector
The font size popover SHALL contain a "Custom size" labeled section below the preset grid with a `<select>` dropdown and a unit type selector placed side-by-side in a single horizontal line. The dropdown MUST contain all `FONT_SIZES` values plus additional large sizes above 144px (160, 180, 200, 240). The unit selector (px/pt) MUST be placed to the right of the dropdown, not below it. The unit labels "px" and "pt" are hardcoded (not localized).

#### Scenario: Selecting a numeric size from dropdown
- **WHEN** user opens the font size popover and selects "72" from the numeric dropdown
- **THEN** the selected text element's fontSize changes to 72px
- **AND** the inline bar's current style trigger updates to "72"

#### Scenario: Dropdown includes all named sizes plus extra large
- **WHEN** user opens the font size popover and inspects the dropdown
- **THEN** the dropdown contains all FONT_SIZES values (10, 12, 16, 20, 28, 36, 48, 60, 72, 84, 120, 144) plus 160, 180, 200, 240

#### Scenario: Current size is highlighted in dropdown
- **WHEN** the selected text element has fontSize=24 and the popover is open
- **THEN** "24" is highlighted as the active option in the numeric dropdown

#### Scenario: Non-listed size does not break dropdown
- **WHEN** the selected text element has fontSize=50 (not in the predefined list) and the popover is open
- **THEN** no option in the dropdown is highlighted as active
- **AND** the dropdown still functions normally for selecting new values

---

### Requirement: Unit type display selector
The unit type selector SHALL be displayed inline (to the right of) the numeric dropdown, forming a single compact row. It MUST allow switching displayed units between px and pt. The selector MUST NOT change the internal storage — fontSize MUST always be stored in px. When pt is selected, displayed values MUST be converted using the ratio 1pt = 1.333px (96px/72pt).

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
The `FONT_SIZES` constant in `packages/common/src/constants.ts` SHALL be extended with smaller sizes (2xs, xs) and larger sizes (2xl, 3xl, 4xl, 5xl, 8xl, 10xl). Sizes 6xl, 7xl, 9xl are intentionally omitted. Existing values (sm=16, md=20, lg=28, xl=36) MUST NOT change.

#### Scenario: FONT_SIZES includes all named sizes
- **WHEN** code imports `FONT_SIZES` from `@excalidraw/common`
- **THEN** it contains keys: 2xs(10), xs(12), sm(16), md(20), lg(28), xl(36), 2xl(48), 3xl(60), 4xl(72), 5xl(84), 8xl(120), 10xl(144)

#### Scenario: Backward compatibility
- **WHEN** existing code references `FONT_SIZES.sm`, `FONT_SIZES.md`, `FONT_SIZES.lg`, or `FONT_SIZES.xl`
- **THEN** the values are identical to the current values (16, 20, 28, 36)

---

### Requirement: Mobile and compact (tablet) mode — original RadioSelection
In mobile mode AND compact/tablet mode, the font size picker MUST render the original 4-button RadioSelection with SVG icons (S, M, L, XL). No numeric trigger, no popover. This ensures touch-friendly sizing and full backward compatibility on smaller screens.

#### Scenario: Mobile mode shows original 4-button RadioSelection
- **WHEN** the properties panel is in mobile mode and a text element is selected
- **THEN** the font size control renders 4 SVG icon radio buttons (S, M, L, XL) matching the original behavior
- **AND** no numeric trigger button or popover is available

#### Scenario: Compact/tablet mode shows original 4-button RadioSelection
- **WHEN** the properties panel is in compact (tablet) mode and a text element is selected
- **THEN** the font size control renders 4 SVG icon radio buttons (S, M, L, XL) matching the original behavior
- **AND** no numeric trigger button or popover is available
