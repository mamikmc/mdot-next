export default function Card({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) {
  return (
    <article className="bg-white p-9 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
      <time
        dateTime={date}
        className="text-sm text-gray-500 font-medium block mb-3"
      >
        {new Date(date).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <div
        className="text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </article>
  );
}
