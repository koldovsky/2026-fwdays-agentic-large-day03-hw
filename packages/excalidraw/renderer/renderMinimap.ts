import { getCommonBounds } from "@excalidraw/element";

import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

const MINIMAP_PADDING = 8;

/**
 * Renders a simplified bounding-box overview of all elements onto the given
 * minimap canvas. Each element is represented as a filled rectangle using its
 * approximate stroke/fill colors.
 *
 * This function is intentionally lightweight:
 * - Uses element x/y/width/height directly (no full bound calculation)
 * - No text, no curves, no shadows
 * - Designed to be called only when elements change (debounced externally)
 */
export const renderMinimap = (
  canvas: HTMLCanvasElement,
  elements: readonly NonDeletedExcalidrawElement[],
  theme: "light" | "dark",
): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const { width, height } = canvas;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = theme === "dark" ? "#1e1e1e" : "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (elements.length === 0) {
    return;
  }

  // Compute scene bounds
  const [sceneMinX, sceneMinY, sceneMaxX, sceneMaxY] = getCommonBounds(
    elements as NonDeletedExcalidrawElement[],
  );

  const sceneWidth = sceneMaxX - sceneMinX;
  const sceneHeight = sceneMaxY - sceneMinY;

  if (sceneWidth <= 0 || sceneHeight <= 0) {
    return;
  }

  // Scale to fit within the canvas with padding
  const drawWidth = width - MINIMAP_PADDING * 2;
  const drawHeight = height - MINIMAP_PADDING * 2;

  const scale = Math.min(drawWidth / sceneWidth, drawHeight / sceneHeight);

  // Center the scaled scene within the canvas
  const offsetX = MINIMAP_PADDING + (drawWidth - sceneWidth * scale) / 2;
  const offsetY = MINIMAP_PADDING + (drawHeight - sceneHeight * scale) / 2;

  // Draw each element as a simplified rectangle
  for (const element of elements) {
    if (element.isDeleted) {
      continue;
    }

    const x = (element.x - sceneMinX) * scale + offsetX;
    const y = (element.y - sceneMinY) * scale + offsetY;
    const w = Math.max(element.width * scale, 1);
    const h = Math.max(element.height * scale, 1);

    // Fill
    const bgColor = element.backgroundColor;
    if (bgColor && bgColor !== "transparent") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y, w, h);
    }

    // Stroke
    const strokeColor = element.strokeColor;
    if (strokeColor && strokeColor !== "transparent") {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = Math.max(0.5, element.strokeWidth * scale * 0.5);
      ctx.strokeRect(x, y, w, h);
    } else {
      // Fallback: render a faint outline so invisible elements are visible
      ctx.strokeStyle =
        theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, w, h);
    }
  }
};

/**
 * Computes the position and size of the viewport indicator rectangle on the
 * minimap canvas, given the current scroll/zoom state.
 *
 * Returns `null` if there are no elements (minimap has no coordinate system).
 */
export const computeViewportRect = (
  canvas: { width: number; height: number },
  elements: readonly NonDeletedExcalidrawElement[],
  scrollX: number,
  scrollY: number,
  zoomValue: number,
  canvasWidth: number,
  canvasHeight: number,
): { x: number; y: number; width: number; height: number } | null => {
  if (elements.length === 0) {
    return null;
  }

  const [sceneMinX, sceneMinY, sceneMaxX, sceneMaxY] = getCommonBounds(
    elements as NonDeletedExcalidrawElement[],
  );

  const sceneWidth = sceneMaxX - sceneMinX;
  const sceneHeight = sceneMaxY - sceneMinY;

  if (sceneWidth <= 0 || sceneHeight <= 0) {
    return null;
  }

  const { width, height } = canvas;
  const drawWidth = width - MINIMAP_PADDING * 2;
  const drawHeight = height - MINIMAP_PADDING * 2;
  const scale = Math.min(drawWidth / sceneWidth, drawHeight / sceneHeight);

  const offsetX = MINIMAP_PADDING + (drawWidth - sceneWidth * scale) / 2;
  const offsetY = MINIMAP_PADDING + (drawHeight - sceneHeight * scale) / 2;

  // The visible scene area in scene coordinates
  const visibleSceneX = -scrollX;
  const visibleSceneY = -scrollY;
  const visibleSceneWidth = canvasWidth / zoomValue;
  const visibleSceneHeight = canvasHeight / zoomValue;

  // Map to minimap coordinates
  const rectX = (visibleSceneX - sceneMinX) * scale + offsetX;
  const rectY = (visibleSceneY - sceneMinY) * scale + offsetY;
  const rectW = visibleSceneWidth * scale;
  const rectH = visibleSceneHeight * scale;

  return { x: rectX, y: rectY, width: rectW, height: rectH };
};

/**
 * Converts a pointer position on the minimap canvas to scene coordinates.
 * Used to implement click-to-pan.
 */
export const minimapPointerToSceneCoords = (
  canvas: { width: number; height: number },
  elements: readonly NonDeletedExcalidrawElement[],
  pointerX: number,
  pointerY: number,
): { x: number; y: number } | null => {
  if (elements.length === 0) {
    return null;
  }

  const [sceneMinX, sceneMinY, sceneMaxX, sceneMaxY] = getCommonBounds(
    elements as NonDeletedExcalidrawElement[],
  );

  const sceneWidth = sceneMaxX - sceneMinX;
  const sceneHeight = sceneMaxY - sceneMinY;

  if (sceneWidth <= 0 || sceneHeight <= 0) {
    return null;
  }

  const { width, height } = canvas;
  const drawWidth = width - MINIMAP_PADDING * 2;
  const drawHeight = height - MINIMAP_PADDING * 2;
  const scale = Math.min(drawWidth / sceneWidth, drawHeight / sceneHeight);

  const offsetX = MINIMAP_PADDING + (drawWidth - sceneWidth * scale) / 2;
  const offsetY = MINIMAP_PADDING + (drawHeight - sceneHeight * scale) / 2;

  const sceneX = (pointerX - offsetX) / scale + sceneMinX;
  const sceneY = (pointerY - offsetY) / scale + sceneMinY;

  return { x: sceneX, y: sceneY };
};
