import { getFontString, isRTL } from "@excalidraw/common";
import { pointFrom, pointRotateRads, type Radians } from "@excalidraw/math";

import {
  containsTextHyperlinkSyntax,
  parseTextHyperlinkSegments,
  segmentsToDisplayString,
} from "./textHyperlinks";
import { getLineHeightInPx, getLineWidth } from "./textMeasurements";

import type { ExcalidrawTextElement, FontString } from "./types";

export const sceneCoordsToTextElementLocal = (
  element: ExcalidrawTextElement,
  sceneX: number,
  sceneY: number,
): { localX: number; localY: number } => {
  const cx = element.x + element.width / 2;
  const cy = element.y + element.height / 2;
  const [ux, uy] = pointRotateRads(
    pointFrom(sceneX, sceneY),
    pointFrom(cx, cy),
    -element.angle as Radians,
  );
  return { localX: ux - element.x, localY: uy - element.y };
};

const hitSegmentInLine = (
  line: string,
  font: FontString,
  relativeX: number,
): string | null => {
  const segs = parseTextHyperlinkSegments(line);
  const display = segmentsToDisplayString(segs);
  const lineWidth = getLineWidth(display, font);
  if (relativeX < 0 || relativeX > lineWidth) {
    return null;
  }

  const rtl = isRTL(display);
  if (!rtl) {
    let x = 0;
    for (const seg of segs) {
      const t = seg.type === "plain" ? seg.text : seg.label;
      const w = getLineWidth(t, font);
      if (relativeX >= x && relativeX <= x + w) {
        return seg.type === "link" ? seg.url : null;
      }
      x += w;
    }
    return null;
  }

  let xr = lineWidth - relativeX;
  for (const seg of [...segs].reverse()) {
    const t = seg.type === "plain" ? seg.text : seg.label;
    const w = getLineWidth(t, font);
    if (xr < w) {
      return seg.type === "link" ? seg.url : null;
    }
    xr -= w;
  }
  return null;
};

/**
 * If the scene pointer lies on a validated inline `[label](url)` span, return the URL.
 */
export const getTextHyperlinkUrlAtScenePointer = (
  element: ExcalidrawTextElement,
  sceneX: number,
  sceneY: number,
): string | null => {
  if (!containsTextHyperlinkSyntax(element.text)) {
    return null;
  }

  const { localX, localY } = sceneCoordsToTextElementLocal(
    element,
    sceneX,
    sceneY,
  );
  if (
    localX < 0 ||
    localY < 0 ||
    localX > element.width ||
    localY > element.height
  ) {
    return null;
  }

  const font = getFontString(element);
  const lineHeightPx = getLineHeightInPx(element.fontSize, element.lineHeight);
  const lines = element.text.replace(/\r\n?/g, "\n").split("\n");
  const lineIndex = Math.max(
    0,
    Math.min(lines.length - 1, Math.floor(localY / lineHeightPx)),
  );
  const line = lines[lineIndex];
  const display = segmentsToDisplayString(parseTextHyperlinkSegments(line));
  const lineWidth = getLineWidth(display, font);
  const horizontalOffset =
    element.textAlign === "center"
      ? (element.width - lineWidth) / 2
      : element.textAlign === "right"
      ? element.width - lineWidth
      : 0;
  const relativeX = localX - horizontalOffset;
  return hitSegmentInLine(line, font, relativeX);
};
