// app/components/Pagination.tsx
import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string; // 例: "/" や "/category/handmade"
};

// 表示するページ番号を計算（省略形対応）
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // 常に最初のページ
  pages.push(1);

  if (current > 3) {
    pages.push("...");
  }

  // 現在ページの前後2ページ
  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  // 常に最後のページ
  pages.push(total);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const sep = basePath.includes("?") ? "&" : "?";

  return (
    <nav
      aria-label="ページネーション"
      className="flex justify-center items-center gap-1 mt-8 flex-wrap"
    >
      {/* 前へ */}
      {currentPage > 1 ? (
        <Link
          href={`${basePath}${sep}page=${currentPage - 1}`}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← 前へ
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-gray-300">← 前へ</span>
      )}

      {/* ページ番号 */}
      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 py-2 text-sm text-gray-400"
          >
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={`${basePath}${sep}page=${p}`}
            className={[
              "w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors",
              p === currentPage
                ? "bg-gray-900 text-white font-bold"
                : "text-gray-600 hover:bg-gray-100",
            ].join(" ")}
          >
            {p}
          </Link>
        )
      )}

      {/* 次へ */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}${sep}page=${currentPage + 1}`}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          次へ →
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-gray-300">次へ →</span>
      )}
    </nav>
  );
}
