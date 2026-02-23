import Link from "next/link";
import Card from "./components/Card";
import { client, Post } from "./lib/microcms";

export const revalidate = 0;

const PER_PAGE = 10;

// HTMLからテキストだけ抽出
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// HTMLから最初の画像URLを抽出
function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * PER_PAGE;

  const data = await client.get({
    endpoint: "posts",
    queries: {
      limit: PER_PAGE,
      offset,
      orders: "-date", // 新しい順
    },
  });

  const postsList: Post[] = data.contents;
  const totalCount: number = data.totalCount;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <section aria-labelledby="welcome-heading">
        <h1
          id="welcome-heading"
          className="text-6xl font-black mb-4
          bg-gradient-to-r from-pink-800 to-blue-500
          bg-clip-text text-transparent"
        >
          ようこそ！
        </h1>
        <p className="text-lg mb-16 text-gray-700">
          これはNext.jsの練習用サイトです。
        </p>
      </section>

      <section aria-labelledby="posts-heading">
        <h2
          id="posts-heading"
          className="text-3xl font-bold mb-6 text-gray-900"
        >
          お知らせ
        </h2>
        <div className="grid gap-6 mb-12">
          {postsList.map((post) => (
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
                href={`/?page=${currentPage - 1}`}
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
                href={`/?page=${p}`}
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
                href={`/?page=${currentPage + 1}`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                次へ →
              </Link>
            ) : (
              <span className="px-3 py-2 text-sm text-gray-300">次へ →</span>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
