import {
  applyDarkModeFilter,
  getFontString,
  getVerticalOffset,
  isRTL,
  normalizeLink,
  THEME,
} from "@excalidraw/common";

import type { GlobalPoint } from "@excalidraw/math";

import { getElementAbsoluteCoords } from "./bounds";
import { getLineHeightInPx } from "./textMeasurements";

import type { ElementsMap } from "./types";
import type { ExcalidrawTextElement } from "./types";

/**
 * Markdown links with http(s) or site-relative URLs only.
 * Avoids matching `)` inside non-http schemes (e.g. javascript:alert(1)).
 */
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/;

export type MarkdownTextSegment =
  | { type: "text"; content: string }
  | { type: "link"; label: string; url: string };

export const TEXT_LINK_COLOR = "#1971c2";

export const isSafeLinkHref = (rawUrl: string): boolean => {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return false;
  }
  const n = normalizeLink(trimmed);
  if (!n || n === "about:blank") {
    return false;
  }
  const lower = n.toLowerCase();
  const jsScheme = `${"java"}script:`;
  const vbScheme = `${"vb"}script:`;
  if (
    lower.startsWith(jsScheme) ||
    lower.startsWith(vbScheme) ||
    lower.startsWith("data:text/html")
  ) {
    return false;
  }
  return true;
};

/**
 * Split a single line into plain text and link segments.
 * Invalid or unsafe URLs are left as literal text (full `[...](...)` match).
 */
export const parseMarkdownLineSegments = (
  line: string,
): MarkdownTextSegment[] => {
  const segments: MarkdownTextSegment[] = [];
  let rest = line;
  while (rest.length > 0) {
    const match = rest.match(MARKDOWN_LINK_RE);
    if (!match || match.index === undefined) {
      segments.push({ type: "text", content: rest });
      break;
    }
    const [full, label, urlRaw] = match;
    const before = rest.slice(0, match.index);
    if (before) {
      segments.push({ type: "text", content: before });
    }
    const urlTrim = urlRaw.trim();
    if (isSafeLinkHref(urlTrim)) {
      segments.push({
        type: "link",
        label,
        url: normalizeLink(urlTrim),
      });
    } else {
      segments.push({ type: "text", content: full });
    }
    rest = rest.slice(match.index + full.length);
  }
  return segments;
};

export const lineHasLinkSegment = (line: string): boolean =>
  parseMarkdownLineSegments(line).some((s) => s.type === "link");

export const textHasRenderableMarkdownLinks = (text: string): boolean => {
  if (isRTL(text)) {
    return false;
  }
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  return lines.some(lineHasLinkSegment);
};

type MeasureContext = Pick<
  CanvasRenderingContext2D,
  | "measureText"
  | "font"
  | "fillStyle"
  | "fillText"
  | "beginPath"
  | "moveTo"
  | "lineTo"
  | "stroke"
  | "strokeStyle"
  | "lineWidth"
>;

const sceneToLocalTextPoint = (
  element: ExcalidrawTextElement,
  elementsMap: ElementsMap,
  scenePoint: GlobalPoint,
): { localX: number; localY: number } | null => {
  const [, , , , cx, cy] = getElementAbsoluteCoords(element, elementsMap);
  const vx = scenePoint[0] - cx;
  const vy = scenePoint[1] - cy;
  const cos = Math.cos(-element.angle);
  const sin = Math.sin(-element.angle);
  const rx = vx * cos - vy * sin;
  const ry = vx * sin + vy * cos;
  const localX = rx + element.width / 2;
  const localY = ry + element.height / 2;
  if (
    localX < 0 ||
    localY < 0 ||
    localX > element.width ||
    localY > element.height
  ) {
    return null;
  }
  return { localX, localY };
};

/**
 * If scene point hits a rendered markdown link, return its normalized URL.
 */
export const getMarkdownLinkUrlAtSceneCoords = (
  element: ExcalidrawTextElement,
  elementsMap: ElementsMap,
  scenePoint: GlobalPoint,
): string | null => {
  if (isRTL(element.text) || !textHasRenderableMarkdownLinks(element.text)) {
    return null;
  }
  const local = sceneToLocalTextPoint(element, elementsMap, scenePoint);
  if (!local) {
    return null;
  }
  const { localX, localY } = local;

  const lines = element.text.replace(/\r\n?/g, "\n").split("\n");
  const lineHeightPx = getLineHeightInPx(element.fontSize, element.lineHeight);
  const verticalOffset = getVerticalOffset(
    element.fontFamily,
    element.fontSize,
    lineHeightPx,
  );

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.font = getFontString(element);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const segments = parseMarkdownLineSegments(line);
    if (!segments.some((s) => s.type === "link")) {
      continue;
    }

    let lineWidth = 0;
    for (const seg of segments) {
      const t = seg.type === "link" ? seg.label : seg.content;
      lineWidth += ctx.measureText(t).width;
    }

    const startX =
      element.textAlign === "center"
        ? (element.width - lineWidth) / 2
        : element.textAlign === "right"
        ? element.width - lineWidth
        : 0;

    const lineY = lineIndex * lineHeightPx + verticalOffset;
    const top = lineY - element.fontSize;
    const bottom = lineY + lineHeightPx * 0.35;

    let x = startX;
    for (const seg of segments) {
      if (seg.type === "text") {
        x += ctx.measureText(seg.content).width;
        continue;
      }
      const w = ctx.measureText(seg.label).width;
      if (localX >= x && localX <= x + w && localY >= top && localY <= bottom) {
        return seg.url;
      }
      x += w;
    }
  }

  return null;
};

export const getLinkFillColor = (
  elementStroke: string,
  theme: typeof THEME.LIGHT | typeof THEME.DARK,
): string =>
  theme === THEME.DARK ? applyDarkModeFilter(TEXT_LINK_COLOR) : TEXT_LINK_COLOR;

export const drawMarkdownTextLine = (
  context: MeasureContext,
  line: string,
  horizontalOffset: number,
  y: number,
  element: ExcalidrawTextElement,
  theme: typeof THEME.LIGHT | typeof THEME.DARK,
): void => {
  const segments = parseMarkdownLineSegments(line);
  if (!segments.some((s) => s.type === "link")) {
    context.fillText(line, horizontalOffset, y);
    return;
  }

  const baseFill =
    theme === THEME.DARK
      ? applyDarkModeFilter(element.strokeColor)
      : element.strokeColor;
  const linkFill = getLinkFillColor(element.strokeColor, theme);

  let x = horizontalOffset;
  for (const seg of segments) {
    if (seg.type === "text") {
      context.fillStyle = baseFill;
      context.fillText(seg.content, x, y);
      x += context.measureText(seg.content).width;
    } else {
      context.fillStyle = linkFill;
      context.fillText(seg.label, x, y);
      const w = context.measureText(seg.label).width;
      context.beginPath();
      context.strokeStyle = linkFill;
      context.lineWidth = 1;
      const underlineY = y + 2;
      context.moveTo(x, underlineY);
      context.lineTo(x + w, underlineY);
      context.stroke();
      x += w;
    }
  }
};
