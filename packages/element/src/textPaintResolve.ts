import { THEME, applyDarkModeFilter } from "@excalidraw/common";

import type { ExcalidrawTextElement } from "./types";

export type ExcalidrawTheme = typeof THEME[keyof typeof THEME];

const resolveColorForTheme = (color: string, theme: ExcalidrawTheme): string =>
  theme === THEME.DARK ? applyDarkModeFilter(color) : color;

export type ResolvedTextPaint = {
  /** Theme-adjusted color for glyph fill */
  fillColor: string;
  /** Theme-adjusted outline color when outline is enabled */
  outlineColor: string | null;
  outlineWidth: number;
};

/**
 * Resolved colors for rendering text (canvas, SVG, wysiwyg) with the same
 * light/dark pipeline as other elements (`applyDarkModeFilter` in dark theme).
 */
export const getResolvedTextPaint = (
  element: ExcalidrawTextElement,
  theme: ExcalidrawTheme,
): ResolvedTextPaint => {
  const fillSource = element.textFillColor ?? element.strokeColor;
  const outlineWidthRaw = element.textStrokeWidth ?? 0;
  const outlineWidth =
    typeof outlineWidthRaw === "number" &&
    Number.isFinite(outlineWidthRaw) &&
    outlineWidthRaw > 0
      ? outlineWidthRaw
      : 0;

  const fillColor = resolveColorForTheme(fillSource, theme);

  if (outlineWidth <= 0) {
    return {
      fillColor,
      outlineColor: null,
      outlineWidth: 0,
    };
  }

  const outlineSource =
    element.textStrokeColor ?? element.strokeColor ?? fillSource;

  return {
    fillColor,
    outlineColor: resolveColorForTheme(outlineSource, theme),
    outlineWidth,
  };
};
