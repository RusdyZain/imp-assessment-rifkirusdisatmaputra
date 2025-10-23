import { Hono } from "hono";
import { authRoutes } from "./routes/auth";
import { postRoutes } from "./routes/post";

export const app = new Hono();

app.route("/auth", authRoutes);
app.route("/posts", postRoutes);
