import Image from "next/image";

export default function Card({
  title,
  date,
  description,
  thumbnail,
  priority = false,
}: {
  title: string;
  date: string;
  description: string;
  thumbnail: string | null;
  priority?: boolean;
}) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col">
      {thumbnail ? (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-gray-100" />
      )}

      <div className="p-4 flex flex-col flex-1">
        <time
          dateTime={date}
          className="text-xs text-gray-500 font-medium block mb-1"
        >
          {new Date(date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="text-base font-bold mb-2 text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
}
