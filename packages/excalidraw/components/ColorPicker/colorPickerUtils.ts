import { MAX_CUSTOM_COLORS_USED_IN_CANVAS } from "@excalidraw/common";

import { isTextElement } from "@excalidraw/element";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import type { ColorPickerColor, ColorPaletteCustom } from "@excalidraw/common";

import { atom } from "../../editor-jotai";

export const getColorNameAndShadeFromColor = ({
  palette,
  color,
}: {
  palette: ColorPaletteCustom;
  color: string | null;
}): {
  colorName: ColorPickerColor;
  shade: number | null;
} | null => {
  if (!color) {
    return null;
  }
  for (const [colorName, colorVal] of Object.entries(palette)) {
    if (Array.isArray(colorVal)) {
      const shade = colorVal.indexOf(color);
      if (shade > -1) {
        return { colorName: colorName as ColorPickerColor, shade };
      }
    } else if (colorVal === color) {
      return { colorName: colorName as ColorPickerColor, shade: null };
    }
  }
  return null;
};

export const colorPickerHotkeyBindings = [
  ["q", "w", "e", "r", "t"],
  ["a", "s", "d", "f", "g"],
  ["z", "x", "c", "v", "b"],
].flat();

export type ColorPickerType =
  | "canvasBackground"
  | "elementBackground"
  | "elementStroke"
  /** Standalone text fill — distinct openPopup so two stroke-like pickers do not share state */
  | "standaloneTextFill"
  | "standaloneTextOutlineStroke";

export const isCustomColor = ({
  color,
  palette,
}: {
  color: string;
  palette: ColorPaletteCustom;
}) => {
  const paletteValues = Object.values(palette).flat();
  return !paletteValues.includes(color);
};

/** Stroke-style swatches (incl. standalone text fill / outline pickers). */
export const isStrokeLikeColorPickerType = (type: ColorPickerType): boolean =>
  type === "elementStroke" ||
  type === "standaloneTextFill" ||
  type === "standaloneTextOutlineStroke";

export const getElementColorFieldForMostUsedCustom = (
  type: ColorPickerType,
): "backgroundColor" | "strokeColor" | "textStrokeColor" | null => {
  if (type === "canvasBackground") {
    return null;
  }
  if (type === "elementBackground") {
    return "backgroundColor";
  }
  if (type === "standaloneTextOutlineStroke") {
    return "textStrokeColor";
  }
  return "strokeColor";
};

/**
 * Color source for "most used custom" swatches. Text outline uses `textStrokeColor`
 * only (not `strokeColor`, which tracks glyph fill on text via normalization).
 */
const getElementColorStringForMostUsedCustom = (
  element: ExcalidrawElement,
  type: ColorPickerType,
): string | undefined => {
  if (type === "canvasBackground") {
    return undefined;
  }
  if (type === "elementBackground") {
    return element.backgroundColor;
  }
  if (type === "standaloneTextOutlineStroke") {
    if (!isTextElement(element)) {
      return undefined;
    }
    if ((element.textStrokeWidth ?? 0) <= 0) {
      return undefined;
    }
    const c = element.textStrokeColor;
    return typeof c === "string" && c !== "" ? c : undefined;
  }
  return element.strokeColor;
};

export const getMostUsedCustomColors = (
  elements: readonly ExcalidrawElement[],
  type: ColorPickerType,
  palette: ColorPaletteCustom,
) => {
  if (type === "canvasBackground") {
    return [];
  }

  const colors = elements.filter((element) => {
    if (element.isDeleted) {
      return false;
    }

    const color = getElementColorStringForMostUsedCustom(element, type);
    if (color == null) {
      return false;
    }

    return isCustomColor({ color, palette });
  });

  const colorCountMap = new Map<string, number>();
  colors.forEach((element) => {
    const color = getElementColorStringForMostUsedCustom(element, type)!;
    if (colorCountMap.has(color)) {
      colorCountMap.set(color, colorCountMap.get(color)! + 1);
    } else {
      colorCountMap.set(color, 1);
    }
  });

  return [...colorCountMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((c) => c[0])
    .slice(0, MAX_CUSTOM_COLORS_USED_IN_CANVAS);
};

export type ActiveColorPickerSectionAtomType =
  | "custom"
  | "baseColors"
  | "shades"
  | "hex"
  | null;
export const activeColorPickerSectionAtom =
  atom<ActiveColorPickerSectionAtomType>(null);
