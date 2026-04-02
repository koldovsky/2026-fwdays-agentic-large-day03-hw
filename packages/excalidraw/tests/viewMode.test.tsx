import React from "react";

import { CURSOR_TYPE, KEYS } from "@excalidraw/common";

import { createTestHook } from "../components/App";
import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import { act, fireEvent, render, GlobalTestState } from "./test-utils";

createTestHook();

const { h } = window;

const flushAnimationFrames = async (n: number) => {
  await act(async () => {
    for (let i = 0; i < n; i++) {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    }
  });
};

const mouse = new Pointer("mouse");
const touch = new Pointer("touch");
const pen = new Pointer("pen");
const pointerTypes = [mouse, touch, pen];

describe("view mode", () => {
  beforeEach(async () => {
    await render(<Excalidraw handleKeyboardGlobally={true} />);
  });

  it("after switching to view mode – cursor type should be pointer", async () => {
    API.setAppState({ viewModeEnabled: true });
    expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
      CURSOR_TYPE.GRAB,
    );
  });

  it("after switching to view mode, moving, clicking, and pressing space key – cursor type should be pointer", async () => {
    API.setAppState({ viewModeEnabled: true });

    pointerTypes.forEach((pointerType) => {
      const pointer = pointerType;
      pointer.reset();
      pointer.move(100, 100);
      pointer.click();
      Keyboard.keyPress(KEYS.SPACE);
      expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
        CURSOR_TYPE.GRAB,
      );
    });
  });

  it("cursor should stay as grabbing type when hovering over canvas elements", async () => {
    // create a rectangle, then hover over it – cursor should be
    // move type for mouse and grab for touch & pen
    // then switch to view-mode and cursor should be grabbing type
    UI.createElement("rectangle", { size: 100 });

    pointerTypes.forEach((pointerType) => {
      const pointer = pointerType;

      pointer.moveTo(50, 50);
      // eslint-disable-next-line dot-notation
      if (pointerType["pointerType"] === "mouse") {
        expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
          CURSOR_TYPE.MOVE,
        );
      } else {
        expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
          CURSOR_TYPE.GRAB,
        );
      }

      API.setAppState({ viewModeEnabled: true });
      expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
        CURSOR_TYPE.GRAB,
      );
    });
  });

  it("pans canvas with arrow keys (view mode)", async () => {
    API.setAppState({ viewModeEnabled: true });
    const scrollX0 = h.state.scrollX;
    const scrollY0 = h.state.scrollY;

    await act(async () => {
      fireEvent.keyDown(document, { key: KEYS.ARROW_RIGHT });
    });
    await flushAnimationFrames(12);
    await act(async () => {
      fireEvent.keyUp(document, { key: KEYS.ARROW_RIGHT });
    });
    await flushAnimationFrames(20);

    expect(h.state.scrollX).toBeLessThan(scrollX0);
    expect(h.state.scrollY).toBe(scrollY0);
  });

  it("pans diagonally when two arrow keys are held (view mode)", async () => {
    API.setAppState({ viewModeEnabled: true });
    const scrollX0 = h.state.scrollX;
    const scrollY0 = h.state.scrollY;

    await act(async () => {
      fireEvent.keyDown(document, { key: KEYS.ARROW_LEFT });
      fireEvent.keyDown(document, { key: KEYS.ARROW_UP });
    });
    await flushAnimationFrames(12);
    await act(async () => {
      fireEvent.keyUp(document, { key: KEYS.ARROW_LEFT });
      fireEvent.keyUp(document, { key: KEYS.ARROW_UP });
    });
    await flushAnimationFrames(20);

    expect(h.state.scrollX).toBeGreaterThan(scrollX0);
    expect(h.state.scrollY).toBeGreaterThan(scrollY0);
  });

  it("does not pan with arrow keys when focus is in a writable input", async () => {
    API.setAppState({ viewModeEnabled: true });
    const input = document.createElement("input");
    input.type = "text";
    document.body.appendChild(input);
    input.focus();

    const scrollX0 = h.state.scrollX;
    const scrollY0 = h.state.scrollY;

    await act(async () => {
      fireEvent.keyDown(input, { key: KEYS.ARROW_RIGHT });
    });
    await flushAnimationFrames(12);

    expect(h.state.scrollX).toBe(scrollX0);
    expect(h.state.scrollY).toBe(scrollY0);

    document.body.removeChild(input);
  });
});
