import React from "react";

import { Pointer } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  fireEvent,
  mockBoundingClientRect,
  render,
  restoreOriginalGetBoundingClientRect,
} from "@excalidraw/excalidraw/tests/test-utils";
import { getTextEditor } from "@excalidraw/excalidraw/tests/queries/dom";

import type { ExcalidrawTextElement } from "@excalidraw/element/types";

import ExcalidrawApp from "../App";

const { h } = window;
const mouse = new Pointer("mouse");

const MARGIN_PX = 16;

const commitTextEditor = async (text: string) => {
  const editor = await getTextEditor();
  fireEvent.input(editor, { target: { value: text } });
  act(() => {
    editor.blur();
  });
};

describe("mobile-text-fit-viewport integration", () => {
  afterEach(() => {
    restoreOriginalGetBoundingClientRect();
  });

  it("3.1 mobile portrait: new text element fits within viewport width", async () => {
    mockBoundingClientRect({ width: 390, height: 844 });
    await render(<ExcalidrawApp />);

    const margin = MARGIN_PX / h.state.zoom.value;
    const maxRight = h.state.width / h.state.zoom.value - margin;

    // Double-click on empty canvas to create a new text element
    mouse.doubleClickAt(300, 400);
    await commitTextEditor("Hello mobile");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    // Element's left edge should be within margin from viewport left
    expect(el.x).toBeGreaterThanOrEqual(-h.state.scrollX + margin - 0.01);
    // Element's right edge should be within margin from viewport right
    expect(el.x + el.width).toBeLessThanOrEqual(maxRight + 0.01);
    expect(el.autoResize).toBe(false);
  });

  it("3.2 desktop: new text element position is unchanged after commit", async () => {
    mockBoundingClientRect({ width: 1440, height: 900 });
    await render(<ExcalidrawApp />);

    // Double-click to create text element
    mouse.doubleClickAt(200, 200);

    const initialX = (
      h.elements.find((e) => e.type === "text") as ExcalidrawTextElement
    )?.x;

    await commitTextEditor("Hello desktop");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    // x should not have been snapped to the 16px mobile margin
    expect(el.x).toBeCloseTo(initialX, 5);
    // width should not span the full desktop viewport
    const mobileReposWidth = 1440 - 2 * MARGIN_PX;
    expect(Math.abs(el.width - mobileReposWidth)).toBeGreaterThan(1);
  });

  it("3.3 landscape phone: new text element fits within viewport width", async () => {
    mockBoundingClientRect({ width: 844, height: 390 });
    await render(<ExcalidrawApp />);

    const margin = MARGIN_PX / h.state.zoom.value;
    const maxRight = h.state.width / h.state.zoom.value - margin;

    // Double-click on empty canvas to create a new text element
    mouse.doubleClickAt(700, 200);
    await commitTextEditor("Hello landscape");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    expect(el.x).toBeGreaterThanOrEqual(-h.state.scrollX + margin - 0.01);
    expect(el.x + el.width).toBeLessThanOrEqual(maxRight + 0.01);
    expect(el.autoResize).toBe(false);
  });
});
