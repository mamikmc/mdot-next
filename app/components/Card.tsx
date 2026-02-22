export default function Card({
  title,
  date,
  description,
  thumbnail,
}: {
  title: string;
  date: string;
  description: string;
  thumbnail: string | null;
}) {
  return (
    <article className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="flex gap-4 items-start">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-24 h-24 object-cover rounded-lg shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <time
            dateTime={date}
            className="text-sm text-gray-500 font-medium block mb-1"
          >
            {new Date(date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </article>
  );
}
