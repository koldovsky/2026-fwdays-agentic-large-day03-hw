import { describe, expect, it } from "vitest";

import {
  SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE,
  isDrawableShapeLikeToolType,
  shouldArmShapeDrawFeedbackForToolChange,
  shouldShowShapeToolDrawFeedback,
} from "../shapeToolDrawFeedback";

describe("isDrawableShapeLikeToolType", () => {
  it("is true for classic draw tools", () => {
    expect(isDrawableShapeLikeToolType("rectangle")).toBe(true);
    expect(isDrawableShapeLikeToolType("arrow")).toBe(true);
  });
  it("is false for selection and hand", () => {
    expect(isDrawableShapeLikeToolType("selection")).toBe(false);
    expect(isDrawableShapeLikeToolType("hand")).toBe(false);
  });
});

describe("shouldArmShapeDrawFeedbackForToolChange", () => {
  it("arms when leaving a drawable tool for selection", () => {
    expect(
      shouldArmShapeDrawFeedbackForToolChange("rectangle", "selection"),
    ).toBe(true);
  });
  it("arms when leaving a drawable tool for lasso", () => {
    expect(shouldArmShapeDrawFeedbackForToolChange("ellipse", "lasso")).toBe(
      true,
    );
  });
  it("does not arm when already on selection", () => {
    expect(
      shouldArmShapeDrawFeedbackForToolChange("selection", "selection"),
    ).toBe(false);
  });
  it("does not arm when switching between drawable tools", () => {
    expect(
      shouldArmShapeDrawFeedbackForToolChange("rectangle", "ellipse"),
    ).toBe(false);
  });
});

describe("shouldShowShapeToolDrawFeedback", () => {
  const marqueeBase = {
    mode: "selection-marquee" as const,
    activeToolType: "selection" as const,
    selectionElement: { type: "selection" as const },
    pointerDownHitElement: null,
    originX: 0,
    originY: 0,
    currentX: 0,
    currentY: 0,
    alreadyShownForGesture: false,
    selectedLinearElementIsEditing: false,
    armedAfterShapeToolSwitch: true,
  };

  it("returns false when not armed (normal marquee after working in selection)", () => {
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        armedAfterShapeToolSwitch: false,
        currentX: 100,
        currentY: 100,
      }),
    ).toBe(false);
  });

  it("returns false when active tool is a shape tool", () => {
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        mode: "selection-marquee",
        activeToolType: "rectangle",
        currentX: 100,
        currentY: 100,
      }),
    ).toBe(false);
  });

  it("returns false below drag threshold when armed", () => {
    const d = SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE - 1;
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        currentX: d,
        currentY: 0,
      }),
    ).toBe(false);
  });

  it("returns true on empty canvas past threshold when armed", () => {
    const d = SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE;
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        currentX: d,
        currentY: 0,
      }),
    ).toBe(true);
  });

  it("returns false when pointer down hit an element", () => {
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        pointerDownHitElement: { type: "rectangle" } as any,
        currentX: 100,
        currentY: 0,
      }),
    ).toBe(false);
  });

  it("returns false when feedback already shown for gesture", () => {
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        alreadyShownForGesture: true,
        currentX: 100,
        currentY: 0,
      }),
    ).toBe(false);
  });

  it("returns false when line editor is editing (box-select points)", () => {
    expect(
      shouldShowShapeToolDrawFeedback({
        ...marqueeBase,
        selectedLinearElementIsEditing: true,
        currentX: 100,
        currentY: 0,
      }),
    ).toBe(false);
  });

  const lassoBase = {
    mode: "lasso-empty" as const,
    activeToolType: "lasso" as const,
    selectionElement: null,
    pointerDownHitElement: null,
    originX: 0,
    originY: 0,
    currentX: 20,
    currentY: 0,
    alreadyShownForGesture: false,
    selectedLinearElementIsEditing: false,
    armedAfterShapeToolSwitch: true,
  };

  it("lasso-empty: true when armed and past threshold", () => {
    expect(shouldShowShapeToolDrawFeedback(lassoBase)).toBe(true);
  });

  it("lasso-empty: false when active tool is selection", () => {
    expect(
      shouldShowShapeToolDrawFeedback({
        ...lassoBase,
        activeToolType: "selection",
      }),
    ).toBe(false);
  });
});
