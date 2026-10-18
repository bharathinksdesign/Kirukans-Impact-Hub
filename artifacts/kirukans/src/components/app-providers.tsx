import { lazy, Suspense, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';

const ClerkRouteProvider = lazy(() => import('./clerk-route-provider'));
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function stripBase(path: string): string {
  return basePath && (path === basePath || path.startsWith(`${basePath}/`))
    ? path.slice(basePath.length) || '/'
    : path;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const routePath = stripBase(location);
  const needsClerk =
    routePath === '/admin/inbox' ||
    /^\/(?:sign-in|sign-up)(?:\/|$)/.test(routePath);

  return (
    <QueryClientProvider client={queryClient}>
      {needsClerk ? (
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center bg-cream px-5 text-plum" role="status" aria-live="polite">Loading secure access…</div>}>
          <ClerkRouteProvider>{children}</ClerkRouteProvider>
        </Suspense>
      ) : (
        children
      )}
      </QueryClientProvider>
  );
}
