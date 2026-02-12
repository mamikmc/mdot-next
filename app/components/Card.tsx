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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
