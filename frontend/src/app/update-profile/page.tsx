import { UpdateProfileForm } from "@/components/update-profile-form";
import { getSession } from "@/lib/session";

export default async function Page() {
  const session = await getSession();

  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdateProfileForm
          defaultValues={{ username: session.username, email: session.email }}
        />
      </div>
    </section>
  );
}
