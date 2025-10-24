"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icon modern untuk hamburger menu

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // placeholder SSR (mencegah flicker)
  if (isLoggedIn === null) {
    return (
      <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm px-6">
        <div className="flex-1">
          <Link href="/" className="font-bold text-xl text-primary">
            Fullstack<span className="text-base-content">Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm">
      <div className="navbar px-4 md:px-10">
        {/* === Brand === */}
        <div className="flex-1">
          <Link
            href="/"
            className="font-extrabold text-2xl text-primary tracking-tight hover:opacity-90 transition-opacity"
          >
            Fullstack<span className="text-base-content">Blog</span>
          </Link>
        </div>

        {/* === Desktop Menu === */}
        <div className="hidden md:flex gap-3 items-center">
          {isLoggedIn ? (
            <>
              <Link
                href="/posts"
                className="btn btn-ghost font-medium hover:bg-base-200 transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error font-medium hover:scale-105 transition-transform"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-primary font-semibold text-white px-6 hover:scale-105 transition-transform"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline font-semibold px-6 hover:scale-105 transition-transform"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* === Mobile Toggle === */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* === Mobile Dropdown === */}
      {menuOpen && (
        <div className="md:hidden bg-base-100/95 backdrop-blur-md border-t border-base-300 shadow-lg">
          <div className="flex flex-col p-4 space-y-3 text-center">
            {isLoggedIn ? (
              <>
                <Link
                  href="/posts"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost w-full font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error w-full font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full text-white font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-outline w-full font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
