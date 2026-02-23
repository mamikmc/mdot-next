// app/lib/categories.ts
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
