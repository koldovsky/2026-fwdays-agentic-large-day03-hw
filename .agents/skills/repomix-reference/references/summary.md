This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# Summary

## Purpose

This is a reference codebase organized into multiple files for AI consumption.
It is designed to be easily searchable using grep and other text-based tools.

## File Structure

This skill contains the following reference files:

| File | Contents |
|------|----------|
| `project-structure.md` | Directory tree with line counts per file |
| `files.md` | All file contents (search with `## File: <path>`) |
| `tech-stack.md` | Languages, frameworks, and dependencies |
| `summary.md` | This file - purpose and format explanation |

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: packages/**/*.{ts,tsx}, excalidraw-app/**/*.{ts,tsx}
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Statistics

587 files | 164,419 lines

| Language | Files | Lines |
|----------|------:|------:|
| TypeScript | 310 | 82,118 |
| TypeScript (TSX) | 277 | 82,301 |

**Largest files:**
- `packages/excalidraw/components/App.tsx` (12,818 lines)
- `packages/excalidraw/tests/history.test.tsx` (5,307 lines)
- `packages/excalidraw/subset/woff2/woff2-bindings.ts` (4,049 lines)
- `packages/element/src/binding.ts` (2,940 lines)
- `packages/element/src/linearElementEditor.ts` (2,507 lines)
- `packages/excalidraw/components/icons.tsx` (2,494 lines)
- `packages/element/src/elbowArrow.ts` (2,309 lines)
- `packages/excalidraw/renderer/interactiveScene.ts` (2,090 lines)
- `packages/element/src/delta.ts` (2,066 lines)
- `packages/excalidraw/actions/actionProperties.tsx` (2,043 lines)