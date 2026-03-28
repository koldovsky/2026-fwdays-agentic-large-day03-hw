import { vi } from "vitest";

import { CURSOR_TYPE } from "@excalidraw/common";
import { getTextHyperlinkLayout } from "@excalidraw/element";

import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { Pointer } from "./helpers/ui";
import { GlobalTestState, render } from "./test-utils";

import type { ExcalidrawProps } from "../types";
import type { ExcalidrawTextElement } from "@excalidraw/element/types";

describe("text hyperlink interactions", () => {
  const mouse = new Pointer("mouse");

  const getLinkCenter = (element: ExcalidrawTextElement) => {
    const layout = getTextHyperlinkLayout(element);
    const segment = layout.lines
      .flatMap((line) => line.segments)
      .find((candidate) => candidate.type === "link");

    if (!segment) {
      throw new Error("Expected a markdown hyperlink segment");
    }

    return {
      x: element.x + segment.x + Math.max(segment.width, 1) / 2,
      y: element.y + segment.top + layout.lineHeightPx / 2,
    };
  };

  it("opens allowed markdown links on click", async () => {
    const onLinkOpenSpy = vi.fn();
    const onLinkOpen: NonNullable<ExcalidrawProps["onLinkOpen"]> = (
      ...args
    ) => {
      onLinkOpenSpy(...args);
      args[1].preventDefault();
    };

    await render(<Excalidraw onLinkOpen={onLinkOpen} />);

    const text = API.createElement({
      type: "text",
      x: 40,
      y: 40,
      text: "[Docs](https://example.com)",
    });
    API.setElements([text]);

    const currentText = API.getElement(text) as ExcalidrawTextElement;
    const { x, y } = getLinkCenter(currentText);

    mouse.moveTo(x, y);
    expect(GlobalTestState.interactiveCanvas.style.cursor).toBe(
      CURSOR_TYPE.POINTER,
    );

    mouse.clickAt(x, y);

    expect(onLinkOpenSpy).toHaveBeenCalledTimes(1);
    expect(onLinkOpenSpy.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        id: currentText.id,
        link: "https://example.com/",
      }),
    );
  });

  it("does not activate blocked markdown links", async () => {
    const onLinkOpenSpy = vi.fn();
    const onLinkOpen: NonNullable<ExcalidrawProps["onLinkOpen"]> = (
      ...args
    ) => {
      onLinkOpenSpy(...args);
      args[1].preventDefault();
    };

    await render(<Excalidraw onLinkOpen={onLinkOpen} />);

    const text = API.createElement({
      type: "text",
      x: 40,
      y: 40,
      text: "[x](javascript:alert(1))",
    });
    API.setElements([text]);

    const currentText = API.getElement(text) as ExcalidrawTextElement;
    const { x, y } = getLinkCenter(currentText);

    mouse.moveTo(x, y);
    expect(GlobalTestState.interactiveCanvas.style.cursor).not.toBe(
      CURSOR_TYPE.POINTER,
    );

    mouse.clickAt(x, y);

    expect(onLinkOpenSpy).not.toHaveBeenCalled();
  });
});
