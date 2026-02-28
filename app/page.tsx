import Link from "next/link";
import Card from "./components/Card";
import { client, Post, Archive } from "./lib/microcms";
import { HomeIcon } from "@heroicons/react/24/solid";
import Pagination from "./components/Pagination";

export const revalidate = 0;

const PER_PAGE = 10;

// HTMLからテキストだけ抽出
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

// HTMLから最初の画像URLを抽出
function extractFirstImage(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

type UnifiedPost = {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: string[];
  type: "post" | "archive";
  eyecatch?: { url: string; width: number; height: number }; // ← 追加
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // 全件取得（100件ずつ複数回リクエスト）
  async function fetchAll(endpoint: string) {
    const first = await client.get({
      endpoint,
      queries: { limit: 100, offset: 0, orders: "-date" },
    });
    const total = first.totalCount;
    if (total <= 100) return first.contents;

    const requests = [];
    for (let offset = 100; offset < total; offset += 100) {
      requests.push(
        client.get({
          endpoint,
          queries: { limit: 100, offset, orders: "-date" },
        })
      );
    }
    const rest = await Promise.all(requests);
    return [
      ...first.contents,
      ...rest.flatMap((r: { contents: unknown[] }) => r.contents),
    ];
  }

  const [postsContents, archivesContents] = await Promise.all([
    fetchAll("posts"),
    fetchAll("archives"),
  ]);

  // マージして日付順にソート
  const allPosts: UnifiedPost[] = [
    ...postsContents.map((p: Post) => ({ ...p, type: "post" as const })),
    ...archivesContents.map((a: Archive) => ({
      ...a,
      type: "archive" as const,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalCount = allPosts.length;
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const offset = (currentPage - 1) * PER_PAGE;
  const postsList = allPosts.slice(offset, offset + PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <section aria-labelledby="welcome-heading">
        <h1
          id="welcome-heading"
          className="text-4xl font-black mb-4
          bg-gradient-to-r from-rose-800 to-sky-500
          bg-clip-text text-transparent"
        >
          Welcome to mdot site!
        </h1>
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
            <Link
              key={`${post.type}-${post.id}`}
              href={
                post.type === "post"
                  ? `/posts/${post.id}`
                  : `/archives/${post.id}`
              }
            >
              <Card
                title={post.title}
                date={post.date}
                description={stripHtml(post.content).slice(0, 80) + "…"}
                thumbnail={
                  post.eyecatch?.url ?? extractFirstImage(post.content) // ← 変更
                }
              />
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/"
          />
        )}
      </section>
    </div>
  );
}
