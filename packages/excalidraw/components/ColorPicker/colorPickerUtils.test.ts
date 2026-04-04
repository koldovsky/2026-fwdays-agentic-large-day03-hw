import { DEFAULT_ELEMENT_STROKE_COLOR_PALETTE } from "@excalidraw/common";

import { newElementWith, newTextElement } from "@excalidraw/element";

import { getMostUsedCustomColors } from "./colorPickerUtils";

describe("getMostUsedCustomColors", () => {
  it("uses textStrokeColor for standaloneTextOutlineStroke, not strokeColor", () => {
    let text = newTextElement({
      x: 0,
      y: 0,
      text: "x",
      strokeColor: "#c0ff33",
    });
    text = newElementWith(text, {
      textFillColor: "#c0ff33",
      textStrokeColor: "#b00b1e",
      textStrokeWidth: 2,
      containerId: null,
    });

    const palette = DEFAULT_ELEMENT_STROKE_COLOR_PALETTE;
    const result = getMostUsedCustomColors(
      [text],
      "standaloneTextOutlineStroke",
      palette,
    );

    expect(result).toContain("#b00b1e");
    expect(result).not.toContain("#c0ff33");
  });

  it("ignores text elements without an active outline for standaloneTextOutlineStroke", () => {
    let text = newTextElement({
      x: 0,
      y: 0,
      text: "x",
      strokeColor: "#c0ff33",
    });
    text = newElementWith(text, {
      textStrokeColor: "#b00b1e",
      textStrokeWidth: 0,
      containerId: null,
    });

    const result = getMostUsedCustomColors(
      [text],
      "standaloneTextOutlineStroke",
      DEFAULT_ELEMENT_STROKE_COLOR_PALETTE,
    );

    expect(result).toEqual([]);
  });
});
