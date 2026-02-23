import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: string[];
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
