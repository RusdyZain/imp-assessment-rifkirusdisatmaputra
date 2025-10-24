import { Hono } from "hono";
import { authRoutes } from "./routes/auth";
import { postRoutes } from "./routes/post";
import { serveStatic } from "@hono/node-server/serve-static";

export const app = new Hono();

app.use("/uploads/*", serveStatic({ root: "./" }));

app.route("/auth", authRoutes);
app.route("/posts", postRoutes);

app.get("/", (c) => c.text("API running 🚀"));
