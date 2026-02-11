import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "練習用サイト",
  description: "Next.jsの学習用",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />

        <main className="min-h-screen p-8">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
