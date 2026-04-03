## ADDED Requirements

### Requirement: Feedback after Esc-based tool deactivation
The system SHALL provide explicit transient feedback when a user exits a drawing tool via `Esc` and then performs a draw-like pointer interaction while no drawing tool is active.

#### Scenario: User drags after leaving shape tool with Esc
- **WHEN** the user is on a drawing tool, presses `Esc` to return to selection, and immediately performs a canvas drag intended for drawing
- **THEN** the system shows a transient message indicating no drawing tool is active and preserves standard selection behavior

### Requirement: Feedback is non-disruptive and limited
The system SHALL avoid repeated or noisy feedback for normal selection interactions.

#### Scenario: Feedback shows at most once per Esc-deactivation transition
- **WHEN** the user receives the no-active-drawing-tool message after an `Esc`-driven transition
- **THEN** subsequent selection drags SHALL NOT repeatedly show the same message unless another qualifying tool deactivation transition occurs
