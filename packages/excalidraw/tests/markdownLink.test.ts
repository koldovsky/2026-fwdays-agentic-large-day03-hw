import { parseMarkdownLinks } from "../utils/markdownLink";

describe("parseMarkdownLinks", () => {
  describe("returns null for plain text", () => {
    it("plain text without links", () => {
      expect(parseMarkdownLinks("Hello world")).toBe(null);
    });

    it("empty string", () => {
      expect(parseMarkdownLinks("")).toBe(null);
    });

    it("bare URL without markdown syntax", () => {
      expect(parseMarkdownLinks("https://example.com")).toBe(null);
    });

    it("incomplete markdown syntax — missing URL part", () => {
      expect(parseMarkdownLinks("[label]")).toBe(null);
    });

    it("incomplete markdown syntax — missing label part", () => {
      expect(parseMarkdownLinks("(https://example.com)")).toBe(null);
    });
  });

  describe("standalone link (single link = entire text)", () => {
    it("resolves label and extracts URL", () => {
      const result = parseMarkdownLinks(
        "[Excalidraw](https://excalidraw.com)",
      );
      expect(result).toEqual({
        resolvedText: "Excalidraw",
        links: [{ url: "https://excalidraw.com" }],
      });
    });
  });

  describe("inline links within surrounding text", () => {
    it("resolves link within a sentence", () => {
      const result = parseMarkdownLinks(
        "Visit [Excalidraw](https://excalidraw.com) for drawing",
      );
      expect(result).toEqual({
        resolvedText: "Visit Excalidraw for drawing",
        links: [{ url: "https://excalidraw.com" }],
      });
    });
  });

  describe("multiple links in one string", () => {
    it("resolves all labels, collects all URLs", () => {
      const result = parseMarkdownLinks(
        "[A](https://a.com) and [B](https://b.com)",
      );
      expect(result).toEqual({
        resolvedText: "A and B",
        links: [{ url: "https://a.com" }, { url: "https://b.com" }],
      });
    });

    it("first valid URL is links[0]", () => {
      const result = parseMarkdownLinks(
        "[A](https://a.com) and [B](https://b.com)",
      );
      expect(result!.links[0].url).toBe("https://a.com");
    });
  });

  describe("edge cases", () => {
    it("empty label falls back to URL as display text", () => {
      const result = parseMarkdownLinks("[](https://example.com)");
      expect(result).toEqual({
        resolvedText: "https://example.com",
        links: [{ url: "https://example.com" }],
      });
    });

    it("empty URL is a no-op — raw markdown preserved", () => {
      expect(parseMarkdownLinks("[label]()")).toBe(null);
    });

    it("whitespace-only URL is a no-op", () => {
      expect(parseMarkdownLinks("[label](   )")).toBe(null);
    });

    it("relative URL", () => {
      const result = parseMarkdownLinks("[page](/about)");
      expect(result).toEqual({
        resolvedText: "page",
        links: [{ url: "/about" }],
      });
    });

    it("URL with query string", () => {
      const result = parseMarkdownLinks("[search](https://g.co/search?q=foo)");
      expect(result).toEqual({
        resolvedText: "search",
        links: [{ url: "https://g.co/search?q=foo" }],
      });
    });

    it("URL with hash fragment", () => {
      const result = parseMarkdownLinks("[section](https://example.com#top)");
      expect(result).toEqual({
        resolvedText: "section",
        links: [{ url: "https://example.com#top" }],
      });
    });

    it("balanced parentheses in URL (Wikipedia-style)", () => {
      const result = parseMarkdownLinks(
        "[Foo](https://en.wikipedia.org/wiki/Foo_(bar))",
      );
      expect(result).toEqual({
        resolvedText: "Foo",
        links: [{ url: "https://en.wikipedia.org/wiki/Foo_(bar)" }],
      });
    });
  });

  describe("security — URL rejection", () => {
    it("javascript: URL is rejected, raw markdown preserved", () => {
      expect(
        parseMarkdownLinks("[click](javascript:alert(1))"),
      ).toBe(null);
    });

    it("data: URL is rejected, raw markdown preserved", () => {
      expect(
        parseMarkdownLinks("[click](data:text/html,<h1>hi</h1>)"),
      ).toBe(null);
    });

    it("javascript: with mixed case is rejected", () => {
      expect(
        parseMarkdownLinks("[click](JaVaScRiPt:alert(1))"),
      ).toBe(null);
    });
  });

  describe("mixed safe and unsafe links", () => {
    it("resolves safe links, preserves unsafe as raw markdown", () => {
      const result = parseMarkdownLinks(
        "[safe](https://safe.com) and [bad](javascript:alert(1))",
      );
      expect(result).toEqual({
        resolvedText: "safe and [bad](javascript:alert(1))",
        links: [{ url: "https://safe.com" }],
      });
    });

    it("all unsafe = returns null", () => {
      expect(
        parseMarkdownLinks(
          "[a](javascript:void(0)) [b](data:text/html,x)",
        ),
      ).toBe(null);
    });
  });
});
