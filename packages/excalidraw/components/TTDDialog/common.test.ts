import { describe, expect, it, vi } from "vitest";

vi.mock("@excalidraw/utils", () => ({
  exportToCanvas: vi.fn().mockResolvedValue(document.createElement("canvas")),
}));

import { convertMermaidToExcalidraw } from "./common";

type ConvertMermaidArgs = Parameters<typeof convertMermaidToExcalidraw>[0];
type ParseMermaidToExcalidraw = Awaited<
  ConvertMermaidArgs["mermaidToExcalidrawLib"]["api"]
>["parseMermaidToExcalidraw"];

const createConvertArgs = (
  mermaidDefinition: string,
  parseMermaidToExcalidraw: ParseMermaidToExcalidraw,
  data: ConvertMermaidArgs["data"] = { current: { elements: [], files: null } },
): ConvertMermaidArgs => {
  const parent = document.createElement("div");
  const canvas = document.createElement("div");
  parent.appendChild(canvas);

  return {
    canvasRef: { current: canvas },
    mermaidToExcalidrawLib: {
      loaded: true,
      api: Promise.resolve({ parseMermaidToExcalidraw }),
    },
    mermaidDefinition,
    setError: vi.fn(),
    data,
    theme: "light",
  };
};

describe("convertMermaidToExcalidraw", () => {
  it("returns the original parse error when quote-normalized fallback also fails", async () => {
    const originalError = new Error("Parse error on line 9: ...");
    const fallbackError = new Error("Parse error on line 6: ...");

    const parseMermaidToExcalidraw = vi
      .fn<ParseMermaidToExcalidraw>()
      .mockRejectedValueOnce(originalError)
      .mockRejectedValueOnce(fallbackError);

    const mermaidDefinition =
      'graph TD\nA["One"]\nB["Two"]x\nC["Three"]\nD["Four"]';

    const result = await convertMermaidToExcalidraw(
      createConvertArgs(mermaidDefinition, parseMermaidToExcalidraw),
    );

    expect(parseMermaidToExcalidraw).toHaveBeenCalledTimes(2);
    expect(parseMermaidToExcalidraw).toHaveBeenNthCalledWith(
      1,
      mermaidDefinition,
    );
    expect(parseMermaidToExcalidraw).toHaveBeenNthCalledWith(
      2,
      mermaidDefinition.replace(/"/g, "'"),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(originalError);
    }
  });

  it("normalizes <br> tags in text element text field to newlines", async () => {
    const parseMermaidToExcalidraw = vi.fn<ParseMermaidToExcalidraw>().mockResolvedValue({
      elements: [
        { type: "text", text: "Line1<br>Line2", x: 0, y: 0, fontSize: 16 },
      ],
      files: {},
    });

    const data: ConvertMermaidArgs["data"] = {
      current: { elements: [], files: null },
    };
    const result = await convertMermaidToExcalidraw(
      createConvertArgs("flowchart TD\nA[test]", parseMermaidToExcalidraw, data),
    );

    expect(result.success).toBe(true);
    const textEl = data.current.elements.find((el) => el.type === "text");
    expect(textEl?.text).toBe("Line1\nLine2");
  });

  it("normalizes <br/> and <br /> variants in container label to newlines", async () => {
    const parseMermaidToExcalidraw = vi.fn<ParseMermaidToExcalidraw>().mockResolvedValue({
      elements: [
        {
          type: "rectangle",
          x: 0,
          y: 0,
          label: { text: "Title<br/>Sub<br />End", fontSize: 16 },
        },
      ],
      files: {},
    });

    const data: ConvertMermaidArgs["data"] = {
      current: { elements: [], files: null },
    };
    const result = await convertMermaidToExcalidraw(
      createConvertArgs("flowchart TD\nA[test]", parseMermaidToExcalidraw, data),
    );

    expect(result.success).toBe(true);
    const textEl = data.current.elements.find((el) => el.type === "text");
    expect(textEl?.text).toBe("Title\nSub\nEnd");
  });

  it("does not retry quote normalization when the input has no double quotes", async () => {
    const originalError = new Error("Parse error on line 9: ...");
    const parseMermaidToExcalidraw = vi
      .fn<ParseMermaidToExcalidraw>()
      .mockRejectedValueOnce(originalError);

    const mermaidDefinition = "graph TD\nA[One]\nB[Two]x";

    const result = await convertMermaidToExcalidraw(
      createConvertArgs(mermaidDefinition, parseMermaidToExcalidraw),
    );

    expect(parseMermaidToExcalidraw).toHaveBeenCalledTimes(1);
    expect(parseMermaidToExcalidraw).toHaveBeenCalledWith(mermaidDefinition);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe(originalError);
    }
  });
});
