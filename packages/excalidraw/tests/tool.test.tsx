import React from "react";

import { KEYS, resolvablePromise } from "@excalidraw/common";

import { Excalidraw } from "../index";

import { Keyboard, Pointer } from "./helpers/ui";
import { act, render } from "./test-utils";

import type { ExcalidrawImperativeAPI } from "../types";

describe("setActiveTool()", () => {
  const h = window.h;

  let excalidrawAPI: ExcalidrawImperativeAPI;

  const mouse = new Pointer("mouse");

  beforeEach(async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    await render(
      <Excalidraw
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    excalidrawAPI = await excalidrawAPIPromise;
  });

  it("should expose setActiveTool on package API", () => {
    expect(excalidrawAPI.setActiveTool).toBeDefined();
    expect(excalidrawAPI.setActiveTool).toBe(h.app.setActiveTool);
  });

  it("should set the active tool type", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle" });
    });
    expect(h.state.activeTool.type).toBe("rectangle");

    mouse.down(10, 10);
    mouse.up(20, 20);

    expect(h.state.activeTool.type).toBe("selection");
  });

  it("should support tool locking", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle", locked: true });
    });
    expect(h.state.activeTool.type).toBe("rectangle");

    mouse.down(10, 10);
    mouse.up(20, 20);

    expect(h.state.activeTool.type).toBe("rectangle");
  });

  it("should set custom tool", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    act(() => {
      excalidrawAPI.setActiveTool({ type: "custom", customType: "comment" });
    });
    expect(h.state.activeTool.type).toBe("custom");
    expect(h.state.activeTool.customType).toBe("comment");
  });
});

describe("Esc key tool deactivation toast", () => {
  const h = window.h;

  let excalidrawAPI: ExcalidrawImperativeAPI;

  beforeEach(async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    await render(
      <Excalidraw
        handleKeyboardGlobally={true}
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    excalidrawAPI = await excalidrawAPIPromise;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should show toast when deactivating a shape tool via Escape", () => {
    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle" });
    });
    expect(h.state.activeTool.type).toBe("rectangle");

    Keyboard.keyPress(KEYS.ESCAPE);

    expect(h.state.activeTool.type).toBe("selection");
    expect(h.state.toast).not.toBeNull();
    expect(h.state.toast?.message).toMatch(/tool deactivated/i);
  });

  it("should not show toast when pressing Escape in selection mode", () => {
    expect(h.state.activeTool.type).toBe("selection");
    expect(h.state.toast).toBeNull();

    Keyboard.keyPress(KEYS.ESCAPE);

    expect(h.state.activeTool.type).toBe("selection");
    expect(h.state.toast).toBeNull();
  });

  it("should auto-dismiss toast after duration elapses", () => {
    vi.useFakeTimers();

    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle" });
    });

    Keyboard.keyPress(KEYS.ESCAPE);
    expect(h.state.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(h.state.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(h.state.toast).toBeNull();
  });

  it("should refresh toast timer on repeated Escape", () => {
    vi.useFakeTimers();

    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle" });
    });

    Keyboard.keyPress(KEYS.ESCAPE);
    expect(h.state.toast).not.toBeNull();

    // Advance 2s, then press Escape again to refresh
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    Keyboard.keyPress(KEYS.ESCAPE);
    expect(h.state.toast).not.toBeNull();

    // Advance 2s after second Escape — toast should still exist (only 2s into 3s timer)
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(h.state.toast).not.toBeNull();

    // Advance past the full duration from the last Escape
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(h.state.toast).toBeNull();
  });
});
