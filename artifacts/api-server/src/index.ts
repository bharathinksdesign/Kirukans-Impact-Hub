import app from "./app";
import { logger } from "./lib/logger";
import { initializeDatabase } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function start(): Promise<void> {
  try {
    await initializeDatabase();
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined;
    logger.error({ errorCode: code }, "Database initialization failed");
    process.exit(1);
  }

  const server = app.listen(port, "0.0.0.0", () => {
    logger.info({ port }, "Server listening");
  });
  server.on("error", (error) => {
    const code =
      error && typeof error === "object" && "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined;
    logger.error({ errorCode: code }, "Error listening on port");
    process.exit(1);
  });
}

void start();
