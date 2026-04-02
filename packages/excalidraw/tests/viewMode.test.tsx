import React from "react";

import { CODES, CURSOR_TYPE, KEYS } from "@excalidraw/common";

import { vi } from "vitest";

import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import { act, fireEvent, render, GlobalTestState } from "./test-utils";

/** Matches first-frame dt fallback in `stepViewModeArrowPan` when `lastTs` is unset (1/60 s). */
const VIEW_MODE_KEYBOARD_PAN_TEST_DT_MS = 1000 / 60;

/**
 * Steps with arrow held (~0.8s at 60Hz): enough to approach target velocity for stable assertions.
 */
const VIEW_MODE_KEYBOARD_PAN_HOLD_STEPS = 48;

/**
 * Steps after releasing arrows to drain coasting friction (~0.5s at 60Hz).
 */
const VIEW_MODE_KEYBOARD_PAN_COAST_OUT_STEPS = 30;

/**
 * Steps to build speed before ease-out assertions (~1.1s at 60Hz).
 */
const VIEW_MODE_KEYBOARD_PAN_EASE_OUT_WARMUP_STEPS = 66;

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

  describe("view-mode keyboard pan (fixed timestep)", () => {
    let simTimeMs = 0;

    beforeEach(() => {
      simTimeMs = 0;
      vi.spyOn(window, "requestAnimationFrame").mockReturnValue(0);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    const advancePanSteps = (count: number) => {
      act(() => {
        const { app } = window.h;
        for (let i = 0; i < count; i++) {
          simTimeMs += VIEW_MODE_KEYBOARD_PAN_TEST_DT_MS;
          app.testStepViewModeKeyboardPan(simTimeMs);
        }
      });
    };

    it("pans canvas with arrow keys (view mode)", async () => {
      API.setAppState({ viewModeEnabled: true });
      const scrollX0 = window.h.state.scrollX;
      const scrollY0 = window.h.state.scrollY;

      await act(async () => {
        fireEvent.keyDown(document, { key: KEYS.ARROW_RIGHT });
      });
      advancePanSteps(VIEW_MODE_KEYBOARD_PAN_HOLD_STEPS);
      await act(async () => {
        fireEvent.keyUp(document, { key: KEYS.ARROW_RIGHT });
      });
      advancePanSteps(VIEW_MODE_KEYBOARD_PAN_COAST_OUT_STEPS);

      expect(window.h.state.scrollX).toBeLessThan(scrollX0);
      expect(window.h.state.scrollY).toBe(scrollY0);
    });

    it("eases out: scroll keeps moving after keyup with decreasing step size", async () => {
      API.setAppState({ viewModeEnabled: true });

      await act(async () => {
        fireEvent.keyDown(document, { key: KEYS.ARROW_RIGHT });
      });
      advancePanSteps(VIEW_MODE_KEYBOARD_PAN_EASE_OUT_WARMUP_STEPS);

      const scrollBeforeKeyUp = window.h.state.scrollX;

      await act(async () => {
        fireEvent.keyUp(document, { key: KEYS.ARROW_RIGHT });
      });

      advancePanSteps(1);
      const scrollAfterCoast1 = window.h.state.scrollX;

      advancePanSteps(1);
      const scrollAfterCoast2 = window.h.state.scrollX;

      expect(scrollAfterCoast1).toBeLessThan(scrollBeforeKeyUp);

      const step1 = scrollBeforeKeyUp - scrollAfterCoast1;
      const step2 = scrollAfterCoast1 - scrollAfterCoast2;

      expect(step1).toBeGreaterThan(1e-6);
      expect(step2).toBeGreaterThan(0);
      expect(step2).toBeLessThan(step1);
    });

    it("stops pan when focus moves to a writable control during arrow hold", async () => {
      API.setAppState({ viewModeEnabled: true });

      await act(async () => {
        fireEvent.keyDown(document, { key: KEYS.ARROW_RIGHT });
      });
      advancePanSteps(6);

      const scrollWhenShiftingFocus = window.h.state.scrollX;

      const input = document.createElement("input");
      input.type = "text";
      document.body.appendChild(input);

      try {
        await act(async () => {
          input.focus();
        });
        advancePanSteps(16);

        expect(window.h.state.scrollX).toBe(scrollWhenShiftingFocus);

        await act(async () => {
          fireEvent.keyUp(document, { key: KEYS.ARROW_RIGHT });
        });
        advancePanSteps(4);
      } finally {
        input.remove();
      }
    });

    it("pans diagonally when two arrow keys are held (view mode)", async () => {
      API.setAppState({ viewModeEnabled: true });
      const scrollX0 = window.h.state.scrollX;
      const scrollY0 = window.h.state.scrollY;

      await act(async () => {
        fireEvent.keyDown(document, { key: KEYS.ARROW_LEFT });
        fireEvent.keyDown(document, { key: KEYS.ARROW_UP });
      });
      advancePanSteps(VIEW_MODE_KEYBOARD_PAN_HOLD_STEPS);
      await act(async () => {
        fireEvent.keyUp(document, { key: KEYS.ARROW_LEFT });
        fireEvent.keyUp(document, { key: KEYS.ARROW_UP });
      });
      advancePanSteps(VIEW_MODE_KEYBOARD_PAN_COAST_OUT_STEPS);

      expect(window.h.state.scrollX).toBeGreaterThan(scrollX0);
      expect(window.h.state.scrollY).toBeGreaterThan(scrollY0);
    });

    it("does not pan when ActionManager consumes the keydown (ordering vs shortcuts)", async () => {
      API.setAppState({ viewModeEnabled: true });
      const scrollX0 = window.h.state.scrollX;

      const spy = vi
        .spyOn(window.h.app.actionManager, "handleKeyDown")
        .mockReturnValue(true);

      await act(async () => {
        fireEvent.keyDown(document, { key: KEYS.ARROW_RIGHT });
      });
      advancePanSteps(8);

      spy.mockRestore();

      expect(window.h.state.scrollX).toBe(scrollX0);
    });
  });

  it("view-mode zoom shortcut still works (ActionManager runs before arrow pan)", async () => {
    API.setAppState({ viewModeEnabled: true });
    const zoomBefore = window.h.state.zoom.value;

    await act(async () => {
      fireEvent.keyDown(document, {
        code: CODES.MINUS,
        key: KEYS.SUBTRACT,
        ctrlKey: true,
      });
    });

    expect(window.h.state.zoom.value).toBeLessThan(zoomBefore);
  });

  it("does not pan with arrow keys when focus is in a writable input", async () => {
    API.setAppState({ viewModeEnabled: true });
    const input = document.createElement("input");
    input.type = "text";
    document.body.appendChild(input);

    try {
      input.focus();

      const scrollX0 = window.h.state.scrollX;
      const scrollY0 = window.h.state.scrollY;

      await act(async () => {
        fireEvent.keyDown(input, { key: KEYS.ARROW_RIGHT });
      });

      expect(window.h.state.scrollX).toBe(scrollX0);
      expect(window.h.state.scrollY).toBe(scrollY0);
    } finally {
      input.remove();
    }
  });
});
