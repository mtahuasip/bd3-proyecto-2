"use server";

import api from "@/lib/fetch";
import { CommentType, CreateComment } from "@/types/comment.types";

export const postComment = async (formData: CreateComment) =>
  await api({ method: "POST", endpoint: "/comments", body: formData });

export const getCommentsByMovie = async (id: string): Promise<CommentType[]> =>
  await api({ endpoint: `/comments/movie/${id}` });
