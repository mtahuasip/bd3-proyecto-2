import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cambiar contraseña",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
