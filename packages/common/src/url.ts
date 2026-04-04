import { sanitizeUrl } from "@braintree/sanitize-url";

import { escapeDoubleQuotes } from "./utils";

const INLINE_HYPERLINK_REGEX = /\[([^\]\n]+)\]\(([^)\s]+)\)/gu;

export type InlineHyperlinkSegment = {
  text: string;
  link: string | null;
};

export type InlineHyperlinkLineSegment = InlineHyperlinkSegment;

const getSafeInlineHyperlink = (link: string) => {
  const normalizedLink = normalizeLink(link);

  if (!normalizedLink) {
    return null;
  }

  const validUrl = toValidURL(normalizedLink);

  if (validUrl === "about:blank" && normalizedLink !== "about:blank") {
    return null;
  }

  return normalizedLink;
};

export const parseInlineHyperlinks = (text: string): InlineHyperlinkSegment[] => {
  const segments: InlineHyperlinkSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_HYPERLINK_REGEX)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, matchIndex),
        link: null,
      });
    }

    const [fullMatch, label, rawLink] = match;
    const safeLink = getSafeInlineHyperlink(rawLink);

    segments.push(
      safeLink
        ? {
            text: label,
            link: safeLink,
          }
        : {
            text: fullMatch,
            link: null,
          },
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      link: null,
    });
  }

  return segments;
};

export const getRenderableText = (text: string) => {
  return parseInlineHyperlinks(text)
    .map((segment) => segment.text)
    .join("");
};

export const getInlineHyperlinkLineSegments = (
  sourceText: string,
  renderedText: string = getRenderableText(sourceText),
): InlineHyperlinkLineSegment[][] => {
  const lines = renderedText.replace(/\r\n?/g, "\n").split("\n");
  const segments = parseInlineHyperlinks(sourceText);

  let segmentIndex = 0;
  let segmentOffset = 0;

  return lines.map((line) => {
    const lineSegments: InlineHyperlinkLineSegment[] = [];
    let remaining = line.length;

    while (remaining > 0 && segmentIndex < segments.length) {
      const segment = segments[segmentIndex];
      const available = segment.text.length - segmentOffset;

      if (available <= 0) {
        segmentIndex++;
        segmentOffset = 0;
        continue;
      }

      const nextChar = segment.text[segmentOffset];

      if (nextChar === "\n") {
        segmentOffset++;
        if (segmentOffset >= segment.text.length) {
          segmentIndex++;
          segmentOffset = 0;
        }
        continue;
      }

      const take = Math.min(remaining, available);
      const textSlice = segment.text.slice(segmentOffset, segmentOffset + take);

      if (textSlice) {
        lineSegments.push({
          text: textSlice,
          link: segment.link,
        });
      }

      segmentOffset += take;
      remaining -= take;

      if (segmentOffset >= segment.text.length) {
        segmentIndex++;
        segmentOffset = 0;
      }
    }

    while (segmentIndex < segments.length) {
      const segment = segments[segmentIndex];
      if (segmentOffset >= segment.text.length) {
        segmentIndex++;
        segmentOffset = 0;
        continue;
      }
      if (segment.text[segmentOffset] !== "\n") {
        break;
      }
      segmentOffset++;
      if (segmentOffset >= segment.text.length) {
        segmentIndex++;
        segmentOffset = 0;
      }
      break;
    }

    return lineSegments;
  });
};

export const normalizeLink = (link: string) => {
  link = link.trim();
  if (!link) {
    return link;
  }
  return sanitizeUrl(escapeDoubleQuotes(link));
};

export const isLocalLink = (link: string | null) => {
  return !!(link?.includes(location.origin) || link?.startsWith("/"));
};

/**
 * Returns URL sanitized and safe for usage in places such as
 * iframe's src attribute or <a> href attributes.
 */
export const toValidURL = (link: string) => {
  link = normalizeLink(link);

  // make relative links into fully-qualified urls
  if (link.startsWith("/")) {
    return `${location.origin}${link}`;
  }

  try {
    new URL(link);
  } catch {
    // if link does not parse as URL, assume invalid and return blank page
    return "about:blank";
  }

  return link;
};
