import { describe, expect, it } from "vitest";

import { parseMarkdownLink } from "../utils/markdownLink";

describe("parseMarkdownLink", () => {
  it("parses a standard markdown link", () => {
    const result = parseMarkdownLink("[Excalidraw](https://excalidraw.com)");
    expect(result).toEqual({
      label: "Excalidraw",
      url: "https://excalidraw.com",
    });
  });

  it("parses a link with surrounding whitespace", () => {
    const result = parseMarkdownLink(
      "  [Open docs](https://docs.example.com)  ",
    );
    expect(result).toEqual({
      label: "Open docs",
      url: "https://docs.example.com",
    });
  });

  it("uses the raw URL as label when label is empty", () => {
    const result = parseMarkdownLink("[](https://example.com)");
    expect(result).toEqual({
      label: "https://example.com",
      url: "https://example.com",
    });
  });

  it("parses a link with a relative URL", () => {
    const result = parseMarkdownLink("[Home](/home)");
    expect(result).not.toBeNull();
    expect(result!.label).toBe("Home");
    expect(result!.url).toBe("/home");
  });

  it("parses a link with query parameters", () => {
    const result = parseMarkdownLink(
      "[Search](https://example.com/search?q=test&lang=en)",
    );
    expect(result).not.toBeNull();
    expect(result!.label).toBe("Search");
    expect(result!.url).toBe("https://example.com/search?q=test&lang=en");
  });

  it("parses a link with a fragment", () => {
    const result = parseMarkdownLink(
      "[Section](https://example.com/page#section)",
    );
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://example.com/page#section");
  });

  it("returns null for partial inline link", () => {
    expect(
      parseMarkdownLink("See [here](https://example.com) for details"),
    ).toBeNull();
  });

  it("returns null for plain text", () => {
    expect(parseMarkdownLink("Hello world")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(parseMarkdownLink("")).toBeNull();
  });

  it("returns null for a bare URL", () => {
    expect(parseMarkdownLink("https://example.com")).toBeNull();
  });

  it("returns null when the URL part is empty", () => {
    expect(parseMarkdownLink("[label]()")).toBeNull();
  });

  it("returns null for two markdown links in one string", () => {
    expect(
      parseMarkdownLink("[A](https://a.com)[B](https://b.com)"),
    ).toBeNull();
  });

  it("returns null for a javascript: URL", () => {
    expect(parseMarkdownLink("[click me](javascript:alert(1))")).toBeNull();
  });

  it("returns null for a data: URL", () => {
    expect(parseMarkdownLink("[img](data:text/html, XSS)")).toBeNull();
  });

  describe("obfuscated XSS vectors", () => {
    it("rejects mixed-case jAvAsCrIpT: scheme", () => {
      expect(
        parseMarkdownLink("[xss](JaVaScRiPt:alert(document.cookie))"),
      ).toBeNull();
    });

    it("rejects javascript: with leading control characters", () => {
      expect(
        parseMarkdownLink("[xss](\x01\x02javascript:alert(1))"),
      ).toBeNull();
    });

    it("rejects javascript: with embedded tab", () => {
      expect(
        parseMarkdownLink("[xss](java\tscript:alert(1))"),
      ).toBeNull();
    });

    it("rejects javascript: with embedded newline", () => {
      expect(
        parseMarkdownLink("[xss](java\nscript:alert(1))"),
      ).toBeNull();
    });

    it("rejects javascript: URL-encoded (&#106;)", () => {
      expect(
        parseMarkdownLink("[xss](&#106;avascript:alert(1))"),
      ).toBeNull();
    });

    it("rejects javascript: with hex entity (&#x6A;)", () => {
      expect(
        parseMarkdownLink("[xss](&#x6A;avascript:alert(1))"),
      ).toBeNull();
    });

    it("rejects vbscript: scheme", () => {
      expect(
        parseMarkdownLink("[xss](vbscript:MsgBox('XSS'))"),
      ).toBeNull();
    });

    it("rejects data: with base64 payload", () => {
      expect(
        parseMarkdownLink(
          "[xss](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)",
        ),
      ).toBeNull();
    });

    it("rejects data: with mixed case", () => {
      expect(
        parseMarkdownLink("[xss](DaTa:text/html,<script>alert(1)</script>)"),
      ).toBeNull();
    });
  });
});
