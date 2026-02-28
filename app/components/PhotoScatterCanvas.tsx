"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type ScatterPost = {
  id: string;
  title: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
};

type PhotoItem = {
  post: ScatterPost;
  left: number;
  top: number;
  rotate: number;
  size: number;
  delay: number;
};

// シード付き擬似乱数（リロードで位置が変わらない）
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// IDからカード背景色を決定
function getCardColor(id: string): string {
  const colors = [
    "#f2c4a0", // テラコッタ
    "#a8c5b5", // セージグリーン
    "#d4b8d8", // ラベンダー
    "#f0d9a0", // バター
    "#b8cdd8", // スモークブルー
    "#e8b4b8", // ダスティピンク
    "#c5d4a8", // モスグリーン
    "#d8c5a8", // サンド
  ];
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

function generatePhotoItems(
  posts: ScatterPost[],
  canvasWidth: number
): PhotoItem[] {
  const CANVAS_HEIGHT_PER_POST = 260;
  const MARGIN = 40;

  return posts.map((post, i) => {
    const r = (offset: number) => seededRandom(i * 7 + offset);

    const size = 120 + r(1) * 160; // 120〜280px
    const maxLeft = Math.max(canvasWidth - size - MARGIN, MARGIN);
    const left = MARGIN + r(2) * maxLeft;
    const top = i * CANVAS_HEIGHT_PER_POST + r(3) * 180 - 90;
    const rotate = (r(4) - 0.5) * 40; // -20〜+20deg
    const delay = i * 80 + r(5) * 60;

    return {
      post,
      left,
      top: Math.max(top, 20),
      rotate,
      size,
      delay,
    };
  });
}

type Props = {
  posts?: ScatterPost[];
};

export default function PhotoScatterCanvas({ posts = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      const w = containerRef.current?.offsetWidth ?? window.innerWidth;
      setCanvasWidth(w);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (canvasWidth > 0 && posts.length > 0) {
      setItems(generatePhotoItems(posts, canvasWidth));
      const t = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, [posts, canvasWidth]);

  const canvasHeight =
    items.length > 0
      ? Math.max(...items.map((item) => item.top + item.size)) + 120
      : 2000;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${canvasHeight}px`,
      }}
    >
      {items.map((item, i) => (
        <PhotoCard key={item.post.id} item={item} index={i} visible={visible} />
      ))}

      <style>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-140px) rotate(var(--rotate));
          }
          65% {
            opacity: 1;
          }
          82% {
            transform: translateY(8px) rotate(var(--rotate));
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(var(--rotate));
          }
        }

        .scatter-card {
          position: absolute;
          cursor: pointer;
          opacity: 0;
          transform: translateY(-140px) rotate(var(--rotate));
          will-change: transform, opacity;
          border-radius: 2px;
          overflow: hidden;
          background: #fff;
          box-shadow: 2px 4px 14px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          display: block;
        }

        .scatter-card.visible {
          animation: dropIn 0.65s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }

        .scatter-card:hover {
          transform: translateY(-8px) rotate(var(--rotate)) scale(1.05) !important;
          box-shadow: 4px 14px 36px rgba(0,0,0,0.24);
          z-index: 200 !important;
        }

        .scatter-card-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .scatter-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%);
          color: #fff;
          font-size: 11px;
          line-height: 1.35;
          padding: 22px 8px 7px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .scatter-card:hover .scatter-card-overlay {
          opacity: 1;
        }

        .scatter-card-text {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          box-sizing: border-box;
        }

        .scatter-card-text p {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
          color: rgba(0,0,0,0.65);
          font-weight: 500;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

function PhotoCard({
  item,
  index,
  visible,
}: {
  item: PhotoItem;
  index: number;
  visible: boolean;
}) {
  const { post, left, top, rotate, size, delay } = item;
  const hasImage = !!post.eyecatch?.url;
  const bgColor = getCardColor(post.id);

  return (
    <Link
      href={`/posts/${post.id}`}
      className={`scatter-card${visible ? " visible" : ""}`}
      style={
        {
          left: `${left}px`,
          top: `${top}px`,
          width: `${size}px`,
          height: `${size}px`,
          "--rotate": `${rotate}deg`,
          animationDelay: `${delay}ms`,
          zIndex: Math.floor(10 + index * 0.1),
        } as React.CSSProperties
      }
    >
      {hasImage ? (
        <div className="scatter-card-image-wrap">
          <Image
            src={post.eyecatch!.url}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
            sizes="280px"
          />
          <div className="scatter-card-overlay">{post.title}</div>
        </div>
      ) : (
        <div className="scatter-card-text" style={{ background: bgColor }}>
          <p>{post.title}</p>
        </div>
      )}
    </Link>
  );
}
