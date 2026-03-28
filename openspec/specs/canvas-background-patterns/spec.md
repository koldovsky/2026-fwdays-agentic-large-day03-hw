## ADDED Requirements

### Requirement: Users can select a squared paper canvas background
The system SHALL allow the canvas background to use a background pattern setting in addition to the existing flat background color. The initial supported patterned option SHALL be `squared-paper`, and the default pattern SHALL be `none`.

#### Scenario: Selecting squared paper background
- **WHEN** a user changes the canvas background pattern to `squared-paper`
- **THEN** the canvas SHALL render a squared paper pattern behind scene elements

#### Scenario: Keeping plain background by default
- **WHEN** a scene has no stored background pattern
- **THEN** the canvas SHALL render the current flat background behavior with no paper pattern

### Requirement: Squared paper background is independent from snapping grid mode
The system SHALL treat the squared paper background as canvas presentation and SHALL NOT couple it to grid snapping or the existing grid visibility toggle.

#### Scenario: Squared paper without grid mode
- **WHEN** a user enables `squared-paper` and grid mode is disabled
- **THEN** the squared paper background SHALL remain visible

#### Scenario: Squared paper with grid mode
- **WHEN** a user enables `squared-paper` and grid mode is enabled
- **THEN** the canvas SHALL render the squared paper background and preserve current grid mode behavior

### Requirement: Squared paper background persists and exports with canvas background settings
The system SHALL persist the selected canvas background pattern in app state, restore it when scenes are reopened, and include it in exports whenever canvas background export is enabled.

#### Scenario: Restoring a saved squared paper scene
- **WHEN** a scene is loaded with the background pattern set to `squared-paper`
- **THEN** the editor SHALL restore and render the squared paper background

#### Scenario: Exporting with background enabled
- **WHEN** a user exports a scene with `exportBackground` enabled and the background pattern set to `squared-paper`
- **THEN** the exported output SHALL include the squared paper pattern

#### Scenario: Exporting with background disabled
- **WHEN** a user exports a scene with `exportBackground` disabled and the background pattern set to `squared-paper`
- **THEN** the exported output SHALL omit the squared paper pattern