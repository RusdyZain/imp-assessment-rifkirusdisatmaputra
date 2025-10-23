import { PrismaClient } from "@prisma/client";
import { postService } from "../services/postService";
import { Context } from "hono";
const prisma = new PrismaClient();

export const getPosts = async (c: Context) => {
  const page = Number(c.req.query("page") || 1);
  const limit = Number(c.req.query("limit") || 5);
  const posts = await postService.getAll(page, limit);
  return c.json(posts);
};

export const getPostById = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const post = await postService.getById(id);
  if (!post) return c.json({ message: "Post not found" }, 404);
  return c.json(post);
};

export const createPost = async (c: Context) => {
  const user = c.get("user"); // dari JWT middleware
  const body = await c.req.json();
  const post = await postService.create({
    title: body.title,
    content: body.content,
    authorId: user.id,
  });
  return c.json(post);
};

export const updatePost = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const post = await postService.update(id, body);
  return c.json(post);
};

export const deletePost = async (c: Context) => {
  const id = Number(c.req.param("id"));
  await postService.remove(id);
  return c.json({ message: "Post deleted" });
};
