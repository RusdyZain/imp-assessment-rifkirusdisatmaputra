import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        👋 Welcome to Fullstack Blog App
      </h1>
      <p className="max-w-lg text-gray-600 mb-6">
        A simple full-stack web application built with Next.js, Hono.js, and
        PostgreSQL. You can register, log in, and manage posts easily.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="btn btn-primary">
          Get Started
        </Link>
        <Link href="/register" className="btn btn-outline">
          Create Account
        </Link>
      </div>
    </main>
  );
}
