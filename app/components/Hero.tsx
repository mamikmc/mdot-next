import Image from "next/image";

export default function Hero() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-start text-left mb-16 md:mb-0">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            武蔵野ドット
            <br className="hidden lg:inline-block" />
            オーケストラ
          </h1>
          <p className="mb-8 leading-relaxed">
            三鷹を拠点に活動するアマチュアオーケストラです。年2回の定期演奏会を中心に、音楽を通じて地域の皆様との交流を大切にしています。団員随時募集中です。
          </p>
          <div className="flex">
            <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
              詳しく見る
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src="https://images.unsplash.com/photo-1743706752072-977f6b04d272?w=700"
            alt="オーケストラ演奏"
            width={720}
            height={600}
            className="object-cover object-center rounded"
          />
        </div>
      </div>
    </section>
  );
}
