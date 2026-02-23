import Link from "next/link";
import Card from "@/app/components/Card";
import { client, Post } from "@/app/lib/microcms";

const PER_PAGE = 10;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

// microCMSのカテゴリーキーと表示名の対応
const categoryLabels: { [key: string]: string } = {
  event: "イベント",
  interior: "インテリア",
  garden: "ガーデン",
  cafe: "カフェ",
  bakery: "ベーカリー",
  food: "フード",
  camera: "カメラ",
  music: "音楽",
  handmade: "ハンドメイド",
  pet: "ペット",
  shop: "ショップ",
  news: "ニュース",
};

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * PER_PAGE;

  const data = await client.get({
    endpoint: "posts",
    queries: {
      filters: `category[contains]${category}`,
      limit: PER_PAGE,
      offset,
      orders: "-date",
    },
  });

  const posts: Post[] = data.contents;
  const totalCount: number = data.totalCount;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {categoryLabels[category] ?? category}
      </h1>

      <div className="grid gap-6 mb-12">
        {posts.length === 0 && (
          <p className="text-gray-500">記事がありません。</p>
        )}
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card
              title={post.title}
              date={post.date}
              description={stripHtml(post.content).slice(0, 80) + "…"}
              thumbnail={extractFirstImage(post.content)}
            />
          </Link>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <nav
          aria-label="ページネーション"
          className="flex justify-center items-center gap-2 mt-8"
        >
          {/* 前へ */}
          {currentPage > 1 ? (
            <Link
              href={`/category/${slug}?page=${currentPage - 1}`}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← 前へ
            </Link>
          ) : (
            <span className="px-3 py-2 text-sm text-gray-300">← 前へ</span>
          )}

          {/* ページ番号 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/category/${slug}?page=${p}`}
              className={[
                "w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors",
                p === currentPage
                  ? "bg-gray-900 text-white font-bold"
                  : "text-gray-600 hover:bg-gray-100",
              ].join(" ")}
            >
              {p}
            </Link>
          ))}

          {/* 次へ */}
          {currentPage < totalPages ? (
            <Link
              href={`/category/${slug}?page=${currentPage + 1}`}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              次へ →
            </Link>
          ) : (
            <span className="px-3 py-2 text-sm text-gray-300">次へ →</span>
          )}
        </nav>
      )}
    </div>
  );
}
