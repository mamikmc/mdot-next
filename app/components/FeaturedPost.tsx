import Image from "next/image";
import Link from "next/link";
import { Post } from "@/app/lib/microcms";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 group"
        style={{ animation: "fadeInUp 1.2s ease forwards" }}
      >
        {post.eyecatch?.url && (
          <Image
            src={post.eyecatch.url}
            alt={post.title}
            fill
            sizes="100vw"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div
          className="absolute bottom-0 left-0 p-6 text-white"
          style={{ animation: "fadeInUp 1s ease 0.3s both" }}
        >
          <p className="text-sm mb-1 opacity-80">
            {new Date(post.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="text-2xl font-bold leading-snug">{post.title}</h2>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
}
