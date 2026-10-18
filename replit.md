# Kirukans Charitable Trust

A public website for the Trichy creative community that turns art into action through murals, workshops, and community initiatives.

## Run & Operate

- `pnpm --filter @workspace/kirukans run dev` — run the public website through its managed workflow
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

Kirukans' motto is “Madness in Doing Goodness”; its approach is Create, Connect, Contribute.

The user supplied a nine-page pitch deck, a Figma prototype, a Figma media-stack file, and the Kirukans Trust YouTube channel. All nine PDF pages were reviewed as text and rendered images. Figma did not expose the full designs to public retrieval; do not claim that those files have been completely reviewed or reproduced.

Use the user's real project photos and deck-supported stories and impact figures. Do not fabricate beneficiary counts, testimonials, staff names, payment details, or social accounts. The website is informational, with direct phone contact and a link to the supplied YouTube channel; do not add payment processing or simulated form submissions.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
