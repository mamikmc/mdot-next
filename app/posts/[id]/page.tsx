import Link from "next/link";
import { getPostDetail } from "@/app/lib/microcms";
import RichText from "@/app/components/RichText";
import { CategoryTag, CategoryTagList } from "@/app/components/CategoryTag"; // CategoryTagListを追加

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostDetail(id);

  const formattedDate = new Date(post.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        ← 一覧に戻る
      </Link>
      <time className="text-sm text-gray-500 font-medium block mb-3">
        {formattedDate}
      </time>

      {post.category && post.category.length > 0 && (
        <div className="mb-4">
          <CategoryTagList
            tags={post.category.map((cat) => ({
              label: cat,
              href: `/category/${cat}`,
            }))}
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{post.title}</h1>
      <RichText content={post.content} />
    </article>
  );
}
