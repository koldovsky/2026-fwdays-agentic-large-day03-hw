import { pointFrom, pointRotateRads } from "@excalidraw/math";

import {
  MIME_TYPES,
  getFontString,
  getInlineHyperlinkLineSegments,
} from "@excalidraw/common";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import { getLineHeightInPx, getLineWidth } from "@excalidraw/element";
import { hitElementBoundingBox } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";

import type { GlobalPoint, Radians } from "@excalidraw/math";

import type { Bounds } from "@excalidraw/common";
import type {
  ElementsMap,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";

import type { AppState, UIAppState } from "../../types";

export const DEFAULT_LINK_SIZE = 12;

export const EXTERNAL_LINK_IMG = document.createElement("img");
EXTERNAL_LINK_IMG.src = `data:${MIME_TYPES.svg}, ${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1971c2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
)}`;

export const ELEMENT_LINK_IMG = document.createElement("img");
ELEMENT_LINK_IMG.src = `data:${MIME_TYPES.svg}, ${encodeURIComponent(
  `<svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="#1971c2"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-right-line"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-6v-6h6z" /><path d="M3 9v6" /></svg>`,
)}`;

export const getLinkHandleFromCoords = (
  [x1, y1, x2, y2]: Bounds,
  angle: Radians,
  appState: Pick<UIAppState, "zoom">,
): Bounds => {
  const size = DEFAULT_LINK_SIZE;
  const zoom = appState.zoom.value > 1 ? appState.zoom.value : 1;
  const linkWidth = size / zoom;
  const linkHeight = size / zoom;
  const linkMarginY = size / zoom;
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;
  const centeringOffset = (size - 8) / (2 * zoom);
  const dashedLineMargin = 4 / zoom;

  // Same as `ne` resize handle
  const x = x2 + dashedLineMargin - centeringOffset;
  const y = y1 - dashedLineMargin - linkMarginY + centeringOffset;

  const [rotatedX, rotatedY] = pointRotateRads(
    pointFrom(x + linkWidth / 2, y + linkHeight / 2),
    pointFrom(centerX, centerY),
    angle,
  );
  return [
    rotatedX - linkWidth / 2,
    rotatedY - linkHeight / 2,
    linkWidth,
    linkHeight,
  ];
};

export const isPointHittingLinkIcon = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: GlobalPoint,
) => {
  const threshold = 4 / appState.zoom.value;
  const [x1, y1, x2, y2] = getElementAbsoluteCoords(element, elementsMap);
  const [linkX, linkY, linkWidth, linkHeight] = getLinkHandleFromCoords(
    [x1, y1, x2, y2],
    element.angle,
    appState,
  );
  const hitLink =
    x > linkX - threshold &&
    x < linkX + threshold + linkWidth &&
    y > linkY - threshold &&
    y < linkY + linkHeight + threshold;
  return hitLink;
};

export const isPointHittingLink = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: GlobalPoint,
  isMobile: boolean,
) => {
  return !!getLinkAtPoint(
    element,
    elementsMap,
    appState,
    pointFrom(x, y),
    isMobile,
  );
};

export type HitLink = {
  element: NonDeletedExcalidrawElement;
  link: string;
  bounds: Bounds;
};

const getInlineLinkAtPoint = (
  element: NonDeletedExcalidrawElement,
  [x, y]: GlobalPoint,
): HitLink | null => {
  if (!isTextElement(element)) {
    return null;
  }

  const center = pointFrom(
    element.x + element.width / 2,
    element.y + element.height / 2,
  );
  const [localPointX, localPointY] = pointRotateRads(
    pointFrom(x, y),
    center,
    (-element.angle) as Radians,
  );
  const localX = localPointX - element.x;
  const localY = localPointY - element.y;

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
  const inlineLines = getInlineHyperlinkLineSegments(
    element.originalText,
    element.text,
  );

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const lineTop = lineIndex * lineHeightPx;
    const lineBottom = lineTop + lineHeightPx;

    if (localY < lineTop || localY > lineBottom) {
      continue;
    }

    const lineWidth = getLineWidth(line, font);
    const horizontalOffset =
      element.textAlign === "center"
        ? element.width / 2 - lineWidth / 2
        : element.textAlign === "right"
        ? element.width - lineWidth
        : 0;

    let currentX = horizontalOffset;

    for (const segment of inlineLines[lineIndex] || []) {
      if (!segment.text) {
        continue;
      }
      const width = getLineWidth(segment.text, font);
      const hitBounds: Bounds = [
        currentX + element.x,
        lineTop + element.y,
        width,
        lineHeightPx,
      ];

      if (
        segment.link &&
        localX >= currentX &&
        localX <= currentX + width &&
        localY >= lineTop &&
        localY <= lineBottom
      ) {
        return {
          element,
          link: segment.link,
          bounds: hitBounds,
        };
      }

      currentX += width;
    }
  }

  return null;
};

export const getLinkAtPoint = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: GlobalPoint,
  isMobile: boolean,
): HitLink | null => {
  if (appState.selectedElementIds[element.id]) {
    return null;
  }

  if (element.link) {
    if (
      !isMobile &&
      appState.viewModeEnabled &&
      hitElementBoundingBox(pointFrom(x, y), element, elementsMap)
    ) {
      const [x1, y1, x2, y2] = getElementAbsoluteCoords(element, elementsMap);
      return {
        element,
        link: element.link,
        bounds: [x1, y1, x2 - x1, y2 - y1],
      };
    }

    if (isPointHittingLinkIcon(element, elementsMap, appState, pointFrom(x, y))) {
      const [x1, y1, x2, y2] = getElementAbsoluteCoords(element, elementsMap);
      const [linkX, linkY, linkWidth, linkHeight] = getLinkHandleFromCoords(
        [x1, y1, x2, y2],
        element.angle,
        appState,
      );
      return {
        element,
        link: element.link,
        bounds: [linkX, linkY, linkWidth, linkHeight],
      };
    }
  }

  return getInlineLinkAtPoint(element, pointFrom(x, y));
};
