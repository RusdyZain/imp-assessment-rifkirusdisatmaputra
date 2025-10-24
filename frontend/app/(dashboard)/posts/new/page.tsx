"use client";
import PostForm from "@/components/PostForm";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-start min-h-[80vh] px-4 sm:px-6 md:px-10 py-8 sm:py-12 relative">
      <div className="w-full max-w-2xl bg-base-100/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-base-300 transition-all">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 text-center">
          Create a New Post
        </h1>
        <p className="text-base-content/70 text-sm sm:text-base mb-8 text-center">
          Write your thoughts and share them with the world.
        </p>

        <PostForm onSuccess={() => router.push("/posts")} />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
