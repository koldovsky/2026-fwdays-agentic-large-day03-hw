# /check-translations

## What this command does

Checks translation impact for UI text changes and ensures locale updates are consistent for Excalidraw app strings.

## Usage

- `/check-translations`
- `/check-translations excalidraw-app`
- `/check-translations packages/excalidraw`

## Instructions

1. Detect modified user-facing strings in UI-related files.
2. Identify whether corresponding translation resources were updated.
3. Flag:
   - missing translation keys
   - changed keys without migration notes
   - hardcoded strings that should be localized
4. Propose minimal fixes (add key, reuse existing key, or update fallback).

## Expected result

A checklist of localization issues with file paths and concrete next actions.
