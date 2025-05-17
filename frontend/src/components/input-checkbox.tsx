"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FC } from "react";

interface InputCheckboxProps {
  id: string;
  label: string | number;
}

export const InputCheckbox: FC<InputCheckboxProps> = ({ id, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
