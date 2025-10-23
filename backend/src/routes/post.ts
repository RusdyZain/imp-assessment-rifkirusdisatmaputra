import { Hono } from "hono";
import { requireAuth } from "../middlewares/auth";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

export const postRoutes = new Hono();

// semua route perlu login
postRoutes.use("*", requireAuth);

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getPostById);
postRoutes.post("/", createPost);
postRoutes.put("/:id", updatePost);
postRoutes.delete("/:id", deletePost);
