import {
  getFontString,
  getVerticalOffset,
  isLocalLink,
  normalizeLink,
} from "@excalidraw/common";
import {
  pointFrom,
  pointRotateRads,
  type GlobalPoint,
  type Radians,
} from "@excalidraw/math";

import { getLineHeightInPx, getLineWidth } from "./textMeasurements";

import type { ExcalidrawTextElement, FontString } from "./types";

const MARKDOWN_LINK_REGEX = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;

export type TextHyperlinkSegment = {
  text: string;
  url: string | null;
};

export type TextHyperlinkLine = {
  segments: TextHyperlinkSegment[];
  renderedText: string;
  hasHyperlinks: boolean;
};

export type TextHyperlinkHit = {
  url: string;
  label: string;
};

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export const parseTextHyperlinkLine = (line: string): TextHyperlinkLine => {
  const segments: TextHyperlinkSegment[] = [];
  let hasHyperlinks = false;
  let lastIndex = 0;

  for (const match of line.matchAll(MARKDOWN_LINK_REGEX)) {
    const [raw, label, url] = match;
    const index = match.index ?? -1;
    if (index < 0) {
      continue;
    }
    if (index > lastIndex) {
      segments.push({ text: line.slice(lastIndex, index), url: null });
    }
    const safeUrl = sanitizeTextHyperlink(url);
    if (safeUrl) {
      hasHyperlinks = true;
      segments.push({ text: label, url: safeUrl });
    } else {
      segments.push({ text: raw, url: null });
    }
    lastIndex = index + raw.length;
  }

  if (lastIndex < line.length) {
    segments.push({ text: line.slice(lastIndex), url: null });
  }

  if (!segments.length) {
    segments.push({ text: line, url: null });
  }

  return {
    segments,
    renderedText: segments.map((segment) => segment.text).join(""),
    hasHyperlinks,
  };
};

export const parseTextHyperlinkLines = (text: string) => {
  return text.replace(/\r\n?/g, "\n").split("\n").map(parseTextHyperlinkLine);
};

export const hasTextHyperlinks = (text: string) => {
  return parseTextHyperlinkLines(text).some((line) => line.hasHyperlinks);
};

export const sanitizeTextHyperlink = (url: string): string | null => {
  const normalized = normalizeLink(url);
  if (!normalized) {
    return null;
  }
  if (isLocalLink(normalized)) {
    return normalized;
  }
  try {
    const parsed = new URL(normalized);
    if (ALLOWED_PROTOCOLS.has(parsed.protocol.toLowerCase())) {
      return normalized;
    }
  } catch {
    return null;
  }
  return null;
};

const getLineStartX = (
  lineText: string,
  fontString: FontString,
  element: ExcalidrawTextElement,
) => {
  const lineWidth = getLineWidth(lineText, fontString);
  if (element.textAlign === "center") {
    return (element.width - lineWidth) / 2;
  }
  if (element.textAlign === "right") {
    return element.width - lineWidth;
  }
  return 0;
};

export const getTextHyperlinkHitAtPoint = (
  element: ExcalidrawTextElement,
  scenePoint: GlobalPoint,
): TextHyperlinkHit | null => {
  const centerX = element.x + element.width / 2;
  const centerY = element.y + element.height / 2;
  const [rotatedX, rotatedY] = pointRotateRads(
    scenePoint,
    pointFrom<GlobalPoint>(centerX, centerY),
    (-element.angle) as Radians,
  );
  const localX = rotatedX - element.x;
  const localY = rotatedY - element.y;
  if (
    localX < 0 ||
    localY < 0 ||
    localX > element.width ||
    localY > element.height
  ) {
    return null;
  }

  const lines = parseTextHyperlinkLines(element.text);
  const fontString = getFontString(element);
  const lineHeightPx = getLineHeightInPx(element.fontSize, element.lineHeight);
  const verticalOffset = getVerticalOffset(
    element.fontFamily,
    element.fontSize,
    lineHeightPx,
  );
  const topPadding = Math.max(0, verticalOffset - element.fontSize);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    if (!line.hasHyperlinks) {
      continue;
    }
    const lineTop = lineIndex * lineHeightPx + topPadding;
    if (localY < lineTop || localY > lineTop + lineHeightPx) {
      continue;
    }
    let cursorX = getLineStartX(line.renderedText, fontString, element);
    for (const segment of line.segments) {
      const segmentWidth = getLineWidth(segment.text, fontString);
      if (segment.url && localX >= cursorX && localX <= cursorX + segmentWidth) {
        return { url: segment.url, label: segment.text };
      }
      cursorX += segmentWidth;
    }
  }

  return null;
};
