import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";

export const requireAuth = async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = header.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    // simpan data user hasil decode ke context
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ message: "Invalid or expired token" }, 403);
  }
};
