import { Facebook, Github, Instagram } from "lucide-react";
import Link from "next/link";
import { SocialLink } from "./social-link";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-8">
      <nav>
        <ul className="flex items-center justify-center gap-4 text-sm font-semibold">
          <li className="hover:underline hover:underline-offset-2">
            <Link href="/about">Acerca de nosotros</Link>
          </li>
          <li className="hover:underline hover:underline-offset-2">
            <Link href="/help">Ayuda</Link>
          </li>
        </ul>
      </nav>

      <p className="text-sm font-semibold">
        &copy;2025 Grupo 15 - Base de Datos 3
      </p>

      <div className="flex items-center justify-center gap-2">
        <SocialLink
          href="https://facebook.com/bd3-proyecto-2"
          Icon={Facebook}
        />
        <SocialLink
          href="https://intagram.com/bd3-proyecto-2"
          Icon={Instagram}
        />
        <SocialLink
          href="https://github.com/mtahuasip/bd3-proyecto-2"
          Icon={Github}
        />
      </div>
    </footer>
  );
};
