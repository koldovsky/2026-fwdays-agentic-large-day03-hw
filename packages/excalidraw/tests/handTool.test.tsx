import React from "react";

import { reseed } from "@excalidraw/common";

import { actionToggleHandTool } from "../actions/actionCanvas";
import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import {
  act,
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  unmountComponent,
} from "./test-utils";

unmountComponent();

const { h } = window;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const hKeyDown = (extra: Partial<KeyboardEventInit> = {}) =>
  fireEvent.keyDown(document, {
    key: "h",
    code: "KeyH",
    repeat: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    ...extra,
  });

const hKeyUp = () =>
  act(() => {
    const payload = {
      key: "h",
      code: "KeyH",
    };
    fireEvent.keyUp(document, payload);
    fireEvent.keyUp(window, payload);
  });

// ---------------------------------------------------------------------------

describe("H key — hold-to-activate hand tool", () => {
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

  // -------------------------------------------------------------------------
  // First press activates hand tool
  // -------------------------------------------------------------------------

  describe("first H keydown activates hand tool", () => {
    it("switches from selection tool to hand tool on first H keydown", () => {
      expect(h.state.activeTool.type).toBe("selection");

      hKeyDown();

      expect(h.state.activeTool.type).toBe("hand");
    });

    it("does not activate hand tool when H is pressed with Alt modifier", () => {
      expect(h.state.activeTool.type).toBe("selection");

      hKeyDown({ altKey: true });

      expect(h.state.activeTool.type).toBe("selection");
    });

    it("does not activate hand tool when H is pressed with Ctrl modifier", () => {
      expect(h.state.activeTool.type).toBe("selection");

      hKeyDown({ ctrlKey: true });

      expect(h.state.activeTool.type).toBe("selection");
    });
  });

  // -------------------------------------------------------------------------
  // Repeated keydown events do not flicker
  // -------------------------------------------------------------------------

  describe("event.repeat guard — no flickering", () => {
    it("repeated H keydown events do not toggle the tool back off", () => {
      expect(h.state.activeTool.type).toBe("selection");

      hKeyDown();
      expect(h.state.activeTool.type).toBe("hand");

      // Simulate browser key-repeat events
      hKeyDown({ repeat: true });
      expect(h.state.activeTool.type).toBe("hand");

      hKeyDown({ repeat: true });
      expect(h.state.activeTool.type).toBe("hand");

      hKeyDown({ repeat: true });
      expect(h.state.activeTool.type).toBe("hand");
    });
  });

  // -------------------------------------------------------------------------
  // H keyup restores the previous tool
  // -------------------------------------------------------------------------

  describe("H keyup restores previous tool", () => {
    it("restores selection tool on H keyup after hold", () => {
      expect(h.state.activeTool.type).toBe("selection");

      hKeyDown();
      expect(h.state.activeTool.type).toBe("hand");

      hKeyUp();
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("restores non-selection tool (rectangle) on H keyup", () => {
      act(() => h.app.setActiveTool({ type: "rectangle" }));
      expect(h.state.activeTool.type).toBe("rectangle");

      hKeyDown();
      expect(h.state.activeTool.type).toBe("hand");

      hKeyUp();
      expect(h.state.activeTool.type).toBe("rectangle");
    });
  });

  // -------------------------------------------------------------------------
  // Toolbar button retains toggle behavior
  // -------------------------------------------------------------------------

  describe("toolbar hand tool button is unaffected", () => {
    it("action toggles to hand tool", () => {
      expect(h.state.activeTool.type).toBe("selection");

      API.executeAction(actionToggleHandTool);

      expect(h.state.activeTool.type).toBe("hand");
    });

    it("action executed twice returns to previous tool", () => {
      expect(h.state.activeTool.type).toBe("selection");

      API.executeAction(actionToggleHandTool);
      expect(h.state.activeTool.type).toBe("hand");

      API.executeAction(actionToggleHandTool);
      expect(h.state.activeTool.type).toBe("selection");
    });

    it("H keyup does not restore tool when hand was activated via action (not keyboard hold)", () => {
      expect(h.state.activeTool.type).toBe("selection");

      // Activate via action (not keyboard hold)
      API.executeAction(actionToggleHandTool);
      expect(h.state.activeTool.type).toBe("hand");

      // H keyup without a prior H keydown hold — should be a no-op
      hKeyUp();
      expect(h.state.activeTool.type).toBe("hand");
    });
  });
});
