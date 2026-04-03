import { describe, it, expect } from "vitest";

import { parseMarkdownLinks, isAllowedUrl } from "../src/markdownLinks";

describe("isAllowedUrl", () => {
  it("allows http URLs", () => {
    expect(isAllowedUrl("http://example.com")).toBe(true);
  });

  it("allows https URLs", () => {
    expect(isAllowedUrl("https://example.com/path?q=1")).toBe(true);
  });

  it("rejects javascript: scheme", () => {
    expect(isAllowedUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects ftp: scheme", () => {
    expect(isAllowedUrl("ftp://example.com")).toBe(false);
  });

  it("rejects data: scheme", () => {
    expect(isAllowedUrl("data:text/html,<h1>hi</h1>")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isAllowedUrl("")).toBe(false);
  });

  it("rejects plain text that is not a URL", () => {
    expect(isAllowedUrl("not a url")).toBe(false);
  });
});

describe("parseMarkdownLinks", () => {
  it("returns single text segment for plain text with no links", () => {
    const result = parseMarkdownLinks("hello world");
    expect(result).toEqual([
      { type: "text", content: "hello world", rawLength: 11 },
    ]);
  });

  it("parses a single markdown link with no surrounding text", () => {
    const result = parseMarkdownLinks("[docs](https://example.com)");
    expect(result).toEqual([
      {
        type: "link",
        content: "docs",
        url: "https://example.com",
        rawLength: 27,
      },
    ]);
  });

  it("parses a link with text before it", () => {
    const result = parseMarkdownLinks("visit [docs](https://example.com)");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ type: "text", content: "visit ", rawLength: 6 });
    expect(result[1]).toMatchObject({ type: "link", content: "docs", url: "https://example.com" });
  });

  it("parses a link with text after it", () => {
    const result = parseMarkdownLinks("[docs](https://example.com) now");
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ type: "link", content: "docs" });
    expect(result[1]).toEqual({ type: "text", content: " now", rawLength: 4 });
  });

  it("parses multiple links in one line", () => {
    const result = parseMarkdownLinks("[a](https://a.com) and [b](https://b.com)");
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({ type: "link", content: "a", url: "https://a.com" });
    expect(result[1]).toEqual({ type: "text", content: " and ", rawLength: 5 });
    expect(result[2]).toMatchObject({ type: "link", content: "b", url: "https://b.com" });
  });

  it("treats link with disallowed URL scheme as plain text segments", () => {
    // Note: the regex [^)]* stops at the first ')' inside the URL, so
    // "javascript:alert(1)" is parsed as url="javascript:alert(1" with a
    // trailing ")" left as a separate text segment. The important invariant
    // is that no segment has type "link" for a non-http(s) URL.
    const result = parseMarkdownLinks("[evil](javascript:alert(1))");
    expect(result.every((s) => s.type === "text")).toBe(true);
  });

  it("rawLength of all segments sums to original line length", () => {
    const line = "see [foo](https://foo.com) and [bar](https://bar.org) here";
    const result = parseMarkdownLinks(line);
    const total = result.reduce((sum, s) => sum + s.rawLength, 0);
    expect(total).toBe(line.length);
  });

  it("handles empty string", () => {
    const result = parseMarkdownLinks("");
    expect(result).toEqual([{ type: "text", content: "", rawLength: 0 }]);
  });

  it("handles link with empty label", () => {
    const result = parseMarkdownLinks("[](https://example.com)");
    expect(result[0]).toMatchObject({ type: "link", content: "", url: "https://example.com" });
  });

  it("does not treat incomplete syntax as a link", () => {
    const result = parseMarkdownLinks("[no closing paren(https://x.com");
    expect(result).toEqual([
      { type: "text", content: "[no closing paren(https://x.com", rawLength: 31 },
    ]);
  });
});
