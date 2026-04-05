### Requirement: Escape cancel removes element from Scene non-deleted cache immediately
The Escape cancel handler SHALL remove the in-progress element from the scene's elements array via `updateScene`, which rebuilds the non-deleted element cache. The element SHALL disappear from the canvas on the very next render frame after Escape is pressed and SHALL no longer be returned by `getNonDeletedElements()`.

#### Scenario: Rectangle disappears from canvas immediately on Escape
- **WHEN** the user selects the rectangle tool, presses pointer down, drags to create a rectangle, and presses Escape
- **THEN** the rectangle is not present in `scene.getNonDeletedElements()` and is not visible on the canvas without requiring any additional user interaction

#### Scenario: Freedraw stroke disappears from canvas immediately on Escape
- **WHEN** the user selects the freedraw tool, presses pointer down, draws a stroke, and presses Escape
- **THEN** the freedraw element is not present in `scene.getNonDeletedElements()` and is not visible on the canvas

#### Scenario: Arrow disappears from canvas immediately on Escape
- **WHEN** the user selects the arrow tool, presses pointer down, drags to create an arrow, and presses Escape
- **THEN** the arrow is not present in `scene.getNonDeletedElements()` and is not visible on the canvas

### Requirement: Cancelled element creates no undo history entry
The Escape cancel handler SHALL pass `captureUpdate: CaptureUpdateAction.NEVER` to `updateScene` so the store does not capture a snapshot for the cancelled element. The cancelled element SHALL not appear in the undo stack.

#### Scenario: Undo after cancel does not restore cancelled element
- **WHEN** the user creates a rectangle, cancels it with Escape, and then presses Ctrl+Z
- **THEN** no rectangle appears, and undo operates on the previous state before the cancelled creation

### Requirement: Finalized multi-point elements are never affected by Escape cancel
The Escape cancel handler SHALL only act when `newElement` is non-null and `multiElement` is `null`. A finalized multi-point line or arrow that exists in the scene SHALL NOT be removed, soft-deleted, or modified by the Escape cancel handler during the Escape press or on any subsequent operation.

#### Scenario: Finalized multi-point line survives Escape press
- **WHEN** the user creates a multi-point line by clicking to add points and pressing Escape to finalize, and then presses Escape again
- **THEN** the finalized line remains in the scene with `isDeleted === false` and is still visible on the canvas

#### Scenario: Finalized multi-point line survives subsequent drawing operations
- **WHEN** the user creates a multi-point line, finalizes it, then selects another tool and draws a new element
- **THEN** the finalized multi-point line remains in the scene unchanged alongside the new element
