# Result B reference — Jest-style imports (rule OFF)

Typical model output when project testing rules are ignored: explicit **`@jest/globals`**.

## Snippet (colocated as `StatsLayout.test.tsx` next to `StatsLayout.tsx`)

```tsx
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { StatsRow } from "./StatsLayout";

describe("StatsLayout", () => {
  it("renders StatsRow with two columns and two child spans", () => {
    render(
      <StatsRow columns={2}>
        <span>One</span>
        <span>Two</span>
      </StatsRow>,
    );

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
```

## Actual Vitest run in this monorepo (2026-04-04)

The same file was executed as `StatsLayout.rule-b-experiment.test.tsx` under `packages/excalidraw/components/Stats/` and **failed at transform**:

```text
Error: Failed to resolve import "@jest/globals" from ".../StatsLayout.rule-b-experiment.test.tsx". Does the file exist?
```

**Cause:** Jest is not a project dependency; Vitest does not ship `@jest/globals`.
