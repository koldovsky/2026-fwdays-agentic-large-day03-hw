## ADDED Requirements

### Requirement: Multi-point arrow creation inside closed shapes
The system SHALL allow users to create multi-point (curved) arrows inside closed shapes without premature finalization. When the arrow's start binding is already attached to a shape, clicking or hovering inside that same shape SHALL NOT trigger arrow finalization.

#### Scenario: Adding intermediate points inside a rectangle
- **WHEN** the user starts drawing an arrow inside a closed rectangle (arrow becomes start-bound to the rectangle)
- **AND** the user clicks at a different position still inside the same rectangle to add an intermediate point
- **THEN** the arrow SHALL add a new point at the clicked position instead of finalizing

#### Scenario: Curved arrow segments inside a closed shape
- **WHEN** the user creates multiple intermediate points inside a closed shape
- **THEN** the arrow SHALL render curved segments between the points (same as when drawing outside shapes)

#### Scenario: Mouse move preview inside start-bound shape
- **WHEN** the user is creating a multi-point arrow inside a closed shape
- **AND** the mouse moves within the start-bound shape with no uncommitted temp point
- **THEN** the system SHALL NOT auto-finalize the arrow due to hovering over the start-bound shape

#### Scenario: Finalization on a different shape
- **WHEN** the user is creating a multi-point arrow that starts inside shape A
- **AND** the user clicks on or hovers over a different shape B
- **THEN** the arrow SHALL finalize and bind its end point to shape B (existing behavior preserved)

#### Scenario: Finalization by double-click or commit zone
- **WHEN** the user is creating a multi-point arrow inside a closed shape
- **AND** the user double-clicks or clicks within the commit zone threshold of the last committed point
- **THEN** the arrow SHALL finalize normally

#### Scenario: Lines remain unaffected
- **WHEN** the user draws a multi-point line inside a closed shape
- **THEN** the line creation behavior SHALL remain unchanged (lines already work correctly inside shapes)
