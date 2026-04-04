import { describe, expect, it } from "vitest";

import { DRAGGING_THRESHOLD } from "@excalidraw/common";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

import { shouldShowSelectShapeToolToast } from "../utils/selectionShapeToolToast";

const stubHit: NonDeletedExcalidrawElement = {
  id: "stub",
} as NonDeletedExcalidrawElement;

const base = {
  activeToolType: "selection" as const,
  boxSelectionHasOccurred: true,
  lassoGestureHasOccurred: false,
  hitElementOnPointerDown: null,
  resizeIsResizing: false,
  dragHasOccurred: false,
  newElement: null,
  isRotating: false,
  isResizing: false,
  isCropping: false,
  isLinearElementEditing: false,
  dragDistanceScreenPx: DRAGGING_THRESHOLD + 1,
};

describe("shouldShowSelectShapeToolToast", () => {
  it("returns true when all narrow conditions hold", () => {
    expect(shouldShowSelectShapeToolToast(base)).toBe(true);
  });

  it("returns false when tool is not selection-like", () => {
    expect(
      shouldShowSelectShapeToolToast({
        ...base,
        activeToolType: "rectangle",
      }),
    ).toBe(false);
  });

  it("returns true for lasso when only lasso gesture occurred", () => {
    expect(
      shouldShowSelectShapeToolToast({
        ...base,
        activeToolType: "lasso",
        boxSelectionHasOccurred: false,
        lassoGestureHasOccurred: true,
      }),
    ).toBe(true);
  });

  it("returns false when neither box nor lasso gesture occurred", () => {
    expect(
      shouldShowSelectShapeToolToast({
        ...base,
        boxSelectionHasOccurred: false,
        lassoGestureHasOccurred: false,
      }),
    ).toBe(false);
  });

  it("returns false when pointer down hit an element", () => {
    expect(
      shouldShowSelectShapeToolToast({
        ...base,
        hitElementOnPointerDown: stubHit,
      }),
    ).toBe(false);
  });

  it("returns false when drag distance is below threshold", () => {
    expect(
      shouldShowSelectShapeToolToast({
        ...base,
        dragDistanceScreenPx: DRAGGING_THRESHOLD,
      }),
    ).toBe(false);
  });

  it("returns false when linear element is being edited", () => {
    expect(
      shouldShowSelectShapeToolToast({
        ...base,
        isLinearElementEditing: true,
      }),
    ).toBe(false);
  });
});
