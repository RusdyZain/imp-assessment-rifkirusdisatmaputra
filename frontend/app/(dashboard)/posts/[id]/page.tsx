"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { apiFetch } from "@/lib/api";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);

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
      .then(setPost)
      .catch(() => setPost(null));
  }, [id, router]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm existing={post} onSuccess={() => router.push("/posts")} />
    </div>
  );
}
