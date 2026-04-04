## Context

Excalidraw's interactive canvas renders selection frames (bounding boxes) and transform handles (resize/rotate) for selected elements. The rendering pipeline flows through `interactiveScene.ts`, which calls `hasBoundingBox()` from `packages/element/src/transformHandles.ts` to decide whether to draw the selection UI.

Currently, `hasBoundingBox()` contains a blanket mobile suppression:

```typescript
return element.points.length > 2 && !editorInterface.userAgent.isMobileDevice;
```

This means **all** single-selected linear elements on mobile get no bounding box — regardless of complexity. A 50-point polyline from the Basic Shapes library is treated identically to a simple 2-point line.

Additionally, `App.tsx` contains two "HACK" blocks (~line 7126 and ~line 8297) that skip transform handle hit-testing for linear elements on mobile:

```typescript
!(
  isLinearElement(selectedElements[0]) &&
  (this.editorInterface.userAgent.isMobileDevice ||
    selectedElements[0].points.length === 2)
);
```

The `EditorInterface` system distinguishes between:

- `userAgent.isMobileDevice` — device capability detection
- `formFactor` — layout form factor (`"phone"` | `"tablet"` | `"desktop"`)

The `canResizeFromSides()` function already handles phone-specific side-resize suppression separately. The handle sizing system already supports `pointerType: "touch"` (28px) vs `"mouse"` (8px).

## Goals / Non-Goals

**Goals:**

- Restore selection frame and resize handles for multi-point linear elements (> 2 points) on mobile devices
- Maintain the existing suppression for simple 2-point lines on mobile (original intent of the HACK)
- Ensure touch-friendly handle sizes are used when interacting on mobile
- Maintain existing phone-specific behavior for side-resize suppression
- Add regression tests to prevent future breakage

**Non-Goals:**

- Reworking the entire mobile selection/resize UX (that's a larger effort)
- Enabling full linear element editing (point manipulation) on mobile
- Changing the library insertion flow
- Addressing the drag-and-drop limitation on mobile browsers (HTML5 drag API limitation)
- Modifying how `EditorInterface` or `formFactor` is determined

## Decisions

### Decision 1: Allow bounding box for multi-point linear elements on mobile

**Choice**: Change `hasBoundingBox()` to return `true` for linear elements with `points.length > 2` regardless of `isMobileDevice`.

**Current code**:

```typescript
return element.points.length > 2 && !editorInterface.userAgent.isMobileDevice;
```

**New code**:

```typescript
return element.points.length > 2;
```

**Rationale**: The original comment says "on mobile/tablet we currently don't show bbox because of resize issues." However, these "resize issues" are specific to simple 2-point lines where the bounding box degenerates. Multi-point polylines (like Basic Shapes library items) have well-defined bounding boxes and resize correctly — they're geometrically identical to rectangles/ellipses from the bounding box perspective.

**Alternatives considered**:

- _Keep mobile suppression but add a flag to library-inserted elements_: Rejected — overly complex, fragile, and doesn't fix the issue for user-drawn polylines with > 2 points
- _Use `formFactor` instead of `isMobileDevice`_: Rejected — the issue affects tablets too, and formFactor doesn't capture the right dimension (the problem is about touch interaction, not layout)

### Decision 2: Relax the App.tsx HACK for multi-point linear elements

**Choice**: In both HACK blocks in `App.tsx`, change the condition to only suppress transform handles for 2-point linear elements (not all linear elements on mobile).

**Current code**:

```typescript
!(
  isLinearElement(selectedElements[0]) &&
  (this.editorInterface.userAgent.isMobileDevice ||
    selectedElements[0].points.length === 2)
);
```

**New code**:

```typescript
!(
  isLinearElement(selectedElements[0]) && selectedElements[0].points.length <= 2
);
```

**Rationale**: The `isMobileDevice` check was overly broad. The actual UX issue (handles too close together, confusing interaction) only applies to 2-point lines where the bounding box is degenerate. For multi-point polylines, the handles are well-spaced and useful. By using `points.length <= 2`, we maintain the suppression for simple lines while enabling handles for complex shapes — on ALL platforms consistently.

**Alternatives considered**:

- _Keep `isMobileDevice` but add `&& points.length <= 2`_: Rejected — would still suppress handles for 3+ point polylines on mobile, which is the bug we're fixing
- _Remove the HACK entirely_: Rejected — 2-point lines genuinely have UX issues with bounding box handles on both mobile and desktop

### Decision 3: No changes to handle rendering or sizing

**Choice**: No modifications to `interactiveScene.ts` rendering or handle size calculations.

**Rationale**: The renderer already passes `pointerType` to `getTransformHandles()`, which returns appropriate sizes (28px for touch, 8px for mouse). The `canResizeFromSides()` / `getOmitSidesForEditorInterface()` functions already handle phone-specific side handle suppression. These systems work correctly once the gating conditions in `hasBoundingBox()` and `App.tsx` allow them to run.

### Decision 4: Keep `resizeTest.ts` unchanged

**Choice**: No changes to hit-testing in `resizeTest.ts`.

**Rationale**: `resizeTest()` already uses `pointerType` from events and `editorInterface` for `canResizeFromSides()`. Once `hasBoundingBox()` returns `true` for multi-point linear elements on mobile, the hit-testing path is already correct. The touch pointer type produces larger hit areas automatically.

## Risks / Trade-offs

- **[Risk] Multi-point polyline resize may have subtle UX issues on small screens** → Mitigated by the existing phone form factor handling (`canResizeFromSides` returning false on phone, showing only corner handles which are less cluttered). The same approach works for tablets. Monitor user feedback after the change.

- **[Risk] Changing the 2-point line behavior on desktop (the `points.length <= 2` change)** → This actually improves consistency: 2-point lines were already suppressed on mobile, and the HACK comment suggests they should be suppressed generally. The `points.length === 2` part of the original condition already handled desktop. The new condition is equivalent for desktop and more correct for mobile.

- **[Trade-off] The fix is minimal and surgical** → This is intentional. A full rework of mobile linear element interaction is a separate, larger project. This fix addresses the specific regression reported in #10304 with minimal blast radius.

- **[Risk] Library shapes may contain mixed element types** → Not a risk: `hasBoundingBox()` for multiple elements (`elements.length > 1`) already returns `true`. The issue only manifests for single-element library items.
