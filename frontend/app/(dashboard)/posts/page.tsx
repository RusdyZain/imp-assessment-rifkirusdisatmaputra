"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPosts() {
    try {
      const token = localStorage.getItem("token");

      const res = await apiFetch("/posts?page=1&limit=5", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <a href="/posts/new" className="btn btn-primary mb-4">
        + New Post
      </a>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow p-4">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <div className="flex justify-end gap-2 mt-2">
              <a href={`/posts/${post.id}`} className="btn btn-sm btn-outline">
                Edit
              </a>
              <button
                className="btn btn-sm btn-error text-white"
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  await apiFetch(`/posts/${post.id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  fetchPosts(); // reload setelah delete
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
