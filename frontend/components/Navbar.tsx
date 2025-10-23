"use client";
import Link from "next/link";

export default function Navbar() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="navbar bg-base-200 px-6">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Fullstack Blog
        </Link>
      </div>
      <div className="flex-none gap-2">
        {token ? (
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
