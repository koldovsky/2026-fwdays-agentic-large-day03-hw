import React from "react";

import { KEYS } from "@excalidraw/common";

import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Keyboard } from "./helpers/ui";
import { fireEvent, render, waitFor } from "./test-utils";

describe("hand tool H key behavior", () => {
  beforeEach(async () => {
    await render(<Excalidraw handleKeyboardGlobally />);
  });

  it("holding H (key repeat) does not toggle hand tool off while held", () => {
    expect(window.h.state.activeTool.type).toBe("selection");

    // First real keydown — activates hand tool
    fireEvent.keyDown(document, { key: KEYS.H, repeat: false });
    expect(window.h.state.activeTool.type).toBe("hand");

    // Simulated key-repeat events — should not toggle back
    fireEvent.keyDown(document, { key: KEYS.H, repeat: true });
    fireEvent.keyDown(document, { key: KEYS.H, repeat: true });
    fireEvent.keyDown(document, { key: KEYS.H, repeat: true });
    expect(window.h.state.activeTool.type).toBe("hand");
  });

  it("releasing H after hold restores the previous tool", () => {
    expect(window.h.state.activeTool.type).toBe("selection");

    fireEvent.keyDown(document, { key: KEYS.H, repeat: false });
    expect(window.h.state.activeTool.type).toBe("hand");

    // Simulate some key-repeat events during hold
    fireEvent.keyDown(document, { key: KEYS.H, repeat: true });
    fireEvent.keyDown(document, { key: KEYS.H, repeat: true });

    fireEvent.keyUp(document, { key: KEYS.H });
    expect(window.h.state.activeTool.type).toBe("selection");
  });

  it("pressing H when hand tool is already active toggles it off and keyup is a no-op", () => {
    // Start in selection, press H to activate hand (sets isHoldingH = true)
    fireEvent.keyDown(document, { key: KEYS.H, repeat: false });
    expect(window.h.state.activeTool.type).toBe("hand");

    // Release — restores selection (isHoldingH was true)
    fireEvent.keyUp(document, { key: KEYS.H });
    expect(window.h.state.activeTool.type).toBe("selection");

    // Press H again to activate hand
    fireEvent.keyDown(document, { key: KEYS.H, repeat: false });
    expect(window.h.state.activeTool.type).toBe("hand");

    // Press H again while hand is already active — action runs and toggles it off,
    // but isHoldingH is NOT set (because isHandToolActive was true at this keydown)
    fireEvent.keyDown(document, { key: KEYS.H, repeat: false });
    expect(window.h.state.activeTool.type).toBe("selection");

    // keyup is a no-op since isHoldingH was never set for this press
    fireEvent.keyUp(document, { key: KEYS.H });
    expect(window.h.state.activeTool.type).toBe("selection");
  });
});

describe("shortcuts", () => {
  it("Clear canvas shortcut should display confirm dialog", async () => {
    await render(
      <Excalidraw
        initialData={{ elements: [API.createElement({ type: "rectangle" })] }}
        handleKeyboardGlobally
      />,
    );

    expect(window.h.elements.length).toBe(1);

    Keyboard.withModifierKeys({ ctrl: true }, () => {
      Keyboard.keyDown(KEYS.DELETE);
    });
    const confirmDialog = document.querySelector(".confirm-dialog")!;
    expect(confirmDialog).not.toBe(null);

    fireEvent.click(confirmDialog.querySelector('[aria-label="Confirm"]')!);

    await waitFor(() => {
      expect(window.h.elements[0].isDeleted).toBe(true);
    });
  });
});
