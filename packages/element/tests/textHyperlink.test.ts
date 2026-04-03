import { pointFrom } from "@excalidraw/math";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";

import {
  getTextHyperlinkHitAtPoint,
  parseTextHyperlinkLine,
  sanitizeTextHyperlink,
} from "../src/textHyperlink";

describe("text hyperlinks", () => {
  it("parses markdown hyperlinks and renders labels", () => {
    const parsed = parseTextHyperlinkLine("See [docs](https://example.com/docs)");

    expect(parsed.hasHyperlinks).toBe(true);
    expect(parsed.renderedText).toBe("See docs");
    expect(parsed.segments).toEqual([
      { text: "See ", url: null },
      { text: "docs", url: "https://example.com/docs" },
    ]);
  });

  it("keeps malformed markdown as plain text", () => {
    const parsed = parseTextHyperlinkLine("See [docs](https://example.com");

    expect(parsed.hasHyperlinks).toBe(false);
    expect(parsed.segments).toEqual([
      { text: "See [docs](https://example.com", url: null },
    ]);
  });

  it("allows safe protocols and blocks unsafe protocols", () => {
    expect(sanitizeTextHyperlink("https://excalidraw.com")).toBe(
      "https://excalidraw.com",
    );
    expect(sanitizeTextHyperlink("javascript:alert(1)")).toBeNull();
  });

  it("detects hyperlink hit on text element", () => {
    const textElement = API.createElement({
      type: "text",
      x: 100,
      y: 200,
      text: "See [docs](https://example.com)",
      width: 200,
      height: 24,
      angle: 0,
      textAlign: "left",
    });

    const hit = getTextHyperlinkHitAtPoint(textElement, pointFrom(150, 210));
    expect(hit).toEqual({
      label: "docs",
      url: "https://example.com",
    });

    const miss = getTextHyperlinkHitAtPoint(textElement, pointFrom(110, 210));
    expect(miss).toBeNull();
  });
});
