---
name: code-review
description: "Code review assistant"
---

# Excalidraw Code Review Instructions

## Purpose
This instruction set defines a repeatable, actionable code review process for Excalidraw contributors. It ensures code quality, maintainability, and alignment with project standards.

## When to Use
Run this review for every pull request or major code change before merging to `main` or any release branch.

## Review Checklist

1. **Clarity & Purpose**
  - Does the code clearly state its intent (via comments, naming, and structure)?
  - Is the purpose of new/changed files and functions obvious?

2. **Excalidraw Conventions**
  - Are all [Excalidraw coding standards](./copilot-instructions.md) followed (naming, TypeScript, React, error handling, etc.)?
  - Are architectural boundaries respected (e.g., no app logic in packages/excalidraw, no direct DOM access in core packages)?

3. **Real, Recurring Problem**
  - Does the change address a real, recurring need or bug (not a hypothetical or one-off case)?
  - Is there a clear link to a user story, bug report, or product requirement?

4. **Specificity & Usefulness**
  - Are the changes specific to Excalidraw’s domain and workflows?
  - Is the solution practical and maintainable for the team?

5. **Testing & Safety**
  - Are there relevant tests (unit, integration, or e2e) for new/changed logic?
  - Does `yarn test:update` and `yarn test:typecheck` pass?

6. **Performance & Security**
  - Are there any obvious performance or security issues introduced?
  - Are resource-intensive operations justified and optimized?

## Review Process

1. Read the PR description and linked issues.
2. Review the code using the checklist above.
3. Leave actionable comments for any issues found.
4. Approve only if all checklist items are satisfied.

---
**Note:** These instructions are specific to Excalidraw and should be updated as the project evolves.
