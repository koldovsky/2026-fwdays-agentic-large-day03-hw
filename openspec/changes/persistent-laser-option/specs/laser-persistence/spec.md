## ADDED Requirements

### Requirement: Laser trail persistence mode

The editor SHALL expose a laser trail mode with at least two values: **Temporary** and **Persistent**. **Temporary** SHALL be the default for new sessions and SHALL preserve the existing time-based fading behavior of laser strokes. **Persistent** SHALL keep completed laser strokes visible on the canvas until they are cleared as specified in this capability or the mode is switched in a way that removes persistent marks per product rules.

#### Scenario: Default is temporary

- **WHEN** the user has not chosen persistent laser behavior
- **THEN** laser strokes SHALL fade and disappear consistent with the current temporary laser behavior

#### Scenario: Persistent strokes remain

- **WHEN** the user enables **Persistent** laser mode and draws one or more laser strokes
- **THEN** those strokes SHALL remain visible beyond the duration that temporary strokes would have faded, until cleared or until behavior defined for mode switch applies

### Requirement: User can clear persistent laser marks

The system SHALL provide an explicit way to remove persistent laser strokes from the view while remaining in laser-related use (exact control label is implementation-defined but MUST be discoverable from the laser UI or documented shortcut).

#### Scenario: Clear removes persistent trails

- **WHEN** persistent laser strokes are visible and the user invokes the clear action for laser marks
- **THEN** those persistent strokes SHALL no longer be visible

### Requirement: Mode toggle discoverability

The control that switches between **Temporary** and **Persistent** laser behavior SHALL be reachable from the laser tool context (e.g. toolbar popover or laser tool section), and strings SHALL distinguish the two modes so users understand that persistent marks stay until cleared.

#### Scenario: User switches mode from laser context

- **WHEN** the user opens the laser tool controls
- **THEN** they SHALL be able to change between **Temporary** and **Persistent** without leaving the editor shell
