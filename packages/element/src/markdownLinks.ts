/**
 * Utilities for parsing and validating markdown-style inline hyperlinks
 * within Excalidraw text elements.
 *
 * Supports the syntax: [label](url)
 * Only http:// and https:// URLs are treated as valid links.
 */

export interface TextSegment {
  /** Whether this segment is a plain text run or an inline link. */
  type: "text" | "link";
  /** The string to render on the canvas (for links: just the label). */
  content: string;
  /** Target URL — only present when type === "link". */
  url?: string;
  /** Number of characters this segment occupies in the original raw line. */
  rawLength: number;
}

const MARKDOWN_LINK_RE = /\[([^\]]*)\]\(([^)]*)\)/g;

/**
 * Returns true if the URL scheme is http or https (case-insensitive).
 * Used to prevent non-web schemes (javascript:, ftp:, etc.) from being opened.
 */
export const isAllowedUrl = (url: string): boolean => {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Parses a single line of text into an ordered list of segments.
 *
 * Each segment is either:
 * - `{ type: "text", content, rawLength }` — a plain text run
 * - `{ type: "link", content (label), url, rawLength }` — a markdown link
 *
 * The `rawLength` of all segments sums to `line.length`.
 *
 * Example:
 *   parseMarkdownLinks("visit [docs](https://example.com) now")
 *   // [
 *   //   { type: "text",  content: "visit ",           rawLength: 6 },
 *   //   { type: "link",  content: "docs",
 *   //     url: "https://example.com",                 rawLength: 28 },
 *   //   { type: "text",  content: " now",             rawLength: 4 },
 *   // ]
 */
export const parseMarkdownLinks = (line: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  // Reset regex state before each call (global flag retains lastIndex).
  MARKDOWN_LINK_RE.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = MARKDOWN_LINK_RE.exec(line)) !== null) {
    const [fullMatch, label, url] = match;
    const matchStart = match.index;

    // Plain text before this link
    if (matchStart > lastIndex) {
      const text = line.slice(lastIndex, matchStart);
      segments.push({ type: "text", content: text, rawLength: text.length });
    }

    // The link segment — only add if URL scheme is allowed
    if (isAllowedUrl(url)) {
      segments.push({
        type: "link",
        content: label,
        url,
        rawLength: fullMatch.length,
      });
    } else {
      // Treat the full match as plain text if the URL is not allowed
      segments.push({
        type: "text",
        content: fullMatch,
        rawLength: fullMatch.length,
      });
    }

    lastIndex = matchStart + fullMatch.length;
  }

  // Remaining plain text after the last match
  if (lastIndex < line.length) {
    const text = line.slice(lastIndex);
    segments.push({ type: "text", content: text, rawLength: text.length });
  }

  // If no matches at all, return the whole line as a single text segment
  if (segments.length === 0) {
    segments.push({ type: "text", content: line, rawLength: line.length });
  }

  return segments;
};
