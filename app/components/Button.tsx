"use client";

export default function Button({ text }: { text: string }) {
  const handleClick = () => {
    alert(`${text}がクリックされました！`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}
