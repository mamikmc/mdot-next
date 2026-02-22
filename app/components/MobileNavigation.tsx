"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./Navigation";

export default function MobileNavigation({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative md:hidden ml-auto">
      {/* ボタン */}
      <button
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-md p-2
                   text-neutral-700 hover:bg-neutral-100
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
                   dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        {/* ハンバーガー / × */}
        <span className="relative block h-5 w-6">
          <span
            className={[
              "absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-200",
              open ? "translate-y-2 rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 top-2 h-0.5 w-6 bg-current transition-opacity duration-200",
              open ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 top-4 h-0.5 w-6 bg-current transition-transform duration-200",
              open ? "-translate-y-2 -rotate-45" : "",
            ].join(" ")}
          />
        </span>
      </button>

      {/* メニュー本体 */}
      {open && (
        <div
          id="mobile-nav"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg
                     dark:border-neutral-800 dark:bg-neutral-900"
        >
          <nav className="flex flex-col">
            {items.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
