## ADDED Requirements

### Requirement: Multi-point arrow creation inside closed shapes
The system SHALL allow users to create multi-point (curved) arrows inside closed shapes without premature finalization. When the arrow's start binding is already attached to a shape, clicking or hovering inside that same shape SHALL NOT trigger arrow finalization.

#### Scenario: Adding intermediate points inside a rectangle
- **GIVEN** a canvas with a closed rectangle and the arrow tool selected
- **WHEN** the user starts drawing an arrow inside the rectangle (arrow becomes start-bound to the rectangle)
- **AND** the user clicks at a different position still inside the same rectangle to add an intermediate point
- **THEN** the arrow SHALL add a new point at the clicked position instead of finalizing

#### Scenario: Curved arrow segments inside a closed shape
- **GIVEN** a canvas with a closed shape, the arrow tool selected, and an arrow start-bound inside the shape
- **WHEN** the user creates multiple intermediate points inside the shape
- **THEN** the arrow SHALL render curved segments between the points (same as when drawing outside shapes)

#### Scenario: Mouse move preview inside start-bound shape
- **GIVEN** a multi-point arrow in progress, start-bound to a closed shape, with no uncommitted temp point
- **WHEN** the mouse moves within the start-bound shape
- **THEN** the system SHALL NOT auto-finalize the arrow due to hovering over the start-bound shape

#### Scenario: Finalization on a different shape
- **GIVEN** a multi-point arrow in progress starting inside shape A
- **WHEN** the user clicks on or hovers over a different shape B
- **THEN** the arrow SHALL finalize and bind its end point to shape B (existing behavior preserved)

#### Scenario: Finalization by double-click or commit zone
- **GIVEN** a multi-point arrow in progress inside a closed shape
- **WHEN** the user double-clicks or clicks within the commit zone threshold of the last committed point
- **THEN** the arrow SHALL finalize normally

#### Scenario: Lines remain unaffected
- **GIVEN** a canvas with a closed shape and the line tool selected
- **WHEN** the user draws a multi-point line inside the shape
- **THEN** the line creation behavior SHALL remain unchanged (lines already work correctly inside shapes)

#### Scenario: Edge case — arrow without start binding inside a shape
- **GIVEN** a canvas with a closed shape, the arrow tool selected, and binding disabled
- **WHEN** the user starts drawing a multi-point arrow inside the shape (arrow has no startBinding)
- **AND** the user clicks at additional positions inside the shape
- **THEN** the system SHALL add intermediate points normally without premature finalization (the startBinding check is safely skipped via optional chaining)
