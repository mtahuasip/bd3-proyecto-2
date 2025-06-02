import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
