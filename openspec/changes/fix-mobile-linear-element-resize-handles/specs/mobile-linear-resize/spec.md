## ADDED Requirements

### Requirement: Multi-point linear elements SHALL display bounding box on mobile devices

The system SHALL render a selection frame (bounding box) with transform handles for single-selected linear elements that have more than 2 points, regardless of whether the device is a mobile/tablet device.

#### Scenario: Multi-point polyline selected on mobile shows bounding box

- **GIVEN** a mobile device user has a single multi-point linear element (> 2 points) on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL display a selection frame with resize handles around the element

#### Scenario: Multi-point polyline selected on tablet shows bounding box

- **GIVEN** a tablet device user has a single multi-point linear element (> 2 points) on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL display a selection frame with resize handles around the element

#### Scenario: Multi-point polyline selected on desktop continues to show bounding box

- **GIVEN** a desktop device user has a single multi-point linear element (> 2 points) on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL display a selection frame with resize handles (existing behavior preserved)

### Requirement: Simple 2-point linear elements SHALL NOT display bounding box handles

The system SHALL suppress transform handle interaction for linear elements with exactly 2 points on all platforms, maintaining the existing UX simplification for simple lines.

#### Scenario: 2-point line selected on mobile has no transform handles

- **GIVEN** a mobile device user has a single 2-point linear element on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL NOT display transform handles for that element

#### Scenario: 2-point line selected on desktop has no transform handles

- **GIVEN** a desktop device user has a single 2-point linear element on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL NOT display transform handles for that element

### Requirement: Transform handle interaction SHALL work for multi-point linear elements on mobile

The system SHALL allow pointer-down (touch) interactions with transform handles on multi-point linear elements on mobile devices, enabling resize and rotation operations.

#### Scenario: User resizes a multi-point polyline via corner handle on mobile

- **GIVEN** a mobile device user has selected a multi-point linear element that displays transform handles
- **WHEN** the user touches a corner transform handle and drags
- **THEN** the element SHALL resize proportionally from that corner

#### Scenario: User rotates a multi-point polyline via rotation handle on mobile

- **GIVEN** a mobile device user has selected a multi-point linear element that displays transform handles
- **WHEN** the user touches the rotation handle and drags
- **THEN** the element SHALL rotate around its center

### Requirement: Phone form factor SHALL use corner-only handles for multi-point linear elements

On phone form factor devices, the system SHALL display only corner transform handles (not edge/side handles) for multi-point linear elements, consistent with existing phone behavior for other element types.

#### Scenario: Phone shows corner handles only for multi-point polyline

- **GIVEN** a phone form factor device user has a multi-point linear element on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL display corner transform handles but SHALL NOT display edge (north/south/east/west) resize handles

#### Scenario: Tablet shows full handles for multi-point polyline

- **GIVEN** a tablet form factor device user has a multi-point linear element on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL display both corner and applicable edge transform handles

### Requirement: Elbow arrows SHALL remain excluded from bounding box on all platforms

The existing behavior where single-selected elbow arrows do not display a bounding box SHALL be preserved on all platforms.

#### Scenario: Elbow arrow selected on mobile has no bounding box

- **GIVEN** a mobile device user has a single elbow arrow element on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL NOT display a bounding box or transform handles

#### Scenario: Elbow arrow selected on desktop has no bounding box

- **GIVEN** a desktop device user has a single elbow arrow element on the canvas
- **WHEN** the user selects that element
- **THEN** the system SHALL NOT display a bounding box or transform handles

### Requirement: Edge cases SHALL behave correctly

The system SHALL handle degenerate and boundary cases for linear element selection without errors.

#### Scenario: Linear element with exactly 1 point has no bounding box

- **GIVEN** a linear element with only 1 point exists on the canvas (degenerate case)
- **WHEN** the user selects that element on any device
- **THEN** the system SHALL NOT display a bounding box or transform handles

#### Scenario: Empty selection has no bounding box

- **GIVEN** no elements are selected on the canvas
- **WHEN** the system evaluates bounding box visibility
- **THEN** the system SHALL NOT attempt to render a bounding box or transform handles

#### Scenario: Multi-element selection including linear elements shows bounding box on mobile

- **GIVEN** a mobile device user has multiple elements selected (including linear elements with any point count)
- **WHEN** the selection contains more than one element
- **THEN** the system SHALL display a bounding box with transform handles around the combined selection
