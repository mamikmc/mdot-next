import Button from "./components/Button";
import Card from "./components/Card";
import { client, News } from "./lib/microcms";

// この行を追加（ファイルの先頭、importの後）
export const revalidate = 0; // キャッシュを無効化して常に最新データを取得

export default async function Home() {
  const data = await client.get({
    endpoint: "news",
    queries: { limit: 3 },
  });

  const newsList: News[] = data.contents;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 以下は変更なし */}
      <h1 className="text-4xl font-bold mb-6">ようこそ！</h1>
      <p className="text-lg mb-4">これはNext.jsの練習用サイトです。</p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">お知らせ</h2>
      <div className="grid gap-4 mb-6">
        {newsList.map((news) => (
          <Card
            key={news.id}
            title={news.title}
            date={news.date}
            description={news.content}
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-3">今日の予定</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>レイアウトの作成 ✅</li>
          <li>コンポーネントの作成 ✅</li>
          <li>ページ間のリンク ✅</li>
          <li>microCMS連携 ✅</li>
        </ul>
      </div>

      <div className="space-x-4">
        <Button text="クリックしてね" />
        <Button text="もう一つのボタン" />
      </div>
    </div>
  );
}
