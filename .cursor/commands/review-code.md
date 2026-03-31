# /review-code

## What this command does

Runs a focused code review for changed files in Excalidraw with priority on regressions, rendering/state risks, and missing verification.

## Usage

- `/review-code`
- `/review-code packages/excalidraw/components`
- `/review-code excalidraw-app`

## Instructions

1. Inspect changed files with emphasis on:
   - `packages/excalidraw/` behavior changes
   - state updates through action flow
   - unsafe API usage or security regressions
2. Return findings sorted by severity:
   - Critical
   - High
   - Medium
   - Low
3. For each finding include:
   - file path
   - impacted behavior
   - concrete fix suggestion
4. If no issues are found, state "No critical findings" and list residual testing gaps.

## Expected result

A concise review report with actionable findings and a short risk summary for the PR.
