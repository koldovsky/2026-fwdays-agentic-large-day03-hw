import React from "react";

import { KEYS } from "@excalidraw/common";

import type { ToolType } from "../types";

import { Excalidraw } from "../index";

import { fireEvent, render, waitFor, unmountComponent } from "./test-utils";

unmountComponent();

const { h } = window;

/**
 * Regression for https://github.com/excalidraw/excalidraw/issues/9852 :
 * `E` must clear in-progress multi-point state the same way toolbar eraser does via setActiveTool.
 */

function getExcalidrawRoot(container: HTMLElement): HTMLElement {
  const root = container.querySelector(".excalidraw.excalidraw-container");
  if (!root || !(root instanceof HTMLElement)) {
    throw new Error("missing .excalidraw.excalidraw-container");
  }
  return root;
}

async function startArrowMultiPointInProgress(
  getByToolName: (name: ToolType | "lock") => HTMLElement,
  container: HTMLElement,
) {
  const tool = getByToolName("arrow");
  fireEvent.click(tool);

  const canvas = container.querySelector("canvas.interactive")!;
  fireEvent.pointerDown(canvas, { clientX: 30, clientY: 30 });
  fireEvent.pointerUp(canvas, { clientX: 30, clientY: 30 });
  fireEvent.pointerMove(canvas, { clientX: 50, clientY: 60 });

  await waitFor(() => {
    expect(h.state.multiElement).not.toBeNull();
  });

  // Keyboard shortcuts are handled on the excalidraw container (not document)
  // when handleKeyboardGlobally is false.
  getExcalidrawRoot(container).focus();
}

describe("eraser shortcut AppState parity (issue #9852)", () => {
  it("pressing E clears multiElement and activates eraser during multi-point arrow", async () => {
    const { getByToolName, container } = await render(<Excalidraw />);

    await startArrowMultiPointInProgress(getByToolName, container);

    fireEvent.keyDown(getExcalidrawRoot(container), { key: KEYS.E });

    await waitFor(() => {
      expect(h.state.activeTool.type).toBe("eraser");
      expect(h.state.multiElement).toBeNull();
      expect(h.state.editingGroupId).toBeNull();
    });
  });

  it("toolbar eraser matches E for multiElement and activeTool after same in-progress arrow", async () => {
    const { getByToolName, container } = await render(<Excalidraw />);

    await startArrowMultiPointInProgress(getByToolName, container);

    fireEvent.keyDown(getExcalidrawRoot(container), { key: KEYS.E });
    await waitFor(() => {
      expect(h.state.activeTool.type).toBe("eraser");
    });

    const afterKey = {
      multiElement: h.state.multiElement,
      editingGroupId: h.state.editingGroupId,
      originSnapOffset: h.state.originSnapOffset,
      snapLines: h.state.snapLines,
    };

    // Avoid two Excalidraw trees in the document (getByToolName is ambiguous).
    unmountComponent();

    const { getByToolName: getByToolName2, container: container2 } =
      await render(<Excalidraw />);
    await startArrowMultiPointInProgress(getByToolName2, container2);

    const eraserTool = getByToolName2("eraser");
    fireEvent.click(eraserTool);

    await waitFor(() => {
      expect(h.state.activeTool.type).toBe("eraser");
    });

    expect({
      multiElement: h.state.multiElement,
      editingGroupId: h.state.editingGroupId,
      originSnapOffset: h.state.originSnapOffset,
      snapLines: h.state.snapLines,
    }).toEqual(afterKey);
  });
});
