import { describe, expect, it } from "vitest";

import {
  parseTextHyperlinkSegments,
  segmentsToDisplayString,
  validateTextHyperlinkUrl,
} from "../src/textHyperlinks";
import { wrapText } from "../src/textWrapping";

import type { FontString } from "../src/types";

describe("validateTextHyperlinkUrl", () => {
  it("accepts http and https", () => {
    expect(validateTextHyperlinkUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
    expect(validateTextHyperlinkUrl("http://example.com")).toBe(
      "http://example.com/",
    );
  });

  it("rejects javascript and other schemes", () => {
    expect(validateTextHyperlinkUrl("javascript:alert(1)")).toBeNull();
    expect(validateTextHyperlinkUrl("data:text/html,hi")).toBeNull();
    expect(validateTextHyperlinkUrl("ftp://x")).toBeNull();
  });

  it("rejects empty and overlong", () => {
    expect(validateTextHyperlinkUrl("")).toBeNull();
    expect(validateTextHyperlinkUrl("   ")).toBeNull();
    expect(validateTextHyperlinkUrl(`https://x.com/${"a".repeat(3000)}`)).toBeNull();
  });
});

describe("parseTextHyperlinkSegments", () => {
  it("parses a valid link", () => {
    const segs = parseTextHyperlinkSegments("[hi](https://a.com)");
    expect(segs).toHaveLength(1);
    expect(segs[0].type).toBe("link");
    if (segs[0].type === "link") {
      expect(segs[0].label).toBe("hi");
      expect(segs[0].source).toBe("[hi](https://a.com)");
      expect(segs[0].url).toMatch(/^https:\/\/a\.com\/?$/);
    }
    expect(segmentsToDisplayString(segs)).toBe("hi");
  });

  it("treats invalid url as plain", () => {
    const segs = parseTextHyperlinkSegments("[x](javascript:1)");
    expect(segs.every((s) => s.type === "plain")).toBe(true);
    expect(segmentsToDisplayString(segs)).toBe("[x](javascript:1)");
  });

  it("treats incomplete markup as plain", () => {
    const segs = parseTextHyperlinkSegments("a [no paren");
    expect(segmentsToDisplayString(segs)).toBe("a [no paren");
    expect(segs.every((s) => s.type === "plain")).toBe(true);
  });

  it("rejects empty label", () => {
    const segs = parseTextHyperlinkSegments("[](https://a.com)");
    expect(segs.every((s) => s.type === "plain")).toBe(true);
  });
});

describe("wrapText with hyperlinks", () => {
  const font = "10px Cascadia, Segoe UI Emoji" as FontString;

  it("wraps using label width not markdown width", () => {
    const wrapped = wrapText(
      "[ab](https://example.com) [cd](https://example.com)",
      font,
      30,
    );
    expect(wrapped).toContain("\n");
  });
});
