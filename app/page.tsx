import Link from "next/link";
import Card from "./components/Card";
import { client, Post } from "./lib/microcms";

export const revalidate = 0;

// HTMLからテキストだけ抽出
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// HTMLから最初の画像URLを抽出
function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

export default async function Home() {
  const data = await client.get({
    endpoint: "posts",
    queries: { limit: 3 },
  });

  const postsList: Post[] = data.contents;

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
      </section>
    </div>
  );
}
