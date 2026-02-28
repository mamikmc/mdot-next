"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstagramPost } from "@/app/lib/microcms";
import Image from "next/image";

type Props = {
  posts: InstagramPost[];
};

const rotations = [-6, 4, -3, 7, -5, 3, -7, 5];
const scales = [0.8, 0.9, 0.75, 0.85, 0.8, 0.9, 0.78, 0.82];
const petals = ["✨", "⭐", "🌟", "💫", "★"];

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

export default function InstagramFooterScroll({ posts }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const filtered = posts.filter((post) => post.image?.url);

  if (filtered.length === 0) return null;

  return (
    <div className="overflow-x-auto overflow-y-visible pb-4 px-4">
      <div className="flex gap-2 w-max py-6">
        {filtered.map((post, i) => {
          const rotate = rotations[i % rotations.length];
          const scale = scales[i % scales.length];
          return (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ rotate, scale }}
              whileTap={{ rotate: 0, scale: 0.95 }}
              className="relative block w-24 h-24 shrink-0"
              onTouchStart={() => setHoveredIndex(i)}
              onTouchEnd={() => setHoveredIndex(null)}
            >
              <Petals show={hoveredIndex === i} />
              <div
                className="rounded-xl overflow-hidden border-4 border-white shadow-md relative w-full h-full"
                style={{ outline: "1px solid rgba(255,255,255,0.3)" }}
              >
                <Image
                  src={post.image.url}
                  alt={post.title || "mdot.cafeのInstagram投稿"}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-1 gap-1 rounded-xl"
                >
                  <span className="text-sm">📸</span>
                  <p className="text-white text-[10px] font-medium text-center leading-tight">
                    {post.title}
                  </p>
                </motion.div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
