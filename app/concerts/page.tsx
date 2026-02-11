import Card from "../components/Card";
import Image from "next/image";

export default function Concerts() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">演奏会情報</h1>

      <div className="mb-8">
        <Image
          src="https://images.unsplash.com/photo-1743706752072-977f6b04d272?w=700"
          alt="オーケストラ演奏"
          width={800}
          height={400}
          className="rounded-lg"
        />
      </div>

      <div className="grid gap-6">
        <Card
          title="第10回定期演奏会"
          date="2026年3月15日（土） 14:00開演"
          description={`会場：三鷹市芸術文化センター 風のホール

曲目：
・ベートーヴェン：交響曲第9番「合唱付き」
・モーツァルト：アイネ・クライネ・ナハトムジーク

指揮：田中太郎
入場料：一般 2,000円 / 学生 1,000円`}
        />

        <Card
          title="第9回定期演奏会（終了）"
          date="2025年9月20日（土）"
          description={`会場：三鷹市公会堂

曲目：
・ドヴォルザーク：交響曲第9番「新世界より」
・チャイコフスキー：弦楽セレナード

多くのご来場ありがとうございました。`}
        />

        <Card
          title="サマーコンサート（終了）"
          date="2025年7月5日（日）"
          description="会場：三鷹市民センター。軽やかな夏の音楽をお届けしました。ご来場ありがとうございました。"
        />
      </div>
    </div>
  );
}
