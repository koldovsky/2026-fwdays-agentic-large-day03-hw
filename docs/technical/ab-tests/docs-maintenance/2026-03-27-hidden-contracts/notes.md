# Notes

## Goal

See whether `.cursor/rules/docs-maintenance.mdc` pushes the model toward **explicit Memory Bank vs technical layering**, **enumerated update targets**, **required task wrap-up fields**, and **anti-duplication rules** when the user confirms hidden contracts (snapshot state machine, clipboard same-tick timing) and asks how docs should change—without editing code.

## Signals in A (OFF)

- Frames guidance as generic “architecture / contributor notes / optional handbook” without tying triggers to the rule’s **“hidden runtime contract confirmed”** language.
- Does not systematically map findings to `docs/memory/*` vs `docs/technical/*` vs `docs/decisions/*`.
- Does not require the **four-part completion report** (code changed / docs changed / gaps / uncertainty).
- Explicitly lists “what I’m not specifying” (paths, ADRs, templates)—i.e. leaves repo doc discipline underspecified.

## Signals in B (ON)

- Treats the confirmation as an immediate **documentation maintenance obligation**, not optional narrative.
- Uses a **table of doc targets** aligned with the rule (`activeContext`, `systemPatterns`, `undocumented-behaviors`, `architecture`, product/decisions/progress where applicable).
- Reinforces **layering**: memory = short stable summary; technical = canonical deep detail; patterns file for archaeology heuristics.
- Restates **Do not** behaviors: no chat-only truth, no duplicate canonical explanations, avoid deep detail in memory unless operationally critical.
- Ends with explicit **no code changes** acknowledgment consistent with the prompt.

## Comparison

- **What changed**: Result B institutionalizes this repo’s documentation policy (targets, triggers, layering, completion checklist) instead of giving high-level writing advice.
- **What improved**: Clearer, reviewable plan for where to record snapshot vs clipboard contracts; reduces risk of duplicating long explanations across files.
- **What stayed weak**: Neither run performs the actual doc edits (prompt forbade code; implied doc edits are advisory only). Both could still drift if the writer over-edits `architecture.md` without touching anchors.
- **Rule visible effect**: Yes—ON output is materially closer to `docs-maintenance.mdc` obligations than OFF.

## Verdict

effective

## Next step

- If desired, run `update_rule_validation.py` with `--result effective` after human skim of A/B raw text.
- Optionally tighten `docs-maintenance.mdc` to name `undocumented-behaviors.md` / `systemPatterns.md` explicitly (currently grouped under `docs/technical/*` and memory paths).
