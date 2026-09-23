import { Pool } from "pg";

let pool: Pool | undefined;
let schemaReady: Promise<void> | undefined;

function connection() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is required for the support counter");
    pool = new Pool({ connectionString, max: 5, connectionTimeoutMillis: 5000 });
    pool.on("error", (error) => console.error("Support database connection error", error));
  }
  return pool;
}

async function ensureSchema() {
  const db = connection();
  if (!schemaReady) {
    schemaReady = db.query(`
      CREATE TABLE IF NOT EXISTS support_counter (
        id SMALLINT PRIMARY KEY CHECK (id = 1),
        count BIGINT NOT NULL CHECK (count >= 0)
      )
    `).then(() => undefined).catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  await schemaReady;
  return db;
}

function validCount(value: unknown): number {
  const count = typeof value === "string" ? Number(value) : value;
  if (!Number.isSafeInteger(count) || (count as number) < 0) throw new Error("Invalid support count");
  return count as number;
}

export async function readSupportCount(): Promise<number> {
  const db = await ensureSchema();
  const result = await db.query<{ count: string }>("SELECT count FROM support_counter WHERE id = 1");
  return result.rows.length ? validCount(result.rows[0].count) : 0;
}

export async function addSupport(): Promise<number> {
  const db = await ensureSchema();
  const result = await db.query<{ count: string }>(`
    INSERT INTO support_counter (id, count) VALUES (1, 1)
    ON CONFLICT (id) DO UPDATE SET count = support_counter.count + 1
    RETURNING count
  `);
  return validCount(result.rows[0].count);
}
