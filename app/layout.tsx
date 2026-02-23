// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { CATEGORIES } from "@/app/lib/categories";
import { CategoryTag } from "@/app/components/CategoryTag";

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
      <body className="bg-gray-50">
        <Header />

        {/* ─── 3カラムレイアウト ─── */}
        <div className="flex" style={{ height: "calc(100dvh - 90px)" }}>
          {/* 左サイドバー：カテゴリー一覧（md以上で表示） */}
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="p-5">
              <p className="text-xs font-mono tracking-widest uppercase text-gray-400 mb-4">
                Categories
              </p>
              <nav className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <CategoryTag
                    key={cat}
                    label={cat}
                    href={`/category/${cat}`}
                  />
                ))}
              </nav>
            </div>
          </aside>

          {/* 中央：メインコンテンツ */}
          <main className="flex-1 overflow-y-auto">{children}</main>

          {/* 右サイドバー：Instagram（md以上で表示） */}
          <aside className="hidden md:flex flex-col w-64 shrink-0 border-l border-gray-200 bg-white overflow-y-auto">
            <div className="p-5">
              <p className="text-xs font-mono tracking-widest uppercase text-gray-400 mb-4">
                Instagram
              </p>
              {/* ここにInstagramフィードを後で追加 */}
              <p className="text-xs text-gray-300">Coming soon...</p>
            </div>
          </aside>
        </div>

        <Footer />
      </body>
    </html>
  );
}
