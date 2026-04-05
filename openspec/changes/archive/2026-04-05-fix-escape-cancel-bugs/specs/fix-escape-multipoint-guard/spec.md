## ADDED Requirements

### Requirement: Escape cancel guard rejects already-deleted elements
The system SHALL NOT execute the Escape cancel logic when `newElement` references an element that has `isDeleted` set to true. The cancel handler SHALL only act on genuinely in-progress elements that are not yet deleted or finalized.

#### Scenario: Finalized multipoint line is not deleted by subsequent Escape
- **WHEN** user creates a multi-point line (click to add points, then Escape or Enter to finalize), then selects the line tool again, and presses Escape without starting a new element
- **THEN** the previously finalized multi-point line remains in the scene, unchanged and visible

#### Scenario: Escape after failed tool switch does not affect existing elements
- **WHEN** user cancels a freedraw stroke with Escape, switches to line tool, attempts to draw (but interaction is stuck due to stale state), and presses Escape again
- **THEN** no previously created elements are deleted; only the current in-progress element (if any) is affected

### Requirement: Escape cancel only affects the current drag-create gesture
The system SHALL only soft-delete an element via the cancel handler if that element was created during the current pointer-down gesture and is actively being drag-created. Elements finalized by `actionFinalize` or completed via pointer-up SHALL NOT be eligible for cancellation.

#### Scenario: Previously created shapes survive Escape in selection mode
- **WHEN** user creates several shapes, switches to selection mode, and presses Escape
- **THEN** all previously created shapes remain in the scene; Escape only triggers deselection via `actionDeselect`, not element deletion
