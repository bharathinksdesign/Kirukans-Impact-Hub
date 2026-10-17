# Hostinger deployment

This repository is a pnpm monorepo. Deploy the repository root, not only
`artifacts/kirukans`. The Hostinger environment must be able to run a persistent
Node.js API process (Node.js 22 or newer). Static-only hosting can serve the
frontend but cannot run the API required for donations, volunteer enquiries, or
the private inbox.

## Build and start

From the repository root:

```sh
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install --frozen-lockfile
pnpm run build:hostinger
pnpm run start:hostinger
```

Configure Hostinger to run `pnpm run start:hostinger` and pass its assigned
`PORT` environment variable through to the app. The start command serves the
built website and API from one Node.js process. `BASE_PATH=/` is set for the
production build, and the start command enables the Hostinger-specific runtime
without changing the Replit workflows.

## Host environment variables

Set values in Hostinger's private environment-variable settings, not in Git:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string. Keep this database private and use the provider's TLS options where required. |
| `CLERK_PUBLISHABLE_KEY` | Publishable key for an external Clerk application, used by the API. |
| `CLERK_SECRET_KEY` | Secret key for that external Clerk application. |
| `VITE_CLERK_PUBLISHABLE_KEY` | The same external Clerk publishable key, available during the frontend build. `VITE_` values are included in browser assets and must never contain a secret. |
| `STRIPE_SECRET_KEY` | Stripe secret key for the Stripe account used by donations. |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for the webhook configured below. |
| `PUBLIC_APP_URL` | The canonical HTTPS origin, for example `https://your-domain.example` (no path). Used to validate donation requests and redirects. |
| `INBOX_ADMIN_EMAIL` | Email address of the authorized inbox administrator in the external Clerk application. |
| `VITE_WHATSAPP_COMMUNITY_URL` | Optional public WhatsApp community link, if the site uses one. |
| `PORT` | Assigned by the hosting platform. Do not hard-code it. |

The current Clerk setup is managed by Replit and cannot be used on an external
host. Create/configure an external Clerk application, use its keys above, and
add the production domain and redirect URLs in that Clerk application. The
build command disables the Replit Clerk proxy for this deployment. Clerk users
are not transferred by this code deployment; plan any account transition
separately.

## Database setup and existing data

Create a PostgreSQL database and set `DATABASE_URL`. For a new, empty database,
run the application schema setup once from the repository root:

```sh
pnpm --filter @workspace/db run push
```

Do not use the force-push script against a populated database. The Stripe sync
schema is initialized by the API at startup. If moving an existing live site,
back up and restore its PostgreSQL data separately; Git contains the schema and
application code, not volunteer enquiries or other database records.

## Stripe webhook

Use the same Stripe account if you want the existing donation products and
payment history to remain available. In that account, add a webhook endpoint at:

```text
https://your-domain.example/api/stripe/webhook
```

Select the event types required by the installed `stripe-replit-sync` package,
or select all events (the package's `enabled_events: ['*']` configuration), then
save its signing secret as `STRIPE_WEBHOOK_SECRET`. The Hostinger runtime does
not create a Stripe webhook automatically. The database is required for the API
to start. If the database is available but Stripe keys, the webhook secret, or
the public URL are missing or invalid, donations remain unavailable while the
public site and non-donation API can still start.

## Before switching traffic

1. Confirm the selected Hostinger plan can run a long-lived Node.js 22+ process
   and supports the required pnpm install/build/start commands.
2. Provision the external PostgreSQL and Clerk services and set their values
   securely in Hostinger.
3. Back up/migrate existing database records separately.
4. Configure the Stripe webhook and verify a test-mode donation and webhook
   before switching to live keys or pointing the public domain here.
5. Set the domain's HTTPS and make `PUBLIC_APP_URL` match the canonical origin.
