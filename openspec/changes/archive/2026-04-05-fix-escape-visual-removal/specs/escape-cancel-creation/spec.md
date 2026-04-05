## MODIFIED Requirements

### Requirement: Escape cancels drag-create of generic shapes
The system SHALL cancel element creation when the user presses Escape during a pointer-drag creation gesture for generic shapes (rectangle, ellipse, diamond, frame, magicframe). The partially-created element SHALL be removed from the Scene's elements array via `updateScene` with a filtered array, ensuring the `nonDeletedElements` cache is rebuilt. No new element SHALL remain visible or selectable.

#### Scenario: Cancel rectangle creation mid-drag
- **WHEN** user selects the rectangle tool, presses pointer down on canvas, drags to create a rectangle, and presses Escape before releasing the pointer
- **THEN** the rectangle element is removed from the Scene's elements array, `newElement` is null, the tool resets to the selection tool, and `scene.getNonDeletedElements()` does not contain the element

#### Scenario: Cancel ellipse creation mid-drag
- **WHEN** user selects the ellipse tool, presses pointer down on canvas, drags to create an ellipse, and presses Escape before releasing the pointer
- **THEN** the ellipse element is removed from the Scene's elements array and `scene.getNonDeletedElements()` does not contain the element

#### Scenario: Cancel diamond creation mid-drag
- **WHEN** user selects the diamond tool, presses pointer down on canvas, drags, and presses Escape before releasing the pointer
- **THEN** the diamond element is removed from the Scene's elements array and `scene.getNonDeletedElements()` does not contain the element

### Requirement: Escape cancels freedraw stroke creation
The system SHALL cancel freedraw stroke creation when the user presses Escape during an active freedraw pointer-drag gesture. The partial stroke SHALL be removed from the Scene's elements array via `updateScene` with no residual points or elements.

#### Scenario: Cancel freedraw stroke mid-draw
- **WHEN** user selects the freedraw tool, presses pointer down on canvas, draws a stroke, and presses Escape before releasing the pointer
- **THEN** the freedraw element is removed from the Scene's elements array, `newElement` is null, and `scene.getNonDeletedElements()` does not contain the element

### Requirement: Escape cancels single-segment linear element creation
The system SHALL cancel creation of single-segment linear elements (arrow, line) when the user presses Escape during a pointer-drag creation gesture, provided the element is not in multi-point creation mode. The element SHALL be removed from the Scene's elements array via `updateScene`.

#### Scenario: Cancel single-segment arrow creation mid-drag
- **WHEN** user selects the arrow tool, presses pointer down on canvas, drags to create an arrow, and presses Escape before releasing the pointer
- **THEN** the arrow element is removed from the Scene's elements array and `scene.getNonDeletedElements()` does not contain the element

#### Scenario: Cancel single-segment line creation mid-drag
- **WHEN** user selects the line tool, presses pointer down, drags, and presses Escape before releasing the pointer
- **THEN** the line element is removed from the Scene's elements array and `scene.getNonDeletedElements()` does not contain the element

### Requirement: Interaction state is fully reset after cancellation
The system SHALL reset all pointer interaction state after Escape cancellation. This includes clearing `newElement`, `selectedLinearElement`, `startBoundElement`, `suggestedBindings`, `snapLines`, and `cursorButton` from application state, and removing all window-level event listeners registered for the drag gesture.

#### Scenario: No ghost state after cancellation
- **WHEN** user cancels a shape creation with Escape, then clicks on the canvas
- **THEN** no selection highlight, resize handles, or snap lines appear from the cancelled element; the canvas behaves as if no creation was ever started

#### Scenario: Subsequent creation works after cancellation
- **WHEN** user cancels a shape creation with Escape, then selects a tool and creates a new element normally
- **THEN** the new element is created successfully with no interference from the previous cancelled gesture

#### Scenario: cursorButton is up and selectedLinearElement is null after cancel
- **WHEN** user cancels an arrow creation with Escape
- **THEN** `cursorButton` is `"up"` and `selectedLinearElement` is `null`
