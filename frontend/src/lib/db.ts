import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    if (!process.env.DB_HOST) {
      throw new Error("DB_HOST environment variable is not set. Database is not configured.");
    }
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
  const db = getPool();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows] = await db.execute(sql, params as any);
  return rows as T;
}
