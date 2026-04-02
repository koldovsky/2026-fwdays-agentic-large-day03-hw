import { isSelectionLikeTool } from "@excalidraw/common";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import type { ToolType } from "./types";

/** Minimum scene-space drag (px) before showing "select a shape tool" feedback. */
export const SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE = 10;

/** Tools the user typically "draws" with; excludes selection, text, hand, etc. */
export function isDrawableShapeLikeToolType(
  type: ToolType | "custom",
): boolean {
  if (type === "custom") {
    return false;
  }
  return (
    type === "rectangle" ||
    type === "ellipse" ||
    type === "diamond" ||
    type === "arrow" ||
    type === "line" ||
    type === "freedraw"
  );
}

/** True when switching from a drawable tool to selection/lasso (e.g. Esc after picking a shape). */
export function shouldArmShapeDrawFeedbackForToolChange(
  previousType: ToolType | "custom",
  nextType: ToolType | "custom",
): boolean {
  return (
    isDrawableShapeLikeToolType(previousType) && isSelectionLikeTool(nextType)
  );
}

export type ShapeToolDrawFeedbackMode = "selection-marquee" | "lasso-empty";

export type ShapeToolDrawFeedbackContext = {
  mode: ShapeToolDrawFeedbackMode;
  activeToolType: ToolType | "custom";
  /** In-flight marquee selection element (selection-marquee mode only) */
  selectionElement: Pick<ExcalidrawElement, "type"> | null;
  /** Element hit at pointer down (`null` = empty canvas at origin) */
  pointerDownHitElement: ExcalidrawElement | null;
  originX: number;
  originY: number;
  currentX: number;
  currentY: number;
  alreadyShownForGesture: boolean;
  selectedLinearElementIsEditing: boolean;
  /** Set after rectangle→selection (or similar); cleared after first toast or picking a drawable tool */
  armedAfterShapeToolSwitch: boolean;
};

/**
 * Whether to show a toast when the user drags as if to draw, but the active
 * tool cannot create a new shape — primarily after Esc from a shape tool.
 */
export function shouldShowShapeToolDrawFeedback(
  opts: ShapeToolDrawFeedbackContext,
): boolean {
  if (!opts.armedAfterShapeToolSwitch) {
    return false;
  }
  if (opts.alreadyShownForGesture) {
    return false;
  }
  if (opts.mode === "selection-marquee") {
    if (opts.activeToolType !== "selection") {
      return false;
    }
    if (!opts.selectionElement || opts.selectionElement.type !== "selection") {
      return false;
    }
  } else if (opts.activeToolType !== "lasso") {
    return false;
  }
  if (opts.pointerDownHitElement != null) {
    return false;
  }
  if (opts.selectedLinearElementIsEditing) {
    return false;
  }
  const dx = opts.currentX - opts.originX;
  const dy = opts.currentY - opts.originY;
  return Math.hypot(dx, dy) >= SHAPE_TOOL_DRAW_FEEDBACK_DRAG_THRESHOLD_SCENE;
}
