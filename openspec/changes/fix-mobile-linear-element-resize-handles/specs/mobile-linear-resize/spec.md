## ADDED Requirements

### Requirement: Multi-point linear elements SHALL display bounding box on mobile devices

The system SHALL render a selection frame (bounding box) with transform handles for single-selected linear elements that have more than 2 points, regardless of whether the device is a mobile/tablet device.

#### Scenario: Multi-point polyline selected on mobile shows bounding box

- **WHEN** a user on a mobile device selects a single linear element with more than 2 points (e.g., a polyline from the Basic Shapes library)
- **THEN** the system SHALL display a selection frame with resize handles around the element

#### Scenario: Multi-point polyline selected on tablet shows bounding box

- **WHEN** a user on a tablet device selects a single linear element with more than 2 points
- **THEN** the system SHALL display a selection frame with resize handles around the element

#### Scenario: Multi-point polyline selected on desktop continues to show bounding box

- **WHEN** a user on a desktop device selects a single linear element with more than 2 points
- **THEN** the system SHALL display a selection frame with resize handles (existing behavior preserved)

### Requirement: Simple 2-point linear elements SHALL NOT display bounding box handles

The system SHALL suppress transform handle interaction for linear elements with exactly 2 points on all platforms, maintaining the existing UX simplification for simple lines.

#### Scenario: 2-point line selected on mobile has no transform handles

- **WHEN** a user on a mobile device selects a single linear element with exactly 2 points
- **THEN** the system SHALL NOT display transform handles for that element

#### Scenario: 2-point line selected on desktop has no transform handles

- **WHEN** a user on a desktop device selects a single linear element with exactly 2 points
- **THEN** the system SHALL NOT display transform handles for that element

### Requirement: Transform handle interaction SHALL work for multi-point linear elements on mobile

The system SHALL allow pointer-down (touch) interactions with transform handles on multi-point linear elements on mobile devices, enabling resize and rotation operations.

#### Scenario: User resizes a multi-point polyline via corner handle on mobile

- **WHEN** a user on a mobile device touches a corner transform handle of a selected multi-point linear element and drags
- **THEN** the element SHALL resize proportionally from that corner

#### Scenario: User rotates a multi-point polyline via rotation handle on mobile

- **WHEN** a user on a mobile device touches the rotation handle of a selected multi-point linear element and drags
- **THEN** the element SHALL rotate around its center

### Requirement: Phone form factor SHALL use corner-only handles for multi-point linear elements

On phone form factor devices, the system SHALL display only corner transform handles (not edge/side handles) for multi-point linear elements, consistent with existing phone behavior for other element types.

#### Scenario: Phone shows corner handles only for multi-point polyline

- **WHEN** a user on a phone form factor device selects a multi-point linear element
- **THEN** the system SHALL display corner transform handles but SHALL NOT display edge (north/south/east/west) resize handles

#### Scenario: Tablet shows full handles for multi-point polyline

- **WHEN** a user on a tablet form factor device selects a multi-point linear element
- **THEN** the system SHALL display both corner and applicable edge transform handles

### Requirement: Elbow arrows SHALL remain excluded from bounding box on all platforms

The existing behavior where single-selected elbow arrows do not display a bounding box SHALL be preserved on all platforms.

#### Scenario: Elbow arrow selected on mobile has no bounding box

- **WHEN** a user on a mobile device selects a single elbow arrow element
- **THEN** the system SHALL NOT display a bounding box or transform handles

#### Scenario: Elbow arrow selected on desktop has no bounding box

- **WHEN** a user on a desktop device selects a single elbow arrow element
- **THEN** the system SHALL NOT display a bounding box or transform handles
