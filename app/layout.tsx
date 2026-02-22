import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zenkaku",
  display: "swap",
});

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
    <html lang="ja" className={zenKaku.variable}>
      <body>
        <Header />
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
