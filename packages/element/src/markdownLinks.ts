import { normalizeLink } from "@excalidraw/common";

import type { ExcalidrawTextElement } from "./types";

// ---- Types ----

export type TextSegment =
  | { type: "text"; content: string }
  | { type: "link"; label: string; url: string; rawLength: number };

export type LinkHitBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
};

export const INLINE_LINK_COLOR = "#1971c2";

// ---- Regex ----

// Matches [label](url) — label must be non-empty, url must be non-empty.
// Excludes nested brackets in label via [^\[\]]+.
const MARKDOWN_LINK_RE = /\[([^\[\]]+)\]\(([^)]+)\)/g;

// ---- Parser ----

export const parseMarkdownLinks = (line: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  MARKDOWN_LINK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = MARKDOWN_LINK_RE.exec(line)) !== null) {
    const matchStart = match.index;
    const fullMatch = match[0];
    const label = match[1];
    const rawUrl = match[2];

    if (matchStart > lastIndex) {
      segments.push({ type: "text", content: line.slice(lastIndex, matchStart) });
    }

    segments.push({
      type: "link",
      label,
      url: normalizeLink(rawUrl),
      rawLength: fullMatch.length,
    });

    lastIndex = matchStart + fullMatch.length;
  }

  if (lastIndex < line.length) {
    segments.push({ type: "text", content: line.slice(lastIndex) });
  }

  if (segments.length === 0) {
    segments.push({ type: "text", content: line });
  }

  return segments;
};

// ---- Display text (for wrapping / measurement) ----

export const getDisplayText = (text: string): string => {
  return text.replace(MARKDOWN_LINK_RE, "$1");
};

export const containsMarkdownLink = (text: string): boolean => {
  MARKDOWN_LINK_RE.lastIndex = 0;
  return MARKDOWN_LINK_RE.test(text);
};

/**
 * Tokenize a line for wrapping, treating each [label](url) as a single
 * atomic token so the wrapping algorithm never breaks inside markdown syntax.
 * Plain text between links is tokenized with the provided `tokenizePlain`
 * callback (which should be the normal unicode-aware `parseTokens`).
 */
export const getMarkdownAwareTokens = (
  line: string,
  tokenizePlain: (text: string) => string[],
): string[] => {
  MARKDOWN_LINK_RE.lastIndex = 0;
  if (!MARKDOWN_LINK_RE.test(line)) {
    return tokenizePlain(line);
  }

  const tokens: string[] = [];
  let lastIndex = 0;

  MARKDOWN_LINK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = MARKDOWN_LINK_RE.exec(line)) !== null) {
    const textBefore = line.slice(lastIndex, match.index);
    if (textBefore) {
      tokens.push(...tokenizePlain(textBefore));
    }
    tokens.push(match[0]);
    lastIndex = match.index + match[0].length;
  }

  const textAfter = line.slice(lastIndex);
  if (textAfter) {
    tokens.push(...tokenizePlain(textAfter));
  }

  return tokens;
};

// ---- Version-keyed parse cache ----

const parseCache = new Map<string, TextSegment[][]>();

const getCacheKey = (element: ExcalidrawTextElement): string =>
  `${element.id}_${element.version}`;

export const getParsedTextSegments = (
  element: ExcalidrawTextElement,
): TextSegment[][] => {
  const key = getCacheKey(element);
  const cached = parseCache.get(key);
  if (cached) {
    return cached;
  }

  const lines = element.text.replace(/\r\n?/g, "\n").split("\n");
  const parsed = lines.map((line) => parseMarkdownLinks(line));

  parseCache.set(key, parsed);
  return parsed;
};

// ---- Link hit box storage ----

const linkHitBoxes = new Map<string, LinkHitBox[]>();

export const setLinkHitBoxes = (
  elementId: string,
  hitBoxes: LinkHitBox[],
): void => {
  linkHitBoxes.set(elementId, hitBoxes);
};

export const getInlineLinkAtPoint = (
  elementId: string,
  localX: number,
  localY: number,
): string | null => {
  const boxes = linkHitBoxes.get(elementId);
  if (!boxes) {
    return null;
  }
  for (const box of boxes) {
    if (
      localX >= box.x &&
      localX <= box.x + box.width &&
      localY >= box.y &&
      localY <= box.y + box.height
    ) {
      return box.url;
    }
  }
  return null;
};

export const hasInlineLinks = (elementId: string): boolean => {
  const boxes = linkHitBoxes.get(elementId);
  return !!boxes && boxes.length > 0;
};
