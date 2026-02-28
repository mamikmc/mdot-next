"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramPost } from "@/app/lib/microcms";
import Image from "next/image";

type Props = {
  posts: InstagramPost[];
};

const rotations = [-6, 4, -3, 7, -5, 3, -7, 5];
const scales = [0.7, 0.8, 0.65, 0.75, 0.7, 0.8, 0.68, 0.72];
// const petals = ["🌸", "🌺", "🌼", "✿", "❀"]; // 花びら
const petals = ["✨", "⭐", "🌟", "💫", "★"]; // キラキラ
// const petals = ["🩷", "💕", "💗", "💖", "♡"]; // ハート
// const petals = ["☕", "🧁", "🍰", "🫖", "🌿"]; // カフェ

function Petals({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show &&
        [...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: 0,
              x: (Math.random() - 0.5) * 200,
              y: -(Math.random() * 150 + 40),
              scale: Math.random() * 0.8 + 0.4,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: Math.random() * 0.8 + 0.6,
              delay: Math.random() * 0.3,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: "16px",
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            {petals[Math.floor(Math.random() * petals.length)]}
          </motion.span>
        ))}
    </AnimatePresence>
  );
}

export default function InstagramScroll({ posts }: Props) {
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const filtered = posts.filter((post) => post.image?.url);
  const doubled = [...filtered, ...filtered];

  if (doubled.length === 0) return null;

  return (
    <div
      className="overflow-hidden h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={{ y: paused ? undefined : ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col -space-y-12 py-2"
      >
        {doubled.map((post, i) => {
          const rotate = rotations[i % rotations.length];
          const scale = scales[i % scales.length];
          return (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ rotate, scale }}
              whileHover={{ rotate: 0, scale: 0.95, zIndex: 50 }}
              transition={{ duration: 0.3 }}
              className="block mx-2 relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Petals show={hoveredIndex === i} />
              <div
                className="rounded-xl overflow-hidden border-4 border-white shadow-md relative"
                style={{ outline: "1px solid #e5e7eb" }}
              >
                <Image
                  src={post.image.url}
                  alt={post.title || "mdot.cafeのInstagram投稿"}
                  width={post.image.width}
                  height={post.image.height}
                  className="w-full object-cover"
                />
                {/* ホバーオーバーレイ */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-2 gap-1 rounded-xl"
                >
                  <span className="text-lg">👆</span>
                  <p className="text-white text-xs font-medium text-center">
                    {post.title}
                  </p>
                </motion.div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
