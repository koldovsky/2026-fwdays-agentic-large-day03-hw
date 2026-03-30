## ADDED Requirements

### Requirement: Optional wheel zoom without modifier

The editor SHALL offer a preference (default: off) that controls whether a plain mouse wheel gesture on the interactive canvas zooms the canvas at the pointer without requiring Ctrl or Cmd.

#### Scenario: Default matches legacy behavior

- **WHEN** the preference is disabled (default)
- **THEN** plain wheel on the canvas SHALL pan the viewport and Ctrl/Cmd+wheel SHALL zoom, consistent with behavior before this feature

#### Scenario: Enabled — plain wheel zooms

- **WHEN** the preference is enabled and the user rolls the wheel on the canvas without Shift, Ctrl, or Cmd (and not while a pan gesture mode blocks wheel handling)
- **THEN** the canvas SHALL zoom using the same zoom semantics as Ctrl/Cmd+wheel zoom (anchored to the relevant viewport position used for zoom today)

#### Scenario: Enabled — pan without zooming

- **WHEN** the preference is enabled and the user holds Shift while rolling the wheel on the canvas
- **THEN** the canvas SHALL scroll/pan according to the same rules that applied to plain (non-modified) wheel panning when the preference was disabled (including horizontal scroll behavior where implemented today)

#### Scenario: Pinch and explicit modifier zoom

- **WHEN** Ctrl or Cmd is held during wheel (including pinch gestures that set the modifier flag)
- **THEN** the canvas SHALL zoom regardless of the new preference state, and SHALL remain consistent with existing zoom behavior

### Requirement: Persisted preference

The preference SHALL be stored with other browser-persisted editor settings so it survives page reloads in the web app.

#### Scenario: Reload

- **WHEN** the user toggles the preference and reloads the application
- **THEN** the saved value SHALL be restored and wheel behavior SHALL match that value

### Requirement: Discoverable settings control

The product SHALL expose the preference in the editor settings UI with a clear label (and localized strings) so users can opt in intentionally.

#### Scenario: Toggle

- **WHEN** the user opens the relevant settings section
- **THEN** they SHALL be able to turn the optional wheel-zoom behavior on or off
