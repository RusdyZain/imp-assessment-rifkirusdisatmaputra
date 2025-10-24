import { Hono } from "hono";
import { requireAuth } from "../middlewares/auth";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  uploadImage,
} from "../controllers/postController";

export const postRoutes = new Hono();

// semua route perlu login
postRoutes.use("*", requireAuth);

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getPostById);
postRoutes.post("/", createPost);
postRoutes.post("/upload", requireAuth, uploadImage);
postRoutes.put("/:id", updatePost);
postRoutes.delete("/:id", deletePost);
