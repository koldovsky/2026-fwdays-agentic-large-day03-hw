import { DRAGGING_THRESHOLD } from "@excalidraw/common";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

import type { AppState } from "../types";

export const SESSION_STORAGE_KEY = "excalidraw.toast.selectShapeToolToDraw";

export type SelectShapeToolToastParams = {
  activeToolType: AppState["activeTool"]["type"];
  boxSelectionHasOccurred: boolean;
  lassoGestureHasOccurred: boolean;
  hitElementOnPointerDown: NonDeletedExcalidrawElement | null;
  resizeIsResizing: boolean;
  dragHasOccurred: boolean;
  newElement: AppState["newElement"];
  isRotating: boolean;
  isResizing: boolean;
  isCropping: boolean;
  isLinearElementEditing: boolean;
  dragDistanceScreenPx: number;
};

/**
 * Whether to show a one-time-per-session hint that the user dragged on empty
 * canvas in selection or lasso mode instead of drawing with a shape tool.
 */
export function shouldShowSelectShapeToolToast(
  params: SelectShapeToolToastParams,
): boolean {
  if (
    params.activeToolType !== "selection" &&
    params.activeToolType !== "lasso"
  ) {
    return false;
  }
  if (
    !params.boxSelectionHasOccurred &&
    !params.lassoGestureHasOccurred
  ) {
    return false;
  }
  if (params.hitElementOnPointerDown !== null) {
    return false;
  }
  if (params.resizeIsResizing) {
    return false;
  }
  if (params.dragHasOccurred) {
    return false;
  }
  if (params.newElement !== null) {
    return false;
  }
  if (params.isRotating || params.isResizing || params.isCropping) {
    return false;
  }
  if (params.isLinearElementEditing) {
    return false;
  }
  if (params.dragDistanceScreenPx <= DRAGGING_THRESHOLD) {
    return false;
  }
  return true;
}
