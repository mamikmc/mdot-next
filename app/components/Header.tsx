import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex gap-6 items-center">
        <h1 className="text-2xl font-bold">練習サイト</h1>
        <Link href="/" className="hover:underline">
          ホーム
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
}
