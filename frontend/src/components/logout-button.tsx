"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast("Sesión cerrada correctamente");
      router.refresh();
    } catch {
      toast("Ocurrió un error inesperado");
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
  );
};
