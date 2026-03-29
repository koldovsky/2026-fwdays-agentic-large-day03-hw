## ADDED Requirements

### Requirement: Laser trail persistence mode

The editor SHALL expose a laser trail mode with at least two values: **Temporary** and **Persistent**. **Temporary** SHALL be the default for new sessions and SHALL preserve the existing time-based fading behavior of laser strokes. **Persistent** SHALL keep completed laser strokes visible on the canvas until they are cleared as specified in this capability or the mode is switched in a way that removes persistent marks per product rules.

#### Scenario: Default is temporary

- **GIVEN** the editor is open and the laser tool is available
- **WHEN** the user has not chosen persistent laser behavior
- **THEN** laser strokes SHALL fade and disappear consistent with the current temporary laser behavior

#### Scenario: Persistent strokes remain

- **GIVEN** the editor is open, the laser tool is active, and **Persistent** mode is enabled
- **WHEN** the user draws one or more laser strokes
- **THEN** those strokes SHALL remain visible beyond the duration that temporary strokes would have faded, until cleared or until behavior defined for mode switch applies

#### Scenario: Persistent mode enabled with no strokes yet

- **GIVEN** the editor is open, the laser tool is active, **Persistent** mode is enabled, and the user has not drawn any local laser strokes
- **WHEN** the user continues using the editor without drawing
- **THEN** the UI SHALL remain stable (no errors) and mode SHALL stay **Persistent** until the user changes it

### Requirement: User can clear persistent laser marks

The system SHALL provide an explicit way to remove persistent laser strokes from the view while remaining in laser-related use (exact control label is implementation-defined but MUST be discoverable from the laser UI or documented shortcut).

#### Scenario: Clear removes persistent trails

- **GIVEN** persistent laser strokes are visible and the laser tool context is available
- **WHEN** the user invokes the clear action for laser marks
- **THEN** those persistent strokes SHALL no longer be visible

#### Scenario: Clear when no persistent strokes

- **GIVEN** **Persistent** mode is enabled and no persistent local laser strokes are present
- **WHEN** the user would invoke clear (or the clear control is not shown because there is nothing to clear)
- **THEN** the system SHALL not surface an error and the canvas SHALL be unchanged

### Requirement: Mode toggle discoverability

The control that switches between **Temporary** and **Persistent** laser behavior SHALL be reachable from the laser tool context (e.g. toolbar popover or laser tool section), and strings SHALL distinguish the two modes so users understand that persistent marks stay until cleared.

#### Scenario: User switches mode from laser context

- **GIVEN** the editor is open and the user can open laser tool controls
- **WHEN** the user opens the laser tool controls
- **THEN** they SHALL be able to change between **Temporary** and **Persistent** without leaving the editor shell

#### Scenario: Switch mode with no persistent strokes

- **GIVEN** the editor is open, **Persistent** mode is enabled, and there are no local persistent strokes
- **WHEN** the user switches to **Temporary** (or another mode change defined by product rules)
- **THEN** behavior SHALL be defined and consistent (no errors); any defined clearing of state SHALL leave the canvas unchanged when there was nothing to clear
