import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface ReactionButtonProps {
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
}

export const ReactionButton: FC<ReactionButtonProps> = ({
  label,
  Icon,
  onClick,
}) => {
  return (
    <button
      className="hover:bg-primary-foreground flex flex-col items-center justify-center gap-1 rounded-md px-4 py-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      <span className="hidden text-xs font-semibold md:inline">{label}</span>
    </button>
  );
};
