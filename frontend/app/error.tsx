"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unexpected error:", error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl font-extrabold text-error mb-4">500</h1>
      <h2 className="text-xl font-semibold mb-3 text-base-content">
        Something went wrong
      </h2>
      <p className="text-base-content/70 max-w-md mb-6">
        We’re sorry, an unexpected error occurred. Please try again or return to
        the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => reset()}
          className="btn btn-primary text-white px-6"
        >
          🔄 Try Again
        </button>
        <a href="/" className="btn btn-outline px-6">
          🏠 Go Home
        </a>
      </div>
    </section>
  );
}
