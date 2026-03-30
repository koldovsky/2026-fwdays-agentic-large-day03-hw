## ADDED Requirements

### Requirement: Minimap toggle

The system SHALL provide a way to show and hide the minimap overlay. The minimap SHALL be hidden by default. Users SHALL be able to toggle it via a keyboard shortcut (`M`) and via a toolbar button. The `minimapEnabled` state SHALL be persisted to localStorage.

#### Scenario: Toggle minimap on via keyboard

- **WHEN** the user presses the `M` key with no text input focused
- **THEN** the minimap overlay becomes visible in the bottom-right corner of the canvas

#### Scenario: Toggle minimap off via keyboard

- **WHEN** the minimap is visible and the user presses `M`
- **THEN** the minimap overlay is hidden

#### Scenario: Default state

- **WHEN** the app loads for the first time (no persisted state)
- **THEN** the minimap is hidden

### Requirement: Minimap scene overview

The minimap SHALL render a scaled-down representation of all elements currently in the scene. Elements SHALL be represented as simplified shapes (axis-aligned bounding rectangles with approximate fill color). The minimap SHALL fit the entire scene bounds within its canvas area with padding.

#### Scenario: Elements are present

- **WHEN** the minimap is visible and the scene contains at least one element
- **THEN** all elements are represented as scaled-down rectangles within the minimap canvas

#### Scenario: Empty scene

- **WHEN** the minimap is visible and the scene contains no elements
- **THEN** the minimap canvas shows an empty background with no element representations

#### Scenario: Elements change

- **WHEN** an element is added, removed, or modified
- **THEN** the minimap canvas re-renders within 300ms to reflect the change

#### Scenario: Scroll or zoom only (no element change)

- **WHEN** the user scrolls or zooms the main canvas without modifying elements
- **THEN** the minimap canvas does NOT re-render (only the viewport rectangle moves)

### Requirement: Viewport indicator

The minimap SHALL display a rectangle indicating the portion of the scene currently visible in the main canvas. The rectangle SHALL update in real-time as the user scrolls or zooms.

#### Scenario: Viewport rectangle position

- **WHEN** the user scrolls the main canvas
- **THEN** the viewport rectangle on the minimap moves to reflect the new visible area

#### Scenario: Viewport rectangle size

- **WHEN** the user zooms in on the main canvas
- **THEN** the viewport rectangle on the minimap becomes smaller, reflecting the smaller visible scene area

#### Scenario: Viewport rectangle at canvas edge

- **WHEN** the visible area extends beyond the scene element bounds
- **THEN** the viewport rectangle is clamped or partially shown at the minimap edge without errors

### Requirement: Click-to-pan via minimap

The minimap SHALL allow the user to click anywhere on it to re-center the main canvas viewport on that scene position.

#### Scenario: Click on minimap

- **WHEN** the user clicks a point on the minimap canvas
- **THEN** the main canvas pans so that the clicked scene point is centered in the viewport

#### Scenario: Drag viewport rectangle

- **WHEN** the user clicks and drags on the minimap
- **THEN** the main canvas pans continuously to follow the drag, updating in real-time

### Requirement: Minimap performance guard

The minimap SHALL not cause the main canvas frame rate to drop below an acceptable threshold. If rendering overhead is detected, the minimap re-render SHALL be deferred using `requestIdleCallback` or debouncing.

#### Scenario: Large scene (>500 elements)

- **WHEN** the minimap is visible and the scene contains more than 500 elements
- **THEN** minimap re-renders are debounced and do not block main canvas interactions

#### Scenario: Minimap hidden

- **WHEN** `minimapEnabled` is false
- **THEN** no minimap rendering work is performed (no canvas updates, no element iteration)
