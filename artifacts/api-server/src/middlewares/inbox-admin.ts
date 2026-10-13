import { clerkClient, getAuth } from '@clerk/express';
import type { RequestHandler } from 'express';

/** Identity alone is insufficient: only the configured verified email can read enquiries. */
export const requireInboxAdmin: RequestHandler = async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: 'Please sign in to access the private inbox.' });
    return;
  }
  const allowedEmail = process.env.INBOX_ADMIN_EMAIL?.trim().toLowerCase();
  if (!allowedEmail) {
    res.status(503).json({ error: 'Inbox administrator access has not been configured yet.' });
    return;
  }
  try {
    const user = await clerkClient.users.getUser(userId);
    const allowed = user.emailAddresses.some((email) =>
      email.emailAddress.toLowerCase() === allowedEmail && email.verification?.status === 'verified',
    );
    if (!allowed) {
      res.status(403).json({ error: 'This account does not have permission to view volunteer enquiries.' });
      return;
    }
    next();
  } catch {
    req.log.error('Unable to verify inbox administrator');
    res.status(503).json({ error: 'We could not verify access. Please try again shortly.' });
  }
};
