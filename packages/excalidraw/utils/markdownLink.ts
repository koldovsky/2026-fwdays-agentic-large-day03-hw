import { normalizeLink } from "@excalidraw/common";

const MARKDOWN_LINK_RE = /\[([^\]]*)\]\(((?:[^()]*|\([^()]*\))+)\)/g;

const ABOUT_BLANK = "about:blank";

interface ParsedLink {
  url: string;
}

interface ParseResult {
  resolvedText: string;
  links: ParsedLink[];
}

/**
 * Extracts markdown-style links from text and resolves them.
 *
 * - Safe links: label replaces the `[label](url)` syntax in the output text.
 * - Unsafe links (javascript:, data:, etc.): left as raw markdown so the user
 *   can see and fix them.
 * - Empty label `[](url)`: the URL is used as the visible label.
 * - Empty URL `[label]()`: treated as no-op, raw markdown preserved.
 *
 * Returns `null` when the text contains no markdown links.
 */
export const parseMarkdownLinks = (text: string): ParseResult | null => {
  if (!MARKDOWN_LINK_RE.test(text)) {
    return null;
  }

  MARKDOWN_LINK_RE.lastIndex = 0;

  const links: ParsedLink[] = [];
  let resolvedText = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = MARKDOWN_LINK_RE.exec(text)) !== null) {
    const [fullMatch, label, rawUrl] = match;
    const matchStart = match.index;

    resolvedText += text.slice(lastIndex, matchStart);

    const url = rawUrl.trim();

    if (!url) {
      resolvedText += fullMatch;
      lastIndex = matchStart + fullMatch.length;
      continue;
    }

    const sanitised = normalizeLink(url);

    if (sanitised === ABOUT_BLANK) {
      resolvedText += fullMatch;
      lastIndex = matchStart + fullMatch.length;
      continue;
    }

    const displayLabel = label || url;
    resolvedText += displayLabel;
    links.push({ url: sanitised });

    lastIndex = matchStart + fullMatch.length;
  }

  resolvedText += text.slice(lastIndex);

  if (links.length === 0) {
    return null;
  }

  return { resolvedText, links };
};
