process.env.NODE_ENV ||= 'production';
process.env.HOSTINGER_DEPLOYMENT = 'true';
process.env.SERVE_FRONTEND = 'true';
process.env.PORT ||= '3000';

await import('./artifacts/api-server/dist/index.mjs');
