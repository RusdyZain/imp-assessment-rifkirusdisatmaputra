"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Jika sudah punya token, langsung ke /posts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/posts");
  }, [router]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess("🎉 Account created successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 md:px-10 relative">
      {/* === Register Card === */}
      <div className="w-full max-w-md bg-base-100/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-base-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-2">
          Create an Account
        </h1>
        <p className="text-base-content/70 text-sm sm:text-base mb-8 text-center">
          Join the community and start sharing your ideas today.
        </p>

        <form onSubmit={handleRegister} className="space-y-4 text-left">
          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Full Name
            </span>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full px-2 bg-slate-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Email
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full px-2 bg-slate-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Password
            </span>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full px-2 bg-slate-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm font-medium">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-full font-semibold mt-2 disabled:opacity-60 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-base-content/70 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* === Background === */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
