"use server";

import api from "@/lib/fetch";

export const postComment = async (formData: unknown) =>
  await api({ method: "POST", endpoint: "/comments", body: formData });
