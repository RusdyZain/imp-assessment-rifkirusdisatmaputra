"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Props {
  existing?: any;
  onSuccess?: () => void;
}

export default function PostForm({ existing, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // 🔹 Set nilai awal kalau existing post dikirim dari parent
  useEffect(() => {
    if (existing) {
      setTitle(existing.title || "");
      setContent(existing.content || "");
      // Gunakan URL absolut dari API supaya preview tampil
      if (existing.imageUrl) {
        const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${existing.imageUrl}`;
        setPreview(fullUrl);
      }
    }
  }, [existing]);

  // 🔹 Upload image ke backend
  async function uploadImage(file: File) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  // 🔹 Submit handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let imageUrl = existing?.imageUrl || "";

      // Kalau ada file baru, upload dan ganti URL
      if (image) imageUrl = await uploadImage(image);

      const method = existing ? "PUT" : "POST";
      const path = existing ? `/posts/${existing.id}` : "/posts";

      await apiFetch(path, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-base-100 p-4 sm:p-6 rounded-2xl shadow-md"
    >
      <input
        className="input input-bordered w-full bg-slate-100 px-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="textarea textarea-bordered w-full bg-slate-100 h-32 px-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-1 text-base-content">
          {existing ? "Change Image (optional)" : "Upload Image"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImage(file);
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />

        {/* 🔹 Tampilkan preview jika sudah ada gambar */}
        {preview && (
          <div className="mt-3">
            <p className="text-xs text-base-content/70 mb-1">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-lg border shadow-sm object-cover max-h-64"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Saving..." : existing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
