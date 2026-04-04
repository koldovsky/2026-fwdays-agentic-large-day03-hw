import { DEFAULT_ELEMENT_PROPS } from "@excalidraw/common";

import { describe, expect, it } from "vitest";

import { mutateElement } from "../src/mutateElement";
import { newElement, newTextElement } from "../src/newElement";

describe("text paint schema and normalization", () => {
  it("newTextElement sets textFillColor synced to strokeColor, outline off", () => {
    const el = newTextElement({ text: "hi", x: 0, y: 0 });
    expect(el.textStrokeWidth).toBe(0);
    expect(el.textFillColor).toBe(el.strokeColor);
    expect(el.textStrokeColor).toBe(el.strokeColor);
    expect(el.strokeColor).toBe(DEFAULT_ELEMENT_PROPS.strokeColor);
  });

  it("newTextElement respects custom strokeColor for fill bridge", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#abcabc",
    });
    expect(el.textFillColor).toBe("#abcabc");
    expect(el.strokeColor).toBe("#abcabc");
  });

  it("mutateElement syncs textFillColor to strokeColor", () => {
    const el = newTextElement({ text: "a", x: 0, y: 0 });
    const prevVersion = el.version;
    mutateElement(el, new Map(), { textFillColor: "#ff0000" });
    expect(el.strokeColor).toBe("#ff0000");
    expect(el.textFillColor).toBe("#ff0000");
    expect(el.version).toBeGreaterThan(prevVersion);
  });

  it("mutateElement syncs strokeColor to textFillColor (legacy path)", () => {
    const el = newTextElement({ text: "a", x: 0, y: 0 });
    mutateElement(el, new Map(), { strokeColor: "#00ff00" });
    expect(el.textFillColor).toBe("#00ff00");
    expect(el.strokeColor).toBe("#00ff00");
  });

  it("mutateElement coerces invalid textStrokeWidth to 0", () => {
    const el = newTextElement({ text: "a", x: 0, y: 0 });
    mutateElement(el, new Map(), { textStrokeWidth: -3 });
    expect(el.textStrokeWidth).toBe(0);
  });

  it("mutateElement coerces NaN textStrokeWidth to 0", () => {
    const el = newTextElement({ text: "a", x: 0, y: 0 });
    mutateElement(el, new Map(), { textStrokeWidth: Number.NaN });
    expect(el.textStrokeWidth).toBe(0);
  });

  it("mutateElement adds default textStrokeColor when outline width is positive", () => {
    const el = newTextElement({ text: "a", x: 0, y: 0 });
    mutateElement(el, new Map(), { textStrokeWidth: 2 });
    expect(el.textStrokeWidth).toBe(2);
    expect(el.textStrokeColor).toBe(DEFAULT_ELEMENT_PROPS.strokeColor);
  });

  it("does not run text paint merge for non-text elements", () => {
    const rect = newElement({
      type: "rectangle",
      x: 0,
      y: 0,
      strokeColor: "#111111",
    });
    mutateElement(rect, new Map(), { strokeColor: "#222222" });
    expect(rect.strokeColor).toBe("#222222");
    expect((rect as { textFillColor?: string }).textFillColor).toBeUndefined();
  });
});
