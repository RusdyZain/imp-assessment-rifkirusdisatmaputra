export default function UnauthorizedPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl font-extrabold text-warning mb-4">403</h1>
      <h2 className="text-xl font-semibold mb-2 text-base-content">
        Access Denied
      </h2>
      <p className="text-base-content/70 mb-6">
        You don’t have permission to view this page.
      </p>
      <a href="/login" className="btn btn-primary px-6">
        🔑 Login
      </a>
    </section>
  );
}
