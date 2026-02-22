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

  const navItems = items || [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/category/concert", label: "Concerts" },
    { href: "/category/handmade", label: "Handmade" },
  ];

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            item.href === "/"
              ? pathname === "/"
                ? "text-sky-600 font-bold"
                : "transition-colors duration-200 hover:text-sky-600"
              : pathname.startsWith(item.href)
              ? "text-sky-600 font-bold"
              : "transition-colors duration-200 hover:text-sky-600"
          }
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
