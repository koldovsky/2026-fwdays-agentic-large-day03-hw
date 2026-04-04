import { DEFAULT_ELEMENT_PROPS } from "@excalidraw/common";

import type { Mutable } from "@excalidraw/common/utility-types";

import type { ElementUpdate } from "./mutateElement";
import type { ExcalidrawTextElement } from "./types";

const TEXT_PAINT_MUTATION_KEYS = new Set([
  "textFillColor",
  "textStrokeColor",
  "textStrokeWidth",
  "strokeColor",
]);

/**
 * Keeps `strokeColor` (legacy glyph fill) and `textFillColor` in sync, normalizes
 * outline width, and supplies a default outline color when width is positive.
 * Invoked from `mutateElement` when a text paint-related key is in the update.
 */
export const mergeTextPaintNormalization = <
  T extends Mutable<ExcalidrawTextElement>,
>(
  element: T,
  updates: ElementUpdate<T>,
): ElementUpdate<T> => {
  if (!Object.keys(updates).some((key) => TEXT_PAINT_MUTATION_KEYS.has(key))) {
    return updates;
  }

  const out: Record<string, unknown> = { ...(updates as object) };

  if (typeof out.textFillColor !== "undefined") {
    out.strokeColor = out.textFillColor;
  } else if (typeof out.strokeColor !== "undefined") {
    out.textFillColor = out.strokeColor;
  }

  if (typeof out.textStrokeWidth === "number") {
    if (!Number.isFinite(out.textStrokeWidth) || out.textStrokeWidth < 0) {
      out.textStrokeWidth = 0;
    }
  }

  const merged = { ...element, ...out } as T;
  const outlineWidth = merged.textStrokeWidth ?? 0;
  if (
    outlineWidth > 0 &&
    (merged.textStrokeColor === undefined || merged.textStrokeColor === "")
  ) {
    out.textStrokeColor = DEFAULT_ELEMENT_PROPS.strokeColor;
  }

  return out as ElementUpdate<T>;
};
