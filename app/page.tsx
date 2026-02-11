// app/page.tsx
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">ようこそ！</h1>
      <p className="text-lg mb-4">これはNext.jsの練習用サイトです。</p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">今日の予定</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>レイアウトの作成 ✅</li>
          <li>コンポーネントの作成</li>
          <li>ページ間のリンク</li>
        </ul>
      </div>
    </div>
  );
}
