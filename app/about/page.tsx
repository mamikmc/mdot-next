// app/about/page.tsx
import { getAboutPosts, getAboutArchives } from "@/app/lib/microcms";
import PhotoScatterCanvas from "@/app/components/PhotoScatterCanvas";
import Link from "next/link";

export default async function AboutPage() {
  const [posts, archives] = await Promise.all([
    getAboutPosts(),
    getAboutArchives(),
  ]);
  const items = [...posts, ...archives];

  return (
    <main>
      {/* ヒーローセクション */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <h1
          id="welcome-heading"
          className="text-4xl font-black mb-4
          bg-gradient-to-r from-rose-800 to-sky-500
          bg-clip-text text-transparent"
        >
          What we are!
        </h1>
        <p className="text-sm text-gray-400 tracking-widest">
          これまでの記録。
        </p>
      </section>

      {/* 写真散らばりアニメーション */}
      <PhotoScatterCanvas posts={items} />

      {/* コンテンツセクション */}
      <section
        className="max-w-xl mx-auto px-10 py-12 my-10 rounded-sm relative font-kurenaido"
        style={{
          backgroundColor: "#fdfaf5",
          backgroundImage: `repeating-linear-gradient(
            transparent,
            transparent 35px,
            #e8ddd0 35px,
            #e8ddd0 36px
          )`,
          boxShadow: "2px 4px 14px rgba(0,0,0,0.07)",
        }}
      >
        {/* 左マージン線 */}
        <div className="absolute left-16 top-0 bottom-0 w-px bg-rose-200 opacity-50" />

        {/* 日付 */}
        <p className="text-xs text-gray-400 text-right mb-6 tracking-widest">
          2012 —
        </p>

        <p className="text-[15px] text-gray-600 leading-9 mb-6">
          mdotサイトへようこそ。
        </p>

        <div className="space-y-5 text-[15px] text-gray-600 leading-9">
          <p>
            mdotはバンコクで出会った3人の仲良しママが、2012年に立ち上げました。
            異国の地で「かわいいものがなかなか見つからない！」って話になって、
            じゃあ自分たちで集めよう、と。そんな小さな共感から始まりました。
          </p>
          <p>
            その後、たくさんの方に応援していただいて、東京・名古屋にも拠点を置けるように。
            2017年には新メンバーのmicanも加わって、カナダ・トロントからmdot.canadaをスタートしました。
            気づけば国をまたいだチームになっていました。
          </p>
        </div>

        {/* 区切り：破線 */}
        <div className="my-8 flex items-center gap-2 opacity-30">
          <div className="flex-1 border-t border-dashed border-gray-400" />
          <span className="text-gray-400 text-xs">✉</span>
          <div className="flex-1 border-t border-dashed border-gray-400" />
        </div>

        <div className="space-y-5 text-[15px] text-gray-600 leading-9">
          <p>
            そして2024年7月、節目の10年を越えた夏に、名古屋にmdot
            cafeをオープンしました。
          </p>
          <p>
            ハンドメイドが好き、かわいいものが好き、そういう気持ちを大切にしながら、
            今もここで続けています。名古屋に来ることがあれば、ぜひ顔を出してみてください。
          </p>
        </div>

        {/* 署名 */}
        <p className="mt-8 text-right text-gray-400 text-base tracking-wider">
          — mdot
        </p>

        {/* CTA */}
        <div className="mt-8 text-right">
          <Link
            href="/category/cafe"
            className="inline-flex items-center gap-3 text-xs text-rose-400 hover:text-rose-500 transition-colors tracking-widest"
          >
            <span className="w-6 h-px bg-rose-300 inline-block" />
            mdot cafe
          </Link>
        </div>
      </section>
    </main>
  );
}
