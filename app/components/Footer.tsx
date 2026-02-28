import { designConfig } from "@/app/config/design";
import { getInstagramPosts } from "@/app/lib/microcms";
import InstagramFooterScroll from "./InstagramFooterScroll";

export default async function Footer() {
  const instagramPosts = await getInstagramPosts();

  return (
    <footer
      className={`${designConfig.footer.bg} ${designConfig.footer.pattern} text-white relative`}
      role="contentinfo"
    >
      {/* スマホのみInstagram横スクロール */}
      <div className="md:hidden">
        <div className="px-4 pt-6 pb-2">
          <p className="text-xs font-mono tracking-widest uppercase text-white/60 mb-3">
            Instagram
          </p>
        </div>
        <InstagramFooterScroll posts={instagramPosts} />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 text-center relative z-10">
        <p className="text-white">
          © {new Date().getFullYear()} mdot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
