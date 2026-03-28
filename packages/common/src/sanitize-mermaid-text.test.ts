import {
  sanitizeMermaidText,
  sanitizeMermaidElementText,
} from "./sanitize-mermaid-text";

describe("sanitizeMermaidText", () => {
  it("converts <br> to newline", () => {
    expect(sanitizeMermaidText("User Registration<br>Process")).toBe(
      "User Registration\nProcess",
    );
  });

  it("converts <br/> to newline", () => {
    expect(sanitizeMermaidText("User Registration<br/>Process")).toBe(
      "User Registration\nProcess",
    );
  });

  it("converts <br /> to newline", () => {
    expect(sanitizeMermaidText("User Registration<br />Process")).toBe(
      "User Registration\nProcess",
    );
  });

  it("handles case-insensitive variants", () => {
    expect(sanitizeMermaidText("A<BR>B")).toBe("A\nB");
    expect(sanitizeMermaidText("A<Br/>B")).toBe("A\nB");
    expect(sanitizeMermaidText("A<BR />B")).toBe("A\nB");
  });

  it("converts multiple <br> tags in the same string", () => {
    expect(sanitizeMermaidText("Line1<br>Line2<br>Line3")).toBe(
      "Line1\nLine2\nLine3",
    );
  });

  it("returns text unchanged when no <br> tags present", () => {
    expect(sanitizeMermaidText("No breaks here")).toBe("No breaks here");
  });

  it("returns empty string unchanged", () => {
    expect(sanitizeMermaidText("")).toBe("");
  });

  it("handles <br> with extra whitespace before slash", () => {
    expect(sanitizeMermaidText("A<br   />B")).toBe("A\nB");
  });

  it("does not strip other HTML tags", () => {
    expect(sanitizeMermaidText("A<b>bold</b>B")).toBe("A<b>bold</b>B");
  });

  it("handles mixed <br> tags and other HTML tags", () => {
    expect(sanitizeMermaidText("Setup<br>Config<b>bold</b>Value")).toBe(
      "Setup\nConfig<b>bold</b>Value",
    );
  });
});

describe("sanitizeMermaidElementText", () => {
  it("sanitizes label.text on container elements", () => {
    const elements = [
      { type: "rectangle", label: { text: "A<br>B" } },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0].label.text).toBe("A\nB");
  });

  it("sanitizes label.text on arrow elements", () => {
    const elements = [
      { type: "arrow", label: { text: "Edge<br/>Label" } },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0].label.text).toBe("Edge\nLabel");
  });

  it("sanitizes start.text on arrow elements", () => {
    const elements = [
      { type: "arrow", start: { text: "Start<br>Text" } },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0].start.text).toBe("Start\nText");
  });

  it("sanitizes end.text on arrow elements", () => {
    const elements = [
      { type: "arrow", end: { text: "End<BR />Text" } },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0].end.text).toBe("End\nText");
  });

  it("sanitizes text on top-level text elements", () => {
    const elements = [
      { type: "text", text: "Note<br>Content" },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0].text).toBe("Note\nContent");
  });

  it("skips elements without text properties", () => {
    const elements = [
      { type: "rectangle", x: 0, y: 0 },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0]).toEqual({ type: "rectangle", x: 0, y: 0 });
  });

  it("handles elements with multiple text properties", () => {
    const elements = [
      {
        type: "arrow",
        label: { text: "Label<br>Text" },
        start: { text: "S<br/>T" },
        end: { text: "E<BR>T" },
      },
    ] as Record<string, any>[];
    sanitizeMermaidElementText(elements);
    expect(elements[0].label.text).toBe("Label\nText");
    expect(elements[0].start.text).toBe("S\nT");
    expect(elements[0].end.text).toBe("E\nT");
  });

  it("handles empty elements array", () => {
    const elements: Record<string, any>[] = [];
    sanitizeMermaidElementText(elements);
    expect(elements).toEqual([]);
  });
});
