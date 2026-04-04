## Context

Excalidraw supports embedding third-party content (YouTube, Vimeo, Figma, Twitter, Reddit, GitHub Gists, etc.) as interactive iframes on the canvas. All embed provider logic lives in `packages/element/src/embeddable.ts`, which contains:

- URL-matching regexes (`RE_*` constants)
- URL-to-embed-URL transform logic inside `getEmbedLink()`
- Domain allowlists (`ALLOWED_DOMAINS`, `ALLOW_SAME_ORIGIN`)
- Paste/HTML parsing in `maybeParseEmbedSrc()`

Notion pages can be published as public websites on `*.notion.site` subdomains. Notion provides an embed format: `https://{hostname}/ebd/{pageId}` which renders cleanly inside iframes.

## Goals / Non-Goals

**Goals:**
- Allow users to embed published Notion pages by pasting a `*.notion.site` URL
- Transform Notion URLs into their proper embed format
- Follow the existing provider pattern exactly (regex, transform, allowlist, cache)

**Non-Goals:**
- Supporting private/unpublished Notion pages (requires authentication)
- Supporting `notion.so` URLs or Notion API URLs (only public `*.notion.site`)
- Notion-specific UI or custom styling of the embedded page
- Bidirectional sync between Excalidraw and Notion content

## Decisions

**1. URL matching: regex on `*.notion.site` hostname with path-based page ID extraction**

The regex matches URLs like `https://<workspace>.notion.site/<page-slug>-<pageId>`. The page ID is the hex string at the end of the path. This is the standard format Notion uses for published pages.

Alternative considered: Parsing via `URL` constructor and checking hostname suffix. Regex was chosen to stay consistent with all other providers in the file.

**2. Embed URL format: `https://{hostname}/ebd/{pageId}`**

Notion's own "embed this page" feature uses the `/ebd/{pageId}` path format. This produces a clean, iframe-friendly rendering without Notion's full chrome.

**3. Domain allowlisting: `*.notion.site` wildcard pattern**

Each Notion workspace gets its own subdomain (e.g., `myteam.notion.site`). The `*.notion.site` wildcard pattern matches all workspace subdomains while keeping the allowlist tight. The existing `matchHostname()` function already supports first-subdomain wildcards.

**4. Same-origin: enabled for `*.notion.site`**

Notion embeds require `allow-same-origin` in the iframe sandbox to render interactive content (navigation, expandable blocks). This matches the pattern used by Figma, YouTube, and other interactive embeds.

**5. Embed type: `"generic"` with document-like aspect ratio**

Notion pages are documents, not videos. Using `"generic"` type with a taller aspect ratio (e.g., `{ w: 550, h: 720 }`) provides a reasonable default for reading content.

## Risks / Trade-offs

- **[Notion URL format changes]** → Notion could change their URL structure or embed path. Mitigation: the regex and transform are isolated to a few lines, easy to update.
- **[Same-origin security surface]** → Enabling `allow-same-origin` gives the embedded page access to its own cookies/storage. Mitigation: this is the same trade-off made for YouTube, Figma, and other providers; Notion is a trusted, widely-used platform.
- **[Unpublished pages fail silently]** → If a user pastes a URL for a page that isn't published, the embed will show a Notion error page. Mitigation: this matches how other providers handle invalid/private URLs—the iframe renders whatever the remote server returns.
