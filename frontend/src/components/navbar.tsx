import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export const Navbar = async () => {
  const session = await getSession();

  const links = [
    { name: "Inicio", href: "/home", requiresAuth: false, hideIfAuth: true },
    { name: "Películas", href: "/movies", requiresAuth: false },
    { name: "Categorías", href: "/categories", requiresAuth: false },
    { name: "Favoritos", href: "/favorites", requiresAuth: true },
    { name: "Listas de reproducción", href: "/playlists", requiresAuth: true },
  ].filter((link) => {
    if (link.requiresAuth && !session) return false;
    if (link.hideIfAuth && session) return false;
    return true;
  });

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-10 px-16 py-6">
      <div className="relative flex items-center justify-between">
        <h6>
          <Link className="text-4xl font-extrabold tracking-tighter" href="/">
            LOGO
          </Link>
        </h6>

        <NavigationMenu className="absolute left-1/2 -translate-x-1/2 transform">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavLink href={link.href} name={link.name} />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={`User ${session.username} avatar`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{session.email}</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="lg">
                <Link href="/login">Ingresar</Link>
              </Button>
              <Button>
                <Link href="/register">Suscribirse</Link>
              </Button>
            </>
          )}

          <ThemeModeToggle />
        </div>
      </div>
    </nav>
  );
};
