## Project Rules

- Always use `bun` instead of `node` or `npm`
- The dev server runs at `/`, but build and preview run at `/wishlist/`. Check base-path behavior with `bun run build` and `bun run preview`, not the dev server.
- `bun test` checks the prerendered `build/index.html`, so run `bun run build` first

## UI Rules

- Maximize TailwindCSS usage and minimize Vanilla CSS usage unless there is a situation that cannot be modeled by TailwindCSS
- Reach for `shadcn-svelte` components first before making your own
- Reach for variables defined in @src/routes/layout.css first
- Never make your own colors for UI. Always use theme variables defined in @src/routes/layout.css

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
