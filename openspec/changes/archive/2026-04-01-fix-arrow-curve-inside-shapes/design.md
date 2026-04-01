## Context

When creating a multi-point arrow (for curves) in Excalidraw, two code paths handle point addition and finalization:

1. **`handleCanvasPointerMove`** (App.tsx ~line 6905): During mouse movement, when `lastPoint === lastCommittedPoint` (no uncommitted temp point yet), the code calls `getHoveredElementForBinding()`. If a bindable element is found under the cursor, it immediately executes `actionFinalize`, ending arrow creation.

2. **`handleLinearElementOnPointerDown`** (App.tsx ~line 9066): On click to add a new point, the code checks `isBindingElement(multiElement) && hoveredElementForBinding`. If both are true, the arrow is finalized instead of adding a new intermediate point.

When drawing inside a closed shape (e.g., a rectangle), the enclosing shape is always detected as `hoveredElementForBinding`, causing premature finalization. Lines don't have this issue because `isBindingElement()` returns false for them.

## Goals / Non-Goals

**Goals:**
- Allow users to create multi-point curved arrows inside closed shapes
- Preserve existing arrow-to-shape binding behavior (arrows should still bind to shapes on final point)
- Minimal, targeted fix with no side effects on other arrow or binding behaviors

**Non-Goals:**
- Changing the general binding/snapping architecture
- Modifying how `getHoveredElementForBinding` works internally
- Addressing elbow arrow behavior inside shapes (separate concern)

## Decisions

### Decision 1: Filter at call site, not in `getHoveredElementForBinding`

**Choice**: Filter out the start-bound element at the two call sites in App.tsx rather than adding an exclusion parameter to `getHoveredElementForBinding`.

**Rationale**: `getHoveredElementForBinding` is a general-purpose collision utility used in many places. Adding an exclusion parameter would change its API for a narrow use case. Filtering at the call site is simpler and more explicit about intent.

**Alternative considered**: Adding an `excludeElementIds` parameter to `getHoveredElementForBinding` — rejected because it couples a specific arrow-creation concern into a general utility.

### Decision 2: Compare hovered element against arrow's startBinding

**Choice**: After `getHoveredElementForBinding` returns a result, check if the result's `id` matches `multiElement.startBinding?.elementId`. If it matches, treat it as if no hovered element was found (don't finalize).

**Rationale**: The arrow already knows which element it's start-bound to. If the user is still inside that same element, they're adding intermediate points, not trying to end-bind. When they hover over a *different* element, finalization should still trigger normally.

### Decision 3: Apply fix to both code paths

**Choice**: Apply the same filtering logic in both `handleCanvasPointerMove` (line ~6906) and `handleLinearElementOnPointerDown` (line ~9068).

**Rationale**: Both paths have the same premature finalization bug. The pointer-move path controls the preview/auto-finalize on hover, and the pointer-down path controls the click-to-finalize. Both must be fixed for consistent behavior.

## Risks / Trade-offs

- **[Risk] Arrow cannot end-bind to its start-bound element** → This is actually desirable behavior. An arrow starting and ending on the same shape via the same binding point would be degenerate. If users want to loop back, they can end the arrow near the shape edge where a different binding point would be detected.
- **[Risk] Regression in existing binding behavior** → Mitigated by only filtering when the hovered element matches `startBinding.elementId`. All other binding scenarios remain unchanged.
- **[Risk] Edge case with nested shapes** → When shapes are nested, `getHoveredElementForBinding` returns the smallest shape. If the arrow starts bound to an inner shape, hovering over the outer shape would still trigger finalization (correct behavior, since it's a different element).
