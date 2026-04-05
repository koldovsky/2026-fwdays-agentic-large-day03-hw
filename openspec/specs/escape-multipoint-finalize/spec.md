### Requirement: Escape finalizes multi-point linear elements with committed points
When the user presses Escape during multi-point linear element drawing (line or arrow) and at least 2 points have been committed, the system SHALL finalize the element, keeping it in the scene with all committed points instead of deleting it. The trailing hover point that follows the cursor SHALL be removed.

#### Scenario: Escape between clicks with 2 committed points on a line
- **WHEN** the user selects the line tool, clicks to place a first point, clicks to place a second point, and then presses Escape while the pointer is up
- **THEN** the line element SHALL remain in the scene with `isDeleted === false`, SHALL have at least 2 points, and the tool SHALL switch to the selection tool

#### Scenario: Escape between clicks with 2 committed points on an arrow
- **WHEN** the user selects the arrow tool, clicks to place a first point, clicks to place a second point, and then presses Escape while the pointer is up
- **THEN** the arrow element SHALL remain in the scene with `isDeleted === false`, SHALL have at least 2 points, and the tool SHALL switch to the selection tool

#### Scenario: Escape between clicks with 3+ committed points
- **WHEN** the user selects the line tool, clicks to place 3 or more points, and then presses Escape
- **THEN** the line element SHALL remain in the scene with all committed points preserved and `isDeleted === false`

#### Scenario: Escape while pointer is down during multi-point drag
- **WHEN** the user is in multi-point mode, has committed at least 2 points, presses pointer down to start placing the next point, and presses Escape while the pointer is still down
- **THEN** the element SHALL be finalized with all previously committed points, `isDeleted === false`, and `multiElement` and `newElement` in AppState SHALL be `null`

#### Scenario: Escape after only 1 committed point
- **WHEN** the user selects the line tool, clicks once to place the first point, entering multi-point mode, and presses Escape before clicking a second time
- **THEN** the element SHALL be removed or marked as deleted because a single-point line has no meaningful geometry

### Requirement: Finalized multi-point element is not deleted by subsequent actions
After a multi-point element has been finalized by Escape, the element SHALL remain in the scene and SHALL NOT be deleted by subsequent Escape presses or tool switches.

#### Scenario: Second Escape after finalization does not delete element
- **WHEN** the user finalizes a multi-point line by pressing Escape and then presses Escape again
- **THEN** the finalized line SHALL still exist in the scene with `isDeleted === false`

#### Scenario: Selecting another tool after finalization preserves element
- **WHEN** the user finalizes a multi-point line by pressing Escape and then selects the rectangle tool and draws a rectangle
- **THEN** the finalized multi-point line SHALL still exist in the scene with `isDeleted === false`, and the new rectangle SHALL also exist

### Requirement: Single-segment Escape-to-cancel is not affected
The Escape-to-cancel behavior for single-segment pointer-drag creation of rectangles, ellipses, diamonds, freedraw, and single-segment linear elements SHALL continue to work as before, cancelling the element and removing it from the scene.

#### Scenario: Single-segment arrow Escape still cancels
- **WHEN** the user selects the arrow tool, presses pointer down and drags to create a single-segment arrow, and presses Escape during the drag
- **THEN** the arrow element SHALL be removed from the scene and SHALL NOT appear in the elements array

### Requirement: Multi-point Escape scenarios are covered by automated tests
The automated test suite SHALL include coverage for multi-point line Escape in both the single committed point case and the two-or-more committed points (finalize) case, so regressions that remove a valid multi-point element on Escape are caught.

#### Scenario: Test asserts Escape after one committed point discards invalid geometry
- **WHEN** the test suite runs multi-point line creation tests
- **THEN** a test SHALL simulate one click to commit the first point, press Escape, and assert the in-progress element is removed or marked deleted and is not left as a visible single-point line

#### Scenario: Test asserts Escape after two or more committed points preserves the line
- **WHEN** the test suite runs multi-point line creation tests
- **THEN** a test SHALL simulate at least two committed points, press Escape, and assert the line remains in the scene with `isDeleted === false` and at least two points
