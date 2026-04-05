## ADDED Requirements

### Requirement: Escape cancels drag-create of generic shapes
The system SHALL cancel element creation when the user presses Escape during a pointer-drag creation gesture for generic shapes (rectangle, ellipse, diamond, frame, magicframe). The partially-created element SHALL be removed from the scene, and no new element SHALL remain visible or selectable.

#### Scenario: Cancel rectangle creation mid-drag
- **WHEN** user selects the rectangle tool, presses pointer down on canvas, drags to create a rectangle, and presses Escape before releasing the pointer
- **THEN** the rectangle element is removed from the scene, `newElement` is null, the tool resets to the selection tool, and no element exists at the drag location

#### Scenario: Cancel ellipse creation mid-drag
- **WHEN** user selects the ellipse tool, presses pointer down on canvas, drags to create an ellipse, and presses Escape before releasing the pointer
- **THEN** the ellipse element is removed from the scene and no element remains

#### Scenario: Cancel diamond creation mid-drag
- **WHEN** user selects the diamond tool, presses pointer down on canvas, drags, and presses Escape before releasing the pointer
- **THEN** the diamond element is removed from the scene and no element remains

### Requirement: Escape cancels freedraw stroke creation
The system SHALL cancel freedraw stroke creation when the user presses Escape during an active freedraw pointer-drag gesture. The partial stroke SHALL be removed from the scene with no residual points or elements.

#### Scenario: Cancel freedraw stroke mid-draw
- **WHEN** user selects the freedraw tool, presses pointer down on canvas, draws a stroke, and presses Escape before releasing the pointer
- **THEN** the freedraw element is removed from the scene, `newElement` is null, and no stroke or partial element remains

### Requirement: Escape cancels single-segment linear element creation
The system SHALL cancel creation of single-segment linear elements (arrow, line) when the user presses Escape during a pointer-drag creation gesture, provided the element is not in multi-point creation mode.

#### Scenario: Cancel single-segment arrow creation mid-drag
- **WHEN** user selects the arrow tool, presses pointer down on canvas, drags to create an arrow, and presses Escape before releasing the pointer
- **THEN** the arrow element is removed from the scene and no element remains

#### Scenario: Cancel single-segment line creation mid-drag
- **WHEN** user selects the line tool, presses pointer down, drags, and presses Escape before releasing the pointer
- **THEN** the line element is removed from the scene and no element remains

### Requirement: Interaction state is fully reset after cancellation
The system SHALL reset all pointer interaction state after Escape cancellation. This includes clearing `newElement`, `suggestedBindings`, and `snapLines` from application state, and removing all window-level event listeners registered for the drag gesture.

#### Scenario: No ghost state after cancellation
- **WHEN** user cancels a shape creation with Escape, then clicks on the canvas
- **THEN** no selection highlight, resize handles, or snap lines appear from the cancelled element; the canvas behaves as if no creation was ever started

#### Scenario: Subsequent creation works after cancellation
- **WHEN** user cancels a shape creation with Escape, then selects a tool and creates a new element normally
- **THEN** the new element is created successfully with no interference from the previous cancelled gesture

### Requirement: Tool resets to selection after cancellation unless locked
The system SHALL reset the active tool to the preferred selection tool after Escape cancellation. If the tool is locked (`activeTool.locked === true`), the system SHALL keep the current tool active.

#### Scenario: Tool resets to selection after cancel
- **WHEN** user selects the rectangle tool (not locked), starts a drag-create, and presses Escape
- **THEN** the active tool changes to the selection tool

#### Scenario: Locked tool remains active after cancel
- **WHEN** user locks the rectangle tool, starts a drag-create, and presses Escape
- **THEN** the active tool remains rectangle, ready for the next creation attempt

### Requirement: Multi-point linear creation Escape behavior is preserved
The system SHALL NOT change the existing Escape behavior for multi-point linear element creation (polylines, multi-point arrows created by clicking). Escape SHALL continue to finalize/complete the element in multi-point mode.

#### Scenario: Multi-point arrow Escape still finalizes
- **WHEN** user selects the arrow tool, clicks to create first point, clicks to create second point (entering multi-point mode), and presses Escape
- **THEN** the arrow element is finalized with the placed points, not cancelled

#### Scenario: Multi-point line Escape still finalizes
- **WHEN** user selects the line tool, clicks to add multiple points, and presses Escape
- **THEN** the line element is finalized with the placed points, not cancelled
