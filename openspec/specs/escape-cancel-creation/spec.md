### Requirement: Escape cancels drag-create of generic shapes
The system SHALL cancel element creation when the user presses Escape during a pointer-drag creation gesture for generic shapes such as rectangle, ellipse, diamond, frame, and magicframe. The partially created element SHALL be removed from the scene's elements array via `updateScene`, ensuring the non-deleted element cache is rebuilt. No new element SHALL remain visible or selectable.

#### Scenario: Cancel rectangle creation mid-drag
- **GIVEN** the canvas is empty and the application is in the default selection mode
- **WHEN** the user selects the rectangle tool, presses pointer down on the canvas, drags to create a rectangle, and presses Escape before releasing the pointer
- **THEN** the rectangle element SHALL be removed from the scene's elements array, `newElement` SHALL be `null`, the tool SHALL reset to the selection tool, and `scene.getNonDeletedElements()` SHALL NOT contain the element

#### Scenario: Cancel ellipse creation mid-drag
- **WHEN** the user selects the ellipse tool, presses pointer down on the canvas, drags to create an ellipse, and presses Escape before releasing the pointer
- **THEN** the ellipse element SHALL be removed from the scene's elements array and `scene.getNonDeletedElements()` SHALL NOT contain the element

#### Scenario: Cancel diamond creation mid-drag
- **WHEN** the user selects the diamond tool, presses pointer down on the canvas, drags, and presses Escape before releasing the pointer
- **THEN** the diamond element SHALL be removed from the scene's elements array and `scene.getNonDeletedElements()` SHALL NOT contain the element

### Requirement: Escape cancels freedraw stroke creation
The system SHALL cancel freedraw stroke creation when the user presses Escape during an active freedraw pointer-drag gesture. The partial stroke SHALL be removed from the scene's elements array with no residual points or visible elements.

#### Scenario: Cancel freedraw stroke mid-draw
- **WHEN** the user selects the freedraw tool, presses pointer down on the canvas, draws a stroke, and presses Escape before releasing the pointer
- **THEN** the freedraw element SHALL be removed from the scene's elements array, `newElement` SHALL be `null`, and `scene.getNonDeletedElements()` SHALL NOT contain the element

### Requirement: Escape cancels single-segment linear element creation
The system SHALL cancel creation of single-segment linear elements such as arrows and lines when the user presses Escape during a pointer-drag creation gesture, provided the element is not in multi-point creation mode. The element SHALL be removed from the scene's elements array via `updateScene`.

#### Scenario: Cancel single-segment arrow creation mid-drag
- **WHEN** the user selects the arrow tool, presses pointer down on the canvas, drags to create an arrow, and presses Escape before releasing the pointer
- **THEN** the arrow element SHALL be removed from the scene's elements array and `scene.getNonDeletedElements()` SHALL NOT contain the element

#### Scenario: Cancel single-segment line creation mid-drag
- **WHEN** the user selects the line tool, presses pointer down, drags, and presses Escape before releasing the pointer
- **THEN** the line element SHALL be removed from the scene's elements array and `scene.getNonDeletedElements()` SHALL NOT contain the element

### Requirement: Interaction state is fully reset after cancellation
The system SHALL reset all pointer interaction state after Escape cancellation. This includes clearing `newElement`, `selectedLinearElement`, `startBoundElement`, `suggestedBindings`, and `snapLines` from application state, setting `cursorButton` to `"up"`, removing all window-level event listeners registered for the drag gesture, and triggering a scene re-render so the cancelled element is no longer visible.

#### Scenario: No ghost state after cancellation
- **WHEN** the user cancels a shape creation with Escape and then clicks on the canvas
- **THEN** no selection highlight, resize handles, or snap lines appear from the cancelled element, and the canvas behaves as if no creation was ever started

#### Scenario: Subsequent creation works after cancellation
- **WHEN** the user cancels a shape creation with Escape and then selects a tool and creates a new element normally
- **THEN** the new element is created successfully with no interference from the previous cancelled gesture

#### Scenario: Line creation works after freedraw cancellation
- **WHEN** the user cancels a freedraw stroke with Escape, then selects the line tool and clicks on the canvas
- **THEN** a new line element is created normally and the line tool is fully functional

#### Scenario: cursorButton is up and selectedLinearElement is null after cancel
- **WHEN** the user cancels an arrow creation with Escape
- **THEN** `cursorButton` is `"up"` and `selectedLinearElement` is `null`

### Requirement: Tool resets to selection after cancellation unless locked
The system SHALL reset the active tool to the preferred selection tool after Escape cancellation. If the tool is locked, the system SHALL keep the current tool active.

#### Scenario: Tool resets to selection after cancel
- **WHEN** the user selects the rectangle tool, does not lock it, starts a drag-create gesture, and presses Escape
- **THEN** the active tool changes to the selection tool

#### Scenario: Locked tool remains active after cancel
- **WHEN** the user locks the rectangle tool, starts a drag-create gesture, and presses Escape
- **THEN** the active tool remains rectangle, ready for the next creation attempt

### Requirement: Multi-point linear creation Escape behavior is preserved
The system SHALL NOT change the existing Escape behavior for multi-point linear element creation. Escape SHALL continue to finalize and complete the element in multi-point mode instead of cancelling it.

#### Scenario: Multi-point arrow Escape still finalizes
- **WHEN** the user selects the arrow tool, clicks to create a first point, clicks to create a second point to enter multi-point mode, and presses Escape
- **THEN** the arrow element is finalized with the placed points and is not cancelled

#### Scenario: Multi-point line Escape still finalizes
- **WHEN** the user selects the line tool, clicks to add multiple points, and presses Escape
- **THEN** the line element is finalized with the placed points and is not cancelled

### Requirement: Multi-point Escape is handled before generic drag-create cancel
When multi-point linear creation is active, the system SHALL apply multi-point Escape rules (finalize or discard per `escape-multipoint-finalize`) before any generic Escape cancel logic that removes an in-progress element from the scene as if it were an incomplete single-drag shape.

#### Scenario: Two or more committed points are not removed by generic cancel
- **WHEN** the user is drawing a multi-point line with at least two committed points and presses Escape
- **THEN** the generic drag-create Escape cancel path SHALL NOT delete the element solely because `newElement` was non-null during creation; the element SHALL be finalized or otherwise handled according to multi-point rules

#### Scenario: Multi-point mode is distinguishable from single-segment drag on Escape
- **WHEN** the user is in multi-point mode for a line or arrow and presses Escape
- **THEN** the system SHALL NOT treat the gesture as single-segment pointer-drag cancellation unless the multi-point rules explicitly discard the element (e.g. only one committed point)
