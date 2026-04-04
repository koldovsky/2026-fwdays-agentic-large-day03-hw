import { normalizeLink } from "@excalidraw/common";

/**
 * Matches a *complete* markdown link occupying the whole trimmed text:
 * `[label](url)`
 *
 * Capturing groups:
 *   1 — label (visible text, may be empty)
 *   2 — raw URL (before sanitisation)
 *
 * Only whole-text matches are handled. Partial matches like
 * "See [here](url) for details" return null — we never silently
 * mangle text the user did not intend as a pure link.
 */
const FULL_MARKDOWN_LINK_RE = /^\[([^\]]*)\]\(([^)]+)\)$/;

export interface ParsedMarkdownLink {
  label: string;
  url: string;
}

/**
 * If `text` is exactly a single markdown link `[label](url)`, returns the
 * parsed label and sanitised URL. Otherwise returns `null`.
 */
export const parseMarkdownLink = (text: string): ParsedMarkdownLink | null => {
  const match = FULL_MARKDOWN_LINK_RE.exec(text.trim());
  if (!match) {
    return null;
  }

  const label = match[1].trim();
  const rawUrl = match[2].trim();

  if (!rawUrl) {
    return null;
  }

  const url = normalizeLink(rawUrl);

  // normalizeLink returns "about:blank" for malicious URLs (javascript:, data:)
  if (!url || url === "about:blank") {
    return null;
  }

  return { label: label || rawUrl, url };
};
