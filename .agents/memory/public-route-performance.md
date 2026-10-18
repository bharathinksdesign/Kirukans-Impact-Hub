---
name: Public-route performance
description: Keep heavyweight authentication code off public routes unless a page actually needs it.
---

Kirukans public pages should not load Clerk. Keep the authentication provider limited to sign-in, sign-up, and private inbox routes while preserving shared query state where needed.

**Why:** The mobile performance trace showed authentication code and its third-party resources loading on the public homepage even though only private routes use them.

**How to apply:** When changing authentication or routing, verify that public routes make no Clerk requests and that sign-in, sign-up, and inbox routes still mount the provider.
