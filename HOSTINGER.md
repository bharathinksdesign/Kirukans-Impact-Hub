# Hostinger deployment

This repository is a pnpm monorepo. Deploy the repository root, not only
`artifacts/kirukans`. The Hostinger environment must be able to run a persistent
Node.js API process (Node.js 22 or newer). Static-only hosting can serve the
frontend but cannot run the API required for volunteer enquiries or the private
inbox.

The root intentionally does not pin `packageManager`: Hostinger supplies pnpm
11.24.0 through Corepack, and its build environment does not switch to a
different version declared by the project.

## Build and start

From the repository root:

```sh
corepack enable
corepack prepare pnpm@11.24.0 --activate
pnpm install --frozen-lockfile
pnpm run build:hostinger
pnpm start
```

The root `start` script now points to the Hostinger runtime. Configure Hostinger
to run `pnpm start` and pass its assigned
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

Do not use the force-push script against a populated database. If moving an
existing live site, back up and restore its PostgreSQL data separately; Git
contains the schema and application code, not volunteer enquiries or other
database records.

## Before switching traffic

1. Confirm the selected Hostinger plan can run a long-lived Node.js 22+ process
   and supports the required pnpm install/build/start commands.
2. Provision the external PostgreSQL and Clerk services and set their values
   securely in Hostinger.
3. Back up/migrate existing database records separately.
4. Verify the public site, volunteer enquiry flow, and private inbox before
   pointing the public domain here.
5. Set up HTTPS for the domain.
