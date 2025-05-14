import { meRequest } from "@/services/auth";
import { cookies } from "next/headers";

const JWT_ACCESS_COOKIE_NAME = process.env.JWT_ACCESS_COOKIE_NAME || "cookie";

export async function getSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader.includes(JWT_ACCESS_COOKIE_NAME)) return null;

  try {
    return await meRequest({ Cookie: cookieHeader });
  } catch (error: any) {
    return error.message || "Ocurrió un error inesperado";
  }
}
