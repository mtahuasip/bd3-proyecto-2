import { LucideIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";

interface SocialLinkProps {
  href: string;
  Icon: LucideIcon;
}

export const SocialLink: FC<SocialLinkProps> = ({ href, Icon }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button variant="outline" size="icon">
        <Icon />
      </Button>
    </a>
  );
};
