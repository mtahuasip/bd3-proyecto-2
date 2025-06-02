import { FC } from "react";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div>
      <iframe
        className="h-[250px] w-full rounded-sm md:h-[500px]"
        src={src}
        loading="lazy"
        title="Description"
        allowFullScreen
      />
    </div>
  );
};
