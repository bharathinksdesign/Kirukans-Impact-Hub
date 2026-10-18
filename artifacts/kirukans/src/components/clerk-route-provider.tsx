import { useEffect, useRef, type ReactNode } from 'react';
import { ClerkProvider, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { CLERK_PALETTE } from '@/lib/brand-palette';
import { img } from '@/lib/site-data';

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL || undefined;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function stripBase(path: string): string {
  return basePath && (path === basePath || path.startsWith(`${basePath}/`))
    ? path.slice(basePath.length) || '/'
    : path;
}

function AuthCacheInvalidator() {
  const { addListener } = useClerk();
  const client = useQueryClient();
  const previousId = useRef<string | null | undefined>(undefined);

  useEffect(
    () =>
      addListener(({ user }) => {
        const id = user?.id ?? null;
        if (previousId.current !== undefined && previousId.current !== id) client.clear();
        previousId.current = id;
      }),
    [addListener, client],
  );

  return null;
}

export default function ClerkRouteProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      signInForceRedirectUrl={`${basePath}/admin/inbox`}
      signUpForceRedirectUrl={`${basePath}/admin/inbox`}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
      localization={{
        signIn: { start: { title: 'Trust team sign in', subtitle: 'Sign in to view the private volunteer inbox' } },
        signUp: { start: { title: 'Create your team account', subtitle: 'Inbox access is limited to the authorized trust administrator' } },
      }}
      appearance={{
        cssLayerName: 'clerk',
        options: {
          logoImageUrl: `${window.location.origin}${img('kirukans-logo-400.webp')}`,
          logoLinkUrl: basePath || '/',
        },
        variables: {
          ...CLERK_PALETTE,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          borderRadius: '1rem',
        },
        elements: {
          rootBox: 'w-full flex justify-center',
          cardBox: 'bg-cream rounded-3xl w-[440px] max-w-full overflow-hidden',
          card: '!shadow-none !border-0 !bg-transparent !rounded-none',
          footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
          formFieldInput: 'border border-plum/20',
          formButtonPrimary: 'bg-plum text-cream',
        },
      }}
    >
      <AuthCacheInvalidator />
      {children}
    </ClerkProvider>
  );
}
