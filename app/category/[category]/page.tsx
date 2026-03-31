import Link from "next/link";
import Card from "@/app/components/Card";
import { client, Post } from "@/app/lib/microcms";
import Pagination from "@/app/components/Pagination";

const PER_PAGE = 12;

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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {categoryLabels[category] ?? category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.length === 0 && (
          <p className="text-gray-500">記事がありません。</p>
        )}
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card
              title={post.title}
              date={post.date}
              description={stripHtml(post.content).slice(0, 80) + "…"}
              thumbnail={post.eyecatch?.url ?? extractFirstImage(post.content)}
            />
          </Link>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/category/${category}`}
        />
      )}
    </div>
  );
}
