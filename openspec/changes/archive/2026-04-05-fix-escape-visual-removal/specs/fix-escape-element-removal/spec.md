## ADDED Requirements

### Requirement: Escape cancel removes element from Scene non-deleted cache immediately
The Escape cancel handler SHALL remove the in-progress element from the Scene's elements array via `updateScene` (which calls `replaceAllElements`), ensuring the `nonDeletedElements` cache is rebuilt and the element is no longer returned by `getNonDeletedElements()`. The element SHALL disappear from the canvas on the very next render frame after Escape is pressed.

#### Scenario: Rectangle disappears from canvas immediately on Escape
- **WHEN** user selects the rectangle tool, presses pointer down, drags to create a rectangle, and presses Escape
- **THEN** the rectangle is not present in `scene.getNonDeletedElements()` and is not visible on the canvas, without requiring any additional user interaction

#### Scenario: Freedraw stroke disappears from canvas immediately on Escape
- **WHEN** user selects the freedraw tool, presses pointer down, draws a stroke, and presses Escape
- **THEN** the freedraw element is not present in `scene.getNonDeletedElements()` and is not visible on the canvas

#### Scenario: Arrow disappears from canvas immediately on Escape
- **WHEN** user selects the arrow tool, presses pointer down, drags to create an arrow, and presses Escape
- **THEN** the arrow is not present in `scene.getNonDeletedElements()` and is not visible on the canvas

### Requirement: Cancelled element creates no undo history entry
The Escape cancel handler SHALL pass `captureUpdate: CaptureUpdateAction.NEVER` to `updateScene` so that the Store does not capture a snapshot for the cancelled element. The cancelled element SHALL not appear in the undo stack.

#### Scenario: Undo after cancel does not restore cancelled element
- **WHEN** user creates a rectangle, cancels it with Escape, and then presses Ctrl+Z
- **THEN** no rectangle appears; the undo operates on the previous state before the cancelled creation

### Requirement: Finalized multi-point elements are never affected by Escape cancel
The Escape cancel handler SHALL only act when `this.state.newElement` is non-null AND `this.state.multiElement` is null. A finalized multi-point line or arrow that exists in the scene SHALL NOT be removed, soft-deleted, or modified by the Escape cancel handler at any point — neither during the Escape press nor on any subsequent operation.

#### Scenario: Finalized multi-point line survives Escape press
- **WHEN** user creates a multi-point line (click-click-Escape to finalize), and then presses Escape again
- **THEN** the finalized line remains in the scene with `isDeleted === false` and is still visible on canvas

#### Scenario: Finalized multi-point line survives subsequent drawing operations
- **WHEN** user creates a multi-point line, finalizes it, then selects another tool and draws a new element
- **THEN** the finalized multi-point line remains in the scene unchanged alongside the new element
