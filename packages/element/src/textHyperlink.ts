import { normalizeLink, parseMarkdownLink } from "@excalidraw/common";

import type { ExcalidrawTextElement } from "./types";

/** Matches hyperlink stroke in `hyperlink/helpers.ts` (external link icon). */
export const TEXT_HYPERLINK_COLOR = "#1971c2";

/**
 * Width/height for layout must use visible text: label for a lone markdown
 * link, or wrapped text as-is when `element.link` is set (stored text is the label).
 */
export const getPlainTextForMeasurement = (
  element: Pick<ExcalidrawTextElement, "link">,
  text: string,
): string => {
  if (element.link) {
    return text;
  }
  const parsed = parseMarkdownLink(text);
  return parsed ? parsed.label : text;
};

export const getTextHyperlinkUrl = (
  element: ExcalidrawTextElement,
): string | null => {
  if (element.link) {
    const url = normalizeLink(element.link);
    if (!url || url === "about:blank") {
      return null;
    }
    return url;
  }
  const parsed = parseMarkdownLink(element.text);
  return parsed ? parsed.url : null;
};

export const getTextHyperlinkRenderState = (
  element: ExcalidrawTextElement,
): {
  lines: string[];
  styleAsHyperlink: boolean;
} => {
  const normalizedLines = element.text.replace(/\r\n?/g, "\n").split("\n");
  const url = getTextHyperlinkUrl(element);
  if (!url) {
    return { lines: normalizedLines, styleAsHyperlink: false };
  }
  if (element.link) {
    return { lines: normalizedLines, styleAsHyperlink: true };
  }
  const parsed = parseMarkdownLink(element.text);
  if (parsed) {
    return { lines: [parsed.label], styleAsHyperlink: true };
  }
  return { lines: normalizedLines, styleAsHyperlink: false };
};
