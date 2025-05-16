import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section
        className="flex min-h-dvh flex-col items-center gap-8 mask-b-from-60% mask-b-to-95% bg-cover bg-center bg-no-repeat px-16 pt-64 text-center backdrop-brightness-50"
        style={{ backgroundImage: 'url("/images/hero-bg.webp")' }}
      >
        <h1 className="text-primary text-5xl font-extrabold uppercase md:text-7xl lg:text-9xl">
          Plataforma de Streaming
        </h1>

        <p className="text-foreground px-20 text-sm font-semibold md:px-24 md:text-base lg:px-32 lg:text-xl">
          Plataforma de Streaming, este es un proyecto desarrollado por el Grupo
          15 para la materia de Base de Datos 3. Facultad de Ciencias Puras y
          Naturales, Universidad Mayor de San Andrés.
        </p>

        <Button size="lg">
          <Link href="/register">Suscribirse</Link>
        </Button>
      </section>
    </main>
  );
}
