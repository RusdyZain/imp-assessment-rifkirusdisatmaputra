"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center bg-base-200">
        <h1 className="text-4xl font-bold text-error mb-4">
          Critical Application Error
        </h1>
        <p className="text-base-content/70 max-w-md mb-6">
          Something went wrong while loading the app. Please reload or contact
          support.
        </p>
        <button onClick={() => reset()} className="btn btn-primary">
          Reload
        </button>
      </body>
    </html>
  );
}
