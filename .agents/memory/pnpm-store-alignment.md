---
name: pnpm store alignment
description: Recovery guidance for workspace dependencies linked from a different pnpm store major.
---

The workspace can have `node_modules` linked from pnpm store v11 while the project pins pnpm 10. If `pnpm add` reports `ERR_PNPM_UNEXPECTED_STORE`, realign to the project-pinned pnpm with a frozen install instead of changing the package-manager pin.

**Why:** The installed workspace and pinned package manager can diverge across environment restores, blocking dependency edits.

**How to apply:** Check `pnpm --version` and the store path. When pnpm must recreate `node_modules` in a non-interactive shell, run `CI=true pnpm install --frozen-lockfile` before adding packages.
