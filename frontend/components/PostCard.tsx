"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function PostCard({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const token = localStorage.getItem("token");
      const res = await apiFetch(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(res);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-base-100 p-6 rounded-xl">Loading...</div>
      </div>
    );

  if (!post)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-base-100 p-6 rounded-xl">Post not found.</div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-base-100 max-w-lg w-full p-6 rounded-2xl shadow-xl relative">
        <button
          className="btn btn-sm btn-circle absolute right-3 top-3"
          onClick={onClose}
        >
          ✕
        </button>

        {post.imageUrl && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`}
            alt={post.title}
            className="rounded-xl mb-4 w-full h-56 object-cover"
          />
        )}
        <h2 className="text-2xl font-bold text-primary mb-2">{post.title}</h2>
        <p className="text-sm text-base-content/70 mb-4">
          by {post.author?.name || "Unknown"} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-base leading-relaxed text-base-content">
          {post.content}
        </p>
      </div>
    </div>
  );
}
