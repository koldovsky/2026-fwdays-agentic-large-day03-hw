import { isMaybeMermaidDefinition, normalizeMermaidBrTags } from "./mermaid";

describe("normalizeMermaidBrTags", () => {
  it("replaces <br> with newline in Text element text field", () => {
    const elements = [{ type: "text" as const, text: "Line1<br>Line2", x: 0, y: 0, fontSize: 16 }];
    const result = normalizeMermaidBrTags(elements);
    expect(result[0].text).toBe("Line1\nLine2");
  });

  it("replaces <br/> and <br /> variants", () => {
    const elements = [
      { type: "text" as const, text: "A<br/>B", x: 0, y: 0, fontSize: 16 },
      { type: "text" as const, text: "C<br />D", x: 0, y: 0, fontSize: 16 },
    ];
    const result = normalizeMermaidBrTags(elements);
    expect(result[0].text).toBe("A\nB");
    expect(result[1].text).toBe("C\nD");
  });

  it("replaces <br> in Container label.text field", () => {
    const elements = [
      {
        type: "rectangle" as const,
        x: 0,
        y: 0,
        label: { text: "Title<br>Subtitle", fontSize: 16 },
      },
    ];
    const result = normalizeMermaidBrTags(elements);
    expect(result[0].label?.text).toBe("Title\nSubtitle");
  });

  it("replaces <br> in Arrow label.text field", () => {
    const elements = [
      {
        type: "arrow" as const,
        startX: 0,
        startY: 0,
        endX: 100,
        endY: 0,
        label: { text: "step<br>one", fontSize: 16 },
      },
    ];
    const result = normalizeMermaidBrTags(elements);
    expect(result[0].label?.text).toBe("step\none");
  });

  it("does not modify text when there are no br tags", () => {
    const elements = [
      { type: "text" as const, text: "unchanged", x: 0, y: 0, fontSize: 16 },
    ];
    const result = normalizeMermaidBrTags(elements);
    expect(result[0].text).toBe("unchanged");
  });
});

describe("isMaybeMermaidDefinition", () => {
  it("should return true for a valid mermaid definition", () => {
    expect(isMaybeMermaidDefinition("flowchart")).toBe(true);
    expect(isMaybeMermaidDefinition("flowchart LR")).toBe(true);
    expect(isMaybeMermaidDefinition("flowchart LR\nola")).toBe(true);
    expect(isMaybeMermaidDefinition("%%{}%%flowchart")).toBe(true);
    expect(isMaybeMermaidDefinition("%%{}%% flowchart")).toBe(true);

    expect(isMaybeMermaidDefinition("graphs")).toBe(false);
    expect(isMaybeMermaidDefinition("this flowchart")).toBe(false);
    expect(isMaybeMermaidDefinition("this\nflowchart")).toBe(false);
  });
});
