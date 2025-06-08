import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSession } from "@/lib/session";
import { Menu, TvMinimalPlayIcon } from "lucide-react";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { UserMenu } from "./user-menu";

export const Navbar = async () => {
  const load = async () => {
    try {
      const session = await getSession();

      return { user: session?.user };
    } catch (error) {
      console.log(error);
      return { user: null };
    }
  };

  const { user } = await load();

  const links = [
    { name: "Inicio", href: "/", requiresAuth: false, hideIfAuth: true },
    { name: "Películas", href: "/movies", requiresAuth: false },
    { name: "Categorías", href: "/categories", requiresAuth: false },
    { name: "Favoritos", href: "/favorites", requiresAuth: true },
    { name: "Listas de reproducción", href: "/playlists", requiresAuth: true },
  ].filter((link) => {
    if (link.requiresAuth && !user) return false;
    if (link.hideIfAuth && user) return false;
    return true;
  });

  const NavigationLinks = ({ className = "" }: { className?: string }) => (
    <NavigationMenu>
      <NavigationMenuList className={className}>
        {links.map((link) => (
          <NavigationMenuItem key={link.name} className="w-full text-center">
            <NavLink href={link.href} name={link.name} />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  const SessionControls = () =>
    user ? (
      <UserMenu username={user?.username} />
    ) : (
      <>
        <Button variant="outline" size="lg">
          <Link href="/login">Ingresar</Link>
        </Button>
        <Button size="lg">
          <Link href="/register">Suscribirse</Link>
        </Button>
      </>
    );

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-50">
      <div className="relative flex items-center justify-between px-4 py-2 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <TvMinimalPlayIcon className="text-foreground size-8" />
          <span className="text-4xl font-extrabold tracking-tighter">TV</span>
        </Link>

        <NavigationMenu className="absolute left-1/2 hidden -translate-x-1/2 transform lg:block">
          <NavigationLinks />
        </NavigationMenu>

        <div className="hidden items-center gap-4 lg:flex">
          <SessionControls />
          <ThemeModeToggle />
        </div>

        <Sheet>
          <SheetTrigger className="lg:hidden" asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex h-full flex-col">
            <SheetHeader>
              <SheetTitle>Menú de navegación</SheetTitle>
              <SheetDescription>
                Puedes hacer clic en alguna opción
              </SheetDescription>
            </SheetHeader>

            <div className="flex justify-center">
              <NavigationLinks className="flex flex-col items-center gap-2" />
            </div>

            <div className="mt-auto flex flex-col items-center gap-4 py-4">
              <SessionControls />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
