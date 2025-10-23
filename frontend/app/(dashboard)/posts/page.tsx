"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  async function fetchPosts() {
    const token = localStorage.getItem("token");
    const res = await apiFetch(`/posts?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(res.data);
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-semibold">Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">
              by {post.author.name} •{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
