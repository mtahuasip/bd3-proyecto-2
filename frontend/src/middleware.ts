import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

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
  const session = await getSession();

  const isPublicRoute = publicRoutes.includes(path);
  const isPublicRestricted = publicRestrictedWhenLoggedIn.includes(path);

  // Si el usuario NO tiene sesión y no es ruta pública → redirige a login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Si el usuario tiene sesión e intenta acceder a login, register o raíz → redirige a /movies
  if (session && isPublicRestricted) {
    return NextResponse.redirect(new URL("/movies", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rutas públicas
    "/",
    "/login",
    "/register",

    // Rutas privadas exactas
    "/favorites",
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
