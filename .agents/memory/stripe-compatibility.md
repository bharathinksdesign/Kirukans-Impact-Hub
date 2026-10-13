---
name: Stripe integration compatibility
description: Non-obvious connector and migration-template pitfalls for payments in this workspace.
---

A missing credential field in an older Stripe template does not mean the Stripe connection is disconnected.

**Why:** The authorized connector API used a newer credential-settings shape than the supplied template. Reauthorizing or asking the user for keys would not have solved the mismatch.

**How to apply:** Trust integration status and a real authenticated account request. Check credential field names without printing values, and keep credential handling server-side.

The Stripe sync engine can silently skip its SQL migrations when its package-relative migration directory is absent.

**Why:** Bundling the engine into the API output changed its runtime asset location; migration setup appeared to finish, but subsequent account synchronization failed because the managed schema was missing.

**How to apply:** Preserve the sync engine's package-relative SQL assets in deployment builds. Verify the managed schema and catalog query actually work, not just that the migration function returned.
