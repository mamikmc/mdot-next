import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// 画像型（追加）
export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

// Post型（eyecatch・images を追加、元の定義を置き換え）
export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: string[];
  eyecatch?: MicroCMSImage;
  images?: MicroCMSImage[];
};

export async function getPostDetail(id: string): Promise<Post> {
  return client.get({
    endpoint: "posts",
    contentId: id,
  });
}

export const CATEGORIES = [
  "event",
  "interior",
  "garden",
  "cafe",
  "bakery",
  "food",
  "camera",
  "music",
  "handmade",
  "pet",
  "shop",
  "news",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Archiveはそのまま
export type Archive = {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: string[];
};

export async function getArchiveDetail(id: string): Promise<Archive> {
  return client.get({
    endpoint: "archives",
    contentId: id,
  });
}
