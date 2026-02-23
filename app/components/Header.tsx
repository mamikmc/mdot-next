"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MStarLogo from "./MStarLogo";
import Navigation from "./Navigation";
import { CategoryTag } from "./CategoryTag";
import { designConfig } from "@/app/config/design";
import { CATEGORIES } from "@/app/lib/categories";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Escで閉じる
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-neutral-200 text-gray-600 body-font backdrop-blur relative ${designConfig.header.pattern}`}
    >
      <div className="container mx-auto flex items-center justify-between p-5 relative z-10">
        {/* ロゴ（トップへ） */}
        <Link
          href="/"
          aria-label="トップページへ戻る"
          className="group inline-flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
          onClick={() => setOpen(false)}
        >
          <MStarLogo variant="default" />
          <span className="ml-3 text-xl font-medium text-gray-900">mdot</span>
        </Link>

        {/* PCナビ（md以上で表示） */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* モバイル：ハンバーガー（md未満で表示） */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-2xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {/* モバイルメニュー */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-neutral-200 bg-white relative z-50"
        >
          <div className="px-5 py-6 flex flex-col gap-8">
            {/* ナビゲーション */}
            <Navigation
              onNavigate={() => setOpen(false)}
              className="flex flex-col gap-4"
            />

            {/* カテゴリー一覧 */}
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-gray-400 mb-3">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <CategoryTag
                    key={cat}
                    label={cat}
                    href={`/category/${cat}`}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
