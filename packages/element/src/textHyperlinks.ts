import { COLOR_PALETTE } from "@excalidraw/common";

import { getLineWidth } from "./textMeasurements";

import type { FontString } from "./types";

/** Max URL length after trim (defense in depth). */
export const TEXT_HYPERLINK_MAX_URL_LENGTH = 2048;

export type TextHyperlinkSegment =
  | { type: "plain"; text: string }
  | { type: "link"; label: string; url: string; source: string };

export const containsTextHyperlinkSyntax = (text: string): boolean =>
  text.includes("[") && text.includes("](");

/**
 * Allow only http(s) URLs for inline text hyperlinks.
 * Returns canonical href string or null if invalid / unsafe.
 */
export const validateTextHyperlinkUrl = (raw: string): string | null => {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > TEXT_HYPERLINK_MAX_URL_LENGTH) {
    return null;
  }
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return null;
  }
  return url.toString();
};

/**
 * Parse one hard line (no `\n`) into plain / link segments.
 * Invalid or incomplete `[...](...)` patterns stay as plain text.
 */
export const parseTextHyperlinkSegments = (line: string): TextHyperlinkSegment[] => {
  const segments: TextHyperlinkSegment[] = [];
  let i = 0;

  while (i < line.length) {
    const open = line.indexOf("[", i);
    if (open === -1) {
      if (i < line.length) {
        segments.push({ type: "plain", text: line.slice(i) });
      }
      break;
    }
    if (open > i) {
      segments.push({ type: "plain", text: line.slice(i, open) });
    }
    const close = line.indexOf("]", open + 1);
    if (close === -1) {
      segments.push({ type: "plain", text: line.slice(open) });
      break;
    }
    const label = line.slice(open + 1, close);
    if (line[close + 1] !== "(") {
      segments.push({ type: "plain", text: "[" });
      i = open + 1;
      continue;
    }
    const closeParen = line.indexOf(")", close + 2);
    if (closeParen === -1) {
      segments.push({ type: "plain", text: line.slice(open) });
      break;
    }
    const urlRaw = line.slice(close + 2, closeParen);
    const source = line.slice(open, closeParen + 1);
    const validated = validateTextHyperlinkUrl(urlRaw);
    if (label.length > 0 && validated) {
      segments.push({
        type: "link",
        label,
        url: validated,
        source,
      });
    } else {
      segments.push({ type: "plain", text: source });
    }
    i = closeParen + 1;
  }

  return segments;
};

/** Display string used for measurement / wrapping (labels only, no markdown). */
export const segmentsToDisplayString = (segments: TextHyperlinkSegment[]): string =>
  segments.map((s) => (s.type === "plain" ? s.text : s.label)).join("");

/** Line width as drawn (link syntax hidden; labels measured). */
export const getHyperlinkAwareLineWidth = (
  line: string,
  font: FontString,
): number => {
  if (!containsTextHyperlinkSyntax(line)) {
    return getLineWidth(line, font);
  }
  return getLineWidth(
    segmentsToDisplayString(parseTextHyperlinkSegments(line)),
    font,
  );
};

/** Theme-aware default color for inline links (matches UI link blue). */
export const getTextHyperlinkFillColor = (isDark: boolean): string => {
  const light = COLOR_PALETTE.blue[4];
  if (!isDark) {
    return light;
  }
  // Same family as dark theme link in theme.scss
  return COLOR_PALETTE.blue[2];
};
