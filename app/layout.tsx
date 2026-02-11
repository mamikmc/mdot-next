import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mdot -nextの練習",
  description: "練習用に立ち上げました。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* ここから追加 */}
        <header className="bg-blue-600 text-white p-4">
          <nav className="flex gap-6 items-center">
            <h1 className="text-2xl font-bold">mdot-next: 練習サイト</h1>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </nav>
        </header>
        <main className="min-h-screen p-12">{children}</main>

        <footer className="bg-gray-500 text-white p-4 text-center">
          <p>フッター</p>
        </footer>
        {/* ここまで追加 */}
      </body>
    </html>
  );
}
