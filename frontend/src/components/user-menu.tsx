import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FC } from "react";
import { LogoutButton } from "./logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface UserMenuProps {
  username?: string;
}

export const UserMenu: FC<UserMenuProps> = ({ username = "Username" }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden lg:block" asChild>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={`User ${username} avatar`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/profile" className="capitalize">
              {username}
            </Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Link href="/update-profile">Editar datos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/change-password">Cambiar contraseña</Link>
          </DropdownMenuItem>
          <Separator />
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex flex-col items-center gap-2 lg:hidden">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={`User ${username} avatar`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="text-sm capitalize underline underline-offset-2">
            {username}
          </span>
        </div>

        <ul className="mt-4 flex flex-col items-center justify-center gap-4">
          <li className="text-sm font-light underline underline-offset-2">
            <Link href="/update-profile">Editar datos</Link>
          </li>
          <li className="text-sm font-light underline underline-offset-2">
            <Link href="/change-password">Cambiar contraseña</Link>
          </li>
          <li>
            <LogoutButton isMenuItem={false} />
          </li>
        </ul>
      </div>
    </>
  );
};
