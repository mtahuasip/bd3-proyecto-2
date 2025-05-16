import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Category = z.infer<typeof categorySchema>;
