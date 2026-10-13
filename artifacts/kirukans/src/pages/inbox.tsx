import { useState } from 'react';
import { useAuth, useClerk, useUser } from '@clerk/react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Mail, RefreshCw, Phone, MessageCircle } from 'lucide-react';
import {
  getGetAdminAccessQueryKey,
  getGetVolunteerInboxQueryKey,
  useGetAdminAccess,
  useGetVolunteerInbox,
  useUpdateEnquiryRead,
} from '@workspace/api-client-react';
import { img } from '@/lib/site-data';

const BASE = import.meta.env.BASE_URL;
const basePath = BASE.replace(/\/$/, '');

type ApiErr = { status?: number; data?: { error?: string } | null; message?: string };
const statusOf = (e: unknown) => (e as ApiErr | null)?.status;
const msgOf = (e: unknown) => {
  const x = e as ApiErr | null;
  return (x?.data && x.data.error) || x?.message || 'Something went wrong.';
};

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-cream border-4 border-plum p-6 md:p-8" role="status">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </div>
  );
}
const btn = 'inline-flex items-center gap-2 rounded-full bg-plum text-sun font-bold px-5 py-2.5 hover:bg-teal hover:text-plum transition-colors disabled:opacity-60';

export default function InboxPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const uid = user?.id ?? 'anon';
  const ready = isLoaded && !!isSignedIn && !!user;

  const access = useGetAdminAccess({
    query: { enabled: ready, queryKey: [...getGetAdminAccessQueryKey(), uid], retry: false, staleTime: 0 },
  });
  const allowed = ready && access.data?.allowed === true;
  const inbox = useGetVolunteerInbox(
    { page },
    {
      query: {
        enabled: allowed,
        queryKey: [...getGetVolunteerInboxQueryKey({ page }), uid],
        refetchInterval: 30000,
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  );
  const toggle = useUpdateEnquiryRead({
    mutation: {
      onSuccess: () => qc.invalidateQueries({ queryKey: getGetVolunteerInboxQueryKey() }),
    },
  });

  const out = () => signOut({ redirectUrl: BASE });
  const accessStatus = access.isError ? statusOf(access.error) : undefined;

  let body: React.ReactNode;
  if (!isLoaded || (ready && access.isLoading)) {
    body = <div className="space-y-3" aria-busy>{[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-2xl bg-plum/10 animate-pulse" />)}</div>;
  } else if (!isSignedIn || accessStatus === 401) {
    body = (
      <Panel title="Sign in to open the inbox">
        <p>This inbox is private to the Kirukans team.</p>
        <a href={`${basePath}/sign-in`} className={btn} data-testid="link-inbox-signin">Sign in</a>
      </Panel>
    );
  } else if (accessStatus === 403 || (access.data && !access.data.allowed)) {
    body = (
      <Panel title="Access denied">
        <p>{user?.primaryEmailAddress?.emailAddress ?? 'This account'} is not authorised to view the volunteer inbox.</p>
        <button className={btn} onClick={out} data-testid="button-inbox-switch">Sign out / switch account</button>
      </Panel>
    );
  } else if (accessStatus === 503) {
    body = (
      <Panel title="Inbox setup pending">
        <p>The administrator email has not been configured on the server yet (INBOX_ADMIN_EMAIL). Once it is set, reload this page.</p>
      </Panel>
    );
  } else if (access.isError) {
    body = (
      <Panel title="Could not check access">
        <p>{msgOf(access.error)}</p>
        <button className={btn} onClick={() => access.refetch()}>Try again</button>
      </Panel>
    );
  } else if (inbox.isLoading || !inbox.data) {
    body = inbox.isError ? (
      <Panel title="Could not load submissions">
        <p>{msgOf(inbox.error)}</p>
        <button className={btn} onClick={() => inbox.refetch()} data-testid="button-inbox-retry">Retry</button>
      </Panel>
    ) : (
      <div className="space-y-3" aria-busy>{[0, 1, 2, 3].map((i) => <div key={i} className="h-20 rounded-2xl bg-plum/10 animate-pulse" />)}</div>
    );
  } else {
    const d = inbox.data;
    const pages = Math.max(1, Math.ceil(d.total / d.pageSize));
    body = (
      <>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-plum text-sun font-bold px-4 py-1.5" data-testid="text-inbox-total">{d.total} total</span>
          <span className="rounded-full bg-tangerine text-plum font-bold px-4 py-1.5" data-testid="text-inbox-unread">{d.unreadCount} unread</span>
          <button className={`${btn} ml-auto`} onClick={() => inbox.refetch()} disabled={inbox.isFetching} data-testid="button-inbox-refresh">
            <RefreshCw className={`size-4 ${inbox.isFetching ? 'animate-spin' : ''}`} aria-hidden /> Refresh
          </button>
        </div>
        {inbox.isError && <p role="alert" className="mt-3 font-semibold text-destructive">Refresh failed: {msgOf(inbox.error)}</p>}
        {toggle.isError && <p role="alert" className="mt-3 font-semibold text-destructive">Could not update: {msgOf(toggle.error)}</p>}
        {d.items.length === 0 ? (
          <div className="mt-6 rounded-3xl border-4 border-dashed border-plum/40 p-10 text-center">
            <p className="font-hand text-3xl">Nothing here yet</p>
            <p>New volunteer interest will appear as soon as someone signs up.</p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {d.items.map((it) => {
              const unread = !it.readAt;
              const busy = toggle.isPending && toggle.variables?.id === it.id;
              return (
                <li key={it.id} className={`rounded-2xl border-4 border-plum p-4 flex flex-wrap items-center gap-3 ${unread ? 'bg-sun/60' : 'bg-cream'}`} data-testid={`row-enquiry-${it.id}`}>
                  <div className="min-w-0 flex-1 basis-56">
                    <p className="font-extrabold truncate">{unread && <span className="mr-2 text-xs rounded-full bg-plum text-sun px-2 py-0.5 align-middle">NEW</span>}{it.name}</p>
                    {it.email && <p className="truncate text-sm" data-testid={`text-enquiry-email-${it.id}`}>{it.email}</p>}
                    {it.phone && <p className="text-sm" data-testid={`text-enquiry-phone-${it.id}`}>{it.phone}</p>}
                    <p className="text-xs text-plum/70">{new Date(it.createdAt).toLocaleString()}</p>
                  </div>
                  {it.email && <a href={`mailto:${it.email}?subject=${encodeURIComponent('Volunteering with Kirukans')}`} className={btn} data-testid={`link-reply-${it.id}`}>
                    <Mail className="size-4" aria-hidden /> Reply
                  </a>}
                  {it.phone && <>
                    <a href={`https://wa.me/${it.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className={btn} data-testid={`link-whatsapp-${it.id}`}>
                      <MessageCircle className="size-4" aria-hidden /> WhatsApp
                    </a>
                    <a href={`tel:${it.phone}`} className={btn} data-testid={`link-call-${it.id}`}>
                      <Phone className="size-4" aria-hidden /> Call
                    </a>
                  </>}
                  <button
                    disabled={busy}
                    onClick={() => toggle.mutate({ id: it.id, data: { read: unread } })}
                    className="rounded-full border-4 border-plum px-4 py-2 font-bold hover:bg-plum hover:text-sun transition-colors disabled:opacity-60"
                    data-testid={`button-toggle-read-${it.id}`}
                  >
                    {busy ? 'Saving...' : unread ? 'Mark read' : 'Mark unread'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-6 flex items-center justify-between">
          <button className={btn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} data-testid="button-inbox-prev">Newer</button>
          <span className="font-semibold">Page {Math.min(page, pages)} of {pages}</span>
          <button className={btn} disabled={page >= pages} onClick={() => setPage((p) => Math.min(pages, p + 1))} data-testid="button-inbox-next">Older</button>
        </div>
      </>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-sun text-plum">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="flex items-center justify-between gap-3">
          <a href={BASE} className="inline-flex items-center gap-2 font-bold hover:underline" data-testid="link-inbox-home">
            <ArrowLeft className="size-4" aria-hidden /> Back home
          </a>
          <img src={img('kirukans-logo.png')} alt="Kirukans" className="h-12 w-auto" />
        </div>
        <p className="mt-6 font-hand text-3xl">Staff only</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Volunteer inbox</h1>
          {ready && (
            <button onClick={out} className="text-sm font-bold underline" data-testid="button-inbox-signout">Sign out</button>
          )}
        </div>
        <div className="mt-8">{body}</div>
        {inbox.isFetching && !inbox.isLoading && <Loader2 className="sr-only" aria-hidden />}
      </div>
    </main>
  );
}
