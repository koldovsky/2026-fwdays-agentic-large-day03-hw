import React from "react";
import { vi } from "vitest";

import { KEYS, reseed } from "@excalidraw/common";

import type { ExcalidrawLinearElement } from "@excalidraw/element/types";

import { DiagramToCodePlugin, Excalidraw } from "../index";
import * as InteractiveScene from "../renderer/interactiveScene";
import * as StaticScene from "../renderer/staticScene";

import { Keyboard, UI } from "./helpers/ui";

import {
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  unmountComponent,
} from "./test-utils";

unmountComponent();

const renderInteractiveScene = vi.spyOn(
  InteractiveScene,
  "renderInteractiveScene",
);
const renderStaticScene = vi.spyOn(StaticScene, "renderStaticScene");

beforeEach(() => {
  localStorage.clear();
  renderInteractiveScene.mockClear();
  renderStaticScene.mockClear();
  reseed(7);
});

const { h } = window;

describe("Test dragCreate", () => {
  describe("add element to the scene when pointer dragging long enough", () => {
    it("rectangle", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("rectangle");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // move to (60,70)
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `5`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();

      expect(h.elements.length).toEqual(1);
      expect(h.elements[0].type).toEqual("rectangle");
      expect(h.elements[0].x).toEqual(30);
      expect(h.elements[0].y).toEqual(20);
      expect(h.elements[0].width).toEqual(30); // 60 - 30
      expect(h.elements[0].height).toEqual(50); // 70 - 20

      expect(h.elements.length).toMatchSnapshot();
      h.elements.forEach((element) => expect(element).toMatchSnapshot());
    });

    it("ellipse", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("ellipse");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // move to (60,70)
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `5`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);

      expect(h.state.selectionElement).toBeNull();

      expect(h.elements.length).toEqual(1);
      expect(h.elements[0].type).toEqual("ellipse");
      expect(h.elements[0].x).toEqual(30);
      expect(h.elements[0].y).toEqual(20);
      expect(h.elements[0].width).toEqual(30); // 60 - 30
      expect(h.elements[0].height).toEqual(50); // 70 - 20

      expect(h.elements.length).toMatchSnapshot();
      h.elements.forEach((element) => expect(element).toMatchSnapshot());
    });

    it("diamond", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("diamond");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // move to (60,70)
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `5`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();

      expect(h.elements.length).toEqual(1);
      expect(h.elements[0].type).toEqual("diamond");
      expect(h.elements[0].x).toEqual(30);
      expect(h.elements[0].y).toEqual(20);
      expect(h.elements[0].width).toEqual(30); // 60 - 30
      expect(h.elements[0].height).toEqual(50); // 70 - 20

      expect(h.elements.length).toMatchSnapshot();
      h.elements.forEach((element) => expect(element).toMatchSnapshot());
    });

    it("arrow", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("arrow");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // move to (60,70)
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `6`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`6`);
      expect(h.state.selectionElement).toBeNull();

      expect(h.elements.length).toEqual(1);

      const element = h.elements[0] as ExcalidrawLinearElement;

      expect(element.type).toEqual("arrow");
      expect(element.x).toEqual(30);
      expect(element.y).toEqual(20);
      expect(element.points.length).toEqual(2);
      expect(element.points[0]).toEqual([0, 0]);
      expect(element.points[1]).toEqual([30, 50]); // (60 - 30, 70 - 20)

      expect(h.elements.length).toMatchSnapshot();
      h.elements.forEach((element) => expect(element).toMatchSnapshot());
    });

    it("line", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("line");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // move to (60,70)
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `6`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`6`);
      expect(h.state.selectionElement).toBeNull();

      expect(h.elements.length).toEqual(1);

      const element = h.elements[0] as ExcalidrawLinearElement;

      expect(element.type).toEqual("line");
      expect(element.x).toEqual(30);
      expect(element.y).toEqual(20);
      expect(element.points.length).toEqual(2);
      expect(element.points[0]).toEqual([0, 0]);
      expect(element.points[1]).toEqual([30, 50]); // (60 - 30, 70 - 20)

      h.elements.forEach((element) => expect(element).toMatchSnapshot());
    });
  });

  describe("do not add element to the scene if size is too small", () => {
    beforeAll(() => {
      mockBoundingClientRect();
    });
    afterAll(() => {
      restoreOriginalGetBoundingClientRect();
    });

    it("rectangle", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("rectangle");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `5`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();
      expect(h.elements.length).toEqual(0);
    });

    it("ellipse", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("ellipse");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `5`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();
      expect(h.elements.length).toEqual(0);
    });

    it("diamond", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      // select tool
      const tool = getByToolName("diamond");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `5`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();
      expect(h.elements.length).toEqual(0);
    });

    it("arrow", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      // select tool
      const tool = getByToolName("arrow");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      // we need to finalize it because arrows and lines enter multi-mode
      fireEvent.keyDown(document, {
        key: KEYS.ENTER,
      });

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `6`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();
      expect(h.elements).toEqual([
        expect.objectContaining({
          type: "arrow",
          isDeleted: true,
        }),
      ]);
    });

    it("line", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      // select tool
      const tool = getByToolName("line");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // start from (30, 20)
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });

      // finish (position does not matter)
      fireEvent.pointerUp(canvas);

      // we need to finalize it because arrows and lines enter multi-mode
      fireEvent.keyDown(document, {
        key: KEYS.ENTER,
      });

      expect(renderInteractiveScene.mock.calls.length).toMatchInlineSnapshot(
        `6`,
      );
      expect(renderStaticScene.mock.calls.length).toMatchInlineSnapshot(`5`);
      expect(h.state.selectionElement).toBeNull();
      expect(h.elements).toEqual([
        expect.objectContaining({
          type: "line",
          isDeleted: true,
        }),
      ]);
    });
  });

  describe("Escape cancels drag-create", () => {
    it("rectangle", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const tool = getByToolName("rectangle");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("ellipse", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const tool = getByToolName("ellipse");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("diamond", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const tool = getByToolName("diamond");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("frame", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      fireEvent.click(
        container.querySelector(".App-toolbar__extra-tools-trigger")!,
      );
      const tool = getByToolName("frame");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("magicframe", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw>
          <DiagramToCodePlugin generate={async () => ({ html: "" })} />
        </Excalidraw>,
      );
      fireEvent.click(
        container.querySelector(".App-toolbar__extra-tools-trigger")!,
      );
      const tool = getByToolName("magicframe");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("freedraw", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const tool = getByToolName("freedraw");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("single-segment arrow", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const tool = getByToolName("arrow");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("multi-point arrow Escape still finalizes (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const tool = getByToolName("arrow");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      // click to place first point
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerUp(canvas, { clientX: 30, clientY: 20 });

      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      // click to place second point (enters multi-point mode)
      fireEvent.pointerDown(canvas, { clientX: 60, clientY: 70 });
      fireEvent.pointerUp(canvas, { clientX: 60, clientY: 70 });

      // Escape should finalize, not cancel
      Keyboard.keyPress(KEYS.ESCAPE);

      const element = h.elements[0] as ExcalidrawLinearElement;
      expect(element).toBeDefined();
      expect(element.type).toBe("arrow");
      expect(element.isDeleted).toBe(false);
      expect(element.points.length).toBeGreaterThanOrEqual(2);
    });

    it("multi-point line Escape between clicks with 2 committed points finalizes (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const tool = getByToolName("line");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerUp(canvas, { clientX: 10, clientY: 10 });

      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 80 });

      fireEvent.pointerDown(canvas, { clientX: 80, clientY: 80 });
      fireEvent.pointerUp(canvas, { clientX: 80, clientY: 80 });

      Keyboard.keyPress(KEYS.ESCAPE);

      const element = h.elements[0] as ExcalidrawLinearElement;
      expect(element).toBeDefined();
      expect(element.type).toBe("line");
      expect(element.isDeleted).toBe(false);
      expect(element.points.length).toBeGreaterThanOrEqual(2);
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("multi-point line Escape after only one committed point removes or deletes (spec)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const canvas = container.querySelector("canvas.interactive")!;
      fireEvent.click(getByToolName("line"));

      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerUp(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 80 });

      Keyboard.keyPress(KEYS.ESCAPE);
      fireEvent.pointerUp(canvas);

      const lines = h.elements.filter((el) => el.type === "line");
      expect(
        lines.length === 0 || lines.every((l) => l.isDeleted),
      ).toBe(true);
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("multi-point arrow Escape while pointer is down finalizes (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const tool = getByToolName("arrow");
      fireEvent.click(tool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerUp(canvas, { clientX: 30, clientY: 20 });

      fireEvent.pointerMove(canvas, { clientX: 100, clientY: 100 });

      fireEvent.pointerDown(canvas, { clientX: 100, clientY: 100 });
      fireEvent.pointerUp(canvas, { clientX: 100, clientY: 100 });

      fireEvent.pointerMove(canvas, { clientX: 200, clientY: 200 });

      // pointer is down for the third point
      fireEvent.pointerDown(canvas, { clientX: 200, clientY: 200 });

      // Escape while pointer is down — should finalize with committed points
      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      const element = h.elements[0] as ExcalidrawLinearElement;
      expect(element).toBeDefined();
      expect(element.type).toBe("arrow");
      expect(element.isDeleted).toBe(false);
      expect(element.points.length).toBeGreaterThanOrEqual(2);
      expect(h.state.multiElement).toBeNull();
      expect(h.state.newElement).toBeNull();
    });

    it("subsequent creation works after cancellation", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);

      // First: start and cancel a rectangle
      const rectTool = getByToolName("rectangle");
      fireEvent.click(rectTool);

      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);

      // Second: create an ellipse normally
      const ellipseTool = getByToolName("ellipse");
      fireEvent.click(ellipseTool);

      fireEvent.pointerDown(canvas, { clientX: 100, clientY: 100 });
      fireEvent.pointerMove(canvas, { clientX: 200, clientY: 200 });
      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(1);
      expect(h.elements[0].type).toBe("ellipse");
      expect(h.elements[0].isDeleted).toBe(false);
    });

    it("locked tool remains active after cancellation", async () => {
      await render(<Excalidraw />);

      UI.clickTool("lock");
      expect(h.state.activeTool.locked).toBe(true);

      UI.clickTool("rectangle");
      expect(h.state.activeTool.type).toBe("rectangle");

      const canvas = document.querySelector("canvas.interactive")!;

      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 60, clientY: 70 });

      Keyboard.keyPress(KEYS.ESCAPE, window);

      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);
      expect(h.state.newElement).toBeNull();
      expect(h.state.activeTool.type).toBe("rectangle");
      expect(h.state.activeTool.locked).toBe(true);
    });

    it("line tool works after freedraw Escape cancel (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const canvas = container.querySelector("canvas.interactive")!;

      // Start and cancel a freedraw stroke
      fireEvent.click(getByToolName("freedraw"));
      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerMove(canvas, { clientX: 40, clientY: 40 });
      Keyboard.keyPress(KEYS.ESCAPE, window);
      fireEvent.pointerUp(canvas);

      expect(h.elements.length).toEqual(0);

      // Switch to line tool and create a line
      fireEvent.click(getByToolName("line"));
      fireEvent.pointerDown(canvas, { clientX: 100, clientY: 100 });
      fireEvent.pointerMove(canvas, { clientX: 200, clientY: 200 });
      fireEvent.pointerUp(canvas);

      const lines = h.elements.filter(
        (el) => el.type === "line" && !el.isDeleted,
      );
      expect(lines.length).toBe(1);
    });

    it("finalized multi-point line is not deleted by subsequent Escape (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const canvas = container.querySelector("canvas.interactive")!;

      // Create a multi-point line: click-click-Escape to finalize
      fireEvent.click(getByToolName("line"));

      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerUp(canvas, { clientX: 10, clientY: 10 });

      fireEvent.pointerDown(canvas, { clientX: 50, clientY: 50 });
      fireEvent.pointerUp(canvas, { clientX: 50, clientY: 50 });

      // Escape finalizes the multi-point line
      Keyboard.keyPress(KEYS.ESCAPE);

      const element = h.elements[0] as ExcalidrawLinearElement;
      expect(element).toBeDefined();
      expect(element.type).toBe("line");
      expect(element.isDeleted).toBe(false);

      // Press Escape again — should NOT delete the finalized line
      Keyboard.keyPress(KEYS.ESCAPE);

      expect(h.elements[0].isDeleted).toBe(false);

      // Select another tool and draw a new element
      fireEvent.click(getByToolName("rectangle"));
      fireEvent.pointerDown(canvas, { clientX: 100, clientY: 100 });
      fireEvent.pointerMove(canvas, { clientX: 200, clientY: 200 });
      fireEvent.pointerUp(canvas);

      // The finalized multi-point line must still be present and not deleted
      const line = h.elements.find((el) => el.type === "line");
      expect(line).toBeDefined();
      expect(line!.isDeleted).toBe(false);

      // The new rectangle should also be present
      const rect = h.elements.find((el) => el.type === "rectangle");
      expect(rect).toBeDefined();
      expect(rect!.isDeleted).toBe(false);
    });

    it("cancelled rectangle is not visible in scene elements (regression)", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.click(getByToolName("rectangle"));
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 90 });

      Keyboard.keyPress(KEYS.ESCAPE, window);
      fireEvent.pointerUp(canvas);

      const visibleRects = h.elements.filter(
        (el) => el.type === "rectangle" && !el.isDeleted,
      );
      expect(visibleRects.length).toBe(0);

      const nonDeleted = h.elements.filter((el) => !el.isDeleted);
      expect(nonDeleted.length).toBe(0);
    });

    it("multi-point line survives Escape after large mouse move post-commit (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const canvas = container.querySelector("canvas.interactive")!;
      fireEvent.click(getByToolName("line"));

      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerUp(canvas, { clientX: 10, clientY: 10 });

      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 80 });

      fireEvent.pointerDown(canvas, { clientX: 80, clientY: 80 });
      fireEvent.pointerUp(canvas, { clientX: 80, clientY: 80 });

      // Large move after the second click — adds a hover point
      fireEvent.pointerMove(canvas, { clientX: 120, clientY: 120 });

      Keyboard.keyPress(KEYS.ESCAPE);

      const element = h.elements[0] as ExcalidrawLinearElement;
      expect(element).toBeDefined();
      expect(element.type).toBe("line");
      expect(element.isDeleted).toBe(false);
      expect(element.points.length).toBeGreaterThanOrEqual(2);
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("multi-point line survives Escape after small mouse move post-commit (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const canvas = container.querySelector("canvas.interactive")!;
      fireEvent.click(getByToolName("line"));

      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerUp(canvas, { clientX: 10, clientY: 10 });

      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 80 });

      fireEvent.pointerDown(canvas, { clientX: 80, clientY: 80 });
      fireEvent.pointerUp(canvas, { clientX: 80, clientY: 80 });

      // Small move (< LINE_CONFIRM_THRESHOLD=8px) after the second click.
      // This triggers handlePointerMove/movePoints which creates new point
      // references, making lastCommittedPoint stale. No hover point is added.
      fireEvent.pointerMove(canvas, { clientX: 83, clientY: 83 });

      Keyboard.keyPress(KEYS.ESCAPE);

      const element = h.elements[0] as ExcalidrawLinearElement;
      expect(element).toBeDefined();
      expect(element.type).toBe("line");
      expect(element.isDeleted).toBe(false);
      expect(element.points.length).toBeGreaterThanOrEqual(2);
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("multi-point line survives Escape after multiple mouse moves (regression)", async () => {
      const { getByToolName, container } = await render(
        <Excalidraw handleKeyboardGlobally={true} />,
      );
      const canvas = container.querySelector("canvas.interactive")!;
      fireEvent.click(getByToolName("line"));

      // Click first point
      fireEvent.pointerDown(canvas, { clientX: 10, clientY: 10 });
      fireEvent.pointerUp(canvas, { clientX: 10, clientY: 10 });

      // Move to second position
      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 80 });

      // Click second point
      fireEvent.pointerDown(canvas, { clientX: 80, clientY: 80 });
      fireEvent.pointerUp(canvas, { clientX: 80, clientY: 80 });

      // Multiple moves after commit — simulates real user mouse jitter
      // and hover point creation/tracking via handlePointerMove
      fireEvent.pointerMove(canvas, { clientX: 100, clientY: 100 });
      fireEvent.pointerMove(canvas, { clientX: 120, clientY: 120 });
      fireEvent.pointerMove(canvas, { clientX: 150, clientY: 150 });

      Keyboard.keyPress(KEYS.ESCAPE);

      const lines = h.elements.filter(
        (el) => el.type === "line" && !el.isDeleted,
      ) as ExcalidrawLinearElement[];
      expect(lines.length).toBe(1);
      expect(lines[0].points.length).toBeGreaterThanOrEqual(2);
    });

    it("cursorButton is up and selectedLinearElement is null after Escape cancel (regression)", async () => {
      const { getByToolName, container } = await render(<Excalidraw />);
      const canvas = container.querySelector("canvas.interactive")!;

      fireEvent.click(getByToolName("arrow"));
      fireEvent.pointerDown(canvas, { clientX: 30, clientY: 20 });
      fireEvent.pointerMove(canvas, { clientX: 80, clientY: 90 });

      Keyboard.keyPress(KEYS.ESCAPE, window);
      fireEvent.pointerUp(canvas);

      expect(h.state.cursorButton).toBe("up");
      expect(h.state.selectedLinearElement).toBeNull();
    });
  });
});
