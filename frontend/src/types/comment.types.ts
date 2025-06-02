import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().max(500, "Máximo 500 caracteres"),
});

export type CreateComment = z.infer<typeof commentSchema>;
