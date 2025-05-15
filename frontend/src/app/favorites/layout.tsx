import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favoritos | Plataforma de Streaming",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
