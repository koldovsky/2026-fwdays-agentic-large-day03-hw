## ADDED Requirements

### Requirement: Toast when empty-canvas drag implies draw intent in selection-like tools

The editor SHALL show a dismissible toast with a localized message when all of the following hold at the end of a pointer gesture:

- The active tool type is `selection` or `lasso`.
- The user performed a box-selection gesture and/or extended the lasso trail during the gesture (as defined by the implementation’s pointer state).
- The pointer down did not hit a non-deleted canvas element (empty canvas start).
- The user did not resize, rotate, or crop during the gesture; did not drag a selection; and is not editing linear element points.
- No new element was being created during the gesture (`newElement` is null at evaluation time).
- The pointer travel distance in screen pixels exceeds the editor’s dragging threshold.

#### Scenario: Selection tool empty drag shows hint once per session

- **WHEN** the active tool is `selection`, the user pointer-downs on empty canvas, drags farther than the dragging threshold, and releases pointer
- **AND** the gesture did not meet any exclusion in this requirement
- **AND** the session has not yet recorded that this hint was shown
- **THEN** the editor SHALL display a toast whose message explains that a shape tool must be selected to draw
- **AND** the editor SHALL record in `sessionStorage` that the hint was shown for this browser tab session

#### Scenario: Lasso tool empty drag can show the same hint

- **WHEN** the active tool is `lasso` and the user completes a qualifying empty-canvas lasso gesture per implementation rules
- **AND** exclusions do not apply and the session cap has not been reached
- **THEN** the editor SHALL show the same category of toast and apply the same session frequency cap

#### Scenario: No toast when pointer down hits an element

- **WHEN** the pointer down hits a non-deleted element
- **THEN** the editor SHALL NOT show this toast for that gesture

#### Scenario: No toast when sessionStorage is unavailable

- **WHEN** `sessionStorage` is not available to the implementation
- **THEN** the editor SHALL NOT throw and SHALL NOT show this toast (or SHALL skip persistence only, per implementation choice that avoids duplicate spam in embedded contexts)

### Requirement: Localized message for the hint

The toast message SHALL be loaded from the i18n system (e.g. `toast.selectShapeToolToDraw` or equivalent) so that the default locale displays clear English and other locales can ship translations per project locale policy.

#### Scenario: English locale includes the key

- **WHEN** the application locale is English
- **THEN** the toast SHALL resolve to a non-empty string describing that a shape tool is needed to draw
