import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listas de reproducción",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
