import { cookies } from "next/headers";

const JWT_ACCESS_COOKIE_NAME = process.env.JWT_ACCESS_COOKIE_NAME || "cookie";

export async function getSession(): Promise<Record<string, string> | null> {
  const cookieStore = await cookies();
  const session = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!session.includes(JWT_ACCESS_COOKIE_NAME)) return null;

  return { Cookie: session };
}
