import { FONT_FAMILY, getFontString } from "@excalidraw/common";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { pointFrom } from "@excalidraw/math";

import {
  getRenderableText,
  getRenderableTextLines,
  getTextHyperlinkAtPoint,
  getTextHyperlinkHref,
  getTextHyperlinkLayout,
} from "../src/textHyperlinks";

describe("textHyperlinks", () => {
  const font = getFontString({
    fontSize: 20,
    fontFamily: FONT_FAMILY.Excalifont,
  });

  it("renders valid markdown links as visible labels", () => {
    const lines = getRenderableTextLines(
      "Open [Docs](https://example.com) now",
      font,
      Infinity,
    );

    expect(lines).toHaveLength(1);
    expect(lines[0].text).toBe("Open Docs now");
    expect(lines[0].segments).toEqual([
      { type: "text", text: "Open " },
      {
        type: "link",
        text: "Docs",
        url: "https://example.com",
        href: "https://example.com/",
      },
      { type: "text", text: " now" },
    ]);
  });

  it("keeps malformed sequences literal", () => {
    expect(getRenderableText("[unclosed", font, Infinity)).toBe("[unclosed");
    expect(getRenderableText("](invalid", font, Infinity)).toBe("](invalid");
  });

  it("treats nested markdown labels as literal text in v1", () => {
    expect(getRenderableText("[a[b]](https://example.com)", font, Infinity)).toBe(
      "[a[b]](https://example.com)",
    );
  });

  it("blocks dangerous schemes from becoming interactive", () => {
    expect(getTextHyperlinkHref("javascript:alert(1)")).toBe(null);

    const [line] = getRenderableTextLines(
      "[x](javascript:alert(1))",
      font,
      Infinity,
    );

    expect(line.text).toBe("x");
    expect(line.segments).toEqual([
      {
        type: "link",
        text: "x",
        url: "javascript:alert(1)",
        href: null,
      },
    ]);
  });

  it("computes hit regions only for allowed links", () => {
    const safeText = API.createElement({
      type: "text",
      x: 20,
      y: 30,
      text: "[Docs](https://example.com)",
    });
    const safeLayout = getTextHyperlinkLayout(safeText);
    const safeSegment = safeLayout.lines[0].segments[0];
    const safeHit = getTextHyperlinkAtPoint(
      safeText,
      new Map([[safeText.id, safeText]]),
      pointFrom(
        safeText.x + safeSegment.x + safeSegment.width / 2,
        safeText.y + safeSegment.top + safeLayout.lineHeightPx / 2,
      ),
    );

    expect(safeHit?.url).toBe("https://example.com/");

    const blockedText = API.createElement({
      type: "text",
      x: 20,
      y: 30,
      text: "[x](javascript:alert(1))",
    });
    const blockedLayout = getTextHyperlinkLayout(blockedText);
    const blockedSegment = blockedLayout.lines[0].segments[0];
    const blockedHit = getTextHyperlinkAtPoint(
      blockedText,
      new Map([[blockedText.id, blockedText]]),
      pointFrom(
        blockedText.x + blockedSegment.x + Math.max(blockedSegment.width, 1) / 2,
        blockedText.y + blockedSegment.top + blockedLayout.lineHeightPx / 2,
      ),
    );

    expect(blockedHit).toBe(null);
  });
});
