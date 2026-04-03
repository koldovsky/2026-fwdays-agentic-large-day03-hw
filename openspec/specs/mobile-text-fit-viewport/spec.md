# mobile-text-fit-viewport Specification

## Purpose
TBD - created by archiving change mobile-text-fit-viewport. Update Purpose after archive.
## Requirements
### Requirement: Mobile text element viewport fitting

When a text element is committed on a mobile viewport, the system SHALL automatically reposition and resize it to fit within the visible viewport width, ensuring the text is immediately readable without manual adjustment.

#### Scenario: New text element committed on mobile portrait

- **WHEN** a user commits a new text element on a viewport where `isMobileBreakpoint(width, height)` returns `true`
- **AND** the text element has no container (`containerId === null`)
- **THEN** the element's `x` position SHALL be set so the element's left edge aligns with the left viewport edge plus a horizontal margin of 16 px (in screen space)
- **AND** the element's `width` SHALL be set to `(viewportWidth - 2 × 16px) / zoom.value` in scene coordinates
- **AND** `autoResize` SHALL be set to `false`
- **AND** `refreshTextDimensions` SHALL be called so the text re-wraps at the new width

#### Scenario: New text element committed on mobile landscape

- **WHEN** a user commits a new text element on a viewport where `height < 500` AND `width < 1000` (landscape phone)
- **AND** the text element has no container (`containerId === null`)
- **THEN** the same repositioning logic SHALL apply as for portrait mobile

#### Scenario: Text element committed on desktop viewport

- **WHEN** a user commits a new text element on a viewport where `isMobileBreakpoint(width, height)` returns `false`
- **THEN** the element's position and dimensions SHALL remain unchanged (no repositioning applied)

#### Scenario: Bound text element committed on mobile

- **WHEN** a user commits a text element that has a container (`containerId !== null`) on a mobile viewport
- **THEN** the repositioning logic SHALL NOT be applied
- **AND** the element's dimensions SHALL remain governed by its container as usual

#### Scenario: Element already fits within viewport on mobile

- **WHEN** a user commits a new text element on a mobile viewport
- **AND** the element's width is already less than or equal to `(viewportWidth - 2 × 16px) / zoom.value`
- **THEN** the system SHALL still apply the `x` repositioning to align to the left margin
- **AND** the `width` SHALL be clamped to the viewport-fit width to maintain consistent behaviour

#### Scenario: Editing an existing text element on mobile

- **WHEN** a user re-edits an existing text element (not newly created) on a mobile viewport
- **THEN** the repositioning logic SHALL NOT be applied
- **AND** the element's position and dimensions SHALL remain unchanged after commit

