import {
  getInlineHyperlinkLineSegments,
  getRenderableText,
  normalizeLink,
  parseInlineHyperlinks,
} from "../src/url";

describe("normalizeLink", () => {
  // NOTE not an extensive XSS test suite, just to check if we're not
  // regressing in sanitization
  it("should sanitize links", () => {
    expect(
      // eslint-disable-next-line no-script-url
      normalizeLink(`javascript://%0aalert(document.domain)`).startsWith(
        // eslint-disable-next-line no-script-url
        `javascript:`,
      ),
    ).toBe(false);
    expect(normalizeLink("ola")).toBe("ola");
    expect(normalizeLink(" ola")).toBe("ola");

    expect(normalizeLink("https://www.excalidraw.com")).toBe(
      "https://www.excalidraw.com",
    );
    expect(normalizeLink("www.excalidraw.com")).toBe("www.excalidraw.com");
    expect(normalizeLink("/ola")).toBe("/ola");
    expect(normalizeLink("http://test")).toBe("http://test");
    expect(normalizeLink("ftp://test")).toBe("ftp://test");
    expect(normalizeLink("file://")).toBe("file://");
    expect(normalizeLink("file://")).toBe("file://");
    expect(normalizeLink("[test](https://test)")).toBe("[test](https://test)");
    expect(normalizeLink("[[test]]")).toBe("[[test]]");
    expect(normalizeLink("<test>")).toBe("<test>");
    expect(normalizeLink("test&")).toBe("test&");
  });
});

describe("inline markdown hyperlinks", () => {
  it("parses valid markdown hyperlinks and leaves plain text untouched", () => {
    expect(parseInlineHyperlinks("See [docs](https://example.com/docs)")).toEqual([
      { text: "See ", link: null },
      { text: "docs", link: "https://example.com/docs" },
    ]);
  });

  it("keeps malformed or unsafe links as plain text", () => {
    expect(parseInlineHyperlinks("[x](javascript:alert(1))")).toEqual([
      { text: "[x](javascript:alert(1))", link: null },
    ]);

    expect(parseInlineHyperlinks("[x](not a url)")).toEqual([
      { text: "[x](not a url)", link: null },
    ]);
  });

  it("produces rendered text without markdown URL syntax", () => {
    expect(getRenderableText("See [docs](https://example.com/docs) now")).toBe(
      "See docs now",
    );
  });

  it("maps rendered lines back to hyperlink segments", () => {
    const source = "A [docs](https://example.com)\nB [ref](https://test.dev)";
    const rendered = getRenderableText(source);

    expect(rendered).toBe("A docs\nB ref");
    expect(getInlineHyperlinkLineSegments(source, rendered)).toEqual([
      [
        { text: "A ", link: null },
        { text: "docs", link: "https://example.com" },
      ],
      [
        { text: "B ", link: null },
        { text: "ref", link: "https://test.dev" },
      ],
    ]);
  });
});

