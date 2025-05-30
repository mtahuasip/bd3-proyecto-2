"use server";

import { refreshToken, verifyToken } from "@/services/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parseError } from "./utils";

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

const TOKEN_EXPIRATION = 30 * 24 * 60 * 60; // <- 30 días

// Configuración de cookies
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax" as const,
  path: "/",
  maxAge: TOKEN_EXPIRATION,
};

export async function setSession({ accessToken, refreshToken }: SessionTokens) {
  const cookieStore = await cookies();

  const setCookie = (name: string, token: string) =>
    cookieStore.set(name, token, cookieOptions);

  setCookie("access_token", accessToken);
  setCookie("refresh_token", refreshToken);
}

export async function getSession(): Promise<SessionTokens | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) return null;

  return { accessToken, refreshToken } as SessionTokens;
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export async function validateTokenOrRefresh(
  // accessToken: string,
  refreshTokenValue: string | undefined
  // request: NextRequest
) {
  try {
    await verifyToken();
    return true;
  } catch (error) {
    const parsed = parseError(error as Error);

    if (parsed.status === 401 && refreshTokenValue) {
      const refresh = await refreshToken(refreshTokenValue);
      if (refresh.status && refresh.accessToken) {
        const response = NextResponse.next();
        response.cookies.set(
          "access_token",
          refresh.accessToken,
          cookieOptions
        );

        const cookieStore = await cookies();
        cookieStore.set("access_token", refresh.accessToken, cookieOptions);

        // console.log(
        //   "access_token que antiguo",
        //   cookieStore.get("access_token")?.value || ""
        // );
        // console.log("access_token que llega", refresh.accessToken);
        // console.log(
        //   "access_token que se renovado en el middleware",
        //   response.cookies.get("access_token")?.value || ""
        // );
        // console.log(
        //   "access_token que renovado en session",
        //   cookieStore.get("access_token")?.value
        // );
        return response;
      }
    }

    return false;
  }
}
