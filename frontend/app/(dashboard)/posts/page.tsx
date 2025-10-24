"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);

  // 🔹 Fetch posts dengan pagination
  async function fetchPosts(currentPage = 1) {
    try {
      const token = localStorage.getItem("token");
      const res = await apiFetch(`/posts?page=${currentPage}&limit=6`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  if (loading)
    return <p className="text-center mt-10 text-base-content/70">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 font-medium mt-10">{error}</p>
    );

  return (
    <section className="flex flex-col items-center justify-start min-h-[80vh] text-center px-4 sm:px-6 md:px-10 py-8 sm:py-12 relative">
      {/* === Card Container === */}
      <div className="w-full max-w-5xl bg-base-100/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-base-300 transition-all">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 text-left">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
              Your Posts
            </h1>
            <p className="text-base-content/70 text-sm md:text-base">
              Manage, edit, and share your content seamlessly.
            </p>
          </div>

          <Link
            href="/posts/new"
            className="btn btn-primary rounded-full text-white px-6 sm:px-8 font-semibold shadow-md hover:scale-105 transition-transform"
          >
            + New Post
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-base-content/70 text-center py-10">
            No posts yet. Start by creating one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card bg-base-100 shadow-md border border-base-300 p-5 text-left transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image */}
                {post.imageUrl && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`}
                    alt={post.title}
                    className="rounded-xl mb-3 h-48 w-full object-cover border"
                  />
                )}

                {/* Title & Content */}
                <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-sm text-base-content/70 line-clamp-3">
                  {post.content}
                </p>

                <p className="text-xs text-base-content/50 mt-2">
                  by {post.author?.name || "Unknown"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                  <Link
                    href={`/posts/${post.id}`}
                    className="btn btn-sm btn-outline font-medium outline-primary text-primary px-2 hover:bg-primary/10 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-error bg-red-600 text-white px-2 hover:bg-red-700 font-medium text-sm"
                    onClick={async () => {
                      const confirmDelete = confirm("Are you sure to delete?");
                      if (!confirmDelete) return;
                      const token = localStorage.getItem("token");
                      await apiFetch(`/posts/${post.id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      fetchPosts(page);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="btn btn-outline btn-sm"
              disabled={!meta.hasPrevPage}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              « Prev
            </button>
            <span className="text-sm text-base-content/70">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              className="btn btn-outline btn-sm"
              disabled={!meta.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next »
            </button>
          </div>
        )}
      </div>

      {/* === Accent Background === */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
