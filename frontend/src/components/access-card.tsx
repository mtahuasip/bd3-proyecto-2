import Link from "next/link";
import { Button } from "./ui/button";

export const AccessCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-sm font-semibold">
        Ingresa para ver más contenido o crea un cuenta
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="lg">
          <Link href="/login">Ingresar</Link>
        </Button>
        <Button size="lg">
          <Link href="/register">Suscribirse</Link>
        </Button>
      </div>
    </div>
  );
};
