---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
inputDocuments:
  - C:\VKProjects\2026-fwdays-agentic-large-day03-hw\_bmad-output\planning-artifacts\prd.md
  - C:\VKProjects\2026-fwdays-agentic-large-day03-hw\_bmad-output\planning-artifacts\architecture.md
---

# 2026-fwdays-agentic-large-day03-hw - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for 2026-fwdays-agentic-large-day03-hw, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Excalidraw shall accept canonical public TikTok video URLs from `tiktok.com` and `www.tiktok.com` under the default embeddable validator.

FR2: Excalidraw shall recognize TikTok video URLs containing the canonical `/@{creator}/video/{videoId}` path shape.

FR3: Excalidraw shall derive a renderable embed target from a supported TikTok video URL. If direct TikTok page URLs are not suitable for iframe rendering, Excalidraw shall transform them into TikTok's official player URL using the extracted `videoId`.

FR4: Excalidraw shall preserve existing embeddable insertion flows for TikTok URLs, including paste-based detection and explicit embeddable/link editing flows.

FR5: Excalidraw shall keep current custom validation behavior intact. Apps that provide their own `validateEmbeddable` logic shall continue to override or extend default behavior as they do today.

FR6: Excalidraw shall reject unsupported TikTok inputs in MVP, including malformed video URLs, non-video TikTok pages, and any private or unavailable content that cannot be rendered through TikTok's public embed surface.

FR7: Excalidraw shall provide automated test coverage for at least one accepted canonical TikTok URL, one accepted `www.tiktok.com` variant, one rejected malformed or unsupported TikTok URL, and one normalization case that produces the expected TikTok player URL.

FR8: If repository release practice requires it, the product change shall be reflected in the relevant changelog or release notes entry for embeddable provider additions.

### NonFunctional Requirements

NFR1: TikTok URL validation and normalization shall run in the existing synchronous client-side validation path with no network calls.

NFR2: The feature shall introduce no new runtime dependency and no server-side component.

NFR3: Existing embeddable behavior for non-TikTok providers shall remain unchanged.

NFR4: TikTok support shall rely on officially documented public TikTok embed/player URL patterns available as of April 4, 2026.

NFR5: The editor shall fail gracefully if a specific TikTok asset cannot render, matching existing embeddable failure behavior and without crashing the editor.

NFR6: New and existing tests for embeddable validation and embed-link generation shall pass in CI.

NFR7: The implementation shall remain compatible with current strict TypeScript checks and existing package boundaries in the monorepo.

### Additional Requirements

- Implement TikTok support in the shared provider layer at `packages/element/src/embeddable.ts`, not in `excalidraw-app/` or UI-specific components.
- Add provider-specific TikTok parsing instead of relying on domain-only allowlisting so unsupported TikTok pages remain rejected.
- Accept only canonical TikTok video URLs matching `https://www.tiktok.com/@{creator}/video/{videoId}` and `https://tiktok.com/@{creator}/video/{videoId}`.
- Extract the TikTok `videoId` and normalize accepted URLs to `https://www.tiktok.com/player/v1/{videoId}` in `getEmbedLink()`.
- Return TikTok embeds as `type: "video"` with portrait-first intrinsic sizing, targeting an initial ratio close to `315x560` unless manual verification shows otherwise.
- Keep TikTok validation in an explicit provider-specific branch in `embeddableURLValidator()` before the generic `ALLOWED_DOMAINS` fallback.
- Keep TikTok normalization in `getEmbedLink()` before generic fallback logic so user-facing URLs remain separate from render URLs.
- Preserve minimal iframe sandbox privileges by not adding TikTok to `ALLOW_SAME_ORIGIN` unless manual verification proves it is required.
- Add automated test coverage in `packages/element/tests/embeddable.test.ts` for acceptance, rejection, normalization, and host variants.
- Manually verify paste flow, hyperlink edit flow, runtime rendering, and export behavior after implementation.
- Ensure the change remains compatible with `App.tsx`, `Hyperlink.tsx`, and `staticSvgScene.ts` without public API changes.
- Update `packages/excalidraw/CHANGELOG.md` only if Excalidraw release practice expects new embeddable providers to be called out.

### UX Design Requirements

No UX design specification was provided for this workflow, so there are no UX-specific extracted requirements at this stage.

### FR Coverage Map

FR1: Epic 1 - Accept canonical TikTok video URLs in the default validator.
FR2: Epic 1 - Recognize the canonical `/@{creator}/video/{videoId}` TikTok path shape.
FR3: Epic 1 - Normalize accepted TikTok URLs to the official TikTok player URL.
FR4: Epic 1 - Preserve paste and embeddable editing flows for TikTok URLs through the shared library path.
FR5: Epic 1 - Preserve custom validation override behavior for downstream apps.
FR6: Epic 1 - Reject malformed, non-video, and otherwise unsupported TikTok inputs in MVP.
FR7: Epic 1 - Add automated coverage for TikTok validation and normalization behavior.
FR8: Epic 1 - Capture changelog or release note updates if Excalidraw release practice requires them.

## Epic List

### Epic 1: Embed Public TikTok Videos in Excalidraw
Users can paste or enter a supported public TikTok video URL and get a working embeddable element through Excalidraw's default shared library behavior, with unsupported TikTok inputs safely rejected and the feature covered by automated verification.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8

## Epic 1: Embed Public TikTok Videos in Excalidraw

Users can paste or enter a supported public TikTok video URL and get a working embeddable element through Excalidraw's default shared library behavior, with unsupported TikTok inputs safely rejected and the feature covered by automated verification.

### Story 1.1: Accept Canonical TikTok Video URLs by Default

As an Excalidraw user,
I want canonical TikTok video URLs to be accepted by the default embeddable validator,
So that I can use public TikTok video links without whitelist rejection errors.

**Acceptance Criteria:**

**Given** a canonical TikTok URL on `tiktok.com` using the `/@{creator}/video/{videoId}` path
**When** the default embeddable validator checks the URL
**Then** the URL is accepted as embeddable
**And** no app-specific configuration is required

**Given** a canonical TikTok URL on `www.tiktok.com` using the same video path shape
**When** the default embeddable validator checks the URL
**Then** the URL is accepted as embeddable
**And** the host variant is treated the same as `tiktok.com`

**Given** a TikTok URL that is malformed or does not represent a canonical video page
**When** the default embeddable validator checks the URL
**Then** the URL is rejected
**And** unsupported TikTok pages are not accepted by hostname alone

### Story 1.2: Render Accepted TikTok URLs as Working Embeds

As an Excalidraw user,
I want supported TikTok video URLs to render as embeddable elements,
So that I can view referenced TikTok content directly inside the canvas.

**Acceptance Criteria:**

**Given** a supported canonical TikTok video URL
**When** Excalidraw generates the render target for the embeddable
**Then** it converts the source URL to `https://www.tiktok.com/player/v1/{videoId}`
**And** the returned embed metadata is suitable for iframe rendering

**Given** a supported canonical TikTok video URL
**When** Excalidraw creates the embeddable metadata
**Then** the embed is marked as `type: "video"`
**And** it uses portrait-first intrinsic sizing appropriate for TikTok content

**Given** a supported TikTok URL used in existing embeddable flows
**When** the URL is pasted or entered into an embeddable element
**Then** the shared library behavior produces a working TikTok embeddable
**And** no public API changes are introduced

### Story 1.3: Preserve Safe Fallbacks and Extension Behavior

As an integrator using Excalidraw's embeddable system,
I want TikTok support to preserve existing fallback and override behavior,
So that new provider support does not break current integrations or unsupported cases.

**Acceptance Criteria:**

**Given** an application that provides its own `validateEmbeddable` behavior
**When** TikTok support is added to the shared default logic
**Then** the custom override behavior continues to work as before
**And** the change does not introduce a breaking API change

**Given** an unsupported or unavailable TikTok URL
**When** a user attempts to embed it
**Then** Excalidraw fails gracefully using existing rejection behavior
**And** the editor does not crash

**Given** the TikTok provider implementation
**When** sandbox settings are evaluated
**Then** TikTok is not granted broader iframe privileges by default
**And** `ALLOW_SAME_ORIGIN` remains unchanged unless manual verification proves it is required

### Story 1.4: Lock the Feature Down with Regression Coverage

As an Excalidraw maintainer,
I want automated coverage and release hygiene for TikTok embedding support,
So that the feature remains stable and visible without regressing existing providers.

**Acceptance Criteria:**

**Given** the TikTok embedding implementation
**When** automated tests run
**Then** they cover an accepted canonical TikTok URL
**And** they also cover an accepted `www.tiktok.com` variant

**Given** the TikTok embedding implementation
**When** automated tests run
**Then** they cover a malformed or unsupported TikTok URL rejection case
**And** they cover normalization to the expected TikTok player URL

**Given** the full embeddable test suite
**When** CI or local verification is executed
**Then** existing non-TikTok provider behavior remains unchanged
**And** TypeScript and test expectations continue to pass

**Given** Excalidraw release practice requires provider additions to be documented
**When** the feature is finalized
**Then** the relevant changelog or release notes entry is updated
**And** no documentation-only work is added if the repo process does not require it
