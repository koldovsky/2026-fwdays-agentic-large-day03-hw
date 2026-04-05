## MODIFIED Requirements

### Requirement: Interaction state is fully reset after cancellation
The system SHALL reset all pointer interaction state after Escape cancellation. This includes clearing `newElement`, `suggestedBinding`, `snapLines`, `selectedLinearElement`, `startBoundElement` from application state, setting `cursorButton` to `"up"`, removing all window-level event listeners registered for the drag gesture, and triggering a scene re-render to ensure the deleted element is no longer visible.

#### Scenario: No ghost state after cancellation
- **WHEN** user cancels a shape creation with Escape, then clicks on the canvas
- **THEN** no selection highlight, resize handles, or snap lines appear from the cancelled element; the canvas behaves as if no creation was ever started

#### Scenario: Subsequent creation works after cancellation
- **WHEN** user cancels a shape creation with Escape, then selects a tool and creates a new element normally
- **THEN** the new element is created successfully with no interference from the previous cancelled gesture

#### Scenario: Line creation works after freedraw cancellation
- **WHEN** user cancels a freedraw stroke with Escape, then selects the line tool and clicks on canvas
- **THEN** a new line element is created normally; the line tool is fully functional
