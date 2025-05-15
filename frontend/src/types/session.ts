import { z } from "zod";

export const SessionUserSchema = z.object({
  _id: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  roles: z.array(z.string()),
  streaming_history: z.array(z.string()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  last_login: z.string().datetime(),
});

export type SessionUser = z.infer<typeof SessionUserSchema>;
