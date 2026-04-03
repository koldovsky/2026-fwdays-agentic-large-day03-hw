## ADDED Requirements

### Requirement: Triangle is available from the shape picker

The editor SHALL expose triangle creation alongside existing primitive shapes (e.g. rectangle, diamond, ellipse) using the same UI patterns for tool selection, including keyboard discoverability consistent with existing `KEYS` usage.

#### Scenario: User selects triangle tool

- **WHEN** the user chooses the triangle shape from the shape picker
- **THEN** subsequent drag-to-create operations create a triangle-class element

### Requirement: Fill and stroke controls select triangle variant

The system SHALL create **`triangle`** when the fill style implies a filled shape and **`triangle_outline`** when the style implies outline-only, consistent with how rectangle vs rectangle-outline (or equivalent) is selected elsewhere in the UI.

#### Scenario: Filled style creates solid triangle

- **WHEN** the user creates a triangle with a filled style active
- **THEN** the new element has type `triangle`

#### Scenario: Outline style creates outline triangle

- **WHEN** the user creates a triangle with outline-only style active
- **THEN** the new element has type `triangle_outline`

### Requirement: Arrow binding uses triangle outline geometry

For elements of type `triangle` and `triangle_outline`, the system SHALL compute bound arrow attachment and hit geometry using the **triangle polygon** in scene space (including rotation and scale), not the element’s axis-aligned bounding box alone.

#### Scenario: Sharp arrow binds to triangle edge

- **WHEN** a user binds a sharp arrow endpoint to a triangle side
- **THEN** the attachment lies on the visible triangle edge, not on a corner of the bounding rectangle that lies outside the triangle

#### Scenario: Round arrow binds to triangle edge

- **WHEN** a user binds a round arrow endpoint to a triangle
- **THEN** the attachment follows the same polygon-based geometry as sharp binding for that triangle

#### Scenario: Elbow arrow follows triangle geometry

- **WHEN** a user uses elbow (orthogonal) arrow mode with an endpoint bound to a triangle
- **THEN** connector routing and snap respect the triangle outline rather than treating the bindable region as a full rectangle frame

### Requirement: Rotated triangles preserve correct binding

When a triangle or triangle_outline has non-zero rotation, the system SHALL apply the same transform used for rendering when resolving binding points and elbow routing against that element.

#### Scenario: Rotated triangle binding

- **WHEN** a triangle is rotated and an arrow endpoint is bound to it
- **THEN** the attachment point lies on the rotated triangle outline as shown on canvas

### Requirement: Automated verification

The change SHALL include automated tests that fail if triangle binding regresses to AABB-only behavior for at least one arrow mode, including a case with **rotation**.

#### Scenario: Tests guard polygon binding

- **WHEN** tests are run for the triangle binding implementation
- **THEN** they assert scene-space polygon-based attachment (not merely bounding-box corners) for covered modes and a rotated triangle case
