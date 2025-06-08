import { UpdateProfileForm } from "@/components/update-profile-form";
import { getSession } from "@/lib/session";

export default async function Page() {
  const load = async () => {
    try {
      const session = await getSession();

      return { user: session?.user };
    } catch (error) {
      console.log(error);
      return { user: null };
    }
  };

  const { user } = await load();

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
