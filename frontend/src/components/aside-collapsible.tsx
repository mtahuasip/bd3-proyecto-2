"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Category } from "@/types/category.types";
import { Year } from "@/types/movies.types";
import { InputCheckbox } from "./input-checkbox";
import { Search } from "./search";

interface AsideCollapsibleProps {
  categories?: Category[];
  years?: Year[];
}

export const AsideCollapsible: React.FC<AsideCollapsibleProps> = ({
  categories,
  years,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-4 flex flex-col gap-2 lg:hidden"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Buscar película</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Search />
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          <h6 className="text-center text-sm font-semibold">Categoría</h6>
          <div className="mt-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories?.map((category) => (
              <InputCheckbox
                key={category._id}
                id={category._id}
                label={category.name}
                query="categories"
              />
            ))}
          </div>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          <h6 className="text-center text-sm font-semibold">Año</h6>
          <div className="mt-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {years?.map((year) => (
              <InputCheckbox
                key={year.id}
                id={year.id}
                label={year.year}
                query="year"
              />
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
