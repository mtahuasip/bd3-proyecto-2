import { z } from "zod";

export const movieSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  year: z.number(),
  categories: z.array(z.string()),
  views: z.number(),
  cover_url: z.string().url(),
  poster_url: z.string().url(),
  thumbnail_url: z.string().url(),
  video_url: z.string().url(),
  slug: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const yearSchema = z.object({
  id: z.string(),
  year: z.number(),
});

export const enum TimeFrame {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export type Movie = z.infer<typeof movieSchema>;
export type Year = z.infer<typeof yearSchema>;
