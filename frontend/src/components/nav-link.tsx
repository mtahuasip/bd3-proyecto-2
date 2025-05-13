"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

interface NavLinkProps {
  name: string;
  href: string;
}

export const NavLink: FC<NavLinkProps> = ({ name, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuLink
      asChild
      className={clsx(navigationMenuTriggerStyle(), isActive && "bg-accent")}
    >
      <Link href={href}>{name}</Link>
    </NavigationMenuLink>
  );
};
