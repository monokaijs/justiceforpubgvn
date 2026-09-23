import { neon } from "@neondatabase/serverless";

let database: ReturnType<typeof neon> | undefined;
let schemaReady: Promise<void> | undefined;

function connection() {
  if (!database) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is required for the support counter");
    database = neon(url);
  }
  return database;
}

async function ensureSchema() {
  const sql = connection();
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS support_counter (
        id SMALLINT PRIMARY KEY CHECK (id = 1),
        count BIGINT NOT NULL CHECK (count >= 0)
      )
    `.then(() => undefined).catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  await schemaReady;
  return sql;
}

function validCount(value: unknown): number {
  const count = typeof value === "string" ? Number(value) : value;
  if (!Number.isSafeInteger(count) || (count as number) < 0) throw new Error("Invalid support count");
  return count as number;
}

export async function readSupportCount(): Promise<number> {
  const sql = await ensureSchema();
  const rows = await sql`SELECT count FROM support_counter WHERE id = 1`;
  return rows.length ? validCount(rows[0].count) : 0;
}

export async function addSupport(): Promise<number> {
  const sql = await ensureSchema();
  const rows = await sql`
    INSERT INTO support_counter (id, count) VALUES (1, 1)
    ON CONFLICT (id) DO UPDATE SET count = support_counter.count + 1
    RETURNING count
  `;
  return validCount(rows[0].count);
}
