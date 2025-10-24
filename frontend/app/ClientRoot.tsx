"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"corporate" | "dark">("corporate");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "corporate" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "corporate" ? "dark" : "corporate"));

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-base-200 to-base-100
                 text-base-content font-sans antialiased tracking-tight transition-colors"
    >
      <Navbar />

      <div className="fixed right-4 bottom-4 z-40">
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-primary shadow-lg"
          title={`Switch to ${theme === "corporate" ? "dark" : "light"} mode`}
        >
          {theme === "corporate" ? "🌙" : "🌞"}
        </button>
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-start py-16 px-4 md:px-8">
        <div className="w-full max-w-5xl">{children}</div>
      </main>

      <footer className="w-full py-6 border-t border-base-300 text-center text-sm text-base-content/70 bg-base-100/80 backdrop-blur-md">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">Fullstack Blog App</span>
          . Built with ❤️ using <span className="font-medium">Next.js</span> &{" "}
          <span className="font-medium">DaisyUI</span>.
        </p>
      </footer>

      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
      <div className="absolute top-32 -left-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-3xl rounded-full opacity-40 pointer-events-none"></div>
    </div>
  );
}
