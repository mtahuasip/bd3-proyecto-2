import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-destructive mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Página no encontrada</h2>
      <p className="text-muted-foreground mb-6">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </Button>
    </main>
  );
}
