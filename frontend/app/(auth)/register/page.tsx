"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch {
      setError("Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="card w-96 bg-base-100 shadow-xl p-8 space-y-3"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
