# Excalidraw monorepo (workshop fork)

## Stack

- **Runtime:** React 19, TypeScript 5.9
- **Build:** Vite 5, Yarn 1 workspaces
- **Tests:** Vitest, Testing Library (`packages/excalidraw`)

## Layout

| Path | Role |
|------|------|
| `excalidraw-app/` | Web app shell |
| `packages/excalidraw/` | Core editor, TTD / Mermaid UI, clipboard paste |
| `packages/{element,common,math,utils}/` | Shared packages |

## Mermaid → Excalidraw

- Conversion uses **`@excalidraw/mermaid-to-excalidraw`** (npm dependency; not vendored in this repo).
- **Paste:** `packages/excalidraw/components/App.tsx` — dynamic import, `parseMermaidToExcalidraw`, then `convertToExcalidrawElements`.
- **Text-to-diagram:** `packages/excalidraw/components/TTDDialog/common.ts` — `convertMermaidToExcalidraw` calls the same parser API; preview and insert share this path.

## Conventions

- Follow existing patterns in touched files; prefer small, testable helpers when normalizing parsed output.
- Run `yarn test` / targeted packages tests and `yarn build` before PR.
