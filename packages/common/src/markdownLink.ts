import { normalizeLink } from "./url";

/**
 * Matches a single markdown link that occupies the entire trimmed string:
 * `[label](url)`. Partial strings (e.g. prose around a link) return null.
 */
const FULL_MARKDOWN_LINK_RE = /^\[([^\]]*)\]\(([^)]+)\)$/;

export type ParsedMarkdownLink = {
  label: string;
  url: string;
};

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
