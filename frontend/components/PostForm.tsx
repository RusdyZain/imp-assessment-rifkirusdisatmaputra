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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const method = existing ? "PUT" : "POST";
    const path = existing ? `/posts/${existing.id}` : "/posts";

    await apiFetch(path, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content }),
    });

    setLoading(false);
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="input input-bordered w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="textarea textarea-bordered w-full h-32"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : existing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
