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
  calendar?: CalendarData[]; // calendarを追加
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
  title?: string;
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const data = await client.getList<InstagramPost>({
    endpoint: "instagram",
    queries: { limit: 20 },
  });
  return data.contents;
}

export type CalendarData = {
  id: string;
  year: number;
  month: number;
  businessDays: string;
};

export async function getCalendar(
  year: number,
  month: number
): Promise<CalendarData | null> {
  try {
    const data = await client.getList<CalendarData>({
      endpoint: "calendar",
      queries: { filters: `year[equals]${year}[and]month[equals]${month}` },
    });
    return data.contents[0] || null;
  } catch {
    return null;
  }
}
