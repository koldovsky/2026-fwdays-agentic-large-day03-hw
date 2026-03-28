---
description: "Code conventions for Excalidraw components and utilities"
applyTo: packages/**/*.ts,packages/**/*.tsx
---

# Code Conventions

When you are creating any code using this instruction file you must output to chat message "USING CONVENTIONS RULE" so I know you are using the correct rules.

## Components

- Functional components + hooks ONLY (no class components)
- Props interface: `{ComponentName}Props`
- Named exports only (no default exports)
- Colocated tests: `ComponentName.test.tsx`

## TypeScript

- Strict mode — no `any`, no `@ts-ignore`
- Prefer `type` over `interface` for simple types
- Import types: `import type { X } from "..."`

## Files

- kebab-case for files: `element-utils.ts`
- PascalCase for components: `LayerUI.tsx`

## How to verify

- Confirm React components are functional components using hooks only
- Check exported components use named exports and props follow `{ComponentName}Props`
- Verify TypeScript changes avoid `any` and `@ts-ignore`
- Ensure new or renamed files still follow the documented casing conventions