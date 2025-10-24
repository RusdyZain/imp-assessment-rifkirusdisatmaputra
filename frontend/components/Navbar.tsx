"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

  if (isLoggedIn === null) {
    // placeholder saat cek token
    return (
      <nav className="w-full bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            Fullstack<span className="text-base-content">Blog</span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* === Left: Brand === */}
        <Link
          href="/"
          className="font-extrabold text-2xl text-primary tracking-tight hover:opacity-90 transition-opacity"
        >
          Fullstack<span className="text-base-content">Blog</span>
        </Link>

        {/* === Center: Desktop Links (only after login) === */}
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="hover:text-primary transition-colors duration-200"
            >
              Posts
            </Link>
          </div>
        )}

        {/* === Right: Auth Buttons === */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error bg-red-600 text-white px-2 hover:bg-red-700 btn-sm font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-primary btn-sm font-semibold text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline btn-sm font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* === Mobile Toggle === */}
        <div className="md:hidden flex items-center">
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
            {isLoggedIn && (
              <>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost w-full font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/posts"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost w-full font-medium"
                >
                  Posts
                </Link>
              </>
            )}

            <div className="border-t border-base-300 pt-3 mt-2">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-outline bg-red-600 text-white hover:bg-red-700 px-2 w-full font-medium text-sm"
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
        </div>
      )}
    </nav>
  );
}
