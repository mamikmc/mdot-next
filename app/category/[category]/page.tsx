import Link from "next/link";
import Card from "@/app/components/Card";
import { client, Post } from "@/app/lib/microcms";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

const categoryLabels: { [key: string]: string } = {
  concert: "コンサート",
  handmade: "ハンドメイド",
  blog: "ブログ",
};

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const data = await client.get({
    endpoint: "posts",
    queries: {
      filters: `category[contains]${category}`,
    },
  });

  const posts: Post[] = data.contents;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {categoryLabels[category] ?? category}
      </h1>
      <div className="grid gap-6">
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
    </div>
  );
}
