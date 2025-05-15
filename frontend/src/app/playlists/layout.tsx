import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listas de reproducción | Plataforma de Streaming",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
