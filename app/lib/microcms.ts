import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// 画像型
export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

// Post型
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

// Archive型
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

// Instagram型
export type InstagramPost = {
  id: string;
  image: MicroCMSImage;
  url: string;
  title?: string; // 追加
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const data = await client.getList<InstagramPost>({
    endpoint: "instagram",
    queries: { limit: 20 },
  });
  return data.contents;
}
