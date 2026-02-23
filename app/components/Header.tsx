"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MStarLogo from "./MStarLogo";
import Navigation from "./Navigation";
import { designConfig } from "@/app/config/design";

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

        {/* PCナビ */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* モバイル：ハンバーガー */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* いちばん簡単なアイコン */}
          <span className="text-2xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {/* モバイルメニュー（超基本：下に展開） */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 relative z-50">
          <div className="px-5 py-6">
            <Navigation
              onNavigate={() => setOpen(false)}
              className="flex flex-col gap-6"
            />
          </div>
        </div>
      )}
    </header>
  );
}
