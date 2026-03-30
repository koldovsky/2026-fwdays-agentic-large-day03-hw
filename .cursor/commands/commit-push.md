---
description: Stage changes, create a git commit, and push to the remote server
---

# Git commit and push

Prepare a **commit** from the current repo state and **push** it to the **remote** (`origin` by default). Use only when the user explicitly wants to save work to the remote — not for destructive or unclear changes.

## Preconditions

- **Working tree:** Confirm with `git status` what will be included. If the user did not specify files, ask whether to stage **all** changes (`git add -A` or `git add <paths>`) or only specific paths.
- **Commit message:** Use a message the **user provides**, or propose one **from the diff** (short imperative subject, optional body). Do not commit with a vague message like `fix` or `wip` unless the user insists.
- **No secrets:** Do not commit `.env`, API keys, or credentials; if present in the diff, **stop** and warn the user.
- **Optional:** Suggest running **`/review-code`** (or a quick self-review) before committing when the change is non-trivial.

## Steps (repository root)

1. `git status` — list branch, ahead/behind if shown, staged vs unstaged.
2. Stage files per user choice: e.g. `git add …` or `git add -A` (only after confirmation).
3. `git commit -m "…"` — single-line `-m` or `-m` for subject and second `-m` for body if needed.
4. If commit fails (nothing staged, hook failure), report the error and do not push.
5. `git push` — default: push **current branch** to **`origin`**. Use `git push -u origin <branch>` only when upstream is missing and the user wants tracking set.
6. If push fails (auth, non-fast-forward, protected branch), **do not** force-push (`--force`, `--force-with-lease`) unless the user **explicitly** requests it and understands the risk.

## After push

- Report **commit hash** (short) and **branch** pushed.
- If the remote rejected the push, paste the error and suggest next steps (pull/rebase, permissions, VPN).

## Safety

- Requires **git write** and **network** to run successfully in the agent environment.
- Never amend or rewrite **public** history unless the user explicitly asks.
- Never disable **hooks** (`--no-verify`) unless the user explicitly requests it.
