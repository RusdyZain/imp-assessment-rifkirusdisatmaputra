import { PrismaClient } from "@prisma/client";
import { postService } from "../services/postService";
import { Context } from "hono";

const prisma = new PrismaClient();

export const getPosts = async (c: Context) => {
  try {
    const page = Number(c.req.query("page") || 1);
    const limit = Number(c.req.query("limit") || 5);

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1)
      return c.json({ message: "Invalid pagination parameters" }, 400);

    const posts = await postService.getAll(page, limit);
    return c.json(posts, 200);
  } catch (err: any) {
    console.error("❌ [getPosts] Error:", err);
    return c.json({ message: "Failed to fetch posts" }, 500);
  }
};

export const getPostById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ message: "Invalid post ID" }, 400);

    const post = await postService.getById(id);
    if (!post) return c.json({ message: "Post not found" }, 404);

    return c.json(post, 200);
  } catch (err: any) {
    console.error("❌ [getPostById] Error:", err);
    return c.json({ message: "Failed to fetch post" }, 500);
  }
};

export const createPost = async (c: Context) => {
  try {
    const user = c.get("user"); // from JWT middleware
    if (!user?.id) return c.json({ message: "Unauthorized" }, 401);

    const body = await c.req.json();
    if (!body.title || !body.content)
      return c.json({ message: "Title and content are required" }, 400);

    const post = await postService.create({
      title: body.title.trim(),
      content: body.content.trim(),
      imageUrl: body.imageUrl || null,
      authorId: user.id,
    });

    return c.json({ message: "Post created successfully", post }, 201);
  } catch (err: any) {
    console.error("❌ [createPost] Error:", err);
    return c.json({ message: "Failed to create post" }, 500);
  }
};

export const updatePost = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ message: "Invalid post ID" }, 400);

    const body = await c.req.json();
    const existing = await postService.getById(id);
    if (!existing) return c.json({ message: "Post not found" }, 404);

    const updated = await postService.update(id, {
      title: body.title ?? existing.title,
      content: body.content ?? existing.content,
      imageUrl: body.imageUrl ?? existing.imageUrl,
    });

    return c.json({ message: "Post updated successfully", post: updated }, 200);
  } catch (err: any) {
    console.error("❌ [updatePost] Error:", err);
    return c.json({ message: "Failed to update post" }, 500);
  }
};

export const deletePost = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ message: "Invalid post ID" }, 400);

    const existing = await postService.getById(id);
    if (!existing) return c.json({ message: "Post not found" }, 404);

    await postService.remove(id);
    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (err: any) {
    console.error("❌ [deletePost] Error:", err);
    return c.json({ message: "Failed to delete post" }, 500);
  }
};

export const uploadImage = async (c: Context) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return c.json({ message: "No file uploaded" }, 400);

    const fs = await import("fs/promises");
    const path = await import("path");
    const uploadDir = path.resolve(process.cwd(), "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${file.name}`;
    return c.json({ url: publicUrl }, 200);
  } catch (err) {
    console.error("❌ [uploadImage] Error:", err);
    return c.json({ message: "Image upload failed" }, 500);
  }
};
