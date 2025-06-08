import { z } from "zod";
import { authUserSchema } from "./auth.types";
import { movieSchema } from "./movies.types";

export const commentSchema = z.object({
  _id: z.string(),
  user: authUserSchema,
  content: z.string(),
  movie: movieSchema,
  // answers: z.array(z.any()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createCommentSchema = z.object({
  content: z.string(),
});

export type CommentType = z.infer<typeof commentSchema>;
export type CreateComment = z.infer<typeof createCommentSchema>;
