import { RegisterForm } from "@/components/register-form";

export default function Page() {
  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="mt-10 w-full max-w-sm md:mt-4 lg:mt-0">
        <RegisterForm />
      </div>
    </section>
  );
}
