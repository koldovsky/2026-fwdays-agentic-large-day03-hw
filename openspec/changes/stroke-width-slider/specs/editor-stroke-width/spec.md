# Delta spec: Editor stroke width

**Capability:** `editor-stroke-width`  
**Change:** `stroke-width-slider` ([issue #11105](https://github.com/excalidraw/excalidraw/issues/11105))

## MODIFIED Requirements

### Requirement: Stroke width primary control

The editor SHALL present stroke width adjustment as a single bounded numeric control (slider implemented with `type="range"` or equivalent), not as exactly three mutually exclusive preset buttons for the values `1`, `2`, and `4` only.

#### Scenario: User sets an intermediate width on a new rectangle

- **GIVEN** the user has the rectangle tool active and no elements selected
- **AND** the stroke width slider allows integer steps from 1 through 16
- **WHEN** the user sets the slider to `5`
- **THEN** `AppState.currentItemStrokeWidth` SHALL be `5`
- **AND** the next drawn rectangle SHALL have `strokeWidth` equal to `5`.

#### Scenario: Legacy preset values remain on the scale

- **GIVEN** the slider minimum is `1` and maximum is `16`
- **WHEN** the user sets the slider to `2`
- **THEN** newly created elements SHALL have `strokeWidth` `2` (same numeric value as the former “bold” preset).

---

### Requirement: Stroke width action semantics

Changing stroke width via the new control MUST apply to all selected elements that support stroke width using the same update rules as the existing `changeStrokeWidth` action (immediate capture, consistent with multi-select and mixed-type selection).

#### Scenario: Multi-select updates all supported elements

- **GIVEN** two rectangles are selected with `strokeWidth` `1` and `2`
- **WHEN** the user sets the stroke width slider to `8`
- **THEN** both rectangles SHALL have `strokeWidth` `8`.

---

## ADDED Requirements

### Requirement: Out-of-range persisted values

When a scene is loaded from JSON and an element has `strokeWidth` greater than the slider maximum or less than the slider minimum, the editor MUST preserve that value in memory and in the saved file until the user changes stroke width for that element (or selection containing it) using the slider; at that moment the applied value SHALL be clamped to `[min, max]`.

#### Scenario: Wide stroke from older file is clamped on edit

- **GIVEN** a rectangle is loaded with `strokeWidth` `24` and the slider maximum is `16`
- **WHEN** the user selects the rectangle and moves the slider to `10`
- **THEN** the rectangle SHALL have `strokeWidth` `10` (clamped within bounds after user interaction).

#### Scenario: Out-of-range value survives round-trip without slider use

- **GIVEN** a rectangle is loaded with `strokeWidth` `24`
- **WHEN** the user saves the file without changing stroke width
- **THEN** the saved JSON for that element SHALL still contain `strokeWidth` `24`.

---

### Requirement: Accessibility of stroke width control

The stroke width slider SHALL be keyboard operable and SHALL expose an accessible name (e.g. associated `<label>` or `aria-label`) that identifies the control as stroke width.

#### Scenario: Keyboard user adjusts width

- **GIVEN** keyboard focus is on the stroke width range input
- **WHEN** the user presses arrow keys to change the value
- **THEN** `strokeWidth` for the applicable scope (selection or tool default) SHALL update accordingly without requiring a pointer device.

---

### Requirement: Visual value feedback

The stroke width control SHALL display the current numeric `strokeWidth` value to the user while adjusting the slider (e.g. value bubble or adjacent text), consistent with existing `Range` component behavior elsewhere in the editor.

#### Scenario: User sees current value while dragging

- **GIVEN** the user is dragging the stroke width slider
- **WHEN** the slider value is `7`
- **THEN** the UI SHALL show `7` in proximity to the slider (not only after commit).

---

## Open questions (non-normative)

- Exact **max** (e.g. `12` vs `16` vs `20`) and whether **min** stays `1`.
- Whether to show **tick marks** at former preset positions `1`, `2`, `4` for discoverability.
