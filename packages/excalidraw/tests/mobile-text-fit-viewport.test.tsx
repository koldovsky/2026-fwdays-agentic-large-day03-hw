import React from "react";

import { reseed } from "@excalidraw/common";

import type { ExcalidrawTextElement } from "@excalidraw/element/types";

import { Excalidraw } from "../index";

import { Pointer, UI } from "./helpers/ui";
import {
  act,
  fireEvent,
  mockBoundingClientRect,
  render,
  restoreOriginalGetBoundingClientRect,
  unmountComponent,
} from "./test-utils";
import { getTextEditor } from "./queries/dom";

const { h } = window;

const mouse = new Pointer("mouse");

const MOBILE_PORTRAIT = { width: 390, height: 844 };
const LANDSCAPE_PHONE = { width: 844, height: 390 };
const DESKTOP = { width: 1440, height: 900 };
const MARGIN_PX = 16;

/** Commits the open text editor by blurring it after typing the given text. */
const commitTextEditor = async (text: string) => {
  const editor = await getTextEditor();
  fireEvent.input(editor, { target: { value: text } });
  act(() => {
    editor.blur();
  });
};

/** Sets the simulated viewport dimensions and refreshes the app state. */
const setDimensions = (dims: { width: number; height: number }) => {
  mockBoundingClientRect(dims);
  act(() => {
    h.app.refreshEditorInterface();
    h.app.refresh();
  });
};

describe("mobile-text-fit-viewport", () => {
  beforeEach(() => {
    unmountComponent();
    reseed(7);
  });

  afterEach(() => {
    restoreOriginalGetBoundingClientRect();
  });

  it("2.1 repositions new text element to fit mobile viewport (portrait)", async () => {
    mockBoundingClientRect(MOBILE_PORTRAIT);
    await render(<Excalidraw />);

    const margin = MARGIN_PX / h.state.zoom.value;
    const expectedX = -h.state.scrollX + margin;
    const expectedWidth = h.state.width / h.state.zoom.value - 2 * margin;

    // Double-click on empty canvas → startTextEditing with autoEdit=true,
    // isExistingElement=false → repositioning applies
    mouse.doubleClickAt(300, 400);

    await commitTextEditor("Hello world");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    expect(el.x).toBeCloseTo(expectedX, 5);
    expect(el.width).toBeCloseTo(expectedWidth, 5);
    expect(el.autoResize).toBe(false);
  });

  it("2.2 does NOT reposition text element on desktop viewport", async () => {
    mockBoundingClientRect(DESKTOP);
    await render(<Excalidraw />);

    // Double-click on empty canvas to create new text element
    mouse.doubleClickAt(200, 200);

    const initialX = (
      h.elements.find((e) => e.type === "text") as ExcalidrawTextElement
    )?.x;

    await commitTextEditor("Hello desktop");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    // x should remain at the click-derived position, not snapped to margin
    expect(el.x).toBeCloseTo(initialX, 5);
    // width should NOT be desktop_width - 2*margin
    const wouldBeRepositionedWidth = DESKTOP.width - 2 * MARGIN_PX;
    expect(Math.abs(el.width - wouldBeRepositionedWidth)).toBeGreaterThan(1);
  });

  it("2.3 does NOT reposition bound text element (containerId !== null) on mobile", async () => {
    mockBoundingClientRect(MOBILE_PORTRAIT);
    await render(<Excalidraw />);

    // Create a rectangle container using the UI tool
    UI.createElement("rectangle", { x: 50, y: 50, width: 150, height: 80 });
    const container = h.elements[0];

    // Double-click the container to add bound text (new bound text, isExistingElement=false)
    mouse.doubleClickAt(
      container.x + container.width / 2,
      container.y + container.height / 2,
    );
    await commitTextEditor("bound text");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    expect(el.containerId).toBe(container.id);
    // Bound text should NOT be snapped to viewport margin
    const margin = MARGIN_PX / h.state.zoom.value;
    const expectedRepositionedX = -h.state.scrollX + margin;
    expect(Math.abs(el.x - expectedRepositionedX)).toBeGreaterThan(1);
  });

  it("2.4 does NOT reposition existing text element being re-edited on mobile", async () => {
    // Create text element on desktop
    mockBoundingClientRect(DESKTOP);
    await render(<Excalidraw />);

    UI.clickTool("text");
    mouse.clickAt(200, 200);
    await commitTextEditor("Original desktop text");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    const originalX = el.x;

    // Switch to mobile and re-edit the existing element
    setDimensions(MOBILE_PORTRAIT);

    mouse.doubleClickAt(el.x + el.width / 2, el.y + el.height / 2);
    await commitTextEditor("Edited on mobile");

    const updatedEl = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(updatedEl).toBeDefined();
    // Existing element should NOT be repositioned to mobile margin
    const margin = MARGIN_PX / h.state.zoom.value;
    const expectedRepositionedX = -h.state.scrollX + margin;
    expect(Math.abs(updatedEl.x - expectedRepositionedX)).toBeGreaterThan(1);
    // x should remain near the original position (not snapped to left edge)
    expect(updatedEl.x).toBeCloseTo(originalX, 5);
  });

  it("2.5 repositions new text element on landscape phone viewport", async () => {
    mockBoundingClientRect(LANDSCAPE_PHONE);
    await render(<Excalidraw />);

    const margin = MARGIN_PX / h.state.zoom.value;
    const expectedX = -h.state.scrollX + margin;
    const expectedWidth = h.state.width / h.state.zoom.value - 2 * margin;

    // Double-click on empty canvas to create new text element
    mouse.doubleClickAt(700, 200);

    await commitTextEditor("Landscape text");

    const el = h.elements.find(
      (e) => e.type === "text",
    ) as ExcalidrawTextElement;
    expect(el).toBeDefined();
    expect(el.x).toBeCloseTo(expectedX, 5);
    expect(el.width).toBeCloseTo(expectedWidth, 5);
    expect(el.autoResize).toBe(false);
  });
});
