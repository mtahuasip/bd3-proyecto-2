import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section className="relative flex min-h-dvh items-center justify-center">
        <div
          className="absolute top-0 left-0 -z-10 h-full w-full mask-b-from-60% mask-b-to-95% bg-cover bg-center bg-no-repeat backdrop-brightness-50"
          style={{ backgroundImage: 'url("/images/hero-bg.webp")' }}
        ></div>

        <div className="mt-64 flex flex-col items-center gap-10 text-center lg:mt-52">
          <div className="flex flex-col items-center justify-center gap-2 px-8 text-white lg:w-10/12 lg:p-0">
            <h1 className="text-4xl font-extrabold uppercase lg:text-9xl">
              Plataforma de Streaming
            </h1>

            <p className="text-xs font-semibold lg:w-4/5 lg:text-xl">
              Plataforma de Streaming, este es un proyecto desarrollado por el
              Grupo 15 para la materia de Base de Datos 3. Facultad de Ciencias
              Puras y Naturales, Universidad Mayor de San Andrés.
            </p>
          </div>

          <Button size="lg">
            <Link href="/register">Suscribirse</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
