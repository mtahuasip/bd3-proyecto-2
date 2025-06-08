"use server";

import { LoginResponse } from "@/types/auth.types";
import { cookies } from "next/headers";

const TOKEN_EXPIRATION = 30 * 24 * 60 * 60; // <- 30 días

// Configuración de cookies
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax" as const,
  path: "/",
  maxAge: TOKEN_EXPIRATION,
};

export async function setSession({ token, user }: LoginResponse) {
  const cookieStore = await cookies();

  if (!token || !user) {
    throw new Error("Token and user are required to set the session.");
  }

  cookieStore.set("token", token, cookieOptions);
  cookieStore.set("user", JSON.stringify(user), cookieOptions);
}

export async function getSession(): Promise<LoginResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = cookieStore.get("user")?.value;

  if (!token && !user) return null;

  return { token, user: JSON.parse(user || "") };
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
}
