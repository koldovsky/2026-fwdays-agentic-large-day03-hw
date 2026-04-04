---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - issue: https://github.com/excalidraw/excalidraw/issues/10819
  - local: packages/element/src/embeddable.ts
  - local: packages/element/tests/embeddable.test.ts
workflowType: 'prd'
documentCounts:
  productBriefs: 0
  research: 1
  brainstorming: 0
  projectDocs: 2
---

# Product Requirements Document - Add TikTok Embedding Support

**Author:** VK
**Date:** 2026-04-04
**Project:** Excalidraw
**Source Issue:** https://github.com/excalidraw/excalidraw/issues/10819

## Executive Summary

Excalidraw supports embeddable content from a curated set of providers. TikTok video URLs are rejected by default today, which blocks a common reference workflow for educational, tutorial, and presentation content. Users currently see the existing validation error instead of a working embed.

The product outcome is not "add two domains to a whitelist." The outcome is "users can paste a standard public TikTok video URL and get a working embeddable element." Existing Excalidraw behavior already normalizes several providers into provider-specific embed URLs. TikTok support should follow the same principle if direct TikTok post pages are not frameable.

Target users are educators, presenters, researchers, designers, and product teams who use Excalidraw to reference public video content inside diagrams. This change improves parity with other supported video providers and removes a manual workaround where users must download and re-upload content.

## Success Criteria

1. A canonical public TikTok video URL validates under Excalidraw's default embeddable rules.
2. Pasting or inserting a supported TikTok URL no longer triggers "Embedding this url is currently not allowed."
3. A supported TikTok URL renders as a working embeddable element for public videos during manual verification.
4. Existing embeddable providers continue to pass current automated tests with no behavioral regressions.
5. Automated tests cover TikTok validation and TikTok URL-to-embed normalization.

## Product Scope

### MVP

- Support public TikTok video page URLs on `tiktok.com` and `www.tiktok.com`.
- Accept canonical video URLs in the format `https://www.tiktok.com/@{creator}/video/{videoId}`.
- Convert supported TikTok page URLs into an official TikTok embeddable player URL when required for rendering.
- Preserve current Excalidraw embed flows: paste, link edit, and embeddable insertion.
- Add automated coverage for validation and embed-link generation.

### Growth

- Support additional TikTok URL variants such as short/share links if demand is confirmed.
- Support TikTok creator profile embeds.
- Support pasting TikTok oEmbed markup if Excalidraw expands rich provider parsing.

### Vision

- Establish a repeatable provider-onboarding pattern for embeddable services that separates accepted user-facing URLs from provider-specific render URLs.

## User Journeys

### Journey 1: Paste a TikTok video URL into the canvas

User has a public TikTok video URL. User pastes the URL into Excalidraw. Excalidraw recognizes the URL as embeddable, creates an embeddable element, and renders a working TikTok player without showing the whitelist rejection error.

### Journey 2: Insert a TikTok URL through the embeddable flow

User adds or edits an embeddable element and enters a supported TikTok video URL. Validation passes immediately, the link is accepted, and the element renders the TikTok content using the same interaction model as other supported video providers.

### Journey 3: Use default library behavior in downstream apps

An integrator uses `@excalidraw/excalidraw` without a custom `validateEmbeddable` override. A supported TikTok video URL is accepted by the default validator and rendered without requiring app-specific configuration.

## Domain Requirements

No industry-specific regulatory requirements apply. The implementation must use only TikTok's public web embed surface and remain aligned with TikTok's documented embed patterns and publicly accessible content constraints.

## Innovation Analysis

This is a parity and friction-reduction feature, not a new workflow. The innovation is consistency: TikTok should behave like other first-class video providers already supported by Excalidraw. Users should not need to understand provider-specific embed mechanics to reference a public video inside a diagram.

## Project-Type Requirements

- The change must live in shared monorepo library behavior, primarily under `packages/element`, not as app-only logic.
- The change must not introduce a breaking API change for `validateEmbeddable` or `renderEmbeddable`.
- The default behavior must remain usable by self-hosted and embedded consumers of `@excalidraw/excalidraw`.
- The implementation must follow existing TypeScript and monorepo testing conventions.

## Functional Requirements

FR1. Excalidraw shall accept canonical public TikTok video URLs from `tiktok.com` and `www.tiktok.com` under the default embeddable validator.

FR2. Excalidraw shall recognize TikTok video URLs containing the canonical `/@{creator}/video/{videoId}` path shape.

FR3. Excalidraw shall derive a renderable embed target from a supported TikTok video URL. If direct TikTok page URLs are not suitable for iframe rendering, Excalidraw shall transform them into TikTok's official player URL using the extracted `videoId`.

FR4. Excalidraw shall preserve existing embeddable insertion flows for TikTok URLs, including paste-based detection and explicit embeddable/link editing flows.

FR5. Excalidraw shall keep current custom validation behavior intact. Apps that provide their own `validateEmbeddable` logic shall continue to override or extend default behavior as they do today.

FR6. Excalidraw shall reject unsupported TikTok inputs in MVP, including malformed video URLs, non-video TikTok pages, and any private or unavailable content that cannot be rendered through TikTok's public embed surface.

FR7. Excalidraw shall provide automated test coverage for at least:
- one accepted canonical TikTok URL,
- one accepted `www.tiktok.com` variant,
- one rejected malformed or unsupported TikTok URL,
- one normalization case that produces the expected TikTok player URL.

FR8. If repository release practice requires it, the product change shall be reflected in the relevant changelog or release notes entry for embeddable provider additions.

## Non-Functional Requirements

NFR1. TikTok URL validation and normalization shall run in the existing synchronous client-side validation path with no network calls.

NFR2. The feature shall introduce no new runtime dependency and no server-side component.

NFR3. Existing embeddable behavior for non-TikTok providers shall remain unchanged.

NFR4. TikTok support shall rely on officially documented public TikTok embed/player URL patterns available as of April 4, 2026.

NFR5. The editor shall fail gracefully if a specific TikTok asset cannot render, matching existing embeddable failure behavior and without crashing the editor.

NFR6. New and existing tests for embeddable validation and embed-link generation shall pass in CI.

NFR7. The implementation shall remain compatible with current strict TypeScript checks and existing package boundaries in the monorepo.
