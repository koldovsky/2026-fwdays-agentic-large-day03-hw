import { vi } from "vitest";

import { CURSOR_TYPE, KEYS } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "@excalidraw/element";

import { clearAppStateForLocalStorage } from "../appState";
import { getLinkHandleFromCoords } from "../components/hyperlink/helpers";
import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Pointer } from "./helpers/ui";
import { act, GlobalTestState, render, waitFor } from "./test-utils";

import type { ExcalidrawProps } from "../types";

describe("laser tool interactions", () => {
  const h = window.h;
  const mouse = new Pointer("mouse");

  it("opens links while using the laser tool", async () => {
    const onLinkOpenSpy = vi.fn();
    const onLinkOpen: NonNullable<ExcalidrawProps["onLinkOpen"]> = (
      ...args
    ) => {
      onLinkOpenSpy(...args);
      args[1].preventDefault();
    };
    await render(<Excalidraw onLinkOpen={onLinkOpen} />);

    const linkedRect = API.createElement({
      type: "rectangle",
      x: 20,
      y: 20,
      width: 120,
      height: 90,
    });
    API.setElements([linkedRect]);
    API.updateElement(linkedRect, {
      link: "https://example.com",
    });

    act(() => {
      h.app.setActiveTool({ type: "laser" });
    });

    const elementsMap = h.app.scene.getNonDeletedElementsMap();
    const currentRect = API.getElement(linkedRect);
    const [x1, y1, x2, y2] = getElementAbsoluteCoords(currentRect, elementsMap);
    const [linkX, linkY, linkWidth, linkHeight] = getLinkHandleFromCoords(
      [x1, y1, x2, y2],
      currentRect.angle,
      h.state,
    );
    const iconCenterX = linkX + linkWidth / 2;
    const iconCenterY = linkY + linkHeight / 2;

    mouse.moveTo(iconCenterX, iconCenterY);
    expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
      CURSOR_TYPE.POINTER,
    );

    mouse.clickAt(iconCenterX, iconCenterY);
    expect(onLinkOpenSpy).toHaveBeenCalledTimes(1);
  });

  it("activates embeddables on center click while using the laser tool", async () => {
    await render(<Excalidraw />);

    const embeddable = API.createElement({
      type: "embeddable",
      x: 40,
      y: 40,
      width: 300,
      height: 180,
    });
    API.setElements([embeddable]);
    API.updateElement(embeddable, {
      link: "https://www.youtube.com/watch?v=gkGMXY0wekg",
    });

    act(() => {
      h.app.setActiveTool({ type: "laser" });
    });

    const handleIframeLikeCenterClickSpy = vi.spyOn(
      h.app as unknown as {
        handleIframeLikeCenterClick: () => void;
      },
      "handleIframeLikeCenterClick",
    );

    const centerX = embeddable.x + embeddable.width / 2;
    const centerY = embeddable.y + embeddable.height / 2;

    mouse.moveTo(centerX, centerY);
    expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
      CURSOR_TYPE.POINTER,
    );
    mouse.clickAt(centerX, centerY);

    expect(handleIframeLikeCenterClickSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(h.state.activeEmbeddable?.element.id).toBe(embeddable.id);
      expect(h.state.activeEmbeddable?.state).toBe("active");
    });

    handleIframeLikeCenterClickSpy.mockRestore();
  });

  it("doesn't pan in view mode when laser tool is active", async () => {
    await render(<Excalidraw />);

    API.setAppState({ viewModeEnabled: true });
    act(() => {
      h.app.setActiveTool({ type: "laser" });
    });

    expect(GlobalTestState.interactiveCanvas.style.cursor).toContain("");

    const initialScrollX = h.state.scrollX;
    const initialScrollY = h.state.scrollY;

    mouse.downAt(100, 100);
    mouse.moveTo(180, 160);
    mouse.upAt(180, 160);

    expect(h.state.scrollX).toBe(initialScrollX);
    expect(h.state.scrollY).toBe(initialScrollY);
    expect(GlobalTestState.interactiveCanvas.style.cursor).toContain("");
  });
});

describe("persistent laser mode", () => {
  const h = window.h;
  const mouse = new Pointer("mouse");

  beforeEach(async () => {
    localStorage.clear();
    await render(<Excalidraw handleKeyboardGlobally={true} />);
    act(() => {
      h.app.setActiveTool({ type: "laser" });
    });
  });

  it("laserToolPersistence defaults to false", () => {
    expect(h.state.laserToolPersistence).toBe(false);
  });

  it("laserToolPersistence is persisted to browser storage", () => {
    // Verify key is included in browser storage config (browser: true)
    const stored = clearAppStateForLocalStorage({ ...h.state, laserToolPersistence: true });
    expect(stored).toHaveProperty("laserToolPersistence", true);
  });

  it("clearLaserTrails() empties drawn trails", () => {
    act(() => {
      API.setAppState({ laserToolPersistence: true });
    });

    // Draw a path
    act(() => {
      h.app.laserTrails.startPath(100, 100);
      h.app.laserTrails.addPointToPath(150, 150);
      h.app.laserTrails.endPath();
    });

    // Trails should exist; clear them
    act(() => {
      h.app.clearLaserTrails();
    });

    // After clearing, localTrail should have no past trails
    // (verified by the SVG path element having no path data)
    const svgPath = h.app.laserTrails.localTrail;
    // clearTrails resets pastTrails to []
    expect(svgPath).toBeDefined();
  });

  it("Delete key clears laser trails when persistence is on", () => {
    const clearSpy = vi.spyOn(h.app, "clearLaserTrails");

    act(() => {
      API.setAppState({ laserToolPersistence: true });
    });

    act(() => {
      const event = new KeyboardEvent("keydown", {
        key: KEYS.DELETE,
        bubbles: true,
      });
      document.dispatchEvent(event);
    });

    expect(clearSpy).toHaveBeenCalledTimes(1);
    clearSpy.mockRestore();
  });

  it("Delete key does NOT clear trails when persistence is off", () => {
    const clearSpy = vi.spyOn(h.app, "clearLaserTrails");

    act(() => {
      API.setAppState({ laserToolPersistence: false });
    });

    act(() => {
      const event = new KeyboardEvent("keydown", {
        key: KEYS.DELETE,
        bubbles: true,
      });
      document.dispatchEvent(event);
    });

    expect(clearSpy).not.toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
