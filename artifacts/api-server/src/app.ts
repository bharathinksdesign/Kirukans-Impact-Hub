import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { clerkMiddleware } from '@clerk/express';
import { publishableKeyFromHost } from '@clerk/shared/keys';
import { CLERK_PROXY_PATH, clerkProxyMiddleware, getClerkProxyHost } from './middlewares/clerkProxyMiddleware';
import { WebhookHandlers } from './webhookHandlers';

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());
app.post('/api/stripe/webhook', express.raw({ type: 'application/json', limit: '2mb' }), async (req, res) => {
  const signature = req.get('stripe-signature');
  if (!signature) { res.status(400).json({ error: 'Missing signature' }); return; }
  try {
    await WebhookHandlers.processWebhook(req.body, signature);
    res.json({ received: true });
  } catch {
    res.status(400).json({ error: 'Webhook verification failed' });
  }
});
app.set('trust proxy', 1);
app.use((req, res, next) => cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) { callback(null, true); return; }
    try { callback(null, new URL(origin).host === getClerkProxyHost(req)); }
    catch { callback(null, false); }
  },
})(req, res, next));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  clerkMiddleware((req) => ({
    publishableKey: publishableKeyFromHost(
      getClerkProxyHost(req) ?? "",
      process.env.CLERK_PUBLISHABLE_KEY,
    ),
  })),
);

app.use("/api", router);

export default app;
