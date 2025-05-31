"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { useDebouncedCallback } from "use-debounce";

interface InputCheckboxProps {
  id: string;
  label: string | number;
  query: string;
}

export const InputCheckbox: FC<InputCheckboxProps> = ({ id, label, query }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const labelValue =
    typeof label === "string" ? label.toLowerCase() : label.toString();

  const handleCheckedChange = useDebouncedCallback(
    (checked: string | boolean) => {
      const params = new URLSearchParams(searchParams);
      if (checked) {
        params.set(query, labelValue);
      } else {
        params.delete(query);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    500
  );

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={searchParams.get(query) === labelValue}
        onCheckedChange={(checked) => handleCheckedChange(checked)}
      />
      <label
        htmlFor={id}
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
