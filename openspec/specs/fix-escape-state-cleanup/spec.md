### Requirement: Escape cancellation fully resets linear element editing state
The system SHALL clear `selectedLinearElement` to `null` when Escape cancels an in-progress element creation. Subsequent linear element creation SHALL start from a clean state without inheriting stale editing context from the cancelled element.

#### Scenario: Line tool works after freedraw Escape cancel
- **WHEN** the user selects the freedraw tool, starts drawing a stroke, presses Escape to cancel, then selects the line tool and clicks on the canvas to start a line
- **THEN** a new line element is created normally at the click position, and the user can place points or drag to draw the line

#### Scenario: Arrow tool works after shape Escape cancel
- **WHEN** the user selects the rectangle tool, starts dragging to create a rectangle, presses Escape to cancel, then selects the arrow tool and clicks on the canvas
- **THEN** a new arrow element is created normally with no interference from the cancelled rectangle

### Requirement: Escape cancellation resets startBoundElement
The system SHALL clear `startBoundElement` to `null` when Escape cancels an in-progress element creation. This prevents stale binding references from interfering with subsequent arrow or line creation.

#### Scenario: Arrow binding works after cancelled arrow
- **WHEN** the user starts dragging an arrow from a shape, presses Escape to cancel, then starts a new arrow from the same or a different shape
- **THEN** the new arrow binds correctly to the source shape without errors or stale references

### Requirement: Escape cancellation resets cursorButton state
The system SHALL set `cursorButton` to `"up"` when Escape cancels an in-progress element creation. This ensures the application does not remain in a pointer-down state after cancellation.

#### Scenario: No stuck pointer-down state after cancel
- **WHEN** the user starts dragging to create a shape and presses Escape to cancel
- **THEN** `cursorButton` is `"up"`, and subsequent pointer interactions behave as if no pointer button is held

### Requirement: Cancelled element disappears from canvas immediately
The system SHALL trigger a scene re-render after soft-deleting the in-progress element during Escape cancellation. The element SHALL not remain visible on the canvas after the Escape key is processed.

#### Scenario: Rectangle disappears on Escape
- **WHEN** the user starts dragging to create a rectangle and presses Escape
- **THEN** the rectangle is not visible on the canvas after the current render cycle completes

#### Scenario: Freedraw stroke disappears on Escape
- **WHEN** the user starts drawing a freedraw stroke and presses Escape
- **THEN** the partial stroke is not visible on the canvas after the current render cycle completes
