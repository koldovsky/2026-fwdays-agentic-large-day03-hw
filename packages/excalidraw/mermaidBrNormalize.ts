import type { ExcalidrawElementSkeleton } from "@excalidraw/element";

/** HTML line-break tags that Mermaid allows inside node labels. */
const MERMAID_BR_TAG_RE = /<br\s*\/?>/gi;

export const replaceMermaidBrTagsWithNewlines = (text: string): string =>
  text.replace(MERMAID_BR_TAG_RE, "\n");

const normalizeLabel = (label: { text: string }): void => {
  label.text = replaceMermaidBrTagsWithNewlines(label.text);
};

/**
 * Post-processes skeleton elements from `@excalidraw/mermaid-to-excalidraw` so
 * `<br>` / `<br/>` in labels become newlines (issue #10952).
 */
export const normalizeMermaidBrInSkeletonElements = (
  elements: ExcalidrawElementSkeleton[],
): ExcalidrawElementSkeleton[] => {
  for (const el of elements) {
    if (!el || typeof el !== "object") {
      continue;
    }

    if (el.type === "text" && "text" in el && typeof el.text === "string") {
      el.text = replaceMermaidBrTagsWithNewlines(el.text);
    }

    if ("label" in el && el.label?.text != null) {
      normalizeLabel(el.label);
    }

    if ("start" in el && el.start && typeof el.start === "object") {
      const start = el.start as { text?: string };
      if (typeof start.text === "string") {
        start.text = replaceMermaidBrTagsWithNewlines(start.text);
      }
    }

    if ("end" in el && el.end && typeof el.end === "object") {
      const end = el.end as { text?: string };
      if (typeof end.text === "string") {
        end.text = replaceMermaidBrTagsWithNewlines(end.text);
      }
    }
  }

  return elements;
};
