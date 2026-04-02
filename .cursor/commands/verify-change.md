# verify-change

Verify current changes for this Excalidraw monorepo and report pass/fail clearly.

Run:
1) `yarn test:typecheck`
2) `yarn test:update`
3) `yarn test:all` (if quick checks pass)

If a step fails:
- Stop at the first failing stage
- Explain the root cause concisely
- Propose a minimal fix plan
- If obvious and safe, apply fix and re-run the failed step

Output format:
- Verification summary (pass/fail per step)
- Failures with exact files/errors
- Fixes applied (if any)
- Final status and confidence
