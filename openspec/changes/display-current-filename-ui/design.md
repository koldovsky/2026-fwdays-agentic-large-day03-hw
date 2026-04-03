## Context

The editor currently does not expose the active document filename in a persistent, visible location in the main UI. Users who import files, open multiple browser tabs, or use "Save As" workflows can lose track of which document they are editing. The change must fit existing top-bar/header layouts on desktop and mobile, rely on current file metadata state, and avoid introducing new persistence mechanisms.

## Goals / Non-Goals

**Goals:**
- Show the active document filename in a stable, discoverable UI location.
- Keep the label synchronized with file lifecycle events (new/open/import/save-as/rename).
- Provide a deterministic fallback label for untitled documents.
- Preserve existing behavior for save, export, and persistence flows.

**Non-Goals:**
- Redesign the entire header or top toolbar.
- Introduce multi-file tab management.
- Change storage format or backend sync behavior.
- Add inline filename editing unless already supported elsewhere.

## Decisions

1. Place filename in existing header/top-bar region
   - Rationale: This area is already associated with document-level actions and minimizes user scanning time.
   - Alternatives considered:
     - Browser tab title only: insufficient discoverability inside the app.
     - Footer placement: lower visibility and weaker association with file actions.

2. Source filename from existing app-state file metadata selector
   - Rationale: Reusing current state prevents duplicate sources of truth and keeps updates event-driven.
   - Alternatives considered:
     - Maintain local component state: risks drift from actual file state.
     - Recompute from persistence layer on each render: unnecessary complexity and performance overhead.

3. Use a single fallback label for unnamed documents (for example, "Untitled")
   - Rationale: Consistent, localized fallback behavior avoids empty labels and ambiguous states.
   - Alternatives considered:
     - Empty string: unclear to users.
     - Dynamic timestamp-based naming in UI only: confusing mismatch with real file identity.

4. Keep mobile behavior capability-equivalent, with responsive truncation rules
   - Rationale: Mobile must preserve core visibility while respecting limited width and existing controls.
   - Alternatives considered:
     - Hide filename on mobile: inconsistent behavior across form factors.
     - Full filename without truncation: high risk of layout collisions.

## Risks / Trade-offs

- [Header crowding on smaller screens] -> Apply truncation, max width, and ellipsis behavior validated in responsive layouts.
- [State update misses in edge workflows] -> Cover import, save-as, and rename flows with targeted tests.
- [Localization overflow in fallback label] -> Use existing i18n pipeline and verify long translation strings in layout tests.
- [Confusion if filename and browser title diverge] -> Align browser title update timing with visible filename updates where feasible.
