import Link from "next/link";
import Image from "next/image"; // ← 追加
import { getPostDetail } from "@/app/lib/microcms";
import RichText from "@/app/components/RichText";
import { CategoryTag, CategoryTagList } from "@/app/components/CategoryTag";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostDetail(id);

  console.log("post data:", JSON.stringify(post, null, 2)); // ← 追加

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

      {/* アイキャッチ画像 */}
      {post.eyecatch && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.eyecatch.url}
            width={post.eyecatch.width}
            height={post.eyecatch.height}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, 768px"
            quality={80}
            priority // 最初に見える画像なのでpriority
            className="w-full h-auto"
          />
        </div>
      )}

      <RichText content={post.content} />

      {/* 複数画像ギャラリー */}
      {post.images && post.images.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-4">
          {post.images.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={`${post.title} - 画像${index + 1}`}
                sizes="(max-width: 768px) 50vw, 384px"
                quality={80}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
