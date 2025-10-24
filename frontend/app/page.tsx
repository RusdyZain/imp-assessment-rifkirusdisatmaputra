"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] text-center relative px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-3xl bg-base-100/80 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-base-300 transition-all">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight text-base-content mb-4">
          Manage <span className="text-primary">Posts</span>, Share{" "}
          <span className="text-primary">Ideas</span>,{" "}
          <br className="hidden sm:block" />
          and Build <span className="text-primary">Faster</span>.
        </h1>

        <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
          A clean and scalable full-stack blog platform built with{" "}
          <span className="font-medium text-primary">Next.js</span> and{" "}
          <span className="font-medium text-primary">Hono.js</span>. Seamlessly
          create, edit, and manage your posts — powered by{" "}
          <span className="font-medium text-primary">PostgreSQL</span>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="btn btn-primary text-white font-semibold rounded-full px-6 sm:px-8 w-full sm:w-auto"
          >
            🚀 Get Started
          </Link>
          <Link
            href="/register"
            className="btn  btn-outline rounded-full  px-6 sm:px-8 w-full sm:w-auto"
          >
            Create Account
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>

      <div className="absolute w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl bottom-10 right-16"></div>
    </section>
  );
}
