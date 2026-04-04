import { THEME } from "@excalidraw/common";

import { getResolvedTextPaint } from "@excalidraw/element";

import type { ExcalidrawTextElement } from "@excalidraw/element/types";

import { getDefaultAppState } from "../appState";
import * as restore from "../data/restore";
import { exportToSvg } from "../scene/export";

import { API } from "./helpers/api";

/** SVG `<text>` for standalone text uses the same resolver as the canvas (FR18). */
async function expectFirstSvgTextMatchesResolver(
  textEl: ExcalidrawTextElement,
  theme: typeof THEME.LIGHT | typeof THEME.DARK,
  exportWithDarkMode: boolean,
) {
  const paint = getResolvedTextPaint(textEl, theme);
  const svg = await exportToSvg(
    [textEl],
    {
      ...getDefaultAppState(),
      exportBackground: false,
      exportWithDarkMode,
    },
    {},
  );
  const doc = new DOMParser().parseFromString(svg.outerHTML, "image/svg+xml");
  const node = doc.querySelector("text")!;
  expect(node.getAttribute("fill")).toBe(paint.fillColor);
  if (paint.outlineWidth > 0 && paint.outlineColor) {
    expect(node.getAttribute("stroke")).toBe(paint.outlineColor);
    expect(node.getAttribute("stroke-width")).toBe(`${paint.outlineWidth}`);
    expect(node.getAttribute("paint-order")).toBe("stroke fill");
  } else {
    expect(node.getAttribute("stroke")).toBeNull();
    expect(node.getAttribute("paint-order")).toBeNull();
  }
}

describe("text paint cross-surface verification (resolver ↔ SVG export)", () => {
  it("fill + outline (new fields)", async () => {
    const base = API.createElement({
      type: "text",
      text: "Hi",
      width: 32,
      height: 20,
    });
    const textEl = {
      ...base,
      textFillColor: "#fab005",
      textStrokeColor: "#1864ab",
      textStrokeWidth: 2,
    } as ExcalidrawTextElement;
    await expectFirstSvgTextMatchesResolver(textEl, THEME.LIGHT, false);
  });

  it("fill-only (outline off)", async () => {
    const base = API.createElement({
      type: "text",
      text: "x",
      width: 16,
      height: 16,
    });
    const textEl = {
      ...base,
      textFillColor: "#2f9e44",
      textStrokeWidth: 0,
    } as ExcalidrawTextElement;
    await expectFirstSvgTextMatchesResolver(textEl, THEME.LIGHT, false);
  });

  it("dark export theme", async () => {
    const base = API.createElement({
      type: "text",
      text: "D",
      width: 16,
      height: 16,
    });
    const textEl = {
      ...base,
      textFillColor: "#e03131",
      textStrokeColor: "#1971c2",
      textStrokeWidth: 1,
    } as ExcalidrawTextElement;
    await expectFirstSvgTextMatchesResolver(textEl, THEME.DARK, true);
  });

  it("legacy-mapped text after restore (no textFillColor in JSON)", async () => {
    const created = API.createElement({
      type: "text",
      text: "old",
      width: 40,
      height: 22,
      strokeColor: "#ae3ec9",
    });
    const {
      textFillColor: _a,
      textStrokeColor: _b,
      textStrokeWidth: _c,
      ...legacyShape
    } = created as ExcalidrawTextElement;
    const [restored] = restore.restoreElements(
      [legacyShape as ExcalidrawTextElement],
      null,
    );
    const textEl = restored as ExcalidrawTextElement;
    expect(textEl.textFillColor).toBeUndefined();
    await expectFirstSvgTextMatchesResolver(textEl, THEME.LIGHT, false);
  });
});
