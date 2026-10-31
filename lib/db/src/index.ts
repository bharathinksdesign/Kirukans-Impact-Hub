import { count, desc, eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import mysql, {
  type ResultSetHeader,
  type RowDataPacket,
} from "mysql2/promise";
import pg from "pg";
import { volunteerEnquiriesTable } from "./schema";

const mysqlHost = process.env.MYSQL_HOST?.trim();
const useMySql =
  process.env.HOSTINGER_DEPLOYMENT === "true" || Boolean(mysqlHost);

const mysqlRequiredVariables = [
  "MYSQL_HOST",
  "MYSQL_DATABASE",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
] as const;

if (useMySql) {
  const missing = mysqlRequiredVariables.filter(
    (variable) => !process.env[variable],
  );
  if (missing.length > 0) {
    throw new Error(`Missing required MySQL settings: ${missing.join(", ")}`);
  }
} else if (!process.env.DATABASE_URL) {
  throw new Error(
    "Set MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, and MYSQL_PASSWORD, or provide DATABASE_URL for PostgreSQL development.",
  );
}

const mysqlPort = Number(process.env.MYSQL_PORT || "3306");
if (
  useMySql &&
  (!Number.isInteger(mysqlPort) || mysqlPort < 1 || mysqlPort > 65535)
) {
  throw new Error("MYSQL_PORT must be a valid TCP port number.");
}

const mysqlPool = useMySql
  ? mysql.createPool({
      host: mysqlHost,
      port: mysqlPort,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      timezone: "Z",
    })
  : null;

const pgPool = useMySql
  ? null
  : new pg.Pool({ connectionString: process.env.DATABASE_URL });
const pgDb = pgPool ? drizzle(pgPool, { schema: { volunteerEnquiriesTable } }) : null;

export interface VolunteerEnquiryRecord {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: Date;
  readAt: Date | null;
}

export interface NewVolunteerEnquiry {
  name: string;
  email: string | null;
  phone: string | null;
}

function mapMySqlRow(row: RowDataPacket): VolunteerEnquiryRecord {
  return {
    id: Number(row.id),
    name: String(row.name),
    email: row.email == null ? null : String(row.email),
    phone: row.phone == null ? null : String(row.phone),
    createdAt: row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt),
    readAt:
      row.readAt == null
        ? null
        : row.readAt instanceof Date
          ? row.readAt
          : new Date(row.readAt),
  };
}

/**
 * Hostinger production uses MySQL. The Replit development workspace continues
 * using its existing PostgreSQL DATABASE_URL unless MYSQL_HOST is configured.
 */
export async function initializeDatabase(): Promise<void> {
  if (mysqlPool) {
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS volunteer_enquiries (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NULL,
        phone TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP NULL DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    return;
  }

  await pgPool!.query("SELECT 1");
}

export async function createVolunteerEnquiry(
  enquiry: NewVolunteerEnquiry,
): Promise<void> {
  if (mysqlPool) {
    await mysqlPool.execute(
      "INSERT INTO volunteer_enquiries (name, email, phone) VALUES (?, ?, ?)",
      [enquiry.name, enquiry.email, enquiry.phone],
    );
    return;
  }

  await pgDb!.insert(volunteerEnquiriesTable).values(enquiry);
}

export async function getVolunteerInboxPage(
  page: number,
  pageSize: number,
): Promise<{
  items: VolunteerEnquiryRecord[];
  total: number;
  unreadCount: number;
}> {
  const offset = (page - 1) * pageSize;

  if (mysqlPool) {
    const [totalRows] = await mysqlPool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM volunteer_enquiries",
    );
    const [unreadRows] = await mysqlPool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS unreadCount FROM volunteer_enquiries WHERE read_at IS NULL",
    );
    const [rows] = await mysqlPool.execute<RowDataPacket[]>(
      `SELECT id, name, email, phone, created_at AS createdAt, read_at AS readAt
       FROM volunteer_enquiries
       ORDER BY created_at DESC, id DESC
       LIMIT ? OFFSET ?`,
      [pageSize, offset],
    );

    return {
      items: rows.map(mapMySqlRow),
      total: Number(totalRows[0]?.total ?? 0),
      unreadCount: Number(unreadRows[0]?.unreadCount ?? 0),
    };
  }

  const [{ total }] = await pgDb!
    .select({ total: count() })
    .from(volunteerEnquiriesTable);
  const [{ unreadCount }] = await pgDb!
    .select({ unreadCount: count() })
    .from(volunteerEnquiriesTable)
    .where(isNull(volunteerEnquiriesTable.readAt));
  const items = await pgDb!
    .select()
    .from(volunteerEnquiriesTable)
    .orderBy(desc(volunteerEnquiriesTable.createdAt), desc(volunteerEnquiriesTable.id))
    .limit(pageSize)
    .offset(offset);

  return { items, total, unreadCount };
}

export async function updateVolunteerEnquiryRead(
  id: number,
  read: boolean,
): Promise<VolunteerEnquiryRecord | undefined> {
  if (mysqlPool) {
    await mysqlPool.execute<ResultSetHeader>(
      "UPDATE volunteer_enquiries SET read_at = ? WHERE id = ?",
      [read ? new Date() : null, id],
    );
    const [rows] = await mysqlPool.execute<RowDataPacket[]>(
      `SELECT id, name, email, phone, created_at AS createdAt, read_at AS readAt
       FROM volunteer_enquiries
       WHERE id = ?`,
      [id],
    );
    return rows[0] ? mapMySqlRow(rows[0]) : undefined;
  }

  const [item] = await pgDb!
    .update(volunteerEnquiriesTable)
    .set({ readAt: read ? new Date() : null })
    .where(eq(volunteerEnquiriesTable.id, id))
    .returning();
  return item;
}

export * from "./schema";
