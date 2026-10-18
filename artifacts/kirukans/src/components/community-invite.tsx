import { ArrowUpRight, MessageCircle } from 'lucide-react';

function communityInvite(): string | null {
  const value = import.meta.env.VITE_WHATSAPP_COMMUNITY_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'chat.whatsapp.com'
      && !url.username && !url.password && /^\/[A-Za-z0-9]{12,80}\/?$/.test(url.pathname)
      ? url.href : null;
  } catch { return null; }
}

export default function CommunityInvite() {
  const invite = communityInvite();
  const button = 'mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-plum text-sun px-5 py-3 font-bold';
  return (
    <div className="mt-7 border-t-2 border-plum/15 pt-5" data-testid="community-invite">
      <h4 className="flex items-center gap-2 text-lg font-extrabold">
        <MessageCircle className="size-5" aria-hidden /> Stay connected with Kirukans
      </h4>
      <p className="mt-2 text-sm text-plum/75">
        Get community updates and volunteer opportunities on WhatsApp. Joining is optional and separate from the volunteer form.
      </p>
      {invite ? (
        <a href={invite} target="_blank" rel="noopener noreferrer" className={`${button} hover:bg-teal hover:text-plum transition-colors`} data-testid="link-whatsapp-community">
          Join our WhatsApp community <ArrowUpRight className="size-4" aria-hidden />
        </a>
      ) : (
        <>
          <button type="button" disabled className={`${button} opacity-50 cursor-not-allowed`} aria-describedby="community-pending" data-testid="button-community-pending">
            Join our WhatsApp community
          </button>
          <p id="community-pending" className="mt-2 text-xs text-plum/70">Community invite coming soon. The link is not available yet.</p>
        </>
      )}
      <p className="mt-3 text-xs text-plum/70">Submitting the volunteer form does not add you to WhatsApp. You choose whether to join through the invite.</p>
    </div>
  );
}
