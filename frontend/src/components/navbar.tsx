import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
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

export const Navbar = () => {
  const links = [
    { name: "Inicio", href: "/home" },
    { name: "Películas", href: "/movies" },
    { name: "Categorías", href: "/categories" },
    { name: "Favoritos", href: "/favorites" },
    { name: "Listas de reproducción", href: "/playlists" },
  ];

  const buttons = [
    { name: "Ingresar", href: "/login", variant: "outline" },
    { name: "Suscribirse", href: "/register" },
  ];

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-16 py-6">
      <h6>
        <Link className="text-4xl font-extrabold tracking-tighter" href="/">
          LOGO
        </Link>
      </h6>

      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.name}>
              <NavLink href={link.href} name={link.name} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center justify-between gap-4">
        <Button className="text-lg" variant="outline" size="lg">
          <Link href="/login">Ingresar</Link>
        </Button>
        <Button
          className="bg-blue-500 text-lg text-white hover:bg-blue-600"
          size="lg"
        >
          <Link href="/register">Suscribirse</Link>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeModeToggle />
      </div>
    </nav>
  );
};
