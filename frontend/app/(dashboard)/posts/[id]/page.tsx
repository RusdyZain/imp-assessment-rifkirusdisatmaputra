"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { apiFetch } from "@/lib/api";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === "new") {
      router.replace("/posts/new");
      return;
    }
    if (!id || isNaN(Number(id))) return;

    const token = localStorage.getItem("token");
    apiFetch(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setPost(null);
        setLoading(false);
      });
  }, [id, router]);

  if (loading)
    return <p className="text-center text-base-content/70 mt-10">Loading...</p>;
  if (!post)
    return (
      <p className="text-center text-red-500 font-medium mt-10">
        Post not found.
      </p>
    );

  return (
    <section className="flex flex-col items-center justify-start min-h-[80vh] px-4 sm:px-6 md:px-10 py-8 sm:py-12 relative">
      {/* === Edit Card === */}
      <div className="w-full max-w-2xl bg-base-100/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-base-300 transition-all">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 text-center">
          Edit Post
        </h1>
        <p className="text-base-content/70 text-sm sm:text-base mb-8 text-center">
          Update your content and keep your readers engaged.
        </p>

        <PostForm existing={post} onSuccess={() => router.push("/posts")} />
      </div>

      {/* === Accent Background === */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
