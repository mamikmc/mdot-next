import Link from "next/link";
import { getArchiveDetail } from "@/app/lib/microcms";
import { CategoryTagList } from "@/app/components/CategoryTag";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArchiveDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getArchiveDetail(id);

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
      <div
        className="prose prose-gray max-w-none
    [&_img]:rounded-lg
    [&_img]:max-w-xs
    [&_img]:float-left
    [&_img]:mr-6
    [&_img]:mb-4
    [&_img]:clear-left
    [&_p]:clear-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="clear-both" />
    </article>
  );
}
