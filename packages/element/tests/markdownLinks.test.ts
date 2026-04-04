import {
  parseMarkdownLinks,
  getDisplayText,
  getMarkdownAwareTokens,
  getInlineLinkAtPoint,
  setLinkHitBoxes,
} from "../src/markdownLinks";

describe("parseMarkdownLinks", () => {
  it("should parse a single markdown link", () => {
    const segments = parseMarkdownLinks(
      "Visit [Excalidraw](https://excalidraw.com) for more",
    );
    expect(segments).toEqual([
      { type: "text", content: "Visit " },
      {
        type: "link",
        label: "Excalidraw",
        url: "https://excalidraw.com",
        rawLength: "[Excalidraw](https://excalidraw.com)".length,
      },
      { type: "text", content: " for more" },
    ]);
  });

  it("should parse multiple markdown links in one line", () => {
    const segments = parseMarkdownLinks(
      "See [docs](https://docs.example.com) and [repo](https://github.com/example)",
    );
    expect(segments).toEqual([
      { type: "text", content: "See " },
      {
        type: "link",
        label: "docs",
        url: "https://docs.example.com",
        rawLength: "[docs](https://docs.example.com)".length,
      },
      { type: "text", content: " and " },
      {
        type: "link",
        label: "repo",
        url: "https://github.com/example",
        rawLength: "[repo](https://github.com/example)".length,
      },
    ]);
  });

  it("should return plain text when no links present", () => {
    const segments = parseMarkdownLinks("Hello world");
    expect(segments).toEqual([{ type: "text", content: "Hello world" }]);
  });

  it("should handle a link spanning the full line", () => {
    const segments = parseMarkdownLinks(
      "[Click here](https://example.com)",
    );
    expect(segments).toEqual([
      {
        type: "link",
        label: "Click here",
        url: "https://example.com",
        rawLength: "[Click here](https://example.com)".length,
      },
    ]);
  });

  it("should treat nested brackets as plain text", () => {
    const segments = parseMarkdownLinks("Use [[nested]](url)");
    expect(segments.some((s) => s.type === "link")).toBe(false);
  });

  it("should treat malformed links as plain text", () => {
    const segments = parseMarkdownLinks("[label](not a url");
    expect(segments).toEqual([
      { type: "text", content: "[label](not a url" },
    ]);
  });

  it("should sanitize javascript: URLs", () => {
    const segments = parseMarkdownLinks("[click](javascript:alert(1))");
    const link = segments.find((s) => s.type === "link");
    expect(link).toBeDefined();
    if (link && link.type === "link") {
      expect(link.url).toBe("about:blank");
    }
  });

  it("should pass valid HTTPS URLs through unchanged", () => {
    const segments = parseMarkdownLinks("[site](https://example.com)");
    const link = segments.find((s) => s.type === "link");
    expect(link).toBeDefined();
    if (link && link.type === "link") {
      expect(link.url).toBe("https://example.com");
    }
  });

  it("should compute rawLength correctly", () => {
    const raw = "[Go](https://go.dev)";
    const segments = parseMarkdownLinks(raw);
    const link = segments.find((s) => s.type === "link");
    expect(link).toBeDefined();
    if (link && link.type === "link") {
      expect(link.rawLength).toBe(20);
    }
  });

  it("should handle empty string", () => {
    const segments = parseMarkdownLinks("");
    expect(segments).toEqual([{ type: "text", content: "" }]);
  });
});

describe("getDisplayText", () => {
  it("should replace markdown links with labels", () => {
    expect(
      getDisplayText("Visit [Excalidraw](https://excalidraw.com) for more"),
    ).toBe("Visit Excalidraw for more");
  });

  it("should replace multiple links", () => {
    expect(
      getDisplayText("[a](https://a.com) and [b](https://b.com)"),
    ).toBe("a and b");
  });

  it("should return text as-is if no links", () => {
    expect(getDisplayText("Hello world")).toBe("Hello world");
  });
});

describe("getMarkdownAwareTokens", () => {
  const splitOnSpaces = (text: string) => text.split(/(\s+)/).filter(Boolean);

  it("should return plain tokens when no links", () => {
    const tokens = getMarkdownAwareTokens("Hello world", splitOnSpaces);
    expect(tokens).toEqual(["Hello", " ", "world"]);
  });

  it("should treat [label](url) as a single atomic token", () => {
    const tokens = getMarkdownAwareTokens(
      "Click [here](https://example.com) now",
      splitOnSpaces,
    );
    expect(tokens).toEqual([
      "Click",
      " ",
      "[here](https://example.com)",
      " ",
      "now",
    ]);
  });

  it("should handle multiple links", () => {
    const tokens = getMarkdownAwareTokens(
      "[A](u1) and [B](u2)",
      splitOnSpaces,
    );
    expect(tokens).toEqual(["[A](u1)", " ", "and", " ", "[B](u2)"]);
  });

  it("should handle link at start of line", () => {
    const tokens = getMarkdownAwareTokens(
      "[Go](https://go.dev) lang",
      splitOnSpaces,
    );
    expect(tokens).toEqual(["[Go](https://go.dev)", " ", "lang"]);
  });

  it("should handle link at end of line", () => {
    const tokens = getMarkdownAwareTokens(
      "Visit [Go](https://go.dev)",
      splitOnSpaces,
    );
    expect(tokens).toEqual(["Visit", " ", "[Go](https://go.dev)"]);
  });
});

describe("getInlineLinkAtPoint", () => {
  it("should return URL when point is inside a link hit box", () => {
    setLinkHitBoxes("test-elem", [
      { x: 10, y: 0, width: 50, height: 20, url: "https://example.com" },
    ]);
    expect(getInlineLinkAtPoint("test-elem", 30, 10)).toBe(
      "https://example.com",
    );
  });

  it("should return null when point is outside all hit boxes", () => {
    setLinkHitBoxes("test-elem", [
      { x: 10, y: 0, width: 50, height: 20, url: "https://example.com" },
    ]);
    expect(getInlineLinkAtPoint("test-elem", 100, 10)).toBeNull();
  });

  it("should return null for unknown element", () => {
    expect(getInlineLinkAtPoint("unknown-elem", 30, 10)).toBeNull();
  });
});
