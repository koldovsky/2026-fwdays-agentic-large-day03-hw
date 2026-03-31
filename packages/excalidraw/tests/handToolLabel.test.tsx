import React from "react";

import { Excalidraw } from "../index";
import { SHAPES } from "../components/shapes";
import { HandButton } from "../components/HandButton";

import { render } from "./test-utils";
import { render as rtlRender } from "@testing-library/react";

describe("hand tool shortcut label", () => {
  it("should display 'H' keybinding label on the hand tool in desktop toolbar", async () => {
    const { getByToolName } = await render(<Excalidraw />);

    const handToolInput = getByToolName("hand");
    const toolLabel = handToolInput.closest("label")!;
    const keybinding = toolLabel.querySelector(".ToolIcon__keybinding");

    expect(keybinding).not.toBeNull();
    expect(keybinding!.textContent).toBe("H");
  });

  it("should display a keybinding label for every SHAPES entry with a key or numericKey", async () => {
    const { getByToolName } = await render(<Excalidraw />);

    for (const shape of SHAPES) {
      if (!shape.toolbar) {
        continue;
      }

      const toolInput = getByToolName(shape.value);
      const toolLabel = toolInput.closest("label")!;
      const keybinding = toolLabel.querySelector(".ToolIcon__keybinding");

      const hasKey = shape.key !== null;
      const hasNumericKey = shape.numericKey !== null;

      if (hasKey || hasNumericKey) {
        expect(keybinding).not.toBeNull();
        expect(keybinding!.textContent).toBeTruthy();
      }
    }
  });
});

describe("HandButton (mobile)", () => {
  it("should NOT render keybinding label when isMobile is true", () => {
    const { container } = rtlRender(
      <HandButton checked={false} isMobile title="Hand" />,
    );

    const keybinding = container.querySelector(".ToolIcon__keybinding");
    expect(keybinding).toBeNull();
  });

  it("should render 'H' keybinding label when isMobile is false", () => {
    const { container } = rtlRender(
      <HandButton checked={false} isMobile={false} title="Hand" />,
    );

    const keybinding = container.querySelector(".ToolIcon__keybinding");
    expect(keybinding).not.toBeNull();
    expect(keybinding!.textContent).toBe("H");
  });
});
