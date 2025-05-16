import { Facebook, Github, Instagram } from "lucide-react";
import Link from "next/link";
import { SocialLink } from "./social-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/about">Acerca de nosotros</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/help">Ayuda</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <p className="text-sm font-semibold">
        &copy;2025 Grupo 15 - Base de Datos 3
      </p>

      <div className="flex items-center justify-center gap-2">
        <SocialLink
          href="https://facebook.com/bd3-proyecto-2"
          Icon={Facebook}
        />
        <SocialLink
          href="https://intagram.com/bd3-proyecto-2"
          Icon={Instagram}
        />
        <SocialLink
          href="https://github.com/mtahuasip/bd3-proyecto-2"
          Icon={Github}
        />
      </div>
    </footer>
  );
};
