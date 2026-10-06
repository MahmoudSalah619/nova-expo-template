# Agent Source of Truth

- Canonical rules, skills, and commands live in `.agents/`.
- One command per script in `scripts/` lives in `.agents/commands/`.
- `.agent/`, `.claude/`, `.cursor/`, `.codex`, and `.windsurf/` mirror via lightweight pointer files.
- Mirrored rules in `.agent/rules/`, `.claude/rules/`, `.codex/rules/`, and `.cursor/rules/` are relative symlinks to
  `../../.agents/rules/<rule>.mdc`. Edit a rule only under `.agents/rules/`; when renaming or removing a mirrored rule,
  update the symlink in every mirror so none dangle (`find .agent .claude .codex .cursor -xtype l` must print nothing).
