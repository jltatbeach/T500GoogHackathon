# Discovery: Task completion wrapper expects TODO-* IDs

**Date:** 2026-06-20  
**Context:** `TASK-001-1` completion during `EPIC-001`

## Finding

The shared Smart Assets `task-complete.sh` wrapper rejects this repository's
current task ID format (`TASK-001-1`) with:

```text
Error: target must start with TODO- or EPIC-
```

`docs/ToDos.md` uses `TASK-*` IDs inside epics, while the wrapper currently
expects `TODO-*` for task targets.

## Impact

For now, task completion for nested `TASK-*` items must be recorded manually in
`docs/ToDos.md`, or the repository should standardize task IDs to the wrapper's
`TODO-*` format.

## Recommendation

Before relying on `/task-complete` for this repo, choose one path:

1. Rename task IDs in `docs/ToDos.md` from `TASK-*` to `TODO-*`; or
2. Update the shared wrapper to accept `TASK-*` aliases in addition to `TODO-*`.
