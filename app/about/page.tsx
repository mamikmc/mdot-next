// app/about/page.tsx
import { getAllPosts } from "@/app/lib/microcms";
import PhotoScatterCanvas from "@/app/components/PhotoScatterCanvas";

export default async function AboutPage() {
  const posts = await getAllPosts();

  return (
    <main>
      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <h1
          id="welcome-heading"
          className="text-4xl font-black mb-4
          bg-gradient-to-r from-rose-800 to-sky-500
          bg-clip-text text-transparent"
        >
          What we are!
        </h1>
        <p>これまでの記録。</p>
      </section>

      <PhotoScatterCanvas posts={posts} />
    </main>
  );
}
