import { describe, expect, it } from "vitest";

import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  TEXT_ORIENTATION,
  getFontString,
  getLineHeight,
} from "@excalidraw/common";

import { newTextElement } from "../src/newElement";
import {
  getEffectiveTextOrientation,
  wrapTextElement,
} from "../src/textElement";
import { measureVerticalText } from "../src/textMeasurements";
import { wrapTextVertical } from "../src/textWrapping";

import type { ExcalidrawTextElement } from "../src/types";

const font = () =>
  getFontString({ fontFamily: DEFAULT_FONT_FAMILY, fontSize: DEFAULT_FONT_SIZE });
const lineHeight = () => getLineHeight(DEFAULT_FONT_FAMILY);

describe("text orientation", () => {
  it("defaults to horizontal on new text elements", () => {
    const el = newTextElement({
      x: 0,
      y: 0,
      text: "ab",
    });
    expect(el.textOrientation).toBe(TEXT_ORIENTATION.HORIZONTAL);
  });

  it("getEffectiveTextOrientation forces horizontal for container-bound text", () => {
    const el = {
      ...newTextElement({ x: 0, y: 0, text: "x" }),
      textOrientation: TEXT_ORIENTATION.VERTICAL,
      containerId: "c1",
    } as ExcalidrawTextElement;
    expect(getEffectiveTextOrientation(el)).toBe(TEXT_ORIENTATION.HORIZONTAL);
  });

  it("wrapTextVertical stacks hard lines as columns", () => {
    const lh = lineHeight();
    const f = font();
    const wrapped = wrapTextVertical("ab\ncd", f, 1e9, DEFAULT_FONT_SIZE * lh);
    expect(wrapped.split("\n")).toEqual(["ab", "cd"]);
    const m = measureVerticalText(wrapped, f, lh, DEFAULT_FONT_SIZE);
    expect(m.height).toBeGreaterThan(0);
    expect(m.width).toBeGreaterThan(0);
  });

  it("wrapTextElement vertical matches horizontal container skip", () => {
    const el = newTextElement({
      x: 0,
      y: 0,
      text: "hello",
      textOrientation: TEXT_ORIENTATION.VERTICAL,
    });
    const w = wrapTextElement(el, "hi", null);
    expect(w).toBe("hi");
  });
});
