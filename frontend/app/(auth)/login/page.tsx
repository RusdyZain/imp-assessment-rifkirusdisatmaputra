"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/posts");
  }, [router]);

  function validateForm() {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await apiFetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", res.token);
      router.push("/posts");
    } catch (err: any) {
      console.error("Login error:", err);
      const message =
        err.message?.includes("Invalid credentials") ||
        err.message?.includes("401")
          ? "Invalid email or password."
          : "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 md:px-10 relative">
      <div className="w-full max-w-md bg-base-100/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-base-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-base-content/70 text-sm sm:text-base mb-8 text-center">
          Log in to manage your posts and continue writing.
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Email
            </span>
            <input
              type="email"
              className="input input-bordered w-full px-2 bg-slate-100"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Password
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full px-2 bg-slate-100"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <label className="label cursor-pointer mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="label-text text-sm select-none">
                Show Password
              </span>
            </label>
          </label>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white w-full rounded-full font-semibold mt-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-base-content/70 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
