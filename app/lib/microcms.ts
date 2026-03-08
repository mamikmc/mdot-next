import { createClient } from "microcms-js-sdk";
import type { ScatterPost } from "@/app/components/PhotoScatterCanvas";

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
  isFeatured?: boolean; // ← 追加
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
export async function getAllPosts(): Promise<Post[]> {
  const limit = 100;
  let offset = 0;
  let allPosts: Post[] = [];

  while (true) {
    const res = await client.get<{ contents: Post[]; totalCount: number }>({
      endpoint: "posts",
      queries: {
        fields: "id,title,eyecatch",
        limit,
        offset,
      },
    });
    allPosts = [...allPosts, ...res.contents];
    if (allPosts.length >= res.totalCount) break;
    offset += limit;
  }

  return allPosts;
}
export async function getAboutPosts(): Promise<Post[]> {
  const res = await client.get<{ contents: Post[]; totalCount: number }>({
    endpoint: "posts",
    queries: {
      filters: "isAbout[equals]true",
      fields: "id,title,eyecatch",
      limit: 100,
    },
  });
  return res.contents;
}
function extractFirstImageUrl(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match?.[1];
}

export async function getAboutArchives(): Promise<ScatterPost[]> {
  const res = await client.get<{ contents: Archive[]; totalCount: number }>({
    endpoint: "archives",
    queries: {
      filters: "isAbout[equals]true",
      fields: "id,title,content",
      limit: 100,
    },
  });

  return res.contents.map((archive) => ({
    id: archive.id,
    title: archive.title,
    endpoint: "archives" as const,
    eyecatch: extractFirstImageUrl(archive.content)
      ? {
          url: extractFirstImageUrl(archive.content)!,
          width: 400,
          height: 400,
        }
      : undefined,
  }));
}
