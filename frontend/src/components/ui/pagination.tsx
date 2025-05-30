import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PaginationContext = React.createContext<PaginationProps>({
  currentPage: 1,
  lastPage: 1,
});

export type PaginationProps = React.ComponentProps<"nav"> & {
  currentPage?: number;
  lastPage?: number;
};

function Pagination({
  className,
  currentPage,
  lastPage,
  ...props
}: PaginationProps) {
  return (
    <PaginationContext.Provider value={{ currentPage, lastPage }}>
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationContext.Provider>
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a"> &
  React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { currentPage } = React.useContext(PaginationContext);
  const isDisabled = currentPage === undefined || currentPage <= 1;

  return (
    <PaginationLink
      aria-label="Go to previous page"
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      size="default"
      className={cn(
        "gap-1 px-2.5 sm:pl-2.5",
        className,
        isDisabled ? ["pointer-events-none opacity-50"] : []
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Anterior</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { currentPage, lastPage } = React.useContext(PaginationContext);
  const isDisabled =
    currentPage === undefined || currentPage >= (lastPage || 0);

  return (
    <PaginationLink
      aria-label="Go to next page"
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      size="default"
      className={cn(
        "gap-1 px-2.5 sm:pr-2.5",
        className,
        isDisabled ? ["pointer-events-none opacity-50"] : []
      )}
      {...props}
    >
      <span className="hidden sm:block">Siguiente</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
