import { Hono } from "hono";
import { register, login } from "../controllers/authController";

export const authRoutes = new Hono();
authRoutes.post("/signup", register);
authRoutes.post("/signin", login);
