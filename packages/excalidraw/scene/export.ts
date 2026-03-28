import rough from "roughjs/bin/rough";

import {
  DEFAULT_EXPORT_PADDING,
  FRAME_STYLE,
  FONT_FAMILY,
  SVG_NS,
  THEME,
  MIME_TYPES,
  EXPORT_DATA_TYPES,
  arrayToMap,
  distance,
  getFontString,
  toBrandedType,
  applyDarkModeFilter,
} from "@excalidraw/common";

import { getCommonBounds, getElementAbsoluteCoords } from "@excalidraw/element";

import {
  getInitializedImageElements,
  updateImageCache,
} from "@excalidraw/element";

import { newElementWith } from "@excalidraw/element";

import { isFrameLikeElement } from "@excalidraw/element";

import {
  getElementsOverlappingFrame,
  getFrameLikeElements,
  getFrameLikeTitle,
  getRootElements,
} from "@excalidraw/element";

import { syncInvalidIndices } from "@excalidraw/element";

import { type Mutable } from "@excalidraw/common/utility-types";

import { newTextElement } from "@excalidraw/element";

import type { Bounds } from "@excalidraw/common";

import type {
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  ExcalidrawTextElement,
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";

import { getDefaultAppState } from "../appState";
import { base64ToString, decode, encode, stringToBase64 } from "../data/encode";
import { serializeAsJSON } from "../data/json";

import { Fonts } from "../fonts";

import { renderStaticScene } from "../renderer/staticScene";
import { renderSceneToSvg } from "../renderer/staticSvgScene";

import type { RenderableElementsMap } from "./types";

import type { AppState, BinaryFiles } from "../types";

const truncateText = (element: ExcalidrawTextElement, maxWidth: number) => {
  if (element.width <= maxWidth) {
    return element;
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = getFontString({
    fontFamily: element.fontFamily,
    fontSize: element.fontSize,
  });

  let text = element.text;

  const metrics = ctx.measureText(text);

  if (metrics.width > maxWidth) {
    // we iterate from the right, removing characters one by one instead
    // of bulding the string up. This assumes that it's more likely
    // your frame names will overflow by not that many characters
    // (if ever), so it sohuld be faster this way.
    for (let i = text.length; i > 0; i--) {
      const newText = `${text.slice(0, i)}...`;
      if (ctx.measureText(newText).width <= maxWidth) {
        text = newText;
        break;
      }
    }
  }
  return newElementWith(element, { text, width: maxWidth });
};

/**
 * When exporting frames, we need to render frame labels which are currently
 * being rendered in DOM when editing. Adding the labels as regular text
 * elements seems like a simple hack. In the future we'll want to move to
 * proper canvas rendering, even within editor (instead of DOM).
 */
const addFrameLabelsAsTextElements = (
  elements: readonly NonDeletedExcalidrawElement[],
  opts: Pick<AppState, "exportWithDarkMode">,
) => {
  const nextElements: NonDeletedExcalidrawElement[] = [];
  for (const element of elements) {
    if (isFrameLikeElement(element)) {
      let textElement: Mutable<ExcalidrawTextElement> = newTextElement({
        x: element.x,
        y: element.y - FRAME_STYLE.nameOffsetY,
        fontFamily: FONT_FAMILY.Helvetica,
        fontSize: FRAME_STYLE.nameFontSize,
        lineHeight:
          FRAME_STYLE.nameLineHeight as ExcalidrawTextElement["lineHeight"],
        strokeColor: opts.exportWithDarkMode
          ? FRAME_STYLE.nameColorDarkTheme
          : FRAME_STYLE.nameColorLightTheme,
        text: getFrameLikeTitle(element),
      });
      textElement.y -= textElement.height;

      textElement = truncateText(textElement, element.width);

      nextElements.push(textElement);
    }
    nextElements.push(element);
  }

  return nextElements;
};

const getFrameRenderingConfig = (
  exportingFrame: ExcalidrawFrameLikeElement | null,
  frameRendering: AppState["frameRendering"] | null,
): AppState["frameRendering"] => {
  frameRendering = frameRendering || getDefaultAppState().frameRendering;
  return {
    enabled: exportingFrame ? true : frameRendering.enabled,
    outline: exportingFrame ? false : frameRendering.outline,
    name: exportingFrame ? false : frameRendering.name,
    clip: exportingFrame ? true : frameRendering.clip,
  };
};

const prepareElementsForRender = ({
  elements,
  exportingFrame,
  frameRendering,
  exportWithDarkMode,
}: {
  elements: readonly ExcalidrawElement[];
  exportingFrame: ExcalidrawFrameLikeElement | null | undefined;
  frameRendering: AppState["frameRendering"];
  exportWithDarkMode: AppState["exportWithDarkMode"];
}) => {
  let nextElements: readonly ExcalidrawElement[];

  if (exportingFrame) {
    nextElements = getElementsOverlappingFrame(elements, exportingFrame);
  } else if (frameRendering.enabled && frameRendering.name) {
    nextElements = addFrameLabelsAsTextElements(elements, {
      exportWithDarkMode,
    });
  } else {
    nextElements = elements;
  }

  return nextElements;
};

export const exportToCanvas = async (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
  files: BinaryFiles,
  {
    exportBackground,
    exportPadding = DEFAULT_EXPORT_PADDING,
    viewBackgroundColor,
    exportingFrame,
  }: {
    exportBackground: boolean;
    exportPadding?: number;
    canvasBackgroundPattern?: AppState["canvasBackgroundPattern"];
    viewBackgroundColor: string;
    exportingFrame?: ExcalidrawFrameLikeElement | null;
  },
  createCanvas: (
    width: number,
    height: number,
  ) => { canvas: HTMLCanvasElement; scale: number } = (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width * appState.exportScale;
    canvas.height = height * appState.exportScale;
    return { canvas, scale: appState.exportScale };
  },
  loadFonts: () => Promise<void> = async () => {
    await Fonts.loadElementsFonts(elements);
  },
) => {
  // load font faces before continuing, by default leverages browsers' [FontFace API](https://developer.mozilla.org/en-US/docs/Web/API/FontFace)
  await loadFonts();

  const frameRendering = getFrameRenderingConfig(
    exportingFrame ?? null,
    appState.frameRendering ?? null,
  );
  // for canvas export, don't clip if exporting a specific frame as it would
  // clip the corners of the content
  if (exportingFrame) {
    frameRendering.clip = false;
  }

  const elementsForRender = prepareElementsForRender({
    elements,
    exportingFrame,
    exportWithDarkMode: appState.exportWithDarkMode,
    frameRendering,
  });

  if (exportingFrame) {
    exportPadding = 0;
  }

  const [minX, minY, width, height] = getCanvasSize(
    exportingFrame ? [exportingFrame] : getRootElements(elementsForRender),
    exportPadding,
  );

  const { canvas, scale = 1 } = createCanvas(width, height);

  const defaultAppState = getDefaultAppState();

  const { imageCache } = await updateImageCache({
    imageCache: new Map(),
    fileIds: getInitializedImageElements(elementsForRender).map(
      (element) => element.fileId,
    ),
    files,
  });

  renderStaticScene({
    canvas,
    rc: rough.canvas(canvas),
    elementsMap: toBrandedType<RenderableElementsMap>(
      arrayToMap(elementsForRender),
    ),
    allElementsMap: toBrandedType<NonDeletedSceneElementsMap>(
      arrayToMap(syncInvalidIndices(elements)),
    ),
    visibleElements: elementsForRender,
    scale,
    appState: {
      ...appState,
      frameRendering,
      viewBackgroundColor: exportBackground ? viewBackgroundColor : null,
      scrollX: -minX + exportPadding,
      scrollY: -minY + exportPadding,
      zoom: defaultAppState.zoom,
      shouldCacheIgnoreZoom: false,
      theme: appState.exportWithDarkMode ? THEME.DARK : THEME.LIGHT,
    },
    renderConfig: {
      canvasBackgroundColor: viewBackgroundColor,
      imageCache,
      renderGrid: false,
      isExporting: true,
      // empty disables embeddable rendering
      embedsValidationStatus: new Map(),
      elementsPendingErasure: new Set(),
      pendingFlowchartNodes: null,
      theme: appState.exportWithDarkMode ? THEME.DARK : THEME.LIGHT,
    },
  });

  return canvas;
};

const createHTMLComment = (text: string) => {
  // surrounding with spaces to maintain prettified consistency with previous
  // iterations
  // <!-- comment -->
  return document.createComment(` ${text} `);
};

const SquaredPaperLineColor = {
  [THEME.LIGHT]: {
    bold: "#bfd3f2",
    regular: "#d9e5f8",
  },
  [THEME.DARK]: {
    bold: applyDarkModeFilter("#bfd3f2"),
    regular: applyDarkModeFilter("#d9e5f8"),
  },
} as const;

const appendSquaredPaperPattern = ({
  svgRoot,
  defsElement,
  gridSize,
  gridStep,
  theme,
}: {
  svgRoot: SVGSVGElement;
  defsElement: SVGDefsElement;
  gridSize: number;
  gridStep: number;
  theme: AppState["theme"];
}) => {
  const pattern = svgRoot.ownerDocument.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("id", "canvas-background-pattern-squared-paper");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", `${gridSize * gridStep}`);
  pattern.setAttribute("height", `${gridSize * gridStep}`);

  for (let index = 0; index <= gridStep; index++) {
    const position = index * gridSize;
    const isBold = index === 0 || index === gridStep;
    const stroke = isBold
      ? SquaredPaperLineColor[theme].bold
      : SquaredPaperLineColor[theme].regular;
    const strokeWidth = isBold ? 1.5 : 1;

    const vertical = svgRoot.ownerDocument.createElementNS(SVG_NS, "line");
    vertical.setAttribute("x1", `${position}`);
    vertical.setAttribute("y1", "0");
    vertical.setAttribute("x2", `${position}`);
    vertical.setAttribute("y2", `${gridSize * gridStep}`);
    vertical.setAttribute("stroke", stroke);
    vertical.setAttribute("stroke-width", `${strokeWidth}`);
    pattern.appendChild(vertical);

    const horizontal = svgRoot.ownerDocument.createElementNS(SVG_NS, "line");
    horizontal.setAttribute("x1", "0");
    horizontal.setAttribute("y1", `${position}`);
    horizontal.setAttribute("x2", `${gridSize * gridStep}`);
    horizontal.setAttribute("y2", `${position}`);
    horizontal.setAttribute("stroke", stroke);
    horizontal.setAttribute("stroke-width", `${strokeWidth}`);
    pattern.appendChild(horizontal);
  }

  defsElement.appendChild(pattern);
};

export const exportToSvg = async (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: {
    canvasBackgroundPattern?: AppState["canvasBackgroundPattern"];
    exportBackground: boolean;
    exportPadding?: number;
    exportScale?: number;
    gridSize?: AppState["gridSize"];
    gridStep?: AppState["gridStep"];
    viewBackgroundColor: string;
    exportWithDarkMode?: boolean;
    exportEmbedScene?: boolean;
    frameRendering?: AppState["frameRendering"];
  },
  files: BinaryFiles | null,
  opts?: {
    /**
     * if true, all embeddables passed in will be rendered when possible.
     */
    renderEmbeddables?: boolean;
    exportingFrame?: ExcalidrawFrameLikeElement | null;
    skipInliningFonts?: true;
    reuseImages?: boolean;
  },
): Promise<SVGSVGElement> => {
  const frameRendering = getFrameRenderingConfig(
    opts?.exportingFrame ?? null,
    appState.frameRendering ?? null,
  );

  let {
    exportPadding = DEFAULT_EXPORT_PADDING,
    exportWithDarkMode = false,
    viewBackgroundColor,
    exportScale = 1,
    exportEmbedScene,
  } = appState;

  const { exportingFrame = null } = opts || {};

  const elementsForRender = prepareElementsForRender({
    elements,
    exportingFrame,
    exportWithDarkMode,
    frameRendering,
  });

  if (exportingFrame) {
    exportPadding = 0;
  }

  const [minX, minY, width, height] = getCanvasSize(
    exportingFrame ? [exportingFrame] : getRootElements(elementsForRender),
    exportPadding,
  );

  const offsetX = -minX + exportPadding;
  const offsetY = -minY + exportPadding;

  // ---------------------------------------------------------------------------
  // initialize SVG root element
  // ---------------------------------------------------------------------------

  const svgRoot = document.createElementNS(SVG_NS, "svg");

  svgRoot.setAttribute("version", "1.1");
  svgRoot.setAttribute("xmlns", SVG_NS);
  svgRoot.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svgRoot.setAttribute("width", `${width * exportScale}`);
  svgRoot.setAttribute("height", `${height * exportScale}`);

  const defsElement = svgRoot.ownerDocument.createElementNS(SVG_NS, "defs");

  const metadataElement = svgRoot.ownerDocument.createElementNS(
    SVG_NS,
    "metadata",
  );

  svgRoot.appendChild(createHTMLComment("svg-source:excalidraw"));
  svgRoot.appendChild(metadataElement);
  svgRoot.appendChild(defsElement);

  // ---------------------------------------------------------------------------
  // scene embed
  // ---------------------------------------------------------------------------

  // we need to serialize the "original" elements before we put them through
  // the tempScene hack which duplicates and regenerates ids
  if (exportEmbedScene) {
    try {
      encodeSvgBase64Payload({
        metadataElement,
        // when embedding scene, we want to embed the origionally supplied
        // elements which don't contain the temp frame labels.
        // But it also requires that the exportToSvg is being supplied with
        // only the elements that we're exporting, and no extra.
        payload: serializeAsJSON(elements, appState, files || {}, "local"),
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  // ---------------------------------------------------------------------------
  // frame clip paths
  // ---------------------------------------------------------------------------

  const frameElements = getFrameLikeElements(elements);

  if (frameElements.length) {
    const elementsMap = arrayToMap(elements);

    for (const frame of frameElements) {
      const clipPath = svgRoot.ownerDocument.createElementNS(
        SVG_NS,
        "clipPath",
      );

      clipPath.setAttribute("id", frame.id);

      const [x1, y1, x2, y2] = getElementAbsoluteCoords(frame, elementsMap);
      const cx = (x2 - x1) / 2 - (frame.x - x1);
      const cy = (y2 - y1) / 2 - (frame.y - y1);

      const rect = svgRoot.ownerDocument.createElementNS(SVG_NS, "rect");
      rect.setAttribute(
        "transform",
        `translate(${frame.x + offsetX} ${frame.y + offsetY}) rotate(${
          frame.angle
        } ${cx} ${cy})`,
      );
      rect.setAttribute("width", `${frame.width}`);
      rect.setAttribute("height", `${frame.height}`);

      if (!exportingFrame) {
        rect.setAttribute("rx", `${FRAME_STYLE.radius}`);
        rect.setAttribute("ry", `${FRAME_STYLE.radius}`);
      }

      clipPath.appendChild(rect);

      defsElement.appendChild(clipPath);
    }
  }

  // ---------------------------------------------------------------------------
  // inline font faces
  // ---------------------------------------------------------------------------

  const fontFaces = !opts?.skipInliningFonts
    ? await Fonts.generateFontFaceDeclarations(elements)
    : [];

  const delimiter = "\n      "; // 6 spaces

  const style = svgRoot.ownerDocument.createElementNS(SVG_NS, "style");
  style.classList.add("style-fonts");
  style.appendChild(
    document.createTextNode(`${delimiter}${fontFaces.join(delimiter)}`),
  );

  defsElement.appendChild(style);

  // ---------------------------------------------------------------------------
  // background
  // ---------------------------------------------------------------------------

  // render background rect
  if (appState.exportBackground && viewBackgroundColor) {
    const patternGridSize = appState.gridSize ?? getDefaultAppState().gridSize;
    const patternGridStep = appState.gridStep ?? getDefaultAppState().gridStep;

    if (appState.canvasBackgroundPattern === "squared-paper") {
      appendSquaredPaperPattern({
        svgRoot,
        defsElement,
        gridSize: patternGridSize,
        gridStep: patternGridStep,
        theme: exportWithDarkMode ? THEME.DARK : THEME.LIGHT,
      });
    }

    if (appState.canvasBackgroundPattern === "squared-paper") {
      const baseRect = svgRoot.ownerDocument.createElementNS(SVG_NS, "rect");
      baseRect.setAttribute("x", "0");
      baseRect.setAttribute("y", "0");
      baseRect.setAttribute("width", `${width}`);
      baseRect.setAttribute("height", `${height}`);
      baseRect.setAttribute(
        "fill",
        exportWithDarkMode
          ? applyDarkModeFilter(viewBackgroundColor)
          : viewBackgroundColor,
      );
      svgRoot.appendChild(baseRect);
    }

    const rect = svgRoot.ownerDocument.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", `${width}`);
    rect.setAttribute("height", `${height}`);
    rect.setAttribute(
      "fill",
      appState.canvasBackgroundPattern === "squared-paper"
        ? "url(#canvas-background-pattern-squared-paper)"
        : exportWithDarkMode
        ? applyDarkModeFilter(viewBackgroundColor)
        : viewBackgroundColor,
    );
    svgRoot.appendChild(rect);
  }

  // ---------------------------------------------------------------------------
  // render elements
  // ---------------------------------------------------------------------------

  const rsvg = rough.svg(svgRoot);

  const renderEmbeddables = opts?.renderEmbeddables ?? false;

  renderSceneToSvg(
    elementsForRender,
    toBrandedType<RenderableElementsMap>(arrayToMap(elementsForRender)),
    rsvg,
    svgRoot,
    files || {},
    {
      offsetX,
      offsetY,
      isExporting: true,
      exportWithDarkMode,
      renderEmbeddables,
      frameRendering,
      canvasBackgroundColor: viewBackgroundColor,
      embedsValidationStatus: renderEmbeddables
        ? new Map(
            elementsForRender
              .filter((element) => isFrameLikeElement(element))
              .map((element) => [element.id, true]),
          )
        : new Map(),
      reuseImages: opts?.reuseImages ?? true,
      theme: exportWithDarkMode ? THEME.DARK : THEME.LIGHT,
    },
  );

  // ---------------------------------------------------------------------------

  return svgRoot;
};

export const encodeSvgBase64Payload = ({
  payload,
  metadataElement,
}: {
  payload: string;
  metadataElement: SVGMetadataElement;
}) => {
  const base64 = stringToBase64(
    JSON.stringify(encode({ text: payload })),
    true /* is already byte string */,
  );

  metadataElement.appendChild(
    createHTMLComment(`payload-type:${MIME_TYPES.excalidraw}`),
  );
  metadataElement.appendChild(createHTMLComment("payload-version:2"));
  metadataElement.appendChild(createHTMLComment("payload-start"));
  metadataElement.appendChild(document.createTextNode(base64));
  metadataElement.appendChild(createHTMLComment("payload-end"));
};

export const decodeSvgBase64Payload = ({ svg }: { svg: string }) => {
  if (svg.includes(`payload-type:${MIME_TYPES.excalidraw}`)) {
    const match = svg.match(
      /<!-- payload-start -->\s*(.+?)\s*<!-- payload-end -->/,
    );
    if (!match) {
      throw new Error("INVALID");
    }
    const versionMatch = svg.match(/<!-- payload-version:(\d+) -->/);
    const version = versionMatch?.[1] || "1";
    const isByteString = version !== "1";

    try {
      const json = base64ToString(match[1], isByteString);
      const encodedData = JSON.parse(json);
      if (!("encoded" in encodedData)) {
        // legacy, un-encoded scene JSON
        if (
          "type" in encodedData &&
          encodedData.type === EXPORT_DATA_TYPES.excalidraw
        ) {
          return json;
        }
        throw new Error("FAILED");
      }
      return decode(encodedData);
    } catch (error: any) {
      console.error(error);
      throw new Error("FAILED");
    }
  }
  throw new Error("INVALID");
};

// calculate smallest area to fit the contents in
const getCanvasSize = (
  elements: readonly NonDeletedExcalidrawElement[],
  exportPadding: number,
): Bounds => {
  const [minX, minY, maxX, maxY] = getCommonBounds(elements);
  const width = distance(minX, maxX) + exportPadding * 2;
  const height = distance(minY, maxY) + exportPadding * 2;

  return [minX, minY, width, height];
};

export const getExportSize = (
  elements: readonly NonDeletedExcalidrawElement[],
  exportPadding: number,
  scale: number,
): [number, number] => {
  const [, , width, height] = getCanvasSize(elements, exportPadding).map(
    (dimension) => Math.trunc(dimension * scale),
  );

  return [width, height];
};
