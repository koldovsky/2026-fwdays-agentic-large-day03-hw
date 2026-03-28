import {
  getFontString,
  getVerticalOffset,
  isRTL,
  normalizeLink,
} from "@excalidraw/common";
import { pointFrom, pointRotateRads } from "@excalidraw/math";

import { getElementAbsoluteCoords } from "./bounds";
import {
  charWidth,
  getLineHeightInPx,
  getLineWidth,
  normalizeText,
} from "./textMeasurements";
import { parseTokens } from "./textWrapping";

import type { GlobalPoint, Radians } from "@excalidraw/math";
import type { Bounds } from "@excalidraw/common";
import type { ElementsMap, ExcalidrawTextElement, FontString } from "./types";

/**
 * V1 markdown link grammar:
 * - matches `[label](url)` on a single hard line
 * - `label` and `url` must both be non-empty
 * - nested `[` in the label and multiline spans are treated as literal text
 * - only normalized `http:` / `https:` URLs are interactive
 */

type ParsedHyperlinkSegment =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "link";
      text: string;
      url: string;
      href: string | null;
    };

type ParsedHyperlinkLine = {
  text: string;
  segments: ParsedHyperlinkSegment[];
};

type RenderableToken =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "link";
      text: string;
      url: string;
      href: string | null;
    };

export type TextHyperlinkRenderableSegment = ParsedHyperlinkSegment;

export type TextHyperlinkRenderableLine = {
  text: string;
  direction: "ltr" | "rtl";
  segments: TextHyperlinkRenderableSegment[];
};

export type TextHyperlinkLayoutSegment = TextHyperlinkRenderableSegment & {
  x: number;
  width: number;
  top: number;
  baselineY: number;
  underlineY: number;
};

export type TextHyperlinkLayoutLine = TextHyperlinkRenderableLine & {
  width: number;
  top: number;
  baselineY: number;
  segments: TextHyperlinkLayoutSegment[];
};

export type TextHyperlinkLayout = {
  lineHeightPx: number;
  lines: TextHyperlinkLayoutLine[];
};

export type TextHyperlinkHit = {
  element: ExcalidrawTextElement;
  url: string;
  bounds: Bounds;
};

export const TEXT_HYPERLINK_LIGHT_COLOR = "#1c7ed6";
export const TEXT_HYPERLINK_DARK_COLOR = "#4dabf7";

const ALLOWED_TEXT_HYPERLINK_PROTOCOLS = new Set(["http:", "https:"]);

const isSingleCharacter = (maybeSingleCharacter: string) => {
  return (
    maybeSingleCharacter.codePointAt(0) !== undefined &&
    maybeSingleCharacter.codePointAt(1) === undefined
  );
};

const containsPotentialMarkdownLink = (text: string) => {
  return text.includes("[") && text.includes("](") && text.includes(")");
};

export const getTextHyperlinkHref = (url: string): string | null => {
  const normalized = normalizeLink(url);

  if (!normalized || normalized === "about:blank") {
    return null;
  }

  try {
    const parsed = new URL(normalized);

    if (!ALLOWED_TEXT_HYPERLINK_PROTOCOLS.has(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
};

const createEmptyParsedLine = (): ParsedHyperlinkLine => ({
  text: "",
  segments: [],
});

const pushSegmentToLine = (
  line: ParsedHyperlinkLine,
  segment: ParsedHyperlinkSegment,
) => {
  if (!segment.text) {
    return;
  }

  const previous = line.segments[line.segments.length - 1];

  if (segment.type === "text") {
    if (previous?.type === "text") {
      previous.text += segment.text;
    } else {
      line.segments.push({ ...segment });
    }
  } else if (
    previous?.type === "link" &&
    previous.url === segment.url &&
    previous.href === segment.href
  ) {
    previous.text += segment.text;
  } else {
    line.segments.push({ ...segment });
  }

  line.text += segment.text;
};

const pushPlainText = (lines: ParsedHyperlinkLine[], text: string) => {
  if (!text) {
    return;
  }

  let cursor = 0;

  while (cursor <= text.length) {
    const nextLineBreak = text.indexOf("\n", cursor);
    const chunk =
      nextLineBreak === -1 ? text.slice(cursor) : text.slice(cursor, nextLineBreak);

    if (chunk) {
      pushSegmentToLine(lines[lines.length - 1], {
        type: "text",
        text: chunk,
      });
    }

    if (nextLineBreak === -1) {
      break;
    }

    lines.push(createEmptyParsedLine());
    cursor = nextLineBreak + 1;
  }
};

const tryParseMarkdownLink = (
  text: string,
  start: number,
): {
  label: string;
  url: string;
  end: number;
} | null => {
  const lineBreakIndex = text.indexOf("\n", start);
  const labelEnd = text.indexOf("]", start + 1);

  if (
    labelEnd === -1 ||
    (lineBreakIndex !== -1 && labelEnd > lineBreakIndex) ||
    text[labelEnd + 1] !== "("
  ) {
    return null;
  }

  const label = text.slice(start + 1, labelEnd);

  if (!label || label.includes("[") || label.includes("]")) {
    return null;
  }

  let urlEnd = -1;
  let nestedParens = 0;

  for (let index = labelEnd + 2; index < text.length; index++) {
    const char = text[index];

    if (char === "\n") {
      break;
    }

    if (char === "(") {
      nestedParens += 1;
      continue;
    }

    if (char === ")") {
      if (nestedParens === 0) {
        urlEnd = index;
        break;
      }

      nestedParens -= 1;
    }
  }

  if (urlEnd === -1 || (lineBreakIndex !== -1 && urlEnd > lineBreakIndex)) {
    return null;
  }

  const url = text.slice(labelEnd + 2, urlEnd);

  if (!url) {
    return null;
  }

  return {
    label,
    url,
    end: urlEnd + 1,
  };
};

const parseMarkdownHyperlinkLines = (text: string): ParsedHyperlinkLine[] => {
  const normalized = normalizeText(text);
  const lines: ParsedHyperlinkLine[] = [createEmptyParsedLine()];
  let cursor = 0;
  let pendingPlainText = "";

  while (cursor < normalized.length) {
    const char = normalized[cursor];

    if (char !== "[") {
      pendingPlainText += char;
      cursor += 1;
      continue;
    }

    const parsedLink = tryParseMarkdownLink(normalized, cursor);

    if (!parsedLink) {
      pendingPlainText += char;
      cursor += 1;
      continue;
    }

    pushPlainText(lines, pendingPlainText);
    pendingPlainText = "";

    pushSegmentToLine(lines[lines.length - 1], {
      type: "link",
      text: parsedLink.label,
      url: parsedLink.url,
      href: getTextHyperlinkHref(parsedLink.url),
    });

    cursor = parsedLink.end;
  }

  pushPlainText(lines, pendingPlainText);

  return lines;
};

const tokenizeRenderableLine = (line: ParsedHyperlinkLine): RenderableToken[] => {
  const tokens: RenderableToken[] = [];

  for (const segment of line.segments) {
    const splitTokens = parseTokens(segment.text);

    for (const text of splitTokens) {
      if (!text) {
        continue;
      }

      if (segment.type === "text") {
        tokens.push({
          type: "text",
          text,
        });
      } else {
        tokens.push({
          type: "link",
          text,
          url: segment.url,
          href: segment.href,
        });
      }
    }
  }

  return tokens;
};

const cloneTokenWithText = (token: RenderableToken, text: string): RenderableToken =>
  token.type === "text"
    ? {
        type: "text",
        text,
      }
    : {
        type: "link",
        text,
        url: token.url,
        href: token.href,
      };

const getTokenTextWidth = (
  currentLineWidth: number,
  currentLineText: string,
  tokenText: string,
  font: FontString,
) => {
  if (isSingleCharacter(tokenText)) {
    return currentLineWidth + charWidth.calculate(tokenText, font);
  }

  return getLineWidth(currentLineText + tokenText, font);
};

const trimTrailingWhitespace = (tokens: RenderableToken[]) => {
  const nextTokens = tokens.map((token) => ({ ...token }));

  while (nextTokens.length) {
    const token = nextTokens[nextTokens.length - 1];
    const trimmedText = token.text.replace(/\s+$/u, "");

    if (trimmedText === token.text) {
      break;
    }

    if (!trimmedText) {
      nextTokens.pop();
      continue;
    }

    nextTokens[nextTokens.length - 1] = cloneTokenWithText(token, trimmedText);
    break;
  }

  return nextTokens;
};

const trimRenderableLine = (
  tokens: RenderableToken[],
  font: FontString,
  maxWidth: number,
) => {
  let nextTokens = tokens.map((token) => ({ ...token }));

  while (
    nextTokens.length &&
    getLineWidth(
      nextTokens.map((token) => token.text).join(""),
      font,
    ) > maxWidth
  ) {
    const token = nextTokens[nextTokens.length - 1];
    const trimmedText = token.text.replace(/\s+$/u, "");

    if (trimmedText === token.text) {
      break;
    }

    if (!trimmedText) {
      nextTokens.pop();
      continue;
    }

    nextTokens[nextTokens.length - 1] = cloneTokenWithText(token, trimmedText);
  }

  return nextTokens;
};

const mergeRenderableTokens = (
  tokens: RenderableToken[],
): TextHyperlinkRenderableSegment[] => {
  const merged: TextHyperlinkRenderableSegment[] = [];

  for (const token of tokens) {
    if (!token.text) {
      continue;
    }

    const previous = merged[merged.length - 1];

    if (token.type === "text") {
      if (previous?.type === "text") {
        previous.text += token.text;
        continue;
      }
    } else if (
      previous?.type === "link" &&
      previous.url === token.url &&
      previous.href === token.href
    ) {
      previous.text += token.text;
      continue;
    }

    merged.push({ ...token });
  }

  return merged;
};

const splitOversizedToken = (
  token: RenderableToken,
  font: FontString,
  maxWidth: number,
) => {
  const pieces: RenderableToken[] = [];
  let currentText = "";
  let currentLineWidth = 0;

  for (const char of Array.from(token.text)) {
    const charWidthValue = charWidth.calculate(char, font);

    if (
      currentText &&
      currentLineWidth + charWidthValue > maxWidth
    ) {
      pieces.push(cloneTokenWithText(token, currentText));
      currentText = char;
      currentLineWidth = charWidthValue;
      continue;
    }

    currentText += char;
    currentLineWidth += charWidthValue;
  }

  if (currentText) {
    pieces.push(cloneTokenWithText(token, currentText));
  }

  return pieces.length ? pieces : [token];
};

const tokensToRenderableLine = (
  tokens: RenderableToken[],
): TextHyperlinkRenderableLine => {
  const segments = mergeRenderableTokens(tokens);
  const text = segments.map((segment) => segment.text).join("");

  return {
    text,
    direction: isRTL(text) ? "rtl" : "ltr",
    segments,
  };
};

const wrapRenderableLine = (
  hardLine: ParsedHyperlinkLine,
  font: FontString,
  maxWidth: number,
) => {
  const tokens = tokenizeRenderableLine(hardLine);
  const wrappedLines: TextHyperlinkRenderableLine[] = [];

  let currentTokens: RenderableToken[] = [];
  let currentText = "";
  let currentLineWidth = 0;
  let tokenIndex = 0;

  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex];
    const testLineWidth = getTokenTextWidth(
      currentLineWidth,
      currentText,
      token.text,
      font,
    );

    if (/\s/u.test(token.text) || testLineWidth <= maxWidth) {
      currentTokens.push(token);
      currentText += token.text;
      currentLineWidth = testLineWidth;
      tokenIndex += 1;
      continue;
    }

    if (!currentTokens.length) {
      const pieces = splitOversizedToken(token, font, maxWidth);
      const trailingPiece = pieces[pieces.length - 1];

      for (const piece of pieces.slice(0, -1)) {
        wrappedLines.push(tokensToRenderableLine([piece]));
      }

      currentTokens = trailingPiece ? [trailingPiece] : [];
      currentText = trailingPiece?.text || "";
      currentLineWidth = trailingPiece
        ? getLineWidth(trailingPiece.text, font)
        : 0;
      tokenIndex += 1;
      continue;
    }

    wrappedLines.push(
      tokensToRenderableLine(trimTrailingWhitespace(currentTokens)),
    );
    currentTokens = [];
    currentText = "";
    currentLineWidth = 0;
  }

  wrappedLines.push(
    tokensToRenderableLine(trimRenderableLine(currentTokens, font, maxWidth)),
  );

  return wrappedLines;
};

export const getRenderableTextLines = (
  text: string,
  font: FontString,
  maxWidth: number,
): TextHyperlinkRenderableLine[] => {
  const parsedLines = parseMarkdownHyperlinkLines(text);

  if (!Number.isFinite(maxWidth) || maxWidth < 0) {
    return parsedLines.map((line) => ({
      text: line.text,
      direction: isRTL(line.text) ? "rtl" : "ltr",
      segments: line.segments.map((segment) => ({ ...segment })),
    }));
  }

  return parsedLines.flatMap((line) => {
    if (!line.text || getLineWidth(line.text, font) <= maxWidth) {
      return [
        {
          text: line.text,
          direction: isRTL(line.text) ? "rtl" : "ltr",
          segments: line.segments.map((segment) => ({ ...segment })),
        },
      ];
    }

    return wrapRenderableLine(line, font, maxWidth);
  });
};

export const getRenderableText = (
  text: string,
  font: FontString,
  maxWidth: number,
) => {
  return getRenderableTextLines(text, font, maxWidth)
    .map((line) => line.text)
    .join("\n");
};

export const getTextHyperlinkLayout = (
  element: ExcalidrawTextElement,
): TextHyperlinkLayout => {
  const font = getFontString(element);
  const maxWidth =
    element.containerId || !element.autoResize
      ? Math.max(element.width, 0)
      : Infinity;
  const lineHeightPx = getLineHeightInPx(element.fontSize, element.lineHeight);
  const verticalOffset = getVerticalOffset(
    element.fontFamily,
    element.fontSize,
    lineHeightPx,
  );
  const sourceLines: TextHyperlinkRenderableLine[] = containsPotentialMarkdownLink(
    element.originalText,
  )
    ? getRenderableTextLines(element.originalText, font, maxWidth)
    : element.text.replace(/\r\n?/g, "\n").split("\n").map((text) => ({
        text,
        direction: isRTL(text) ? "rtl" : "ltr",
        segments: text
          ? [
              {
                type: "text" as const,
                text,
              },
            ]
          : [],
      }));

  const lines = sourceLines.map((line, lineIndex) => {
    const lineWidth = getLineWidth(line.text, font);
    const lineStartX =
      element.textAlign === "center"
        ? (element.width - lineWidth) / 2
        : element.textAlign === "right"
        ? element.width - lineWidth
        : 0;
    const top = lineIndex * lineHeightPx;
    const baselineY = top + verticalOffset;
    let visibleOffset = 0;

    const segments = line.segments.map((segment) => {
      const startOffset = visibleOffset;
      const endOffset = startOffset + segment.text.length;
      const prefixStartWidth =
        startOffset > 0 ? getLineWidth(line.text.slice(0, startOffset), font) : 0;
      const prefixEndWidth = getLineWidth(
        line.text.slice(0, endOffset),
        font,
      );
      visibleOffset = endOffset;

      const x =
        line.direction === "rtl"
          ? lineStartX + (lineWidth - prefixEndWidth)
          : lineStartX + prefixStartWidth;

      return {
        ...segment,
        x,
        width: Math.max(prefixEndWidth - prefixStartWidth, 0),
        top,
        baselineY,
        underlineY: baselineY + Math.max(1, element.fontSize * 0.08),
      };
    });

    return {
      ...line,
      width: lineWidth,
      top,
      baselineY,
      segments,
    };
  });

  return {
    lineHeightPx,
    lines,
  };
};

export const getTextHyperlinkAtPoint = (
  element: ExcalidrawTextElement,
  elementsMap: ElementsMap,
  point: GlobalPoint,
): TextHyperlinkHit | null => {
  const layout = getTextHyperlinkLayout(element);
  const [x1, y1, , , cx, cy] = getElementAbsoluteCoords(element, elementsMap);
  const [localX, localY] = pointRotateRads(
    pointFrom(point[0], point[1]),
    pointFrom(cx, cy),
    -element.angle as Radians,
  );
  const relativeX = localX - x1;
  const relativeY = localY - y1;

  for (const line of layout.lines) {
    for (const segment of line.segments) {
      if (segment.type !== "link" || !segment.href || !segment.width) {
        continue;
      }

      const bounds: Bounds = [
        x1 + segment.x,
        y1 + segment.top,
        x1 + segment.x + segment.width,
        y1 + segment.top + layout.lineHeightPx,
      ];

      if (
        relativeX >= segment.x &&
        relativeX <= segment.x + segment.width &&
        relativeY >= segment.top &&
        relativeY <= segment.top + layout.lineHeightPx
      ) {
        return {
          element,
          url: segment.href,
          bounds,
        };
      }
    }
  }

  return null;
};
