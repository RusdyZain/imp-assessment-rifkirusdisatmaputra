import { Hono } from "hono";
import { register, login } from "../controllers/authController";
import { rateLimit } from "../middlewares/rateLimits";

export const authRoutes = new Hono();
authRoutes.post("/signup", register);
authRoutes.post("/signin", rateLimit, login);
