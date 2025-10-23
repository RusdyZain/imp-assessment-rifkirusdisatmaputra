import { verifyToken } from "../utils/jwt";
import type { Context, Next } from "hono";

export const requireAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer "))
    return c.json({ message: "Unauthorized" }, 401);

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch {
    return c.json({ message: "Invalid or expired token" }, 403);
  }
};
