"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

interface Props {
  existing?: any;
  onSuccess?: () => void;
}

export default function PostForm({ existing, onSuccess }: Props) {
  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      const method = existing ? "PUT" : "POST";
      const path = existing ? `/posts/${existing.id}` : "/posts";

      await apiFetch(path, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content }),
      });

      setMessage(existing ? "Post updated successfully!" : "Post created!");
      setTimeout(() => onSuccess?.(), 800);
    } catch {
      setMessage("Failed to save post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-left w-full transition-all"
    >
      <label className="form-control w-full">
        <span className="label-text font-medium text-base-content">Title</span>
        <input
          className="input input-bordered w-full"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text font-medium text-base-content">
          Content
        </span>
        <textarea
          className="textarea textarea-bordered w-full h-36 resize-none"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>

      {message && (
        <p
          className={`text-sm ${
            message.includes("Failed") ? "text-red-500" : "text-success"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full font-semibold rounded-full mt-2 disabled:opacity-60"
      >
        {loading ? "Saving..." : existing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
