import { NextRequest } from "next/server";

export function verifyAdmin(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;

  try {
    const token = auth.slice(7);
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [prefix, expiry] = decoded.split(":");
    if (prefix !== "admin") return false;
    if (Date.now() > Number(expiry)) return false;
    return true;
  } catch {
    return false;
  }
}
