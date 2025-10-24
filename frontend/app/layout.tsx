import "./globals.css";
import ClientRoot from "./ClientRoot";

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
    <html lang="en">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
