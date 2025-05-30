import { clsx, type ClassValue } from "clsx";
import { NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseError = (error: Error) => JSON.parse(error.message);

export function redirectTo(
  path: string,
  request: NextRequest,
  clearCookies = false
) {
  const response = NextResponse.redirect(new URL(path, request.url));

  if (clearCookies) {
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
  }

  return response;
}
