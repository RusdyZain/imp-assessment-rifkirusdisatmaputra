"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2 text-base-content">
        Page Not Found
      </h2>
      <p className="text-base-content/70 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <Link href="/" className="btn btn-primary rounded-full px-6">
        🏠 Back to Home
      </Link>
    </section>
  );
}
