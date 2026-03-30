import { describe, it, expect, vi, beforeEach } from "vitest";

import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

import {
  renderMinimap,
  computeViewportRect,
  minimapPointerToSceneCoords,
} from "../renderer/renderMinimap";

// Minimal element factory for tests
const makeElement = (
  id: string,
  x: number,
  y: number,
  width: number,
  height: number,
  strokeColor = "#000000",
  backgroundColor = "transparent",
): NonDeletedExcalidrawElement =>
  ({
    id,
    type: "rectangle",
    x,
    y,
    width,
    height,
    strokeColor,
    backgroundColor,
    strokeWidth: 1,
    version: 1,
    isDeleted: false,
    angle: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    boundElements: null,
    updated: 0,
    link: null,
    locked: false,
    seed: 0,
    versionNonce: 0,
    index: "a0",
    fillStyle: "solid",
    strokeStyle: "solid",
    roughness: 1,
    customData: undefined,
  } as unknown as NonDeletedExcalidrawElement);

const MINIMAP_W = 180;
const MINIMAP_H = 120;
const canvas = { width: MINIMAP_W, height: MINIMAP_H };

describe("renderMinimap", () => {
  let ctx: CanvasRenderingContext2D;
  let htmlCanvas: HTMLCanvasElement;

  beforeEach(() => {
    const fillRect = vi.fn();
    const strokeRect = vi.fn();
    const clearRect = vi.fn();
    ctx = {
      fillRect,
      strokeRect,
      clearRect,
    } as unknown as CanvasRenderingContext2D;
    htmlCanvas = {
      width: MINIMAP_W,
      height: MINIMAP_H,
      getContext: vi.fn(() => ctx),
    } as unknown as HTMLCanvasElement;
  });

  it("clears and fills background on empty elements", () => {
    renderMinimap(htmlCanvas, [], "light");
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, MINIMAP_W, MINIMAP_H);
    expect(ctx.fillRect).toHaveBeenCalledOnce(); // background only
  });

  it("draws fillRect for elements with background color", () => {
    const elements = [makeElement("a", 0, 0, 100, 100, "#000000", "#ff0000")];
    renderMinimap(htmlCanvas, elements, "light");
    // One fillRect for background + one for element background
    expect(ctx.fillRect).toHaveBeenCalledTimes(2);
  });

  it("draws strokeRect for each element", () => {
    const elements = [
      makeElement("a", 0, 0, 100, 100),
      makeElement("b", 200, 0, 50, 50),
    ];
    renderMinimap(htmlCanvas, elements, "light");
    expect(ctx.strokeRect).toHaveBeenCalledTimes(2);
  });

  it("skips deleted elements", () => {
    const deleted = {
      ...makeElement("a", 0, 0, 100, 100),
      isDeleted: true,
    } as unknown as NonDeletedExcalidrawElement;
    renderMinimap(htmlCanvas, [deleted], "light");
    expect(ctx.strokeRect).not.toHaveBeenCalled();
  });
});

describe("computeViewportRect", () => {
  const elements = [makeElement("a", 0, 0, 1000, 800)];

  it("returns null for empty elements", () => {
    expect(computeViewportRect(canvas, [], 0, 0, 1, 800, 600)).toBeNull();
  });

  it("returns a rect object when elements exist", () => {
    const rect = computeViewportRect(canvas, elements, 0, 0, 1, 400, 300);
    expect(rect).not.toBeNull();
    expect(rect).toHaveProperty("x");
    expect(rect).toHaveProperty("y");
    expect(rect).toHaveProperty("width");
    expect(rect).toHaveProperty("height");
  });

  it("viewport rect is smaller when zoomed in", () => {
    const zoomOut = computeViewportRect(canvas, elements, 0, 0, 0.5, 400, 300);
    const zoomIn = computeViewportRect(canvas, elements, 0, 0, 2, 400, 300);
    expect(zoomOut!.width).toBeGreaterThan(zoomIn!.width);
    expect(zoomOut!.height).toBeGreaterThan(zoomIn!.height);
  });
});

describe("minimapPointerToSceneCoords", () => {
  const elements = [makeElement("a", 0, 0, 1000, 800)];

  it("returns null for empty elements", () => {
    expect(minimapPointerToSceneCoords(canvas, [], 90, 60)).toBeNull();
  });

  it("maps center of minimap to approximate scene center", () => {
    const result = minimapPointerToSceneCoords(canvas, elements, 90, 60);
    expect(result).not.toBeNull();
    // Center of minimap should map to roughly center of scene
    expect(result!.x).toBeGreaterThan(0);
    expect(result!.y).toBeGreaterThan(0);
  });
});
