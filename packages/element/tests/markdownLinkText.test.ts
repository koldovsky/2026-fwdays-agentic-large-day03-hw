import { describe, expect, it } from "vitest";

import {
  isSafeLinkHref,
  parseMarkdownLineSegments,
  textHasRenderableMarkdownLinks,
} from "../src/markdownLinkText";

describe("parseMarkdownLineSegments", () => {
  it("parses a single http link", () => {
    const segs = parseMarkdownLineSegments(
      "See [Docs](https://docs.example.com)",
    );
    expect(segs).toEqual([
      { type: "text", content: "See " },
      { type: "link", label: "Docs", url: "https://docs.example.com" },
    ]);
  });

  it("leaves malicious javascript as literal text", () => {
    // eslint-disable-next-line no-script-url -- intentional malicious sample for parser
    const malicious = "[x](javascript:alert(1))";
    const segs = parseMarkdownLineSegments(malicious);
    expect(segs).toEqual([{ type: "text", content: malicious }]);
  });

  it("handles multiple links on one line", () => {
    const segs = parseMarkdownLineSegments(
      "[A](https://a.com) and [B](https://b.com)",
    );
    expect(segs.length).toBe(3);
    expect(segs[0]).toMatchObject({ type: "link", label: "A" });
    expect(segs[1]).toMatchObject({ type: "text", content: " and " });
    expect(segs[2]).toMatchObject({ type: "link", label: "B" });
  });
});

describe("isSafeLinkHref", () => {
  it("rejects javascript", () => {
    // eslint-disable-next-line no-script-url -- validating rejection of script URLs
    expect(isSafeLinkHref("javascript:alert(1)")).toBe(false);
  });

  it("accepts https", () => {
    expect(isSafeLinkHref("https://example.com")).toBe(true);
  });
});

describe("textHasRenderableMarkdownLinks", () => {
  it("returns false for empty", () => {
    expect(textHasRenderableMarkdownLinks("")).toBe(false);
  });

  it("returns true when a line has a valid link", () => {
    expect(textHasRenderableMarkdownLinks("Hello [x](https://x.com)")).toBe(
      true,
    );
  });
});
