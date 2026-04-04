# Story 1.1: Accept Canonical TikTok Video URLs by Default

Status: in-progress

## Story

As an Excalidraw user,
I want canonical TikTok video URLs to be accepted by the default embeddable validator,
so that I can use public TikTok video links without whitelist rejection errors.

## Acceptance Criteria

1. Given a canonical TikTok URL on `tiktok.com` using the `/@{creator}/video/{videoId}` path, when the default embeddable validator checks the URL, then the URL is accepted as embeddable and no app-specific configuration is required.
2. Given a canonical TikTok URL on `www.tiktok.com` using the same video path shape, when the default embeddable validator checks the URL, then the URL is accepted as embeddable and the host variant is treated the same as `tiktok.com`.
3. Given a TikTok URL that is malformed or does not represent a canonical video page, when the default embeddable validator checks the URL, then the URL is rejected and unsupported TikTok pages are not accepted by hostname alone.

## Tasks / Subtasks

- [x] Add provider-specific TikTok URL parsing in the shared embeddable layer (AC: 1, 2, 3)
  - [x] Add a TikTok parser in `packages/element/src/embeddable.ts` that accepts only `tiktok.com` and `www.tiktok.com` canonical `/@{creator}/video/{videoId}` URLs.
  - [x] Keep malformed, non-video, and non-canonical TikTok URLs rejected by returning no TikTok match.
  - [x] Preserve existing custom `validateEmbeddable` override behavior and do not broaden `ALLOW_SAME_ORIGIN` or generic hostname allowlists for TikTok in this story.
- [x] Extend automated validation coverage for canonical TikTok URL acceptance and rejection (AC: 1, 2, 3)
  - [x] Add a passing test for canonical `https://tiktok.com/@{creator}/video/{videoId}` acceptance.
  - [x] Add a passing test for canonical `https://www.tiktok.com/@{creator}/video/{videoId}` acceptance.
  - [x] Add rejection coverage for malformed or non-video TikTok URLs so hostname-only acceptance cannot regress.
- [ ] Validate Story 1.1 changes locally (AC: 1, 2, 3)
  - [ ] Run focused tests for `packages/element/tests/embeddable.test.ts`.
  - [x] Record any constraints or follow-up notes needed for Story 1.2 render normalization.

## Dev Notes

- Implement TikTok support in the shared provider layer at `packages/element/src/embeddable.ts`; do not add app-only logic. [Source: `_bmad-output/planning-artifacts/architecture.md` - AD1]
- TikTok must use provider-specific parsing instead of a hostname-only allowlist so unsupported TikTok pages stay rejected. [Source: `_bmad-output/planning-artifacts/architecture.md` - AD2]
- Accept only canonical TikTok video URLs matching `https://tiktok.com/@{creator}/video/{videoId}` and `https://www.tiktok.com/@{creator}/video/{videoId}` in this story. [Source: `_bmad-output/planning-artifacts/architecture.md` - AD2]
- Do not expand sandbox privileges or add TikTok to `ALLOW_SAME_ORIGIN` in this story. [Source: `_bmad-output/planning-artifacts/architecture.md` - AD5]
- Preserve current custom validation behavior intact for consumers that supply `validateEmbeddable`. [Source: `_bmad-output/planning-artifacts/prd.md` - FR5]
- Tests for TikTok validation live in `packages/element/tests/embeddable.test.ts`; keep existing provider behavior unchanged. [Source: `_bmad-output/planning-artifacts/architecture.md` - Test surface]
- Story 1.2 owns URL-to-player normalization and portrait-first embed sizing, so avoid implementing the render conversion in this story unless required to keep Story 1.1 safe and coherent. [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.2]

### Project Structure Notes

- Main implementation surface: `packages/element/src/embeddable.ts`.
- Main automated coverage surface: `packages/element/tests/embeddable.test.ts`.
- App consumers in `packages/excalidraw` rely on the shared validator and should not need direct changes for Story 1.1.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Story 1.1]
- [Source: `_bmad-output/planning-artifacts/prd.md` - FR1, FR2, FR5, FR6, FR7]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - AD1, AD2, AD5, Testing Strategy]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- 2026-04-04: Created Story 1.1 from backlog because `sprint-status.yaml` existed without any story files.
- 2026-04-04: User requested implementation without running tests, so validation remains pending.

### Completion Notes List

- Ultimate context engine analysis completed and story created for developer execution.
- Added provider-specific TikTok canonical URL parsing to the default embeddable validator in `packages/element/src/embeddable.ts`.
- Added TikTok acceptance and rejection coverage in `packages/element/tests/embeddable.test.ts`, but did not execute tests per user request.
- Story 1.2 still needs TikTok render normalization to `https://www.tiktok.com/player/v1/{videoId}` and portrait-first sizing.

### File List

- _bmad-output/implementation-artifacts/1-1-accept-canonical-tiktok-video-urls-by-default.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
- packages/element/src/embeddable.ts
- packages/element/tests/embeddable.test.ts

### Change Log

- 2026-04-04: Created story file from `epics.md`, `prd.md`, and `architecture.md`.
- 2026-04-04: Implemented TikTok canonical URL validation and added unexecuted regression coverage for Story 1.1.
