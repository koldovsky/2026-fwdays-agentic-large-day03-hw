import { describe, expect, it, vi } from "vitest";

import { convertMermaidToExcalidraw } from "./common";

vi.mock("@excalidraw/utils", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@excalidraw/utils")>();
  return {
    ...mod,
    exportToCanvas: vi.fn().mockResolvedValue(document.createElement("canvas")),
  };
});

type ConvertMermaidArgs = Parameters<typeof convertMermaidToExcalidraw>[0];
type ParseMermaidToExcalidraw = Awaited<
  ConvertMermaidArgs["mermaidToExcalidrawLib"]["api"]
>["parseMermaidToExcalidraw"];

const createConvertArgs = (
  mermaidDefinition: string,
  parseMermaidToExcalidraw: ParseMermaidToExcalidraw,
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
    data: {
      current: {
        elements: [],
        files: null,
      },
    },
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

  it("normalizes <br> in skeleton label text on successful parse (TTD path)", async () => {
    const parseMermaidToExcalidraw = vi
      .fn<ParseMermaidToExcalidraw>()
      .mockResolvedValue({
        elements: [
          {
            id: "rect-br",
            type: "rectangle",
            groupIds: [],
            x: 0,
            y: 0,
            width: 69.703125,
            height: 44,
            strokeWidth: 2,
            label: {
              groupIds: [],
              text: "Line1<br>Line2",
              fontSize: 20,
            },
            link: null,
          },
        ],
        files: {},
      });

    const args = createConvertArgs("flowchart TD\nA", parseMermaidToExcalidraw);

    const result = await convertMermaidToExcalidraw(args);

    expect(result.success).toBe(true);
    const textEl = args.data.current.elements.find((e) => e.type === "text");
    expect(textEl?.type).toBe("text");
    if (textEl && textEl.type === "text") {
      expect(textEl.originalText).toBe("Line1\nLine2");
    }
  });
});
