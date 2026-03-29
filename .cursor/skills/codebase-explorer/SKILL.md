---
name: codebase-explorer
description: Explores unfamiliar code areas read-only—maps directories, key files, data flow, and cross-package dependencies, then summarizes findings. Use when the user says explore, investigate, how does X work, or wants to understand a module, feature, or file pattern without modifying code.
---

# Skill: Codebase Explorer

## When to use

When you need to understand an unfamiliar area of the codebase.

Triggered by: "explore", "investigate", "how does X work?", or similar.

## Inputs

- Area of interest: module path, feature name, or file pattern (from the user or `@folder` / `@codebase` context)

## Steps

1. **Locate scope** — Identify relevant directories and files (search, glob, or user-attached paths). Prefer narrowing before deep reading. In this monorepo, typical roots are:
   - **`packages/excalidraw/`** — editor library (`@excalidraw/excalidraw`): components, actions, scene, canvas-related logic.
   - **`excalidraw-app/`** — Vite shell: app entry, hosting, collaboration UI, wiring that consumes the library.
   - **`packages/*`** — shared pieces (`common`, `element`, `math`, `utils`) when the question crosses package boundaries.
2. **Read surface docs** — Open `README`, package docs, or top-of-file / module comments in that area when present.
3. **Map responsibilities** — List the main files and one-line roles (what each owns, not every symbol).
4. **Trace data flow** — Follow the path: entry point → processing → output or side effects. For Excalidraw, anchor on these symbols when relevant:
   - **`renderScene`** (and related scene/render code under `packages/excalidraw/scene/`) — canvas render loop and what gets drawn each frame.
   - **`actionManager.dispatch()`** (`packages/excalidraw/actions/` — see `manager.ts` for the action system; read-only exploration only; that file is protected for edits) — how editor commands and state updates flow.
   - **App wiring** — `excalidraw-app/` entry and components that mount the editor; search for handlers tied to **canvas**, **pointer**, or **keyboard** input when debugging interaction.
   **First files to open (examples)** — For “how does drawing hit the canvas?”: locate `renderScene` usage/definition and the main app bootstrap in `excalidraw-app/`. For “how does a menu action update state?”: find the action registration and `dispatch` call sites in `packages/excalidraw/`. Adjust if the user’s question is narrower (e.g. a single component under `packages/excalidraw/components/`).
5. **Dependencies** — List notable imports: other packages in the monorepo, external libs, and config that gates behavior.
6. **Verify** — Tie claims to concrete code (file + symbol or line range). If uncertain, say so and point to what to read next.

## Outputs

Deliver a short summary containing:

- **Purpose** — What this area does in product/engineering terms
- **Key files** — Table or bullets: path → responsibility
- **Data flow** — Entry → steps → exit (bulleted chain)
- **Dependencies** — Internal packages vs external vs config
- **Deeper dive** — Ordered list of files worth opening next for detail work

## Safety

- **READ-ONLY** — Do not create, edit, or delete files during exploration.
- **Evidence-based** — Prefer quoted or cited code over assumptions; flag gaps explicitly.
