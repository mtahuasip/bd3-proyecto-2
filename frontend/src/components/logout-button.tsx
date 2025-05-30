"use client";

import { clearSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";

interface LogoutButtonProps {
  isMenuItem?: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ isMenuItem = true }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await clearSession();
    router.refresh();
  };

  return (
    <>
      {isMenuItem ? (
        <DropdownMenuItem onClick={handleLogout}>
          Cerrar sesión
        </DropdownMenuItem>
      ) : (
        <Button className="w-full" onClick={handleLogout} variant="destructive">
          Cerrar sesión
        </Button>
      )}
    </>
  );
};
