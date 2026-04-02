---
name: codebase-explore
description: >-
  Explores unfamiliar areas of the codebase in read-only mode: maps modules, traces data flow, and lists dependencies.
  Use when the user wants to explore or investigate the repo, or asks how a feature or subsystem works (triggers: explore,
  investigate, "how does X work").
---

# Codebase explorer

## When to use

Unfamiliar code areas, features, or modules. Typical triggers: **explore**, **investigate**, **how does X work?**

## Inputs

- Area of interest: module, feature, or file pattern (from the user or inferred).

## Steps

1. Identify relevant directories and files using `@folder` or `@codebase` when the user provides them, plus search or semantic exploration as needed.
2. Read README or top-level comments in that area when present.
3. Map key files and each file’s responsibility.
4. Trace data flow: entry point → processing → output.
5. Note dependencies (imports from other packages or internal modules).
6. Produce the outputs below.

## Outputs

- **Summary:** purpose, key files, data flow, dependencies.
- **Related files:** a short list for deeper follow-up.

## Safety

- **READ-ONLY** — do not create, edit, or delete files during exploration.
- Ground statements in the actual code; avoid guessing.
