import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Fullstack Blog App",
  description:
    "A clean and modern blog platform built with Next.js, Hono.js, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-base-200 to-base-100 text-base-content font-sans antialiased tracking-tight transition-colors">
        {/* === Global Navbar === */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300 shadow-sm">
          <Navbar />
        </header>

        {/* === Main Content === */}
        <main className="flex-1 w-full flex flex-col items-center justify-start py-16 px-4 md:px-8">
          <div className="w-full max-w-5xl">{children}</div>
        </main>

        {/* === Global Footer === */}
        <footer className="w-full py-6 border-t border-base-300 text-center text-sm text-base-content/70 bg-base-100/80 backdrop-blur-md">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary">
              Fullstack Blog App
            </span>
            . Built with ❤️ using <span className="font-medium">Next.js</span> &{" "}
            <span className="font-medium">DaisyUI</span>.
          </p>
        </footer>

        {/* === Background Gradient Accents === */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-base-200 to-base-100 animate-gradient-slow"></div>
        <div className="absolute top-32 -left-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-3xl rounded-full opacity-40"></div>
      </body>
    </html>
  );
}
