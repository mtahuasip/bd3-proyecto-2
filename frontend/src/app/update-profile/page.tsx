import { UpdateProfileForm } from "@/components/update-profile-form";
import { getSession } from "@/lib/session";
import { getMe } from "@/services/auth";
import { toast } from "sonner";

export default async function Page() {
  const session = await getSession();

  let me = null;
  if (session) {
    try {
      me = await getMe(session ?? undefined);
    } catch {
      toast("Error al recuperar datos de usuario");
    }
  }

  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdateProfileForm
          defaultValues={{
            username: me?.username || "Cargando...",
            email: me?.email || "Cargando...",
          }}
        />
      </div>
    </section>
  );
}
