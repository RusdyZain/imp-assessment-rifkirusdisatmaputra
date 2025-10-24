import { Context, Next } from "hono";

const attempts: Record<string, { count: number; time: number }> = {};

export const rateLimit = async (c: Context, next: Next) => {
  const ip =
    c.req.header("x-forwarded-for") ||
    c.req.raw.headers.get("x-real-ip") ||
    "local";
  const now = Date.now();
  const user = attempts[ip] || { count: 0, time: now };
  if (now - user.time < 60000 && user.count >= 5)
    return c.json({ message: "Too many attempts. Try again later." }, 429);

  if (now - user.time > 60000) user.count = 0;
  user.count++;
  user.time = now;
  attempts[ip] = user;
  await next();
};
