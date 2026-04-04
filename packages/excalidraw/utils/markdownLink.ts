import { normalizeLink } from "@excalidraw/common";

const FULL_MARKDOWN_LINK_RE = /^\[([^\]]*)\]\(([^)]+)\)$/;

export interface ParsedMarkdownLink {
  label: string;
  url: string;
}

/**
 * If `text` is exactly a single markdown link `[label](url)`, returns the
 * parsed label and sanitised URL. Otherwise returns `null`.
 *
 * Only whole-text matches are handled — partial inline links like
 * "See [here](url) for details" return null.
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

  if (!url || url === "about:blank") {
    return null;
  }

  return { label: label || rawUrl, url };
};
