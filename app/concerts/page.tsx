import Card from "../components/Card";
import Image from "next/image";
import Hero from "../components/Hero";

export default function Concerts() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <main>
        <h1 className="text-3xl font-bold mb-6">演奏会情報</h1>

        <Hero />

        <div className="mb-8">
          <Image
            src="https://images.unsplash.com/photo-1743706752072-977f6b04d272?w=700"
            alt="オーケストラ演奏"
            width={400}
            height={200}
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
            thumbnail={null} // ← これを追加
          />
        </div>
      </main>
    </div>
  );
}
