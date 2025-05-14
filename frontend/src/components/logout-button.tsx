"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logoutRequest } from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutRequest();
      toast("Sesión cerrada correctamente");
      router.refresh();
    } catch (error: any) {
      toast(error.message || "Error al cerrar sesión");
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
  );
};
