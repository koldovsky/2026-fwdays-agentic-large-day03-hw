---
name: codebase-explore
description: Read-only exploration of an unfamiliar area of the Excalidraw monorepo — map files, data flow, and dependencies before changing code. Use when the user says explore, investigate, or asks how X works.
---

# Skill: Codebase Explorer

## When to use

When you need to understand an unfamiliar area of the codebase.
Triggered by: "explore", "investigate", "how does X work?"

## Inputs

- Area of interest (module, feature, file pattern)

## Steps

1. Identify relevant directory/files using `@folder` or codebase-wide search for the feature.
2. Read README or top-level comments in the area.
3. Map the key files and their responsibilities.
4. Trace data flow: entry point → processing → output.
5. Identify dependencies (imports from other `packages/*` workspaces).
6. Document findings in a summary.

## Outputs

- Summary: purpose, key files, data flow, dependencies
- List of related files for deeper investigation

## Safety

- READ-ONLY — do not modify any files during exploration
- Verify findings against actual code, not assumptions
