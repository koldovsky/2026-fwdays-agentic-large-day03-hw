## ADDED Requirements

### Requirement: Multi-point Escape is handled before generic drag-create cancel
When multi-point linear creation is active, the system SHALL apply multi-point Escape rules (finalize or discard per `escape-multipoint-finalize`) before any generic Escape cancel logic that removes an in-progress element from the scene as if it were an incomplete single-drag shape.

#### Scenario: Two or more committed points are not removed by generic cancel
- **WHEN** the user is drawing a multi-point line with at least two committed points and presses Escape
- **THEN** the generic drag-create Escape cancel path SHALL NOT delete the element solely because `newElement` was non-null during creation; the element SHALL be finalized or otherwise handled according to multi-point rules

#### Scenario: Multi-point mode is distinguishable from single-segment drag on Escape
- **WHEN** the user is in multi-point mode for a line or arrow and presses Escape
- **THEN** the system SHALL NOT treat the gesture as single-segment pointer-drag cancellation unless the multi-point rules explicitly discard the element (e.g. only one committed point)
