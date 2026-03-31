# Proposal: HTML Hyperlinks in Text Elements

## Why
Excalidraw text elements currently render [label](url) as plain text.
Users need clickable hyperlinks for knowledge sharing and documentation.

## What
Add markdown link detection and rendering in text elements.
Links should be clickable, styled distinctly, and open in new tabs.

## Impact
- Text rendering pipeline: MODIFIED (link detection + styled render)
- Event handling: MODIFIED (click handler for links)
- Element types: UNCHANGED (no new element types)
- Existing behavior: PRESERVED (plain text without links unchanged)

## Risks
- XSS via malicious URLs — mitigate with URL validation
- Performance for text with many links — benchmark required
