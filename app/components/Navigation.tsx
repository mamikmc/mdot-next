"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      <Link
        href="/"
        className={pathname === "/" ? "text-sky-600 font-bold" : ""}
      >
        Home
      </Link>

      <Link
        href="/about"
        className={
          pathname.startsWith("/about") ? "text-sky-600 font-bold" : ""
        }
      >
        About
      </Link>

      <Link
        href="/concerts"
        className={
          pathname.startsWith("/concerts") ? "text-sky-600 font-bold" : ""
        }
      >
        Concerts
      </Link>
    </nav>
  );
}
