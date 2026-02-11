import Button from "./components/Button";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">ようこそ！</h1>
      <p className="text-lg mb-4">これはNext.jsの練習用サイトです。</p>

      <h2 className="text-2xl font-semibold mb-4 mt-8">お知らせ</h2>
      <div className="grid gap-4 mb-6">
        <Card
          title="第10回定期演奏会のお知らせ"
          date="2026年3月15日"
          description="ベートーヴェン交響曲第9番を演奏します。"
        />
        <Card
          title="団員募集中"
          date="2026年2月1日"
          description="バイオリン、ビオラ、チェロのパートで団員を募集しています。"
        />
        <Card
          title="練習日程変更"
          date="2026年1月20日"
          description="2月の練習は第2・4土曜日に変更になります。"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-3">今日の予定</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>レイアウトの作成 ✅</li>
          <li>コンポーネントの作成 ✅</li>
          <li>ページ間のリンク ✅</li>
        </ul>
      </div>

      <div className="space-x-4">
        <Button text="クリックしてね" />
        <Button text="もう一つのボタン" />
      </div>
    </div>
  );
}
