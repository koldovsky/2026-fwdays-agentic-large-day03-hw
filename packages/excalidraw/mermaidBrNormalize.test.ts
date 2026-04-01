import { describe, expect, it } from "vitest";

import type { ExcalidrawElementSkeleton } from "@excalidraw/element";

import {
  normalizeMermaidBrInSkeletonElements,
  replaceMermaidBrTagsWithNewlines,
} from "./mermaidBrNormalize";

describe("replaceMermaidBrTagsWithNewlines", () => {
  it("replaces <br> with newline", () => {
    expect(replaceMermaidBrTagsWithNewlines("a<br>b")).toBe("a\nb");
  });

  it("replaces <br/> and <br />", () => {
    expect(replaceMermaidBrTagsWithNewlines("x<br/>y")).toBe("x\ny");
    expect(replaceMermaidBrTagsWithNewlines("x<br />y")).toBe("x\ny");
  });

  it("is case-insensitive", () => {
    expect(replaceMermaidBrTagsWithNewlines("a<BR>b")).toBe("a\nb");
  });

  it("handles multiple breaks", () => {
    expect(replaceMermaidBrTagsWithNewlines("a<br>b<br>c")).toBe("a\nb\nc");
  });

  it("handles adjacent breaks (empty lines between)", () => {
    expect(replaceMermaidBrTagsWithNewlines("a<br><br>b")).toBe("a\n\nb");
  });

  it("leaves strings without br unchanged", () => {
    expect(replaceMermaidBrTagsWithNewlines("hello")).toBe("hello");
  });
});

describe("normalizeMermaidBrInSkeletonElements", () => {
  it("skips label when text is not a string (defensive)", () => {
    const elements = [
      {
        type: "rectangle",
        x: 0,
        y: 0,
        label: { text: 123, fontSize: 20 },
      },
    ] as unknown as ExcalidrawElementSkeleton[];
    expect(() => normalizeMermaidBrInSkeletonElements(elements)).not.toThrow();
    expect((elements[0] as { label: { text: unknown } }).label.text).toBe(123);
  });

  it("normalizes label.text on containers", () => {
    const elements: ExcalidrawElementSkeleton[] = [
      {
        type: "rectangle",
        x: 0,
        y: 0,
        label: { text: "One<br>Two", fontSize: 20 },
      },
    ];
    normalizeMermaidBrInSkeletonElements(elements);
    expect((elements[0] as { label: { text: string } }).label.text).toBe(
      "One\nTwo",
    );
  });

  it("normalizes type text elements", () => {
    const elements: ExcalidrawElementSkeleton[] = [
      {
        type: "text",
        x: 0,
        y: 0,
        text: "A<br>B",
      },
    ];
    normalizeMermaidBrInSkeletonElements(elements);
    expect((elements[0] as { text: string }).text).toBe("A\nB");
  });

  it("normalizes start/end inline text on arrows", () => {
    const elements: ExcalidrawElementSkeleton[] = [
      {
        type: "arrow",
        x: 0,
        y: 0,
        start: { type: "text", text: "S<br>1" },
        end: { type: "text", text: "E<br>2" },
      } as ExcalidrawElementSkeleton,
    ];
    normalizeMermaidBrInSkeletonElements(elements);
    const arrow = elements[0] as {
      start: { text: string };
      end: { text: string };
    };
    expect(arrow.start.text).toBe("S\n1");
    expect(arrow.end.text).toBe("E\n2");
  });
});
