import type { EditorInterface } from "@excalidraw/common";
import type { InteractiveCanvasAppState } from "@excalidraw/excalidraw/types";

import { hasBoundingBox } from "../src/transformHandles";

import type { NonDeletedExcalidrawElement } from "../src/types";

const makeAppState = (
  overrides: Partial<InteractiveCanvasAppState> = {},
): InteractiveCanvasAppState =>
  ({
    selectedLinearElement: null,
    ...overrides,
  } as InteractiveCanvasAppState);

const makeEditorInterface = (
  overrides: Partial<{
    isMobileDevice: boolean;
    formFactor: EditorInterface["formFactor"];
  }> = {},
): EditorInterface =>
  ({
    formFactor: overrides.formFactor ?? "desktop",
    desktopUIMode: "full",
    userAgent: {
      isMobileDevice: overrides.isMobileDevice ?? false,
      platform: "other",
    },
    isTouchScreen: overrides.isMobileDevice ?? false,
    canFitSidebar: true,
    isLandscape: true,
  } as EditorInterface);

const makeLine = (pointCount: number): NonDeletedExcalidrawElement =>
  ({
    id: "line-1",
    type: "line",
    points: Array.from({ length: pointCount }, (_, i) => [i * 10, i * 10]),
    isDeleted: false,
  } as unknown as NonDeletedExcalidrawElement);

const makeRectangle = (): NonDeletedExcalidrawElement =>
  ({
    id: "rect-1",
    type: "rectangle",
    isDeleted: false,
  } as unknown as NonDeletedExcalidrawElement);

const makeElbowArrow = (): NonDeletedExcalidrawElement =>
  ({
    id: "arrow-1",
    type: "arrow",
    elbowed: true,
    points: [
      [0, 0],
      [100, 100],
    ],
    isDeleted: false,
  } as unknown as NonDeletedExcalidrawElement);

describe("hasBoundingBox", () => {
  const appState = makeAppState();

  describe("multi-point linear elements on mobile", () => {
    it("should show bounding box for multi-point linear element (> 2 points) when isMobileDevice is true", () => {
      const elements = [makeLine(4)];
      const ei = makeEditorInterface({ isMobileDevice: true });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });

    it("should show bounding box for multi-point linear element on desktop", () => {
      const elements = [makeLine(4)];
      const ei = makeEditorInterface({ isMobileDevice: false });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });

    it("should show bounding box for 3-point linear element on mobile", () => {
      const elements = [makeLine(3)];
      const ei = makeEditorInterface({ isMobileDevice: true });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });
  });

  describe("2-point linear elements", () => {
    it("should NOT show bounding box for 2-point linear element on desktop", () => {
      const elements = [makeLine(2)];
      const ei = makeEditorInterface({ isMobileDevice: false });
      expect(hasBoundingBox(elements, appState, ei)).toBe(false);
    });

    it("should NOT show bounding box for 2-point linear element on mobile", () => {
      const elements = [makeLine(2)];
      const ei = makeEditorInterface({ isMobileDevice: true });
      expect(hasBoundingBox(elements, appState, ei)).toBe(false);
    });

    it("should NOT show bounding box for 1-point linear element", () => {
      const elements = [makeLine(1)];
      const ei = makeEditorInterface({ isMobileDevice: false });
      expect(hasBoundingBox(elements, appState, ei)).toBe(false);
    });
  });

  describe("elbow arrows", () => {
    it("should NOT show bounding box for elbow arrow on mobile", () => {
      const elements = [makeElbowArrow()];
      const ei = makeEditorInterface({ isMobileDevice: true });
      expect(hasBoundingBox(elements, appState, ei)).toBe(false);
    });

    it("should NOT show bounding box for elbow arrow on desktop", () => {
      const elements = [makeElbowArrow()];
      const ei = makeEditorInterface({ isMobileDevice: false });
      expect(hasBoundingBox(elements, appState, ei)).toBe(false);
    });
  });

  describe("multi-element selection", () => {
    it("should show bounding box for multi-element selection on mobile", () => {
      const elements = [makeRectangle(), makeLine(2)];
      const ei = makeEditorInterface({ isMobileDevice: true });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });

    it("should show bounding box for multi-element selection on desktop", () => {
      const elements = [makeRectangle(), makeLine(2)];
      const ei = makeEditorInterface({ isMobileDevice: false });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });
  });

  describe("non-linear elements", () => {
    it("should show bounding box for rectangle on mobile", () => {
      const elements = [makeRectangle()];
      const ei = makeEditorInterface({ isMobileDevice: true });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });

    it("should show bounding box for rectangle on desktop", () => {
      const elements = [makeRectangle()];
      const ei = makeEditorInterface({ isMobileDevice: false });
      expect(hasBoundingBox(elements, appState, ei)).toBe(true);
    });
  });
});
