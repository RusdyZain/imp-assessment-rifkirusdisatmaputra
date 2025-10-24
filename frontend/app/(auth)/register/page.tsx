"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/posts");
  }, [router]);

  function validatePassword(pw: string) {
    const rules = [
      { regex: /.{8,}/, msg: "Password must be at least 8 characters" },
      { regex: /[A-Z]/, msg: "Must contain at least one uppercase letter" },
      { regex: /[a-z]/, msg: "Must contain at least one lowercase letter" },
      { regex: /[0-9]/, msg: "Must contain at least one number" },
      {
        regex: /[^A-Za-z0-9]/,
        msg: "Must contain at least one special character",
      },
    ];
    for (const r of rules) if (!r.regex.test(pw)) return r.msg;
    return "";
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const pwError = validatePassword(password);
    if (pwError) {
      setError(pwError);
      setLoading(false);
      return;
    }

    try {
      await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess("🎉 Account created successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      console.error("Registration error:", err);
      const message = err.message?.includes("Email already registered")
        ? "Email already registered"
        : "Registration failed. Please try again.";
      setError(message);
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
              autoFocus
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
              autoComplete="email"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Password
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input input-bordered w-full px-2 bg-slate-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
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

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
