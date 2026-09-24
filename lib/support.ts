import { Pool } from "pg";

let pool: Pool | undefined;
let schemaReady: Promise<void> | undefined;
let cachedCount: { count: number; expiresAt: number } | undefined;
let countPromise: Promise<number> | undefined;
const COUNT_CACHE_MS = 2000;

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
      );
      CREATE TABLE IF NOT EXISTS support_vote (
        ip INET PRIMARY KEY
      );
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
  if (cachedCount && cachedCount.expiresAt > Date.now()) return cachedCount.count;
  if (!countPromise) {
    countPromise = (async () => {
      const db = await ensureSchema();
      const result = await db.query<{ count: string }>("SELECT count FROM support_counter WHERE id = 1");
      const count = result.rows.length ? validCount(result.rows[0].count) : 0;
      cachedCount = { count: Math.max(count, cachedCount?.count ?? 0), expiresAt: Date.now() + COUNT_CACHE_MS };
      return cachedCount.count;
    })().finally(() => { countPromise = undefined; });
  }
  return countPromise;
}

export async function addSupport(ip: string): Promise<number> {
  const db = await ensureSchema();
  const result = await db.query<{ count: string }>(`
    WITH vote AS (
      INSERT INTO support_vote (ip) VALUES ($1::inet)
      ON CONFLICT (ip) DO NOTHING
      RETURNING 1
    ), updated AS (
      INSERT INTO support_counter (id, count)
      SELECT 1, 1 FROM vote
      ON CONFLICT (id) DO UPDATE SET count = support_counter.count + 1
      RETURNING count
    )
    SELECT COALESCE(
      (SELECT count FROM updated),
      (SELECT count FROM support_counter WHERE id = 1),
      0
    ) AS count
  `, [ip]);
  const count = validCount(result.rows[0].count);
  cachedCount = {
    count: Math.max(count, cachedCount?.count ?? 0),
    expiresAt: cachedCount?.expiresAt ?? Date.now() + COUNT_CACHE_MS,
  };
  return cachedCount.count;
}
