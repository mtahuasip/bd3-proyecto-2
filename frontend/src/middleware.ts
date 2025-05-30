import { NextRequest, NextResponse } from "next/server";
import { validateTokenOrRefresh } from "./lib/session";
import { redirectTo } from "./lib/utils";

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

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshTokenValue = request.cookies.get("refresh_token")?.value;

  const isPublic = publicRoutes.includes(pathname);
  const isPublicRestricted = publicRestrictedWhenLoggedIn.includes(pathname);

  // Redirigir a login si no hay sesión y ruta no es pública
  if (!accessToken && !isPublic) {
    return redirectTo("/login", request);
  }

  // Validar token y refrescar si expiró
  if (accessToken) {
    // const tokenIsValid = await validateTokenOrRefresh(
    //   accessToken,
    //   refreshTokenValue,
    //   request
    // );
    const tokenIsValid = await validateTokenOrRefresh(refreshTokenValue);
    if (!tokenIsValid) {
      return redirectTo("/login", request, true);
    }
  }

  // Redirigir a /movies si el usuario autenticado accede a login/register/home
  if (accessToken && isPublicRestricted) {
    return redirectTo("/movies", request);
  }

  // Continuar normalmente
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
