# Story 2.4: Performance sanity for many text elements and SVG export

Status: done

## Story

As a **maintainer**,
I want **no major perf regression**,
So that **large boards stay usable**.

## Scope

- **Resolver:** smoke test ensures `getResolvedTextPaint` stays cheap when called many times (NFR-oriented guard, not a full benchmark).
- **SVG export:** no baseline timing in CI; full board benchmarks remain manual / future perf tooling.

## Tests

- `packages/element/tests/textPaintResolve.test.ts` — “NFR smoke: many resolutions stay fast”.
