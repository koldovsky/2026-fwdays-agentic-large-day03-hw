## Why

Notion is widely used for documentation, wikis, and project management. Users have requested the ability to embed published Notion pages directly into Excalidraw canvases (issues #7950 and #9409), enabling richer visual workspaces that combine diagrams with living documentation. Adding Notion as a supported embed provider follows the existing pattern for YouTube, Figma, Reddit, and other providers.

## What Changes

- Add a URL regex pattern (`RE_NOTION`) to recognize published Notion page URLs (`*.notion.site`)
- Add a `toNotionEmbedURL()` transform that converts Notion page URLs to their embeddable form (`https://{hostname}/ebd/{pageId}`)
- Register `*.notion.site` in `ALLOWED_DOMAINS` and `ALLOW_SAME_ORIGIN` sets
- Add a new `getEmbedLink` branch that produces the Notion iframe data with appropriate dimensions and sandbox settings

## Capabilities

### New Capabilities
- `notion-embed`: Support embedding published Notion pages as interactive iframes on the Excalidraw canvas

### Modified Capabilities

## Impact

- **Code**: `packages/element/src/embeddable.ts` — new regex, URL transform function, domain allowlisting, and embed link branch
- **Tests**: `packages/element/tests/embeddable.test.ts` — new test cases for Notion URL recognition and embed URL generation
- **Security**: Notion embeds require `allow-same-origin` in the iframe sandbox for proper rendering; this is consistent with how other interactive embeds (Figma, YouTube) are handled
- **Dependencies**: None — uses the existing embeddable infrastructure
