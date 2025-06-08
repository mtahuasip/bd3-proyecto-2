import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/movies",
  "/categories",
  "/about",
  "/help",
];

// Rutas públicas restringidas si el usuario ya está autenticado
const publicRestrictedWhenLoggedIn = ["/", "/login", "/register"];

function redirectTo(path: string, request: NextRequest, clearCookies = false) {
  const response = NextResponse.redirect(new URL(path, request.url));

  if (clearCookies) {
    response.cookies.delete("token");
    response.cookies.delete("user");
  }

  return response;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();
  const isPublic = publicRoutes.includes(pathname);
  const isPublicRestricted = publicRestrictedWhenLoggedIn.includes(pathname);

  if (!session && !isPublic) {
    return redirectTo("/login", request);
  }

  if (session && isPublicRestricted) {
    return redirectTo("/movies", request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rutas públicas
    "/",
    "/login",
    "/register",
    "/favorites",

    // Rutas privadas exactas
    "/favorites/:slug*",
    "/playlists",
    "/playlists/:slug*",
    "/profile",
    "/change-password",
    "/update-profile",

    // Dinámicas protegidas
    "/movies/:slug*",
    "/categories/:slug*",
  ],
};
