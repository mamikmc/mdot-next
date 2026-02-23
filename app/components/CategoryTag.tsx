// components/CategoryTag.tsx
import Link from "next/link";
import { CATEGORIES } from "@/app/lib/categories";

// ─── 型定義 ───────────────────────────────────────────
export interface CategoryTagProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface CategoryTagListProps {
  tags: CategoryTagProps[];
}

// ─── カテゴリーごとの色設定 ────────────────────────────
// カテゴリーを追加するときは microcms.ts の CATEGORIES だけ更新すればOK！
// ※ Tailwindはクラス名を動的生成できないため完全なクラス名で記述する
const CATEGORY_COLOR_MAP: Record<
  Category,
  { border: string; text: string; dot: string; hover: string }
> = {
  event: {
    border: "border-[#c84b2f]",
    text: "text-[#c84b2f]",
    dot: "bg-[#c84b2f]",
    hover: "hover:bg-[#c84b2f]/10",
  },
  interior: {
    border: "border-[#8b5e3c]",
    text: "text-[#8b5e3c]",
    dot: "bg-[#8b5e3c]",
    hover: "hover:bg-[#8b5e3c]/10",
  },
  garden: {
    border: "border-[#6b8c4b]",
    text: "text-[#6b8c4b]",
    dot: "bg-[#6b8c4b]",
    hover: "hover:bg-[#6b8c4b]/10",
  },
  cafe: {
    border: "border-[#8f6b2e]",
    text: "text-[#8f6b2e]",
    dot: "bg-[#8f6b2e]",
    hover: "hover:bg-[#8f6b2e]/10",
  },
  bakery: {
    border: "border-[#c87d3a]",
    text: "text-[#c87d3a]",
    dot: "bg-[#c87d3a]",
    hover: "hover:bg-[#c87d3a]/10",
  },
  food: {
    border: "border-[#c84b6b]",
    text: "text-[#c84b6b]",
    dot: "bg-[#c84b6b]",
    hover: "hover:bg-[#c84b6b]/10",
  },
  camera: {
    border: "border-[#2e6b8f]",
    text: "text-[#2e6b8f]",
    dot: "bg-[#2e6b8f]",
    hover: "hover:bg-[#2e6b8f]/10",
  },
  music: {
    border: "border-[#6b3a7d]",
    text: "text-[#6b3a7d]",
    dot: "bg-[#6b3a7d]",
    hover: "hover:bg-[#6b3a7d]/10",
  },
  handmade: {
    border: "border-[#2e8f7a]",
    text: "text-[#2e8f7a]",
    dot: "bg-[#2e8f7a]",
    hover: "hover:bg-[#2e8f7a]/10",
  },
  pet: {
    border: "border-[#4b8f2e]",
    text: "text-[#4b8f2e]",
    dot: "bg-[#4b8f2e]",
    hover: "hover:bg-[#4b8f2e]/10",
  },
  shop: {
    border: "border-[#3a6b8f]",
    text: "text-[#3a6b8f]",
    dot: "bg-[#3a6b8f]",
    hover: "hover:bg-[#3a6b8f]/10",
  },
  news: {
    border: "border-[#7d7d2e]",
    text: "text-[#7d7d2e]",
    dot: "bg-[#7d7d2e]",
    hover: "hover:bg-[#7d7d2e]/10",
  },
};

// 対応表にないカテゴリーが来たときのフォールバック
const FALLBACK = {
  border: "border-gray-400",
  text: "text-gray-400",
  dot: "bg-gray-400",
  hover: "hover:bg-gray-400/10",
};

// ─── CategoryTag ──────────────────────────────────────
export function CategoryTag({ label, href, onClick }: CategoryTagProps) {
  const c = CATEGORY_COLOR_MAP[label as Category] ?? FALLBACK;

  const className = [
    "inline-flex items-center gap-1.5",
    "px-3.5 py-1",
    "rounded-full border-[1.5px]",
    "font-mono text-[0.72rem] tracking-widest uppercase",
    "transition-all duration-150 hover:-translate-y-px",
    c.border,
    c.text,
    c.hover,
  ].join(" ");

  const inner = (
    <>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <span className={className} onClick={onClick}>
      {inner}
    </span>
  );
}

// ─── CategoryTagList ──────────────────────────────────
export function CategoryTagList({ tags }: CategoryTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <CategoryTag key={i} {...tag} />
      ))}
    </div>
  );
}
