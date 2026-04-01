import React from "react";

import { reseed, KEYS } from "@excalidraw/common";

import type { ExcalidrawArrowElement } from "@excalidraw/element/types";

import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import {
  render,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  waitFor,
  unmountComponent,
} from "./test-utils";

unmountComponent();

const { h } = window;
const mouse = new Pointer("mouse");

describe("Arrow curve inside shapes", () => {
  beforeAll(() => {
    mockBoundingClientRect();
  });

  afterAll(() => {
    restoreOriginalGetBoundingClientRect();
  });

  beforeEach(async () => {
    localStorage.clear();
    reseed(7);
    await render(<Excalidraw handleKeyboardGlobally={true} />);
    h.state.width = 1920;
    h.state.height = 1080;
  });

  afterEach(() => {
    mouse.reset();
  });

  it("multi-point arrow inside a rectangle is not prematurely finalized", async () => {
    // Create a large rectangle
    API.setElements([
      API.createElement({
        type: "rectangle",
        id: "rect1",
        x: 0,
        y: 0,
        width: 500,
        height: 400,
      }),
    ]);

    // Select the arrow tool and click to add points inside the rectangle
    UI.clickTool("arrow");

    // Click inside the rectangle to start the arrow
    mouse.click(100, 100);
    // Add intermediate points (still inside the rectangle)
    mouse.click(200, 200);
    mouse.click(300, 150);

    // Finalize with Enter
    Keyboard.keyPress(KEYS.ENTER);

    await waitFor(() => {
      const arrow = h.elements.find(
        (el): el is ExcalidrawArrowElement => el.type === "arrow",
      );
      expect(arrow).toBeDefined();
      // Arrow should have 3 points (start + 2 intermediate clicks before finalize)
      expect(arrow!.points.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("arrow starting inside shape A finalizes and binds to shape B", async () => {
    // Create two rectangles far apart
    API.setElements([
      API.createElement({
        type: "rectangle",
        id: "shapeA",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      }),
      API.createElement({
        type: "rectangle",
        id: "shapeB",
        x: 400,
        y: 0,
        width: 200,
        height: 200,
      }),
    ]);

    // Start arrow inside shape A
    UI.clickTool("arrow");
    mouse.click(100, 100);
    // Move to shape B — should finalize and bind
    mouse.click(500, 100);

    await waitFor(() => {
      const arrow = h.elements.find(
        (el): el is ExcalidrawArrowElement => el.type === "arrow",
      );
      expect(arrow).toBeDefined();
      // Arrow should be start-bound to shapeA
      expect(arrow!.startBinding?.elementId).toBe("shapeA");
      // Arrow should be end-bound to shapeB
      expect(arrow!.endBinding?.elementId).toBe("shapeB");
    });
  });

  it("arrow inside a shape finalizes normally via Escape key", async () => {
    // Create a large rectangle
    API.setElements([
      API.createElement({
        type: "rectangle",
        id: "rect2",
        x: 0,
        y: 0,
        width: 500,
        height: 400,
      }),
    ]);

    // Start arrow inside the rectangle and add points
    UI.clickTool("arrow");
    mouse.click(100, 100);
    mouse.click(200, 200);
    // Finalize via Escape (triggers actionFinalize)
    Keyboard.keyPress(KEYS.ESCAPE);

    await waitFor(() => {
      const arrow = h.elements.find(
        (el): el is ExcalidrawArrowElement => el.type === "arrow",
      );
      expect(arrow).toBeDefined();
      // Arrow should have been finalized
      expect(h.state.multiElement).toBeNull();
    });
  });

  it("mouse move inside start-bound shape does not auto-finalize arrow", async () => {
    // Create a large rectangle
    API.setElements([
      API.createElement({
        type: "rectangle",
        id: "rect3",
        x: 0,
        y: 0,
        width: 500,
        height: 400,
      }),
    ]);

    // Start arrow inside the rectangle
    UI.clickTool("arrow");
    mouse.click(100, 100);

    // Move mouse within the same shape — should NOT auto-finalize
    mouse.moveTo(250, 200);
    mouse.moveTo(350, 300);

    // Arrow should still be in progress (multiElement is set)
    expect(h.state.multiElement).not.toBeNull();

    // Verify no premature finalization occurred
    const arrowInProgress = h.elements.find(
      (el): el is ExcalidrawArrowElement => el.type === "arrow",
    );
    expect(arrowInProgress).toBeDefined();

    // Finalize with Enter to confirm arrow is still controllable
    Keyboard.keyPress(KEYS.ENTER);

    await waitFor(() => {
      expect(h.state.multiElement).toBeNull();
    });
  });
});
