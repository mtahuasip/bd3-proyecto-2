"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

export const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOnChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <Input
      placeholder="Escribe el titulo de la película"
      type="search"
      onChange={(e) => handleOnChange(e.target.value)}
    />
  );
};
