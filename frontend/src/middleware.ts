import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const protectedRoutes = [
  "/favorites",
  "/playlists",
  "/profile",
  "/change-password",
  "/update-profile",
];
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/movies",
  "/categories",
  "/about",
  "/help",
];

const publicRestrictedWhenLoggedIn = ["/", "/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isPublicRestrictedWhenLoggedIn =
    publicRestrictedWhenLoggedIn.includes(path);

  const session = await getSession();

  if (isProtectedRoute && !session?._id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?._id && isPublicRestrictedWhenLoggedIn) {
    return NextResponse.redirect(new URL("/movies", req.nextUrl));
  }

  return NextResponse.next();
}
