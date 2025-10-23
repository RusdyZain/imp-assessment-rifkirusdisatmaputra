import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { app } from "./app";

const server = new Hono();
server.use("*", cors());
server.route("/", app);

const port = Number(process.env.PORT) || 8080;

console.log(`🚀 Backend running on http://localhost:${port}`);

serve({
  fetch: server.fetch,
  port,
});
