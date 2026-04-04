import { THEME, applyDarkModeFilter } from "@excalidraw/common";

import { describe, expect, it } from "vitest";

import { getResolvedTextPaint } from "../src/textPaintResolve";
import { newTextElement } from "../src/newElement";

describe("getResolvedTextPaint", () => {
  it("uses textFillColor for fill in light theme", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#111111",
    });
    const withFill = { ...el, textFillColor: "#ff0000" as const };
    const paint = getResolvedTextPaint(withFill, THEME.LIGHT);
    expect(paint.fillColor).toBe("#ff0000");
    expect(paint.outlineWidth).toBe(0);
    expect(paint.outlineColor).toBeNull();
  });

  it("applies dark filter to fill and outline in dark theme", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#111111",
    });
    const withPaint = {
      ...el,
      textFillColor: "#ff0000",
      textStrokeColor: "#00ff00",
      textStrokeWidth: 2,
    };
    const paint = getResolvedTextPaint(withPaint, THEME.DARK);
    expect(paint.fillColor).toBe(applyDarkModeFilter("#ff0000"));
    expect(paint.outlineColor).toBe(applyDarkModeFilter("#00ff00"));
    expect(paint.outlineWidth).toBe(2);
  });

  it("treats non-positive or invalid outline width as off", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#111111",
    });
    const a = getResolvedTextPaint(
      { ...el, textStrokeWidth: 0, textStrokeColor: "#0000ff" },
      THEME.LIGHT,
    );
    expect(a.outlineWidth).toBe(0);
    expect(a.outlineColor).toBeNull();

    const b = getResolvedTextPaint(
      { ...el, textStrokeWidth: NaN, textStrokeColor: "#0000ff" },
      THEME.LIGHT,
    );
    expect(b.outlineWidth).toBe(0);
  });

  it("falls back outline source to strokeColor when textStrokeColor missing", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#abcdef",
    });
    const withOutline = { ...el, textStrokeWidth: 1 };
    const paint = getResolvedTextPaint(withOutline, THEME.LIGHT);
    expect(paint.outlineColor).toBe("#abcdef");
  });

  it("does not depend on viewport — only element + theme (zoom/pan safety)", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#222222",
    });
    const styled = {
      ...el,
      textFillColor: "#c92a2a",
      textStrokeColor: "#1864ab",
      textStrokeWidth: 2,
    };
    const a = getResolvedTextPaint(styled, THEME.LIGHT);
    const b = getResolvedTextPaint(styled, THEME.LIGHT);
    expect(b).toEqual(a);
  });

  it("NFR smoke: many resolutions stay fast (no heavy work in resolver)", () => {
    const el = newTextElement({
      text: "a",
      x: 0,
      y: 0,
      strokeColor: "#111111",
    });
    const styled = {
      ...el,
      textFillColor: "#ff0000",
      textStrokeColor: "#00ff00",
      textStrokeWidth: 2,
    };
    const n = 8000;
    const t0 = performance.now();
    for (let i = 0; i < n; i++) {
      getResolvedTextPaint(styled, i % 2 === 0 ? THEME.LIGHT : THEME.DARK);
    }
    expect(performance.now() - t0).toBeLessThan(250);
  });
});
