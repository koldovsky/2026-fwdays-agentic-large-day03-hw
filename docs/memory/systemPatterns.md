# System Patterns

Operational map of stable system behavior. Keep this file short; put deep analysis in technical docs.

## Core patterns

- **App orchestrator**: `packages/excalidraw/components/App.tsx` coordinates lifecycle, scene/app-state integration, action application, rendering, and API exposure.
- **Action pipeline**: actions produce `ActionResult`; `App` applies scene/app-state/file changes and forwards capture intent to `Store`.
- **Store + History contract**: `Store` emits increments; `History` records durable ones for undo/redo; commit keeps store view aligned with scene/app-state.
- **Two state layers**: React `AppState` tracks UI/editor flags; scene structures remain the authoritative element graph.

## Snapshot behavior (operational summary)

- `CaptureUpdateAction` is a 3-mode contract, not a boolean flag.
- Preserve current semantics:
  - `IMMEDIATELY` => durable increment + snapshot advance
  - `NEVER` => ephemeral increment + snapshot advance
  - `EVENTUALLY` => ephemeral increment + snapshot hold
- Preserve precedence: `IMMEDIATELY > NEVER > EVENTUALLY`.
- Preserve micro-vs-macro distinction (`updateScene()` micro scheduling vs macro scheduling).
- Preserve retained deleted elements in snapshot where history/diff fallback depends on baseline retention.

### Safe refactor boundary

- **Safe**: extract helpers, improve naming/comments, add focused tests, clarify docs.
- **Unsafe without intentional redesign**: changing snapshot-advance rules, action precedence, stale-baseline dedupe policy, or micro-vs-macro comparison semantics.

Detailed evidence and edge cases:
- [Capture Snapshot Update State Machine](../technical/undocumented-behaviors.md#capture-snapshot-update-state-machine)
- [Stale Baseline Plus Dedupe Is a Behavioral Contract](../technical/code-archaeology-patterns.md#stale-baseline-plus-dedupe-is-a-behavioral-contract)
- [Micro vs Macro Actions Can Carry Different Semantics](../technical/code-archaeology-patterns.md#micro-vs-macro-actions-can-carry-different-semantics)

## Timing-sensitive behavior

- Clipboard paste handling has same-tick/same-frame constraints in browser event flow.
- Treat timing assumptions as behavioral contracts during refactors.
- Details: [Clipboard Paste Timing Constraint](../technical/undocumented-behaviors.md#clipboard-paste-timing-constraint)

## Text hyperlinks (canvas)

- Markdown `[label](url)` is parsed on submit into stored `text = label` plus `element.link` (`parseMarkdownLink` in `@excalidraw/common`, wiring in `App.tsx`).
- Canvas/SVG styling and URL resolution go through `packages/element/src/textHyperlink.ts` (`getTextHyperlinkRenderState`, `getTextHyperlinkUrl`).
- When the text element is **not** selected, `isPointHittingLink` treats the text bbox as the link target for pointer hits (`packages/excalidraw/components/hyperlink/helpers.ts`). Rationale: [`decisionLog.md`](decisionLog.md) (2026-04).

## Related docs

- Architecture details: [`../technical/architecture.md`](../technical/architecture.md)
- Product intent and UX: [`productContext.md`](productContext.md), [`../product/ux-patterns.md`](../product/ux-patterns.md)
- Tooling/versions: [`techContext.md`](techContext.md)
