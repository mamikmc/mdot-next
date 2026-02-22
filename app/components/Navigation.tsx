"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  href: string;
  label: string;
};

type NavigationProps = {
  items?: NavItem[];
  onNavigate?: () => void;
  className?: string;
};

export default function Navigation({
  items,
  onNavigate,
  className = "flex gap-6",
}: NavigationProps) {
  const pathname = usePathname();

  // items が渡されなかった場合のデフォルト
  const navItems = items || [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/concerts", label: "Concerts" },
  ];

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href || pathname.startsWith(item.href)
              ? "text-sky-600 font-bold"
              : ""
          }
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
