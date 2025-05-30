import { UpdateProfileForm } from "@/components/update-profile-form";
import { getSession } from "@/lib/session";
import { profile } from "@/services/auth";
import { SessionUser } from "@/types/session.types";

export default async function Page() {
  const session = await getSession();

  let user: SessionUser | null = null;

  try {
    if (session) user = await profile();
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdateProfileForm
          defaultValues={{
            username: user?.username || "Username",
            email: user?.email || "m@mail.com",
          }}
        />
      </div>
    </section>
  );
}
