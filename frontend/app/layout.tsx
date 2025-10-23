import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-base-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
