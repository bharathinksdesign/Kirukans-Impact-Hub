import { Router, type IRouter, type RequestHandler } from 'express';
import { rateLimit } from 'express-rate-limit';
import { count, desc, eq, isNull } from 'drizzle-orm';
import { db, volunteerEnquiriesTable } from '@workspace/db';
import {
  CreateVolunteerEnquiryBody, GetVolunteerInboxQueryParams, GetVolunteerInboxResponse,
  UpdateEnquiryReadBody, UpdateEnquiryReadParams, UpdateEnquiryReadResponse,
} from '@workspace/api-zod';
import { requireInboxAdmin } from '../middlewares/inbox-admin';
import { getClerkProxyHost } from '../middlewares/clerkProxyMiddleware';

const router: IRouter = Router();

const sameOrigin: RequestHandler = (req, res, next) => {
  const origin = req.get('origin');
  let allowed = req.get('sec-fetch-site') !== 'cross-site';
  if (origin) {
    try { allowed = allowed && new URL(origin).host === getClerkProxyHost(req); }
    catch { allowed = false; }
  }
  if (!allowed) { res.status(403).json({ error: 'Please submit from the Kirukans website.' }); return; }
  next();
};

const publicLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please wait a few minutes and try again.' },
});

router.post('/volunteer-enquiries', sameOrigin, publicLimit, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const body = req.body;
  const parsed = CreateVolunteerEnquiryBody.safeParse({
    ...body,
    name: typeof body?.name === 'string' ? body.name.trim() : body?.name,
    email: typeof body?.email === 'string' ? body.email.trim().toLowerCase() : body?.email,
  });
  if (!parsed.success || parsed.data.consent !== true) {
    res.status(400).json({ error: 'Please enter a valid name and email, and agree to be contacted about volunteering.' });
    return;
  }
  const receipt = { message: 'Your interest has been saved. Thank you for being part of the goodness!' };
  if (parsed.data.website) { res.status(201).json(receipt); return; }
  try {
    // Duplicates are handled without exposing whether an email is already registered.
    await db.insert(volunteerEnquiriesTable).values({
      name: parsed.data.name, email: parsed.data.email,
    }).onConflictDoNothing({ target: volunteerEnquiriesTable.email });
    res.status(201).json(receipt);
  } catch {
    req.log.error('Could not save volunteer enquiry');
    res.status(500).json({ error: 'Your interest could not be saved. Please try again or call the trust.' });
  }
});

router.use('/admin', requireInboxAdmin);
router.get('/admin/access', (_req, res) => { res.json({ allowed: true }); });
router.get('/admin/volunteer-enquiries', async (req, res) => {
  const params = GetVolunteerInboxQueryParams.safeParse(req.query);
  if (!params.success) { res.status(400).json({ error: 'Invalid inbox page.' }); return; }
  try {
    const pageSize = 25;
    const [{ total }] = await db.select({ total: count() }).from(volunteerEnquiriesTable);
    const [{ unreadCount }] = await db.select({ unreadCount: count() }).from(volunteerEnquiriesTable).where(isNull(volunteerEnquiriesTable.readAt));
    const items = await db.select().from(volunteerEnquiriesTable)
      .orderBy(desc(volunteerEnquiriesTable.createdAt), desc(volunteerEnquiriesTable.id))
      .limit(pageSize).offset((params.data.page - 1) * pageSize);
    res.json(GetVolunteerInboxResponse.parse({ items, total, unreadCount, page: params.data.page, pageSize }));
  } catch {
    req.log.error('Could not load volunteer inbox');
    res.status(500).json({ error: 'The inbox could not be loaded. Please try again.' });
  }
});

router.patch('/admin/volunteer-enquiries/:id', sameOrigin, async (req, res) => {
  const params = UpdateEnquiryReadParams.safeParse(req.params);
  const body = UpdateEnquiryReadBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: 'Invalid enquiry update.' }); return; }
  try {
    const [item] = await db.update(volunteerEnquiriesTable)
      .set({ readAt: body.data.read ? new Date() : null })
      .where(eq(volunteerEnquiriesTable.id, params.data.id)).returning();
    if (!item) { res.status(404).json({ error: 'Enquiry not found.' }); return; }
    res.json(UpdateEnquiryReadResponse.parse(item));
  } catch {
    req.log.error('Could not update volunteer enquiry');
    res.status(500).json({ error: 'The enquiry could not be updated. Please try again.' });
  }
});

export default router;
